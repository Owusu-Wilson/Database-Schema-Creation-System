

import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import Footer from '@/components/Footer';

const HomePage = () => {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-tr ">
      <Navbar />
      <Hero />
      <Footer />
    </div>
  );
};

export default HomePage;
