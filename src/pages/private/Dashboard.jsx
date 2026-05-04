import React, { useEffect, useState } from 'react';
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import AppLayout from '../../components/layout/AppLayout';
import Card from '../../components/common/Card';
import Loader from '../../components/common/Loader';
import { dashboardService } from '../../services/dashboardService';
import { Toaster, toast } from 'sonner';
import { Users, Briefcase, Calendar, TrendingUp } from 'lucide-react';

const Dashboard = () => {
  const [stats, setStats] = useState(null);
  const [detailed, setDetailed] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    setLoading(true);
    try {
      const [statsData, detailedData] = await Promise.all([
        dashboardService.getStats(),
        dashboardService.getDetailed(),
      ]);
      setStats(statsData);
      setDetailed(detailedData);
    } catch (error) {
      toast.error('Failed to load dashboard data');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <AppLayout>
        <div className="flex justify-center items-center h-96">
          <Loader />
        </div>
      </AppLayout>
    );
  }

  const COLORS = ['#3B82F6', '#10B981', '#F59E0B', '#EF4444', '#8B5CF6', '#EC4899'];

  return (
    <AppLayout>
      <Toaster />
      
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
        <p className="text-gray-600 mt-1">Welcome back! Here's your recruitment overview</p>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <Card>
          <div className="flex items-center justify-between">
            <div>
              <div className="text-gray-500 text-sm">Open Jobs</div>
              <div className="text-3xl font-bold text-primary-600">{stats?.open_jobs || 0}</div>
            </div>
            <Briefcase className="text-primary-600" size={32} />
          </div>
        </Card>

        <Card>
          <div className="flex items-center justify-between">
            <div>
              <div className="text-gray-500 text-sm">Total Candidates</div>
              <div className="text-3xl font-bold text-success-600">{stats?.total_candidates || 0}</div>
            </div>
            <Users className="text-success-600" size={32} />
          </div>
        </Card>

        <Card>
          <div className="flex items-center justify-between">
            <div>
              <div className="text-gray-500 text-sm">Interviews Today</div>
              <div className="text-3xl font-bold text-warning-600">{stats?.interviews_today || 0}</div>
            </div>
            <Calendar className="text-warning-600" size={32} />
          </div>
        </Card>

        <Card>
          <div className="flex items-center justify-between">
            <div>
              <div className="text-gray-500 text-sm">Hired This Month</div>
              <div className="text-3xl font-bold text-green-600">{stats?.hired_this_month || 0}</div>
            </div>
            <TrendingUp className="text-green-600" size={32} />
          </div>
        </Card>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        {/* Stage Breakdown */}
        <Card>
          <h3 className="text-lg font-semibold mb-4">Candidate Stage Breakdown</h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={stats?.stage_breakdown || []}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ stage, count }) => `${stage}: ${count}`}
                outerRadius={100}
                fill="#8884d8"
                dataKey="count"
              >
                {stats?.stage_breakdown?.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </Card>

        {/* Recent Activities */}
        <Card>
          <h3 className="text-lg font-semibold mb-4">Recent Activities</h3>
          <div className="space-y-3 max-h-80 overflow-y-auto">
            {detailed?.recent_candidates?.length > 0 ? (
              detailed.recent_candidates.map((candidate) => (
                <div key={candidate.id} className="border-l-4 border-primary-600 pl-3 pb-3">
                  <p className="font-medium text-gray-900">{candidate.full_name}</p>
                  <p className="text-sm text-gray-600">{candidate.job_title}</p>
                  <p className="text-xs text-gray-400 mt-1">
                    Stage: <span className="font-semibold">{candidate.stage}</span>
                  </p>
                </div>
              ))
            ) : (
              <p className="text-gray-500 text-sm">No recent candidates</p>
            )}
          </div>
        </Card>
      </div>

      {/* Upcoming Interviews */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <h3 className="text-lg font-semibold mb-4">Upcoming Interviews</h3>
          <div className="space-y-3 max-h-80 overflow-y-auto">
            {detailed?.upcoming_interviews?.length > 0 ? (
              detailed.upcoming_interviews.map((interview) => (
                <div key={interview.id} className="bg-gradient-to-r from-primary-50 to-blue-50 p-3 rounded-lg">
                  <p className="font-medium text-gray-900">{interview.candidate_name}</p>
                  <p className="text-sm text-gray-600">{interview.job_title}</p>
                  <div className="flex justify-between items-center mt-2 text-xs text-gray-500">
                    <span>Interviewer: {interview.interviewer_name}</span>
                    <span>{new Date(interview.scheduled_date).toLocaleDateString()}</span>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-gray-500 text-sm">No upcoming interviews</p>
            )}
          </div>
        </Card>

        {/* Top Performers */}
        <Card>
          <h3 className="text-lg font-semibold mb-4">Top Candidates</h3>
          <div className="space-y-3 max-h-80 overflow-y-auto">
            {detailed?.top_performers?.length > 0 ? (
              detailed.top_performers.map((performer, index) => (
                <div key={performer.id} className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-full bg-primary-600 text-white flex items-center justify-center text-sm font-bold">
                      {index + 1}
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">{performer.full_name}</p>
                      <p className="text-xs text-gray-500">Rating: {performer.avg_rating?.toFixed(1)}/5</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-2xl font-bold text-primary-600">{performer.avg_rating?.toFixed(1)}</div>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-gray-500 text-sm">No top performers yet</p>
            )}
          </div>
        </Card>
      </div>
    </AppLayout>
  );
};

export default Dashboard;
