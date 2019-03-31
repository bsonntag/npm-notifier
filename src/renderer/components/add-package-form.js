import React, { useCallback, useState } from 'react';
import styles from './add-package-form.css';

function AddPackageForm({ addPackage, inputRef }) {
  const [packageName, setPackageName] = useState('');

  const changePackageName = useCallback(event => {
    setPackageName(event.target.value);
  }, [setPackageName]);

  const submit = useCallback(event => {
    event.preventDefault();
    addPackage(packageName);
    setPackageName('');
  }, [addPackage, packageName, setPackageName]);

  return (
    <form className={styles.addPackageForm} onSubmit={submit}>
      <input
        className={styles.addPackageFormInput}
        ref={inputRef}
        type='text'
        name='packageName'
        value={packageName}
        onChange={changePackageName}
      />
    </form>
  );
}

export default AddPackageForm;
