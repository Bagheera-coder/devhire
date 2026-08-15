import React, { useState, useMemo } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ClipboardList, Plus, Search, Filter, X, AlertTriangle, MoreHorizontal, Briefcase, MapPin, DollarSign } from 'lucide-react';
import { useApplications, APPLICATION_STATUSES } from '../../hooks/useApplications';
import { Button } from '../../components/ui/Button/Button';
import { Input } from '../../components/ui/Input/Input';
import { Badge } from '../../components/ui/Badge/Badge';
import { useDebounce } from '../../hooks/useDebounce';
import styles from './Applications.module.css';

// --- Subcomponents for Modals ---

const AddApplicationModal = ({ isOpen, onClose, onSubmit }) => {
  const [formData, setFormData] = useState({
    jobTitle: '',
    company: '',
    location: '',
    salary: '',
    jobType: 'Full-time',
    workMode: 'Remote',
    status: APPLICATION_STATUSES.APPLIED,
    dateApplied: new Date().toISOString().split('T')[0],
    notes: ''
  });

  if (!isOpen) return null;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Format date to match existing "Oct 24, 2023" style
    const dateObj = new Date(formData.dateApplied);
    const formattedDate = dateObj.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
    
    onSubmit({
      ...formData,
      dateApplied: formattedDate
    });
    onClose();
  };

  return (
    <div className={styles.modalOverlay} onClick={onClose}>
      <div className={styles.modalContent} onClick={e => e.stopPropagation()}>
        <div className={styles.modalHeader}>
          <h2 className={styles.modalTitle}>Add Application</h2>
          <button onClick={onClose} style={{ background: 'none', border: 'none', cursor: 'pointer' }}><X size={24} color="var(--text-secondary)" /></button>
        </div>
        <form onSubmit={handleSubmit}>
          <div className={styles.formGrid}>
            <div className={styles.formGroup}>
              <label className={styles.label}>Job Title *</label>
              <input name="jobTitle" required value={formData.jobTitle} onChange={handleChange} className={styles.input} placeholder="e.g. Frontend Engineer" />
            </div>
            <div className={styles.formGroup}>
              <label className={styles.label}>Company *</label>
              <input name="company" required value={formData.company} onChange={handleChange} className={styles.input} placeholder="e.g. Acme Corp" />
            </div>
            <div className={styles.formGroup}>
              <label className={styles.label}>Location</label>
              <input name="location" value={formData.location} onChange={handleChange} className={styles.input} placeholder="e.g. New York, NY" />
            </div>
            <div className={styles.formGroup}>
              <label className={styles.label}>Salary</label>
              <input name="salary" value={formData.salary} onChange={handleChange} className={styles.input} placeholder="e.g. $120k - $140k" />
            </div>
            <div className={styles.formGroup}>
              <label className={styles.label}>Job Type</label>
              <select name="jobType" value={formData.jobType} onChange={handleChange} className={styles.select}>
                <option value="Full-time">Full-time</option>
                <option value="Part-time">Part-time</option>
                <option value="Contract">Contract</option>
                <option value="Freelance">Freelance</option>
              </select>
            </div>
            <div className={styles.formGroup}>
              <label className={styles.label}>Work Mode</label>
              <select name="workMode" value={formData.workMode} onChange={handleChange} className={styles.select}>
                <option value="Remote">Remote</option>
                <option value="Hybrid">Hybrid</option>
                <option value="On-site">On-site</option>
              </select>
            </div>
            <div className={styles.formGroup}>
              <label className={styles.label}>Date Applied *</label>
              <input type="date" required name="dateApplied" value={formData.dateApplied} onChange={handleChange} className={styles.input} />
            </div>
            <div className={styles.formGroup}>
              <label className={styles.label}>Status</label>
              <select name="status" value={formData.status} onChange={handleChange} className={styles.select}>
                <option value={APPLICATION_STATUSES.APPLIED}>Applied</option>
                <option value={APPLICATION_STATUSES.SCREENING}>Screening</option>
                <option value={APPLICATION_STATUSES.INTERVIEW}>Interview</option>
                <option value={APPLICATION_STATUSES.TECHNICAL}>Technical</option>
                <option value={APPLICATION_STATUSES.HR}>HR</option>
                <option value={APPLICATION_STATUSES.OFFER}>Offer</option>
                <option value={APPLICATION_STATUSES.REJECTED}>Rejected</option>
              </select>
            </div>
            <div className={`${styles.formGroup} ${styles.fullWidth}`}>
              <label className={styles.label}>Notes</label>
              <textarea name="notes" value={formData.notes} onChange={handleChange} className={styles.textarea} placeholder="Any details about the application process..." />
            </div>
          </div>
          <div className={styles.modalActions}>
            <Button type="button" variant="ghost" onClick={onClose}>Cancel</Button>
            <Button type="submit" variant="primary">Save Application</Button>
          </div>
        </form>
      </div>
    </div>
  );
};

const ApplicationDetailsModal = ({ application, isOpen, onClose, onUpdateNotes, onDelete }) => {
  if (!isOpen || !application) return null;
  
  const [notes, setNotes] = useState(application.notes || '');

  const handleSaveNotes = () => {
    onUpdateNotes(application.id, notes);
    onClose();
  };

  return (
    <div className={styles.modalOverlay} onClick={onClose}>
      <div className={styles.modalContent} onClick={e => e.stopPropagation()}>
        <div className={styles.modalHeader} style={{ marginBottom: 'var(--space-4)' }}>
          <div>
            <h2 className={styles.modalTitle}>{application.jobTitle}</h2>
            <div style={{ color: 'var(--text-secondary)' }}>{application.company}</div>
          </div>
          <button onClick={onClose} style={{ background: 'none', border: 'none', cursor: 'pointer' }}><X size={24} color="var(--text-secondary)" /></button>
        </div>
        
        <div style={{ display: 'flex', gap: 'var(--space-2)', marginBottom: 'var(--space-6)', flexWrap: 'wrap' }}>
          {application.location && <Badge variant="outline"><MapPin size={12} style={{marginRight: 4}}/> {application.location}</Badge>}
          {application.salary && <Badge variant="success"><DollarSign size={12} style={{marginRight: 4}}/> {application.salary}</Badge>}
          {application.jobType && <Badge variant="secondary"><Briefcase size={12} style={{marginRight: 4}}/> {application.jobType}</Badge>}
        </div>

        <div className={styles.formGroup} style={{ marginBottom: 'var(--space-6)' }}>
          <label className={styles.label}>Notes</label>
          <textarea 
            value={notes} 
            onChange={(e) => setNotes(e.target.value)} 
            className={styles.textarea} 
            placeholder="Add notes about interviews, recruiters, etc."
          />
        </div>

        <div className={styles.modalActions} style={{ justifyContent: 'space-between' }}>
          <Button type="button" variant="outline" style={{ color: '#ef4444', borderColor: '#ef4444' }} onClick={() => onDelete(application)}>
            Delete Application
          </Button>
          <div style={{ display: 'flex', gap: 'var(--space-3)' }}>
            <Button type="button" variant="ghost" onClick={onClose}>Cancel</Button>
            <Button type="button" variant="primary" onClick={handleSaveNotes}>Save Notes</Button>
          </div>
        </div>
      </div>
    </div>
  );
};

const DeleteConfirmModal = ({ isOpen, onClose, onConfirm }) => {
  if (!isOpen) return null;
  return (
    <div className={styles.modalOverlay} onClick={onClose}>
      <div className={`${styles.modalContent} ${styles.deleteConfirmModal}`} onClick={e => e.stopPropagation()}>
        <AlertTriangle size={48} className={styles.warningIcon} />
        <h2 className={styles.modalTitle} style={{ marginBottom: 'var(--space-2)' }}>Delete Application?</h2>
        <p style={{ color: 'var(--text-secondary)', marginBottom: 'var(--space-6)' }}>This action cannot be undone. It will be permanently removed from your tracker.</p>
        <div className={styles.modalActions} style={{ justifyContent: 'center' }}>
          <Button variant="ghost" onClick={onClose}>Cancel</Button>
          <Button variant="primary" style={{ backgroundColor: '#ef4444' }} onClick={onConfirm}>Delete</Button>
        </div>
      </div>
    </div>
  );
};

// --- Main Page Component ---

export const Applications = () => {
  const { applications, updateApplicationStatus, addCustomApplication, updateApplicationNotes, removeApplication } = useApplications();
  const navigate = useNavigate();

  // State for search and filter
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const debouncedSearch = useDebounce(searchTerm, 300);

  // Modal states
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [selectedAppForDetails, setSelectedAppForDetails] = useState(null);
  const [appToDelete, setAppToDelete] = useState(null);

  const columns = [
    { id: APPLICATION_STATUSES.APPLIED, title: 'Applied' },
    { id: APPLICATION_STATUSES.SCREENING, title: 'Screening' },
    { id: APPLICATION_STATUSES.INTERVIEW, title: 'Interview' },
    { id: APPLICATION_STATUSES.TECHNICAL, title: 'Technical' },
    { id: APPLICATION_STATUSES.HR, title: 'HR' },
    { id: APPLICATION_STATUSES.OFFER, title: 'Offer' },
    { id: APPLICATION_STATUSES.REJECTED, title: 'Rejected' }
  ];

  // Derived filtered state
  const filteredApplications = useMemo(() => {
    let result = applications;
    if (statusFilter !== 'all') {
      result = result.filter(app => app.status === statusFilter);
    }
    if (debouncedSearch) {
      const lowerSearch = debouncedSearch.toLowerCase();
      result = result.filter(app => 
        (app.jobTitle && app.jobTitle.toLowerCase().includes(lowerSearch)) ||
        (app.company && app.company.toLowerCase().includes(lowerSearch))
      );
    }
    // Sort by date (assuming basic chronological order for now, newest first based on id creation mostly, but date works too)
    return result.sort((a, b) => new Date(b.dateApplied) - new Date(a.dateApplied));
  }, [applications, statusFilter, debouncedSearch]);

  // Statistics
  const stats = useMemo(() => {
    return {
      total: applications.length,
      active: applications.filter(a => a.status !== APPLICATION_STATUSES.REJECTED).length,
      interviews: applications.filter(a => a.status === APPLICATION_STATUSES.INTERVIEW || a.status === APPLICATION_STATUSES.TECHNICAL).length,
      offers: applications.filter(a => a.status === APPLICATION_STATUSES.OFFER).length,
      rejected: applications.filter(a => a.status === APPLICATION_STATUSES.REJECTED).length,
    };
  }, [applications]);

  const handleDeleteConfirm = () => {
    if (appToDelete) {
      removeApplication(appToDelete.id);
      setAppToDelete(null);
      setSelectedAppForDetails(null); // Close details modal if open
    }
  };

  const clearFilters = () => {
    setSearchTerm('');
    setStatusFilter('all');
  };

  return (
    <div className={styles.applicationsPage}>
      <div className={styles.container}>
        
        <header className={styles.header}>
          <div>
            <h1 className={styles.title}>Application Tracker</h1>
            <p className={styles.subtitle}>Organize and track your job search progress.</p>
          </div>
          <Button variant="primary" leftIcon={<Plus size={18} />} onClick={() => setIsAddModalOpen(true)}>
            Add Application
          </Button>
        </header>

        {applications.length > 0 && (
          <div className={styles.statsContainer}>
            <div className={styles.statCard}>
              <div className={styles.statValue}>{stats.total}</div>
              <div className={styles.statLabel}>Total Apps</div>
            </div>
            <div className={styles.statCard}>
              <div className={styles.statValue}>{stats.active}</div>
              <div className={styles.statLabel}>Active</div>
            </div>
            <div className={styles.statCard}>
              <div className={styles.statValue}>{stats.interviews}</div>
              <div className={styles.statLabel}>Interviews</div>
            </div>
            <div className={styles.statCard}>
              <div className={styles.statValue}>{stats.offers}</div>
              <div className={styles.statLabel}>Offers</div>
            </div>
            <div className={styles.statCard}>
              <div className={styles.statValue}>{stats.rejected}</div>
              <div className={styles.statLabel}>Rejected</div>
            </div>
          </div>
        )}

        {applications.length > 0 && (
          <div className={styles.controlsBar}>
            <Input 
              placeholder="Search by job title or company..." 
              leftIcon={<Search size={18} />}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className={styles.searchInput}
            />
            <div style={{ display: 'flex', gap: 'var(--space-3)', alignItems: 'center' }}>
              <Filter size={18} color="var(--text-secondary)" />
              <select className={styles.filterSelect} value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)}>
                <option value="all">All Statuses</option>
                {columns.map(col => (
                  <option key={col.id} value={col.id}>{col.title}</option>
                ))}
              </select>
              {(searchTerm || statusFilter !== 'all') && (
                <Button variant="ghost" size="sm" onClick={clearFilters}>Clear</Button>
              )}
            </div>
          </div>
        )}

        {applications.length === 0 ? (
          <div className={styles.emptyState}>
            <ClipboardList size={48} color="var(--text-tertiary)" style={{ marginBottom: '1rem' }} />
            <h2 className={styles.title}>No applications yet</h2>
            <p className={styles.subtitle} style={{ marginBottom: '2rem' }}>
              Start tracking your job applications and keep everything organized in one place.
            </p>
            <div style={{ display: 'flex', gap: 'var(--space-4)' }}>
              <Button variant="primary" onClick={() => setIsAddModalOpen(true)}>Add Application</Button>
              <Button variant="outline" onClick={() => navigate('/jobs')}>Find Jobs</Button>
            </div>
          </div>
        ) : filteredApplications.length === 0 ? (
          <div className={styles.emptyState} style={{ padding: 'var(--space-8) 0' }}>
            <p className={styles.subtitle}>No applications match your search criteria.</p>
            <Button variant="ghost" onClick={clearFilters} style={{ marginTop: '1rem' }}>Clear filters</Button>
          </div>
        ) : (
          <div className={styles.board}>
            {statusFilter === 'all' ? (
              columns.map(column => {
                const columnApps = filteredApplications.filter(app => app.status === column.id);
                return (
                  <div key={column.id} className={styles.column}>
                    <div className={styles.columnHeader}>
                      {column.title}
                      <span className={styles.columnCount}>{columnApps.length}</span>
                    </div>
                    <div className={styles.columnBody}>
                      {columnApps.map(app => (
                        <div key={app.id} className={styles.kanbanCard} onClick={() => setSelectedAppForDetails(app)}>
                          <div className={styles.cardHeader}>
                            <div>
                              <div className={styles.jobTitle}>{app.jobTitle}</div>
                              <div className={styles.companyName}>{app.company}</div>
                            </div>
                            <Button 
                              variant="ghost" 
                              size="icon" 
                              style={{ width: 28, height: 28 }}
                              onClick={(e) => { e.stopPropagation(); setSelectedAppForDetails(app); }}
                            >
                              <MoreHorizontal size={16} />
                            </Button>
                          </div>
                          <div className={styles.cardFooter}>
                            <span className={styles.date}>{app.dateApplied}</span>
                            <select 
                              className={styles.actionSelect}
                              value={app.status}
                              onClick={(e) => e.stopPropagation()}
                              onChange={(e) => {
                                e.stopPropagation();
                                updateApplicationStatus(app.id, e.target.value);
                              }}
                            >
                              {columns.map(c => <option key={c.id} value={c.id}>{c.title}</option>)}
                            </select>
                          </div>
                        </div>
                      ))}
                      {columnApps.length === 0 && (
                        <div style={{ textAlign: 'center', color: 'var(--text-tertiary)', fontSize: '0.875rem', marginTop: '1rem' }}>
                          Empty
                        </div>
                      )}
                    </div>
                  </div>
                );
              })
            ) : (
              // If a specific status is filtered, just show a list view instead of columns
              <div style={{ width: '100%', display: 'flex', flexDirection: 'column', gap: 'var(--space-4)' }}>
                {filteredApplications.map(app => (
                  <div key={app.id} className={styles.kanbanCard} onClick={() => setSelectedAppForDetails(app)} style={{ maxWidth: '600px' }}>
                    <div className={styles.cardHeader}>
                      <div>
                        <div className={styles.jobTitle}>{app.jobTitle}</div>
                        <div className={styles.companyName}>{app.company}</div>
                      </div>
                    </div>
                    <div className={styles.cardFooter}>
                       <span className={styles.date}>{app.dateApplied}</span>
                       <Badge variant="outline">{columns.find(c => c.id === app.status)?.title}</Badge>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

      </div>

      {/* Modals */}
      <AddApplicationModal 
        isOpen={isAddModalOpen} 
        onClose={() => setIsAddModalOpen(false)} 
        onSubmit={addCustomApplication} 
      />
      
      <ApplicationDetailsModal 
        application={selectedAppForDetails}
        isOpen={!!selectedAppForDetails}
        onClose={() => setSelectedAppForDetails(null)}
        onUpdateNotes={updateApplicationNotes}
        onDelete={(app) => setAppToDelete(app)}
      />

      <DeleteConfirmModal 
        isOpen={!!appToDelete}
        onClose={() => setAppToDelete(null)}
        onConfirm={handleDeleteConfirm}
      />
    </div>
  );
};
