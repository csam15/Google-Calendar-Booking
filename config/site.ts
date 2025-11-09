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
  siteDescription:
    "Book appointments with ease using our Google Calendar integration",

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

    // business info
    businessInfo: {
      name: "Andrew Finocchiaro", // who am i making an appointment with
      // if meeting is in person 
      address: "152 Shiel ave",  
      city: "Staten Island, NY 10309"
    },
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
export type MeetingType = (typeof siteConfig.meetingTypes)[0];
