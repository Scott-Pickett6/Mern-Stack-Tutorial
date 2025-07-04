import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Card, Button } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { signUp } from '../redux/actions/authActions';
import { useNavigate } from 'react-router-dom';

export default function Signup() {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const SignupSchema = Yup.object().shape({
        fullname: Yup.string().required('Full name is required'),
        email: Yup.string().email('Invalid email').required('Email is required'),
        phone: Yup.string().matches(/^[0-9]{10,15}$/, 'Phone number must be between 10 and 15 digits').required('Phone number is required'),
        password: Yup.string()
            .min(6, 'Password must be at least 6 characters')
            .required('Password is required'),
        confirmPassword: Yup.string()
            .oneOf([Yup.ref('password'), null], 'Passwords must match')
            .required('Confirm password is required'),
    });

    return (
        <Container className="d-flex justify-content-center align-items-center min-vh-100 signup-container">
            <Card className="p-4 shadow signup-card" style={{ maxWidth: 400, width: '100%' }}>
                <div className='text-center mb-3'>
                    <img
                        className='logo mb-2'
                        src='data:image/png;base64,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'
                        alt='Logo'
                        style={{ width: "120px" }}
                    />
                </div>

                <h3 className='text-center mb-3'>Sign Up</h3>

                <Formik
                    initialValues={{
                        fullname: '',
                        email: '',
                        phone: '',
                        password: '',
                        confirmPassword: ''
                    }}
                    validationSchema={SignupSchema}
                    onSubmit={async (values, {setSubmitting,  resetForm }) => {
                        console.log('Form data:', values);
                        const success = await dispatch(signUp(values));
                        if (success) {
                            resetForm();
                            navigate('/products');
                        }
                        setSubmitting(false);
                    }}
                >
                    {({ isSubmitting }) => (
                        <Form className='signup-form'>
                            <div className='mb-3'>
                                <label htmlFor='fullname' className='form-label'>Full Name</label>
                                <Field type='text' name='fullname' className='form-control' />
                                <ErrorMessage name='fullname' component='div' className='text-danger text-danger' />
                            </div>

                            <div className='mb-3'>
                                <label htmlFor='email' className='form-label'>Email</label>
                                <Field type='email' name='email' className='form-control' />
                                <ErrorMessage name='email' component='div' className='text-danger text-danger' />
                            </div>

                            <div className='mb-3'>
                                <label htmlFor='phone' className='form-label'>Phone Number</label>
                                <Field type='text' name='phone' className='form-control' />
                                <ErrorMessage name='phone' component='div' className='text-danger text-danger' />
                            </div>

                            <div className='mb-3'>
                                <label htmlFor='password' className='form-label'>Password</label>
                                <Field type='password' name='password' className='form-control' />
                                <ErrorMessage name='password' component='div' className='text-danger text-danger' />
                            </div>

                            <div className='mb-3'>
                                <label htmlFor='confirmPassword' className='form-label'>Confirm Password</label>
                                <Field type='password' name='confirmPassword' className='form-control' />
                                <ErrorMessage name='confirmPassword' component='div' className='text-danger text-danger' />
                            </div>

                            <Button type="submit" disabled={isSubmitting} className="w-100">
                                {isSubmitting ? 'Signing Up...' : 'Sign Up'}
                            </Button>
                        </Form>
                    )}
                </Formik>
                <div className='text-center mt-3'>
                    <p>Already have an account? <a href="/login">Login</a></p>
                </div>
            </Card>
        </Container>
    )
}