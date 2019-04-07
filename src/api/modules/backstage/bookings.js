export default {
    GET_BOOKINGS_LIST: {
        url: "booking/termicalOrders",
        method: "get",
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