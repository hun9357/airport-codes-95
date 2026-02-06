import Link from 'next/link';
import type { Airport } from '@/lib/airports';

interface AirportCardProps {
  airport: Airport;
}

export default function AirportCard({ airport }: AirportCardProps) {
  return (
    <Link
      href={`/airport/${airport.iata.toLowerCase()}`}
      className="block p-6 bg-white border-2 border-gray-200 rounded-lg hover:border-primary hover:shadow-lg transition-all duration-200"
    >
      <div className="flex items-start justify-between mb-3">
        <h3 className="text-2xl font-bold text-primary">{airport.iata}</h3>
        <span className="text-xs font-mono text-gray-500 bg-gray-100 px-2 py-1 rounded">
          {airport.icao}
        </span>
      </div>
      <h4 className="font-semibold text-gray-900 mb-2 line-clamp-2">
        {airport.name}
      </h4>
      <p className="text-sm text-gray-600">
        {airport.city}, {airport.country}
      </p>
    </Link>
  );
}
