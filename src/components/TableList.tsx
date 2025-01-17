import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faWrench, faInfo } from '@fortawesome/free-solid-svg-icons';
import { observer } from 'mobx-react';
import React from 'react';
import { Button, Modal, Spinner, Table } from 'react-bootstrap';
import Router from 'next/router';
import { StoreContext } from 'src/StoreProvider';
// import Link from 'next/link';

const TableList = () => {
  const store = React.useContext(StoreContext);
  const { employees, isLoading } = store;
  const [indexEmployee, setIndexEmployee] = React.useState(-1);
  return (
    <>
      <div className="header-table">

        <h2>Quản lý nhân viên</h2>
        <Button onClick={() => Router.push('/employee/[pid]', '/employee/new')}>Thêm nhân viên</Button>
      </div>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>#</th>
            <th>ID</th>
            <th>Số CMT</th>
            <th>Họ và tên</th>
            <th>Ngày sinh</th>
            <th>Vị trí</th>
            <th>level</th>
            <th colSpan={3}> </th>
          </tr>
        </thead>
        <tbody>
          {
          employees.map(({
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
              <td>
                <Button variant="info" onClick={() => Router.push('/employee/[pid]/detail', `/employee/${id}/detail`)}>
                  <FontAwesomeIcon icon={faInfo} size="lg" />
                </Button>
              </td>
              <td>
                <Button variant="warning" onClick={() => Router.push('/employee/[pid]', `/employee/${id}`)}>
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

            </tr>
          ))
        }

        </tbody>
      </Table>
      <Modal show={indexEmployee !== -1} onHide={() => setIndexEmployee(-1)}>
        <Modal.Header closeButton>
          <Modal.Title>Xóa</Modal.Title>
        </Modal.Header>
        <Modal.Body>Xóa nhân viên này</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" disabled={isLoading} onClick={() => setIndexEmployee(-1)}>
            Hủy bỏ
          </Button>
          {isLoading ? (
            <Button
              variant="danger"
              onClick={async () => {
                if (indexEmployee !== -1) await store.deleteEmployee(indexEmployee);
                setIndexEmployee(-1);
              }}
            >
              Xóa nhân viên
            </Button>
          )
            : <Spinner animation="grow" />}

        </Modal.Footer>
      </Modal>
    </>
  );
};

export default observer(TableList);
