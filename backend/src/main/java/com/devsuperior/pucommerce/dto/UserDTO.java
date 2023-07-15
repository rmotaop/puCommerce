package com.devsuperior.pucommerce.dto;

import com.devsuperior.pucommerce.entities.User;
import com.devsuperior.pucommerce.entities.Role;
import org.springframework.security.core.GrantedAuthority;

import java.io.Serializable;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;
import java.util.Locale.Category;

import javax.validation.constraints.*;

public class UserDTO implements Serializable {
    private static final long serialVersionUID = 1L;

    private Long id;

    @Size(min = 3,max = 80, message = "Campo deve ser o nome completo")
    @NotNull(message = "nome nao pode ser nulo")
    @NotBlank(message = "Campo deve ser preenchido")
    private String name;

    @NotBlank(message = "Campo deve ser preenchido")
    private String lastName;

    @NotBlank(message = "e-mail deve ser preenchido")
    private String email;
    private String phone;
    private LocalDate birthDate;

    @NotEmpty(message = "Deve ter pelo menos uma autorização")
    private List<RoleDTO> rolies = new ArrayList<>();

    private String imgUrl;

    public UserDTO() {
    }

    public UserDTO(Long id, String name, String lastName, String email, String phone, LocalDate birthDate, String imgUrl) {
        this.id = id;
        this.name = name;
        this.lastName = lastName;
        this.email = email;
        this.phone = phone;
        this.birthDate = birthDate;
        this.imgUrl = imgUrl;

    }

    public UserDTO(User entity) {
        this.id = entity.getId();
        this.name = entity.getName();
        this.lastName = entity.getLastName();
        this.email = entity.getEmail();
        this.phone = entity.getPhone();
        this.birthDate = entity.getBirthDate();
        this.imgUrl = entity.getImgUrl();
        for (Role rol : entity.getRolies()) {
            rolies.add(new RoleDTO(rol));
        }
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

    public String getLastName() {
        return lastName;
    }

    public void setLastName(String lastName) {
        this.lastName = lastName;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPhone() {
        return phone;
    }

    public void setPhone(String phone) {
        this.phone = phone;
    }

    public LocalDate getBirthDate() {
        return birthDate;
    }

    public void setBirthDate(LocalDate birthDate) {
        this.birthDate = birthDate;
    }

    public String getImgUrl() {
    return imgUrl;
    }

    public void setImgUrl(String imgUrl) {
        this.imgUrl = imgUrl;
    }

    public List<RoleDTO> getRolies() {
        return rolies;
    }

}
