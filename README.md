# AI Analytics Directory

A curated directory of AI analytics tools built with Next.js, TypeScript, and Tailwind CSS.

## Features

- 🔍 **Tool Discovery**: Browse and filter AI analytics tools by category and technicality level
- 📊 **Categorization**: Tools organized by categories like Data Visualization, Business Intelligence, Machine Learning, etc.
- 🎯 **Filtering**: Filter tools by category and technicality level (Low, Medium, High)
- 📱 **Responsive Design**: Works seamlessly on desktop and mobile devices
- 🎨 **Modern UI**: Built with Shadcn/ui components and Tailwind CSS

## Local Development Setup

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

1. **Clone and navigate to the directory**:
   ```bash
   cd AI-Analytics-Directory
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Set up environment variables**:
   The project is configured to use mock data by default for local development. The `.env.local` file is already set up with:
   ```
   NEXT_PUBLIC_USE_MOCK_DATA=true
   ```

4. **Start the development server**:
   ```bash
   npm run dev
   ```

5. **Open your browser**:
   Navigate to [http://localhost:3000](http://localhost:3000)

### Mock Data vs Supabase

The application can run in two modes:

#### Mock Data Mode (Default for Local Development)
- Uses local mock data defined in `lib/mockData.ts`
- No external dependencies required
- Perfect for development and testing UI changes
- Set `NEXT_PUBLIC_USE_MOCK_DATA=true` in `.env.local`

#### Supabase Mode (Production)
- Connects to a real Supabase database
- Requires Supabase credentials
- Set `NEXT_PUBLIC_USE_MOCK_DATA=false` and provide:
  ```
  NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
  NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_key
  ```

## Project Structure

```
AI-Analytics-Directory/
├── app/                    # Next.js app directory
│   ├── page.tsx           # Main page component
│   ├── layout.tsx         # Root layout
│   ├── store/             # Zustand state management
│   └── types/             # TypeScript type definitions
├── components/ui/         # Reusable UI components
├── lib/                   # Utility functions and services
│   ├── mockData.ts        # Mock data for local development
│   ├── localDataService.ts # Mock Supabase client
│   └── supabaseClient.ts  # Supabase client configuration
└── assets/               # Static assets (images, logos)
```

## Available Scripts

- `npm run dev` - Start development server with Turbopack
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

## Technologies Used

- **Framework**: Next.js 15 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **UI Components**: Shadcn/ui (Radix UI primitives)
- **State Management**: Zustand
- **Database**: Supabase (PostgreSQL) or Mock Data
- **Analytics**: PostHog (optional)

## Adding New Tools

To add new tools to the mock data:

1. Edit `lib/mockData.ts`
2. Add new tool objects to the `mockTools` array
3. Follow the existing structure with required fields:
   - `tool_id`: Unique identifier
   - `tool_name`: Display name
   - `category`: Array of category IDs
   - `technicality_level`: "Low", "Medium", or "High"
   - `short_description`: Brief description
   - `url`: Official website URL
   - `rls`: Set to `true` for published tools
   - `logo_path`: Logo filename (optional)
   - `slug`: URL-friendly identifier

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test locally using mock data
5. Submit a pull request

## License

This project is open source and available under the MIT License.
