import { observer } from 'mobx-react';
import { useRouter } from 'next/router';
import React from 'react';
import {
  Button, Col, Container, Form, Row, Spinner, Table,
} from 'react-bootstrap';
import { StoreContext } from 'src/StoreProvider';

const detail = ({ pid }) => {
  const store = React.useContext(StoreContext);
  React.useEffect(() => {
    store.getEmployee(pid);
  }, []);
  const [fromDate, setFromDate] = React.useState('');
  const [toDate, setToDate] = React.useState('');
  const [salery, setSallery] = React.useState();
  const { employee, isLoading } = store;
  const {
    address, dob, fullName,
    id, idCard, level, position, year,
  } = employee;
  const Router = useRouter();
  const handleSalery = async () => {
    if (fromDate && toDate && id) {
      const saleryTemp = await store.getSaleryEmployee(id, fromDate, toDate);
      setSallery(saleryTemp);
    }
  };
  return (
    <Container>
      <Row>
        <Button
          type="submit"
          onClick={() => Router.push('/')}
        >
          Back
        </Button>
      </Row>
      {position === 'staff'
    && (
    <>
      <Form.Label><h4>Chọn ngày tính lương</h4></Form.Label>
      <Row>
        <Col md={4}>
          <Form.Label>Từ ngày</Form.Label>
          <Form.Control type="date" value={fromDate} onChange={(e) => setFromDate(e.target.value)} />

        </Col>
        <Col md={4}>
          <Form.Label>Tới ngày</Form.Label>
          <Form.Control type="date" value={toDate} onChange={(e) => setToDate(e.target.value)} />

        </Col>
        <Col md={4}>
          <Form.Label>Salery {fullName.fullName}: {salery && (<>{salery} VNĐ</>)} </Form.Label>
          <br />
          <Button
            type="submit"
            onClick={handleSalery}
          >
            Tính lương
          </Button>

        </Col>

      </Row>
    </>
    )}

      <h4>Thông tin chi tiết</h4>
      <Table striped bordered hover>
        <tbody>
          <tr>
            <td>Mã nhân viên</td>
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
            <td>Vị trí</td>
            <td>{position}</td>
          </tr>
          <tr>
            <td>Thâm niên</td>
            <td>{year}</td>
          </tr>
          <tr>
            <td>Trình độ</td>
            <td>{level}</td>
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

detail.getInitialProps = ({ query: { pid } }) => {
  return { pid };
};

export default observer(detail);
