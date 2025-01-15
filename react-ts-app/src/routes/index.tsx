import Layout from '../layout/Layout'
import Login from '../pages/login/Login'
import NotFound from '../pages/notFound/NotFound'
import Forbidden from '../pages/403/Forbidden'
import Record from '../pages/exam/record/Record'
import Create from '../pages/exam/create/Create'
import { lazy } from 'react'
import { Navigate } from 'react-router-dom'
import Permission from './Permission'

export const Home = lazy(()=> import('../pages/home/Home'))
export const ClassList = lazy(()=> import('../pages/class/classList/ClassList'))
export const Student = lazy(()=> import('../pages/class/student/Student'))
export const Class = lazy(()=> import('../pages/class/class/Class'))
export const ClassDetail = lazy(()=> import('../pages/class/classDetail/ClassDetail'))

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
  { path: '/', element: <Navigate to="/home" /> },
  { path: '/home', element: <Home />, layout: true },
  { path: '/exam', element: <Navigate to="/exam/record" /> },
  { path: '/exam/record', element: <Record />, layout: true, permission: true },
  { path: '/exam/create', element: <Create />, layout: true, permission: true },
  { path: '/manage-group', element: <Navigate to="/manage-group/group-list" /> },
  { path: '/manage-group/group-list', element: <ClassList />, layout: true, permission: true },
  { path: '/manage-group/group-students', element: <Student />, layout: true, permission: true },
  { path: '/manage-group/group-class', element: <Class />, layout: true, permission: true },
  { path: '/group-detail/:id', element: <ClassDetail />, layout: true, permission: true },
  { path: '/userManage', element: <Navigate to="/userManage/system" /> },
  { path: '/userManage/system', element: <Role />, layout: true, permission: true },
  { path: '/userManage/menuManage', element: <Power />, layout: true, permission: true },
  { path: '/userManage/personal', element: <Mine />, layout: true, permission: true },
  { path: '/userManage/userOptions', element: <User />, layout: true, permission: true },
  { path: '/userManage/manage-page', element: <UserManage />, layout: true, permission: true },
  { path: '/question', element: <Navigate to='/question/item-bank' /> },
  { path: '/question/item-bank', element: <ItemBank />, layout: true, permission: true },
  { path: '/question/create-item', element: <AddItem />, layout: true, permission: true },
  { path: '/paper', element: <Navigate to='/paper/paper-bank' /> },
  { path: '/paper/paper-bank', element: <PaperBank />, layout: true, permission: true },
  { path: '/paper/create-paper', element: <AddPaper />, layout: true, permission: true },
  { path: '/user/login', element: <Login /> },
  { path: '*', element: <NotFound /> },
  { path: '/403', element: <Forbidden /> }
]

export default routes.map(route => {
  if( route.layout ){
    route.element = <Layout>{route.element}</Layout>
  }
  if( route.permission ){
    route.element = <Permission>{route.element}</Permission>
  }
  return route
})