package pl.pomoku.chatapp.exception.token;

import org.springframework.http.HttpStatus;
import pl.pomoku.chatapp.exception.AppException;

public class InvalidTokenException extends AppException {
    public InvalidTokenException() {
        super("Invalid token", HttpStatus.BAD_REQUEST);
    }
}
