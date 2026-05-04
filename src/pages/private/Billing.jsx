import React, { useState, useEffect } from 'react';
import { Trash2, Edit2, Plus, Download, Search, CreditCard, Check, X } from 'lucide-react';
import { Toaster, toast } from 'sonner';
import AppLayout from '../../components/layout/AppLayout';
import Button from '../../components/common/Button';
import Modal from '../../components/common/Modal';
import Loader from '../../components/common/Loader';
import Card from '../../components/common/Card';
import { subscriptionService } from '../../services/subscriptionService';

const Billing = () => {
  const [plans, setPlans] = useState({});
  const [currentSubscription, setCurrentSubscription] = useState(null);
  const [subscriptionFeatures, setSubscriptionFeatures] = useState(null);
  const [invoices, setInvoices] = useState([]);
  const [billingHistory, setBillingHistory] = useState([]);
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState('plans'); // plans, current, invoices, history
  const [upgradeModal, setUpgradeModal] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState(null);

  // Fetch all billing data
  useEffect(() => {
    fetchAllBillingData();
  }, []);

  const fetchAllBillingData = async () => {
    setLoading(true);
    try {
      const [plansData, subscriptionData, featuresData, invoicesData, historyData] = await Promise.all([
        subscriptionService.getPlans(),
        subscriptionService.getCurrentSubscription(),
        subscriptionService.getSubscriptionFeatures(),
        subscriptionService.getInvoices(),
        subscriptionService.getBillingHistory(),
      ]);
      
      setPlans(plansData || {});
      setCurrentSubscription(subscriptionData || null);
      setSubscriptionFeatures(featuresData || null);
      setInvoices(Array.isArray(invoicesData) ? invoicesData : []);
      setBillingHistory(Array.isArray(historyData) ? historyData : []);
    } catch (error) {
      toast.error('Failed to fetch billing data');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleOpenUpgradeModal = (planKey) => {
    setSelectedPlan(planKey);
    setUpgradeModal(true);
  };

  const handleCloseUpgradeModal = () => {
    setUpgradeModal(false);
    setSelectedPlan(null);
  };

  const handleUpgradePlan = async () => {
    if (!selectedPlan) return;

    setLoading(true);
    try {
      await subscriptionService.upgradePlan({
        plan_type: selectedPlan,
      });
      toast.success('Plan upgraded successfully!');
      handleCloseUpgradeModal();
      fetchAllBillingData();
    } catch (error) {
      toast.error(error.message || 'Failed to upgrade plan');
    } finally {
      setLoading(false);
    }
  };

  const handleCancelSubscription = async () => {
    if (!window.confirm('Are you sure you want to cancel your subscription?')) return;

    setLoading(true);
    try {
      await subscriptionService.cancelSubscription();
      toast.success('Subscription cancelled successfully');
      fetchAllBillingData();
    } catch (error) {
      toast.error(error.message || 'Failed to cancel subscription');
    } finally {
      setLoading(false);
    }
  };

  if (loading && Object.keys(plans).length === 0) {
    return (
      <AppLayout>
        <div className="flex justify-center items-center h-96">
          <Loader />
        </div>
      </AppLayout>
    );
  }

  const plansList = Object.entries(plans).map(([key, plan]) => ({
    key,
    ...plan,
  }));

  return (
    <AppLayout>
      <Toaster />
      
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Billing & Subscription</h1>
        <p className="text-gray-600 mt-1">Manage your subscription plan and invoices</p>
      </div>

      {/* Current Subscription */}
      {currentSubscription && (
        <Card className="mb-8 bg-gradient-to-r from-primary-50 to-blue-50 border-primary-200">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <div className="text-gray-600 text-sm">Current Plan</div>
              <div className="text-2xl font-bold text-primary-600 capitalize">
                {currentSubscription.plan_type}
              </div>
            </div>
            <div>
              <div className="text-gray-600 text-sm">Billing Cycle</div>
              <div className="text-2xl font-bold text-primary-600">
                {currentSubscription.billing_cycle}
              </div>
            </div>
            <div>
              <div className="text-gray-600 text-sm">Next Billing Date</div>
              <div className="text-2xl font-bold text-primary-600">
                {new Date(currentSubscription.end_date).toLocaleDateString()}
              </div>
            </div>
          </div>
          <div className="mt-4 flex gap-3">
            <Button
              onClick={() => setActiveTab('plans')}
              className="flex items-center gap-2"
            >
              <CreditCard size={18} />
              Upgrade Plan
            </Button>
            <Button
              onClick={handleCancelSubscription}
              variant="danger"
              disabled={loading}
            >
              Cancel Subscription
            </Button>
          </div>
        </Card>
      )}

      {/* Tabs */}
      <div className="flex gap-4 mb-6 border-b border-gray-200">
        <button
          onClick={() => setActiveTab('plans')}
          className={`px-4 py-3 font-medium border-b-2 transition ${
            activeTab === 'plans'
              ? 'border-primary-600 text-primary-600'
              : 'border-transparent text-gray-600 hover:text-gray-900'
          }`}
        >
          Available Plans
        </button>
        <button
          onClick={() => setActiveTab('invoices')}
          className={`px-4 py-3 font-medium border-b-2 transition ${
            activeTab === 'invoices'
              ? 'border-primary-600 text-primary-600'
              : 'border-transparent text-gray-600 hover:text-gray-900'
          }`}
        >
          Invoices
        </button>
        <button
          onClick={() => setActiveTab('history')}
          className={`px-4 py-3 font-medium border-b-2 transition ${
            activeTab === 'history'
              ? 'border-primary-600 text-primary-600'
              : 'border-transparent text-gray-600 hover:text-gray-900'
          }`}
        >
          Billing History
        </button>
      </div>

      {/* Plans Tab */}
      {activeTab === 'plans' && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {plansList.map((plan) => (
            <Card key={plan.key} className="flex flex-col">
              <h3 className="text-xl font-bold text-gray-900 mb-2 capitalize">{plan.key}</h3>
              <div className="text-3xl font-bold text-primary-600 mb-4">
                ${plan.price / 100}
                <span className="text-sm text-gray-600 font-normal">/month</span>
              </div>

              <div className="flex-1 mb-6">
                <p className="text-sm text-gray-600 font-semibold mb-3">Features:</p>
                <ul className="space-y-2">
                  {Object.entries(plan.features).map(([feature, value]) => (
                    <li key={feature} className="flex items-start gap-2 text-sm">
                      {value ? (
                        <Check size={16} className="text-success-600 mt-0.5 flex-shrink-0" />
                      ) : (
                        <X size={16} className="text-gray-400 mt-0.5 flex-shrink-0" />
                      )}
                      <span className={value ? 'text-gray-700' : 'text-gray-400'}>
                        {feature.replace(/_/g, ' ')}
                        {typeof value === 'number' && value !== true
                          ? `: ${value}`
                          : ''}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>

              <Button
                onClick={() => handleOpenUpgradeModal(plan.key)}
                disabled={loading || currentSubscription?.plan_type === plan.key}
                className="w-full"
              >
                {currentSubscription?.plan_type === plan.key ? 'Current Plan' : 'Upgrade'}
              </Button>
            </Card>
          ))}
        </div>
      )}

      {/* Invoices Tab */}
      {activeTab === 'invoices' && (
        <Card>
          {invoices.length === 0 ? (
            <div className="text-center py-8 text-gray-500">
              <p>No invoices found.</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 border-b border-gray-200">
                  <tr>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Invoice ID</th>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Date</th>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Amount</th>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {invoices.map((invoice) => (
                    <tr key={invoice.id} className="border-b border-gray-200 hover:bg-gray-50 transition">
                      <td className="px-6 py-4 text-sm font-medium text-gray-900">{invoice.id}</td>
                      <td className="px-6 py-4 text-sm text-gray-600">
                        {new Date(invoice.date || invoice.created_at).toLocaleDateString()}
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-600">
                        ${(invoice.amount / 100).toFixed(2)}
                      </td>
                      <td className="px-6 py-4 text-sm">
                        <span
                          className={`px-3 py-1 rounded-full text-xs font-medium ${
                            invoice.status === 'paid'
                              ? 'bg-success-100 text-success-800'
                              : invoice.status === 'pending'
                              ? 'bg-warning-100 text-warning-800'
                              : 'bg-danger-100 text-danger-800'
                          }`}
                        >
                          {invoice.status?.charAt(0).toUpperCase() + invoice.status?.slice(1)}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </Card>
      )}

      {/* Billing History Tab */}
      {activeTab === 'history' && (
        <Card>
          {billingHistory.length === 0 ? (
            <div className="text-center py-8 text-gray-500">
              <p>No billing history found.</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 border-b border-gray-200">
                  <tr>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Date</th>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Plan</th>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Amount</th>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Type</th>
                  </tr>
                </thead>
                <tbody>
                  {billingHistory.map((entry, index) => (
                    <tr key={index} className="border-b border-gray-200 hover:bg-gray-50 transition">
                      <td className="px-6 py-4 text-sm text-gray-600">
                        {new Date(entry.date || entry.created_at).toLocaleDateString()}
                      </td>
                      <td className="px-6 py-4 text-sm font-medium text-gray-900 capitalize">
                        {entry.plan_type || entry.plan || 'N/A'}
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-600">
                        ${(entry.amount / 100).toFixed(2)}
                      </td>
                      <td className="px-6 py-4 text-sm capitalize text-gray-600">
                        {entry.type || 'Charge'}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </Card>
      )}

      {/* Upgrade Confirmation Modal */}
      <Modal
        isOpen={upgradeModal}
        onClose={handleCloseUpgradeModal}
        title="Confirm Plan Upgrade"
      >
        {selectedPlan && plans[selectedPlan] && (
          <div className="space-y-4">
            <div className="bg-blue-50 p-4 rounded-lg">
              <p className="text-sm text-gray-700 mb-2">
                You are about to upgrade to the <strong className="capitalize">{selectedPlan}</strong> plan.
              </p>
              <p className="text-2xl font-bold text-primary-600">
                ${(plans[selectedPlan].price / 100).toFixed(2)}/month
              </p>
            </div>

            <div className="bg-gray-50 p-3 rounded-lg max-h-48 overflow-y-auto">
              <p className="text-sm font-semibold text-gray-900 mb-2">Plan Features:</p>
              <ul className="space-y-2">
                {Object.entries(plans[selectedPlan].features).map(([feature, value]) => (
                  <li key={feature} className="text-sm text-gray-700">
                    <strong className="capitalize">{feature.replace(/_/g, ' ')}:</strong>{' '}
                    {typeof value === 'string' || typeof value === 'number'
                      ? value
                      : value
                      ? 'Yes'
                      : 'No'}
                  </li>
                ))}
              </ul>
            </div>

            <div className="flex gap-3 justify-end pt-4">
              <Button
                type="button"
                onClick={handleCloseUpgradeModal}
                variant="secondary"
              >
                Cancel
              </Button>
              <Button
                type="button"
                onClick={handleUpgradePlan}
                disabled={loading}
              >
                {loading ? 'Processing...' : 'Confirm Upgrade'}
              </Button>
            </div>
          </div>
        )}
      </Modal>
    </AppLayout>
  );
};

export default Billing;
