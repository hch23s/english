package study.controller;

import java.util.Date;
import java.util.List;
import java.util.Map;

import javax.jws.soap.SOAPBinding.Style;
import javax.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

import study.dean.Study;
import study.dean.Topic;
import study.dean.User;
import study.service.StudyService;
import study.service.TopicService;

@Controller
@RequestMapping("/study")
public class StudyController {

	@Autowired
	private StudyService studyService;
	@Autowired
	private TopicService topicService;
	/**
	 * 练习题目
	 * @return
	 */
	@RequestMapping("/topic")
	public String topic(HttpServletRequest req,Integer num, Map<String, Object> model,Topic topic) {
		User user = (User)req.getSession().getAttribute("user");
		if(user==null) { 
			return "redirect:/login";
		}
		topicService.getType(num, topic);

		Topic randomTopic = topicService.randomTopic(topic.getType());
		model.put("num", num);
		model.put("topic",randomTopic);
		return "/study/topic";
	}
	
	@RequestMapping("/save")
	public String save(HttpServletRequest req,Integer num, Map<String, Object> model,Topic topic) {
		User user = (User)req.getSession().getAttribute("user");
		String success = topic.getSuccess();
		String[] split = success.split(",");
		
		//先查询今天有没有做题
		Study study = studyService.getNewDate(user.getId(),num);
		if(study !=null) {
			study.setTopicNum(study.getTopicNum()+1);//做题数量加一
			if(num!=3 && split[0].equals(split[1])) {//做对时
				study.setSuccessNum(study.getSuccessNum()+1);
				study.setAccuracy(study.getSuccessNum()*100/(study.getTopicNum()));
			}else if (num!=3 && !split[0].equals(split[1])){//做错时
				study.setAccuracy(study.getSuccessNum()*100/(study.getTopicNum()));
			}
		}else {
			study = new Study();
			study.setUserId(user.getId());
			study.setStudyTime(new Date());
			study.setTopicType(num);
			study.setTopicNum(1);
			if(num!=3 && split[0].equals(split[1])) {//做错时
				study.setSuccessNum(study.getSuccessNum()+1);
				study.setAccuracy(study.getSuccessNum()*100/(study.getTopicNum()));
			}else if (num!=3 && !split[0].equals(split[1])){//做错时
				study.setAccuracy(study.getSuccessNum()*100/(study.getTopicNum()));
			}
		}
		studyService.save(study);
		model.put("num", num);
		return "redirect:/study/topic?num="+num;
	}
	
	
     /**
      * 近7天的做题情况
      * @param req
      * @param num
      * @param model
      * @return
      */
	 @RequestMapping("/accuracy")
	    public String getallStuPie(HttpServletRequest req,Integer num,Map<String, Object> model){
		 	User user = (User)req.getSession().getAttribute("user");
			if(user==null) { 
				return "redirect:/login";
			}
			List<Study> list = studyService.getNewDate7(user.getId(),num);
			model.put("list", list);
			model.put("num", num);
	    	return "/study/accuracy";
	    }

	}
