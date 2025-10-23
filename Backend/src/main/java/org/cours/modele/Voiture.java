package org.cours.modele;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.NonNull;

@Entity
public class Voiture {
        @Id
        @GeneratedValue(strategy = GenerationType.AUTO)
        private long id;

        private String marque;
        private String modele;
        private String couleur;
        private String immatricule;
        private int annee;
        private int prix;
        @NonNull @ManyToOne(fetch = FetchType.LAZY)
        @JoinColumn(name = "proprietaire")
        @JsonBackReference
        private Proprietaire proprietaire;

        // Constructeur sans arguments (OBLIGATOIRE pour JPA)
        public Voiture() {
        }

        // Constructeur avec tous les arguments (pour faciliter la création)
        public Voiture(String marque, String modele, String couleur, String immatricule, int annee, int prix,Proprietaire proprietaire) {
                this.marque = marque;
                this.modele = modele;
                this.couleur = couleur;
                this.immatricule = immatricule;
                this.annee = annee;
                this.prix = prix;
                this.proprietaire = proprietaire;
        }
        public long getId() {
                return id;
        }

        public void setId(long id) {
                this.id = id;
        }

        public String getMarque() {
                return marque;
        }

        public void setMarque(String marque) {
                this.marque = marque;
        }

        public String getModele() {
                return modele;
        }

        public void setModele(String modele) {
                this.modele = modele;
        }

        public String getCouleur() {
                return couleur;
        }

        public void setCouleur(String couleur) {
                this.couleur = couleur;
        }

        public String getImmatricule() {
                return immatricule;
        }

        public void setImmatricule(String immatricule) {
                this.immatricule = immatricule;
        }

        public int getAnnee() {
                return annee;
        }

        public void setAnnee(int annee) {
                this.annee = annee;
        }

        public int getPrix() {
                return prix;
        }

        public void setPrix(int prix) {
                this.prix = prix;
        }

        // Méthode toString() pour l'affichage
        @Override
        public String toString() {
                return "Voiture{" +
                        "id=" + id +
                        ", marque='" + marque + '\'' +
                        ", modele='" + modele + '\'' +
                        ", couleur='" + couleur + '\'' +
                        ", immatricule='" + immatricule + '\'' +
                        ", annee=" + annee +
                        ", prix=" + prix +
                        '}';
        }

        // Méthodes equals() et hashCode() pour la comparaison d'objets
        @Override
        public boolean equals(Object o) {
                if (this == o) return true;
                if (o == null || getClass() != o.getClass()) return false;

                Voiture voiture = (Voiture) o;

                return id == voiture.id;
        }

        @Override
        public int hashCode() {
                return (int) (id ^ (id >>> 32));
        }
        public Proprietaire getProprietaire(){
                return proprietaire;
        }

        public void setProprietaire(Proprietaire proprietaire) {
                this.proprietaire = proprietaire;
        }
}