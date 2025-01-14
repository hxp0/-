import Layout from '../layout/Layout'
import Login from '../pages/login/Login'
import NotFound from '../pages/notFound/NotFound'
import Record from '../pages/exam/record/Record'
import Create from '../pages/exam/create/Create'
import { lazy } from 'react'
import { Navigate } from 'react-router-dom'

export const ClassList = lazy(()=> import('../pages/class/classList/ClassList'))
export const Student = lazy(()=> import('../pages/class/student/Student'))

export const Role = lazy(()=> import('../pages/system/role/Role'))
export const Power = lazy(()=> import('../pages/system/power/Power'))
export const Mine = lazy(()=> import('../pages/system/mine/Mine'))
export const User = lazy(()=> import('../pages/system/user/User'))
export const UserManage = lazy(()=> import('../pages/system/userManage/UserManage'))

export const ItemBank = lazy(()=> import('../pages/questions/itemBank/ItemBank'))
export const AddItem = lazy(()=> import('../pages/questions/addItem/AddItem'))

export const PaperBank = lazy(()=> import('../pages/testPaper/paperBank/PaperBank'))
export const AddPaper = lazy(()=> import('../pages/testPaper/addPaper/AddPaper'))

const routes =  [
  { path: '/', element: <Navigate to="/exam" /> },
  { path: '/exam', element: <Navigate to="/exam/record" /> },
  { path: '/exam/record', element: <Record />, home: true },
  { path: '/exam/create', element: <Create />, home: true  },
  { path: '/manage-group', element: <Navigate to="/manage-group/group-list" /> },
  { path: '/manage-group/group-list', element: <ClassList />, home: true  },
  { path: '/manage-group/group-students', element: <Student />, home: true  },
  { path: '/userManage', element: <Navigate to="/userManage/system" /> },
  { path: '/userManage/system', element: <Role />, home: true  },
  { path: '/userManage/menuManage', element: <Power />, home: true  },
  { path: '/userManage/personal', element: <Mine />, home: true  },
  { path: '/userManage/userOptions', element: <User />, home: true  },
  { path: '/userManage/manage-page', element: <UserManage />, home: true  },
  { path: '/question', element: <Navigate to='/question/item-bank' /> },
  { path: '/question/item-bank', element: <ItemBank />, home: true  },
  { path: '/question/create-item', element: <AddItem />, home: true  },
  { path: '/paper', element: <Navigate to='/paper/paper-bank' /> },
  { path: '/paper/paper-bank', element: <PaperBank />, home: true  },
  { path: '/paper/create-paper', element: <AddPaper />, home: true  },
  { path: '/user/login', element: <Login /> },
  { path: '*', element: <NotFound /> }
]

export default routes.map(route => {
  if( route.home ){
    return {
      ...route,
      element: <Layout>{route.element}</Layout>
    }
  }
  return route
})