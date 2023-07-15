import './styles.css';
import {Link, useNavigate, useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import FormInput from "../../../components/FormInput";
import * as forms from "../../../utils/forms";
import * as clientService from '../../../services/client-service';
import * as storeService from '../../../services/store-service';
import {dirtyAndValidate} from "../../../utils/forms";
import FormTextArea from "../../../components/FormTextArea";
import {Store} from "../../../types/store";
import FormSelect from "../../../components/FormSelect";
import {SelectStyles} from "../../../utils/select";
import DialogInfo from "../../../components/DialogInfo";

export default function ClientForm() {

    const params = useParams();

    const navigate = useNavigate();

    const isEditing = params.clientId !== 'create';

    const [stores, setStores] = useState<Store[]>([]);

    const [formData, setFormData] = useState<any>({
        name: {
            value: "",
            id: "name",
            name: "name",
            type: "text",
            placeholder: "Nome",
            validation: function (value: string) {
                return /^.{3,80}$/.test(value);

            },
            message: "Favor informar um nome de 3 a 80 caracteres"
        },
        cpf: {
            value: "",
            id: "cpf",
            name: "cpf",
            type: "text",
            placeholder: "CPF",
            validation: function (value: string) {
                return /^.{3,80}$/.test(value);

            },
            message: "Favor informar um CPF válido"
        },
        income: {
            value: "",
            id: "income",
            name: "income",
            type: "number",
            placeholder: "Renda",
            validation: function (value: any) {
                return Number(value) > 0;
            },
            message: "Favor informe um renda média"
        },
        birthDate: {
            value: "",
            id: "birthDate",
            name: "birthDate",
            type: "date",
            placeholder: "Data Aniversário",
            // validation: function (value: string) {
            //     return /^.{3,80}$/.test(value);

            // },
            message: "Favor informar um CPF válido"
        },
        children: {
            value: "",
            id: "children",
            name: "children",
            type: "number",
            placeholder: "Filhos",
            validation: function (value: any) {
                return Number(value) > 0;
            },
            message: "Favor quantos filhos tem"
        },
        email: {
            value: "",
            id: "email",
            name: "email",
            type: "email",
            placeholder: "email",
            // validation: function (value: string) {
            //     return /^.{3,80}$/.test(value);

            // },
            message: "Favor informar um e-mail válido"
        },
        stores: {
            value: [],
            id: "stores",
            name: "stores",
            placeholder: "Loja filiada",
            // validation: function (value: Store[]) {
            //     return value.length > 0;
            // },
            message: "Escolha pelo menos uma loja afiliada"
        }
    })

    useEffect(() => {
        storeService.findAllRequest()
            .then(response => {
                setStores(response.data);
            })
    }, [])

    useEffect(() => {
        const result = forms.toDirty(formData, "name");
        console.log(result);

        if(isEditing) {
            clientService.findById(Number(params.clientId))
                .then(response => {
                    const newFormData = forms.updateAll(formData, response.data)
                    setFormData(newFormData);
                })
        }
    },[]);

    const [dialogInfoData, setDialogInfoData] = useState({
        visible: false,
        message: "Operação realizada com sucesso",
    });

    function handleDialogInfoClose() {
        setDialogInfoData({...dialogInfoData, visible: false});
    }

    function handleInputChange(event: any) {
        const name = event.target.name;
        const value = event.target.value;
        const result = forms.updateAndValidate(formData, name, value);
        setDialogInfoData({...dialogInfoData, visible: false});
        setFormData(result);
    }

    function handleTurnDirty(name: string) {
        const newFormData = forms.dirtyAndValidate(formData, name);
        setFormData(newFormData);
    }

    function handleSubmit(event: any) {
        event.preventDefault();
        const formDataValidated = forms.dirtyAndValidateAll(formData);
        if(forms.hasAnyInvalid(formDataValidated)) {
            setFormData(formDataValidated);
            return;
        }
        const requestBody = forms.toValues(formData);
        console.log(requestBody);
        if(isEditing) {
            requestBody.id = params.clientId;
        }
        const request = isEditing
        ? clientService.updateRequest(requestBody) : clientService.insertRequest(requestBody);
        request.then(() => {
                navigate("/gestor/clients");
            }).catch(error => {
                const newInputs = forms.setBackendErrors(formData,error.response.data.errors)
                setFormData(newInputs);
        })
    }

    return (
        <main>
            <section id="client-form-section" className="dsc-container">
                <div className="dsc-client-form-container">
                    <form className="dsc-card dsc-form" onSubmit={handleSubmit}>
                        <h2>Dados do cliente</h2>
                        <div className="dsc-form-controls-container">
                            <div>
                                <FormInput
                                    { ...formData.name }
                                    onTurnDirty={handleTurnDirty}
                                    onChange={handleInputChange}
                                    className="dsc-form-control"
                                />
                                <div className="dsc-form-error">{formData.name.message}</div>
                            </div>
                            <div>
                                <FormInput
                                    { ...formData.cpf }
                                    onTurnDirty={handleTurnDirty}
                                    onChange={handleInputChange}
                                    className="dsc-form-control"
                                />
                                <div className="dsc-form-error">{formData.cpf.message}</div>
                            </div>
                            <div>
                                <FormInput
                                    { ...formData.income }
                                    onTurnDirty={handleTurnDirty}
                                    onChange={handleInputChange}
                                    className="dsc-form-control"
                                />
                                <div className="dsc-form-error">{formData.income.message}</div>
                            </div>
                            <div>
                                <FormInput
                                    { ...formData.birthDate }
                                    onTurnDirty={handleTurnDirty}
                                    onChange={handleInputChange}
                                    className="dsc-form-control"
                                />
                                <div className="dsc-form-error">{formData.birthDate.message}</div>
                            </div>
                            <div>
                                <FormInput
                                    { ...formData.children }
                                    onTurnDirty={handleTurnDirty}
                                    onChange={handleInputChange}
                                    className="dsc-form-control"
                                />
                                <div className="dsc-form-error">{formData.children.message}</div>
                            </div>
                            <div>
                                <FormInput
                                    { ...formData.email }
                                    onTurnDirty={handleTurnDirty}
                                    onChange={handleInputChange}
                                    className="dsc-form-control"
                                />
                                <div className="dsc-form-error">{formData.email.message}</div>
                            </div>
                            <div>
                                <FormSelect
                                    { ...formData.stores }
                                    className="dsc-form-control dsc-form-select-container"
                                    styles={SelectStyles}
                                    options={stores}
                                    onChange={(obj: any) => {
                                        const newFormdata = forms.updateAndValidate(formData, "stores", obj);
                                        setFormData(newFormdata);
                                    }}
                                    onTurnDirty={handleTurnDirty}
                                    isMulti
                                    getOptionLabel={(obj: any) => obj.name }
                                    getOptionValue={(obj: any) => String(obj.id)}
                                />
                                <div className="dsc-form-error">{formData.stores.message}</div>
                            </div>

                        </div>

                        <div className="dsc-client-form-buttons">
                            <Link to="/gestor/clients">
                                <button type="reset" className="dsc-btn dsc-btn-white">Cancelar</button>
                            </Link>

                            <button type="submit" className="dsc-btn dsc-btn-blue">Salvar</button>
                        </div>
                    </form>
                </div>
            </section>
            {
                dialogInfoData.visible &&
                <DialogInfo message={dialogInfoData.message} onDialogClose={handleDialogInfoClose}/>
            }
        </main>
    );
}