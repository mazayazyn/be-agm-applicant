package AGM.backend.RestService;

import AGM.backend.Model.CandidateModel;
import AGM.backend.Model.UserModel;
import AGM.backend.Repository.CandidateDB;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.List;
import java.util.NoSuchElementException;
import java.util.Optional;

@Service
@Transactional
public class CandidateRestServiceImpl implements CandidateRestService {

    @Autowired
    private CandidateDB candidateDB;

    @Override
    public CandidateModel saveCandidateByUser(CandidateModel candidate, UserModel user) {
        candidate.setUser(user);
        return candidateDB.save(candidate);
    }

    @Override
    public CandidateModel getCandidateById(Integer idCandidate) {
        Optional<CandidateModel> candidate = candidateDB.findById(idCandidate);

        if(candidate.isPresent()){
            return candidate.get();
        } else {
            throw new NoSuchElementException();
        }
    }

    @Override
    public CandidateModel updateCandidate(Integer idCandidate, CandidateModel candidateUpdate) {
        CandidateModel candidate = getCandidateById(idCandidate);
        candidate.setFullName(candidateUpdate.getFullName());
        candidate.setCvFileName(candidateUpdate.getCvFileName());
        candidate.setCvFileNameOriginal(candidateUpdate.getCvFileNameOriginal());
        candidate.setCvPhoto(candidateUpdate.getCvPhoto());
        candidate.setAbout(candidateUpdate.getAbout());
        candidate.setCurrentSalary(candidateUpdate.getCurrentSalary());
        candidate.setDateOfBirth(candidateUpdate.getDateOfBirth());
        candidate.setJobLevel(candidateUpdate.getJobLevel());
        candidate.setJobPosition(candidateUpdate.getJobPosition());
        candidate.setNoTelp(candidateUpdate.getNoTelp());
        candidate.setYearExperience(candidateUpdate.getYearExperience());
        return candidateDB.save(candidate);
    }

    @Override
    public List<CandidateModel> getAllCandidate(){
        return candidateDB.findAll();
    }

}