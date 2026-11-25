import React from 'react';
import { Instagram, Heart } from 'lucide-react';
import { INSTAGRAM_POSTS } from '../../utils/sampleData';

export default function InstagramGallery() {
  return (
    <section className="py-16 bg-white border-t border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center max-w-xl mx-auto mb-10">
          <div className="inline-flex items-center gap-2 text-primary font-medium text-xs mb-2">
            <Instagram className="w-4 h-4 text-secondary-dark" />
            <span className="tracking-widest uppercase font-semibold">@AuraGiftsOfficial</span>
          </div>
          <h2 className="font-serif text-3xl text-primary font-bold">
            Follow #AuraGiftsMoments
          </h2>
          <p className="text-xs text-text-muted mt-1">
            Tag us in your unboxing videos and gift giving moments to get featured!
          </p>
        </div>

        {/* 6 Square Posts Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4">
          {INSTAGRAM_POSTS.map((post) => (
            <div
              key={post.id}
              className="group relative aspect-square rounded-xl overflow-hidden bg-background border border-border"
            >
              <img
                src={post.img}
                alt="Instagram post"
                loading="lazy"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-primary/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2 text-white text-xs font-semibold">
                <Heart className="w-4 h-4 fill-white" />
                <span>{post.likes}</span>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
