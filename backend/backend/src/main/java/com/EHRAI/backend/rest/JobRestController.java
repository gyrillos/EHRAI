package com.EHRAI.backend.rest;

import java.util.List;
import java.util.Map;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.EHRAI.backend.entity.Job;
import com.EHRAI.backend.service.JobService;

import tools.jackson.databind.json.JsonMapper;

@CrossOrigin(origins = "http://localhost:5173")
@RestController
@RequestMapping("/api")
public class JobRestController {
	
	private JobService jobService;
	
	private JsonMapper jsonMapper;
	
	public JobRestController(JobService jobService, JsonMapper jsonMapper) {
		this.jobService = jobService;
		this.jsonMapper = jsonMapper;
	}
	
	@GetMapping("/jobs")
	public List<Job> findAll() {
		return jobService.findAll();
	}
	
	@GetMapping("/jobs/{JobId}")
	public Job findById(@PathVariable("JobId") int JobId) {
		Job j = jobService.findById(JobId);
		
		if (j == null) {
			throw new RuntimeException("Job not found");
		}
		
		return j;
	}
	
	@DeleteMapping("/jobs/{jobsId}")
	public String deleteJob(@PathVariable("jobsId") int jobId) {
		Job j = jobService.findById(jobId);
		
		if (j == null) {
			throw new RuntimeException("Cannont find Job");
		}
		
		jobService.deleteById(jobId);
		
		return "Deleted Job id" + jobId;
		
	}
	
	@GetMapping("/jobs/processed")
	public List<Job> findProcessed() {
		return jobService.findProcessed();
	}
	
	@GetMapping("/jobs/unprocessed")
	public List<Job> findUnprocessed() {
		return jobService.findUnprocessed();
	}
	
	@GetMapping("/jobs/confirmed")
	public List<Job> findConfirmed() {
		return jobService.findConfirmed();
	}
	
	@GetMapping("/jobs/unconfirmed")
	public List<Job> findUnconfirmed() {
		return jobService.findUnconfirmed();
	}
	
	@GetMapping("/jobs/readytobeattached")
	public List<Job> findReadytobeAttached() {
		return jobService.findReadytobeAttached();
	}
	
	@PostMapping("/jobs")
	public Job addJob(@RequestBody Job job) {
		return jobService.save(job);
	}
	
	@PatchMapping("/jobs/{id}")
	public Job patchJob(@PathVariable("id") int id, @RequestBody Map<String, Object> patchPayload) {
		Job j = jobService.findById(id);
		
		if (j == null) {
			throw new RuntimeException("Job not found");
		}
		
		if (patchPayload.containsKey("id")) {
			throw new RuntimeException("Id cannot be changed");
		}
		
		Job p = jsonMapper.updateValue(j, patchPayload);
		
		return jobService.save(p);
	}
	
	@PostMapping("/converttopng/{id}")
	public String convertTifftoPng(@PathVariable("id") int id) {
		
		jobService.convertTifftoPng(id);
		
		return "convertion done." + id;
	}
	
	
	
	
	

}
