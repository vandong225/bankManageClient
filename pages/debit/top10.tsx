import { observer } from 'mobx-react';
import { Router } from 'next/router';
import React from 'react';
import { Button, Spinner, Table } from 'react-bootstrap';
import { StoreContext } from 'src/StoreProvider';

const top10:React.FC = () => {
  const store = React.useContext(StoreContext);
  const { customers, isLoading } = store;
  React.useEffect(() => {
    store.getTop10();
  }, []);
  return (
    <>{
      isLoading
        ? (

          <Spinner
            animation="border"
            variant="danger"
          />
        )
        : (
          <>
            <h3>Top 10 tài khoản có sô tiền gửi cao nhất</h3>
            <Table striped bordered hover>
              <thead>
                <tr>
                  <th>#</th>
                  <th>Mã khách hàng</th>
                  <th>Số CMT</th>
                  <th>Họ và tên</th>
                  <th>Ngày sinh</th>
                </tr>
              </thead>
              <tbody>
                {
          customers.map(({
            dob, fullName, id, idCard, level, position,
          }, index) => (
            <tr key={id}>
              <td>{index}</td>
              <td>{id}</td>
              <td>{idCard}</td>
              <td>{fullName.fullName}</td>
              <td>{dob}</td>
              {position && <td>{position}</td>}
              {level && <td>{level}</td>}

            </tr>
          ))
        }
              </tbody>
            </Table>
          </>
        )
    }

    </>
  );
};

export default observer(top10);
