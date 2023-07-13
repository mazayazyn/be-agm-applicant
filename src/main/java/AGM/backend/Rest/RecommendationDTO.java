package AGM.backend.Rest;

import AGM.backend.Model.CandidateModel;
import AGM.backend.Model.UserModel;
import AGM.backend.Model.VacancyModel;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Getter;
import lombok.Setter;

@Getter @Setter
@JsonIgnoreProperties(ignoreUnknown = true)
public class RecommendationDTO {
    @JsonProperty("user")
    private UserModel user;

    @JsonProperty("vacancy")
    private VacancyModel vacancy;

    @JsonProperty("candidate")
    private CandidateModel candidate;
}
