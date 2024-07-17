import React from "react";
import {FriendRequestResponse} from "@/models/FriendRequestResponse.ts";
import {Card} from "@/components/ui/card.tsx";
import {Avatar, AvatarFallback, AvatarImage} from "@/components/ui/avatar.tsx";
import {Check, User, X} from "lucide-react";
import {Button} from "@/components/ui/button.tsx";

type Props = React.PropsWithChildren<{ data: FriendRequestResponse }>;

export const Request = ({data}: Props) => {
    return (
        <Card className="w-full p-2 flex flex-row items-center justify-between gap-2">
            <div className="flex items-center gap-4 truncate">
                <Avatar>
                    <AvatarImage src={data.imageUrl}/>
                    <AvatarFallback>
                        <User/>
                    </AvatarFallback>
                </Avatar>
                <div className="flex flex-col truncate">
                    <p className="truncate">{data.fullName}</p>
                    <p className="text-xs text-muted-foreground truncate">{data.email}</p>
                </div>
            </div>
            <div className="flex items-center gap-2">
                <Button size="icon" onClick={() => {
                }}>
                    <Check/>
                </Button>
                <Button size="icon" variant="destructive" onClick={() => {
                }}>
                    <X className="h-4 w-4"/>
                </Button>
            </div>
        </Card>
    );
};
