import BookingForm from "../../components/BookingForm";
import { siteConfig } from "@/config/site";

export default function Book() {
  return (
    <>
      <div className="flex flex-col items-center w-full p-4 ">
        <div className="p-4">
          <BookingForm />
        </div>
      </div>
    </>
  );
}
