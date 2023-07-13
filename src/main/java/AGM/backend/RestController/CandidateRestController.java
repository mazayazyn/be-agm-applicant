package AGM.backend.RestController;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import AGM.backend.Model.CandidateModel;
import AGM.backend.RestService.CandidateRestService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/candidate")
public class CandidateRestController {

    @Autowired
    private CandidateRestService candidateRestService;

    @GetMapping(value = "/list")
    private Map<String, List<CandidateModel>> getCandidateList() {
        HashMap<String, List<CandidateModel>> res = new HashMap<>();
        List<CandidateModel> CandidateList = candidateRestService.getAllCandidate();
        res.put("result", CandidateList);
        return res;
    }
}





