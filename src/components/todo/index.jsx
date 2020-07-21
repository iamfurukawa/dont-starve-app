import React, { useState, useEffect } from 'react';

import styles from './todo.module.scss'
import ItemFactory from '../item';

import storage from '../../utils/storage'
import GraphSearch from '../../utils/graphSearch';

const Todo = () => {

  const hiddenFileInput = React.useRef(null)
  
  const handleClick = (event) => {
    hiddenFileInput.current.click();
  }

  const handleImport = event => {
    const fileUploaded = event.target.files[0];
    getBase64(fileUploaded).then(fileToSave => {
        storage.save(fileToSave)  
    })
  }

  const getBase64 = (file) => {
    return new Promise((resolve,reject) => {
       const reader = new FileReader();
       reader.onload = () => resolve(reader.result);
       reader.onerror = error => reject(error);
       reader.readAsText(file);
    })
  }

  const handleExport = async() => {
      const data = storage.loadAll()
      await downloadFile(data)
  }

  const downloadFile = async (data) => {
    const fileName = "todo";
    const json = JSON.stringify(data);
    const blob = new Blob([json],{type:'application/json'});
    const href = await URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = href;
    link.download = fileName + ".json";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }
  
  const [items, setItems] = useState([])
  const [allNodes, setAllNodes] = useState([])

  useEffect(() => {
    setItems(storage.loadAll() || [])
  }, [])

  useEffect(() => {
    const nodes = []
    items.forEach(item => {
      GraphSearch.merge(GraphSearch.calcItems(item.item, item.quantity), nodes)
    })

    setAllNodes(nodes)
  }, [items])

  return (
    <div className={styles.todo}>
        <div className={styles.content}>
            <div className={styles.ieButtons}>
                <button onClick={handleClick}>
                Import
                </button>
                <input type="file"
                        ref={hiddenFileInput}
                        onChange={handleImport}
                        style={{display:'none'}} 
                /> 
                <button onClick={handleExport}>Export</button>
            </div>
            { items.length === 0 &&
              <p class={styles.warning}>Please import or add one or more items to visualize yours To Do's.</p>
            }
            { items.length !== 0 &&
            <>
            <h1>To Do's</h1>
            <div className={styles.itemTodo}>
                { items.map(item =>(
                  <ItemFactory type='countable' data={item} setItems={setItems} />
                ))}
            </div>
            <h1>Items to collect</h1>
            <div className={styles.itemCollect}>
                {allNodes.map(node => (
                  <ItemFactory type='show' data={node}/>
                ))}
            </div>
            </>
            }
        </div>
    </div>
  )
}

export default Todo;