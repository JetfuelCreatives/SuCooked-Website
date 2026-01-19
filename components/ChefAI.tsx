
import React, { useState } from 'react';
import { getChefRecommendation } from '../services/geminiService';
import { Sparkles, Utensils, Loader2 } from 'lucide-react';

export const ChefAI: React.FC = () => {
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [recommendation, setRecommendation] = useState<any>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;
    setLoading(true);
    const result = await getChefRecommendation(input);
    setRecommendation(result);
    setLoading(false);
  };

  return (
    <div className="bg-dark text-white p-8 rounded-lg shadow-2xl mt-12 overflow-hidden relative">
      <div className="absolute top-0 right-0 p-4 opacity-10">
        <Utensils size={120} />
      </div>
      
      <div className="relative z-10">
        <h3 className="text-3xl font-serif mb-4 flex items-center gap-3">
          <Sparkles className="text-accent" />
          Ask Our Executive Chef
        </h3>
        <p className="text-gray-400 mb-6 max-w-lg">
          Not sure what to choose? Tell us what flavors you're craving or your dietary mood, and Chef AI will craft a bespoke suggestion.
        </p>

        <form onSubmit={handleSubmit} className="flex flex-col md:flex-row gap-4">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="e.g. 'Something light but rich in flavor' or 'I love seafood and lemon'"
            className="flex-grow bg-dark border border-accent/30 rounded-md px-4 py-3 text-white focus:outline-none focus:border-accent"
          />
          <button
            type="submit"
            disabled={loading}
            className="bg-accent hover:bg-accent-hover text-white px-8 py-3 rounded-md transition-all flex items-center justify-center min-w-[150px]"
          >
            {loading ? <Loader2 className="animate-spin" /> : 'Ask Chef'}
          </button>
        </form>

        {recommendation && (
          <div className="mt-8 p-6 border border-accent/20 bg-accent/5 rounded-lg animate-in fade-in slide-in-from-bottom-4 duration-500">
            <h4 className="text-accent font-serif text-xl mb-2">{recommendation.suggestionTitle}</h4>
            <p className="text-gray-200 mb-4">{recommendation.description}</p>
            <div className="text-sm">
              <span className="text-accent font-bold uppercase tracking-wider">Chef's Pairing:</span>
              <span className="ml-2 text-gray-400 italic">{recommendation.winePairing}</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
