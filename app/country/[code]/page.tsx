import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Breadcrumb from '@/components/Breadcrumb';
import AirportTable from '@/components/AirportTable';
import {
  getCountryByCode,
  getAirportsByCountry,
  getCountriesWithAirports,
} from '@/lib/airports';

interface PageProps {
  params: { code: string };
}

export async function generateStaticParams() {
  const countries = getCountriesWithAirports();
  return countries.map((country) => ({
    code: country.code.toLowerCase(),
  }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const country = getCountryByCode(params.code);

  if (!country) {
    return {
      title: 'Country Not Found',
    };
  }

  const airports = getAirportsByCountry(params.code);

  return {
    title: `${country.name} Airport Codes: Complete List of ${country.name} Airports & IATA Codes`,
    description: `Browse all airport codes in ${country.name}. Find IATA codes for ${airports.length}+ major ${country.name} airports with detailed information including location and timezone.`,
    keywords: `${country.name} airports, ${country.name} airport codes, IATA codes ${country.name}`,
  };
}

export default function CountryPage({ params }: PageProps) {
  const country = getCountryByCode(params.code);

  if (!country) {
    notFound();
  }

  const countryAirports = getAirportsByCountry(params.code);

  if (countryAirports.length === 0) {
    notFound();
  }

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <Breadcrumb items={[{ label: country.name }]} />

      {/* Country Header */}
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          {country.name} Airport Codes Directory
        </h1>
        <p className="text-xl text-gray-600">
          Complete list of all {countryAirports.length} airports in {country.name} with IATA and ICAO codes
        </p>
      </div>

      {/* Description */}
      <section className="mb-8 bg-white p-6 rounded-lg border-2 border-gray-200">
        <p className="text-gray-700 leading-relaxed">
          This page lists all major airports in {country.name}, including their three-letter IATA codes
          and four-letter ICAO codes. Click on any airport code to view detailed information including
          location, timezone, coordinates, and nearby airports.
        </p>
      </section>

      {/* Airport Table */}
      <section className="mb-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">
          All Airports in {country.name}
        </h2>
        <AirportTable airports={countryAirports} />
      </section>

      {/* Additional Info */}
      <section className="bg-white p-6 rounded-lg border-2 border-gray-200">
        <h2 className="text-xl font-semibold text-gray-900 mb-3">
          About {country.name} Airports
        </h2>
        <p className="text-gray-700 leading-relaxed mb-4">
          {country.name} has {countryAirports.length} major {countryAirports.length === 1 ? 'airport' : 'airports'} with
          international and domestic flight connections. Each airport is identified by a unique
          IATA code (used for ticketing and baggage) and ICAO code (used for air traffic control).
        </p>
        <p className="text-gray-700 leading-relaxed">
          The airports listed above serve as important transportation hubs, connecting {country.name} to
          destinations around the world. Click on any airport code to learn more about specific facilities,
          location details, and nearby alternative airports.
        </p>
      </section>
    </div>
  );
}
