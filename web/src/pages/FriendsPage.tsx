import {ItemList} from "@/components/ItemList.tsx";
import {ConversationFallback} from "@/components/ConversationFallback.tsx";
import {AddFriendDialog} from "@/components/AddFriendDialog.tsx";
import {Spinner} from "@/components/Spinner.tsx";
import {Request} from "@/components/Request.tsx";
import {useEffect, useState} from "react";
import {FriendRequestResponse} from "@/models/FriendRequestResponse.ts";
import {useAuth} from "@/providers/AuthContext.tsx";
import axios from "axios";
import toast from "react-hot-toast";

export default function FriendsPage() {
    const [requests, setRequests] = useState<FriendRequestResponse[] | undefined>(undefined);
    const [loading, setLoading] = useState<boolean>(true);
    const {authState} = useAuth();

    const fetchRequests = async () => {
        if(authState?.token) {
            setLoading(true);
            try {
                const response = await axios.get<FriendRequestResponse[]>(
                    "http://localhost:8080/api/v1/user/friends/request",
                    {
                        headers: {
                            Authorization: `Bearer ${authState?.token}`,
                        },
                    }
                );
                setRequests(response.data);
            } finally {
                setLoading(false);
            }
        }
    };

    useEffect(() => {
        fetchRequests();
    }, [authState?.token]);

    const acceptRequest = async (id: number) => {
        axios.post<string>(`http://localhost:8080/api/v1/user/friends/accept/${id}`, null, {
            headers: {
                Authorization: `Bearer ${authState?.token}`,
            },
        })
            .then((res) => {
                toast.success(res.data);
                setRequests(requests?.filter(req => req.id !== id));
            })
            .catch((error: any) => {
                console.log(error);
                fetchRequests();
            });
    }

    const declineRequest = async (id: number) => {
        axios.post<string>(`http://localhost:8080/api/v1/user/friends/decline/${id}`, null, {
            headers: {
                Authorization: `Bearer ${authState?.token}`,
            },
        })
            .then((res) => {
                toast.success(res.data);
                setRequests(requests?.filter(req => req.id !== id));
            })
            .catch((error: any) => {
                console.log(error);
                fetchRequests();
            });
    }


    return (
        <>
            <ItemList title="Friends" action={<AddFriendDialog/>}>
                {!loading && requests ? (
                    requests.length === 0 ? (
                        <p className="w-full h-full flex items-center justify-center">No friends requests found</p>
                    ) : (
                        requests.map((request) => {
                            return (
                                <Request
                                    key={request.id}
                                    data={request}
                                    accept={() => acceptRequest(request.id)}
                                    decline={() => declineRequest(request.id)}
                                />
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