package com.devsuperior.pucommerce.services;

import com.devsuperior.pucommerce.dto.EmailDTO;
import com.devsuperior.pucommerce.dto.NewPasswordDTO;
import com.devsuperior.pucommerce.entities.PasswordRecover;
import com.devsuperior.pucommerce.entities.User;
import com.devsuperior.pucommerce.repositories.UserRepository;
import com.devsuperior.pucommerce.repositories.PasswordRecoverRepository;
import com.devsuperior.pucommerce.services.exceptions.ForbiddenException;
import com.devsuperior.pucommerce.services.exceptions.ResourceNotFoundException;

import java.time.Instant;
import java.util.UUID;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class AuthService {

    @Value("${spring.mail.username}")
	private String defaultSender;

	@Value("${email.password-recover.uri}")
	private String recoverUri;

	@Value("${email.password-recover.token.minutes}")
	private Long tokenMinutes;

	@Autowired
	private PasswordEncoder passwordEncoder;

	@Autowired
	private PasswordRecoverRepository passwordRecoverRepository;

	@Autowired
	private UserRepository userRepository;

	@Autowired
	private EmailService emailService;

    @Autowired
    UserService userService;

    public void ValidateSelfOrAdmin(long userId) {
        User me = userService.authenticated();
        if(!me.hasRole("ROLE_ADMIN") && !me.getId().equals(userId)) {
            throw new ForbiddenException("Access denied");
        }
    }

    @Transactional
	public void createRecoverToken(EmailDTO body) {
		User user = userRepository.findByEmail(body.getEmail());
		if (user == null) {
			throw new ResourceNotFoundException("Email not found");
		}

		String token = UUID.randomUUID().toString();

		PasswordRecover entity = new PasswordRecover();
		entity.setToken(token);
		entity.setExpiration(Instant.now().plusSeconds(tokenMinutes * 60L));
		entity.setEmail(body.getEmail());
		passwordRecoverRepository.save(entity);

		String text = "Acesse o link para definir uma nova senha (válido por " + tokenMinutes + " minutos):\n\n"
				+ recoverUri + token;

		emailService.sendEmail(body.getEmail(), "Recuperação de senha", text);
	}

    @Transactional
	public void saveNewPassword(NewPasswordDTO body) {
		List<PasswordRecover> list = passwordRecoverRepository.searchValidTokens(body.getToken(), Instant.now());

		if (list.size() == 0) {
			throw new ResourceNotFoundException("Invalid token");
		}

		User user = userRepository.findByEmail(list.get(0).getEmail());
		user.setPassword(passwordEncoder.encode(body.getPassword()));
		userRepository.save(user);
	}

    //	protected User authenticated() {
	//	try {
	//		Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
	//		Jwt jwtPrincipal = (Jwt) authentication.getPrincipal();
	//		String username = jwtPrincipal.getClaim("username");
	//		return userRepository.findByEmail(username);
	//	} catch (Exception e) {
	//		throw new UsernameNotFoundException("Invalid user");
	//	}
	//}
}
