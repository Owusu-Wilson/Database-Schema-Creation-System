import Announcement from './Home/Announcement';
import TextInput from './Home/TextInput';
import OptionRow from './Home/OptionRow';
import TechStack from './Home/TechStack';

const Hero = () => {
  const firstRowOptions = ['Import from Figma', 'Build a mobile app with Expo', 'Start a blog with Astro'];
  const secondRowOptions = ['Create a docs site with Vitepress', 'Scaffold UI with shadcn', 'Draft a presentation with Slidev'];

  return (
    <div className="flex flex-col items-center justify-center flex-1 px-4 py-16">
      <Announcement />
      
      <h1 className="text-4xl font-figtree md:text-5xl font-bold text-center mb-4 opacity-0 animate-fade-in animate-delay-200">
        Lets handle your data logic
      </h1>
      
      <p className="text-gray-400 text-center mb-10 opacity-0 animate-fade-in animate-delay-200">
        Prompt, view and download <span className="text-white">SQL</span> and <span className="text-white">NoSQL</span> schema for your next app.
      </p>
      
      <TextInput />
      
      <OptionRow options={firstRowOptions} delay={400} />
      <OptionRow options={secondRowOptions} delay={400} />
      
      <TechStack />
    </div>
  );
};

export default Hero;