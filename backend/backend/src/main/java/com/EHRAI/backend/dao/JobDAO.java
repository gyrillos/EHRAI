package com.EHRAI.backend.dao;

import java.util.List;

import com.EHRAI.backend.entity.Job;

public interface JobDAO {
	List<Job> findAll();
	Job findById(int id);
	Job save(Job job);
	void deleteById(int id);
	List<Job> findProcessed();
	List<Job> findUnprocessed();
	List<Job> findConfirmed();
	List<Job> findUnconfirmed();
	List<Job> findReadytobeAttached();
	void convertTifftoPng(int id);
}
