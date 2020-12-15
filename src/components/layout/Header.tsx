import { useRouter } from 'next/router';
import React from 'react';
import {
  Button, Dropdown, Form, Nav, Navbar,
} from 'react-bootstrap';

const Header:React.FC = () => {
  const Router = useRouter();

  return (
    <Navbar bg="primary" variant="dark">
      <Navbar.Brand href="/"><h3 style={{ color: 'black' }}>Quản lý</h3> chi nhanh ngân hàng</Navbar.Brand>
      <Nav className="mr-auto">
        {/* <Nav.Link href="#home">Home</Nav.Link>
        <Nav.Link href="#features">Features</Nav.Link>
        <Nav.Link href="#pricing">Pricing</Nav.Link> */}
      </Nav>
      <Form inline>
        <Dropdown>
          <Dropdown.Toggle variant="success" id="dropdown-basic">
            Quản lý tài khoản
          </Dropdown.Toggle>

          <Dropdown.Menu>
            <Dropdown.Item onClick={() => Router.push('/debit/thongke')}>Liệt kê giao dịch</Dropdown.Item>
            <Dropdown.Item onClick={() => Router.push('/credit/listDebt')}>Thống kê nợ</Dropdown.Item>
            <Dropdown.Item onClick={() => Router.push('/debit/top10')}>Top 10 gửi tiền</Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      </Form>
    </Navbar>
  );
};

export default Header;
