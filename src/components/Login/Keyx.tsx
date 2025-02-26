"use client";

import { useRouter } from "next/navigation";
import Cookies from "js-cookie";

const Keyx = () => {
    const router = useRouter();
    const handleLogout = async () => {
        try {
            const apiUrl = process.env.NEXT_PUBLIC_API_BACKEND_URL
            // Llamar a la API para eliminar la sesión
            await fetch(`${apiUrl}Closed`, { method: "POST" });
            // Limpiar el session
             sessionStorage.removeItem('NazyXuserId');
             sessionStorage.removeItem('NazyXuserName');
             sessionStorage.removeItem('NazyXuserRol');
             Cookies.remove('jwt_avg'); // Asegúrate de eliminar la cookie si no es válida
             Cookies.remove('NazyXuserId'); // Asegúrate de eliminar la cookie si no es válida
             Cookies.remove('NazyXuserName'); // Asegúrate de eliminar la cookie si no es válida
             Cookies.remove('NazyXuserRol'); // Asegúrate de eliminar la cookie si no es válida
             


            // Redirigir a la página de inicio de sesión
            router.replace("/");
        } catch (error) {
            console.error("Error al cerrar sesión", error);
        }
    };

    return (
        <button onClick={handleLogout} className="bg-red-500 text-white px-4 py-2 rounded">
            Cerrar Sesión
        </button>
    );
};

export default Keyx;
