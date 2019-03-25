package study;


import java.util.List;

import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit4.SpringRunner;

import study.dean.User;
import study.repository.UserRepository;


@RunWith(SpringRunner.class)
@SpringBootTest
public class UserTest {

	@Autowired
	private UserRepository userRepository;
	
	@Test
	public void addUser() {
		User user = new User();
		//添加用户名
		user.setUserName ("123");
		//设置密码
		user.setPassword("123456");
		//设置姓名
		//把该数据保存到数据库
		userRepository.save(user);
		//成功后打印一下
		System.out.println("123");
	}
}
