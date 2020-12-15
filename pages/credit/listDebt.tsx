import { observer } from 'mobx-react';
import { useRouter } from 'next/router';
import React, { useEffect } from 'react';
import { Button, Container, Row, Table } from 'react-bootstrap';
import { StoreContext } from 'src/StoreProvider';

function thongke() {
  const store = React.useContext(StoreContext);
  const { infoDebt } = store;
  useEffect(() => {
    const fetch = async () => {
      await store.getListDebt();
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
            <td>Chủ sở hữu</td>
            <td>Mã số khách hàng</td>
            <td></td>
          </thead>
          <tbody>
            {infoDebt.map(({ credit, customerId, customerName }, index) => (
              <tr>
                <td>{index}</td>
                <td>{credit.id}</td>
                <td>{credit.debt}</td>
                <td>{customerName.fullName}</td>
                <td>{customerId}</td>
                <td>
                  <Button variant="info" onClick={() => Router.push('/credit/[creId]/payment', `/credit/${credit.id}/payment`)}>
                    Thanh toán nợ
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

export default observer(thongke);
