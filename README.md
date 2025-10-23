# 🚗 Magasin de Voitures - Projet Full Stack

Ce projet représente une application **Full Stack**.  
Elle simule la **gestion d’un catalogue de voitures**, intégrant :
- un **backend** robuste en Spring Boot,  
- une **interface utilisateur** moderne en React,  
- une **base de données PostgreSQL**,  
- et une **solution de monitoring complète** avec Prometheus & Grafana.

---

## 🌟 Fonctionnalités Principales

- ✅ Gestion **CRUD complète** pour les voitures (Créer, Lire, Mettre à jour, Supprimer).  
- 🔗 **API RESTful** exposée par le backend via Spring Data REST.  
- ⚡ **Interface utilisateur réactive** construite avec React et React Bootstrap.  
- 💾 Persistance des données assurée par **PostgreSQL**.  
- 📈 **Monitoring** du backend via **Prometheus** et visualisation sur **Grafana**.  
- 🐳 **Conteneurisation complète** avec Docker & orchestration via Docker Compose (5 services).  

---

## 🏗️ Architecture & Structure du Projet

L’application est orchestrée par **Docker Compose** et comprend les services suivants :

| Service | Rôle |
|----------|------|
| 🧩 **Backend (Spring Boot)** | Expose l’API REST et les métriques applicatives |
| 💻 **Frontend (React + Nginx)** | Fournit l’interface utilisateur et agit comme reverse proxy |
| 🗄️ **Database (PostgreSQL)** | Stockage des données du catalogue |
| 📊 **Prometheus** | Collecte les métriques depuis le backend |
| 📉 **Grafana** | Visualise les métriques dans des dashboards personnalisés |

---

### 📂 Arborescence du projet
<img width="376" height="597" alt="image" src="https://github.com/user-attachments/assets/1777c80d-52b7-4fa3-95c1-5d56353f4d7e" />

### Services Docker
| Service | Port | Description |
|---------|------|-------------|
| 🚀 Frontend | 80 | Interface React + Nginx |
| ⚙️ Backend | 8080 | API Spring Boot |
| 🗄️ PostgreSQL | 5432 | Base de données |
| 📊 Prometheus | 9090 | Collecte métriques |
| 📈 Grafana | 3000 | Visualisation |

## 🛠️ Technologies Utilisées

### Backend
- **Java 17** + **Spring Boot 3.x**
- **Spring Data JPA** + **Spring Data REST**
- **Spring Security** + **Spring Actuator**
- **PostgreSQL** + **Hibernate**
- **Micrometer** (métriques Prometheus)

### Frontend
- **React 18** + **React Bootstrap**
- **Axios** (HTTP client)
- **Nginx** (serveur web)

### Infrastructure
- **Docker** + **Docker Compose**
- **Prometheus** (monitoring)
- **Grafana** (dashboard)
- **Maven** (build Java)

## 🚀 Installation

### Prérequis
- Docker 20.10+
- Docker Compose 2.0+
- Git

### 1. Cloner le projet
```bash
git clone https://github.com/votre-username/magasin-voitures.git
cd magasin-voitures

