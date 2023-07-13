package AGM.backend.Repository;
import org.springframework.data.jpa.repository.JpaRepository;
import AGM.backend.Model.RoleModel;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface RoleDB extends JpaRepository<RoleModel, Long> {
    RoleModel findRoleModelByRole(Long role);
    RoleModel findRoleModelById(Long role);
    Optional<RoleModel> getRoleModelById(Long id);
}