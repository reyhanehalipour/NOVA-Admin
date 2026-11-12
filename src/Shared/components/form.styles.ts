import styled from 'styled-components'
import type { Theme } from '../theme/theme.types'

export const FormCard = styled.form<{ $theme: Theme }>`
  padding: 1.5rem;
  background-color: ${(props) => props.$theme.colors.surface};
  border: 1px solid ${(props) => props.$theme.colors.border};
  border-radius: ${(props) => props.$theme.borderRadius.lg};
`

export const FormGroup = styled.div<{ $theme: Theme }>`
  margin-bottom: 1rem;
`

export const FormLabel = styled.label<{ $theme: Theme }>`
  display: block;
  font-size: 0.875rem;
  font-weight: 500;
  color: ${(props) => props.$theme.colors.text};
  margin-bottom: 0.5rem;
`

export const FormInput = styled.input<{ $theme: Theme }>`
  width: 100%;
  padding: 0.5rem 0.75rem;
  font-size: 0.875rem;
  color: ${(props) => props.$theme.colors.text};
  background-color: ${(props) => props.$theme.colors.background};
  border: 1px solid ${(props) => props.$theme.colors.border};
  border-radius: ${(props) => props.$theme.borderRadius.md};

  &::placeholder {
    color: ${(props) => props.$theme.colors.secondary};
    opacity: 0.75;
  }

  &:focus {
    border-color: ${(props) => props.$theme.colors.primary};
    outline: none;
  }
`

export const FormTextarea = styled.textarea<{ $theme: Theme }>`
  width: 100%;
  padding: 0.5rem 0.75rem;
  font-size: 0.875rem;
  color: ${(props) => props.$theme.colors.text};
  background-color: ${(props) => props.$theme.colors.background};
  border: 1px solid ${(props) => props.$theme.colors.border};
  border-radius: ${(props) => props.$theme.borderRadius.md};
  resize: vertical;

  &:focus {
    border-color: ${(props) => props.$theme.colors.primary};
    outline: none;
  }
`

export const FieldError = styled.span<{ $theme: Theme }>`
  display: block;
  color: ${(props) => props.$theme.colors.error};
  font-size: 0.75rem;
  margin-top: 0.25rem;
`

export const ButtonContainer = styled.div<{ $theme: Theme }>`
  display: flex;
  justify-content: space-between;
  margin-top: 1.5rem;
`

export const BackButton = styled.button<{ $theme: Theme }>`
  padding: 0.5rem 1rem;
  font-size: 0.875rem;
  font-weight: 500;
  color: ${(props) => props.$theme.colors.text};
  background-color: transparent;
  border: 1px solid ${(props) => props.$theme.colors.border};
  border-radius: ${(props) => props.$theme.borderRadius.md};
  cursor: pointer;
  transition: background-color 0.2s;

  &:hover {
    background-color: ${(props) => props.$theme.colors.surface};
  }
`