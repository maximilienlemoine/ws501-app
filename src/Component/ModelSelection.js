import React, {startTransition} from 'react';
import {useNavigate} from 'react-router-dom';

function ModelSelection({models}) {
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