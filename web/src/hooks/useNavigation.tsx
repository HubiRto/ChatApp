import {useLocation} from "react-router-dom";
import {useMemo} from "react";
import {MessageSquare, Users} from "lucide-react";

export const useNavigation = () => {
    const location = useLocation();

    return useMemo(() => [
        {
            name: "Conversations",
            to: "/conversations",
            icon: <MessageSquare/>,
            active: location.pathname.startsWith("/conversations")
        },
        {
            name: "Friends",
            to: "/friends",
            icon: <Users/>,
            active: location.pathname === "/friends"
        }
    ], [location.pathname]);
};