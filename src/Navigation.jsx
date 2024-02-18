import { Link } from "react-router-dom";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Navigation() {
    const navigate = useNavigate();
    const [linkEnabled, setLinkEnabled] = useState(true); 

    function toggleLinkDirectionAndNavigate() {
        setLinkEnabled(!linkEnabled);
        if (linkEnabled) {
            navigate("/blogs");
        } else {
            navigate("/");
        }
        setLinkEnabled(!linkEnabled);
    }

    // FUNCTION FOR ADDING BLOG
    // function sendData(event) {
    //     event.preventDefault();
    //     console.log(event.target);
    //     const form = event.target;
    //     try {
    //       fetch("http://localhost:3000/blogs", {
    //         method: "POST",
    //         mode: "cors",
    //       })
      
    //       .then(response => response.text())
    //       .then(data => alert(data))
    //       .catch(error => alert(error));
          
    //     }
    //     catch (error) {
    //       alert(error);
    //     }
    //   }
    
    return(
        <header id = "nav-bar">
            <h1>Serious Blog</h1>
            <Link to = {linkEnabled} className = "Link" onClick = {toggleLinkDirectionAndNavigate}>{linkEnabled ? "View Blogs" : "Go Home"}</Link>
            {/* <button onClick = {sendData}>Add Blog</button> */}
        </header>
    );
}

export default Navigation;