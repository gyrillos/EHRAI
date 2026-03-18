package com.EHRAI.backend.entity;

import java.time.LocalDate;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name="job")
public class Job {
	
	@Id
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	private int id;
	
	@Column(name="first_name")
	private String firstName;
	
	@Column(name="last_name")
	private String lastName;
	
	@Column(name="dob")
	private LocalDate dob;
	
	@Column(name="date_of_service")
	private LocalDate dateOfService;
	
	@Column(name="doc_type")
	private String docType;
	
	@Column(name="doc_name")
	private String docName;
	
	@Column(name="file_location")
	private String fileLocation;
	
	@Column(name="is_processed")
	private Boolean isProcessed;
	
	@Column(name="is_confirmed")
	private Boolean isConfirmed;

	public Boolean getIsConfirmed() {
		return isConfirmed;
	}

	public void setIsConfirmed(Boolean isConfirmed) {
		this.isConfirmed = isConfirmed;
	}

	public Boolean getIsProcessed() {
		return isProcessed;
	}

	public void setIsProcessed(Boolean isProcessed) {
		this.isProcessed = isProcessed;
	}

	public Job(int id, String firstName, String lastName, LocalDate dob, LocalDate dateOfService, String docType,
			String docName, String fileLocation, Boolean isProcessed) {
		this.id = id;
		this.firstName = firstName;
		this.lastName = lastName;
		this.dob = dob;
		this.dateOfService = dateOfService;
		this.docType = docType;
		this.docName = docName;
		this.fileLocation = fileLocation;
		this.isProcessed = isProcessed;
	}
	
	public Job(String fileLocation, Boolean isProcessed, Boolean isConfirmed) {
		this.fileLocation = fileLocation;
		this.isProcessed = isProcessed;
		this.isConfirmed = isConfirmed;
	}
	
	public Job () {}

	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}

	public String getFirstName() {
		return firstName;
	}

	public void setFirstName(String firstName) {
		this.firstName = firstName;
	}

	public String getLastName() {
		return lastName;
	}

	public void setLastName(String lastName) {
		this.lastName = lastName;
	}

	public LocalDate getDob() {
		return dob;
	}

	public void setDob(LocalDate dob) {
		this.dob = dob;
	}

	public LocalDate getDateOfService() {
		return dateOfService;
	}

	public void setDateOfService(LocalDate dateOfService) {
		this.dateOfService = dateOfService;
	}

	public String getDocType() {
		return docType;
	}

	public void setDocType(String docType) {
		this.docType = docType;
	}

	public String getDocName() {
		return docName;
	}

	public void setDocName(String docName) {
		this.docName = docName;
	}

	public String getFileLocation() {
		return fileLocation;
	}

	public void setFileLocation(String fileLocation) {
		this.fileLocation = fileLocation;
	}

	@Override
	public String toString() {
		return "Job [id=" + id + ", firstName=" + firstName + ", lastName=" + lastName + ", dob=" + dob
				+ ", dateOfService=" + dateOfService + ", docType=" + docType + ", docName=" + docName
				+ ", fileLocation=" + fileLocation + "]";
	}
	
	
	
}
