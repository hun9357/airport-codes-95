# Airport Codes Database

A comprehensive Next.js application for searching and browsing airport codes worldwide. Features 200+ major airports with detailed information including IATA/ICAO codes, location, timezone, and coordinates.

## Features

- **Search Functionality**: Real-time client-side search by airport code, name, or city
- **Airport Details**: Individual pages for 200+ airports with comprehensive information
- **Country Browsing**: Browse airports by country (20+ countries)
- **Static Generation**: All pages pre-rendered for optimal performance
- **Mobile Responsive**: Clean, modern design that works on all devices
- **SEO Optimized**: Comprehensive metadata for search engine visibility

## Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Deployment**: Vercel (static export)

## Project Structure

```
/app
  /page.tsx                 # Homepage with search and featured airports
  /layout.tsx               # Root layout with header/footer
  /airport/[code]/page.tsx  # Airport detail pages (200+ static)
  /country/[code]/page.tsx  # Country pages (20+ static)
  /globals.css              # Global styles
/components
  /SearchBox.tsx            # Client-side search component
  /AirportCard.tsx          # Airport card display
  /AirportTable.tsx         # Airport table for country pages
  /Breadcrumb.tsx           # Navigation breadcrumbs
/data
  /airports.json            # 200+ airport records
  /countries.json           # Country metadata
/lib
  /airports.ts              # Data utilities and helper functions
```

## Getting Started

### Prerequisites

- Node.js 18+ and npm

### Installation

1. Install dependencies:
```bash
npm install
```

2. Run the development server:
```bash
npm run dev
```

3. Open [http://localhost:3000](http://localhost:3000) in your browser

### Build for Production

```bash
npm run build
```

This will generate a static export in the `/out` directory.

## Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Connect your repository to Vercel
3. Configure build settings:
   - Build Command: `npm run build`
   - Output Directory: `out`
4. Deploy

The site will be automatically deployed with each push to your main branch.

### Other Static Hosts

Since this is a static export, you can deploy to any static hosting service:
- Netlify
- GitHub Pages
- Cloudflare Pages
- AWS S3 + CloudFront

Simply upload the contents of the `/out` directory after building.

## Adding AdSense

AdSense placeholders are marked with HTML comments in:
- Homepage (top and bottom)
- Airport detail pages (top and bottom)

Replace the placeholder divs with your Google AdSense code:

```html
<!-- TODO: Add Google AdSense code here -->
<div class="my-8 p-4 bg-gray-100...">
  Advertisement Space
</div>
```

## Data Management

### Adding New Airports

Edit `/data/airports.json` and add new airport entries following the schema:

```json
{
  "iata": "LAX",
  "icao": "KLAX",
  "name": "Los Angeles International Airport",
  "city": "Los Angeles",
  "country": "United States",
  "countryCode": "US",
  "latitude": 33.9425,
  "longitude": -118.408,
  "timezone": "America/Los_Angeles"
}
```

### Adding New Countries

Edit `/data/countries.json` to add countries:

```json
{
  "code": "US",
  "name": "United States",
  "continent": "North America"
}
```

After making changes, rebuild the site to regenerate static pages.

## Performance

- **Build Time**: ~30-60 seconds for 220+ pages
- **Page Load**: <100KB First Load JS per page
- **SEO**: Fully static HTML with metadata
- **Mobile**: Responsive design with Tailwind CSS

## License

This project is open source and available under the MIT License.

## Support

For issues or questions, please open an issue on GitHub.
