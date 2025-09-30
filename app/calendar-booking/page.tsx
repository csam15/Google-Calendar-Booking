
// This is the website embed booking page that Google provides to its calendar users for free

export default function CalendarBookingPage () {
    return (
        <div className="flex flex-col justify-center items-center p-4">
            <div className="border border-gray-400 p-4">
                <h1 className="text-5xl text-center">Free Google calendar booking page</h1>
            </div>
            <div className="w-full">
               <iframe src="https://calendar.google.com/calendar/appointments/schedules/AcZssZ2rRhweNVyBdK-IaWoIVpz6L_szfEdQtdBFW3h1HwxWbWOwQ1B_Bv_7jUsnAUkyFEHgZ83iJyUl?gv=true" 
                width="100%" 
                height="600" />
            </div>
        </div>
    )
}