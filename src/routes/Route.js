import { useContext } from "react";
import { Route, Redirect } from "react-router-dom";
import { toast } from "react-toastify";
import { AuthContext } from "../contexts/auth";

export default function RouteWrapper({
    component: Component,
    isPrivate, //private route
    ...rest 
}){

    const { signed } = useContext(AuthContext);

    if (!signed && isPrivate) {
        return <Redirect to="/admin/login" />
    }

    if (signed && !isPrivate) {
        alert("Encerre a sessão para acessar rotas públicas.");
        return <Redirect to="/admin" />
    }

    return(
        <Route 
            {...rest}
            render={ props => (

                <Component {...props} />
            ) }
        />
    );
}