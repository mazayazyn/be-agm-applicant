package AGM.backend.RestService;

import AGM.backend.Model.UserModel;
import AGM.backend.Model.UserVacancyModel;
import AGM.backend.Model.VacancyModel;
import AGM.backend.Repository.UserVacancyDb;
import AGM.backend.Rest.InterviewForm;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.List;
import java.util.Optional;

@Service
@Transactional
public class UserVacancyRestServiceImpl implements UserVacancyRestService{
    @Autowired
    private UserVacancyDb userVacancyDb;

    @Override
    public UserVacancyModel createUserVacancy(UserVacancyModel userVacancy) {
        return userVacancyDb.save(userVacancy);
    }

    @Override
    public UserVacancyModel getUserVacancyById(Long id) {
        Optional<UserVacancyModel> userVacancy = userVacancyDb.findById(id);
        if (userVacancy.isPresent()) {
            return userVacancy.get();
        }
        return null;
    }

    @Override
    public UserVacancyModel getUserVacancyByVacancy(VacancyModel vacancy) {
        Optional<UserVacancyModel> userVacancy = userVacancyDb.findUserVacancyModelByVacancy(vacancy);
        if (userVacancy.isPresent()) {
            return userVacancy.get();
        }
        return null;
    }

    @Override
    public UserVacancyModel getUserVacancyByUser(UserModel user){
        Optional<UserVacancyModel> userVacancy = userVacancyDb.findUserVacancyModelByUser(user);
        if (userVacancy.isPresent()) {
            return userVacancy.get();
        }
        return null;
    }

    @Override
    public List<UserVacancyModel> getAllUserVacancy() {
        return userVacancyDb.findAll();
    }

    @Override
    public UserVacancyModel updateUserVacancyStatus(Long id, Integer status) {
        UserVacancyModel userVacancyModel = getUserVacancyById(id);
        userVacancyModel.setAppliedStatus(status);
        userVacancyDb.save(userVacancyModel);
        return userVacancyModel;
    }

    @Override
    public void scheduleInterview(InterviewForm form) {
        UserVacancyModel userVacancyModel = getUserVacancyById(form.getIdUser_Vacancy());
        userVacancyModel.setInterviewDateTime(form.getInterviewDateTime());
        userVacancyDb.save(userVacancyModel);
    }

}
