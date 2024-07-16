package pl.pomoku.chatapp.exception.auth;

import org.springframework.http.HttpStatus;
import pl.pomoku.chatapp.exception.AppException;

public class TokenNotFoundException extends AppException {
    public TokenNotFoundException() {
        super("Token not found", HttpStatus.NOT_FOUND);
    }
}
