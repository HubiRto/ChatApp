import {useParams} from "react-router-dom";
import {useMemo} from "react";

export const useConversation = () => {
    const params = useParams();

    const conversationId = useMemo(() => params?.conversationId || ("" as string), [params?.conversationId]);
    const isActive = useMemo(() => !!conversationId, [conversationId]);

    return {
        isActive, conversationId
    };
};