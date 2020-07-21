import React, { useState, useContext } from 'react';
import { Graph } from 'react-d3-graph';
import config from '../../shared/graphConfig';

import GridContext from '../../context/grid'
import styles from './graph.module.scss';

const GraphNetwork = ({setSelectedItem, selectedItem, data}) => {
    const [toggle, setToggle] = useState(true)
    const { setGridMin, setGridMax } = useContext(GridContext);

    const handleClickNode = nodeId => {
        if(selectedItem === nodeId || selectedItem === '')
            doToggle()
        setSelectedItem(nodeId)
    }

    const doToggle = () => {
        if(toggle) {
            setGridMax()
        } else {
            setGridMin()
            setSelectedItem('')
        }
        setToggle(!toggle)
    }
    
    return (
        <>
            <Graph
                className={styles.graph}
                id="items"
                data={data}
                config={config}
                onClickNode={(nodeId) => handleClickNode(nodeId)}
            />
        </>
    )
}

export default GraphNetwork;