import * as Yup from 'yup';


export const signUpSchema = Yup.object().shape({
    name: Yup.string().required('Name is required'),
    email: Yup.string().email('Invalid email').required('Email is required'),
    password: Yup.string().required('Password is required').min(6, 'Password must be at least 6 characters').max(20, 'Password must be at most 20 characters'),
   
})

export type SignUpFormData = Yup.InferType<typeof signUpSchema>