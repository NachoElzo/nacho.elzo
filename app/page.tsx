'use client';

import { useEffect, useState, useContext } from 'react';
import Form from './form';
import { LanguageContext } from './context/LanguageContext';
import '../styles/page.css';
import '../styles/form.css';

const Page = () => {
  // Ahora solo necesitamos "language" ya que el cambio se realiza en el formulario
  const { language } = useContext(LanguageContext);

  // Objeto de traducciones global (puedes moverlo a un archivo aparte si lo deseas)
  const translations = {
    es: {
      phrases: [
        "SOY JOSÉ IGNACIO ELZO",
        "INGENIERO EN INFORMÁTICA",
        "ESPECIALIZADO EN QUALITY ASSURANCE Y AUTOMATIZACIÓN",
        "ME APASIONA CREAR SOLUCIONES EFICIENTES PARA PROYECTOS INFORMÁTICOS.",
        "COMPLETA EL FORMULARIO",
        "TE CONTACTARÉ A LA BREVEDAD."
      ],
      slides: [
        {
          title: "¿ESTÁS BUSCANDO SOLUCIONES EFICIENTES PARA TU PROYECTO INFORMÁTICO?",
          subtitle: "¡Estás en el lugar adecuado!",
          content: [
            "Soy un profesional especializado en automatización comprometido con ofrecer soluciones seguras y eficientes.",
            "Trabajo contigo para optimizar procesos y proteger aplicaciones, ahorrando tiempo y recursos.",
            "Te propongo estrategias personalizadas alineadas con tus objetivos."
          ],
          link: "/CV-Jose-Ignacio-Elzo.pdf"
        },
        {
          title: "EXPERIENCIA Y COMPROMISO",
          subtitle: "",
          content: [
            "Experiencia en automatización de procesos y soluciones en ciberseguridad.",
            "Cumplo con altos estándares de calidad y buenas prácticas en el sector IT.",
            "Trabajo de manera transparente, asegurando el cumplimiento de requisitos técnicos."
          ],
          link: ""
        },
      ],
      apps: [
        { 
          title: "Mis proyectos personales",
          subtitle: "Check for Vulnerabilities",
          description: "Aplicación para detectar vulnerabilidades en un sitio web.",
          link: "https://testealo.vercel.app/check-vulnerabilities"
        },
        {
          title: "Check for Accessibility",
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
        "FILL OUT THE FORM",
        "I WILL CONTACT YOU SOON."
      ],
      slides: [
        {
          title: "ARE YOU LOOKING FOR EFFICIENT SOLUTIONS FOR YOUR IT PROJECT?",
          subtitle: "You're in the right place!",
          content: [
            "I am a professional specialized in automation with secure and efficient solutions.",
            "I work with you to optimize processes and protect applications, saving time and resources.",
            "I offer personalized strategies aligned with your objectives."
          ],
          link: "/CV-Jose-Ignacio-Elzo.pdf"
        },
        {
          title: "EXPERIENCE & COMMITMENT",
          subtitle: "",
          content: [
            "Experience in automating processes and developing cybersecurity solutions.",
            "I meet the highest quality standards and industry best practices in IT.",
            "I work transparently, ensuring projects meet both technical and security requirements."
          ],
          link: ""
        },
      ],
      apps: [
        { 
          title: "My Personal Projects",
          subtitle: "Check for Vulnerabilities",
          description: "Application to detect vulnerabilities on a website.",
          link: "https://testealo.vercel.app/check-vulnerabilities"
        },
        {
          title: "Check for Accessibility",
          subtitle: "",
          description: "Application to verify accessibility issues on a website.",
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
              setCurrentSlideIndex((prevIndex) => (prevIndex - 1 + translations[language].slides.length) % translations[language].slides.length)
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
              {language === 'es' ? "Visitar" : "Visit"}
            </a>
          </section>

          {/* Flechas de navegación para apps */}
          <button
            className="arrow arrow-left"
            onClick={() =>
              setCurrentAppIndex((prevIndex) => (prevIndex - 1 + translations[language].apps.length) % translations[language].apps.length)
            }
          >
            &#8592;
          </button>
          <button
            className="arrow arrow-right"
            onClick={() =>
              setCurrentAppIndex((prevIndex) => (prevIndex + 1) % translations[language].apps.length)
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
