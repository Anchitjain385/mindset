
import FloatingParticle from '@/components/ui-elements/FloatingParticle';
import FloatingOrb from '@/components/ui-elements/FloatingOrb';

const ChatBackground = () => {
  return (
    <>
      {/* Background floating particles - subtle animations */}
      <FloatingParticle type="orb" count={18} color="rgba(255, 255, 255, 0.2)" />
      
      {/* Background orbs with improved positioning and variety */}
      <FloatingOrb size={8} color="#B3E5C5" delay={0} intensity="low" className="left-10 top-10" />
      <FloatingOrb size={5} color="#F9E7A1" delay={500} intensity="low" className="right-20 top-40" />
      <FloatingOrb size={9} color="#E5DEFF" delay={1000} intensity="low" className="left-40 bottom-20" />
      <FloatingOrb size={4} color="#C7DFFD" delay={750} intensity="low" className="right-10 bottom-40" />
      <FloatingOrb size={6} color="#FFD6E0" delay={1200} intensity="low" className="left-20 top-60" />
    </>
  );
};

export default ChatBackground;
