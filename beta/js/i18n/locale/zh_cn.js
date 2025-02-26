/*!
 * @license MPL-2.0-no-copyleft-exception
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/.
 * This Source Code Form is "Incompatible With Secondary Licenses", as
 * defined by the Mozilla Public License, v. 2.0.
 */

export default {
  locale: 'zh-CN',
  localeName: '中文（简体）',

  title: 'tReader',
  titleWithName: '{0} - tReader',

  listFilterClear: '取消过滤',
  listSortTitle: '排序',
  listSortByDateRead: '按最后阅读时间',
  listSortByDateAdd: '按添加时间',
  listSortByTitle: '按标题',
  listSortCancel: '取消',
  listImportTip: '正在读取文本……',
  listNotYetRead: '新',
  listSearchPlaceholder: '搜索',
  listEmptySearchTip: '找不到搜索的文件',
  listEmptyTip: '点击加号图标导入文件',
  listDropArea: '将文件放在此处以导入',

  readContentsTemplate: '目录模板',
  readContentsTemplateDescription: '使用星号(*)作通配符',
  readContentsTemplateHistory: '最近设置模板',
  readContentsTemplateSubmit: '生成目录',
  readContentsTemplateClear: '清空',
  readContentsEmpty: '暂无目录\n点击刷新按钮生成目录',
  readBookmarkEmpty: '暂无书签\n点击添加按钮添加书签',
  readSearchPlaceholder: '查找',
  readSearchInitial: '键入文本以查找',
  readSearchEmpty: '找不到 {0}',
  readSearchTooMany: '已找到 {0} 个结果，点击以继续查找',
  readPagePrevious: '上一页',
  readPageNext: '下一页',
  readPageScrollUp: '向上翻',
  readPageScrollDown: '向下翻',
  readControlClose: '隐藏按钮',
  readAutoScrollStop: '停止滚动',
  readMenuButton: '更多',
  readMenuShare: '共享',
  readMenuDownload: '下载',
  readMenuAutoScroll: '自动滚动',
  readMenuCancel: '取消',

  configPageTitle: '设置',
  configWithDetail: '详情',
  configInstallGroupTitle: '安装',
  configInstallButton: '安装网页应用',
  configInstallGroupDescription: '使用支持 Web 应用的浏览器访问本站，可以允许您将 tReader 安装到您的设备上',
  configInstallIosGuide: '在 iOS 系统安装网页应用：使用 Safari 浏览器打开本页；点击“分享”按钮；选择“添加到主屏幕”。',
  configModeGroupTitle: '模式',
  configMode: '阅读模式',
  configModeFlip: '翻页',
  configModeScroll: '滚动',
  configThemeGroupTitle: '主题',
  configTheme: '主题',
  configThemeAuto: '自动',
  configThemeLight: '浅色',
  configThemeDark: '深色',
  configDarkThemeGroupTitle: '深色主题',
  configDarkThemeColor: '阅读文字',
  configDarkThemeBackground: '阅读背景',
  configLightThemeGroupTitle: '浅色主题',
  configLightThemeColor: '阅读文字',
  configLightThemeBackground: '阅读背景',
  configTextGroupTitle: '阅读文字',
  configTextFontFamily: '字体',
  configTextFontFamilyUpload: '浏览字体文件',
  configTextFontFamilyDefault: '默认字体',
  configTextFontFamilyCustom: '定制字体',
  configTextFontSize: '字号',
  configTextFontSizeNum: '{0}',
  configTextLineHeight: '行高',
  configTextLineHeightNum: '{0}',
  configTextParagraphSpacing: '段间距',
  configTextParagraphSpacingNum: '{0} 行',
  configTextLangTag: '语言标记',
  configTextLangTagTitle: '语言标记',
  configTextLangTagDescription: '语言标记用于标记文本的语言。语言标记可能会影响汉字的渲染和文字的换行。',
  configPreprocessGroupTitle: '预处理',
  configPreprocessMultipleNewLine: '压缩连续空行至',
  configPreprocessMultipleNewLineNum: '{0} 行',
  configPreprocessMultipleNewLineDisable: '不压缩',
  configPreprocessChineseConvert: '汉字繁简转换',
  configPreprocessChineseConvertS2T: '简体转繁体',
  configPreprocessChineseConvertT2S: '繁体转简体',
  configPreprocessChineseConvertDisabled: '不使用',
  configAutoTocDetect: '自动识别目录',
  configAutoTocDetectDisable: '关闭',
  configAutoTocDetectEnable: '启用',
  configSpeechGroupTitle: '朗读',
  configSpeechVoice: '语音',
  configSpeechVoiceRemote: '(远程)',
  configSpeechVoiceEmpty: '未发现可用的语音',
  configSpeechVoicePrivacy: '使用被标记为“远程”的语音时，将要朗读的文本会被发送到第三方的服务器上。请在使用前自行确认对应服务的隐私条款。',
  configSpeechPitch: '语调',
  configSpeechPitchNum: pitch => {
    if (pitch === 0) return '0 (最低)';
    if (pitch === 2) return '2 (最高)';
    if (pitch === 1) return '1 (默认)';
    else return String(pitch);
  },
  configSpeechRate: '语速',
  configSpeechRateNum: rate => {
    if (rate === 1) return '1× (默认)';
    return rate + '×';
  },
  configSpeechTapPage: '朗读时点按翻页',
  configSpeechTapPageEnable: '允许',
  configSpeechTapPageDisable: '禁用',
  configSpeechTapPageDescription: '禁用点按翻页后您仍然可以滑动屏幕翻页。',
  configScreenGroupTitle: '屏幕',
  configAutoLock: '自动锁屏',
  configAutoLockNormal: '设备默认',
  configAutoLockSpeech: '朗读时禁用',
  configAutoLockDisable: '始终禁用',
  configHelpGroupTitle: '帮助',
  configHelpTopic: '帮助',
  configHelpFilename: 'zh_cn.html',
  configHelpCredits: 'Open Source Credits',
  configHelpAbout: '关于',
  configHelpPrivacy: 'Privacy Policy',
  configLocale: 'Language (语言)',
  configLocaleAuto: '默认',
  configLocaleDescription: '修改语言设置需要重新打开才能生效',
  configExpertGroupTitle: '高级',
  configExpert: '高级设置',
  configExpertDescription: '如果您不清楚应当如何填写请将此处留空，错误配置可能导致阅读器无法使用',

  buttonRemove: '删除',
  buttonBack: '返回',
  buttonAdd: '添加文件',
  buttonSettings: '设置',
  buttonContents: '目录',
  buttonBookmark: '书签',
  buttonSearch: '搜索',
  buttonJump: '跳转',
  buttonSpeech: '开始朗读',
  buttonSpeechStop: '停止朗读',
  buttonContentsRefresh: '刷新目录',
  buttonSearchSubmit: '搜索',
  buttonSearchClear: '清除搜索结果',
  buttonBookmarkAdd: '添加书签',

  colorHueRange: '色相',
  colorSaturationRange: '饱和度',
  colorValueRange: '明度',

  readFontFail: '无法打开字体文件\n您的浏览器可能不支持该字体文件类型',
  listImportFail: '读取文本时发生错误\n文本可能使用了不支持的字符编码',
  storageOpenFail: '无法访问设备的存储\ntReader 需要访问存储以正常工作\n这可能是因为您启用了浏览器的无痕（隐私）模式或您的浏览器版本不受支持',
};
