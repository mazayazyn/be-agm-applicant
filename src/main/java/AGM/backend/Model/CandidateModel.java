package AGM.backend.Model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.format.annotation.DateTimeFormat;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;
import java.io.Serializable;
import java.time.LocalDate;

@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "nc_mzkz__candidates")
public class CandidateModel implements Serializable {
    @Id
    @Setter
    @Getter
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @NotNull
    @Setter
    @Getter
    @Size(max=100)
    @Column(name="full_name")
    private String fullName;

    @NotNull
    @Setter
    @Getter
    @Size(max=100)
    @Column(name="about")
    private String about;

    @NotNull
    @Setter
    @Getter
    @Size(max=100)
    @Column(name="no_telp", nullable = false)
    private String noTelp;

    @NotNull
    @Setter
    @Getter
    @Column(name = "date_of_birth", nullable = false)
    @DateTimeFormat(pattern = "yyyy-MM-dd")
    private LocalDate dateOfBirth;

    @NotNull
    @Setter
    @Getter
    @Size(max=100)
    @Column(name="yearExperience", nullable = false)
    private String yearExperience;

    @NotNull
    @Setter
    @Getter
    @Size(max=100)
    @Column(name="jobLevel", nullable = false)
    private String jobLevel;

    @NotNull
    @Setter
    @Getter
    @Size(max=100)
    @Column(name="jobPosition", nullable = false)
    private String jobPosition;

    @NotNull
    @Setter
    @Getter
    @Column(name="currentSalary", nullable = false)
    private Float currentSalary;

    @NotNull
    @Setter
    @Getter
    @Size(max=100)
    @Column(name="industry", nullable = false)
    private String industry;

    @OneToOne(cascade = CascadeType.ALL)
    @JsonIgnore
    @Setter
    @Getter
    @JoinColumn(name="id_user", referencedColumnName = "id")
    private UserModel user;

    @Setter
    @Getter
    @Column (name="cv_file_name")
    private String cvFileName;

    @Setter
    @Getter
    @Column (name="cv_file_name_original")
    private String cvFileNameOriginal;

    @Setter
    @Getter
    @Column (name="cv_photo")
    private String cvPhoto;

}
