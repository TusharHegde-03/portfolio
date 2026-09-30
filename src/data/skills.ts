export interface Skill {
  id: string;
  name: string;
  iconName: string;
  codeSnippet: string;
  category: string;
}

export const skillsData: Skill[] = [
  {
    id: "python",
    name: "Python",
    iconName: "FileCode",
    codeSnippet: `def solve():\n    return "Better version of me"`,
    category: "Languages & Core"
  },
  {
    id: "sql",
    name: "SQL",
    iconName: "Database",
    codeSnippet: `SELECT *\nFROM opportunities\nWHERE growth = true;`,
    category: "Data Systems"
  },
  {
    id: "fastapi",
    name: "FastAPI",
    iconName: "Zap",
    codeSnippet: `@app.get("/health")\nasync def health():\n    return {"status": "ok"}`,
    category: "Backend & Web APIs"
  },
  {
    id: "data-analysis",
    name: "Data Analysis",
    iconName: "BarChart3",
    codeSnippet: `df.describe()\ninsights = df.groupby(\n    'category'\n).mean()`,
    category: "Data Engineering"
  },
  {
    id: "machine-learning",
    name: "Machine Learning",
    iconName: "Cpu",
    codeSnippet: `model.fit(X, y)\npredictions = model.predict()\nreturn predictions`,
    category: "AI & ML"
  },
  {
    id: "oop",
    name: "OOP",
    iconName: "Box",
    codeSnippet: `class Dream:\n    def __init__(self):\n        self.goal = "Build"`,
    category: "Architecture"
  },
  {
    id: "problem-solving",
    name: "Problem Solving",
    iconName: "BrainCircuit",
    codeSnippet: `while problem:\n    analyze()\n    break_down()\n    solve()`,
    category: "Core Discipline"
  },
  {
    id: "git",
    name: "Git & GitHub",
    iconName: "Terminal",
    codeSnippet: `git commit -m "feat: production release"\ngit push origin main`,
    category: "DevOps & Tools"
  }
];

export const skillMontageStages = [
  { name: "LEARN", active: true },
  { name: "BUILD", active: true },
  { name: "APPLY", active: true },
  { name: "IMPROVE", active: true },
  { name: "REPEAT", active: true },
];
