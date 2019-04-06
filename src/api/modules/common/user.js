export default {

    CAPTCHA:{
        url: "/auth/captcha.jpg",
        method: "post",
        hasData: true,
    },
    USER_lOGIN: {
        url: "/auth/login",
        method: "post",
        hasData: true,
    },
    LOGOUT: {
        url: "/auth/logout",
        method: "post",
        hasData: false,
    },

    USER_INFO: {
        url: "/auth/logout",
        method: "post",
        hasData: false,
    },

    REFRESH_TOKEN: {
        url: "/auth/refresh",
        method: "post",
        hasData: false,
    },
    
}