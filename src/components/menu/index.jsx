import React, { useContext } from 'react';

import { FaListUl, FaShareAlt } from 'react-icons/fa';
import { NavLink } from 'react-router-dom';

import styles from './menu.module.scss'
import GridContext from '../../context/grid';

const Menu = () => {
  const { setGridMin } = useContext(GridContext);

  const handleClick = () => {
    setGridMin()
  }

  return (
    <div className={styles.menu}>
        <NavLink exact to="/" className={styles.icon} activeClassName={styles.active} onClick={handleClick}>
          <FaShareAlt size="32"/>
          <p>Items</p>
        </NavLink>
        <NavLink exact to="/todo" className={styles.icon} activeClassName={styles.active} onClick={handleClick}>
          <FaListUl size="32"/>
          <p>To Do</p>
        </NavLink>
    </div>
  )
}

export default Menu;