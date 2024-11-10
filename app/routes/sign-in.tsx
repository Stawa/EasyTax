import { json, redirect } from "@remix-run/node";
import { Form, useActionData, useNavigation } from "@remix-run/react";
import { useEffect, useRef } from "react";

interface InputFieldProps {
  id: string;
  name: string;
  type: string;
  label: string;
  autoComplete?: string;
  required?: boolean;
  error?: string | null;
  inputRef?: React.RefObject<HTMLInputElement>;
}

const InputField = ({
  id,
  name,
  type,
  label,
  autoComplete,
  required = false,
  error,
  inputRef,
}: InputFieldProps) => (
  <div className="relative group">
    <input
      ref={inputRef}
      id={id}
      name={name}
      type={type}
      autoComplete={autoComplete}
      required={required}
      placeholder=" "
      className="block w-full px-2 sm:px-3 py-2.5 border border-gray-300 text-gray-900 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 peer text-xs sm:text-sm transition-all duration-200 bg-white/50 backdrop-blur-sm"
      aria-invalid={Boolean(error)}
      aria-describedby={error ? `${id}-error` : undefined}
    />
    <label
      htmlFor={id}
      className="absolute text-xs sm:text-sm text-gray-500 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white px-2 peer-focus:px-2 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:-translate-y-4 peer-focus:scale-75 peer-focus:text-indigo-600 left-1 group-hover:text-indigo-500"
    >
      {label}
    </label>
    {error && (
      <div className="text-red-500 text-xs sm:text-sm mt-1" id={`${id}-error`}>
        {error}
      </div>
    )}
  </div>
);

export const action = async ({ request }: { request: Request }) => {
  const formData = await request.formData();
  const email = formData.get("email");
  const password = formData.get("password");
  const remember = formData.get("remember");

  const errors = {
    email: email ? null : "Email is required",
    password: password ? null : "Password is required",
  };

  if (Object.values(errors).some(Boolean)) {
    return json({ errors }, { status: 400 });
  }

  // TODO: Implement actual authentication logic here
  // For now, just redirect to home
  return redirect("/");
};

export default function SignIn() {
  const actionData = useActionData<typeof action>();
  const navigation = useNavigation();
  const isSubmitting = navigation.state === "submitting";
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (actionData?.errors?.email) {
      emailRef.current?.focus();
    } else if (actionData?.errors?.password) {
      passwordRef.current?.focus();
    }
  }, [actionData]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-indigo-50 via-white to-indigo-50 px-4 py-8 sm:px-6 sm:py-12 lg:px-8">
      <div className="w-full max-w-xs sm:max-w-sm md:max-w-md rounded-xl bg-white/80 backdrop-blur-sm p-4 sm:p-6 lg:p-8 shadow-xl border border-indigo-50 transition-all duration-300 hover:shadow-indigo-100">
        <div>
          <div className="flex justify-center mb-4">
            <div className="p-2 bg-indigo-100 rounded-lg">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-8 w-8 text-indigo-600"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z"
                />
              </svg>
            </div>
          </div>
          <h2 className="mt-2 text-center text-2xl sm:text-3xl font-extrabold text-gray-900 tracking-tight">
            Masuk ke akun Anda
          </h2>
          <p className="mt-2 text-center text-xs sm:text-sm text-gray-600">
            Atau{" "}
            <a
              href="/sign-up"
              className="font-medium text-indigo-600 hover:text-indigo-500 transition-colors duration-200"
            >
              buat akun baru
            </a>
          </p>
        </div>
        <Form method="post" className="mt-6 sm:mt-8 space-y-4 sm:space-y-6">
          <div className="space-y-4">
            <InputField
              id="email"
              name="email"
              type="email"
              label="Alamat Email"
              autoComplete="email"
              required
              error={actionData?.errors?.email}
              inputRef={emailRef}
            />
            <InputField
              id="password"
              name="password"
              type="password"
              label="Kata Sandi"
              autoComplete="current-password"
              required
              error={actionData?.errors?.password}
              inputRef={passwordRef}
            />
          </div>

          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between space-y-2 sm:space-y-0">
            <div className="flex items-center">
              <input
                id="remember"
                name="remember"
                type="checkbox"
                className="h-3 w-3 sm:h-4 sm:w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded transition-colors duration-200"
              />
              <label
                htmlFor="remember"
                className="ml-2 block text-xs sm:text-sm text-gray-900"
              >
                Ingat saya
              </label>
            </div>

            <div className="text-xs sm:text-sm">
              <a
                href="/forgot-password"
                className="font-medium text-indigo-600 hover:text-indigo-500 transition-colors duration-200"
              >
                Lupa kata sandi?
              </a>
            </div>
          </div>

          <div>
            <button
              type="submit"
              disabled={isSubmitting}
              className="group relative w-full flex justify-center py-1.5 sm:py-2 px-3 sm:px-4 border border-transparent text-xs sm:text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-all duration-200 transform hover:-translate-y-0.5"
            >
              {isSubmitting ? (
                <span className="flex items-center">
                  <svg
                    className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                  Sedang Masuk...
                </span>
              ) : (
                "Masuk"
              )}
            </button>
          </div>
        </Form>
      </div>
    </div>
  );
}
