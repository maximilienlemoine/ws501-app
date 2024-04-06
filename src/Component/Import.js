import React, {useState} from 'react';
import {GLTFLoader} from "three/addons";

function Import() {
    // Vérifiez si l'utilisateur est authentifié
    const isAuthenticated = true// Votre logique d'authentification ici
    const loader = new GLTFLoader()
    const [file, setFile] = useState();
    const [gltf, setGltf] = useState();
    const [modelName, setModelName] = useState();
    const frontWheel = React.createRef();
    const backWheel = React.createRef();

    function handleChangeModelName(event) {
        setModelName(event.target.value)
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
            const response = await fetch('http://localhost:8000/model', options)
            const data = await response.json()
            console.log(data)
        } catch (e) {
            console.error('Error:', e);
        }
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
            const response = await fetch('http://localhost:8000/upload', options)
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
    function handleChangeFile(event) {
        setFile(event.target.files[0])
    }

    if (!isAuthenticated) {
        return <h1>Accès refusé. Vous devez être connecté pour accéder à cette page.</h1>
    }

    return (
        <div>
            <h1>Page d'import sécurisée</h1>
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
        </div>
    );
}

export default Import;