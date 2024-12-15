"use client"

export default function ErrorPage() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gray-100">
      <div className="w-full max-w-md space-y-8 rounded-lg bg-white p-6 shadow-md">
        <div className="text-center">
          <h2 className="mt-6 text-3xl font-bold text-red-600">
            Acceso Denegado
          </h2>
          <p className="mt-2 text-gray-600">
            Lo sentimos, no tienes autorización para acceder a esta aplicación.
          </p>
        </div>
      </div>
    </div>
  )
}