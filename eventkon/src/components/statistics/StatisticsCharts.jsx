import PropTypes from 'prop-types';
import EventTrendsChart from './charts/EventTrendsChart';
import EventTypeDistribution from './charts/EventTypeDistribution';

const StatisticsCharts = ({ filters }) => {
  return (
    <div className="space-y-6">
      <EventTrendsChart />
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <EventTypeDistribution />
        {/* Additional charts can be added here */}
      </div>
    </div>
  );
};

StatisticsCharts.propTypes = {
  filters: PropTypes.shape({
    dateRange: PropTypes.string.isRequired,
    eventType: PropTypes.string.isRequired,
    organizingClub: PropTypes.string.isRequired,
    location: PropTypes.string.isRequired
  }).isRequired
};

export default StatisticsCharts;