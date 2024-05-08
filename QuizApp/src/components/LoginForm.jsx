import React, { useState } from 'react';
import axios from 'axios';
import QuizSelectPage from '../Pages/QuizSelectPage';
import ScoreBoard from './ScoreBoard';

function Form() {
    const [name, setName] = useState("");
    const [password, setPassword] = useState("");
    const [isLogin, setIsLogin] = useState(true);
    const [navigate, setNavigate] = useState(false);

    function handleNameChange(e) {
        setName(e.target.value);
    }

    function handlePasswordChange(e) {
        setPassword(e.target.value);
    }

    function handleSubmit(e) {
        e.preventDefault();
        const baseUrl = 'http://localhost:3000'; 
        let url;
        if (isLogin) {
            url = `${baseUrl}/login`;
        } else {
            url = `${baseUrl}/register`; 
        }
        axios.post(url, { username: name, password })
            .then(response => {
                if (response.data.success) {
                    localStorage.setItem('token', response.data.token);
                    localStorage.setItem('username', name);
                    setNavigate(true);
                } else {
                    // handle error
                }
            });
    }

    if (navigate) {
        return <QuizSelectPage />
    }

    let headerText;
    if (isLogin) {
        headerText = 'Login';
    } else {
        headerText = 'Register';
    }

    let buttonText;
    if (isLogin) {
        buttonText = 'Login';
    } else {
        buttonText = 'Register';
    }

    let switchButtonText;
    if (isLogin) {
        switchButtonText = 'Switch to Register';
    } else {
        switchButtonText = 'Switch to Login';
    }

    return (
        <div>
            <h2>{headerText}</h2>
            <form onSubmit={handleSubmit}>
                <input value={name} onChange={handleNameChange} required placeholder="Username" />
                <input type="password" value={password} onChange={handlePasswordChange} required placeholder="Password" />
                <button type="submit">{buttonText}</button>
            </form>
            <button onClick={() => setIsLogin(!isLogin)}>{switchButtonText}</button>
            <div className="card">
                <ScoreBoard />
            </div>
        </div>
    );
}

export default Form;