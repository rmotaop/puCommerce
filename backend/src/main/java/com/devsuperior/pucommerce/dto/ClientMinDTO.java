package com.devsuperior.pucommerce.dto;

import com.devsuperior.pucommerce.entities.Client;
import java.io.Serializable;
import java.time.Instant;

public class ClientMinDTO implements Serializable {
    private static final long serialVersionUID = 1L;

    private Long id;
    private String name;
    private String cpf;   
    private Double income;
    private Instant birthDate;
    private Double children;
    private String email;

    public ClientMinDTO(){
    }

    public ClientMinDTO(Long id, String name, String cpf, Double income, Instant birthDate, Double children, String email) {
        this.id = id;
        this.name = name;
        this.cpf = cpf;
        this.income = income;
        this.birthDate = birthDate;
        this.children = children;
        this.email = email;
        
        
    }

    public ClientMinDTO(Client entity) {
        this.id = entity.getId();
        this.name = entity.getName();
        this.cpf = entity.getCpf();
        this.income = entity.getIncome();
        this.birthDate = entity.getBirthDate();
        this.children = entity.getChildren();
        this.email = entity.getEmail();
    }

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getCpf() {
		return cpf;
	}

	public void setCpf(String cpf) {
		this.cpf = cpf;
	}

	public Double getIncome() {
		return income;
	}

	public void setIncome(Double income) {
		this.income = income;
	}

	public Instant getBirthDate() {
		return birthDate;
	}

	public void setBirthDate(Instant birthDate) {
		this.birthDate = birthDate;
	}

	public Double getChildren() {
		return children;
	}

	public void setChildren(Double children) {
		this.children = children;
	}

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

    
}
