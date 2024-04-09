import React, {startTransition, useEffect, useState} from 'react';
import {useNavigate} from 'react-router-dom';

function ModelSelection() {
    const [models, setModels] = useState([]);

    useEffect(() => {
        fetchData()
    }, [])

    const fetchData = async () => {
        const response = await fetch('http://localhost:8000/model')
        const data = await response.json()
        setModels(data)
    }

    const navigate = useNavigate();

    const handleModelClick = (model) => {
        startTransition(() => {
            navigate(`/model/`, { state: { model } });
        });
    }

    return (
        <div>
            <h2>Selectionnez un modèle</h2>
            {models.map((model, index) => (
                <button key={index} onClick={() => handleModelClick(model)}>
                    {model.name}
                </button>
            ))}
        </div>
    );
}

export default ModelSelection;