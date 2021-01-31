import React, { useState } from 'react';
import OrderRow from './OrderRow';

/* Todo:
  3. Item hover
*/

const useSortableData = (items, config = null) => {
  const [sortConfig, setSortConfig] = React.useState(config);
  
  const sortedItems = React.useMemo(() => {
    let sortableItems = [...items];
    if (sortConfig !== null) {
      sortableItems.sort((a, b) => {
        if (a[sortConfig.key] < b[sortConfig.key]) {
          return sortConfig.direction === 'ascending' ? -1 : 1;
        }
        if (a[sortConfig.key] > b[sortConfig.key]) {
          return sortConfig.direction === 'ascending' ? 1 : -1;
        }
        return 0;
      });
    }
    return sortableItems;
  }, [items, sortConfig]);

  const requestSort = key => {
    let direction = 'ascending';
    if (sortConfig && sortConfig.key === key && sortConfig.direction === 'ascending') {
      direction = 'descending';
    }
    setSortConfig({ key, direction });
  }

  return { items: sortedItems, requestSort, sortConfig };
}

const OrderTable = (props) => {
  const orders = props.orders; 
  const { items, requestSort, sortConfig } = useSortableData(props.orders);

  const getClassNamesFor = (name) => {
    if (!sortConfig) {
      return;
    }
    return sortConfig.key === name ? sortConfig.direction : undefined;
  };

  return (
    <div className="table-body">
      <table className="orders-table">
        <thead>
          <tr>
            <th><input type="checkbox" onChange={props.selectAll} /></th>
            <th onClick={() => requestSort('id')} className={getClassNamesFor('id')}><span className="arrows"></span>Order #</th>
            <th onClick={() => requestSort('status')} className={getClassNamesFor('status')}><span className="arrows"></span>Status</th>
            <th onClick={() => requestSort('shipDate')} className={getClassNamesFor('shipDate')}><span className="arrows"></span>Ship By</th>
            <th>Items</th>
          </tr>
        </thead>
        <tbody>
          {items.map(order => (
            <OrderRow key={order.id} order={order} checkboxHandler={props.handleCheckbox} />
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default OrderTable;
