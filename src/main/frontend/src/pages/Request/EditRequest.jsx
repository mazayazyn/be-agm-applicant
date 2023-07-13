import { VacancyForm } from "@/components/form/VacancyForm/Index";
import { useParams } from "react-router-dom";
import PrivateRoute from "@/components/privateroute";

export function EditRequest() {
  let { id } = useParams();

  return (
    <PrivateRoute>
      <VacancyForm onEdit={true} id={id}/>
    </PrivateRoute>
    
  );
}
