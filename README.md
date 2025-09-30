# Google Calendar Booking App
A web application that allows clients to book meetings directly through a calendar interface while providing admins a password-protected dashboard to manage events and availability.

This is meant as a backend implementation. You can integrate it into your app and customize the styling to match your design.
## Features (v1)

### Client Booking Page
- Fill out a form with name, email, phone number, meeting type, and message
- Select a meeting date and time based on availability
- Only shows times allowed by the admin and connected Google Calendar

### Admin Dashboard
- Password-protected access
- View all upcoming events for a selected week
- Cancel or reschedule events
- Block out unavailable times, including:
  - **All-day events** (vacations, holidays)
  - **Timed events** (lunch breaks, appointments), with repeat options

# Installation and Execution

### 1. Fork this repo

### 2. Set up environment variables
Populate the `env.txt` file with the required keys and tokens.  
👉 Follow [Google Cloud’s getting started guide](https://developers.google.com/workspace/guides/get-started) for setup details.  

### 3. Generate Google tokens
Start your dev environment and visit:  http://localhost:3000/api/auth/google-setup
You’ll be prompted to sign in with your Google account. After signing in, you’ll receive your `GOOGLE_REFRESH_TOKEN` and `GOOGLE_ACCESS_TOKEN`.  

### 4. Add admin credentials
Set your **admin username** and **password** in the same `env.txt` file.  

### 5. Finalize environment file
Rename `env.txt` to `.env.local`.  
This ensures it will be ignored by GitHub and that values can be accessed via `process.env`.  

# Dependencies

### Core
- `next` – 15.5.4  
- `react` – 19.1.0  
- `react-dom` – 19.1.0  

### Forms & Validation
- `react-hook-form` – 7.63.0  
- `@hookform/resolvers` – 5.2.2  
- `zod` – 4.1.11  

### Calendar & UI
- `react-day-picker` – 9.11.0  
- `lucide-react` – 0.544.0  

### Data Fetching
- `swr` – 2.3.6  

### Google API
- `googleapis` – 160.0.0  

## Dev Dependencies

### TypeScript
- `typescript` – ^5  
- `@types/node` – ^20  
- `@types/react` – ^19  
- `@types/react-dom` – ^19  

### Styling
- `tailwindcss` – ^4  
- `@tailwindcss/postcss` – ^4  

### Linting
- `eslint` – ^9  
- `eslint-config-next` – 15.5.4  
- `@eslint/eslintrc` – ^3


## Help

Please open an issue or contact me with any questions or concerns regarding this project. Constructive criticism is also welcome!

## Author

Craig Sampson

craigsampson15@gmail.com

## Version History

* 0.1
    * Initial Release

## License

Copyright (C) 2025 Your Name

This program is free software: you can redistribute it and/or modify
it under the terms of the GNU Affero General Public License as
published by the Free Software Foundation, either version 3 of the
License, or (at your option) any later version.


