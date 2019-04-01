import Vue from 'vue'
import VueI18n from 'vue-i18n'
import elementEnLocale from 'element-ui/lib/locale/lang/en' // element-ui lang
import elementZhLocale from 'element-ui/lib/locale/lang/zh-CN' // element-ui lang
import enLocale from './en/index'
import zhLocale from './zh/index'
import storage from '@/utils/storage';
import { getLanguage } from "@/utils/function";

Vue.use(VueI18n)

const messages = {
    en: {
        ...enLocale,
        ...elementEnLocale
    },
    zh: {
        ...zhLocale,
        ...elementZhLocale
    }
}

const i18n = new VueI18n({
    locale: storage.get('language') || getLanguage(), // set locale
    messages // set locale messages
})


export default i18n