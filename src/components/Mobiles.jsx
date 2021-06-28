import React, { useEffect, useState } from 'react'
import fireDb from "../fireDB";
import "./styles/ItemStyles.css"
import Nav from './Nav';




export const Mobiles = ({ handleLogout }) => {

    const [phones, setPhones] = useState([])

    const [showform, setShowForm] = useState(false)

    const [name, setName] = useState("")
    const [price, setPrice] = useState(0)
    const [dec, setDesc] = useState("")
    const [image, setImage] = useState("")
    const [qty, setQty] = useState(0)

    async function getMobilesFromDatabase() {

        try {
            const ref = fireDb.firestore().collection("mobiles")
            const doc = await ref.get();
            if (doc.empty) {
                return;
            }
            let dtrips = []
            doc.forEach(doc => {
                let obj = doc.data();
                obj.id = doc.id;
                dtrips.push(obj)
            });

            setPhones(dtrips)

        } catch (e) {
            console.log(e.message)
        }

    }

    async function addToDatabase(name, price, description, image, quantity) {
        const ref = fireDb.firestore().collection("mobiles")

        let product = await ref.add({
            name,
            price,
            description,
            image,
            quantity,


        });

        let phonesCopy = [...phones]
        phonesCopy.push({
            name,
            price,
            description,
            image,
            quantity,
            id:product.id

        })
        setPhones(phonesCopy)
        

    }


    const deleteItem = async (id) => {
        const ref = fireDb.firestore().collection("mobiles");
        await ref.doc(id).delete();
        let phonesCopy = [...phones]
        phonesCopy = phones.filter(item => item.name !== name);
        setPhones(phonesCopy)


    }



    useEffect(() => {
        getMobilesFromDatabase();
    }, [])


    return (

        <div className="container">
            <Nav/>

            <div className="inner-container">
               
                <h1>Mobiles</h1>

                <div className="items">
                    {
                        phones.map((item, index) => <div className="item" key={index}>
                            <div className="itemName">Name: {item.name}</div>
                            <div className="itemDesc">Description: {item.description}</div>
                            <div className="itemPrice">Price: {item.price}</div>
                            <div className="image"><img src={item.image} alt={item.name} /></div>
                            <div className="delete"><button onClick={() => deleteItem(item.id)}>Remove Item</button></div>
                        </div>)
                    }
                </div>
                <button onClick={() => setShowForm(form => !form)}>Add Mobile</button>
                {showform && <div className="form">
                    <div><label htmlFor="name">Name</label>
                        <input
                            className="input-bar"
                            type="text"
                            onChange={(e) => setName(e.target.value)}
                            value={name}
                        />
                    </div>
                    <div><label htmlFor="price">Price</label>
                        <input
                            className="input-bar"
                            type="number"
                            onChange={(e) => setPrice(e.target.value)}
                            value={price}
                        />
                    </div>
                    <div><label htmlFor="desc">Description</label>
                        <input
                            className="input-bar"
                            type="text"
                            onChange={(e) => setDesc(e.target.value)}
                            value={dec}
                        />
                    </div>
                    <div><label htmlFor="image">Enter Image Url</label>
                        <input
                            className="input-bar"
                            type="text"
                            onChange={(e) => setImage(e.target.value)}
                            value={image}
                        />
                    </div>
                    <div><label htmlFor="image">Enter Quantity</label>
                        <input
                            className="input-bar"
                            type="text"
                            onChange={(e) => setQty(e.target.value)}
                            value={qty}
                        />
                    </div>
                    <div><button onClick={() => { addToDatabase(name, price, dec, image, qty); setShowForm(false) }}>Submit</button></div>
                </div>}
            </div>
        </div>
    )
}
