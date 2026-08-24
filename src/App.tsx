import { useEffect, useMemo, useState } from 'react';

const PHONE = '5579991988044';
const GENERAL_MESSAGE =
  'Olá! Vim pelo site do Instituto Layla Cerqueira e gostaria de saber mais sobre os atendimentos e agendamento.';
const WHATSAPP = `https://wa.me/${PHONE}?text=${encodeURIComponent(GENERAL_MESSAGE)}`;
const INSTAGRAM = 'https://www.instagram.com/instituto_laylacerqueira?igsi=b2Z1cDBxZ2M3cnFq';
const MAPS = 'https://maps.app.goo.gl/chpFPMTSz13WG9Uf6?g_st=ac';

const categories = ['Todos', 'Cabelos', 'Unhas', 'Cílios', 'Sobrancelhas', 'Maquiagem', 'Penteados'] as const;
type Category = (typeof categories)[number];
type ServiceCategory = Exclude<Category, 'Todos'>;

const services: Array<{ name: string; category: ServiceCategory; price?: string }> = [
  { name: 'Colorimetria', category: 'Cabelos' },
  { name: 'Mechas', category: 'Cabelos' },
  { name: 'Luzes', category: 'Cabelos' },
  { name: 'Cortes', category: 'Cabelos' },
  { name: 'Escovas', category: 'Cabelos' },
  { name: 'Tratamentos capilares', category: 'Cabelos' },
  { name: 'Mega Hair pelo método adesivado', category: 'Cabelos' },
  { name: 'Manicure e pedicure completo', category: 'Unhas', price: 'R$ 55,00' },
  { name: 'Pedicure tradicional', category: 'Unhas', price: 'R$ 35,00' },
  { name: 'Esmaltação em gel', category: 'Unhas', price: 'R$ 120,00' },
  { name: 'Esmaltação em gel nos pés', category: 'Unhas', price: 'R$ 120,00' },
  { name: 'Aplicação de gel / alongamento', category: 'Unhas', price: 'R$ 180,00' },
  { name: 'Manutenção de aplicação de gel', category: 'Unhas', price: 'R$ 100,00' },
  { name: 'Cílios', category: 'Cílios', price: 'a partir de R$ 150,00' },
  { name: 'Design de sobrancelhas', category: 'Sobrancelhas' },
  { name: 'Sobrancelha + henna', category: 'Sobrancelhas' },
  { name: 'Maquiagem profissional', category: 'Maquiagem', price: 'R$ 160,00' },
  { name: 'Penteado personalizado', category: 'Penteados', price: 'R$ 150,00' },
];

const portfolio = [
  { src: 'images/cabelo-transformacao.webp', alt: 'Cabelo longo com ondas e mechas', label: 'Cabelos' },
  { src: 'images/maquiagem-coracoes.webp', alt: 'Maquiagem com batom vermelho em ensaio com corações', label: 'Maquiagem' },
  { src: 'images/unhas-esmaltacao.webp', alt: 'Esmaltação em tom verde oliva', label: 'Unhas' },
  { src: 'images/penteado-personalizado.webp', alt: 'Penteado preso com acessórios delicados', label: 'Penteados' },
  { src: 'images/cabelo-coloracao.webp', alt: 'Cabelo claro em ondas com acabamento luminoso', label: 'Cabelos' },
  { src: 'images/maquiagem-portfolio.webp', alt: 'Maquiagem profissional em pele negra', label: 'Maquiagem' },
];

function serviceLink(name: string) {
  return `https://wa.me/${PHONE}?text=${encodeURIComponent(
    `Olá! Vim pelo site do Instituto Layla Cerqueira e gostaria de saber mais sobre o serviço de ${name}.`,
  )}`;
}

export default function Home() {
  const [activeCategory, setActiveCategory] = useState<Category>('Todos');
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const [introVisible, setIntroVisible] = useState(true);

  const filteredServices = useMemo(
    () => services.filter((service) => activeCategory === 'Todos' || service.category === activeCategory),
    [activeCategory],
  );

  useEffect(() => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    let seen: string | null = null;
    try {
      seen = window.sessionStorage.getItem('layla-beauty-reveal');
    } catch {
      // Some privacy modes disable session storage; the reveal still remains optional.
    }
    if (reduced || seen) {
      const skipTimer = window.setTimeout(() => setIntroVisible(false), 0);
      return () => window.clearTimeout(skipTimer);
    }
    const timer = window.setTimeout(() => {
      try {
        window.sessionStorage.setItem('layla-beauty-reveal', 'seen');
      } catch {
        // Keep the site usable if storage is unavailable.
      }
      setIntroVisible(false);
    }, 2750);
    return () => window.clearTimeout(timer);
  }, []);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 32);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    if (lightboxIndex === null) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setLightboxIndex(null);
      if (event.key === 'ArrowRight') setLightboxIndex((lightboxIndex + 1) % portfolio.length);
      if (event.key === 'ArrowLeft') setLightboxIndex((lightboxIndex - 1 + portfolio.length) % portfolio.length);
    };
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', onKey);
    };
  }, [lightboxIndex]);

  function chooseCare(category: Category) {
    setActiveCategory(category);
    document.getElementById('servicos')?.scrollIntoView({ behavior: 'smooth' });
  }

  function closeMenu() {
    setMenuOpen(false);
  }

  return (
    <main>
      {introVisible && (
        <div className="beauty-reveal" aria-hidden="true">
          <div className="reveal-strip reveal-hair"><img src="images/cabelo-transformacao.webp" alt="" /></div>
          <div className="reveal-strip reveal-makeup"><img src="images/maquiagem-coracoes.webp" alt="" /></div>
          <div className="reveal-strip reveal-nails"><img src="images/unhas-esmaltacao.webp" alt="" /></div>
          <div className="reveal-final"><img src="images/layla-hero.webp" alt="" /></div>
          <div className="reveal-mark"><span>INSTITUTO</span> LAYLA CERQUEIRA</div>
          <span className="reveal-stroke" />
        </div>
      )}

      <header className={`site-header ${scrolled || menuOpen ? 'is-scrolled' : ''}`}>
        <a className="wordmark" href="#inicio" aria-label="Instituto Layla Cerqueira — início" onClick={closeMenu}>
          <strong>LAYLA CERQUEIRA</strong>
          <span>Instituto de Beleza</span>
        </a>
        <nav className="desktop-nav" aria-label="Navegação principal">
          <a href="#instituto">Instituto</a>
          <a href="#servicos">Serviços</a>
          <a href="#trabalhos">Trabalhos</a>
          <a href="#avaliacoes">Avaliações</a>
          <a href="#localizacao">Localização</a>
          <a className="header-cta" href={WHATSAPP} target="_blank" rel="noreferrer">Agendar</a>
        </nav>
        <button
          className={`menu-toggle ${menuOpen ? 'is-open' : ''}`}
          type="button"
          aria-label={menuOpen ? 'Fechar menu' : 'Abrir menu'}
          aria-expanded={menuOpen}
          aria-controls="mobile-menu"
          onClick={() => setMenuOpen((value) => !value)}
        >
          <span /><span />
        </button>
      </header>

      <div className={`mobile-menu ${menuOpen ? 'is-open' : ''}`} id="mobile-menu" aria-hidden={!menuOpen}>
        <nav aria-label="Navegação mobile">
          <a href="#instituto" onClick={closeMenu}>Instituto</a>
          <a href="#servicos" onClick={closeMenu}>Serviços</a>
          <a href="#trabalhos" onClick={closeMenu}>Trabalhos</a>
          <a href="#avaliacoes" onClick={closeMenu}>Avaliações</a>
          <a href="#localizacao" onClick={closeMenu}>Localização</a>
          <a className="button button-primary" href={WHATSAPP} target="_blank" rel="noreferrer">Agendar pelo WhatsApp</a>
        </nav>
      </div>

      <section className="hero" id="inicio">
        <div className="hero-copy">
          <p className="eyebrow">Instituto de beleza · Feira de Santana</p>
          <h1>Beleza, cuidado e técnica em cada detalhe.</h1>
          <p className="hero-lead">Um espaço dedicado a valorizar sua identidade através de cuidados pensados para você.</p>
          <div className="hero-actions">
            <a className="button button-primary" href={WHATSAPP} target="_blank" rel="noreferrer">Agendar pelo WhatsApp</a>
            <a className="button button-link" href="#servicos">Conhecer serviços</a>
          </div>
        </div>
        <div className="hero-image-wrap">
          <img className="hero-image" src="images/layla-hero.webp" alt="Layla Cerqueira em retrato profissional" width="1118" height="1407" fetchPriority="high" />
          <div className="hero-caption"><span>Layla Cerqueira</span> à frente do Instituto</div>
        </div>
      </section>

      <section className="intro-section section-shell" id="instituto">
        <div>
          <p className="eyebrow dark">Cuidado que respeita quem você é</p>
          <h2>Um espaço dedicado à sua beleza.</h2>
        </div>
        <div className="intro-copy">
          <p>Do cabelo às unhas, do olhar à maquiagem, cada atendimento é uma oportunidade de valorizar sua identidade com cuidado e atenção aos detalhes.</p>
          <p>Em Feira de Santana, o Instituto reúne diferentes cuidados de beleza em um ambiente acolhedor e profissional.</p>
          <a className="text-link" href={INSTAGRAM} target="_blank" rel="noreferrer">Conhecer pelo Instagram <span aria-hidden="true">↗</span></a>
        </div>
      </section>

      <section className="care-section" aria-labelledby="care-title">
        <div className="section-heading section-shell">
          <p className="eyebrow dark">Escolha seu cuidado</p>
          <h2 id="care-title">Por onde você quer começar?</h2>
          <p>Selecione um universo para ver os atendimentos relacionados.</p>
        </div>
        <div className="care-grid section-shell">
          <button className="care-card care-hair" onClick={() => chooseCare('Cabelos')} type="button">
            <img src="images/cabelo-coloracao.webp" alt="Cabelo claro com ondas e acabamento luminoso" width="1080" height="1433" loading="lazy" />
            <span className="care-overlay"><strong>Cabelos</strong><small>Cor, corte, tratamento e finalização</small></span>
          </button>
          <button className="care-card care-nails" onClick={() => chooseCare('Unhas')} type="button">
            <img src="images/unhas-esmaltacao.webp" alt="Esmaltação em tom verde oliva" width="1080" height="935" loading="lazy" />
            <span className="care-overlay"><strong>Unhas &amp; estética</strong><small>Manicure, pedicure e gel</small></span>
          </button>
          <button className="care-card care-makeup" onClick={() => chooseCare('Maquiagem')} type="button">
            <img src="images/maquiagem-portfolio.webp" alt="Maquiagem profissional em pele negra" width="1068" height="1600" loading="lazy" />
            <span className="care-overlay"><strong>Olhar &amp; maquiagem</strong><small>Sobrancelhas, cílios e maquiagem</small></span>
          </button>
        </div>
      </section>

      <section className="services-section" id="servicos" aria-labelledby="services-title">
        <div className="section-shell">
          <div className="services-heading">
            <div><p className="eyebrow">Atendimentos</p><h2 id="services-title">Serviços para cada momento.</h2></div>
            <p>Valores exibidos somente onde foram confirmados. Para os demais atendimentos, fale diretamente com o Instituto.</p>
          </div>
          <div className="filter-scroll" role="tablist" aria-label="Filtrar serviços">
            {categories.map((category) => (
              <button
                key={category}
                type="button"
                role="tab"
                aria-selected={activeCategory === category}
                className={activeCategory === category ? 'active' : ''}
                onClick={() => setActiveCategory(category)}
              >{category}</button>
            ))}
          </div>
          <div className="services-list" aria-live="polite">
            {filteredServices.map((service) => (
              <article className="service-row" key={`${service.category}-${service.name}`}>
                <div><span>{service.category}</span><h3>{service.name}</h3></div>
                <p>{service.price ?? 'Consulte valores'}</p>
                <a href={serviceLink(service.name)} target="_blank" rel="noreferrer" aria-label={`Consultar ${service.name} pelo WhatsApp`}>Consultar <span aria-hidden="true">↗</span></a>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="portfolio-section section-shell" id="trabalhos" aria-labelledby="portfolio-title">
        <div className="portfolio-heading">
          <div><p className="eyebrow dark">Trabalhos reais</p><h2 id="portfolio-title">Beleza vista de perto.</h2></div>
          <a className="text-link" href={INSTAGRAM} target="_blank" rel="noreferrer">Ver mais no Instagram <span aria-hidden="true">↗</span></a>
        </div>
        <div className="portfolio-grid">
          {portfolio.map((item, index) => (
            <button key={item.src} className={`portfolio-item item-${index + 1}`} type="button" onClick={() => setLightboxIndex(index)} aria-label={`Ampliar trabalho de ${item.label}`}>
              <img src={item.src} alt={item.alt} loading="lazy" />
              <span>{item.label}</span>
            </button>
          ))}
        </div>
      </section>

      <section className="layla-section">
        <div className="layla-inner section-shell">
          <p className="layla-name">Layla Cerqueira</p>
          <blockquote>“Uma experiência pensada para valorizar beleza, cuidado e atendimento personalizado.”</blockquote>
          <p>À frente do Instituto, Layla dá nome a uma marca construída em torno do cuidado com cada detalhe.</p>
        </div>
      </section>

      <section className="reviews-section" id="avaliacoes" aria-labelledby="reviews-title">
        <div className="section-shell">
          <div className="reviews-heading">
            <div><p className="eyebrow">Avaliações reais</p><h2 id="reviews-title">Quem vive a experiência, conta.</h2></div>
            <a className="button button-outline" href={MAPS} target="_blank" rel="noreferrer">Ver avaliações no Google</a>
          </div>
          <div className="reviews-grid">
            <article className="review-card">
              <div className="stars" aria-label="5 de 5 estrelas">★★★★★</div>
              <blockquote>“A melhor experiência! Ambiente aconchegante, com conforto e carinho. Me sinto em casa, sem falar no Menu delicioso! Agradecer as profissionais Layla, Jeane, Sue, Lary, Nina e Kay que tornam o local agradável e proporcionam leveza e alegria, não tenho palavras pra descrever o quanto fico satisfeita com os resultados de todas. Amo muito ❤️🥰”</blockquote>
              <p>Viviane Carmo</p>
            </article>
            <article className="review-card featured-review">
              <div className="stars" aria-label="5 de 5 estrelas">★★★★★</div>
              <blockquote>“Experiência incrível! É toda uma experiência, fui muito bem recebida desde quando cheguei até a hora que fui embora. Paty fez meu cabelo e digo com propriedade, ELA ARRASAAAA.”</blockquote>
              <p>Ana Clara</p>
            </article>
          </div>
        </div>
      </section>

      <section className="location-section section-shell" id="localizacao" aria-labelledby="location-title">
        <div className="location-photo">
          <img src="images/fachada-instituto.webp" alt="Fachada do Instituto Layla Cerqueira" width="1080" height="1440" loading="lazy" />
        </div>
        <div className="location-content">
          <p className="eyebrow dark">Conheça o Instituto</p>
          <h2 id="location-title">Seu cuidado tem endereço.</h2>
          <address>
            <strong>Instituto Layla Cerqueira</strong><br />
            R. Adenil Falcão, 323 — Sala 03<br />
            Brasília, Feira de Santana — BA<br />
            44088-234
          </address>
          <div className="location-actions">
            <a className="button button-dark" href={MAPS} target="_blank" rel="noreferrer">Como chegar</a>
            <a className="text-link" href={WHATSAPP} target="_blank" rel="noreferrer">Agendar horário <span aria-hidden="true">↗</span></a>
          </div>
          <div className="hours">
            <h3>Horário de funcionamento</h3>
            <dl>
              <div><dt>Segunda</dt><dd>Fechado</dd></div>
              <div><dt>Terça a sábado</dt><dd>09:00–18:00</dd></div>
              <div><dt>Domingo</dt><dd>Fechado</dd></div>
            </dl>
          </div>
        </div>
      </section>

      <section className="final-cta">
        <div className="section-shell">
          <p className="eyebrow">Seu momento</p>
          <h2>Seu próximo cuidado começa aqui.</h2>
          <p>Fale diretamente com o Instituto e encontre o melhor horário para você.</p>
          <div>
            <a className="button button-light" href={WHATSAPP} target="_blank" rel="noreferrer">Agendar pelo WhatsApp</a>
            <a className="button button-link" href={INSTAGRAM} target="_blank" rel="noreferrer">Ver Instagram</a>
          </div>
        </div>
      </section>

      <footer>
        <div className="footer-main section-shell">
          <a className="wordmark footer-wordmark" href="#inicio"><strong>LAYLA CERQUEIRA</strong><span>Instituto de Beleza</span></a>
          <p>Feira de Santana — Bahia</p>
          <nav aria-label="Links do rodapé">
            <a href="#servicos">Serviços</a>
            <a href={INSTAGRAM} target="_blank" rel="noreferrer">Instagram</a>
            <a href={WHATSAPP} target="_blank" rel="noreferrer">WhatsApp</a>
            <a href={MAPS} target="_blank" rel="noreferrer">Localização</a>
          </nav>
        </div>
        <div className="footer-bottom section-shell"><span>© Instituto Layla Cerqueira</span><span>Site por Yuukri</span></div>
      </footer>

      <a className={`whatsapp-float ${scrolled ? 'is-visible' : ''}`} href={WHATSAPP} target="_blank" rel="noreferrer" aria-label="Agendar pelo WhatsApp">
        <span aria-hidden="true">W</span><strong>Agendar</strong>
      </a>

      {lightboxIndex !== null && (
        <div className="lightbox" role="dialog" aria-modal="true" aria-label={`Trabalho de ${portfolio[lightboxIndex].label}`} onMouseDown={(event) => event.target === event.currentTarget && setLightboxIndex(null)}>
          <button className="lightbox-close" type="button" onClick={() => setLightboxIndex(null)} aria-label="Fechar imagem">×</button>
          <button className="lightbox-arrow previous" type="button" onClick={() => setLightboxIndex((lightboxIndex - 1 + portfolio.length) % portfolio.length)} aria-label="Imagem anterior">‹</button>
          <figure><img src={portfolio[lightboxIndex].src} alt={portfolio[lightboxIndex].alt} /><figcaption>{portfolio[lightboxIndex].label}</figcaption></figure>
          <button className="lightbox-arrow next" type="button" onClick={() => setLightboxIndex((lightboxIndex + 1) % portfolio.length)} aria-label="Próxima imagem">›</button>
        </div>
      )}
    </main>
  );
}
