import PublicLayout from "@/layouts/PublicLayout";
import SearchForm from "@/components/ui/SearchForm";
import DoctorCard from "@/components/ui/DoctorCard";
import Specialties from "@/components/ui/Specialties";

export default function Home() {
  return (
    <PublicLayout>
      <section className="text-center py-20">
        <h1 className="text-4xl font-bold text-blue-600">Welcome to Medic App</h1>
        <p className="mt-4 text-gray-600">Book your doctor appointments online easily and quickly.</p>
      <SearchForm/>
      <Specialties/>
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mt-12">
     <DoctorCard
       name="Dr. Sarah Johnson"
       specialty="Cardiologist"
       location="New York, NY"
       image="/images/doctors/sarah.png"
     />
     <DoctorCard
       name="Dr. Alex Smith"
       specialty="Dermatologist"
       location="Los Angeles, CA"
       image="/images/doctors/alex.png"
       />
    </div>
    </section>
    </PublicLayout>
  );
}
