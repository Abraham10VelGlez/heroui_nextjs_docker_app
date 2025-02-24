"use client";

import { useEffect, useState } from "react";

export default function Testerapi() {
  const [data, setData] = useState<any>(null);


  useEffect(() => {

    const url = process.env.NEXT_PUBLIC_API_URL || "";
    
    if (!url) {
      console.error("NEXT_PUBLIC_API_URL no está definida");
      return;
    }

    fetch(url)
      .then((res) => res.json())
      .then((data) => setData(data))
      .catch((error) => console.error("Error de datos:", error));
  }, []);

  return (
    <div>
      <h1>API REST NEXTJS FRONT</h1>
      {data ? <pre>{JSON.stringify(data, null, 2)}</pre> : <p>Cargando...</p>}
    </div>
  );
}
