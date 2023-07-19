package com.devsuperior.pucommerce.services;

import com.devsuperior.pucommerce.dto.StoreDTO;
import com.devsuperior.pucommerce.dto.CategoryDTO;
import com.devsuperior.pucommerce.dto.ClientDTO;
import com.devsuperior.pucommerce.dto.ClientMinDTO;
import com.devsuperior.pucommerce.entities.Store;
import com.devsuperior.pucommerce.entities.Category;
import com.devsuperior.pucommerce.entities.Client;
import com.devsuperior.pucommerce.entities.User;
import com.devsuperior.pucommerce.repositories.ClientRepository;
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
public class ClientService {

    @Autowired
    private ClientRepository clientRepository;

    @Transactional(readOnly = true)
    public ClientDTO getMe() {
        Client entity = authenticated();
        return new ClientDTO(entity);
    }

    private Client authenticated() {
		// TODO Auto-generated method stub
		return null;
	}

	@Transactional(readOnly = true)
    public Page<ClientMinDTO> findAll(String name, Pageable pageable) {
        Page<Client> page = clientRepository.searchByName(name, pageable);
        return page.map(x -> new ClientMinDTO(x));
    }

    @Transactional(readOnly = true)
    public ClientDTO findById(Long id) {
        Optional<Client> opt = clientRepository.findById(id);
        Client client = opt.orElseThrow(() -> new ResourceNotFoundException("Resource not Found"));
        return new ClientDTO(client);
    }

    @Transactional
    public ClientDTO insert(ClientDTO dto) {
    	Client entity = new Client();
        copyDtoToEntity(entity, dto);
        entity = clientRepository.save(entity);
        return new ClientDTO(entity);
    }

    @Transactional
    public ClientDTO update(Long id, ClientDTO dto) {
        try {
        	Client entity = clientRepository.getReferenceById(id);
            copyDtoToEntity(entity, dto);
            entity = clientRepository.save(entity);
            return new ClientDTO(entity);
        }
        catch (EntityNotFoundException e) {
            throw new ResourceNotFoundException("Id not Found " + id);
        }
    }

    @Transactional(propagation = Propagation.SUPPORTS)
    public void delete(Long id) {
        try {
        	clientRepository.deleteById(id);
        }
        catch (EmptyResultDataAccessException e) {
            throw new ResourceNotFoundException("Id not Found " + id);
        }
        catch (DataIntegrityViolationException e) {
            throw new DatabaseException("Falha de Integridade Referencial");
        }
    }

    public void copyDtoToEntity(Client entity, ClientDTO dto) {
        entity.setName(dto.getName());
        entity.setCpf(dto.getCpf());
        entity.setIncome(dto.getIncome());
        entity.setBirthDate(dto.getBirthDate());
        entity.setChildren(dto.getChildren());
            for (StoreDTO stoDto : dto.getStores()) {
            Store sto = new Store();
            sto.setId(stoDto.getId());
            entity.getStores().add(sto);
        }

    }

    public Page<ClientDTO> findAllPaged(String storeId, String name, Pageable pageable) {
        return null;
    }

    // protected Client authenticated() {
    //     try {
    //         String name = SecurityContextHolder.getContext().getAuthentication().getName();
    //         return repository.findByEmail(name);
    //     }
    //     catch (Exception e) {
    //         throw new UsernameNotFoundException("Invalid client");
    //     }
    // }
}
