// 路由守卫
import router from '@/router'
import storage from '@/utils/storage';
const whiteList = ['/login']

// 前置 守卫
router.beforeEach((to, from, next) => {
    let userInfo = storage.get('userInfo')
    if (userInfo && Object.keys(userInfo).length) {
        if (to.path === '/login') {
            if (userInfo.jurisdiction == 1) {
                next({ path: '/admin/dashboard' })
            } else if (userInfo.jurisdiction == 2) {
                next({ path: '/booking' })
            }
        } else {
            next()
        }
    } else {
        if (to.path === '/login') {
            next();
        } else {
            next({ path: '/login' })
        }
    }
})