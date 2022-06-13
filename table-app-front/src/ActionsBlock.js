import React from 'react';

import './ActionsBlock.css';

import { INITIAL_FILTER } from './constants';

export default function ActionsBlock({ disableNextButton, filter, setFilter }) {
    const [filterState, setFilterState] = React.useState({
        value: '',
        operator: 'equal',
        filterField: 'name'
    });

    const setPage = (page) => setFilter(prevFilter => ({ ...prevFilter, page }));

    const handleFilterChange = (e) => {
        const { name, value } = e.target;
        setFilterState({
            ...filterState,
            [name]: value
        });
    }

    const applyFilter = () => {
        setFilter(filter => ({ ...filter, ...filterState }));
    }

    const clearFilter = () => {
        setFilter(INITIAL_FILTER);
    }

    const disableApplyFilterButton = !filterState.value || !filterState.operator || !filterState.filterField;

    return (
        <div className="actions-block">
            <div>
                <select name="filterField" className="select" value={filterState.filterField} onChange={handleFilterChange}>
                    <option value="name">Name</option>
                    <option value="quantity">Quantity</option>
                    <option value="distance">Distance</option>
                </select>
                <select name="operator" className="select left-offset-10" value={filterState.operator} onChange={handleFilterChange}>
                    <option value="equal">Equal</option>
                    <option value="less">Less</option>
                    <option value="more">More</option>
                    <option value="like">Like</option>
                </select>
                <input name="value" className="left-offset-10" type="text" value={filterState.value} onChange={handleFilterChange} />
                <button className="left-offset-10" onClick={applyFilter} disabled={disableApplyFilterButton}>Apply filter</button>
                <button className="left-offset-10" onClick={clearFilter}>Clear filter</button>
            </div>
            <div>
                <button onClick={() => setPage(filter.page - 1)} disabled={filter.page === 1}>Previous</button>
                <button className="left-offset-10" onClick={() => setPage(filter.page + 1)} disabled={disableNextButton}>Next</button>
            </div>
        </div>
    );
}
