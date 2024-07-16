package pl.pomoku.chatapp.controller;

import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotNull;
import lombok.RequiredArgsConstructor;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
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

    @GetMapping("/{userId}")
    public UserResponse getUserById(
            @NotNull(message = "User ID cannot be null")
            @Min(value = 1, message = "User ID must be a non-negative number")
            @PathVariable("userId") Long userId
    ) {
        return userMapper.userToUserResponse(userService.getUserById(userId));
    }
}
