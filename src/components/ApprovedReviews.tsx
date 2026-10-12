'use client';

import { useState, useEffect } from 'react';
import { Star, MessageSquareQuote, ThumbsUp, MapPin, ShieldCheck } from 'lucide-react';
import { motion } from 'framer-motion';

interface ReviewItem {
  id: string;
  customerName: string;
  location?: string | null;
  starRating: number;
  reviewText: string;
  projectType: string | null;
  createdAt: string;
}

export function ApprovedReviews() {
  const [reviews, setReviews] = useState<ReviewItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/reviews')
      .then((res) => (res.ok ? res.json() : Promise.reject(res)))
      .then((data) => {
        if (data.reviews && Array.isArray(data.reviews)) {
          setReviews(data.reviews);
        }
      })
      .catch((err) => {
        console.error('Failed to load approved reviews:', err);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  const averageRating = reviews.length
    ? (reviews.reduce((acc, r) => acc + r.starRating, 0) / reviews.length).toFixed(1)
    : '5.0';

  return (
    <section className="pt-32 pb-16 relative z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header Banner */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 py-1 px-4 rounded-full bg-primary-100 text-primary-800 text-xs font-black tracking-widest uppercase mb-4 border border-primary-300">
            <ThumbsUp className="w-3.5 h-3.5 text-primary-700" />
            Verified Client &amp; Builder Endorsements
          </div>
          <h1 className="text-4xl sm:text-5xl font-extrabold text-surface-900 tracking-tight">
            Client Reviews &amp; Testimonials
          </h1>
          <p className="mt-4 text-base sm:text-lg text-surface-600 font-normal leading-relaxed">
            Real feedback from local custom builders, farmers, and homeowners across Wangaratta and North East Victoria who trust Wangaratta Radiators with their slabs and driveways.
          </p>

          {reviews.length > 0 && (
            <div className="mt-6 inline-flex items-center gap-3 px-5 py-2.5 bg-white rounded-2xl border border-surface-200 shadow-md">
              <div className="flex items-center gap-1 text-amber-500">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} className="w-5 h-5 fill-amber-400 text-amber-400" />
                ))}
              </div>
              <span className="text-lg font-black text-surface-900">{averageRating} / 5.0</span>
              <span className="text-xs text-surface-500 font-medium">({reviews.length} Verified Endorsements)</span>
            </div>
          )}
        </div>

        {/* Content */}
        {loading ? (
          <div className="py-20 text-center text-surface-500 text-sm">
            Loading reviews...
          </div>
        ) : reviews.length === 0 ? (
          <div className="bg-white border border-surface-200 rounded-3xl p-12 text-center max-w-xl mx-auto shadow-sm">
            <MessageSquareQuote className="w-12 h-12 text-primary-400 mx-auto mb-4" />
            <h3 className="text-xl font-bold text-surface-900 mb-2">Be the First to Review</h3>
            <p className="text-sm text-surface-600 mb-6">
              If Wangaratta Radiators has poured a slab or driveway for you, we would love to feature your feedback!
            </p>
            <a
              href="#leave-review"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-primary-500 text-surface-950 font-bold text-sm hover:bg-primary-400 transition-colors shadow-sm"
            >
              Write a Review
            </a>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {reviews.map((rev) => (
              <motion.div
                key={rev.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                whileHover={{ y: -4 }}
                transition={{ duration: 0.2 }}
                className="bg-white rounded-3xl p-6 sm:p-7 shadow-sm hover:shadow-xl border border-surface-200 transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-1 text-amber-500">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <Star
                          key={i}
                          className={`w-4 h-4 ${
                            i < rev.starRating ? 'fill-amber-400 text-amber-400' : 'text-surface-300'
                          }`}
                        />
                      ))}
                    </div>
                    <span className="text-[11px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                      Verified Client
                    </span>
                  </div>

                  {rev.projectType && (
                    <span className="inline-block text-[11px] font-bold text-primary-800 bg-primary-50 px-2.5 py-1 rounded-md mb-3 border border-primary-200/60">
                      {rev.projectType}
                    </span>
                  )}

                  <p className="text-sm text-surface-700 leading-relaxed font-normal italic">
                    &ldquo;{rev.reviewText}&rdquo;
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-surface-100 flex items-center justify-between">
                  <div>
                    <span className="text-xs font-extrabold text-surface-900 block">{rev.customerName}</span>
                    {rev.location && (
                      <span className="text-[11px] text-surface-500 flex items-center gap-1 mt-0.5">
                        <MapPin className="w-3 h-3 text-primary-500" />
                        {rev.location}
                      </span>
                    )}
                  </div>
                  <span className="text-[10px] text-surface-400">
                    {new Date(rev.createdAt).toLocaleDateString(undefined, { month: 'short', year: 'numeric' })}
                  </span>
                </div>
              </motion.div>
            ))}
          </div>
        )}

      </div>
    </section>
  );
}
