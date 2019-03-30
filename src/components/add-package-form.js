import React, { useCallback, useState } from 'react';

function AddPackageForm({ addPackage }) {
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
    <>
      <h3>Add a package</h3>

      <form onSubmit={submit}>
        <label>
          Package name (or pattern)
          <input
            type='text'
            name='packageName'
            value={packageName}
            onChange={changePackageName}
          />
        </label>

        <button type='submit'>Add</button>
      </form>
    </>
  );
}

export default AddPackageForm;
