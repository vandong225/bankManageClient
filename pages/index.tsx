import { observer } from 'mobx-react';
import React from 'react';
import { Spinner } from 'react-bootstrap';
import TableList from 'src/components/TableList';
import { StoreContext } from 'src/StoreProvider';

const Index:React.FC = () => {
  const store = React.useContext(StoreContext);
  const { employees, isLoading } = store;
  React.useEffect(() => {
    store.getAllEmployee();
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
          <TableList
            listPerson={employees}
            type="employee"
          />
        )
    }

    </>
  );
};

export default observer(Index);