package study.util;


import com.google.gson.ExclusionStrategy;
import com.google.gson.FieldAttributes;
import com.google.gson.Gson;
import com.google.gson.GsonBuilder;

/**
 * 
 */
public class JsonUtil {

	

	/**
	 * 将对象转为json(不带字段过滤) 使用方法toJson(license)
	 * 
	 * @param obj
	 * @return
	 */
	public static String toJson(Object obj) {
		GsonBuilder gsonBuilder = new GsonBuilder();
		gsonBuilder.setDateFormat("yyyy-MM-dd HH:mm:ss");
//		 Gson gson=new GsonBuilder().registerTypeAdapter(new TypeToken<Map<String, Object>>() {  
//         }.getType(), new JsonDeserializer<Map<String, Object>>() {
//	      
//
//				@Override
//				public Map<String, Object> deserialize(JsonElement json, Type typeOfT, JsonDeserializationContext context)
//						throws JsonParseException {
//					 Map<String, Object> treeMap = new HashMap<String, Object>();  
//                     JsonObject jsonObject = json.getAsJsonObject();  
//                     Set<Map.Entry<String, JsonElement>> entrySet = jsonObject.entrySet();  
//                     for (Map.Entry<String, JsonElement> entry : entrySet) {  
//                         treeMap.put(entry.getKey(), entry.getValue());  
//                     }  
//                     return treeMap;  
//				}
//	        }).create();
		Gson gson = gsonBuilder.create();
		return gson.toJson(obj);
	}

	/**
	 * json转object
	 * 
	 * @param json
	 * @param cls
	 * @return
	 */
	public static Object toObject(String json, Class<?> cls) {
		Gson gson = new Gson();
		return gson.fromJson(json, cls);
	}

	public static void main(String[] args) {
//		Map<String,Object> map = new HashMap<String,Object>();
//		map.put("adf", 1);
//		map.put("ad1f", 1);
//		map.put("ad2f", 1);
//		
//		System.out.println(JsonUtil.toJson(map));
		String reg = "((25[0-5]|2[0-4]\\d|((1\\d{2})|([1-9]?\\d)))\\.){3}(25[0-5]|2[0-4]\\d|((1\\d{2})|([1-9]?\\d)))";
		System.out.println("10.255.1.2".matches(reg));
	}

}
