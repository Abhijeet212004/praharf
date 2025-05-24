// components/CloudBackground.tsx
import React from "react";

export default function CloudBackground() {
  return (
    <div className="absolute flex flex-col w-screen h-screen bg-blue-300 overflow-hidden z-0">

      <style>
        {`
          @keyframes cloud-move-slow1 {
            0% {
              transform: translateX(-100%);
              opacity: 0;
            }
            5% {
              opacity: 0.15;
            }
            95% {
              opacity: 0.15;
            }
            100% {
              transform: translateX(30vw);
              opacity: 0;
            }
          }
          @keyframes cloud-move-slow2 {
            0% {
              transform: translateX(-100%);
              opacity: 0;
            }
            5% {
              opacity: 0.15;
            }
            95% {
              opacity: 0.15;
            }
            100% {
              transform: translateX(30vw);
              opacity: 0;
            }
          }
          .cloud-slow {
            animation: cloud-move-slow1 30s linear infinite;
            opacity: 0;
          }
          .cloud-slow-delay {
            animation: cloud-move-slow2 30s linear infinite;
            animation-delay: 15s;
            opacity: 0;
          }

          @keyframes cloud-move-fast1 {
            0% {
              transform: translateX(-100%);
              opacity: 0;
            }
            5% {
              opacity: 0.4;
            }
            95% {
              opacity: 0.4;
            }
            100% {
              transform: translateX(20vw);
              opacity: 0;
            }
          }
          @keyframes cloud-move-fast2 {
            0% {
              transform: translateX(-100%);
              opacity: 0;
            }
            5% {
              opacity: 0.4;
            }
            95% {
              opacity: 0.4;
            }
            100% {
              transform: translateX(20vw);
              opacity: 0;
            }
          }
          .cloud-fast {
            animation: cloud-move-fast1 15s linear infinite;
            opacity: 0;
          }
          .cloud-fast-delay {
            animation: cloud-move-fast2 15s linear infinite;
            animation-delay: 10s;
            opacity: 0;
          }
        `}
      </style>


      {/* Section 1 */}
      <div className="relative w-screen h-1/3 overflow-hidden">
        {/* Slow Clouds */}
        <img src="/Cloud.png" className="absolute cloud-slow" style={{ left: "10vw", top: "10%", width: "6vw", height: "auto", maxHeight: "100%" }} />
        <img src="/Cloud.png" className="absolute cloud-slow" style={{ left: "0vw", top: "65%", width: "6vw", height: "auto", maxHeight: "100%" }} />
        <img src="/Cloud.png" className="absolute cloud-slow" style={{ left: "55vw", top: "30%", width: "6vw", height: "auto", maxHeight: "100%" }} />
        <img src="/Cloud.png" className="absolute cloud-slow" style={{ left: "65vw", top: "80%", width: "6vw", height: "auto", maxHeight: "100%" }} />
        <img src="/Cloud.png" className="absolute cloud-slow-delay" style={{ left: "10vw", top: "35%", width: "6vw", height: "auto", maxHeight: "100%" }} />
        <img src="/Cloud.png" className="absolute cloud-slow-delay" style={{ left: "0vw", top: "80%", width: "6vw", height: "auto", maxHeight: "100%" }} />
        <img src="/Cloud.png" className="absolute cloud-slow-delay" style={{ left: "55vw", top: "10%", width: "6vw", height: "auto", maxHeight: "100%" }} />
        <img src="/Cloud.png" className="absolute cloud-slow-delay" style={{ left: "65vw", top: "60%", width: "6vw", height: "auto", maxHeight: "100%" }} />

        {/* Fast Clouds */}
        <img src="/Cloud.png" className="absolute cloud-fast" style={{ left: "0vw", top: "5%", width: "10vw", height: "auto", maxHeight: "100%" }} />
        <img src="/Cloud.png" className="absolute cloud-fast" style={{ left: "80vw", top: "0%", width: "10vw", height: "auto", maxHeight: "100%" }} />
        <img src="/Cloud.png" className="absolute cloud-fast-delay" style={{ left: "85vw", top: "35%", width: "10vw", height: "auto", maxHeight: "100%" }} />
        <img src="/Cloud.png" className="absolute cloud-fast-delay" style={{ left: "10vw", top: "40%", width: "10vw", height: "auto", maxHeight: "100%" }} />
      </div>

      {/* Section 2 */}
      <div className="relative w-screen h-1/3 overflow-hidden">
        {/* Slow Clouds */}
        <img src="/Cloud.png" className="absolute cloud-slow" style={{ left: "0vw", top: "15%", width: "6vw", height: "auto", maxHeight: "100%" }} />
        <img src="/Cloud.png" className="absolute cloud-slow" style={{ left: "10vw", top: "60%", width: "6vw", height: "auto", maxHeight: "100%" }} />
        <img src="/Cloud.png" className="absolute cloud-slow" style={{ left: "52vw", top: "30%", width: "6vw", height: "auto", maxHeight: "100%" }} />
        <img src="/Cloud.png" className="absolute cloud-slow" style={{ left: "68vw", top: "70%", width: "6vw", height: "auto", maxHeight: "100%" }} />
        <img src="/Cloud.png" className="absolute cloud-slow-delay" style={{ left: "0vw", top: "30%", width: "6vw", height: "auto", maxHeight: "100%" }} />
        <img src="/Cloud.png" className="absolute cloud-slow-delay" style={{ left: "10vw", top: "70%", width: "6vw", height: "auto", maxHeight: "100%" }} />
        <img src="/Cloud.png" className="absolute cloud-slow-delay" style={{ left: "52vw", top: "15%", width: "6vw", height: "auto", maxHeight: "100%" }} />
        <img src="/Cloud.png" className="absolute cloud-slow-delay" style={{ left: "68vw", top: "60%", width: "6vw", height: "auto", maxHeight: "100%" }} />

        {/* Fast Clouds */}
        <img src="/Cloud.png" className="absolute cloud-fast" style={{ left: "30vw", top: "5%", width: "10vw", height: "auto", maxHeight: "100%" }} />
        <img src="/Cloud.png" className="absolute cloud-fast" style={{ left: "60vw", top: "0%", width: "10vw", height: "auto", maxHeight: "100%" }} />
        <img src="/Cloud.png" className="absolute cloud-fast-delay" style={{ left: "60vw", top: "40%", width: "10vw", height: "auto", maxHeight: "100%" }} />
        <img src="/Cloud.png" className="absolute cloud-fast-delay" style={{ left: "-5vw", top: "25%", width: "10vw", height: "auto", maxHeight: "100%" }} />
      </div>

      {/* Section 3 */}
      <div className="relative w-screen h-1/3 overflow-hidden">
        {/* Slow Clouds */}
        <img src="/Cloud.png" className="absolute cloud-slow" style={{ left: "15vw", top: "15%", width: "6vw", height: "auto", maxHeight: "100%" }} />
        <img src="/Cloud.png" className="absolute cloud-slow" style={{ left: "5vw", top: "60%", width: "6vw", height: "auto", maxHeight: "100%" }} />
        <img src="/Cloud.png" className="absolute cloud-slow" style={{ left: "65vw", top: "5%", width: "6vw", height: "auto", maxHeight: "100%" }} />
        <img src="/Cloud.png" className="absolute cloud-slow" style={{ left: "55vw", top: "80%", width: "6vw", height: "auto", maxHeight: "100%" }} />
        <img src="/Cloud.png" className="absolute cloud-slow-delay" style={{ left: "15vw", top: "5%", width: "6vw", height: "auto", maxHeight: "100%" }} />
        <img src="/Cloud.png" className="absolute cloud-slow-delay" style={{ left: "5vw", top: "80%", width: "6vw", height: "auto", maxHeight: "100%" }} />
        <img src="/Cloud.png" className="absolute cloud-slow-delay" style={{ left: "65vw", top: "15%", width: "6vw", height: "auto", maxHeight: "100%" }} />
        <img src="/Cloud.png" className="absolute cloud-slow-delay" style={{ left: "55vw", top: "65%", width: "6vw", height: "auto", maxHeight: "100%" }} />

        {/* Fast Clouds */}
        <img src="/Cloud.png" className="absolute cloud-fast" style={{ left: "75vw", top: "40%", width: "10vw", height: "auto", maxHeight: "100%" }} />
        <img src="/Cloud.png" className="absolute cloud-fast" style={{ left: "10vw", top: "60%", width: "10vw", height: "auto", maxHeight: "100%" }} />
        <img src="/Cloud.png" className="absolute cloud-fast-delay" style={{ left: "75vw", top: "0%", width: "10vw", height: "auto", maxHeight: "100%" }} />
        <img src="/Cloud.png" className="absolute cloud-fast-delay" style={{ left: "20vw", top: "0%", width: "10vw", height: "auto", maxHeight: "100%" }} />
      </div>
    </div>
  );
}
