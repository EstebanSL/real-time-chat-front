import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import './Login.module.scss';
import { AuthContext } from '../../../../context/AuthContext';
import styles from './Login.module.scss';
import Spinner from '../../../../components/spinner/Spinner';
import useFetchAndLoad from '../../../../hooks/useFetch';
import { LoginUser } from '../../services/login.service';

const loginSchema = Yup.object().shape({
  email: Yup.string().email('Invalid email').required('Required'),
  password: Yup.string()
    .min(2, 'Too Short!')
    .max(50, 'Too Long!')
    .required('Required'),
});

const Login = () => {
  const { callEndpoint, loading } = useFetchAndLoad();

  const navigate = useNavigate();

  const { login } = useContext(AuthContext);

  const onSubmit = async (data: any) => {
    const result = await callEndpoint(LoginUser(data));
    login(result);
  };

  return (
    <div className={styles.Page}>
      <div className={styles.Container}>
        <img
          className={styles.Container__icon}
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
            onSubmit(values);
          }}
        >
          {({ errors, touched }) => (
            <Form className={styles.Form}>
              <div className={styles.Form__item}>
                <i
                  className={`fa-solid fa-envelope ${styles.Form__item__icon}`}
                ></i>
                <Field
                  className={styles.Form__item__input}
                  name="email"
                  type="email"
                  autoComplete="off"
                  placeholder="email"
                />
                {errors.email && touched.email && (
                  <p className={styles.Form__item__error}>{errors.email}</p>
                )}
              </div>
              <div className={styles.Form__item}>
                <i
                  className={`fa-solid fa-lock ${styles.Form__item__icon}`}
                ></i>
                <Field
                  className={styles.Form__item__input}
                  name="password"
                  type="password"
                  autoComplete="off"
                  placeholder="password"
                />
                {errors.password && touched.password && (
                  <p className={styles.Form__item__error}>{errors.password}</p>
                )}
              </div>
              <button className={styles.Form__button} type="submit">
                {!loading ? 'Login' : <Spinner />}
              </button>
            </Form>
          )}
        </Formik>
        <p
          className={styles.Container__link}
          onClick={() => navigate('/register')}
        >
          Don´t have an account? Register
        </p>
      </div>
    </div>
  );
};

export default Login;
