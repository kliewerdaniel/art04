import Navigation from "@/components/Navigation"
import Footer from "@/components/Footer"
import DonationsOverTime from "@/components/charts/DonationsOverTime"
import VolunteerHoursVsAssessment from "@/components/charts/VolunteerHoursVsAssessment"
import AllocationBreakdown from "@/components/charts/AllocationBreakdown"

export default function DashboardPage() {
  return (
    <main>
      <Navigation />
      <div className="min-h-screen">
        <section className="py-20">
          <div className="container mx-auto px-4">
            <h1 className="text-4xl font-bold text-center mb-8">Volunteer Dashboard</h1>
            <p className="text-center mb-12">Track allocations, donations, and mental health wellbeing.</p>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div className="bg-white rounded-lg shadow-md p-6">
                <DonationsOverTime />
              </div>

              <div className="bg-white rounded-lg shadow-md p-6">
                <AllocationBreakdown />
              </div>
            </div>

            <div className="mt-8 bg-white rounded-lg shadow-md p-6">
              <VolunteerHoursVsAssessment />
            </div>
          </div>
        </section>
      </div>
      <Footer />
    </main>
  )
}
