import React from 'react';
import { Docs, Header } from 'components';

const WithContext = ({ component: PassedComponent, ...props }) => {
  return (
    <div className="page-wrapper">
      <Header {...props} />
      <PassedComponent {...props} />
      <Docs />
    </div>
  );
};

export default WithContext;
