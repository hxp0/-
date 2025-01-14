import React, { Suspense, useEffect, useState } from 'react'
import { useRoutes,Navigate } from 'react-router-dom'
import roureConfig from './routes/index'
import { useDispatch,useSelector } from 'react-redux'
import type {RootState,AppDispatch} from './store'
import { getInfo } from './store/models/info'
import { getMenuList } from './store/models/menulist'
 
const App: React.FC = () => {
  const [route,setRouter] = useState([...roureConfig])
  const routes = useRoutes(route)
  const dispatch = useDispatch<AppDispatch>()
  // const info = useSelector((state:RootState)=>state.info.info)
  const menuList = useSelector((state:RootState)=>state.menuList.menuList)
  // console.log('用户信息',info)
  console.log('权限列表',menuList)
  useEffect(()=>{
      dispatch(getInfo())
      dispatch(getMenuList())
  },[])
  useEffect(()=>{
    const newRoute = [...roureConfig]
   if(menuList.length!==0){
    newRoute[0] = {
      path: '/',
      element: <Navigate to={menuList[0].path}/>,
    }
   }else{
    roureConfig[0] = {
      path: '/',
      element: <Navigate to="/404"/>,
    }
   }
   setRouter(newRoute)
  },[menuList])
  return (
    <Suspense fallback={<div>Loading...</div>}>
      {routes}
    </Suspense>
  );
};
export default App;