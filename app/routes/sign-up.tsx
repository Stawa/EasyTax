import { json, redirect } from "@remix-run/node";
import { Form, useActionData, useNavigation } from "@remix-run/react";
import { useEffect, useRef } from "react";
import { FaUserPlus } from "react-icons/fa6";

interface SignUpFormData {
  displayName: string | null;
  name: string | null;
  email: string | null;
  password: string | null;
}

interface FormErrors {
  displayName: string | null;
  name: string | null;
  email: string | null;
  password: string | null;
}

export const action = async ({ request }: { request: Request }) => {
  const formData = await request.formData();
  const data: SignUpFormData = {
    displayName: formData.get("displayName") as string,
    name: formData.get("name") as string,
    email: formData.get("email") as string,
    password: formData.get("password") as string,
  };

  const errors: FormErrors = {
    displayName: data.displayName ? null : "Display name is required",
    name: data.name ? null : "Name is required",
    email: data.email ? null : "Email is required",
    password: data.password ? null : "Password is required",
  };

  if (Object.values(errors).some(Boolean)) {
    return json({ errors }, { status: 400 });
  }

  // TODO: Implement actual registration logic here
  // For now, just redirect to sign-in
  return redirect("/sign-in");
};

const InputField = ({
  inputRef,
  id,
  name,
  type,
  label,
  autoComplete,
  error,
  required = true,
}: {
  inputRef: React.RefObject<HTMLInputElement>;
  id: string;
  name: string;
  type: string;
  label: string;
  autoComplete?: string;
  error?: string | null;
  required?: boolean;
}) => (
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
      {label} {required && <span className="text-red-500">*</span>}
    </label>
    {error && (
      <div className="text-red-500 text-xs sm:text-sm mt-1" id={`${id}-error`}>
        {error}
      </div>
    )}
  </div>
);

const LoadingSpinner = () => (
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
    />
    <path
      className="opacity-75"
      fill="currentColor"
      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
    />
  </svg>
);

export default function SignUp() {
  const actionData = useActionData<typeof action>();
  const navigation = useNavigation();
  const isSubmitting = navigation.state === "submitting";

  const displayNameRef = useRef<HTMLInputElement>(null);
  const nameRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (actionData?.errors?.displayName) {
      displayNameRef.current?.focus();
    } else if (actionData?.errors?.name) {
      nameRef.current?.focus();
    } else if (actionData?.errors?.email) {
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
              <FaUserPlus className="h-8 w-8 text-indigo-600" />
            </div>
          </div>
          <h2 className="mt-2 text-center text-2xl sm:text-3xl font-extrabold text-gray-900 tracking-tight">
            Buat akun baru
          </h2>
          <p className="mt-2 text-center text-xs sm:text-sm text-gray-600">
            Atau{" "}
            <a
              href="/sign-in"
              className="font-medium text-indigo-600 hover:text-indigo-500 transition-colors duration-200"
            >
              masuk ke akun Anda
            </a>
          </p>
        </div>
        <Form method="post" className="mt-6 sm:mt-8 space-y-4 sm:space-y-6">
          <div className="space-y-4">
            <InputField
              inputRef={displayNameRef}
              id="displayName"
              name="displayName"
              type="text"
              label="Nama Tampilan"
              error={actionData?.errors?.displayName}
            />

            <InputField
              inputRef={nameRef}
              id="name"
              name="name"
              type="text"
              label="Nama Lengkap"
              error={actionData?.errors?.name}
            />

            <InputField
              inputRef={emailRef}
              id="email"
              name="email"
              type="email"
              label="Alamat Email"
              autoComplete="email"
              error={actionData?.errors?.email}
            />

            <InputField
              inputRef={passwordRef}
              id="password"
              name="password"
              type="password"
              label="Kata Sandi"
              autoComplete="new-password"
              error={actionData?.errors?.password}
            />
          </div>

          <div>
            <button
              type="submit"
              disabled={isSubmitting}
              className="group relative w-full flex justify-center py-1.5 sm:py-2 px-3 sm:px-4 border border-transparent text-xs sm:text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-all duration-200 transform hover:-translate-y-0.5"
            >
              {isSubmitting ? (
                <span className="flex items-center">
                  <LoadingSpinner />
                  Sedang Mendaftar...
                </span>
              ) : (
                "Daftar"
              )}
            </button>
          </div>
        </Form>
      </div>
    </div>
  );
}
