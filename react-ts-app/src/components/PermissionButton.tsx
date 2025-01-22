import React from 'react'
import type { RootState } from '../store'
import { useSelector } from 'react-redux'

interface Props {
  perKey: string
  children: React.ReactNode
}

const PermissionButton: React.FC<Props> = ({ perKey, children }) => {
  const permissionList = useSelector((state: RootState)=>state.info.info.permission)
  
  const index = permissionList.findIndex(item=>item.path === perKey)

  if( index === -1 ){
    return null
  }else{
    return children
  }
};
export default PermissionButton;