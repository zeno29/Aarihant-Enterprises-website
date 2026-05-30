import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Filter, Star, Info, MessageSquareCode, SlidersHorizontal, ArrowUpDown, X, ListCollapse } from 'lucide-react';
import { Product, Brand, Category } from '../types';
import { PRODUCTS } from '../data/products';

interface ProductSectionProps {
  onInquireClick: (productName: string, brandName: string) => void;
}

export default function ProductSection({ onInquireClick }: ProductSectionProps) {
  // Filters & Sorting state
  const [selectedCategory, setSelectedCategory] = useState<Category | 'All'>('All');
  const [selectedBrand, setSelectedBrand] = useState<Brand | 'All'>('All');
  const [sortBy, setSortBy] = useState<'rating' | 'price-low' | 'price-high'>('rating');
  const [searchQuery, setSearchQuery] = useState('');

  // Selected Product for Specs Modal
  const [modalProduct, setModalProduct] = useState<Product | null>(null);

  // Compare Checklist state
  const [compareList, setCompareList] = useState<Product[]>([]);
  const [isCompareOpen, setIsCompareOpen] = useState(false);

  // Categories list
  const categories: (Category | 'All')[] = ['All', 'Laptops', 'Desktops', 'Printers', 'Accessories'];
  // Brands list
  const brands: (Brand | 'All')[] = ['All', 'HP', 'Lenovo', 'ASUS', 'Acer'];

  // Reactive Filter & Search
  const filteredProducts = useMemo(() => {
    let result = [...PRODUCTS];

    if (selectedCategory !== 'All') {
      result = result.filter((p) => p.category === selectedCategory);
    }
    if (selectedBrand !== 'All') {
      result = result.filter((p) => p.brand === selectedBrand);
    }
    if (searchQuery.trim() !== '') {
      const q = searchQuery.toLowerCase();
      result = result.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.brand.toLowerCase().includes(q) ||
          p.description.toLowerCase().includes(q)
      );
    }

    // Sort Handler
    if (sortBy === 'rating') {
      result.sort((a, b) => b.rating - a.rating);
    } else if (sortBy === 'price-low') {
      result.sort((a, b) => a.price - b.price);
    } else if (sortBy === 'price-high') {
      result.sort((a, b) => b.price - a.price);
    }

    return result;
  }, [selectedCategory, selectedBrand, sortBy, searchQuery]);

  // Compare Handlers
  const handleToggleCompare = (product: Product) => {
    if (compareList.some((p) => p.id === product.id)) {
      setCompareList(compareList.filter((p) => p.id !== product.id));
    } else {
      if (compareList.length >= 3) {
        alert('You can compare a maximum of 3 products simultaneously.');
        return;
      }
      setCompareList([...compareList, product]);
      setIsCompareOpen(true);
    }
  };

  return (
    <section className="py-20 bg-[#171f33]/35 border-t border-[#3a494b]/20 scroll-mt-24" id="categories">
      <div className="max-w-[1440px] mx-auto px-6">
        
        {/* Section Title */}
        <div className="text-center mb-12">
          <h2 className="font-display-lg text-[26px] sm:text-[40px] text-white font-extrabold mb-4 tracking-tight">
            Official HP, Lenovo, ASUS & Acer Showroom in Prayagraj (Allahabad)
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-[#00dbe7] to-[#013fb9] mx-auto rounded-full mb-4"></div>
          <p className="text-[#b9cacb] max-w-2xl mx-auto font-light text-sm sm:text-base">
            Configure, compare, and reserve authentic next-gen hardware. We are your official local sales center for HP Spectre, Lenovo ThinkPad, ASUS ROG, and Acer Predator configurations in Allahabad and Prayagraj.
          </p>
        </div>

        {/* Filters and Search Bar Container */}
        <div className="glass-panel p-6 rounded-2xl mb-10 flex flex-col gap-6 md:gap-8 shadow-[0_4px_30px_rgba(0,242,255,0.03)] border-[#849495]/10">
          
          <div className="flex flex-col lg:flex-row gap-6 justify-between items-stretch lg:items-center">
            
            {/* Search Input */}
            <div className="relative flex-1 max-w-lg">
              <input
                type="text"
                placeholder="Search products, processors, features..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-[#131b2e] border border-[#3a494b]/60 text-white rounded-lg pl-4 pr-10 py-3 text-sm focus:outline-none focus:border-[#00dbe7] focus:ring-1 focus:ring-[#00dbe7] placeholder-[#b9cacb]/50"
              />
              <span className="absolute right-3 top-1/2 -translate-y-1/2 text-[#b9cacb] text-xs font-semibold cursor-pointer">
                🔍
              </span>
            </div>

            {/* Sorter Selector */}
            <div className="flex items-center gap-3">
              <span className="text-xs font-semibold text-[#b9cacb] uppercase tracking-wider flex items-center gap-1.5 whitespace-nowrap">
                <ArrowUpDown className="w-4 h-4 text-[#00dbe7]" />
                Sort By:
              </span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                className="min-w-[170px] bg-[#131b2e] border border-[#3a494b]/60 text-white text-sm rounded-lg p-3 focus:outline-none focus:border-[#00dbe7]"
              >
                <option value="rating">Top Rated ⭐</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
              </select>
            </div>
          </div>

          {/* Categories Tab Selectors */}
          <div className="border-t border-[#3a494b]/20 pt-5">
            <span className="block text-xs font-semibold text-[#b9cacb] uppercase tracking-widest mb-3">
              Categories
            </span>
            <div className="flex flex-wrap gap-2">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-5 py-2.5 rounded-lg text-xs font-bold uppercase tracking-wider transition-all duration-300 border cursor-pointer ${
                    selectedCategory === cat
                      ? 'bg-[#00f2ff]/20 text-[#00f2ff] border-[#00dbe7]/50 shadow-[0_0_15px_rgba(0,242,255,0.1)]'
                      : 'bg-[#131b2e]/40 text-[#b9cacb] border-[#3a494b]/40 hover:bg-[#131b2e]/80 hover:text-white'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {/* Brand Tab Selectors */}
          <div className="border-t border-[#3a494b]/20 pt-5">
            <span className="block text-xs font-semibold text-[#b9cacb] uppercase tracking-widest mb-3">
              Authorized Brands
            </span>
            <div className="flex flex-wrap gap-2">
              {brands.map((br) => (
                <button
                  key={br}
                  onClick={() => setSelectedBrand(br)}
                  className={`px-5 py-2.5 rounded-lg text-xs font-bold uppercase tracking-wider transition-all duration-300 border cursor-pointer ${
                    selectedBrand === br
                      ? 'bg-[#013fb9]/30 text-[#b6c4ff] border-[#b6c4ff]/50 shadow-[0_0_15px_rgba(182,196,255,0.1)]'
                      : 'bg-[#131b2e]/40 text-[#b9cacb] border-[#3a494b]/40 hover:bg-[#131b2e]/80 hover:text-white'
                  }`}
                >
                  {br}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Active Filters Summary */}
        {(selectedBrand !== 'All' || selectedCategory !== 'All' || searchQuery !== '') && (
          <div className="flex items-center gap-3 mb-6 flex-wrap">
            <span className="text-xs text-[#b9cacb] font-medium uppercase tracking-wider">Active Filters:</span>
            {selectedBrand !== 'All' && (
              <span className="bg-[#131b2e] border border-[#3a494b] text-white text-xs px-3 py-1 rounded-full flex items-center gap-1.5">
                Brand: {selectedBrand}
                <button onClick={() => setSelectedBrand('All')} className="text-red-400 hover:text-red-500 font-bold ml-1">×</button>
              </span>
            )}
            {selectedCategory !== 'All' && (
              <span className="bg-[#131b2e] border border-[#3a494b] text-white text-xs px-3 py-1 rounded-full flex items-center gap-1.5">
                Category: {selectedCategory}
                <button onClick={() => setSelectedCategory('All')} className="text-red-400 hover:text-red-500 font-bold ml-1">×</button>
              </span>
            )}
            {searchQuery !== '' && (
              <span className="bg-[#131b2e] border border-[#3a494b] text-white text-xs px-3 py-1 rounded-full flex items-center gap-1.5">
                Search: "{searchQuery}"
                <button onClick={() => setSearchQuery('')} className="text-red-400 hover:text-red-500 font-bold ml-1">×</button>
              </span>
            )}
          </div>
        )}

        {/* Product Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <AnimatePresence mode="popLayout">
            {filteredProducts.map((product) => (
              <motion.div
                key={product.id}
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3 }}
                className="group rounded-2xl bg-[#131b2e]/70 backdrop-blur-lg border border-[#849495]/15 p-5 flex flex-col justify-between hover:border-[#00dbe7]/50 hover:shadow-[0_0_30px_rgba(0,242,255,0.06)] transition-all duration-300"
              >
                <div>
                  {/* Photo container of the product */}
                  <div className="relative rounded-xl overflow-hidden aspect-[4/3] bg-[#060e20] mb-5 flex items-center justify-center">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      referrerPolicy="no-referrer"
                    />
                    
                    {/* Floating Badges */}
                    {product.isNew && (
                      <span className="absolute top-3 left-3 bg-[#00f2ff]/20 border border-[#00dbe7]/50 text-[#00f2ff] text-[10px] uppercase font-bold py-1 px-2.5 rounded-md backdrop-blur-md">
                        New Arrivals
                      </span>
                    )}

                    {product.isPromo && (
                      <span className="absolute top-3 right-3 bg-[#fed83a]/20 border border-[#e8c423]/50 text-[#ffe173] text-[10px] uppercase font-bold py-1 px-2.5 rounded-md backdrop-blur-md">
                        {product.promoText || 'Special Offer'}
                      </span>
                    )}

                    {/* Brand Watermark on Overlay */}
                    <span className="absolute bottom-3 left-3 select-none text-[10px] font-bold text-white px-2 py-0.5 rounded bg-black/40 uppercase tracking-widest backdrop-blur-sm opacity-80">
                      {product.brand}
                    </span>
                  </div>

                  {/* Header Title / Rating */}
                  <div className="flex justify-between items-start gap-4 mb-2">
                    <h3 className="font-display-lg text-lg font-bold text-white tracking-tight group-hover:text-[#00dbe7] transition-colors leading-snug">
                      {product.name}
                    </h3>
                    <div className="flex items-center gap-1 shrink-0 font-mono text-xs text-white">
                      <Star className="w-4 h-4 fill-[#fed83a] text-[#fed83a] stroke-[1px]" />
                      <span>{product.rating.toFixed(1)}</span>
                    </div>
                  </div>

                  {/* Description text */}
                  <p className="text-[#b9cacb] text-xs font-light leading-relaxed mb-4 line-clamp-2">
                    {product.description}
                  </p>

                  {/* Features Pille/Specs Ticker */}
                  <div className="flex flex-wrap gap-1.5 mb-6">
                    {product.specs.features.slice(0, 2).map((feat, i) => (
                      <span
                        key={i}
                        className="text-[10px] text-[#b9cacb]/80 bg-[#171f33] border border-[#3a494b]/50 px-2.5 py-1 rounded"
                      >
                        {feat}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Footer Controls */}
                <div className="border-t border-[#3a494b]/30 pt-4 mt-auto">
                  {/* Price representation */}
                  <div className="flex items-baseline justify-between mb-4">
                    <div className="flex items-baseline gap-2">
                      <span className="text-2xl font-black text-white font-mono">
                        ₹{product.price.toLocaleString('en-IN')}
                      </span>
                      {product.originalPrice && (
                        <span className="text-xs text-[#b9cacb]/60 line-through font-mono">
                          ₹{product.originalPrice.toLocaleString('en-IN')}
                        </span>
                      )}
                    </div>
                    {/* Compare Checkbox Trigger */}
                    <button
                      onClick={() => handleToggleCompare(product)}
                      className={`text-[11px] font-bold uppercase tracking-wider px-2 py-1 rounded transition-colors cursor-pointer ${
                        compareList.some((p) => p.id === product.id)
                          ? 'bg-[#00f2ff]/20 text-[#00f2ff]'
                          : 'text-[#b9cacb] hover:text-[#00dbe7]'
                      }`}
                    >
                      {compareList.some((p) => p.id === product.id) ? '✓ Compare' : '+ Compare'}
                    </button>
                  </div>

                  {/* Buttons Grid */}
                  <div className="grid grid-cols-2 gap-3">
                    <button
                      onClick={() => setModalProduct(product)}
                      className="bg-[#222a3d] border border-[#3a494b]/50 text-white py-2.5 rounded-lg text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-1.5 hover:bg-[#31394d] transition-colors cursor-pointer"
                    >
                      <Info className="w-4 h-4 text-[#00dbe7]" />
                      Full Specs
                    </button>
                    <button
                      onClick={() => onInquireClick(product.name, product.brand)}
                      className="bg-[#00f2ff]/10 border border-[#00dbe7]/30 text-[#00dbe7] py-2.5 rounded-lg text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-1.5 hover:bg-[#00f2ff] hover:text-[#00164e] hover:shadow-[0_0_15px_rgba(0,242,255,0.3)] transition-all cursor-pointer"
                    >
                      <MessageSquareCode className="w-4 h-4" />
                      Inquire
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* Empty Search Fallback */}
        {filteredProducts.length === 0 && (
          <div className="text-center py-20 bg-[#131b2e]/30 rounded-2xl border border-[#3a494b]/20">
            <span className="material-symbols-outlined text-center text-4xl text-[#00dbe7]/50 mb-3">pageview</span>
            <h4 className="text-white text-lg font-bold">No Match Found</h4>
            <p className="text-[#b9cacb] text-sm mt-1 max-w-sm mx-auto font-light">
              We couldn't find any devices matching "{searchQuery}". Try modifying your category, brand, or search parameters.
            </p>
          </div>
        )}

        {/* Complete Product Specs Sheet Modal */}
        <AnimatePresence>
          {modalProduct && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
              {/* Overlay shadow */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.8 }}
                exit={{ opacity: 0 }}
                onClick={() => setModalProduct(null)}
                className="absolute inset-0 bg-[#060e20]"
              ></motion.div>

              {/* Specs Box Container */}
              <motion.div
                initial={{ opacity: 0, scale: 0.95, y: 15 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 15 }}
                className="relative bg-[#131b2e] border border-[#3a494b]/60 rounded-2xl w-full max-w-2xl overflow-hidden shadow-[0_24px_50px_rgba(0,0,0,0.5)] z-10"
              >
                {/* Header title */}
                <div className="p-6 bg-[#171f33] border-b border-[#3a494b]/40 flex justify-between items-start">
                  <div>
                    <span className="text-[10px] font-bold text-[#00dbe7] uppercase tracking-widest mb-1 block">
                      {modalProduct.brand} | {modalProduct.category}
                    </span>
                    <h3 className="text-xl font-bold text-white">{modalProduct.name}</h3>
                  </div>
                  <button
                    onClick={() => setModalProduct(null)}
                    className="p-1 rounded-lg text-[#b9cacb] hover:text-white hover:bg-surface-container-high transition-colors focus:none"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                {/* Specs Content Grid */}
                <div className="p-6 max-h-[70vh] overflow-y-auto space-y-6">
                  {/* Short Description */}
                  <p className="text-sm text-[#b9cacb] font-light leading-relaxed">
                    {modalProduct.description}
                  </p>

                  {/* SPEC SHEET WRAPPERS */}
                  <div className="space-y-4 border-t border-[#3a494b]/20 pt-4 font-mono text-xs">
                    <h5 className="text-xs uppercase text-white font-bold tracking-widest mb-3">Technical Hardware Specs</h5>
                    
                    {modalProduct.specs.processor && (
                      <div className="grid grid-cols-3 py-2 border-b border-[#3a494b]/10">
                        <span className="text-[#b9cacb]/80">PROCESSOR</span>
                        <span className="col-span-2 text-white font-bold">{modalProduct.specs.processor}</span>
                      </div>
                    )}

                    {modalProduct.specs.ram && (
                      <div className="grid grid-cols-3 py-2 border-b border-[#3a494b]/10">
                        <span className="text-[#b9cacb]/80">MEMORY (RAM)</span>
                        <span className="col-span-2 text-white font-bold">{modalProduct.specs.ram}</span>
                      </div>
                    )}

                    {modalProduct.specs.storage && (
                      <div className="grid grid-cols-3 py-2 border-b border-[#3a494b]/10">
                        <span className="text-[#b9cacb]/80">STORAGE</span>
                        <span className="col-span-2 text-white font-bold">{modalProduct.specs.storage}</span>
                      </div>
                    )}

                    {modalProduct.specs.gpu && (
                      <div className="grid grid-cols-3 py-2 border-b border-[#3a494b]/10">
                        <span className="text-[#b9cacb]/80">GRAPHICS (GPU)</span>
                        <span className="col-span-2 text-white font-bold">{modalProduct.specs.gpu}</span>
                      </div>
                    )}

                    {modalProduct.specs.screen && (
                      <div className="grid grid-cols-3 py-2 border-b border-[#3a494b]/10">
                        <span className="text-[#b9cacb]/80">DISPLAY</span>
                        <span className="col-span-2 text-white font-bold">{modalProduct.specs.screen}</span>
                      </div>
                    )}

                    {modalProduct.specs.printSpeed && (
                      <div className="grid grid-cols-3 py-2 border-b border-[#3a494b]/10">
                        <span className="text-[#b9cacb]/80">PRINT SPEED</span>
                        <span className="col-span-2 text-white font-bold">{modalProduct.specs.printSpeed}</span>
                      </div>
                    )}

                    {modalProduct.specs.connectivity && (
                      <div className="grid grid-cols-3 py-2 border-b border-[#3a494b]/10">
                        <span className="text-[#b9cacb]/80">CONNECTIVITY</span>
                        <span className="col-span-2 text-white font-bold">{modalProduct.specs.connectivity}</span>
                      </div>
                    )}
                  </div>

                  {/* Highlights/Bullet Points */}
                  <div className="border-t border-[#3a494b]/20 pt-4">
                    <h5 className="text-xs uppercase text-white font-bold tracking-widest mb-3">Key Factory Highlights</h5>
                    <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-[#b9cacb]">
                      {modalProduct.specs.features.map((feat, i) => (
                        <li key={i} className="flex items-center gap-2">
                          <span className="w-1.5 h-1.5 rounded-full bg-[#00dbe7]" />
                          <span>{feat}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Footer action trigger */}
                <div className="p-6 bg-[#171f33] border-t border-[#3a494b]/40 flex justify-between items-center">
                  <div className="text-xl font-black text-white font-mono">
                    ₹{modalProduct.price.toLocaleString('en-IN')}
                  </div>
                  <div className="flex gap-3">
                    <button
                      onClick={() => setModalProduct(null)}
                      className="px-5 py-2.5 rounded-lg text-xs font-bold uppercase tracking-wider text-[#b9cacb] hover:text-white"
                    >
                      Close
                    </button>
                    <button
                      onClick={() => {
                        onInquireClick(modalProduct.name, modalProduct.brand);
                        setModalProduct(null);
                      }}
                      className="px-6 py-2.5 rounded-lg text-xs font-bold uppercase bg-[#00f2ff] text-[#00164e] tracking-wider hover:bg-white transition-colors"
                    >
                      Inquire Stock
                    </button>
                  </div>
                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>

        {/* Comparative Slider Console Drawer (Slide-up persistent panel) */}
        <AnimatePresence>
          {compareList.length > 0 && isCompareOpen && (
            <motion.div
              initial={{ y: 200 }}
              animate={{ y: 0 }}
              exit={{ y: 200 }}
              id="compare-drawer"
              className="fixed bottom-0 left-0 w-full bg-[#131b2e]/95 backdrop-blur-2xl border-t border-[#00dbe7]/40 shadow-[0_-10px_40px_rgba(0,0,0,0.5)] z-40 py-6"
            >
              <div className="max-w-[1440px] mx-auto px-6 h-full flex flex-col gap-4">
                {/* Header */}
                <div className="flex justify-between items-center border-b border-[#3a494b]/20 pb-4">
                  <h4 className="text-white text-base font-bold flex items-center gap-2">
                    <SlidersHorizontal className="w-5 h-5 text-[#00dbe7]" />
                    Product Comparison Console ({compareList.length} of 3)
                  </h4>
                  <div className="flex gap-4">
                    <button
                      onClick={() => setCompareList([])}
                      className="text-xs text-red-400 hover:text-red-500 uppercase tracking-widest font-bold font-mono"
                    >
                      Clear All Comparison
                    </button>
                    <button
                      onClick={() => setIsCompareOpen(false)}
                      className="text-xs text-[#b9cacb] hover:text-white"
                    >
                      ✕ Hide
                    </button>
                  </div>
                </div>

                {/* Compare items deck */}
                <div className="flex flex-row md:grid md:grid-cols-3 gap-4 md:gap-6 pt-2 overflow-x-auto no-scrollbar">
                  {compareList.map((prod) => (
                    <div
                      key={prod.id}
                      className="relative p-4 rounded-xl bg-[#171f33]/60 border border-[#3a494b]/50 group flex items-start gap-4 shrink-0 w-[280px] md:w-auto"
                    >
                      {/* Thumbnail photo */}
                      <div className="w-16 h-12 rounded-lg overflow-hidden bg-black shrink-0">
                        <img referrerPolicy="no-referrer" src={prod.image} alt={prod.name} className="w-full h-full object-cover" />
                      </div>
                      
                      {/* Name / Price / Quick Info list */}
                      <div className="flex-1 min-w-0">
                        <h5 className="text-white text-sm font-bold truncate">{prod.name}</h5>
                        <p className="text-[#b9cacb]/80 text-xs font-bold font-mono">₹{prod.price.toLocaleString('en-IN')}</p>
                        {/* Quick Spec Bullet list */}
                        <div className="text-[10px] text-[#b9cacb]/60 mt-1.5 truncate">
                          {prod.specs.processor || 'Fast Print Setup Office Multi-tool'}
                        </div>
                      </div>

                      {/* Remove Button */}
                      <button
                        onClick={() => handleToggleCompare(prod)}
                        className="p-1 rounded-full text-red-400 hover:bg-black/30 transition-colors"
                        title="Remove"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  ))}

                  {/* Empty Spots placeholders */}
                  {Array.from({ length: 3 - compareList.length }).map((_, i) => (
                    <div
                      key={i}
                      className="hidden md:flex p-4 rounded-xl border border-dashed border-[#3a494b]/30 items-center justify-center text-xs text-[#b9cacb]/40"
                    >
                      + Add product from catalog above to compare
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
