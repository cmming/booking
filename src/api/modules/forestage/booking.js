export default {
    GET_BOOKING_TIME: {
        url: "booking/times/getCurentTimeConfig",
        method: "get",
        hasData: false,
        isAdmin: true
    },

    GET_COMPUTER_LIST: {
        url: "booking/termicals",
        method: "get",
        hasData: true,
        isAdmin: true
    },
    STORE_COMPUTER_BOOKING: {
        url: "/booking/termicalOrders",
        method: "post",
        hasData: true,
        isAdmin: true
    }

}