export interface Project {
  id: string;
  title: string;
  slug: string;
  tagline: string;
  description: string;
  technologies: string[];
  techDisplay: string;
  features: string[];
  githubUrl?: string;
  demoUrl?: string;
  image: string;
  bgPosition: string;
}

export const projectsData: Project[] = [
  { id: '01', title: 'Nami Hospital Assistant Robot System', slug: 'nami-hospital-assistant', tagline: 'AI-Powered Voice & Telemetry Hospital Robotics', description: 'AI-powered hospital assistant robot system designed to support hospital operations through voice interaction, task management, patient/doctor workflows, appointment handling, medicine delivery, navigation and emergency alerts.', technologies: ['LiveKit', 'Google Gemini', 'Python', 'Voice AI', 'Telemetry'], techDisplay: 'LiveKit • Gemini • Python', features: ['Doctor management & patient records system', 'Appointment handling & conflict detection', 'Medicine assignment & tracking workflows', 'Pharmacy-to-room navigation & delivery telemetry', 'Priority task queue & Code Blue emergency alerts', 'Staff instant notifications & audit logging'], githubUrl: 'https://github.com/TusharHegde-03', image: '/images/nami.png', bgPosition: 'left center' },
  { id: '02', title: 'Clinical Trial Analytics & RAG Pipeline', slug: 'clinical-trial-analytics', tagline: 'Semantic Document Retrieval & Trial Data Analytics', description: 'A data analytics and retrieval-augmented workflow for exploring clinical trial information, indexing complex trial documentation with vector embeddings, and extracting actionable insights.', technologies: ['Python', 'Pandas', 'NumPy', 'LangChain', 'Qdrant', 'RAG', 'Tableau'], techDisplay: 'LangChain • Qdrant • Python', features: ['Automated clinical trial dataset cleaning & ETL', 'Vector embeddings generated & indexed in Qdrant', 'LangChain RAG pipeline for conversational querying', 'Analytical dashboards for trial distribution & trends', 'Tableau integration for exploratory data visuals'], githubUrl: 'https://github.com/TusharHegde-03', image: '/images/clinic.png', bgPosition: 'center center' },
  { id: '03', title: 'Historical Stock Market Analysis', slug: 'historical-stock-market-analysis', tagline: 'Automated Data Ingestion & Interactive Financial Analytics', description: 'Python-based historical market analysis system leveraging web scraping, finance APIs, time-series data cleaning, and interactive data visualization.', technologies: ['yfinance', 'Pandas', 'BeautifulSoup', 'Plotly', 'Matplotlib', 'Python'], techDisplay: 'Pandas • Plotly • Python', features: ['Automated financial ticker extraction via yfinance & BeautifulSoup', 'Time-series data cleaning, feature engineering & normalization', 'Interactive multi-asset candlestick visualization with Plotly', 'Statistical volatility, moving average & trend line metrics'], githubUrl: 'https://github.com/TusharHegde-03', image: '/images/hist.png', bgPosition: 'center right' },
  { id: '04', title: 'Intelligent Customer Support Ticket Classifier', slug: 'customer-support-ticket-classifier', tagline: 'NLP Ticket Classification & Low-Latency FastAPI Model', description: 'Machine learning project for classifying customer support tickets into relevant departments and priority levels with high speed and precision.', technologies: ['Python', 'Machine Learning', 'FastAPI', 'Streamlit', 'Scikit-Learn'], techDisplay: 'ML • FastAPI • Python', features: ['Support ticket text tokenization & TF-IDF / vector pre-processing', 'Multi-class classification ML model training & evaluation', 'FastAPI REST endpoint for instant real-time inference', 'Interactive Streamlit dashboard for testing & model monitoring'], githubUrl: 'https://github.com/TusharHegde-03', image: '/images/Ticket classifier.png', bgPosition: 'right center' },
];
