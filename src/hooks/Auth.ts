import { useState, useContext } from "react";
import * as yup from "yup";
import axios from "axios";
import { useFormik } from "formik";
//import Cookies from "js-cookie";
//import { UsersContext } from "@/context/UsersContext"; // Ajusta la ruta según tu proyecto
// Definir los tipos de los valores del formulario
interface LoginValues {
    u: string;
    p: string;
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

export function Auth({ isLoaded }) {

    //const { user, setUser, clearUser } = useContext(UsersContext);
    // Estado para manejar la carga
    const [loaddatax, setData] = useState<boolean>(false);

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
                    `${apiUrl}Loginnext`,
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
                        resolve(true);
                        setData(false);
                        console.log(response.data)
                        console.log(response.data.length);
                        
                        if (response.data.length == 0) {
                            console.log("ESTE USUARIO NO EXISTE EN SISTEMA");
                        } else {
                            console.log("Guardar el usuario en el contexto");
                            // Guardar el usuario en el contexto
                            //setUser(response.data.user);
                            //Cookies.set("authToken", response.data.token, { expires: 7 }); // Guardar token en cookies por 7 días
                        }
                    }, 3000)
                );
            } catch (error) {
                console.error("Error en la autenticación:", error);
                setData(false);
            }

        },
    });



    return {
        formik_validatelogon,
        loaddatax,
    };
}
