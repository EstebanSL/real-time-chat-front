import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import './Login.scss';

const loginSchema = Yup.object().shape({
  email: Yup.string().email('Invalid email').required('Required'),
  password: Yup.string()
    .min(2, 'Too Short!')
    .max(50, 'Too Long!')
    .required('Required'),
});

const Login = () => {
  const navigate = useNavigate();

  const onSubmit = async (data: any) => {
    try {
      console.log(data)
    } catch (error) {
      
    }
  };

  return (
    <div className="login-container">
      <img
        className="login-container__icon"
        src="src/assets/app-logo.jpg"
        alt="app-icon"
      />
      <Formik
        initialValues={{
          email: '',
          password: '',
        }}
        validationSchema={loginSchema}
        onSubmit={(values) => {
          // same shape as initial values
          onSubmit(values);
        }}
      >
        {({ errors, touched }) => (
          <Form className="login-container__form">
            <div className="form__item">
              <Field
                className="form__input"
                name="email"
                type="email"
                autoComplete="off"
                placeholder="email"
              />
              {errors.email && touched.email && (
                <p className="form__error">{errors.email}</p>
              )}
            </div>
            <div className="form__item">
              <Field
                className="form__input"
                name="password"
                type="password"
                autoComplete="off"
                placeholder="password"
              />
              {errors.password && touched.password && (
                <p className="form__error">{errors.password}</p>
              )}
            </div>
            <button className="form__button" type="submit">
              Submit
            </button>
          </Form>
        )}
      </Formik>
      <p
        className="login-container__link"
        onClick={() => navigate('/register')}
      >
        Don´t have an account? Register
      </p>
    </div>
  );
};

export default Login