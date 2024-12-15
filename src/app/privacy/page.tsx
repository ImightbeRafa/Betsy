// app/privacy/page.tsx
export default function PrivacyPolicy() {
    return (
      <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto bg-white shadow sm:rounded-lg">
          <div className="px-4 py-5 sm:p-6">
            <h1 className="text-3xl font-bold text-gray-900 mb-8">Política de Privacidad</h1>
            
            <div className="space-y-6 text-gray-600">
              <section>
                <h2 className="text-xl font-semibold text-gray-900 mb-3">1. Información que Recopilamos</h2>
                <p>
                  En Betsy CRM, recopilamos la siguiente información:
                </p>
                <ul className="list-disc pl-5 mt-2 space-y-1">
                  <li>Información de su cuenta de Google (correo electrónico) para autenticación</li>
                  <li>Datos relacionados con el uso del sistema CRM</li>
                  <li>Información necesaria para la gestión de ventas y producción</li>
                </ul>
              </section>
  
              <section>
                <h2 className="text-xl font-semibold text-gray-900 mb-3">2. Uso de la Información</h2>
                <p>
                  Utilizamos la información recopilada para:
                </p>
                <ul className="list-disc pl-5 mt-2 space-y-1">
                  <li>Proporcionar y mantener nuestros servicios</li>
                  <li>Mejorar y personalizar la experiencia del usuario</li>
                  <li>Gestionar las cuentas de usuarios</li>
                  <li>Comunicarnos con usted sobre actualizaciones o cambios en el servicio</li>
                </ul>
              </section>
  
              <section>
                <h2 className="text-xl font-semibold text-gray-900 mb-3">3. Protección de Datos</h2>
                <p>
                  Implementamos medidas de seguridad para proteger su información personal:
                </p>
                <ul className="list-disc pl-5 mt-2 space-y-1">
                  <li>Encriptación de datos sensibles</li>
                  <li>Acceso restringido a la información personal</li>
                  <li>Monitoreo regular de nuestros sistemas</li>
                </ul>
              </section>
  
              <section>
                <h2 className="text-xl font-semibold text-gray-900 mb-3">4. Sus Derechos</h2>
                <p>
                  Usted tiene derecho a:
                </p>
                <ul className="list-disc pl-5 mt-2 space-y-1">
                  <li>Acceder a su información personal</li>
                  <li>Rectificar datos incorrectos</li>
                  <li>Solicitar la eliminación de sus datos</li>
                  <li>Oponerse al procesamiento de sus datos</li>
                </ul>
              </section>
  
              <section>
                <h2 className="text-xl font-semibold text-gray-900 mb-3">5. Contacto</h2>
                <p>
                  Para cualquier consulta sobre esta política de privacidad, puede contactarnos en:{' '}
                  <a href="mailto:contact@laplacelab.xyz" className="text-blue-600 hover:underline">
                    contact@laplacelab.xyz
                  </a>
                </p>
              </section>
  
              <section>
                <h2 className="text-xl font-semibold text-gray-900 mb-3">6. Cambios en la Política</h2>
                <p>
                  Nos reservamos el derecho de modificar esta política de privacidad en cualquier momento.
                  Los cambios entrarán en vigor inmediatamente después de su publicación en esta página.
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