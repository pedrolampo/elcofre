import React, { useRef } from 'react';
import { addDoc, collection, writeBatch } from 'firebase/firestore';
import { db } from '../../services/firebase';

import './newItem.css';

export default function NewItem({ setNewItem }) {
  const name = useRef();
  const provider = useRef();
  const rating = useRef();

  const handleSubmit = (e) => {
    e.preventDefault();

    const batch = writeBatch(db);

    if (!name.current.value.length || !provider.current.value.length) return;

    const newItem = {
      checked: false,
      name: name.current.value,
      provider: provider.current.value,
      rating:
        rating.current.value === ('N/A' || null) ? 'N/A' : rating.current.value,
    };

    addDoc(collection(db, 'items'), newItem)
      .then(({ id }) => {
        batch.commit().then(() => console.log(id));
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setNewItem(false);
        window.location.reload(false);
      });
  };

  return (
    <>
      <div className="overlay"></div>
      <div className="new-item">
        <h3>Add new item</h3>
        <form className="new-item-form" onSubmit={(e) => handleSubmit(e)}>
          <div>
            <label>
              Name:
              <input placeholder="Friends" ref={name} />
            </label>
            <label>
              Provider:
              <input placeholder="Netflix" ref={provider} />
            </label>
            <label>
              Rating:
              <select ref={rating}>
                <option defaultValue value={null}>
                  N/A
                </option>
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
            </label>
          </div>
          <button type="submit" className="confirm-btn">
            Confirmar
          </button>
        </form>
        <span className="close-card" onClick={() => setNewItem(false)}>
          &#10006;
        </span>
      </div>
    </>
  );
}
