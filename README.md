# Overview

This repository contains my project to build a Spotify ripoff, showcasing my skills in web development and design. The goal of this project is to create a visually appealing and functional music streaming platform similar to Spotify, while incorporating my own creative touch.

# Features

- Search and Discovery: Implement a robust search functionality with infinite scrolling, enabling users to explore and discover new music based on artists, or albums.
- Responsive Design: Implement a responsive design to ensure an optimal viewing and listening experience across various devices, from desktops to smartphones.

# Technologies Used

- React
- Remix
- TypeScript
- Tailwind CSS
- Bun

# How to Run

## 1. Install [Bun](https://bun.sh/)

## 2. Create Spotify API Keys

Visit the [Spotify Developer Dashboard](https://developer.spotify.com/documentation/web-api) and create a new application to obtain your Spotify API client ID and secret.

## 3. Set Up Environment Variables

Create a `.env` file in the project root.

Add your Spotify API keys to the `.env` file:

```env
SPOTIFY_API_CLIENT_ID=your_client_id
SPOTIFY_API_CLIENT_SECRET=your_client_secret
COOKIE_CREDENTIALS_SECRET=your_cookie_secret
```

## 4. Install Dependencies

Open your terminal and run the following command to install project dependencies using Bun:

```bash
bun install
```

## 5. Run the Development Server

Start the development server by running:

```bash
bun run dev
```

This will launch the Spotify Ripoff project, and you can access it in your web browser.
