export default {
    GET_USER_BY_CODE: {
        url: "consumptionResourceByApplyCode.do",
        method: "post",
        hasData: true,
        isAdmin: true
    },
    GET_ONLINE_TERMICAL: {
        url: "getUseInfo.do",
        method: "post",
        hasData: true,
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