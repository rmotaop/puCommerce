package com.devsuperior.pucommerce.repositories;

import com.devsuperior.pucommerce.entities.OrderItem;
import com.devsuperior.pucommerce.entities.OrderItemPK;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface OrderItemRepository extends JpaRepository<OrderItem, OrderItemPK> {
}
