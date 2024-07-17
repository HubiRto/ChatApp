package pl.pomoku.chatapp.controller;

import jakarta.validation.Valid;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;
import pl.pomoku.chatapp.dto.request.AddFriendRequest;
import pl.pomoku.chatapp.service.FriendRequestService;

@RestController
@RequestMapping("/api/v1/user/friends")
@RequiredArgsConstructor
@Validated
public class FriendController {
    private final FriendRequestService friendRequestService;

    @PostMapping("/add")
    public ResponseEntity<String> addFriend(
            @NotNull(message = "Token cannot be null")
            @NotEmpty(message = "Token cannot be empty")
            @RequestHeader("Authorization") String token,
            @Valid @RequestBody AddFriendRequest request
    ) {
        return ResponseEntity.ok(friendRequestService.sendRequest(request, token));
    }
}
