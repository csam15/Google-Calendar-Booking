"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

const schema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.email("Invalid Email"),
  phone: z
    .string()
    .optional()
    .refine((val) => !val || /^\+?[\d\s\-\(\)]+$/.test(val), {
      message: "Invalid phone format",
    }),
});

type FormData = z.infer<typeof schema>;

export default function Booking() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const onSubmit = async (data: FormData) => {
    console.log("form submitted with data: ", data);
  };

  return (
    <div className="flex flex-col justify-center items-center">
      <div className="text-2xl">
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col items-start gap-2">
          <div>
          <label htmlFor="name" className="block text-sm font-medium mb-1">Name *</label>
          <input
            {...register('name')}
            id="name"
            className="form-input"
          />
          {errors.name && <p className="error-message">{errors.name.message}</p>}
        </div>

        <div>
          <label htmlFor="email" className="block text-sm font-medium mb-1">Email *</label>
          <input
            {...register('email')}
            type="email"
            id="email"
            className="form-input"
          />
          {errors.email && <p className="error-message">{errors.email.message}</p>}
        </div>

        <div>
          <label htmlFor="phone" className="block text-sm font-medium mb-1">Phone</label>
          <input
            {...register('phone')}
            type="tel"
            id="phone"
            className="form-input"
          />
          {errors.phone && <p className="error-message">{errors.phone.message}</p>}
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className="submit-button"
        >
          {isSubmitting ? 'Submitting...' : 'Book Appointment'}
        </button>
        </form>
      </div>
    </div>
  );
}
