import * as z from 'zod'

export enum SupportedLanguages {
  EN_EN = 'en-EN',
  MS_MY = 'ms-MY',
}

export const languageSchema = z.enum([SupportedLanguages.EN_EN, SupportedLanguages.MS_MY])

export type Language = z.infer<typeof languageSchema>
