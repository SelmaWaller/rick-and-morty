import React from 'react';

import {Link} from 'react-router-dom';

const Characters = props => {
  const {id, name, avatar, status, species, gender, episode} = props;
  return (
    <div className="innerCard textLeft linkedCard boxShadow">
      <Link to={`/character-specific/${id}`}>
        <h3>{name}</h3>
        <img src={avatar} alt={name} />
        <p>{status}</p>
        <p>{species}</p>
        <p>{gender}</p>
        <p>{episode}</p>
      </Link>
    </div>
  );
};

export default Characters;
