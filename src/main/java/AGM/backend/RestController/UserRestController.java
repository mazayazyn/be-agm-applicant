package AGM.backend.RestController;

import AGM.backend.Model.UserModel;
import AGM.backend.Repository.UserDB;
import AGM.backend.Rest.BaseResponse;
import AGM.backend.Rest.UserDTO;
import AGM.backend.Service.UserService;
import AGM.backend.Util.TemplateResponse;
import lombok.Data;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;
import com.auth0.jwt.JWT;
import com.auth0.jwt.JWTVerifier;
import com.auth0.jwt.algorithms.Algorithm;
import com.auth0.jwt.interfaces.DecodedJWT;
import com.fasterxml.jackson.databind.ObjectMapper;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.validation.Valid;
import java.io.IOException;
import java.net.URI;
import java.util.*;
import static org.springframework.http.HttpHeaders.AUTHORIZATION;
import static org.springframework.http.HttpStatus.FORBIDDEN;
import static org.springframework.http.MediaType.APPLICATION_JSON_VALUE;
import java.util.List;

@RestController
@RequestMapping("/api/user")
@RequiredArgsConstructor
@Slf4j
public class UserRestController {

    @Autowired
    private UserDB userDB;

    @Autowired
    private TemplateResponse templateResponse;

    @Autowired
    private UserService userService;

    @GetMapping("/all")
    public ResponseEntity<List<UserModel>> getAllUsers(){
        return ResponseEntity.ok().body(userService.getAllUser());
    }

    @PostMapping("/save")
    public ResponseEntity<UserModel> saveUser(@RequestBody UserModel user){
        URI uri = URI.create(ServletUriComponentsBuilder.fromCurrentContextPath().path("/api/user/save").toUriString());
        return ResponseEntity.created(uri).body(userService.addUser(user));
    }

    @PostMapping(value = "/add")
    private BaseResponse addNewUser(@Valid @RequestBody UserDTO userDTO, BindingResult bindingResult) {
        BaseResponse response = new BaseResponse<>();
        if (bindingResult.hasFieldErrors()){
            throw new ResponseStatusException(
                    HttpStatus.BAD_REQUEST, "Missing Request Body"
            );
        } else {
            try {
                UserModel newUser = userService.addUserDTO(userDTO);
                response.setStatus(201);
                response.setMessage("Sign Up Successful!");
                response.setResult(newUser);
            } catch (Exception e){
                response.setStatus(400);
                response.setMessage(e.toString());
                response.setResult(null);
            }
            return response;
        }
    }

    @PostMapping("/check-token")
    public void checkToken(HttpServletRequest request, HttpServletResponse response) throws IOException {
        String authorizationHeader = new String();
        try{
            authorizationHeader = request.getHeader(AUTHORIZATION);
        } catch (Exception e){
            log.error(e.getMessage());
        }
        if (authorizationHeader != null && authorizationHeader.startsWith("Bearer ")){
            try {
                String bearer = authorizationHeader.substring("Bearer ".length());
                String refresh_token = bearer.substring(1,bearer.length()-1);
                Algorithm algorithm = Algorithm.HMAC256("secret".getBytes());
                JWTVerifier verifier = JWT.require(algorithm).build();
                DecodedJWT decodedJWT = verifier.verify(refresh_token);
                String username = decodedJWT.getSubject();
                UserModel userModel = userService.getUser(username);

                String access_token = JWT.create()
                        .withSubject(userModel.getEmail())
                        .withExpiresAt(new Date(System.currentTimeMillis() + 10 * 60 * 1000))
                        .withIssuer(request.getRequestURL().toString())
                        .withClaim("roles", userModel.getRole().getRole())
                        .sign(algorithm);
                Map<String, Boolean> status = new HashMap<>();
                status.put("status_token", true);
                response.setContentType(APPLICATION_JSON_VALUE);
                new ObjectMapper().writeValue(response.getOutputStream(), status);
            } catch (Exception exception) {
                response.setHeader("error", exception.getMessage());
                response.setStatus(FORBIDDEN.value());
                //response.sendError(FORBIDDEN.value());
                log.error(exception.getMessage());
                Map<String, String> error = new HashMap<>();
                error.put("error_message", exception.getMessage());
                response.setContentType(APPLICATION_JSON_VALUE);
                new ObjectMapper().writeValue(response.getOutputStream(), error);
            }
        }
    }

    @GetMapping("/token/refresh")
    public void refreshToken(HttpServletRequest request, HttpServletResponse response) throws IOException {
        String authorizationHeader = request.getHeader(AUTHORIZATION);
        log.info(authorizationHeader);
        if (authorizationHeader != null && authorizationHeader.startsWith("Bearer ")) {
            try {
                String refresh_token = authorizationHeader.substring("Bearer ".length());
                Algorithm algorithm = Algorithm.HMAC256("secret".getBytes());
                JWTVerifier verifier = JWT.require(algorithm).build();
                DecodedJWT decodedJWT = verifier.verify(refresh_token);
                String username = decodedJWT.getSubject();
                UserModel userModel = userService.getUser(username);

                String access_token = JWT.create()
                        .withSubject(userModel.getEmail())
                        .withExpiresAt(new Date(System.currentTimeMillis() + 10 * 60 * 1000))
                        .withIssuer(request.getRequestURL().toString())
                        .withClaim("roles", userModel.getRole().getRole())
                        .sign(algorithm);
                Map<String, String> tokens = new HashMap<>();
                tokens.put("access_token", access_token);
                tokens.put("refresh_token", refresh_token);
                response.setContentType(APPLICATION_JSON_VALUE);
                new ObjectMapper().writeValue(response.getOutputStream(), tokens);
            } catch (Exception exception) {
                response.setHeader("error", exception.getMessage());
                response.setStatus(FORBIDDEN.value());
                //response.sendError(FORBIDDEN.value());
                Map<String, String> error = new HashMap<>();
                error.put("error_message", exception.getMessage());
                response.setContentType(APPLICATION_JSON_VALUE);
                new ObjectMapper().writeValue(response.getOutputStream(), error);
            }
        } else {
            throw new RuntimeException("Refresh token is missing");
        }
    }

    @GetMapping("/getUserById/{idUser}")
    public ResponseEntity<Map> getUserById(@PathVariable("idUser") Long idUser) {
        if (idUser == null){
            return new ResponseEntity<Map>(templateResponse.notFound("Id user is required"), new HttpHeaders(), HttpStatus.OK);
        }
        UserModel user = userDB.findOneById(idUser);
        if (user == null){
            return new ResponseEntity<Map>(templateResponse.notFound("Id user not found"), new HttpHeaders(), HttpStatus.OK);
        }
        return new ResponseEntity<Map>(templateResponse.templateSuccess(user), new HttpHeaders(), HttpStatus.OK);

    }

    @GetMapping("/getUserByEmail/{emailUser}")
    public ResponseEntity<Map> getUserByEmail(@PathVariable("emailUser") String emailUser) {
        if (emailUser == null){
            return new ResponseEntity<Map>(templateResponse.notFound("Email user is required"), new HttpHeaders(), HttpStatus.OK);
        }
        UserModel user = userDB.findOneByEmail(emailUser);
        if (user == null){
            return new ResponseEntity<Map>(templateResponse.notFound("Email user not found"), new HttpHeaders(), HttpStatus.OK);
        }

        if (user.getCandidate() == null){
            return new ResponseEntity<Map>(templateResponse.notFound("ini coba sukses"), new HttpHeaders(), HttpStatus.OK);
        }
        return new ResponseEntity<Map>(templateResponse.templateSuccess(user), new HttpHeaders(), HttpStatus.OK);

    }

    @GetMapping("/getDetailUserByEmail/{emailUser}")
    public ResponseEntity<Map> getDetailUserByEmail(@PathVariable("emailUser") String emailUser) {
        if (emailUser == null){
            return new ResponseEntity<Map>(templateResponse.notFound("Email user is required"), new HttpHeaders(), HttpStatus.OK);
        }
        UserModel user = userDB.findOneByEmail(emailUser);
        if (user == null){
            return new ResponseEntity<Map>(templateResponse.notFound("Email user not found"), new HttpHeaders(), HttpStatus.OK);
        }
        return new ResponseEntity<Map>(templateResponse.templateSuccess(user), new HttpHeaders(), HttpStatus.OK);

    }
}

@Data
class RoleAndUser {
    private String email;
    private String roleName;
}
