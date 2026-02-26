import React from 'react';

const ITEMS = [
  'ARTIFICIAL INTELLIGENCE',
  'CYBERSECURITY',
  'IOT SYSTEMS',
  'FULL STACK',
  'GAME DEVELOPMENT',
  'AUTOMATION',
  'BLOCKCHAIN',
];

const Marquee = ({ reverse = false }) => {
  const renderItems = () =>
    ITEMS.map((item, i) => (
      <span key={i} className="marquee-item font-display">
        {item}
        <span className="marquee-separator">✦</span>
      </span>
    ));

  return (
    <div className="marquee" aria-hidden="true">
      <div className={`marquee-track ${reverse ? 'marquee-reverse' : ''}`}>
        <div className="marquee-content">
          {renderItems()}
          {renderItems()}
        </div>
      </div>
    </div>
  );
};

export default Marquee;
