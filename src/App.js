import ItemsList from './components/ItemsList/ItemsList';
import { NotificationContextProvider } from './context/NotificationContext';
import Notification from './components/Notification/Notification';
import { useState } from 'react';
import NewItem from './components/NewItem/NewItem';

function App() {
  const [newItem, setNewItem] = useState(false);

  return (
    <div className="App">
      <NotificationContextProvider>
        <div className="header">
          <h1 className="main-header">El Cofre</h1>
          <button onClick={() => setNewItem(true)}>Create new item</button>
        </div>
        <ItemsList />
        <Notification />
        {newItem && <NewItem setNewItem={setNewItem} />}
      </NotificationContextProvider>
    </div>
  );
}

export default App;
