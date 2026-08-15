import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Search, MapPin, Code, Database, Layout, Smartphone, Cloud, PenTool, BrainCircuit } from 'lucide-react';
import { Button } from '../../components/ui/Button/Button';
import { Input } from '../../components/ui/Input/Input';
import { Badge } from '../../components/ui/Badge/Badge';
import { JobCard } from '../../components/JobCard/JobCard';
import { Reveal } from '../../components/ui/Reveal/Reveal';
import { CountUp } from '../../components/ui/CountUp/CountUp';
import styles from './Home.module.css';

import { mockJobs } from '../../data/mockJobs';

// We'll filter only featured jobs for the homepage
const featuredJobs = mockJobs.filter(job => job.featured);

const categories = [
  { icon: <Layout />, name: 'Frontend', count: '1,204' },
  { icon: <Database />, name: 'Backend', count: '945' },
  { icon: <Code />, name: 'Full Stack', count: '1,532' },
  { icon: <Cloud />, name: 'DevOps', count: '432' },
  { icon: <PenTool />, name: 'UI/UX Design', count: '821' },
  { icon: <Smartphone />, name: 'Mobile Dev', count: '654' },
  { icon: <BrainCircuit />, name: 'AI / ML', count: '312' },
  { icon: <Search />, name: 'Data Science', count: '543' },
];

export const Home = () => {
  const navigate = useNavigate();

  return (
    <div className={styles.home}>
      {/* Hero Section */}
      <section className={`${styles.section} ${styles.hero}`}>
        <div className={styles.container}>
          <Reveal delay={0}>
            <div className={styles.heroBadge}>
              <Badge variant="primary">Your next opportunity starts here</Badge>
            </div>
          </Reveal>
          
          <Reveal delay={150}>
            <h1 className={styles.heroTitle}>Find a job you'll actually love.</h1>
          </Reveal>
          
          <Reveal delay={300}>
            <p className={styles.heroText}>
              Join thousands of professionals who have discovered their dream careers through DevHire. 
              The most curated job board for modern tech teams.
            </p>
          </Reveal>
          
          <Reveal delay={450}>
            <div className={styles.searchBox}>
              <Input 
                className={styles.searchInput}
                placeholder="Job title, skill, or company" 
                leftIcon={<Search size={18} />} 
              />
              <Input 
                className={styles.searchInput}
                placeholder="City, state, or remote" 
                leftIcon={<MapPin size={18} />} 
              />
              <Button variant="primary" size="lg" className={styles.searchBtn} onClick={() => navigate('/jobs')}>
                Search Jobs
              </Button>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Categories Section */}
      <section className={`${styles.section} ${styles.bgAlt}`}>
        <div className={styles.container}>
          <Reveal>
            <div className={styles.sectionHeader}>
              <h2 className={styles.sectionTitle}>Explore Categories</h2>
              <p className={styles.sectionSubtitle}>Browse jobs by our most popular technology sectors.</p>
            </div>
          </Reveal>
          <div className={styles.categoriesGrid}>
            {categories.map((cat, i) => (
              <Reveal key={i} delay={i * 50}>
                <div className={styles.categoryCard}>
                  <div className={styles.categoryIcon}>{cat.icon}</div>
                  <div>
                    <h3 className={styles.categoryTitle}>{cat.name}</h3>
                    <p className={styles.categoryCount}>{cat.count} jobs</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Jobs Section */}
      <section className={styles.section}>
        <div className={styles.container}>
          <Reveal>
            <div className={styles.sectionHeader}>
              <h2 className={styles.sectionTitle}>Featured Opportunities</h2>
              <p className={styles.sectionSubtitle}>Hand-picked roles from top companies hiring right now.</p>
            </div>
          </Reveal>
          <div className={styles.jobsGrid}>
            {featuredJobs.map((job, i) => (
              <Reveal key={job.id} delay={i * 80}>
                <JobCard job={job} />
              </Reveal>
            ))}
          </div>
          <Reveal delay={200}>
            <div style={{ textAlign: 'center', marginTop: 'var(--space-8)' }}>
              <Link to="/jobs">
                <Button variant="outline" size="lg">View All Jobs</Button>
              </Link>
            </div>
          </Reveal>
        </div>
      </section>

      {/* How it Works Section */}
      <section className={`${styles.section} ${styles.bgAlt}`}>
        <div className={styles.container}>
          <Reveal>
            <div className={styles.sectionHeader}>
              <h2 className={styles.sectionTitle}>How DevHire works</h2>
              <p className={styles.sectionSubtitle}>Your journey to a new career in three simple steps.</p>
            </div>
          </Reveal>
          <div className={styles.stepsGrid}>
            <Reveal delay={0}>
              <div className={styles.step}>
                <div className={styles.stepNum}>01</div>
                <h3 className={styles.stepTitle}>Search</h3>
                <p className={styles.stepDesc}>Find opportunities matching your unique skills, experience level, and salary expectations.</p>
              </div>
            </Reveal>
            <Reveal delay={150}>
              <div className={styles.step}>
                <div className={styles.stepNum}>02</div>
                <h3 className={styles.stepTitle}>Apply</h3>
                <p className={styles.stepDesc}>Review detailed job descriptions, company culture, and apply directly with your DevHire profile.</p>
              </div>
            </Reveal>
            <Reveal delay={300}>
              <div className={styles.step}>
                <div className={styles.stepNum}>03</div>
                <h3 className={styles.stepTitle}>Track</h3>
                <p className={styles.stepDesc}>Track your applications from the initial screen to the final offer using our Kanban board.</p>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Statistics Section */}
      <section className={styles.section}>
        <div className={styles.container}>
          <Reveal>
            <div className={styles.statsGrid}>
              <div className={styles.statItem}>
                <div className={styles.statValue}>
                  <CountUp end={10} suffix="K+" />
                </div>
                <div className={styles.statLabel}>Active Jobs</div>
              </div>
              <div className={styles.statItem}>
                <div className={styles.statValue}>
                  <CountUp end={2.5} suffix="K+" />
                </div>
                <div className={styles.statLabel}>Companies</div>
              </div>
              <div className={styles.statItem}>
                <div className={styles.statValue}>
                  <CountUp end={8} suffix="K+" />
                </div>
                <div className={styles.statLabel}>Candidates</div>
              </div>
              <div className={styles.statItem}>
                <div className={styles.statValue}>
                  <CountUp end={95} suffix="%" />
                </div>
                <div className={styles.statLabel}>Success Rate</div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* CTA Section */}
      <section className={styles.section}>
        <div className={styles.container}>
          <Reveal>
            <div className={styles.cta}>
              <h2 className={styles.sectionTitle}>Ready to find your next opportunity?</h2>
              <p className={styles.sectionSubtitle}>Join DevHire today and take the next step in your career journey.</p>
              <div className={styles.ctaButtons}>
                <Link to="/jobs" style={{ display: 'flex' }}>
                  <Button variant="primary" size="lg" style={{ width: '100%' }}>Explore Jobs</Button>
                </Link>
                <Link to="/profile" style={{ display: 'flex' }}>
                  <Button variant="outline" size="lg" style={{ width: '100%' }}>Create Profile</Button>
                </Link>
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    </div>
  );
};
