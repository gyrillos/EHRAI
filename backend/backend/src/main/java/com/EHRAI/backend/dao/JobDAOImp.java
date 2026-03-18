package com.EHRAI.backend.dao;

import java.io.BufferedReader;
import java.io.File;
import java.io.IOException;
import java.io.InputStreamReader;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.EHRAI.backend.entity.Job;

import jakarta.persistence.EntityManager;
import jakarta.persistence.TypedQuery;

@Repository
public class JobDAOImp implements JobDAO{
	
	private EntityManager entityManager;
	
	@Autowired
	public JobDAOImp(EntityManager entityManager) {
		this.entityManager = entityManager;
	}

	@Override
	public List<Job> findAll() {
		TypedQuery<Job> query = entityManager.createQuery("From Job", Job.class);
		return query.getResultList();
	}

	@Override
	public Job findById(int id) {
		return entityManager.find(Job.class, id);
	}

	@Override
	public Job save(Job job) {
		return entityManager.merge(job);
	}

	@Override
	public void deleteById(int id) {
		Job j = entityManager.find(Job.class, id);
		entityManager.remove(j);
		
	}

	@Override
	public List<Job> findProcessed() {
		TypedQuery<Job> query = entityManager.createQuery("SELECT j FROM Job j WHERE j.isProcessed = true", Job.class);
		return query.getResultList();
	}

	@Override
	public List<Job> findUnprocessed() {
		TypedQuery<Job> query = entityManager.createQuery("SELECT j FROM Job j WHERE j.isProcessed = false", Job.class);
		return query.getResultList();
	}

	@Override
	public List<Job> findConfirmed() {
		TypedQuery<Job> query = entityManager.createQuery("SELECT j FROM Job j WHERE j.isConfirmed = true", Job.class);
		return query.getResultList();
	}

	@Override
	public List<Job> findUnconfirmed() {
		TypedQuery<Job> query = entityManager.createQuery("SELECT j FROM Job j WHERE j.isConfirmed = false", Job.class);
		return query.getResultList();
	}
	
	@Override
	public List<Job> findReadytobeAttached() {
		TypedQuery<Job> query = entityManager.createQuery("SELECT j FROM Job j WHERE j.isConfirmed = false AND j.isProcessed = true", Job.class);
		return query.getResultList();
	}
	
	@Override
	public void convertTifftoPng(int id) {
		Job job = entityManager.find(Job.class, id);

	    if (job == null) {
	        throw new RuntimeException("Job not found");
	    }

	    String fileLocation = job.getFileLocation();

	    ProcessBuilder processBuilder = new ProcessBuilder(
	            "python",
	            "C:/Users/kyril/EHR_AI/Python/TifftoPng.py",
	            fileLocation
	    );

	    processBuilder.redirectErrorStream(true);

	    try {
	        Process process = processBuilder.start();

	        StringBuilder output = new StringBuilder();
	        try (BufferedReader reader = new BufferedReader(
	                new InputStreamReader(process.getInputStream()))) {

	            String line;
	            while ((line = reader.readLine()) != null) {
	                output.append(line).append("\n");
	            }
	        }

	        int exitCode = process.waitFor();

	        if (exitCode != 0) {
	            throw new RuntimeException(
	                    "Python script failed with exit code " + exitCode + "\n" + output
	            );
	        }

	    } catch (IOException e) {
	        throw new RuntimeException("Failed to start Python script", e);
	    } catch (InterruptedException e) {
	        Thread.currentThread().interrupt();
	        throw new RuntimeException("Python process was interrupted", e);
	    }
	}
}
