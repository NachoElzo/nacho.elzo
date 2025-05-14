'use client';

import { useEffect, useState, useContext } from 'react';
import Form from './form';
import { LanguageContext } from './context/LanguageContext';
import '../styles/page.css';
import '../styles/form.css';

const Page = () => {
  const { language, toggleLanguage } = useContext(LanguageContext);

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
          description: "Usa las flechas para explorar mis aplicaciones.",
        },
        {
          title: "Testealo - Verificador de Vulnerabilidades",
          description: "Aplicación para detectar vulnerabilidades en un sitio web.",
          link: "https://testealo.vercel.app/check-vulnerabilities",
        },
        {
          title: "Testealo - Verificador de Accesibilidad",
          description: "Aplicación para verificar falta de accesibilidad en un sitio web.",
          link: "https://testealo.vercel.app/check-accessibility",
        },
        {
          title: "Automatizando",
          description: "Aplicación para practicar automatización.",
          link: "https://automatizando.vercel.app/",
        },
        {
          title: "Documentalo",
          description: "Un espacio para documentar lo que voy aprendiendo.",
          link: "https://documentalo.vercel.app/",
        },
      ],
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
          description: "Use the arrows to explore my applications.",
        },
        {
          title: "Testealo - Vulnerability Checker",
          description: "Application to detect vulnerabilities on a website.",
          link: "https://testealo.vercel.app/check-vulnerabilities",
        },
        {
          title: "Testealo - Accessibility Checker",
          description: "Application to check for a lack of accessibility on websites.",
          link: "https://testealo.vercel.app/check-accessibility",
        },
        {
          title: "Automatizando",
          description: "Application for practicing automation.",
          link: "https://automatizando.vercel.app/",
        },
        {
          title: "Documentalo",
          description: "A space to document what I am learning.",
          link: "https://documentalo.vercel.app/",
        },
      ],
    },
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
      <button className="language-toggle" onClick={toggleLanguage}>
        {translations[language].switchButton}
      </button>

      <div className="dynamic-text-container">
        <p>{translations[language].phrases[currentPhraseIndex]}</p>
      </div>

      {/* Slider Section */}
      <div className="slider-container">
        <div className="slider">
          <section className="info-section">
            <div>
              <h2 className="section-title">{translations[language].slides[currentSlideIndex].title}</h2>
              {translations[language].slides[currentSlideIndex].subtitle && (
                <h3>{translations[language].slides[currentSlideIndex].subtitle}</h3>
              )}
              <ul>
                {translations[language].slides[currentSlideIndex].content.map((item, index) => (
                  <li key={index}>{item}</li>
                ))}
              </ul>

              {/* Mostrar redes sociales solo en la primera slide */}
              {currentSlideIndex === 0 && (
                <>
                  <h2 className="section-title">{language === 'es' ? "Mis Redes" : "My Networks"}</h2>
                  <div className="social-icons">
                    <a
                      id="linkedin"
                      href="https://www.linkedin.com/in/joseignacioelzo/"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <img
                        src="https://img.shields.io/badge/LinkedIn-blue?style=for-the-badge&logo=linkedin&logoColor=white"
                        alt="LinkedIn"
                      />
                    </a>
                    <a
                      id="github"
                      href="https://github.com/NachoElzo"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <img
                        src="https://img.shields.io/badge/GitHub-181717?style=for-the-badge&logo=github&logoColor=white"
                        alt="GitHub"
                      />
                    </a>
                    <a
                      id="cv"
                      href="/CV-Jose-Ignacio-Elzo.pdf"
                      download
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <img
                        src="https://img.shields.io/badge/Download%20CV-green?style=for-the-badge&logo=adobeacrobatreader&logoColor=white"
                        alt="Download CV"
                      />
                    </a>
                  </div>
                </>
              )}
            </div>
            {/* Flechas debajo del contenido */}
            <div className="arrows-container">
              <button
                className="arrow arrow-left"
                onClick={() =>
                  setCurrentSlideIndex((prevIndex) =>
                    (prevIndex - 1 + translations[language].slides.length) % translations[language].slides.length
                  )
                }
              >
                &laquo;
              </button>
              <button
                className="arrow arrow-right"
                onClick={() =>
                  setCurrentSlideIndex((prevIndex) => (prevIndex + 1) % translations[language].slides.length)
                }
              >
                &raquo;
              </button>
            </div>
          </section>
        </div>
      </div>

      {/* Sección de aplicaciones */}
      <div className="slider-container">
        <div className="slider">
          <section className="info-section">
            <div>
              <h2>{translations[language].apps[currentAppIndex].title}</h2>
              <p>{translations[language].apps[currentAppIndex].description}</p>
              {translations[language].apps[currentAppIndex].link && (
                <a
                  href={translations[language].apps[currentAppIndex].link}
                  className="navigation-link"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {language === 'es' ? "Abrir aplicación" : "Open application"}
                </a>
              )}
            </div>
            {/* Flechas debajo del contenido */}
            <div className="arrows-container">
              <button
                className="arrow arrow-left"
                onClick={() =>
                  setCurrentAppIndex((prevIndex) =>
                    (prevIndex - 1 + translations[language].apps.length) % translations[language].apps.length
                  )
                }
              >
                &laquo;
              </button>
              <button
                className="arrow arrow-right"
                onClick={() =>
                  setCurrentAppIndex((prevIndex) =>
                    (prevIndex + 1) % translations[language].apps.length
                  )
                }
              >
                &raquo;
              </button>
            </div>
          </section>
        </div>
      </div>

      <Form />
    </div>
  );
};

export default Page;
