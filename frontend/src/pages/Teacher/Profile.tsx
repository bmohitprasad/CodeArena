import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Appbar } from "../../components/Appbar";
import { Sidebar } from "../../components/Sidebar";
import { ChevronLeft, CheckCircle } from "lucide-react";
import axios from "axios";
import { BACKEND_URL } from "../../config";
import { useTheme } from "../../context/ThemeContext";

export default function TeacherProfilePage() {
  const navigate = useNavigate();
  const { darkMode } = useTheme();
  
  const [profile, setProfile] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [editMode, setEditMode] = useState(false);
  const [formData, setFormData] = useState<any>({});
  // const [showPassword, setShowPassword] = useState(false);
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);
  const [submitting, setSubmitting] = useState(false);

  const pageBg = darkMode ? "bg-[#1E293B]" : "bg-[#F8FAFC]";
  const cardBg = darkMode ? "bg-[#0F172A] border-slate-800" : "bg-white border-[#E2E8F0]";
  const headingColor = darkMode ? "text-white" : "text-[#0F172A]";
  const inputStyle = darkMode ? "bg-slate-900 border-slate-700 text-white focus:border-indigo-500" : "bg-white border-slate-200";

  useEffect(() => {
    loadProfile();
  }, []);

  const loadProfile = async () => {
    try {
      const token = localStorage.getItem("jwt");
      if (!token) {
        setMessage({ type: "error", text: "Not authenticated. Please login." });
        setLoading(false);
        return;
      }

      const response = await axios.get(`${BACKEND_URL}/api/v1/admin/profile`, {
        headers: { Authorization: token }
      });
      
      if (response.data && response.data.teacher) {
        const data = response.data.teacher;
        setProfile(data);
        setFormData(data);
      } else {
        setMessage({ type: "error", text: "No profile data received" });
      }
    } catch (error: any) {
      console.error("Profile fetch error:", error);
      setMessage({ type: "error", text: error.response?.data?.error || "Failed to fetch instructor data" });
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    setSubmitting(true);
    try {
      const token = localStorage.getItem("jwt");
      const teacherId = profile?.id;

      if (!token || !teacherId) {
        setMessage({ type: "error", text: "Missing authentication or profile data" });
        return;
      }

      const response = await axios.post(
        `${BACKEND_URL}/api/v1/admin/profile/update`,
        {
          id: Number(teacherId),
          name: formData.name,
          dept: formData.dept,
          email: formData.email,
          password: formData.password || undefined
        },
        { headers: { Authorization: token } }
      );

      if (response.data && response.data.teacher) {
        setProfile(response.data.teacher);
        setFormData(response.data.teacher);
        setEditMode(false);
        setMessage({ type: "success", text: "Instructor profile updated successfully!" });
        setTimeout(() => setMessage(null), 3000);
      }
    } catch (error: any) {
      console.error("Update error:", error);
      setMessage({ type: "error", text: error.response?.data?.error || error.response?.data?.message || "Update failed" });
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) return <div className={`min-h-screen ${pageBg}`}><Appbar /><div className="flex justify-center mt-20 text-indigo-500 animate-spin">●</div></div>;

  return (
    <div className={`min-h-screen flex flex-col ${pageBg} transition-all duration-300`}>
      <Appbar />
      <div className="flex flex-1">
        <Sidebar user="teacher" />
        <div className="flex-1 p-6">
          <button onClick={() => navigate("/teacher/classes")} className="flex items-center gap-2 text-indigo-500 mb-4 font-bold">
            <ChevronLeft size={16} /> Back to Classrooms
          </button>
          
          <h1 className={`text-3xl font-black mb-6 ${headingColor}`}>Instructor Settings</h1>

          {message && (
            <div className={`mb-6 p-4 rounded-xl flex items-center gap-3 ${message.type === "success" ? "bg-indigo-500/10 text-indigo-500 border border-indigo-500/20" : "bg-red-500/10 text-red-500 border border-red-500/20"}`}>
              <CheckCircle size={20} />
              <span className="text-sm font-bold">{message.text}</span>
            </div>
          )}

          <div className={`${cardBg} rounded-2xl border p-8 max-w-2xl shadow-2xl relative overflow-hidden`}>
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-indigo-500 to-blue-600"></div>
            
            <div className="flex items-center justify-between mb-8 pb-8 border-b border-inherit">
              <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white text-3xl font-black shadow-lg">
                {profile?.name?.charAt(0)}
              </div>
              {!editMode && (
                <button onClick={() => setEditMode(true)} className="px-6 py-2 bg-indigo-600 text-white rounded-xl font-bold hover:bg-indigo-700 transition shadow-lg shadow-indigo-500/20">
                  Edit Profile
                </button>
              )}
            </div>

            <div className="space-y-6">
              <div>
                <label htmlFor="full-name" className="text-[10px] font-black uppercase tracking-widest text-slate-500 block mb-2">Full Name</label>
                <input id="full-name" name="name" title="Full Name" placeholder="Enter your full name" value={formData.name || ""} onChange={(e) => setFormData({...formData, name: e.target.value})} disabled={!editMode} className={`w-full px-4 py-3 rounded-xl border outline-none ${inputStyle}`} />
              </div>

              <div>
                <label htmlFor="email" className="text-[10px] font-black uppercase tracking-widest text-slate-500 block mb-2">Email</label>
                <input id="email" name="email" type="email" title="Email" placeholder="Enter your email" value={formData.email || ""} onChange={(e) => setFormData({...formData, email: e.target.value})} disabled={!editMode} className={`w-full px-4 py-3 rounded-xl border outline-none ${inputStyle}`} />
              </div>

              <div>
                <label htmlFor="department" className="text-[10px] font-black uppercase tracking-widest text-slate-500 block mb-2">Department</label>
                <input id="department" name="dept" title="Department" placeholder="Enter your department" value={formData.dept || ""} onChange={(e) => setFormData({...formData, dept: e.target.value})} disabled={!editMode} className={`w-full px-4 py-3 rounded-xl border outline-none ${inputStyle}`} />
              </div>

              {editMode && (
                <div>
                  <label htmlFor="password" className="text-[10px] font-black uppercase tracking-widest text-slate-500 block mb-2">New Password (Optional)</label>
                  <input id="password" name="password" type="password" title="Password" placeholder="Leave blank to keep current password" value={formData.password || ""} onChange={(e) => setFormData({...formData, password: e.target.value})} className={`w-full px-4 py-3 rounded-xl border outline-none ${inputStyle}`} />
                </div>
              )}

              <div className="flex gap-4 pt-4">
                {!editMode ? (
                  <button onClick={() => setEditMode(true)} className="px-8 py-3 bg-indigo-600 text-white rounded-xl font-bold hover:bg-indigo-700 transition">Edit Profile</button>
                ) : (
                  <>
                    <button onClick={handleSave} disabled={submitting} className="px-8 py-3 bg-indigo-600 text-white rounded-xl font-bold hover:bg-indigo-700 transition flex-1">{submitting ? "Saving..." : "Save"}</button>
                    <button onClick={() => { setEditMode(false); setFormData(profile); }} className={`px-8 py-3 rounded-xl font-bold border ${darkMode ? 'text-white border-slate-700' : 'text-slate-700 border-slate-200'}`}>Cancel</button>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}