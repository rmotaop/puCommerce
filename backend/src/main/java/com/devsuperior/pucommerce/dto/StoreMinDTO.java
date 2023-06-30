package com.devsuperior.pucommerce.dto;

import com.devsuperior.pucommerce.entities.Store;
import java.io.Serializable;

public class StoreMinDTO implements Serializable {
    private static final long serialVersionUID = 1L;

    private Long id;
    private String name;
    private Double priceMercade;
    private String imgUrl;

    public StoreMinDTO(){
    }

    public StoreMinDTO(Long id, String name, Double priceMercade, String imgUrl) {
        this.id = id;
        this.name = name;
        this.priceMercade = priceMercade;
        this.imgUrl = imgUrl;
    }

    public StoreMinDTO(Store entity) {
        this.id = entity.getId();
        this.name = entity.getName();
        this.priceMercade = entity.getPriceMercade();
        this.imgUrl = entity.getImgUrl();
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
}
