import './App.css';
import React, {useState} from "react";
import {GLTFLoader} from "three/addons";

function App() {
    const loader = new GLTFLoader()
    const [file, setFile] = useState();
    const [gltf, setGltf] = useState();

    function handleChange(event) {
        setFile(event.target.files[0])
    }

    function onSubmit() {
        const url = URL.createObjectURL(file);
        loader.load(
            url,
            (gltf) => {
                setGltf(gltf)
                console.log('success', gltf)
            },
            (progress) => {
                console.log('progress', progress)
            },
            (error) => {
                console.log('error', error)
            }
        )
    }

    return (
        <div className="App">
            <header className="App-header">
                {gltf && (
                    <section>
                        <h2>Modèle 3D chargé</h2>
                            <li>Nom: {gltf.scene.name}</li>
                            {gltf.scene.children.map((child, index) => (
                                <div key={index}>Elément {index}: {child.name}
                                </div>
                            ))}
                    </section>
                )}
                {!gltf && (
                    <section>
                        <h2>Charger un modèle 3D</h2>
                        <input type="file" onChange={handleChange}/>
                        {file && (
                            <section>
                                Détails du modèle 3D:
                                <ul>
                                    <li>Nom: {file.name}</li>
                                    <li>Poids: {file.size} bytes</li>
                                </ul>
                            </section>
                        )}
                        <button onClick={onSubmit}>Submit</button>
                    </section>
                )}
            </header>
        </div>
    );
}

export default App;
