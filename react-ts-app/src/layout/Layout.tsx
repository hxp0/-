import {
  LogoutOutlined,
} from '@ant-design/icons';
import {
  PageContainer,
  ProCard,
  ProConfigProvider,
  ProLayout,
} from '@ant-design/pro-components';
import {
  ConfigProvider,
  Dropdown,
  message
} from 'antd';
import React, {  useMemo } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { useSelector } from 'react-redux'
import type { RootState } from '../store'
import {
  CrownFilled,
  HomeOutlined
} from '@ant-design/icons'

import { logoutApi } from '../services'


const Layout: React.FC<{ children: React.ReactNode }> = (props) => {
  const location = useLocation()
  const navigate = useNavigate()
  const menuList = useSelector((state: RootState) => state.menuList.menuList)
  const info = useSelector((state: RootState) => state.info.info)
  const list = useMemo(()=>{
    const arr:any = {
      route:{
        path: '/',
        routes:[]
      }
    }
    if(menuList.length !==0){
      menuList.forEach((item:any)=>{
        arr.route.routes.push({
          path: item.path,
          name: item.name,
          icon: <CrownFilled />,
          routes:item.children.map((v:any)=>{
            return {
              path: v.path,
              name: v.name,
              icon: <CrownFilled />
            }
          })
        })
    })
  }
  arr.route.routes.unshift({
    path:'home',
    name:'首页',
    icon: <HomeOutlined />
  })
    return arr
  },[menuList])

  if (typeof document === 'undefined') {
    return <div />;
  }
  return (
    <div
      style={{
        height: '100vh',
        overflow: 'auto',
      }}
    >
      <ProConfigProvider hashed={false}>
        <ConfigProvider
          getTargetContainer={() => {
            return document.getElementById('test-pro-layout') || document.body;
          }}
        >
          <ProLayout
            prefixCls="my-prefix"
            bgLayoutImgList={[
              {
                src: 'https://img.alicdn.com/imgextra/i2/O1CN01O4etvp1DvpFLKfuWq_!!6000000000279-2-tps-609-606.png',
                left: 85,
                bottom: 100,
                height: '303px',
              },
              {
                src: 'https://img.alicdn.com/imgextra/i2/O1CN01O4etvp1DvpFLKfuWq_!!6000000000279-2-tps-609-606.png',
                bottom: -68,
                right: -45,
                height: '303px',
              },
              {
                src: 'https://img.alicdn.com/imgextra/i3/O1CN018NxReL1shX85Yz6Cx_!!6000000005798-2-tps-884-496.png',
                bottom: 0,
                left: 0,
                width: '331px',
              },
            ]}
            {...list}
            location={{
              pathname: location.pathname,
            }}
            token={{
              header: {
                colorBgMenuItemSelected: 'rgba(0,0,0,0.04)',
              },
            }}
            siderMenuType="group"
            menu={{
              collapsedShowGroupTitle: true,
            }}
            avatarProps={{
              src: info.avator ?? 'https://gw.alipayobjects.com/zos/antfincdn/efFD%24IOql2/weixintupian_20170331104822.jpg',
              size: 'small',
              title: info.username,
              render: (props, dom) => {
                return (
                  <Dropdown
                    menu={{
                      items: [
                        {
                          key: 'userinfo',
                          icon: <LogoutOutlined />,
                          label: '用户信息'
                        },
                        {
                          key: 'logout',
                          icon: <LogoutOutlined />,
                          label: '退出登录',
                          onClick:()=>{
                            logoutApi()
                            .then(()=>{
                                message.success('退出登录成功')
                                navigate('/user/login')
                                localStorage.removeItem('token')
                            })
                          }
                        }
                          
                      ]
                    }}
                  >
                    {dom}
                  </Dropdown>
                );
              }
            }}
            headerTitleRender={(logo, title, _) => {
              const defaultDom = (
                <a>
                  {logo}
                  {title}
                </a>
              );
              if (typeof window === 'undefined') return defaultDom;
              if (document.body.clientWidth < 1400) {
                return defaultDom;
              }
              if (_.isMobile) return defaultDom;
              return (
                <>
                  {defaultDom}
                  {/* <MenuCard /> */}
                </>
              );
            }}
            menuItemRender={(item, dom) => (
              <div onClick={() => {
                navigate(item?.path || '/404')
              }}>
                {dom}
              </div>
            )}
            fixSiderbar={true}
            layout="mix"
            splitMenus={true}
            
          >
            <PageContainer
              token={{
                paddingInlinePageContainerContent: 30,
              }}
              // subTitle="简单的描述"
            >
              <ProCard
                style={{
                  minHeight: 500,
                }}
              >
                {props.children}
              </ProCard>
            </PageContainer>
          </ProLayout>
        </ConfigProvider>
      </ProConfigProvider>
    </div>
  );
};

export default Layout
