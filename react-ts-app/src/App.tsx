import React, { Suspense, useEffect} from 'react'
import { useRoutes } from 'react-router-dom'
import roureConfig from './routes/index'
import { useDispatch } from 'react-redux'
import type {AppDispatch} from './store'
import { getInfo } from './store/models/info'
import { getMenuList } from './store/models/menulist'
import { getQuestionType } from './store/models/questionType'
 
const App: React.FC = () => {
  const routes = useRoutes(roureConfig)
  const dispatch = useDispatch<AppDispatch>()

  useEffect(()=>{
      dispatch(getInfo())
      if( localStorage.getItem('loginType') === 'teacher' ){
        dispatch(getMenuList()) 
        dispatch(getQuestionType())
      }
  },[])
  return (
    <Suspense fallback={<div>Loading...</div>}>
      {routes}
    </Suspense>
  );
};
export default App;