"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "sonner";
import {
  User, Globe, Zap, Briefcase, GraduationCap, FolderOpen, Heart,
  LogOut, Save, Plus, Trash2, Upload, ImageIcon, X, ChevronDown,
} from "lucide-react";
import type { PortfolioData, Experience, Education, Project, Social, SkillCategory } from "@/lib/types";

const tabs = [
  { id: "profile", label: "Profile", icon: User },
  { id: "socials", label: "Socials", icon: Globe },
  { id: "skills", label: "Skills", icon: Zap },
  { id: "experience", label: "Experience", icon: Briefcase },
  { id: "education", label: "Education", icon: GraduationCap },
  { id: "projects", label: "Projects", icon: FolderOpen },
  { id: "soft", label: "Soft Skills", icon: Heart },
];

export default function AdminDashboard() {
  const router = useRouter();
  const [data, setData] = useState<PortfolioData | null>(null);
  const [activeTab, setActiveTab] = useState("profile");
  const [saving, setSaving] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/admin/data")
      .then((r) => r.json())
      .then((d) => { setData(d); setLoading(false); })
      .catch(() => { toast.error("Failed to load data"); setLoading(false); });
  }, []);

  const handleSave = async () => {
    if (!data) return;
    setSaving(true);
    try {
      const res = await fetch("/api/admin/data", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (res.ok) toast.success("Saved successfully ✓");
      else toast.error("Failed to save");
    } catch {
      toast.error("Network error");
    } finally {
      setSaving(false);
    }
  };

  const handleLogout = async () => {
    await fetch("/api/auth/logout", { method: "POST" });
    router.push("/admin/login");
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#030712] flex items-center justify-center">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
          className="w-8 h-8 border-2 border-purple-500/30 border-t-purple-500 rounded-full"
        />
      </div>
    );
  }

  if (!data) return null;

  return (
    <div className="min-h-screen bg-[#030712] text-gray-200">
      {/* Top bar */}
      <header className="sticky top-0 z-40 bg-gray-900/80 backdrop-blur-xl border-b border-gray-800">
        <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
          <h1 className="text-lg font-semibold text-white">
            Admin <span className="text-purple-400">Panel</span>
          </h1>
          <div className="flex items-center gap-3">
            <button
              onClick={handleSave}
              disabled={saving}
              className="flex items-center gap-2 px-4 py-2 bg-purple-600 hover:bg-purple-500 text-white text-sm font-medium rounded-lg disabled:opacity-50 transition-colors"
            >
              <Save size={14} /> {saving ? "Saving..." : "Save"}
            </button>
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 px-4 py-2 bg-gray-800 hover:bg-gray-700 text-gray-300 text-sm rounded-lg transition-colors"
            >
              <LogOut size={14} /> Logout
            </button>
          </div>
        </div>
      </header>

      {/* Tab navigation */}
      <div className="sticky top-[57px] z-30 bg-[#030712]/90 backdrop-blur-md border-b border-gray-800/50 overflow-x-auto">
        <div className="max-w-6xl mx-auto px-4 flex gap-1">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-4 py-3 text-sm font-medium border-b-2 transition-all whitespace-nowrap ${
                  activeTab === tab.id
                    ? "border-purple-500 text-purple-400"
                    : "border-transparent text-gray-500 hover:text-gray-300"
                }`}
              >
                <Icon size={14} /> {tab.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* Content */}
      <div className="max-w-6xl mx-auto px-4 py-8">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
          >
            {activeTab === "profile" && <ProfileTab data={data} setData={setData} />}
            {activeTab === "socials" && <SocialsTab data={data} setData={setData} />}
            {activeTab === "skills" && <SkillsTab data={data} setData={setData} />}
            {activeTab === "experience" && <ExperienceTab data={data} setData={setData} />}
            {activeTab === "education" && <EducationTab data={data} setData={setData} />}
            {activeTab === "projects" && <ProjectsTab data={data} setData={setData} />}
            {activeTab === "soft" && <SoftSkillsTab data={data} setData={setData} />}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}

/* ─── Shared ─── */
interface TabProps {
  data: PortfolioData;
  setData: React.Dispatch<React.SetStateAction<PortfolioData | null>>;
}

function Card({ title, children }: { title?: string; children: React.ReactNode }) {
  return (
    <div className="p-6 rounded-xl bg-gray-900/40 border border-gray-800/50 mb-6">
      {title && <h3 className="text-sm font-medium text-purple-400 uppercase tracking-wider mb-5">{title}</h3>}
      {children}
    </div>
  );
}

function Field({
  label, value, onChange, type = "text", placeholder, textarea,
}: {
  label: string; value: string; onChange: (v: string) => void;
  type?: string; placeholder?: string; textarea?: boolean;
}) {
  const cls = "w-full px-3 py-2.5 bg-zinc-800/60 border border-zinc-700/50 rounded-lg text-sm text-white placeholder:text-gray-600 focus:outline-none focus:border-purple-500/50 transition-colors";
  return (
    <div>
      <label className="block text-xs text-gray-400 mb-1.5">{label}</label>
      {textarea ? (
        <textarea rows={3} value={value} onChange={(e) => onChange(e.target.value)} placeholder={placeholder} className={`${cls} resize-none`} />
      ) : (
        <input type={type} value={value} onChange={(e) => onChange(e.target.value)} placeholder={placeholder} className={cls} />
      )}
    </div>
  );
}

/* ─── Profile ─── */
function ProfileTab({ data, setData }: TabProps) {
  const p = data.profile;
  const set = (key: string, val: string) =>
    setData({ ...data, profile: { ...p, [key]: val } });

  return (
    <Card title="Profile Information">
      <div className="grid md:grid-cols-2 gap-4">
        <Field label="Name" value={p.name} onChange={(v) => set("name", v)} />
        <Field label="Title" value={p.title} onChange={(v) => set("title", v)} />
        <Field label="Phone" value={p.phone} onChange={(v) => set("phone", v)} />
        <Field label="Email" value={p.email} onChange={(v) => set("email", v)} type="email" />
        <Field label="Location" value={p.location} onChange={(v) => set("location", v)} />
        <Field label="Resume URL" value={p.resumeUrl} onChange={(v) => set("resumeUrl", v)} />
        <Field label="Profile Image URL" value={p.image} onChange={(v) => set("image", v)} />
      </div>
      <div className="mt-4">
        <Field label="Description" value={p.description} onChange={(v) => set("description", v)} textarea />
      </div>
    </Card>
  );
}

/* ─── Socials ─── */
function SocialsTab({ data, setData }: TabProps) {
  const add = () => setData({ ...data, socials: [...data.socials, { platform: "", url: "" }] });
  const remove = (i: number) => setData({ ...data, socials: data.socials.filter((_, j) => j !== i) });
  const update = (i: number, key: keyof Social, val: string) => {
    const s = [...data.socials];
    s[i] = { ...s[i], [key]: val };
    setData({ ...data, socials: s });
  };

  return (
    <Card title="Social Links">
      <div className="space-y-3">
        {data.socials.map((s, i) => (
          <div key={i} className="flex gap-3 items-end">
            <div className="flex-1">
              <Field label="Platform" value={s.platform} onChange={(v) => update(i, "platform", v)} placeholder="GitHub" />
            </div>
            <div className="flex-1">
              <Field label="URL" value={s.url} onChange={(v) => update(i, "url", v)} placeholder="https://..." />
            </div>
            <button onClick={() => remove(i)} className="p-2.5 text-red-400 hover:bg-red-500/10 rounded-lg transition-colors mb-0.5">
              <Trash2 size={16} />
            </button>
          </div>
        ))}
      </div>
      <button onClick={add} className="mt-4 flex items-center gap-2 text-sm text-purple-400 hover:text-purple-300 transition-colors">
        <Plus size={14} /> Add Social
      </button>
    </Card>
  );
}

/* ─── Skills ─── */
function SkillsTab({ data, setData }: TabProps) {
  const [newSkill, setNewSkill] = useState<Record<number, string>>({});

  const addCategory = () =>
    setData({ ...data, skills: [...data.skills, { category: "New Category", items: [] }] });

  const removeCategory = (i: number) =>
    setData({ ...data, skills: data.skills.filter((_, j) => j !== i) });

  const updateCategoryName = (i: number, name: string) => {
    const s = [...data.skills];
    s[i] = { ...s[i], category: name };
    setData({ ...data, skills: s });
  };

  const addSkill = (i: number) => {
    const skill = (newSkill[i] || "").trim();
    if (!skill) return;
    const s = [...data.skills];
    s[i] = { ...s[i], items: [...s[i].items, skill] };
    setData({ ...data, skills: s });
    setNewSkill({ ...newSkill, [i]: "" });
  };

  const removeSkill = (catIdx: number, skillIdx: number) => {
    const s = [...data.skills];
    s[catIdx] = { ...s[catIdx], items: s[catIdx].items.filter((_, j) => j !== skillIdx) };
    setData({ ...data, skills: s });
  };

  return (
    <>
      {data.skills.map((cat, i) => (
        <Card key={i}>
          <div className="flex items-center justify-between mb-4">
            <input
              value={cat.category}
              onChange={(e) => updateCategoryName(i, e.target.value)}
              className="bg-transparent text-sm font-medium text-purple-400 uppercase tracking-wider focus:outline-none border-b border-transparent focus:border-purple-500/50"
            />
            <button onClick={() => removeCategory(i)} className="text-red-400 hover:text-red-300 text-xs">
              Remove Category
            </button>
          </div>
          <div className="flex flex-wrap gap-2 mb-4">
            {cat.items.map((skill, j) => (
              <span key={j} className="flex items-center gap-1.5 px-3 py-1.5 bg-zinc-800/60 border border-zinc-700/50 rounded-lg text-sm text-gray-300">
                {skill}
                <button onClick={() => removeSkill(i, j)} className="text-gray-500 hover:text-red-400 transition-colors">
                  <X size={12} />
                </button>
              </span>
            ))}
          </div>
          <div className="flex gap-2">
            <input
              value={newSkill[i] || ""}
              onChange={(e) => setNewSkill({ ...newSkill, [i]: e.target.value })}
              onKeyDown={(e) => e.key === "Enter" && addSkill(i)}
              placeholder="Add skill..."
              className="flex-1 px-3 py-2 bg-zinc-800/60 border border-zinc-700/50 rounded-lg text-sm text-white placeholder:text-gray-600 focus:outline-none focus:border-purple-500/50"
            />
            <button onClick={() => addSkill(i)} className="px-3 py-2 bg-purple-600/20 text-purple-400 rounded-lg text-sm hover:bg-purple-600/30 transition-colors">
              <Plus size={14} />
            </button>
          </div>
        </Card>
      ))}
      <button onClick={addCategory} className="flex items-center gap-2 text-sm text-purple-400 hover:text-purple-300 transition-colors">
        <Plus size={14} /> Add Category
      </button>
    </>
  );
}

/* ─── Experience ─── */
function ExperienceTab({ data, setData }: TabProps) {
  const add = () => {
    const newExp: Experience = {
      id: Date.now().toString(),
      role: "",
      company: "",
      location: "",
      duration: "",
      points: [""],
    };
    setData({ ...data, experience: [...data.experience, newExp] });
  };

  const remove = (i: number) =>
    setData({ ...data, experience: data.experience.filter((_, j) => j !== i) });

  const update = (i: number, key: keyof Experience, val: string | string[]) => {
    const e = [...data.experience];
    e[i] = { ...e[i], [key]: val };
    setData({ ...data, experience: e });
  };

  const addPoint = (i: number) => {
    const e = [...data.experience];
    e[i] = { ...e[i], points: [...e[i].points, ""] };
    setData({ ...data, experience: e });
  };

  const updatePoint = (i: number, j: number, val: string) => {
    const e = [...data.experience];
    const pts = [...e[i].points];
    pts[j] = val;
    e[i] = { ...e[i], points: pts };
    setData({ ...data, experience: e });
  };

  const removePoint = (i: number, j: number) => {
    const e = [...data.experience];
    e[i] = { ...e[i], points: e[i].points.filter((_, k) => k !== j) };
    setData({ ...data, experience: e });
  };

  return (
    <>
      {data.experience.map((exp, i) => (
        <Card key={exp.id}>
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-medium text-purple-400">{exp.role || "New Experience"}</h3>
            <button onClick={() => remove(i)} className="text-red-400 hover:text-red-300 text-xs flex items-center gap-1">
              <Trash2 size={12} /> Delete
            </button>
          </div>
          <div className="grid md:grid-cols-2 gap-4 mb-4">
            <Field label="Role" value={exp.role} onChange={(v) => update(i, "role", v)} />
            <Field label="Company" value={exp.company} onChange={(v) => update(i, "company", v)} />
            <Field label="Location" value={exp.location} onChange={(v) => update(i, "location", v)} />
            <Field label="Duration" value={exp.duration} onChange={(v) => update(i, "duration", v)} />
          </div>
          <div>
            <label className="block text-xs text-gray-400 mb-2">Bullet Points</label>
            <div className="space-y-2">
              {exp.points.map((pt, j) => (
                <div key={j} className="flex gap-2">
                  <input
                    value={pt}
                    onChange={(e) => updatePoint(i, j, e.target.value)}
                    className="flex-1 px-3 py-2 bg-zinc-800/60 border border-zinc-700/50 rounded-lg text-sm text-white placeholder:text-gray-600 focus:outline-none focus:border-purple-500/50"
                    placeholder="Point..."
                  />
                  <button onClick={() => removePoint(i, j)} className="p-2 text-red-400 hover:bg-red-500/10 rounded-lg">
                    <Trash2 size={14} />
                  </button>
                </div>
              ))}
            </div>
            <button onClick={() => addPoint(i)} className="mt-2 text-xs text-purple-400 hover:text-purple-300 flex items-center gap-1">
              <Plus size={12} /> Add Point
            </button>
          </div>
        </Card>
      ))}
      <button onClick={add} className="flex items-center gap-2 text-sm text-purple-400 hover:text-purple-300 transition-colors">
        <Plus size={14} /> Add Experience
      </button>
    </>
  );
}

/* ─── Education ─── */
function EducationTab({ data, setData }: TabProps) {
  const add = () => {
    const newEdu: Education = {
      id: Date.now().toString(),
      degree: "",
      institution: "",
      location: "",
      duration: "",
      grade: "",
    };
    setData({ ...data, education: [...data.education, newEdu] });
  };

  const remove = (i: number) =>
    setData({ ...data, education: data.education.filter((_, j) => j !== i) });

  const update = (i: number, key: keyof Education, val: string) => {
    const e = [...data.education];
    e[i] = { ...e[i], [key]: val };
    setData({ ...data, education: e });
  };

  return (
    <>
      {data.education.map((edu, i) => (
        <Card key={edu.id}>
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-medium text-purple-400">{edu.degree || "New Education"}</h3>
            <button onClick={() => remove(i)} className="text-red-400 hover:text-red-300 text-xs flex items-center gap-1">
              <Trash2 size={12} /> Delete
            </button>
          </div>
          <div className="grid md:grid-cols-2 gap-4">
            <Field label="Degree" value={edu.degree} onChange={(v) => update(i, "degree", v)} />
            <Field label="Institution" value={edu.institution} onChange={(v) => update(i, "institution", v)} />
            <Field label="Location" value={edu.location} onChange={(v) => update(i, "location", v)} />
            <Field label="Duration" value={edu.duration} onChange={(v) => update(i, "duration", v)} />
            <Field label="Grade" value={edu.grade} onChange={(v) => update(i, "grade", v)} placeholder="e.g., CGPA: 9.12" />
          </div>
        </Card>
      ))}
      <button onClick={add} className="flex items-center gap-2 text-sm text-purple-400 hover:text-purple-300 transition-colors">
        <Plus size={14} /> Add Education
      </button>
    </>
  );
}

/* ─── Projects ─── */
function ProjectsTab({ data, setData }: TabProps) {
  const fileInputRefs = useRef<Record<string, HTMLInputElement | null>>({});

  const add = () => {
    const newProj: Project = {
      id: Date.now().toString(),
      title: "",
      description: "",
      points: [""],
      techStack: [],
      image: "",
      liveUrl: "",
      githubUrl: "",
    };
    setData({ ...data, projects: [...data.projects, newProj] });
  };

  const remove = (i: number) =>
    setData({ ...data, projects: data.projects.filter((_, j) => j !== i) });

  const update = (i: number, key: keyof Project, val: string | string[]) => {
    const p = [...data.projects];
    p[i] = { ...p[i], [key]: val };
    setData({ ...data, projects: p });
  };

  const addPoint = (i: number) => {
    const p = [...data.projects];
    p[i] = { ...p[i], points: [...p[i].points, ""] };
    setData({ ...data, projects: p });
  };

  const updatePoint = (i: number, j: number, val: string) => {
    const p = [...data.projects];
    const pts = [...p[i].points];
    pts[j] = val;
    p[i] = { ...p[i], points: pts };
    setData({ ...data, projects: p });
  };

  const removePoint = (i: number, j: number) => {
    const p = [...data.projects];
    p[i] = { ...p[i], points: p[i].points.filter((_, k) => k !== j) };
    setData({ ...data, projects: p });
  };

  const handleUpload = async (i: number, file: File) => {
    const formData = new FormData();
    formData.append("file", file);
    try {
      const res = await fetch("/api/admin/upload", { method: "POST", body: formData });
      const result = await res.json();
      if (result.url) {
        update(i, "image", result.url);
        toast.success("Image uploaded ✓");
      } else {
        toast.error("Upload failed");
      }
    } catch {
      toast.error("Upload failed");
    }
  };

  const handleDeleteImage = async (i: number) => {
    const imgPath = data.projects[i].image;
    if (!imgPath) return;
    try {
      await fetch(`/api/admin/upload?path=${encodeURIComponent(imgPath)}`, { method: "DELETE" });
      update(i, "image", "");
      toast.success("Image removed ✓");
    } catch {
      toast.error("Failed to remove image");
    }
  };

  const [newTech, setNewTech] = useState<Record<number, string>>({});

  const addTech = (i: number) => {
    const t = (newTech[i] || "").trim();
    if (!t) return;
    const p = [...data.projects];
    p[i] = { ...p[i], techStack: [...p[i].techStack, t] };
    setData({ ...data, projects: p });
    setNewTech({ ...newTech, [i]: "" });
  };

  const removeTech = (i: number, j: number) => {
    const p = [...data.projects];
    p[i] = { ...p[i], techStack: p[i].techStack.filter((_, k) => k !== j) };
    setData({ ...data, projects: p });
  };

  return (
    <>
      {data.projects.map((proj, i) => (
        <Card key={proj.id}>
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-medium text-purple-400">{proj.title || "New Project"}</h3>
            <button onClick={() => remove(i)} className="text-red-400 hover:text-red-300 text-xs flex items-center gap-1">
              <Trash2 size={12} /> Delete
            </button>
          </div>

          {/* Image upload area */}
          <div className="mb-5">
            <label className="block text-xs text-gray-400 mb-2">Project Image</label>
            {proj.image ? (
              <div className="relative rounded-xl overflow-hidden border border-gray-700/50 h-40">
                <img src={proj.image} alt={proj.title} className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-black/40 opacity-0 hover:opacity-100 transition-opacity flex items-center justify-center gap-3">
                  <button
                    onClick={() => handleDeleteImage(i)}
                    className="px-3 py-1.5 bg-red-600 text-white text-xs rounded-lg flex items-center gap-1.5"
                  >
                    <Trash2 size={12} /> Remove
                  </button>
                  <button
                    onClick={() => fileInputRefs.current[proj.id]?.click()}
                    className="px-3 py-1.5 bg-purple-600 text-white text-xs rounded-lg flex items-center gap-1.5"
                  >
                    <Upload size={12} /> Replace
                  </button>
                </div>
              </div>
            ) : (
              <button
                onClick={() => fileInputRefs.current[proj.id]?.click()}
                className="w-full h-32 border-2 border-dashed border-gray-700/50 hover:border-purple-500/30 rounded-xl flex flex-col items-center justify-center gap-2 text-gray-500 hover:text-gray-400 transition-colors"
              >
                <ImageIcon size={24} />
                <span className="text-xs">Click to upload image</span>
              </button>
            )}
            <input
              ref={(el) => { fileInputRefs.current[proj.id] = el; }}
              type="file"
              accept="image/*"
              className="hidden"
              onChange={(e) => {
                const file = e.target.files?.[0];
                if (file) handleUpload(i, file);
                e.target.value = "";
              }}
            />
          </div>

          <div className="grid md:grid-cols-2 gap-4 mb-4">
            <Field label="Title" value={proj.title} onChange={(v) => update(i, "title", v)} />
            <Field label="Description" value={proj.description} onChange={(v) => update(i, "description", v)} />
            <Field label="Live URL" value={proj.liveUrl} onChange={(v) => update(i, "liveUrl", v)} placeholder="https://..." />
            <Field label="GitHub URL" value={proj.githubUrl} onChange={(v) => update(i, "githubUrl", v)} placeholder="https://github.com/..." />
          </div>

          {/* Tech stack */}
          <div className="mb-4">
            <label className="block text-xs text-gray-400 mb-2">Tech Stack</label>
            <div className="flex flex-wrap gap-2 mb-2">
              {proj.techStack.map((tech, j) => (
                <span key={j} className="flex items-center gap-1.5 px-2.5 py-1 bg-purple-600/10 text-purple-400 border border-purple-500/20 rounded-lg text-xs">
                  {tech}
                  <button onClick={() => removeTech(i, j)} className="hover:text-red-400 transition-colors">
                    <X size={10} />
                  </button>
                </span>
              ))}
            </div>
            <div className="flex gap-2">
              <input
                value={newTech[i] || ""}
                onChange={(e) => setNewTech({ ...newTech, [i]: e.target.value })}
                onKeyDown={(e) => e.key === "Enter" && addTech(i)}
                placeholder="Add tech..."
                className="flex-1 px-3 py-2 bg-zinc-800/60 border border-zinc-700/50 rounded-lg text-sm text-white placeholder:text-gray-600 focus:outline-none focus:border-purple-500/50"
              />
              <button onClick={() => addTech(i)} className="px-3 py-2 bg-purple-600/20 text-purple-400 rounded-lg text-sm hover:bg-purple-600/30">
                <Plus size={14} />
              </button>
            </div>
          </div>

          {/* Points */}
          <div>
            <label className="block text-xs text-gray-400 mb-2">Bullet Points</label>
            <div className="space-y-2">
              {proj.points.map((pt, j) => (
                <div key={j} className="flex gap-2">
                  <input
                    value={pt}
                    onChange={(e) => updatePoint(i, j, e.target.value)}
                    className="flex-1 px-3 py-2 bg-zinc-800/60 border border-zinc-700/50 rounded-lg text-sm text-white placeholder:text-gray-600 focus:outline-none focus:border-purple-500/50"
                    placeholder="Point..."
                  />
                  <button onClick={() => removePoint(i, j)} className="p-2 text-red-400 hover:bg-red-500/10 rounded-lg">
                    <Trash2 size={14} />
                  </button>
                </div>
              ))}
            </div>
            <button onClick={() => addPoint(i)} className="mt-2 text-xs text-purple-400 hover:text-purple-300 flex items-center gap-1">
              <Plus size={12} /> Add Point
            </button>
          </div>
        </Card>
      ))}
      <button onClick={add} className="flex items-center gap-2 text-sm text-purple-400 hover:text-purple-300 transition-colors">
        <Plus size={14} /> Add Project
      </button>
    </>
  );
}

/* ─── Soft Skills ─── */
function SoftSkillsTab({ data, setData }: TabProps) {
  const [newSkill, setNewSkill] = useState("");

  const add = () => {
    const s = newSkill.trim();
    if (!s) return;
    setData({ ...data, softSkills: [...data.softSkills, s] });
    setNewSkill("");
  };

  const remove = (i: number) =>
    setData({ ...data, softSkills: data.softSkills.filter((_, j) => j !== i) });

  return (
    <Card title="Soft Skills">
      <div className="flex flex-wrap gap-2 mb-4">
        {data.softSkills.map((s, i) => (
          <span key={i} className="flex items-center gap-1.5 px-3 py-1.5 bg-zinc-800/60 border border-zinc-700/50 rounded-lg text-sm text-gray-300">
            {s}
            <button onClick={() => remove(i)} className="text-gray-500 hover:text-red-400 transition-colors">
              <X size={12} />
            </button>
          </span>
        ))}
      </div>
      <div className="flex gap-2">
        <input
          value={newSkill}
          onChange={(e) => setNewSkill(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && add()}
          placeholder="Add soft skill..."
          className="flex-1 px-3 py-2 bg-zinc-800/60 border border-zinc-700/50 rounded-lg text-sm text-white placeholder:text-gray-600 focus:outline-none focus:border-purple-500/50"
        />
        <button onClick={add} className="px-3 py-2 bg-purple-600/20 text-purple-400 rounded-lg text-sm hover:bg-purple-600/30">
          <Plus size={14} />
        </button>
      </div>
    </Card>
  );
}
