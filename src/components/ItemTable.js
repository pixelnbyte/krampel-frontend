import React, { useState } from 'react';
import ItemRow from './ItemRow';

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

const ItemTable = (props) => {
  const listItems = props.items; 
  const { items, requestSort, sortConfig } = useSortableData(props.items);

  const getClassNamesFor = (name) => {
    if (!sortConfig) {
      return;
    }
    return sortConfig.key === name ? sortConfig.direction : undefined;
  };

  return (
    <div className="table-body items-table">
      <table>
        <thead>
          <tr>
            <th onClick={() => requestSort('name')} className={getClassNamesFor('name')}><span className="arrows"></span>Item</th>
            <th onClick={() => requestSort('sku')} className={getClassNamesFor('sku')}><span className="arrows"></span>SKU</th>
            <th onClick={() => requestSort('qty')} className={getClassNamesFor('qty')}><span className="arrows"></span>Quantity</th>
            <th onClick={() => requestSort('location')} className={getClassNamesFor('location')}><span className="arrows"></span>Location</th>
            <th onClick={() => requestSort('status')} className={getClassNamesFor('status')}><span className="arrows"></span>{props.status ? "Actions" : "Status"}</th>
          </tr>
        </thead>
        <tbody>
          {items.map(item => (
            <ItemRow key={item.id} item={item} status={props.status} handleAction={props.handleAction} />
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ItemTable;
