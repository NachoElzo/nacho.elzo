'use client';

import { useEffect, useState } from 'react';
import Form from './form'; // Ensure the path is correct
import '../styles/page.css';
import '../styles/form.css';

const Page = () => {
  const phrases: string[] = [
    "SOY JOSÉ IGNACIO ELZO",
    "INGENIERO EN INFORMATICA",
    "ESPECIALIZADO EN QUALITY ASSURANCE Y AUTOMATIZACIÓN",
    "ME APASIONA CREAR SOLUCIONES EFICIENTES PARA PROYECTOS INFORMÁTICOS.",
    "COMPLETA EL FORMULARIO",
    "TE CONTACTARÉ A LA BREVEDAD."
  ];

  const [currentPhraseIndex, setCurrentPhraseIndex] = useState<number>(0);
  const [currentSlideIndex, setCurrentSlideIndex] = useState<number>(0);
  const [currentAppIndex, setCurrentAppIndex] = useState<number>(0); // Nuevo estado para el carrusel de aplicaciones

  useEffect(() => {
    const phraseInterval = setInterval(() => {
      setCurrentPhraseIndex((prevIndex) => (prevIndex + 1) % phrases.length);
    }, 2000); // Cambiar frase cada 2 segundos

    return () => {
      clearInterval(phraseInterval); // Limpiar intervalo al desmontar
    };
  }, []);

  const slides = [
    {
      title: "¿ESTÁS BUSCANDO SOLUCIONES EFICIENTES PARA TU PROYECTO INFORMÁTICO?",
      subtitle: "¡Estás en el lugar adecuado!",
      content: [
        "Soy un profesional especializado en automatización comprometido con ofrecer soluciones de automatizacion eficientes y seguras",
        "Trabajo contigo para optimizar tus procesos y proteger tus aplicaciones, ahorrando tiempo y recursos",
        "Te propongo estrategias personalizadas, alineadas con tus objetivos y necesidades tecnológicas",
      ],
      link: "/CV-Jose-Ignacio-Elzo.pdf" // Reemplaza con la URL real del archivo
      
    },
    {
      title: "EXPERIENCIA Y COMPROMISO",
      content: [
        "Cuento con experiencia en automatización de procesos y en el desarrollo de soluciones en ciberseguridad",
        "Cumplo con los más altos estándares de calidad y buenas prácticas del sector IT",
        "Trabajo de manera transparente, asegurando que cada proyecto cumpla con los requisitos técnicos y de seguridad",
        "Te brindo asesoría continua y soporte para resolver cualquier duda relacionada con tus proyectos tecnológicos",
        "Me enfoco en la protección de tus datos y la optimización de tu infraestructura digital"
      ],
    },
  ];

  const apps = [
    { 
      title: "Mis proyectos personales",
      subtitle: "Check for Vulnerabilities",
      description: "Aplicacion para detectar vulnerabilidades en un sitio web.",
      link: "https://testealo.vercel.app/check-vulnerabilities"
    },
    {
      title: "Check for Accessibility",
      description: "Aplicacion para verificar falta de accesibilidad en un sitio web.",
      link: "https://testealo.vercel.app/check-accessibility" // Reemplaza con la URL real de la aplicación
    },
  ];

  return (
    <div className="page">
      {/* Dynamic Text Section */}
      <div className="dynamic-text-container">
        <p>{phrases[currentPhraseIndex]}</p>
      </div>

      {/* Slider Section */}
      <div className="slider-container">
        <div className="slider">
          <section className="info-section">
            <h2>{slides[currentSlideIndex].title}</h2>
            {slides[currentSlideIndex].subtitle && (
              <h3>{slides[currentSlideIndex].subtitle}</h3>
            )}
            <ul>
              {slides[currentSlideIndex].content.map((item, index) => (
                <li key={index}>{item}</li>
              ))}
            </ul>
            {slides[currentSlideIndex].link && (
              <a
                href={slides[currentSlideIndex].link}
                className="download-link"
                target="_blank"
                rel="noopener noreferrer"
              >
                Descarga mi CV
              </a>
            )}
          </section>

          {/* Navigation Arrows */}
          <button
            className="arrow arrow-left"
            onClick={() =>
              setCurrentSlideIndex((prevIndex) => (prevIndex - 1 + slides.length) % slides.length)
            }
          >
            &#8592;
          </button>
          <button
            className="arrow arrow-right"
            onClick={() =>
              setCurrentSlideIndex((prevIndex) => (prevIndex + 1) % slides.length)
            }
          >
            &#8594;
          </button>
        </div>
      </div>

      {/* Applications Section */}
      <div className="slider-container">
        <div className="slider">
          <section className="info-section">
            <h2>{apps[currentAppIndex].title}</h2>
            {apps[currentAppIndex].subtitle && (
              <h3>{apps[currentAppIndex].subtitle}</h3> // Mostrar el subtítulo si existe
            )}
            <p>{apps[currentAppIndex].description}</p>

            {/* Enlace de descarga */}
            <a
              href={apps[currentAppIndex].link}
              className="navigation-link" 
              target="_blank"
              rel="noopener noreferrer"
            >
              Visitar
            </a>
          </section>

          {/* Navigation Arrows */}
          <button
            className="arrow arrow-left"
            onClick={() =>
              setCurrentAppIndex((prevIndex) => (prevIndex - 1 + apps.length) % apps.length)
            }
          >
            &#8592;
          </button>
          <button
            className="arrow arrow-right"
            onClick={() =>
              setCurrentAppIndex((prevIndex) => (prevIndex + 1) % apps.length)
            }
          >
            &#8594;
          </button>
        </div>
      </div>

      <Form />
    </div>
  );
};

export default Page;
