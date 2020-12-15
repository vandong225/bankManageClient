import { observer } from 'mobx-react';
import { useRouter } from 'next/router';
import React, { useEffect } from 'react';
import { Button, Container, Row, Table } from 'react-bootstrap';
import { StoreContext } from 'src/StoreProvider';

function Index() {
  const store = React.useContext(StoreContext);
  const { debits } = store;
  useEffect(() => {
    const fetch = async () => {
      await store.getAllDebits();
    };
    fetch();
  }, []);
  const Router = useRouter();

  return (
    <Container>
      <h3>Thống kê tài khoản nợ</h3>
      <Row>
        <Table striped bordered hover>
          <thead>
            <td>#</td>
            <td>Mã tài khoản</td>
            <td>Số dư</td>
            <td />
          </thead>
          <tbody>
            {debits.map(({ id, balance }, index) => (
              <tr>
                <td>{index}</td>
                <td>{id}</td>
                <td>{balance}</td>
                <td>
                  <Button variant="danger" onClick={() => store.deleteCredit(id)}>
                    Xóa
                  </Button>
                </td>
              </tr>
            ))}

          </tbody>
        </Table>

      </Row>
    </Container>
  );
}

export default observer(Index);
