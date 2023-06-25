import { Field, Form, Formik } from 'formik';
import ReactDOM from 'react-dom';
import Spinner from '../../../../../components/spinner/Spinner';
import styles from './AddRoomModal.module.scss';
import * as Yup from 'yup';
import useFetchAndLoad from '../../../../../hooks/useFetch';
import { showSuccessToast } from '../../../../../utilities';
import { socket } from '../../../../../socket';
import { useContext } from 'react';
import { AuthContext } from '../../../../../context/AuthContext';
import { addRoom } from '../../services/rooms-data.service';

const contactSchema = Yup.object().shape({
  name: Yup.string().required('Required'),
});

const AddRoomModal = ({ show, onCloseButtonClick, getContacts }: any) => {
  const { callEndpoint, loading } = useFetchAndLoad();
  const { user } = useContext(AuthContext) 

  const onSubmit = async (data: any) => {    
    const roomBody = {
      owner: user._id,
      users: [user._id],
      name: data.name
    }
    const { data: roomData } = await callEndpoint(addRoom(roomBody));
    // socket.emit('addContact', {adder: user, added: roomData});
    showSuccessToast('Added successfully')
    onCloseButtonClick();
  };

  if (!show) {
    return null;
  }

  return ReactDOM.createPortal(
    <div className={styles['modal-wrapper']}>
      <div className={styles["modal-body"]}>
        <h2>Add Room</h2>
        <Formik
          initialValues={{
            name: '',
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
                  name="name"
                  type="text"
                  autoComplete="off"
                  placeholder="name"
                />
                {errors.name && touched.name && (
                  <p className={styles.Form__item__error}>{errors.name}</p>
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

export default AddRoomModal;
