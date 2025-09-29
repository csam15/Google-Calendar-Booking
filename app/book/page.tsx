import LoginButton from "@/components/LoginButton";
import BookingForm from "../../components/BookingForm";

export default function Book() {
  return (
    <>
      <div className="flex flex-col items-center w-full p-4 ">
        <div className="w-full flex justify-between items-center p-2">
          <h1 className="font-bold text-2xl md:text-3xl">Book a Meeting</h1>
          <LoginButton />
        </div>
        <div className="p-4">
          <BookingForm />
        </div>
      </div>
    </>
  );
}
