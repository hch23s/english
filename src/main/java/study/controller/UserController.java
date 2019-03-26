package study.controller;

import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

import study.dean.User;
import study.service.UserService;
import study.util.GetRequest;
import study.util.PageResult;

@Controller
public class UserController {
	@Autowired
	private UserService userService;

	/**
	 * 首页
	 * @param req
	 * @param model
	 * @param user
	 * @return
	 */
	@RequestMapping(value="/login")
	public String login() {
		return "login";
	}
	
	/**
	 * 登录方法
	 * @return
	 */
	@RequestMapping(value="/index")
	public String index( Map<String, Object> model,User user,HttpSession session) {
		//根据用户账号和密码判断用户的账号密码是否正确
		User user1 = userService.findByUserNameAndPassword(user.getUserName(),user.getPassword());
		//user1为空时说明登录信息有误，提示他
		if(user1==null) {
			model.put("message","登录信息有误");//传到前端页面
			return "/login";
		}
		session.setAttribute("user", user1);
		
		//登录成功进入页面
		return "/index";
	}
	/**
	 * 退出
	 * @param session
	 * @return
	 */
	@RequestMapping(value="/logout")
	public String logout(HttpSession session) {
		//session.removeAttribute("user");
		session.invalidate();
		
		return "redirect:/login";
	}
	
	/**
	 * 添加用户页面
	 * @param session
	 * @return
	 */
	@RequestMapping(value="/addUser")
	public String addUser(Map<String, Object> model) {
		model.put("user", new User());
		return "/userEdit";
	}
	
	/**
	 * 修改
	 * @param session
	 * @param model
	 * @return
	 */
	@RequestMapping("/detail")
	public String detail(HttpSession  session,Map<String, Object> model) {
		User user1 = (User) session.getAttribute("user");
        if(user1!=null) {
        	model.put("user", user1);
        }
		return "/userEdit";
	}
	/*
	 * 返回登录页面
	 */
	@RequestMapping(value="/back")
	public String back() {
		return  "redirect:/login";
	}
	
	/**
	 * 保存用户
	 * @param user
	 * @param model
	 * @return
	 */
	@RequestMapping(value="/saveUser")
	public String saveUser(User user, Map<String, Object> model) {
		//当id为空时是注册
		if(user.getId()==null) {
			//看看数据中有没有当前账号
			User user1 = userService.findByUserName(user.getUserName());
			//当user1不为空时说明有当前账号，返回重新注册
			if(user1!=null) {
				model.put("message","账号已存在");//传到前端页面
				model.put("user",user);//传到前端页面
				return "/addUser";
			}else {
				model.put("message","创建成功");//创建成功，
				userService.save(user);
				return "/login";
			}
		}
		model.put("message","修改成功");//创建成功
		userService.save(user);
		return "/login";
	}
	
	/**
	 * 查看所有用户
	 */
	@RequestMapping(value="/userList")
	public String userList(HttpServletRequest req,Map<String, Object> model) {
		User user = (User)req.getSession().getAttribute("user");
		if(user==null) { 
			return "redirect:/login";
		}
		PageResult pageResult = this.getpages(req);
		model.put("pageResult", pageResult);
		return  "/userList";
	}

	/**
	 * 删除用户
	 */
	@RequestMapping(value="/delete")
	public String delete(HttpServletRequest req,Long id,Map<String, Object> model) {
		User user = (User)req.getSession().getAttribute("user");
		if(user==null) { 
			return "redirect:/login";
		}
		if(user.getId()!=id) {
			userService.delete(id);
			model.put("msg","删除成功" );
		}else {
			model.put("msg","删除失败，你不能删除管理员" );
		}
		PageResult pageResult = this.getpages(req);
		model.put("pageResult", pageResult);
		
		return  "/userList";
	}
	
	/**
	 * 分页
	 * @param req
	 * @return
	 */
	private PageResult getpages(HttpServletRequest req) {
		Integer pageNum = GetRequest.getRequest().getParameter("pageNum") == null ? 1
				: Integer.parseInt(GetRequest.getRequest().getParameter("pageNum"));
		Integer pageSize = GetRequest.getRequest().getParameter("pageSize") == null ? 10
				: Integer.parseInt(GetRequest.getRequest().getParameter("pageSize"));
		Page<User> pages = userService.queryPage(pageNum - 1, pageSize);

		return new PageResult(pages, pageSize, pageNum);
	}
	
}








