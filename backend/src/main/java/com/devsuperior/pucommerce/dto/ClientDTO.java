package com.devsuperior.pucommerce.dto;

import java.io.Serializable;
import java.time.Instant;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

import javax.persistence.*;
import javax.validation.constraints.*;

import com.devsuperior.pucommerce.entities.User;
import com.devsuperior.pucommerce.entities.Client;
import com.devsuperior.pucommerce.entities.Store;

public class ClientDTO implements Serializable {
	private static final long serialVersionUID = 1L;

    @Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Size(min = 3,max = 80, message = "Campo deve ter entre 3 e 80 caracteres")
    @NotNull(message = "nome do cliente nao pode ser nulo")
    @NotBlank(message = "Campo deve ser preenchido")
    private String name;

    @NotNull(message = "cpf do cliente nao pode ser nulo")
    private String cpf;

    private Double income;
    @Column(columnDefinition = "TIMESTAMP WITHOUT TIME ZONE")
    private LocalDate birthDate;
    private Integer children;
    private String email;

    private List<StoreDTO> stores = new ArrayList<>();

    public ClientDTO(){
    }

    	public ClientDTO(Long id, String name, String cpf, Double income, LocalDate  birthDate, Integer children, String email, String password) {
		super();
		this.id = id;
		this.name = name;
		this.cpf = cpf;
		this.income = income;
		this.birthDate = birthDate;
		this.children = children;
		this.email = email;

	}
    
	public ClientDTO(Client entity) {
		this.id = entity.getId();
		this.name = entity.getName();
		this.cpf = entity.getCpf();
		this.income = entity.getIncome();
		this.birthDate = entity.getBirthDate();
		this.children = entity.getChildren();
		this.email = entity.getEmail();
	}

     public ClientDTO(User entity) {
         this.id = entity.getId();
         this.name = entity.getName();
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

        public LocalDate getBirthDate() {
            return birthDate;
        }

        public void setBirthDate(LocalDate birthDate) {
            this.birthDate = birthDate;
        }

        public Integer getChildren() {
            return children;
        }

        public void setChildren(Integer children) {
            this.children = children;
        }

        public String getEmail() {
            return email;
        }

        public void setEmail(String email) {
            this.email = email;
        }

        public List<StoreDTO> getStores() {
            return stores;
        }



}
