import React from 'react'
import "./styles/LoginStyle.css"
export const Login = (props) => {

    const {
        email,
        setEmail,
        password,
        setPassword,
        handleLogin,
        handleSignUp,
        hasAccount,
        setHasAccount,
        emailError,
        passwordError } = props;

    return (
        <div className="login">
            
            <div className="loginContainer">
                <h2 className ="welcome">Welcome to The Shop</h2>
                <label>Username</label>
                <input
                    type="text"
                    required
                    value={email}
                    onChange={e => setEmail(e.target.value)}


                />
                <p className="errorMsg">{emailError}</p>

                <label>Password</label>
                <input 
                    type="password"
                    required
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                />
                <p className="passwordMsg">{passwordError}</p>

                <div className="btnContainer">
                    {hasAccount ?
                        <>
                            <button class = "button" onClick = {handleLogin}>Sign In</button>
                            <p>Don't have an account ? <span onClick = {() => setHasAccount(!hasAccount)} >Sign up</span></p>
                        </>
                        :
                        <>
                            <button class = "button" onClick = {handleSignUp}>Sign Up</button>
                            <p>Have an account ? <span onClick = {() => setHasAccount(!hasAccount)} >Sign in</span></p>
                        </>
                    }
                </div>

            </div>

        </div>
    )
}
