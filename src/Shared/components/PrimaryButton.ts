import styled from 'styled-components'
import type { Theme } from '../theme/theme.types'

export const PrimaryButton = styled.button<{ $theme: Theme }>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  padding: 0.5rem 1rem;
  font-size: 0.875rem;
  font-weight: 500;
  color: ${(props) => props.$theme.colors.onPrimary};
  background-color: ${(props) => props.$theme.colors.activeBlue};
  border: 1px solid transparent;
  border-radius: ${(props) => props.$theme.borderRadius.md};
  cursor: pointer;
  transition: background-color 0.2s, border-color 0.2s, opacity 0.2s;

  &:hover:not(:disabled) {
    background-color: ${(props) => props.$theme.colors.activeBlueHover};
    border-color: ${(props) => props.$theme.colors.activeBlueHover};
  }

  &:active:not(:disabled) {
    background-color: ${(props) => props.$theme.colors.activeBlueActive};
    border-color: ${(props) => props.$theme.colors.activeBlueActive};
  }

  &:focus-visible {
    outline: 2px solid ${(props) => props.$theme.colors.activeBlue};
    outline-offset: 2px;
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`