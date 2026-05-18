import React from 'react';
import { Link } from 'react-router-dom';
import { Search, Book, Recycle, Upload } from 'lucide-react';

export default function Home() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-slate-950 text-white py-20">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(59,130,246,0.28),_transparent_42%)]" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="relative text-4xl md:text-6xl font-extrabold tracking-tight mb-4">
            Buy, Sell & Exchange Books
          </h1>
          <p className="relative text-xl md:text-2xl text-slate-200 mb-8 max-w-2xl mx-auto">
            Your one-stop platform for new and second-hand books. Discover great reads, clear your shelves, and connect with fellow readers.
          </p>
          <div className="relative max-w-xl mx-auto bg-white/95 rounded-full p-2 flex shadow-2xl ring-1 ring-black/5 backdrop-blur">
            <input 
              type="text" 
              placeholder="Search by title, author, or ISBN..." 
              className="flex-1 px-6 py-2 rounded-full focus:outline-none text-slate-900 placeholder:text-slate-400"
            />
            <button className="bg-primary-600 text-white px-6 py-2 rounded-full hover:bg-primary-700 transition flex items-center gap-2">
              <Search className="w-5 h-5" /> Search
            </button>
          </div>
          <div className="relative mt-6 flex justify-center">
            <Link to="/sell" className="inline-flex items-center gap-2 rounded-full border border-white/30 bg-white/10 px-5 py-2.5 font-semibold text-white backdrop-blur hover:bg-white/20 transition">
              <Upload className="w-4 h-4" /> Sell your book
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white/90 p-8 rounded-2xl shadow-sm ring-1 ring-slate-200 text-center hover:shadow-md transition">
            <div className="w-16 h-16 bg-blue-50 text-blue-700 rounded-full flex items-center justify-center mx-auto mb-4">
              <Book className="w-8 h-8" />
            </div>
            <h3 className="text-xl font-bold mb-2 text-slate-900">Buy New Books</h3>
            <p className="text-slate-600">Discover the latest bestsellers and classics fresh off the press.</p>
          </div>
          <div className="bg-white/90 p-8 rounded-2xl shadow-sm ring-1 ring-slate-200 text-center hover:shadow-md transition">
            <div className="w-16 h-16 bg-emerald-50 text-emerald-700 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl font-bold">$</span>
            </div>
            <h3 className="text-xl font-bold mb-2 text-slate-900">Buy & Sell Used</h3>
            <p className="text-slate-600">Find great deals on pre-loved books or sell yours for cash.</p>
          </div>
          <div className="bg-white/90 p-8 rounded-2xl shadow-sm ring-1 ring-slate-200 text-center hover:shadow-md transition">
            <div className="w-16 h-16 bg-amber-50 text-amber-700 rounded-full flex items-center justify-center mx-auto mb-4">
              <Recycle className="w-8 h-8" />
            </div>
            <h3 className="text-xl font-bold mb-2 text-slate-900">Exchange</h3>
            <p className="text-slate-600">Trade books with other readers in your community.</p>
          </div>
        </div>
      </section>
    </div>
  );
}
