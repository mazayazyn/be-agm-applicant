package AGM.backend.RestController;

import AGM.backend.Model.CandidateModel;
import AGM.backend.Model.UserModel;
import AGM.backend.Repository.CandidateDB;
import AGM.backend.Repository.UserDB;
import AGM.backend.RestService.CandidateRestService;
import AGM.backend.Util.TemplateResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import java.util.HashMap;
import java.util.Map;
import java.util.NoSuchElementException;

@CrossOrigin
@RestController
@RequestMapping("api/profile")
public class ProfileRestController {

    @Autowired
    private CandidateDB candidateDB;

    @Autowired
    private UserDB userDB;

    @Autowired
    private CandidateRestService candidateRestService;

    @Autowired
    private TemplateResponse templateResponse;

    @PostMapping("/{idUser}")
    public ResponseEntity<Map> addByUser(@RequestBody CandidateModel candidate, @PathVariable("idUser") Long idUser) {
            Map map = new HashMap();
            if (idUser == null){
                return new ResponseEntity<Map>(templateResponse.notFound("Id user is required"), new HttpHeaders(), HttpStatus.OK);
            }
            UserModel user = userDB.findOneById(idUser);
            if (user == null){
                return new ResponseEntity<Map>(templateResponse.notFound("Id user not found"), new HttpHeaders(), HttpStatus.OK);
            }
            CandidateModel checkIfExist = candidateDB.findOneByUser(user);
            if (checkIfExist != null){
                return new ResponseEntity<Map>(templateResponse.alreadyExists("Profile already exist"), new HttpHeaders(), HttpStatus.OK);
            }
            CandidateModel response = candidateRestService.saveCandidateByUser(candidate, user);
            return new ResponseEntity<Map>(templateResponse.templateSuccess(response), new HttpHeaders(), HttpStatus.OK);

    }

    @PutMapping(value = "/{idCandidate}")
    private CandidateModel updateCandidate(@PathVariable("idCandidate") Integer idCandidate, @RequestBody CandidateModel candidate) {
        try {
            return candidateRestService.updateCandidate(idCandidate, candidate);
        } catch (NoSuchElementException e) {
            throw new ResponseStatusException(
                    HttpStatus.NOT_FOUND, "Id candidate " + String.valueOf(idCandidate) + " not found."
            );
        }
    }

    @GetMapping(value="/getById/{id}")
    private ResponseEntity<?> getCandidate(@PathVariable Integer id) {
        CandidateModel candidate = candidateRestService.getCandidateById(id);
        if (candidate == null) {
            return ResponseEntity.notFound().build();
        } else {
            return ResponseEntity.ok(candidate);
        }
    }

}