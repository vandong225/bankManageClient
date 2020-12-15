import { observer } from 'mobx-react';
import { useRouter } from 'next/router';
import React from 'react';
import { Alert, Button, Col, Form, Row } from 'react-bootstrap';
import { StoreContext } from 'src/StoreProvider';

const creditAccount = ({ cid }) => {
  const store = React.useContext(StoreContext);
  React.useEffect(() => {
    Promise.all([
      store.getCredit('new'),
      store.getAllEmployee(),
    ]);
  }, []);
  const { credit ,employees, isLoading } = store;
  const { limited } = credit;
  const Router = useRouter();
  const [selectDebit, setSelectDebit] = React.useState(-1);
  const [err, setErr] = React.useState(false);

  const handleSave = async () => {
    const emp = employees.find((e) => e.id === +selectDebit);
    const res = await store.createCredit(cid,emp?.id);
    if(!res) {
      setErr(true);
      return;
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
      {err &&
      <Alert variant="danger">
    nhân viên này không có quyền
  </Alert>}
      <div style={{ width: '100%' }}>
       <h2>Thêm mới tài khoản</h2>
      </div>
      <div>
        <Form>
          <Form.Group controlId="exampleForm.ControlInput1">
            <Row>
              <Col md="12">
                <Form.Label>Nhập hạn mức</Form.Label>
                <Form.Control type="number" value={limited} onChange={(e) => credit.setLimited(parseInt(e.target.value,10))} />
              </Col>
            </Row>
          </Form.Group>
        </Form>
        <Form.Label>Chọn nhân viên</Form.Label>
        <Form.Control as="select" value={selectDebit} onChange={(e) => setSelectDebit(parseInt(e.target.value, 10))} custom>
          <option value={-1}>--none--</option>
          {employees.map(({ id , fullName}) => <option value={id}>{fullName.fullName}</option>)}
        </Form.Control>
        <Col xs="auto">
          <Button className="d-block ml-auto" type="submit" onClick={handleSave} disabled={isLoading}>Save</Button>
        </Col>
      </div>
    </>
  );
};

creditAccount.getInitialProps = ({ query: { cid } }) => {
  return { cid };
};

export default observer(creditAccount);
