import Booking from "@/components/Booking";

export default function Book() {
  return (
    <div className="flex flex-col items-center justify-center w-full p-4">
      <div className="border-1 border-black rounded-xl p-4">
        <h1 className="text-3xl text-center pb-4">Book a Meeting</h1>
        <Booking/>
      </div>
    </div>
  );
}
