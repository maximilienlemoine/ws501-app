import './App.css';
import 'react-tooltip/dist/react-tooltip.css'
import React from "react";
import Models from "./Component/Models";
import ModelSelection from "./Component/ModelSelection";
import Import from "./Component/Import";
import { Routes, Route, Link } from 'react-router-dom';

function App() {
    return (
        <div className="App">
            <header className="App-header">
                <h1>Configurateur Ellipse Bikes</h1>
                <nav className={'flex gap-10 justify-center'}>
                    <Link to="/select-model">Selectionner un modèle PRO</Link>
                    <Link to="/secure-import">Importer un modèle</Link>
                </nav>
                <Routes>
                    <Route path="/select-model" element={<ModelSelection/>} />
                    <Route path="/secure-import" element={<Import />} />
                    <Route path="/model/" element={<Models />} />
                </Routes>
            </header>
        </div>
    );
}

export default App;