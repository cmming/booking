export default {
    GET_BOOKING_TIME: {
        url: "getTimeStamp.do",
        method: "post",
        hasData: true,
        isAdmin: true
    },

    GET_COMPUTER_LIST: {
        url: "getResourceInfo.do",
        method: "post",
        hasData: true,
        isAdmin: true
    },
    STORE_COMPUTER_BOOKING: {
        url: "applyResource.do",
        method: "post",
        hasData: true,
        isAdmin: true
    }

}