package AGM.backend.RestController;

import AGM.backend.Model.VacancyModel;
import AGM.backend.Model.VacancyReportModel;
import AGM.backend.Repository.VacancyReportDB;
import AGM.backend.RestService.VacancyReportRestService;
import AGM.backend.RestService.VacancyRestService;

import AGM.backend.Util.TemplateResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import java.util.*;

@CrossOrigin
@RestController
@RequestMapping("api/report")
public class VacancyReportRestController {

    @Autowired
    private VacancyReportDB vacancyReportDB;

    @Autowired
    private VacancyReportRestService vacancyReportRestService;

    @Autowired
    private TemplateResponse templateResponse;

    @Autowired
    private VacancyRestService vacancyRestService;

    @PostMapping("/create-report/{idVacancy}")
    public ResponseEntity<Map> addReport(@RequestBody VacancyReportModel vacancy, @PathVariable("idVacancy") Long idReport) {
        Map map = new HashMap();
        if (idReport == null){
            return new ResponseEntity<Map>(templateResponse.notFound("Id report is required"), new HttpHeaders(), HttpStatus.OK);
        }
        VacancyModel vacancyCheck = vacancyRestService.getVacancyById(idReport);
        if (vacancyCheck == null){
            return new ResponseEntity<Map>(templateResponse.notFound("Id vacancy not found"), new HttpHeaders(), HttpStatus.OK);
        }
        VacancyReportModel response = vacancyReportRestService.saveReport(vacancy, vacancyCheck);
        return new ResponseEntity<Map>(templateResponse.templateSuccess(response), new HttpHeaders(), HttpStatus.OK);

    }

    @GetMapping("/getAllReportByVacancy/{idVacancy}")
        public ResponseEntity<Map> getAllReportByVacancy(@PathVariable("idVacancy") Long idVacancy) {
            if (idVacancy == null){
                return new ResponseEntity<Map>(templateResponse.notFound("Id vacancy is required"), new HttpHeaders(), HttpStatus.OK);
            }
            VacancyModel vacancyCheck = vacancyRestService.getVacancyById(idVacancy);
            if (vacancyCheck == null){
                return new ResponseEntity<Map>(templateResponse.notFound("Id vacancy not found"), new HttpHeaders(), HttpStatus.OK);
            }
        return new ResponseEntity<Map>(templateResponse.templateSuccess(vacancyReportRestService.getAllReportByVacancy(vacancyCheck)), new HttpHeaders(), HttpStatus.OK);
        }

    @GetMapping(value = "/get-report/{idReport}")
    private ResponseEntity<Map> retrieveReport(@PathVariable("idReport") Long idReport) {
        try {
            return new ResponseEntity<Map>(templateResponse.templateSuccess(vacancyReportRestService.getReportById(idReport)), new HttpHeaders(), HttpStatus.OK);
        } catch (NoSuchElementException e) {
            throw new ResponseStatusException(
                    HttpStatus.NOT_FOUND, "Id report " + String.valueOf(idReport) + " not found,"
            );
        }
    }

    @PutMapping(value = "/update-report")
    private ResponseEntity<Map> updateReport(@RequestBody VacancyReportModel vacancyReportModel) {
        try {
            if (vacancyReportModel.getId() == null){
                return new ResponseEntity<Map>(templateResponse.notFound("Id report is required"), new HttpHeaders(), HttpStatus.OK);
            }
            Optional<VacancyReportModel> obj = vacancyReportDB.findById(vacancyReportModel.getId());
            obj.get().setFileName(vacancyReportModel.getFileName());
            obj.get().setFileNameOriginal(vacancyReportModel.getFileNameOriginal());

            VacancyReportModel update = vacancyReportRestService.updateReport(obj.get());
            return new ResponseEntity<Map>(templateResponse.templateSuccess(update), new HttpHeaders(), HttpStatus.OK);
        } catch (NoSuchElementException e) {
            throw new ResponseStatusException(
                    HttpStatus.NOT_FOUND, "Id report " + String.valueOf(vacancyReportModel.getId()) + " not found."
            );
        }
    }

    @DeleteMapping(value = "/delete-report/{idReport}")
    private ResponseEntity<Map> deleteReport(@PathVariable("idReport") Long idReport)  {
        try {
            if (idReport == null){
                return new ResponseEntity<Map>(templateResponse.notFound("Id report is required"), new HttpHeaders(), HttpStatus.OK);
            }
            Optional<VacancyReportModel> obj = vacancyReportDB.findById(idReport);
            vacancyReportRestService.deleteReport(obj.get());
            return new ResponseEntity<Map>(templateResponse.templateSuccess("Report already deleted"), new HttpHeaders(), HttpStatus.OK);
        } catch (NoSuchElementException e) {
            throw new ResponseStatusException(
                    HttpStatus.NOT_FOUND, "Id report " + String.valueOf(idReport) + " not found."
            );
        }
    }

}