import Vue from 'vue'


Vue.filter('bytesToSize',
    function(bytes) {
        if (bytes == 0) return '--';
        // if (bytes === 0) return '0 B';

        var k = 1024,

            sizes = ['B', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'],

            i = Math.floor(Math.log(bytes) / Math.log(k));

        return (bytes / Math.pow(k, i)).toPrecision(4) + ' ' + sizes[i];
        //toPrecision(3) 后面保留一位小数，如1.0GB                                                                                                                  //return (bytes / Math.pow(k, i)).toPrecision(3) + ' ' + sizes[i];  
    });


Vue.filter('formatSize', function(size) {
    if (size > 1024 * 1024 * 1024 * 1024) {
        return (size / 1024 / 1024 / 1024 / 1024).toFixed(2) + ' TB'
    } else if (size > 1024 * 1024 * 1024) {
        return (size / 1024 / 1024 / 1024).toFixed(2) + ' GB'
    } else if (size > 1024 * 1024) {
        return (size / 1024 / 1024).toFixed(2) + ' MB'
    } else if (size > 1024) {
        return (size / 1024).toFixed(2) + ' KB'
    }
    return size.toString() + ' B'
})



Vue.filter('fileApplicationState', function(state) {
    var stateArr = {
        "0": i18n.t("messagePage.state.0"),
        "1": i18n.t("messagePage.state.1"),
        "2": i18n.t("messagePage.state.2"),
        "3": i18n.t("messagePage.state.3"),
        "4": i18n.t("messagePage.state.4"),
    };

    return stateArr[state] ? stateArr[state] : i18n.t("messagePage.state.-1")
})






Vue.filter('changeTableColumns', function(state, tableIndex, columnIndex, filterKey) {
    var tableIndexArr = ['adminUser', 'adminUserGroup', 'team', 'hostServer', 'allApps', 'publishApps', 'fileDownload', 'fileLog']
    var stateArr = {
        "record": {
            // -1预约，-2取消，-3以使用
            "applyStatus": {
                "-1": {
                    "tagType": "success"
                },
                "-2": {
                    "tagType": "danger"
                },
                "-3": {
                    "tagType": "warning"
                },
            },
            // 干预标记，0正常，1到时不上机，2提前下机,3拒绝申请,4故障
            "adminMark": {
                "0": {
                    "tagType": "success"
                },
                "1": {
                    "tagType": "danger"
                },
                "2": {
                    "tagType": "danger"
                },
                "3": {
                    "tagType": "danger"
                },
                "4": {
                    "tagType": "warning"
                },
            },
        },
        "users": {
            state: {
                "1": {
                    "tagType": "success"
                },
                "-1": {
                    "tagType": "danger"
                },
            },
            // 权限，1管理员，2用户
            jurisdiction: {
                "1": {
                    "tagType": "info"
                },
                "2": {
                    "tagType": "info"
                },
            },
        },
        "bookings": {
            // -1预约，-2取消，-3以使用
            "applyStatus": {
                "-1": {
                    "tagType": "success"
                },
                "-2": {
                    "tagType": "danger"
                },
                "-3": {
                    "tagType": "warning"
                },
            },
            // 干预标记，0正常，1到时不上机，2提前下机,3拒绝申请,4故障
            "adminMark": {
                "0": {
                    "tagType": "success"
                },
                "1": {
                    "tagType": "danger"
                },
                "2": {
                    "tagType": "danger"
                },
                "3": {
                    "tagType": "danger"
                },
                "4": {
                    "tagType": "warning"
                },
            },
        },
        termical: {
            state: {
                "1": {
                    "tagType": "success"
                },
                "-1": {
                    "tagType": "danger"
                },
                "-2": {
                    "tagType": "danger"
                },
            },
        }
    }
    if (filterKey == 'lable') {
        if (state === '' || state === null) {
            return '未知状态'
        } else {
            var indexStr = "backstage." + tableIndex + ".filter." + columnIndex + "." + state
                // return i18n.t("backstage."+tableIndex+".filter."+columnIndex+"."+state)
            return i18n.t(indexStr)
        }
    } else {
        // console.log(tableIndex,columnIndex,state,filterKey)
        if (state === '' || state === null) {
            return "danger"
        } else {
            return (stateArr[tableIndex] && stateArr[tableIndex][columnIndex] && stateArr[tableIndex][columnIndex][state] && stateArr[tableIndex][columnIndex][state][filterKey]) ? stateArr[tableIndex][columnIndex][state][filterKey] : ''
        }
    }

})