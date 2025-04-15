import React, { useState } from 'react';
import Header from '../../components/common/header/Header';
import DeliveryContent from '../../components/common/tabcontent/DeliveryContent';
import DiningContent from '../../components/common/tabcontent/DiningContent';
import NightlifeContent from '../../components/common/tabcontent/NightlifeContent';

const Home = () => {
  const [activeTab, setActiveTab] = useState('dining');
  const [showFilters, setShowFilters] = useState(false);

  const handleDeliveryDoubleClick = () => {
    setShowFilters((prev) => !prev);
  };

  const handleTabChange = (tab) => {
    setActiveTab(tab);
    if (tab !== 'delivery') {
      setShowFilters(false);
    }
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'dining':
        return <DiningContent />;
      case 'delivery':
        return <DeliveryContent showFilters={showFilters} />;
      case 'nightlife':
        return <NightlifeContent />;
      default:
        return <DeliveryContent showFilters={showFilters} />;
    }
  };

  return (
    <div className="app">
      <Header
        activeTab={activeTab}
        onTabChange={handleTabChange}
        onDeliveryDoubleClick={handleDeliveryDoubleClick}
      />
      {renderContent()}
    </div>
  );
};

export default Home;