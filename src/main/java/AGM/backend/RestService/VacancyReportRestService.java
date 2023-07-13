package AGM.backend.RestService;

import AGM.backend.Model.VacancyModel;
import AGM.backend.Model.VacancyReportModel;

import java.util.List;

public interface VacancyReportRestService {
    public VacancyReportModel saveReport(VacancyReportModel report, VacancyModel vacancy);
    public List<VacancyReportModel> getAllReportByVacancy(VacancyModel vacancy);
    public VacancyReportModel getReportById(Long idReport);
    public VacancyReportModel updateReport(VacancyReportModel reportUpdate);
    public void deleteReport(VacancyReportModel vacancyReportModel);
}