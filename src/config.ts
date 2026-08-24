export const salonConfig = {
  name: 'Ely Concept',
  city: 'Feira de Santana',
  state: 'BA',
  whatsapp: '5575991113955',
  phoneDisplay: '(75) 99111-3955',
  address: 'R. Barão do Rio Branco - Centro, Feira de Santana - BA, 44001-205',
  mapsUrl:
    'https://www.google.com/maps/search/?api=1&query=Ely%20Concept%20Feira%20de%20Santana%20BA',
  googleRating: '4,7',
  googleReviewCount: 49,
  instagram: '',
  specialtyLabel: 'Eliene Novais — Rainha dos Loiros',
  whatsappMessage:
    'Olá! Vim pelo site da Ely Concept e gostaria de saber mais sobre agendamento.',
} as const

export const whatsappUrl = (message: string = salonConfig.whatsappMessage) =>
  `https://wa.me/${salonConfig.whatsapp}?text=${encodeURIComponent(message)}`
