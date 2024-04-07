import './App.css';
import React from "react";
import Models from "./Component/Models";
import ModelSelection from "./Component/ModelSelection";
import Import from "./Component/Import";
import { Routes, Route, Link } from 'react-router-dom';

function App() {
    return (
        <div className="App">
            <header className="App-header">
                <h1>Modèles 3D</h1>
                <nav>
                    <Link to="/select-model">Select Model</Link>
                    <Link to="/secure-import">Secure Import</Link>
                </nav>
                <Routes>
                    <Route path="/select-model" element={<ModelSelection/>} />
                    <Route path="/secure-import" element={<Import />} />
                    <Route path="/model/:name" element={<Models />} />
                </Routes>
            </header>
        </div>
    );
}

export default App;