package pl.pomoku.chatapp.exception.user;

import org.springframework.http.HttpStatus;
import pl.pomoku.chatapp.exception.AppException;

public class UserNotFoundException extends AppException {
    public UserNotFoundException(Long id) {
        super("User with id: %d does not exist".formatted(id), HttpStatus.NOT_FOUND);
    }

    public UserNotFoundException(String email) {
        super("User with email: %s does not exist".formatted(email), HttpStatus.NOT_FOUND);
    }
}
