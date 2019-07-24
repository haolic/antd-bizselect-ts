import React, { useState } from 'react';
import { Layout, Menu, Icon } from 'antd';
import { Link, BrowserRouter } from 'react-router-dom';

const { Header, Sider, Content } = Layout;

const BaseLayout = (props: any) => {
  const [collapsed, setCollapsed] = useState(false);
  return (
    <BrowserRouter>
      <Layout>
        <Sider trigger={null} collapsible collapsed={collapsed}>
          <div className="logo" />
          <Menu theme="dark" mode="inline" defaultSelectedKeys={['1']}>
            <Menu.Item key="1">
              <Link to="/BizSelect">
                <Icon type="user" />
                <span>BizSelect</span>
              </Link>
            </Menu.Item>
          </Menu>
        </Sider>
        <Layout>
          <Header style={{ background: '#fff', padding: '0 15px 0' }}>
            <Icon
              className="trigger"
              type={collapsed ? 'menu-unfold' : 'menu-fold'}
              onClick={() => {
                setCollapsed(!collapsed);
              }}
            />
          </Header>
          <Content
            style={{
              margin: '24px 16px',
              padding: 24,
              background: '#fff',
              minHeight: 280
            }}
          >
            {props.children}
          </Content>
        </Layout>
      </Layout>
    </BrowserRouter>
  );
};

export default BaseLayout;
