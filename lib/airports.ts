import airportsData from '@/data/airports.json';
import countriesData from '@/data/countries.json';

export interface Airport {
  iata: string;
  icao: string;
  name: string;
  city: string;
  country: string;
  countryCode: string;
  latitude: number;
  longitude: number;
  timezone: string;
}

export interface Country {
  code: string;
  name: string;
  continent: string;
}

export const airports: Airport[] = airportsData;
export const countries: Country[] = countriesData;

export function getAirportByCode(code: string): Airport | undefined {
  const upperCode = code.toUpperCase();
  return airports.find(
    (airport) =>
      airport.iata.toUpperCase() === upperCode ||
      airport.icao.toUpperCase() === upperCode
  );
}

export function getAirportsByCountry(countryCode: string): Airport[] {
  return airports.filter(
    (airport) => airport.countryCode.toUpperCase() === countryCode.toUpperCase()
  );
}

export function getCountryByCode(code: string): Country | undefined {
  return countries.find(
    (country) => country.code.toUpperCase() === code.toUpperCase()
  );
}

export function searchAirports(query: string): Airport[] {
  if (!query || query.length < 2) return [];

  const lowerQuery = query.toLowerCase();

  return airports.filter((airport) => {
    return (
      airport.iata.toLowerCase().includes(lowerQuery) ||
      airport.icao.toLowerCase().includes(lowerQuery) ||
      airport.name.toLowerCase().includes(lowerQuery) ||
      airport.city.toLowerCase().includes(lowerQuery) ||
      airport.country.toLowerCase().includes(lowerQuery)
    );
  });
}

export function getNearbyAirports(
  airport: Airport,
  limit: number = 5
): Airport[] {
  return airports
    .filter((a) =>
      a.countryCode === airport.countryCode &&
      a.iata !== airport.iata
    )
    .slice(0, limit);
}

export function getFeaturedAirports(limit: number = 10): Airport[] {
  // Return major international airports
  const featured = [
    'ATL', 'DXB', 'LAX', 'ORD', 'LHR',
    'HND', 'CDG', 'ICN', 'SIN', 'JFK'
  ];

  return featured
    .map((code) => getAirportByCode(code))
    .filter((airport): airport is Airport => airport !== undefined)
    .slice(0, limit);
}

export function getCountriesWithAirports(): Country[] {
  const countryCodesWithAirports = new Set(
    airports.map((airport) => airport.countryCode)
  );

  return countries.filter((country) =>
    countryCodesWithAirports.has(country.code)
  );
}

export function getAirportCount(countryCode: string): number {
  return airports.filter(
    (airport) => airport.countryCode === countryCode
  ).length;
}
