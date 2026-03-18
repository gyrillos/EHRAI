package com.EHRAI.backend.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.EHRAI.backend.dao.JobDAO;
import com.EHRAI.backend.entity.Job;

@Service
public class JobServiceImp implements JobService{
	
	private JobDAO jobDAO;
	
	@Autowired
	public JobServiceImp(JobDAO jobDAO) {
		this.jobDAO = jobDAO;
	}

	public List<Job> findAll() {
		return jobDAO.findAll();
	}

	public Job findById(int id) {
		return jobDAO.findById(id);
	}

	@Transactional
	public Job save(Job job) {
		return jobDAO.save(job);
	}

	@Transactional
	public void deleteById(int id) {
		jobDAO.deleteById(id);
		
	}

	public List<Job> findProcessed() {
		return jobDAO.findProcessed();
	}

	public List<Job> findUnprocessed() {
		return jobDAO.findUnprocessed();
	}

	public List<Job> findConfirmed() {
		return jobDAO.findConfirmed();
	}

	public List<Job> findUnconfirmed() {
		return jobDAO.findUnconfirmed();
	}
	
	public List<Job> findReadytobeAttached() {
		return jobDAO.findReadytobeAttached();
	}
	
	public void convertTifftoPng(int id) {
		jobDAO.convertTifftoPng(id);
	}

}
