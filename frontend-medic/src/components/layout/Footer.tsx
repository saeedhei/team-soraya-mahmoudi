export default function Footer() {
    return (
      <footer className="bg-gray-100 text-center text-sm p-4 mt-8 text-gray-600">
        &copy; {new Date().getFullYear()} Medic App. All rights reserved.
      </footer>
    );
  }