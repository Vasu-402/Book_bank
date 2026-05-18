import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import { Upload, Image as ImageIcon, Tag, BookOpen } from 'lucide-react';
import api from '../api/axios';
import useAuthStore from '../store/useAuthStore';

export default function SellBook() {
  const navigate = useNavigate();
  const { token } = useAuthStore();
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    author: '',
    isbn: '',
    description: '',
    categoryId: '',
    condition: 'GOOD',
    sellingPrice: '',
    originalPrice: '',
    imageUrl: '',
    type: 'SECOND_HAND',
  });

  useEffect(() => {
    if (!token) {
      navigate('/login');
      return;
    }

    const fetchCategories = async () => {
      try {
        const res = await api.get('/categories');
        setCategories(res.data);
      } catch (error) {
        toast.error('Failed to load categories');
      }
    };

    fetchCategories();
  }, [navigate, token]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((current) => ({ ...current, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);

    try {
      await api.post('/books', {
        ...formData,
        categoryId: Number(formData.categoryId),
        sellingPrice: Number(formData.sellingPrice),
        originalPrice: formData.originalPrice ? Number(formData.originalPrice) : null,
      });
      toast.success('Book listed successfully!');
      navigate('/dashboard');
    } catch (error) {
      toast.error('Failed to list book');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10 text-slate-900">
      <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-primary-700">Sell your book</p>
          <h1 className="text-3xl md:text-4xl font-extrabold mt-2">Upload a book for sale</h1>
          <p className="text-slate-600 mt-2 max-w-2xl">
            List a used book in a few minutes. Add the details, price, and cover image so buyers can discover it easily.
          </p>
        </div>
        <Link to="/dashboard" className="inline-flex items-center justify-center rounded-xl border border-slate-200 bg-white px-4 py-2 font-medium text-slate-700 hover:bg-slate-50">
          Go to dashboard
        </Link>
      </div>

      <div className="bg-white/95 rounded-2xl shadow-sm ring-1 ring-slate-200 overflow-hidden">
        <div className="grid grid-cols-1 lg:grid-cols-[1.15fr_0.85fr]">
          <form onSubmit={handleSubmit} className="p-6 sm:p-8 space-y-5">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="md:col-span-2">
                <label className="block text-sm font-semibold text-slate-700 mb-2">Title</label>
                <input name="title" required value={formData.title} onChange={handleChange} placeholder="Book title" className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-primary-500" />
              </div>
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">Author</label>
                <input name="author" required value={formData.author} onChange={handleChange} placeholder="Author name" className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-primary-500" />
              </div>
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">ISBN</label>
                <input name="isbn" value={formData.isbn} onChange={handleChange} placeholder="Optional ISBN" className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-primary-500" />
              </div>
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">Category</label>
                <select name="categoryId" required value={formData.categoryId} onChange={handleChange} className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-slate-900 focus:outline-none focus:ring-2 focus:ring-primary-500">
                  <option value="">Select category</option>
                  {categories.map((category) => (
                    <option key={category.id} value={category.id}>{category.name}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">Condition</label>
                <select name="condition" value={formData.condition} onChange={handleChange} className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-slate-900 focus:outline-none focus:ring-2 focus:ring-primary-500">
                  <option value="LIKE_NEW">Like New</option>
                  <option value="GOOD">Good</option>
                  <option value="FAIR">Fair</option>
                  <option value="POOR">Poor</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">Original Price</label>
                <input name="originalPrice" type="number" min="0" step="0.01" value={formData.originalPrice} onChange={handleChange} placeholder="Optional" className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-primary-500" />
              </div>
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">Selling Price</label>
                <input name="sellingPrice" type="number" min="0" step="0.01" required value={formData.sellingPrice} onChange={handleChange} placeholder="Your price" className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-primary-500" />
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm font-semibold text-slate-700 mb-2">Image URL</label>
                <input name="imageUrl" value={formData.imageUrl} onChange={handleChange} placeholder="Optional cover image link" className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-primary-500" />
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm font-semibold text-slate-700 mb-2">Description</label>
                <textarea name="description" required rows="6" value={formData.description} onChange={handleChange} placeholder="Describe the book condition, edition, marks, or anything a buyer should know" className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-primary-500" />
              </div>
            </div>

            <button type="submit" disabled={loading} className="inline-flex items-center justify-center gap-2 rounded-xl bg-primary-600 px-5 py-3 font-bold text-white hover:bg-primary-700 disabled:opacity-60">
              <Upload className="w-5 h-5" /> {loading ? 'Publishing...' : 'Publish listing'}
            </button>
          </form>

          <aside className="border-t lg:border-t-0 lg:border-l border-slate-200 bg-slate-50 p-6 sm:p-8">
            <h2 className="text-xl font-bold text-slate-900">What to add</h2>
            <ul className="mt-5 space-y-4 text-slate-600">
              <li className="flex gap-3"><BookOpen className="mt-0.5 h-5 w-5 text-primary-600" /> Use a clear title and author so buyers can find it quickly.</li>
              <li className="flex gap-3"><Tag className="mt-0.5 h-5 w-5 text-primary-600" /> Set a realistic selling price and include the original price if you know it.</li>
              <li className="flex gap-3"><ImageIcon className="mt-0.5 h-5 w-5 text-primary-600" /> Add an image URL if you have a cover photo to improve clicks.</li>
            </ul>
          </aside>
        </div>
      </div>
    </div>
  );
}