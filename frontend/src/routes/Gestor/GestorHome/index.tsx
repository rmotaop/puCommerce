import './styles.css';
import {useEffect, useState} from "react";
import {User} from "../../../types/user";
import * as userService from '../../../services/user-service'
import {Simulate} from "react-dom/test-utils";
import error = Simulate.error;

export default function GestorHome() {

    const [user, setUser] = useState<User>();

    useEffect(() => {
        userService.findMe()
            .then(response => {
                console.log(response.data);
                setUser(response.data)
            })
    },[]);

    return (
        <main>
            <section id="admin-home-section" className="dsc-container">
                <h2 className="dsc-section-title dsc-mb20">Bem-vindo à sua loja {user?.name}</h2>
            </section>
        </main>
    )
}