package com.devsuperior.pucommerce.services.validation;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.servlet.HandlerMapping;

import com.devsuperior.pucommerce.dto.StoreUpdateDTO;
import com.devsuperior.pucommerce.entities.Store;
import com.devsuperior.pucommerce.repositories.StoreRepository;
import com.devsuperior.pucommerce.controllers.handlers.FieldMessage;

import javax.servlet.http.HttpServletRequest;
import javax.validation.ConstraintValidator;
import javax.validation.ConstraintValidatorContext;

public class StoreUpdateValidator implements ConstraintValidator<StoreUpdateValid, StoreUpdateDTO> {
	
	@Autowired
	private HttpServletRequest request;
	
	@Autowired
	private StoreRepository repository;
	
	@Override
	public void initialize(StoreUpdateValid ann) {
	}

	@Override
	public boolean isValid(StoreUpdateDTO dto, ConstraintValidatorContext context) {
		
		@SuppressWarnings("unchecked")
		var uriVars = (Map<String, String>) request.getAttribute(HandlerMapping.URI_TEMPLATE_VARIABLES_ATTRIBUTE);
		long storeId = Long.parseLong(uriVars.get("id"));
		
		List<FieldMessage> list = new ArrayList<>();
		
		Store store = repository.findByName(dto.getName());
		if (store != null && storeId != store.getId()) {
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
