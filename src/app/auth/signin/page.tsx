'use client'

import { signIn } from "next-auth/react"

export default function SignInPage() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gray-100">
      <div className="w-full max-w-md space-y-8 rounded-lg bg-white p-6 shadow-md">
        <div className="text-center">
          <h2 className="mt-6 text-3xl font-bold text-gray-900">
            Iniciar Sesión
          </h2>
          <p className="mt-2 text-gray-600">
            Por favor, inicia sesión con tu cuenta de Google
          </p>
        </div>
        <div className="mt-8">
          <button
            onClick={() => signIn('google', { callbackUrl: '/home' })}
            className="w-full flex items-center justify-center gap-3 bg-white px-4 py-2 border border-gray-300 rounded-lg shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            <img 
              src="/google.svg" 
              alt="Google logo" 
              className="w-6 h-6" 
            />
            <span className="text-gray-700">
              Continuar con Google
            </span>
          </button>
        </div>
      </div>
      {/* Added Footer */}
      <footer className="mt-8 text-center text-gray-500 text-sm">
        © {new Date().getFullYear()} Rafael Garcia Montoya. Todos los derechos reservados.
      </footer>
    </div>
  )
}