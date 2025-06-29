import PropTypes from 'prop-types';

const EventCard = ({ number, title, image, category }) => {
  return (
    <div className="relative overflow-hidden rounded-lg border border-gray-100 transition-all hover:shadow-lg">
      <div className="absolute left-0 top-0 z-10 flex h-24 w-24 items-center justify-center bg-gradient-to-br from-orange-500 to-orange-600 text-6xl font-bold text-white">
        {number}
      </div>
      <div className="aspect-video w-full overflow-hidden">
        <img 
          src={image} 
          alt={title}
          className="h-full w-full object-cover transition-transform hover:scale-105"
        />
      </div>
      <div className="p-4">
        <h3 className="text-xl font-semibold text-gray-900">{title}</h3>
        <p className="mt-2 text-sm font-medium text-orange-600">{category}</p>
      </div>
    </div>
  );
};

EventCard.propTypes = {
  number: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired,
  category: PropTypes.string.isRequired
};

export default EventCard;