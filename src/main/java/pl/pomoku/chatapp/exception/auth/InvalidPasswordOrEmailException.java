package pl.pomoku.chatapp.exception.auth;

import org.springframework.http.HttpStatus;
import pl.pomoku.chatapp.exception.AppException;

public class InvalidPasswordOrEmailException extends AppException {
    public InvalidPasswordOrEmailException() {
        super("Invalid email or password", HttpStatus.BAD_REQUEST);
    }
}
