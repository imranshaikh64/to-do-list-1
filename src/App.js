import React, { useState } from "react";
import logo from '../src/images/logo.png'


const getLocalItems = () => {
  let list = localStorage.getItem('lists');
  if(list){
    return JSON.parse(localStorage.getItem('lists'));
  }
  else{
    return [];
  }
}


const App = () => {
  const [inputData, setInputData] = useState('');
  const [items, setItems] = useState(getLocalItems());
  const [toggleSubmit,setToggleSubmit]=useState(true);
  const [isEdititem,setIsEditItem] = useState();


  const addItem = () => {
    if (!inputData) {
      alert('plz fill the data!')
    }
    else if(inputData && !toggleSubmit){
      setItems(
        items.map((elem)=> {
          if(elem.id==isEdititem){
            return {
              ...elem, name:inputData
            }
            
          }
        })
      )
      setToggleSubmit(true);

      setInputData('');

      setIsEditItem(null);


    } 
    else {
      const allInutData = { id: new Date().getTime().toString(), name: inputData }
      setItems([...items, allInutData]);
      setInputData('')
    }
  }

  const deleteItem = (ind) => {
    const updatedItem = items.filter((elem) => {
      return ind !== elem.id;
    })
    setItems(updatedItem);
  }

  const removeAll = () => {
    setItems([]);
  }
  const editItem = (id) => {
    let newEditItem = items.find((elem)=>{
      return elem.id == id;

    })
    setToggleSubmit(false);

    setInputData(newEditItem.name);

    setIsEditItem(id);

  }


  return (
    <>
      <div className='main-div'>
        <div className='child-div'>
          <figure>
            <img src={logo} alt='logo' />
            <figcaption>Add your list here</figcaption>
          </figure>

          <div className='addItems'>
            <input type='text' placeholder='add items...' value={inputData} onChange={(event) => {
              setInputData(event.target.value)
            }} />
            {
              toggleSubmit ? <i className='fa fa-plus add-btn' title='Add Item' onClick={addItem}></i> :
              <i className="far fa-edit add-btn" title='updateItem Item' onClick={addItem}></i>
            }
            
          </div>

          <div className='showItems'>
            {
              items.map((elem) => {
                return (
                  <div className='eachItem' key={elem.id}>
                    <h3>{elem.name}</h3>
                    <div className='todo-btn'>
                      <i className="far fa-edit add-btn" title='Edit Item' onClick={() => editItem(elem.id)}></i>
                      <i className="far fa-trash-alt add-btn" title='Delete Item' onClick={() => deleteItem(elem.id)}></i>
                    </div>

                  </div>

                );


              })

            }

          </div>

          <div className='showItems'>
            <button className='btn effect04' data-sm-link-text='Remove All' onClick={removeAll}><span>Check List</span></button>
          </div>

        </div>
      </div>
    </>

  );
}

export default App;