import { useEffect, useState } from 'react';

import Item from '../Item/Item';
import { getList } from '../../services/firebase';
import './itemsList.css';

export default function ItemsList() {
  const [list, setList] = useState([]);

  useEffect(() => {
    getList()
      .then((items) => {
        setList(items);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <table className="items-list">
      <thead>
        <tr>
          <th>Watched</th>
          <th>Name</th>
          <th>Provider</th>
          <th>Rating</th>
          <th>Delete</th>
        </tr>
      </thead>
      <tbody>
        {list.map((item) => (
          <Item key={item.name} item={item} />
        ))}
      </tbody>
    </table>
  );
}
