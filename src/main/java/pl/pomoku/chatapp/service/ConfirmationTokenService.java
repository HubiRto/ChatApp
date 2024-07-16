package pl.pomoku.chatapp.service;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import pl.pomoku.chatapp.entity.ConfirmationToken;
import pl.pomoku.chatapp.repository.ConfirmationTokenRepository;

import java.time.LocalDateTime;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class ConfirmationTokenService {
    private final ConfirmationTokenRepository repository;

    public void save(ConfirmationToken confirmationToken) {
        repository.save(confirmationToken);
    }

    public Optional<ConfirmationToken> findByToken(String token) {
        return repository.findByToken(token);
    }

    public void confirmAt(String token) {
        repository.updateConfirmationToken(LocalDateTime.now(), token);
    }
}
