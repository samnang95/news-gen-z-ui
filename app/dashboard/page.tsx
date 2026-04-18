"use client";
import { useEffect, useState } from "react";
import { getCategories, getNews, getAllUsers, createNews, deleteNews } from "@/services/api";
import Link from "next/link";

export default function Dashboard() {
  const [token, setToken] = useState("");
  const [news, setNews] = useState<any[]>([]);
  const [categories, setCategories] = useState<any[]>([]);
  const [users, setUsers] = useState<any[]>([]);
  
  // Navigation State
  const [activeTab, setActiveTab] = useState("Dashboard");

  // Modal states for POST operation
  const [showModal, setShowModal] = useState(false);
  const [newsTitle, setNewsTitle] = useState("");
  const [newsContent, setNewsContent] = useState("");
  const [newsCategory, setNewsCategory] = useState("");

  useEffect(() => {
    const t = localStorage.getItem("token");
    if (!t) window.location.href = "/login";
    else {
      setToken(t);
      fetchData(t);
    }
  }, []);

  const fetchData = async (t: string) => {
    const n = await getNews(t);
    const c = await getCategories(t);
    const u = await getAllUsers(t);
    setNews(n || []);
    setCategories(c || []);
    setUsers(u || []);
    if (c && c.length > 0 && !newsCategory) setNewsCategory(c[0]._id);
  };

  const handlePostArticle = async (e: React.FormEvent) => {
    e.preventDefault();
    await createNews(token, { title: newsTitle, content: newsContent, category: newsCategory, author: 'Admin' });
    setNewsTitle("");
    setNewsContent("");
    setShowModal(false);
    fetchData(token);
  };

  const handleDelete = async (id: string) => {
    await deleteNews(token, id);
    fetchData(token);
  };

  if (!token) return null;

  return (
    <div className="flex h-screen bg-[#f4f5f7] text-zinc-800 font-sans overflow-hidden">
      {/* SIDEBAR */}
      <aside className="w-64 bg-white border-r border-zinc-200 flex flex-col z-20 shadow-[2px_0_10px_rgba(0,0,0,0.02)]">
        <div className="h-16 flex items-center justify-center border-b border-zinc-200 bg-white">
          <Link href="/" className="text-xl font-black text-blue-600 tracking-tight">Dashboard Admin</Link>
        </div>
        <div className="p-6 flex flex-col items-center border-b border-zinc-100">
          <div className="w-14 h-14 rounded-full bg-slate-200 overflow-hidden relative mb-3 ring-2 ring-white shadow-xs">
             <div className="w-full h-full bg-blue-100 flex items-center justify-center font-bold text-blue-600">AD</div>
             <div className="absolute bottom-0 right-0 w-3 h-3 bg-[#2ecc71] border-2 border-white rounded-full"></div>
          </div>
          <span className="font-semibold text-sm text-zinc-500">Site Administrator</span>
        </div>
        
        <nav className="flex-1 overflow-y-auto py-4">
          <ul className="space-y-1">
            {[
              { id: 'Dashboard', label: 'Dashboard', icon: <svg className="w-5 h-5 mr-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"></path></svg> },
              { id: 'Articles', label: 'Manage Articles', icon: <svg className="w-5 h-5 mr-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2h10a2 2 0 012 2v2"></path></svg> },
              { id: 'Categories', label: 'Manage Categories', icon: <svg className="w-5 h-5 mr-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2z"></path></svg> },
              { id: 'Users', label: 'System Users', icon: <svg className="w-5 h-5 mr-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"></path></svg> },
            ].map(tab => (
              <li key={tab.id} onClick={() => setActiveTab(tab.id)} className={`px-6 py-3 cursor-pointer flex items-center transition-all ${activeTab === tab.id ? 'text-blue-600 bg-blue-50/50 border-l-4 border-blue-600 font-semibold' : 'text-zinc-400 hover:text-zinc-600 border-l-4 border-transparent'}`}>
                {tab.icon}
                <span className="text-sm">{tab.label}</span>
              </li>
            ))}
          </ul>
        </nav>
      </aside>

      {/* MAIN CONTENT */}
      <main className="flex-1 flex flex-col relative h-screen overflow-y-auto">
        {/* TOPBAR */}
        <header className="h-16 bg-white border-b border-zinc-200 flex items-center justify-between px-8 sticky top-0 z-10 w-full">
           <div className="flex items-center text-zinc-400 max-w-md w-full">
             <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
             <input type="text" placeholder="Search Project" className="w-full bg-transparent border-none focus:outline-none text-sm text-zinc-700 placeholder-zinc-300" />
           </div>
           <div className="flex items-center gap-6">
             <div className="flex items-center gap-4 text-zinc-400">
               <svg className="w-5 h-5 cursor-pointer hover:text-zinc-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"></path></svg>
               <svg className="w-5 h-5 cursor-pointer hover:text-zinc-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"></path></svg>
               <svg className="w-6 h-6 cursor-pointer hover:text-zinc-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path></svg>
             </div>
           </div>
        </header>

        {/* DASHBOARD CONTENT */}
        <div className="p-8 max-w-6xl w-full mx-auto">
          <h1 className="text-xl font-bold text-zinc-700 mb-6">Dashboard</h1>

          {/* METRIC CARDS */}
          {activeTab === 'Dashboard' && (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
               {/* Card 1: Purple Gradient */}
               <div className="rounded-2xl p-6 text-white relative overflow-hidden bg-linear-to-br from-[#ae5bf0] to-[#c78afa] shadow-[0_15px_30px_-5px_rgba(174,91,240,0.3)]">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-white/20 rounded-full -translate-y-12 translate-x-12 blur-2xl"></div>
                  <div className="absolute bottom-0 right-10 w-24 h-24 bg-white/20 rounded-full translate-y-8 blur-xl"></div>
                  <div className="mb-4 text-white/80"><svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20"><path d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4z"></path></svg></div>
                  <p className="text-sm font-medium mb-1 drop-shadow-sm">Total Articles</p>
                  <p className="text-3xl font-extrabold mb-4">{news.length}</p>
                  <p className="text-xs text-white/80">Increased by 12%</p>
               </div>

               {/* Card 2: Blue Gradient */}
               <div className="rounded-2xl p-6 text-white relative overflow-hidden bg-linear-to-br from-[#3b82f6] to-[#60a5fa] shadow-[0_15px_30px_-5px_rgba(59,130,246,0.3)]">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-white/20 rounded-full -translate-y-12 translate-x-12 blur-2xl"></div>
                  <div className="absolute bottom-0 right-10 w-24 h-24 bg-white/20 rounded-full translate-y-8 blur-xl"></div>
                  <div className="mb-4 text-white/80"><svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20"><path d="M5 3a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2V5a2 2 0 00-2-2H5zM5 11a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2v-2a2 2 0 00-2-2H5zM11 5a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V5zM11 13a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"></path></svg></div>
                  <p className="text-sm font-medium mb-1 drop-shadow-sm">Categories</p>
                  <p className="text-3xl font-extrabold mb-4">{categories.length}</p>
                  <p className="text-xs text-white/80">Increased by 8%</p>
               </div>

               {/* Card 3: Orange Gradient */}
               <div className="rounded-2xl p-6 text-white relative overflow-hidden bg-linear-to-br from-[#fc8879] to-[#fb9a8d] shadow-[0_15px_30px_-5px_rgba(252,136,121,0.3)]">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-white/20 rounded-full -translate-y-12 translate-x-12 blur-2xl"></div>
                  <div className="absolute bottom-0 right-10 w-24 h-24 bg-white/20 rounded-full translate-y-8 blur-xl"></div>
                  <div className="mb-4 text-white/80"><svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd"></path></svg></div>
                  <p className="text-sm font-medium mb-1 drop-shadow-sm">Unique Users</p>
                  <p className="text-3xl font-extrabold mb-4">{users.length}</p>
                  <p className="text-xs text-white/80">Increased by 30%</p>
               </div>
            </div>
          )}

          {/* CREATE MODAL */}
          {showModal && (
             <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center">
                <form onSubmit={handlePostArticle} className="bg-white p-8 rounded-2xl w-full max-w-lg shadow-2xl relative">
                   <button type="button" onClick={() => setShowModal(false)} className="absolute top-4 right-4 text-zinc-400 hover:text-zinc-600">
                     <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
                   </button>
                   <h2 className="text-2xl font-bold mb-6 text-zinc-800">Post New Content</h2>
                   <div className="mb-4">
                     <label className="text-xs font-bold text-zinc-500 uppercase">Title</label>
                     <input type="text" required value={newsTitle} onChange={e => setNewsTitle(e.target.value)} className="w-full border-b border-zinc-200 py-2 focus:border-blue-500 focus:outline-none text-zinc-800" />
                   </div>
                   <div className="mb-4">
                     <label className="text-xs font-bold text-zinc-500 uppercase">Category</label>
                     <select value={newsCategory} onChange={e => setNewsCategory(e.target.value)} className="w-full border-b border-zinc-200 py-2 focus:border-blue-500 focus:outline-none text-zinc-800 bg-white">
                        <option value="" disabled>Select Category</option>
                        {categories.map(c => <option key={c._id} value={c._id}>{c.name}</option>)}
                     </select>
                   </div>
                   <div className="mb-8">
                     <label className="text-xs font-bold text-zinc-500 uppercase">Content</label>
                     <textarea required value={newsContent} onChange={e => setNewsContent(e.target.value)} rows={3} className="w-full border-b border-zinc-200 py-2 focus:border-blue-500 focus:outline-none text-zinc-800" />
                   </div>
                   <button type="submit" className="w-full bg-blue-600 text-white font-bold py-3 rounded-lg shadow-[0_10px_20px_-10px_rgba(37,99,235,0.5)] hover:bg-blue-700 transition-colors">Publish Article</button>
                </form>
             </div>
          )}

          {activeTab === 'Articles' && (
            <div className="bg-white rounded-1.5rem shadow-sm border border-zinc-100 overflow-hidden mt-8">
               <div className="p-6 border-b border-zinc-100 flex justify-between items-center bg-white">
                 <h2 className="text-lg font-bold text-zinc-700">Articles Data Table</h2>
                 <button onClick={() => setShowModal(true)} className="bg-blue-600 hover:bg-blue-700 text-white text-sm font-bold px-5 py-2.5 rounded-xl shadow-[0_5px_15px_-5px_rgba(37,99,235,0.4)] transition-colors flex items-center">
                    <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4"></path></svg>
                    New Article
                 </button>
               </div>
               <div className="w-full overflow-x-auto">
                  <table className="w-full text-left text-sm text-zinc-600">
                    <thead className="text-xs text-zinc-400 font-bold uppercase border-b border-zinc-100/50 bg-[#fafafa]">
                      <tr>
                        <th className="px-6 py-4 font-semibold tracking-wide">Title / Name</th>
                        <th className="px-6 py-4 font-semibold tracking-wide">Author / Group</th>
                        <th className="px-6 py-4 font-semibold tracking-wide">Usertype / Category</th>
                        <th className="px-6 py-4 font-semibold tracking-wide">Date Setup</th>
                        <th className="px-6 py-4 font-semibold tracking-wide text-center">Status</th>
                        <th className="px-6 py-4 font-semibold tracking-wide text-center text-red-400">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {/* Render News Items */}
                      {news.map((item: any) => (
                         <tr key={item._id} className="border-b border-zinc-50 hover:bg-zinc-50/50 transition-colors">
                            <td className="px-6 py-5 font-medium text-zinc-700">
                              <div className="max-w-[200px] truncate">{item.title}</div>
                            </td>
                            <td className="px-6 py-5">{item.author || "obediampong@gmail.com"}</td>
                            <td className="px-6 py-5 text-zinc-500">{item.category?.name || "News"}</td>
                            <td className="px-6 py-5">{new Date(item.createdAt).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })}</td>
                            <td className="px-6 py-5 text-center">
                               <span className="bg-[#2ecc71] text-white text-xs font-extrabold px-4 py-1.5 rounded-full inline-block">Active</span>
                            </td>
                            <td className="px-6 py-5 text-center">
                               <button onClick={() => handleDelete(item._id)} className="text-red-400 hover:text-red-600 hover:bg-red-50 p-2 rounded-full transition-colors inline-block" title="Delete">
                                 <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path></svg>
                               </button>
                            </td>
                         </tr>
                      ))}
                      {news.length === 0 && (
                         <tr><td colSpan={6} className="px-6 py-12 text-center text-zinc-400">No content available to display in table.</td></tr>
                      )}
                    </tbody>
                  </table>
               </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
