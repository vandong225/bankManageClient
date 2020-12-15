import { observer } from 'mobx-react';
import { useRouter } from 'next/router';
import React, { useEffect } from 'react';
import { Button, Container, Row, Table } from 'react-bootstrap';
import { StoreContext } from 'src/StoreProvider';

function Index() {
  const store = React.useContext(StoreContext);
  const { credits } = store;
  useEffect(() => {
    const fetch = async () => {
      await store.getAllCredits();
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
            <td>Số tiền nợ</td>
            <td>Mã số khách hàng</td>
            <td />
          </thead>
          <tbody>
            {credits.map(({ debt, id }, index) => (
              <tr>
                <td>{index}</td>
                <td>{id}</td>
                <td>{debt}</td>
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
