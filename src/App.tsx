import { useEffect, useId, useState } from 'react'
import { salonConfig, whatsappUrl } from './config'

const ASSET = `${import.meta.env.BASE_URL}assets/`

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
      elements.forEach((el) => el.classList.add('is-visible'))
      return
    }
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((entry) => entry.isIntersecting && entry.target.classList.add('is-visible')),
      { threshold: 0.15, rootMargin: '0px 0px -7% 0px' },
    )
    elements.forEach((el) => observer.observe(el))
    return () => observer.disconnect()
  }, [])
}

function Intro() {
  const [visible, setVisible] = useState(() => {
    try { return sessionStorage.getItem('ely-intro-seen') !== '1' } catch { return true }
  })

  useEffect(() => {
    if (!visible) return
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const timer = window.setTimeout(() => {
      setVisible(false)
      try { sessionStorage.setItem('ely-intro-seen', '1') } catch { /* noop */ }
    }, reduced ? 80 : 1050)
    return () => window.clearTimeout(timer)
  }, [visible])

  if (!visible) return null
  return <div className="intro" aria-hidden="true"><span>ELY</span><i></i><span>CONCEPT</span></div>
}

function Header() {
  const [open, setOpen] = useState(false)
  const menuId = useId()
  const links = [
    ['Transformações', '#transformacoes'], ['Serviços', '#servicos'], ['Experiência', '#experiencia'], ['Localização', '#localizacao'],
  ]
  return (
    <header className="site-header">
      <a className="brand" href="#inicio" aria-label="Ely Concept — início"><span>ELY</span><small>CONCEPT</small></a>
      <nav className="desktop-nav" aria-label="Navegação principal">
        {links.map(([label, href]) => <a key={href} href={href}>{label}</a>)}
      </nav>
      <a className="header-cta" href={whatsappUrl()} target="_blank" rel="noreferrer">Agendar <IconArrow /></a>
      <button className="menu-button" type="button" aria-expanded={open} aria-controls={menuId} aria-label={open ? 'Fechar menu' : 'Abrir menu'} onClick={() => setOpen((v) => !v)}>
        <span></span><span></span>
      </button>
      <div className={`mobile-menu ${open ? 'is-open' : ''}`} id={menuId} aria-hidden={!open}>
        {links.map(([label, href]) => <a key={href} href={href} onClick={() => setOpen(false)}>{label}</a>)}
        <a className="mobile-whatsapp" href={whatsappUrl()} target="_blank" rel="noreferrer">Agendar pelo WhatsApp <IconArrow /></a>
      </div>
    </header>
  )
}

function App() {
  useReveal()
  return (
    <>
      <Intro />
      <Header />
      <main>
        <section className="hero" id="inicio" aria-labelledby="hero-title">
          <div className="hero-copy">
            <div className="hero-kicker">Feira de Santana · Bahia</div>
            <h1 id="hero-title">Beleza com <em>presença.</em></h1>
            <p>Uma experiência de beleza para valorizar cabelos, detalhes e cada escolha que transforma o seu estilo.</p>
            <div className="hero-actions">
              <a className="button button-gold" href={whatsappUrl()} target="_blank" rel="noreferrer">Agendar horário <IconArrow /></a>
              <a className="text-link" href="#transformacoes">Ver transformações <span>↓</span></a>
            </div>
            <div className="hero-signature" aria-hidden="true">ELY <span>—</span> CONCEPT</div>
          </div>
          <figure className="hero-media">
            <img src={`${ASSET}hero-blonde.avif`} width="760" height="1005" alt="Cabelo loiro longo com ondas e acabamento luminoso" fetchPriority="high" />
            <figcaption><span>01</span> Textura, luz e movimento</figcaption>
          </figure>
        </section>

        <section className="specialty" aria-labelledby="specialty-title">
          <div className="specialty-index" data-reveal>01 / Especialidade</div>
          <div className="specialty-copy" data-reveal>
            <p className="eyebrow">{salonConfig.specialtyLabel}</p>
            <h2 id="specialty-title">Loiros que deixam a <em>luz</em> fazer parte do resultado.</h2>
            <p>Cor, contraste e acabamento ganham protagonismo em uma leitura sofisticada do loiro — do detalhe ao movimento completo do cabelo.</p>
          </div>
          <div className="specialty-rule" aria-hidden="true"></div>
        </section>

        <section className="portfolio" id="transformacoes" aria-labelledby="portfolio-title">
          <div className="portfolio-heading" data-reveal>
            <p className="eyebrow">Transformações & detalhes</p>
            <h2 id="portfolio-title">O trabalho fala primeiro.</h2>
            <p>Uma seleção visual do universo Ely Concept, com cabelos em escala e detalhes que ampliam a experiência de beleza.</p>
          </div>
          <div className="editorial-grid">
            <figure className="work work-main" data-reveal>
              <img src={`${ASSET}blonde-detail.avif`} width="640" height="1084" loading="lazy" alt="Cabelo loiro com mechas e ondas visto de costas dentro do salão" />
              <figcaption><span>Hair</span><b>Loiros em foco</b></figcaption>
            </figure>
            <figure className="work work-color" data-reveal>
              <img src={`${ASSET}nails-color.avif`} width="600" height="793" loading="lazy" alt="Unhas em tons rosa, lilás e azul com acabamento brilhante" />
              <figcaption><span>Detail</span><b>Cor em contraste</b></figcaption>
            </figure>
            <div className="portfolio-note" data-reveal><span>ELY / 02</span><p>Da transformação maior ao detalhe mais preciso, cada imagem constrói a identidade do espaço.</p></div>
            <figure className="work work-red" data-reveal>
              <img src={`${ASSET}nails-red-gold.avif`} width="600" height="659" loading="lazy" alt="Unhas vermelhas com detalhes dourados" />
              <figcaption><span>Detail</span><b>Vermelho & dourado</b></figcaption>
            </figure>
          </div>
        </section>

        <section className="services" id="servicos" aria-labelledby="services-title">
          <div className="services-intro" data-reveal>
            <p className="eyebrow">Serviços</p>
            <h2 id="services-title">Escolha o que quer viver. Os detalhes, a gente conversa.</h2>
            <p>Cabelos, loiros e unhas aparecem em destaque na Ely Concept. Para opções, disponibilidade e valores, fale diretamente com o salão.</p>
            <a className="text-link light" href={whatsappUrl('Olá! Vim pelo site da Ely Concept e gostaria de conhecer os serviços e horários disponíveis.')} target="_blank" rel="noreferrer">Consultar serviços <IconArrow /></a>
          </div>
          <div className="service-lines" data-reveal>
            <a href={whatsappUrl('Olá! Vim pelo site da Ely Concept e gostaria de saber mais sobre atendimento para cabelos e loiros.')} target="_blank" rel="noreferrer"><span>01</span><h3>Cabelos & Loiros</h3><p>Informações e disponibilidade</p><IconArrow /></a>
            <a href={whatsappUrl('Olá! Vim pelo site da Ely Concept e gostaria de saber mais sobre atendimento para unhas.')} target="_blank" rel="noreferrer"><span>02</span><h3>Unhas</h3><p>Informações e disponibilidade</p><IconArrow /></a>
          </div>
        </section>

        <section className="experience" id="experiencia" aria-labelledby="experience-title">
          <div className="experience-line" aria-hidden="true">ELY CONCEPT · ELY CONCEPT · ELY CONCEPT</div>
          <div className="experience-inner">
            <div className="experience-number" data-reveal>03</div>
            <div className="experience-copy" data-reveal>
              <p className="eyebrow">Experiência Ely Concept</p>
              <h2 id="experience-title">Beleza não precisa de excesso para ser marcante.</h2>
              <p>Uma experiência de beleza pode ser marcante sem excesso: atenção ao acabamento, protagonismo do resultado e um contato simples para transformar vontade em agendamento.</p>
            </div>
            <blockquote data-reveal>“Seu próximo resultado começa em uma conversa.”</blockquote>
          </div>
        </section>

        <section className="about" aria-labelledby="about-title">
          <div className="about-title" data-reveal><p className="eyebrow">Sobre</p><h2 id="about-title">Ely Concept,<br/>em Feira de Santana.</h2></div>
          <div className="about-copy" data-reveal><p>Uma presença de beleza com endereço no centro de Feira de Santana e contato direto para informações e agendamento.</p><p><strong>Ely Concept</strong> coloca cabelos, loiros e detalhes em primeiro plano, com uma comunicação elegante, direta e próxima.</p></div>
        </section>

        <section className="location" id="localizacao" aria-labelledby="location-title">
          <figure className="location-image" data-reveal>
            <img src={`${ASSET}facade.avif`} width="700" height="490" loading="lazy" alt="Fachada real do espaço associado à Ely Concept em Feira de Santana" />
            <figcaption>Registro real do espaço</figcaption>
          </figure>
          <div className="location-content" data-reveal>
            <p className="eyebrow">Onde encontrar</p>
            <h2 id="location-title">No centro de Feira.</h2>
            <address>{salonConfig.address}</address>
            <div className="rating" aria-label={`${salonConfig.googleRating} de 5 no Google, ${salonConfig.googleReviewCount} avaliações`}><strong>{salonConfig.googleRating}</strong><span>★★★★★</span><small>{salonConfig.googleReviewCount} avaliações no Google</small></div>
            <div className="location-actions">
              <a className="button button-dark" href={salonConfig.mapsUrl} target="_blank" rel="noreferrer">Abrir rota <IconArrow /></a>
              <a className="text-link" href={`tel:+${salonConfig.whatsapp}`}>{salonConfig.phoneDisplay}</a>
            </div>
          </div>
        </section>

        <section className="final-cta" aria-labelledby="final-title">
          <p className="eyebrow" data-reveal>Seu próximo horário</p>
          <h2 id="final-title" data-reveal>Quando quiser mudar,<br/><em>comece por aqui.</em></h2>
          <a className="button button-gold" data-reveal href={whatsappUrl()} target="_blank" rel="noreferrer"><IconWhatsApp /> Agendar pelo WhatsApp <IconArrow /></a>
        </section>
      </main>

      <footer>
        <div className="footer-brand"><span>ELY</span><small>CONCEPT</small></div>
        <div className="footer-meta"><p>Feira de Santana · BA</p><a href={whatsappUrl()} target="_blank" rel="noreferrer">WhatsApp</a><a href={salonConfig.mapsUrl} target="_blank" rel="noreferrer">Como chegar</a></div>
        <div className="footer-credit">Desenvolvido por <a href="https://2022victtorsilva-debug.github.io/site-yuukri/" target="_blank" rel="noreferrer">Yuukri</a></div>
      </footer>

      <a className="floating-whatsapp" href={whatsappUrl()} target="_blank" rel="noreferrer" aria-label="Agendar pelo WhatsApp"><IconWhatsApp /><span>Agendar</span></a>
    </>
  )
}

export default App
