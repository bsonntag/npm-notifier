import AddPackageForm from './add-package-form';
import React, { useCallback, useEffect, useReducer } from 'react';
import SubscribedPackages from './subscribed-packages';

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
    <>
      <h1>NPM Notifier</h1>
      <AddPackageForm addPackage={addPackage} />
      <SubscribedPackages packages={packages} unfollow={unfollow} />
    </>
  );
}

export default App;
