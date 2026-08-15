import { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import { 
  ArrowRight, CheckCircle2, Layout, SlidersHorizontal, 
  CalendarClock, Users, BarChart3, Moon, Search, Send
} from "lucide-react";
import "./Landing.css";

// Intersection Observer Hook for Scroll Reveals
function useScrollReveal() {
  const [isRevealed, setIsRevealed] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (mediaQuery.matches) {
      setIsRevealed(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsRevealed(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1, rootMargin: '0px 0px -50px 0px' }
    );

    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return { ref, isRevealed };
}

function RevealSection({ children, className = "" }) {
  const { ref, isRevealed } = useScrollReveal();
  return (
    <section ref={ref} className={`landing-section ${className} ${isRevealed ? 'revealed' : ''}`}>
      {children}
    </section>
  );
}

// Help Center Accordion
function FAQItem({ question, answer }) {
  const [isOpen, setIsOpen] = useState(false);
  
  return (
    <div className={`faq-item ${isOpen ? 'open' : ''}`}>
      <button 
        className="faq-question" 
        onClick={() => setIsOpen(!isOpen)}
        aria-expanded={isOpen}
      >
        {question}
        <span className="faq-icon">{isOpen ? '−' : '+'}</span>
      </button>
      <div className="faq-answer">
        <p>{answer}</p>
      </div>
    </div>
  );
}

export function Landing() {
  const [searchQuery, setSearchQuery] = useState('');
  
  const allFaqs = [
    { category: "Getting Started", q: "How do I create a task?", a: "Navigate to the Board and click the '+ New Task' button. Fill in the title, description, and hit create!" },
    { category: "Task Management", q: "How do I move a task between statuses?", a: "FlowBoard supports full Drag-and-Drop! Simply click and hold a task card, and drag it to any other column." },
    { category: "Task Management", q: "How do I edit a task?", a: "Click on any task card on your board to open the detailed Edit Task Panel where you can modify descriptions, labels, and subtasks." },
    { category: "Task Management", q: "How do I change task priority?", a: "Inside the Edit Task Panel, use the Priority dropdown to select High, Medium, or Low." },
    { category: "Account & Settings", q: "How do I access the dashboard?", a: "Click on the 'Overview' or 'Dashboard' links in your application sidebar to view real-time statistics." },
    { category: "Account & Settings", q: "How do I use dark mode?", a: "Click the moon/sun icon in the top right of your navigation bar to toggle between light and dark themes." },
  ];

  const filteredFaqs = allFaqs.filter(faq => 
    faq.q.toLowerCase().includes(searchQuery.toLowerCase()) || 
    faq.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  useEffect(() => {
    const hash = window.location.hash;
    if (hash) {
      setTimeout(() => {
        const element = document.querySelector(hash);
        if (element) element.scrollIntoView({ behavior: "smooth" });
      }, 100);
    }
  }, []);

  return (
    <div className="landing-container">
      {/* Hero Section */}
      <section id="home" className="hero-section">
        <div className="hero-content">
          <h1 className="hero-title">Plan. Track. Deliver.</h1>
          <p className="hero-subtitle">
            A modern workspace for organizing projects, managing tasks, and keeping your team aligned.
          </p>
          <div className="hero-actions">
            <Link to="/overview" className="btn btn-primary btn-lg">
              Open Board <ArrowRight size={18} style={{ marginLeft: 8 }} />
            </Link>
            <a href="#features" className="btn btn-secondary btn-lg">
              Explore Features
            </a>
          </div>
        </div>
      </section>

      {/* About Section */}
      <RevealSection className="about-section" id="about">
        <div className="section-container text-center">
          <h2 className="section-title">About FlowBoard</h2>
          <p className="section-desc max-w-2xl mx-auto">
            FlowBoard is a modern project management workspace designed to make it easier for individuals and teams to organize work, track progress, and stay focused on what matters. Whether you're organizing projects, managing tasks, collaborating with teams, or monitoring deadlines, FlowBoard provides the tools you need without the clutter.
          </p>
        </div>
      </RevealSection>

      {/* Features Section */}
      <RevealSection className="features-section" id="features">
        <div className="section-container">
          <h2 className="section-title text-center">Powerful Features</h2>
          <div className="features-grid">
            <div className="feature-card">
              <CheckCircle2 className="feature-icon" />
              <h3>Task Management</h3>
              <p>Create, edit, and organize tasks effortlessly with rich descriptions.</p>
            </div>
            <div className="feature-card">
              <Layout className="feature-icon" />
              <h3>Kanban Board</h3>
              <p>Drag and drop tasks across customizable workflow columns.</p>
            </div>
            <div className="feature-card">
              <SlidersHorizontal className="feature-icon" />
              <h3>Priority Management</h3>
              <p>Keep your team focused with High, Medium, and Low priorities.</p>
            </div>
            <div className="feature-card">
              <CalendarClock className="feature-icon" />
              <h3>Project Tracking</h3>
              <p>Monitor progress and track deadlines seamlessly.</p>
            </div>
            <div className="feature-card">
              <Users className="feature-icon" />
              <h3>Team Collaboration</h3>
              <p>Assign tasks to team members and track individual workloads.</p>
            </div>
            <div className="feature-card">
              <BarChart3 className="feature-icon" />
              <h3>Dashboard Analytics</h3>
              <p>Get a high-level view of your project health and task distribution.</p>
            </div>
            <div className="feature-card">
              <Moon className="feature-icon" />
              <h3>Dark / Light Mode</h3>
              <p>A beautiful interface that respects your system theme preferences.</p>
            </div>
            <div className="feature-card">
              <Layout className="feature-icon" />
              <h3>Responsive Design</h3>
              <p>Manage your projects on desktop, tablet, or mobile devices.</p>
            </div>
          </div>
        </div>
      </RevealSection>

      {/* Help Center Section */}
      <RevealSection className="help-section" id="help">
        <div className="section-container">
          <div className="help-header text-center">
            <h2 className="section-title">How can we help?</h2>
            <div className="search-box mx-auto">
              <Search className="search-icon" size={20} />
              <input 
                type="text" 
                placeholder="Search for answers..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>

          <div className="faq-container mx-auto">
            {filteredFaqs.length > 0 ? (
              filteredFaqs.map((faq, i) => (
                <FAQItem key={i} question={faq.q} answer={faq.a} />
              ))
            ) : (
              <p className="text-center" style={{ color: 'var(--text-secondary)' }}>No results found for "{searchQuery}".</p>
            )}
          </div>
        </div>
      </RevealSection>

      {/* Contact Section */}
      <RevealSection className="contact-section" id="contact">
        <div className="section-container text-center">
          <h2 className="section-title">Get in touch</h2>
          <p className="section-desc max-w-2xl mx-auto" style={{ marginBottom: 'var(--space-6)' }}>
            Have a question, suggestion, or feedback? Feel free to reach out.
          </p>
          
          <div className="contact-card mx-auto">
            <h3>Contact Support</h3>
            <p style={{ color: 'var(--text-secondary)', marginBottom: 'var(--space-4)' }}>
              Send us an email and we'll get back to you as soon as possible.
            </p>
            <a 
              href="mailto:kumarabhishek5968@gmail.com" 
              className="btn btn-primary"
              style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '12px 24px' }}
            >
              <Send size={18} /> Send Email
            </a>
            <p style={{ marginTop: 'var(--space-4)', fontSize: '0.9rem', color: 'var(--text-secondary)' }}>
              kumarabhishek5968@gmail.com
            </p>
          </div>
        </div>
      </RevealSection>
    </div>
  );
}
