

function sendData(event) {
    event.preventDefault();
    const form = event.target;
    try {
      fetch("http://localhost:3000/comment", {
        method: "POST",
        mode: "cors",
        body: new FormData(form)
      })
  
      .then(response => response.text())
      .then(data => data)
      .catch(error => error);
      
    }
    catch (error) {
    }
  }


function Comment() {
    return(
        <>
        <form onSubmit={sendData}>
        <label htmlFor="">
          Name: <input type="text" name = "author" />
        </label>
        <label>
          Comment: <input type ="textarea" name = "content"/>
        </label>
        <button type = "submit">Submit</button>
        </form>
        </>
    )
}

export default Comment;