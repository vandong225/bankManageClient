import { observer } from 'mobx-react';
import { useRouter } from 'next/router';
import React from 'react';
import {
  Button, Col, Container, Form, Row, Table,
} from 'react-bootstrap';
import { StoreContext } from 'src/StoreProvider';

const detail = ({ cid }) => {
  const store = React.useContext(StoreContext);
  React.useEffect(() => {
    store.getCustomer(cid);
  }, []);
  const { customer, isLoading } = store;
  const {
    address, dob, fullName,
    id, idCard
  } = customer;
  const Router = useRouter();
  return (
    <Container>
      <Row>
        <Button
          type="submit"
          onClick={() => Router.push('/customer')}
        >
          Back
        </Button>
      </Row>

      <h4>Thông tin chi tiết</h4>
      <Table striped bordered hover>
        <tbody>
          <tr>
            <td>Mã khách hàng</td>
            <td>{id}</td>
          </tr>
          <tr>
            <td>Họ và tên</td>
            <td>{fullName.fullName}</td>
          </tr>
          <tr>
            <td>Chứng minh thư</td>
            <td>{idCard}</td>
          </tr>
          <tr>
            <td>Ngày Sinh</td>
            <td>{dob}</td>
          </tr>
          <tr>
            <td>Địa chỉ</td>
            <td>{address.fullAdress}</td>
          </tr>
        </tbody>
      </Table>
    </Container>
  );
};

detail.getInitialProps = ({ query: { cid } }) => {
  return { cid };
};

export default observer(detail);
