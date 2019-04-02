export default {
    GET_BOOKINGS_LIST: {
        url: "getAllApplyLogAndUserInfo.do",
        method: "post",
        hasData: true,
        isAdmin: true
    },
    CHANGE_BOOKINGS_STATE: {
        url: "refuseRequest.do",
        method: "post",
        hasData: true,
        isAdmin: true
    },

}