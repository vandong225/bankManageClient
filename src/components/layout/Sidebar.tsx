import React from 'react';
import { Nav } from 'react-bootstrap';
import { observer } from 'mobx-react';
import { useRouter } from 'next/router';

const Sidebar = () => {
  const Router = useRouter();
  return (
    <>

      <Nav
        className="col-md-12 sidebar"
      >
        <div className="sidebar-sticky pl-3">
          <Nav.Item>
            <div className="item-sidebar">
              <Nav.Link onClick={() => Router.push('/employee')}>Quản lý nhân viên</Nav.Link>
            </div>
          </Nav.Item>
          <Nav.Item>
            <div className="item-sidebar">
              <Nav.Link onClick={() => Router.push('/customer')}>Quản lý khách hàng</Nav.Link>
            </div>
          </Nav.Item>
          <Nav.Item>
            <div className="item-sidebar">
              <Nav.Link onClick={() => Router.push('/credit')}>Quản lý tài khoản tín dụng</Nav.Link>
            </div>
          </Nav.Item>
          <Nav.Item>
            <div className="item-sidebar">
              <Nav.Link onClick={() => Router.push('/debit')}>Quản lý tài khoản gửi tiền</Nav.Link>
            </div>
          </Nav.Item>
        </div>
      </Nav>

    </>
  );
};
export default observer(Sidebar);
