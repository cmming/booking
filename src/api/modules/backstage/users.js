export default {
    GET_USERS_LIST: {
        url: "getUserList.do",
        method: "post",
        hasData: true,
        isAdmin: true
    },
    USERS_STORE: {
        url: "userRegister.do",
        method: "post",
        hasData: true,
        isAdmin: true
    },
    USERS_UPDATE: {
        url: "updateUserInfoByAdmin.do",
        method: "post",
        hasData: true,
        isAdmin: true
    },
    USERS_DELETE: {
        url: "withdrawApply.do",
        method: "post",
        hasData: true,
        isAdmin: true
    },
    USERS_SET_PWD: {
        url: "setUserPassWord.do",
        method: "post",
        hasData: true,
        isAdmin: true
    },
    
}