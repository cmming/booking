export default {
    GET_TERMICAL_LIST: {
        url: "getAllPcTable.do",
        method: "post",
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
        url: "addPC.do",
        method: "post",
        hasData: true,
        isAdmin: true
    },
    TERMICAL_DELETE: {
        url: "getAllApplyLogAndUserInfo.do",
        method: "post",
        hasData: true,
        isAdmin: true
    },
    TERMICAL_UPDATE: {
        url: "faultTag.do",
        method: "post",
        hasData: true,
        isAdmin: true
    }

}