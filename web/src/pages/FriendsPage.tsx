import {ItemList} from "@/components/ItemList.tsx";
import {ConversationFallback} from "@/components/ConversationFallback.tsx";
import {AddFriendDialog} from "@/components/ui/AddFriendDialog.tsx";

export default function FriendsPage() {
    return (
        <>
            <ItemList title="Friends" action={<AddFriendDialog/>}>Friends Page</ItemList>
            <ConversationFallback/>
        </>
    );
};