import React, {startTransition, useState} from 'react';
import {GLTFLoader} from "three/addons";
import {useNavigate} from "react-router-dom";

function Import() {
    const isAuthenticated = true;
    const loader = new GLTFLoader();
    const [file, setFile] = useState();
    const [gltf, setGltf] = useState();
    const [modelName, setModelName] = useState();
    const frame = React.createRef();
    const belt = React.createRef();
    const chain = React.createRef();
    const normal_fork = React.createRef();
    const suspension_fork = React.createRef();
    const normal_seat = React.createRef();
    const suspension_seat = React.createRef();
    const rear_stand = React.createRef();
    const central_stand = React.createRef();
    const front_luggage_rack = React.createRef();
    const back_luggage_rack = React.createRef();
    const simple_back_rack = React.createRef();
    const front_daily = React.createRef();
    const back_daily = React.createRef();
    const front_daily_mixte = React.createRef();
    const back_daily_mixte = React.createRef();
    const front_epic_standard = React.createRef();
    const back_epic_standard = React.createRef();
    const front_epic_bois = React.createRef();
    const back_epic_bois = React.createRef();
    const front_woody = React.createRef();
    const back_woody = React.createRef();
    const front_backery_standard = React.createRef();
    const back_backery_standard = React.createRef();
    const front_backery_bois = React.createRef();
    const back_backery_bois = React.createRef();
    const back_thule_bag = React.createRef();

    const navigate = useNavigate();

    const refs = [
        { name: 'Cadre', ref: frame },
        { name: 'Courroie', ref: belt },
        { name: 'Chaine', ref: chain },
        { name: 'Fourche normale', ref: normal_fork },
        { name: 'Fourche suspendue', ref: suspension_fork },
        { name: 'Assise normale', ref: normal_seat },
        { name: 'Assise suspendu', ref: suspension_seat },
        { name: 'Béquille arrière', ref: rear_stand },
        { name: 'Béquille centrale', ref: central_stand },
        { name: 'Porte baggage avant', ref: front_luggage_rack },
        { name: 'Porte baggage arrière', ref: back_luggage_rack },
        { name: 'Porte sacoche minimaliste', ref: simple_back_rack },
        { name: 'Daily avant', ref: front_daily },
        { name: 'Daily arrière', ref: back_daily },
        { name: 'Daily Mixte avant', ref: front_daily_mixte },
        { name: 'Daily Mixte arrière', ref: back_daily_mixte },
        { name: 'Epic Standard avant', ref: front_epic_standard },
        { name: 'Epic Standard arrière', ref: back_epic_standard },
        { name: 'Epic Bois avant', ref: front_epic_bois },
        { name: 'Epic Bois arrière', ref: back_epic_bois },
        { name: 'Woody avant', ref: front_woody },
        { name: 'Woody arrière', ref: back_woody },
        { name: 'Backery Standard avant', ref: front_backery_standard },
        { name: 'Backery Standard arrière', ref: back_backery_standard },
        { name: 'Backery Bois avant', ref: front_backery_bois },
        { name: 'Backery Bois arrière', ref: back_backery_bois },
        { name: 'Sac Thule arrière', ref: back_thule_bag },
    ];

    function handleChangeModelName(event) {
        setModelName(event.target.value)
    }
    async function onSubmitModel() {
        const json = {
            name: `${modelName}`,
            file_name: `${file.name}`,
            frame: `${frame.current.value}`,
            belt: `${belt.current.value}`,
            chain: `${chain.current.value}`,
            normal_fork: `${normal_fork.current.value}`,
            suspension_fork: `${suspension_fork.current.value}`,
            normal_seat: `${normal_seat.current.value}`,
            suspension_seat: `${suspension_seat.current.value}`,
            rear_stand: `${rear_stand.current.value}`,
            central_stand: `${central_stand.current.value}`,
            front_luggage_rack: `${front_luggage_rack.current.value}`,
            back_luggage_rack: `${back_luggage_rack.current.value}`,
            simple_back_rack: `${simple_back_rack.current.value}`,
            front_daily: `${front_daily.current.value}`,
            back_daily: `${back_daily.current.value}`,
            front_daily_mixte: `${front_daily_mixte.current.value}`,
            back_daily_mixte: `${back_daily_mixte.current.value}`,
            front_epic_standard: `${front_epic_standard.current.value}`,
            back_epic_standard: `${back_epic_standard.current.value}`,
            front_epic_bois: `${front_epic_bois.current.value}`,
            back_epic_bois: `${back_epic_bois.current.value}`,
            front_woody: `${front_woody.current.value}`,
            back_woody: `${back_woody.current.value}`,
            front_backery_standard: `${front_backery_standard.current.value}`,
            back_backery_standard: `${back_backery_standard.current.value}`,
            front_backery_bois: `${front_backery_bois.current.value}`,
            back_backery_bois: `${back_backery_bois.current.value}`,
            back_thule_bag: `${back_thule_bag.current.value}`,
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

            if (response.status === 200) {
                startTransition(() => {
                    navigate(`/select-model`);
                    }
                )
            }
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
                },
                (progress) => {
                },
                (error) => {
                }
            )
        } catch (error) {
        }
    }
    function handleChangeFile(event) {
        setFile(event.target.files[0])
    }

    if (!isAuthenticated) {
        return <h2>Accès refusé. Vous devez être connecté pour accéder à cette page.</h2>
    }

    return (
        <div>
            <h2>Import</h2>
            {!gltf && (
                <section>
                    <h3>Charger un modèle 3D</h3>
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
                    <h3>Modèle 3D chargé</h3>
                    <li>Nom: <input type={"text"} onChange={handleChangeModelName} value={modelName}/></li>

                    Selectionnez les meshs correspondant aux éléments suivants:
                    <ul>
                        {refs.map(({ name, ref }) => (
                            <li key={name}>
                                {name}
                                <select ref={ref}>
                                    {gltf.scene.children.map((child, index) => (
                                        <option key={index} value={child.name}>{child.name}</option>
                                    ))}
                                </select>
                            </li>
                        ))}
                    </ul>
                    <button onClick={onSubmitModel}>Valider</button>
                </section>
            )}
        </div>
    );
}

export default Import;