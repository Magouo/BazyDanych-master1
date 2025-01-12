import React, { useEffect, useState } from 'react';
import { fetchData } from '../api';
import { Link } from 'react-router-dom';

const Uchwala = ({ isAdmin }) => {
    const [data, setData] = useState([]);

    useEffect(() => {
        const getData = async () => {
            const endpoint = 'uchwaly/';
            const result = await fetchData(endpoint);
            setData(result);
        };
        getData();
    }, [isAdmin]);

    return (
        <div>
            <h1>Uchwala</h1>
            <pre>{JSON.stringify(data, null, 2)}</pre>
            <Link to="/">Powrót do Home</Link>
        </div>
    );
};

export default Uchwala;