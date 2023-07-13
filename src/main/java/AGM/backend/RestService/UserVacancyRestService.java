package AGM.backend.RestService;

import AGM.backend.Model.UserModel;
import AGM.backend.Model.UserVacancyModel;
import AGM.backend.Model.VacancyModel;
import AGM.backend.Rest.InterviewForm;

import java.util.List;

public interface UserVacancyRestService {
    UserVacancyModel createUserVacancy(UserVacancyModel UserVacancyModel);
    UserVacancyModel getUserVacancyById(Long id);
    UserVacancyModel getUserVacancyByVacancy(VacancyModel vacancy);
    UserVacancyModel getUserVacancyByUser(UserModel user);
    List<UserVacancyModel> getAllUserVacancy();
    UserVacancyModel updateUserVacancyStatus(Long id, Integer status);
    void scheduleInterview(InterviewForm form);
}
