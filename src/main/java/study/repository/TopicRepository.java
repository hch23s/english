package study.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import study.dean.Topic;
import study.dean.User;
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
public interface TopicRepository extends JpaRepository<Topic, Long>, JpaSpecificationExecutor<Topic> {

	@Query(value="select * from Topic t where t.type=:type order by rand() limit 1", nativeQuery = true)
	Topic randomTopic(@Param("type")String type);


}

