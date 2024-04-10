import React, {useEffect, useRef, useState} from "react";
import {OrbitControls, useGLTF} from '@react-three/drei';
import {useLocation} from "react-router-dom";
import {Canvas} from "@react-three/fiber";
import {Color} from "three";
import {Tooltip} from 'react-tooltip'
import TriggerComponent from "./TriggerComponent";
import {XCircle} from "react-bootstrap-icons";

function Models() {
    const location = useLocation();
    const model = location.state.model;
    const url = `http://localhost:8000/files/${model.file_name}`;
    const gltf = useGLTF(url)
    const [menuOpen, setMenuOpen] = useState(false);
    const primitiveRef = useRef();
    const [cardContent, setCardContent] = useState(null);
    const [lastMenuOpen, setLastMenuOpen] = useState(null);
    const [isVisibleBackLuggage, setIsVisibleBackLuggage] = useState();
    const [isVisibleFrontLuggage, setIsVisibleFrontLuggage] = useState();
    const [price, setPrice] = useState(2090);
    const initDisableMesh = [
        model.chain,
        model.suspension_fork,
        model.suspension_seat,
        model.central_stand,
        model.front_luggage_rack,
        model.back_luggage_rack,
        model.front_daily,
        model.back_daily,
        model.front_daily_mixte,
        model.back_daily_mixte,
        model.front_epic_standard,
        model.back_epic_standard,
        model.front_epic_bois,
        model.back_epic_bois,
        model.front_woody,
        model.back_woody,
        model.front_backery_standard,
        model.back_backery_standard,
        model.front_backery_bois,
        model.back_backery_bois,
        model.back_thule_bag
    ]

    const BLEU_PETROLE = {color: new Color('#19476b'), name: 'Bleu Pétrole'};
    const NOIR_MINUIT = {color: new Color('#000000'), name: 'Noir Minuit'};
    const GRIS_LUNE = {color: new Color('#ffffff'), name: 'Gris Lune'};
    const SABLE = {color: new Color('#ddc692'), name: 'Sable'};
    const JAUNE = {color: new Color('#f5c245'), name: 'Jaune'};
    const ORANGE = {color: new Color('#fa7712'), name: 'Orange'};
    const ROUGE = {color: new Color('#ba2526'), name: 'Rouge'};
    const BORDEAUX = {color: new Color('#7c262d'), name: 'Bordeaux'};
    const ROSE = {color: new Color('#faadb2'), name: 'Rose'};
    const VIOLET = {color: new Color('#896eac'), name: 'Violet'};
    const BLEU_VIOLET = {color: new Color('#5273a5'), name: 'Bleu Violet'};
    const VERT_ANGLAIS = {color: new Color('#17342e'), name: 'Vert Anglais'};
    const KAKI_CLAIR = {color: new Color('#8ca581'), name: 'Kaki Clair'};
    const VERT_EAU = {color: new Color('#bde2bb'), name: 'Vert Eau'};
    const BLEU_CLAIR = {color: new Color('#abcbd0'), name: 'Bleu Clair'};

    useEffect(() => {
        setTimeout(() => {
            initDisableMesh.forEach(meshName => {
                if (primitiveRef.current) {
                    const mesh = primitiveRef.current.getObjectByName(meshName);
                    if (mesh) {
                        mesh.visible = false;
                    }
                }
            })
        }, 1000)
    }, [gltf])

    useEffect(() => {
        if (primitiveRef.current) {
        setCardContent(content('Front Luggage Rack'));
        }
    }, [isVisibleFrontLuggage])

    useEffect(() => {
        if (primitiveRef.current) {
        setCardContent(content('Back Luggage Rack'));
        }
    }, [isVisibleBackLuggage])

    const handleMeshClick = (context, position) => {
        if (lastMenuOpen === context) {
            setMenuOpen(!menuOpen);
        } else if (!menuOpen) {
            setMenuOpen(true);
        }

        setCardContent(content(context));
        setLastMenuOpen(context);
    }

    const content = (context) => {
        let content;
        switch (context) {
            case 'Front Luggage Rack':
                const meshFrontLuggage = primitiveRef.current.getObjectByName(model.front_luggage_rack);
                content =
                    <div>
                        <h3>Porte Baggage avant</h3>
                        <div className={"card-child " + (meshFrontLuggage?.visible ? 'select' : '')}
                             onClick={handleChangeProp('ELLIPSE FR1 - phare intégré', 'switch')}>
                            <h4>ELLIPSE FR1 - phare intégré</h4>
                            <small>
                                Un porte-bagage avant modernisé, muni d’une plateforme AVS « Quick fix », permettant le
                                montage rapide de paniers et caisses identiques à l'avant et à l'arrière. Le phare
                                intégré
                                permet de garder une visibilité totale même chargé.​ Charge max : 10kg | Poids : 0,35kg
                            </small>
                            <p>+ 49,00€</p>
                        </div>

                        { isVisibleFrontLuggage === true && (
                            <div>
                                <h4>Pannier</h4>
                                <div className={'flex flex-wrap justify-between'}>
                                    <div className="card-child child" onClick={handleChangeProp('Daily', 'no-switch')}>
                                        <h4>Daily</h4>
                                        <small>
                                            Charge max : 10kg​ - 20L - 38x26x20 Maillage complet | Poids : 1,37kg
                                        </small>
                                        <p>+ 45,00€</p>
                                    </div>
                                    <div className="card-child child"
                                         onClick={handleChangeProp('Daily mixte', 'no-switch')}>
                                        <h4>Daily mixte</h4>
                                        <small>
                                            Charge max : 10kg​ - 20L - 38x26x24 Maillage partiel | Poids : 1,54kg
                                        </small>
                                        <p>+ 45,00€</p>
                                    </div>
                                    <div className="card-child child"
                                         onClick={handleChangeProp('Epic standard', 'no-switch')}>
                                        <h4>Epic standard</h4>
                                        <small>
                                            Charge max : 10kg​ - 24L - 40x30x20 | Poids : 1,34kg
                                        </small>
                                        <p>+ 55,00€</p>
                                    </div>
                                    <div className="card-child child"
                                         onClick={handleChangeProp('Epic bois', 'no-switch')}>
                                        <h4>Epic bois</h4>
                                        <small>
                                            Charge max : 10kg​ - 24L - 30x40x20| Poids : 1,65kg
                                        </small>
                                        <p>+ 55,00€</p>
                                    </div>
                                    <div className="card-child child" onClick={handleChangeProp('Woody', 'no-switch')}>
                                        <h4>Woody</h4>
                                        <small>
                                            Charge max : 10kg​ - 23L - 40x25x23 | Poids : 2,37kg
                                        </small>
                                        <p>+ 55,00€</p>
                                    </div>
                                    <div className="card-child child"
                                         onClick={handleChangeProp('Bakery standard', 'no-switch')}>
                                        <h4>Bakery standard</h4>
                                        <small>
                                            Charge max : 10kg​ - 24L - 45x35x12 | Poids : 2,08kg
                                        </small>
                                        <p>+ 65,00€</p>
                                    </div>
                                    <div className="card-child child"
                                         onClick={handleChangeProp('Bakery bois', 'no-switch')}>
                                        <h4>Bakery bois</h4>
                                        <small>
                                            Charge max : 10kg​ - 24L - 45x35x9 | Poids : 2,12kg
                                        </small>
                                        <p>+ 65,00€</p>
                                    </div>
                                </div>
                            </div>
                        )}

                    </div>;
                break;
            case 'Back Luggage Rack':
                const meshBackLuggage = primitiveRef.current.getObjectByName(model.front_luggage_rack);
                const meshBackLuggageSimple = primitiveRef.current.getObjectByName(model.simple_back_rack);
                content = <div>
                    <h3>
                        Porte Bagage arrière
                    </h3>
                    <div className={"card-child " + (meshBackLuggage?.visible ? 'select' : '')}
                         onClick={handleChangeProp('ELLIPSE RR1', 'switch')}>
                        <h4>ELLIPSE RR1 - clignotants & feux intégrés</h4>
                        <small>
                            Un porte bagage arrière intégrant feu de position, feu stop et clignotants, garantissant
                            ainsi une parfaite visibilité même lorsque le vélo est chargé. Supportant jusqu’à 27kg,
                            il pourra accueillir un siège enfant, des sacoches ou encore une plateforme pour le
                            chargement de volumes encombrants. Muni d’une plateforme AVS « Quick fix », permettant le
                            montage
                            rapide de paniers et caisses identiques à l'avant et à l'arrière. Charge max : 27kg​ | Poids
                            : 0,85kg
                        </small>
                        <p>+ 135,00€</p>
                    </div>

                    {isVisibleBackLuggage && (
                        <div>
                            <h4>Pannier</h4>
                            <div className={'flex flex-wrap justify-between'}>
                                <div className="card-child child" onClick={handleChangeProp('Daily')}>
                                    <h4>Daily</h4>
                                    <small>
                                        Charge max : 10kg​ - 20L - 38x26x20 Maillage complet | Poids : 1,37kg
                                    </small>
                                </div>
                                <div className="card-child child" onClick={handleChangeProp('Daily mixte')}>
                                    <h4>Daily mixte</h4>
                                    <small>
                                        Charge max : 10kg​ - 20L - 38x26x24 Maillage partiel | Poids : 1,54kg
                                    </small>
                                </div>
                                <div className="card-child child" onClick={handleChangeProp('Epic standard')}>
                                    <h4>Epic standard</h4>
                                    <small>
                                        Charge max : 10kg​ - 24L - 40x30x20 | Poids : 1,34kg
                                    </small>
                                </div>
                                <div className="card-child child" onClick={handleChangeProp('Epic bois')}>
                                    <h4>Epic bois</h4>
                                    <small>
                                        Charge max : 10kg​ - 24L - 30x40x20| Poids : 1,65kg
                                    </small>
                                </div>
                                <div className="card-child child" onClick={handleChangeProp('Woody')}>
                                    <h4>Woody</h4>
                                    <small>
                                        Charge max : 10kg​ - 23L - 40x25x23 | Poids : 2,37kg
                                    </small>
                                </div>
                                <div className="card-child child" onClick={handleChangeProp('Bakery standard')}>
                                    <h4>Bakery standard</h4>
                                    <small>
                                        Charge max : 10kg​ - 24L - 45x35x12 | Poids : 2,08kg
                                    </small>
                                </div>
                                <div className="card-child child" onClick={handleChangeProp('Bakery bois')}>
                                    <h4>Bakery bois</h4>
                                    <small>
                                        Charge max : 10kg​ - 24L - 45x35x9 | Poids : 2,12kg
                                    </small>
                                </div>
                            </div>
                        </div>
                    )}

                    <div className={"card-child " + (meshBackLuggageSimple?.visible ? 'select' : '')}
                         onClick={handleChangeProp('Porte sacoche minimaliste', 'switch')}>
                        <h4>
                            Porte sacoche minimaliste
                        </h4>
                        <small>
                            Un porte sacoche minimaliste pour conserver la ligne du vélo tout en permettant le transport
                            de bagagerie. Charge max : 18kg
                        </small>
                        <p>+ 79,00€</p>
                    </div>
                </div>;
                break;
            case 'Chain / Belt':
                const meshChain = primitiveRef.current.getObjectByName(model.chain);
                const meshBelt = primitiveRef.current.getObjectByName(model.belt);
                content = <div>
                    <h3>Transmission</h3>
                    <div className={"card-child " + (meshBelt?.visible ? 'select' : '')}
                         onClick={handleChangeProp('Courroie', 'no-switch')}>
                        <h3>Courroie</h3>
                        <small>
                            Ni graisse, ni entretien, une plus longue durée de vie, la transmission sans prise de tête.
                            Une seule vitesse, idéale pour tous les trajets urbains, elle sera limitante uniquement sur
                            des reliefs importants (>7%) et les démarrages en côte fréquents.​ Courroie carbone – Pignon
                            20T – Plateau 52T
                        </small>
                    </div>
                    <div className={"card-child " + (meshChain?.visible ? 'select' : '')}
                         onClick={handleChangeProp('Chaine', 'no-switch')}>
                        <h4>Chaine</h4>
                        <small>
                            La transmission la plus polyvalente, pour les trajets du quotidien ou les balades les
                            weekends. Sentez vous à l’aise même dans les pentes les plus raides grâce à 9 vitesses. La
                            qualité Shimano, protégée par un carter pour éviter la graisse ou les accros.​Shimano CUES –
                            cassette 11-36T – plateau 38T</small>
                    </div>
                </div>;
                break;
            case 'Fork':
                const meshFork = primitiveRef.current.getObjectByName(model.suspension_fork);
                content =
                    <div>
                        <h3>
                            Fourche
                        </h3>
                        <div className={"card-child " + (meshFork?.visible ? 'select' : '')}
                             onClick={handleChangeProp('Fourche suspendue', 'switch')}>
                            <h4>Fourche suspendue</h4>
                            <small>
                                Les pavées et les routes cabossées sont votre quotidien ? Ajoutez du confort à votre
                                direction, pour des déplacements sécurisants en ville et sur les chemins. | + 1,85kg
                            </small>
                            <p>+ 89,00€</p>
                        </div>
                    </div>;
                break;
            case 'Seat':
                const meshSeat = primitiveRef.current.getObjectByName(model.suspension_seat);
                content =
                    <div>
                        <h3>
                            Selle
                        </h3>
                        <div className={"card-child " + (meshSeat?.visible ? 'select' : '')}
                             onClick={handleChangeProp('Assise suspendue', 'switch')}>
                            <h4>Assise suspendue</h4>
                            <small>
                                Une touche de confort supplémentaire au niveau de l'assise, parfait pour niveler les
                                défauts de la route et éviter les plus gros chocs.​ | +0,2kg
                            </small>
                            <p>+ 35,00€</p>
                        </div>
                    </div>;
                break;
            case 'Stand':
                const meshRearStand = primitiveRef.current.getObjectByName(model.rear_stand);
                const meshCentralStand = primitiveRef.current.getObjectByName(model.central_stand);
                content = <div>
                    <h3>
                        Béquille
                    </h3>
                    <div className={"card-child " + (meshRearStand?.visible ? 'select' : '')}
                         onClick={handleChangeProp('Béquille arrière', 'no-switch')}>
                        <h4>Béquille arrière</h4>
                    </div>
                    <div className={"card-child " + (meshCentralStand?.visible ? 'select' : '')}
                         onClick={handleChangeProp('Béquille centrale', 'no-switch')}>
                        <h4>Béquille centrale</h4>
                        <small>
                            Cette béquille centrale double apportera davantage de stabilité à votre vélo en le
                            maintenant parfaitement droit. Ce qui peut s’avérer particulièrement pratique lors du
                            chargement de votre vélo ou lors de l’installation d’un enfant dans le siège arrière.​
                            Charge max : 40kg​ | Poids : 0,7kg
                        </small>
                        <p>+ 39,00€</p>
                    </div>
                </div>;
                break;
        }
        return content;
    }

    const addPrice = (change) => {
        setPrice(prevPrice => prevPrice + change);
    }

    const removePrice = (change) => {
        setPrice(prevPrice => prevPrice - change);
    }

    const handleChangeProp = (context, action) => (event) => {
        if (action === 'no-switch') {
            if (event.target.classList.contains('select') || event.target.parentElement.classList.contains('select')) {
                return;
            }
        }

        if (action === 'switch') {
            if (event.target.classList.contains('card-child')) {
                event.target.classList.toggle('select');
            } else {
                event.target.parentElement.classList.toggle('select');
            }
        } else {
            const elements = document.querySelectorAll('.select');
            elements.forEach((element) => {
                element.classList.remove('select');
            });
            if (event.target.classList.contains('card-child')) {
                event.target.classList.toggle('select');
            } else {
                event.target.parentElement.classList.toggle('select');
            }
        }

        let mesh = null;

        switch (context) {
            case 'ELLIPSE FR1 - phare intégré':
                mesh = primitiveRef.current.getObjectByName(model.front_luggage_rack);
                mesh.visible = !mesh.visible;
                setIsVisibleFrontLuggage(mesh.visible);
                if (mesh.visible) {
                    addPrice(49);
                } else {
                    removePrice(49);
                }
                break;
            /*case 'ELLIPSE RR1': TODO : Bug à corriger
                mesh = primitiveRef.current.getObjectByName(model.back_luggage_rack);
                mesh.visible = !mesh.visible;
                primitiveRef.current.getObjectByName(model.simple_back_rack).visible = !primitiveRef.current.getObjectByName(model.simple_back_rack).visible;
                setIsVisibleBackLuggage(!isVisibleBackLuggage);
                break;
            case 'Porte sacoche minimaliste':
                mesh = primitiveRef.current.getObjectByName(model.simple_back_rack);
                mesh.visible = !mesh.visible;
                primitiveRef.current.getObjectByName(model.back_luggage_rack).visible = !primitiveRef.current.getObjectByName(model.back_luggage_rack).visible;
                break;
            case 'Daily':
                break;*/
            case 'Chaine':
                mesh = primitiveRef.current.getObjectByName(model.chain)
                mesh.visible = !mesh.visible;
                primitiveRef.current.getObjectByName(model.belt).visible = !primitiveRef.current.getObjectByName(model.belt).visible;
                break;
            case 'Courroie':
                mesh = primitiveRef.current.getObjectByName(model.belt)
                mesh.visible = !mesh.visible;
                primitiveRef.current.getObjectByName(model.chain).visible = !primitiveRef.current.getObjectByName(model.chain).visible;
                break;
            case 'Fourche suspendue':
                mesh = primitiveRef.current.getObjectByName(model.suspension_fork);
                mesh.visible = !mesh.visible;
                primitiveRef.current.getObjectByName(model.normal_fork).visible = !primitiveRef.current.getObjectByName(model.normal_fork).visible;

                if (mesh.visible) {
                    addPrice(89)
                } else {
                    removePrice(89)
                }
                break;
            case 'Assise suspendue':
                mesh = primitiveRef.current.getObjectByName(model.suspension_seat);
                mesh.visible = !mesh.visible;
                primitiveRef.current.getObjectByName(model.normal_seat).visible = !primitiveRef.current.getObjectByName(model.normal_seat).visible;
                if (mesh.visible) {
                    addPrice(35)
                } else {
                    removePrice(35)
                }
                break;
            case 'Béquille centrale':
                mesh = primitiveRef.current.getObjectByName(model.central_stand);
                mesh.visible = !mesh.visible;
                primitiveRef.current.getObjectByName(model.rear_stand).visible = !primitiveRef.current.getObjectByName(model.rear_stand).visible;
                if (mesh.visible) {
                    addPrice(39)
                }
                break;
            case 'Béquille arrière':
                mesh = primitiveRef.current.getObjectByName(model.rear_stand);
                mesh.visible = !mesh.visible;
                primitiveRef.current.getObjectByName(model.central_stand).visible = !primitiveRef.current.getObjectByName(model.central_stand).visible;
                if (mesh.visible) {
                    removePrice(39)
                }
                break;

        }
    }

    const handleColorChange = (color) => () => {
        if (primitiveRef.current) {
            let mesh = primitiveRef.current.getObjectByName(model.frame);
            console.log(mesh)
            if (mesh) {
                mesh.material.color.set(color);
                mesh.material.needsUpdate = true;
            } else {
                console.log(`No mesh found with name ${model.frame}`);
            }
            mesh = primitiveRef.current.getObjectByName(model.normal_fork)
            console.log(mesh)
            if (mesh) {
                mesh.material.color.set(color);
                mesh.material.needsUpdate = true;
            } else {
                console.log(`No mesh found with name ${model.normal_fork}`);
            }
            mesh = primitiveRef.current.getObjectByName(model.suspension_fork)
            console.log(mesh)
            if (mesh) {
                mesh.material.color.set(color);
                mesh.material.needsUpdate = true;
            } else {
                console.log(`No mesh found with name ${model.suspension_fork}`);
            }
        }
    }

    return (
        <div style={{width: "100%", height: "90vh"}}>
            <div className={'display-color'}>
                <div className="flex column gap-10">
                    {[BLEU_PETROLE, NOIR_MINUIT, GRIS_LUNE, SABLE, JAUNE, ORANGE, ROUGE, BORDEAUX, ROSE, VIOLET, BLEU_VIOLET, VERT_ANGLAIS, KAKI_CLAIR, VERT_EAU, BLEU_CLAIR].map((color, index) => (
                        <div key={index}
                             className="pastille"
                             style={{backgroundColor: color.color.getStyle()}}
                             onClick={handleColorChange(color.color)}
                             data-tooltip-id={index}
                             data-tooltip-content={color.name}
                             data-tooltip-place={'right'}
                        >
                            <Tooltip id={index}></Tooltip>
                        </div>
                    ))}
                </div>
            </div>
            <div className={'display-menu'}>
                {menuOpen && (
                    <div className={'card'}>
                        <p className={'closeStyle'} onClick={() => setMenuOpen(false)}><XCircle size={25}/></p>
                        {cardContent}
                    </div>
                )}
            </div>
            <div className={'display-price'}>
                {price}€
            </div>
            <Canvas>
                <ambientLight intensity={1}/>
                <directionalLight position={[-1, 1, 0]} intensity={0.8}/>
                <directionalLight position={[1, 1, 0]} intensity={0.8}/>
                <directionalLight position={[1, 0, 0]} intensity={0.8}/>
                <directionalLight position={[-1, 0, 0]} intensity={0.8}/>
                <pointLight position={[0, 3, 0]}/>
                <OrbitControls
                    autoRotate
                    autoRotateSpeed={1}
                    minDistance={1}
                    maxDistance={2}
                    enablePan={false}
                    position={[0, 2, 0]}
                />
                {model && (
                    <group>
                        <TriggerComponent
                            position={[0.55, 0.3, 0]}
                            handleMeshClick={handleMeshClick}
                            context={'Front Luggage Rack'}
                        />
                        <TriggerComponent
                            position={[-0.55, 0.3, 0]}
                            handleMeshClick={handleMeshClick}
                            context={'Back Luggage Rack'}
                        />
                        <TriggerComponent
                            position={[-0.35, -0.1, 0]}
                            handleMeshClick={handleMeshClick}
                            context={'Chain / Belt'}
                        />
                        <TriggerComponent
                            position={[0.55, 0.05, 0]}
                            handleMeshClick={handleMeshClick}
                            context={'Fork'}
                        />
                        <TriggerComponent
                            position={[-0.3, 0.5, 0]}
                            handleMeshClick={handleMeshClick}
                            context={'Seat'}
                        />
                        <TriggerComponent
                            position={[0.1, -0.25, 0]}
                            handleMeshClick={handleMeshClick}
                            context={'Stand'}
                        />
                    </group>
                )}
                <primitive position={[0, -0.5, 0]} ref={primitiveRef} object={gltf.scene} dispose={null}/>
            </Canvas>
        </div>
    );

}

export default Models;