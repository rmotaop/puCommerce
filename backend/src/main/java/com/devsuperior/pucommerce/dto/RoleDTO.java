package com.devsuperior.pucommerce.dto;

import java.io.Serializable;
import java.util.List;
import java.util.Locale.Category;

import com.devsuperior.pucommerce.entities.Product;
import com.devsuperior.pucommerce.entities.Role;
import com.devsuperior.pucommerce.entities.User;



public class RoleDTO implements Serializable {
    private static final long serialVersionUID = 1L;

	private Long id;
	private String authority;
	
	public RoleDTO() {
	}

	public RoleDTO(Long id, String authority) {
		super();
		this.id = id;
		this.authority = authority;
	}

	public RoleDTO(Role entity) {
		super();
		this.id = entity.getId();
		this.authority = entity.getAuthority();
	}

	public RoleDTO(Role entity, List<User> users) {
        this(entity);
    }
	
	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getAuthority() {
		return authority;
	}

	public void setAuthority(String authority) {
		this.authority = authority;
	}
}
