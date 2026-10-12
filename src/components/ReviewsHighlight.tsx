import { Star } from 'lucide-react';

const reviews = [
  {
    name: 'Greg McNamara',
    location: 'Boorhaman Wheat Farmer',
    text: 'Our header radiator started puking coolant mid-harvest on a 38-degree day. Wangaratta Radiators rebuilt and cleaned the core overnight. Saved us thousands in lost downtime.',
    rating: 5,
    date: '3 months ago'
  },
  {
    name: 'Brett Anderson',
    location: 'Wangaratta 4WD Club',
    text: 'Installed a heavy-duty copper radiator in my 79 Series LandCruiser before towing a caravan across the outback. Water temperature needle has not budged since.',
    rating: 5,
    date: '1 month ago'
  },
  {
    name: 'Ian Carmody',
    location: 'Moyhu Earthmoving',
    text: 'Top quality work re-coring our Komatsu excavator oil cooler. Proper old-school tradesmen who know their craft.',
    rating: 5,
    date: '2 weeks ago'
  }
];

export function ReviewsHighlight() {
  return (
    <section className="py-16 bg-surface-950 text-surface-100 border-t border-surface-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-10">
          <span className="text-xs font-bold uppercase tracking-wider text-cyan-400 bg-cyan-950 px-3 py-1 rounded-full border border-cyan-800">
            Verified Reviews
          </span>
          <h2 className="text-2xl sm:text-3xl font-bold text-white mt-3">
            Trusted by North East Farmers, Tradies &amp; Mechanics
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {reviews.map((rev, idx) => (
            <div key={idx} className="bg-surface-900 border border-surface-800 rounded-2xl p-6 flex flex-col justify-between">
              <div>
                <div className="flex gap-1 text-cyan-400 mb-3">
                  {[...Array(rev.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-cyan-400" />
                  ))}
                </div>
                <p className="text-xs sm:text-sm text-surface-300 leading-relaxed italic mb-4">
                  "{rev.text}"
                </p>
              </div>
              <div className="pt-3 border-t border-surface-800 flex justify-between items-center text-xs">
                <div>
                  <div className="font-bold text-white">{rev.name}</div>
                  <div className="text-surface-400 text-[11px]">{rev.location}</div>
                </div>
                <span className="text-surface-500 text-[10px]">{rev.date}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
