function Modal() {

  const mode = 'create';

  const handleChange = ()=>{
    console.log("changing");
  }

    return (
      <div className="overlay">
        <div className="modal">
          <div className="form-title-container">
            <h3>Let's {mode} Your Task!</h3>
            <button>X</button>
          </div>
          <form>
            <input required maxLength={30} placeholder="Your Task goes Here!" name="title" value={""} onChange={handleChange}></input>
            <br></br>
            <input type="range" required min="0" max="100" name="progress" value={""} onChange={handleChange}></input>
            <input className={mode} type="submit"></input>

          </form>
        </div>
      </div>
    );
  }
  
  export default Modal;
  