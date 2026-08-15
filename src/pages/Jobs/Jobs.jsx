import React, { useState, useMemo } from 'react';
import { Search, MapPin, SlidersHorizontal, SearchX } from 'lucide-react';
import { Input } from '../../components/ui/Input/Input';
import { Button } from '../../components/ui/Button/Button';
import { JobCard } from '../../components/JobCard/JobCard';
import { FilterPanel } from '../../components/FilterPanel/FilterPanel';
import { useDebounce } from '../../hooks/useDebounce';
import { mockJobs } from '../../data/mockJobs';
import styles from './Jobs.module.css';

export const Jobs = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [locationTerm, setLocationTerm] = useState('');
  const [filters, setFilters] = useState({
    workModes: [],
    jobTypes: [],
    experienceLevels: []
  });
  
  const [isMobileFiltersOpen, setIsMobileFiltersOpen] = useState(false);

  // Debounce the search inputs to avoid heavy filtering on every keystroke
  const debouncedSearch = useDebounce(searchTerm, 300);
  const debouncedLocation = useDebounce(locationTerm, 300);

  // Memoize the filtered jobs list
  const filteredJobs = useMemo(() => {
    return mockJobs.filter(job => {
      // Keyword search
      const matchesSearch = !debouncedSearch || 
        job.title.toLowerCase().includes(debouncedSearch.toLowerCase()) ||
        job.company.toLowerCase().includes(debouncedSearch.toLowerCase()) ||
        job.skills.some(skill => skill.toLowerCase().includes(debouncedSearch.toLowerCase()));

      // Location search
      const matchesLocation = !debouncedLocation || 
        job.location.toLowerCase().includes(debouncedLocation.toLowerCase());

      // Checkbox filters (if array is empty, it means no filter is applied so it passes)
      const matchesWorkMode = filters.workModes.length === 0 || filters.workModes.includes(job.workMode);
      const matchesJobType = filters.jobTypes.length === 0 || filters.jobTypes.includes(job.type);
      
      // Experience filter matching (simplified for mock data)
      const matchesExperience = filters.experienceLevels.length === 0 || filters.experienceLevels.some(exp => {
        if (exp === 'Entry Level') return job.experience.includes('1'); // Simplification
        if (exp === '1-3 years') return job.experience.includes('1') || job.experience.includes('2');
        if (exp === '3-5 years') return job.experience.includes('3') || job.experience.includes('4');
        if (exp === '5+ years') return job.experience.includes('5');
        return true;
      });

      return matchesSearch && matchesLocation && matchesWorkMode && matchesJobType && matchesExperience;
    });
  }, [debouncedSearch, debouncedLocation, filters]);

  const clearFilters = () => {
    setFilters({ workModes: [], jobTypes: [], experienceLevels: [] });
    setSearchTerm('');
    setLocationTerm('');
  };

  return (
    <div className={styles.jobsPage}>
      <div className={styles.container}>
        
        <header className={styles.header}>
          <h1 className={styles.title}>Find your next job</h1>
          <p className={styles.subtitle}>Browse {mockJobs.length} open positions from top companies.</p>
        </header>

        <div className={styles.searchArea}>
          <Input 
            className={styles.searchInput}
            placeholder="Job title, keywords, or company" 
            leftIcon={<Search size={18} />} 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <Input 
            className={styles.searchInput}
            placeholder="City, state, or 'Remote'" 
            leftIcon={<MapPin size={18} />} 
            value={locationTerm}
            onChange={(e) => setLocationTerm(e.target.value)}
          />
          <Button 
            variant="outline" 
            className="md:hidden" 
            onClick={() => setIsMobileFiltersOpen(!isMobileFiltersOpen)}
          >
            <SlidersHorizontal size={18} />
            <span style={{ marginLeft: '8px' }}>Filters</span>
          </Button>
        </div>

        <div className={styles.mainContent}>
          {/* Sidebar Filters */}
          <div className={isMobileFiltersOpen ? 'block' : 'hidden lg:block'} style={{ display: isMobileFiltersOpen || window.innerWidth >= 1024 ? 'block' : 'none' }}>
            <FilterPanel filters={filters} setFilters={setFilters} onClear={clearFilters} />
          </div>

          {/* Results Area */}
          <div>
            <div className={styles.resultsHeader}>
              <span className={styles.resultsCount}>
                Showing <strong>{filteredJobs.length}</strong> {filteredJobs.length === 1 ? 'job' : 'jobs'}
              </span>
              {/* Could add Sort Dropdown here */}
            </div>

            {filteredJobs.length > 0 ? (
              <div className={styles.jobsGrid}>
                {filteredJobs.map(job => (
                  <JobCard key={job.id} job={job} />
                ))}
              </div>
            ) : (
              <div className={styles.emptyState}>
                <SearchX className={styles.emptyIcon} size={48} />
                <h3 className={styles.emptyTitle}>No jobs found</h3>
                <p className={styles.emptyDesc}>Try adjusting your search or filters to find what you're looking for.</p>
                <Button variant="outline" onClick={clearFilters}>Clear all filters</Button>
              </div>
            )}
          </div>
        </div>

      </div>
    </div>
  );
};
