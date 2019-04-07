export default {
    GET_TERMICAL_LIST: {
        url: "booking/termicals",
        method: "get",
        hasData: true,
        isAdmin: true
    },
    SET_TERMICAL_BROKEN: {
        url: "faultTag.do",
        method: "post",
        hasData: true,
        isAdmin: true
    },
    TERMICAL_ADD: {
        url: "booking/termicals",
        method: "post",
        hasData: true,
        isAdmin: true
    },
    TERMICAL_DELETE: {
        url: "/booking/termicals",
        method: "delete",
        hasData: true,
        isAdmin: true
    },
    TERMICAL_UPDATE: {
        url: "/booking/termicals",
        method: "put",
        hasData: true,
        isAdmin: true
    }

}