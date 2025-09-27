# FlavorFind - Food Discovery App

Welcome to FlavorFind, a complete web application for browsing restaurants, viewing menus, and posting reviews. This project is built using React for the frontend and powered entirely by a Manifest backend.

## Features

- **User Authentication**: Secure sign-up and login for customers and restaurant owners.
- **Restaurant Listings**: Browse a list of all available restaurants.
- **Dynamic Details**: View restaurant-specific menus and customer reviews.
- **User-Generated Content**: Logged-in users can create new restaurant listings and post reviews.
- **Ownership Control**: Restaurant owners can edit their own listings (via the auto-generated Admin Panel).
- **Built-in Admin Panel**: A complete admin interface is available at `/admin` for managing all data.

## Tech Stack

- **Backend**: Manifest (YAML-based backend-as-a-service)
- **Frontend**: React (Vite)
- **Data Fetching**: Manifest SDK
- **Styling**: Tailwind CSS

## Getting Started

### Prerequisites

- Node.js and npm installed.
- A running Manifest backend instance.

### Setup

1.  **Clone the repository:**
    ```bash
    git clone <your-repo-url>
    cd <repo-name>
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    ```

3.  **Configure Environment Variables:**
    Create a `.env.local` file in the root of your project and add the URL of your Manifest backend:
    ```
    VITE_BACKEND_URL=https://your-manifest-backend-url.vercel.app
    ```

4.  **Run the development server:**
    ```bash
    npm run dev
    ```

5.  Open your browser and navigate to `http://localhost:5173`.

### Using the App

- **Demo User**: Click the 'Try Demo' button to log in with a pre-configured customer account.
- **Admin Panel**: Access the admin panel at `https://your-manifest-backend-url.vercel.app/admin` and log in with `admin@manifest.build` / `admin` to manage all data.
