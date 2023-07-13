package AGM.backend.Repository;

import AGM.backend.Model.VacancyModel;
import AGM.backend.Model.VacancyReportModel;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface VacancyReportDB extends JpaRepository<VacancyReportModel, Long>{
    Optional<VacancyReportModel> findById(Long id);
    List<VacancyReportModel> findByVacancy (VacancyModel vacancy);
}