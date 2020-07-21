import React, { useState, useEffect } from 'react';
import ReactModal from 'react-modal'
import ReactTooltip from 'react-tooltip'

import Data from '../../utils/data'
import Storage from '../../utils/storage';

import styles from './countItem.module.scss';
import ItemFactory from '../item';
import GraphSearch from '../../utils/graphSearch'

const CountItem = ({data, setItems}) => {
  const [modalIsOpen, setIsOpen] = useState(false)
  const [itemLoaded, setItemLoaded] = useState(Data.emptyItem)
  const [show, setShow] = useState([])

  useEffect(() => {
    setItemLoaded(Data.getDataByCode(data.item))
    setShow(GraphSearch.calcItems(data.item, data.quantity))
  }, [data.item, data.quantity])

  const handleOpenModal = () => {
    setIsOpen(true)
  }

  const handleCloseModal = () => {
    setIsOpen(false)
  }

  const handleSub = () => {
    Data.subQuantity(data.item)
    setItems(Storage.loadAll())
  }

  const handleAdd = () => {
    Data.addQuantity(data.item)
    setItems(Storage.loadAll())
  }

  const handleDel = () => {
    Data.deleteItem(data.item)
    setItems(Storage.loadAll())
    handleCloseModal()
  }

  return (
    <>
      <div className={styles.count}>
        <img alt="Item" data-tip data-for={data.item + 'countItem'} src={process.env.PUBLIC_URL + "/images/" + data.item.replace(/\s+/g, '').replace(/_+/g, '') + ".jpg"} onClick={handleOpenModal} className={styles.image}/>
        <div className={styles.controls}>
            <button onClick={handleSub}>-</button>
            <p>{data.quantity}</p>
            <button onClick={handleAdd}>+</button>
        </div>
      </div>

      <ReactTooltip id={data.item + 'countItem'} place="top" effect="solid">
        {`Click for more info.`}
      </ReactTooltip>

      <ReactModal
        isOpen={modalIsOpen}
        onRequestClose={handleCloseModal}
        className={styles.modal}
        contentLabel="Item Information"
      >
        <div className={styles.modalGrid}>
          <div className={styles.headerModal}>
            <h1>Item Information</h1>
          </div>
          <div className={styles.bodyModal}>
            <div>{`To build ${data.quantity} ${itemLoaded.name} you'll need:`}</div>
            <div className={styles.items}>
              {show.map(itemShow => (
                <ItemFactory type='show' data={itemShow}/>
              ))}
            </div>
          </div>
          <div className={styles.footerModal}>
            <button className={styles.delete} onClick={handleDel}>Delete</button>
            <button onClick={handleCloseModal}>Close</button>
          </div>
        </div>
      </ReactModal>
    </>
  )
}

export default CountItem