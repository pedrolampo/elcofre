import React, { useContext, useRef } from 'react';
import './item.css';
import { doc, getDoc, writeBatch } from 'firebase/firestore';
import { db } from '../../services/firebase';
import { NotificationContext } from '../../context/NotificationContext';

export default function Item({ item }) {
  const input = useRef();

  const { setNotification } = useContext(NotificationContext);

  const updateRating = (e) => {
    const batch = writeBatch(db);

    const show = {
      name: item.name,
      checked: item.checked,
      rating: e.target.value,
      provider: item.provider,
    };

    getDoc(doc(db, 'items', item.id))
      .then((docSnapshot) => {
        batch.update(doc(db, 'items', docSnapshot.id), {
          name: show.name,
          checked: show.checked,
          rating: show.rating,
          provider: show.provider,
        });
      })
      .catch((err) => console.log(err))
      .finally(() => {
        batch.commit();
      });
  };

  const updateCheckedState = (e) => {
    const batch = writeBatch(db);

    const show = {
      name: item.name,
      checked: e.target.checked,
      rating: item.rating,
      provider: item.provider,
    };

    getDoc(doc(db, 'items', item.id))
      .then((docSnapshot) => {
        batch.update(doc(db, 'items', docSnapshot.id), {
          name: show.name,
          checked: show.checked,
          rating: show.rating,
          provider: show.provider,
        });
      })
      .catch((err) => console.log(err))
      .finally(() => {
        batch.commit();
      });
  };

  const deleteItem = () => {
    setNotification('confirm', '', '¿Seguro que quieres eliminarla?', item.id);
  };

  const triggerAnimation = () => {
    const inputEl = input.current;
    inputEl.classList.remove('checked-animation');
    inputEl.style.animation = 'none';
    // eslint-disable-next-line no-unused-expressions
    inputEl.offsetHeight;
    inputEl.style.animation = null;
    inputEl.classList.add('checked-animation');
  };

  return (
    <tr className="item-individual">
      <td>
        <input
          className="item-checked"
          type="checkbox"
          defaultChecked={item.checked}
          onChange={(e) => updateCheckedState(e)}
          onClick={triggerAnimation}
          ref={input}
        />
      </td>
      <td>
        <span className="item-name">{item.name}</span>
      </td>
      <td>
        <span className="item-provider">{item.provider}</span>
      </td>
      <td>
        <select defaultValue={item.rating} onChange={(e) => updateRating(e)}>
          <option value={null}>N/A</option>
          <option value={1}>1</option>
          <option value={2}>2</option>
          <option value={3}>3</option>
          <option value={4}>4</option>
          <option value={5}>5</option>
          <option value={6}>6</option>
          <option value={7}>7</option>
          <option value={8}>8</option>
          <option value={9}>9</option>
          <option value={10}>10</option>
        </select>
      </td>
      <td>
        <span onClick={deleteItem} className="delete-btn">
          &#10006;
        </span>
      </td>
    </tr>
  );
}
