package AGM.backend.Model;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;

import java.io.Serializable;
import java.time.LocalDateTime;

import javax.persistence.Column;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;

@AllArgsConstructor
@NoArgsConstructor
@Setter @Getter
@Entity
@Table(name = "nc_mzkz__uservacancy")
@JsonIgnoreProperties(ignoreUnknown = true)
public class UserVacancyModel implements Serializable {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long idUser_Vacancy;

    //relasi dengan kandidat
    @ManyToOne
    @JoinColumn(name = "id_user")
    private UserModel user;

    //relasi dengan vacancy
    @ManyToOne
    @JoinColumn(name = "id_vacancy")
    private VacancyModel vacancy;

    // 1=Applied, 2=Shortlisted, 3=Unsuitable, 4=Not Passed, 5=Rejected, 6=Hired
    @Column(name="applied_status")
    private Integer appliedStatus;

    private LocalDateTime interviewDateTime;
}
