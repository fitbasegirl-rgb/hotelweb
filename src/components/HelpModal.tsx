import React, { useState } from 'react';
import {
  X,
  HelpCircle,
  Phone,
  Briefcase,
  AlertTriangle,
  ChevronDown,
  Mail,
  Clock,
  MapPin,
  Send,
  CheckCircle2,
  ExternalLink
} from 'lucide-react';
import {
  FAQ_DATA,
  RESTAURANT_CONTACT_INFO,
  CAREERS_POSITIONS,
  ALLERGEN_MATRIX
} from '../data/menuData';

export type HelpTabType = 'faqs' | 'contact' | 'careers' | 'allergen_guide';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  initialTab?: HelpTabType;
  onOpenCallToOrder: () => void;
}

export const HelpModal: React.FC<Props> = ({
  isOpen,
  onClose,
  initialTab = 'faqs',
  onOpenCallToOrder,
}) => {
  const [activeTab, setActiveTab] = useState<HelpTabType>(initialTab);
  const [expandedFaqIndex, setExpandedFaqIndex] = useState<number | null>(0);
  const [selectedJob, setSelectedJob] = useState<string | null>(null);
  const [applicationSubmitted, setApplicationSubmitted] = useState<boolean>(false);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/75 backdrop-blur-sm animate-fadeIn">
      <div
        className="relative w-full max-w-3xl bg-stone-900 border border-stone-800 text-stone-100 rounded-2xl shadow-2xl overflow-hidden max-h-[90vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-4 sm:p-5 bg-gradient-to-r from-amber-950/60 via-stone-900 to-amber-950/40 border-b border-stone-800 flex items-center justify-between">
          <div>
            <span className="text-[10px] uppercase font-bold tracking-widest text-amber-400">
              Guest Care & Assistance
            </span>
            <h2 className="text-lg sm:text-xl font-serif-display font-bold text-white">
              Shankar Hospitality Concierge
            </h2>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="p-2 rounded-xl bg-stone-800/80 text-stone-300 hover:text-white hover:bg-stone-700 transition-colors cursor-pointer"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Navigation */}
        <div className="px-4 sm:px-6 pt-3 flex gap-2 border-b border-stone-800 bg-stone-950/40 overflow-x-auto no-scrollbar">
          <button
            type="button"
            onClick={() => setActiveTab('faqs')}
            className={`pb-2.5 px-3 text-xs font-semibold border-b-2 transition-all cursor-pointer whitespace-nowrap flex items-center gap-1.5 ${
              activeTab === 'faqs'
                ? 'border-amber-400 text-amber-400'
                : 'border-transparent text-stone-400 hover:text-stone-200'
            }`}
          >
            <HelpCircle className="w-3.5 h-3.5" />
            FAQs & Policies
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('contact')}
            className={`pb-2.5 px-3 text-xs font-semibold border-b-2 transition-all cursor-pointer whitespace-nowrap flex items-center gap-1.5 ${
              activeTab === 'contact'
                ? 'border-amber-400 text-amber-400'
                : 'border-transparent text-stone-400 hover:text-stone-200'
            }`}
          >
            <Phone className="w-3.5 h-3.5" />
            Contact & Support
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('allergen_guide')}
            className={`pb-2.5 px-3 text-xs font-semibold border-b-2 transition-all cursor-pointer whitespace-nowrap flex items-center gap-1.5 ${
              activeTab === 'allergen_guide'
                ? 'border-amber-400 text-amber-400'
                : 'border-transparent text-stone-400 hover:text-stone-200'
            }`}
          >
            <AlertTriangle className="w-3.5 h-3.5" />
            Allergen & Diet Guide
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('careers')}
            className={`pb-2.5 px-3 text-xs font-semibold border-b-2 transition-all cursor-pointer whitespace-nowrap flex items-center gap-1.5 ${
              activeTab === 'careers'
                ? 'border-amber-400 text-amber-400'
                : 'border-transparent text-stone-400 hover:text-stone-200'
            }`}
          >
            <Briefcase className="w-3.5 h-3.5" />
            Join Our Team
          </button>
        </div>

        {/* Tab Content */}
        <div className="overflow-y-auto p-4 sm:p-6 space-y-5 flex-1 text-sm font-sans-body">
          {/* FAQs TAB */}
          {activeTab === 'faqs' && (
            <div className="space-y-3">
              {FAQ_DATA.map((faq, index) => {
                const isExpanded = expandedFaqIndex === index;
                return (
                  <div
                    key={index}
                    className="rounded-xl border border-stone-800 bg-stone-950/40 overflow-hidden transition-colors"
                  >
                    <button
                      type="button"
                      onClick={() => setExpandedFaqIndex(isExpanded ? null : index)}
                      className="w-full p-3.5 sm:p-4 text-left flex justify-between items-center gap-3 cursor-pointer hover:bg-stone-900/60 transition-colors"
                    >
                      <span className="font-semibold text-xs sm:text-sm text-stone-100">
                        {faq.question}
                      </span>
                      <ChevronDown
                        className={`w-4 h-4 text-amber-400 shrink-0 transition-transform ${
                          isExpanded ? 'rotate-180' : ''
                        }`}
                      />
                    </button>
                    {isExpanded && (
                      <div className="p-3.5 sm:p-4 pt-0 text-xs sm:text-sm text-stone-400 leading-relaxed border-t border-stone-800/60 bg-stone-900/20">
                        {faq.answer}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          )}

          {/* CONTACT TAB */}
          {activeTab === 'contact' && (
            <div className="space-y-5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="p-4 rounded-xl bg-stone-950/50 border border-stone-800 space-y-3">
                  <div className="flex items-center gap-2 text-amber-400 font-semibold text-xs uppercase tracking-wider">
                    <Phone className="w-4 h-4" /> Direct Hotline
                  </div>
                  <div>
                    <a
                      href={`tel:${RESTAURANT_CONTACT_INFO.phonePrimary || RESTAURANT_CONTACT_INFO.phoneDirect}`}
                      className="text-base font-bold text-white hover:text-amber-300 font-mono"
                    >
                      {RESTAURANT_CONTACT_INFO.phonePrimary || RESTAURANT_CONTACT_INFO.phoneDirect}
                    </a>
                    <p className="text-xs text-stone-400 mt-1">
                      Available daily from 11:00 AM to 12:00 Midnight
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={() => {
                      onClose();
                      onOpenCallToOrder();
                    }}
                    className="w-full py-2 px-3 rounded-lg bg-amber-400 text-stone-950 font-semibold text-xs hover:bg-amber-300 transition-colors cursor-pointer"
                  >
                    Open Call to Order Panel
                  </button>
                </div>

                <div className="p-4 rounded-xl bg-stone-950/50 border border-stone-800 space-y-3">
                  <div className="flex items-center gap-2 text-amber-400 font-semibold text-xs uppercase tracking-wider">
                    <Mail className="w-4 h-4" /> Guest Concierge
                  </div>
                  <div>
                    <a
                      href={`mailto:${RESTAURANT_CONTACT_INFO.email}`}
                      className="text-sm font-semibold text-amber-300 hover:underline"
                    >
                      {RESTAURANT_CONTACT_INFO.email}
                    </a>
                    <p className="text-xs text-stone-400 mt-1">
                      For corporate dining, wedding catering, and press inquiries
                    </p>
                  </div>
                  <div className="text-xs text-stone-400 pt-1 border-t border-stone-800">
                    Average email response: <strong className="text-stone-300">Under 2 hours</strong>
                  </div>
                </div>
              </div>

              {/* Physical Location */}
              <div className="p-4 rounded-xl bg-stone-950/30 border border-stone-800 flex items-start gap-3">
                <MapPin className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                <div className="text-xs">
                  <p className="font-semibold text-stone-200">Main Restaurant & Kitchen</p>
                  <p className="text-stone-400">{RESTAURANT_CONTACT_INFO.address}</p>
                </div>
              </div>
            </div>
          )}

          {/* ALLERGEN GUIDE TAB */}
          {activeTab === 'allergen_guide' && (
            <div className="space-y-4">
              <div className="p-3.5 rounded-xl bg-stone-950/60 border border-amber-500/20 text-xs text-stone-300 space-y-1">
                <p className="font-semibold text-amber-300">Culinary Transparency Commitment</p>
                <p>
                  We prioritize your health and well-being. Below is our kitchen allergen declaration matrix for signature specialties.
                </p>
              </div>

              <div className="rounded-xl border border-stone-800 overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead className="bg-stone-950 text-stone-400 uppercase tracking-wider border-b border-stone-800">
                    <tr>
                      <th className="p-3">Dish</th>
                      <th className="p-3">Section</th>
                      <th className="p-3 text-center">Gluten</th>
                      <th className="p-3 text-center">Dairy</th>
                      <th className="p-3 text-center">Nuts</th>
                      <th className="p-3 text-center">Dietary / Jain</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-stone-800/60">
                    {ALLERGEN_MATRIX.map((row, idx) => (
                      <tr key={idx} className="hover:bg-stone-900/40">
                        <td className="p-3 font-medium text-stone-200">{row.dishName}</td>
                        <td className="p-3 text-stone-400 capitalize">{row.menuSection?.replace('_', ' ') || row.category}</td>
                        <td className="p-3 text-center">
                          {row.glutenFree ? (
                            <span className="text-emerald-400 font-medium">Free</span>
                          ) : (
                            <span className="text-amber-400 font-bold">Contains</span>
                          )}
                        </td>
                        <td className="p-3 text-center">
                          {row.dairyFree ? (
                            <span className="text-emerald-400 font-medium">Free</span>
                          ) : (
                            <span className="text-amber-400 font-bold">Contains</span>
                          )}
                        </td>
                        <td className="p-3 text-center">
                          {row.nutFree ? (
                            <span className="text-stone-500">Free</span>
                          ) : (
                            <span className="text-rose-400 font-bold">Contains</span>
                          )}
                        </td>
                        <td className="p-3 text-center">
                          {row.jainFriendly ? (
                            <span className="text-amber-300 font-semibold">Jain Friendly</span>
                          ) : row.vegan ? (
                            <span className="text-emerald-300 font-semibold">Vegan</span>
                          ) : (
                            <span className="text-stone-400 capitalize">{row.dietary || 'Standard'}</span>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* CAREERS TAB */}
          {activeTab === 'careers' && (
            <div className="space-y-4">
              <div className="p-4 rounded-xl bg-stone-950/60 border border-stone-800">
                <h3 className="text-sm font-serif-display font-bold text-amber-300 mb-1">
                  Culinary Excellence & Royal Hospitality
                </h3>
                <p className="text-xs text-stone-400">
                  Join our passionate kitchen and service brigade. We offer competitive industry remuneration, daily staff royal dining meals, and structured career advancement.
                </p>
              </div>

              <div className="space-y-3">
                {CAREERS_POSITIONS.map((pos) => (
                  <div
                    key={pos.id}
                    className="p-4 rounded-xl border border-stone-800 bg-stone-950/40 space-y-2 hover:border-stone-700 transition-colors"
                  >
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                      <div>
                        <h4 className="font-semibold text-white text-sm">{pos.title}</h4>
                        <div className="flex items-center gap-2 text-xs text-stone-400 mt-0.5">
                          <span>{pos.department}</span>
                          <span>•</span>
                          <span>{pos.type}</span>
                          <span>•</span>
                          <span className="text-amber-400">{pos.experience}</span>
                        </div>
                      </div>

                      <button
                        type="button"
                        onClick={() => {
                          setSelectedJob(pos.title);
                          setApplicationSubmitted(false);
                        }}
                        className="py-1.5 px-3 rounded-lg bg-stone-800 hover:bg-stone-700 text-xs font-medium text-stone-200 hover:text-white transition-colors cursor-pointer self-start sm:self-auto"
                      >
                        Apply Now
                      </button>
                    </div>
                    <p className="text-xs text-stone-400 leading-relaxed">{pos.description}</p>
                  </div>
                ))}
              </div>

              {selectedJob && (
                <div className="p-4 rounded-xl bg-amber-950/30 border border-amber-500/30 space-y-3 animate-fadeIn">
                  <div className="flex justify-between items-center">
                    <span className="text-xs font-bold text-amber-300">
                      Submit Interest: {selectedJob}
                    </span>
                    <button
                      type="button"
                      onClick={() => setSelectedJob(null)}
                      className="text-stone-400 hover:text-white text-xs"
                    >
                      Cancel
                    </button>
                  </div>

                  {applicationSubmitted ? (
                    <div className="p-3 rounded-lg bg-emerald-950/60 border border-emerald-700/60 text-emerald-300 text-xs flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                      Thank you! Our hospitality HR director will contact you within 48 hours.
                    </div>
                  ) : (
                    <form
                      onSubmit={(e) => {
                        e.preventDefault();
                        setApplicationSubmitted(true);
                      }}
                      className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs"
                    >
                      <input
                        required
                        type="text"
                        placeholder="Your Full Name"
                        className="px-3 py-2 rounded-lg bg-stone-900 border border-stone-700 text-white placeholder-stone-500"
                      />
                      <input
                        required
                        type="tel"
                        placeholder="Contact Phone (+91)"
                        className="px-3 py-2 rounded-lg bg-stone-900 border border-stone-700 text-white placeholder-stone-500"
                      />
                      <input
                        required
                        type="email"
                        placeholder="Email Address"
                        className="sm:col-span-2 px-3 py-2 rounded-lg bg-stone-900 border border-stone-700 text-white placeholder-stone-500"
                      />
                      <button
                        type="submit"
                        className="sm:col-span-2 py-2 px-4 rounded-lg bg-amber-400 hover:bg-amber-300 text-stone-950 font-bold cursor-pointer"
                      >
                        Submit Application
                      </button>
                    </form>
                  )}
                </div>
              )}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-3.5 bg-stone-950 border-t border-stone-800 flex justify-end">
          <button
            type="button"
            onClick={onClose}
            className="py-2 px-4 rounded-xl text-xs font-semibold bg-stone-800 hover:bg-stone-700 text-stone-200 hover:text-white transition-colors cursor-pointer"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
