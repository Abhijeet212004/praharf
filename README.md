# Prahar Personality Quiz

A Next.js implementation of the Prahar Personality Quiz with beautiful day/night cycle animations. This version shows one question per page with a horizontal progress indicator.

## Features

- **Single Question Per Page**: Clean interface focusing on one question at a time
- **Dynamic Day/Night Cycle**: Background transitions through day and night phases as users progress through the quiz
- **Celestial Animations**: Sun, moon, stars, and clouds that animate based on quiz progress
- **Horizontal Progress Indicator**: Shows progress from 0/10 to 10/10 as users navigate through questions
- **Responsive Design**: Works beautifully on mobile, tablet, and desktop

## Getting Started

### Prerequisites

- Node.js 16.x or higher
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/prahar-next.git
cd prahar-next
```

2. Install dependencies:
```bash
npm install
# or
yarn install
```

3. Run the development server:
```bash
npm run dev
# or
yarn dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser to see the application.

## Quiz Logic

The quiz implements the Prahar personality mapping system:
- Odd-numbered questions: A→P1, B→P2, C→P3, D→P4
- Even-numbered questions: A→P5, B→P6, C→P7, D→P8

The final Prahar type is determined by counting which Prahar received the most matches based on the user's answers.

## Deployment

### Deploy to Vercel

The easiest way to deploy your Next.js app is to use [Vercel](https://vercel.com/), the platform from the creators of Next.js.

1. Create an account on Vercel
2. Install Vercel CLI: `npm i -g vercel`
3. Run `vercel` in the project directory and follow the prompts

### Deploy to Netlify

You can also deploy to Netlify:

1. Create a `netlify.toml` file in the root of your project:
```toml
[build]
  command = "npm run build"
  publish = ".next"

[[plugins]]
  package = "@netlify/plugin-nextjs"
```

2. Push your code to a Git repository
3. Connect your repository to Netlify
4. Configure the build settings as specified in the toml file

## Project Structure

```
src/
├── components/       # React components
│   ├── layout/       # Layout components
│   └── quiz/         # Quiz-specific components
├── data/             # Quiz questions and Prahar information
├── pages/            # Next.js pages
│   ├── api/          # API routes (if needed)
│   └── index.tsx     # Landing page
├── styles/           # CSS modules
└── utils/            # Utility functions
```

## Customization

- To modify quiz questions, edit `src/data/quizData.ts`
- To change the celestial animations, edit `src/components/quiz/CelestialBackground.tsx`
- To adjust styles, modify the corresponding CSS module files in `src/styles/`

## License

This project is licensed under the MIT License - see the LICENSE file for details.
