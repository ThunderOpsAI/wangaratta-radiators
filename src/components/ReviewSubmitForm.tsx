'use client';

import { useState } from 'react';
import { Star, CheckCircle2, AlertCircle, Loader2, Send } from 'lucide-react';

const PROJECT_TYPES = [
  'Exposed Aggregate Driveway',
  'Machinery Shed / Workshop Slab',
  'House Slab / Architectural Foundation',
  'Nil-Exposure Burnished Interior Slab',
  'Alfresco Patio & Entertaining Flatwork',
  'Commercial / Sporting Court Pour',
  'Bobcat Earthworks & Site Prep',
  'Other Radiators Work',
];

export function ReviewSubmitForm() {
  const [customerName, setCustomerName] = useState('');
  const [location, setLocation] = useState('');
  const [starRating, setStarRating] = useState(5);
  const [hoverRating, setHoverRating] = useState(0);
  const [projectType, setProjectType] = useState('');
  const [reviewText, setReviewText] = useState('');
  
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (customerName.trim().length < 2) {
      setError('Please provide your name (at least 2 characters).');
      return;
    }

    if (reviewText.trim().length < 10) {
      setError('Please provide a review with at least 10 characters.');
      return;
    }

    setLoading(true);

    try {
      const res = await fetch('/api/reviews', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          customerName: customerName.trim(),
          location: location.trim() || undefined,
          starRating,
          projectType: projectType || undefined,
          reviewText: reviewText.trim(),
        }),
      });

      const data = await res.json();

      if (!res.ok || !data.success) {
        throw new Error(data.error || 'Failed to submit review');
      }

      setSubmitted(true);
      setCustomerName('');
      setLocation('');
      setStarRating(5);
      setProjectType('');
      setReviewText('');
    } catch (err: any) {
      setError(err.message || 'Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="leave-review" className="py-16 relative z-10 scroll-mt-24">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white border border-surface-200 rounded-3xl p-8 sm:p-10 shadow-xl">
          
          <div className="text-center mb-8">
            <span className="inline-block py-1 px-3.5 rounded-full bg-primary-100 text-primary-800 text-xs font-black tracking-widest uppercase mb-2">
              Share Your Feedback
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-surface-900">
              Leave a Review for Wangaratta Radiators
            </h2>
            <p className="mt-2 text-sm text-surface-600 font-normal max-w-md mx-auto">
              Tell us about your experience with our slab pouring, driveway installation, or excavation.
            </p>
          </div>

          {submitted ? (
            <div className="p-8 bg-emerald-50 border border-emerald-200 rounded-2xl text-center space-y-4">
              <div className="w-12 h-12 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-emerald-900">Thank You for Your Review!</h3>
              <p className="text-sm text-emerald-800 font-normal max-w-md mx-auto">
                Your feedback has been received and verified. Thank you for supporting a local Wangaratta family trade business!
              </p>
              <button
                type="button"
                onClick={() => setSubmitted(false)}
                className="mt-4 px-5 py-2 text-xs font-bold text-emerald-800 bg-white border border-emerald-300 rounded-xl hover:bg-emerald-100 transition-colors"
              >
                Submit Another Review
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              {error && (
                <div className="p-4 bg-red-50 border border-red-200 rounded-2xl flex items-center gap-3 text-red-700 text-sm">
                  <AlertCircle className="w-5 h-5 shrink-0" />
                  <span>{error}</span>
                </div>
              )}

              {/* Star Rating Select */}
              <div>
                <label className="block text-xs font-bold uppercase text-surface-600 mb-2">
                  Rating (Select 1 to 5 Stars) *
                </label>
                <div className="flex items-center gap-2">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      type="button"
                      onClick={() => setStarRating(star)}
                      onMouseEnter={() => setHoverRating(star)}
                      onMouseLeave={() => setHoverRating(0)}
                      className="p-1 focus:outline-none transition-transform hover:scale-110"
                    >
                      <Star
                        className={`w-8 h-8 ${
                          (hoverRating || starRating) >= star
                            ? 'fill-amber-400 text-amber-400'
                            : 'text-surface-300'
                        }`}
                      />
                    </button>
                  ))}
                  <span className="ml-3 text-sm font-bold text-surface-700">
                    {starRating} of 5 Stars
                  </span>
                </div>
              </div>

              {/* Two columns: Name & Location */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="customerName" className="block text-xs font-bold uppercase text-surface-600 mb-1.5">
                    Your Name / Company *
                  </label>
                  <input
                    id="customerName"
                    type="text"
                    required
                    value={customerName}
                    onChange={(e) => setCustomerName(e.target.value)}
                    placeholder="e.g. John S. or Local Builder"
                    className="w-full px-4 py-3 rounded-xl border border-surface-200 text-sm focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 outline-none transition-all"
                  />
                </div>

                <div>
                  <label htmlFor="location" className="block text-xs font-bold uppercase text-surface-600 mb-1.5">
                    Location / Suburb
                  </label>
                  <input
                    id="location"
                    type="text"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    placeholder="e.g. Wangaratta, Glenrowan, Milawa"
                    className="w-full px-4 py-3 rounded-xl border border-surface-200 text-sm focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 outline-none transition-all"
                  />
                </div>
              </div>

              {/* Project Type */}
              <div>
                <label htmlFor="projectType" className="block text-xs font-bold uppercase text-surface-600 mb-1.5">
                  Project Type
                </label>
                <select
                  id="projectType"
                  value={projectType}
                  onChange={(e) => setProjectType(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border border-surface-200 text-sm focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 outline-none transition-all bg-white"
                >
                  <option value="">Select project type (optional)</option>
                  {PROJECT_TYPES.map((pt) => (
                    <option key={pt} value={pt}>
                      {pt}
                    </option>
                  ))}
                </select>
              </div>

              {/* Review Text */}
              <div>
                <label htmlFor="reviewText" className="block text-xs font-bold uppercase text-surface-600 mb-1.5">
                  Your Review *
                </label>
                <textarea
                  id="reviewText"
                  required
                  rows={4}
                  value={reviewText}
                  onChange={(e) => setReviewText(e.target.value)}
                  placeholder="Share details about the quality of the pour, site cleanliness, communication, and finish..."
                  className="w-full px-4 py-3 rounded-xl border border-surface-200 text-sm focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 outline-none transition-all"
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full inline-flex items-center justify-center gap-2 px-6 py-4 rounded-xl bg-gradient-to-r from-primary-500 to-primary-600 hover:from-primary-400 hover:to-primary-500 text-surface-950 font-black text-base shadow-lg transition-transform active:scale-98 disabled:opacity-50"
              >
                {loading ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    <span>Submitting Review...</span>
                  </>
                ) : (
                  <>
                    <Send className="w-5 h-5 text-surface-950" />
                    <span>Submit Review</span>
                  </>
                )}
              </button>
            </form>
          )}

        </div>
      </div>
    </section>
  );
}
