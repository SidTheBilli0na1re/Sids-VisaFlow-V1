# Sids-VisaFlow-V1

A minimal visa document scanner and application tracker built with Next.js.

## Features

- 📸 Document scanning with OCR (Tesseract.js)
- ✅ Visa requirement detection
- 📊 Application status tracking
- 🔔 Email notifications for visa updates
- 📱 Responsive design
- 🚀 Deployable to GitHub Pages

## Local Development

### Prerequisites

- Node.js 18+ 
- pnpm (recommended) or npm

### Setup

1. Install dependencies:
```bash
pnpm install
```

2. Run the development server:
```bash
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Building for Production

To build the static site:
```bash
pnpm build
```

The static files will be generated in the `out/` directory.

## Deploying to GitHub Pages

This project is configured for automatic deployment to GitHub Pages using GitHub Actions.

### Setup Steps

1. **Push to GitHub**: Make sure your code is pushed to the `main` branch of your GitHub repository.

2. **Enable GitHub Pages**:
   - Go to your repository Settings
   - Scroll to "Pages" section
   - Under "Build and deployment", select "GitHub Actions" as the source
   - Click Save

3. **GitHub Actions will automatically**:
   - Build your project on every push to `main`
   - Generate static files
   - Deploy to GitHub Pages

Your site will be live at: `https://<your-username>.github.io/<repo-name>/`

### How It Works

The GitHub Actions workflow (`.github/workflows/deploy.yml`):
- Installs dependencies
- Builds the Next.js app as static files
- Uploads the `out/` folder to GitHub Pages
- GitHub Pages serves it automatically

## Project Structure

```
├── app/              # Next.js app directory
├── components/       # React components
├── lib/              # Utility functions
├── styles/           # Global CSS
└── .github/workflows # GitHub Actions configuration
```

## Technologies

- **Next.js 16** - React framework
- **TypeScript** - Type safety
- **Tailwind CSS** - Styling
- **Tesseract.js** - OCR (text extraction)
- **React Hook Form** - Form management
- **Recharts** - Data visualization
- **Radix UI** - UI components

## License

MIT