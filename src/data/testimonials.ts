export type Testimonial = {
  id: string;
  name: string;
  role: string;
  avatar?: string;
  quote: string;
};

export const testimonials: Testimonial[] = [
  {
    id: 't1',
    name: 'Elisa Verdi',
    role: 'PM @ StartupX',
    quote: 'Manuel ha portato il nostro prodotto ad un nuovo livello: performance top e UX curata.'
  },
  {
    id: 't2',
    name: 'Marco Neri',
    role: 'CTO @ DevCo',
    quote: 'Precisione, velocità e comunicazione chiara. Consigliatissimo.'
  }
]