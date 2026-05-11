export interface Profile {
  name: string;
  title: string;
  phone: string;
  email: string;
  location: string;
  description: string;
  image: string;
  resumeUrl: string;
}

export interface Social {
  platform: string;
  url: string;
}

export interface SkillCategory {
  category: string;
  items: string[];
}

export interface Experience {
  id: string;
  role: string;
  company: string;
  location: string;
  duration: string;
  points: string[];
}

export interface Education {
  id: string;
  degree: string;
  institution: string;
  location: string;
  duration: string;
  grade: string;
}

export interface Project {
  id: string;
  title: string;
  description: string;
  points: string[];
  techStack: string[];
  image: string;
  liveUrl: string;
  githubUrl: string;
}

export interface PortfolioData {
  profile: Profile;
  socials: Social[];
  skills: SkillCategory[];
  experience: Experience[];
  education: Education[];
  projects: Project[];
  achievements: string[];
  softSkills: string[];
}
