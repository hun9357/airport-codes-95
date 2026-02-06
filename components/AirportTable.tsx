import Link from 'next/link';
import type { Airport } from '@/lib/airports';

interface AirportTableProps {
  airports: Airport[];
}

export default function AirportTable({ airports }: AirportTableProps) {
  return (
    <div className="overflow-x-auto bg-white border-2 border-gray-200 rounded-lg">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
              IATA Code
            </th>
            <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
              Airport Name
            </th>
            <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
              City
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {airports.map((airport) => (
            <tr key={airport.iata} className="hover:bg-blue-50 transition-colors">
              <td className="px-6 py-4 whitespace-nowrap">
                <Link
                  href={`/airport/${airport.iata.toLowerCase()}`}
                  className="text-primary font-bold hover:underline text-lg"
                >
                  {airport.iata}
                </Link>
              </td>
              <td className="px-6 py-4">
                <Link
                  href={`/airport/${airport.iata.toLowerCase()}`}
                  className="text-gray-900 hover:text-primary hover:underline"
                >
                  {airport.name}
                </Link>
              </td>
              <td className="px-6 py-4 text-gray-600">
                {airport.city}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
