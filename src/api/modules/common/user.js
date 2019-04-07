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
        url: "/auth/me",
        method: "post",
        hasData: false,
    },

    REFRESH_TOKEN: {
        url: "/auth/refresh",
        method: "post",
        hasData: false,
    },
    USER_SET_PWD: {
        url: "/user/password",
        method: "put",
        hasData: true,
        isAdmin: true
    },
}