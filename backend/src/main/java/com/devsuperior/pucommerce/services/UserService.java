package com.devsuperior.pucommerce.services;


import com.devsuperior.pucommerce.dto.RoleDTO;
import com.devsuperior.pucommerce.dto.UserDTO;

import com.devsuperior.pucommerce.entities.Role;
import com.devsuperior.pucommerce.entities.User;
import com.devsuperior.pucommerce.repositories.UserRepository;
import com.devsuperior.pucommerce.services.exceptions.DatabaseException;
import com.devsuperior.pucommerce.services.exceptions.ResourceNotFoundException;

import javax.persistence.EntityNotFoundException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

@Service
public class UserService implements UserDetailsService {

    @Autowired
    private UserRepository repository;

    @Transactional(readOnly = true)
    public UserDTO getMe() {
        User entity = authenticated();
        return new UserDTO(entity);
    }

    @Transactional(readOnly = true)
    public Page<UserDTO> findAll(String name, Pageable pageable) {
        Page<User> page = repository.searchByName(name, pageable);
        return page.map(x -> new UserDTO(x));
    }

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {

        User user = repository.findByEmail(username);
        if (user == null) {
            throw new UsernameNotFoundException("Email not found");
        }
        return user;
    }

    protected User authenticated() {
        try {
            String username = SecurityContextHolder.getContext().getAuthentication().getName();
            return repository.findByEmail(username);
        }
        catch (Exception e) {
            throw new UsernameNotFoundException("Invalid user");
        }
    }

    @Transactional(readOnly = true)
	public UserDTO findById(Long id) {
	Optional<User> obj = repository.findById(id);
	User entity = obj.orElseThrow(() -> new ResourceNotFoundException("Entity Not Found"));
	return new UserDTO(entity);
	}

    @Transactional
    public UserDTO insert(UserDTO dto) {
        User entity = new User();
        copyDtoToEntity(entity, dto);
        entity = repository.save(entity);
        return new UserDTO(entity);
    }

    @Transactional
    public UserDTO update(Long id, UserDTO dto) {
        try {
            User entity = repository.getReferenceById(id);
            copyDtoToEntity(entity, dto);
            entity = repository.save(entity);
            return new UserDTO(entity);
        }
        catch (EntityNotFoundException e) {
            throw new ResourceNotFoundException("Id not Found " + id);
        }
    }

    @Transactional(propagation = Propagation.SUPPORTS)
    public void delete(Long id) {
        try {
            repository.deleteById(id);
        }
        catch (EmptyResultDataAccessException e) {
            throw new ResourceNotFoundException("Id not Found " + id);
        }
        catch (DataIntegrityViolationException e) {
            throw new DatabaseException("Falha de Integridade Referencial");
        }
    }

    public void copyDtoToEntity(User entity, UserDTO dto) {
        entity.setName(dto.getName());
        entity.setLastName(dto.getLastName());
        entity.setEmail(dto.getEmail());
        entity.setPhone(dto.getPhone());
        entity.setBirthDate(dto.getBirthDate());
        entity.setImgUrl(dto.getImgUrl());
        entity.getRolies().clear();
        for (RoleDTO rolDto : dto.getRolies()) {
            Role rol = new Role();
            rol.setId(rolDto.getId());
            entity.getRolies().add(rol);
        }
    }

    public Page<UserDTO> findAllPaged(String roleId, String authority, Pageable pageable) {
        return null;
    }

    public UserDTO findMe() {
        return null;
    }

}