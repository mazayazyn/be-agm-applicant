import { VacancyForm } from "@/components/form/VacancyForm/Index";
import PrivateRoute from "@/components/privateroute";

export function CreateRequest() {
  return (
    <PrivateRoute>
      <VacancyForm/>
    </PrivateRoute>
  );
}
