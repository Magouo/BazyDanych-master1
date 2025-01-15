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

    const handleLogout = () => {
        setUsername('');
        setPassword('');
        setIsLoggedIn(false);
        setIsAdmin(false);
        localStorage.removeItem('token');
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

    useEffect(() => {
        const checkUserInfo = async () => {
            const token = localStorage.getItem('token');
            if (token) {
                const userInfo = await getUserInfo();
                if (userInfo) {
                    setIsLoggedIn(true);
                    setIsAdmin(userInfo.is_staff);
                } else {
                    localStorage.removeItem('token');
                }
            }
        };
        checkUserInfo();
    }, []);

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
                        handleLogout={handleLogout}
                    />
                ) : (
                    <>
                        <Routes>
                            <Route path="/" element={<Home handleLogout={handleLogout} />} />
                            <Route path="/mieszkaniec" element={<Mieszkaniec isAdmin={isAdmin} />} />
                            <Route path="/stworz-mieszkanca/" element={<Mieszkaniec isAdmin={isAdmin}/>} />
                            <Route path="/uchwala" element={<Uchwala isAdmin={isAdmin}/>} />
                            <Route path="/harmonogram" element={<Harmonogram />} />
                            <Route path="/usterka" element={<Usterka isAdmin={isAdmin} />} />
                            <Route path="/usterki/admin/:id" element={<Usterka isAdmin={isAdmin} />} />
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