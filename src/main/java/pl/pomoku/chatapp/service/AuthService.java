package pl.pomoku.chatapp.service;

import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import pl.pomoku.chatapp.dto.request.LoginRequest;
import pl.pomoku.chatapp.dto.request.RegisterRequest;
import pl.pomoku.chatapp.dto.response.AuthResponse;
import pl.pomoku.chatapp.entity.ConfirmationToken;
import pl.pomoku.chatapp.entity.Token;
import pl.pomoku.chatapp.entity.User;
import pl.pomoku.chatapp.enumerated.Role;
import pl.pomoku.chatapp.exception.auth.AccountAlreadyConfirmException;
import pl.pomoku.chatapp.exception.auth.InvalidPasswordOrEmailException;
import pl.pomoku.chatapp.exception.auth.TokenNotFoundException;
import pl.pomoku.chatapp.exception.confirmationToken.ConfirmationTokenExpiredException;
import pl.pomoku.chatapp.exception.confirmationToken.ConfirmationTokenNotFoundException;
import pl.pomoku.chatapp.exception.token.InvalidTokenException;
import pl.pomoku.chatapp.exception.user.UserAlreadyExistException;
import pl.pomoku.chatapp.exception.user.UserNotFoundException;
import pl.pomoku.chatapp.repository.TokenRepository;
import pl.pomoku.chatapp.repository.UserRepository;

import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class AuthService {
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final ConfirmationTokenService confirmationTokenService;
    private final AuthenticationManager authenticationManager;
    private final JwtService jwtService;
    private final TokenRepository tokenRepository;
    private final EmailSenderService emailSenderService;

    @Transactional
    public String register(RegisterRequest request) {
        if (userRepository.existsByEmail(request.getEmail())) {
            throw new UserAlreadyExistException(request.getEmail());
        }


        User user = User.builder()
                .email(request.getEmail())
                .password(passwordEncoder.encode(request.getPassword()))
                .role(Role.USER)
                .firstName(request.getFirstName())
                .lastName(request.getLastName())
                .isAccountNonExpired(true)
                .isAccountNonLocked(true)
                .isCredentialsNonExpired(true)
                .createdAt(LocalDateTime.now())
                .isEnabled(false)
                .imageUrl("https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_640.png")
                .build();

        user = userRepository.save(user);

        String token = UUID.randomUUID().toString();
        ConfirmationToken confirmationToken = ConfirmationToken.builder()
                .token(token)
                .user(user)
                .expiresAt(LocalDateTime.now().plusMinutes(15))
                .createdAt(LocalDateTime.now())
                .build();

        confirmationTokenService.save(confirmationToken);
        return token;
    }

    @Transactional
    public String registerAndSendMail(RegisterRequest request) {
        String confirmationToken = register(request);
        String link = "http://localhost:8080/api/v1/auth/confirm-account?token=" + confirmationToken;
        emailSenderService.send(
                request.getEmail(),
                "%s %s".formatted(request.getFirstName(), request.getLastName()),
                link
        );
        return confirmationToken;
    }

    public AuthResponse authenticate(LoginRequest request) {
        var user = userRepository.findByEmail(request.getEmail())
                .orElseThrow(() -> new UserNotFoundException(request.getEmail()));

        var auth = authenticationManager.authenticate(buildAuthToken(request));

        if (auth.isAuthenticated()) {
            String jwtToken = jwtService.generateToken(user);
            String refreshToken = jwtService.generateRefreshToken(user);
            revokeAllUserTokens(user);
            tokenRepository.save(new Token(jwtToken, user));
            return new AuthResponse(jwtToken, refreshToken);
        } else {
            //TODO: Check if user have activated account and if not throw custom exception
            throw new InvalidPasswordOrEmailException();
        }
    }

    public String confirmAccount(String token) {
        ConfirmationToken confirmationToken = confirmationTokenService.findByToken(token)
                .orElseThrow(ConfirmationTokenNotFoundException::new);

        if (confirmationToken.getConfirmedAt() != null) {
            throw new AccountAlreadyConfirmException();
        }

        if (confirmationToken.getExpiresAt().isBefore(LocalDateTime.now())) {
            throw new ConfirmationTokenExpiredException();
        }

        confirmationTokenService.confirmAt(token);
        User user = confirmationToken.getUser();
        user.setEnabled(true);
        userRepository.save(user);
        return "Account successfully confirmed";
    }

    public AuthResponse generateNewTokensByRefreshToken(String refreshToken) {
        String email = jwtService.extractUsername(refreshToken);
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new UserNotFoundException(email));

        if (!jwtService.isTokenValid(refreshToken, user)) {
            throw new InvalidTokenException();
        }

        String newToken = jwtService.generateToken(user);
        revokeAllUserTokens(user);
        tokenRepository.save(new Token(newToken, user));
        return new AuthResponse(newToken, refreshToken);
    }

    public boolean isTokenValid(String token) {
        Token jwtToken = tokenRepository.findByToken(token)
                .orElseThrow(TokenNotFoundException::new);

        String email = jwtService.extractUsername(token);
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new UserNotFoundException(email));

        return jwtService.isTokenValid(token, user)
                && !jwtToken.isExpired() && !jwtToken.isRevoked();
    }

    private void revokeAllUserTokens(User user) {
        List<Token> validUserTokens = tokenRepository.findAllValidTokenByUser(user.getId());
        if (validUserTokens.isEmpty()) return;

        validUserTokens.forEach(token -> {
            token.setExpired(true);
            token.setRevoked(true);
        });
        tokenRepository.saveAll(validUserTokens);
    }

    private UsernamePasswordAuthenticationToken buildAuthToken(LoginRequest request) {
        return new UsernamePasswordAuthenticationToken(request.getEmail(), request.getPassword());
    }
}
