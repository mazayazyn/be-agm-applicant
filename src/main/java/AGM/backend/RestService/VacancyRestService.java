package AGM.backend.RestService;

import AGM.backend.Model.VacancyModel;
import AGM.backend.Rest.DashboardResponse;

import java.util.List;

public interface VacancyRestService {
    VacancyModel createVacancy(VacancyModel vacancy);
    VacancyModel updateVacancy(VacancyModel vacancy);
    VacancyModel getVacancyById(Long id);
    List<VacancyModel> getAllVacancy();
    List<DashboardResponse> getDashboard(String email);
}
