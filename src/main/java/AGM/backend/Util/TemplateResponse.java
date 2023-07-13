package AGM.backend.Util;

import org.springframework.stereotype.Component;

import java.util.HashMap;
import java.util.Map;

@Component
public class TemplateResponse {

    public Map templateSuccess(Object objek){
        Map map = new HashMap();
        map.put("data", objek);
        map.put("message", "Success!");
        map.put("status", "200");
        return map;
    }

    public Map templateError(Object objek){
        Map map = new HashMap();
        map.put("message", objek);
        map.put("status", "500");
        return map;
    }

    public Map notFound(Object objek){
        Map map = new HashMap();
        map.put("message", objek);
        map.put("status", "404");
        return map;
    }

    public Map alreadyExists(Object objek){
        Map map = new HashMap();
        map.put("message", objek);
        map.put("status", "409");
        return map;
    }


    public boolean checkNull(Object obj){
        if(obj == null){
            return true;
        }
        return  false;
    }
}
