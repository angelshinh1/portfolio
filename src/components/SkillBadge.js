import React from 'react';

const SkillBadge = ({ name, icon }) => {
  return (
    <div className="skill-badge">
      <i className={icon}></i>
      <span>{name}</span>
    </div>
  );
};

export default SkillBadge;