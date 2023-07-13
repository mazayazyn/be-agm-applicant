package AGM.backend.Model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import java.io.Serializable;

@AllArgsConstructor
@NoArgsConstructor
@Setter
@Getter
@Entity
@Table(name = "nc_mzkz__vacancy_report")
public class VacancyReportModel implements Serializable {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Setter
    @Getter
    @Column (name="file_name")
    private String fileName;

    @Setter
    @Getter
    @Column (name="file_name_original")
    private String fileNameOriginal;

    @Transient
    private String downloadUri;

    @ManyToOne(fetch = FetchType.EAGER, optional = false)
    @JoinColumn(name = "id_vacancy", referencedColumnName = "id", nullable = false)
    @JsonIgnore
    private VacancyModel vacancy;

}
