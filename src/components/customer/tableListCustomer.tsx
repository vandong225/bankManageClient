import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faWrench, faInfo } from '@fortawesome/free-solid-svg-icons';
import { observer } from 'mobx-react';
import React from 'react';
import { Button, Modal, Spinner, Table } from 'react-bootstrap';
import Router from 'next/router';
import { StoreContext } from 'src/StoreProvider';
// import Link from 'next/link';

const TableListCustomer = () => {
  const store = React.useContext(StoreContext);
  const { customers, isLoading } = store;
  const [indexEmployee, setIndexEmployee] = React.useState(-1);
  return (
    <>
      <div className="header-table">

        <h2>Quản lý khách hàng</h2>
        <Button onClick={() => Router.push('/customer/[cid]', '/customer/new')}>Thêm khách hàng</Button>
      </div>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>#</th>
            <th>ID</th>
            <th>Số CMT</th>
            <th>Họ và tên</th>
            <th>Ngày sinh</th>
            <th colSpan={5}> </th>
          </tr>
        </thead>
        <tbody>
          {
          customers.map(({ dob, fullName, id, idCard }, index) => (
            <tr key={id}>
              <td>{index}</td>
              <td>{id}</td>
              <td>{idCard}</td>
              <td>{fullName.fullName}</td>
              <td>{dob}</td>
              <td>
                <Button variant="info" onClick={() => Router.push('/customer/[cid]/detail', `/customer/${id}/detail`)}>
                  <FontAwesomeIcon icon={faInfo} size="lg" />
                </Button>
              </td>
              <td>
                <Button variant="warning" onClick={() => Router.push('/customer/[cid]', `/customer/${id}`)}>
                  <FontAwesomeIcon icon={faWrench} size="lg" />
                </Button>
              </td>
              <td>
                <Button
                  variant="danger"
                  onClick={() => {
                    setIndexEmployee(id);
                  }}
                >
                  <FontAwesomeIcon icon={faTrash} size="lg" />
                </Button>
              </td>
              <td>
                <Button
                  variant="info"
                  onClick={() => {
                    Router.push('/customer/[cid]/debitAccount', `/customer/${id}/debitAccount`);
                  }}
                >
                  Tạo Debit
                </Button>
              </td>
              <td>
                <Button
                  variant="info"
                  onClick={() => {
                    Router.push('/customer/[cid]/creditAccount', `/customer/${id}/creditAccount`);
                  }}
                >
                  Tạo Credit
                </Button>
              </td>

            </tr>
          ))
        }

        </tbody>
      </Table>
      <Modal show={indexEmployee !== -1} onHide={() => setIndexEmployee(-1)}>
        <Modal.Header closeButton>
          <Modal.Title>Xóa</Modal.Title>
        </Modal.Header>
        <Modal.Body>Bạn muốn xóa khách hàng này ??</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" disabled={isLoading} onClick={() => setIndexEmployee(-1)}>
            Hủy bỏ
          </Button>
          {isLoading ? (
            <Button
              variant="danger"
              onClick={async () => {
                if (indexEmployee !== -1) await store.deleteCustomer(indexEmployee);
                setIndexEmployee(-1);
              }}
            >
              Xóa khách hàng
            </Button>
          )
            : <Spinner animation="grow" />}

        </Modal.Footer>
      </Modal>
    </>
  );
};

export default observer(TableListCustomer);
