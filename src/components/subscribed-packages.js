import React from 'react';

function SubscribedPackages({ packages, unfollow }) {
  return (
    <div id='subscribed-packages'>
      <h2>Subscribed packages</h2>

      <ul>
        {packages.map((packageName, index) => (
          <li key={index}>
            {packageName}
            <button onClick={() => unfollow(packageName)}>Remove</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default SubscribedPackages;
