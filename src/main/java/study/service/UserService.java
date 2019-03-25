package study.service;

import java.util.List;

import javax.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;

import study.dean.Topic;
import study.dean.User;
import study.repository.UserRepository;

@Service //把这个类注入到application类中
public class UserService {
	@Autowired//相当于  UserRepository userRepository=new UserRepository();可以用userRepository直接调用方法
	private UserRepository userRepository;

	public User save(User user) {
		return userRepository.save(user);
	}

	public User findByUserNameAndPassword(String userName, String password) {
		return userRepository.findByUserNameAndPassword(userName,password);
	}

	public User findByUserName(String userName) {
		return userRepository.findByUserName(userName);
	}

	public List<User> findAll() {
		return userRepository.findAll();
	}

	public Page<User> queryPage(int pageNum, Integer pageSize) {

		Page<User> pages = userRepository.findAll(new PageRequest(pageNum, pageSize));
		return pages;
	}

	public void delete(Long id) {
		userRepository.delete(id);
	}
	
	
}
