import Footer from "@/components/common/Footer";
import Header from "@/components/common/Header";
import { ThemeToggle } from "@/components/common/ThemeToggle";

const LandingLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="min-h-screen bg-content-bg">
      <Header />
      <main className="container mx-auto px-4  py-4 md:py-8">
        {children}

                    <ThemeToggle />

      </main>
      <Footer />
    </div>
  );
};

export default LandingLayout;
