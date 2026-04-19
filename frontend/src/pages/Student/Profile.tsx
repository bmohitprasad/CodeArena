import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Appbar } from "../../components/Appbar";
import { Sidebar } from "../../components/Sidebar";
import { ChevronLeft } from "lucide-react";
import axios from "axios";
import { BACKEND_URL } from "../../config";
import { useTheme } from "../../context/ThemeContext";

export default function ProfilePage() {
  const navigate = useNavigate();
  const { darkMode } = useTheme();
  const [profile, setProfile] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [editMode, setEditMode] = useState(false);
  const [formData, setFormData] = useState<any>({});
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);
  const [submitting, setSubmitting] = useState(false);

  const token = localStorage.getItem("jwt");

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await axios.get(`${BACKEND_URL}/api/v1/student/profile`, {
          headers: { Authorization: token }
        });
        setProfile(res.data.student);
        setFormData(res.data.student);
      } catch (e) {
        setMessage({ type: "error", text: "Failed to load profile" });
      } finally {
        setLoading(false);
      }
    };
    fetchProfile();
  }, [token]);

  const handleSave = async () => {
    setSubmitting(true);
    try {
      const res = await axios.post(`${BACKEND_URL}/api/v1/student/profile/update`, {
        roll_num: profile.roll_num,
        name: formData.name,
        branch: formData.branch,
        password: formData.password || undefined
      }, { headers: { Authorization: token } });

      setProfile(res.data.student);
      setEditMode(false);
      setMessage({ type: "success", text: "Profile updated!" });
    } catch (e: any) {
      setMessage({ type: "error", text: e.response?.data?.error || "Update failed" });
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) return <div className="p-10 text-center animate-pulse">Syncing...</div>;

  return (
    <div className={`min-h-screen ${darkMode ? "bg-[#1E293B]" : "bg-[#F8FAFC]"}`}>
      <Appbar />
      <div className="flex flex-1">
        <Sidebar user="student" />
        <main className="flex-1 p-8">
          <button onClick={() => navigate(-1)} className="flex items-center gap-2 text-blue-500 mb-6 font-bold hover:underline">
            <ChevronLeft size={18} /> Back
          </button>
          
          <div className={`${darkMode ? "bg-[#0F172A] border-slate-800" : "bg-white border-slate-200"} border rounded-2xl p-8 max-w-2xl shadow-xl transition-all`}>
            <h1 className={`text-2xl font-black mb-6 ${darkMode ? "text-white" : "text-slate-800"}`}>Account Settings</h1>
            
            {message && <div className={`p-4 mb-6 rounded-lg text-sm font-bold border ${message.type === 'success' ? 'bg-green-500/10 text-green-500 border-green-500/20' : 'bg-red-500/10 text-red-500 border-red-500/20'}`}>{message.text}</div>}

            <div className="space-y-6">
              <div className="flex items-center gap-4 mb-8">
                <div className="w-16 h-16 rounded-2xl bg-blue-600 flex items-center justify-center text-white text-2xl font-black">{profile?.name?.charAt(0)}</div>
                <div>
                    <h2 className={`font-bold ${darkMode ? 'text-white' : 'text-slate-800'}`}>{profile?.name}</h2>
                    <p className="text-xs text-slate-500">Roll Number: {profile?.roll_num}</p>
                </div>
              </div>

              <div className="grid gap-4">
                <label htmlFor="full-name" className="text-[10px] font-black uppercase tracking-widest text-slate-500">Full Name</label>
                <input
                  id="full-name"
                  title="Full Name"
                  placeholder="Enter your full name"
                  className={`p-3 rounded-xl border ${darkMode ? 'bg-slate-900 border-slate-700 text-white' : 'bg-slate-50 border-slate-200'}`}
                  value={formData.name || ""} 
                  onChange={e => setFormData({...formData, name: e.target.value})} 
                  disabled={!editMode} 
                />
              </div>

              <div className="grid gap-4">
                <label htmlFor="branch" className="text-[10px] font-black uppercase tracking-widest text-slate-500">Branch</label>
                <input
                  id="branch"
                  title="Branch"
                  placeholder="Enter your branch"
                  className={`p-3 rounded-xl border ${darkMode ? 'bg-slate-900 border-slate-700 text-white' : 'bg-slate-50 border-slate-200'}`}
                  value={formData.branch || ""} 
                  onChange={e => setFormData({...formData, branch: e.target.value})} 
                  disabled={!editMode} 
                />
              </div>

              <div className="flex gap-4 pt-4">
                {!editMode ? (
                  <button onClick={() => setEditMode(true)} className="px-8 py-3 bg-blue-600 text-white rounded-xl font-bold">Edit Profile</button>
                ) : (
                  <>
                    <button onClick={handleSave} disabled={submitting} className="px-8 py-3 bg-blue-600 text-white rounded-xl font-bold flex-1">{submitting ? "Saving..." : "Save"}</button>
                    <button onClick={() => setEditMode(false)} className={`px-8 py-3 rounded-xl font-bold border ${darkMode ? 'text-white border-slate-700' : 'text-slate-700 border-slate-200'}`}>Cancel</button>
                  </>
                )}
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}