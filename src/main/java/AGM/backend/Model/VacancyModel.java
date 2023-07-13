package AGM.backend.Model;

import java.io.Serializable;
import java.time.LocalDate;

import javax.persistence.*;

import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;
import org.springframework.format.annotation.DateTimeFormat;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@AllArgsConstructor
@NoArgsConstructor
@Setter
@Getter
@Entity
@Table(name = "nc_mzkz__vacancy")
public class VacancyModel implements Serializable {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    /*
     * Relationship
     */
    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "client", referencedColumnName = "email")
    @OnDelete(action = OnDeleteAction.CASCADE)
    private UserModel client;

    // @OneToMany(mappedBy = "vacancies", fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    // private Set<UserModel> candidates;

    /*
     * status vacancies
     * 1 = published
     * 2 = pending
     * 3 = rejected
     * 4 = closed
     */
    @Column(nullable = false)
    private Integer status;

    // Contact Information
    private String companyName;

    private String companyDescription;

    private String companyAddress;

    private String companyPhone;

    private String companyEmail;

    private String companyWebsite;

    private Integer totalEmployee;

    // Vacancy Information
    private Boolean isContract;

    private Integer contractDur;

    @DateTimeFormat(pattern = "yyyy-MM-dd")
    private LocalDate openingDate;

    @DateTimeFormat(pattern = "yyyy-MM-dd")
    private LocalDate closingDate;

    // Job Description
    private String title;

    private String reportsTo;

    private String subordinates;

    private String workingLocation;

    private String workingTime;

    private Integer headcount;

    private String industry;

    private String yearsOfExperience;

    private String keyResponsibility;

    private String behaviouralCompetencies;

    private String ignoredCompany;
    
    private String culture;

    // Compensation Information
    private Integer startSalary;

    private Integer endSalary;

    private String firstSalaryReview;

    private String targetCompany;

    private String bonusSystem;

    private Boolean travel;

    // Benefits
    private String overtime;
    
    private String stock;
    
    private String tax;
    
    private String incentives;

    private String healthInsurance;

    private String car;

    private String lifeInsurance;

    private String other;

    // Interview
    private Integer stages;

    private String idealTime;

    private String offers;

    private Boolean evaluationTest;

    private Boolean secondClient;

    // Ads
    private Boolean internetAds;

    private Boolean paperAds;

    private Boolean cobrand;

}
