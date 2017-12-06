import Vue from 'vue'
import Router from 'vue-router'
Vue.use(Router)


const Login = function (resolve) {
  require.ensure([],function () {
    resolve(require('../components/Login/Login'))
  })
}

const Index = function (resolve) {
  require.ensure([],function () {
    resolve(require('../components/Index/Index'))
  })
}  

//楼盘管理
const EstateManagement = function (resolve) {
  require.ensure([],function () {
    resolve(require('../components/EstateManagement/EstateManagement'))
  })
} 

//任务管理
const AcquisitionManagement = function (resolve) {
  require.ensure([],function () {
    resolve(require('../components/AcquisitionManagement/AcquisitionManagement'))
  })
}  

const ExamineManagement = function (resolve) {
  require.ensure([],function () {
    resolve(require('../components/ExamineManagement/ExamineManagement'))
  })
}   

const AcquisitionViewAndEdit = function (resolve) {
  require.ensure([],function () {
    resolve(require('../components/AcquisitionViewAndEdit/AcquisitionViewAndEdit'))
  })
}  

const ExamineViewAndCreate = function (resolve) {
  require.ensure([],function () {
    resolve(require('../components/ExamineViewAndCreate/ExamineViewAndCreate'))
  })
}

//账户管理
const RoleManagement = function (resolve) {
  require.ensure([],function () {
    resolve(require('../components/RoleManagement/RoleManagement'))
  })
}  

const AdministratorsManagement = function (resolve) {
  require.ensure([],function () {
    resolve(require('../components/AdministratorsManagement/AdministratorsManagement'))
  })
}  

const AccountManagement = function (resolve) {
  require.ensure([],function () {
    resolve(require('../components/AccountManagement/AccountManagement'))
  })
}  

const FeedbackManagement = function (resolve) {
  require.ensure([],function () {
    resolve(require('../components/FeedbackManagement/FeedbackManagement'))
  })
}

const AcquisitionCreate = function (resolve) {
  require.ensure([],function () {
    resolve(require('../components/AcquisitionCreate/AcquisitionCreate'))
  })
}

const AdministratorCreateAndEdit = function (resolve) {
  require.ensure([],function () {
    resolve(require('../components/AdministratorCreateAndEdit/AdministratorCreateAndEdit'))
  })
}  

const PhotographStatistics = function (resolve) {
  require.ensure([],function () {
    resolve(require('../components/PhotographStatistics/PhotographStatistics'))
  })
}  

const AuditStatistics = function (resolve) {
  require.ensure([],function () {
    resolve(require('../components/AuditStatistics/AuditStatistics'))
  })
}


let router = new Router({
  mode: 'hash',
  base: __dirname,

  routes: [
    { path: '/', redirect: '/login' },
    {
      path: '/login',
      component: Login
    },
    {
    	path:'/index',
    	component:Index,
      children:[
        {
          path:'/index/acquisitionmanagement',
          component:AcquisitionManagement
        },
        {
          path:'/index/examinemanagement',
          component:ExamineManagement
        },
        {
          path:'/index/rolemanagement',
          component:RoleManagement
        },
        {
          path:'/index/administratorsmanagement',
          component:AdministratorsManagement
        },
        {
          path:'/index/accountmanagement',
          component:AccountManagement
        },
        {
          path:'/index/feedbackmanagement',
          component:FeedbackManagement
        },
        {
          path:'/index/acquisitioncreate',
          component:AcquisitionCreate
        },
        {
          path:'/index/administratorcreateandedit',
          component:AdministratorCreateAndEdit
        },
        {
          path:'/index/PhotographStatistics',
          component:PhotographStatistics
        },
        {
          path:'/index/auditstatistics',
          component:AuditStatistics
        },
        {
          path:'/index/acquisitionviewandedit',
          component:AcquisitionViewAndEdit
        },
        {
          path:'/index/examineviewAndcreate',
          component:ExamineViewAndCreate
        },
        {
          path:'/index/estatemanagement',
          component:EstateManagement
        }
      ]
    }
  ]
})

// router.beforeEach( (to,from,next) => {
//   next()
// })

export default router;
