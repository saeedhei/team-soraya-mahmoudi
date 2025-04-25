import PublicLayout from "@/layouts/PublicLayout";
import SearchForm from "@/components/ui/SearchForm";

export default function Home() {
  return (
    <PublicLayout>
      <section className="text-center py-20">
        <h1 className="text-4xl font-bold text-blue-600">Welcome to Medic App</h1>
        <p className="mt-4 text-gray-600">Book your doctor appointments online easily and quickly.</p>
      <SearchForm/>
      </section>
    </PublicLayout>
  );
}
