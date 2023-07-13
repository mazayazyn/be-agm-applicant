package AGM.backend.Rest;

import java.time.LocalDateTime;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Setter
@Getter
@NoArgsConstructor
@AllArgsConstructor
public class InterviewForm {
  private Long idUser_Vacancy;
  private LocalDateTime interviewDateTime;
}
