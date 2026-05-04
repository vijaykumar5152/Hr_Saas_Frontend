import React, { useState, useEffect } from 'react';
import { Trash2, Edit2, Plus, Search, MapPin, DollarSign, Clock, Users } from 'lucide-react';
import { Toaster, toast } from 'sonner';
import AppLayout from '../../components/layout/AppLayout';
import Button from '../../components/common/Button';
import Modal from '../../components/common/Modal';
import Card from '../../components/common/Card';
import Loader from '../../components/common/Loader';
import FormField from '../../components/common/FormField';
import {
  getJobs,
  createJob,
  updateJob,
  deleteJob,
} from '../../services/jobService';

const Jobs = () => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    location: '',
    salary_min: '',
    salary_max: '',
    department: '',
    requirements: '',
    status: 'open',
  });

  useEffect(() => {
    fetchJobs();
  }, []);

  const fetchJobs = async () => {
    setLoading(true);
    try {
      const data = await getJobs();
      setJobs(Array.isArray(data) ? data : []);
    } catch (error) {
      toast.error('Failed to fetch jobs');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleOpenModal = (job = null) => {
    if (job) {
      setEditingId(job.id);
      setFormData({
        title: job.title,
        description: job.description,
        location: job.location,
        salary_min: job.salary_min,
        salary_max: job.salary_max,
        department: job.department,
        requirements: job.requirements,
        status: job.status,
      });
    } else {
      setEditingId(null);
      setFormData({
        title: '',
        description: '',
        location: '',
        salary_min: '',
        salary_max: '',
        department: '',
        requirements: '',
        status: 'open',
      });
    }
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
    setEditingId(null);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!formData.title || !formData.location || !formData.department) {
      toast.error('Please fill in all required fields');
      return;
    }

    setLoading(true);
    try {
      if (editingId) {
        await updateJob(editingId, formData);
        toast.success('Job updated successfully');
      } else {
        await createJob(formData);
        toast.success('Job posted successfully');
      }
      handleCloseModal();
      fetchJobs();
    } catch (error) {
      toast.error(error.message || 'Failed to save job');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this job?')) return;

    setLoading(true);
    try {
      await deleteJob(id);
      toast.success('Job deleted successfully');
      fetchJobs();
    } catch (error) {
      toast.error(error.message || 'Failed to delete job');
    } finally {
      setLoading(false);
    }
  };

  const filteredJobs = jobs.filter(job =>
    (job.title?.toLowerCase().includes(searchTerm.toLowerCase())) ||
    (job.department?.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  if (loading && jobs.length === 0) {
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
          <h1 className="text-3xl font-bold text-gray-900">Job Postings</h1>
          <p className="text-gray-600 mt-1">Create and manage your job openings</p>
        </div>
        <Button
          onClick={() => handleOpenModal()}
          className="flex items-center gap-2 bg-primary-600 hover:bg-primary-700"
        >
          <Plus size={20} /> Post Job
        </Button>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
        <Card>
          <div className="text-gray-500 text-sm font-medium">Total Jobs</div>
          <div className="text-3xl font-bold text-primary-600">{jobs.length}</div>
        </Card>
        <Card>
          <div className="text-gray-500 text-sm font-medium">Active Postings</div>
          <div className="text-3xl font-bold text-success-600">
            {jobs.filter(j => j.status === 'open').length}
          </div>
        </Card>
        <Card>
          <div className="text-gray-500 text-sm font-medium">Total Applicants</div>
          <div className="text-3xl font-bold text-warning-600">
            {jobs.reduce((sum, j) => sum + (parseInt(j.applications_count) || 0), 0)}
          </div>
        </Card>
        <Card>
          <div className="text-gray-500 text-sm font-medium">Closed</div>
          <div className="text-3xl font-bold text-danger-600">
            {jobs.filter(j => j.status === 'closed').length}
          </div>
        </Card>
      </div>

      {/* Search */}
      <div className="mb-6 relative">
        <Search className="absolute left-3 top-3 text-gray-400" size={20} />
        <input
          type="text"
          placeholder="Search jobs by title or department..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
        />
      </div>

      {/* Jobs Table */}
      {filteredJobs.length === 0 ? (
        <Card>
          <div className="text-center py-8 text-gray-500">
            <p>No jobs found. Post your first job opening to get started.</p>
          </div>
        </Card>
      ) : (
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Job Title</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Department</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Location</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Salary Range</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Applicants</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Status</th>
                  <th className="px-6 py-3 text-center text-sm font-semibold text-gray-700">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredJobs.map((job) => (
                  <tr key={job.id} className="border-b border-gray-200 hover:bg-gray-50 transition">
                    <td className="px-6 py-4">
                      <div className="font-medium text-gray-900">{job.title}</div>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600">{job.department}</td>
                    <td className="px-6 py-4 text-sm text-gray-600 flex items-center gap-1">
                      <MapPin size={16} className="text-primary-500" />
                      {job.location}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600 flex items-center gap-1">
                      <DollarSign size={16} className="text-success-500" />
                      {job.salary_min && job.salary_max ? (
                        `$${parseInt(job.salary_min).toLocaleString()} - $${parseInt(job.salary_max).toLocaleString()}`
                      ) : (
                        'Not specified'
                      )}
                    </td>
                    <td className="px-6 py-4 text-sm">
                      <div className="flex items-center gap-1 text-warning-600 font-medium">
                        <Users size={16} />
                        {job.applications_count || 0}
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm">
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-medium ${
                          job.status === 'open'
                            ? 'bg-success-100 text-success-800'
                            : job.status === 'closed'
                            ? 'bg-danger-100 text-danger-800'
                            : 'bg-warning-100 text-warning-800'
                        }`}
                      >
                        {job.status?.charAt(0).toUpperCase() + job.status?.slice(1)}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-center">
                      <div className="flex justify-center gap-2">
                        <button
                          onClick={() => handleOpenModal(job)}
                          className="p-2 text-primary-600 hover:bg-primary-50 rounded transition"
                        >
                          <Edit2 size={18} />
                        </button>
                        <button
                          onClick={() => handleDelete(job.id)}
                          className="p-2 text-danger-600 hover:bg-danger-50 rounded transition"
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
      <Modal open={openModal} onClose={handleCloseModal} title={editingId ? 'Edit Job' : 'Post New Job'}>
        <form onSubmit={handleSubmit} className="space-y-4 max-h-96 overflow-y-auto">
          <FormField
            label="Job Title"
            name="title"
            value={formData.title}
            onChange={handleInputChange}
            placeholder="e.g., Senior React Developer"
            required
          />

          <FormField
            label="Department"
            name="department"
            value={formData.department}
            onChange={handleInputChange}
            placeholder="e.g., Engineering"
            required
          />

          <FormField
            label="Location"
            name="location"
            value={formData.location}
            onChange={handleInputChange}
            placeholder="e.g., New York, NY"
            required
          />

          <FormField
            label="Description"
            name="description"
            type="textarea"
            value={formData.description}
            onChange={handleInputChange}
            placeholder="Job description and responsibilities..."
            rows={3}
          />

          <FormField
            label="Requirements"
            name="requirements"
            type="textarea"
            value={formData.requirements}
            onChange={handleInputChange}
            placeholder="Job requirements..."
            rows={3}
          />

          <div className="grid grid-cols-2 gap-4">
            <FormField
              label="Min Salary"
              name="salary_min"
              type="number"
              value={formData.salary_min}
              onChange={handleInputChange}
              placeholder="60000"
            />
            <FormField
              label="Max Salary"
              name="salary_max"
              type="number"
              value={formData.salary_max}
              onChange={handleInputChange}
              placeholder="100000"
            />
          </div>

          <FormField
            label="Status"
            name="status"
            type="select"
            value={formData.status}
            onChange={handleInputChange}
            options={[
              { value: 'open', label: 'Open' },
              { value: 'closed', label: 'Closed' },
            ]}
          />

          <div className="flex gap-3 pt-4">
            <Button
              type="submit"
              disabled={loading}
              className="flex-1 bg-primary-600 hover:bg-primary-700"
            >
              {loading ? 'Saving...' : 'Save Job'}
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
    </AppLayout>
  );
};

export default Jobs;

          