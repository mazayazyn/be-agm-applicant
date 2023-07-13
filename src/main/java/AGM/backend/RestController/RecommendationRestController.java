package AGM.backend.RestController;

import AGM.backend.Model.CandidateModel;
import AGM.backend.Rest.BaseResponse;
import AGM.backend.Rest.RecommendationDTO;
import AGM.backend.RestService.RecommendationRestService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api")
@RequiredArgsConstructor
@Slf4j
public class RecommendationRestController {
    @Autowired
    private RecommendationRestService recommendationRestService;

    @PostMapping(value = "/email/{userId}/{vacancyId}")
    private BaseResponse sendEmail(@PathVariable Integer userId, @PathVariable Integer vacancyId, Model model){
        BaseResponse<?> response = new BaseResponse<>();
        try {
            recommendationRestService.sendEmail(userId, vacancyId, model);
            response.setStatus(201);
            response.setMessage("Send Email Success!!");
        } catch (Exception e){
            response.setStatus(400);
            response.setMessage(e.toString());
            response.setResult(null);
        }
        return response;
    }

    @GetMapping(value = "/recommendation/{vacancyId}")
    private BaseResponse<List<RecommendationDTO>> getRecommendation(@PathVariable Integer vacancyId){
        BaseResponse<List<RecommendationDTO>> response = new BaseResponse<>();
        try{
            response.setStatus(200);
            response.setMessage("success");
            response.setResult(recommendationRestService.getListRecommendation(vacancyId));
        } catch (Exception e){
            response.setStatus(400);
            response.setMessage(e.toString());
            response.setResult(null);
        }
        return response;
    }

    @GetMapping(value = "/detail-recommendation/{userId}/{vacancyId}")
    private BaseResponse<?> getDetailRecommendation(@PathVariable Integer userId, @PathVariable Integer vacancyId){
        BaseResponse<RecommendationDTO> response = new BaseResponse<>();
        try{
            response.setStatus(200);
            response.setMessage("success");
            response.setResult(recommendationRestService.detailRecommendation(userId, vacancyId));
        } catch (Exception e){
            response.setStatus(400);
            response.setMessage(e.toString());
            response.setResult(null);
        }
        return response;
    }
}