import {useNavigation} from "@/hooks/useNavigation.tsx";
import {Card} from "@/components/ui/card.tsx";
import {Link} from "react-router-dom";
import {Tooltip, TooltipContent, TooltipProvider, TooltipTrigger} from "@/components/ui/tooltip.tsx";
import {Button} from "@/components/ui/button.tsx";
import {UserAccount} from "@/components/UserAccount.tsx";
import {ModeToggle} from "@/components/ModeToggle.tsx";

export const DesktopNavbar = () => {
    const paths = useNavigation();

    return (
        <Card className="hidden lg:flex lg:flex-col lg:justify-between lg:items-center lg:h-full lg:w-16 lg:px-2 lg:py-4">
            <nav>
                <ul className="flex flex-col items-center gap-4">
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
                </ul>
            </nav>
            <div className="flex flex-col items-center gap-4">
                <ModeToggle/>
                <UserAccount/>
            </div>
        </Card>
    );
}