export const backstage = {
    table: {
        handleColumn: '操作',
        delete: "删除",
        detail: "详情",
        edit: "编辑",
    },
    form: {
        resetForm: "重置"
    },
    common: {
        delete: {
            label: "删除",
            type: "danger",
            icon: "delete",
            confirm: { title: "提示", message: "此操作将永久删除该条数据, 是否继续?", confirmButtonText: "确定", cancelButtonText: "取消", cancelInfo: "已取消删除" },
            notify: {
                success: {
                    title: "成功",
                    message: "删除成功！",
                },
                error: {
                    title: "失败",
                    message: "删除失败！"
                }
            }
        },
        detail: {
            label: "详情",
            type: "success",
            icon: "icon_details",
        },
        edit: {
            label: "编辑",
            type: "primary",
            icon: "edit",
        },
        update: {
            notify: {
                success: {
                    title: "成功",
                    message: "修改成功！",
                },
                error: {
                    title: "失败",
                    message: "修改失败！"
                }
            },
            submitButtonLabel: "更新"
        },
        add: {
            notify: {
                success: {
                    title: "成功",
                    message: "添加成功！",
                },
                error: {
                    title: "失败",
                    message: "添加失败！"
                }
            },
            submitButtonLabel: "提交"
        },
        fileState: {
            notify: {
                success: {
                    title: "成功",
                    message: "申请下载成功！",
                },
                error: {
                    title: "失败",
                    message: "申请下载失败！"
                },
                "-1": {
                    title: "失败",
                    message: "源文件不存在"
                }
            },
        }
    },
    record: {
        filter: {
            // -1预约，-2取消，-3以使用
            applyStatus: {
                '-1': '预约',
                '-2': '取消',
                '-3': '已使用',
            },
            // 干预标记，0正常，1到时不上机，2提前下机,3拒绝申请,4故障
            adminMark: {
                '0': '正常',
                '1': '到时不上机',
                '2': '提前下机',
                '3': '拒绝申请',
                '4': '故障',
            },
        },
        columns: {
            pcName: "机器名称",
            applyTimes: "申请时间",
            applyCode: "申请码",
            applyTimes: "申请时间",
            applyStatus: "申请状态",
            adminMark: "审批状态",
            applyDateStr: "申请时间"
        },
        submitForms: {
            remarks: {
                label: "备注",
                placeholder: "请输入备注",
                message: {
                    required: "请输入备注",
                }
            },
            webName: {
                label: "网站名称",
                placeholder: "请输入网站名称",
                message: {
                    required: "请输入网站名称",
                }
            },
            website: {
                label: "网址",
                placeholder: "请输入网址",
                message: {
                    required: "请输入网址",
                }
            },
            logoFile: {
                label: "logo",
                placeholder: "请填写logo",
                message: {
                    required: "请输入logo",
                }
            },
        }

    },
    users: {
        add: { 'title': "添加用户" },
        update: { 'title': "编辑用户" },
        filter: {
            // 状态 1正常 -1停用
            state: {
                '1': '正常',
                '-1': '停用',
            },
            // 权限，1管理员，2用户
            jurisdiction: {
                '1': '管理员',
                '2': '用户',
            },
        },
        columns: {
            loginName: "登录名",
            userName: "用户姓名",
            idNumber: "证件号",
            phone: "手机号",
            state: "状态",
            jurisdiction: "用户类型",
        },
        submitForms: {
            idNumber: {
                label: "证件号",
                placeholder: "请输入证件号",
                message: {
                    required: "请输入证件号",
                }
            },
            userName: {
                label: "用户姓名",
                placeholder: "请输入用户姓名",
                message: {
                    required: "请输入用户姓名",
                }
            },
            loginName: {
                label: "登录名",
                placeholder: "请输入登录名",
                message: {
                    required: "请输入登录名",
                }
            },
            phone: {
                label: "手机号",
                placeholder: "请输入手机号",
                message: {
                    required: "请输入手机号",
                }
            },
            jurisdiction: {
                label: "用户类型",
                placeholder: "请选择用户类型",
                message: {
                    required: "请选择用户类型",
                }
            },
        }

    },
    bookings: {
        filter: {
            // -1预约，-2取消，-3以使用
            applyStatus: {
                '-1': '预约',
                '-2': '取消',
                '-3': '已使用',
            },
            // 干预标记，0正常，1到时不上机，2提前下机,3拒绝申请,4故障
            adminMark: {
                '0': '正常',
                '1': '到时不上机',
                '2': '提前下机',
                '3': '拒绝申请',
                '4': '故障',
            },
        },
        columns: {
            userName: "用户名称",
            pcId: "机器编号",
            pcName: "机器名称",
            phone: "手机",
            applyTimes: "申请时间",
            applyCode: "申请码",
            applyTimes: "申请时间",
            applyStatus: "申请状态",
            adminMark: "审批状态",
            applyDateStr: "申请时间"
        },

    },

    termical: {
        add: { 'title': "添加机器" },
        update: { 'title': "编辑机器" },
        filter: {
            // 1正常，-1故障,-2停用删除设备
            state: {
                '-1': '故障',
                '-2': '停用',
                '1': '正常',
            },
        },
        columns: {
            id: "机器编号",
            pcName: "机器名称",
            state: "机器状态"
        },
        submitForms: {
            pcName: {
                label: "机器名称",
                placeholder: "请输入机器名称",
                message: {
                    required: "请输入机器名称",
                }
            },
            state: {
                label: "状态",
                placeholder: "请选择状态",
                message: {
                    required: "请选择状态",
                }
            },
        }

    },

    dashboard: {
        filter: {},
        columns: {
            pcid: "机器编号",
            pacName: "机器名称",
            state: "机器状态"
        },
        submitForms: {
            pcName: {
                label: "机器名称",
                placeholder: "请输入机器名称",
                message: {
                    required: "请输入机器名称",
                }
            },
        }

    },
}