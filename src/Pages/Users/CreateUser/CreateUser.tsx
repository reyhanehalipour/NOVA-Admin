import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useFormik } from 'formik'
import * as yup from 'yup'
import { useAppDispatch, useAppSelector } from '../../../Redux/hooks'
import { createUserThunk } from '../../../Redux/users/usersSlice'
import type { CreateUserInput } from '../../../types/user.types'
import styled from 'styled-components'
import type { Theme } from '../../../Shared/theme/theme.types'
import { useTheme } from '../../../Shared/theme/ThemeProvider'
import { useLanguage } from '../../../Dictionary/LanguageContext'
import { ROUTES } from '../../../Routes/appRoutes'
import type { RootState } from '../../../Redux/store'

interface CreateUserFormValues {
  firstname: string
  lastname: string
  username: string
  email: string
  password: string
  phone: string
}

const CreateUserContainer = styled.div<{ $theme: Theme }>`
  max-width: 600px;
  margin: 0 auto;
  padding: 2rem;
  background-color: ${(props) => props.$theme.colors.background};
  color: ${(props) => props.$theme.colors.text};
`

const PageHeader = styled.div<{ $theme: Theme }>`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: ${(props) => props.$theme.spacing.lg};
`

const PageTitle = styled.h2<{ $theme: Theme }>`
  font-size: 1.5rem;
  font-weight: 600;
  color: ${(props) => props.$theme.colors.text};
  margin: 0;
`

const PageSubtitle = styled.p<{ $theme: Theme }>`
  font-size: 0.875rem;
  color: ${(props) => props.$theme.colors.secondary};
  margin: 0;
`

const FormCard = styled.form<{ $theme: Theme }>`
  padding: 1.5rem;
  background-color: ${(props) => props.$theme.colors.surface};
  border: 1px solid ${(props) => props.$theme.colors.border};
  border-radius: ${(props) => props.$theme.borderRadius.lg};
`

const FormGroup = styled.div<{ $theme: Theme }>`
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
  color: ${(props) => props.$theme.colors.accent};
  font-size: 0.875rem;
  text-align: center;
`

const FieldError = styled.span`
  display: block;
  color: #ef4444;
  font-size: 0.75rem;
  margin-top: 0.25rem;
`

const ButtonContainer = styled.div<{ $theme: Theme }>`
  display: flex;
  justify-content: space-between;
  margin-top: 1.5rem;
`

const SubmitButton = styled.button<{ $theme: Theme }>`
  padding: 0.5rem 1rem;
  font-size: 0.875rem;
  font-weight: 500;
  color: #ffffff;
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

const BackButton = styled.button<{ $theme: Theme }>`
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

export const CreateUserPage: React.FC = () => {
  const dispatch = useAppDispatch()
  const { dictionary } = useLanguage()
  const navigate = useNavigate()
  const { theme } = useTheme()
  const { createStatus, error } = useAppSelector((state: RootState) => state.users)

  const [submitError, setSubmitError] = useState<string | null>(null)

  const validationSchema = yup.object<CreateUserFormValues>().shape({
    firstname: yup.string().required(dictionary.requiredField),
    lastname: yup.string().required(dictionary.requiredField),
    username: yup.string().required(dictionary.requiredField),
    email: yup.string().required(dictionary.requiredField).email('ایمیل معتبر وارد کنید'),
    password: yup.string().required(dictionary.requiredField).min(6, 'رمز عبور باید حداقل ۶ کاراکتر باشد'),
    phone: yup.string().required(dictionary.requiredField),
  })

  const formik = useFormik<CreateUserFormValues>({
    initialValues: {
      firstname: '',
      lastname: '',
      username: '',
      email: '',
      password: '',
      phone: '',
    },
    validationSchema,
    onSubmit: async (values) => {
      setSubmitError(null)
      try {
        const payload: CreateUserInput = {
          email: values.email,
          username: values.username,
          password: values.password,
          name: {
            firstname: values.firstname,
            lastname: values.lastname,
          },
          phone: values.phone,
        }
        await dispatch(createUserThunk(payload)).unwrap()
        navigate(ROUTES.USERS, { replace: true })
      } catch (err: unknown) {
        if (err instanceof Error) {
          setSubmitError(err.message)
        } else {
          setSubmitError(dictionary.createUserError)
        }
      }
    },
  })

  const isLoading = createStatus === 'loading'
  const authError = error || submitError

  return (
    <CreateUserContainer $theme={theme}>
      <PageHeader $theme={theme}>
        <div>
          <PageTitle $theme={theme}>{dictionary.createUserTitle}</PageTitle>
          <PageSubtitle $theme={theme}>{dictionary.createUserSubtitle}</PageSubtitle>
        </div>
        <BackButton $theme={theme} type="button" onClick={() => navigate(ROUTES.USERS, { replace: true })}>
          {dictionary.createUserBack}
        </BackButton>
      </PageHeader>

      <FormCard $theme={theme} onSubmit={formik.handleSubmit}>
        {authError ? (
          <ErrorMessage $theme={theme}>{authError}</ErrorMessage>
        ) : null}

        <FormGroup $theme={theme}>
          <FormLabel $theme={theme} htmlFor="firstname">{dictionary.createUserFirstNameLabel}</FormLabel>
          <FormInput
            $theme={theme}
            id="firstname"
            name="firstname"
            type="text"
            value={formik.values.firstname}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            disabled={isLoading}
          />
          {formik.touched.firstname && formik.errors.firstname ? (
            <FieldError>{formik.errors.firstname}</FieldError>
          ) : null}
        </FormGroup>

        <FormGroup $theme={theme}>
          <FormLabel $theme={theme} htmlFor="lastname">{dictionary.createUserLastNameLabel}</FormLabel>
          <FormInput
            $theme={theme}
            id="lastname"
            name="lastname"
            type="text"
            value={formik.values.lastname}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            disabled={isLoading}
          />
          {formik.touched.lastname && formik.errors.lastname ? (
            <FieldError>{formik.errors.lastname}</FieldError>
          ) : null}
        </FormGroup>

        <FormGroup $theme={theme}>
          <FormLabel $theme={theme} htmlFor="username">{dictionary.createUserUsernameLabel}</FormLabel>
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
            <FieldError>{formik.errors.username}</FieldError>
          ) : null}
        </FormGroup>

        <FormGroup $theme={theme}>
          <FormLabel $theme={theme} htmlFor="email">{dictionary.createUserEmailLabel}</FormLabel>
          <FormInput
            $theme={theme}
            id="email"
            name="email"
            type="email"
            value={formik.values.email}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            disabled={isLoading}
          />
          {formik.touched.email && formik.errors.email ? (
            <FieldError>{formik.errors.email}</FieldError>
          ) : null}
        </FormGroup>

        <FormGroup $theme={theme}>
          <FormLabel $theme={theme} htmlFor="password">{dictionary.createUserPasswordLabel}</FormLabel>
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
            <FieldError>{formik.errors.password}</FieldError>
          ) : null}
        </FormGroup>

        <FormGroup $theme={theme}>
          <FormLabel $theme={theme} htmlFor="phone">{dictionary.createUserPhoneLabel}</FormLabel>
          <FormInput
            $theme={theme}
            id="phone"
            name="phone"
            type="text"
            value={formik.values.phone}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            disabled={isLoading}
          />
          {formik.touched.phone && formik.errors.phone ? (
            <FieldError>{formik.errors.phone}</FieldError>
          ) : null}
        </FormGroup>

        <ButtonContainer $theme={theme}>
          <BackButton $theme={theme} type="button" onClick={() => navigate(ROUTES.USERS, { replace: true })}>
            {dictionary.createUserBack}
          </BackButton>
          <SubmitButton $theme={theme} type="submit" disabled={isLoading || !formik.isValid}>
            {isLoading ? dictionary.loading : dictionary.createUserSubmit}
          </SubmitButton>
        </ButtonContainer>
      </FormCard>
    </CreateUserContainer>
  )
}
