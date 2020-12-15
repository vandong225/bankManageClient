import { observer } from 'mobx-react';
import { useRouter } from 'next/router';
import React from 'react';
import { Button, Col, Form, Row } from 'react-bootstrap';
import { StoreContext } from 'src/StoreProvider';

const edit = ({ aid }) => {
  const store = React.useContext(StoreContext);
  React.useEffect(() => {
    Promise.all([
      store.getDebit(aid),
      store.getAllEmployee(),
    ]);
  }, []);
  const { debit,employees, isLoading } = store;
  const { balance, minBalance } = debit;
  const Router = useRouter();
  const [selectDebit, setSelectDebit] = React.useState(-1);

  const handleSave = async () => {
    if (aid === 'new') {
      await store.createDebit(aid);
    } else {
      await store.updateCustomer(aid);
    }
    Router.push('/debit');
  };
  return (
    <>
      <Button
        type="submit"
        onClick={() => Router.push('/debit')}
      >
        Back
      </Button>
      <div style={{ width: '100%' }}>
        { aid !== 'new' ? <h2>Sửa thông tin tài khoản</h2> : <h2>Thêm mới tài khoản</h2>}
      </div>
      <div>
        <Form>
          <Form.Group controlId="exampleForm.ControlInput1">
            <Row>
              <Col md="12">
                <Form.Label>Nhập số tiền : Tối thiểu {minBalance}</Form.Label>
                <Form.Control type="number" value={balance} onChange={(e) => debit.setBalance(parseInt(e.target.value,10))} />
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

edit.getInitialProps = ({ query: { aid } }) => {
  return { aid };
};

export default observer(edit);
