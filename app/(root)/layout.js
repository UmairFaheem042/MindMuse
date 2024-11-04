import Navbar from "@/components/Navbar";

export default function LayoutRouter({ children }) {
  return (
    <main className="font-work-sans">
      <Navbar />
      {children}
    </main>
  );
}
