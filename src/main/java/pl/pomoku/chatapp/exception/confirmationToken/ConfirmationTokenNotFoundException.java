package pl.pomoku.chatapp.exception.confirmationToken;

import org.springframework.http.HttpStatus;
import pl.pomoku.chatapp.exception.AppException;

public class ConfirmationTokenNotFoundException extends AppException {
    public ConfirmationTokenNotFoundException() {
        super("Confirmation token not found", HttpStatus.NOT_FOUND);
    }
}
