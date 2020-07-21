import React, { useState } from 'react';
import { Route, Switch, BrowserRouter } from 'react-router-dom';

import GraphNetwork from './components/graph';
import Menu from './components/menu';
import ItemInfo from './components/info';
import Search from './components/search';
import Todo from './components/todo';

import GridContext from "./context/grid";
import styles from './App.module.scss';

const App = () => {

  const [actualGrid, setGrid] = useState(styles.containerMax)
  const [selectedItem, setSelectedItem] = useState('')
  const [data, setData] = useState([])
  
  const setGridMin = () => {
    setGrid(styles.containerMax)
  }

  const setGridMax = () => {
    setGrid(styles.containerMin)
  }

  const gridContextValues = { setGridMin, setGridMax }

  return (
    <div className={actualGrid}>
      <BrowserRouter>
      <GridContext.Provider value={gridContextValues}>
          <Menu />
          <Search setData={setData}/>

          <Switch>
            <Route exact path="/">
              { data.length !== 0 &&
              <GraphNetwork setSelectedItem={setSelectedItem} selectedItem={selectedItem} data={data}/>
              }
              {actualGrid === styles.containerMin &&
              <ItemInfo id={selectedItem} />
              }
            </Route>
            <Route path="/todo">
              <Todo />
            </Route>
          </Switch>
        </GridContext.Provider>
      </BrowserRouter>
    </div>
  )
}

export default App;