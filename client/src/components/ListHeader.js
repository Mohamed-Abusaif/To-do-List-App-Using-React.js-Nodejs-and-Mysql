import Modal from "./Modals";
import { useState } from 'react';
function ListHeader({listName , getData}) {
  const [showModal , setShowModal] = useState(false)
  const signout = ()=>{
    console.log('signout')
  }


    return (
      <div className='list-header'>
       <h1> {listName}</h1>
       <div className="button-container">
        <button className='create' onClick={()=>setShowModal(true)}>ADD NEW</button>
        <button className="signout" onClick={signout}>SIGN OUT</button>
       </div>
       {showModal && <Modal mode={'create'} setShowModal={setShowModal} getData={getData}></Modal>}
      </div>
    );
  }
  
  export default ListHeader;
  