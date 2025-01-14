import React, { useEffect, useState } from 'react';
import { fetchData, postData, updateData } from '../api';
import './Common.css';
import { Link } from 'react-router-dom';

const Mieszkaniec = ({ isAdmin }) => {
    const [data, setData] = useState([]);
    const [formData, setFormData] = useState({
        id: '',
        username: '',
        first_name: '',
        last_name: '',
        adres: '',
        telefon: '',
        email: '',
        password: ''
    });

    useEffect(() => {
        const getData = async () => {
            const endpoint = 'users/';
            const result = await fetchData(endpoint);
            setData(result);
        };
        getData();
    }, [isAdmin]);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (isAdmin) {
            await postData('users/', formData);
        } else {
            await updateData(`users/${formData.id}/`, formData);
        }
        setFormData({
            id: '',
            username: '',
            first_name: '',
            last_name: '',
            adres: '',
            telefon: '',
            email: '',
            password: ''
        });
    };

    return (
        <div className="container">
            <h1>Mieszkańcy</h1>
            {isAdmin && (
                <form onSubmit={handleSubmit}>
                    <input type="text" name="username" value={formData.username} onChange={handleChange} placeholder="Username" required />
                    <input type="text" name="first_name" value={formData.first_name} onChange={handleChange} placeholder="First Name" required />
                    <input type="text" name="last_name" value={formData.last_name} onChange={handleChange} placeholder="Last Name" required />
                    <input type="text" name="adres" value={formData.adres} onChange={handleChange} placeholder="Adres" required />
                    <input type="text" name="telefon" value={formData.telefon} onChange={handleChange} placeholder="Telefon" required />
                    <input type="email" name="email" value={formData.email} onChange={handleChange} placeholder="Email" required />
                    <input type="password" name="password" value={formData.password} onChange={handleChange} placeholder="Password" required />
                    <button type="submit">Dodaj Mieszkańca</button>
                </form>
            )}
            {data.length > 0 ? (
                data.map((item) => (
                    <div key={item.id} className="data-block">
                        <p><strong>ID:</strong> {item.id}</p>
                        <p><strong>Username:</strong> {item.username}</p>
                        <p><strong>First Name:</strong> {item.first_name}</p>
                        <p><strong>Last Name:</strong> {item.last_name}</p>
                        <p><strong>Adres:</strong> {item.adres}</p>
                        <p><strong>Telefon:</strong> {item.telefon}</p>
                        <p><strong>Email:</strong> {item.email}</p>
                        {!isAdmin && (
                            <button onClick={() => setFormData(item)}>Edytuj</button>
                        )}
                    </div>
                ))
            ) : (
                <p>Brak danych do wyświetlenia</p>
            )}
            {!isAdmin && formData.id && (
                <form onSubmit={handleSubmit}>
                    <input type="text" name="username" value={formData.username} onChange={handleChange} placeholder="Username" required />
                    <input type="text" name="first_name" value={formData.first_name} onChange={handleChange} placeholder="First Name" required />
                    <input type="text" name="last_name" value={formData.last_name} onChange={handleChange} placeholder="Last Name" required />
                    <input type="text" name="adres" value={formData.adres} onChange={handleChange} placeholder="Adres" required />
                    <input type="text" name="telefon" value={formData.telefon} onChange={handleChange} placeholder="Telefon" required />
                    <input type="email" name="email" value={formData.email} onChange={handleChange} placeholder="Email" required />
                    <input type="password" name="password" value={formData.password} onChange={handleChange} placeholder="Password" />
                    <button type="submit">Zaktualizuj dane</button>
                </form>
            )}
            <Link to="/" className="button">Powrót do Home</Link>
        </div>
    );
};

export default Mieszkaniec;