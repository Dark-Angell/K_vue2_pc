// 引入插件
import VueI18n from 'vue-i18n'
import Vue from 'vue'
import store from '../store'

Vue.use(VueI18n) // 用于安装 vue 插件，若没安装，在创建 VUE 实例的时候，该插件不会被初始化

// 引入语言包
import En_lang from './En'
import Hy_lang from './Hy'
import Ry_lang from './Ry'
import Ty_lang from './Ty'
import Zh_lang from './Zh'

const messages = {
  En_lang,
  Hy_lang,
  Ry_lang,
  Ty_lang,
  Zh_lang
}
console.log('语言', messages)

// 设置默认得语言包
const DEFAULT_LANG = 'Zh_lang'
const LOCALE_KEY = 'language'

console.log('window.localStorage.getItem', window.localStorage.getItem(LOCALE_KEY))

// 判断是否存在缓存 并设置默认语言包
if(!window.localStorage.getItem(LOCALE_KEY)) {
  window.localStorage.setItem(LOCALE_KEY, DEFAULT_LANG)
}

// 判断是否存在语言包，并获取
const locale = window.localStorage.getItem(LOCALE_KEY) ? window.localStorage.getItem(LOCALE_KEY) : 'Zh_lang'

const i18n = new VueI18n({
  locale, // 定义默认语言为中文
  legacy: false,
  globalInjection: true,
  silentTranslationWarn: true,    // 初始化时，无法识别语言包中的 key， 控制台会报错
  messages,
})

export default i18n