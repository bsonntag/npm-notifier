import { get } from 'lodash';
import ChangesStream from 'changes-stream';
import minimatch from 'minimatch';

class Subscriptions {
  constructor() {
    this.subscribedPackages = new Set();
  }

  add(packageName) {
    this.subscribedPackages.add(packageName);

    return this;
  }

  delete(packageName) {
    this.subscribedPackages.delete(packageName);

    return this;
  }

  isSubscribed(packageName) {
    return [...this.subscribedPackages].some(subscribedPackage => {
      return minimatch(packageName, subscribedPackage);
    });
  }
}

class NpmFollower {
  constructor(options = {}) {
    const {
      dbUrl = 'https://skimdb.npmjs.com/registry',
      since = 'now',
    } = options;

    this.callbacks = [];
    this.subscriptions = new Subscriptions();

    const changes = new ChangesStream({
      db: dbUrl,
      include_docs: true,
      since,
    });

    changes.on('data', change => this.handlePackageUpdate(change));
  }

  handlePackageUpdate(change) {
    const packageName = get(change, 'doc.name');
    const version = get(change, 'doc.dist-tags.latest');

    if (packageName && this.subscriptions.isSubscribed(packageName)) {
      this.callbacks.forEach(callback => {
        callback({ packageName, version });
      });
    }
  }

  follow(packageName) {
    if (Array.isArray(packageName)) {
      packageName.forEach(name => this.subscriptions.add(name));
    } else {
      this.subscriptions.add(packageName);
    }
  }

  unfollow(packageName) {
    if (Array.isArray(packageName)) {
      packageName.forEach(name => this.subscriptions.delete(name));
    } else {
      this.subscriptions.delete(packageName);
    }
  }

  onUpdate(callback) {
    this.callbacks.push(callback);
  }
}

export default NpmFollower;
