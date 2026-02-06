import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import Breadcrumb from '@/components/Breadcrumb';
import { getAirportByCode, getNearbyAirports, airports } from '@/lib/airports';

interface PageProps {
  params: { code: string };
}

export async function generateStaticParams() {
  return airports.map((airport) => ({
    code: airport.iata.toLowerCase(),
  }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const airport = getAirportByCode(params.code);

  if (!airport) {
    return {
      title: 'Airport Not Found',
    };
  }

  return {
    title: `${airport.iata} Airport Code: ${airport.name} | Full Details`,
    description: `${airport.iata} is the airport code for ${airport.name} in ${airport.city}, ${airport.country}. Get IATA code, ICAO code, location, timezone info & more.`,
    keywords: `${airport.iata}, ${airport.icao}, ${airport.name}, ${airport.city} airport, airport code`,
  };
}

export default function AirportPage({ params }: PageProps) {
  const airport = getAirportByCode(params.code);

  if (!airport) {
    notFound();
  }

  const nearbyAirports = getNearbyAirports(airport, 5);

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <Breadcrumb
        items={[
          {
            label: airport.country,
            href: `/country/${airport.countryCode.toLowerCase()}`,
          },
          { label: airport.iata },
        ]}
      />

      {/* AdSense Placeholder - Top */}
      {/* TODO: Add Google AdSense code here */}
      <div className="my-6 p-4 bg-gray-100 border-2 border-dashed border-gray-300 rounded-lg text-center text-gray-500">
        Advertisement Space
      </div>

      {/* Airport Header */}
      <div className="mb-8">
        <div className="flex items-start justify-between mb-4">
          <h1 className="text-4xl font-bold text-gray-900">
            {airport.iata} Airport Code - {airport.name}
          </h1>
        </div>
        <p className="text-xl text-gray-600">
          {airport.city}, {airport.country}
        </p>
      </div>

      {/* Quick Facts Table */}
      <section className="mb-12 bg-white border-2 border-gray-200 rounded-lg overflow-hidden">
        <div className="bg-primary text-white px-6 py-3">
          <h2 className="text-xl font-semibold">Quick Facts</h2>
        </div>
        <div className="divide-y divide-gray-200">
          <div className="grid grid-cols-1 md:grid-cols-2">
            <div className="px-6 py-4 bg-gray-50 font-semibold">IATA Code</div>
            <div className="px-6 py-4">{airport.iata}</div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2">
            <div className="px-6 py-4 bg-gray-50 font-semibold">ICAO Code</div>
            <div className="px-6 py-4">{airport.icao}</div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2">
            <div className="px-6 py-4 bg-gray-50 font-semibold">City</div>
            <div className="px-6 py-4">{airport.city}</div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2">
            <div className="px-6 py-4 bg-gray-50 font-semibold">Country</div>
            <div className="px-6 py-4">
              <Link
                href={`/country/${airport.countryCode.toLowerCase()}`}
                className="text-primary hover:underline"
              >
                {airport.country}
              </Link>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2">
            <div className="px-6 py-4 bg-gray-50 font-semibold">Timezone</div>
            <div className="px-6 py-4">{airport.timezone}</div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2">
            <div className="px-6 py-4 bg-gray-50 font-semibold">Coordinates</div>
            <div className="px-6 py-4">
              {airport.latitude.toFixed(4)}°, {airport.longitude.toFixed(4)}°
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="mb-12 bg-white p-8 rounded-lg border-2 border-gray-200">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">
          About {airport.name}
        </h2>
        <p className="text-gray-700 leading-relaxed mb-4">
          {airport.name} ({airport.iata}/{airport.icao}) is located in {airport.city}, {airport.country}.
          This airport serves as a key transportation hub in the region, connecting passengers to destinations worldwide.
        </p>
        <p className="text-gray-700 leading-relaxed">
          The three-letter IATA code <strong>{airport.iata}</strong> is used for airline tickets and baggage handling,
          while the four-letter ICAO code <strong>{airport.icao}</strong> is used for air traffic control and flight operations.
          The airport operates in the {airport.timezone} timezone.
        </p>
      </section>

      {/* Nearby Airports */}
      {nearbyAirports.length > 0 && (
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            Other Airports in {airport.country}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {nearbyAirports.map((nearbyAirport) => (
              <Link
                key={nearbyAirport.iata}
                href={`/airport/${nearbyAirport.iata.toLowerCase()}`}
                className="p-6 bg-white border-2 border-gray-200 rounded-lg hover:border-primary hover:shadow-lg transition-all duration-200"
              >
                <div className="flex items-start justify-between mb-2">
                  <h3 className="text-xl font-bold text-primary">
                    {nearbyAirport.iata}
                  </h3>
                  <span className="text-xs font-mono text-gray-500 bg-gray-100 px-2 py-1 rounded">
                    {nearbyAirport.icao}
                  </span>
                </div>
                <h4 className="font-semibold text-gray-900 mb-1">
                  {nearbyAirport.name}
                </h4>
                <p className="text-sm text-gray-600">{nearbyAirport.city}</p>
              </Link>
            ))}
          </div>
        </section>
      )}

      {/* FAQ Section */}
      <section className="mb-12 bg-white p-8 rounded-lg border-2 border-gray-200">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">
          Frequently Asked Questions
        </h2>

        <div className="space-y-6">
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              What is the {airport.iata} airport code?
            </h3>
            <p className="text-gray-700 leading-relaxed">
              {airport.iata} is the IATA airport code for {airport.name} in {airport.city}, {airport.country}.
              This three-letter code is used by airlines and travel agencies worldwide.
            </p>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              What is the ICAO code for {airport.iata}?
            </h3>
            <p className="text-gray-700 leading-relaxed">
              The ICAO code for {airport.name} is {airport.icao}. This four-letter code is used in air traffic control
              and flight planning operations.
            </p>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              Where is {airport.iata} airport located?
            </h3>
            <p className="text-gray-700 leading-relaxed">
              {airport.name} is located in {airport.city}, {airport.country}.
              The exact coordinates are {airport.latitude.toFixed(4)}° latitude and {airport.longitude.toFixed(4)}° longitude.
            </p>
          </div>
        </div>
      </section>

      {/* AdSense Placeholder - Bottom */}
      {/* TODO: Add Google AdSense code here */}
      <div className="my-6 p-4 bg-gray-100 border-2 border-dashed border-gray-300 rounded-lg text-center text-gray-500">
        Advertisement Space
      </div>
    </div>
  );
}
