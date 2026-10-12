'use client';

import React, { useState } from 'react';
import { Gauge, Tractor, Truck, Car, CheckCircle2, Phone, Send, Wrench, AlertTriangle } from 'lucide-react';

interface VehicleCategory {
  id: string;
  name: string;
  icon: string;
  examples: string;
}

const VEHICLE_CATEGORIES: VehicleCategory[] = [
  { id: 'tractor', name: 'Tractor & Agricultural Machinery', icon: '🚜', examples: 'John Deere, Case IH, New Holland, Harvesters, Headers' },
  { id: '4wd', name: '4WD & Light Commercial Ute', icon: '🚙', examples: 'LandCruiser, Hilux, Ranger, D-Max, Patrol (Towing Upgrades)' },
  { id: 'truck', name: 'Heavy Commercial & Earthmoving', icon: '🚛', examples: 'Kenworth, Isuzu, Excavators, Bulldozers, Graders' },
  { id: 'passenger', name: 'Passenger Car & SUV', icon: '🚗', examples: 'Commodore, Falcon, Corollas, European & Classic Sedans' },
];

const ISSUE_TYPES = [
  'Radiator Overheating under Load / Field Work',
  'Leaking Coolant / Cracked Plastic Tanks',
  'Complete Re-Core Required (Heavy Duty Copper/Brass)',
  'Ultrasonic Cleanout & Flow Testing',
  'Oil Cooler / Intercooler Repair',
  'New Replacement Radiator Unit & Fitting',
];

export function SlabEstimator() {
  return <RadiatorQuoteEstimator />;
}

export function RadiatorQuoteEstimator() {
  const [selectedVehicle, setSelectedVehicle] = useState<VehicleCategory>(VEHICLE_CATEGORIES[0]);
  const [selectedIssue, setSelectedIssue] = useState<string>(ISSUE_TYPES[0]);
  const [makeModel, setMakeModel] = useState('');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [urgency, setUrgency] = useState('Standard Workshop Service');
  const [notes, setNotes] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <section id="quote-estimator" className="py-20 bg-surface-900 border-y border-surface-800 text-surface-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <span className="text-xs font-bold uppercase tracking-wider text-cyan-400 bg-cyan-950 px-3 py-1 rounded-full border border-cyan-800 mb-4 inline-block">
            Cooling System Estimate &amp; Trade Enquiry
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Get a Radiator Quote / Parts Request
          </h2>
          <p className="mt-4 text-surface-300 text-base">
            Select your machinery or vehicle category and describe your cooling issue. For urgent harvest or transport breakdowns, call our workshop direct.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Machine & Issue Selection (7 cols) */}
          <div className="lg:col-span-7 space-y-6">
            {/* Step 1: Vehicle Type */}
            <div className="bg-surface-950 rounded-2xl p-6 border border-surface-800">
              <h3 className="font-bold text-white text-base mb-3 flex items-center gap-2">
                <span className="w-5 h-5 rounded-full bg-cyan-500 text-surface-950 text-xs flex items-center justify-center font-black">1</span>
                Select Vehicle / Machinery Category
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {VEHICLE_CATEGORIES.map((cat) => (
                  <button
                    key={cat.id}
                    type="button"
                    onClick={() => setSelectedVehicle(cat)}
                    className={`p-4 rounded-xl border text-left transition-all ${
                      selectedVehicle.id === cat.id
                        ? 'border-cyan-500 bg-cyan-950/40 ring-2 ring-cyan-500/30'
                        : 'border-surface-800 bg-surface-900/60 hover:border-surface-700'
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <span className="text-2xl">{cat.icon}</span>
                      <div className="font-bold text-sm text-white">{cat.name}</div>
                    </div>
                    <div className="text-[11px] text-surface-400 mt-2">{cat.examples}</div>
                  </button>
                ))}
              </div>
            </div>

            {/* Step 2: Issue Type */}
            <div className="bg-surface-950 rounded-2xl p-6 border border-surface-800">
              <h3 className="font-bold text-white text-base mb-3 flex items-center gap-2">
                <span className="w-5 h-5 rounded-full bg-cyan-500 text-surface-950 text-xs flex items-center justify-center font-black">2</span>
                Identify the Cooling Issue / Service Needed
              </h3>
              <div className="space-y-2">
                {ISSUE_TYPES.map((iss) => (
                  <button
                    key={iss}
                    type="button"
                    onClick={() => setSelectedIssue(iss)}
                    className={`w-full p-3 rounded-lg border text-left text-xs transition-all flex justify-between items-center ${
                      selectedIssue === iss
                        ? 'border-cyan-500 bg-cyan-950/40 text-white font-bold'
                        : 'border-surface-800 bg-surface-900/60 text-surface-300 hover:border-surface-700'
                    }`}
                  >
                    <span>{iss}</span>
                    {selectedIssue === iss && <span className="text-cyan-400">✓ Selected</span>}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Form Card (5 cols) */}
          <div className="lg:col-span-5 bg-surface-950 rounded-2xl p-6 sm:p-8 border border-surface-800 shadow-2xl">
            <h3 className="text-lg font-bold text-white mb-2 pb-3 border-b border-surface-800 flex items-center justify-between">
              <span>Radiator Quote Details</span>
              <span className="text-xs text-cyan-400 font-semibold">{selectedVehicle.name.split(' ')[0]}</span>
            </h3>

            {submitted ? (
              <div className="bg-cyan-950/80 border border-cyan-700 p-6 rounded-xl text-center space-y-3">
                <CheckCircle2 className="w-10 h-10 text-cyan-400 mx-auto" />
                <h4 className="font-bold text-white">Quote Request Received!</h4>
                <p className="text-xs text-surface-300">
                  Wangaratta Radiators will check parts availability for your {makeModel || selectedVehicle.name} and call you back with pricing.
                </p>
                <button
                  type="button"
                  onClick={() => setSubmitted(false)}
                  className="mt-3 px-4 py-2 bg-cyan-500 text-surface-950 font-black rounded-lg text-xs uppercase"
                >
                  Submit Another Job
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-3.5 text-xs">
                <div>
                  <label className="block text-surface-300 font-bold mb-1">Make, Model &amp; Year *</label>
                  <input
                    type="text"
                    required
                    value={makeModel}
                    onChange={(e) => setMakeModel(e.target.value)}
                    placeholder="e.g. John Deere 6155M / Toyota Hilux 2.8 D4D"
                    className="w-full p-2.5 rounded-lg bg-surface-900 border border-surface-750 text-white text-sm focus:outline-none focus:ring-2 focus:ring-cyan-500"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-surface-300 font-bold mb-1">Contact Name *</label>
                    <input
                      type="text"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="e.g. Paul Higgins"
                      className="w-full p-2.5 rounded-lg bg-surface-900 border border-surface-750 text-white text-sm focus:outline-none focus:ring-2 focus:ring-cyan-500"
                    />
                  </div>
                  <div>
                    <label className="block text-surface-300 font-bold mb-1">Phone Number *</label>
                    <input
                      type="tel"
                      required
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="e.g. 0412 345 678"
                      className="w-full p-2.5 rounded-lg bg-surface-900 border border-surface-750 text-white text-sm focus:outline-none focus:ring-2 focus:ring-cyan-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-surface-300 font-bold mb-1">Email Address</label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="e.g. paul@farm.com.au"
                    className="w-full p-2.5 rounded-lg bg-surface-900 border border-surface-750 text-white text-sm focus:outline-none focus:ring-2 focus:ring-cyan-500"
                  />
                </div>

                <div>
                  <label className="block text-surface-300 font-bold mb-1">Symptoms or Special Requirements</label>
                  <textarea
                    rows={2}
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    placeholder="e.g. Overheating when pulling heavy trailer, coolant blowing into overflow bottle..."
                    className="w-full p-2.5 rounded-lg bg-surface-900 border border-surface-750 text-white text-sm focus:outline-none focus:ring-2 focus:ring-cyan-500"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3.5 bg-cyan-500 hover:bg-cyan-400 text-surface-950 font-black rounded-xl text-xs uppercase tracking-wider transition-all shadow-lg shadow-cyan-950 flex items-center justify-center gap-2"
                >
                  <Gauge className="w-4 h-4" />
                  <span>Get a Radiator Quote</span>
                </button>

                <div className="text-center pt-2">
                  <a
                    href="tel:0357213486"
                    className="text-xs text-cyan-400 hover:text-cyan-300 font-bold inline-flex items-center gap-1.5"
                  >
                    <Phone className="w-3.5 h-3.5" />
                    Urgent Machine Down? Call (03) 5721 3486
                  </a>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
