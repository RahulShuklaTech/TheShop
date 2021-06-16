import React, { useEffect } from 'react'
import { useState } from 'react';

import { Login } from './Login'
import fireDb from "../fireDB";

import {  Route, Switch, useHistory } from 'react-router-dom';
import { Categories } from './Categories';




export const Main = () => {

    const history = useHistory();

    // const [trips, setTrips] = useState([]);
    const [user, setUser] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [emailError, setEmailError] = useState("");
    const [passwordError, setPasswordError] = useState("");
    const [hasAccount, setHasAccount] = useState(false);

    const handleLogin = () => {
        clearErrors();
        fireDb
            .auth()
            .signInWithEmailAndPassword(email, password)
            .catch(err => {

                switch (err.code) {
                    case "auth/invalid-email":
                    case "auth/user-disabled":
                    case "auth/user-not-found":
                        setEmailError(err.message);
                        break;
                    case "auth/wrong-password":
                        setPasswordError(err.message);
                        break;
                    default:
                        break;
                }
            });
            if(user){
                history.push("/categories")
            }
        

    }


    const handleSignUp = () => {
        clearErrors();
        let error = false
        fireDb
            .auth()
            .createUserWithEmailAndPassword(email, password)
            .catch(err => {
                switch (err.code) {
                    case "auth/email-already-in-use":
                    case "auth/invalid-email":
                        setEmailError(err.message);
                        error =true;
                        console.log(error)
                        break;
                    case "auth/weak-password":
                        setPasswordError(err.message);
                        error = true
                        console.log(error)
                        break;
                    default: 

                }
            }).finally(() => {
                if(user && !error){
                    history.push("/categories")
                }
            })
            
            

    }


    const handleLogout = () => {
        fireDb.auth().signOut();
        console.log("i happened")
        history.push("/")
        
    }

    const authListener = () => {
        fireDb.auth().onAuthStateChanged(user => {
            if (user) {
                clearInput();
                setUser(user);




            } else {
                setUser("");
            }
        })
    }

    useEffect(() => {
        authListener();
        getTripsFromDatabase()
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [user]);

 
    async function getTripsFromDatabase() {

        // try {
        //     const ref = fireDb.firestore().collection("trips")
        //     const doc = await ref.where('user','==', user.email).get();
        //     if (doc.empty) {
        //         console.log('No matching documents.');
        //         return;
        //       }  
        //       let dtrips = []
        //       doc.forEach(doc => {
        //           dtrips.push(doc.data())
        //         console.log(doc.id, '=>', doc.data());
        //       });
              
        //     //   setTrips(dtrips)
        // }catch(e){
        //     console.log(e.message)
        // }
        
    }


    const clearInput = () => {
        setEmail("");
        setPassword("");
    }

    const clearErrors = () => {
        setEmailError("");
        setPasswordError("");
    }
    return (
        <div>
                <Switch>
                    <Route exact path="/" render={(props) => (
                        <Login
                            {...props}
                            email={email}
                            setEmail={setEmail}
                            password={password}
                            setPassword={setPassword}
                            handleLogin={handleLogin}
                            handleSignUp={handleSignUp}
                            hasAccount={hasAccount}
                            setHasAccount={setHasAccount}
                            emailError={emailError}
                            passwordError={passwordError}
                        />
                    )} />

                    <Route  path="/categories" render = {(props) => (
                        <Categories
                        {...props}
                        //  trips={trips}
                        //  setTrips={setTrips}
                         user = {user.email}
                         handleLogout = {handleLogout} />
                    )} />  
                        
                    {/* <Route exact path = "/profile" render = {(props) => {
                       return <ProfilePage 
                            {...props}
                            user={user.email}
                            trips={trips}
                            handleLogout = {handleLogout} />
                        
                    }} /> */}
                    
                </Switch>
        </div>
    )
}
