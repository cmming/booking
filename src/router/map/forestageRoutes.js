const _import = require('./_import_' + process.env.NODE_ENV)
import adminLayout from '@/views/common/layout/index'
export default [{
    path: '/',
    component: adminLayout,
    children: [{
        path: 'booking',
        name: 'booking',
        component: _import('forestage/booking/index'),
        meta: { title: 'adminMain', type: 'forestage' }
    }, {
        path: 'record',
        name: 'record',
        component: _import('forestage/record/index'),
        meta: { title: 'record', type: 'forestage' }
    }]
}]