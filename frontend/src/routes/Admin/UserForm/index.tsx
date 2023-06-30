import './styles.css';
import {Link, useNavigate, useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import FormInput from "../../../components/FormInput";
import * as forms from "../../../utils/forms";
import * as userService from '../../../services/user-service';
import * as roleService from '../../../services/role-service';
import {dirtyAndValidate} from "../../../utils/forms";
import {Role} from "../../../types/role";
import FormSelect from "../../../components/FormSelect";
import {SelectStyles} from "../../../utils/select";
import DialogInfo from "../../../components/DialogInfo";

export default function UserForm() {

    const params = useParams();

    const navigate = useNavigate();

    const isEditing = params.userId !== 'create';

    const [roles, setRoles] = useState<Role[]>([]);

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
        email: {
            value: "",
            id: "email",
            name: "email",
            type: "email",
            placeholder: "email",
            validation: function (value: string) {
                return /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(value.toLowerCase());
            },
            message: "Favor informar um e-mail válido"
        },
        imgUrl: {
            value: "",
            id: "imgUrl",
            name: "imgUrl",
            type: "text",
            placeholder: "Avatar",
            validation: function (value: string) {
                return /^.{3,150}$/.test(value);
            },
            message: "Favor informar uma URL do avatar válido"
        },
        birthDate: {
            value: "",
            id: "birthDate",
            name: "birthDate",
            type: "date",
            placeholder: "Data de aniversário",
            // validation: function () {
            //     return /\d{2}\/\d{2}\/\d{4}/;
            // },
            message: "Favor informar uma data válida"
        },
        roles: {
            value: [],
            id: "roles",
            name: "roles",
            placeholder: "Perfil de acesso",
            validation: function (value: Role[]) {
                return value.length > 0;
            },
            message: "Escolha pelo menos uma role"
        }
    })

    useEffect(() => {
        roleService.findAllRequest()
            .then(response => {
                setRoles(response.data);
            })
    }, [])

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
            requestBody.id = params.userId;
        }
        const request = isEditing
        ? userService.updateRequest(requestBody) : userService.insertRequest(requestBody);
        request.then(() => {
                navigate("/admin/users");
            }).catch(error => {
                const newInputs = forms.setBackendErrors(formData,error.response.data.errors)
                setFormData(newInputs);
        })
    }

    return (
        <main>
            <section id="product-form-section" className="dsc-container">
                <div className="dsc-product-form-container">
                    <form className="dsc-card dsc-form" onSubmit={handleSubmit}>
                        <h2>Dados do Usuário</h2>
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
                                    { ...formData.email }
                                    onTurnDirty={handleTurnDirty}
                                    onChange={handleInputChange}
                                    className="dsc-form-control"
                                />
                                <div className="dsc-form-error">{formData.email.message}</div>
                            </div>
                            <div>
                                <FormInput
                                    { ...formData.imgUrl }
                                    onTurnDirty={handleTurnDirty}
                                    onChange={handleInputChange}
                                    className="dsc-form-control"
                                />
                                <div className="dsc-form-error">{formData.imgUrl.message}</div>
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
                                <FormSelect
                                    { ...formData.roles }
                                    className="dsc-form-control dsc-form-select-container"
                                    styles={SelectStyles}
                                    options={roles}
                                    onChange={(obj: any) => {
                                        const newFormdata = forms.updateAndValidate(formData, "roles", obj);
                                        setFormData(newFormdata);
                                    }}
                                    onTurnDirty={handleTurnDirty}
                                    isMulti
                                    getOptionLabel={(obj: any) => obj.name }
                                    getOptionValue={(obj: any) => String(obj.id)}
                                />
                                <div className="dsc-form-error">{formData.roles.message}</div>
                            </div>

                        </div>

                        <div className="dsc-product-form-buttons">
                            <Link to="/admin/users">
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