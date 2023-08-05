import './styles.css';
import EditIcon from '../../../assets/img/edit.svg';
import DeleteIcon from '../../../assets/img/delete.svg';
import {useEffect, useState} from "react";
import * as clientService from '../../../services/client-service';
import { Client } from '../../../types/client';
import SearchBar from "../../../components/SearchBar";
import ButtonNextPage from "../../../components/ButtonNextPage";
import DialogInfo from "../../../components/DialogInfo";
import DialogConfirmation from "../../../components/DialogConfirmation";
import {Simulate} from "react-dom/test-utils";
import error = Simulate.error;
import ButtonInverse from "../../../components/ButtonInverse";
import {useNavigate} from "react-router-dom";


export default function OrderListing() {

    const navigate = useNavigate();

    const [dialogInfoData, setDialogInfoData] = useState({
        visible: false,
        message: "Operação realizada com sucesso",
    });

    const [dialogConfirmationData, setDialogConfirmationData] = useState({
        visible: false,
        id: 0,
        message: "Tem certeza?",
    });

    const [isLastPage, setIsLastPage] = useState(false);

    const [clients, setClients] = useState<Client[]>([]);

    type QueryParams = {
        page: number;
        name: string;
    }

    const [queryParams, setQueryParams] = useState<QueryParams>({
        page: 0,
        name: ''
    })

    useEffect(()=>{
        clientService.findPageRequest(queryParams.page,queryParams.name)
            .then(response => {
                const nextPage = response.data.content;
                setClients(clients.concat(nextPage))
                setIsLastPage(response.data.last)
            })
    },[queryParams]);

    function handleNewClientClick() {
        navigate("/gestor/clients/create")
    }

    function handleSearch(searchText: string) {
        setClients([]);
        setQueryParams({...queryParams,page: 0, name: searchText});
    }

    function handleNextPageClick() {
        setQueryParams({...queryParams, page: queryParams.page + 1})
    }

    function handleDialogInfoClose() {
        setDialogInfoData({...dialogInfoData, visible: false});
    }

    function handleDeleteClick(clientId: number) {
        setDialogConfirmationData({...dialogConfirmationData, id: clientId, visible: true});
        console.log(clientId);
    }

    function handleUpdateClick(clientId: number) {
        navigate(`/gestor/clients/${clientId}`);
    }

    function handDialogConfirmationAnswer(answer: boolean, clientId: number) {
        if(answer === true) {
            clientService.deleteById(clientId)
                .then(() => {
                    setClients([]);
                    setQueryParams({...queryParams,page: 0});
                })
                .catch(error => {
                    setDialogInfoData({
                        visible: true,
                        message: error.response.data.error
                    })
                })
        }
        setDialogConfirmationData({...dialogConfirmationData, visible: false});
    }


    return (
        <main>
            <section id="client-listing-section" className="dsc-container">
                <h2 className="dsc-section-title dsc-mb20">Cadastro de clientes</h2>

                <div className="dsc-btn-page-container dsc-mb20">
                    <div onClick={handleNewClientClick}>
                        <ButtonInverse textButton="Novo"/>
                    </div>
                </div>

                <SearchBar onSearch={handleSearch}/>

                <table className="dsc-table dsc-mb20 dsc-mt20">
                    <thead>
                    <tr>
                        <th className="dsc-txt-left">ID</th>
                        
                        <th className="dsc-txt-left">Nome</th>
                        <th className="dsc-txt-left">CPF</th>
                        <th className="dsc-txt-left">Renda</th>
                        <th className="dsc-txt-left">Aniversário</th>
                        <th className="dsc-txt-left">Filhos</th>
                        <th className="dsc-txt-left">e-mail</th>
                        <th>Editar</th>
                        <th>Excluir</th>
                    </tr>
                    </thead>
                    <tbody>
                    {
                        clients.map(client => (
                            <tr key={client.id}>
                                <td className="dsc-txt-left">{client.id}</td>
                                <td className="dsc-txt-left">{client.name}</td>
                                <td className="dsc-txt-left">{client.cpf}</td>
                                <td className="dsc-txt-left">R$ {client.income.toFixed(2)}</td>
                                <td className="dsc-txt-left">{client.birthDate}</td>
                                <td className="dsc-txt-left">{client.children}</td>
                                <td className="dsc-txt-left">{client.email}</td>
                                <td><img onClick={() => handleUpdateClick(client.id)} className="dsc-client-listing-btn" src={EditIcon} alt="Editar"/></td>
                                <td><img onClick={() => handleDeleteClick(client.id)} className="dsc-client-listing-btn" src={DeleteIcon} alt="Deletar"/></td>
                            </tr>
                        ))
                    }
                    </tbody>
                </table>

                {
                    !isLastPage &&
                    <div onClick={handleNextPageClick}>
                        <ButtonNextPage />
                    </div>
                }
            </section>
            {
                dialogInfoData.visible &&
                <DialogInfo message={dialogInfoData.message} onDialogClose={handleDialogInfoClose}/>
            }

            {
                dialogConfirmationData.visible &&
                <DialogConfirmation
                    id={dialogConfirmationData.id}
                    message={dialogConfirmationData.message}
                    onDialogAnswer={handDialogConfirmationAnswer}/>
            }
        </main>
    );
}