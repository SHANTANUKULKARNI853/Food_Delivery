import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Header from '../../components/common/header/Header';
import DeliveryContent from '../../components/common/tabcontent/DeliveryContent';
import DiningContent from '../../components/common/tabcontent/DiningContent';
import NightlifeContent from '../../components/common/tabcontent/NightlifeContent';

const Home = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState(() => {
    return location.state?.from || 'dining';
  });
  const [showFilters, setShowFilters] = useState(false);

  useEffect(() => {
    if (location.state?.from && location.state.from !== activeTab) {
      setActiveTab(location.state.from);
    }
  }, [location.state, activeTab]);

  useEffect(() => {
    if (location.state?.from) {
      navigate(location.pathname, { replace: true, state: {} });
    }
  }, [location, navigate]);

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