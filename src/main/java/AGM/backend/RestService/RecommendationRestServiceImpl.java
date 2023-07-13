package AGM.backend.RestService;

import AGM.backend.Model.CandidateModel;
import AGM.backend.Model.UserModel;
import AGM.backend.Model.VacancyModel;
import AGM.backend.Repository.CandidateDB;
import AGM.backend.Repository.UserDB;
import AGM.backend.Rest.RecommendationDTO;
import AGM.backend.Service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.ui.Model;
import org.thymeleaf.TemplateEngine;
import org.thymeleaf.context.Context;

import javax.mail.MessagingException;
import javax.mail.internet.MimeMessage;
import javax.transaction.Transactional;
import java.util.ArrayList;
import java.util.List;

@Service
@Transactional
public class RecommendationRestServiceImpl implements RecommendationRestService{

    @Autowired
    private JavaMailSender javaMailSender;

    @Autowired
    private TemplateEngine templateEngine;

    @Autowired
    private UserService userService;

    @Autowired
    private VacancyRestService vacancyRestService;

    @Autowired
    private CandidateRestService candidateRestService;

    @Autowired
    private CandidateDB candidateDB;

    @Autowired
    private UserDB userDB;

    @Override
    public void sendEmail(Integer userId, Integer vacancyId, Model model) throws MessagingException {
        MimeMessage mail = javaMailSender.createMimeMessage();
        Context context = new Context();
        UserModel user = userDB.findUserModelById(Long.valueOf(userId));
        VacancyModel vacancy = vacancyRestService.getVacancyById(Long.valueOf(vacancyId));

        context.setVariable("user", user);
        context.setVariable("vacancy", vacancy);

        model.addAttribute("user", user);

        String url = "https://applicant-agm.herokuapp.com/job-detail/" + user.getId() + "/" +vacancy.getId() + " ";
        String html =
                "<div style='width: 100%'>"+
                        "<img src='https://i.ibb.co/YPZ8WST/Headers.png' style='width: 100%'>"+
                        "</div>"+
                        "<h1 style='font-weight: 700; font-size: 1.875rem; line-height: 2.25rem; text-align: center; color: #141414;'>Hello,"+  user.getUsername() + "</h1>"+
                        "<p style='text-align: center'>If you receive this message, you have been recommended to apply for a job on an existing vacancy. <br> You can apply directly by clicking the button below or accessing the url.</p>"+
                        "<br>"+
                        "<div style='border: solid 1px #E2E2E2; width: 75%; margin: auto; padding: 2%;'>"+
                        "<div style='display: flex; justify-content: space-between;'>"+
                        "<table style='width: 100%'>"+
                        "<tr>"+
                        "<td style='width: 70%'>"+
                        "<h1 style='color:#454ADE; font-size: 1.5rem; line-height: 1rem; font-weight: bold;'>"+vacancy.getTitle()+"</h1>"+
                        "<p style='font-weight: bold; font-size: 1.125rem; line-height: 0.75rem;'>"+vacancy.getIndustry()+"</p>"+
                        "</td>"+
                        "<td style='width: 20%'>"+
                        "<p style='font-weight: bold; font-size: 16px; margin: 0;'>Date Closed</p>"+
                        "<p style='margin: 0; font-size: 16px;'>"+ vacancy.getClosingDate() + "</p>"+
                        "</td>"+
                        "</tr>"+
                        "</table>"+
                        "</div>"+
                        "</div>"+
                        "<br><br>"+
                        "<div style='display: flex; margin: auto; width:200px;'>"+
                        "<a href='https://applicant-agm.herokuapp.com/' target='_blank' style='width: 100%;'><button type='button' style='padding: 8%; border-radius: 2px; width: 100%; color: #FFFFFF; background-color: #141414!important; cursor: pointer!important; transition: background-color 0.2s ease-in-out;'>Apply Job Now</button></a>"+
                        "</div>"+
                        "<br>"+
                        "<p style='text-align: center'>or</p>"+
                        "<br>"+
                        "<div style='text-align: center; color: #454ADE;'>"+
                        "<a href="+url + " " +"target='_blank' style='color: #454ADE; text-decoration: underline; font-size: 16px; font-weight: bold;'>Apply via link here !</a>"+
                        "</div>";

        MimeMessageHelper helper = new MimeMessageHelper(mail, true);
        helper.setTo(user.getEmail());
        helper.setSubject("AGM APPLICANTS RECOMMENDATION");
        helper.setText(html, true);
        
        javaMailSender.send(mail);
    }

    @Override
    public List<RecommendationDTO> getListRecommendation(Integer vacancyId){
        VacancyModel vacancy = vacancyRestService.getVacancyById(Long.valueOf(vacancyId));
        System.out.println(userDB.findAll().size());
        List<RecommendationDTO> result = new ArrayList<>();
        if (!vacancy.equals(null)){
            for (CandidateModel i: candidateRestService.getAllCandidate()){
                if (i.getIndustry().equals(vacancy.getIndustry())){
                    RecommendationDTO temp = new RecommendationDTO();
                    temp.setCandidate(i);
                    temp.setUser(i.getUser());
                    result.add(temp);
                }
            }
        }
        return result;
    }

    @Override
    public RecommendationDTO detailRecommendation(Integer userId, Integer vacancyId){
        UserModel user = userDB.findUserModelById(Long.valueOf(userId));
        VacancyModel vacancy = vacancyRestService.getVacancyById(Long.valueOf(vacancyId));
        CandidateModel candidate = candidateDB.findOneByUser(user);
        RecommendationDTO recommendationDTO = new RecommendationDTO();
        recommendationDTO.setUser(user);
        recommendationDTO.setCandidate(candidate);
        recommendationDTO.setVacancy(vacancy);
        return recommendationDTO;
    }
}
