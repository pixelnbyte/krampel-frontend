import React, { useState } from 'react';

const ItemRow = (props) => {

  var img = { backgroundImage: 'url(' + props.item.img + ')' };
  
  var last = (<td>
        <a href="#" className="button filled tiny found" onClick={() => props.handleAction('found')}>Found</a>
        <a href="#" className="button filled tiny not-found" onClick={() => props.handleAction('not-found')}>Not Found</a>
      </td>);

  switch(props.item.status) {
    case ('picking'):
      if(props.status) {
        last = (<td className="actions">
          <a href="#" className="button filled tiny found" onClick={() => props.handleAction('found', props.item.id)}>Found</a>
          <a href="#" className="button filled tiny not-found" onClick={() => props.handleAction('not-found', props.item.id)}>Not Found</a>
        </td>);
      } else {
        last = (<td><span className={"status " + props.item.status}>{props.item.status}</span></td>);
      }
      break;
    case ('found'):
      last = (<td><span className={"status " + props.item.status}>{props.item.status}</span></td>);
      break;
    case ('not-found'):
      last = (<td><span className={"status " + props.item.status}>Not Found</span></td>);
      break;
    default:
      last = (<td><span className={"status " + props.item.status}>{props.item.status}</span></td>);
      break;
  }

  return (
    <tr key={props.item.id}>
      <td><div className="image-wrapper" style={img}><img src={props.item.img} /></div>{props.item.name}</td>
      <td>{props.item.sku}</td>
      <td>{props.item.qty}</td>
      <td>{props.item.location}</td>
      {last}
    </tr>
  );
}

export default ItemRow;
