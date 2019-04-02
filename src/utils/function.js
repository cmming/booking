import storage from '@/utils/storage';



export function getRootApi(service) {
    if (window.location.hash.indexOf('#/admin/') !== -1) {
        return storage.get("uamAdminConfigData") && storage.get("uamAdminConfigData")['ApiUrl'] ? storage.get("uamAdminConfigData")['ApiUrl'] : GLOBAL_CONFIG.INIT_API_UPL();
    } else {
        return storage.get("uamConfigData") && storage.get("uamConfigData")['ApiUrl'] ? storage.get("uamConfigData")['ApiUrl'] : GLOBAL_CONFIG.INIT_API_UPL();
    }
}


export function getLanguage() {
    var JsSrc = (navigator.language || navigator.browserLanguage).toLowerCase();
    if (JsSrc.indexOf('zh') >= 0) {
        // 假如浏览器语言是中文
        return 'zh'
    } else if (JsSrc.indexOf('en') >= 0) {
        // 假如浏览器语言是英文
        return 'en'
    } else {
        return 'en'
    }
}