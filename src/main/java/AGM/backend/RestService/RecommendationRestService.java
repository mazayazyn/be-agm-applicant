package AGM.backend.RestService;

import AGM.backend.Model.CandidateModel;
import AGM.backend.Rest.RecommendationDTO;
import org.springframework.ui.Model;

import javax.mail.MessagingException;
import java.util.List;

public interface RecommendationRestService {
    void sendEmail(Integer userId, Integer vacancyId, Model model) throws MessagingException;
    List<RecommendationDTO> getListRecommendation(Integer vacancyId);
    RecommendationDTO detailRecommendation(Integer userId, Integer vacancyId);
}
