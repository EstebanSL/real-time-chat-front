import { Field, Form, Formik } from 'formik';
import ReactDOM from 'react-dom';
import Spinner from '../../../../../components/spinner/Spinner';
import styles from './AddContactModal.module.scss';
import * as Yup from 'yup';
import useFetchAndLoad from '../../../../../hooks/useFetch';
import { addContact } from '../../services/contacts-data.service';
import { showSuccessToast } from '../../../../../utilities';

const contactSchema = Yup.object().shape({
  email: Yup.string().email('Invalid email').required('Required'),
});

const AddContactModal = ({ show, onCloseButtonClick, getContacts }: any) => {
  const { callEndpoint, loading } = useFetchAndLoad();

  const onSubmit = async (data: any) => {
    await callEndpoint(addContact(data));
    getContacts()
    showSuccessToast('Added successfully')
    onCloseButtonClick();
  };

  if (!show) {
    return null;
  }

  return ReactDOM.createPortal(
    <div className={styles['modal-wrapper']}>
      <div className={styles["modal-body"]}>
        <h2>Add Contact</h2>
        <Formik
          initialValues={{
            email: '',
          }}
          validationSchema={contactSchema}
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
              <button className={styles.Form__button} type="submit">
                {!loading ? 'Add' : <Spinner />}
              </button>
              <button className={styles.Form__button} type="button" onClick={() => onCloseButtonClick()}>
                Cancel
              </button>
            </Form>
          )}
        </Formik>
      </div>
    </div>,
    document.body
  );
};

export default AddContactModal;
