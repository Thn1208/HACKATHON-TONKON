import MainLayout from './components/layout/MainLayout'
import FeaturedEvents from './components/home/FeaturedEvents'

function App() {
  return (
    <MainLayout>
      <div className="space-y-8">
        <FeaturedEvents />
        {/* More sections will be added here */}
      </div>
    </MainLayout>
  )
}

export default App