import React, { useState } from 'react';
import UserRow from './UserRow';

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

const UserTable = (props) => {
  const users = props.users; 
  const { items, requestSort, sortConfig } = useSortableData(props.users);

  const getClassNamesFor = (name) => {
    if (!sortConfig) {
      return;
    }
    return sortConfig.key === name ? sortConfig.direction : undefined;
  };

  return (
    <div className="table-body">
      <table className="user-table">
        <thead>
          <tr>
            <th onClick={() => requestSort('firstName')} className={getClassNamesFor('firstName')}><span className="arrows"></span>Name</th>
            <th onClick={() => requestSort('email')} className={getClassNamesFor('email')}><span className="arrows"></span>Email</th>
            <th onClick={() => requestSort('role')} className={getClassNamesFor('role')}><span className="arrows"></span>Role</th>
            <th onClick={() => requestSort('login')} className={getClassNamesFor('login')}><span className="arrows"></span>Last Login</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {items.map(user => (
            <UserRow key={user.id} user={user} checkboxHandler={props.handleCheckbox} delete={props.delete} />
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default UserTable;
