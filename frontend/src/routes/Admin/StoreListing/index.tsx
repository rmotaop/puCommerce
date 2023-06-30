import './styles.css';
import EditIcon from '../../../assets/img/edit.svg';
import DeleteIcon from '../../../assets/img/delete.svg';
import {useEffect, useState} from "react";
import * as storeService from '../../../services/store-service';
import { Store } from '../../../types/store';
import SearchBar from "../../../components/SearchBar";
import ButtonNextPage from "../../../components/ButtonNextPage";
import DialogInfo from "../../../components/DialogInfo";
import DialogConfirmation from "../../../components/DialogConfirmation";
import {Simulate} from "react-dom/test-utils";
import error = Simulate.error;
import ButtonInverse from "../../../components/ButtonInverse";
import {useNavigate} from "react-router-dom";


export default function StoreListing() {

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

    const [stores, setStores] = useState<Store[]>([]);

    type QueryParams = {
        page: number;
        name: string;
    }

    const [queryParams, setQueryParams] = useState<QueryParams>({
        page: 0,
        name: ''
    })

    useEffect(()=>{
        storeService.findPageRequest(queryParams.page,queryParams.name)
            .then(response => {
                const nextPage = response.data.content;
                setStores(stores.concat(nextPage))
                setIsLastPage(response.data.last)
            })
    },[queryParams]);

    function handleNewStoreClick() {
        navigate("/admin/stores/create")
    }

    function handleSearch(searchText: string) {
        setStores([]);
        setQueryParams({...queryParams,page: 0, name: searchText});
    }

    function handleNextPageClick() {
        setQueryParams({...queryParams, page: queryParams.page + 1})
    }

    function handleDialogInfoClose() {
        setDialogInfoData({...dialogInfoData, visible: false});
    }

    function handleDeleteClick(storeId: number) {
        setDialogConfirmationData({...dialogConfirmationData, id: storeId, visible: true});
        console.log(storeId);
    }

    function handleUpdateClick(storeId: number) {
        navigate(`/admin/stores/${storeId}`);
    }

    function handDialogConfirmationAnswer(answer: boolean, storeId: number) {
        if(answer === true) {
            storeService.deleteById(storeId)
                .then(() => {
                    setStores([]);
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
                <h2 className="dsc-section-title dsc-mb20">Cadastro de fornecedor</h2>

                <div className="dsc-btn-page-container dsc-mb20">
                    <div onClick={handleNewStoreClick}>
                        <ButtonInverse textButton="Novo"/>
                    </div>
                </div>

                <SearchBar onSearch={handleSearch}/>

                <table className="dsc-table dsc-mb20 dsc-mt20">
                    <thead>
                    <tr>
                        <th className="dsc-tb576">ID</th>
                        <th className="dsc-tb576">Logotipo</th>
                        <th className="dsc-txt-left">Nome Loja</th>
                        <th className="dsc-tb768">Valor Mercado</th>
                        <th>Editar</th>
                        <th>Excluir</th>
                    </tr>
                    </thead>
                    <tbody>
                    {
                        stores.map(store => (
                            <tr key={store.id}>
                                <td className="dsc-tb576">{store.id}</td>
                                <td><img className="dsc-product-listing-image" src={store.imgUrl} alt={store.name}/></td>
                                <td className="dsc-txt-left">{store.name}</td>
                                <td className="dsc-tb768">R$ {store.priceMercade.toFixed(2)}</td>
                                <td><img onClick={() => handleUpdateClick(store.id)} className="dsc-product-listing-btn" src={EditIcon} alt="Editar"/></td>
                                <td><img onClick={() => handleDeleteClick(store.id)} className="dsc-product-listing-btn" src={DeleteIcon} alt="Deletar"/></td>
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