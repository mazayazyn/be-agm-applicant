package AGM.backend.Controller;

import AGM.backend.Model.RoleModel;
import AGM.backend.Model.UserModel;
import AGM.backend.Service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.servlet.ModelAndView;

@Controller
public class IndexController {

    @Autowired
    private UserService userService;

    @GetMapping(value = { "/", "/{x:[\\w\\-]+}", "/view-report/**", "/u/**", "/candidate-list/**", "/job-detail/**",
            "/job-detail-applied/**", "/application-success/**", "/profile/**", "/view-report/**",
            "/detail-hired-candidate/**", "/detail-recommendation/**", "/candidate-detail/**", "/shortlist/**" })
    public ModelAndView home() {
        ModelAndView mav = new ModelAndView("index");
        return mav;
    }

    // @GetMapping("/dummy-role")
    // public void addDummyUser() {
    //     RoleModel kandidat = new RoleModel();
    //     kandidat.setRole("KANDIDAT");
    //     RoleModel hr = new RoleModel();
    //     hr.setRole("HR");
    //     RoleModel klien = new RoleModel();
    //     klien.setRole("KLIEN");
    //     userService.initRole(kandidat);
    //     userService.initRole(hr);
    //     userService.initRole(klien);
    // }
}
