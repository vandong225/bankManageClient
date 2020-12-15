import { observer } from 'mobx-react';
import React from 'react';
import {
  Button, Col, Container, Form, Row, Table,
} from 'react-bootstrap';
import { StoreContext } from 'src/StoreProvider';

function thongke() {
  const store = React.useContext(StoreContext);
  const { historyTranfer } = store;
  const [fromDate, setFromDate] = React.useState('');
  const [toDate, setToDate] = React.useState('');
  const handleFind = async () => {
    await store.getAllTranfer(fromDate, toDate);
  };
  return (
    <Container>
      <Row>

        <Form.Label><h4>Chọn ngày</h4></Form.Label>
      </Row>
      <Row>
        <Col md={4}>
          <Form.Label>Từ ngày</Form.Label>
          <Form.Control type="date" value={fromDate} onChange={(e) => setFromDate(e.target.value)} />

        </Col>
        <Col md={4}>
          <Form.Label>Tới ngày</Form.Label>
          <Form.Control type="date" value={toDate} onChange={(e) => setToDate(e.target.value)} />

        </Col>
        <Col md={2}>
          <br />
          <Button
            type="submit"
            onClick={handleFind}
          >
            Tìm
          </Button>

        </Col>

      </Row>
      <Row>
        <Table striped bordered hover>
          <thead>
            <td>Tên khách hàng</td>
            <td>Số tiền giao dịch</td>
          </thead>
          <tbody>
            {historyTranfer.map(({ fullName, moneyTranfer }) => (
              <tr>
                <td>{fullName.fullName}</td>
                <td>{moneyTranfer}</td>
              </tr>
            ))}

          </tbody>
        </Table>

      </Row>
    </Container>
  );
}

export default observer(thongke);
