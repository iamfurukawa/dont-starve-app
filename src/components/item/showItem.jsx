import React, { useEffect, useState } from 'react';
import ReactTooltip from 'react-tooltip'

import Data from '../../utils/data'

import styles from './showItem.module.scss';

const ShowItem = ({data}) => {
  const [item, setItem] = useState(Data.emptyItem)
  
  useEffect(() => {
    setItem(Data.getDataByCode(data.code) || Data.emptyItem)
  }, [data.code, item])

  return (
    <>
      <div className={styles.show}>
        <img alt="Item to build" data-tip data-for={data.code + 'showItem'} src={process.env.PUBLIC_URL + "/images/" + data.code.replace(/\s+/g, '').replace(/_+/g, '') + ".jpg"} className={styles.image}/>
        <p>{data.quantity}</p>
      </div>
      <ReactTooltip id={data.code + 'showItem'} place="top" effect="solid">
        {item.name}
      </ReactTooltip>
    </>
  )
}

export default ShowItem