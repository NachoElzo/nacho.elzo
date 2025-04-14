'use client';

import { useState } from 'react';
import '../styles/form.css';
import '../styles/page.css';

const FormPage = () => {
  const [formData, setFormData] = useState({
    nombre: '',
    apellido: '',
    telefono: '',
    email: '',
    comentario: '', // Nuevo campo para comentario
  });

  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [fieldErrors, setFieldErrors] = useState<{ [key: string]: string }>({});
  const [isPopupVisible, setIsPopupVisible] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const isFormValid = () => {
    return (
      formData.nombre.trim() !== '' &&
      formData.apellido.trim() !== '' &&
      formData.telefono.trim() !== '' &&
      formData.email.trim() !== '' &&
      formData.comentario.trim() !== '' &&
      !Object.values(fieldErrors).some((error) => error) // Verifica que no haya errores
    );
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (isSubmitting) return;
    setIsSubmitting(true);
    setFieldErrors({});
    setErrorMessage('');
    setSuccessMessage('');

    if (!isFormValid()) {
      setErrorMessage('Por favor, completa todos los campos obligatorios y corrige los errores');
      setIsSubmitting(false);
      return;
    }

    const formParams = {
      nombre: formData.nombre,
      apellido: formData.apellido,
      telefono: formData.telefono,
      email: formData.email,
      comentario: formData.comentario, // Incluir el comentario en los datos enviados
    };

    try {
      await fetch('https://script.google.com/macros/s/AKfycbwDfXwpEjSou-BosePi07CdD8OduH8wC1Krq1xLij0qCUqbXi2J41xYUVLdWr5DHJcFKw/exec', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formParams),
        mode: 'no-cors',
      });

      setFormData({
        nombre: '',
        apellido: '',
        telefono: '',
        email: '',
        comentario: '', // Limpiar el campo de comentario
      });

      setSuccessMessage('Su formulario fue enviado con éxito.');
      setIsPopupVisible(true);
    } catch (error) {
      console.error('Error:', error);
      setErrorMessage('Hubo un error al enviar el formulario');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleFieldChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });

    if (name === 'telefono') {
      if (!/^\d{9}$/.test(value)) {
        setFieldErrors((prevErrors) => ({ ...prevErrors, telefono: 'El teléfono debe tener 9 dígitos numéricos' }));
      } else {
        setFieldErrors((prevErrors) => {
          const newErrors = { ...prevErrors };
          delete newErrors.telefono;
          return newErrors;
        });
      }
    } else if (name === 'nombre' || name === 'apellido') {
      if (!/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/.test(value)) {
        setFieldErrors((prevErrors) => ({
          ...prevErrors,
          [name]: `${name.charAt(0).toUpperCase() + name.slice(1)} solo puede contener letras`,
        }));
      } else {
        setFieldErrors((prevErrors) => {
          const newErrors = { ...prevErrors };
          delete newErrors[name];
          return newErrors;
        });
      }
    } else if (name === 'email') {
      const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
      if (!emailPattern.test(value)) {
        setFieldErrors((prevErrors) => ({
          ...prevErrors,
          email: 'Por favor ingrese un email válido',
        }));
      } else {
        setFieldErrors((prevErrors) => {
          const newErrors = { ...prevErrors };
          delete newErrors.email;
          return newErrors;
        });
      }
    } else if (name === 'comentario') {
      if (value.length >= 300) {
        setFieldErrors((prevErrors) => ({
          ...prevErrors,
          comentario: 'El comentario no puede exceder los 300 caracteres',
        }));
      } else {
        setFieldErrors((prevErrors) => {
          const newErrors = { ...prevErrors };
          delete newErrors.comentario;
          return newErrors;
        });
      }
    } else {
      setFieldErrors((prevErrors) => {
        const newErrors = { ...prevErrors };
        delete newErrors[name];
        return newErrors;
      });
    }
  };

  const closePopup = () => {
    setIsPopupVisible(false);
    setErrorMessage('');
    setSuccessMessage('');
  };

  return (
    <div className="form-container">
      <div className="form-card">
        <h1 className="form-title">Formulario de Contacto</h1>
        <small className="information-text">Complete todos los campos del formulario para poder ofrecerle una atención más personalizada y adecuada a tus necesidades</small>
        {isPopupVisible && (
          <div className="popup-message">
            <div className="popup-content">
              <p>{successMessage || errorMessage}</p>
              <button className="popup-close" onClick={closePopup} style={{ backgroundColor: 'green', color: 'white' }}>
                Aceptar
              </button>
            </div>
          </div>
        )}

        <form onSubmit={handleSubmit} className="form-fields">
          <div className="form-group">
            <label htmlFor="nombre">Nombre *</label>
            <input
              type="text"
              id="nombre"
              name="nombre"
              maxLength={15}
              required
              placeholder="Ej: Juan"
              value={formData.nombre}
              onChange={handleFieldChange}
            />
            {fieldErrors.nombre && <small className="error-text">{fieldErrors.nombre}</small>}
          </div>

          <div className="form-group">
            <label htmlFor="apellido">Apellido *</label>
            <input
              type="text"
              id="apellido"
              name="apellido"
              maxLength={20}
              required
              placeholder="Ej: Pérez"
              value={formData.apellido}
              onChange={handleFieldChange}
            />
            {fieldErrors.apellido && <small className="error-text">{fieldErrors.apellido}</small>}
          </div>

          <div className="form-group">
            <label htmlFor="email">Email *</label>
            <input
              type="email"
              id="email"
              name="email"
              required
              value={formData.email}
              onChange={handleFieldChange}
              placeholder="Ej: usuario@dominio.com"
            />
            {fieldErrors.email && <small className="error-text">{fieldErrors.email}</small>}
          </div>

          <div className="form-group">
            <label htmlFor="telefono">Teléfono *</label>
            <input
              type="text"
              id="telefono"
              name="telefono"
              maxLength={9}
              required
              placeholder="Ej: 987654321"
              value={formData.telefono}
              onChange={handleFieldChange}
            />
            {fieldErrors.telefono && <small className="error-text">{fieldErrors.telefono}</small>}
          </div>

          <div className="form-group">
            <label htmlFor="comentario">Comentario *</label>
            <textarea
              id="comentario"
              name="comentario"
              maxLength={300}
              required
              placeholder="Tu comentario debe contener un máximo de 300 caracteres"
              title="Este campo es obligatorio"
              value={formData.comentario}
              onChange={handleFieldChange}
            />
            {fieldErrors.comentario && <small className="error-text">{fieldErrors.comentario}</small>}
          </div>

          <button
            type="submit"
            disabled={isSubmitting || !isFormValid()} // Deshabilitar si el formulario no es válido
            className={`submit-button ${isSubmitting || !isFormValid() ? 'disabled' : 'enabled'}`}
          >
            {isSubmitting ? 'Enviando...' : 'Enviar'}
          </button>

          {errorMessage && <small className="error-text">{errorMessage}</small>}
        </form>
      </div>
    </div>
  );
};

export default FormPage;
