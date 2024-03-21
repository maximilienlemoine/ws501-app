import './App.css';
import React, {startTransition, useEffect, useState} from "react";
import {GLTFLoader} from "three/addons";
import Models from "./Component/Models";
import {Route, Routes, useNavigate} from "react-router-dom";

function App() {
    const loader = new GLTFLoader()
    const [file, setFile] = useState();
    const [gltf, setGltf] = useState();
    const [models, setModels] = useState();
    const [model, setModel] = useState();
    const [modelName, setModelName] = useState();
    const frontWheel = React.createRef();
    const backWheel = React.createRef();
    const navigate = useNavigate(); // Add this line

    useEffect(() => {
        fetchData()
    }, [])

    const fetchData = async () => {
        const response = await fetch('http://localhost:8081/model')
        const data = await response.json()
        setModels(data)
    }

    function handleChangeFile(event) {
        setFile(event.target.files[0])
    }

    function handleChangeModelName(event) {
        setModelName(event.target.value)
    }

    function handleChangeModel(event) {
        const model = models.find(model => model.id === parseInt(event.target.value))
        setModel(model)
    }

    function handleLoadModel() {
        startTransition(() => {
            navigate(`/model/${model.file_name}`);
        });
    }

    async function onSubmitGLB() {
        const form = new FormData();
        form.append('file', file);
        const options = {
            method: 'POST',
            headers: {}
        };
        options.body = form;

        try {
            const response = await fetch('http://localhost:8081/upload', options)
            const data = await response.json();
            loader.load(
                await data.url,
                (gltf) => {
                    setGltf(gltf)
                    setModelName(gltf.scene.name)
                    console.log('success', gltf)
                },
                (progress) => {
                    console.log('progress', progress)
                },
                (error) => {
                    console.log('error', error)
                }
            )
        } catch (error) {
            console.error('Error:', error);
        }
    }

    async function onSubmitModel() {
        const json = {
            name: `${modelName}`,
            file_name: `${file.name}`,
            front_wheel: `${frontWheel.current.value}`,
            back_wheel: `${backWheel.current.value}`,
        }

        const options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            }
        };
        options.body = JSON.stringify(json);

        try {
            const response = await fetch('http://localhost:8081/model', options)
            const data = await response.json()
            console.log(data)
        } catch (e) {
            console.error('Error:', e);
        }
    }

    return (
        <div className="App">
            <header className="App-header">
                <h1>Modèles 3D</h1>
                    <section>
                        {models && (
                            <section>
                                <h2>Liste des modèles 3D</h2>
                                <select onChange={handleChangeModel}>
                                    {models.map((model, index) => (
                                        <option key={index} value={model.id}>{model.name}</option>
                                    ))}
                                </select>

                                {model && (
                                    <section>
                                        <h3>Details</h3>
                                        <ul>
                                            <li>Nom: {model.name}</li>
                                            <li>Fichier: {model.file_name}</li>
                                            <li>Roue avant: {model.front_wheel}</li>
                                            <li>Roue arrière: {model.back_wheel}</li>
                                        </ul>
                                        <button onClick={handleLoadModel}>Charger</button> {/* Add the onClick handler here */}
                                    </section>
                                )}
                            </section>
                        )}
                        {gltf && (
                            <section>
                                <h2>Modèle 3D chargé</h2>
                                <li>Nom: <input type={"text"} onChange={handleChangeModelName} value={modelName}/></li>

                                Selectionnez les meshs correspondant :
                                <ul>
                                    <li>Roue avant
                                        <select ref={frontWheel}>
                                            {gltf.scene.children.map((child, index) => (
                                                <option key={index} value={child.name}>{child.name}</option>
                                            ))}
                                        </select>
                                    </li>
                                    <li>Roue arrière
                                        <select ref={backWheel}>
                                            {gltf.scene.children.map((child, index) => (
                                                <option key={index} value={child.name}>{child.name}</option>
                                            ))}
                                        </select>
                                    </li>
                                </ul>
                                <button onClick={onSubmitModel}>Valider</button>
                            </section>
                        )}
                        {!gltf && (
                            <section>
                                <h2>Charger un modèle 3D</h2>
                                <input type="file" onChange={handleChangeFile}/>
                                {file && (
                                    <section>
                                        Détails du modèle 3D:
                                        <ul>
                                            <li>Nom: {file.name}</li>
                                            <li>Poids: {file.size} bytes</li>
                                        </ul>
                                    </section>
                                )}
                                <button onClick={onSubmitGLB}>Submit</button>
                            </section>
                        )}
                    </section>
            </header>
            <Routes>
                <Route path="/model/:name" element={<Models />} /> {/* Add this line */}
            </Routes>
        </div>
    );
}

export default App;
