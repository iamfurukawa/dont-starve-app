import React from 'react';

import styles from './textSection.module.scss';
import sections from './sections.module.scss';

const TextSection = ({data}) => {
  return (
    <div className={sections.section}>
        <div className={sections.sectionTitle}>Description</div>
        <div className={styles.sectionInfo}>
            { data.description === '' ? `For more information access: ${data.wiki}` : data.description }
        </div>
    </div>
  )
}

export default TextSection;