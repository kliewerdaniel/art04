import Navigation from "@/components/Navigation"
import Footer from "@/components/Footer"

export default function Home() {
  return (
    <main>
      <Navigation />
      <div className="min-h-screen">
        <section className="hero bg-gray-100 py-20">
          <div className="container mx-auto px-4">
            <h1 className="text-4xl font-bold text-center">
              Connect Art with Philanthropy
            </h1>
            <p className="text-xl text-center mt-4">
              Supporting homeless artists through volunteer connections and financial aid.
            </p>
          </div>
        </section>
      </div>
      <Footer />
    </main>
  )
}
