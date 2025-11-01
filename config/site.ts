/**
 * Site Configuration
 *
 * Edit these values to customize your booking application.
 * No coding knowledge required - just change the values!
 */

export const siteConfig = {
  /**
   * SITE BRANDING
   */
  siteName: "Google Calendar Booking",
  siteDescription: "Book appointments with ease using our Google Calendar integration",

  /**
   * MEETING TYPES
   *
   * Define your available meeting types here.
   * Each type needs:
   * - id: unique identifier (keep it simple, no spaces)
   * - label: what users see in the dropdown
   * - duration: length in minutes
   */
  meetingTypes: [
    {
      id: "option1",
      label: "Initial Consultation",
      duration: 60,
    },
    {
      id: "option2",
      label: "Follow-up Meeting",
      duration: 30,
    },
    {
      id: "option3",
      label: "Meeting 3",
      duration: 120,
    },
  ],

  /**
   * PAGE TEXT CONTENT
   */
  text: {
    // Home page
    home: {
      welcomeTitle: "Welcome",
      bookingLinkText: "Book a Meeting",
    },

    // Booking page
    booking: {
      pageTitle: "Book a Meeting",
      nameLabel: "Name",
      namePlaceholder: "Your full name",
      emailLabel: "Email",
      emailPlaceholder: "your.email@example.com",
      phoneLabel: "Phone Number",
      phonePlaceholder: "123-456-7890",
      meetingTypeLabel: "Meeting Type",
      messageLabel: "Message",
      messagePlaceholder: "Please provide any additional details...",
      dateLabel: "Select Date",
      timeLabel: "Select Time",
      submitButton: "Book Appointment",
      submittingButton: "Booking...",
      successMessage: "Appointment booked successfully!",
      noTimesAvailable: "No available times for this date.",
      selectDateFirst: "Please select a date first.",
    },

    // Admin dashboard
    admin: {
      dashboardTitle: "Admin Dashboard",
      appointmentManagementTitle: "Appointment Management",
      businessSettingsTitle: "Business Settings",
      notificationSettingsTitle: "Notification Settings",
      placeholderText: "Coming soon...",
      logoutButton: "Logout",
      eventsTitle: "Upcoming Appointments (Next 7 Days)",
      noEventsMessage: "No upcoming appointments.",
      deleteButton: "Delete",
      rescheduleButton: "Reschedule",
      blockTimeTitle: "Block Out Times",
      blockTimeDescription: "Mark times as unavailable on your calendar",
    },

    // Login page
    login: {
      pageTitle: "Admin Login",
      usernameLabel: "Username",
      usernamePlaceholder: "Enter username",
      passwordLabel: "Password",
      passwordPlaceholder: "Enter password",
      submitButton: "Login",
      submittingButton: "Logging in...",
      errorMessage: "Invalid credentials",
    },
  },

  /**
   * BUSINESS SETTINGS
   */
  business: {
    // Timezone for your business
    // Full list: https://en.wikipedia.org/wiki/List_of_tz_database_time_zones
    timezone: "America/New_York",

    // How many days ahead can users book?
    advanceBookingDays: 60,

    // Minimum notice required (in hours)
    minimumNoticeHours: 24,
  },

  /**
   * CALENDAR SETTINGS
   */
  calendar: {
    // How many days of events to show in admin dashboard
    eventsLookAheadDays: 7,

    // Auto-refresh interval for events list (in milliseconds)
    // 120000 = 2 minutes
    autoRefreshInterval: 120000,
  },
};

// TypeScript types for autocomplete
export type SiteConfig = typeof siteConfig;
export type MeetingType = typeof siteConfig.meetingTypes[0];
