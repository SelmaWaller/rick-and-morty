import React from 'react';

import {Link} from 'react-router-dom';

const Characters = ({id, name, avatar, status, species, gender, episode}) => {
  return (
    <div className="innerCard linkedCard boxShadow character">
      <Link to={`/character-specific/${id}`}>
        <h3 className={String(name.length) > 21 ? 'ellipsed' : ''}>{name}</h3>
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
