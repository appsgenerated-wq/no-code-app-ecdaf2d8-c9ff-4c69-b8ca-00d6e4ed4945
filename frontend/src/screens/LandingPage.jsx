import React, { useState } from 'react';
import config from '../constants.js';

const LandingPage = ({ onLogin, onSignup }) => {
  const [isLoginView, setIsLoginView] = useState(true);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (evt) => {
    evt.preventDefault();
    if (isLoginView) {
      onLogin(email, password);
    } else {
      onSignup(name, email, password);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <header className="p-4 bg-white shadow-md">
        <div className="container mx-auto flex justify-between items-center">
          <h1 className="text-2xl font-bold text-blue-600">FlavorFind</h1>
          <a href={`${config.BACKEND_URL}/admin`} target="_blank" rel="noopener noreferrer" className="text-sm text-gray-600 hover:text-blue-600 transition">Admin Panel</a>
        </div>
      </header>
      <main className="flex-grow flex items-center justify-center p-4">
        <div className="container mx-auto grid md:grid-cols-2 gap-16 items-center">
          <div className="text-center md:text-left">
            <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 leading-tight mb-4">Discover Your Next Favorite Meal</h2>
            <p className="text-lg text-gray-600 mb-8">Browse local restaurants, explore menus, and read authentic reviews. All in one place.</p>
            <button onClick={() => onLogin('customer@demo.com', 'password')} className="bg-blue-600 text-white font-bold py-3 px-8 rounded-lg hover:bg-blue-700 transition duration-300 shadow-lg">Try Demo</button>
          </div>
          <div className="bg-white p-8 rounded-xl shadow-2xl w-full max-w-md mx-auto">
            <div className="mb-6 flex border-b">
              <button onClick={() => setIsLoginView(true)} className={`flex-1 py-2 font-semibold text-center ${isLoginView ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-500'}`}>Login</button>
              <button onClick={() => setIsLoginView(false)} className={`flex-1 py-2 font-semibold text-center ${!isLoginView ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-500'}`}>Sign Up</button>
            </div>
            <h3 className="text-2xl font-bold text-center text-gray-800 mb-6">{isLoginView ? 'Welcome Back' : 'Create Account'}</h3>
            <form onSubmit={handleSubmit} className="space-y-4">
              {!isLoginView && (
                <input type="text" placeholder="Full Name" value={name} onChange={e => setName(e.target.value)} required className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500" />
              )}
              <input type="email" placeholder="Email Address" value={email} onChange={e => setEmail(e.target.value)} required className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500" />
              <input type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} required className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500" />
              <button type="submit" className="w-full bg-blue-600 text-white font-bold py-2 px-4 rounded-lg hover:bg-blue-700 transition duration-300">{isLoginView ? 'Login' : 'Sign Up'}</button>
            </form>
          </div>
        </div>
      </main>
    </div>
  );
};

export default LandingPage;
