import {ConversationFallback} from "@/components/ConversationFallback.tsx";
import {ItemList} from "@/components/ItemList.tsx";

export default function ConversationsPage() {
    return (
        <>
            <ItemList title="Conversations">Conversations Page</ItemList>
            <ConversationFallback/>
        </>
    );
};