package AGM.backend.Service;

import AGM.backend.Model.RoleModel;
import AGM.backend.Model.UserModel;
import AGM.backend.Repository.RoleDB;
import AGM.backend.Repository.UserDB;
import AGM.backend.Rest.UserDTO;
import AGM.backend.Security.WebSecurityConfig;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.config.annotation.web.builders.WebSecurity;
import org.springframework.security.core.Authentication;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.*;

@Service
@RequiredArgsConstructor
@Transactional
@Slf4j
public class UserServiceImpl implements UserService, UserDetailsService {

    @Autowired
    private UserDB userDB;

    @Autowired
    private RoleDB roleDB;

    @Autowired
    private PasswordEncoder passwordEncoder;

    //Sign Up User save here
    @Override
    public UserModel addUser(UserModel user) {
        user.setPassword(passwordEncoder.encode(user.getPassword()));
        user.setRole(roleDB.findRoleModelById(1L));
        return userDB.save(user);
    }

    @Override
    public UserModel addUserDTO(UserDTO userDTO){
        UserModel newUser = new UserModel();
        newUser.setUsername(userDTO.getUsername());
        newUser.setEmail(userDTO.getEmail());
        newUser.setPassword(passwordEncoder.encode(userDTO.getPassword()));
        System.out.println(roleDB.findRoleModelById(1L));
        newUser.setRole(roleDB.findRoleModelById(1L));
        return userDB.save(newUser);
    }

    @Override
    public UserModel getUser(String email) {
        return userDB.findUserModelByEmail(email);
    }

    @Override
    public List<UserModel> getAllUser() {
        return userDB.findAll();
    }

    @Override
    public UserModel getUserById(Integer id) {
        System.out.println("ini idnya masuk dh " + id);
//        return userDB.findById(id);
        Optional<UserModel> user = userDB.findById(id);
        if (user.isPresent()){
            System.out.println("masuk if");
            return user.get();
        }

        return null;
    }

    //Get User Role
    @Override
    public String getUserRole(Authentication auth){
        String role = "";
        if (auth.getAuthorities().toString().equals("[USER]")) {
            role = "User";
        } else if(auth.getAuthorities().toString().equals("[KLIEN]")){
            role = "Klien";
        } else if(auth.getAuthorities().toString().equals("[HR]")){
            role = "HR Consultant";
        }
        return role;
    }

    //Override UserDetails
    @Override
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
        UserModel user = userDB.findUserModelByEmail(email);
        if (user == null) {
            log.error("User not found");
            throw new UsernameNotFoundException("Username not found");
        } else {
            log.info("User found");
        }

        Collection<SimpleGrantedAuthority> authorities = new ArrayList<>();
        authorities.add(new SimpleGrantedAuthority(user.getRole().getRole()));
        return new User(user.getEmail(), user.getPassword(), authorities);
    }

    @Override
    public void initRole(RoleModel role) {
        roleDB.save(role);
    }
}