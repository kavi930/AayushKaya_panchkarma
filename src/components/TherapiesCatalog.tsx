import React, { useState, useMemo } from 'react';
import { Search, Calendar, Info, Clock, Sparkles } from 'lucide-react';
import { THERAPIES, THERAPY_CATEGORIES, Therapy } from '../data/ayushkayaData';

interface TherapiesCatalogProps {
  onSelectTherapy: (therapy: Therapy) => void;
  onBookTherapy: (therapyName: string) => void;
}

export const TherapiesCatalog: React.FC<TherapiesCatalogProps> = ({
  onSelectTherapy,
  onBookTherapy,
}) => {
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const filteredTherapies = useMemo(() => {
    return THERAPIES.filter((t) => {
      const matchesCategory =
        activeCategory === 'all' || t.category === activeCategory;
      const query = searchQuery.trim().toLowerCase();
      if (!query) return matchesCategory;

      const matchesQuery =
        t.name.toLowerCase().includes(query) ||
        (t.sanskritName && t.sanskritName.toLowerCase().includes(query)) ||
        t.shortDesc.toLowerCase().includes(query) ||
        t.suitableFor.some((s) => s.toLowerCase().includes(query));

      return matchesCategory && matchesQuery;
    });
  }, [activeCategory, searchQuery]);

  return (
    <section id="therapies" className="py-20 bg-[#FBF9F4] border-b border-[#0E2A21]/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto mb-12 space-y-3">
          <div className="inline-flex items-center gap-1.5 text-xs uppercase tracking-widest font-semibold text-[#8C6B1B]">
            <Sparkles className="w-3.5 h-3.5" />
            24 Traditional Modalities
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-[#0E2A21] tracking-tight">
            Explore Our Therapies
          </h2>
          <p className="text-base text-[#465A4F] leading-relaxed">
            Discover Ayurvedic therapies designed around individual wellness needs, restoring bodily equilibrium with classical medicated oils and gentle touch.
          </p>
        </div>

        {/* Filter Controls Bar */}
        <div className="space-y-4 mb-10">
          
          {/* Search Box */}
          <div className="max-w-md mx-auto relative">
            <Search className="w-4 h-4 text-[#8C6B1B] absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search therapy by name or focus (e.g. back, knee, stress)..."
              className="w-full pl-10 pr-4 py-2.5 bg-white border border-[#0E2A21]/15 rounded-xl text-sm text-[#0E2A21] placeholder-[#465A4F]/60 focus:outline-none focus:border-[#059669] focus:ring-1 focus:ring-[#059669] shadow-sm transition-all"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-[#465A4F] hover:text-[#0E2A21] px-1"
              >
                Clear
              </button>
            )}
          </div>

          {/* Interactive Category Segmented Tabs */}
          <div className="flex items-center justify-start sm:justify-center gap-1.5 overflow-x-auto pb-2 scrollbar-none px-2">
            {THERAPY_CATEGORIES.map((cat) => {
              const isActive = activeCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  onClick={() => setActiveCategory(cat.id)}
                  className={`px-3.5 py-2 text-xs font-semibold rounded-lg transition-all whitespace-nowrap shrink-0 ${
                    isActive
                      ? 'bg-[#0E2A21] text-white shadow-md'
                      : 'bg-[#F0EBE1] text-[#2C3E34] hover:bg-[#E5DDCF]'
                  }`}
                >
                  {cat.label} ({cat.count})
                </button>
              );
            })}
          </div>
        </div>

        {/* Therapies Grid */}
        {filteredTherapies.length === 0 ? (
          <div className="text-center py-16 bg-white rounded-2xl border border-dashed border-[#0E2A21]/20 max-w-lg mx-auto p-8">
            <p className="text-base font-serif font-bold text-[#0E2A21]">No therapies found</p>
            <p className="text-xs text-[#465A4F] mt-1">
              Try searching with another keyword or reset the category filter.
            </p>
            <button
              onClick={() => {
                setActiveCategory('all');
                setSearchQuery('');
              }}
              className="mt-4 px-4 py-2 text-xs font-semibold text-white bg-[#059669] rounded-lg"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredTherapies.map((therapy) => (
              <div
                key={therapy.id}
                className="bg-white rounded-xl border border-[#0E2A21]/10 hover:border-[#059669]/40 shadow-sm hover:shadow-md transition-all flex flex-col justify-between p-5 group"
              >
                {/* Header Information */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-[11px] text-[#8C6B1B] font-medium tracking-wide">
                    <span className="flex items-center gap-1.5">
                      <span className="w-5 h-5 rounded-full bg-[#0E2A21] text-[#D4AF37] text-[10px] font-bold inline-flex items-center justify-center">
                        {therapy.number}
                      </span>
                      <span>{therapy.categoryLabel}</span>
                    </span>
                    <span className="flex items-center gap-1 text-[#465A4F]">
                      <Clock className="w-3 h-3 text-[#D4AF37]" />
                      {therapy.sessionDuration}
                    </span>
                  </div>

                  <div>
                    <h3 className="font-serif text-xl font-bold text-[#0E2A21] group-hover:text-[#059669] transition-colors">
                      {therapy.name}
                    </h3>
                    {therapy.sanskritName && (
                      <p className="text-xs font-serif text-[#8C6B1B] mt-0.5">
                        {therapy.sanskritName}
                      </p>
                    )}
                  </div>

                  <p className="text-xs text-[#465A4F] leading-relaxed line-clamp-2">
                    {therapy.shortDesc}
                  </p>

                  {/* Target Area */}
                  {therapy.bodyTarget && (
                    <p className="text-[11px] text-[#13382C] font-semibold bg-[#F0EBE1] px-2 py-1 rounded">
                      🎯 {therapy.bodyTarget}
                    </p>
                  )}

                  {/* Suitability tags */}
                  <div className="pt-1 flex flex-wrap gap-1">
                    {therapy.suitableFor.slice(0, 2).map((item) => (
                      <span
                        key={item}
                        className="text-[10px] bg-[#F5F0E8] text-[#13382C] px-2 py-0.5 rounded font-medium"
                      >
                        {item}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Footer Buttons */}
                <div className="pt-4 mt-4 border-t border-[#0E2A21]/5 flex items-center justify-between gap-2">
                  <button
                    onClick={() => onSelectTherapy(therapy)}
                    className="text-xs font-medium text-[#0E2A21] hover:text-[#059669] inline-flex items-center gap-1 transition-colors"
                  >
                    <Info className="w-3.5 h-3.5 text-[#D4AF37]" />
                    <span>Learn More</span>
                  </button>

                  <button
                    onClick={() => onBookTherapy(therapy.name)}
                    className="inline-flex items-center gap-1 px-3 py-1.5 text-xs font-semibold text-white bg-[#059669] hover:bg-[#047857] active:scale-95 rounded-lg shadow-sm transition-all"
                  >
                    <Calendar className="w-3 h-3" />
                    <span>Book This</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Disclaimer Note */}
        <div className="mt-12 text-center text-xs text-[#6B7E73] max-w-2xl mx-auto leading-relaxed">
          <em>
            Note: Ayurvedic wellness therapies are traditional modalities designed to promote bodily equilibrium, relaxation, and tissue nourishment. AyushKaya avoids unsupported medical claims and tailors each session around your personal comfort.
          </em>
        </div>

      </div>
    </section>
  );
};
