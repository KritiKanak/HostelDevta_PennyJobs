import React from 'react';

const Connect = ({ application }) => {
  return (
    <div>
      <h2>Connect</h2>
      <h3>{application.name}</h3>
      <p>{application.address}</p>
      <p>{application.experience}</p>
      <p>{application.duration}</p>
      <p>{application.education}</p>
      <p>{application.skills}</p>
      <button>Send Email</button>
    </div>
  );
};

export default Connect;
