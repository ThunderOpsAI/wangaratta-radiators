'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { LayoutGrid, SlidersHorizontal, CheckCircle2, Sparkles, MapPin, ZoomIn } from 'lucide-react';
import Link from 'next/link';

const categories = [
  'All',
  'Exposed Aggregate',
  'Shed Slabs',
  'House Foundations',
  'Alfresco & Patios',
  'Commercial & Rural'
] as const;

type Category = typeof categories[number];

const projectGallery = [
  {
    id: 1,
    src: '/images/projects/project-01-exposed-aggregate-driveway.jpg',
    title: 'Alpine River Pebble Exposed Driveway',
    location: 'Wangaratta, VIC',
    category: 'Exposed Aggregate',
    tag: 'Country Concrete Mix & Acrylic Seal',
    desc: 'Heavy-traffic exposed aggregate driveway with seamless entry curve and protective non-slip UV sealer.'
  },
  {
    id: 2,
    src: '/images/projects/project-02-machinery-shed-slab.jpg',
    title: '24m x 12m Heavy Machinery Workshop Slab',
    location: 'Glenrowan, VIC',
    category: 'Shed Slabs',
    tag: '32 MPa Slab + SL82 Mesh',
    desc: 'Engineered for 20-tonne headers and tractors with 400mm thickened perimeter haunches.'
  },
  {
    id: 3,
    src: '/images/projects/project-03-house-foundation-pour.jpg',
    title: 'Architectural House Slab Foundation',
    location: 'Wangaratta, VIC',
    category: 'House Foundations',
    tag: 'AS 2870 Engineered Tie-Ins',
    desc: 'Precision laser-poured house foundation with integrated plumbing penetrations and vapour barrier.'
  },
  {
    id: 4,
    src: '/images/projects/project-04-nil-exposure-polished.jpg',
    title: 'Hand Trowel Concrete Finishing & Screeding',
    location: 'Wangaratta, VIC',
    category: 'House Foundations',
    tag: 'Master Trade Hand Finishing',
    desc: 'Skilled hand-troweled finishing of fresh ready-mix concrete, ensuring a dense, flat, and hard-wearing surface.'
  },
  {
    id: 5,
    src: '/images/projects/project-05-alfresco-entertaining-patio.jpg',
    title: 'Exposed Aggregate Pool Surround & Coping',
    location: 'Milawa / Wangaratta',
    category: 'Alfresco & Patios',
    tag: 'Non-Slip Sealed Aggregate',
    desc: 'Luxury exposed aggregate pool surround with dark granite coping tiles, slip-resistant acid wash, and seamless drainage falls.'
  },
  {
    id: 6,
    src: '/images/projects/project-06-commercial-civic-slab.jpg',
    title: 'Milawa FNC Community Sports Court Slab',
    location: 'Milawa, VIC',
    category: 'Commercial & Rural',
    tag: 'Regulation Laser-Screeded Concrete',
    desc: 'High-durability community sporting slab poured under the Rural City of Wangaratta placemaking program.'
  },
  {
    id: 7,
    src: '/images/projects/project-07-bobcat-excavation-prep.jpg',
    title: 'Subgrade Excavation & FCR Roadbase Compaction',
    location: 'Oxley, VIC',
    category: 'Shed Slabs',
    tag: 'In-House Bobcat & Laser Fleet',
    desc: 'Full site preparation including soil cut, 100mm crushed rock subgrade, and laser alignment.'
  },
  {
    id: 8,
    src: '/images/projects/project-08-formwork-steel-mesh.jpg',
    title: 'Boxing, Heavy Vapour Barrier & Rebar Mesh',
    location: 'Beechworth, VIC',
    category: 'House Foundations',
    tag: 'SL82 Reinforcing Mesh',
    desc: 'Complete formwork setup ready for 32 MPa concrete truck discharge.'
  },
  {
    id: 9,
    src: '/images/projects/project-09-aggregate-detail-texture.jpg',
    title: 'Washed Alpine River Pebble Texture Detail',
    location: 'Wangaratta, VIC',
    category: 'Exposed Aggregate',
    tag: 'Acid-Washed Non-Slip Finish',
    desc: 'Close-up macro texture showing uniform stone density and protective penetrating acrylic sheen.'
  },
  {
    id: 10,
    src: '/images/projects/project-10-curved-decorative-pathway.jpg',
    title: 'Curved Landscape Pathway & Border Edge',
    location: 'Everton, VIC',
    category: 'Alfresco & Patios',
    tag: 'Flexible Formwork & Clean Edging',
    desc: 'Decorative perimeter walkway designed to flow naturally with existing rural garden topography.'
  },
];

export function Gallery() {
  const [activeCategory, setActiveCategory] = useState<Category>('All');
  const [selectedImage, setSelectedImage] = useState<typeof projectGallery[0] | null>(null);

  const filteredProjects = activeCategory === 'All'
    ? projectGallery
    : projectGallery.filter((p) => p.category === activeCategory);

  return (
    <section id="gallery" className="pt-28 pb-20 relative overflow-hidden transition-colors duration-500">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <span className="inline-block py-1 px-4 rounded-full bg-primary-100 border border-primary-300 text-primary-800 text-xs font-black tracking-widest uppercase mb-3">
            Real North East Victoria Projects
          </span>
          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-surface-900">
            Workmanship &amp; Finished Concrete Gallery
          </h1>
          <p className="mt-4 text-base sm:text-lg text-surface-600 font-normal leading-relaxed">
            Explore 26+ years of Radiators projects across Wangaratta, Glenrowan, Milawa, Beechworth, and surrounding rural districts.
          </p>

          {/* Category Filter Tabs */}
          <div className="flex flex-wrap items-center justify-center gap-2 mt-8">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-4 py-2 rounded-2xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${
                  activeCategory === cat
                    ? 'bg-surface-950 text-primary-400 shadow-md scale-102 ring-2 ring-primary-500/20'
                    : 'bg-white text-surface-700 border border-surface-200 hover:bg-surface-100'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Gallery Grid */}
        <motion.div 
          layout
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          <AnimatePresence>
            {filteredProjects.map((project) => (
              <motion.div
                layout
                key={project.id}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.35 }}
                className="group bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-xl border border-surface-200 transition-all flex flex-col cursor-pointer"
                onClick={() => setSelectedImage(project)}
              >
                <div className="relative h-64 w-full overflow-hidden bg-surface-200">
                  <Image
                    src={project.src}
                    alt={project.title}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-106"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-surface-950/85 via-surface-950/20 to-transparent" />
                  
                  <span className="absolute top-3 left-3 px-3 py-1 bg-surface-900/90 backdrop-blur-md text-primary-400 text-[11px] font-bold uppercase tracking-wider rounded-full border border-primary-500/30">
                    {project.tag}
                  </span>

                  <span className="absolute top-3 right-3 p-2 bg-surface-900/80 backdrop-blur-md text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity">
                    <ZoomIn className="w-4 h-4 text-primary-400" />
                  </span>

                  <div className="absolute bottom-3 left-3 right-3">
                    <div className="flex items-center gap-1.5 text-[11px] text-surface-300 font-semibold mb-1">
                      <MapPin className="w-3.5 h-3.5 text-primary-400 shrink-0" />
                      <span>{project.location}</span>
                    </div>
                    <h3 className="text-base font-bold text-white leading-snug">
                      {project.title}
                    </h3>
                  </div>
                </div>

                <div className="p-4 flex-1 flex flex-col justify-between bg-white">
                  <p className="text-xs text-surface-600 leading-relaxed">
                    {project.desc}
                  </p>
                  <div className="mt-3 pt-2 border-t border-surface-100 flex items-center justify-between text-[11px]">
                    <span className="font-semibold text-primary-700">{project.category}</span>
                    <span className="text-surface-400 font-medium">Click to expand</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Modal Lightbox */}
        <AnimatePresence>
          {selectedImage && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm p-4 sm:p-8 flex items-center justify-center"
              onClick={() => setSelectedImage(null)}
            >
              <motion.div
                initial={{ scale: 0.95 }}
                animate={{ scale: 1 }}
                exit={{ scale: 0.95 }}
                className="bg-surface-950 border border-surface-800 rounded-3xl max-w-4xl w-full overflow-hidden shadow-2xl"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="relative h-[55vh] w-full bg-surface-900">
                  <Image
                    src={selectedImage.src}
                    alt={selectedImage.title}
                    fill
                    className="object-cover"
                  />
                  <button
                    onClick={() => setSelectedImage(null)}
                    className="absolute top-4 right-4 bg-surface-900/90 text-white rounded-full p-2 border border-surface-700 hover:bg-surface-800"
                  >
                    &times;
                  </button>
                </div>
                <div className="p-6 text-white flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div>
                    <span className="text-xs text-primary-400 font-bold uppercase tracking-wider block">
                      {selectedImage.location} • {selectedImage.tag}
                    </span>
                    <h2 className="text-xl font-bold mt-1 text-white">{selectedImage.title}</h2>
                    <p className="text-sm text-surface-300 mt-2 max-w-xl">{selectedImage.desc}</p>
                  </div>
                  <Link
                    href={`/quote?service=${encodeURIComponent(selectedImage.category)}`}
                    className="inline-flex items-center justify-center px-5 py-2.5 rounded-xl bg-primary-500 hover:bg-primary-400 text-surface-950 font-bold text-sm shrink-0"
                  >
                    Quote Similar Job
                  </Link>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

      </div>
    </section>
  );
}
