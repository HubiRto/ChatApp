import React from 'react';
import {useAuth} from "@/providers/AuthContext.tsx";
import {useNavigate} from "react-router-dom";

type Props = React.PropsWithChildren<{}>;

export const IsLoginWrapper = ({children}: Props) => {
    const {authState, isLoading} = useAuth();
    const navigate = useNavigate();

    if (!isLoading && authState?.token) {
        navigate("/");
    }

    return <>{children}</>
};
