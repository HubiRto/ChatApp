import {createContext, useContext, useEffect, useState} from "react";
import {FriendRequestResponse} from "@/models/FriendRequestResponse.ts";
import {useAuth} from "@/providers/AuthContext.tsx";
import axios from "axios";

interface FriendRequestProps {
    isLoading: boolean;
    count: number;
    requests: FriendRequestResponse[] | null;
}

const FriendRequestContext = createContext<FriendRequestProps>({
    isLoading: true,
    count: 0,
    requests: null
});

export const useFriendRequests = () => {
    return useContext(FriendRequestContext);
};

export const FriendsRequestProvider = ({children}: any) => {
    const [requests, setRequests] = useState<FriendRequestResponse[] | undefined>(undefined);
    const [loading, setLoading] = useState<boolean>(true);
    const {authState} = useAuth();

    useEffect(() => {
        const fetchRequests = async () => {
            setLoading(true);
            const response = await axios.get<FriendRequestResponse[]>(
                "http://localhost:8080/api/v1/user/friends/request",
                {
                    headers: {
                        Authorization: `Bearer ${authState?.token}`,
                    },
                }
            );
            setRequests(response.data);
            setLoading(false);
        }
        fetchRequests();
    }, [authState?.token]);

    return <FriendRequestContext.Provider value={{
        isLoading: loading,
        count: requests ? requests.length : 0,
        requests: requests ? requests : null
    }} children={children}/>
}