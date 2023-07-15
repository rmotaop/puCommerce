package com.devsuperior.pucommerce.repositories;

import com.devsuperior.pucommerce.entities.Role;
import com.devsuperior.pucommerce.entities.User;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;


import java.util.List;

public interface RoleRepository extends JpaRepository<Role, Long> {

    @Query("SELECT obj FROM Role obj "
            + "WHERE UPPER(obj.authority) LIKE UPPER(CONCAT('%', :authority, '%'))")
    List<Role> searchByAuthority(String authority);
}
