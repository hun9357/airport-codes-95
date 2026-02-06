import SearchBox from '@/components/SearchBox';
import AirportCard from '@/components/AirportCard';
import { getFeaturedAirports, getCountriesWithAirports, getAirportCount } from '@/lib/airports';
import Link from 'next/link';

export default function Home() {
  const featuredAirports = getFeaturedAirports(10);
  const countriesWithAirports = getCountriesWithAirports();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Hero Section */}
      <div className="text-center mb-12">
        <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4">
          Find Any Airport Code Worldwide
        </h1>
        <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
          Instantly search IATA and ICAO codes for over 200 major airports around the world.
          Get detailed information including location, timezone, and coordinates.
        </p>
        <SearchBox />
      </div>

      {/* AdSense Placeholder - Top */}
      {/* TODO: Add Google AdSense code here */}
      <div className="my-8 p-4 bg-gray-100 border-2 border-dashed border-gray-300 rounded-lg text-center text-gray-500">
        Advertisement Space
      </div>

      {/* Featured Airports */}
      <section className="mb-16">
        <h2 className="text-3xl font-bold text-gray-900 mb-6">
          Major International Airports
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {featuredAirports.map((airport) => (
            <AirportCard key={airport.iata} airport={airport} />
          ))}
        </div>
      </section>

      {/* Browse by Country */}
      <section className="mb-16">
        <h2 className="text-3xl font-bold text-gray-900 mb-6">
          Browse Airports by Country
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {countriesWithAirports.map((country) => {
            const airportCount = getAirportCount(country.code);
            return (
              <Link
                key={country.code}
                href={`/country/${country.code.toLowerCase()}`}
                className="p-6 bg-white border-2 border-gray-200 rounded-lg hover:border-primary hover:shadow-lg transition-all duration-200"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-semibold text-gray-900 text-lg mb-1">
                      {country.name}
                    </h3>
                    <p className="text-sm text-gray-600">
                      {airportCount} {airportCount === 1 ? 'airport' : 'airports'}
                    </p>
                  </div>
                  <div className="text-2xl">{getFlagEmoji(country.code)}</div>
                </div>
              </Link>
            );
          })}
        </div>
      </section>

      {/* What is IATA/ICAO Section */}
      <section className="mb-16 bg-white p-8 rounded-lg border-2 border-gray-200">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">
          Understanding Airport Codes
        </h2>
        <div className="grid md:grid-cols-2 gap-8">
          <div>
            <h3 className="text-xl font-semibold text-primary mb-3">
              What is an IATA Code?
            </h3>
            <p className="text-gray-700 leading-relaxed">
              IATA codes are three-letter airport identifiers assigned by the International Air Transport Association.
              These codes are commonly used on tickets, baggage tags, and flight information displays.
              Examples include LAX (Los Angeles), JFK (New York), and LHR (London Heathrow).
            </p>
          </div>
          <div>
            <h3 className="text-xl font-semibold text-primary mb-3">
              What is an ICAO Code?
            </h3>
            <p className="text-gray-700 leading-relaxed">
              ICAO codes are four-letter airport identifiers assigned by the International Civil Aviation Organization.
              These codes are primarily used in air traffic control and flight planning.
              Examples include KLAX (Los Angeles), KJFK (New York), and EGLL (London Heathrow).
            </p>
          </div>
        </div>
      </section>

      {/* AdSense Placeholder - Bottom */}
      {/* TODO: Add Google AdSense code here */}
      <div className="my-8 p-4 bg-gray-100 border-2 border-dashed border-gray-300 rounded-lg text-center text-gray-500">
        Advertisement Space
      </div>
    </div>
  );
}

function getFlagEmoji(countryCode: string): string {
  const flags: Record<string, string> = {
    US: '🇺🇸', GB: '🇬🇧', FR: '🇫🇷', DE: '🇩🇪', ES: '🇪🇸',
    IT: '🇮🇹', NL: '🇳🇱', CH: '🇨🇭', JP: '🇯🇵', CN: '🇨🇳',
    KR: '🇰🇷', SG: '🇸🇬', TH: '🇹🇭', IN: '🇮🇳', AE: '🇦🇪',
    AU: '🇦🇺', CA: '🇨🇦', MX: '🇲🇽', BR: '🇧🇷', ZA: '🇿🇦',
    TR: '🇹🇷', RU: '🇷🇺'
  };
  return flags[countryCode] || '🌍';
}
