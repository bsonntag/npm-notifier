import React from 'react';
import classnames from 'classnames';
import styles from './button.css';

function Button({ children, className, ...rest }) {
  return (
    <button className={classnames(styles.button, className)} {...rest}>
      {children}
    </button>
  );
}

Button.defaultProps = {
  type: 'button',
};

export default Button;
