import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const data = [
  { month: 'Jan', events: 12, attendees: 450, rating: 4.5 },
  { month: 'Feb', events: 15, attendees: 580, rating: 4.6 },
  { month: 'Mar', events: 18, attendees: 720, rating: 4.7 },
  { month: 'Apr', events: 22, attendees: 850, rating: 4.8 },
  { month: 'May', events: 25, attendees: 920, rating: 4.8 },
  { month: 'Jun', events: 28, attendees: 1100, rating: 4.9 }
];

const EventTrendsChart = () => {
  return (
    <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
      <h3 className="text-lg font-semibold text-gray-900">Event Performance Trends</h3>
      <div className="mt-4 h-80">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#f3f4f6" />
            <XAxis dataKey="month" stroke="#6b7280" />
            <YAxis stroke="#6b7280" />
            <Tooltip
              contentStyle={{
                backgroundColor: '#ffffff',
                border: '1px solid #e5e7eb',
                borderRadius: '0.375rem',
                boxShadow: '0 1px 2px 0 rgb(0 0 0 / 0.05)'
              }}
            />
            <Legend />
            <Line type="monotone" dataKey="events" stroke="#f97316" strokeWidth={2} dot={{ r: 4 }} />
            <Line type="monotone" dataKey="attendees" stroke="#0ea5e9" strokeWidth={2} dot={{ r: 4 }} />
            <Line type="monotone" dataKey="rating" stroke="#22c55e" strokeWidth={2} dot={{ r: 4 }} />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default EventTrendsChart;