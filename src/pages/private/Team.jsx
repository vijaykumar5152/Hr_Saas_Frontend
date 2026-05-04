import React, { useState, useEffect } from 'react';
import { Trash2, Edit2, Plus, Search, Mail, Phone, Shield, Calendar } from 'lucide-react';
import { Toaster, toast } from 'sonner';
import AppLayout from '../../components/layout/AppLayout';
import Button from '../../components/common/Button';
import Modal from '../../components/common/Modal';
import Card from '../../components/common/Card';
import Loader from '../../components/common/Loader';
import FormField from '../../components/common/FormField';
import {
  getTeamMembers,
  createTeamMember,
  updateTeamMember,
  deleteTeamMember,
} from '../../services/teamService';

const Team = () => {
  const [members, setMembers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    role: '',
    department: '',
    joinDate: '',
    status: 'active',
  });

  useEffect(() => {
    fetchTeamMembers();
  }, []);

  const fetchTeamMembers = async () => {
    setLoading(true);
    try {
      const data = await getTeamMembers();
      setMembers(data.data || []);
    } catch (error) {
      toast.error('Failed to fetch team members');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleOpenModal = (member = null) => {
    if (member) {
      setEditingId(member.id);
      setFormData({
        firstName: member.firstName,
        lastName: member.lastName,
        email: member.email,
        phone: member.phone,
        role: member.role,
        department: member.department,
        joinDate: member.joinDate,
        status: member.status,
      });
    } else {
      setEditingId(null);
      setFormData({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        role: '',
        department: '',
        joinDate: '',
        status: 'active',
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
    
    if (!formData.firstName || !formData.email) {
      toast.error('Please fill in required fields');
      return;
    }

    setLoading(true);
    try {
      if (editingId) {
        await updateTeamMember(editingId, formData);
        toast.success('Team member updated successfully');
      } else {
        await createTeamMember(formData);
        toast.success('Team member added successfully');
      }
      handleCloseModal();
      fetchTeamMembers();
    } catch (error) {
      toast.error(error.message || 'Failed to save team member');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to remove this team member?')) return;

    setLoading(true);
    try {
      await deleteTeamMember(id);
      toast.success('Team member removed successfully');
      fetchTeamMembers();
    } catch (error) {
      toast.error(error.message || 'Failed to delete team member');
    } finally {
      setLoading(false);
    }
  };

  const filteredMembers = members.filter(member =>
    `${member.firstName} ${member.lastName}`.toLowerCase().includes(searchTerm.toLowerCase()) ||
    member.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    member.role.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const roleColors = {
    admin: 'bg-red-100 text-red-800',
    manager: 'bg-purple-100 text-purple-800',
    recruiter: 'bg-blue-100 text-blue-800',
    hr: 'bg-green-100 text-green-800',
    user: 'bg-gray-100 text-gray-800',
  };

  if (loading && members.length === 0) {
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
          <h1 className="text-3xl font-bold text-gray-900">Team Members</h1>
          <p className="text-gray-600 mt-1">Manage your team and assign roles</p>
        </div>
        <Button
          onClick={() => handleOpenModal()}
          className="flex items-center gap-2 bg-primary-600 hover:bg-primary-700"
        >
          <Plus size={20} /> Add Member
        </Button>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
        <Card>
          <div className="text-gray-500 text-sm font-medium">Total Members</div>
          <div className="text-3xl font-bold text-primary-600">{members.length}</div>
        </Card>
        <Card>
          <div className="text-gray-500 text-sm font-medium">Active</div>
          <div className="text-3xl font-bold text-success-600">
            {members.filter(m => m.status === 'active').length}
          </div>
        </Card>
        <Card>
          <div className="text-gray-500 text-sm font-medium">Administrators</div>
          <div className="text-3xl font-bold text-danger-600">
            {members.filter(m => m.role === 'admin').length}
          </div>
        </Card>
        <Card>
          <div className="text-gray-500 text-sm font-medium">Recruiters</div>
          <div className="text-3xl font-bold text-primary-600">
            {members.filter(m => m.role === 'recruiter').length}
          </div>
        </Card>
      </div>

      {/* Search */}
      <div className="mb-6 relative">
        <Search className="absolute left-3 top-3 text-gray-400" size={20} />
        <input
          type="text"
          placeholder="Search team members by name, email, or role..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
        />
      </div>

      {/* Team Members Table */}
      {filteredMembers.length === 0 ? (
        <Card>
          <div className="text-center py-8 text-gray-500">
            <p>No team members found. Add your first team member to get started.</p>
          </div>
        </Card>
      ) : (
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Name</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Email</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Phone</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Role</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Department</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Join Date</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Status</th>
                  <th className="px-6 py-3 text-center text-sm font-semibold text-gray-700">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredMembers.map((member) => (
                  <tr key={member.id} className="border-b border-gray-200 hover:bg-gray-50 transition">
                    <td className="px-6 py-4">
                      <div className="font-medium text-gray-900">
                        {member.firstName} {member.lastName}
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600 flex items-center gap-1">
                      <Mail size={16} className="text-primary-500" />
                      <a href={`mailto:${member.email}`} className="hover:text-primary-600">
                        {member.email}
                      </a>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600 flex items-center gap-1">
                      <Phone size={16} className="text-primary-500" />
                      {member.phone}
                    </td>
                    <td className="px-6 py-4 text-sm">
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-medium inline-flex items-center gap-1 ${
                          roleColors[member.role] || 'bg-gray-100 text-gray-800'
                        }`}
                      >
                        <Shield size={14} />
                        {member.role?.charAt(0).toUpperCase() + member.role?.slice(1)}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600">{member.department}</td>
                    <td className="px-6 py-4 text-sm text-gray-600 flex items-center gap-1">
                      <Calendar size={16} className="text-primary-500" />
                      {member.joinDate ? new Date(member.joinDate).toLocaleDateString() : 'N/A'}
                    </td>
                    <td className="px-6 py-4 text-sm">
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-medium ${
                          member.status === 'active'
                            ? 'bg-success-100 text-success-800'
                            : 'bg-danger-100 text-danger-800'
                        }`}
                      >
                        {member.status?.charAt(0).toUpperCase() + member.status?.slice(1)}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-center">
                      <div className="flex justify-center gap-2">
                        <button
                          onClick={() => handleOpenModal(member)}
                          className="p-2 text-primary-600 hover:bg-primary-50 rounded transition"
                        >
                          <Edit2 size={18} />
                        </button>
                        <button
                          onClick={() => handleDelete(member.id)}
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
      <Modal open={openModal} onClose={handleCloseModal} title={editingId ? 'Edit Team Member' : 'Add Team Member'}>
        <form onSubmit={handleSubmit} className="space-y-4 max-h-96 overflow-y-auto">
          <div className="grid grid-cols-2 gap-4">
            <FormField
              label="First Name"
              name="firstName"
              value={formData.firstName}
              onChange={handleInputChange}
              placeholder="John"
              required
            />
            <FormField
              label="Last Name"
              name="lastName"
              value={formData.lastName}
              onChange={handleInputChange}
              placeholder="Doe"
            />
          </div>

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
            label="Role"
            name="role"
            type="select"
            value={formData.role}
            onChange={handleInputChange}
            options={[
              { value: 'admin', label: 'Administrator' },
              { value: 'manager', label: 'Manager' },
              { value: 'recruiter', label: 'Recruiter' },
              { value: 'hr', label: 'HR' },
              { value: 'user', label: 'User' },
            ]}
          />

          <FormField
            label="Department"
            name="department"
            value={formData.department}
            onChange={handleInputChange}
            placeholder="e.g., HR, Engineering"
          />

          <FormField
            label="Join Date"
            name="joinDate"
            type="date"
            value={formData.joinDate}
            onChange={handleInputChange}
          />

          <FormField
            label="Status"
            name="status"
            type="select"
            value={formData.status}
            onChange={handleInputChange}
            options={[
              { value: 'active', label: 'Active' },
              { value: 'inactive', label: 'Inactive' },
            ]}
          />

          <div className="flex gap-3 pt-4">
            <Button
              type="submit"
              disabled={loading}
              className="flex-1 bg-primary-600 hover:bg-primary-700"
            >
              {loading ? 'Saving...' : 'Save Member'}
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

export default Team;
