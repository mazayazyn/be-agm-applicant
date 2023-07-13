package AGM.backend.RestService;

import AGM.backend.Model.CandidateModel;
import AGM.backend.Model.UserModel;

import java.util.List;

public interface CandidateRestService {
    CandidateModel getCandidateById(Integer idCandidate);
    CandidateModel updateCandidate(Integer idCandidate, CandidateModel candidateUpdate);
    CandidateModel saveCandidateByUser(CandidateModel candidate, UserModel user);
    List<CandidateModel> getAllCandidate();
}