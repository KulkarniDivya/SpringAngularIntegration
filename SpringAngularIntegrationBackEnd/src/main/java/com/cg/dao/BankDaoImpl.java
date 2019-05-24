package com.cg.dao;

import java.util.List;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.persistence.Query;

import org.hibernate.Session;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.stereotype.Repository;

import com.cg.model.CustomerDetails;

@Repository
@Component("bankDao")
public class BankDaoImpl implements BankDao {

	@PersistenceContext
	EntityManager entityManager;
	public CustomerDetails register(CustomerDetails cd) {
		// TODO Auto-generated method stub
		//ApplicationContext context = new ;
		entityManager.persist(cd);
		Query query = entityManager.createQuery("select accountNo from CustomerDetails where pancardNo = :pan");
		query.setParameter("pan", cd.getPancardNo());
		List results = query.getResultList();
		cd.setAccountNo(Integer.parseInt(results.get(0).toString()));
		return cd;
	}
	public int login(CustomerDetails c) {
		// TODO Auto-generated method stub
		int accountNo = 0;
		//ApplicationContext context=new ClassPathXmlApplicationContext("hibernate.cfg.xml");		
		//entityManager.persist(c);
		CustomerDetails cd = entityManager.find(CustomerDetails.class, c.getAccountNo());
		if(cd.getPassword().equals(c.getPassword())) {
			accountNo = c.getAccountNo(); 
		}
		return accountNo;
	}

	

}
