import React from 'react';
import ReactTooltip from 'react-tooltip'

import styles from './imageSection.module.scss';
import sections from './sections.module.scss';

const ImageSection = ({data}) => {

  return (
    <div className={sections.section}>
        <div className={sections.sectionTitle}>{data.title}</div>
        <div className={sections.sectionInfoImage}>
        {data.data.map(itemData => (
            <>
            <div className={sections.sectionInfoItem}>
                <img data-tip data-for={itemData.img + 'imageSection'} alt='item' src={process.env.PUBLIC_URL + "/images/" + itemData.img} className={styles.image}/>
                <p>{
                    itemData.quantity === '' ? itemData.description : `${itemData.quantity}x`
                }</p>
            </div>
            <ReactTooltip id={itemData.img + 'imageSection'} place="top" effect="solid">
                {itemData.tooltip}
            </ReactTooltip>
            </>
        ))}
        </div>
    </div>
  )
}

export default ImageSection;