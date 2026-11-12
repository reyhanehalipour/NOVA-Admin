import styled from 'styled-components'
import type { Theme } from '../theme/theme.types'

const FeedbackBox = styled.div<{ $theme: Theme; $success: boolean }>`
  margin-bottom: 1rem;
  padding: 0.5rem 0.75rem;
  background-color: ${(props) => props.$theme.colors.surface};
  border: 1px solid ${(props) => (props.$success ? props.$theme.colors.success : props.$theme.colors.error)};
  border-radius: ${(props) => props.$theme.borderRadius.md};
  color: ${(props) => (props.$success ? props.$theme.colors.success : props.$theme.colors.error)};
  font-size: 0.875rem;
  text-align: center;
`

interface FormFeedbackProps {
  theme: Theme
  error?: string | null
  success?: string | null
}

export const FormFeedback: React.FC<FormFeedbackProps> = ({ theme, error, success }) => {
  if (error) {
    return <FeedbackBox $theme={theme} $success={false}>{error}</FeedbackBox>
  }
  if (success) {
    return <FeedbackBox $theme={theme} $success>{success}</FeedbackBox>
  }
  return null
}