package AGM.backend;

import AGM.backend.Model.UserVacancyModel;
import AGM.backend.Model.VacancyModel;
import AGM.backend.Repository.UserVacancyDb;
import AGM.backend.Repository.VacancyDB;
import AGM.backend.RestService.UserVacancyRestService;
import AGM.backend.RestService.VacancyRestService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.scheduling.annotation.EnableScheduling;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurerAdapter;
import java.time.LocalDate;

@SpringBootApplication
@EnableScheduling
public class AgmApplicantApplication {

	public static void main(String[] args) {
		SpringApplication.run(AgmApplicantApplication.class, args);
	}

	@Autowired
	private VacancyRestService vacancyRestService;

	@Autowired
	private VacancyDB vacancyDb;

	@Autowired
	private UserVacancyRestService userVacancyRestService;

	@Autowired
	private UserVacancyDb userVacancyDb;


	@Scheduled(cron = "0 0 1 * * ?", zone = "Asia/Jakarta")
	public void scheduleTaskUsingCronExpression() {
		for (VacancyModel x: vacancyRestService.getAllVacancy()){
			LocalDate dateToday = LocalDate.now();
			if(dateToday.isAfter(x.getClosingDate())){
				x.setStatus(4);
				vacancyDb.save(x);
			}
		}

		for(UserVacancyModel i: userVacancyRestService.getAllUserVacancy()){
			if(i.getVacancy().getStatus().equals(4) && !(i.getAppliedStatus().equals(6))){
				i.setAppliedStatus(5);
				userVacancyDb.save(i);
			}
		}
	}

	@Bean
	PasswordEncoder passwordEncoder() {
		return new BCryptPasswordEncoder();
	}

	@Bean
	public WebMvcConfigurer corsConfigure(){
		return new WebMvcConfigurerAdapter() {
			@Override
			public void addCorsMappings(CorsRegistry registry) {
				registry.addMapping("/**").allowedOrigins("*");
			};
		};
	}

}