package com.devsuperior.pucommerce.repositories;

import com.devsuperior.pucommerce.entities.User;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
// import org.springframework.data.domain.Page;
// import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {

    User findByEmail(String email);

    @Query("SELECT obj FROM User obj "
            + "WHERE UPPER(obj.name) LIKE UPPER(CONCAT('%', :name, '%'))")
    Page<User> searchByName(String name, Pageable pageable);

    // 	@Query(nativeQuery = true, value = """
	// 		SELECT tb_user.imgUrl AS imgurl, tb_user.email AS username, tb_user.password, tb_role.id AS roleId, tb_role.authority
	// 		FROM tb_user
	// 		INNER JOIN tb_user_role ON tb_user.id = tb_user_role.user_id
	// 		INNER JOIN tb_role ON tb_role.id = tb_user_role.role_id
	// 		WHERE tb_user.email = :email
	// 	""")
	// List<UserDetailsProjection> searchUserAndRolesByEmail(String email);
}
