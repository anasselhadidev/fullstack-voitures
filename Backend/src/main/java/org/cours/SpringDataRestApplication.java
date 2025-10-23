package org.cours;
import org.cours.modele.*;
import org.cours.modele.Voiture;
import org.cours.modele.VoitureRepo;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;

// ... importations existantes
import org.cours.modele.Proprietaire;
import org.cours.modele.ProprietaireRepo;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;

@SpringBootApplication
public class SpringDataRestApplication {

	@Autowired
	private VoitureRepo repository;

	@Autowired
	private ProprietaireRepo proprietaireRepo; // Injection du nouveau repo

	public static void main(String[] args) {
		SpringApplication.run(SpringDataRestApplication.class, args);
	}

	@Bean
	CommandLineRunner runner(){
		return args -> {
			// Ajouter des propriétaires
			Proprietaire proprietaire1 = new Proprietaire("Ali", "Hassan");
			Proprietaire proprietaire2 = new Proprietaire("Najat", "Bani");
			proprietaireRepo.save(proprietaire1);
			proprietaireRepo.save(proprietaire2);

			// Sauvegarder des voitures avec leurs propriétaires
			repository.save(new Voiture("Toyota", "Corolla", "Grise", "A-1-9090", 2018, 95000, proprietaire1));
			repository.save(new Voiture("Ford", "Fiesta", "Rouge", "A-2-8090", 2015, 90000, proprietaire1));
			repository.save(new Voiture("Honda", "CRV", "Bleu", "A-3-7090", 2016, 140000, proprietaire2));
		};
	}
}