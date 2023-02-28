import Modal from "./Modals";
function ListHeader({listName}) {

  const signout = ()=>{
    console.log('signout')
  }

    return (
      <div className='list-header'>
       <h1> {listName}</h1>
       <div className="button-container">
        <button className='create'>ADD NEW</button>
        <button className="signout" onClick={signout}>SIGN OUT</button>
       </div>
       <Modal></Modal>
      </div>
    );
  }
  
  export default ListHeader;
  