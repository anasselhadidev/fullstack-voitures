import React from 'react';
import './App.css';
import { Container, Row, Col } from 'react-bootstrap';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import NavigationBar from './Components/NavigationBar';
import Bienvenue from './Components/Bienvenue';
import Footer from './Components/Footer';
import Voiture from './Components/Voiture';
import VoitureListe from './Components/VoitureListe';

function App() {
  const marginTop = {
    marginTop: "20px"
  };

  return (
    <Router>
      <NavigationBar />
      <Container>
        <Row>
          <Col lg={12} style={marginTop}>
            <Routes>
                <Route path="/" element={<Bienvenue />} />
                <Route path="/list" element={<VoitureListe />} />
                <Route path="/add" element={<Voiture />} />
                
                {/* LA LIGNE MANQUANTE EST ICI */}
                <Route path="/edit/:id" element={<Voiture />} />

            </Routes>
          </Col>
        </Row>
      </Container>
      <Footer />
    </Router>
  );
}

export default App;
