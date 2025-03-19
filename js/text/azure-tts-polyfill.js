// 定义自定义 Azure TTS 语音对象
const azureTTSVoice = {
    default: false,
    lang: "zh-CN", // 语音语言
    localService: false,
    name: "Azure TTS",
    voiceURI: "azure-tts"
};

function injectAzureVoice() {
    const voices = speechSynthesis.getVoices();
    if (!voices.find(v => v.voiceURI === azureTTSVoice.voiceURI)) {
        voices.push(azureTTSVoice);
    }
    return voices;
}

speechSynthesis.addEventListener("voiceschanged", injectAzureVoice);
injectAzureVoice();

const nativeGetVoices = speechSynthesis.getVoices.bind(speechSynthesis);
speechSynthesis.getVoices = function() {
    const voices = nativeGetVoices();
    if (!voices.find(v => v.voiceURI === azureTTSVoice.voiceURI)) {
        voices.push(azureTTSVoice);
    }
    return voices;
};

// 全局队列和状态变量
let azureTTSQueue = [];
let azureTTSProcessing = false;
let currentAudio = null;        // 当前正在播放的音频
let currentBoundaryTimer = null; // 当前的定时器，用于模拟 onboundary
let currentTimer = null;
let isCanceling = false;        // 标记是否正在取消播放

// 修改后的 processAzureQueue：在队列开始处理前以及每次取出 utterance 后，检测 isCanceling 状态
function processAzureQueue() {
    if (azureTTSProcessing || isCanceling) return;
    if (azureTTSQueue.length === 0) return;

    const nextUtterance = azureTTSQueue.shift();
    // 如果在获取 utterance 后发现正在取消，则不再处理
    if (isCanceling || !nextUtterance) return;

    azureTTSProcessing = true;

    // 触发 onstart 事件（模拟）
    if (typeof nextUtterance.onstart === 'function') {
        nextUtterance.onstart({ target: nextUtterance });
    }

    azureTTSSpeak(nextUtterance.text, nextUtterance)
        .catch(err => {
            if (typeof nextUtterance.onerror === 'function') {
                nextUtterance.onerror(err);
            }
        })
        .finally(() => {
            azureTTSProcessing = false;
            // 如果取消标志未被置位，则继续处理队列
            if (!isCanceling) {
                processAzureQueue();
            }
        });
}

// 劫持 speechSynthesis.speak() 方法：如果 utterance 带有 _useAzureTTS 标识，则由 Azure TTS 处理
const nativeSpeak = speechSynthesis.speak.bind(speechSynthesis);
speechSynthesis.speak = function(utterance) {
    console.log("Custom start");
    if (utterance._useAzureTTS) {
        azureTTSQueue.push(utterance);
        processAzureQueue();
    } else {
        nativeSpeak(utterance);
    }
};

// 保存原生 cancel 方法
const nativeCancel = speechSynthesis.cancel.bind(speechSynthesis);
speechSynthesis.cancel = function() {
    console.log("Custom cancel invoked");
    // 标记取消状态
    isCanceling = true;
    
    // 清空处理状态
    azureTTSProcessing = false;
    
    // 清空队列，确保后续未读内容被清除
    azureTTSQueue = [];
    
    // 如果当前有播放中的音频，则停止播放
    if (currentAudio) {
        currentAudio.pause();
        currentAudio.currentTime = 0;
        currentAudio = null;
    }
    
    // 清除所有定时器
    if (currentBoundaryTimer) {
        clearInterval(currentBoundaryTimer);
        currentBoundaryTimer = null;
    }
    
    if (currentTimer) {
        clearInterval(currentTimer);
        currentTimer = null;
    }
    
    // 调用原生 cancel（以便取消可能存在的其他任务）
    nativeCancel();
    
    // 延时后重置取消标记，以便后续恢复播放时重新使用
    setTimeout(() => {
        isCanceling = false;
    }, 100);
};

async function azureTTSSpeak(text, utterance) {
    const ssml = `<speak version='1.0' xml:lang='zh-CN'>
        <voice xml:lang='zh-CN' xml:gender='Female' name='zh-CN-XiaoxiaoNeural'>
          ${text}
        </voice>
      </speak>`;
  
    const azureTTSUrl = "https://eastasia.tts.speech.microsoft.com/cognitiveservices/v1";
    const subscriptionKey = "2krUSvwxm40leMtbeiWWLjt4dWajayb3IemYKzWQKUvgDgr6r3TQJQQJ99BCAC3pKaRXJ3w3AAAYACOGL0P8"; // 替换为真实密钥
  
    try {
      const response = await fetch(azureTTSUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/ssml+xml",
          "X-Microsoft-OutputFormat": "audio-24khz-48kbitrate-mono-mp3",
          "User-Agent": "Mozilla/5.0",
          "Ocp-Apim-Subscription-Key": subscriptionKey
        },
        body: ssml
      });
  
      if (!response.ok) {
        throw new Error(`Azure TTS API error: ${response.statusText}`);
      }
  
      const audioBlob = await response.blob();
      const audioUrl = URL.createObjectURL(audioBlob);
      const audio = new Audio(audioUrl);
      audio.preload = "auto"; // 强制预加载元数据
      currentAudio = audio; // 保存当前 audio 对象
  
      return new Promise(resolve => {
        let resolved = false;
        const safeResolve = () => {
          if (!resolved) {
            resolved = true;
            resolve();
          }
        };
  
        // 监听音频错误，出错时 resolve Promise
        audio.onerror = (err) => {
          console.error("Audio error:", err);
          if (typeof utterance.onerror === "function") {
            utterance.onerror(err);
          }
          safeResolve();
        };
  
        // 绑定 onended 事件，当音频自然播放结束时触发
        audio.onended = () => {
          if (currentBoundaryTimer) {
            clearInterval(currentBoundaryTimer);
            currentBoundaryTimer = null;
          }
          if (currentTimer) {
            clearInterval(currentTimer);
            currentTimer = null;
          }
          currentAudio = null;
          if (!isCanceling && typeof utterance.onend === "function") {
            utterance.onend({ target: utterance });
          }
          safeResolve();
        };
  
        // 监听 onpause，当调用 cancel 导致暂停时触发 Promise 结束
        audio.onpause = () => {
          // 如果当前处于取消状态，则手动 resolve Promise
          if (isCanceling) {
            if (currentBoundaryTimer) {
              clearInterval(currentBoundaryTimer);
              currentBoundaryTimer = null;
            }
            currentAudio = null;
            safeResolve();
          }
        };
  
        // 当元数据加载完成后设置 onboundary 模拟和安全超时
        audio.onloadedmetadata = () => {
          let duration = audio.duration;
          // 如果 duration 无效，则设置一个默认值
          if (!isFinite(duration) || duration <= 0) {
            duration = 3;
          }
          const textLength = utterance.text.length;
          const estimatedCharsPerSecond = textLength / duration;
  
          if (currentBoundaryTimer) {
            clearInterval(currentBoundaryTimer);
          }
          currentBoundaryTimer = setInterval(() => {
            if (!audio.paused && !isCanceling) {
              const currentTime = audio.currentTime;
              const charIndex = Math.floor(currentTime * estimatedCharsPerSecond);
              if (typeof utterance.onboundary === "function" && charIndex >= 0 && charIndex < textLength) {
                utterance.onboundary({
                  target: utterance,
                  charIndex: charIndex,
                  charLength: 1
                });
              }
            }
          }, 50);
  
          // 安全超时设置：播放结束后未触发 onended 时自动 resolve
          setTimeout(() => {
            if (currentAudio === audio) {
              console.log("Safety timeout triggered to resolve promise");
              if (currentBoundaryTimer) {
                clearInterval(currentBoundaryTimer);
                currentBoundaryTimer = null;
              }
              currentAudio = null;
              safeResolve();
            }
          }, (duration * 1000) + 2000);
        };
  
        // 开始播放音频
        audio.play().catch(playError => {
          console.error("Failed to play audio:", playError);
          if (typeof utterance.onerror === "function") {
            utterance.onerror(playError);
          }
          safeResolve();
        });
      });
    } catch (error) {
      console.error("Azure TTS 错误：", error);
      if (typeof utterance.onerror === "function") {
        utterance.onerror(error);
      }
      throw error;
    }
}
