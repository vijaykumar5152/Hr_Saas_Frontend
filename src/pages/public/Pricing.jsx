import React from 'react';
import Navbar from '../../components/layout/Navbar';
import { Link } from 'react-router-dom';
import { Check, Circle, Triangle, Users } from 'lucide-react';
import { useState } from 'react';

const Pricing = () => {
  const [isAnnual, setIsAnnual] = useState(false);

  const plans = [
    {
      name: 'STARTER',
      icon: Circle,
      price: isAnnual ? 833 : 999,
      description: '1 recruiter, 50 candidates',
      features: [
        '1 recruiter account',
        'Up to 50 candidates',
        'Basic applicant tracking',
        'Email support',
        'Standard templates'
      ],
      color: 'from-slate-700 to-slate-800',
      borderColor: 'border-slate-600',
      buttonIcon: Circle,
      popular: false
    },
    {
      name: 'GROWTH',
      icon: Triangle,
      price: isAnnual ? 1666 : 1999,
      description: '5 recruiters, unlimited candidates',
      features: [
        '5 recruiter accounts',
        'Unlimited candidates',
        'Advanced analytics',
        'Priority support',
        'Custom workflows',
        'Integration support'
      ],
      color: 'from-purple-700 to-purple-900',
      borderColor: 'border-purple-500',
      buttonIcon: Triangle,
      popular: true,
      badge: 'Most popular'
    },
    {
      name: 'AGENCY',
      icon: Users,
      price: isAnnual ? 4166 : 4999,
      description: 'Multi-user + branding',
      features: [
        'Unlimited recruiters',
        'Unlimited candidates',
        'White-label branding',
        'Dedicated account manager',
        'Custom integrations',
        'Advanced reporting',
        'API access'
      ],
      color: 'from-slate-700 to-slate-800',
      borderColor: 'border-slate-600',
      buttonIcon: Users,
      popular: false
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* Navigation */}
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-8">
            <Link to="/" className="text-white font-semibold hover:text-purple-300 transition">FEATURES</Link>
            <Link to="/pricing" className="text-white font-semibold hover:text-purple-300 transition">PRICING</Link>
          </div>
          
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-purple-600 rounded-lg flex items-center justify-center">
              <Triangle className="w-4 h-4 text-white fill-white" />
            </div>
            <span className="text-white font-bold text-lg">HR RECRUIT</span>
          </div>

          <div className="flex items-center gap-8">
            <Link to="/faq" className="text-white font-semibold hover:text-purple-300 transition">FAQ</Link>
            <Link to="/contact" className="text-white font-semibold hover:text-purple-300 transition">CONTACT</Link>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-4">
            Flexible pricing
          </h1>
          <p className="text-2xl text-white/90">
            for teams of all sizes
          </p>
        </div>

        {/* Toggle */}
        <div className="flex justify-center mb-16">
          <div className="inline-flex items-center bg-slate-800/50 backdrop-blur-sm rounded-full p-1.5 border border-slate-700">
            <button
              onClick={() => setIsAnnual(false)}
              className={`px-8 py-3 rounded-full font-semibold transition-all ${
                !isAnnual
                  ? 'bg-slate-700 text-white shadow-lg'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              MONTHLY
            </button>
            <button
              onClick={() => setIsAnnual(true)}
              className={`px-8 py-3 rounded-full font-semibold transition-all ${
                isAnnual
                  ? 'bg-purple-600 text-white shadow-lg shadow-purple-500/50'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              ANNUAL
              <span className="ml-2 text-xs bg-green-500 text-white px-2 py-0.5 rounded-full">Save 17%</span>
            </button>
          </div>
        </div>

        {/* Pricing Cards */}
        <div className="grid md:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {plans.map((plan, index) => (
            <div
              key={index}
              className={`relative ${
                plan.popular ? 'md:-mt-6 md:mb-6' : ''
              }`}
            >
              {/* Card */}
              <div
                className={`relative rounded-3xl p-8 backdrop-blur-xl border ${plan.borderColor} ${
                  plan.popular
                    ? 'bg-gradient-to-br from-purple-900/80 to-purple-950/80 shadow-2xl shadow-purple-500/20'
                    : 'bg-slate-800/40'
                }`}
              >
                {/* Icon */}
                <div className="flex justify-center mb-6">
                  <div className={`w-16 h-16 rounded-full bg-slate-700/50 backdrop-blur-sm border border-slate-600 flex items-center justify-center ${
                    plan.popular ? 'ring-2 ring-purple-500/50' : ''
                  }`}>
                    <plan.icon className="w-8 h-8 text-white" />
                  </div>
                </div>

                {/* Plan Name */}
                <div className="text-center mb-6">
                  <div className="inline-block px-6 py-2 rounded-full border border-slate-600 bg-slate-700/50 backdrop-blur-sm">
                    <span className="text-white font-bold tracking-wider">{plan.name}</span>
                  </div>
                </div>

                {/* Price */}
                <div className="text-center mb-2">
                  <span className="text-5xl font-bold text-white">
                    ₹{plan.price.toLocaleString('en-IN')}
                  </span>
                  <span className="text-xl text-slate-400">/month</span>
                </div>

                {/* Description */}
                <p className="text-center text-slate-300 mb-8">{plan.description}</p>

                {/* Divider */}
                <div className="h-px bg-gradient-to-r from-transparent via-slate-600 to-transparent mb-8"></div>

                {/* Features */}
                <ul className="space-y-4 mb-8">
                  {plan.features.map((feature, idx) => (
                    <li key={idx} className="flex items-center gap-3 text-slate-300">
                      <div className="w-5 h-5 rounded-full bg-purple-600/30 border border-purple-500 flex items-center justify-center flex-shrink-0">
                        <Check className="w-3 h-3 text-purple-400" />
                      </div>
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>

                {/* Button */}
                <button className={`w-full py-4 rounded-xl font-bold transition-all flex items-center justify-center gap-2 ${
                  plan.popular
                    ? 'bg-purple-600 hover:bg-purple-700 text-white shadow-lg shadow-purple-500/30'
                    : 'bg-slate-700 hover:bg-slate-600 text-white'
                }`}>
                  <plan.buttonIcon className="w-4 h-4" />
                  <span>GET STARTED</span>
                </button>

                {/* Badge for popular plan */}
                {plan.badge && (
                  <div className="text-center mt-4">
                    <span className="text-xs text-purple-300">✦ {plan.badge}</span>
                  </div>
                )}
              </div>

              {/* Popular card glow effect */}
              {plan.popular && (
                <div className="absolute inset-0 -z-10 bg-gradient-to-br from-purple-600/20 to-purple-900/20 rounded-3xl blur-2xl"></div>
              )}
            </div>
          ))}
        </div>

        {/* Bottom Info */}
        <div className="text-center mt-16 space-y-4">
          <p className="text-slate-400 text-lg">
            All plans include 14-day free trial • No credit card required
          </p>
          <p className="text-slate-400 text-lg">
            Need a custom plan?{' '}
            <Link to="/contact" className="text-purple-400 hover:text-purple-300 font-semibold underline">
              Contact our sales team
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Pricing;
