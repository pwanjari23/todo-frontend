
import { Link } from 'react-router-dom';
import image from './image.jpg';

function App() {
  return (
    <div className='flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-200 via-blue-500 to-blue-700'>
      <div className='w-[600px] h-[450px] mx-auto bg-white rounded-lg shadow-xl flex'>
        <img src={image} alt="Planner" className="w-1/2 h-auto object-cover rounded-l-lg" />
        <div className="flex flex-col justify-center p-8 w-1/2">
          <h1 className="text-4xl font-bold font-salsa text-gray-800 mb-4">
            Your Everyday <br />
            <span className="text-blue-500">Planner</span> <br />
            <span className="text-blue-500">Buddy</span>
          </h1>
          <p className="text-gray-700 text-lg mb-6">
            Welcome to your new planning companion! Stay organized and boost your productivity with our intuitive planner.
          </p>
          <Link to="/todo">
            <button className="bg-blue-500 text-white px-6 py-3 rounded-md hover:bg-blue-600 focus:outline-none">
              Get Started
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default App;
