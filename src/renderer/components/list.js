import React from 'react';
import styles from './list.css';

export function List({ children }) {
  return <ul className={styles.list}>{children}</ul>
}

export function ListItem({ children }) {
  return <li className={styles.listItem}>{children}</li>
}
