import React from 'react';

import TextSection from './textSection';
import ImageSection from './imageSection';
import HeaderSection from './headerSection';

const SectionFactory = ({type, data}) => {
  switch (type) {
    case 'header':
      return <HeaderSection data={data}/>
    case 'text':
      return <TextSection data={data}/>
    case 'image':
      return <ImageSection data={data}/>
    default:
      return (<></>)
  }
}

export default SectionFactory;