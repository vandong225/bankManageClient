import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faWrench, faInfo } from '@fortawesome/free-solid-svg-icons';
import { observer } from 'mobx-react';
import React from 'react';
import { Button, Table } from 'react-bootstrap';
import { IEmployeeModel } from 'src/model/employee';
import Router from 'next/router';
// import Link from 'next/link';

type TProps = {
  listPerson:IEmployeeModel[],
  type:'employee'|'customer',
};

const TableList:React.FC<TProps> = ({ listPerson, type }) => {
  return (
    <>
      <h2>{type}</h2>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>#</th>
            <th>ID</th>
            <th>ID Card</th>
            <th>Full Name</th>
            <th>DOB</th>
            <th>Position</th>
            <th>Level</th>
            <th colSpan={3}> </th>
          </tr>
        </thead>
        <tbody>
          {
          listPerson.map(({
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
                <Button variant="info" onClick={() => Router.push(`/${type}/[pid]`, `/${type}/${id}`)}>
                  <FontAwesomeIcon icon={faInfo} size="lg" />
                </Button>
              </td>
              <td>
                <Button variant="warning" onClick={() => Router.push(`/${type}/[pid]/edit`, `/${type}/${id}/edit`)}>
                  <FontAwesomeIcon icon={faWrench} size="lg" />
                </Button>
              </td>
              <td>
                <Button variant="danger">
                  <FontAwesomeIcon icon={faTrash} size="lg" />

                </Button>
              </td>

            </tr>
          ))
        }

        </tbody>
      </Table>
    </>
  );
};

export default observer(TableList);
