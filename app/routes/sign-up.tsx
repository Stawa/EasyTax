import { json, MetaFunction, redirect } from "@remix-run/node";
import { Form, useActionData, useNavigation } from "@remix-run/react";
import { useEffect, useRef, useState } from "react";
import {
  FaUserPlus,
  FaEnvelope,
  FaUser,
  FaLock,
  FaEye,
  FaEyeSlash,
} from "react-icons/fa";
import { register } from "~/auth/session.server";
import { createSession, commitSession } from "~/auth/cookie.server";

export const meta: MetaFunction = () => {
  return [
    { title: "Daftar - EasyTax" },
    {
      name: "description",
      content:
        "Daftar akun EasyTax untuk mengakses layanan perpajakan digital yang lengkap dan terpercaya.",
    },
  ];
};

interface SignUpFormData {
  fullname: string | null;
  email: string | null;
  password: string | null;
  agreeToTerms: string | null;
}

interface FormErrors {
  fullname: string | null;
  email: string | null;
  password: string | null;
  agreeToTerms: string | null;
}

export const action = async ({ request }: { request: Request }) => {
  const formData = await request.formData();
  const data: SignUpFormData = {
    fullname: formData.get("fullname") as string,
    email: formData.get("email") as string,
    password: formData.get("password") as string,
    agreeToTerms: formData.get("agreeToTerms") as string,
  };

  const nameRegex = /^[a-zA-Z\s]{1,32}$/;
  const passwordRegex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

  const errors: FormErrors = {
    fullname: !data.fullname
      ? "Nama lengkap wajib diisi"
      : !nameRegex.test(data.fullname)
        ? "Nama lengkap hanya boleh berisi huruf dan maksimal 32 karakter"
        : null,
    email: data.email ? null : "Email wajib diisi",
    password: !data.password
      ? "Kata sandi wajib diisi"
      : !passwordRegex.test(data.password)
        ? "Kata sandi minimal 8 karakter, harus mengandung huruf besar, huruf kecil, angka, dan karakter khusus"
        : null,
    agreeToTerms: data.agreeToTerms
      ? null
      : "Anda harus menyetujui Syarat dan Ketentuan serta Kebijakan Privasi",
  };

  if (Object.values(errors).some(Boolean)) {
    return json({ errors }, { status: 400 });
  }
  try {
    // Register user with Firebase
    const { userId } = await register(
      data.email!,
      data.password!,
      data.fullname!
    );

    const session = await createSession(userId);
    const cookieHeader = await commitSession(session);

    return redirect("/dashboard", {
      headers: {
        "Set-Cookie": cookieHeader,
      },
    });
  } catch (error) {
    return json(
      {
        errors: {
          ...errors,
          email: "Email sudah terdaftar atau terjadi kesalahan",
        },
      },
      { status: 400 }
    );
  }
};

interface InputFieldProps {
  id: string;
  name: string;
  type: string;
  label: string;
  icon: React.ReactNode;
  autoComplete?: string;
  required?: boolean;
  error?: string | null;
  inputRef?: React.RefObject<HTMLInputElement>;
  showPasswordToggle?: boolean;
  onTogglePassword?: () => void;
  showPassword?: boolean;
}

const InputField = ({
  id,
  name,
  type,
  label,
  icon,
  autoComplete,
  required = false,
  error,
  inputRef,
  showPasswordToggle = false,
  onTogglePassword,
  showPassword,
}: InputFieldProps) => (
  <div className="relative group">
    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-400 group-hover:text-blue-600 transition-colors duration-200 z-10">
      {icon}
    </div>
    <input
      ref={inputRef}
      id={id}
      name={name}
      type={showPasswordToggle ? (showPassword ? "text" : "password") : type}
      autoComplete={autoComplete}
      required={required}
      placeholder=" "
      className="block w-full pl-11 pr-12 py-4 border-2 border-gray-200 text-gray-900 rounded-xl 
        focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-blue-600 
        peer text-base transition-all duration-200 
        bg-white/95 backdrop-blur-sm shadow-sm
        hover:border-blue-400 hover:shadow-md
        disabled:bg-gray-50 disabled:text-gray-500 disabled:border-gray-200 disabled:shadow-none"
      aria-invalid={Boolean(error)}
      aria-describedby={error ? `${id}-error` : undefined}
    />
    {showPasswordToggle && (
      <button
        type="button"
        onClick={onTogglePassword}
        className="absolute inset-y-0 right-0 pr-4 flex items-center text-gray-400 hover:text-blue-600 transition-colors duration-200"
      >
        {showPassword ? (
          <FaEyeSlash className="h-4 w-4 sm:h-5 sm:w-5" />
        ) : (
          <FaEye className="h-4 w-4 sm:h-5 sm:w-5" />
        )}
      </button>
    )}
    <label
      htmlFor={id}
      className="absolute text-base text-gray-500 cursor-text duration-200 transform 
        -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white px-2 
        peer-focus:px-2 peer-focus:text-blue-600 peer-focus:-translate-y-4 peer-focus:scale-75
        peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2
        peer-focus:top-2 left-9 group-hover:text-blue-600
        after:content-['*'] after:ml-0.5 after:text-red-500 after:opacity-0
        peer-required:after:opacity-100
        peer-invalid:text-red-500
        transition-colors duration-200"
    >
      {label}
    </label>
  </div>
);

export default function SignUp() {
  const actionData = useActionData<typeof action>();
  const navigation = useNavigation();
  const isSubmitting = navigation.state === "submitting";
  const [showPassword, setShowPassword] = useState(false);

  const fullnameRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (actionData?.errors?.fullname) {
      fullnameRef.current?.focus();
    } else if (actionData?.errors?.email) {
      emailRef.current?.focus();
    } else if (actionData?.errors?.password) {
      passwordRef.current?.focus();
    }
  }, [actionData]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 px-4 py-8 sm:px-8 lg:px-12 sm:py-12 lg:py-16">
      <div className="w-full max-w-sm sm:max-w-md lg:max-w-lg xl:max-w-xl bg-white rounded-2xl shadow-2xl p-6 sm:p-8 lg:p-10 border border-gray-100 transition-all duration-300 hover:shadow-xl">
        <div className="text-center mb-6 sm:mb-8 lg:mb-10">
          <div className="mx-auto w-16 h-16 sm:w-20 sm:h-20 lg:w-24 lg:h-24 mb-4 sm:mb-6 lg:mb-8 rounded-full bg-gradient-to-tr from-blue-500 to-indigo-600 flex items-center justify-center transform hover:scale-105 transition-transform duration-300">
            <FaUserPlus className="h-8 w-8 sm:h-10 sm:w-10 lg:h-12 lg:w-12 text-white" />
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
            Buat Akun Baru
          </h2>
          <p className="mt-2 sm:mt-3 lg:mt-4 text-sm sm:text-base lg:text-lg text-gray-600">
            Sudah punya akun?{" "}
            <a
              href="/sign-in"
              className="font-medium text-blue-600 hover:text-blue-500 transition-colors duration-200 underline decoration-2 decoration-blue-500/30 hover:decoration-blue-500"
            >
              Masuk di sini
            </a>
          </p>
        </div>

        <Form method="post" className="space-y-5 sm:space-y-6 lg:space-y-8">
          {(actionData?.errors?.fullname ||
            actionData?.errors?.email ||
            actionData?.errors?.password) && (
            <div
              className="p-4 rounded-lg bg-red-50 border border-red-200 shadow-sm animate-shake"
              role="alert"
            >
              <div className="flex items-center gap-3">
                <div className="flex-shrink-0">
                  <svg
                    className="w-5 h-5 text-red-400"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
                <div className="flex-1 text-sm text-red-700">
                  <p className="font-medium">Terjadi kesalahan</p>
                  <p className="mt-1">
                    {actionData?.errors?.fullname ||
                      actionData?.errors?.email ||
                      actionData?.errors?.password}
                  </p>
                </div>
              </div>
            </div>
          )}

          <InputField
            id="fullname"
            name="fullname"
            type="text"
            label="Nama Lengkap"
            icon={<FaUser className="h-4 w-4 sm:h-5 sm:w-5" />}
            autoComplete="name"
            required
            error={actionData?.errors?.fullname}
            inputRef={fullnameRef}
          />

          <InputField
            id="email"
            name="email"
            type="email"
            label="Alamat Email"
            icon={<FaEnvelope className="h-4 w-4 sm:h-5 sm:w-5" />}
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
            icon={<FaLock className="h-4 w-4 sm:h-5 sm:w-5" />}
            autoComplete="new-password"
            required
            error={actionData?.errors?.password}
            inputRef={passwordRef}
            showPasswordToggle
            onTogglePassword={() => setShowPassword(!showPassword)}
            showPassword={showPassword}
          />

          <div className="space-y-2">
            <div className="flex items-start">
              <div className="flex items-center h-5">
                <input
                  id="agreeToTerms"
                  name="agreeToTerms"
                  type="checkbox"
                  required
                  className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500"
                />
              </div>
              <div className="ml-3 text-sm">
                <label htmlFor="agreeToTerms" className="text-gray-600">
                  Saya menyetujui{" "}
                  <a
                    href="/terms"
                    className="text-blue-600 hover:text-blue-500 underline"
                  >
                    Syarat dan Ketentuan
                  </a>{" "}
                  serta{" "}
                  <a
                    href="/privacy"
                    className="text-blue-600 hover:text-blue-500 underline"
                  >
                    Kebijakan Privasi
                  </a>
                </label>
                <span className="text-red-500">*</span>
              </div>
            </div>
            {actionData?.errors?.agreeToTerms && (
              <div className="text-red-500 text-sm ml-2">
                {actionData.errors.agreeToTerms}
              </div>
            )}
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full py-2.5 sm:py-3 lg:py-4 px-4 sm:px-6 lg:px-8 text-sm sm:text-base lg:text-lg text-white font-medium rounded-lg bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transform transition-all duration-200 hover:-translate-y-0.5 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:shadow-xl"
          >
            {isSubmitting ? (
              <span className="flex items-center justify-center">
                <svg
                  className="animate-spin -ml-1 mr-2 h-4 w-4 sm:h-5 sm:w-5"
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
                Sedang Mendaftar...
              </span>
            ) : (
              "Daftar"
            )}
          </button>
        </Form>
      </div>
    </div>
  );
}
