import Navigation from "@/components/Navigation"
import Footer from "@/components/Footer"
import Link from "next/link"

export default function Home() {
  return (
    <main>
      <Navigation />

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-indigo-50 via-white to-purple-50 py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-5xl font-bold text-gray-900 mb-6">
              Connect Art with{" "}
              <span className="text-indigo-600">Philanthropy</span>
            </h1>
            <p className="text-xl text-gray-600 mb-8 leading-relaxed">
              Supporting homeless artists through volunteer connections, financial aid,
              and mental health assessments. Join our community of artists and volunteers
              making a real difference.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/gallery"
                className="bg-indigo-600 text-white px-8 py-3 rounded-lg hover:bg-indigo-700 transition-colors font-medium"
              >
                Explore Artists
              </Link>
              <Link
                href="/auth/signin"
                className="border-2 border-indigo-600 text-indigo-600 px-8 py-3 rounded-lg hover:bg-indigo-50 transition-colors font-medium"
              >
                Join as Volunteer
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
              How Art01 Works
            </h2>

            <div className="grid md:grid-cols-3 gap-8">
              <div className="text-center p-6">
                <div className="w-16 h-16 bg-indigo-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Connect</h3>
                <p className="text-gray-600">
                  Browse artist profiles and connect with talented individuals who need support
                </p>
              </div>

              <div className="text-center p-6">
                <div className="w-16 h-16 bg-indigo-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Support</h3>
                <p className="text-gray-600">
                  Provide mentorship, financial assistance, and track mental health progress
                </p>
              </div>

              <div className="text-center p-6">
                <div className="w-16 h-16 bg-indigo-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Impact</h3>
                <p className="text-gray-600">
                  Monitor outcomes and see the real difference your support makes
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-indigo-600">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-white mb-6">
            Ready to Make a Difference?
          </h2>
          <p className="text-xl text-indigo-100 mb-8 max-w-2xl mx-auto">
            Join our community of volunteers and help homeless artists thrive through
            your support and mentorship.
          </p>
          <Link
            href="/auth/signin"
            className="bg-white text-indigo-600 px-8 py-3 rounded-lg hover:bg-gray-100 transition-colors font-medium inline-block"
          >
            Get Started Today
          </Link>
        </div>
      </section>

      <Footer />
    </main>
  )
}
