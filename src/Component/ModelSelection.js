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

    const handleModelClick = (modelName) => {
        startTransition(() => {
            navigate(`/model/${modelName}`);
        });
    }

    return (
        <div>
            <h1>Selectionnez un modèle</h1>
            {models.map((model, index) => (
                <button key={index} onClick={() => handleModelClick(model.file_name)}>
                    {model.name}
                </button>
            ))}
        </div>
    );
}

export default ModelSelection;