export const salonConfig = {
  name: 'Instituto Layla Cerqueira',
  city: 'Feira de Santana',
  state: 'BA',
  whatsapp: '5579991988044',
  phoneDisplay: '(79) 99198-8044',
  address: 'R. Adenil Falcão, 323 - Sala 03 - Brasília, Feira de Santana - BA, 44088-234',
  mapsUrl: 'https://maps.app.goo.gl/chpFPMTSz13WG9Uf6?g_st=ac',
  instagram: 'https://www.instagram.com/instituto_laylacerqueira',
  whatsappMessage:
    'Olá! Vim pelo site do Instituto Layla Cerqueira e gostaria de saber mais sobre os atendimentos e agendamento.',
} as const

export const whatsappUrl = (message: string = salonConfig.whatsappMessage) =>
  `https://wa.me/${salonConfig.whatsapp}?text=${encodeURIComponent(message)}`
