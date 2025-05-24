import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Background from "./components/background";

const Home = () => {
  const [isFlipped, setIsFlipped] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);

  function handleFlip() {
    if (!isAnimating) {
      setIsFlipped(prev => !prev);
      setIsAnimating(true);
    }
  }

  return (
    <div className="relative w-screen h-screen overflow-hidden">
      <div className="flex justify-center items-center w-full h-full absolute">
        <Background/>

        {/* Centered Flip Card */}
        <div className="flex justify-center items-center w-full h-full absolute z-10">
          <div
            className="flip-card w-94 h-11/12 cursor-pointer"
            onClick={handleFlip}
          >
            <motion.div
              className="flip-card-inner"
              animate={{ rotateY: isFlipped ? 180 : 0 }}
              transition={{ duration: 0.6, ease: "easeInOut"}}
              onAnimationComplete={() => setIsAnimating(false)}
            >
              {/* Front */}
              <div className="flip-card-front bg-[#EACAB3] border-2 border-black rounded-3xl flex flex-col items-center justify-center">
                <img src="peher1.png" className="h-4/12 fade-in mb-15" />
                <img src="1_name.png" className="w-2/3 h-2/12 fade-in mb-15" />
                <div className="text-black click-fade-in">
                  Tap to Reveal More...
                </div>
              </div>

              {/* Back */}
              <div className="flip-card-back bg-[url(/back1.jpg)] rounded-3xl bg-center flex justify-center items-center">
                <div className="relative w-4/5 h-4/5 bg-white opacity-50" />
                <div className='absolute w-4/5 h-4/5 text-black text-md overflow-y-auto no-scrollbar p-5'>
                    Elemental mood: Still, Spiritual, Introspective.<br/><br/>
                    Silence is your solace and introspection is in your nature. You bring calm in people's chaos and are often drawn towards the unseen layers of existence. Therefore, people may describe you as "deep, simplistic and minimalistic". 
                    Your creativity peaks when the world sleeps and your connection to the divine feels strongest. This creativity makes you a seeker — not of material riches, but of inner truth.<br/><br/>
                    Music : Raag Ahir Bhairav<br/><br/>
                    Deity : A natural connection to Brahma, the creator, and सरस्वती, the goddess of wisdom and learning — their qualities quietly shape your way of thinking and being.<br/><br/>
                    Color Palette: Soft whites, pale golds, muted blues, and shades of lavender — hues that mirror the sky before sunrise.
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
