package com.devsuperior.pucommerce.dto;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

import javax.validation.constraints.*;

import com.devsuperior.pucommerce.entities.User;
import com.devsuperior.pucommerce.entities.Store;

public class ClientDTO {

    private Long id;

    @Size(min = 3,max = 80, message = "Campo deve ter entre 3 e 80 caracteres")
    @NotNull(message = "nome do cliente nao pode ser nulo")
    @NotBlank(message = "Campo deve ser preenchido")
    private String name;

    @NotNull(message = "nome do cliente nao pode ser nulo")
    private String cpf;

    private Double income;
    private LocalDate birthDate;
    private Double children;
    private String email;

    private List<StoreDTO> stores = new ArrayList<>();

    public ClientDTO(){
    }

    public ClientDTO(Long id, String name, String cpf, Double income, LocalDate birthDate, Double children, String email) {
        this.id = id;
        this.name = name;
        this.cpf = cpf;
        this.income = income;
        this.birthDate = birthDate;
        this.children = children;
        this.email = email;
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

        public List<StoreDTO> getStores() {
            return stores;
        }



}
