import { observer } from 'mobx-react';
import { useRouter } from 'next/router';
import React from 'react';
import { Button, Form, Table } from 'react-bootstrap';
import { StoreContext } from 'src/StoreProvider';

function payment({ creId }) {
  const store = React.useContext(StoreContext);
  const { debits, debit, infoDebt } = store;
  const debt = infoDebt.find((item) => item.credit.id === +creId);
  const [selectDebit, setSelectDebit] = React.useState(-1);
  const [money, setMoney] = React.useState(0);
  const Router = useRouter();
  React.useEffect(() => {
    const fetch = async () => {
      Promise.all([
        store.getListDebt(), store.getAllDebits(),
      ]);
    };
    fetch();
  }, []);
  React.useEffect(() => {
    if (selectDebit !== -1) {
      store.getDebit(selectDebit);
    }
  }, [selectDebit]);
  return (
    <div>
      <Form>
        <Form.Group controlId="exampleForm.SelectCustom">
          <Form.Label>Chọn tài khoản debit</Form.Label>
          <Form.Control as="select" value={selectDebit} onChange={(e) => setSelectDebit(parseInt(e.target.value, 10))} custom>
            <option value={-1}>--none--</option>
            {debits.map(({ id }) => <option value={id}>{id}</option>)}
          </Form.Control>
        </Form.Group>
      </Form>
      <h3>Số nợ cần thanh toán:{debt?.credit.debt}</h3>
      {selectDebit !== -1
      && (
        <>
          <Table striped bordered hover>
            <thead>
              <td>Số dư</td>
              <td>Số dư tối thiểu</td>
              <td />
            </thead>
            <tbody>
              <tr>
                <td>{debit.balance}</td>
                <td>{debit.minBalance}</td>
                <td>
                  <Button
                    variant="info"
                    onClick={async() => {
                      await store.payment(+creId, selectDebit, money);
                      Router.push('/credit/listDebt');
                    }}
                  >
                    Thanh toán nợ
                  </Button>
                </td>
              </tr>

            </tbody>
          </Table>
          <Form.Control type="number" value={money} onChange={(e) => setMoney(parseInt(e.target.value, 10))} />
        </>
      )}
    </div>
  );
}
payment.getInitialProps = ({ query: { creId } }) => {
  return { creId };
};

export default observer(payment);
