'use client';

import React, { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { Send, CheckCircle2, AlertCircle, Loader2, Phone, ShieldCheck, MapPin, Calculator, Truck } from 'lucide-react';
import { motion } from 'framer-motion';

const PROJECT_TYPES = [
  'Exposed Aggregate Driveway',
  'Machinery Shed / Workshop Slab',
  'House Slab / Residential Foundation',
  'Alfresco Patio & Entertaining Flatwork',
  'Nil-Exposure Burnished Interior Slab',
  'Commercial / Sporting Court Pour',
  'Bobcat Excavation & Site Preparation',
  'Other Radiators Project',
];

const SITE_ACCESS_OPTIONS = [
  'Clear Direct Concrete Truck Access (within 5m of pour)',
  'Narrow / Restricted Access (Concrete Line/Boom Pump Required)',
  'Rural Property / Open Paddock (Easy Access)',
  'Unsure (Need On-Site Inspection)',
];

function QuoteFormContent() {
  const searchParams = useSearchParams();
  const phoneNumber = process.env.NEXT_PUBLIC_BUSINESS_PHONE || '(03) 5721 3486';
  const cleanPhone = phoneNumber.replace(/[^0-9+]/g, '');

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    projectType: 'Exposed Aggregate Driveway',
    siteAddress: '',
    estimatedArea: '',
    slabThickness: '125mm',
    finishType: 'Premium Exposed Aggregate',
    siteAccess: 'Clear Direct Concrete Truck Access (within 5m of pour)',
    earthworks: true,
    message: '',
  });

  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  // Prefill from search parameters if user came from the Slab Estimator
  useEffect(() => {
    if (!searchParams) return;
    const area = searchParams.get('area');
    const thickness = searchParams.get('thickness');
    const finish = searchParams.get('finish');
    const earthworks = searchParams.get('earthworks');
    const service = searchParams.get('service');

    setFormData((prev) => ({
      ...prev,
      estimatedArea: area || prev.estimatedArea,
      slabThickness: thickness || prev.slabThickness,
      finishType: finish === 'exposed-aggregate' ? 'Premium Exposed Aggregate' : finish || prev.finishType,
      earthworks: earthworks !== null ? earthworks === 'true' : prev.earthworks,
      projectType: service || prev.projectType,
    }));
  }, [searchParams]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    if (type === 'checkbox') {
      const checked = (e.target as HTMLInputElement).checked;
      setFormData((prev) => ({ ...prev, [name]: checked }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');

    if (!formData.firstName.trim() || !formData.email.trim() || !formData.phone.trim()) {
      setErrorMessage('Please enter your First Name, Email, and Phone number.');
      return;
    }

    setStatus('submitting');

    try {
      const res = await fetch('/api/quote', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const json = await res.json();

      if (!res.ok || !json.success) {
        throw new Error(json.error || 'Failed to submit quote request. Please try again.');
      }

      setStatus('success');
    } catch (err: any) {
      console.error('[QuoteForm Error]', err);
      setStatus('error');
      setErrorMessage(err.message || 'An unexpected error occurred. Please try again or call Wangaratta Radiators directly.');
    }
  };

  return (
    <section className="pt-28 pb-20 relative z-10">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <span className="inline-flex items-center gap-1.5 py-1 px-4 rounded-full bg-primary-100 text-primary-800 text-xs font-black tracking-widest uppercase mb-3 border border-primary-300">
            <ShieldCheck className="w-3.5 h-3.5 text-primary-700" />
            26+ Years Radiators Experience • Fixed Quotes
          </span>
          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-surface-900">
            Request a Free Radiators Quote &amp; Site Measure
          </h1>
          <p className="mt-3 text-base sm:text-lg text-surface-600 font-normal leading-relaxed">
            Fill in your project specifications below. Wangaratta Radiators will review your site requirements, check access, and provide an accurate written proposal or schedule an on-site measure.
          </p>
        </div>

        {/* Form Container */}
        <div className="bg-white rounded-3xl border border-surface-200 shadow-2xl p-6 sm:p-12 overflow-hidden">
          
          {status === 'success' ? (
            <div className="text-center py-12 px-4 space-y-6">
              <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto shadow-md">
                <CheckCircle2 className="w-9 h-9" />
              </div>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-surface-900">
                Thank You, {formData.firstName}!
              </h2>
              <p className="text-base text-surface-600 max-w-lg mx-auto leading-relaxed">
                Your quote request for <strong>{formData.projectType}</strong> has been logged directly with Wangaratta Radiators. We will review your site details and call you shortly to confirm your measure.
              </p>

              <div className="p-6 bg-surface-50 border border-surface-200 rounded-2xl max-w-md mx-auto text-left space-y-2 text-xs text-surface-700">
                <div className="font-bold text-surface-900 text-sm mb-2 border-b border-surface-200 pb-1">
                  Request Summary:
                </div>
                <div><strong>Location:</strong> {formData.siteAddress || 'Wangaratta District'}</div>
                <div><strong>Project:</strong> {formData.projectType}</div>
                {formData.estimatedArea && <div><strong>Estimated Area:</strong> {formData.estimatedArea} m²</div>}
                <div><strong>Thickness:</strong> {formData.slabThickness}</div>
                <div><strong>Finish:</strong> {formData.finishType}</div>
              </div>

              <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
                <a
                  href={`tel:${cleanPhone}`}
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-primary-500 text-surface-950 font-bold text-sm hover:bg-primary-400 transition-colors shadow-md"
                >
                  <Phone className="w-4 h-4" />
                  <span>Call Wangaratta Radiators: {phoneNumber}</span>
                </a>
                <button
                  type="button"
                  onClick={() => {
                    setStatus('idle');
                    setFormData({
                      firstName: '',
                      lastName: '',
                      email: '',
                      phone: '',
                      projectType: 'Exposed Aggregate Driveway',
                      siteAddress: '',
                      estimatedArea: '',
                      slabThickness: '125mm',
                      finishType: 'Premium Exposed Aggregate',
                      siteAccess: 'Clear Direct Concrete Truck Access (within 5m of pour)',
                      earthworks: true,
                      message: '',
                    });
                  }}
                  className="px-5 py-3 rounded-xl bg-surface-100 hover:bg-surface-200 text-surface-700 font-semibold text-sm transition-colors"
                >
                  Submit Another Project
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-8">
              
              {errorMessage && (
                <div className="p-4 bg-red-50 border border-red-200 rounded-2xl flex items-center gap-3 text-red-700 text-sm">
                  <AlertCircle className="w-5 h-5 shrink-0" />
                  <span>{errorMessage}</span>
                </div>
              )}

              {/* Section 1: Contact Details */}
              <div className="space-y-4">
                <h3 className="text-lg font-bold text-surface-900 border-b border-surface-200 pb-2">
                  1. Contact Information
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="firstName" className="block text-xs font-bold uppercase text-surface-600 mb-1.5">
                      First Name *
                    </label>
                    <input
                      id="firstName"
                      type="text"
                      name="firstName"
                      required
                      value={formData.firstName}
                      onChange={handleChange}
                      placeholder="e.g. John"
                      className="w-full px-4 py-3 rounded-xl border border-surface-200 text-sm focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 outline-none"
                    />
                  </div>

                  <div>
                    <label htmlFor="lastName" className="block text-xs font-bold uppercase text-surface-600 mb-1.5">
                      Last Name
                    </label>
                    <input
                      id="lastName"
                      type="text"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleChange}
                      placeholder="e.g. Smith"
                      className="w-full px-4 py-3 rounded-xl border border-surface-200 text-sm focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 outline-none"
                    />
                  </div>

                  <div>
                    <label htmlFor="email" className="block text-xs font-bold uppercase text-surface-600 mb-1.5">
                      Email Address *
                    </label>
                    <input
                      id="email"
                      type="email"
                      name="email"
                      required
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="john@example.com"
                      className="w-full px-4 py-3 rounded-xl border border-surface-200 text-sm focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 outline-none"
                    />
                  </div>

                  <div>
                    <label htmlFor="phone" className="block text-xs font-bold uppercase text-surface-600 mb-1.5">
                      Phone Number *
                    </label>
                    <input
                      id="phone"
                      type="tel"
                      name="phone"
                      required
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="0418 000 000"
                      className="w-full px-4 py-3 rounded-xl border border-surface-200 text-sm focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 outline-none"
                    />
                  </div>
                </div>
              </div>

              {/* Section 2: Site Location & Project Specs */}
              <div className="space-y-4">
                <h3 className="text-lg font-bold text-surface-900 border-b border-surface-200 pb-2">
                  2. Project &amp; Site Details
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="projectType" className="block text-xs font-bold uppercase text-surface-600 mb-1.5">
                      Primary Service *
                    </label>
                    <select
                      id="projectType"
                      name="projectType"
                      value={formData.projectType}
                      onChange={handleChange}
                      className="w-full px-4 py-3 rounded-xl border border-surface-200 text-sm bg-white focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 outline-none"
                    >
                      {PROJECT_TYPES.map((pt) => (
                        <option key={pt} value={pt}>
                          {pt}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label htmlFor="siteAddress" className="block text-xs font-bold uppercase text-surface-600 mb-1.5">
                      Site Address / Suburb (Wangaratta &amp; NE VIC)
                    </label>
                    <input
                      id="siteAddress"
                      type="text"
                      name="siteAddress"
                      value={formData.siteAddress}
                      onChange={handleChange}
                      placeholder="e.g. Bullivant St, Wangaratta or Milawa"
                      className="w-full px-4 py-3 rounded-xl border border-surface-200 text-sm focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 outline-none"
                    />
                  </div>

                  <div>
                    <label htmlFor="estimatedArea" className="block text-xs font-bold uppercase text-surface-600 mb-1.5">
                      Estimated Slab Area (m²)
                    </label>
                    <input
                      id="estimatedArea"
                      type="number"
                      name="estimatedArea"
                      value={formData.estimatedArea}
                      onChange={handleChange}
                      placeholder="e.g. 72 (from estimator)"
                      className="w-full px-4 py-3 rounded-xl border border-surface-200 text-sm focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 outline-none"
                    />
                  </div>

                  <div>
                    <label htmlFor="slabThickness" className="block text-xs font-bold uppercase text-surface-600 mb-1.5">
                      Slab Thickness
                    </label>
                    <select
                      id="slabThickness"
                      name="slabThickness"
                      value={formData.slabThickness}
                      onChange={handleChange}
                      className="w-full px-4 py-3 rounded-xl border border-surface-200 text-sm bg-white focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 outline-none"
                    >
                      <option value="100mm">100mm (Driveway / Footpaths)</option>
                      <option value="125mm">125mm (Domestic Sheds &amp; Garages)</option>
                      <option value="150mm">150mm (Heavy Farm Machinery / 20T+)</option>
                      <option value="other">Other / Custom Engineering</option>
                    </select>
                  </div>

                  <div>
                    <label htmlFor="finishType" className="block text-xs font-bold uppercase text-surface-600 mb-1.5">
                      Desired Surface Finish
                    </label>
                    <select
                      id="finishType"
                      name="finishType"
                      value={formData.finishType}
                      onChange={handleChange}
                      className="w-full px-4 py-3 rounded-xl border border-surface-200 text-sm bg-white focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 outline-none"
                    >
                      <option value="Premium Exposed Aggregate">Premium Exposed Aggregate (Alpine Pebble)</option>
                      <option value="Plain Broom-Finish">Plain Broom-Finish (Non-Slip)</option>
                      <option value="Stippled / Light Texture">Stippled / Light Texture</option>
                      <option value="Integrated Coloured Concrete">Integrated Coloured Concrete</option>
                      <option value="Nil-Exposure Burnished Polish">Nil-Exposure Burnished Polish (Internal)</option>
                    </select>
                  </div>

                  <div>
                    <label htmlFor="siteAccess" className="block text-xs font-bold uppercase text-surface-600 mb-1.5">
                      Concrete Truck Site Access
                    </label>
                    <select
                      id="siteAccess"
                      name="siteAccess"
                      value={formData.siteAccess}
                      onChange={handleChange}
                      className="w-full px-4 py-3 rounded-xl border border-surface-200 text-sm bg-white focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 outline-none"
                    >
                      {SITE_ACCESS_OPTIONS.map((opt) => (
                        <option key={opt} value={opt}>
                          {opt}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="pt-2">
                  <label htmlFor="earthworks" className="flex items-center gap-3 cursor-pointer">
                    <input
                      id="earthworks"
                      type="checkbox"
                      name="earthworks"
                      checked={formData.earthworks}
                      onChange={handleChange}
                      className="w-5 h-5 text-primary-600 rounded border-surface-300 focus:ring-primary-500 accent-primary-500 cursor-pointer"
                    />
                    <span className="text-sm text-surface-700 font-semibold">
                      Require Bobcat excavation, site levelling, and crushed rock roadbase preparation
                    </span>
                  </label>
                </div>
              </div>

              {/* Section 3: Project Notes */}
              <div>
                <label htmlFor="message" className="block text-xs font-bold uppercase text-surface-600 mb-1.5">
                  Additional Notes / Specific Requirements
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={4}
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Tell us about your site timing, existing ground conditions, slopes, or any questions for Wangaratta Radiators..."
                  className="w-full px-4 py-3 rounded-xl border border-surface-200 text-sm focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 outline-none"
                />
              </div>

              {/* Submit CTA */}
              <div className="pt-4 border-t border-surface-200 flex flex-col sm:flex-row items-center justify-between gap-4">
                <button
                  type="submit"
                  disabled={status === 'submitting'}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-8 py-4 rounded-xl bg-gradient-to-r from-primary-500 to-primary-600 hover:from-primary-400 hover:to-primary-500 text-surface-950 font-black text-base shadow-xl shadow-primary-500/25 transition-transform active:scale-98 disabled:opacity-50"
                >
                  {status === 'submitting' ? (
                    <>
                      <Loader2 className="w-5 h-5 animate-spin" />
                      <span>Submitting Project Request...</span>
                    </>
                  ) : (
                    <>
                      <Send className="w-5 h-5" />
                      <span>Submit Quote Request for Wangaratta Radiators</span>
                    </>
                  )}
                </button>

                <div className="text-xs text-surface-500 text-center sm:text-right">
                  <span>Fast 24hr response • No obligation • Free local measure</span>
                </div>
              </div>

            </form>
          )}

        </div>

      </div>
    </section>
  );
}

export function QuoteForm() {
  return (
    <Suspense fallback={<div className="py-20 text-center text-surface-500">Loading quote form...</div>}>
      <QuoteFormContent />
    </Suspense>
  );
}
