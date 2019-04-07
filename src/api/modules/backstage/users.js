export default {
    GET_USERS_LIST: {
        url: "/user/list",
        method: "get",
        hasData: true,
        isAdmin: true
    },
    USERS_STORE: {
        url: "user/save",
        method: "post",
        hasData: true,
        isAdmin: true
    },
    USERS_UPDATE: {
        url: "user/update",
        method: "put",
        hasData: true,
        isAdmin: true
    },
    USERS_DELETE: {
        url: "withdrawApply.do",
        method: "post",
        hasData: true,
        isAdmin: true
    },
    // USERS_SET_PWD: {
    //     url: "/user/password",
    //     method: "put",
    //     hasData: true,
    //     isAdmin: true
    // },
    
}