import React, { useEffect, useState } from 'react';
import { fetchData } from '../api';
import './Common.css'; // Import the common CSS file

const Harmonogram = () => {
    const [data, setData] = useState([]);

    useEffect(() => {
        const getData = async () => {
            const result = await fetchData('spotkania/');
            setData(result);
        };
        getData();
    }, []);

    return (
        <div className="container">
            <h1>Harmonogramy</h1>
            {data.length > 0 ? (
                data.map((item) => (
                    <div key={item.id} className="data-block">
                        <p><strong>ID:</strong> {item.id}</p>
                        <p><strong>Tytuł:</strong> {item.tytul}</p>
                        <p><strong>Data Spotkania:</strong> {item.data_spotkania}</p>
                        <p><strong>Czas Spotkania:</strong> {item.czas_spotkania}</p>
                        <p><strong>Opis:</strong> {item.opis}</p>
                        <p><strong>Uczestnicy:</strong> {item.uczestnicy.map(u => u.first_name + ' ' + u.last_name).join(', ')}</p>
                    </div>
                ))
            ) : (
                <p>Brak danych do wyświetlenia</p>
            )}
        </div>
    );
};

export default Harmonogram;