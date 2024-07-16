package pl.pomoku.chatapp.exception.auth;

import org.springframework.http.HttpStatus;
import pl.pomoku.chatapp.exception.AppException;

public class AccountAlreadyConfirmException extends AppException {
    public AccountAlreadyConfirmException() {
        super("Account already confirmed", HttpStatus.BAD_REQUEST);
    }
}
