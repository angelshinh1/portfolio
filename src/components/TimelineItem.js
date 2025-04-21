import React from 'react';

const TimelineItem = ({ title, company, period, points, isLast = false }) => {
  return (
    <div className="timeline-item">
      <div className="timeline-dot"></div>
      {!isLast && <div className="timeline-line"></div>}
      <div className="timeline-content">
        <h3>{title}</h3>
        <h4>{company}</h4>
        <span className="timeline-period">{period}</span>
        <ul className="timeline-points">
          {points.map((point, index) => (
            <li key={index}>{point}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default TimelineItem;