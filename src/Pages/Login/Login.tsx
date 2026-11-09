import { useState } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { useFormik } from 'formik'
import * as yup from 'yup'
import { useAppDispatch, useAppSelector } from '../../Redux/hooks'
import { loginThunk } from '../../Redux/auth/authSlice'
import { ROUTES } from '../../Routes/appRoutes'
import styled from 'styled-components'
import { useLanguage } from '../../Dictionary/LanguageContext'

interface LoginFormValues {
  username: string
  password: string
}

const LoginContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: calc(100vh - 72px);
  padding: 2rem;
  background-color: ${(props) => props.theme.colors.background};
`

const LoginCard = styled.div`
  max-width: 400px;
  width: 100%;
  padding: 2rem;
  background-color: ${(props) => props.theme.colors.surface};
  border: 1px solid ${(props) => props.theme.colors.border};
  border-radius: ${(props) => props.theme.borderRadius.lg};
`

const LoginTitle = styled.h2`
  font-size: 1.5rem;
  font-weight: 600;
  color: ${(props) => props.theme.colors.text};
  margin: 0 0 0.5rem 0;
  text-align: center;
`

const LoginSubtitle = styled.p`
  font-size: 0.875rem;
  color: ${(props) => props.theme.colors.secondary};
  text-align: center;
  margin: 0 0 1.5rem 0;
`

const FormGroup = styled.div`
  margin-bottom: 1rem;
`

const FormLabel = styled.label`
  display: block;
  font-size: 0.875rem;
  font-weight: 500;
  color: ${(props) => props.theme.colors.text};
  margin-bottom: 0.5rem;
`

const FormInput = styled.input`
  width: 100%;
  padding: 0.5rem 0.75rem;
  font-size: 0.875rem;
  color: ${(props) => props.theme.colors.text};
  background-color: ${(props) => props.theme.colors.background};
  border: 1px solid ${(props) => props.theme.colors.border};
  border-radius: ${(props) => props.theme.borderRadius.md};

  &:focus {
    border-color: ${(props) => props.theme.colors.primary};
    outline: none;
  }
`

const ErrorMessage = styled.div`
  margin-bottom: 1rem;
  padding: 0.5rem 0.75rem;
  background-color: ${(props) => props.theme.colors.surface};
  border: 1px solid ${(props) => props.theme.colors.border};
  border-radius: ${(props) => props.theme.borderRadius.md};
  color: ${(props) => props.theme.colors.accent};
  font-size: 0.875rem;
  text-align: center;
`

const LoginButton = styled.button`
  width: 100%;
  padding: 0.5rem 1rem;
  font-size: 0.875rem;
  font-weight: 500;
  color: #ffffff;
  background-color: ${(props) => props.theme.colors.primary};
  border: none;
  border-radius: ${(props) => props.theme.borderRadius.md};
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
    onSubmit: async (values) => {
      setSubmitError(null)
      try {
        await dispatch(loginThunk(values)).unwrap()
        navigate(redirectTo, { replace: true })
      } catch (err: unknown) {
        if (err instanceof Error) {
          setSubmitError(err.message)
        } else {
          setSubmitError(dictionary.loginError)
        }
      }
    },
  })

  const isLoading = status === 'loading'
  const authError = error || submitError

  if (isAuthenticated) {
    navigate(redirectTo, { replace: true })
    return null
  }

  return (
    <LoginContainer>
      <LoginCard>
        <LoginTitle>{dictionary.loginTitle}</LoginTitle>
        <LoginSubtitle>{dictionary.loginSubtitle}</LoginSubtitle>
        <form onSubmit={formik.handleSubmit}>
          <FormGroup>
            <FormLabel htmlFor="username">{dictionary.usernameLabel}</FormLabel>
            <FormInput
              id="username"
              name="username"
              type="text"
              value={formik.values.username}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              disabled={isLoading}
            />
            {formik.touched.username && formik.errors.username ? (
              <span
                style={{
                  color: '#ef4444',
                  fontSize: '0.75rem',
                  marginTop: '0.25rem',
                  display: 'block',
                }}
              >
                {formik.errors.username}
              </span>
            ) : null}
          </FormGroup>
          <FormGroup>
            <FormLabel htmlFor="password">{dictionary.passwordLabel}</FormLabel>
            <FormInput
              id="password"
              name="password"
              type="password"
              value={formik.values.password}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              disabled={isLoading}
            />
            {formik.touched.password && formik.errors.password ? (
              <span
                style={{
                  color: '#ef4444',
                  fontSize: '0.75rem',
                  marginTop: '0.25rem',
                  display: 'block',
                }}
              >
                {formik.errors.password}
              </span>
            ) : null}
          </FormGroup>
          {authError ? (
            <ErrorMessage>{authError}</ErrorMessage>
          ) : null}
          <LoginButton type="submit" disabled={isLoading || !formik.isValid}>
            {isLoading ? dictionary.loading : dictionary.loginButton}
          </LoginButton>
        </form>
      </LoginCard>
    </LoginContainer>
  )
}
