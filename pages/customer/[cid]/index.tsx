import { observer } from 'mobx-react';
import { useRouter } from 'next/router';
import React from 'react';
import {
  Button, Col, Form, Row, Toast,
} from 'react-bootstrap';
import { StoreContext } from 'src/StoreProvider';

const edit = ({ cid }) => {
  const store = React.useContext(StoreContext);
  React.useEffect(() => {
    store.getCustomer(cid);
  }, []);
  const { customer, isLoading } = store;
  const {
    address, dob, fullName,
    id, idCard,
  } = customer;
  const Router = useRouter();
  const [toast, setToast] = React.useState(false);
  const handleSave = async () => {
    if (cid === 'new') {
      const process = await store.saveCustomer();
      if (!process) {
        setToast(true);
        return;
      }
    } else {
      await store.updateCustomer(cid);
    }
    Router.push('/customer');
  };

  return (
    <>
      <Button
        type="submit"
        onClick={() => Router.push('/customer')}
      >
        Back
      </Button>
      <div style={{ width: '100%' }}>
        { cid !== 'new' ? <h2>Sửa thông tin khách hàng</h2> : <h2>Thêm mới khách hàng</h2>}
      </div>
      <div>
        <Form>
          <Form.Group controlId="exampleForm.ControlInput1">
            <Row>
              <Col sm="4">
                <Form.Label>Họ</Form.Label>
                <Form.Control type="text" value={fullName.firstName} onChange={(e) => fullName.setFirstName(e.target.value)} />
              </Col>
              <Col sm="4">
                <Form.Label>Tên đệm</Form.Label>
                <Form.Control type="text" value={fullName.midName} onChange={(e) => fullName.setMidName(e.target.value)} />
              </Col>
              <Col sm="4">
                <Form.Label>Tên</Form.Label>
                <Form.Control type="text" value={fullName.lastName} onChange={(e) => fullName.setLastName(e.target.value)} />
              </Col>
            </Row>
            <Row>
              <Col sm="8">
                <Form.Label>Số Chứng minh thư</Form.Label>
                <Form.Control type="text" value={idCard} onChange={(e) => customer.setIdCard(e.target.value)} />
                <br />
                <h5>Địa chỉ</h5>
                <Form.Label>Đất nước</Form.Label>
                <Form.Control type="text" value={address.country} onChange={(e) => customer.address.setCountry(e.target.value)} />
                <Form.Label>Thành phố</Form.Label>
                <Form.Control type="text" value={address.city} onChange={(e) => customer.address.setCity(e.target.value)} />
                <Form.Label>Quận</Form.Label>
                <Form.Control type="text" value={address.district} onChange={(e) => customer.address.setDistrict(e.target.value)} />
                <Form.Label>Đường</Form.Label>
                <Form.Control type="text" value={address.street} onChange={(e) => customer.address.setStreet(e.target.value)} />
                <Form.Label>Mô tả thêm</Form.Label>
                <Form.Control as="textarea" row={3} value={address.des} onChange={(e) => customer.address.setDes(e.target.value)} />
              </Col>
              <Col sm="4">
                <Form.Label>Ngày tháng năm sinh</Form.Label>
                <Form.Control type="date" value={dob} onChange={(e) => customer.setDob(e.target.value)} />
              </Col>
            </Row>
          </Form.Group>
        </Form>
        <Col xs="auto">
          <Button className="d-block ml-auto" type="submit" onClick={handleSave} disabled={isLoading}>Save</Button>
        </Col>
      </div>
      <Toast onClose={() => setToast(false)} show={toast} delay={3000} autohide>
        <Toast.Header >Không thể lưu</Toast.Header >
        <Toast.Body>Số chứng minh thư đã tồn tại</Toast.Body>
      </Toast>
    </>
  );
};

edit.getInitialProps = ({ query: { cid } }) => {
  return { cid };
};

export default observer(edit);
