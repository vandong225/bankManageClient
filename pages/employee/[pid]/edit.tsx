import { observer } from 'mobx-react';
import React from 'react';
import { Button, Col, Form, Row } from 'react-bootstrap';
import { PositionType } from 'src/model/employee';
import { StoreContext } from 'src/StoreProvider';

const edit = ({pid}) => {
  const store = React.useContext(StoreContext);
  React.useEffect(() => {
    store.getEmployee(pid);
  }, []);
  const { employee, isLoading } = store;
  const {
    address, dob, fullName,
    id, idCard, level, position, year,
  } = employee;
  return (
    <>
      <h2>Edit Employee</h2>
      <Form>
        <Form.Group controlId="exampleForm.ControlInput1">
          <Row>
            <Col sm="4">
              <Form.Label>Họ</Form.Label>
              <Form.Control type="text" value={fullName.firstName} />
            </Col>
            <Col sm="4">
              <Form.Label>Tên đệm</Form.Label>
              <Form.Control type="text" value={fullName.midName} />
            </Col>
            <Col sm="4">
              <Form.Label>Tên</Form.Label>
              <Form.Control type="text" value={fullName.lastName} />
            </Col>
          </Row>
          <Row>
            <Col sm="8">
              <Form.Label>Số Chứng minh thư</Form.Label>
              <Form.Control type="text" value={idCard} />
              <br />
              <h4>Địa chỉ</h4>
              <Form.Label>Đất nước</Form.Label>
              <Form.Control type="text" value={address.country} />
              <Form.Label>Thành phố</Form.Label>
              <Form.Control type="text" value={address.city} />
              <Form.Label>Quận</Form.Label>
              <Form.Control type="text" value={address.district} />
              <Form.Label>Đường</Form.Label>
              <Form.Control type="text" value={address.street} />
              <Form.Label>Mô tả thêm</Form.Label>
              <Form.Control as="textarea" row={3} value={address.des} />
            </Col>
            <Col sm="4">
              <Form.Label>Ngày tháng năm sinh</Form.Label>
              <Form.Control type="date" value={dob} />
              <Form.Label>Trình độ</Form.Label>
              <Form.Control type="text" value={level} />
              <Form.Label>Số năm công tác</Form.Label>
              <Form.Control type="text" value={year} />
              <Form.Label>Vị trí</Form.Label>
              <Form.Control as="select" value={position}>
                {PositionType.map((pos) => <option value={pos.value}>{pos.label}</option>)}

              </Form.Control>
            </Col>
          </Row>
        </Form.Group>
      </Form>
      <Col xs="auto">
        <Button className="d-block ml-auto" type="submit">Save</Button>
      </Col>
    </>
  );
};

edit.getInitialProps = ({ query: { pid } }) => {
  return { pid };
};

export default observer(edit);
