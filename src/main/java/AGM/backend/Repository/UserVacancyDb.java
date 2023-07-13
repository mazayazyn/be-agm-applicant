package AGM.backend.Repository;

import AGM.backend.Model.UserModel;
import AGM.backend.Model.UserVacancyModel;
import AGM.backend.Model.VacancyModel;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface UserVacancyDb extends JpaRepository<UserVacancyModel, Long> {
    List<UserVacancyModel> findAll();
    Optional<UserVacancyModel> findById(Long id);
    Optional<UserVacancyModel> findUserVacancyModelByVacancy(VacancyModel vacancy);
    Optional<UserVacancyModel> findUserVacancyModelByUser(UserModel user);

}
