import React from 'react'
import { Link } from 'react-router-dom';
import fireDb from "../fireDB";



const Nav = () => {
    
    const handleLogout = () => {
        fireDb.auth().signOut();
    }
    return (
        <div className = "nav">
            <ul class="nav-ul">
                <li> <Link to="/categories">Categories</Link>  </li>
                <li><Link to="/laptops">Laptops</Link> </li>
                <li><Link to="/mobiles">Mobiles</Link> </li>
                <li><Link to="/appliances">Appliances</Link> </li>
                <li onClick = {handleLogout}><Link to="/">Logout</Link></li>
            </ul>
        </div>
    )
}

export default Nav
