import React from 'react'
import { Link } from 'react-router-dom';
import "./styles/ItemStyles.css"
import Nav from './Nav';

export const Categories = () => {
    return (
        
        <div className="container">
            <Nav />
            <div className="inner-container">
                <button class="logout">Log out</button>
                <h1>Categories</h1>
                <div className="mobiles"><Link to="/mobiles">Mobiles</Link></div>
                <div className="laptops"><Link to="/laptops">Laptops</Link></div>
                <div className="appliances"><Link to="/appliances">Appliances</Link></div>
            </div>
        </div>
    )
}
