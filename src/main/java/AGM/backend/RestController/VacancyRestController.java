package AGM.backend.RestController;

import javax.validation.Valid;

import AGM.backend.Rest.BaseResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;

import AGM.backend.Model.VacancyModel;
import AGM.backend.RestService.VacancyRestService;

import java.util.List;

@RestController
@RequestMapping("/api")
public class VacancyRestController {
    @Autowired
    private VacancyRestService vacancyRestService;

    @PostMapping(value = "/create-vacancy")
    private ResponseEntity<?> createVacancy(@Valid @RequestBody VacancyModel vacancy, BindingResult bindingResult) {
        if (bindingResult.hasFieldErrors()) {
            return ResponseEntity.badRequest().body("Invalid Request");
        } else {
            return ResponseEntity.status(HttpStatus.CREATED).body(vacancyRestService.createVacancy(vacancy));
        }
    }

    @PostMapping(value = "/update-vacancy")
    private ResponseEntity<?> updateVacancy(@Valid @RequestBody VacancyModel vacancy, BindingResult bindingResult) {
        if (bindingResult.hasFieldErrors()) {
            return ResponseEntity.badRequest().body("Invalid Request");
        } else {
            return ResponseEntity.status(HttpStatus.OK).body(vacancyRestService.updateVacancy(vacancy));
        }
    }

    @GetMapping(value = "/vacancy/{id}")
    private ResponseEntity<?> getVacancy(@PathVariable Long id) {
        VacancyModel vacancy = vacancyRestService.getVacancyById(id);
        if (vacancy == null) {
            return ResponseEntity.notFound().build();
        } else {
            return ResponseEntity.ok(vacancy);
        }
    }

    @GetMapping(value = "/vacancy/dashboard")
    private ResponseEntity<?> getDashboard(@RequestParam("email") String email) {
        List<?> result = vacancyRestService.getDashboard(email);
        if (result == null) {
            return ResponseEntity.notFound().build();
        } else {
            return ResponseEntity.ok(result);
        }
    }

    @GetMapping(value = "/list-vacancy")
    private BaseResponse<List<VacancyModel>> getAllVacancy() {
        BaseResponse<List<VacancyModel>> response = new BaseResponse<>();
        response.setStatus(200);
        response.setMessage("success");
        response.setResult(vacancyRestService.getAllVacancy());
        return response;
    }

}
