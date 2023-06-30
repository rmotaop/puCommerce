package com.devsuperior.pucommerce.services;

import com.devsuperior.pucommerce.dto.OrderDTO;
import com.devsuperior.pucommerce.dto.OrderItemDTO;
import com.devsuperior.pucommerce.entities.*;
import com.devsuperior.pucommerce.repositories.OrderItemRepository;
import com.devsuperior.pucommerce.repositories.OrderRepository;
import com.devsuperior.pucommerce.repositories.ProductRepository;
import com.devsuperior.pucommerce.services.exceptions.ResourceNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.persistence.EntityNotFoundException;
import java.time.Instant;
import java.util.Optional;

@Service
public class OrderService {

    @Autowired
    private OrderRepository orderRepository;

    @Autowired
    private UserService userService;

    @Autowired
    private ProductRepository productRepository;

    @Autowired
    private OrderItemRepository orderItemRepository;

    @Autowired
    private AuthService authService;

    @Transactional(readOnly = true)
    public OrderDTO findById(Long id) {
        Optional<Order> opt = orderRepository.findById(id);
        Order order = opt.orElseThrow(() -> new ResourceNotFoundException("Resource not Found"));
        authService.ValidateSelfOrAdmin(order.getClient().getId());
        return new OrderDTO(order);
    }

    @Transactional
    public  OrderDTO insert(OrderDTO dto) {
        Order order = new Order();
        order.setMoment(Instant.now());
        order.setStatus(OrderStatus.WAITING_PAYMENT);

        User user = userService.authenticated();
        order.setClient(user);

        for (OrderItemDTO itemDTO : dto.getItems()) {
            Product product = productRepository.getReferenceById(itemDTO.getProductId());
            OrderItem item = new OrderItem(order, product, itemDTO.getQuantity(), product.getPrice());
            order.getItems().add(item);
        }
        orderRepository.save(order);
        orderItemRepository.saveAll(order.getItems());

        return new OrderDTO(order);
    }

    @Transactional
    public  OrderDTO setPayment(Long id) {
        try {
            Order order = orderRepository.getReferenceById(id);
            order.setStatus(OrderStatus.PAID);
            orderRepository.save(order);
            return new OrderDTO(order);
        }
        catch (EntityNotFoundException e) {
            throw new ResourceNotFoundException("Entity not found");
        }
    }
}
