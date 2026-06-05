"use client";

import { useState } from "react";
import DoorOpening from "@/components/DoorOpening";
import HeroSection from "@/components/HeroSection";
import CountdownTimer from "@/components/CountdownTimer";
import EventDetails from "@/components/EventDetails";
import OurStory from "@/components/OurStory";
import PhotoGallery from "@/components/PhotoGallery";
import RSVPForm from "@/components/RSVPForm";
import WishesWall from "@/components/WishesWall";
import MusicPlayer from "@/components/MusicPlayer";
import FallingEffects from "@/components/FallingEffects";
import Footer from "@/components/Footer";

export default function Home() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {!isOpen && <DoorOpening onOpen={() => setIsOpen(true)} />}

      {isOpen && (
        <div className="relative w-full max-w-[100vw] overflow-x-hidden mx-auto flex flex-col">
          <FallingEffects />
          <MusicPlayer />
          <HeroSection />
          <PhotoGallery />
          <CountdownTimer />
          <EventDetails />
          <OurStory />
          <RSVPForm />
          <WishesWall />
          <Footer />
        </div>
      )}
    </>
  );
}
