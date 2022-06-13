import React from 'react';

import { useFetchRecords } from './api/useFetchRecords';
import ActionsBlock from './ActionsBlock';
import Table from './Table';

import './App.css';

import { PAGE_SIZE, INITIAL_FILTER } from './constants';

function App() {
  const [data, setData] = React.useState();
  const [filter, setFilter] = React.useState(INITIAL_FILTER);

  useFetchRecords(filter, setData);

  const disableNextButton = data && data.length < PAGE_SIZE;

  const applySort = (fieldName) => {
    if (filter.orderby === fieldName) {
      setFilter({ ...filter, orderDirection: filter.orderDirection === 'asc' ? 'desc' : 'asc' });
    } else {
      setFilter({ ...filter, orderby: fieldName, orderDirection: 'asc' });
    }
  }

  return (
    <div className="app-container">
      <ActionsBlock
        filter={filter}
        setFilter={setFilter}
        disableNextButton={disableNextButton}
      />
      <Table
        data={data}
        applySort={applySort}
      />
    </div>
  );
}

export default App;
