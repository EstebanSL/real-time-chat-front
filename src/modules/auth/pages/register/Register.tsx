import { useNavigate } from 'react-router-dom';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import './Register.scss'
import { useContext } from 'react';
import { RegisterUser } from '../../services/register.services';
import { RegisterData, SignupSchema } from '../../models';
import { useFetchAndLoad } from '../../../../hooks';


export const Register = () => {
  const navigate = useNavigate();

  const { callEndpoint } = useFetchAndLoad()

  const onSubmit = async (data: RegisterData) => {
    const result = await callEndpoint(RegisterUser(data))
    console.log(result)
  };

  return (
    <div className='register-container'>
      <img className='register-container__icon' src="src/assets/app-logo.jpg" alt="app-icon" />
      <Formik
        initialValues={{
          username: '',
          email: '',
          password: '',
        }}
        validationSchema={SignupSchema}
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
                name="username"
                type="text"
                autoComplete="off"
                placeholder="Username"
              />
              {errors.username && touched.username && (
                <p className="form__error">{errors.username}</p>
              )}
            </div>
            <div className="form__item">
              <Field
                className="form__input"
                name="email"
                type="email"
                autoComplete="off"
                placeholder="Email"
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
                placeholder="Password"
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

      <p className='register-container__link' onClick={() => navigate('/login')}>Already have an account? Log In</p>
    </div>
  );
};
