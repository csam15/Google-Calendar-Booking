"use client";
import { useState, FormEvent } from "react";
import { useRouter } from "next/navigation";
import { siteConfig } from "@/config/site";

export default function Login() {
  const [credentials, setCredentials] = useState({
    username: "",
    password: "",
  });
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleLogin = async (
    event: FormEvent<HTMLFormElement>
  ): Promise<void> => {
    event.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(credentials),
      });

      const data = await response.json();

      if (response.ok) {
        // Redirect to admin page on successful login
        router.push("/admin");
      } else {
        setError(data.error || siteConfig.text.login.errorMessage);
      }
    } catch (error) {
      setError("Network error. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen w-full">
      <form
        onSubmit={handleLogin}
        className="flex flex-col gap-3 border rounded-xl p-4"
      >
        <h1 className="text-4xl text-center">{siteConfig.text.login.pageTitle}</h1>
        <div>
          <label className="booking-form-label">{siteConfig.text.login.usernameLabel}</label>
          <input
            type="text"
            placeholder={siteConfig.text.login.usernamePlaceholder}
            value={credentials.username}
            onChange={(e) =>
              setCredentials({ ...credentials, username: e.target.value })
            }
            className="booking-form-input"
          />
        </div>
        <div>
          <label className="booking-form-label">{siteConfig.text.login.passwordLabel}</label>
          <input
            type="password"
            placeholder={siteConfig.text.login.passwordPlaceholder}
            value={credentials.password}
            onChange={(e) =>
              setCredentials({ ...credentials, password: e.target.value })
            }
            className="booking-form-input"
          />
        </div>
        <button type="submit" disabled={isLoading} className="submit-button">
          {isLoading ? siteConfig.text.login.submittingButton : siteConfig.text.login.submitButton}
        </button>
        {error && <p className="error-message">{error}</p>}
      </form>
    </div>
  );
}
