package pl.pomoku.chatapp.service;

import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import pl.pomoku.chatapp.dto.request.AddFriendRequest;
import pl.pomoku.chatapp.entity.FriendRequest;
import pl.pomoku.chatapp.entity.User;
import pl.pomoku.chatapp.exception.AppException;
import pl.pomoku.chatapp.exception.user.UserNotFoundException;
import pl.pomoku.chatapp.repository.FriendRequestRepository;
import pl.pomoku.chatapp.repository.UserRepository;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class FriendRequestService {
    private final UserRepository userRepository;
    private final JwtService jwtService;
    private final FriendRequestRepository friendRequestRepository;

    public List<FriendRequest> getFriendRequestsByToken(String token) {
        String senderEmail = jwtService.extractUsername(token);
        User user = userRepository.findByEmail(senderEmail)
                .orElseThrow(() -> new UserNotFoundException(senderEmail));
        return friendRequestRepository.findByReceiver(user);
    }

    public String sendRequest(AddFriendRequest addFriendRequest, String token) {
        String senderEmail = jwtService.extractUsername(token);

        if (senderEmail.equals(addFriendRequest.getReceiverEmail())) {
            throw new AppException("Can't send request to yourself", HttpStatus.BAD_REQUEST);
        }

        User sender = userRepository.findByEmail(senderEmail)
                .orElseThrow(() -> new UserNotFoundException(senderEmail));

        User receiver = userRepository.findByEmail(addFriendRequest.getReceiverEmail())
                .orElseThrow(() -> new UserNotFoundException(addFriendRequest.getReceiverEmail()));

        Optional<FriendRequest> optionalFriendRequest = friendRequestRepository.findBySenderAndReceiver(sender, receiver);
        if(optionalFriendRequest.isPresent()) {
            FriendRequest friendRequest = optionalFriendRequest.get();
            if (friendRequest.isAccepted()) {
                throw new AppException("This user is already your friend", HttpStatus.BAD_REQUEST);
            } else {
                throw new AppException("Request.tsx already send", HttpStatus.BAD_REQUEST);
            }
        }

        optionalFriendRequest = friendRequestRepository.findBySenderAndReceiver(receiver, sender);
        if(optionalFriendRequest.isPresent()) {
            FriendRequest friendRequest = optionalFriendRequest.get();
            if (friendRequest.isAccepted()) {
                throw new AppException("This user is already your friend", HttpStatus.BAD_REQUEST);
            } else {
                throw new AppException("This user has already sent you a request", HttpStatus.BAD_REQUEST);
            }
        }

        FriendRequest friendRequest = FriendRequest.builder()
                .accepted(false)
                .receiver(receiver)
                .sender(sender)
                .build();
        friendRequestRepository.save(friendRequest);
        return "Successfully send request";
    }
}
