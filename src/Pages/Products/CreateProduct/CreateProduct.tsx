import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useFormik } from 'formik'
import * as yup from 'yup'
import { useAppDispatch, useAppSelector } from '../../../Redux/hooks'
import { createProductThunk, clearProductError } from '../../../Redux/products/productsSlice'
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
  FormTextarea,
  FieldError,
  ButtonContainer,
  BackButton,
} from '../../../Shared/components/form.styles'
import { toErrorMessage, resolveErrorMessage } from '../../../Utils/api/errorMessage'

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

export const CreateProductPage: React.FC = () => {
  const dispatch = useAppDispatch()
  const { dictionary } = useLanguage()
  const navigate = useNavigate()
  const { theme } = useTheme()
  const { createStatus, error } = useAppSelector((state) => state.products)

  const [submitError, setSubmitError] = useState<string | null>(null)
  const [submitSuccess, setSubmitSuccess] = useState<string | null>(null)

  useEffect(() => {
    dispatch(clearProductError())
  }, [dispatch])

  const validationSchema = yup.object<CreateProductFormValues>().shape({
    title: yup.string().required(dictionary.requiredField),
    description: yup.string().required(dictionary.requiredField),
    price: yup
      .number()
      .typeError(dictionary.pricePositive)
      .required(dictionary.requiredField)
      .positive(dictionary.pricePositive),
    category: yup.string().required(dictionary.requiredField),
    image: yup.string().required(dictionary.requiredField).url(dictionary.imageInvalid),
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
    validateOnMount: true,
    onSubmit: async (values) => {
      setSubmitError(null)
      setSubmitSuccess(null)
      try {
        await dispatch(createProductThunk({ ...values, price: Number(values.price) })).unwrap()
        setSubmitSuccess(dictionary.createProductSuccess)
        formik.resetForm()
      } catch (err: unknown) {
        setSubmitError(toErrorMessage(err))
      }
    },
  })

  const isLoading = createStatus === 'loading'
  const errorMessage = resolveErrorMessage(error || submitError, dictionary)

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
        <FormFeedback theme={theme} error={errorMessage} success={submitSuccess} />

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
            <FieldError $theme={theme}>{formik.errors.title}</FieldError>
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
            <FieldError $theme={theme}>{formik.errors.description}</FieldError>
          ) : null}
        </FormGroup>

        <FormGroup $theme={theme}>
          <FormLabel $theme={theme} htmlFor="price">{dictionary.createProductPriceLabel}</FormLabel>
          <FormInput
            $theme={theme}
            id="price"
            name="price"
            type="number"
            min="0"
            step="0.01"
            value={formik.values.price}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            disabled={isLoading}
          />
          {formik.touched.price && formik.errors.price ? (
            <FieldError $theme={theme}>{formik.errors.price}</FieldError>
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
            <FieldError $theme={theme}>{formik.errors.category}</FieldError>
          ) : null}
        </FormGroup>

        <FormGroup $theme={theme}>
          <FormLabel $theme={theme} htmlFor="image">{dictionary.createProductImageLabel}</FormLabel>
          <FormInput
            $theme={theme}
            id="image"
            name="image"
            type="text"
            placeholder={dictionary.createProductImagePlaceholder}
            value={formik.values.image}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            disabled={isLoading}
          />
          {formik.touched.image && formik.errors.image ? (
            <FieldError $theme={theme}>{formik.errors.image}</FieldError>
          ) : null}
        </FormGroup>

        <ButtonContainer $theme={theme}>
          <BackButton $theme={theme} type="button" onClick={() => navigate(ROUTES.PRODUCTS, { replace: true })}>
            {dictionary.createProductBack}
          </BackButton>
          <PrimaryButton $theme={theme} type="submit" disabled={isLoading || !formik.isValid}>
            {isLoading ? dictionary.loading : dictionary.createProductSubmit}
          </PrimaryButton>
        </ButtonContainer>
      </FormCard>
    </CreateProductContainer>
  )
}