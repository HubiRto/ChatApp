package pl.pomoku.chatapp.mapper;

import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.Mappings;
import pl.pomoku.chatapp.dto.response.FriendRequestResponse;
import pl.pomoku.chatapp.entity.FriendRequest;

@Mapper(componentModel = "spring")
@SuppressWarnings("unused")
public interface FriendRequestMapper {

    @Mappings(value = {
            @Mapping(source = "sender.imageUrl", target = "imageUrl"),
            @Mapping(source = "sender.fullName", target = "fullName"),
            @Mapping(source = "sender.email", target = "email")
    })
    FriendRequestResponse toDTO(FriendRequest entity);
}
