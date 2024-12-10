import React, {useEffect, useState} from 'react';
import axios from "axios";
import {SERVERIP} from "../../header/MarketConstants";

const Logs = () => {
    const [loading, setLoading] = useState(true);
    const [data, setData] = useState([])
    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                const {data: response} = await axios.get('http://3.218.8.102/api/insyte-logs?page=0&size=20&sort=id');
                setData(response);
            } catch (error) {
                console.error(error.message);
            }
            setLoading(false);
        }
        fetchData();
    }, []);
    return (
        <div className="min-h-screen bg-gray-900 text-white flex flex-col items-center p-6">
            {loading && <div>Loading</div>}
            <h1 className="text-4xl mb-8">Log List</h1>
            <ul className="w-full max-w-2xl">
                {data.map((log) => (
                    <li
                        key={log.id}
                        className="bg-gray-800 p-4 mb-4 rounded shadow hover:bg-gray-700 transition"
                    >
                        <h2 className="text-2xl">{log.name}</h2>
                        <p>{log.activity}</p>
                        <p className="text-gray-400">{log.rundate}</p>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Logs;
