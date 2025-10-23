package org.cours.SpringDataRest; // Assurez-vous que le package correspond au vôtre

import static org.assertj.core.api.Assertions.assertThat;

import org.cours.web.VoitureController; // Importez le contrôleur que vous voulez tester
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

@SpringBootTest // Indique à Spring Boot de charger le contexte complet de l'application pour ce test. [cite: 416, 417]
class SpringDataRestApplicationTests {

	@Autowired
	private VoitureController voitureController;
	@Test
	void ContextLoads(){
		assertThat(voitureController).isNotNull();
	}
}