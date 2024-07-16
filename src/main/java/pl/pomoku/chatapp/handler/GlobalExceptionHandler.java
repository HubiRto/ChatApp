package pl.pomoku.chatapp.handler;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.DisabledException;
import org.springframework.security.core.AuthenticationException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;
import org.springframework.web.method.annotation.MethodArgumentTypeMismatchException;
import pl.pomoku.chatapp.dto.response.ErrorResponse;
import pl.pomoku.chatapp.exception.AppException;

import java.time.LocalDateTime;

@RestControllerAdvice
public class GlobalExceptionHandler {

    @ExceptionHandler(AppException.class)
    public ResponseEntity<ErrorResponse> appExceptionHandler(AppException exception) {
        return ResponseEntity.status(exception.getStatus()).body(exception.mapToErrorResponse());
    }

    @ExceptionHandler(DisabledException.class)
    public ResponseEntity<ErrorResponse> disabledExceptionHandler() {
        return ResponseEntity.
                status(HttpStatus.UNAUTHORIZED)
                .body(new ErrorResponse("Account is disabled", LocalDateTime.now()));
    }

    @ExceptionHandler(AuthenticationException.class)
    public ResponseEntity<ErrorResponse> appExceptionHandler() {
        return ResponseEntity
                .status(HttpStatus.UNAUTHORIZED)
                .body(new ErrorResponse("Invalid email or password", LocalDateTime.now()));
    }

    @ExceptionHandler(MethodArgumentTypeMismatchException.class)
    public ResponseEntity<String> handleTypeMismatch(MethodArgumentTypeMismatchException ex) {
        String error = "Invalid parameter type: " + ex.getValue() + " should be of type " + ex.getRequiredType().getSimpleName();
        return new ResponseEntity<>(error, HttpStatus.BAD_REQUEST);
    }
}
