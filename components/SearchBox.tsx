'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { searchAirports, type Airport } from '@/lib/airports';

export default function SearchBox() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<Airport[]>([]);
  const [showResults, setShowResults] = useState(false);

  useEffect(() => {
    if (query.length >= 2) {
      const searchResults = searchAirports(query);
      setResults(searchResults.slice(0, 10)); // Limit to 10 results
      setShowResults(true);
    } else {
      setResults([]);
      setShowResults(false);
    }
  }, [query]);

  return (
    <div className="relative w-full max-w-2xl mx-auto">
      <div className="relative">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={() => query.length >= 2 && setShowResults(true)}
          placeholder="Search by airport code, name, or city (e.g., LAX, London, JFK)"
          className="w-full px-6 py-4 text-lg border-2 border-gray-300 rounded-lg focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
        />
        <svg
          className="absolute right-4 top-1/2 transform -translate-y-1/2 w-6 h-6 text-gray-400"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
          />
        </svg>
      </div>

      {showResults && results.length > 0 && (
        <div className="absolute z-10 w-full mt-2 bg-white border-2 border-gray-200 rounded-lg shadow-xl max-h-96 overflow-y-auto">
          {results.map((airport) => (
            <Link
              key={airport.iata}
              href={`/airport/${airport.iata.toLowerCase()}`}
              onClick={() => {
                setShowResults(false);
                setQuery('');
              }}
              className="block px-6 py-3 hover:bg-blue-50 border-b border-gray-100 last:border-b-0 transition-colors"
            >
              <div className="flex items-center justify-between">
                <div>
                  <div className="font-semibold text-gray-900">
                    {airport.iata} - {airport.name}
                  </div>
                  <div className="text-sm text-gray-600">
                    {airport.city}, {airport.country}
                  </div>
                </div>
                <div className="text-sm font-mono text-primary bg-blue-50 px-3 py-1 rounded">
                  {airport.iata}
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}

      {showResults && query.length >= 2 && results.length === 0 && (
        <div className="absolute z-10 w-full mt-2 bg-white border-2 border-gray-200 rounded-lg shadow-xl p-4">
          <p className="text-gray-600 text-center">
            No airports found for &quot;{query}&quot;
          </p>
        </div>
      )}
    </div>
  );
}
