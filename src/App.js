import './App.css';
import React, {useEffect, useState} from "react";
import Models from "./Component/Models";
import ModelSelection from "./Component/ModelSelection";
import Import from "./Component/Import";
import { Routes, Route, Link } from 'react-router-dom';

function App() {
    const [models, setModels] = useState([]);

    useEffect(() => {
        fetchData()
    }, [])

    const fetchData = async () => {
        const response = await fetch('http://localhost:8000/model')
        const data = await response.json()
        setModels(data)
    }


    return (
        <div className="App">
            <header className="App-header">
                <h1>Modèles 3D</h1>
                <nav>
                    <Link to="/select-model">Select Model</Link>
                    <Link to="/secure-import">Secure Import</Link>
                </nav>
                <Routes>
                    <Route path="/select-model" element={<ModelSelection models={models} />} />
                    <Route path="/secure-import" element={<Import />} />
                    <Route path="/model/:name" element={<Models />} />
                </Routes>
            </header>
        </div>
    );
}

export default App;