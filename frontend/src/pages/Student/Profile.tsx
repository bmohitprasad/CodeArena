import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Appbar } from "../../components/Appbar";
import { Sidebar } from "../../components/Sidebar";
import { ChevronLeft, Eye, EyeOff, CheckCircle, AlertCircle } from "lucide-react";
import axios from "axios";
import { BACKEND_URL } from "../../config";

type UserType = "student" | "teacher";

interface StudentProfile {
  id: number;
  name: string;
  roll_number: string;
  branch: string;
  email?: string;
  password?: string;
}

interface TeacherProfile {
  id: number;
  name: string;
  department: string;
  email?: string;
  password?: string;
}

export default function ProfilePage() {
  const navigate = useNavigate();
  const userType: UserType = localStorage.getItem("jwt") ? "student" : localStorage.getItem("userRole") === "teacher" ? "teacher" : "student";
  
  const [profile, setProfile] = useState<StudentProfile | TeacherProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [editMode, setEditMode] = useState(false);
  const [formData, setFormData] = useState<any>({});
  const [showPassword, setShowPassword] = useState(false);
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    loadProfile();
  }, []);

  const loadProfile = async () => {
    try {
      const studentId = localStorage.getItem("studentId");
      const teacherId = localStorage.getItem("teacherId");

      if (userType === "student" && studentId) {
        // Mock data for now - can be replaced with actual API call later
        const mockProfile: StudentProfile = {
          id: parseInt(studentId),
          name: "John Doe",
          roll_number: studentId,
          branch: "Computer Science",
          email: "john@example.com",
        };
        setProfile(mockProfile);
        setFormData(mockProfile);
      } else if (userType === "teacher" && teacherId) {
        // Mock data for now - can be replaced with actual API call later
        const mockProfile: TeacherProfile = {
          id: parseInt(teacherId),
          name: "Dr. Jane Smith",
          department: "Computer Science",
          email: "jane@example.com",
        };
        setProfile(mockProfile);
        setFormData(mockProfile);
      }
    } catch (error) {
      setMessage({ type: "error", text: "Failed to load profile" });
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev: any) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSave = async () => {
    setSubmitting(true);
    try {
      const token = localStorage.getItem("jwt") || localStorage.getItem("authToken");
      
      if (userType === "student") {
        const studentId = localStorage.getItem("studentId");
        const response = await axios.post(
          `${BACKEND_URL}/api/v1/student/profile/update`,
          {
            roll_num: parseInt(studentId || "0"),
            name: formData.name,
            branch: formData.branch,
            password: formData.password || undefined
          },
          {
            headers: { Authorization: `Bearer ${token}` }
          }
        );
        setProfile(response.data.student);
        setFormData(response.data.student);
        setMessage({ type: "success", text: "Profile updated successfully!" });
      } else {
        const teacherId = localStorage.getItem("teacherId");
        const response = await axios.post(
          `${BACKEND_URL}/api/v1/admin/profile/update`,
          {
            id: parseInt(teacherId || "0"),
            name: formData.name,
            dept: formData.department,
            password: formData.password || undefined
          },
          {
            headers: { Authorization: `Bearer ${token}` }
          }
        );
        setProfile(response.data.teacher);
        setFormData(response.data.teacher);
        setMessage({ type: "success", text: "Profile updated successfully!" });
      }

      setEditMode(false);
      setTimeout(() => setMessage(null), 3000);
    } catch (error: any) {
      console.error('Profile update error:', error);
      setMessage({ 
        type: "error", 
        text: error.response?.data?.error || error.response?.data?.message || "Failed to update profile" 
      });
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-[#F8FAFC] to-[#E2E8F0] dark:from-[#0f1419] dark:to-[#1a1a2e]">
        <Appbar />
        <div className="flex flex-1">
          <Sidebar user={userType} />
          <div className="flex-1 p-6 flex items-center justify-center">
            <div className="text-center">
              <div className="inline-block animate-spin h-8 w-8 text-[#2563EB] mb-4">
                <div className="h-8 w-8 border-4 border-[#2563EB] border-t-transparent rounded-full"></div>
              </div>
              <p className="text-[#64748B] dark:text-[#98A2B3]">Loading profile...</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#F8FAFC] to-[#E2E8F0] dark:from-[#0f1419] dark:to-[#1a1a2e] transition-colors duration-300">
      <Appbar />
      <div className="flex flex-1">
        <Sidebar user={userType} />
        <div className="flex-1 p-6">
          {/* Header */}
          <div className="mb-6">
            <button
              onClick={() => navigate(`/${userType}/classes`)}
              className="flex items-center gap-2 text-[#2563EB] hover:text-[#1E4FCC] mb-4 transition"
            >
              <ChevronLeft className="h-4 w-4" />
              Back
            </button>
            <h1 className="text-3xl font-bold text-[#0F172A] dark:text-white">Profile</h1>
            <p className="text-[#64748B] dark:text-[#98A2B3] mt-1">
              {editMode ? "Edit your profile information" : "View and manage your profile"}
            </p>
          </div>

          {/* Messages */}
          {message && (
            <div
              className={`mb-6 p-4 rounded-lg flex items-center gap-3 ${
                message.type === "success"
                  ? "bg-[#DCFCE7] text-[#166534]"
                  : "bg-[#FEE2E2] text-[#991B1B]"
              }`}
            >
              {message.type === "success" ? (
                <CheckCircle className="h-5 w-5" />
              ) : (
                <AlertCircle className="h-5 w-5" />
              )}
              {message.text}
            </div>
          )}

          {/* Profile Content */}
          <div className="max-w-2xl">
            <div className="bg-white dark:bg-[#1a1a2e] rounded-xl border border-[#E2E8F0] dark:border-[#333] shadow-sm p-6">
              {/* Profile Header */}
              <div className="flex items-center justify-between mb-6 pb-6 border-b border-[#E2E8F0] dark:border-[#333]">
                <div>
                  <div className="w-16 h-16 rounded-full bg-gradient-to-br from-[#3B82F6] to-[#2563EB] flex items-center justify-center text-white text-2xl font-bold">
                    {profile?.name?.charAt(0).toUpperCase()}
                  </div>
                </div>
                {!editMode && (
                  <button
                    onClick={() => setEditMode(true)}
                    className="px-6 py-2 bg-[#3B82F6] text-white rounded-lg hover:bg-[#2563EB] transition font-semibold"
                  >
                    Edit Profile
                  </button>
                )}
              </div>

              {/* Profile Form */}
              <div className="space-y-6">
                {/* Name */}
                <div>
                  <label className="block text-sm font-semibold text-[#1E293B] dark:text-white mb-2">
                    Full Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    title="Full Name"
                    value={formData.name || ""}
                    onChange={handleInputChange}
                    disabled={!editMode}
                    className="w-full px-4 py-3 border border-[#CBD5E1] dark:border-[#444] rounded-lg bg-white dark:bg-[#2a2a3e] text-[#0F172A] dark:text-white disabled:opacity-60 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-[#3B82F6]"
                  />
                </div>

                {/* Roll Number / Department */}
                <div>
                  <label className="block text-sm font-semibold text-[#1E293B] dark:text-white mb-2">
                    {userType === "student" ? "Roll Number" : "Department"}
                  </label>
                  <input
                    type="text"
                    name={userType === "student" ? "roll_number" : "department"}
                    title={userType === "student" ? "Roll Number" : "Department"}
                    value={userType === "student" ? (formData.roll_number || "") : (formData.department || "")}
                    onChange={handleInputChange}
                    disabled={!editMode}
                    className="w-full px-4 py-3 border border-[#CBD5E1] dark:border-[#444] rounded-lg bg-white dark:bg-[#2a2a3e] text-[#0F172A] dark:text-white disabled:opacity-60 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-[#3B82F6]"
                  />
                </div>

                {/* Branch/Department */}
                {userType === "student" && (
                  <div>
                    <label className="block text-sm font-semibold text-[#1E293B] dark:text-white mb-2">
                      Branch
                    </label>
                    <input
                      type="text"
                      name="branch"
                      title="Branch"
                      value={formData.branch || ""}
                      onChange={handleInputChange}
                      disabled={!editMode}
                      className="w-full px-4 py-3 border border-[#CBD5E1] dark:border-[#444] rounded-lg bg-white dark:bg-[#2a2a3e] text-[#0F172A] dark:text-white disabled:opacity-60 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-[#3B82F6]"
                    />
                  </div>
                )}

                {/* Email */}
                <div>
                  <label className="block text-sm font-semibold text-[#1E293B] dark:text-white mb-2">
                    Email (Optional)
                  </label>
                  <input
                    type="email"
                    name="email"
                    title="Email Address"
                    value={formData.email || ""}
                    onChange={handleInputChange}
                    disabled={!editMode}
                    className="w-full px-4 py-3 border border-[#CBD5E1] dark:border-[#444] rounded-lg bg-white dark:bg-[#2a2a3e] text-[#0F172A] dark:text-white disabled:opacity-60 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-[#3B82F6]"
                  />
                </div>

                {/* Password */}
                {editMode && (
                  <div>
                    <label className="block text-sm font-semibold text-[#1E293B] dark:text-white mb-2">
                      Change Password (Leave blank to keep current)
                    </label>
                    <div className="flex gap-2">
                      <input
                        type={showPassword ? "text" : "password"}
                        name="password"
                        title="New Password"
                        placeholder="Enter new password"
                        value={formData.password || ""}
                        onChange={handleInputChange}
                        className="flex-1 px-4 py-3 border border-[#CBD5E1] dark:border-[#444] rounded-lg bg-white dark:bg-[#2a2a3e] text-[#0F172A] dark:text-white focus:outline-none focus:ring-2 focus:ring-[#3B82F6]"
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="px-4 py-3 border border-[#CBD5E1] dark:border-[#444] rounded-lg hover:bg-[#F1F5F9] dark:hover:bg-[#2a2a3e] transition"
                        title={showPassword ? "Hide password" : "Show password"}
                      >
                        {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                      </button>
                    </div>
                  </div>
                )}

                {/* Action Buttons */}
                {editMode && (
                  <div className="flex gap-3 pt-4">
                    <button
                      onClick={handleSave}
                      disabled={submitting}
                      className="flex-1 px-6 py-3 bg-[#3B82F6] text-white rounded-lg hover:bg-[#2563EB] transition font-semibold disabled:opacity-60 disabled:cursor-not-allowed"
                    >
                      {submitting ? "Saving..." : "Save Changes"}
                    </button>
                    <button
                      onClick={() => {
                        setEditMode(false);
                        setFormData(profile);
                      }}
                      disabled={submitting}
                      className="flex-1 px-6 py-3 border border-[#CBD5E1] dark:border-[#444] text-[#1E293B] dark:text-white rounded-lg hover:bg-[#F1F5F9] dark:hover:bg-[#2a2a3e] transition font-semibold disabled:opacity-60 disabled:cursor-not-allowed"
                    >
                      Cancel
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
