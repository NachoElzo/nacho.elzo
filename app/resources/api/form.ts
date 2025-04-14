export async function sendFormData(formData: {
  nombre: string;
  apellido: string;
  telefono: string;
  email: string;
  comentario: string;
}) {
  try {
    // Cambia el script ID en la URL por el que corresponde a tu script
    await fetch(
      "https://script.google.com/macros/s/AKfycbzhpo3utlzGBAH7nQWDvLSsqIgJ_0ym93dzs6wmCRIGx7LrefgbWTl2hlfSHEkLheB1IQ/exec",
      {
        method: "POST",
        mode: "no-cors", // Esto evita problemas de CORS en producción
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      }
    );

    // Aunque no puedes leer la respuesta cuando usas no-cors, asumimos que todo fue bien.
    return { success: true };
  } catch (error) {
    console.error("Error al enviar datos a Google Sheets:", error);
    return { success: false };
  }
}
