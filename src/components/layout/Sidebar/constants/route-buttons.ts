import { Lock, Scroll, User } from 'phosphor-react-native'

import { ROUTES } from '@/utils/constants/routes'

export const ROUTE_BUTTONS = [
  {
    title: 'Meu cadastro',
    icon: User,
    route: ROUTES.profile,
  },
  {
    title: 'Politicas de privacidade',
    icon: Lock,
    route: ROUTES.privacyPolicy,
  },
  {
    title: 'Termos e condições',
    icon: Scroll,
    route: ROUTES.termsAndConditions,
  },
  {
    title: 'Sobre a Sertton Industrial',
    icon: User,
    route: ROUTES.about,
  },
]
