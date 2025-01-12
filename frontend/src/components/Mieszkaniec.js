import React, { useEffect, useState } from 'react';
import { fetchData } from '../api';
import { Link } from 'react-router-dom';

const Mieszkaniec = ({ isAdmin }) => {
    const [data, setData] = useState([]);

    useEffect(() => {
        const getData = async () => {
            const endpoint = isAdmin ? 'users/' : 'users/';
            const result = await fetchData(endpoint);
            setData(result);
        };
        getData();
    }, [isAdmin]);

    return (
        <div>
            <h1>Mieszkaniec</h1>
            <pre>{JSON.stringify(data, null, 2)}</pre>
            <Link to="/">Powrót do Home</Link>
        </div>
    );
};

export default Mieszkaniec;