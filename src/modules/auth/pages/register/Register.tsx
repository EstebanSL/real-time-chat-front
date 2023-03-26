import { useNavigate } from 'react-router-dom';
import { Formik, Form, Field } from 'formik';
import styles from './Register.module.scss';
import { RegisterUser } from '../../services/register.services';
import { RegisterData, SignupSchema } from '../../models';
import useFetchAndLoad from '../../../../hooks/useFetch';
import { useState, useContext } from 'react';
import Spinner from '../../../../components/spinner/Spinner';
import { AuthContext } from '../../../../context/AuthContext';

const Register = () => {
  const [isPasswordVisible, setisPasswordVisible] = useState<boolean>(false);
  const navigate = useNavigate();

  const { callEndpoint, loading } = useFetchAndLoad();
  const { login } = useContext(AuthContext)

  const onSubmit = async (data: RegisterData) => {
    const result = await callEndpoint(RegisterUser(data));
    login(result)
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
            <Form className={styles.Form}>
              <div className={styles.Form__item}>
                <i
                  className={`fa-solid fa-user ${styles.Form__item__icon}`}
                ></i>
                <Field
                  className={styles.Form__item__input}
                  name="username"
                  type="text"
                  autoComplete="off"
                  placeholder="Username"
                />
                {errors.username && touched.username && (
                  <p className={styles.Form__item__error}>{errors.username}</p>
                )}
              </div>
              <div className={styles.Form__item}>
                <i
                  className={`fa-solid fa-envelope ${styles.Form__item__icon}`}
                ></i>
                <Field
                  className={styles.Form__item__input}
                  name="email"
                  type="email"
                  autoComplete="off"
                  placeholder="Email"
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
                  className={`${styles.Form__item__input} ${styles['Form__item__input--password']}`}
                  name="password"
                  type={isPasswordVisible ? 'text' : 'password'}
                  autoComplete="off"
                  placeholder="Password"
                />
                <i
                  className={`${styles.Form__item__icon} ${styles['Form__item__icon--password']} ${
                    isPasswordVisible
                      ? 'fa-solid fa-eye'
                      : 'fa-solid fa-eye-slash'
                  }`}
                  onClick={() => setisPasswordVisible(!isPasswordVisible)}
                ></i>
                {errors.password && touched.password && (
                  <p className={styles.Form__item__error}>{errors.password}</p>
                )}
              </div>
              <button className={styles.Form__button} type="submit">
                {
                  !loading ? 'Register': <Spinner /> 
                }
              </button>
            </Form>
          )}
        </Formik>

        <p
          className={styles.Container__link}
          onClick={() => navigate('/login')}
        >
          Already have an account? Log In
        </p>
      </div>
    </div>
  );
};

export default Register;
