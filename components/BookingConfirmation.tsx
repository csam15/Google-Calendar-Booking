import { CalendarCheck } from "lucide-react";

interface Confirm {
  date: string;
  time: string;
  meetingType: string;
  name: string;
  email: string;
  phone?: string;
  message?: string;
}

export default function BookingConfirmation({
  date,
  time,
  meetingType,
  name,
  email,
  phone,
  message,
}: Confirm) {
  // Convert string date to formatted date
  const formattedDate = new Date(date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  // Convert string time to formatted time
  const formattedTime = new Date(time).toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  });

  return (
    <div className="w-[360px] lg:w-[500px] h-fit bg-primary-dark flex flex-col items-center justify-start rounded-xl gap-10 py-4 px-3">
      <div className="flex items-center justify-between lg:justify-start gap-2 w-full">
        <CalendarCheck className="text-success size-10" />
        <div className="text-3xl font-bold text-success">Booking Confirmed</div>
      </div>
      <div className="flex items-center justify-between w-full">
        <div className="bg-black rounded-full size-15"></div>
        <div className="flex flex-col items-start text-white text-lg">
          <span>
            {formattedDate} at {formattedTime}
          </span>
          <span>{meetingType} with User Name</span>
        </div>
      </div>
      <div className="flex flex-col items-center gap-5">
        <div className="text-white text-2xl underline">Your Information</div>
        <div className="flex flex-col items-start justify-between text-lg">
          <div>Name: {name}</div>
          <div>Email: {email}</div>
        </div>
      </div>
    </div>
  );
}
