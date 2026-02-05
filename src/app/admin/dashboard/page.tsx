"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";

interface Update {
  id: string;
  title: string;
  description: string;
  image: string;
  date: string;
}

export default function AdminDashboard() {
  const [updates, setUpdates] = useState<Update[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    image: "",
    date: new Date().toISOString().split("T")[0]
  });
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    // Check authentication
    const isAuthenticated = localStorage.getItem("isAdminAuthenticated");
    if (!isAuthenticated) {
      router.push("/admin");
      return;
    }

    // Load existing updates from localStorage
    const savedUpdates = localStorage.getItem("prernaUpdates");
    if (savedUpdates) {
      setUpdates(JSON.parse(savedUpdates));
    }
    setIsLoading(false);
  }, [router]);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const result = e.target?.result as string;
        setImagePreview(result);
        setFormData({ ...formData, image: result });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.title || !formData.description || !formData.image) {
      alert("Please fill in all fields and upload an image");
      return;
    }

    const newUpdate: Update = {
      id: Date.now().toString(),
      title: formData.title,
      description: formData.description,
      image: formData.image,
      date: formData.date
    };

    const updatedUpdates = [newUpdate, ...updates].slice(0, 10); // Keep only 10 most recent
    setUpdates(updatedUpdates);
    localStorage.setItem("prernaUpdates", JSON.stringify(updatedUpdates));

    // Reset form
    setFormData({ title: "", description: "", image: "", date: new Date().toISOString().split("T")[0] });
    setImagePreview(null);
    setShowForm(false);
    alert("Update added successfully!");
  };

  const handleDelete = (id: string) => {
    if (confirm("Are you sure you want to delete this update?")) {
      const updatedUpdates = updates.filter(update => update.id !== id);
      setUpdates(updatedUpdates);
      localStorage.setItem("prernaUpdates", JSON.stringify(updatedUpdates));
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("isAdminAuthenticated");
    router.push("/admin");
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#F4F7FB] to-[#E8F2F7] flex items-center justify-center">
        <div className="text-[#1F4FD8] text-lg">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#F4F7FB] to-[#E8F2F7]">
      <div className="container mx-auto px-4 md:px-8 py-8">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold text-[#1F4FD8]">Admin Dashboard</h1>
          <button
            onClick={handleLogout}
            className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition-colors"
          >
            Logout
          </button>
        </div>

        <div className="bg-white rounded-3xl shadow-refined border border-gray-100 p-6 mb-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold text-[#1A1A1A]">Updates Management</h2>
            <button
              onClick={() => setShowForm(!showForm)}
              className="bg-gradient-to-r from-[#1F4FD8] to-[#1ECAD3] text-white px-4 py-2 rounded-lg hover:shadow-lg transition-all"
            >
              {showForm ? "Cancel" : "Add New Update"}
            </button>
          </div>

          {showForm && (
            <form onSubmit={handleSubmit} className="mb-8 p-6 bg-[#F4F7FB] rounded-2xl">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="title" className="block text-sm font-semibold text-gray-700 mb-2">
                    Title *
                  </label>
                  <input
                    type="text"
                    id="title"
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#1F4FD8] focus:border-transparent transition-all"
                    placeholder="Enter update title"
                    required
                  />
                </div>

                <div>
                  <label htmlFor="date" className="block text-sm font-semibold text-gray-700 mb-2">
                    Date *
                  </label>
                  <input
                    type="date"
                    id="date"
                    value={formData.date}
                    onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#1F4FD8] focus:border-transparent transition-all"
                    required
                  />
                </div>

                <div>
                  <label htmlFor="image" className="block text-sm font-semibold text-gray-700 mb-2">
                    Image *
                  </label>
                  <input
                    type="file"
                    id="image"
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#1F4FD8] focus:border-transparent transition-all"
                    required
                  />
                </div>

                <div className="md:col-span-2">
                  <label htmlFor="description" className="block text-sm font-semibold text-gray-700 mb-2">
                    Description *
                  </label>
                  <textarea
                    id="description"
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    rows={4}
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#1F4FD8] focus:border-transparent transition-all"
                    placeholder="Enter update description"
                    required
                  />
                </div>
              </div>

              {imagePreview && (
                <div className="mt-4">
                  <p className="text-sm font-semibold text-gray-700 mb-2">Image Preview:</p>
                  <div className="relative w-32 h-32 rounded-xl overflow-hidden border border-gray-200">
                    <Image
                      src={imagePreview}
                      alt="Preview"
                      fill
                      className="object-cover"
                    />
                  </div>
                </div>
              )}

              <button
                type="submit"
                className="mt-6 bg-gradient-to-r from-[#1F4FD8] to-[#1ECAD3] text-white px-6 py-3 rounded-xl hover:shadow-lg transition-all"
              >
                Add Update
              </button>
            </form>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {updates.map((update) => (
              <div key={update.id} className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                <div className="relative h-48 w-full">
                  <Image
                    src={update.image}
                    alt={update.title}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="p-4">
                  <h3 className="text-lg font-semibold text-[#1A1A1A] mb-2">{update.title}</h3>
                  <p className="text-sm text-gray-600 mb-3 line-clamp-3">{update.description}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-gray-500">{update.date}</span>
                    <button
                      onClick={() => handleDelete(update.id)}
                      className="text-red-500 hover:text-red-700 text-sm font-medium transition-colors"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {updates.length === 0 && (
            <div className="text-center py-12">
              <p className="text-gray-500 text-lg">No updates yet. Add your first update!</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
