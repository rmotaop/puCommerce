import HeaderGestor from "../../components/HeaderGestor";
import {Outlet} from "react-router-dom";

export default function Gestor() {
    return (
        <>
            <HeaderGestor/>
            <Outlet/>
        </>
    )
}