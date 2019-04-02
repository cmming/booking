const _import = require('./_import_' + process.env.NODE_ENV)
    // import HelloWorld from '@/components/HelloWorld'
import adminLayout from '@/views/common/layout/index'

export default [{
        path: '/login',
        name: 'Login',
        component: _import('common/login/index'),
    },
    { path: '*', redirect: '/login', },
]