import React from "react";
import { Search, X } from "lucide-react";
import { CATEGORIES } from "./resourceData";

interface ResourceSearchStripProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  selectedCategory: string;
  onCategorySelect: (catId: string) => void;
  resultsCount: number;
}

export const ResourceSearchStrip: React.FC<ResourceSearchStripProps> = ({
  searchQuery,
  onSearchChange,
  selectedCategory,
  onCategorySelect,
  resultsCount,
}) => {
  return (
    <div className="space-y-3 mb-6">
      {/* Search Input Bar */}
      <div className="relative flex items-center">
        <div className="absolute left-4 pointer-events-none text-muted-foreground flex items-center">
          <Search className="w-4 h-4 text-teal-700 dark:text-haven-teal" />
        </div>

        <input
          type="text"
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          placeholder="Search for resources, laws, rights, or help topics..."
          className="w-full pl-11 pr-10 py-3 rounded-2xl bg-white/80 dark:bg-white/[0.04] border border-teal-500/25 hover:border-teal-500/40 text-foreground text-xs sm:text-sm placeholder:text-muted-foreground/70 focus:outline-none focus:ring-2 focus:ring-haven-teal/40 shadow-sm backdrop-blur-md transition-all"
        />

        {searchQuery && (
          <button
            type="button"
            onClick={() => onSearchChange("")}
            className="absolute right-3.5 p-1 rounded-lg text-muted-foreground hover:text-foreground hover:bg-slate-100 dark:hover:bg-white/10 transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        )}
      </div>

      {/* Category Filter Pills & Counter */}
      <div className="flex items-center justify-between gap-3 overflow-x-auto pb-1 pt-0.5 no-scrollbar">
        <div className="flex items-center gap-1.5 flex-nowrap sm:flex-wrap">
          {CATEGORIES.map((cat) => {
            const isSelected = selectedCategory === cat.id;

            return (
              <button
                key={cat.id}
                type="button"
                onClick={() => onCategorySelect(cat.id)}
                className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
                  isSelected
                    ? "btn-primary text-slate-950 shadow-sm scale-102"
                    : "bg-white/60 dark:bg-white/[0.03] border border-border/60 hover:border-teal-500/40 text-muted-foreground hover:text-foreground hover:bg-teal-50/50 dark:hover:bg-white/[0.06]"
                }`}
              >
                {cat.label}
              </button>
            );
          })}
        </div>

        <span className="text-[11px] font-medium text-muted-foreground whitespace-nowrap pl-2">
          {resultsCount} {resultsCount === 1 ? "guide" : "guides"}
        </span>
      </div>
    </div>
  );
};

export default ResourceSearchStrip;
