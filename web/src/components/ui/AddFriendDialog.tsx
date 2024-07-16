import {z} from "zod";
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger
} from "@/components/ui/dialog.tsx";
import {Tooltip, TooltipContent, TooltipProvider, TooltipTrigger} from "@/components/ui/tooltip.tsx";
import {Button} from "@/components/ui/button.tsx";
import {UserPlus} from "lucide-react";
import {Form, FormControl, FormField, FormItem, FormLabel, FormMessage} from "@/components/ui/form.tsx";
import {Input} from "@/components/ui/input.tsx";
import {useAuth} from "@/providers/AuthContext.tsx";

type Props = {};

const addFriendFormSchema = z.object({
    email: z
        .string()
        .min(1, {message: "This field can't be empty"})
        .email("Please enter a valid email")
});

export const AddFriendDialog = (props: Props) => {
    const {user} = useAuth();

    const form = useForm<z.infer<typeof addFriendFormSchema>>({
        resolver: zodResolver(addFriendFormSchema),
        defaultValues: {
            email: ""
        }
    });

    const handleSubmit = async (values: z.infer<typeof addFriendFormSchema>) => {
        if (user?.email === values.email) {
            form.setError("email", {message: "Can't send a request to yourself"});
        }
    }

    return (
        <Dialog>
            <TooltipProvider>
                <Tooltip>
                    <TooltipTrigger asChild>
                        <Button size="icon" variant="outline">
                            <DialogTrigger asChild>
                                <UserPlus/>
                            </DialogTrigger>
                        </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                        <p>Add Friend</p>
                    </TooltipContent>
                </Tooltip>
            </TooltipProvider>

            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Add friend</DialogTitle>
                    <DialogDescription>Send a request to connect with your friends!</DialogDescription>
                </DialogHeader>

                <Form {...form}>
                    <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-8">
                        <FormField control={form.control} name="email" render={({field}) => (
                            <FormItem>
                                <FormLabel>Email</FormLabel>
                                <FormControl>
                                    <Input placeholder="Email..." {...field}/>
                                </FormControl>
                                <FormMessage/>
                            </FormItem>
                        )}/>
                        <DialogFooter>
                            <Button disabled={false} type="submit">Send</Button>
                        </DialogFooter>
                    </form>
                </Form>
            </DialogContent>
        </Dialog>
    );
}