import { useContext, useState } from 'react';
import { doc, deleteDoc } from 'firebase/firestore';

import { db, getPass } from '../../services/firebase';

import { NotificationContext } from '../../context/NotificationContext';

import './notification.css';

const Notification = () => {
  const { notification, setNotification, style, setMessage, itemId } =
    useContext(NotificationContext);
  const [dataPass, setDataPass] = useState('');
  const [pass, setPass] = useState('');

  if (notification.message === '') {
    return null;
  }

  getPass().then((data) => setDataPass(data));

  const deleteItem = async () => {
    if (pass !== dataPass || pass === '') {
      setNotification('', 'error', 'Incorrect Password', '');
      return;
    }

    await deleteDoc(doc(db, 'items', itemId));

    setNotification('', 'success', 'Item eliminado', '');
    setTimeout(() => {
      window.location.reload(false);
    }, 500);
  };

  if (style === 'confirm') {
    return (
      <div className="notif-overlay">
        <div className="confirm-notif">
          <h4>{notification.message}</h4>

          <input
            className="notif-input"
            type="text"
            onChange={(e) => setPass(e.target.value)}
          />

          <div className="notif-btn-container">
            <button className="notif-btn" onClick={() => setMessage('')}>
              No
            </button>

            <button className="notif-btn" onClick={deleteItem}>
              Sí
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div
      className={style + 'notification'}
      style={{
        color: notification.severity === 'error' ? 'red' : 'white',
      }}
      onClick={() => setMessage('')}
    >
      {notification.message}
    </div>
  );
};

export default Notification;
