package study.repository;

import java.util.List;


import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import study.dean.Study;
/**
 * extends继承jpa 后有几个默认的数据库连接方法
 * findAll()方法查询该数据库所有的数据
 * findOne(Long id)传一个id，获取该数据
 * save(User user)传一个对象，这个对象有id时就修改这条数据，没有id时自动添加这条数据
 * delete(Long id)传一个id,删除该数据
 * @author Administrator
 *
 */
@Repository
public interface StudyRepository extends JpaRepository<Study, Long>, JpaSpecificationExecutor<Study> {

	@Query(value=" from Study where userId=:userId and topicType=:num and to_days(studyTime) = to_days(now())")
	Study getNewDate(@Param("userId")Long userId,@Param("num")Integer num);
	@Query(value="select * from Study where  " + 
			"user_id=:userId and topic_type=:num and DATE_SUB(CURDATE(), INTERVAL 7 DAY) <= date(study_Time)",nativeQuery = true)
	List<Study> getNewDate7(@Param("userId")Long userId,@Param("num")Integer num);		



}

