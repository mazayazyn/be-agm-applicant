package AGM.backend.Repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import AGM.backend.Model.VacancyModel;
import AGM.backend.Rest.DashboardResponse;

import java.util.List;
import java.util.Optional;

@Repository
public interface VacancyDB extends JpaRepository<VacancyModel, Long> {
    List<VacancyModel> findAll();

    @Query(value = "SELECT new AGM.backend.Rest.DashboardResponse(id, title, status) FROM VacancyModel", nativeQuery = false)
    List<DashboardResponse> findHRDashboard();

    @Query(value = "SELECT new AGM.backend.Rest.DashboardResponse(id, title, status) FROM VacancyModel WHERE client.id = ?1", nativeQuery = false)
    List<DashboardResponse> findDashboard(Long id);

    Optional<VacancyModel> findById(Long id);
}
