"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import { useLang } from "../context/LanguageContext";

type AuthMode = "login" | "register";

interface AuthFormProps {
  mode: AuthMode;
}

const labels = {
  pl: {
    loginTitle: "Zaloguj się do strefy kursanta",
    registerTitle: "Utwórz konto kursanta",
    loginSubtitle: "Po zalogowaniu system automatycznie sprawdzi dostęp do szkoleń.",
    registerSubtitle: "Każdy może się zarejestrować, ale dostęp do szkoleń nadaje wyłącznie system.",
    fullName: "Imię i nazwisko",
    email: "Adres e-mail",
    password: "Hasło",
    loginButton: "Zaloguj się",
    registerButton: "Zarejestruj się",
    loading: "Przetwarzanie...",
    loginAlt: "Nie masz konta?",
    registerAlt: "Masz już konto?",
    loginLink: "Zarejestruj się",
    registerLink: "Zaloguj się",
    accessInfo: "Po rejestracji konto zapisze się w bazie, a status dostępu do szkolenia będzie ustawiony jako oczekujący, dopóki system nie nada dostępu.",
    setupError: "System logowania nie jest jeszcze skonfigurowany. Ustaw DATABASE_URL i wykonaj skrypt bazy danych.",
    genericError: "Nie udało się wykonać operacji. Spróbuj ponownie.",
  },
  en: {
    loginTitle: "Sign in to the student area",
    registerTitle: "Create a student account",
    loginSubtitle: "After signing in, the system will automatically verify your training access.",
    registerSubtitle: "Anyone can register, but only the system can grant training access.",
    fullName: "Full name",
    email: "Email address",
    password: "Password",
    loginButton: "Sign in",
    registerButton: "Register",
    loading: "Processing...",
    loginAlt: "No account yet?",
    registerAlt: "Already have an account?",
    loginLink: "Create one",
    registerLink: "Sign in",
    accessInfo: "After registration, your account is stored in the database and your training access remains pending until the system grants it.",
    setupError: "Auth is not configured yet. Set DATABASE_URL and run the database schema first.",
    genericError: "The operation could not be completed. Please try again.",
  },
  uk: {
    loginTitle: "Увійдіть до зони студента",
    registerTitle: "Створіть акаунт студента",
    loginSubtitle: "Після входу система автоматично перевірить доступ до навчання.",
    registerSubtitle: "Зареєструватися може кожен, але доступ до навчання надає лише система.",
    fullName: "Ім'я та прізвище",
    email: "Електронна пошта",
    password: "Пароль",
    loginButton: "Увійти",
    registerButton: "Зареєструватися",
    loading: "Обробка...",
    loginAlt: "Немає акаунта?",
    registerAlt: "Вже маєте акаунт?",
    loginLink: "Зареєструватися",
    registerLink: "Увійти",
    accessInfo: "Після реєстрації акаунт зберігається в базі даних, а доступ до навчання залишається в очікуванні, доки система його не надасть.",
    setupError: "Система входу ще не налаштована. Вкажіть DATABASE_URL і виконайте схему бази даних.",
    genericError: "Не вдалося виконати дію. Спробуйте ще раз.",
  },
  es: {
    loginTitle: "Inicia sesión en la zona del alumno",
    registerTitle: "Crea una cuenta de alumno",
    loginSubtitle: "Después de iniciar sesión, el sistema verificará automáticamente tu acceso a la formación.",
    registerSubtitle: "Cualquiera puede registrarse, pero solo el sistema puede otorgar acceso a la formación.",
    fullName: "Nombre y apellidos",
    email: "Correo electrónico",
    password: "Contraseña",
    loginButton: "Iniciar sesión",
    registerButton: "Registrarse",
    loading: "Procesando...",
    loginAlt: "¿No tienes cuenta?",
    registerAlt: "¿Ya tienes cuenta?",
    loginLink: "Créala",
    registerLink: "Inicia sesión",
    accessInfo: "Después del registro, tu cuenta se guarda en la base de datos y el acceso a la formación queda pendiente hasta que el sistema lo conceda.",
    setupError: "El sistema de acceso aún no está configurado. Define DATABASE_URL y ejecuta el esquema de la base de datos.",
    genericError: "No se pudo completar la operación. Inténtalo de nuevo.",
  }
} as const;

export default function AuthForm({ mode }: AuthFormProps) {
  const { lang } = useLang();
  const searchParams = useSearchParams();
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const copy = useMemo(() => labels[lang], [lang]);
  const next = searchParams.get("next") || "/szkolenie";
  const setup = searchParams.get("setup") === "1";

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError("");
    setLoading(true);

    try {
      const response = await fetch(`/api/auth/${mode}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          fullName,
          email,
          password,
          next,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.error || copy.genericError);
        return;
      }

      window.location.href = data.redirectTo || "/dashboard";
    } catch {
      setError(copy.genericError);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-md rounded-3xl border border-white/10 bg-[#0f0f0f] p-8 shadow-2xl shadow-black/20">
      <div className="mb-8">
        <div className="mb-4 inline-flex rounded-full border border-blue-500/20 bg-blue-500/10 px-4 py-1.5 text-sm font-medium text-blue-400">
          YLY Access
        </div>
        <h1 className="mb-3 text-3xl font-black text-white">
          {mode === "login" ? copy.loginTitle : copy.registerTitle}
        </h1>
        <p className="text-sm leading-relaxed text-gray-400">
          {mode === "login" ? copy.loginSubtitle : copy.registerSubtitle}
        </p>
      </div>

      {setup && (
        <div className="mb-6 rounded-2xl border border-yellow-500/20 bg-yellow-500/10 px-4 py-3 text-sm text-yellow-300">
          {copy.setupError}
        </div>
      )}

      {mode === "register" && (
        <div className="mb-6 rounded-2xl border border-white/10 bg-[#111] px-4 py-3 text-sm leading-relaxed text-gray-300">
          {copy.accessInfo}
        </div>
      )}

      {error && (
        <div className="mb-6 rounded-2xl border border-red-500/20 bg-red-500/10 px-4 py-3 text-sm text-red-300">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        {mode === "register" && (
          <div>
            <label htmlFor="fullName" className="mb-2 block text-sm font-medium text-gray-300">
              {copy.fullName}
            </label>
            <input
              id="fullName"
              name="fullName"
              value={fullName}
              onChange={(event) => setFullName(event.target.value)}
              required
              minLength={2}
              placeholder={copy.fullName}
              className="w-full rounded-2xl border border-white/10 bg-[#0a0a0a] px-4 py-3 text-white outline-none transition-all placeholder:text-gray-600 focus:border-blue-500/50"
            />
          </div>
        )}

        <div>
          <label htmlFor="email" className="mb-2 block text-sm font-medium text-gray-300">
            {copy.email}
          </label>
          <input
            id="email"
            name="email"
            type="text"
            inputMode="email"
            autoComplete="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            required
            placeholder={copy.email}
            className="w-full rounded-2xl border border-white/10 bg-[#0a0a0a] px-4 py-3 text-white outline-none transition-all placeholder:text-gray-600 focus:border-blue-500/50"
          />
        </div>

        <div>
          <label htmlFor="password" className="mb-2 block text-sm font-medium text-gray-300">
            {copy.password}
          </label>
          <input
            id="password"
            name="password"
            type="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            required
            minLength={8}
            placeholder={copy.password}
            className="w-full rounded-2xl border border-white/10 bg-[#0a0a0a] px-4 py-3 text-white outline-none transition-all placeholder:text-gray-600 focus:border-blue-500/50"
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full rounded-2xl bg-blue-600 px-5 py-3.5 text-sm font-bold text-white transition-all hover:bg-blue-500 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {loading ? copy.loading : mode === "login" ? copy.loginButton : copy.registerButton}
        </button>
      </form>

      <div className="mt-6 text-center text-sm text-gray-400">
        {mode === "login" ? copy.loginAlt : copy.registerAlt}{" "}
        <Link
          href={mode === "login" ? `/rejestracja?next=${encodeURIComponent(next)}` : `/logowanie?next=${encodeURIComponent(next)}`}
          className="font-semibold text-blue-400 transition-colors hover:text-blue-300"
        >
          {mode === "login" ? copy.loginLink : copy.registerLink}
        </Link>
      </div>
    </div>
  );
}
