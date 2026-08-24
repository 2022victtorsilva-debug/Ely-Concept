import { useEffect, useId, useState } from 'react'
import { salonConfig, whatsappUrl } from './config'

const ASSET = `${import.meta.env.BASE_URL}assets/`
const mapEmbedUrl = `https://www.google.com/maps?q=${encodeURIComponent(salonConfig.address)}&output=embed`

const IconArrow = () => (
  <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5 12h14M13 6l6 6-6 6" /></svg>
)

const IconWhatsApp = () => (
  <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M20.5 11.7a8.5 8.5 0 0 1-12.6 7.5L3 20.5l1.3-4.7A8.5 8.5 0 1 1 20.5 11.7Z"/><path d="M8.2 7.8c.3-.7.6-.7.9-.7h.7c.2 0 .4 0 .6.5l.8 1.9c.1.3.1.5-.1.7l-.7.9c-.2.2-.2.4 0 .7.8 1.4 1.9 2.5 3.4 3.2.3.2.5.1.7-.1l.9-1.1c.2-.3.5-.3.7-.2l2 .9c.3.1.5.2.5.4 0 .2 0 1.1-.6 1.8-.6.7-1.5 1-2.5.8-1.2-.2-2.8-.8-4.6-2.4-2.2-1.9-3.6-4.3-4-5.7-.4-1.3 0-2.2.4-2.7.3-.4.7-.8.9-.9Z"/></svg>
)

function useReveal() {
  useEffect(() => {
    const elements = [...document.querySelectorAll<HTMLElement>('[data-reveal]')]
    if (!elements.length) return

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      elements.forEach((element) => element.classList.add('is-visible'))
      return
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible')
            observer.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.12, rootMargin: '0px 0px -5% 0px' },
    )

    elements.forEach((element) => observer.observe(element))
    return () => observer.disconnect()
  }, [])
}

function Header() {
  const [open, setOpen] = useState(false)
  const menuId = useId()
  const links = [
    ['Loiros', '#loiros'],
    ['Trabalhos', '#trabalhos'],
    ['Serviços', '#servicos'],
    ['Localização', '#localizacao'],
  ]

  useEffect(() => {
    const onEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setOpen(false)
    }
    window.addEventListener('keydown', onEscape)
    return () => window.removeEventListener('keydown', onEscape)
  }, [])

  return (
    <header className="site-header">
      <a className="brand" href="#inicio" aria-label="Ely Concept — início">
        <span>ELY</span>
        <small>CONCEPT</small>
      </a>

      <nav className="desktop-nav" aria-label="Navegação principal">
        {links.map(([label, href]) => <a key={href} href={href}>{label}</a>)}
      </nav>

      <a className="header-cta" href={whatsappUrl()} target="_blank" rel="noreferrer">
        Agendar pelo WhatsApp
      </a>

      <button
        className="menu-button"
        type="button"
        aria-expanded={open}
        aria-controls={menuId}
        aria-label={open ? 'Fechar menu' : 'Abrir menu'}
        onClick={() => setOpen((value) => !value)}
      >
        <span></span><span></span>
      </button>

      <div className={`mobile-menu ${open ? 'is-open' : ''}`} id={menuId} aria-hidden={!open}>
        {links.map(([label, href]) => (
          <a key={href} href={href} onClick={() => setOpen(false)}>{label}</a>
        ))}
        <a className="mobile-whatsapp" href={whatsappUrl()} target="_blank" rel="noreferrer">
          Agendar pelo WhatsApp <IconArrow />
        </a>
      </div>
    </header>
  )
}

function App() {
  useReveal()

  return (
    <>
      <Header />

      <main>
        <section className="hero" id="inicio" aria-labelledby="hero-title">
          <div className="hero-copy">
            <p className="location-kicker">Salão de beleza em Feira de Santana</p>
            <h1 id="hero-title">Loiros que valorizam <em>você.</em></h1>
            <p className="hero-description">
              Especialistas em loiros e beleza, com trabalhos que destacam luminosidade, acabamento e cuidado em cada detalhe.
            </p>
            <div className="hero-actions">
              <a className="button button-primary" href={whatsappUrl()} target="_blank" rel="noreferrer">
                <IconWhatsApp /> Agendar pelo WhatsApp
              </a>
              <a className="button button-secondary" href="#trabalhos">Ver trabalhos</a>
            </div>
          </div>

          <div className="hero-media" aria-hidden="true">
            <img
              src={`${ASSET}hero-blonde.avif`}
              width="760"
              height="1005"
              alt=""
              fetchPriority="high"
            />
          </div>
        </section>

        <section className="specialty section" id="loiros" aria-labelledby="specialty-title">
          <div className="specialty-photo" data-reveal>
            <img
              src={`${ASSET}blonde-detail.avif`}
              width="640"
              height="1084"
              loading="lazy"
              alt="Cabelo loiro longo com mechas e ondas, fotografado dentro do salão"
            />
          </div>

          <div className="specialty-content" data-reveal>
            <p className="section-label">Especialidade em loiros</p>
            <h2 id="specialty-title">Cor, luminosidade e acabamento em primeiro plano.</h2>
            <p>
              Os loiros são parte central do trabalho apresentado pela Ely Concept. A proposta é valorizar o resultado real: cabelos com dimensão, brilho e movimento, sem esconder a textura que faz cada transformação ser única.
            </p>
            <a className="text-action" href={whatsappUrl('Olá! Vim pelo site da Ely Concept e gostaria de saber mais sobre atendimento para cabelos e loiros.')} target="_blank" rel="noreferrer">
              Quero saber sobre loiros <IconArrow />
            </a>
          </div>
        </section>

        <section className="work-section section" id="trabalhos" aria-labelledby="work-title">
          <div className="section-heading" data-reveal>
            <div>
              <p className="section-label">Trabalhos reais</p>
              <h2 id="work-title">Resultados que mostram a Ely Concept.</h2>
            </div>
            <p>
              Cabelos e unhas apresentados com as fotografias reais do salão, em uma seleção direta para você conhecer parte do trabalho antes de agendar.
            </p>
          </div>

          <div className="work-gallery">
            <figure className="gallery-item gallery-hair-main" data-reveal>
              <img src={`${ASSET}blonde-detail.avif`} width="640" height="1084" loading="lazy" alt="Cabelo loiro longo com mechas e ondas" />
              <figcaption>Loiros</figcaption>
            </figure>

            <figure className="gallery-item gallery-nails-color" data-reveal>
              <img src={`${ASSET}nails-color.avif`} width="600" height="793" loading="lazy" alt="Unhas em tons rosa, lilás e azul" />
              <figcaption>Unhas</figcaption>
            </figure>

            <figure className="gallery-item gallery-hair-secondary" data-reveal>
              <img src={`${ASSET}hero-blonde.avif`} width="760" height="1005" loading="lazy" alt="Cabelo loiro longo e ondulado fotografado de costas" />
              <figcaption>Cabelos</figcaption>
            </figure>

            <figure className="gallery-item gallery-nails-red" data-reveal>
              <img src={`${ASSET}nails-red-gold.avif`} width="600" height="659" loading="lazy" alt="Unhas vermelhas com detalhes dourados" />
              <figcaption>Unhas</figcaption>
            </figure>
          </div>
        </section>

        <section className="services section" id="servicos" aria-labelledby="services-title">
          <div className="services-heading" data-reveal>
            <p className="section-label">Serviços</p>
            <h2 id="services-title">Beleza com foco no resultado que você procura.</h2>
            <p>
              Para manter as informações corretas, opções específicas, valores e horários são confirmados diretamente com a Ely Concept pelo WhatsApp.
            </p>
          </div>

          <div className="services-list" data-reveal>
            <article>
              <h3>Cabelos & loiros</h3>
              <p>Informações sobre atendimento, possibilidades e disponibilidade para cabelos e loiros.</p>
              <a href={whatsappUrl('Olá! Vim pelo site da Ely Concept e gostaria de saber mais sobre atendimento para cabelos e loiros.')} target="_blank" rel="noreferrer">
                Consultar <IconArrow />
              </a>
            </article>
            <article>
              <h3>Unhas</h3>
              <p>Informações sobre atendimento e disponibilidade para unhas.</p>
              <a href={whatsappUrl('Olá! Vim pelo site da Ely Concept e gostaria de saber mais sobre atendimento para unhas.')} target="_blank" rel="noreferrer">
                Consultar <IconArrow />
              </a>
            </article>
          </div>
        </section>

        <section className="details-section section" aria-labelledby="details-title">
          <div className="details-copy" data-reveal>
            <p className="section-label">Beleza nos detalhes</p>
            <h2 id="details-title">Do cabelo às unhas, o acabamento faz diferença.</h2>
            <p>
              As fotografias reais mostram uma proposta que vai além de um único tipo de atendimento: cor, brilho e cuidado aparecem também nos detalhes.
            </p>
          </div>
          <div className="details-images" data-reveal>
            <img src={`${ASSET}nails-color.avif`} width="600" height="793" loading="lazy" alt="Unhas coloridas em rosa, lilás e azul" />
            <img src={`${ASSET}nails-red-gold.avif`} width="600" height="659" loading="lazy" alt="Unhas vermelhas com detalhes dourados" />
          </div>
        </section>

        <section className="experience section" id="experiencia" aria-labelledby="experience-title">
          <div className="experience-content" data-reveal>
            <p className="section-label">Ely Concept</p>
            <h2 id="experience-title">Um salão que você entende antes mesmo de chegar.</h2>
          </div>
          <div className="experience-text" data-reveal>
            <p>
              A Ely Concept está em Feira de Santana e reúne trabalhos de cabelos, loiros e unhas em uma presença de beleza clara e próxima.
            </p>
            <p>
              Aqui, o site tem uma função simples: mostrar resultados reais, facilitar o contato e ajudar você a chegar ao salão com segurança.
            </p>
          </div>
        </section>

        <section className="reviews" aria-label="Avaliações no Google">
          <div className="reviews-inner" data-reveal>
            <div className="reviews-score">
              <strong>{salonConfig.googleRating}</strong>
              <span aria-hidden="true">★★★★★</span>
            </div>
            <div className="reviews-copy">
              <h2>Avaliada no Google</h2>
              <p>{salonConfig.googleReviewCount} avaliações públicas no Google.</p>
            </div>
          </div>
        </section>

        <section className="location-section section" id="localizacao" aria-labelledby="location-title">
          <div className="location-info" data-reveal>
            <p className="section-label">Localização</p>
            <h2 id="location-title">Ely Concept em Feira de Santana.</h2>
            <address>{salonConfig.address}</address>

            <div className="location-actions">
              <a className="button button-dark" href={salonConfig.mapsUrl} target="_blank" rel="noreferrer">
                Como chegar <IconArrow />
              </a>
              <a className="phone-link" href={`tel:+${salonConfig.whatsapp}`}>{salonConfig.phoneDisplay}</a>
            </div>

            <figure className="facade-card">
              <img src={`${ASSET}facade.avif`} width="700" height="490" loading="lazy" alt="Fachada real do espaço associado à Ely Concept em Feira de Santana" />
              <figcaption>Fachada do espaço</figcaption>
            </figure>
          </div>

          <div className="map-frame" data-reveal>
            <iframe
              title="Mapa da Ely Concept em Feira de Santana"
              src={mapEmbedUrl}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>
        </section>

        <section className="final-cta" aria-labelledby="final-title">
          <div data-reveal>
            <p>Pronta para conversar com a Ely Concept?</p>
            <h2 id="final-title">Seu próximo horário começa pelo WhatsApp.</h2>
            <a className="button button-primary" href={whatsappUrl()} target="_blank" rel="noreferrer">
              <IconWhatsApp /> Agendar pelo WhatsApp
            </a>
          </div>
        </section>
      </main>

      <footer>
        <div className="footer-brand">
          <span>ELY</span>
          <small>CONCEPT</small>
        </div>
        <div className="footer-links">
          <a href={whatsappUrl()} target="_blank" rel="noreferrer">WhatsApp</a>
          <a href={salonConfig.mapsUrl} target="_blank" rel="noreferrer">Como chegar</a>
        </div>
        <p>Feira de Santana · BA</p>
        <div className="footer-credit">Desenvolvido por <a href="https://2022victtorsilva-debug.github.io/site-yuukri/" target="_blank" rel="noreferrer">Yuukri</a></div>
      </footer>

      <a className="floating-whatsapp" href={whatsappUrl()} target="_blank" rel="noreferrer" aria-label="Agendar pelo WhatsApp">
        <IconWhatsApp /><span>Agendar</span>
      </a>
    </>
  )
}

export default App
