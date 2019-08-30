import React, { useState } from 'react';
import { Layout, Menu, Icon } from 'antd';
import { Link, BrowserRouter } from 'react-router-dom';

const { Header, Sider, Content } = Layout;

const BaseLayout = (props: any) => {
  const [collapsed, setCollapsed] = useState(false);
  const pathName = window.location.pathname.split('/')[1];
  return (
    <BrowserRouter>
      <Layout>
        <Sider trigger={null} collapsible collapsed={collapsed}>
          <div className="logo" />
          <Menu theme="dark" mode="inline" defaultSelectedKeys={[pathName]}>
            <Menu.Item key="BizSelect">
              <Link to="/BizSelect">
                <Icon type="snippets" />
                <span>业务选择器</span>
              </Link>
            </Menu.Item>
            <Menu.Item key="OrderTable">
              <Link to="/OrderTable">
                <Icon type="unordered-list" />
                <span>排序表格</span>
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
