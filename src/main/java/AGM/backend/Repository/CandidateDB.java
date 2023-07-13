package AGM.backend.Repository;

import AGM.backend.Model.*;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CandidateDB extends JpaRepository<CandidateModel, Integer>{
    CandidateModel findOneById(Integer id);
    CandidateModel findOneByUser(UserModel id);
}