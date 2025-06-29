import PropTypes from 'prop-types';
import EventCard from './EventCard';

const EventSection = ({ title, events }) => {
  return (
    <section className="py-12">
      <h2 className="mb-8 text-3xl font-bold text-gray-900">{title}</h2>
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {events.map((event) => (
          <EventCard
            key={event.id}
            number={event.number}
            title={event.title}
            image={event.image}
            category={event.category}
          />
        ))}
      </div>
    </section>
  );
};

EventSection.propTypes = {
  title: PropTypes.string.isRequired,
  events: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      number: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
      image: PropTypes.string.isRequired,
      category: PropTypes.string.isRequired,
    })
  ).isRequired,
};

export default EventSection;