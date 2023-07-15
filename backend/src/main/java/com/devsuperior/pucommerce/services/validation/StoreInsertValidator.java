package com.devsuperior.pucommerce.services.validation;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;

import com.devsuperior.pucommerce.dto.StoreInsertDTO;
import com.devsuperior.pucommerce.entities.Store;
import com.devsuperior.pucommerce.repositories.StoreRepository;
import com.devsuperior.pucommerce.controllers.handlers.FieldMessage;

import javax.validation.ConstraintValidator;
import javax.validation.ConstraintValidatorContext;

public class StoreInsertValidator implements ConstraintValidator<StoreInsertValid, StoreInsertDTO> {
	
	@Autowired
	private StoreRepository repository;
	
	@Override
	public void initialize(StoreInsertValid ann) {
	}

	@Override
	public boolean isValid(StoreInsertDTO dto, ConstraintValidatorContext context) {
		
		List<FieldMessage> list = new ArrayList<>();
		
		Store store = repository.findByName(dto.getName());
		if (store != null) {
			list.add(new FieldMessage("name", "Nome já existe"));
		}

		for (FieldMessage e : list) {
			context.disableDefaultConstraintViolation();
			context.buildConstraintViolationWithTemplate(e.getMessage()).addPropertyNode(e.getFieldName())
					.addConstraintViolation();
		}
		return list.isEmpty();
	}
}
