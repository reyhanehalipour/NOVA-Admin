import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useFormik } from 'formik'
import * as yup from 'yup'
import { useAppDispatch, useAppSelector } from '../../../Redux/hooks'
import { createUserThunk, clearUserError } from '../../../Redux/users/usersSlice'
import type { CreateUserInput } from '../../../types/user.types'
import styled from 'styled-components'
import type { Theme } from '../../../Shared/theme/theme.types'
import { useTheme } from '../../../Shared/theme/ThemeProvider'
import { useLanguage } from '../../../Dictionary/LanguageContext'
import { ROUTES } from '../../../Routes/appRoutes'
import { PrimaryButton } from '../../../Shared/components/PrimaryButton'
import { FormFeedback } from '../../../Shared/components/FormFeedback'
import {
  FormCard,
  FormGroup,
  FormLabel,
  FormInput,
  FieldError,
  ButtonContainer,
  BackButton,
} from '../../../Shared/components/form.styles'
import { toErrorMessage, resolveErrorMessage } from '../../../Utils/api/errorMessage'

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

export const CreateUserPage: React.FC = () => {
  const dispatch = useAppDispatch()
  const { dictionary } = useLanguage()
  const navigate = useNavigate()
  const { theme } = useTheme()
  const { createStatus, error } = useAppSelector((state) => state.users)

  const [submitError, setSubmitError] = useState<string | null>(null)
  const [submitSuccess, setSubmitSuccess] = useState<string | null>(null)

  useEffect(() => {
    dispatch(clearUserError())
  }, [dispatch])

  const validationSchema = yup.object<CreateUserFormValues>().shape({
    firstname: yup.string().required(dictionary.requiredField),
    lastname: yup.string().required(dictionary.requiredField),
    username: yup.string().required(dictionary.requiredField),
    email: yup.string().required(dictionary.requiredField).email(dictionary.emailInvalid),
    password: yup.string().required(dictionary.requiredField).min(6, dictionary.passwordMin),
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
    validateOnMount: true,
    onSubmit: async (values) => {
      setSubmitError(null)
      setSubmitSuccess(null)
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
      try {
        await dispatch(createUserThunk(payload)).unwrap()
        setSubmitSuccess(dictionary.createUserSuccess)
        formik.resetForm()
      } catch (err: unknown) {
        setSubmitError(toErrorMessage(err))
      }
    },
  })

  const isLoading = createStatus === 'loading'
  const errorMessage = resolveErrorMessage(error || submitError, dictionary)

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
        <FormFeedback theme={theme} error={errorMessage} success={submitSuccess} />

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
            <FieldError $theme={theme}>{formik.errors.firstname}</FieldError>
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
            <FieldError $theme={theme}>{formik.errors.lastname}</FieldError>
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
            <FieldError $theme={theme}>{formik.errors.username}</FieldError>
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
            <FieldError $theme={theme}>{formik.errors.email}</FieldError>
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
            <FieldError $theme={theme}>{formik.errors.password}</FieldError>
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
            <FieldError $theme={theme}>{formik.errors.phone}</FieldError>
          ) : null}
        </FormGroup>

        <ButtonContainer $theme={theme}>
          <BackButton $theme={theme} type="button" onClick={() => navigate(ROUTES.USERS, { replace: true })}>
            {dictionary.createUserBack}
          </BackButton>
          <PrimaryButton $theme={theme} type="submit" disabled={isLoading || !formik.isValid}>
            {isLoading ? dictionary.loading : dictionary.createUserSubmit}
          </PrimaryButton>
        </ButtonContainer>
      </FormCard>
    </CreateUserContainer>
  )
}