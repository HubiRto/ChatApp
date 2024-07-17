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
import axios from "axios";
import {useNavigate} from "react-router-dom";
import toast from "react-hot-toast";
import {useState} from "react";

const addFriendFormSchema = z.object({
    email: z
        .string()
        .min(1, {message: "This field can't be empty"})
        .email("Please enter a valid email")
});

export const AddFriendDialog = () => {
    const {authState} = useAuth();
    const navigate = useNavigate();
    const [open, setOpen] = useState(false);

    const form = useForm<z.infer<typeof addFriendFormSchema>>({
        resolver: zodResolver(addFriendFormSchema),
        defaultValues: {
            email: ""
        }
    });

    const handleSubmit = async (values: z.infer<typeof addFriendFormSchema>) => {
        await axios.post<string>("http://localhost:8080/api/v1/user/friends/add", {
                receiverEmail: values.email
            },
            {
                headers: {
                    Authorization: `Bearer ${authState?.token}`,
                },
            })
            .then(res => {
                form.reset();
                toast.success(res.data as string);
                setOpen(false);
            }).catch((error: any) => {
                if (!error.response || !error.response.data) {
                    console.log(error);
                    navigate("/");
                }

                const code = error.response?.status as number;

                if (!(code === 404 || code === 400)) {
                    console.log(error);
                    navigate("/");
                }

                form.setError("email", {message: error.response.data.error});
            })
    }

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <TooltipProvider>
                <Tooltip>
                    <TooltipTrigger asChild>
                        <Button size="icon" variant="outline">
                            <DialogTrigger asChild>
                                <UserPlus onClick={() => setOpen(true)}/>
                            </DialogTrigger>
                        </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                        <p>Add Friend</p>
                    </TooltipContent>
                </Tooltip>
            </TooltipProvider>
            {authState?.token && (
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
            )}
        </Dialog>
    );
}