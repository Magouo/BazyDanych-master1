import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate, Link } from 'react-router-dom';
import { login, getUserInfo } from './api';
import Home from './components/Home';
import Mieszkaniec from './components/Mieszkaniec';
import Uchwala from './components/Uchwala';
import Harmonogram from './components/Harmonogram';
import Usterka from './components/Usterka';
import Licznik from './components/Licznik';
import Rozliczenia from './components/Rozliczenia';
import Login from './components/Login';

const App = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [isAdmin, setIsAdmin] = useState(false);
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = async (e) => {
        e.preventDefault();
        const loginResult = await login(username, password);
        if (loginResult.token) {
            setIsLoggedIn(true);
            const userInfo = await getUserInfo();
            setIsAdmin(userInfo.is_staff);
        } else {
            alert('Login failed');
        }
    };

    useEffect(() => {
        const checkUserInfo = async () => {
            if (isLoggedIn) {
                const userInfo = await getUserInfo();
                setIsAdmin(userInfo.is_staff);
            }
        };
        checkUserInfo();
    }, [isLoggedIn]);

    return (
        <Router>
            <div>
                {!isLoggedIn ? (
                    <Login
                        username={username}
                        setUsername={setUsername}
                        password={password}
                        setPassword={setPassword}
                        handleLogin={handleLogin}
                    />
                ) : (
                    <>

                        <Routes>
                            <Route path="/" element={<Home />} />
                            <Route path="/mieszkaniec" element={<Mieszkaniec />} />
                            <Route path="/uchwala" element={<Uchwala />} />
                            <Route path="/harmonogram" element={<Harmonogram />} />
                            <Route path="/usterka" element={<Usterka />} />
                            <Route path="/liczniki" element={<Licznik />} />
                            <Route path="/rozliczenia" element={<Rozliczenia />} />
                            <Route path="*" element={<Navigate to="/" />} />
                        </Routes>
                    </>
                )}
            </div>
        </Router>
    );
};

export default App;