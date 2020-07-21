import React, { useState, useEffect } from 'react';

import data from '../../utils/data'

import styles from './itemInfo.module.scss';
import SectionFactory from '../sections';
import DataTransform from '../../utils/dataTransform';

const ItemInfo = ({id}) => {
  const [item, setItem] = useState(data.emptyItem)

  useEffect(() => {
	setItem(data.getData(id) || data.emptyItem)	  
  }, [id])

  return (
		<div className={styles.info}>
			<SectionFactory type='header' data={item}/>

			<SectionFactory type='text' data={item}/>

			{ item.recipe.length !== 0 &&
			<SectionFactory type='image' data={DataTransform.mapToRecipe(item)}/>
			}

			{ item.tier.length !== 0 &&
			<SectionFactory type='image' data={DataTransform.mapToTier(item)}/>
			}

			{ item.tab !== '' &&
			<SectionFactory type='image' data={DataTransform.mapToTab(item)}/>
			}
		</div>
  )
}

export default ItemInfo;