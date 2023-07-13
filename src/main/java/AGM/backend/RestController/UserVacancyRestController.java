package AGM.backend.RestController;


import AGM.backend.Model.UserModel;
import AGM.backend.Model.UserVacancyModel;
import AGM.backend.Model.VacancyModel;
import AGM.backend.Repository.UserDB;
import AGM.backend.Rest.BaseResponse;
import AGM.backend.Rest.InterviewForm;
import AGM.backend.RestService.UserVacancyRestService;
import AGM.backend.RestService.VacancyRestService;
import AGM.backend.Util.TemplateResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api")
public class UserVacancyRestController {

    @Autowired
    private UserVacancyRestService userVacancyRestService;

    @Autowired
    private UserDB userDB;

    @Autowired
    private VacancyRestService vacancyRestService;

    @Autowired
    private TemplateResponse templateResponse;

    @PostMapping(value = "/create-userVacancy/{idUser}/{idVacancy}")
    private ResponseEntity<?> createVacancy(@Valid UserVacancyModel userVacancy,
                                            @PathVariable("idUser") Long idUser,
                                            @PathVariable("idVacancy") Long idVacancy) {

        UserModel user = userDB.findOneById(idUser);
        VacancyModel vacancy = vacancyRestService.getVacancyById(idVacancy);
        userVacancy = new UserVacancyModel();
        userVacancy.setAppliedStatus(1);
        userVacancy.setUser(user);
        userVacancy.setVacancy(vacancy);
        Map map = new HashMap();
        return new ResponseEntity<Map>(templateResponse.templateSuccess(userVacancyRestService.createUserVacancy(userVacancy)), new HttpHeaders(), HttpStatus.OK);
    }

    @GetMapping(value="/list-userVacancy")
    private BaseResponse<List<UserVacancyModel>> getAllUserVacancy() {
        BaseResponse<List<UserVacancyModel>> response = new BaseResponse<>();
        response.setStatus(200);
        response.setMessage("success");
        response.setResult(userVacancyRestService.getAllUserVacancy());
        return response;
    }

    @GetMapping(value="/listUserVacancyByUser/{idUser}")
    private BaseResponse<List<UserVacancyModel>> getAllUserVacancyByUser(@PathVariable("idUser") Integer idUser) {
        BaseResponse<List<UserVacancyModel>> response = new BaseResponse<>();
        response.setStatus(200);
        response.setMessage("success");
        List<UserVacancyModel> userVacancyByUser = new ArrayList<>();
        for( UserVacancyModel x: userVacancyRestService.getAllUserVacancy()){
            if(x.getUser().getId().equals(idUser)){
                userVacancyByUser.add(x);
            }
        }
        response.setResult(userVacancyByUser);
        return response;
    }

    @GetMapping(value="/listUserVacancyByVacancy/{idVacancy}")
    private BaseResponse<List<UserVacancyModel>> getAllUserVacancyByUser(@PathVariable("idVacancy") Long idVacancy) {
        BaseResponse<List<UserVacancyModel>> response = new BaseResponse<>();
        response.setStatus(200);
        response.setMessage("success");
        List<UserVacancyModel> userVacancyByVacancy = new ArrayList<>();
        for( UserVacancyModel x: userVacancyRestService.getAllUserVacancy()){
            if(x.getVacancy().getId().equals(idVacancy)){
                userVacancyByVacancy.add(x);
            }
        }
        response.setResult(userVacancyByVacancy);
        return response;
    }

//

    @GetMapping(value="/userVacancyByUserByVacancy/{idUser}/{idVacancy}")
    private BaseResponse<List<UserVacancyModel>> getAllUserVacancyByUserByVacancy(@PathVariable("idUser") Long idUser, @PathVariable("idVacancy") Long idVacancy) {
        BaseResponse<List<UserVacancyModel>> response = new BaseResponse<>();
        response.setStatus(200);
        response.setMessage("success");
        List<UserVacancyModel> userVacancyByVacancy = new ArrayList<>();
        for(UserVacancyModel x: userVacancyRestService.getAllUserVacancy()){
            if(x.getUser().getId().equals(idUser)){
                System.out.println("masuk if pertama");
                if(x.getVacancy().getId().equals(idVacancy)) {
                    userVacancyByVacancy.add(x);
                }
            }
        }
        response.setResult(userVacancyByVacancy);
        return response;
    }

    @PostMapping(value = "/shortlist/{userVacancyId}/{status}")
    private BaseResponse updateUserVacancyStatus(@PathVariable Long userVacancyId, @PathVariable Integer status) {
        BaseResponse result = new BaseResponse();
        userVacancyRestService.updateUserVacancyStatus(userVacancyId, status);
        result.setMessage("Berhasil");
        return result;
    }

    @PostMapping(value = "/schedule-interview")
    private ResponseEntity<?> scheduleInterview(@Valid @RequestBody InterviewForm form, BindingResult bindingResult) {
        if (bindingResult.hasFieldErrors()) {
            return ResponseEntity.badRequest().body("Invalid Request");
        } else {
            userVacancyRestService.scheduleInterview(form);
            return ResponseEntity.ok("Success");
        }
    }
}
