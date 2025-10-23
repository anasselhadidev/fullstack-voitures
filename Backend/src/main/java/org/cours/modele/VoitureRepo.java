package org.cours.modele;

import org.springframework.data.repository.CrudRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;
import java.util.List;

@RepositoryRestResource
public interface VoitureRepo extends CrudRepository<Voiture,Long> {
    List<Voiture> findByMarque(String marque);
    List<Voiture> findByCouleur(String couleur);

    // Sélectionner les voitures par année
    List<Voiture> findByAnnee(int annee);

    // Sélectionner les voitures par marque et modele
    List<Voiture> findByMarqueAndModele(String marque, String modele);

    // Sélectionner les voitures par marque ou couleur
    List<Voiture> findByMarqueOrCouleur(String marque, String couleur);

    // Sélectionner les voitures par marque et trier par année (ascendant)
    List<Voiture> findByMarqueOrderByAnneeAsc(String marque);
}
