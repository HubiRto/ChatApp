import {useNavigation} from "@/hooks/useNavigation.tsx";
import {Card} from "@/components/ui/card.tsx";
import {Link} from "react-router-dom";
import {Tooltip, TooltipContent, TooltipProvider, TooltipTrigger} from "@/components/ui/tooltip.tsx";
import {Button} from "@/components/ui/button.tsx";
import {UserAccount} from "@/components/UserAccount.tsx";
import {useConversation} from "@/hooks/useConversation.tsx";
import {ModeToggle} from "@/components/ModeToggle.tsx";

export const MobileNavbar = () => {
    const paths = useNavigation();
    const {isActive} = useConversation();

    if(isActive) return null;

    return (
        <Card
            className="fixed bottom-4 w-[calc(100vw-32px)] flex items-center h-16 p-2 lg:hidden">
            <nav className="w-full">
                <ul className="flex justify-evenly items-center">
                    {paths.map((path, id) => {
                        return (
                            <li key={id} className="relative">
                                <Link to={path.to}>
                                    <TooltipProvider>
                                        <Tooltip>
                                            <TooltipTrigger asChild>
                                                <Button size="icon" variant={path.active ? "default" : "outline"}>
                                                    {path.icon}
                                                </Button>
                                            </TooltipTrigger>
                                            <TooltipContent>
                                                <p>{path.name}</p>
                                            </TooltipContent>
                                        </Tooltip>
                                    </TooltipProvider>
                                </Link>
                            </li>
                        );
                    })}
                    <li>
                        <ModeToggle/>
                    </li>
                    <li>
                        <UserAccount/>
                    </li>
                </ul>
            </nav>
        </Card>
    );
};