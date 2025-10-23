import React, { Component } from 'react';
import { Card, Form, Button, Col, Row } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSave, faPlusSquare, faUndo, faEdit } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
import MyToast from './MyToast';
import { useParams, useNavigate } from 'react-router-dom';

// HOC (Higher-Order Component) pour passer les utilitaires de routage
export function withRouter(Children){
    return(props)=>{
       const params = useParams();
       const navigate = useNavigate();
       return <Children {...props} params={params} navigate={navigate} />
   }
}

class Voiture extends Component {
    constructor(props) {
        super(props);
        this.state = this.initialState;
        this.state.show = false;
        this.voitureChange = this.voitureChange.bind(this);
        this.submitVoiture = this.submitVoiture.bind(this);
    }

    initialState = {
        id:'', marque: '', modele: '', couleur: '', immatricule: '', annee: '', prix: ''
    };

    componentDidMount() {
        const voitureId = this.props.params.id;
        if (voitureId) {
            this.findVoitureById(voitureId);
        }
    }

    findVoitureById = (voitureId) => {
        axios.get("http://localhost:8080/api/voitures/" + voitureId)
            .then(response => {
                if(response.data != null){
                    // *** LA CORRECTION EST ICI ***
                    // Nous devons définir l'ID manuellement car il n'est pas dans response.data
                    this.setState({
                        id: voitureId, // On utilise l'ID qu'on a déjà (passé en paramètre)
                        marque: response.data.marque,
                        modele: response.data.modele,
                        couleur: response.data.couleur,
                        immatricule: response.data.immatricule,
                        annee: response.data.annee,
                        prix: response.data.prix
                    });
                }
            }).catch((error) => {
                console.error("Erreur - Impossible de récupérer la voiture : " + error);
            });
    }

    submitVoiture = event => {
        event.preventDefault();
        const voiture = {
            marque: this.state.marque,
            modele: this.state.modele,
            couleur: this.state.couleur,
            immatricule: this.state.immatricule,
            annee: this.state.annee,
            prix: this.state.prix
        };

        // Maintenant, this.state.id sera correct (ex: "2")
        if (this.state.id) {
            axios.put("http://localhost:8080/api/voitures/" + this.state.id, voiture)
                .then(response => {
                    if (response.data != null) {
                        this.setState({ "show": true, "method": "put" });
                        setTimeout(() => this.setState({ "show": false }), 3000);
                        // On redirige vers la liste après la modification
                        setTimeout(() => this.props.navigate("/list"), 1000);
                    } else {
                        this.setState({ "show": false });
                    }
                });
        } else {
            axios.post("http://localhost:8080/api/voitures", voiture)
                .then(response => {
                    if (response.data != null) {
                        this.setState({ "show": true, "method": "post" });
                        setTimeout(() => this.setState({ "show": false }), 3000);
                        this.setState(this.initialState);
                    } else {
                        this.setState({ "show": false });
                    }
                });
        }
    };

    resetVoiture = () => {
        this.setState(() => this.initialState);
    };

    voitureChange = event => {
        this.setState({
            [event.target.name]: event.target.value
        });
    };

    render() {
        const { marque, modele, couleur, immatricule, annee, prix } = this.state;
        return (
            <div>
                <div style={{ "display": this.state.show ? "block" : "none" }}>
                    <MyToast children={{
                        show: this.state.show,
                        message: this.state.method === "put" ? "Voiture mise à jour avec succès." : "Voiture enregistrée avec succès.",
                        type: "success"
                    }} />
                </div>
                <Card className={"border border-dark bg-dark text-white"}>
                    <Card.Header>
                        {/* Le titre sera maintenant correct */}
                        <FontAwesomeIcon icon={this.state.id ? faEdit : faPlusSquare} /> {this.state.id ? "Modifier la Voiture" : "Ajouter une Voiture"}
                    </Card.Header>
                    <Form onReset={this.resetVoiture} onSubmit={this.submitVoiture} id="VoitureFormId">
                        <Card.Body>
                            <Row>
                                <Form.Group as={Col} controlId="formGridMarque">
                                    <Form.Label>Marque</Form.Label>
                                    <Form.Control required autoComplete="off" type="text" name="marque" value={marque} onChange={this.voitureChange} className={"bg-dark text-white"} placeholder="Entrez Marque Voiture" />
                                </Form.Group>
                                <Form.Group as={Col} controlId="formGridModele">
                                    <Form.Label>Modèle</Form.Label>
                                    <Form.Control required autoComplete="off" type="text" name="modele" value={modele} onChange={this.voitureChange} className={"bg-dark text-white"} placeholder="Entrez Modèle Voiture" />
                                </Form.Group>
                            </Row>
                            <Row className="mt-3">
                                <Form.Group as={Col} controlId="formGridCouleur">
                                    <Form.Label>Couleur</Form.Label>
                                    <Form.Control required autoComplete="off" type="text" name="couleur" value={couleur} onChange={this.voitureChange} className={"bg-dark text-white"} placeholder="Entrez Couleur" />
                                </Form.Group>
                                <Form.Group as={Col} controlId="formGridImmatricule">
                                    <Form.Label>Immatricule</Form.Label>
                                    <Form.Control required autoComplete="off" type="text" name="immatricule" value={immatricule} onChange={this.voitureChange} className={"bg-dark text-white"} placeholder="Entrez Immatricule" />
                                </Form.Group>
                            </Row>
                            <Row className="mt-3">
                                <Form.Group as={Col} controlId="formGridAnnee">
                                    <Form.Label>Année</Form.Label>
                                    <Form.Control required autoComplete="off" type="number" name="annee" value={annee} onChange={this.voitureChange} className={"bg-dark text-white"} placeholder="Entrez Année" />
                                </Form.Group>
                                <Form.Group as={Col} controlId="formGridPrix">
                                    <Form.Label>Prix</Form.Label>
                                    <Form.Control required autoComplete="off" type="number" name="prix" value={prix} onChange={this.voitureChange} className={"bg-dark text-white"} placeholder="Entrez Prix" />
                                </Form.Group>
                            </Row>
                        </Card.Body>
                        <Card.Footer style={{ "textAlign": "right" }}>
                            {/* Le bouton sera maintenant correct */}
                            <Button size="sm" variant="success" type="submit"><FontAwesomeIcon icon={faSave} /> {this.state.id ? "Update" : "Submit"}</Button>{' '}
                            <Button size="sm" variant="info" type="reset"><FontAwesomeIcon icon={faUndo} /> Reset</Button>
                        </Card.Footer>
                    </Form>
                </Card>
            </div>
        );
    }
}

export default withRouter(Voiture);

