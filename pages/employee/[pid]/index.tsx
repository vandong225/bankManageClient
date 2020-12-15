import { observer } from 'mobx-react';
import { useRouter } from 'next/router';
import React from 'react';
import { Button, Col, Form, Row, Toast } from 'react-bootstrap';
import { PositionType } from 'src/model/employee';
import { StoreContext } from 'src/StoreProvider';

const edit = ({ pid }) => {
  const store = React.useContext(StoreContext);
  React.useEffect(() => {
    store.getEmployee(pid);
  }, []);
  const { employee, isLoading } = store;
  const {
    address, dob, fullName,
    id ,idCard, level, position, year,
  } = employee;
  const Router = useRouter();
  const [toast, setToast] = React.useState(false);

  const handleSave = async () => {
    if (pid === 'new') {
      const res = await store.saveEmployee();
      if(!res) {
        setToast(true);
      return;
      }
    } else {
      await store.updateEmployee(pid);
    }
    Router.push('/');
  };
  return (
    <>
     <Toast onClose={() => setToast(false)} show={toast} delay={3000} autohide>
      <Toast.Header >Không thể lưu</Toast.Header >

        <Toast.Body>Số chứng minh thư đã tồn tại</Toast.Body>
      </Toast>
      <Button
        type="submit"
        onClick={() => Router.push('/')}
      >
        Back
      </Button>
      <div style={{ width: '100%' }}>
        { pid !== 'new' ? <h2>Sửa thông tin nhân viên</h2> : <h2>Thêm mới nhân viên</h2>}
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
                <Form.Control type="text" value={idCard} onChange={(e) => employee.setIdCard(e.target.value)} />
                <br />
                <h5>Địa chỉ</h5>
                <Form.Label>Đất nước</Form.Label>
                <Form.Control type="text" value={address.country} onChange={(e) => employee.address.setCountry(e.target.value)} />
                <Form.Label>Thành phố</Form.Label>
                <Form.Control type="text" value={address.city} onChange={(e) => employee.address.setCity(e.target.value)} />
                <Form.Label>Quận</Form.Label>
                <Form.Control type="text" value={address.district} onChange={(e) => employee.address.setDistrict(e.target.value)} />
                <Form.Label>Đường</Form.Label>
                <Form.Control type="text" value={address.street} onChange={(e) => employee.address.setStreet(e.target.value)} />
                <Form.Label>Mô tả thêm</Form.Label>
                <Form.Control as="textarea" row={3} value={address.des} onChange={(e) => employee.address.setDes(e.target.value)} />
              </Col>
              <Col sm="4">
                <Form.Label>Ngày tháng năm sinh</Form.Label>
                <Form.Control type="date" value={dob} onChange={(e) => employee.setDob(e.target.value)} />
                <Form.Label>Trình độ</Form.Label>
                <Form.Control type="number" value={level} onChange={(e) => employee.setLevel(parseInt(e.target.value, 10))} />
                <Form.Label>Số năm công tác</Form.Label>
                <Form.Control type="number" value={year} onChange={(e) => employee.setYear(parseInt(e.target.value, 10))} />
                <Form.Label>Vị trí</Form.Label>
                <Form.Control as="select" value={position} onChange={(e) => employee.setPosition(e.target.value, 10)}>
                  {PositionType.map((pos) => <option value={pos.value}>{pos.label}</option>)}

                </Form.Control>
              </Col>
            </Row>
          </Form.Group>
        </Form>
        <Col xs="auto">
          <Button className="d-block ml-auto" type="submit" onClick={handleSave} disabled={isLoading}>Save</Button>
        </Col>
      </div>
      <Toast onClose={() => setToast(false)} show={toast} delay={3000} autohide>
        <Toast.Header />
        <Toast.Body>Số chứng minh thư đã tồn tại</Toast.Body>
      </Toast>
    </>
  );
};

edit.getInitialProps = ({ query: { pid } }) => {
  return { pid };
};

export default observer(edit);
