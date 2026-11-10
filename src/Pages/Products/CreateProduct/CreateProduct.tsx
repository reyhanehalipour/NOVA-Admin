import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useFormik } from 'formik'
import * as yup from 'yup'
import { useAppDispatch, useAppSelector } from '../../../Redux/hooks'
import { createProductThunk } from '../../../Redux/products/productsSlice'
import styled from 'styled-components'
import type { Theme } from '../../../Shared/theme/theme.types'
import { useTheme } from '../../../Shared/theme/ThemeProvider'
import { useLanguage } from '../../../Dictionary/LanguageContext'
import { ROUTES } from '../../../Routes/appRoutes'

interface CreateProductFormValues {
  title: string
  description: string
  price: number
  category: string
  image: string
}

const CreateProductContainer = styled.div<{ $theme: Theme }>`
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

const FormTextarea = styled.textarea<{ $theme: Theme }>`
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

export const CreateProductPage: React.FC = () => {
  const dispatch = useAppDispatch()
  const { dictionary } = useLanguage()
  const navigate = useNavigate()
  const { theme } = useTheme()
  const { createStatus, error } = useAppSelector((state) => state.products)

  const [submitError, setSubmitError] = useState<string | null>(null)

  const validationSchema = yup.object<CreateProductFormValues>().shape({
    title: yup.string().required(dictionary.requiredField),
    description: yup.string().required(dictionary.requiredField),
    price: yup.number().required(dictionary.requiredField).positive('قیمت باید عدد مثبت باشد'),
    category: yup.string().required(dictionary.requiredField),
    image: yup.string().required(dictionary.requiredField),
  })

  const formik = useFormik<CreateProductFormValues>({
    initialValues: {
      title: '',
      description: '',
      price: 0,
      category: '',
      image: '',
    },
    validationSchema,
    onSubmit: async (values) => {
      setSubmitError(null)
      try {
        await dispatch(createProductThunk(values)).unwrap()
        navigate(ROUTES.PRODUCTS, { replace: true })
      } catch (err: unknown) {
        if (err instanceof Error) {
          setSubmitError(err.message)
        } else {
          setSubmitError(dictionary.createProductError)
        }
      }
    },
  })

  const isLoading = createStatus === 'loading'
  const authError = error || submitError

  return (
    <CreateProductContainer $theme={theme}>
      <PageHeader $theme={theme}>
        <div>
          <PageTitle $theme={theme}>{dictionary.createProductTitle}</PageTitle>
          <PageSubtitle $theme={theme}>{dictionary.createProductSubtitle}</PageSubtitle>
        </div>
        <BackButton $theme={theme} type="button" onClick={() => navigate(ROUTES.PRODUCTS, { replace: true })}>
          {dictionary.createProductBack}
        </BackButton>
      </PageHeader>

      <FormCard $theme={theme} onSubmit={formik.handleSubmit}>
        {authError ? (
          <ErrorMessage $theme={theme}>{authError}</ErrorMessage>
        ) : null}

        <FormGroup $theme={theme}>
          <FormLabel $theme={theme} htmlFor="title">{dictionary.createProductTitleLabel}</FormLabel>
          <FormInput
            $theme={theme}
            id="title"
            name="title"
            type="text"
            value={formik.values.title}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            disabled={isLoading}
          />
          {formik.touched.title && formik.errors.title ? (
            <FieldError>{formik.errors.title}</FieldError>
          ) : null}
        </FormGroup>

        <FormGroup $theme={theme}>
          <FormLabel $theme={theme} htmlFor="description">{dictionary.createProductDescriptionLabel}</FormLabel>
          <FormTextarea
            $theme={theme}
            id="description"
            name="description"
            rows={4}
            value={formik.values.description}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            disabled={isLoading}
          />
          {formik.touched.description && formik.errors.description ? (
            <FieldError>{formik.errors.description}</FieldError>
          ) : null}
        </FormGroup>

        <FormGroup $theme={theme}>
          <FormLabel $theme={theme} htmlFor="price">{dictionary.createProductPriceLabel}</FormLabel>
          <FormInput
            $theme={theme}
            id="price"
            name="price"
            type="number"
            value={formik.values.price}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            disabled={isLoading}
          />
          {formik.touched.price && formik.errors.price ? (
            <FieldError>{formik.errors.price}</FieldError>
          ) : null}
        </FormGroup>

        <FormGroup $theme={theme}>
          <FormLabel $theme={theme} htmlFor="category">{dictionary.createProductCategoryLabel}</FormLabel>
          <FormInput
            $theme={theme}
            id="category"
            name="category"
            type="text"
            value={formik.values.category}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            disabled={isLoading}
          />
          {formik.touched.category && formik.errors.category ? (
            <FieldError>{formik.errors.category}</FieldError>
          ) : null}
        </FormGroup>

        <FormGroup $theme={theme}>
          <FormLabel $theme={theme} htmlFor="image">{dictionary.createProductImageLabel}</FormLabel>
          <FormInput
            $theme={theme}
            id="image"
            name="image"
            type="text"
            value={formik.values.image}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            disabled={isLoading}
          />
          {formik.touched.image && formik.errors.image ? (
            <FieldError>{formik.errors.image}</FieldError>
          ) : null}
        </FormGroup>

        <ButtonContainer $theme={theme}>
          <BackButton $theme={theme} type="button" onClick={() => navigate(ROUTES.PRODUCTS, { replace: true })}>
            {dictionary.createProductBack}
          </BackButton>
          <SubmitButton $theme={theme} type="submit" disabled={isLoading || !formik.isValid}>
            {isLoading ? dictionary.loading : dictionary.createProductSubmit}
          </SubmitButton>
        </ButtonContainer>
      </FormCard>
    </CreateProductContainer>
  )
}
