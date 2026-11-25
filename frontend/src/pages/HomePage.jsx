import React from 'react';
import HeroBanner from '../components/home/HeroBanner';
import CategoryGrid from '../components/home/CategoryGrid';
import PersonalizationStudio from '../components/home/PersonalizationStudio';
import FeaturedGifts from '../components/home/FeaturedGifts';
import HamperBuilderTeaser from '../components/home/HamperBuilderTeaser';
import OccasionSection from '../components/home/OccasionSection';
import ValueProps from '../components/home/ValueProps';
import Testimonials from '../components/home/Testimonials';
import Newsletter from '../components/home/Newsletter';

export default function HomePage() {
  return (
    <div className="min-h-screen">
      {/* 1. Haute Hero Banner with Interactive Occasion Concierge */}
      <HeroBanner />

      {/* 2. 15 Atelier Curated Collections */}
      <CategoryGrid />

      {/* 3. Interactive Bespoke Personalization Studio */}
      <PersonalizationStudio />

      {/* 4. Seasonal Haute Creations (Best Sellers with hover swap) */}
      <FeaturedGifts />

      {/* 5. Interactive Bespoke Hamper Assembly Experience */}
      <HamperBuilderTeaser />

      {/* 6. Curated Milestones (Architectural Arch cards) */}
      <OccasionSection />

      {/* 7. Four Pillars of Artisanal Craftsmanship */}
      <ValueProps />

      {/* 8. Patron Testimonials & Reviews */}
      <Testimonials />

      {/* 9. Atelier Salon Private Club Privilege */}
      <Newsletter />
    </div>
  );
}
