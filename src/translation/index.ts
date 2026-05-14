import 'intl-pluralrules'

import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import type { Language } from '@/hooks/language/schema'

import en from './en-EN.json'
import ms from './ms-MY.json'

export const defaultNS = 'myapp'

export const resources = {
  'en-EN': en,
  'ms-MY': ms,
} as const satisfies Record<Language, unknown>

void i18n.use(initReactI18next).init({
  defaultNS,
  fallbackLng: 'ms-MY',
  lng: 'ms-MY',
  resources,
})

// add capitalization formatter
i18n.services.formatter?.add(
  'capitalize',
  (value: string) => value.charAt(0).toUpperCase() + value.slice(1).toLowerCase(),
)

export { default } from 'i18next'
