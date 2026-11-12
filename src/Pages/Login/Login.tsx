import { useState } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { useFormik } from 'formik'
import * as yup from 'yup'
import { useAppDispatch, useAppSelector } from '../../Redux/hooks'
import { loginThunk } from '../../Redux/auth/authSlice'
import styled from 'styled-components'
import { useLanguage } from '../../Dictionary/LanguageContext'
import { useTheme } from '../../Shared/theme/ThemeProvider'
import type { Theme } from '../../Shared/theme/theme.types'
import { ROUTES } from '../../Routes/appRoutes'
import { toErrorMessage, resolveErrorMessage } from '../../Utils/api/errorMessage'

interface LoginFormValues {
  username: string
  password: string
}

const LoginContainer = styled.div<{ $theme: Theme }>`
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: calc(100vh - 72px);
  padding: 2rem;
  background-color: ${(props) => props.$theme.colors.background};
`

const LoginCard = styled.div<{ $theme: Theme }>`
  max-width: 400px;
  width: 100%;
  padding: 2rem;
  background-color: ${(props) => props.$theme.colors.surface};
  border: 1px solid ${(props) => props.$theme.colors.border};
  border-radius: ${(props) => props.$theme.borderRadius.lg};
`

const LoginTitle = styled.h2<{ $theme: Theme }>`
  font-size: 1.5rem;
  font-weight: 600;
  color: ${(props) => props.$theme.colors.text};
  margin: 0 0 0.5rem 0;
  text-align: center;
`

const LoginSubtitle = styled.p<{ $theme: Theme }>`
  font-size: 0.875rem;
  color: ${(props) => props.$theme.colors.secondary};
  text-align: center;
  margin: 0 0 1.5rem 0;
`

const FormGroup = styled.div`
  margin-bottom: 1rem;
`

const FormLabel = styled.label<{ $theme: Theme }>`
  display: block;
  font-size: 0.875rem;
  font-weight: 500;
  color: ${(props) => props.$theme.colors.text};
  margin-bottom: 0.5rem;
`

const FormInput = styled.input<{ $theme: Theme }>`
  width: 100%;
  padding: 0.5rem 0.75rem;
  font-size: 0.875rem;
  color: ${(props) => props.$theme.colors.text};
  background-color: ${(props) => props.$theme.colors.background};
  border: 1px solid ${(props) => props.$theme.colors.border};
  border-radius: ${(props) => props.$theme.borderRadius.md};

  &:focus {
    border-color: ${(props) => props.$theme.colors.primary};
    outline: none;
  }
`

const ErrorMessage = styled.div<{ $theme: Theme }>`
  margin-bottom: 1rem;
  padding: 0.5rem 0.75rem;
  background-color: ${(props) => props.$theme.colors.surface};
  border: 1px solid ${(props) => props.$theme.colors.border};
  border-radius: ${(props) => props.$theme.borderRadius.md};
  color: ${(props) => props.$theme.colors.error};
  font-size: 0.875rem;
  text-align: center;
`

const FieldError = styled.span<{ $theme: Theme }>`
  display: block;
  color: ${(props) => props.$theme.colors.error};
  font-size: 0.75rem;
  margin-top: 0.25rem;
`

const LoginButton = styled.button<{ $theme: Theme }>`
  width: 100%;
  padding: 0.5rem 1rem;
  font-size: 0.875rem;
  font-weight: 500;
  color: ${(props) => props.$theme.colors.onPrimary};
  background-color: ${(props) => props.$theme.colors.primary};
  border: none;
  border-radius: ${(props) => props.$theme.borderRadius.md};
  cursor: pointer;
  transition: background-color 0.2s;

  &:hover:not(:disabled) {
    opacity: 0.9;
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
`

export const LoginPage = () => {
  const { dictionary } = useLanguage()
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const location = useLocation()
  const { theme } = useTheme()
  const { isAuthenticated, status, error } = useAppSelector((state) => state.auth)

  const [submitError, setSubmitError] = useState<string | null>(null)

  const from = location.state?.from as { pathname: string } | undefined
  const redirectTo = from?.pathname || ROUTES.DASHBOARD

  const validationSchema = yup.object<LoginFormValues>().shape({
    username: yup.string().required(dictionary.requiredField),
    password: yup.string().required(dictionary.requiredField),
  })

  const formik = useFormik<LoginFormValues>({
    initialValues: {
      username: '',
      password: '',
    },
    validationSchema,
    validateOnMount: true,
    onSubmit: async (values) => {
      setSubmitError(null)
      try {
        await dispatch(loginThunk(values)).unwrap()
        navigate(redirectTo, { replace: true })
      } catch (err: unknown) {
        setSubmitError(toErrorMessage(err))
      }
    },
  })

  const isLoading = status === 'loading'
  const errorMessage = resolveErrorMessage(error || submitError, dictionary)

  if (isAuthenticated) {
    navigate(redirectTo, { replace: true })
    return null
  }

  return (
    <LoginContainer $theme={theme}>
      <LoginCard $theme={theme}>
        <LoginTitle $theme={theme}>{dictionary.loginTitle}</LoginTitle>
        <LoginSubtitle $theme={theme}>{dictionary.loginSubtitle}</LoginSubtitle>
        <form onSubmit={formik.handleSubmit}>
          <FormGroup>
            <FormLabel $theme={theme} htmlFor="username">{dictionary.usernameLabel}</FormLabel>
            <FormInput
              $theme={theme}
              id="username"
              name="username"
              type="text"
              value={formik.values.username}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              disabled={isLoading}
            />
            {formik.touched.username && formik.errors.username ? (
              <FieldError $theme={theme}>{formik.errors.username}</FieldError>
            ) : null}
          </FormGroup>
          <FormGroup>
            <FormLabel $theme={theme} htmlFor="password">{dictionary.passwordLabel}</FormLabel>
            <FormInput
              $theme={theme}
              id="password"
              name="password"
              type="password"
              value={formik.values.password}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              disabled={isLoading}
            />
            {formik.touched.password && formik.errors.password ? (
              <FieldError $theme={theme}>{formik.errors.password}</FieldError>
            ) : null}
          </FormGroup>
          {errorMessage ? (
            <ErrorMessage $theme={theme}>{errorMessage}</ErrorMessage>
          ) : null}
          <LoginButton $theme={theme} type="submit" disabled={isLoading || !formik.isValid}>
            {isLoading ? dictionary.loading : dictionary.loginButton}
          </LoginButton>
        </form>
      </LoginCard>
    </LoginContainer>
  )
}
