package com.devsuperior.pucommerce.services;

import com.devsuperior.pucommerce.dto.RoleDTO;
import com.devsuperior.pucommerce.entities.Role;
import com.devsuperior.pucommerce.repositories.RoleRepository;
import com.devsuperior.pucommerce.services.exceptions.DatabaseException;
import com.devsuperior.pucommerce.services.exceptions.ResourceNotFoundException;
import javax.persistence.EntityNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class RoleService {

    @Autowired
    private RoleRepository roleRepository;

    @Transactional(readOnly = true)
    public List<RoleDTO> findAll(String authority) {
    	List<Role> list = roleRepository.searchByAuthority(authority);
    	return list.stream().map(x -> new RoleDTO(x)).collect(Collectors.toList());
    }

    @Transactional(readOnly = true)
    public RoleDTO findById(Long id) {
        Optional<Role> opt = roleRepository.findById(id);
        Role Role = opt.orElseThrow(() -> new ResourceNotFoundException("Resource not Found"));
        return new RoleDTO(Role);
    }

    @Transactional
    public RoleDTO insert(RoleDTO dto) {
        Role entity = new Role();
        copyDtoToEntity(entity, dto);
        entity = roleRepository.save(entity);
        return new RoleDTO(entity);
    }

    @Transactional
    public RoleDTO update(Long id, RoleDTO dto) {
        try {
            Role entity = roleRepository.getReferenceById(id);
            copyDtoToEntity(entity, dto);
            entity = roleRepository.save(entity);
            return new RoleDTO(entity);
        }
        catch (EntityNotFoundException e) {
            throw new ResourceNotFoundException("Id not Found " + id);
        }
    }

    @Transactional(propagation = Propagation.SUPPORTS)
    public void delete(Long id) {
        try {
            roleRepository.deleteById(id);
        }
        catch (EmptyResultDataAccessException e) {
            throw new ResourceNotFoundException("Id not Found " + id);
        }
        catch (DataIntegrityViolationException e) {
            throw new DatabaseException("Falha de Integridade Referencial");
        }
    }

    public void copyDtoToEntity(Role entity, RoleDTO dto) {
        entity.setAuthority(dto.getAuthority());

    }
}
