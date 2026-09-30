export interface JourneyChapter {
  id: string;
  number: string;
  title: string;
  subtitle: string;
  description: string;
  videoStart: number;
  hudItems?: string[];
  statusList?: { label: string; status: 'completed' | 'in-progress' | 'pending' | 'rejected' }[];
  image: string;
}

export const journeyChapters: JourneyChapter[] = [
  {
    id: "small-town",
    number: "01",
    title: "Small Town",
    subtitle: "Rooted in curiosity and determination",
    description: "Growing up far from tech hubs built a deep hunger for learning and problem solving. Every resource was explored with focus.",
    videoStart: 0,
    image: "/images/journey-bg.png"
  },
  {
    id: "engineering",
    number: "02",
    title: "Engineering",
    subtitle: "B.E. in Information Science & Engineering at SDM Institute of Technology",
    description: "Entering formal information science engineering. Learning core principles of data systems, algorithms, and software engineering.",
    videoStart: 1.15,
    hudItems: ["Data Structures & Algorithms", "Computer Networks", "Database Systems"],
    image: "/images/journey-bg.png"
  },
  {
    id: "learning",
    number: "03",
    title: "Learning",
    subtitle: "The Learning Montage — New tools, new skills, same dream",
    description: "Diving deep into Python, SQL, FastAPI, Machine Learning, RAG pipelines, and data systems. Turning curiosity into real projects.",
    videoStart: 3,
    hudItems: ["Data Structures & Algorithms", "System Design", "Machine Learning", "FastAPI & Python"],
    image: "/images/journey-bg.png"
  },
  {
    id: "graduation",
    number: "04",
    title: "Graduation",
    subtitle: "Culmination of 4 years of CS discipline",
    description: "Standing at the threshold of academia and real-world engineering. Prepared with solid fundamentals and building projects.",
    videoStart: 4.14,
    image: "/images/journey-bg.png"
  },
  {
    id: "job-hunt",
    number: "05",
    title: "Job Hunt",
    subtitle: "Facing rejections, sharpening skills, persisting",
    description: "Navigating the job market with resilience. Sending applications, improving project portfolios, turning every setback into lessons.",
    videoStart: 6,
    statusList: [
      { label: "Application Submitted", status: "completed" },
      { label: "Waiting...", status: "in-progress" },
      { label: "No Response", status: "pending" },
      { label: "Rejected", status: "rejected" }
    ],
    image: "/images/journey-bg.png"
  },
  {
    id: "tushiro",
    number: "06",
    title: "Tushiro",
    subtitle: "Same roots. Bigger vision.",
    description: "Ready to step into the futuristic tech ecosystem of Bengaluru as a Engineer & AI Builder.",
    videoStart: 7.14,
    image: "/images/journey-bg.png"
  }
];
