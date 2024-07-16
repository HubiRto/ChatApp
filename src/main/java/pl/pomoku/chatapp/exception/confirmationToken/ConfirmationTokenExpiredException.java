package pl.pomoku.chatapp.exception.confirmationToken;

import org.springframework.http.HttpStatus;
import pl.pomoku.chatapp.exception.AppException;

public class ConfirmationTokenExpiredException extends AppException {
    public ConfirmationTokenExpiredException() {
        super("Confirmation token expired", HttpStatus.BAD_REQUEST);
    }
}
