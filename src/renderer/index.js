import { render } from 'react-dom';
import App from './components/app';
import NpmFollower from './utils/npm-follower';
import React from 'react';

const follower = new NpmFollower();

follower.onUpdate(({ packageName, version }) => {
  const body = packageName + '@' + version;

  new Notification('NPM Notifier', { body });
});

render(<App follower={follower} />, document.getElementById('root'));
