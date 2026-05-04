import React, { useState, useEffect } from 'react';
import { Trash2, Edit2, Plus, Search, Calendar, Clock, User, MapPin, Send } from 'lucide-react';
import { Toaster, toast } from 'sonner';
import AppLayout from '../../components/layout/AppLayout';
import Button from '../../components/common/Button';
import Modal from '../../components/common/Modal';
import Card from '../../components/common/Card';
import Loader from '../../components/common/Loader';
import FormField from '../../components/common/FormField';
import { interviewService } from '../../services/interviewService';
import { getCandidates } from '../../services/candidateService';
import { getJobs } from '../../services/jobService';

const Interviews = () => {
  const [interviews, setInterviews] = useState([]);
  const [todayInterviews, setTodayInterviews] = useState([]);
  const [upcomingInterviews, setUpcomingInterviews] = useState([]);
  const [loading, setLoading] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [feedbackModal, setFeedbackModal] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [selectedInterview, setSelectedInterview] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('all'); // all, today, upcoming
  const [candidates, setCandidates] = useState([]);
  const [jobs, setJobs] = useState([]);

  const [formData, setFormData] = useState({
    candidate_id: '',
    job_id: '',
    interviewer_id: '',
    scheduled_date: '',
    duration_minutes: '30',
    interview_type: 'screening',
    meet_link: '',
    notes: '',
  });

  const [feedbackData, setFeedbackData] = useState({
    feedback: '',
    rating: '5',
    status: 'scheduled',
  });

  useEffect(() => {
    fetchAllData();
  }, []);

  const fetchAllData = async () => {
    setLoading(true);
    try {
      const [interviewsData, todayData, upcomingData, candidatesData, jobsData] = await Promise.all([
        interviewService.getInterviews(),
        interviewService.getTodayInterviews(),
        interviewService.getUpcomingInterviews(),
        getCandidates(),
        getJobs(),
      ]);
      
      setInterviews(Array.isArray(interviewsData) ? interviewsData : []);
      setTodayInterviews(Array.isArray(todayData) ? todayData : []);
      setUpcomingInterviews(Array.isArray(upcomingData) ? upcomingData : []);
      setCandidates(Array.isArray(candidatesData) ? candidatesData : []);
      setJobs(Array.isArray(jobsData) ? jobsData : []);
    } catch (error) {
      toast.error('Failed to fetch data');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleOpenModal = (interview = null) => {
    if (interview) {
      setEditingId(interview.id);
      setFormData({
        candidate_id: interview.candidate_id || '',
        job_id: interview.job_id || '',
        interviewer_id: interview.interviewer_id || '',
        scheduled_date: interview.scheduled_date || '',
        duration_minutes: interview.duration_minutes || '30',
        interview_type: interview.interview_type || 'screening',
        meet_link: interview.meet_link || '',
        notes: interview.notes || '',
      });
    } else {
      setEditingId(null);
      setFormData({
        candidate_id: '',
        job_id: '',
        interviewer_id: '',
        scheduled_date: '',
        duration_minutes: '30',
        interview_type: 'screening',
        meet_link: '',
        notes: '',
      });
    }
    setOpenModal(true);
  };

  const handleOpenFeedbackModal = (interview) => {
    setSelectedInterview(interview);
    setFeedbackData({
      feedback: '',
      rating: '5',
      status: interview.status || 'scheduled',
    });
    setFeedbackModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
    setEditingId(null);
  };

  const handleCloseFeedbackModal = () => {
    setFeedbackModal(false);
    setSelectedInterview(null);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleFeedbackChange = (e) => {
    const { name, value } = e.target;
    setFeedbackData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.candidate_id || !formData.job_id || !formData.scheduled_date) {
      toast.error('Please fill in all required fields');
      return;
    }

    setLoading(true);
    try {
      if (editingId) {
        await interviewService.updateInterview(editingId, formData);
        toast.success('Interview updated successfully');
      } else {
        await interviewService.scheduleInterview(formData);
        toast.success('Interview scheduled successfully');
      }
      handleCloseModal();
      fetchAllData();
    } catch (error) {
      toast.error(error.message || 'Failed to save interview');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleAddFeedback = async (e) => {
    e.preventDefault();

    if (!feedbackData.feedback) {
      toast.error('Please add feedback');
      return;
    }

    setLoading(true);
    try {
      await interviewService.addFeedback(selectedInterview.id, feedbackData);
      toast.success('Feedback added successfully');
      handleCloseFeedbackModal();
      fetchAllData();
    } catch (error) {
      toast.error(error.message || 'Failed to add feedback');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = async (id) => {
    if (window.confirm('Are you sure you want to cancel this interview?')) {
      setLoading(true);
      try {
        await interviewService.cancelInterview(id);
        toast.success('Interview cancelled successfully');
        fetchAllData();
      } catch (error) {
        toast.error(error.message || 'Failed to cancel interview');
        console.error(error);
      } finally {
        setLoading(false);
      }
    }
  };

  const getDisplayInterviews = () => {
    let data = interviews;
    
    if (filterType === 'today') {
      data = todayInterviews;
    } else if (filterType === 'upcoming') {
      data = upcomingInterviews;
    }

    return data.filter(interview =>
      interview.candidate_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      interview.job_title?.toLowerCase().includes(searchTerm.toLowerCase())
    );
  };

  const displayInterviews = getDisplayInterviews();

  if (loading && interviews.length === 0) {
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
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Interview Scheduling</h1>
        <p className="text-gray-600 mt-1">Manage and schedule candidate interviews</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <Card>
          <div className="flex items-center justify-between">
            <div>
              <div className="text-gray-500 text-sm">Total Interviews</div>
              <div className="text-3xl font-bold text-primary-600">{interviews.length}</div>
            </div>
            <Calendar className="text-primary-600" size={32} />
          </div>
        </Card>

        <Card>
          <div className="flex items-center justify-between">
            <div>
              <div className="text-gray-500 text-sm">Today</div>
              <div className="text-3xl font-bold text-warning-600">{todayInterviews.length}</div>
            </div>
            <Clock className="text-warning-600" size={32} />
          </div>
        </Card>

        <Card>
          <div className="flex items-center justify-between">
            <div>
              <div className="text-gray-500 text-sm">Upcoming</div>
              <div className="text-3xl font-bold text-success-600">{upcomingInterviews.length}</div>
            </div>
            <Calendar className="text-success-600" size={32} />
          </div>
        </Card>
      </div>

      {/* Filter and Search */}
      <Card className="mb-6">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-3 text-gray-400" size={20} />
              <input
                type="text"
                placeholder="Search by candidate or job..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
              />
            </div>
          </div>

          <div className="flex gap-2">
            <button
              onClick={() => setFilterType('all')}
              className={`px-4 py-2 rounded-lg font-medium transition ${
                filterType === 'all'
                  ? 'bg-primary-600 text-white'
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              All
            </button>
            <button
              onClick={() => setFilterType('today')}
              className={`px-4 py-2 rounded-lg font-medium transition ${
                filterType === 'today'
                  ? 'bg-primary-600 text-white'
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              Today
            </button>
            <button
              onClick={() => setFilterType('upcoming')}
              className={`px-4 py-2 rounded-lg font-medium transition ${
                filterType === 'upcoming'
                  ? 'bg-primary-600 text-white'
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              Upcoming
            </button>
          </div>

          <Button
            onClick={() => handleOpenModal()}
            className="flex items-center gap-2"
          >
            <Plus size={20} />
            Schedule Interview
          </Button>
        </div>
      </Card>

      {/* Interviews List */}
      <Card>
        {displayInterviews.length === 0 ? (
          <div className="text-center py-8">
            <Calendar className="mx-auto text-gray-400 mb-4" size={48} />
            <p className="text-gray-600">No interviews found</p>
          </div>
        ) : (
          <div className="space-y-4">
            {displayInterviews.map((interview) => (
              <div
                key={interview.id}
                className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition"
              >
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-start mb-3">
                  <div>
                    <div className="text-sm text-gray-500">Candidate</div>
                    <div className="font-semibold text-gray-900">{interview.candidate_name}</div>
                  </div>

                  <div>
                    <div className="text-sm text-gray-500">Job Position</div>
                    <div className="font-semibold text-gray-900">{interview.job_title}</div>
                  </div>

                  <div>
                    <div className="text-sm text-gray-500">Scheduled Date</div>
                    <div className="font-semibold text-gray-900">
                      {new Date(interview.scheduled_date).toLocaleDateString()}
                    </div>
                  </div>

                  <div>
                    <div className="text-sm text-gray-500">Type</div>
                    <div className="font-semibold text-gray-900">{interview.interview_type}</div>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-center mb-3 text-sm">
                  <div className="flex items-center gap-2 text-gray-600">
                    <Clock size={16} />
                    {interview.duration_minutes} mins
                  </div>

                  <div className="flex items-center gap-2 text-gray-600">
                    <User size={16} />
                    {interview.interviewer_name || 'Not assigned'}
                  </div>

                  <div>
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                      interview.status === 'scheduled'
                        ? 'bg-blue-100 text-blue-800'
                        : interview.status === 'completed'
                        ? 'bg-green-100 text-green-800'
                        : 'bg-gray-100 text-gray-800'
                    }`}>
                      {interview.status}
                    </span>
                  </div>

                  <div></div>
                </div>

                {interview.meet_link && (
                  <div className="mb-3 text-sm">
                    <a
                      href={interview.meet_link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-primary-600 hover:underline"
                    >
                      Join Meeting →
                    </a>
                  </div>
                )}

                <div className="flex gap-2 justify-end">
                  <Button
                    onClick={() => handleOpenFeedbackModal(interview)}
                    variant="secondary"
                    size="sm"
                    className="flex items-center gap-2"
                  >
                    <Send size={16} />
                    Feedback
                  </Button>

                  <Button
                    onClick={() => handleOpenModal(interview)}
                    variant="secondary"
                    size="sm"
                    className="flex items-center gap-2"
                  >
                    <Edit2 size={16} />
                    Edit
                  </Button>

                  <Button
                    onClick={() => handleCancel(interview.id)}
                    variant="danger"
                    size="sm"
                    className="flex items-center gap-2"
                  >
                    <Trash2 size={16} />
                    Cancel
                  </Button>
                </div>
              </div>
            ))}
          </div>
        )}
      </Card>

      {/* Schedule Interview Modal */}
      <Modal
        isOpen={openModal}
        onClose={handleCloseModal}
        title={editingId ? 'Edit Interview' : 'Schedule Interview'}
      >
        <form onSubmit={handleSubmit} className="space-y-4">
          <FormField
            label="Candidate"
            type="select"
            name="candidate_id"
            value={formData.candidate_id}
            onChange={handleInputChange}
            required
          >
            <option value="">Select Candidate</option>
            {candidates.map((c) => (
              <option key={c.id} value={c.id}>
                {c.full_name} - {c.email}
              </option>
            ))}
          </FormField>

          <FormField
            label="Job Position"
            type="select"
            name="job_id"
            value={formData.job_id}
            onChange={handleInputChange}
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
            value={formData.interview_type}
            onChange={handleInputChange}
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
            value={formData.scheduled_date}
            onChange={handleInputChange}
            required
          />

          <FormField
            label="Duration (minutes)"
            type="number"
            name="duration_minutes"
            value={formData.duration_minutes}
            onChange={handleInputChange}
            min="15"
            step="15"
          />

          <FormField
            label="Meeting Link"
            type="url"
            name="meet_link"
            value={formData.meet_link}
            onChange={handleInputChange}
            placeholder="https://meet.google.com/..."
          />

          <FormField
            label="Notes"
            type="textarea"
            name="notes"
            value={formData.notes}
            onChange={handleInputChange}
            placeholder="Add any notes about this interview..."
            rows="4"
          />

          <div className="flex gap-3 justify-end">
            <Button
              type="button"
              onClick={handleCloseModal}
              variant="secondary"
            >
              Cancel
            </Button>
            <Button type="submit" disabled={loading}>
              {loading ? 'Saving...' : editingId ? 'Update Interview' : 'Schedule Interview'}
            </Button>
          </div>
        </form>
      </Modal>

      {/* Feedback Modal */}
      <Modal
        isOpen={feedbackModal}
        onClose={handleCloseFeedbackModal}
        title="Add Interview Feedback"
      >
        <form onSubmit={handleAddFeedback} className="space-y-4">
          {selectedInterview && (
            <div className="bg-gray-50 p-3 rounded-lg mb-4">
              <p className="text-sm text-gray-600">
                <strong>Candidate:</strong> {selectedInterview.candidate_name}
              </p>
              <p className="text-sm text-gray-600">
                <strong>Position:</strong> {selectedInterview.job_title}
              </p>
            </div>
          )}

          <FormField
            label="Rating"
            type="select"
            name="rating"
            value={feedbackData.rating}
            onChange={handleFeedbackChange}
          >
            <option value="1">1 - Poor</option>
            <option value="2">2 - Below Average</option>
            <option value="3">3 - Average</option>
            <option value="4">4 - Good</option>
            <option value="5">5 - Excellent</option>
          </FormField>

          <FormField
            label="Status"
            type="select"
            name="status"
            value={feedbackData.status}
            onChange={handleFeedbackChange}
          >
            <option value="scheduled">Scheduled</option>
            <option value="completed">Completed</option>
            <option value="cancelled">Cancelled</option>
            <option value="rescheduled">Rescheduled</option>
          </FormField>

          <FormField
            label="Feedback"
            type="textarea"
            name="feedback"
            value={feedbackData.feedback}
            onChange={handleFeedbackChange}
            placeholder="Enter your feedback about the interview..."
            rows="5"
            required
          />

          <div className="flex gap-3 justify-end">
            <Button
              type="button"
              onClick={handleCloseFeedbackModal}
              variant="secondary"
            >
              Cancel
            </Button>
            <Button type="submit" disabled={loading}>
              {loading ? 'Adding...' : 'Add Feedback'}
            </Button>
          </div>
        </form>
      </Modal>
    </AppLayout>
  );
};

export default Interviews;
