package pl.pomoku.chatapp.mapper;

import org.mapstruct.Mapper;
import pl.pomoku.chatapp.dto.response.UserResponse;
import pl.pomoku.chatapp.entity.User;

@Mapper(componentModel = "spring")
@SuppressWarnings("unused")
public interface UserMapper {
    UserResponse userToUserResponse(User user);
}
