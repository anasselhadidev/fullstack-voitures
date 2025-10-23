import React, { Component } from 'react';
import { Card, Table, ButtonGroup, Button } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faList, faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import axios from 'axios';
import MyToast from './MyToast';

export default class VoitureListe extends Component {
    constructor(props) {
        super(props);
        this.state = {
            voitures: [],
            show: false
        };
    }

    componentDidMount() {
        axios.get("http://localhost:8080/api/voitures")
            .then(response => {
                if (response.data._embedded) {
                    this.setState({ voitures: response.data._embedded.voitures });
                } else {
                    this.setState({ voitures: response.data });
                }
            })
            .catch(error => {
                console.error("Erreur lors de la récupération des voitures : ", error);
            });
    }

    deleteVoiture = (voitureId) => {
        axios.delete("http://localhost:8080/api/voitures/" + voitureId)
            .then(response => {
                if (response.status === 204 || response.status === 200) {
                    this.setState({ "show": true });
                    setTimeout(() => this.setState({ "show": false }), 3000);
                    // Mettre à jour l'état en filtrant avec l'ID que nous avons
                    this.setState({
                        voitures: this.state.voitures.filter(v => v._links.self.href.split("/").pop() !== voitureId)
                    });
                } else {
                    this.setState({ "show": false });
                }
            })
            .catch(error => {
                console.error("Erreur lors de la suppression : ", error);
                this.setState({ "show": false });
            });
    };

    render() {
        return (
            <div>
                <div style={{ "display": this.state.show ? "block" : "none" }}>
                    <MyToast children={{ show: this.state.show, message: "Voiture supprimée avec succès.", type: "danger" }} />
                </div>
                <Card className={"border border-dark bg-dark text-white"}>
                    <Card.Header><FontAwesomeIcon icon={faList} /> Liste des Voitures</Card.Header>
                    <Card.Body>
                        <Table bordered hover striped variant="dark">
                            <thead>
                                <tr>
                                    <th>Marque</th><th>Modèle</th><th>Couleur</th><th>Immatricule</th><th>Année</th><th>Prix</th><th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    this.state.voitures.length === 0 ?
                                        <tr align="center">
                                            <td colSpan="7">Aucune Voiture n'est disponible</td>
                                        </tr> :
                                        this.state.voitures.map((voiture) => {
                                            // ** LA CORRECTION EST ICI **
                                            // On extrait l'ID de l'URL
                                            const voitureId = voiture._links.self.href.split("/").pop();
                                            return (
                                                <tr key={voitureId}>
                                                    <td>{voiture.marque}</td>
                                                    <td>{voiture.modele}</td>
                                                    <td>{voiture.couleur}</td>
                                                    <td>{voiture.immatricule}</td>
                                                    <td>{voiture.annee}</td>
                                                    <td>{voiture.prix}</td>
                                                    <td>
                                                        <ButtonGroup>
                                                            {/* On utilise la variable voitureId */}
                                                            <Link to={"/edit/" + voitureId} className="btn btn-sm btn-outline-primary"><FontAwesomeIcon icon={faEdit} /></Link>{' '}
                                                            {/* On utilise la variable voitureId */}
                                                            <Button size="sm" variant="outline-danger" onClick={() => this.deleteVoiture(voitureId)}><FontAwesomeIcon icon={faTrash} /></Button>
                                                        </ButtonGroup>
                                                    </td>
                                                </tr>
                                            );
                                        })
                                }
                            </tbody>
                        </Table>
                    </Card.Body>
                </Card>
            </div>
        );
    }
}
