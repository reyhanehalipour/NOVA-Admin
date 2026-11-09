import { Language } from '../types/Enums/Language.enum'
import { faDictionary } from './fa'
import { enDictionary } from './en'
import type { Dictionary } from './dictionary.types'

export { faDictionary, enDictionary }
export type { Dictionary, Language }

export const getDictionary = (language: typeof Language[keyof typeof Language]): Dictionary => {
  if (language === Language.EN) {
    return enDictionary
  }
  return faDictionary
}
