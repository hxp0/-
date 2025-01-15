import React from 'react'
import { RootState } from '../store'
import { useSelector } from 'react-redux'
import { useLocation, Navigate }  from 'react-router-dom'

interface Props {
  children?: React.ReactNode
}

const Permission: React.FC<Props> = ( props ) => {
  const location = useLocation()
  const permission = useSelector((state: RootState) => state.info.info.permission ) || JSON.parse(localStorage.getItem('permission')!)
  const index = permission.findIndex(item => item.path === location.pathname )

  console.log(location.pathname)
  console.log(index)

  if( index === -1 ){
    return <Navigate to='/403' />
  }
  return (
    <div>
      {props.children}
    </div>
  );
};
export default Permission;