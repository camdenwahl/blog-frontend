import { Link } from "react-router-dom";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

function Navigation() {
    const navigate = useNavigate();
    const [linkEnabled, setLinkEnabled] = useState(false); 

    function toggleLinkDirectionAndNavigate() {
        setLinkEnabled(prevState => !prevState);    }

    useEffect(() => {
        console.log("Effect triggered, linkEnabled:", linkEnabled);
        if (linkEnabled) {
            navigate("/blogs");
        } else {
            navigate("/");
        }
    }, [linkEnabled]); 

    
    return(
        <header id = "nav-bar">
            <Link to = "/" id = "heading" >Web & Wizards</Link>
            <button className = "Link" onClick = {toggleLinkDirectionAndNavigate}>{linkEnabled ? "Home" : "View Blogs"}</button>
            {/* <button onClick = {sendData}>Add Blog</button> */}
        </header>
    );
}

export default Navigation;