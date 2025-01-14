import React, { Suspense, useEffect } from 'react'
import { useRoutes } from 'react-router-dom'
import roureConfig from './routes/index'
import { useDispatch,useSelector } from 'react-redux'
import type {RootState,AppDispatch} from './store'
import { getInfo } from './store/models/info'
import { getMenuList } from './store/models/menulist'
 
const App: React.FC = () => {
  const routes = useRoutes(roureConfig)
  const dispatch = useDispatch<AppDispatch>()
  // const info = useSelector((state:RootState)=>state.info.info)
  // const menuList = useSelector((state:RootState)=>state.menuList.menuList)
  // console.log('用户信息',info)
  // console.log('权限列表',menuList)
  useEffect(()=>{
      dispatch(getInfo())
      dispatch(getMenuList())
  },[])
  return (
    <Suspense fallback={<div>Loading...</div>}>
      {routes}
    </Suspense>
  );
};
export default App;