package AGM.backend.RestService;

import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import AGM.backend.Model.UserModel;
import AGM.backend.Model.VacancyModel;
import AGM.backend.Repository.UserDB;
import AGM.backend.Repository.VacancyDB;
import AGM.backend.Rest.DashboardResponse;

import java.util.List;
import java.util.Optional;

@Service
@Transactional
public class VacancyRestServiceImpl implements VacancyRestService {
    @Autowired
    private VacancyDB vacancyDB;

    @Autowired
    private UserDB userDB;

    @Override
    public VacancyModel createVacancy(VacancyModel vacancy) {
        vacancy.setClient(userDB.findUserModelByEmail(vacancy.getClient().getEmail()));
        vacancy.setStatus(2);
        return vacancyDB.save(vacancy);
    }

    @Override
    public VacancyModel updateVacancy(VacancyModel vacancy) {
        return vacancyDB.save(vacancy);
    }

    @Override
    public VacancyModel getVacancyById(Long id) {
        Optional<VacancyModel> vacancy = vacancyDB.findById(id);
        if (vacancy.isPresent()) {
            return vacancy.get();
        }
        return null;
    }

    @Override
    public List<VacancyModel> getAllVacancy() {
        return vacancyDB.findAll();
    }

    @Override
    public List<DashboardResponse> getDashboard(String email) {
        UserModel user = userDB.findUserModelByEmail(email);
        
        if (user.getRole().getRole().equalsIgnoreCase("KLIEN")) {
            return vacancyDB.findDashboard(user.getId());
        } else if (user.getRole().getRole().equalsIgnoreCase("HR")) {
            return vacancyDB.findHRDashboard();
        }
        return null;
    }
}
