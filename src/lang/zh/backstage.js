export const backstage = {
    table: {
        handleColumn: '操作',
        delete: "删除",
        detail: "详情",
        edit: "编辑",
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
            applyTimes:"申请时间",
            applyCode:"申请码",
            applyTimes:"申请时间",
            applyStatus:"申请状态",
            adminMark:"审批状态",
            applyDateStr:"申请时间"
        },
        submitForms:{
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
}