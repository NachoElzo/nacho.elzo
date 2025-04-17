'use client';

import { useState, useContext } from 'react';
import { sendFormData } from './resources/api/form';
import { LanguageContext } from './context/LanguageContext';
import '../styles/form.css';
import '../styles/page.css';

const translations = {
  es: {
    formTitle: "Formulario de Contacto",
    informationText:
      "Complete todos los campos del formulario para poder ofrecerle una atención más personalizada y adecuada a tus necesidades",
    nombreLabel: "Nombre *",
    apellidoLabel: "Apellido *",
    apellidoPlaceholder: "Ej: Pérez",
    emailLabel: "Email *",
    emailPlaceholder: "Ej: usuario@dominio.com",
    telefonoLabel: "Teléfono *",
    telefonoPlaceholder: "Ej: 987654321",
    comentarioLabel: "Comentario *",
    comentarioPlaceholder:
      "Tu comentario debe contener un máximo de 150 caracteres",
    submit: "Enviar",
    sending: "Enviando..."
  },
  en: {
    formTitle: "Contact Form",
    informationText:
      "Complete all the fields of the form so we can provide you with more personalized and adequate attention to your needs",
    nombreLabel: "Name *",
    apellidoLabel: "Last Name *",
    apellidoPlaceholder: "e.g., Pérez",
    emailLabel: "Email *",
    emailPlaceholder: "e.g., user@domain.com",
    telefonoLabel: "Phone *",
    telefonoPlaceholder: "e.g., 987654321",
    comentarioLabel: "Comment *",
    comentarioPlaceholder:
      "Your comment should be at most 150 characters",
    submit: "Submit",
    sending: "Sending..."
  }
};

const FormPage = () => {
  const { language } = useContext(LanguageContext);
  const [formData, setFormData] = useState({
    nombre: '',
    apellido: '',
    telefono: '',
    email: '',
    comentario: '',
  });
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [fieldErrors, setFieldErrors] = useState<{ [key: string]: string }>({});
  const [isPopupVisible, setIsPopupVisible] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const isFormValid = () =>
    formData.nombre.trim() !== '' &&
    formData.apellido.trim() !== '' &&
    formData.telefono.trim() !== '' &&
    formData.email.trim() !== '' &&
    formData.comentario.trim() !== '' &&
    !Object.values(fieldErrors).some((error) => error);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isSubmitting) return;
    setIsSubmitting(true);
    setFieldErrors({});
    setErrorMessage('');
    setSuccessMessage('');

    if (!isFormValid()) {
      setErrorMessage(
        language === 'es'
          ? 'Por favor, completa todos los campos obligatorios y corrige los errores'
          : 'Please complete all required fields and correct the errors'
      );
      setIsSubmitting(false);
      return;
    }

    try {
      const response = await sendFormData(formData);
      if (response.success) {
        setFormData({ nombre: '', apellido: '', telefono: '', email: '', comentario: '' });
        setSuccessMessage(
          language === 'es'
            ? 'Su formulario fue enviado con éxito.'
            : 'Your form was submitted successfully.'
        );
        setIsPopupVisible(true);
      } else {
        setErrorMessage(
          language === 'es'
            ? 'Hubo un error al enviar el formulario.'
            : 'There was an error submitting the form.'
        );
      }
    } catch (error) {
      console.error('Error:', error);
      setErrorMessage(
        language === 'es'
          ? 'Hubo un error al enviar el formulario.'
          : 'There was an error submitting the form.'
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleFieldChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });

    if (name === 'telefono') {
      if (!/^\d{9}$/.test(value)) {
        setFieldErrors((prev) => ({
          ...prev,
          telefono:
            language === 'es'
              ? 'El teléfono debe tener 9 dígitos numéricos'
              : 'Phone must have 9 numeric digits',
        }));
      } else {
        setFieldErrors((prev) => {
          const newErrors = { ...prev };
          delete newErrors.telefono;
          return newErrors;
        });
      }
    } else if (name === 'nombre' || name === 'apellido') {
      if (!/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/.test(value)) {
        setFieldErrors((prev) => ({
          ...prev,
          [name]:
            (name.charAt(0).toUpperCase() + name.slice(1)) +
            (language === 'es'
              ? ' solo puede contener letras'
              : ' can only contain letters'),
        }));
      } else {
        setFieldErrors((prev) => {
          const newErrors = { ...prev };
          delete newErrors[name];
          return newErrors;
        });
      }
    } else if (name === 'email') {
      const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
      if (!emailPattern.test(value)) {
        setFieldErrors((prev) => ({
          ...prev,
          email:
            language === 'es'
              ? 'Por favor ingrese un email válido'
              : 'Please enter a valid email',
        }));
      } else {
        setFieldErrors((prev) => {
          const newErrors = { ...prev };
          delete newErrors.email;
          return newErrors;
        });
      }
    } else if (name === 'comentario') {
      if (value.length >= 150) {
        setFieldErrors((prev) => ({
          ...prev,
          comentario:
            language === 'es'
              ? 'El comentario no puede exceder los 150 caracteres'
              : 'Comment cannot exceed 150 characters',
        }));
      } else {
        setFieldErrors((prev) => {
          const newErrors = { ...prev };
          delete newErrors.comentario;
          return newErrors;
        });
      }
    } else {
      setFieldErrors((prev) => {
        const newErrors = { ...prev };
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
        <h1 className="form-title">{translations[language].formTitle}</h1>
        <small className="information-text">
          {translations[language].informationText}
        </small>
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
            <label htmlFor="nombre">{translations[language].nombreLabel}</label>
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
            <label htmlFor="apellido">{translations[language].apellidoLabel}</label>
            <input
              type="text"
              id="apellido"
              name="apellido"
              maxLength={20}
              required
              placeholder={translations[language].apellidoPlaceholder}
              value={formData.apellido}
              onChange={handleFieldChange}
            />
            {fieldErrors.apellido && <small className="error-text">{fieldErrors.apellido}</small>}
          </div>
          <div className="form-group">
            <label htmlFor="email">{translations[language].emailLabel}</label>
            <input
              type="email"
              id="email"
              name="email"
              required
              value={formData.email}
              onChange={handleFieldChange}
              placeholder={translations[language].emailPlaceholder}
            />
            {fieldErrors.email && <small className="error-text">{fieldErrors.email}</small>}
          </div>
          <div className="form-group">
            <label htmlFor="telefono">{translations[language].telefonoLabel}</label>
            <input
              type="text"
              id="telefono"
              name="telefono"
              maxLength={9}
              required
              placeholder={translations[language].telefonoPlaceholder}
              value={formData.telefono}
              onChange={handleFieldChange}
            />
            {fieldErrors.telefono && <small className="error-text">{fieldErrors.telefono}</small>}
          </div>
          <div className="form-group">
            <label htmlFor="comentario">{translations[language].comentarioLabel}</label>
            <textarea
              id="comentario"
              name="comentario"
              maxLength={150}
              required
              placeholder={translations[language].comentarioPlaceholder}
              title="Este campo es obligatorio"
              value={formData.comentario}
              onChange={handleFieldChange}
            />
            {fieldErrors.comentario && <small className="error-text">{fieldErrors.comentario}</small>}
          </div>
          <button
            type="submit"
            disabled={isSubmitting || !isFormValid()}
            className={`submit-button ${isSubmitting || !isFormValid() ? 'disabled' : 'enabled'}`}
          >
            {isSubmitting ? translations[language].sending : translations[language].submit}
          </button>
          {errorMessage && <small className="error-text">{errorMessage}</small>}
        </form>
      </div>
    </div>
  );
};

export default FormPage;
