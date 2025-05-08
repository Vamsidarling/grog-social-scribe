
# Social Media Scribe

A modern web application for effortlessly generating tailored content for different social media platforms.

## Features

- **Multi-Platform Content Generation**: Create unique, platform-optimized social media posts for Twitter, Instagram, Facebook, and LinkedIn.
- **User Authentication**: Secure user accounts with Supabase authentication.
- **Responsive Design**: Fully responsive layout works on any device.
- **Dark/Light Mode**: Toggle between color schemes based on user preference.
- **Content History**: Save and access previously generated content.

## Technology Stack

- **Frontend**:
  - React with TypeScript
  - Tailwind CSS for styling
  - shadcn/ui component library
  - React Router for navigation
  - Tanstack React Query for data fetching

- **Backend**:
  - Supabase for authentication and database
  - Edge Functions for content generation

## Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── ui/              # shadcn/ui components
│   ├── BackButton.tsx   # Navigation back button
│   ├── ContentForm.tsx  # User input form
│   ├── Header.tsx       # Application header
│   ├── PlatformCard.tsx # Social platform cards
│   └── ThemeToggle.tsx  # Dark/light mode toggle
├── hooks/               # Custom React hooks
│   ├── useAuth.tsx              # Authentication state management
│   ├── useContentGeneration.tsx # Content generation logic
│   └── useTheme.tsx             # Theme management
├── integrations/        # External service integrations
│   └── supabase/        # Supabase client and types
├── layouts/             # Page layout components
│   └── AuthLayout.tsx   # Layout for authenticated pages
├── lib/                 # Utility libraries
│   └── utils.ts         # General utility functions
├── pages/               # Application pages
│   ├── Auth.tsx         # Authentication page
│   ├── Index.tsx        # Home page
│   ├── NotFound.tsx     # 404 page
│   └── Profile.tsx      # User profile page
├── services/            # API services
│   └── grogService.ts   # Content generation service
├── App.tsx              # Main application component
└── main.tsx             # Application entry point
```

## Getting Started

### Prerequisites

- Node.js (v16+)
- npm or yarn

### Installation

1. Clone the repository
```
git clone https://github.com/yourusername/social-media-scribe.git
cd social-media-scribe
```

2. Install dependencies
```
npm install
```

3. Start the development server
```
npm run dev
```

4. Open your browser and navigate to `http://localhost:5173`

## Environment Variables

Create a `.env.local` file in the root directory with the following variables:

```
VITE_SUPABASE_URL=your-supabase-url
VITE_SUPABASE_ANON_KEY=your-supabase-anon-key
```

## Deployment

This project can be deployed using Lovable:

1. Navigate to your project in Lovable
2. Click on "Share" -> "Publish"
3. Follow the deployment instructions

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.
