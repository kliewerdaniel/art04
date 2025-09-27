import Navigation from "@/components/Navigation"
import Footer from "@/components/Footer"
import ArtistList from "@/components/ArtistList"

export default function GalleryPage() {
  return (
    <main>
      <Navigation />
      <div className="min-h-screen">
        <section className="py-20">
          <div className="container mx-auto px-4">
            <h1 className="text-4xl font-bold text-center mb-8">Artist Gallery</h1>
            <ArtistList />
          </div>
        </section>
      </div>
      <Footer />
    </main>
  )
}
