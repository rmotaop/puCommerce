package com.devsuperior.pucommerce.entities;

import java.util.HashSet;
import java.util.Objects;
import java.util.Set;

import javax.persistence.*;

@Entity
@Table(name = "tb_store")
public class Store {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;
	private String name;

	@Column(columnDefinition = "TEXT")
    private String description;
    
    private Double priceMercade;
    private String imgUrl;
	
	@ManyToMany
    @JoinTable(name = "tb_store_category",
        joinColumns = @JoinColumn(name = "store_id"),
        inverseJoinColumns = @JoinColumn(name = "category_id"))
    private Set<Category> categories = new HashSet<>();

	@ManyToMany
    @JoinTable(name = "tb_store_product",
        joinColumns = @JoinColumn(name = "store_id"),
        inverseJoinColumns = @JoinColumn(name = "product_id"))
    private Set<Product> products = new HashSet<>();


	public Store() {
	}

	public Store(Long id, String name, String description, Double priceMercade, String imgUrl) {
    this.id = id;
    this.name = name;
    this.description = description;
    this.priceMercade = priceMercade;
    this.imgUrl = imgUrl;
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

    public Set<Category> getCategories() {
        return categories;
    }
   public Set<Product> getProducts() {
        return products;
    }

	    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        Store store = (Store) o;
        return Objects.equals(id, store.id);
    }

    @Override
    public int hashCode() {
        return Objects.hash(id);
    }
}
