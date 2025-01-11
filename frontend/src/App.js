import React, { useEffect, useState } from 'react';
import { fetchData, login } from './api';

const App = () => {
    const [data, setData] = useState([]);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = async (e) => {
        e.preventDefault();
        const loginResult = await login(username, password);
        if (loginResult.token) {
            setIsLoggedIn(true);
        } else {
            alert('Login failed');
        }
    };

    useEffect(() => {
        if (isLoggedIn) {
            const getData = async () => {
                const token = localStorage.getItem('token');
                const result = await fetchData('users/', {
                    headers: {
                        'Authorization': `Token ${token}`,
                    },
                });
                setData(result);
            };
            getData();
        }
    }, [isLoggedIn]);

    return (
        <div>
            <h1>Data from Backend</h1>
            {!isLoggedIn ? (
                <form onSubmit={handleLogin}>
                    <div>
                        <label>Username:</label>
                        <input
                            type="text"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                        />
                    </div>
                    <div>
                        <label>Password:</label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>
                    <button type="submit">Login</button>
                </form>
            ) : (
                <pre>{JSON.stringify(data, null, 2)}</pre>
            )}
        </div>
    );
};

export default App;