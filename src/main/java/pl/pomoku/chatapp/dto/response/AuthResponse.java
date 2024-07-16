package pl.pomoku.chatapp.dto.response;

public record AuthResponse(
        String token,
        String refreshToken
) {}
