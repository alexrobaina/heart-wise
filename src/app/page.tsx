'use client'
import { signIn } from 'next-auth/react'
import { FcGoogle } from 'react-icons/fc'
import { motion } from 'framer-motion'
import { FiArrowRight, FiLock, FiClock, FiCheckCircle } from 'react-icons/fi'
import { RiRobot2Line } from 'react-icons/ri'
import { useSession } from 'next-auth/react'
import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Image from 'next/image'

export default function Home() {
  const router = useRouter()
  const { status } = useSession()

  useEffect(() => {
    if (status === 'authenticated') {
      router.push('/onboarding')
    }
  }, [status, router])

  if (status === 'loading') {
    return (
      <div className="flex items-center text-white justify-center min-h-screen">
        Loading...
      </div>
    )
  }

  if (status === 'authenticated') {
    return null
  }

  const handleLogin = () => {
    signIn('google')
  }

  return (
    <div className="bg-white">
      {/* Hero Section */}
      <header className="relative bg-gradient-to-br from-amber-400 to-amber-800 text-white py-20 overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center [mask-image:linear-gradient(180deg,white,transparent)]"></div>
        </div>

        <div className="container mx-auto px-6 relative z-10">
          <div className="flex flex-col lg:flex-row items-center gap-12">
            <div className="lg:w-1/2">
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="text-4xl md:text-5xl font-bold mb-6 leading-tight"
              >
                Acompañamiento emocional para parejas con IA
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="text-xl mb-8 text-amber-100"
              >
                Mejora tu relación con herramientas basadas en psicología
                profesional, disponible 24/7
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="flex flex-col sm:flex-row gap-4"
              >
                <button
                  onClick={handleLogin}
                  className="bg-white text-orange-600 hover:bg-amber-50 px-8 py-3 rounded-lg font-semibold text-lg flex items-center justify-center gap-2 transition-all"
                >
                  <FcGoogle /> Ingresá con google
                </button>
              </motion.div>
            </div>

            <div className="lg:w-1/2 relative">
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
                className="relative"
              >
                <div className="absolute -inset-4 bg-amber-500 rounded-2xl blur-lg opacity-30"></div>
                <div className="relative bg-white rounded-2xl overflow-hidden shadow-2xl">
                  <Image
                    src="/landingpage.png"
                    alt="Heartwise App Preview"
                    width={600}
                    height={600}
                    className="w-full h-auto"
                  />
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </header>

      {/* Trust Badges */}
      <section className="py-12 bg-gray-50">
        <div className="container mx-auto px-6">
          <div className="flex flex-wrap justify-center items-center gap-8 md:gap-16">
            <div className="text-center">
              <div className="text-3xl font-bold text-amber-600">186K</div>
              <div className="text-gray-600">Usuarios activos</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-amber-600">24/7</div>
              <div className="text-gray-600">Disponibilidad</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-amber-600">3</div>
              <div className="text-gray-600">Enfoques psicológicos</div>
            </div>
          </div>
        </div>
      </section>

      {/* Value Proposition */}
      <section className="py-20">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Terapia de pareja accesible y privada
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Basada en psicoanálisis, terapia cognitivo-conductual y psicología
              junguiana
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <motion.div
              whileHover={{ y: -5 }}
              className="bg-white p-8 rounded-xl shadow-lg border border-gray-100"
            >
              <div className="w-12 h-12 bg-amber-100 rounded-lg flex items-center justify-center mb-6">
                <FiLock className="text-amber-600 text-xl" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Privacidad real</h3>
              <p className="text-gray-600">
                Chatea de forma privada con la IA, sin que tu pareja tenga
                acceso a tus conversaciones.
              </p>
            </motion.div>

            <motion.div
              whileHover={{ y: -5 }}
              className="bg-white p-8 rounded-xl shadow-lg border border-gray-100"
            >
              <div className="w-12 h-12 bg-amber-100 rounded-lg flex items-center justify-center mb-6">
                <RiRobot2Line className="text-amber-600 text-xl" />
              </div>
              <h3 className="text-xl font-semibold mb-3">
                Bases psicológicas sólidas
              </h3>
              <p className="text-gray-600">
                Respaldado en teorías terapéuticas: psicoanálisis, CBT y Jung.
              </p>
            </motion.div>

            <motion.div
              whileHover={{ y: -5 }}
              className="bg-white p-8 rounded-xl shadow-lg border border-gray-100"
            >
              <div className="w-12 h-12 bg-amber-100 rounded-lg flex items-center justify-center mb-6">
                <FiClock className="text-amber-600 text-xl" />
              </div>
              <h3 className="text-xl font-semibold mb-3">
                Accesibilidad total
              </h3>
              <p className="text-gray-600">
                Disponible 24/7, sin necesidad de citas ni proveedores costosos.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Cómo funciona Heartwise
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Tres simples pasos para mejorar tu relación
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="flex flex-col items-center text-center">
              <div className="w-16 h-16 bg-amber-600 text-white rounded-full flex items-center justify-center text-2xl font-bold mb-4">
                1
              </div>
              <h3 className="text-xl font-semibold mb-3">
                Completa el onboarding
              </h3>
              <p className="text-gray-600">
                Responde preguntas sobre tu relación para personalizar la
                experiencia.
              </p>
            </div>

            <div className="flex flex-col items-center text-center">
              <div className="w-16 h-16 bg-amber-600 text-white rounded-full flex items-center justify-center text-2xl font-bold mb-4">
                2
              </div>
              <h3 className="text-xl font-semibold mb-3">Habla con la IA</h3>
              <p className="text-gray-600">
                Conversa de forma privada con nuestro asistente entrenado en
                psicología.
              </p>
            </div>

            <div className="flex flex-col items-center text-center">
              <div className="w-16 h-16 bg-amber-600 text-white rounded-full flex items-center justify-center text-2xl font-bold mb-4">
                3
              </div>
              <h3 className="text-xl font-semibold mb-3">
                Aplica los consejos
              </h3>
              <p className="text-gray-600">
                Recibe ejercicios prácticos y mejora tu comunicación.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section className="py-20">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Planes para cada necesidad
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Elige el plan que mejor se adapte a tu relación
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <motion.div
              whileHover={{ y: -5 }}
              className="bg-white p-8 rounded-xl shadow-lg border border-gray-100"
            >
              <h3 className="text-xl font-semibold mb-3">Gratis</h3>
              <div className="text-4xl font-bold mb-6">
                $0<span className="text-lg text-gray-500">/mes</span>
              </div>
              <ul className="space-y-3 mb-8">
                <li className="flex items-center gap-2 text-gray-600">
                  <FiCheckCircle className="text-green-500" /> 10 mensajes/mes
                </li>
                <li className="flex items-center gap-2 text-gray-600">
                  <FiCheckCircle className="text-green-500" /> Onboarding básico
                </li>
                <li className="flex items-center gap-2 text-gray-400">
                  <FiCheckCircle className="text-gray-300" /> Ejercicios premium
                </li>
              </ul>
              <button className="w-full py-3bg-gray-100 hover:bg-gray-200-600 text-gray-800-3 rounded-lg font-medium transition-all">
                Comenzar
              </button>
            </motion.div>

            <motion.div
              whileHover={{ y: -5 }}
              className="bg-white p-8 rounded-xl shadow-lg border-2 border-amber-500 relative"
            >
              <div className="absolute top-0 right-0 bg-amber-500 text-white px-3 py-1 text-sm font-medium rounded-bl-lg rounded-tr-lg">
                Popular
              </div>
              <h3 className="text-xl font-semibold mb-3">Premium Individual</h3>
              <div className="text-4xl font-bold mb-6">
                $12<span className="text-lg text-gray-500">/mes</span>
              </div>
              <ul className="space-y-3 mb-8">
                <li className="flex items-center gap-2 text-gray-600">
                  <FiCheckCircle className="text-green-500" /> Mensajes
                  ilimitados
                </li>
                <li className="flex items-center gap-2 text-gray-600">
                  <FiCheckCircle className="text-green-500" /> Onboarding
                  completo
                </li>
                <li className="flex items-center gap-2 text-gray-600">
                  <FiCheckCircle className="text-green-500" /> Ejercicios
                  premium
                </li>
              </ul>
              <button className="w-full bg-amber-600 hover:bg-amber-700 text-white py-3 rounded-lg font-medium transition-all">
                Elegir plan
              </button>
            </motion.div>

            <motion.div
              whileHover={{ y: -5 }}
              className="bg-white p-8 rounded-xl shadow-lg border border-gray-100"
            >
              <h3 className="text-xl font-semibold mb-3">Premium Pareja</h3>
              <div className="text-4xl font-bold mb-6">
                $20<span className="text-lg text-gray-500">/mes</span>
              </div>
              <ul className="space-y-3 mb-8">
                <li className="flex items-center gap-2 text-gray-600">
                  <FiCheckCircle className="text-green-500" /> 2 cuentas premium
                </li>
                <li className="flex items-center gap-2 text-gray-600">
                  <FiCheckCircle className="text-green-500" /> Ejercicios
                  conjuntos
                </li>
                <li className="flex items-center gap-2 text-gray-600">
                  <FiCheckCircle className="text-green-500" /> Estadísticas
                  compartidas
                </li>
              </ul>
              <button className="w-full bg-gray-100 hover:bg-gray-200-600 text-gray-800-3 rounded-lg font-medium transition-all">
                Elegir plan
              </button>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-gradient-to-r from-amber-600 to-amber-800 text-white">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Mejora tu relación hoy mismo
          </h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Comienza tu viaje hacia una comunicación más saludable y una
            conexión más profunda
          </p>
          <button
            onClick={handleLogin}
            className="bg-white text-amber-600 hover:bg-amber-50 px-8 py-4 rounded-lg font-semibold text-lg flex items-center justify-center gap-2 transition-all mx-auto"
          >
            <FcGoogle /> Comenzar ahora <FiArrowRight />
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-6 md:mb-0">
              <div className="flex items-center gap-2 mb-4">
                <RiRobot2Line className="text-2xl text-amber-400" />
                <span className="text-xl font-bold">Heartwise</span>
              </div>
              <p className="text-gray-400">
                Acompañamiento emocional para parejas con IA
              </p>
            </div>
            <div className="flex gap-6">
              <a
                href="#"
                className="text-gray-400 hover:text-white transition-colors"
              >
                Términos
              </a>
              <a
                href="#"
                className="text-gray-400 hover:text-white transition-colors"
              >
                Privacidad
              </a>
              <a
                href="#"
                className="text-gray-400 hover:text-white transition-colors"
              >
                Contacto
              </a>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            © {new Date().getFullYear()} Heartwise. Todos los derechos
            reservados.
          </div>
        </div>
      </footer>
    </div>
  )
}
