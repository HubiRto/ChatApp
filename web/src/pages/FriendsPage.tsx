import {ItemList} from "@/components/ItemList.tsx";
import {ConversationFallback} from "@/components/ConversationFallback.tsx";
import {AddFriendDialog} from "@/components/AddFriendDialog.tsx";
import {useFriendRequests} from "@/providers/FriendRequestProvider.tsx";
import {Spinner} from "@/components/Spinner.tsx";
import {Request} from "@/components/Request.tsx";

export default function FriendsPage() {
    const {requests} = useFriendRequests();

    return (
        <>
            <ItemList title="Friends" action={<AddFriendDialog/>}>
                {requests ? (
                    requests.length === 0 ? (
                        <p className="w-full h-full flex items-center justify-center">No friends requests found</p>
                    ) : (
                        requests.map((request) => {
                            return (
                                <Request key={request.id} data={request}/>
                            );
                        })
                    )
                ) : (
                    <Spinner className="h-8 w-8"/>
                )}
            </ItemList>
            <ConversationFallback/>
        </>
    );
};