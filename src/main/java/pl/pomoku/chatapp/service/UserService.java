package pl.pomoku.chatapp.service;

import lombok.RequiredArgsConstructor;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import pl.pomoku.chatapp.entity.User;
import pl.pomoku.chatapp.exception.user.UserNotFoundException;
import pl.pomoku.chatapp.repository.UserRepository;

@Service
@RequiredArgsConstructor
public class UserService implements UserDetailsService {
    private final UserRepository userRepository;
    private final JwtService jwtService;

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        return userRepository.findByEmail(username).orElseThrow(() -> new UsernameNotFoundException(username));
    }

    public User getUserFromToken(String token) {
        String email = jwtService.extractUsername(token);
        return userRepository.findByEmail(email).orElseThrow(() -> new UserNotFoundException(email));
    }
}
