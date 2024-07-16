import {ConversationContainer} from "@/components/ConversationContainer.tsx";
import {ItemList} from "@/components/ItemList.tsx";

export default function ConversationPage() {
    return (
        <>
            <ItemList title="Conversations">Conversation Page</ItemList>
            <ConversationContainer>Conversation Page</ConversationContainer>
        </>
    );
};