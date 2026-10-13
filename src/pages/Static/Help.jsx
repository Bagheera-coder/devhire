import React, { useState } from 'react';
import { Search, ChevronDown, ChevronUp } from 'lucide-react';
import { Input } from '../../components/ui/Input/Input';
import styles from './StaticPage.module.css';

const faqs = [
  {
    question: "How do I search for jobs?",
    answer: "Navigate to the 'Find Jobs' page using the navigation bar. You can use the search bar to look for specific keywords or job titles, and use the filter panel on the left to narrow down by salary, location, and job type."
  },
  {
    question: "How do I save a job?",
    answer: "On any job card or job details page, click the 'Save Job' button (the bookmark icon). You can view all your saved jobs by clicking 'Saved Jobs' in the navigation bar."
  },
  {
    question: "How do I track an application?",
    answer: "Click 'Apply Now' on a job posting to automatically add it to your Application Tracker. You can also manually add custom applications directly from the Application Tracker dashboard by clicking 'Add Application'."
  },
  {
    question: "How do I change an application's status?",
    answer: "In the Application Tracker, locate the application card. Use the dropdown menu at the bottom of the card to change its status (e.g., from Applied to Interviewing). The card will automatically move to the correct column."
  },
  {
    question: "How do I update my profile?",
    answer: "Click the user avatar in the top right corner and select 'Profile'. Note: Since this is a demo environment, profile editing functionality is disabled."
  },
  {
    question: "How does dark mode work?",
    answer: "Click the sun/moon icon in the top right navigation bar to toggle between light and dark themes. Your preference is saved to your browser's local storage and will persist across sessions."
  }
];

export const Help = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [openIndex, setOpenIndex] = useState(0);

  const filteredFaqs = faqs.filter(faq => 
    faq.question.toLowerCase().includes(searchTerm.toLowerCase()) || 
    faq.answer.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className={styles.page}>
      <div className={styles.container}>
        <header className={styles.header}>
          <h1 className={styles.title}>Help Center</h1>
          <p className={styles.subtitle}>
            Find answers to common questions about using DevHire.
          </p>
        </header>

        <div className={styles.searchBox}>
          <Input 
            placeholder="Search for answers..." 
            leftIcon={<Search size={18} />}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        {filteredFaqs.length > 0 ? (
          <div className={styles.accordion}>
            {filteredFaqs.map((faq, index) => {
              const isOpen = openIndex === index;
              return (
                <div key={index} className={styles.accordionItem}>
                  <button 
                    className={styles.accordionButton}
                    onClick={() => setOpenIndex(isOpen ? -1 : index)}
                    aria-expanded={isOpen}
                  >
                    {faq.question}
                    {isOpen ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                  </button>
                  {isOpen && (
                    <div className={styles.accordionContent}>
                      {faq.answer}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        ) : (
          <div style={{ textAlign: 'center', padding: 'var(--space-8) 0', color: 'var(--text-secondary)' }}>
            No matching questions found for "{searchTerm}".
          </div>
        )}
      </div>
    </div>
  );
};
