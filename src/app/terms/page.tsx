// app/terms/page.tsx
export default function TermsOfService() {
    return (
      <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto bg-white shadow sm:rounded-lg">
          <div className="px-4 py-5 sm:p-6">
            <h1 className="text-3xl font-bold text-gray-900 mb-8">Términos de Servicio</h1>
            
            <div className="space-y-6 text-gray-600">
              <section>
                <h2 className="text-xl font-semibold text-gray-900 mb-3">1. Aceptación de los Términos</h2>
                <p>
                  Al acceder y utilizar Betsy CRM, usted acepta estar sujeto a estos términos de servicio.
                  Si no está de acuerdo con alguna parte de los términos, no podrá acceder al servicio.
                </p>
              </section>
  
              <section>
                <h2 className="text-xl font-semibold text-gray-900 mb-3">2. Uso del Servicio</h2>
                <ul className="list-disc pl-5 mt-2 space-y-1">
                  <li>Debe tener 18 años o más para usar este servicio</li>
                  <li>Debe proporcionar información precisa y completa</li>
                  <li>Es responsable de mantener la seguridad de su cuenta</li>
                  <li>No debe usar el servicio para fines ilegales o no autorizados</li>
                </ul>
              </section>
  
              <section>
                <h2 className="text-xl font-semibold text-gray-900 mb-3">3. Cuenta de Usuario</h2>
                <p>
                  Para acceder a Betsy CRM, necesitará crear una cuenta utilizando su correo electrónico
                  de Google. Usted es responsable de mantener la confidencialidad de su cuenta y contraseña.
                </p>
              </section>
  
              <section>
                <h2 className="text-xl font-semibold text-gray-900 mb-3">4. Propiedad Intelectual</h2>
                <p>
                  El servicio y su contenido original, características y funcionalidad son propiedad de
                  Betsy CRM y están protegidos por derechos de autor internacionales.
                </p>
              </section>
  
              <section>
                <h2 className="text-xl font-semibold text-gray-900 mb-3">5. Limitación de Responsabilidad</h2>
                <p>
                  Betsy CRM no será responsable de ningún daño indirecto, incidental, especial,
                  consecuente o punitivo, incluyendo pérdida de beneficios, datos u otros daños
                  intangibles.
                </p>
              </section>
  
              <section>
                <h2 className="text-xl font-semibold text-gray-900 mb-3">6. Modificaciones del Servicio</h2>
                <p>
                  Nos reservamos el derecho de modificar o discontinuar, temporal o permanentemente,
                  el servicio con o sin previo aviso.
                </p>
              </section>
  
              <section>
                <h2 className="text-xl font-semibold text-gray-900 mb-3">7. Contacto</h2>
                <p>
                  Para cualquier pregunta sobre estos términos, contáctenos en:{' '}
                  <a href="mailto:contact@laplacelab.xyz" className="text-blue-600 hover:underline">
                    contact@laplacelab.xyz
                  </a>
                </p>
              </section>
  
              <footer className="mt-8 pt-8 border-t border-gray-200">
                <p className="text-sm text-gray-500">
                  Última actualización: 15 de diciembre de 2024
                </p>
              </footer>
            </div>
          </div>
        </div>
      </div>
    );
  }