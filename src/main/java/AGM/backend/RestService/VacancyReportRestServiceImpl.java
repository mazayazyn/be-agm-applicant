package AGM.backend.RestService;

import AGM.backend.Model.VacancyModel;
import AGM.backend.Model.VacancyReportModel;
import AGM.backend.Repository.VacancyReportDB;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.List;
import java.util.NoSuchElementException;
import java.util.Optional;

@Service
@Transactional
public class VacancyReportRestServiceImpl implements VacancyReportRestService {
    @Autowired
    private VacancyReportDB vacancyReportDB;

    @Override
    public VacancyReportModel saveReport(VacancyReportModel report, VacancyModel vacancy) {
        report.setVacancy(vacancy);
        return vacancyReportDB.save(report);
    }

    @Override
    public List<VacancyReportModel> getAllReportByVacancy(VacancyModel vacancy) {
        return vacancyReportDB.findByVacancy(vacancy);
    }

    @Override
    public VacancyReportModel getReportById(Long idReport) {
        Optional<VacancyReportModel> report = vacancyReportDB.findById(idReport);

        if(report.isPresent()){
            return report.get();
        } else {
            throw new NoSuchElementException();
        }
    }

    @Override
    public VacancyReportModel updateReport(VacancyReportModel reportUpdate) {
        return vacancyReportDB.save(reportUpdate);
    }

    @Override
    public void deleteReport(VacancyReportModel id) {
        vacancyReportDB.delete(id);
    }
}
