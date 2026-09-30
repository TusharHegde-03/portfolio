export interface ProfileData {
  name: string;
  personName: string;
  title: string;
  subtitle: string;
  roles: string[];
  tagline: string;
  handwrittenAccents: {
    hero: string;
    journey: string;
    contact: string;
  };
  bio: string;
  education: {
    degree: string;
    institution: string;
    period: string;
  };
  experience: {
    role: string;
    company: string;
    period: string;
    status: string;
  };
  location: string;
  socials: {
    github: string;
    linkedin: string;
    email: string;
  };
  leftVerticalTags: string[];
}

export const profileData: ProfileData = {
  name: "TUSHIRO",
  personName: "Tushar Hegde",
  title: "Engineer | AI Builder",
  subtitle: "Fresh Graduate | Information Science Engineer",
  roles: ["Fresh Graduate", "Engineer", "AI Builder"],
  tagline: "SAME ROOTS. BIGGER VISION.",
  handwrittenAccents: {
    hero: "Same roots. Bigger vision.",
    journey: "Same person. Different vision.",
    contact: "Let's build something great."
  },
  bio: "I'm an Information Science Engineer and Fresh Graduate with a passion for building intelligent systems and solving real-world problems using data, AI, and modern technologies. I love learning, creating, and turning ideas into impactful products.",
  education: {
    degree: "B.E. in Information Science & Engineering",
    institution: "SDM Institute of Technology",
    period: "2022 – 2026"
  },
  experience: {
    role: "Technical Intern",
    company: "Castle Rock",
    period: "2026",
    status: "Fresh Graduate looking for full-time opportunity."
  },
  location: "Bengaluru, India",
  socials: {
    github: "https://github.com/TusharHegde-03",
    linkedin: "https://linkedin.com/in/tushar-hegde-a2554837b",
    email: "tusharhegde.dev@gmail.com"
  },
  leftVerticalTags: [
    "ENGINEER",
    "BUILDER",
    "PROBLEM SOLVER",
    "FRESH GRADUATE"
  ]
};
