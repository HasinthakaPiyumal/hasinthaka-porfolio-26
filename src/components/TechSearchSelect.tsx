"use client";

import React, { useState, useRef, useEffect } from "react";
import { Search, X, Check, Plus, ChevronDown } from "lucide-react";
import { PREDEFINED_TECH_LIST, getTechItem, TechItem } from "./TechIcons";

interface TechSearchSelectProps {
  selected: string[];
  onChange: (selected: string[]) => void;
  placeholder?: string;
  maxItems?: number;
}

export function TechSearchSelect({
  selected,
  onChange,
  placeholder = "Search or select technologies...",
}: TechSearchSelectProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const containerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Close dropdown on click outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleToggleTool = (toolName: string) => {
    if (selected.includes(toolName)) {
      onChange(selected.filter((t) => t !== toolName));
    } else {
      onChange([...selected, toolName]);
    }
  };

  const handleRemoveTool = (toolName: string, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    onChange(selected.filter((t) => t !== toolName));
  };

  const handleAddCustomTool = (customName: string) => {
    const trimmed = customName.trim();
    if (!trimmed) return;
    if (!selected.includes(trimmed)) {
      onChange([...selected, trimmed]);
    }
    setSearchQuery("");
  };

  // Filtered tech items
  const filteredTech = PREDEFINED_TECH_LIST.filter((tech) => {
    const matchesQuery =
      tech.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      tech.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
      tech.id.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === "All" || tech.category === selectedCategory;
    return matchesQuery && matchesCategory;
  });

  const exactMatch = PREDEFINED_TECH_LIST.some(
    (t) => t.name.toLowerCase() === searchQuery.trim().toLowerCase()
  );

  const categories = [
    "All",
    "Languages",
    "Frameworks & Web",
    "Cloud & Databases",
    "AI & Data Tools",
    "DevOps & Tools",
  ];

  return (
    <div className="relative w-full" ref={containerRef}>
      {/* React-Select Container Box */}
      <div
        onClick={() => {
          setIsOpen(true);
          inputRef.current?.focus();
        }}
        className={`min-h-[46px] w-full bg-[#141414] border rounded-xl p-2 flex flex-wrap items-center gap-1.5 cursor-text transition-all ${
          isOpen ? "border-[#568f5e] ring-1 ring-[#568f5e]/30 shadow-lg" : "border-[#262626] hover:border-[#383838]"
        }`}
      >
        {/* Selected Tech Chips / Badges */}
        {selected.map((toolName) => {
          const item = getTechItem(toolName);
          const IconComp = item.icon;
          return (
            <span
              key={toolName}
              className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-[#1c2b1e] border border-[#345237] text-white text-xs font-mono shadow-sm transition-all"
            >
              <IconComp className="w-3.5 h-3.5 shrink-0" />
              <span>{toolName}</span>
              <button
                type="button"
                onClick={(e) => handleRemoveTool(toolName, e)}
                className="p-0.5 text-gray-400 hover:text-red-400 hover:bg-[#2b1c1c] rounded transition-colors ml-0.5"
                title="Remove"
              >
                <X size={12} />
              </button>
            </span>
          );
        })}

        {/* Input Field */}
        <div className="flex-1 min-w-[140px] flex items-center gap-2">
          <Search size={14} className="text-gray-500 shrink-0 ml-1" />
          <input
            ref={inputRef}
            type="text"
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value);
              setIsOpen(true);
            }}
            onFocus={() => setIsOpen(true)}
            onKeyDown={(e) => {
              if (e.key === "Enter" && searchQuery.trim() && !exactMatch) {
                e.preventDefault();
                handleAddCustomTool(searchQuery);
              }
            }}
            placeholder={selected.length === 0 ? placeholder : "Add more tech..."}
            className="w-full bg-transparent text-xs text-white placeholder-gray-500 focus:outline-none py-1"
          />
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-1 text-gray-500 shrink-0 pr-1">
          {selected.length > 0 && (
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                onChange([]);
              }}
              className="p-1 hover:text-red-400 transition-colors"
              title="Clear all selected"
            >
              <X size={14} />
            </button>
          )}
          <ChevronDown
            size={15}
            className={`transition-transform duration-200 ${isOpen ? "rotate-180 text-[#568f5e]" : ""}`}
          />
        </div>
      </div>

      {/* Dropdown Menu Overlay */}
      {isOpen && (
        <div className="absolute z-50 left-0 right-0 top-full mt-2 bg-[#101010] border border-[#262626] rounded-2xl shadow-2xl overflow-hidden p-3 space-y-3 animate-in fade-in duration-150">
          {/* Category Filter Pills */}
          <div className="flex items-center gap-1 overflow-x-auto pb-1 custom-scrollbar">
            {categories.map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  setSelectedCategory(cat);
                }}
                className={`px-2.5 py-0.5 rounded-md text-[10px] font-mono transition-colors shrink-0 ${
                  selectedCategory === cat
                    ? "bg-[#568f5e] text-white font-bold"
                    : "bg-[#181818] text-gray-400 hover:text-white border border-[#242424]"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Custom Add Option if typing string not found */}
          {searchQuery.trim() && !exactMatch && (
            <button
              type="button"
              onClick={() => handleAddCustomTool(searchQuery)}
              className="w-full p-2 rounded-xl bg-[#18281b] border border-[#2e4732] hover:bg-[#203624] text-xs font-mono text-[#69ab73] flex items-center justify-between transition-colors"
            >
              <span className="flex items-center gap-2">
                <Plus size={14} />
                <span>Add custom technology: &quot;<strong>{searchQuery.trim()}</strong>&quot;</span>
              </span>
              <span className="text-[10px] bg-[#568f5e] text-white px-2 py-0.5 rounded">Press Enter</span>
            </button>
          )}

          {/* Filtered Technology Options Grid / List */}
          <div className="max-h-60 overflow-y-auto custom-scrollbar space-y-1 pr-1">
            {filteredTech.length === 0 && !searchQuery.trim() ? (
              <div className="text-center py-6 text-xs text-gray-500">No matching technologies found.</div>
            ) : (
              filteredTech.map((tech) => {
                const isSelected = selected.includes(tech.name) || selected.includes(tech.id);
                const IconComp = tech.icon;

                return (
                  <button
                    key={tech.id}
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleToggleTool(tech.name);
                    }}
                    className={`w-full p-2 rounded-xl text-left flex items-center justify-between gap-3 transition-colors cursor-pointer ${
                      isSelected
                        ? "bg-[#162719] border border-[#345237] text-white"
                        : "bg-[#141414] hover:bg-[#1c1c1c] border border-transparent text-gray-300"
                    }`}
                  >
                    <div className="flex items-center gap-2.5 truncate">
                      <div className="p-1 rounded-lg bg-[#1a1a1a] border border-[#282828] shrink-0">
                        <IconComp className="w-4 h-4" />
                      </div>
                      <div className="truncate">
                        <span className="text-xs font-semibold font-mono text-white block truncate">
                          {tech.name}
                        </span>
                        <span className="text-[9px] text-gray-500 font-mono block truncate">
                          {tech.category}
                        </span>
                      </div>
                    </div>

                    <div
                      className={`w-4 h-4 rounded-full flex items-center justify-center shrink-0 border transition-colors ${
                        isSelected
                          ? "bg-[#568f5e] border-[#568f5e] text-white"
                          : "border-[#333333] text-transparent"
                      }`}
                    >
                      <Check size={10} strokeWidth={3} />
                    </div>
                  </button>
                );
              })
            )}
          </div>
        </div>
      )}
    </div>
  );
}
