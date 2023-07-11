import './styles.css';
import EditIcon from '../../../assets/img/edit.svg';
import DeleteIcon from '../../../assets/img/delete.svg';
import {useEffect, useState} from "react";
import * as userService from '../../../services/user-service';
import { User } from '../../../types/user';
import SearchBar from "../../../components/SearchBar";
import ButtonNextPage from "../../../components/ButtonNextPage";
import DialogInfo from "../../../components/DialogInfo";
import DialogConfirmation from "../../../components/DialogConfirmation";
import {Simulate} from "react-dom/test-utils";
import error = Simulate.error;
import ButtonInverse from "../../../components/ButtonInverse";
import {useNavigate} from "react-router-dom";


export default function UserListing() {

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

    const [users, setUsers] = useState<User[]>([]);

    type QueryParams = {
        page: number;
        name: string;
    }

    const [queryParams, setQueryParams] = useState<QueryParams>({
        page: 0,
        name: ''
    })

    useEffect(()=>{
        userService.findPageRequest(queryParams.page,queryParams.name)
            .then(response => {
                const nextPage = response.data.content;
                setUsers(users.concat(nextPage))
                setIsLastPage(response.data.last)
            })
    },[queryParams]);

    function handleNewProductClick() {
        navigate("/admin/users/create")
    }

    function handleSearch(searchText: string) {
        setUsers([]);
        setQueryParams({...queryParams,page: 0, name: searchText});
    }

    function handleNextPageClick() {
        setQueryParams({...queryParams, page: queryParams.page + 1})
    }

    function handleDialogInfoClose() {
        setDialogInfoData({...dialogInfoData, visible: false});
    }

    function handleDeleteClick(userId: number) {
        setDialogConfirmationData({...dialogConfirmationData, id: userId, visible: true});
        console.log(userId);
    }

    function handleUpdateClick(userId: number) {
        navigate(`/admin/users/${userId}`);
    }

    function handDialogConfirmationAnswer(answer: boolean, userId: number) {
        if(answer === true) {
            userService.deleteById(userId)
                .then(() => {
                    setUsers([]);
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
            <section id="product-listing-section" className="dsc-container">
                <h2 className="dsc-section-title dsc-mb20">Página de usuários</h2>

                <div className="dsc-btn-page-container dsc-mb20">
                    <div onClick={handleNewProductClick}>
                        <ButtonInverse textButton="Novo Usuário"/>
                    </div>
                </div>
                <SearchBar onSearch={handleSearch}/>

             
                <table className="dsc-table dsc-mb20 dsc-mt20">
                
                    <thead>
                    <tr>
                        <th className="dsc-tb576">ID</th>
                        <th className="dsc-tb576">Avatar</th>
                        <th className="dsc-txt-left">Nome</th>
                        <th className="dsc-txt-left">Sobrenome</th>
                        <th className="dsc-txt-left">Telefone</th>
                        <th className="dsc-tb768">e-mail</th>
                        <th className="dsc-tb768">Aniversário</th>
                        <th> Editar</th>
                        <th> Excluir</th>
                    </tr>
                    </thead>
                    <tbody>
                    {
                        
                        users.map(user => (
                            <tr key={user.id}>
                                <td className="dsc-txt-left">{user.id}</td>
                                <td><img className="dsc-product-listing-image" src={user.imgUrl} alt={user.name}/></td>
                                <td className="dsc-txt-left">{user.name}</td>
                                <td className="dsc-txt-left">{user.lastName}</td>
                                <td className="dsc-txt-left">{user.phone}</td>
                                <td className="dsc-txt-left"> {user.email}</td>
                                <td className="dsc-txt-left"> {user.birthDate}</td>
                                <td><img onClick={() => handleUpdateClick(user.id)} className="dsc-product-listing-btn" src={EditIcon} alt="Editar"/></td>
                                <td><img onClick={() => handleDeleteClick(user.id)} className="dsc-product-listing-btn" src={DeleteIcon} alt="Deletar"/></td>
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