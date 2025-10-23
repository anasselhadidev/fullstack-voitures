Projet TP Full Stack : Magasin de Voitures (Spring Boot + React) avec Docker et Monitoring

Ce projet a été réalisé dans le cadre du TP Full Stack. Il s'agit d'une application web complète permettant de gérer un catalogue de voitures. Elle implémente les fonctionnalités CRUD (Création, Lecture, Mise à jour, Suppression) et intègre une pile de monitoring.

L'application comprend :

Un Backend développé avec Spring Boot (Java), utilisant Spring Data REST pour exposer une API RESTful et JPA/Hibernate pour interagir avec une base de données PostgreSQL. Il expose également des métriques pour Prometheus via Spring Actuator.

Un Frontend développé avec React JS, utilisant React Bootstrap pour l'interface utilisateur et Axios pour communiquer avec le backend.

Une Base de Données PostgreSQL.

Une Pile de Monitoring avec Prometheus pour collecter les métriques du backend et Grafana pour visualiser ces métriques dans un tableau de bord.

Le tout est conteneurisé avec Docker et orchestré via Docker Compose pour un déploiement facile.

Structure du Projet

.
├── backend/         # Code source du Backend Spring Boot (Java)
│   ├── src/
│   ├── pom.xml
│   └── Dockerfile   # Instructions pour construire l'image Docker du backend
├── frontend/        # Code source du Frontend React JS
│   ├── public/
│   ├── src/
│   ├── package.json
│   ├── nginx.conf   # Configuration Nginx pour servir le frontend et proxyfier l'API
│   └── Dockerfile   # Instructions pour construire l'image Docker du frontend
├── prometheus/
│   └── prometheus.yml # Configuration de Prometheus pour cibler le backend
├── .gitignore       # Fichiers et dossiers à ignorer par Git
├── docker-compose.yml # Fichier d'orchestration pour lancer tous les services (5 conteneurs)
└── README.md        # Ce fichier


[Image de la structure des dossiers du projet]

Technologies Utilisées

Backend : Java 17, Spring Boot 3.x, Spring Data JPA, Spring Data REST, Spring Web, Spring Security, Spring Actuator, Micrometer (Registry Prometheus), Lombok, PostgreSQL Driver

Frontend : React JS, React Bootstrap, Axios, Nginx (pour servir l'application dans Docker)

Base de Données : PostgreSQL 13

Monitoring : Prometheus, Grafana

Conteneurisation : Docker, Docker Compose

Build : Maven (pour le backend), npm (pour le frontend)

Prérequis

Docker (https://www.docker.com/products/docker-desktop/)

Docker Compose (généralement inclus avec Docker Desktop)

Git (https://git-scm.com/)

Un navigateur web

Comment Lancer l'Application (avec Docker Compose)

Clonez le dépôt :
Ouvrez un terminal et exécutez les commandes suivantes (remplacez les placeholders) :

git clone [https://github.com/VOTRE_NOM_UTILISATEUR/NOM_DU_REPO.git](https://github.com/VOTRE_NOM_UTILISATEUR/NOM_DU_REPO.git)
cd NOM_DU_REPO


Lancez Docker Compose :
Toujours dans le terminal, à la racine du projet cloné (où se trouve le fichier docker-compose.yml), exécutez la commande suivante. Cela construira les images Docker pour le backend et le frontend (la première fois peut prendre quelques minutes) et démarrera les 5 conteneurs (backend, frontend, postgres, prometheus, grafana).

docker-compose up --build -d


Le flag --build force la reconstruction des images si le code a changé.

Le flag -d lance les conteneurs en arrière-plan (detached mode).

Accédez aux services :
Une fois que tous les conteneurs sont démarrés (vérifiez avec docker ps ou via l'interface Docker Desktop), vous pouvez accéder aux différentes parties de l'application via votre navigateur :

Application React (Frontend) : http://localhost (ou https://www.google.com/search?q=http://localhost:80)
[Image de l'application React Magasin de Voitures]

Prometheus : http://localhost:9090

Cibles surveillées : http://localhost:9090/targets (Vous devriez voir spring-boot-backend avec un état UP)
[Image de la page des cibles Prometheus avec backend UP]

Grafana : http://localhost:3000

Login : admin

Mot de passe : admin (le mot de passe par défaut défini dans docker-compose.yml)

Configuration de Grafana (Première Utilisation)

Lors du premier accès à Grafana :

Connectez-vous avec admin/admin. Il vous sera peut-être demandé de changer le mot de passe (vous pouvez choisir "Skip").

Ajoutez Prometheus comme source de données :

Allez dans le menu latéral gauche > "Connections" > "Data sources".

Cliquez sur "Add new data source", choisissez "Prometheus".

Dans le champ URL, entrez : http://prometheus:9090 (c'est le nom du service Prometheus dans le réseau Docker).

Laissez les autres options par défaut.

Cliquez sur "Save & Test". Vous devriez voir un message vert indiquant que la connexion fonctionne.

Importez un Dashboard pour Spring Boot :

Allez dans le menu latéral gauche > "Dashboards".

Cliquez sur "New" > "Import".

Dans le champ "Import via grafana.com", entrez l'ID 4701 (c'est un dashboard populaire pour les métriques JVM via Micrometer).

Cliquez sur "Load".

En bas de la page suivante, dans la section "Options", assurez-vous de sélectionner "Prometheus" (ou le nom que vous avez donné à votre source de données) dans la liste déroulante.

Cliquez sur "Import".

Vous aurez maintenant un tableau de bord affichant les métriques de performance de l'application Spring Boot (utilisation mémoire JVM, threads, requêtes HTTP, etc.).
[Image du tableau de bord Grafana 4701 affichant les métriques]
