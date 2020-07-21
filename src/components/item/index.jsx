import React from 'react';

import CountItem from './countItem';
import ShowItem from './showItem';

const ItemFactory = ({type, data, setItems}) => {
  switch (type) {
    case 'countable':
      return <CountItem data={data} setItems={setItems}/>
    case 'show':
      return <ShowItem data={data}/>
    default:
      return (<></>)
  }
}

export default ItemFactory