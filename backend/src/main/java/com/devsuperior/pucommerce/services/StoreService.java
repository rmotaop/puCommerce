package com.devsuperior.pucommerce.services;

import com.devsuperior.pucommerce.dto.CategoryDTO;
import com.devsuperior.pucommerce.dto.ProductDTO;
import com.devsuperior.pucommerce.dto.StoreDTO;
import com.devsuperior.pucommerce.dto.StoreMinDTO;
import com.devsuperior.pucommerce.entities.Category;
import com.devsuperior.pucommerce.entities.Store;
import com.devsuperior.pucommerce.repositories.StoreRepository;
import com.devsuperior.pucommerce.services.exceptions.DatabaseException;
import com.devsuperior.pucommerce.services.exceptions.ResourceNotFoundException;
import javax.persistence.EntityNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

@Service
public class StoreService {

    @Autowired
    private StoreRepository storeRepository;

    @Transactional(readOnly = true)
    public Page<StoreMinDTO> findAll(String name, Pageable pageable) {
        Page<Store> page = storeRepository.searchByName(name, pageable);
        return page.map(x -> new StoreMinDTO(x));
    }

    @Transactional(readOnly = true)
    public StoreDTO findById(Long id) {
        Optional<Store> opt = storeRepository.findById(id);
        Store store = opt.orElseThrow(() -> new ResourceNotFoundException("Resource not Found"));
        return new StoreDTO(store);
    }

    @Transactional
    public StoreDTO insert(StoreDTO dto) {
        Store entity = new Store();
        copyDtoToEntity(entity, dto);
        entity = storeRepository.save(entity);
        return new StoreDTO(entity);
    }

    @Transactional
    public StoreDTO update(Long id, StoreDTO dto) {
        try {
            Store entity = storeRepository.getReferenceById(id);
            copyDtoToEntity(entity, dto);
            entity = storeRepository.save(entity);
            return new StoreDTO(entity);
        }
        catch (EntityNotFoundException e) {
            throw new ResourceNotFoundException("Id not Found " + id);
        }
    }

    @Transactional(propagation = Propagation.SUPPORTS)
    public void delete(Long id) {
        try {
            storeRepository.deleteById(id);
        }
        catch (EmptyResultDataAccessException e) {
            throw new ResourceNotFoundException("Id not Found " + id);
        }
        catch (DataIntegrityViolationException e) {
            throw new DatabaseException("Falha de Integridade Referencial");
        }
    }

    public void copyDtoToEntity(Store entity, StoreDTO dto) {
        entity.setName(dto.getName());
        entity.setDescription(dto.getDescription());
        entity.setPriceMercade(dto.getPriceMercade());
        entity.setImgUrl(dto.getImgUrl());
        entity.getCategories().clear();
        for (CategoryDTO catDto : dto.getCategories()) {
            Category cat = new Category();
            cat.setId(catDto.getId());
            entity.getCategories().add(cat);
        }
    }

        public Page<StoreDTO> findAllPaged(String categoryId, String name, Pageable pageable) {
        return null;
    }
}
