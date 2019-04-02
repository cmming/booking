const _import = require('./_import_' + process.env.NODE_ENV)
import adminLayout from '@/views/common/layout/index'

export default [{
    path: '/admin',
    component: adminLayout,
    children: [{
        path: 'dashboard',
        name: 'dashboard',
        component: _import('backstage/dashboard/index'),
        meta: { title: 'dashboard', type: 'backstage' }
    },{
        path: 'users',
        name: 'users',
        component: _import('backstage/users/index'),
        meta: { title: 'users', type: 'backstage' }
    },{
        path: 'bookings',
        name: 'bookings',
        component: _import('backstage/bookings/index'),
        meta: { title: 'bookings', type: 'backstage' }
    },{
        path: 'termical',
        name: 'termical',
        component: _import('backstage/termical/index'),
        meta: { title: 'termical', type: 'backstage' }
    }]
}]