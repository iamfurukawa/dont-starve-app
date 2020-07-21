import React from 'react';
import { ToastContainer, toast } from 'react-toastify';

import 'react-toastify/dist/ReactToastify.css';
import styles from './headerSection.module.scss';
import Storage from '../../utils/storage';

const headerSection = ({data}) => {
  const handleClick = () => {
    Storage.add(data.code)
    toast.success(`${data.name} added on To Do list!`, {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      closeButton: false
    })
  }

  return (
    <>
        <ToastContainer />
        <div className={styles.title}>{data.name}</div>
        <div className={styles.sectionImage}>
            <img alt="Item" src={process.env.PUBLIC_URL + "/images/" + data.code.replace(/\s+/g, '').replace(/_+/g, '') + ".jpg"} className={styles.image}/>
            <button onClick={handleClick}>Add To Do</button>
        </div>
    </>
  )
}

export default headerSection