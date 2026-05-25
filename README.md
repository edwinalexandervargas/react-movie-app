# React Movie App

A movie browsing app built with React and Vite, powered by the OMDB API. Search for any movie, view detailed information, and discover similar titles. Features skeleton loading states, search history, and dynamic routing across multiple pages.

![Movie App](https://github.com/user-attachments/assets/f82677c7-c987-4a4e-b040-3cb3119b466b)
🔗 [Live Demo](https://movies-app-phi-lime-58.vercel.app/)

## Features

- Default movie showcase on load with horizontal scroll
- Search any movie using the OMDB API with Enter key or search icon
- Search history stored in localStorage — click any chip to re-search
- Sort results A-Z or by newest year
- Click any movie to navigate to a full detail page
- Detail page shows plot, director, actors, genre, IMDb rating, and runtime
- Similar genre recommendations on the detail page
- Skeleton loading states on both the search and detail pages
- Error handling for failed or empty API responses
- Responsive grid layout on search results

## Tech Stack

- **React** — component based UI
- **Vite** — build tool and dev server
- **Tailwind CSS** — utility first styling
- **React Router DOM** — multi page routing with dynamic URL parameters
- **Axios** — HTTP client for API calls
- **OMDB API** — movie data for both search and detail endpoints
- **Font Awesome** — search icon
- **localStorage** — persistent search history

## Getting Started

### Prerequisites
- Node.js installed on your machine

### Installation

1. Clone the repository
```bash
   git clone https://github.com/edwinalexandervargas/react-movie-app.git
   cd react-movie-app
```
2. Install dependencies
```bash
   npm install
```

3. Create a `.env` file in the root of the project

VITE_OMDB_API_KEY=your_api_key

4. Start the development server
```bash
   npm run dev
```

## What I Learned

- Fetching data from multiple API endpoints in the same component
- Dynamic routing with React Router DOM using URL parameters and useParams
- Persisting data across sessions with localStorage
- Building skeleton loading states that mimic actual content layout
- Conditional rendering based on user interaction state
- Client side sorting with localeCompare for strings and subtraction for numbers
- Preventing duplicate entries in a localStorage array with filter and spread operator
- Tailwind CSS utility first styling from scratch on a real project
