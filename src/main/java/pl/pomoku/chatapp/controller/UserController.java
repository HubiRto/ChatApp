package pl.pomoku.chatapp.controller;

import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import lombok.RequiredArgsConstructor;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import pl.pomoku.chatapp.dto.response.UserResponse;
import pl.pomoku.chatapp.mapper.UserMapper;
import pl.pomoku.chatapp.service.UserService;

@RestController
@RequestMapping("/api/v1/users")
@RequiredArgsConstructor
@Validated
public class UserController {
    private final UserService userService;
    private final UserMapper userMapper;

    @GetMapping
    public UserResponse getUserByToken(
            @NotNull(message = "Token cannot be null")
            @NotEmpty(message = "Token cannot be empty")
            @RequestHeader("Authorization") String token
    ) {
        return userMapper.userToUserResponse(userService.getUserFromToken(token));
    }
}
