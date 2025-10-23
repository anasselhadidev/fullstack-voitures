package org.cours.modele;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.persistence.*;

import java.util.List;

@Entity
public class Proprietaire {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private long id;

    private String nom;
    private String prenom;
    @OneToMany(cascade = CascadeType.ALL, mappedBy="proprietaire")
    @JsonManagedReference
    private List<Voiture> voitures;

    // Constructeur vide (requis par JPA)
    public Proprietaire() {}

    // Constructeur pour créer de nouveaux propriétaires
    public Proprietaire(String nom, String prenom) {
        this.nom = nom;
        this.prenom = prenom;
    }

    // Getters et Setters
    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public String getNom() {
        return nom;
    }

    public void setNom(String nom) {
        this.nom = nom;
    }

    public String getPrenom() {
        return prenom;
    }

    public void setPrenom(String prenom) {
        this.prenom = prenom;
    }

    public void setVoitures(List<Voiture> voitures) {
        this.voitures = voitures;
    }

    public List<Voiture> getVoitures() {
        return voitures;
    }
}