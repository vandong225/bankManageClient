import { observer } from 'mobx-react';
import React from 'react';
import { Spinner } from 'react-bootstrap';
import TableListCustomer from 'src/components/customer/tableListCustomer';
import { StoreContext } from 'src/StoreProvider';

const Index:React.FC = () => {
  const store = React.useContext(StoreContext);
  const { isLoading } = store;
  React.useEffect(() => {
    store.getAllCustomer();
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
          <TableListCustomer />
        )
    }

    </>
  );
};

export default observer(Index);
