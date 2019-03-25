package study.service;


import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import study.dean.Study;
import study.repository.StudyRepository;

@Service //把这个类注入到application类中
public class StudyService {
	@Autowired//相当于  UserRepository userRepository=new UserRepository();可以用userRepository直接调用方法
	private StudyRepository studyRepository;


	public void save(Study study) {
		 studyRepository.save(study);
		
	}

	public Study getNewDate(Long userId,Integer num) {
		return studyRepository.getNewDate(userId,num);
	}

	public List<Study> getNewDate7(Long userId,Integer num) {
		return studyRepository.getNewDate7(userId,num);
	}


	

}
