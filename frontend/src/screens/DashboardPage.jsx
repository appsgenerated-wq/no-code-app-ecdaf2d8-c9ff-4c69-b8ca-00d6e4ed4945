import React, { useState, useEffect, useCallback } from 'react';
import config from '../constants';

const DashboardPage = ({ user, onLogout, manifest }) => {
  const [restaurants, setRestaurants] = useState([]);
  const [selectedRestaurant, setSelectedRestaurant] = useState(null);
  const [menuItems, setMenuItems] = useState([]);
  const [reviews, setReviews] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [newRestaurantTitle, setNewRestaurantTitle] = useState('');
  const [newReviewComment, setNewReviewComment] = useState('');
  const [newReviewRating, setNewReviewRating] = useState(5);

  const fetchRestaurants = useCallback(async () => {
    setIsLoading(true);
    try {
      const response = await manifest.from('Restaurant').find({ include: ['owner'], sort: { createdAt: 'desc' } });
      setRestaurants(response.data);
    } catch (error) {
      console.error('Failed to fetch restaurants:', error);
    } finally {
      setIsLoading(false);
    }
  }, [manifest]);

  useEffect(() => {
    fetchRestaurants();
  }, [fetchRestaurants]);

  const fetchRestaurantDetails = async (restaurant) => {
    setSelectedRestaurant(restaurant);
    try {
      const menuResponse = await manifest.from('MenuItem').find({ filter: { restaurantId: restaurant.id }, sort: { createdAt: 'asc' } });
      setMenuItems(menuResponse.data);
      const reviewResponse = await manifest.from('Review').find({ filter: { restaurantId: restaurant.id }, include: ['author'], sort: { createdAt: 'desc' } });
      setReviews(reviewResponse.data);
    } catch (error) {
      console.error('Failed to fetch restaurant details:', error);
    }
  };

  const handleCreateRestaurant = async (e) => {
    e.preventDefault();
    if (!newRestaurantTitle.trim()) return;
    try {
      await manifest.from('Restaurant').create({ title: newRestaurantTitle, description: 'New restaurant description.' });
      setNewRestaurantTitle('');
      fetchRestaurants();
    } catch (error) {
      console.error('Failed to create restaurant:', error);
    }
  };

  const handleCreateReview = async (e) => {
    e.preventDefault();
    if (!newReviewComment.trim() || !selectedRestaurant) return;
    try {
      await manifest.from('Review').create({ 
        comment: newReviewComment, 
        rating: newReviewRating, 
        restaurantId: selectedRestaurant.id 
      });
      setNewReviewComment('');
      setNewReviewRating(5);
      fetchRestaurantDetails(selectedRestaurant); // Refresh reviews
    } catch (error) {
      console.error('Failed to submit review:', error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-white shadow-sm sticky top-0 z-10">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-3 flex justify-between items-center">
          <h1 className="text-xl font-bold text-blue-600">FlavorFind Dashboard</h1>
          <div className="flex items-center space-x-4">
            <span className="text-gray-700">Welcome, <span className="font-semibold">{user.name}</span>!</span>
            <a href={`${config.BACKEND_URL}/admin`} target="_blank" rel="noopener noreferrer" className="text-sm bg-gray-200 text-gray-800 px-3 py-1 rounded-md hover:bg-gray-300 transition">Admin</a>
            <button onClick={onLogout} className="text-sm bg-red-500 text-white px-3 py-1 rounded-md hover:bg-red-600 transition">Logout</button>
          </div>
        </div>
      </header>

      <main className="container mx-auto p-4 sm:p-6 lg:p-8 grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="md:col-span-1 space-y-6">
          <div className="bg-white p-4 rounded-lg shadow">
            <h2 className="text-lg font-semibold mb-3">Add a Restaurant</h2>
            <form onSubmit={handleCreateRestaurant} className="flex space-x-2">
              <input type="text" value={newRestaurantTitle} onChange={e => setNewRestaurantTitle(e.target.value)} placeholder="Restaurant Name" className="flex-grow p-2 border rounded-md" required />
              <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600">Add</button>
            </form>
          </div>

          <div className="bg-white rounded-lg shadow">
            <h2 className="text-lg font-semibold p-4 border-b">Restaurants</h2>
            <ul className="divide-y max-h-[60vh] overflow-y-auto">
              {isLoading ? <li className="p-4 text-gray-500">Loading...</li> : 
                restaurants.map(r => (
                  <li key={r.id} onClick={() => fetchRestaurantDetails(r)} className={`p-4 cursor-pointer hover:bg-blue-50 ${selectedRestaurant?.id === r.id ? 'bg-blue-100' : ''}`}>
                    <p className="font-semibold text-gray-800">{r.title}</p>
                    <p className="text-sm text-gray-500">by {r.owner?.name || 'Unknown'}</p>
                  </li>
                ))
              }
            </ul>
          </div>
        </div>

        <div className="md:col-span-2 bg-white p-6 rounded-lg shadow">
          {!selectedRestaurant ? (
            <div className="text-center py-20">
              <h2 className="text-2xl font-semibold text-gray-700">Select a restaurant</h2>
              <p className="text-gray-500">Choose a restaurant from the list to see its details.</p>
            </div>
          ) : (
            <div>
              <h2 className="text-3xl font-bold mb-4">{selectedRestaurant.title}</h2>
              <div className="mb-6">
                <h3 className="text-xl font-semibold border-b pb-2 mb-3">Menu</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {menuItems.length > 0 ? menuItems.map(item => (
                    <div key={item.id} className="border p-3 rounded-md">
                      <p className="font-bold">{item.title} - ${item.price}</p>
                      <p className="text-sm text-gray-600">{item.description}</p>
                    </div>
                  )) : <p className="text-gray-500">No menu items yet.</p>}
                </div>
              </div>
              <div>
                <h3 className="text-xl font-semibold border-b pb-2 mb-3">Reviews</h3>
                <form onSubmit={handleCreateReview} className="mb-4 space-y-2">
                  <textarea value={newReviewComment} onChange={e => setNewReviewComment(e.target.value)} placeholder="Write a review..." className="w-full p-2 border rounded-md" required></textarea>
                  <div className="flex items-center space-x-2">
                     <label>Rating:</label>
                     <select value={newReviewRating} onChange={e => setNewReviewRating(Number(e.target.value))} className="p-2 border rounded-md">
                        {[5,4,3,2,1].map(n => <option key={n} value={n}>{n} Stars</option>)}
                     </select>
                     <button type="submit" className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600">Submit</button>
                  </div>
                </form>
                <div className="space-y-4">
                  {reviews.length > 0 ? reviews.map(review => (
                    <div key={review.id} className="border-t pt-4">
                      <p className="font-semibold">{'⭐'.repeat(review.rating)} <span className="text-gray-500 font-normal">by {review.author?.name || 'Anonymous'}</span></p>
                      <p className="text-gray-700 mt-1">{review.comment}</p>
                    </div>
                  )) : <p className="text-gray-500">No reviews yet. Be the first!</p>}
                </div>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default DashboardPage;
