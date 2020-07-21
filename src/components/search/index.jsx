import React, { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';

import GraphSearch from '../../utils/graphSearch';

import styles from './search.module.scss'

const Search = ({setData}) => {
  const [radioSelected, setRadioSelected] = useState('to')
  const [selectSelected, setSelectSelected] = useState('Include')
  const [input, setInput] = useState('')

  const handleSearchClick = () => {
    search()
  }

  const handleSearchKey = event => {
    if(event.key !== 'Enter') 
      return
    search()
  }

  const search = () => {
    if(!hasText(input))
      return

    const results = GraphSearch.search({
      text: input,
      filterDirection: radioSelected,
      filterExact: selectSelected
    })

    setData(results)
    hasResults(results)
  }

  const hasText = input => {
    if(input !== '')
      return true

    toast.warn('Please input a valid text.', {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      closeButton: false
    })

    return false
  }

  const hasResults = results => {
    if(results.length === 0) {
      toast.info(`${input} not found.`, {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        closeButton: false
      })
    }
  }

  return (
    <div className={styles.search}>
      <ToastContainer />
      <div className={styles.searchForm}>
        <select className={styles.searchSelect} onChange={(e) => setSelectSelected(e.currentTarget.value)}>
          <option value="include">Include</option>
          <option value="exact">Exact</option>
        </select>
        <input type="text" className={styles.searchInput} onKeyPress={handleSearchKey} onInput={(e) => setInput(e.currentTarget.value)}/>
        <button className={styles.searchButton} onClick={handleSearchClick}>Search</button>
      </div>
      <div className={styles.formgroup}>
      <div className={styles.formgroup}>
          <input type="radio" name="fromto" value="to" onChange={(e) => setRadioSelected(e.currentTarget.value)} defaultChecked />
          <label>To</label>
        </div>
        <div className={styles.formgroup}>
          <input type="radio" name="fromto" value="from" onChange={(e) => setRadioSelected(e.currentTarget.value)} />
          <label>From</label>
        </div>
      </div>
    </div>
  )
}

export default Search;