package study.controller;
import java.io.File;
import java.io.FileNotFoundException;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;
import java.util.Map;
import java.util.UUID;

import javax.servlet.http.HttpServletRequest;

import org.apache.commons.io.IOUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.io.ClassPathResource;
import org.springframework.core.io.Resource;
import org.springframework.data.domain.Page;
import org.springframework.stereotype.Controller;
import org.springframework.util.ResourceUtils;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.multipart.MultipartFile;

import study.dean.Study;
import study.dean.Topic;
import study.dean.User;
import study.service.TopicService;
import study.service.UserService;
import study.util.GetRequest;
import study.util.PageResult;

@Controller
@RequestMapping("/topic")
public class TopicController {
	
	@Autowired
	private TopicService topicService;
	
	/**
	 * 查看题目
	 * @param req
	 * @param model
	 * @param topic
	 * @return
	 */
	@RequestMapping("/query")
	public String queryTopic(HttpServletRequest req,Integer num, Map<String, Object> model,Topic topic) {
		User user = (User)req.getSession().getAttribute("user");
		if(user==null) { 
			return "redirect:/login";
		}
		if(topic!=null &&topic.getType()==null) {
			topicService.getType(num, topic);
		}else {
			num = topicService.getNum(num, topic);
		}
	
		PageResult pageResult = this.getpages(req, topic);

		model.put("num", num);
		model.put("topic", topic);
		model.put("pageResult", pageResult);
		return "/topic/query";
	}
	
	/**
	 * 分页
	 * @param req
	 * @param topic
	 * @return
	 */
	
	private PageResult getpages(HttpServletRequest req, Topic topic) {
		Integer pageNum = GetRequest.getRequest().getParameter("pageNum") == null ? 1
				: Integer.parseInt(GetRequest.getRequest().getParameter("pageNum"));
		Integer pageSize = GetRequest.getRequest().getParameter("pageSize") == null ? 10
				: Integer.parseInt(GetRequest.getRequest().getParameter("pageSize"));
		Page<Topic> pages = topicService.queryPage(pageNum - 1, pageSize, topic);

		return new PageResult(pages, pageSize, pageNum);
	}


	/**
	 *添加题目
	 * @param req
	 * @param model
	 * @param topic
	 * @return
	 */
	@RequestMapping("/add")
	public String addTopic(HttpServletRequest req,Integer num,Map<String, Object> model,Topic topic) {
		
		User user = (User)req.getSession().getAttribute("user");
		if(user==null) {
			return "redirect:/login";
		}
		
		//当id存在时就是修改题目，不存在是是添加题目
		if(topic.getId()!=null) {
			model.put("id",topic.getId() );
			topic = topicService.findOne(topic.getId());
			topicService.getNum(num, topic);
		}
		if(num==null) {
			num=2;
		}
		model.put("num", num);
		model.put("topic", topic);
		
		return "/topic/topicAdd";
	}
	/**
	 * 保存听力
	 * @param req
	 * @param model
	 * @param topic
	 * @return
	 * @throws IOException 
	 */
	@RequestMapping("/save1")
	public String save(@RequestParam("name")MultipartFile file,Map<String, Object> model ,Topic topic) throws IOException {
		String filename ="";
		if(file!=null) {
			File path=new File(ResourceUtils.getURL("classpath:").getPath());
			if(!path.exists()){
				path=new File("");
			}
			//如果上传目录为/static/mp3,则可以如下获取
			File dir=new File(path.getAbsolutePath(),"static/mp3");
			if (!dir.exists()) {
				dir.mkdir();
			}
	
			InputStream is = file.getInputStream();
			filename = file.getOriginalFilename();
			filename =  new SimpleDateFormat("yyyyMMddhhmmss").format(new Date()) + filename;
			if(!filename.equals("")) {
				topic.setTopicName(filename);
			}
			FileOutputStream fos = new FileOutputStream(new File(dir + "\\" + filename));
	
			// IOUtils 工具类,将输入流直接保存到输出流
			IOUtils.copy(is, fos);
			fos.close();
			is.close();
		}
		
		topicService.save(topic);
		return "redirect:/topic/query?num="+1;
	}
	
	
    /**
     * 保存作文和阅读的
     * @param model
     * @param topic
     * @return
     */
	@RequestMapping("/save2")
	public String save2(Map<String, Object> model ,Topic topic,Integer num) {
		topicService.save(topic);
		return "redirect:/topic/query?num="+num;
	}
	
	
	@RequestMapping("/back")
	public String back() {
		return "redirect:/topic/query";
	}
	/**
	 * 删除
	 * @param id
	 * @return
	 */
	@RequestMapping("/del")
	public String del(Long id,Integer num,Topic topic) {
		topicService.delete(id);
		return "redirect:/topic/query?num="+num;
			
	}
	
}