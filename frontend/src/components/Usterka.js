import React, { useEffect, useState } from 'react';
import { fetchData, postData, updateData } from '../api';
import { Link, useParams } from 'react-router-dom';

const Usterka = ({ isAdmin }) => {
    const { id } = useParams();
    const [data, setData] = useState([]);
    const [newUsterka, setNewUsterka] = useState('');
    const [usterka, setUsterka] = useState(null);
    const [newStatus, setNewStatus] = useState('');

    useEffect(() => {
        const getData = async () => {
            if (id) {
                const result = await fetchData(`usterki/admin/${id}/`);
                setUsterka(result);
                setNewStatus(result.status);
            } else {
                const result = await fetchData('usterki/');
                setData(result);
            }
        };
        getData();
    }, [id, isAdmin]);

    const handleAddUsterka = async () => {
        if (isAdmin) {
            alert('Admins cannot add new issues');
            return;
        }
        try {
            const result = await postData('usterki/', { opis: newUsterka });
            setData([...data, result]);
            setNewUsterka('');
        } catch (error) {
            console.error('Error adding usterka:', error);
            alert('Failed to add usterka');
        }
    };

    const handleUpdateUsterka = async () => {
        if (isAdmin) {
            alert('Only admins can change the status');
            return;
        }
        try {
            const result = await updateData(`usterki/admin/${id}/`, { status: newStatus });
            setUsterka(result);
            alert('Status updated successfully');
        } catch (error) {
            console.error('Error updating usterka:', error);
            alert('Failed to update usterka');
        }
    };

    const handleStatusChange = (id, status) => {
        setData(data.map(item => item.id === id ? { ...item, status } : item));
    };

    const handleUpdateStatus = async (id, status) => {
        try {
            const result = await updateData(`usterki/admin/${id}/`, { status });
            setData(data.map(item => item.id === id ? result : item));
            alert('Status updated successfully');
        } catch (error) {
            console.error('Error updating status:', error);
            alert('Failed to update status');
        }
    };

    if (id && usterka) {
        return (
            <div>
                <h1>Usterka</h1>
                <p>{usterka.opis}</p>
                <select
                    value={newStatus}
                    onChange={(e) => setNewStatus(e.target.value)}
                >
                    <option value="nowa">Nowa</option>
                    <option value="w trakcie">W trakcie</option>
                    <option value="naprawiona">Naprawiona</option>
                </select>
                <button onClick={handleUpdateUsterka}>Zaktualizuj status</button>
                <Link to="/">Powrót do Home</Link>
            </div>
        );
    }

    return (
        <div>
            <h1>Usterka</h1>
            <pre>{JSON.stringify(data, null, 2)}</pre>
            <Link to="/">Powrót do Home</Link>
            {!isAdmin && (
                <div>
                    <input
                        type="text"
                        value={newUsterka}
                        onChange={(e) => setNewUsterka(e.target.value)}
                        placeholder="Dodaj nową usterkę"
                    />
                    <button onClick={handleAddUsterka}>Dodaj</button>
                </div>
            )}
            {isAdmin && (
                <div>
                    {data.map((item) => (
                        <div key={item.id}>
                            <p>{item.opis}</p>
                            <Link to={`/usterki/admin/${item.id}`}>Edytuj</Link>
                            <div>
                                <select
                                    value={item.status}
                                    onChange={(e) => handleStatusChange(item.id, e.target.value)}
                                >
                                    <option value="nowa">Nowa</option>
                                    <option value="w trakcie">W trakcie</option>
                                    <option value="naprawiona">Naprawiona</option>
                                </select>
                                <button onClick={() => handleUpdateStatus(item.id, item.status)}>Zaktualizuj status</button>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default Usterka;