import storage from '@/utils/storage';



export function getRootApi(service) {
    if (window.location.hash.indexOf('#/admin/') !== -1) {
        return storage.get("uamAdminConfigData") && storage.get("uamAdminConfigData")['ApiUrl'] ? storage.get("uamAdminConfigData")['ApiUrl'] : GLOBAL_CONFIG.INIT_API_UPL();
    } else {
        return storage.get("uamConfigData") && storage.get("uamConfigData")['ApiUrl'] ? storage.get("uamConfigData")['ApiUrl'] : GLOBAL_CONFIG.INIT_API_UPL();
    }
}
