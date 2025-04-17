'use client';

import { useEffect, useState, useContext } from 'react';
import Form from './form';
import { LanguageContext } from './context/LanguageContext';
import '../styles/page.css';
import '../styles/form.css';

const Page = () => {
  const { language, toggleLanguage } = useContext(LanguageContext);

  // Agregamos la propiedad switchButton para el botón en page.tsx
  const translations = {
    es: {
      phrases: [
        "SOY JOSÉ IGNACIO ELZO",
        "INGENIERO EN INFORMÁTICA",
        "ESPECIALIZADO EN QUALITY ASSURANCE Y AUTOMATIZACIÓN",
        "ME APASIONA CREAR SOLUCIONES EFICIENTES PARA PROYECTOS INFORMÁTICOS.",
      ],
      switchButton: "Switch to English",
      slides: [
        {
          title: "MI PERFIL",
          content: [
            "Soy un profesional especializado en automatización, enfocado en ofrecer soluciones seguras, eficientes y sostenibles.",
            "Colaboro contigo para optimizar procesos y encontrar la mejor solución para tus aplicaciones, ahorrando tiempo y recursos.",
            "Propongo estrategias personalizadas alineadas con tus objetivos y necesidades."
          ],
          link: "/CV-Jose-Ignacio-Elzo.pdf"
        },
        {
          title: "EXPERIENCIA Y COMPROMISO",
          subtitle: "",
          content: [
            "Amplia experiencia en la automatización de interfaces frontend y servicios API",
            "Comprometido con altos estándares de calidad y las mejores prácticas del sector tecnológico.",
            "Experiencia en entornos ágiles y DevOps, contribuyendo activamente a la productividad del equipo.",
          ],
        },
      ],
      apps: [
        { 
          title: "MIS PROYECTOS",
          subtitle: "",
          description: "Aplicación para detectar vulnerabilidades en un sitio web.",
          link: "https://testealo.vercel.app/check-vulnerabilities"
        },
        {
          title: "",
          subtitle: "",
          description: "Aplicación para verificar falta de accesibilidad en un sitio web.",
          link: "https://testealo.vercel.app/check-accessibility"
        },
      ]
    },
    en: {
      phrases: [
        "I'M JOSE IGNACIO ELZO",
        "INFORMATION TECHNOLOGY ENGINEER",
        "SPECIALIZED IN QUALITY ASSURANCE AND AUTOMATION",
        "I'M PASSIONATE ABOUT CREATING EFFICIENT SOLUTIONS FOR IT PROJECTS.",
      ],
      switchButton: "Cambiar a Español",
      slides: [
        {
          title: "MY APPROACH",
          content: [
            "I’m an automation specialist focused on delivering secure, efficient, and sustainable solutions.",
            "I work with you to optimize processes and find the best solution for your applications, saving time and resources.",
            "I offer tailored strategies aligned with your goals and needs."
          ],
          link: "/CV-Jose-Ignacio-Elzo.pdf"
        },
        {
          title: "EXPERIENCE & COMMITMENT",
          subtitle: "",
          content: [
            "Extensive experience in automating frontend interfaces and API services.",
            "Committed to high quality standards and industry best practices in the tech sector.",
            "Experienced in agile and DevOps environments, actively contributing to team productivity."
          ],
        },
      ],
      apps: [
        { 
          title: "MY PROJECTS",
          subtitle: "",
          description: "Application to detect vulnerabilities on a website.",
          link: "https://testealo.vercel.app/check-vulnerabilities"
        },
        {
          title: "",
          subtitle: "",
          description: "Application to check for a lack of accessibility on websites.",
          link: "https://testealo.vercel.app/check-accessibility"
        },
      ]
    }
  };

  const [currentPhraseIndex, setCurrentPhraseIndex] = useState<number>(0);
  const [currentSlideIndex, setCurrentSlideIndex] = useState<number>(0);
  const [currentAppIndex, setCurrentAppIndex] = useState<number>(0);

  useEffect(() => {
    const phraseInterval = setInterval(() => {
      setCurrentPhraseIndex((prev) => (prev + 1) % translations[language].phrases.length);
    }, 2000);
    return () => clearInterval(phraseInterval);
  }, [language]);

  return (
    <div className="page" style={{ position: 'relative' }}>
      {/* Botón para cambiar idioma implementado en Page */}
      <button className="language-toggle" onClick={toggleLanguage}>
        {translations[language].switchButton}
      </button>

      {/* Sección de texto dinámico */}
      <div className="dynamic-text-container">
        <p>{translations[language].phrases[currentPhraseIndex]}</p>
      </div>

      {/* Slider Section */}
      <div className="slider-container">
        <div className="slider">
          <section className="info-section">
            <h2>{translations[language].slides[currentSlideIndex].title}</h2>
            {translations[language].slides[currentSlideIndex].subtitle && (
              <h3>{translations[language].slides[currentSlideIndex].subtitle}</h3>
            )}
            <ul>
              {translations[language].slides[currentSlideIndex].content.map((item, index) => (
                <li key={index}>{item}</li>
              ))}
            </ul>
            {translations[language].slides[currentSlideIndex].link && (
              <a
                href={translations[language].slides[currentSlideIndex].link}
                className="download-link"
                target="_blank"
                rel="noopener noreferrer"
              >
                {language === 'es' ? "Descarga mi CV" : "Download my CV"}
              </a>
            )}
          </section>

          {/* Flechas de navegación para slides */}
          <button
            className="arrow arrow-left"
            onClick={() =>
              setCurrentSlideIndex((prevIndex) =>
                (prevIndex - 1 + translations[language].slides.length) % translations[language].slides.length
              )
            }
          >
            &#8592;
          </button>
          <button
            className="arrow arrow-right"
            onClick={() =>
              setCurrentSlideIndex((prevIndex) => (prevIndex + 1) % translations[language].slides.length)
            }
          >
            &#8594;
          </button>
        </div>
      </div>

      {/* Sección de aplicaciones */}
      <div className="slider-container">
        <div className="slider">
          <section className="info-section">
            <h2>{translations[language].apps[currentAppIndex].title}</h2>
            {translations[language].apps[currentAppIndex].subtitle && (
              <h3>{translations[language].apps[currentAppIndex].subtitle}</h3>
            )}
            <p>{translations[language].apps[currentAppIndex].description}</p>
            <a
              href={translations[language].apps[currentAppIndex].link}
              className="navigation-link" 
              target="_blank"
              rel="noopener noreferrer"
            >
              {language === 'es' ? "Link Testealo" : "Link Testealo"}
            </a>
          </section>

          {/* Flechas de navegación para apps */}
          <button
            className="arrow arrow-left"
            onClick={() =>
              setCurrentAppIndex((prevIndex) =>
                (prevIndex - 1 + translations[language].apps.length) % translations[language].apps.length
              )
            }
          >
            &#8592;
          </button>
          <button
            className="arrow arrow-right"
            onClick={() =>
              setCurrentAppIndex((prevIndex) =>
                (prevIndex + 1) % translations[language].apps.length
              )
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
