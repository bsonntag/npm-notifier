import { List, ListItem } from './list';
import AddPackageForm from './add-package-form';
import Button from './button';
import React, { useCallback, useEffect, useReducer, useRef } from 'react';
import styles from './app.css';

const storageKey = 'npm-notifier:packages';

function packagesReducer(state, action) {
  switch (action.type) {
    case 'addPackage':
      return [...state, action.payload];
    case 'removePackage':
      return state.filter(name => name !== action.payload);
    default:
      return state;
  }
}

function initializePackages(initialState) {
  return JSON.parse(localStorage.getItem(storageKey)) || initialState;
}

function App({ follower }) {
  const inputRef = useRef();
  const [packages, dispatch] = useReducer(
    packagesReducer,
    [],
    initializePackages
  );

  useEffect(() => {
    localStorage.setItem(storageKey, JSON.stringify(packages));
  }, [packages]);

  useEffect(() => {
    follower.follow(packages);
  }, [packages]);

  const focusInput = useCallback(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  const addPackage = useCallback(packageName => {
    dispatch({
      type: 'addPackage',
      payload: packageName,
    });
  });

  const unfollow = useCallback(packageName => {
    dispatch({
      type: 'removePackage',
      payload: packageName,
    });
    follower.unfollow(packageName);
  });

  return (
    <div className={styles.app}>
      <header className={styles.appHeader}>
        <h1 className={styles.appTitle}>Subscribed packages</h1>
        <Button className={styles.appAddButton} onClick={focusInput}>
          +
        </Button>
      </header>

      <List>
        {packages.map((packageName, index) => (
          <ListItem key={index}>
            {packageName}
            <Button onClick={() => unfollow(packageName)}>Remove</Button>
          </ListItem>
        ))}

        <ListItem>
          <AddPackageForm addPackage={addPackage} inputRef={inputRef} />
        </ListItem>
      </List>
    </div>
  );
}

export default App;
