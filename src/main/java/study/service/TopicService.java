package study.service;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import javax.persistence.criteria.CriteriaBuilder;
import javax.persistence.criteria.CriteriaQuery;
import javax.persistence.criteria.Predicate;
import javax.persistence.criteria.Root;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;


import study.dean.Topic;
import study.repository.TopicRepository;

@Service //把这个类注入到application类中
public class TopicService {
	@Autowired//相当于  UserRepository userRepository=new UserRepository();可以用userRepository直接调用方法
	private TopicRepository topicRepository;

	/**
	 *添加题目
	 */
	public Topic save(Topic topic) {
		return topicRepository.save(topic);
	}

	public Page<Topic> queryPage(int pageNum, Integer pageSize,Topic topic) {
		Specification<Topic> spec = this.getSearchSpec(topic);

		Page<Topic> pages = topicRepository.findAll(spec,new PageRequest(pageNum, pageSize));
		return pages;
	}

	private Specification<Topic> getSearchSpec(Topic topic) {
		Specification<Topic> specification = new Specification<Topic>() {
			@Override
			public Predicate toPredicate(Root<Topic> root, CriteriaQuery<?> query, CriteriaBuilder cb) {
				List<Predicate> preds = new ArrayList<>();

				if (null != topic.getTopicName()&& !"".equals(topic.getTopicName())) {
					preds.add(cb.like(root.<String>get("topicName"), "%" + topic.getTopicName()+ "%"));
				}
				if (null != topic.getType()&& !"".equals(topic.getType())) {
					preds.add(cb.like(root.<String>get("type"), "%" + topic.getType()+ "%"));
				}
			
				query.orderBy(cb.desc(root.get("id").as(Long.class)));
				return cb.and(preds.toArray(new Predicate[preds.size()]));
			}
		};
		return specification;
	}

	public Topic findOne(Long id) {
		return topicRepository.findOne(id);
	}

	public void  delete(Long id) {
		// TODO Auto-generated method stub
		topicRepository.delete(id);
	}

	public Topic  randomTopic(String type) {
		return topicRepository.randomTopic(type);
	}

	/**
	 * 获取题目类型
	 */
	public void getType(Integer num,Topic topic) {
		if(num==1) {
			topic.setType("听力");
		}else if(num==2) {
			topic.setType("阅读");
		}else if(num==3) {
			topic.setType("作文");
		}
	}
	public int getNum(Integer num,Topic topic) {

		if(topic.getType().equals("听力")) {
			num=1;
		}else if(topic.getType().equals("阅读")) {
			num=2;
		}else if(topic.getType().equals("作文")) {
			num=3;
		}
		return num;
		
	}
}
