package com.devsuperior.pucommerce.dto;

import com.devsuperior.pucommerce.services.validation.StoreInsertValid;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Size;

@StoreInsertValid()
public class StoreInsertDTO extends StoreDTO {

	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;



}
