import React from 'react';
import { Link } from 'react-router-dom';
import EventCard from './EventCard';
import { mockEvents } from '../../data/mockEvents';
import { FunnelIcon } from '@heroicons/react/24/outline';

const FeaturedEvents = ({ events = [] }) => {
  // Sử dụng events được truyền vào hoặc lấy từ mockEvents
  const featuredEvents = events.length > 0 ? events : mockEvents.slice(0, 3);

  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
      {featuredEvents.map((event) => (
        <EventCard key={event.id} event={event} />
      ))}
    </div>
  );
};

export default FeaturedEvents;