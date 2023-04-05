import ReactDOM from 'react-dom';
import styles from './Loader.module.scss'

const Loader = ({ show }: any) => {

  if (!show) {
    return null;
  }

  return ReactDOM.createPortal(
    <div className={styles['modal-wrapper']}>
      Loading
    </div>,
    document.body
  );
};

export default Loader;
