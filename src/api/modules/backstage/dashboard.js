export default {
    GET_USER_BY_CODE: {
        url: "consumptionResourceByApplyCode.do",
        method: "post",
        hasData: true,
        isAdmin: true
    },
    GET_ONLINE_TERMICAL: {
        url: "booking/termicalOrders/online",
        method: "get",
        hasData: false,
        isAdmin: true
    },
    // 提前下机
    SET_TERMICAL_OFF:{
        url: "advanceSettleAccounts.do",
        method: "post",
        hasData: true,
        isAdmin: true
    }

}