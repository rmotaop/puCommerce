package com.devsuperior.pucommerce.repositories;

import com.devsuperior.pucommerce.entities.Role;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface RoleRepository extends JpaRepository<Role, Long> {

    @Query("SELECT obj FROM Role obj "
            + "WHERE UPPER(obj.authority) LIKE UPPER(CONCAT('%', :authority, '%'))")
    Page<Role> searchByAuthority(String authority, Pageable pageable);
}
