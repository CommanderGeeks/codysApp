import React, { useState, useEffect } from 'react';
import { ChevronRight, Star, Heart, Clock, Users, TrendingUp, Award, Bell, User, Home, Calendar, BarChart3, Settings, Check, X, Plus, Minus, Coffee, Sun, Moon, Sparkles, AlertCircle, ThumbsUp, MessageSquare, Filter, MapPin, Flame, Leaf } from 'lucide-react';

const CodysApp = () => {
  const [activeScreen, setActiveScreen] = useState('home');
  const [selectedMeals, setSelectedMeals] = useState({});
  const [userProfile, setUserProfile] = useState({
    name: 'Student',
    mealsThisWeek: 8,
    savedThisMonth: 186,
    communityImpact: 24,
    dietary: [],
    allergies: [],
    proteinPrefs: [],
    cuisinePrefs: { liked: [], disliked: [] }
  });
  const [showCheckout, setShowCheckout] = useState(false);
  const [showFeedback, setShowFeedback] = useState(false);
  const [currentOrder, setCurrentOrder] = useState(null);
  const [selectedPickupTime, setSelectedPickupTime] = useState(null);

  // Sample menu data with community-driven metrics
  const menuData = {
    tomorrow: {
      lunch: [
        { 
          id: 1, 
          name: 'Thai Green Curry Bowl', 
          type: 'vegan', 
          protein: 'Tofu',
          rating: 4.8, 
          orders: 267, 
          remaining: 133,
          calories: 520,
          tags: ['Spicy', 'Gluten-Free'],
          communityVotes: 89,
          image: '🍛'
        },
        { 
          id: 2, 
          name: 'Mediterranean Chicken Wrap', 
          type: 'protein', 
          protein: 'Chicken',
          rating: 4.6, 
          orders: 189, 
          remaining: 211,
          calories: 580,
          tags: ['High-Protein'],
          communityVotes: 67,
          image: '🌯'
        },
        { 
          id: 3, 
          name: 'Harvest Grain Bowl', 
          type: 'vegetarian',
          protein: 'Chickpeas', 
          rating: 4.7, 
          orders: 145, 
          remaining: 255,
          calories: 490,
          tags: ['Fiber-Rich', 'Seasonal'],
          communityVotes: 72,
          image: '🥗'
        }
      ],
      dinner: [
        { 
          id: 4, 
          name: 'Korean BBQ Beef Bowl', 
          type: 'protein',
          protein: 'Beef', 
          rating: 4.9, 
          orders: 312, 
          remaining: 88,
          calories: 640,
          tags: ['Comfort Food'],
          communityVotes: 145,
          image: '🥘'
        },
        { 
          id: 5, 
          name: 'Mushroom Risotto', 
          type: 'vegetarian',
          protein: 'Mixed Nuts', 
          rating: 4.5, 
          orders: 134, 
          remaining: 266,
          calories: 510,
          tags: ['Creamy', 'Italian'],
          communityVotes: 58,
          image: '🍄'
        },
        { 
          id: 6, 
          name: 'West African Peanut Stew', 
          type: 'vegan',
          protein: 'Lentils', 
          rating: 4.7, 
          orders: 178, 
          remaining: 222,
          calories: 560,
          tags: ['Bold Flavors', 'Warming'],
          communityVotes: 93,
          image: '🍲'
        }
      ]
    }
  };

  // Week view data
  const weekMenu = [
    { day: 'Mon', date: '25', meals: 2, status: 'ordered' },
    { day: 'Tue', date: '26', meals: 2, status: 'ordering' },
    { day: 'Wed', date: '27', meals: 1, status: 'available' },
    { day: 'Thu', date: '28', meals: 0, status: 'available' },
    { day: 'Fri', date: '29', meals: 2, status: 'available' },
    { day: 'Sat', date: '30', meals: 0, status: 'closed' },
    { day: 'Sun', date: '31', meals: 0, status: 'closed' }
  ];

  const handleMealSelection = (mealId, quantity) => {
    setSelectedMeals(prev => ({
      ...prev,
      [mealId]: quantity
    }));
  };

  const calculateTotal = () => {
    return Object.keys(selectedMeals).reduce((total, mealId) => {
      return total + (selectedMeals[mealId] * 6.99);
    }, 0);
  };

  const renderHomeScreen = () => (
    <div className="pb-20">
      {/* Modern Hero Section */}
      <div className="bg-gradient-to-br from-purple-600 via-purple-500 to-pink-500 p-6 rounded-b-3xl shadow-xl">
        <div className="flex justify-between items-start mb-4">
          <div>
            <h1 className="text-3xl font-bold text-white mb-1">
              Good {new Date().getHours() < 12 ? 'Morning' : new Date().getHours() < 17 ? 'Afternoon' : 'Evening'}!
            </h1>
            <p className="text-purple-100 text-sm">Let's plan tomorrow's meals</p>
          </div>
          <button className="bg-white/20 backdrop-blur-sm p-2 rounded-full">
            <Bell className="w-5 h-5 text-white" />
          </button>
        </div>
        
        {/* Impact Stats Card */}
        <div className="bg-white/10 backdrop-blur-md rounded-2xl p-4 mt-4">
          <div className="grid grid-cols-3 gap-3">
            <div className="text-center">
              <p className="text-2xl font-bold text-white">{userProfile.mealsThisWeek}</p>
              <p className="text-purple-100 text-xs">Meals This Week</p>
            </div>
            <div className="text-center border-l border-r border-white/20">
              <p className="text-2xl font-bold text-white">${userProfile.savedThisMonth}</p>
              <p className="text-purple-100 text-xs">Saved This Month</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-white">{userProfile.communityImpact}</p>
              <p className="text-purple-100 text-xs">Meals Donated</p>
            </div>
          </div>
        </div>
      </div>

      {/* Week Overview */}
      <div className="px-4 mt-6">
        <h2 className="text-lg font-bold text-gray-800 mb-3">Your Week</h2>
        <div className="flex gap-2 overflow-x-auto pb-2">
          {weekMenu.map((day) => (
            <div 
              key={day.day}
              className={`min-w-[60px] p-3 rounded-2xl border-2 transition-all ${
                day.status === 'ordered' ? 'bg-purple-50 border-purple-200' :
                day.status === 'ordering' ? 'bg-purple-100 border-purple-400 shadow-lg' :
                day.status === 'closed' ? 'bg-gray-50 border-gray-200 opacity-50' :
                'bg-white border-gray-200'
              }`}
            >
              <p className="text-xs text-gray-500 text-center">{day.day}</p>
              <p className="text-lg font-bold text-center mt-1">{day.date}</p>
              {day.meals > 0 && (
                <div className="mt-2 flex justify-center">
                  <span className="bg-purple-500 text-white text-xs px-2 py-1 rounded-full">
                    {day.meals}
                  </span>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Tomorrow's Menu */}
      <div className="px-4 mt-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-bold text-gray-800">Tomorrow's Menu</h2>
          <button className="text-purple-600 text-sm font-semibold flex items-center gap-1">
            <Filter className="w-4 h-4" />
            Filters
          </button>
        </div>

        {/* Lunch Section */}
        <div className="mb-6">
          <div className="flex items-center gap-2 mb-3">
            <Sun className="w-5 h-5 text-orange-500" />
            <h3 className="font-semibold text-gray-700">Lunch (11:30 AM - 1:30 PM)</h3>
          </div>
          
          {menuData.tomorrow.lunch.map((meal) => (
            <div key={meal.id} className="bg-white rounded-2xl p-4 mb-3 shadow-sm border border-gray-100">
              <div className="flex justify-between items-start mb-3">
                <div className="flex gap-3">
                  <div className="text-3xl">{meal.image}</div>
                  <div className="flex-1">
                    <h4 className="font-bold text-gray-800">{meal.name}</h4>
                    <div className="flex items-center gap-2 mt-1">
                      {meal.type === 'vegan' && <Leaf className="w-4 h-4 text-green-600" />}
                      <span className="text-xs text-gray-500">{meal.protein} • {meal.calories} cal</span>
                    </div>
                    <div className="flex gap-2 mt-2">
                      {meal.tags.map(tag => (
                        <span key={tag} className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded-full">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
                
                <div className="text-right">
                  <div className="flex items-center gap-1 text-sm">
                    <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                    <span className="font-semibold">{meal.rating}</span>
                  </div>
                  <p className="text-xs text-gray-500 mt-1">{meal.orders} ordered</p>
                </div>
              </div>

              {/* Community Metrics */}
              <div className="flex items-center justify-between mb-3 p-2 bg-purple-50 rounded-lg">
                <div className="flex items-center gap-2">
                  <ThumbsUp className="w-4 h-4 text-purple-600" />
                  <span className="text-xs text-purple-700">{meal.communityVotes} community votes</span>
                </div>
                <div className="flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 text-orange-500" />
                  <span className="text-xs text-orange-600 font-semibold">
                    {meal.remaining} left
                  </span>
                </div>
              </div>

              {/* Quantity Selector */}
              <div className="flex items-center justify-between">
                <span className="text-sm font-semibold text-gray-700">Quantity</span>
                <div className="flex items-center gap-3 bg-gray-50 rounded-xl p-1">
                  <button 
                    onClick={() => handleMealSelection(meal.id, Math.max(0, (selectedMeals[meal.id] || 0) - 1))}
                    className="p-2 hover:bg-white rounded-lg transition-colors"
                  >
                    <Minus className="w-4 h-4 text-gray-600" />
                  </button>
                  <span className="w-8 text-center font-bold text-gray-800">
                    {selectedMeals[meal.id] || 0}
                  </span>
                  <button 
                    onClick={() => handleMealSelection(meal.id, Math.min(3, (selectedMeals[meal.id] || 0) + 1))}
                    className="p-2 hover:bg-white rounded-lg transition-colors"
                  >
                    <Plus className="w-4 h-4 text-gray-600" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Dinner Section */}
        <div>
          <div className="flex items-center gap-2 mb-3">
            <Moon className="w-5 h-5 text-indigo-600" />
            <h3 className="font-semibold text-gray-700">Dinner (5:00 PM - 7:00 PM)</h3>
          </div>
          
          {menuData.tomorrow.dinner.map((meal) => (
            <div key={meal.id} className="bg-white rounded-2xl p-4 mb-3 shadow-sm border border-gray-100">
              <div className="flex justify-between items-start mb-3">
                <div className="flex gap-3">
                  <div className="text-3xl">{meal.image}</div>
                  <div className="flex-1">
                    <h4 className="font-bold text-gray-800">{meal.name}</h4>
                    <div className="flex items-center gap-2 mt-1">
                      {meal.type === 'vegan' && <Leaf className="w-4 h-4 text-green-600" />}
                      <span className="text-xs text-gray-500">{meal.protein} • {meal.calories} cal</span>
                    </div>
                    <div className="flex gap-2 mt-2">
                      {meal.tags.map(tag => (
                        <span key={tag} className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded-full">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
                
                <div className="text-right">
                  <div className="flex items-center gap-1 text-sm">
                    <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                    <span className="font-semibold">{meal.rating}</span>
                  </div>
                  <p className="text-xs text-gray-500 mt-1">{meal.orders} ordered</p>
                </div>
              </div>

              {/* Community Metrics */}
              <div className="flex items-center justify-between mb-3 p-2 bg-purple-50 rounded-lg">
                <div className="flex items-center gap-2">
                  <ThumbsUp className="w-4 h-4 text-purple-600" />
                  <span className="text-xs text-purple-700">{meal.communityVotes} community votes</span>
                </div>
                <div className="flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 text-orange-500" />
                  <span className="text-xs text-orange-600 font-semibold">
                    {meal.remaining} left
                  </span>
                </div>
              </div>

              {/* Quantity Selector */}
              <div className="flex items-center justify-between">
                <span className="text-sm font-semibold text-gray-700">Quantity</span>
                <div className="flex items-center gap-3 bg-gray-50 rounded-xl p-1">
                  <button 
                    onClick={() => handleMealSelection(meal.id, Math.max(0, (selectedMeals[meal.id] || 0) - 1))}
                    className="p-2 hover:bg-white rounded-lg transition-colors"
                  >
                    <Minus className="w-4 h-4 text-gray-600" />
                  </button>
                  <span className="w-8 text-center font-bold text-gray-800">
                    {selectedMeals[meal.id] || 0}
                  </span>
                  <button 
                    onClick={() => handleMealSelection(meal.id, Math.min(3, (selectedMeals[meal.id] || 0) + 1))}
                    className="p-2 hover:bg-white rounded-lg transition-colors"
                  >
                    <Plus className="w-4 h-4 text-gray-600" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Checkout Bar */}
      {Object.keys(selectedMeals).some(key => selectedMeals[key] > 0) && (
        <div className="fixed bottom-20 left-0 right-0 p-4 bg-white border-t border-gray-200 shadow-lg">
          <div className="flex items-center justify-between mb-3">
            <div>
              <p className="text-sm text-gray-600">
                {Object.values(selectedMeals).reduce((a, b) => a + b, 0)} meals selected
              </p>
              <p className="text-2xl font-bold text-gray-800">
                ${calculateTotal().toFixed(2)}
              </p>
            </div>
            <button 
              onClick={() => setShowCheckout(true)}
              className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-6 py-3 rounded-xl font-semibold shadow-lg"
            >
              Continue
            </button>
          </div>
        </div>
      )}
    </div>
  );

  const renderProfileScreen = () => (
    <div className="pb-20">
      <div className="bg-gradient-to-br from-purple-600 to-pink-600 p-6 rounded-b-3xl">
        <div className="text-center">
          <div className="w-24 h-24 bg-white rounded-full mx-auto mb-4 flex items-center justify-center">
            <User className="w-12 h-12 text-purple-600" />
          </div>
          <h2 className="text-2xl font-bold text-white mb-1">{userProfile.name}</h2>
          <p className="text-purple-100">Member since Sept 2024</p>
        </div>
      </div>

      <div className="px-4 mt-6">
        {/* Dietary Preferences */}
        <div className="bg-white rounded-2xl p-4 mb-4 shadow-sm">
          <h3 className="font-bold text-gray-800 mb-4 flex items-center gap-2">
            <Leaf className="w-5 h-5 text-green-600" />
            Dietary Preferences
          </h3>
          
          <div className="space-y-3">
            <div>
              <p className="text-sm text-gray-600 mb-2">Dietary Restrictions</p>
              <div className="flex flex-wrap gap-2">
                {['Vegetarian', 'Vegan', 'Halal', 'Kosher', 'Gluten-Free'].map(diet => (
                  <button
                    key={diet}
                    onClick={() => {
                      setUserProfile(prev => ({
                        ...prev,
                        dietary: prev.dietary.includes(diet) 
                          ? prev.dietary.filter(d => d !== diet)
                          : [...prev.dietary, diet]
                      }));
                    }}
                    className={`px-3 py-1.5 rounded-full text-sm font-medium transition-colors ${
                      userProfile.dietary.includes(diet)
                        ? 'bg-purple-600 text-white'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    {diet}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <p className="text-sm text-gray-600 mb-2">Allergies</p>
              <div className="flex flex-wrap gap-2">
                {['Nuts', 'Dairy', 'Eggs', 'Soy', 'Shellfish', 'Fish'].map(allergy => (
                  <button
                    key={allergy}
                    onClick={() => {
                      setUserProfile(prev => ({
                        ...prev,
                        allergies: prev.allergies.includes(allergy) 
                          ? prev.allergies.filter(a => a !== allergy)
                          : [...prev.allergies, allergy]
                      }));
                    }}
                    className={`px-3 py-1.5 rounded-full text-sm font-medium transition-colors ${
                      userProfile.allergies.includes(allergy)
                        ? 'bg-red-600 text-white'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    {allergy}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <p className="text-sm text-gray-600 mb-2">Protein Preferences</p>
              <div className="flex flex-wrap gap-2">
                {['Chicken', 'Beef', 'Pork', 'Fish', 'Tofu', 'Legumes'].map(protein => (
                  <button
                    key={protein}
                    onClick={() => {
                      setUserProfile(prev => ({
                        ...prev,
                        proteinPrefs: prev.proteinPrefs.includes(protein) 
                          ? prev.proteinPrefs.filter(p => p !== protein)
                          : [...prev.proteinPrefs, protein]
                      }));
                    }}
                    className={`px-3 py-1.5 rounded-full text-sm font-medium transition-colors ${
                      userProfile.proteinPrefs.includes(protein)
                        ? 'bg-purple-600 text-white'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    {protein}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Cuisine Preferences */}
        <div className="bg-white rounded-2xl p-4 mb-4 shadow-sm">
          <h3 className="font-bold text-gray-800 mb-4 flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-purple-600" />
            Cuisine Preferences
          </h3>
          
          <div className="space-y-3">
            <div>
              <p className="text-sm text-gray-600 mb-2">I love...</p>
              <div className="flex flex-wrap gap-2">
                {['Italian', 'Thai', 'Mexican', 'Indian', 'Japanese', 'Mediterranean'].map(cuisine => (
                  <button
                    key={cuisine}
                    onClick={() => {
                      setUserProfile(prev => ({
                        ...prev,
                        cuisinePrefs: {
                          ...prev.cuisinePrefs,
                          liked: prev.cuisinePrefs.liked.includes(cuisine)
                            ? prev.cuisinePrefs.liked.filter(c => c !== cuisine)
                            : [...prev.cuisinePrefs.liked, cuisine]
                        }
                      }));
                    }}
                    className={`px-3 py-1.5 rounded-full text-sm font-medium transition-colors ${
                      userProfile.cuisinePrefs.liked.includes(cuisine)
                        ? 'bg-green-600 text-white'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    {cuisine}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <p className="text-sm text-gray-600 mb-2">Not a fan of...</p>
              <div className="flex flex-wrap gap-2">
                {['Spicy', 'Raw Fish', 'Strong Cheese', 'Fermented'].map(dislike => (
                  <button
                    key={dislike}
                    onClick={() => {
                      setUserProfile(prev => ({
                        ...prev,
                        cuisinePrefs: {
                          ...prev.cuisinePrefs,
                          disliked: prev.cuisinePrefs.disliked.includes(dislike)
                            ? prev.cuisinePrefs.disliked.filter(d => d !== dislike)
                            : [...prev.cuisinePrefs.disliked, dislike]
                        }
                      }));
                    }}
                    className={`px-3 py-1.5 rounded-full text-sm font-medium transition-colors ${
                      userProfile.cuisinePrefs.disliked.includes(dislike)
                        ? 'bg-gray-600 text-white'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    {dislike}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Settings */}
        <div className="bg-white rounded-2xl p-4 shadow-sm">
          <h3 className="font-bold text-gray-800 mb-4 flex items-center gap-2">
            <Settings className="w-5 h-5 text-gray-600" />
            Settings
          </h3>
          
          <div className="space-y-3">
            <button className="w-full flex items-center justify-between p-3 hover:bg-gray-50 rounded-lg transition-colors">
              <span className="text-gray-700">Notifications</span>
              <ChevronRight className="w-5 h-5 text-gray-400" />
            </button>
            <button className="w-full flex items-center justify-between p-3 hover:bg-gray-50 rounded-lg transition-colors">
              <span className="text-gray-700">Payment Methods</span>
              <ChevronRight className="w-5 h-5 text-gray-400" />
            </button>
            <button className="w-full flex items-center justify-between p-3 hover:bg-gray-50 rounded-lg transition-colors">
              <span className="text-gray-700">Order History</span>
              <ChevronRight className="w-5 h-5 text-gray-400" />
            </button>
            <button className="w-full flex items-center justify-between p-3 hover:bg-gray-50 rounded-lg transition-colors">
              <span className="text-gray-700">Help & Support</span>
              <ChevronRight className="w-5 h-5 text-gray-400" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  const renderCheckoutModal = () => {
    if (!showCheckout) return null;

    const lunchTimes = ['11:30 AM', '11:45 AM', '12:00 PM', '12:15 PM', '12:30 PM', '12:45 PM', '1:00 PM', '1:15 PM'];
    const dinnerTimes = ['5:00 PM', '5:15 PM', '5:30 PM', '5:45 PM', '6:00 PM', '6:15 PM', '6:30 PM', '6:45 PM'];
    
    const hasLunch = Object.keys(selectedMeals).some(id => id <= 3 && selectedMeals[id] > 0);
    const hasDinner = Object.keys(selectedMeals).some(id => id > 3 && selectedMeals[id] > 0);

    return (
      <div className="fixed inset-0 bg-black/50 z-50 flex items-end">
        <div className="bg-white rounded-t-3xl p-6 w-full max-h-[80vh] overflow-y-auto">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-2xl font-bold text-gray-800">Complete Order</h3>
            <button 
              onClick={() => setShowCheckout(false)}
              className="p-2 hover:bg-gray-100 rounded-full"
            >
              <X className="w-6 h-6 text-gray-600" />
            </button>
          </div>

          {/* Pickup Times */}
          {hasLunch && (
            <div className="mb-6">
              <h4 className="font-semibold text-gray-700 mb-3 flex items-center gap-2">
                <Clock className="w-5 h-5 text-purple-600" />
                Lunch Pickup Time
              </h4>
              <div className="grid grid-cols-4 gap-2">
                {lunchTimes.map(time => (
                  <button
                    key={time}
                    onClick={() => setSelectedPickupTime({ lunch: time })}
                    className={`py-2 px-3 rounded-lg text-sm font-medium transition-all ${
                      selectedPickupTime?.lunch === time
                        ? 'bg-purple-600 text-white'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    {time}
                  </button>
                ))}
              </div>
            </div>
          )}

          {hasDinner && (
            <div className="mb-6">
              <h4 className="font-semibold text-gray-700 mb-3 flex items-center gap-2">
                <Clock className="w-5 h-5 text-purple-600" />
                Dinner Pickup Time
              </h4>
              <div className="grid grid-cols-4 gap-2">
                {dinnerTimes.map(time => (
                  <button
                    key={time}
                    onClick={() => setSelectedPickupTime(prev => ({ ...prev, dinner: time }))}
                    className={`py-2 px-3 rounded-lg text-sm font-medium transition-all ${
                      selectedPickupTime?.dinner === time
                        ? 'bg-purple-600 text-white'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    {time}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Order Summary */}
          <div className="bg-gray-50 rounded-xl p-4 mb-6">
            <h4 className="font-semibold text-gray-700 mb-3">Order Summary</h4>
            {Object.keys(selectedMeals).filter(id => selectedMeals[id] > 0).map(mealId => {
              const meal = [...menuData.tomorrow.lunch, ...menuData.tomorrow.dinner].find(m => m.id === parseInt(mealId));
              return (
                <div key={mealId} className="flex justify-between items-center mb-2">
                  <span className="text-gray-600">
                    {selectedMeals[mealId]}x {meal?.name}
                  </span>
                  <span className="font-medium">${(selectedMeals[mealId] * 6.99).toFixed(2)}</span>
                </div>
              );
            })}
            <div className="border-t pt-2 mt-2">
              <div className="flex justify-between items-center font-bold">
                <span>Total</span>
                <span className="text-xl">${calculateTotal().toFixed(2)}</span>
              </div>
            </div>
          </div>

          {/* Payment Options */}
          <div className="space-y-3 mb-6">
            <button className="w-full bg-black text-white py-4 rounded-xl font-semibold flex items-center justify-center gap-3 hover:bg-gray-900 transition-colors">
              <span className="text-xl">🍎</span>
              Apple Pay
            </button>
            
            <button className="w-full bg-white border-2 border-gray-200 text-gray-800 py-4 rounded-xl font-semibold flex items-center justify-center gap-3 hover:bg-gray-50 transition-colors">
              <span className="text-xl">💳</span>
              Add Card
            </button>
          </div>

          {/* Saved Payment Methods */}
          <div className="mb-6">
            <p className="text-sm text-gray-600 mb-2">Or use saved card</p>
            <button className="w-full bg-purple-50 border-2 border-purple-200 p-4 rounded-xl flex items-center justify-between hover:bg-purple-100 transition-colors">
              <div className="flex items-center gap-3">
                <div className="w-10 h-7 bg-gradient-to-r from-blue-600 to-blue-400 rounded"></div>
                <div className="text-left">
                  <p className="font-semibold text-gray-800">•••• 4242</p>
                  <p className="text-xs text-gray-600">Expires 12/25</p>
                </div>
              </div>
              <Check className="w-5 h-5 text-purple-600" />
            </button>
          </div>

          {/* Complete Order Button */}
          <button 
            onClick={() => {
              setShowCheckout(false);
              setSelectedMeals({});
              alert('Order confirmed! You\'ll receive a notification before pickup.');
            }}
            disabled={!selectedPickupTime || (hasLunch && !selectedPickupTime?.lunch) || (hasDinner && !selectedPickupTime?.dinner)}
            className={`w-full py-4 rounded-xl font-bold text-lg transition-all ${
              selectedPickupTime && (!hasLunch || selectedPickupTime?.lunch) && (!hasDinner || selectedPickupTime?.dinner)
                ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-lg'
                : 'bg-gray-200 text-gray-400 cursor-not-allowed'
            }`}
          >
            Complete Order
          </button>

          <p className="text-center text-xs text-gray-500 mt-3">
            Your payment info is secured and never stored on our servers
          </p>
        </div>
      </div>
    );
  };

  const renderFeedbackModal = () => {
    if (!showFeedback) return null;

    return (
      <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-3xl p-6 max-w-sm w-full">
          <h3 className="text-xl font-bold text-gray-800 mb-4">How was your meal?</h3>
          
          <div className="mb-4">
            <p className="text-sm text-gray-600 mb-2">Rate your experience</p>
            <div className="flex gap-2 justify-center">
              {[1, 2, 3, 4, 5].map(rating => (
                <button key={rating} className="p-2">
                  <Star className="w-8 h-8 text-yellow-500 fill-yellow-500" />
                </button>
              ))}
            </div>
          </div>

          <div className="mb-4">
            <p className="text-sm text-gray-600 mb-2">Quick feedback</p>
            <div className="flex flex-wrap gap-2">
              {['Delicious!', 'Good portion', 'Fresh', 'Too salty', 'Cold'].map(tag => (
                <button
                  key={tag}
                  className="px-3 py-1.5 bg-gray-100 text-gray-700 rounded-full text-sm hover:bg-purple-100 hover:text-purple-700 transition-colors"
                >
                  {tag}
                </button>
              ))}
            </div>
          </div>

          <textarea
            placeholder="Any other comments? (optional)"
            className="w-full p-3 border border-gray-200 rounded-xl text-sm resize-none h-20 mb-4"
          />

          <div className="flex gap-3">
            <button 
              onClick={() => setShowFeedback(false)}
              className="flex-1 py-3 bg-gray-100 text-gray-700 rounded-xl font-semibold"
            >
              Skip
            </button>
            <button 
              onClick={() => setShowFeedback(false)}
              className="flex-1 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-xl font-semibold"
            >
              Submit
            </button>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {activeScreen === 'home' && renderHomeScreen()}
      {activeScreen === 'profile' && renderProfileScreen()}
      
      {renderCheckoutModal()}
      {renderFeedbackModal()}

      {/* Bottom Navigation */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200">
        <div className="flex justify-around py-2">
          <button 
            onClick={() => setActiveScreen('home')}
            className={`flex flex-col items-center p-2 ${activeScreen === 'home' ? 'text-purple-600' : 'text-gray-400'}`}
          >
            <Home className="w-6 h-6" />
            <span className="text-xs mt-1">Order</span>
          </button>
          <button className="flex flex-col items-center p-2 text-gray-400">
            <Calendar className="w-6 h-6" />
            <span className="text-xs mt-1">Schedule</span>
          </button>
          <button className="flex flex-col items-center p-2 text-gray-400">
            <BarChart3 className="w-6 h-6" />
            <span className="text-xs mt-1">Impact</span>
          </button>
          <button 
            onClick={() => setActiveScreen('profile')}
            className={`flex flex-col items-center p-2 ${activeScreen === 'profile' ? 'text-purple-600' : 'text-gray-400'}`}
          >
            <User className="w-6 h-6" />
            <span className="text-xs mt-1">Profile</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default CodysApp;