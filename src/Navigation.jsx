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
        if (linkEnabled) {
            navigate("/blogs");
        } else {
            navigate("/");
        }
    }, [linkEnabled]); 

    
    return(
        <header id = "nav-bar">
            <Link to = "/" id = "heading" ><img src="/W&W.png" alt="wizard" id ="logo" onClick={toggleLinkDirectionAndNavigate}/></Link>
            <button className = "Link" onClick = {toggleLinkDirectionAndNavigate}>{linkEnabled ? "Home" : "View Blogs"}</button>
        </header>
    );
}

export default Navigation;