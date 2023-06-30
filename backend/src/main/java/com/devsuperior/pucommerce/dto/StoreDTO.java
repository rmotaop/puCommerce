package com.devsuperior.pucommerce.dto;

import com.devsuperior.pucommerce.entities.Category;
import com.devsuperior.pucommerce.entities.Store;

import javax.validation.constraints.*;

import java.io.Serializable;
import java.util.ArrayList;
import java.util.List;

public class StoreDTO implements Serializable {
    private static final long serialVersionUID = 1L;

    private Long id;

    @Size(min = 3,max = 80, message = "Campo deve ter entre 3 e 80 caracteres")
    @NotNull(message = "nome do fornecedor nao pode ser nulo")
    @NotBlank(message = "Campo deve ser preenchido")
    private String name;

    @NotBlank(message = "Campo deve ser preenchido")
    private String description;

    @NotNull(message = "preço do fornecedor nao pode ser nulo")
    @Positive(message = "Valor deve ser positivo")
    private Double priceMercade;

    @NotNull(message = "imagem do fornecedor nao pode ser nula")
    @NotBlank(message = "Campo deve ser preenchido")
    private String imgUrl;

    @NotEmpty(message = "Deve ter pelo menos uma categoria")
    private List<CategoryDTO> categories = new ArrayList<>();

    public StoreDTO(){
    }

    public StoreDTO(Long id, String name, String description, Double priceMercade, String imgUrl) {
        this.id = id;
        this.name = name;
        this.description = description;
        this.priceMercade = priceMercade;
        this.imgUrl = imgUrl;
    }

    public StoreDTO(Store entity) {
        this.id = entity.getId();
        this.name = entity.getName();
        this.description = entity.getDescription();
        this.priceMercade = entity.getPriceMercade();
        this.imgUrl = entity.getImgUrl();
        for (Category cat : entity.getCategories()) {
            categories.add(new CategoryDTO(cat));
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

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public Double getPriceMercade() {
        return priceMercade;
    }

    public void setPriceMercade(Double priceMercade) {
        this.priceMercade = priceMercade;
    }

    public String getImgUrl() {
        return imgUrl;
    }

    public void setImgUrl(String imgUrl) {
        this.imgUrl = imgUrl;
    }

    public List<CategoryDTO> getCategories() {
        return categories;
    }
}
