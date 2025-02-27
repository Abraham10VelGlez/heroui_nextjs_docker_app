import { useState } from "react";
import * as yup from "yup";
import axios from "axios";
import { useFormik } from "formik";
import { addToast } from "@heroui/react";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
//import { UsersContext } from "@/context/UsersContext"; // Ajusta la ruta según tu proyecto
// Definir los tipos de los valores del formulario
interface LoginValues {
    u: string;
    p: string;
}

interface User {
    key: number;
    passwordxx: string;
    key2: string;
    name: string;
    rolx: string;
}

interface JsonResponse {
    ok: boolean;
    avg: string;
    urlsess: string;
    resultuser: User[];
}


// Definir el esquema de validación con Yup
const validationSchema = yup.object({
    u: yup
        .string()
        .matches(
            /^[A-Z0-9._%+-]+@[A-Z0-9.-]+.[A-Z]{2,4}$/i,
            "Solo se permiten letras, números, guiones y guiones bajos"
        )
        .required("El correo electrónico, es obligatio"),
    p: yup
        .string()
        .matches(
            /^(?=(?:[^A-Z]*[A-Z]){1})(?=(?:[^$]*[$]){1})[a-zA-Z0-9$]{9}$/,
            "La contraseña debe contener exactamente 9 caracteres: 7 letras o números, 1 mayúscula y 1 signo '$'"
        )
        .min(9, "La contraseña debe contener al menos 9 caracteres")
        //.max(15, "La contraseña solo puede tener maximo 15 caracteres")
        .required("El campo de contraseña es obligatorio"),
});

export function Auth() {
    const route = useRouter()
    //const { user, setUser, clearUser } = useContext(UsersContext);
    // Estado para manejar la carga
    const [loaddatax, setData] = useState(false);

    // Formik para manejar el formulario
    const formik_validatelogon = useFormik<LoginValues>({
        initialValues: {
            u: "",
            p: "",
        },
        validationSchema,
        onSubmit: async (values) => {
            //console.log('Enviando formulario:', values);
            setData(true);
            const apiUrl = process.env.NEXT_PUBLIC_API_BACKEND_URL
            try {
                const response = await axios.post(
                    //`${apiUrl}Loginnext`,
                    `${apiUrl}Tokenuser`,
                    { values },
                    {
                        headers: {
                            "Content-Type": "application/json",
                        },
                        withCredentials: true,
                    }
                );
                // Simular un delay de 3 segundos antes de procesar la respuesta
                await new Promise((resolve) =>
                    setTimeout(() => {
                        ////console.log(response.data)
                        //console.log(response.data.length);
                        if (response.data.length == 0) {
                            console.log("ESTE USUARIO NO EXISTE EN SISTEMA");
                            resolve(true);
                            setData(false);
                            addToast({
                                title: "Este usuario no existe en el Servidor",
                                color: "danger",
                            });

                        } else {
                            //console.log(response.data.ok);                            
                            if (response.data.ok) {
                                //console.log(response.data.resultuser[0].name);                                
                                resolve(true);
                                setData(false);
                                addToast({
                                    title: "Guardar el usuario en el contexto, iniciar sesion",
                                    color: "success",
                                });                                
                                save_session(response.data)                                
                            } else {
                                resolve(true);
                                setData(false);
                                addToast({
                                    title: "El usuario no existe",
                                    color: "danger",
                                });
                            }                           
                        }
                    }, 3000)
                );
            } catch (error) {
                console.error("Error en la autenticación:", error);
                setData(false);
            }

        },
    });
    const save_session = (json: JsonResponse) => {
        Cookies.set('jwt_avg', json.avg, { expires: 1 }); // expira en 1 día
        Cookies.set('NazyXuserId', json.resultuser[0].key2, { expires: 1 });
        Cookies.set('NazyXuserName', json.resultuser[0].name, { expires: 1 });
        Cookies.set('NazyXuserRol', json.resultuser[0].rolx, { expires: 1 });
        sessionStorage.setItem('NazyXuserId', json.resultuser[0].key2);// almacenar en sesion 
        sessionStorage.setItem('NazyXuserName', json.resultuser[0].name);
        sessionStorage.setItem('NazyXuserRol', json.resultuser[0].rolx);
        route.replace(json.urlsess);
    };
    return {
        formik_validatelogon,
        loaddatax,
    };
}