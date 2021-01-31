import React, { useState } from 'react';
import '../assets/css/listcard.css';

import { Link } from 'react-router-dom';

const ListCard = (props) => {
  var list = props.list;
  var status = '';
	if(list.status == 'pending') {
		status = <Link to="/Pick" className="button filled small">Pick</Link>;
	} else {
		status = <p className={"status " + list.status}>{list.status}</p>
	}

  return (
    <div key={list.id} className="list-card" onClick={() => props.handleClick(list.id)} >
    	<h3>#{list.id}</h3>
    	<p>By: {list.user}</p>
    	<p>Created: {list.dateCreated}</p>
    	<p className="picked">{list.itemsPicked}/{list.items} items Picked</p>
    	{status}
    </div>
  );
}

export default ListCard;
