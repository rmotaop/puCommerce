package com.devsuperior.pucommerce.repositories;

import com.devsuperior.pucommerce.entities.Store;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;


public interface StoreRepository extends JpaRepository<Store, Long> {

    @Query("SELECT obj FROM Store obj "
            + "WHERE UPPER(obj.name) LIKE UPPER(CONCAT('%', :name, '%'))")
    Page<Store> searchByName(String name, Pageable pageable);

	Store findByName(String name);

}
