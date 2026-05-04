import React, { useState, useEffect } from 'react';
import { Trash2, Edit2, Plus, Search, Mail, Phone, Briefcase, Award, MessageSquare, Calendar } from 'lucide-react';
import { Toaster, toast } from 'sonner';
import AppLayout from '../../components/layout/AppLayout';
import Button from '../../components/common/Button';
import Modal from '../../components/common/Modal';
import Card from '../../components/common/Card';
import Loader from '../../components/common/Loader';
import FormField from '../../components/common/FormField';
import {
  getCandidates,
  createCandidate,
  updateCandidate,
  updateCandidateStage,
  deleteCandidate,
} from '../../services/candidateService';
import { notesService } from '../../services/notesService';
import { interviewService } from '../../services/interviewService';
import { getJobs } from '../../services/jobService';

const Candidates = () => {
  const [candidates, setCandidates] = useState([]);
  const [loading, setLoading] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [notesModal, setNotesModal] = useState(false);
  const [interviewModal, setInterviewModal] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [selectedCandidate, setSelectedCandidate] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [candidateNotes, setCandidateNotes] = useState([]);
  const [candidateInterviews, setCandidateInterviews] = useState([]);
  const [candidateRating, setCandidateRating] = useState(null);
  const [jobs, setJobs] = useState([]);
  const [newNote, setNewNote] = useState('');
  const [formData, setFormData] = useState({
    full_name: '',
    email: '',
    phone: '',
    job_id: '',
    stage: 'Applied',
    experience_years: '',
    skills: '',
    resume_url: '',
    source: 'manual',
  });

  const [interviewData, setInterviewData] = useState({
    job_id: '',
    scheduled_date: '',
    interview_type: 'screening',
    duration_minutes: '30',
    meet_link: '',
    notes: '',
  });

  useEffect(() => {
    fetchCandidates();
    fetchJobs();
  }, []);

  const fetchCandidates = async () => {
    setLoading(true);
    try {
      const data = await getCandidates();
      setCandidates(Array.isArray(data) ? data : []);
    } catch (error) {
      toast.error('Failed to fetch candidates');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const fetchJobs = async () => {
    try {
      const data = await getJobs();
      setJobs(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error('Failed to fetch jobs', error);
    }
  };

  const fetchCandidateNotes = async (candidateId) => {
    try {
      const notes = await notesService.getCandidateNotes(candidateId);
      const rating = await notesService.getCandidateRating(candidateId);
      setCandidateNotes(Array.isArray(notes) ? notes : []);
      setCandidateRating(rating);
    } catch (error) {
      console.error('Failed to fetch notes', error);
      setCandidateNotes([]);
    }
  };

  const fetchCandidateInterviews = async (candidateId) => {
    try {
      const interviews = await interviewService.getInterviews({ candidate_id: candidateId });
      setCandidateInterviews(Array.isArray(interviews) ? interviews : []);
    } catch (error) {
      console.error('Failed to fetch interviews', error);
      setCandidateInterviews([]);
    }
  };

  const handleOpenModal = (candidate = null) => {
    if (candidate) {
      setEditingId(candidate.id);
      setFormData({
        full_name: candidate.full_name,
        email: candidate.email,
        phone: candidate.phone,
        job_id: candidate.job_id || '',
        stage: candidate.stage || 'Applied',
        experience_years: candidate.experience_years || '',
        skills: Array.isArray(candidate.skills) ? candidate.skills.join(', ') : candidate.skills || '',
        resume_url: candidate.resume_url || '',
        source: candidate.source || 'manual',
      });
    } else {
      setEditingId(null);
      setFormData({
        full_name: '',
        email: '',
        phone: '',
        job_id: '',
        stage: 'Applied',
        experience_years: '',
        skills: '',
        resume_url: '',
        source: 'manual',
      });
    }
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
    setEditingId(null);
  };

  const handleOpenNotesModal = async (candidate) => {
    setSelectedCandidate(candidate);
    setNotesModal(true);
    await fetchCandidateNotes(candidate.id);
  };

  const handleCloseNotesModal = () => {
    setNotesModal(false);
    setSelectedCandidate(null);
    setCandidateNotes([]);
    setNewNote('');
  };

  const handleOpenInterviewModal = async (candidate) => {
    setSelectedCandidate(candidate);
    setInterviewData({
      job_id: candidate.job_id || '',
      scheduled_date: '',
      interview_type: 'screening',
      duration_minutes: '30',
      meet_link: '',
      notes: '',
    });
    setInterviewModal(true);
    await fetchCandidateInterviews(candidate.id);
  };

  const handleCloseInterviewModal = () => {
    setInterviewModal(false);
    setSelectedCandidate(null);
    setCandidateInterviews([]);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleInterviewDataChange = (e) => {
    const { name, value } = e.target;
    setInterviewData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!formData.full_name || !formData.email) {
      toast.error('Please fill in required fields');
      return;
    }

    setLoading(true);
    try {
      // Prepare payload for candidate update (without stage)
      const payload = {
        full_name: formData.full_name,
        email: formData.email,
        phone: formData.phone,
        experience_years: formData.experience_years,
        skills: formData.skills ? formData.skills.split(',').map(s => s.trim()) : [],
        resume_url: formData.resume_url,
      };

      if (editingId) {
        // Get the original candidate to check if stage changed
        const originalCandidate = candidates.find(c => c.id === editingId);
        
        // Update candidate info
        await updateCandidate(editingId, payload);
        
        // If stage changed, update it separately
        if (originalCandidate && originalCandidate.stage !== formData.stage) {
          await updateCandidateStage(editingId, formData.stage);
        }
        
        toast.success('Candidate updated successfully');
      } else {
        await createCandidate({
          ...payload,
          job_id: formData.job_id || null,
          stage: formData.stage || 'Applied',
          source: formData.source || 'manual',
        });
        toast.success('Candidate added successfully');
      }
      handleCloseModal();
      fetchCandidates();
    } catch (error) {
      toast.error(error.message || 'Failed to save candidate');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this candidate?')) return;

    setLoading(true);
    try {
      await deleteCandidate(id);
      toast.success('Candidate deleted successfully');
      fetchCandidates();
    } catch (error) {
      toast.error(error.message || 'Failed to delete candidate');
    } finally {
      setLoading(false);
    }
  };

  const handleAddNote = async (e) => {
    e.preventDefault();

    if (!newNote.trim()) {
      toast.error('Please enter a note');
      return;
    }

    setLoading(true);
    try {
      await notesService.createNote({
        candidate_id: selectedCandidate.id,
        note_text: newNote,
      });
      toast.success('Note added successfully');
      setNewNote('');
      await fetchCandidateNotes(selectedCandidate.id);
    } catch (error) {
      toast.error(error.message || 'Failed to add note');
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteNote = async (noteId) => {
    if (!window.confirm('Are you sure you want to delete this note?')) return;

    setLoading(true);
    try {
      await notesService.deleteNote(noteId);
      toast.success('Note deleted successfully');
      await fetchCandidateNotes(selectedCandidate.id);
    } catch (error) {
      toast.error(error.message || 'Failed to delete note');
    } finally {
      setLoading(false);
    }
  };

  const handleScheduleInterview = async (e) => {
    e.preventDefault();

    if (!interviewData.job_id || !interviewData.scheduled_date) {
      toast.error('Please fill in all required fields');
      return;
    }

    setLoading(true);
    try {
      await interviewService.scheduleInterview({
        candidate_id: selectedCandidate.id,
        ...interviewData,
      });
      toast.success('Interview scheduled successfully');
      handleCloseInterviewModal();
      fetchCandidates();
    } catch (error) {
      toast.error(error.message || 'Failed to schedule interview');
    } finally {
      setLoading(false);
    }
  };

  const filteredCandidates = candidates.filter(candidate =>
    candidate.full_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    candidate.email?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const stageColors = {
    'Applied': 'bg-blue-100 text-blue-800',
    'Screening': 'bg-yellow-100 text-yellow-800',
    'Interview': 'bg-purple-100 text-purple-800',
    'Final Round': 'bg-orange-100 text-orange-800',
    'Selected': 'bg-green-100 text-green-800',
    'Rejected': 'bg-red-100 text-red-800',
  };

  if (loading && candidates.length === 0) {
    return (
      <AppLayout>
        <div className="flex justify-center items-center h-96">
          <Loader />
        </div>
      </AppLayout>
    );
  }

  return (
    <AppLayout>
      <Toaster />
      
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Candidates</h1>
          <p className="text-gray-600 mt-1">Manage job candidates and track their progress</p>
        </div>
        <Button
          onClick={() => handleOpenModal()}
          className="flex items-center gap-2 bg-primary-600 hover:bg-primary-700"
        >
          <Plus size={20} /> Add Candidate
        </Button>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
        <Card>
          <div className="text-gray-500 text-sm font-medium">Total Candidates</div>
          <div className="text-3xl font-bold text-primary-600">{candidates.length}</div>
        </Card>
        <Card>
          <div className="text-gray-500 text-sm font-medium">In Interview</div>
          <div className="text-3xl font-bold text-warning-600">
            {candidates.filter(c => c.stage === 'Interview').length}
          </div>
        </Card>
        <Card>
          <div className="text-gray-500 text-sm font-medium">Selected</div>
          <div className="text-3xl font-bold text-success-600">
            {candidates.filter(c => c.stage === 'Selected').length}
          </div>
        </Card>
        <Card>
          <div className="text-gray-500 text-sm font-medium">Rejected</div>
          <div className="text-3xl font-bold text-danger-600">
            {candidates.filter(c => c.stage === 'Rejected').length}
          </div>
        </Card>
      </div>

      {/* Search */}
      <div className="mb-6 relative">
        <Search className="absolute left-3 top-3 text-gray-400" size={20} />
        <input
          type="text"
          placeholder="Search candidates by name or email..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
        />
      </div>

      {/* Candidates Table */}
      {filteredCandidates.length === 0 ? (
        <Card>
          <div className="text-center py-8 text-gray-500">
            <p>No candidates found. Add your first candidate to get started.</p>
          </div>
        </Card>
      ) : (
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Candidate Name</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Email</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Phone</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Experience</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Stage</th>
                  <th className="px-6 py-3 text-center text-sm font-semibold text-gray-700">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredCandidates.map((candidate) => (
                  <tr key={candidate.id} className="border-b border-gray-200 hover:bg-gray-50 transition">
                    <td className="px-6 py-4">
                      <div className="font-medium text-gray-900">{candidate.full_name}</div>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600">
                      <a href={`mailto:${candidate.email}`} className="hover:text-primary-600">
                        {candidate.email}
                      </a>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600">{candidate.phone || '-'}</td>
                    <td className="px-6 py-4 text-sm text-gray-600">
                      {candidate.experience_years ? `${candidate.experience_years} years` : '-'}
                    </td>
                    <td className="px-6 py-4 text-sm">
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${stageColors[candidate.stage] || 'bg-gray-100'}`}>
                        {candidate.stage}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-center">
                      <div className="flex justify-center gap-2">
                        <button
                          onClick={() => handleOpenNotesModal(candidate)}
                          className="p-2 text-blue-600 hover:bg-blue-50 rounded transition"
                          title="View/Add Notes"
                        >
                          <MessageSquare size={18} />
                        </button>
                        <button
                          onClick={() => handleOpenInterviewModal(candidate)}
                          className="p-2 text-purple-600 hover:bg-purple-50 rounded transition"
                          title="Schedule Interview"
                        >
                          <Calendar size={18} />
                        </button>
                        <button
                          onClick={() => handleOpenModal(candidate)}
                          className="p-2 text-primary-600 hover:bg-primary-50 rounded transition"
                          title="Edit"
                        >
                          <Edit2 size={18} />
                        </button>
                        <button
                          onClick={() => handleDelete(candidate.id)}
                          className="p2 text-danger-600 hover:bg-danger-50 rounded transition"
                          title="Delete"
                        >
                          <Trash2 size={18} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Modal */}
      <Modal open={openModal} onClose={handleCloseModal} title={editingId ? 'Edit Candidate' : 'Add New Candidate'}>
        <form onSubmit={handleSubmit} className="space-y-4 max-h-96 overflow-y-auto">
          <FormField
            label="Full Name"
            name="full_name"
            value={formData.full_name}
            onChange={handleInputChange}
            placeholder="John Doe"
            required
          />

          <FormField
            label="Email"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleInputChange}
            placeholder="john@example.com"
            required
          />

          <FormField
            label="Phone"
            name="phone"
            type="tel"
            value={formData.phone}
            onChange={handleInputChange}
            placeholder="+1 (555) 123-4567"
          />

          <FormField
            label="Experience (Years)"
            name="experience_years"
            type="number"
            value={formData.experience_years}
            onChange={handleInputChange}
          />

          <FormField
            label="Skills (comma separated)"
            name="skills"
            value={formData.skills}
            onChange={handleInputChange}
            placeholder="React, Node.js, MongoDB"
          />

          <FormField
            label="Resume URL"
            name="resume_url"
            type="url"
            value={formData.resume_url}
            onChange={handleInputChange}
            placeholder="https://example.com/resume.pdf"
          />

          <FormField
            label="Stage"
            name="stage"
            type="select"
            value={formData.stage}
            onChange={handleInputChange}
            options={[
              { value: 'Applied', label: 'Applied' },
              { value: 'Screening', label: 'Screening' },
              { value: 'Interview', label: 'Interview' },
              { value: 'Final Round', label: 'Final Round' },
              { value: 'Selected', label: 'Selected' },
              { value: 'Rejected', label: 'Rejected' },
            ]}
          />

          <FormField
            label="Source"
            name="source"
            type="select"
            value={formData.source}
            onChange={handleInputChange}
            options={[
              { value: 'manual', label: 'Manual' },
              { value: 'linkedin', label: 'LinkedIn' },
              { value: 'referral', label: 'Referral' },
              { value: 'job_board', label: 'Job Board' },
              { value: 'other', label: 'Other' },
            ]}
          />

          <div className="flex gap-3 pt-4">
            <Button
              type="submit"
              disabled={loading}
              className="flex-1 bg-primary-600 hover:bg-primary-700"
            >
              {loading ? 'Saving...' : 'Save Candidate'}
            </Button>
            <Button
              type="button"
              onClick={handleCloseModal}
              className="flex-1 bg-gray-500 hover:bg-gray-600"
            >
              Cancel
            </Button>
          </div>
        </form>
      </Modal>

      {/* Notes Modal */}
      <Modal
        isOpen={notesModal}
        onClose={handleCloseNotesModal}
        title={`Notes for ${selectedCandidate?.full_name}`}
      >
        <div className="space-y-4 max-h-96 overflow-y-auto">
          {candidateRating && (
            <div className="bg-blue-50 p-3 rounded-lg">
              <div className="text-sm text-gray-600">
                <strong>Candidate Rating:</strong> {candidateRating.rating || 'Not rated yet'}
              </div>
            </div>
          )}

          {candidateNotes.length === 0 ? (
            <p className="text-gray-500 text-center py-4">No notes yet. Add your first note below.</p>
          ) : (
            <div className="space-y-3">
              {candidateNotes.map((note) => (
                <div key={note.id} className="bg-gray-50 p-3 rounded-lg">
                  <div className="flex justify-between items-start mb-2">
                    <div className="text-sm text-gray-600">
                      {new Date(note.created_at).toLocaleDateString()}
                    </div>
                    <button
                      onClick={() => handleDeleteNote(note.id)}
                      className="text-red-600 hover:bg-red-50 p-1 rounded"
                    >
                      <Trash2 size={14} />
                    </button>
                  </div>
                  <p className="text-gray-900 text-sm">{note.note_text}</p>
                </div>
              ))}
            </div>
          )}

          <form onSubmit={handleAddNote} className="border-t pt-4">
            <FormField
              label="Add Note"
              type="textarea"
              value={newNote}
              onChange={(e) => setNewNote(e.target.value)}
              placeholder="Add a note about this candidate..."
              rows="3"
            />

            <div className="flex gap-3 justify-end mt-3">
              <Button
                type="button"
                onClick={handleCloseNotesModal}
                variant="secondary"
              >
                Close
              </Button>
              <Button
                type="submit"
                disabled={loading}
              >
                {loading ? 'Adding...' : 'Add Note'}
              </Button>
            </div>
          </form>
        </div>
      </Modal>

      {/* Interview Modal */}
      <Modal
        isOpen={interviewModal}
        onClose={handleCloseInterviewModal}
        title={`Schedule Interview - ${selectedCandidate?.full_name}`}
      >
        <div className="space-y-4 max-h-96 overflow-y-auto">
          {candidateInterviews.length > 0 && (
            <div className="bg-blue-50 p-3 rounded-lg mb-4">
              <p className="text-sm font-semibold text-gray-900 mb-2">Scheduled Interviews:</p>
              {candidateInterviews.map((interview) => (
                <div key={interview.id} className="text-sm text-gray-700 mb-2">
                  <div><strong>{interview.interview_type}</strong> - {new Date(interview.scheduled_date).toLocaleDateString()}</div>
                  <div className="text-gray-600">Status: {interview.status}</div>
                </div>
              ))}
            </div>
          )}

          <form onSubmit={handleScheduleInterview} className="space-y-4">
            <FormField
              label="Job Position"
              type="select"
              name="job_id"
              value={interviewData.job_id}
              onChange={handleInterviewDataChange}
              required
            >
              <option value="">Select Job</option>
              {jobs.map((j) => (
                <option key={j.id} value={j.id}>
                  {j.title} - {j.department}
                </option>
              ))}
            </FormField>

            <FormField
              label="Interview Type"
              type="select"
              name="interview_type"
              value={interviewData.interview_type}
              onChange={handleInterviewDataChange}
            >
              <option value="screening">Screening</option>
              <option value="technical">Technical</option>
              <option value="hr">HR</option>
              <option value="final">Final Round</option>
              <option value="other">Other</option>
            </FormField>

            <FormField
              label="Scheduled Date & Time"
              type="datetime-local"
              name="scheduled_date"
              value={interviewData.scheduled_date}
              onChange={handleInterviewDataChange}
              required
            />

            <FormField
              label="Duration (minutes)"
              type="number"
              name="duration_minutes"
              value={interviewData.duration_minutes}
              onChange={handleInterviewDataChange}
              min="15"
              step="15"
            />

            <FormField
              label="Meeting Link"
              type="url"
              name="meet_link"
              value={interviewData.meet_link}
              onChange={handleInterviewDataChange}
              placeholder="https://meet.google.com/..."
            />

            <FormField
              label="Notes"
              type="textarea"
              name="notes"
              value={interviewData.notes}
              onChange={handleInterviewDataChange}
              placeholder="Add any notes about this interview..."
              rows="3"
            />

            <div className="flex gap-3 justify-end">
              <Button
                type="button"
                onClick={handleCloseInterviewModal}
                variant="secondary"
              >
                Cancel
              </Button>
              <Button
                type="submit"
                disabled={loading}
              >
                {loading ? 'Scheduling...' : 'Schedule Interview'}
              </Button>
            </div>
          </form>
        </div>
      </Modal>
    </AppLayout>
  );
};

export default Candidates;

