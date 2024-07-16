package pl.pomoku.chatapp.exception;

import lombok.Getter;
import org.springframework.http.HttpStatus;
import pl.pomoku.chatapp.dto.response.ErrorResponse;

import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.Map;

@Getter
public class AppException extends RuntimeException {
    private final HttpStatus status;
    private final Map<String, Object> details;

    public AppException(String message, HttpStatus status) {
        super(message);
        this.status = status;
        this.details = new HashMap<>();
    }

    public AppException(String message, HttpStatus status, Map<String, Object> details) {
        super(message);
        this.status = status;
        this.details = details;
    }

    public ErrorResponse mapToErrorResponse() {
        return new ErrorResponse(getMessage(), LocalDateTime.now(), this.details);
    }
}
