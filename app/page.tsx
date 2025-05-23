'use client';

import { useEffect, useState, useContext } from 'react';
import Form from './form';
import { LanguageContext } from './context/LanguageContext';
import '../styles/page.css';
import '../styles/form.css';

// Componente reutilizable para los dots
const Dots = ({ total, current }: { total: number; current: number }) => (
  <div className="dots-container">
    {Array.from({ length: total }).map((_, idx) => (
      <span
        key={idx}
        className={`dot${idx === current ? ' active' : ''}`}
      />
    ))}
  </div>
);

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
          content: [
            "Quality Assurance Engineer con amplia experiencia en la automatización y testing manual de interfaces frontend, mobile y servicios API.",
            "Experiencia en entornos ágiles y DevOps, contribuyendo activamente a la productividad del equipo.",
            "Participación activa en la implementación y optimización de pipelines de CI/CD para mejorar la eficiencia del equipo."
          ],
        },
      ],
      apps: [
        {
          title: "MIS PROYECTOS",
          description: "Usa las flechas para explorar mis aplicaciones.",
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
          content: [
            "Quality Assurance Engineer with extensive experience in automation and manual testing of frontend, mobile interfaces, and API services.",
            "Experience in agile and DevOps environments, actively contributing to team productivity.",
            "Active participation in the implementation and optimization of CI/CD pipelines to improve team efficiency."
          ],
        },
      ],
      apps: [
        {
          title: "MY PROJECTS",
          description: "Use the arrows to explore my applications.",
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
              <ul>
                {translations[language].slides[currentSlideIndex].content.map((item, index) => (
                  <li key={index}>{item}</li>
                ))}
              </ul>

              {/* Título y herramientas solo en la slide de experiencia */}
              {currentSlideIndex === 1 && (
                <>
                  <h2 className="section-title">
                    {language === 'es'
                      ? "Herramientas de Desarrollo y Automatización"
                      : "Development and Automation Tools"}
                  </h2>
                  <div className="tools-icons">
                    <img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/javascript/javascript-original.svg" title="JavaScript" alt="JavaScript" width="40" height="40"/>&nbsp;
                    <img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/python/python-original.svg" title="Python" alt="Python" width="40" height="40"/>&nbsp;
                    <img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/html5/html5-original.svg" title="HTML5" alt="HTML5" width="40" height="40"/>&nbsp;
                    <img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/postgresql/postgresql-original-wordmark.svg" title="PostgreSQL" alt="PostgreSQL" width="40" height="40"/>&nbsp;
                    <img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/git/git-original.svg" title="Git" alt="Git" width="40" height="40"/>&nbsp;
                    <img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/selenium/selenium-original.svg" title="Selenium" alt="Selenium" width="40" height="40"/>&nbsp;
                    <img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/playwright/playwright-original.svg" title="Playwright" alt="Playwright" width="40" height="40"/>&nbsp;
                    <img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/cypressio/cypressio-original.svg" title="CypressIO" alt="CypressIO" width="40" height="40"/>&nbsp;
                    <img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/postman/postman-original.svg" title="Postman" alt="Postman" width="40" height="40"/>&nbsp;
                    <img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/jenkins/jenkins-original.svg" title="Jenkins" alt="Jenkins" width="40" height="40"/>&nbsp;
                    <img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/azuredevops/azuredevops-original.svg" title="Azure DevOps" alt="Azure DevOps" width="40" height="40"/>
                  </div>
                </>
              )}

              {/* Mostrar redes sociales solo en la primera slide */}
              {currentSlideIndex === 0 && (
                <>
                  <h2 className="section-title">{language === 'es' ? "MIS REDES" : "MY NETWORKS"}</h2>
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
            <div className="slider-controls">
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
              <Dots total={translations[language].slides.length} current={currentSlideIndex} />
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
              <div className="project-icon">
                {currentAppIndex === 0 && (
                  <img
                    className="my-projects-img"
                    src="https://img.shields.io/badge/My%20Projects-Section-181717?style=for-the-badge&logo=folder"
                    alt="My Projects Section"
                  />
                )}
                {currentAppIndex === 1 && (
                  <a
                    href={translations[language].apps[currentAppIndex].link}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ marginLeft: 0, display: 'block' }}
                  >
                    <img
                      className="project-link-img"
                      src="https://img.shields.io/badge/AUTOMATIZANDO-PRACTICE-orange?style=for-the-badge&labelColor=22272e&logo=robot"
                      alt={translations[language].apps[currentAppIndex].title}
                    />
                  </a>
                )}
                {currentAppIndex === 2 && (
                  <a
                    href={translations[language].apps[currentAppIndex].link}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ marginLeft: 0, display: 'block' }}
                  >
                    <img
                      className="project-link-img"
                      src="https://img.shields.io/badge/DOCUMENTALO-LEARNING-yellow?style=for-the-badge&labelColor=22272e&logo=document"
                      alt={translations[language].apps[currentAppIndex].title}
                    />
                  </a>
                )}
              </div>
              <p>{translations[language].apps[currentAppIndex].description}</p>
            </div>
            <div className="slider-controls">
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
              <Dots total={translations[language].apps.length} current={currentAppIndex} />
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
