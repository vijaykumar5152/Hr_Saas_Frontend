import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../../components/layout/Navbar';
import { Briefcase, Users, TrendingUp, CheckCircle, ArrowRight, Sparkles } from 'lucide-react';



// Hero Illustration Component
const HeroIllustration = () => (
  <svg viewBox="0 0 600 500" className="w-full h-auto" xmlns="http://www.w3.org/2000/svg">
    {/* Background elements */}
    <circle cx="500" cy="100" r="80" fill="#E0E7FF" opacity="0.5"/>
    <circle cx="100" cy="400" r="60" fill="#DBEAFE" opacity="0.5"/>
    
    {/* Main desk */}
    <rect x="50" y="350" width="500" height="20" rx="10" fill="#1E293B"/>
    
    {/* Computer screen */}
    <rect x="200" y="180" width="280" height="180" rx="8" fill="#334155"/>
    <rect x="210" y="190" width="260" height="150" rx="4" fill="#F1F5F9"/>
    
    {/* Screen content - Dashboard */}
    <rect x="220" y="200" width="80" height="60" rx="4" fill="#3B82F6" opacity="0.8"/>
    <rect x="310" y="200" width="80" height="60" rx="4" fill="#8B5CF6" opacity="0.8"/>
    <rect x="400" y="200" width="80" height="60" rx="4" fill="#10B981" opacity="0.8"/>
    
    <rect x="220" y="270" width="240" height="8" rx="4" fill="#CBD5E1"/>
    <rect x="220" y="285" width="180" height="8" rx="4" fill="#CBD5E1"/>
    <rect x="220" y="300" width="200" height="8" rx="4" fill="#CBD5E1"/>
    <rect x="220" y="315" width="160" height="8" rx="4" fill="#CBD5E1"/>
    
    {/* Monitor stand */}
    <rect x="310" y="360" width="60" height="10" rx="5" fill="#475569"/>
    <rect x="280" y="370" width="120" height="8" rx="4" fill="#64748B"/>
    
    {/* Person 1 - Left */}
    <circle cx="120" cy="280" r="35" fill="#FCD34D"/>
    <rect x="85" y="310" width="70" height="90" rx="35" fill="#3B82F6"/>
    <circle cx="105" cy="270" r="5" fill="#1E293B"/>
    <circle cx="135" cy="270" r="5" fill="#1E293B"/>
    <path d="M 110 285 Q 120 290 130 285" stroke="#1E293B" strokeWidth="2" fill="none"/>
    
    {/* Person 2 - Right */}
    <circle cx="480" cy="280" r="35" fill="#F472B6"/>
    <rect x="445" y="310" width="70" height="90" rx="35" fill="#8B5CF6"/>
    <circle cx="465" cy="270" r="5" fill="#1E293B"/>
    <circle cx="495" cy="270" r="5" fill="#1E293B"/>
    <path d="M 470 285 Q 480 290 490 285" stroke="#1E293B" strokeWidth="2" fill="none"/>
    
    {/* Document floating */}
    <g transform="translate(80, 120)">
      <rect x="0" y="0" width="60" height="80" rx="4" fill="#FFFFFF" stroke="#CBD5E1" strokeWidth="2"/>
      <rect x="8" y="10" width="44" height="6" rx="3" fill="#3B82F6"/>
      <rect x="8" y="22" width="44" height="4" rx="2" fill="#CBD5E1"/>
      <rect x="8" y="30" width="35" height="4" rx="2" fill="#CBD5E1"/>
      <rect x="8" y="38" width="40" height="4" rx="2" fill="#CBD5E1"/>
    </g>
    
    {/* Checkmark badge */}
    <circle cx="520" cy="200" r="30" fill="#10B981"/>
    <path d="M 510 200 L 518 208 L 532 190" stroke="#FFFFFF" strokeWidth="4" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

// Collaboration Illustration
const CollaborationIllustration = () => (
  <svg viewBox="0 0 500 400" className="w-full h-auto" xmlns="http://www.w3.org/2000/svg">
    {/* Background circles */}
    <circle cx="250" cy="200" r="150" fill="#F3F4F6" opacity="0.5"/>
    
    {/* Central board */}
    <rect x="150" y="120" width="200" height="160" rx="12" fill="#FFFFFF" stroke="#E5E7EB" strokeWidth="3"/>
    
    {/* Kanban columns */}
    <rect x="165" y="140" width="50" height="120" rx="6" fill="#DBEAFE"/>
    <rect x="225" y="140" width="50" height="120" rx="6" fill="#FEF3C7"/>
    <rect x="285" y="140" width="50" height="120" rx="6" fill="#D1FAE5"/>
    
    {/* Cards in columns */}
    <rect x="170" y="150" width="40" height="25" rx="4" fill="#3B82F6"/>
    <rect x="170" y="180" width="40" height="25" rx="4" fill="#3B82F6"/>
    <rect x="230" y="150" width="40" height="25" rx="4" fill="#F59E0B"/>
    <rect x="290" y="150" width="40" height="25" rx="4" fill="#10B981"/>
    <rect x="290" y="180" width="40" height="25" rx="4" fill="#10B981"/>
    
    {/* Team members around board */}
    <g transform="translate(80, 150)">
      <circle cx="0" cy="0" r="25" fill="#EC4899"/>
      <circle cx="-8" cy="-5" r="3" fill="#1E293B"/>
      <circle cx="8" cy="-5" r="3" fill="#1E293B"/>
    </g>
    
    <g transform="translate(420, 150)">
      <circle cx="0" cy="0" r="25" fill="#8B5CF6"/>
      <circle cx="-8" cy="-5" r="3" fill="#1E293B"/>
      <circle cx="8" cy="-5" r="3" fill="#1E293B"/>
    </g>
    
    <g transform="translate(250, 50)">
      <circle cx="0" cy="0" r="25" fill="#3B82F6"/>
      <circle cx="-8" cy="-5" r="3" fill="#1E293B"/>
      <circle cx="8" cy="-5" r="3" fill="#1E293B"/>
    </g>
    
    <g transform="translate(250, 340)">
      <circle cx="0" cy="0" r="25" fill="#10B981"/>
      <circle cx="-8" cy="-5" r="3" fill="#1E293B"/>
      <circle cx="8" cy="-5" r="3" fill="#1E293B"/>
    </g>
    
    {/* Connection lines */}
    <line x1="105" y1="150" x2="150" y2="170" stroke="#CBD5E1" strokeWidth="2" strokeDasharray="5,5"/>
    <line x1="395" y1="150" x2="350" y2="170" stroke="#CBD5E1" strokeWidth="2" strokeDasharray="5,5"/>
    <line x1="250" y1="75" x2="250" y2="120" stroke="#CBD5E1" strokeWidth="2" strokeDasharray="5,5"/>
    <line x1="250" y1="315" x2="250" y2="280" stroke="#CBD5E1" strokeWidth="2" strokeDasharray="5,5"/>
  </svg>
);

// Analytics Illustration
const AnalyticsIllustration = () => (
  <svg viewBox="0 0 500 400" className="w-full h-auto" xmlns="http://www.w3.org/2000/svg">
    {/* Background */}
    <rect x="50" y="50" width="400" height="300" rx="16" fill="#F9FAFB" stroke="#E5E7EB" strokeWidth="2"/>
    
    {/* Chart title area */}
    <rect x="70" y="70" width="120" height="12" rx="6" fill="#3B82F6"/>
    <rect x="70" y="90" width="80" height="8" rx="4" fill="#CBD5E1"/>
    
    {/* Bar chart */}
    <rect x="100" y="250" width="40" height="80" rx="6" fill="#3B82F6" opacity="0.8"/>
    <rect x="160" y="200" width="40" height="130" rx="6" fill="#8B5CF6" opacity="0.8"/>
    <rect x="220" y="180" width="40" height="150" rx="6" fill="#EC4899" opacity="0.8"/>
    <rect x="280" y="220" width="40" height="110" rx="6" fill="#10B981" opacity="0.8"/>
    <rect x="340" y="160" width="40" height="170" rx="6" fill="#F59E0B" opacity="0.8"/>
    
    {/* Axis */}
    <line x1="80" y1="330" x2="400" y2="330" stroke="#94A3B8" strokeWidth="2"/>
    <line x1="80" y1="140" x2="80" y2="330" stroke="#94A3B8" strokeWidth="2"/>
    
    {/* Trend line */}
    <path d="M 120 250 L 180 200 L 240 180 L 300 220 L 360 160" stroke="#EF4444" strokeWidth="3" fill="none" strokeDasharray="8,4"/>
    
    {/* Data points */}
    <circle cx="120" cy="250" r="6" fill="#EF4444"/>
    <circle cx="180" cy="200" r="6" fill="#EF4444"/>
    <circle cx="240" cy="180" r="6" fill="#EF4444"/>
    <circle cx="300" cy="220" r="6" fill="#EF4444"/>
    <circle cx="360" cy="160" r="6" fill="#EF4444"/>
    
    {/* Stats cards */}
    <g transform="translate(300, 70)">
      <rect x="0" y="0" width="120" height="50" rx="8" fill="#DBEAFE"/>
      <text x="60" y="25" fontSize="20" fontWeight="bold" fill="#1E40AF" textAnchor="middle">87%</text>
      <text x="60" y="42" fontSize="10" fill="#1E40AF" textAnchor="middle">Success Rate</text>
    </g>
  </svg>
);

const Landing = () => {
  const features = [
    { icon: Users, title: "Smart Candidate Matching", desc: "AI-powered algorithms find the perfect fit" },
    { icon: Briefcase, title: "Streamlined Pipeline", desc: "Track applicants from sourcing to onboarding" },
    { icon: TrendingUp, title: "Analytics Dashboard", desc: "Real-time insights into your hiring metrics" },
  ];

  const benefits = [
    "Reduce time-to-hire by 40%",
    "Collaborate seamlessly with your team",
    "Automate repetitive tasks",
    "Integrate with 100+ tools"
  ];

  return (
    <div className="min-h-screen bg-white dark:bg-slate-950">
      <Navbar />
      
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        {/* Background gradient orbs */}
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary-200/30 dark:bg-primary-900/20 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-200/30 dark:bg-purple-900/20 rounded-full blur-3xl"></div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-24 md:pt-32 md:pb-40">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left content */}
            <div className="text-center lg:text-left">
              {/* Badge */}
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary-50 dark:bg-primary-900/30 border border-primary-200 dark:border-primary-800 mb-8">
                <Sparkles className="w-4 h-4 text-primary-600 dark:text-primary-400" />
                <span className="text-sm font-medium text-primary-700 dark:text-primary-300">
                  Trusted by 2,000+ companies worldwide
                </span>
              </div>

              {/* Headline */}
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight mb-6">
                <span className="text-slate-900 dark:text-white">Hire the </span>
                <span className="bg-gradient-to-r from-primary-600 to-purple-600 bg-clip-text text-transparent">
                  right talent
                </span>
                <br />
                <span className="text-slate-900 dark:text-white">faster than ever</span>
              </h1>

              {/* Subheadline */}
              <p className="text-xl md:text-2xl text-slate-600 dark:text-slate-300 mb-10 leading-relaxed">
                Transform your recruitment process with intelligent automation, 
                seamless collaboration, and data-driven insights.
              </p>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row justify-center lg:justify-start gap-4 mb-12">
                <Link 
                  to="/register" 
                  className="group inline-flex items-center justify-center gap-2 px-8 py-4 bg-primary-600 text-white rounded-xl font-semibold hover:bg-primary-700 transition-all shadow-lg shadow-primary-600/30 hover:shadow-xl hover:shadow-primary-600/40 hover:-translate-y-0.5"
                >
                  Start Free Trial
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Link>
                <Link 
                  to="/pricing" 
                  className="inline-flex items-center justify-center px-8 py-4 bg-white dark:bg-slate-800 text-slate-900 dark:text-white border-2 border-slate-200 dark:border-slate-700 rounded-xl font-semibold hover:border-primary-300 dark:hover:border-primary-700 hover:bg-slate-50 dark:hover:bg-slate-800/80 transition-all"
                >
                  View Pricing
                </Link>
              </div>

              {/* Trust indicators */}
              <div className="flex flex-wrap justify-center lg:justify-start items-center gap-6 text-sm text-slate-500 dark:text-slate-400">
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-5 h-5 text-green-500" />
                  <span>Free 14-day trial</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-5 h-5 text-green-500" />
                  <span>No credit card required</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-5 h-5 text-green-500" />
                  <span>Cancel anytime</span>
                </div>
              </div>
            </div>

            {/* Right illustration */}
            <div className="hidden lg:block">
              <HeroIllustration />
            </div>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-20 bg-slate-50 dark:bg-slate-900/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white mb-4">
              Everything you need to scale hiring
            </h2>
            <p className="text-lg text-slate-600 dark:text-slate-300 max-w-2xl mx-auto">
              Powerful features designed to help modern HR teams work smarter, not harder
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {features.map((feature, idx) => (
              <div 
                key={idx}
                className="group p-8 bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 hover:border-primary-300 dark:hover:border-primary-700 hover:shadow-xl transition-all duration-300"
              >
                <div className="w-12 h-12 rounded-xl bg-primary-100 dark:bg-primary-900/30 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <feature.icon className="w-6 h-6 text-primary-600 dark:text-primary-400" />
                </div>
                <h3 className="text-xl font-semibold text-slate-900 dark:text-white mb-3">
                  {feature.title}
                </h3>
                <p className="text-slate-600 dark:text-slate-300">
                  {feature.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Collaboration Section with Illustration */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="order-2 lg:order-1">
              <CollaborationIllustration />
            </div>
            
            <div className="order-1 lg:order-2">
              <h2 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white mb-6">
                Built for modern recruitment teams
              </h2>
              <p className="text-lg text-slate-600 dark:text-slate-300 mb-8">
                From startups to enterprises, our platform adapts to your workflow and grows with your team.
              </p>
              
              <ul className="space-y-4">
                {benefits.map((benefit, idx) => (
                  <li key={idx} className="flex items-start gap-3">
                    <CheckCircle className="w-6 h-6 text-primary-600 dark:text-primary-400 flex-shrink-0 mt-0.5" />
                    <span className="text-lg text-slate-700 dark:text-slate-200">{benefit}</span>
                  </li>
                ))}
              </ul>

              <Link 
                to="/register"
                className="inline-flex items-center gap-2 mt-8 text-primary-600 dark:text-primary-400 font-semibold hover:gap-3 transition-all group"
              >
                Get started today
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Analytics Section with Illustration */}
      <section className="py-20 bg-slate-50 dark:bg-slate-900/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white mb-6">
                Make data-driven hiring decisions
              </h2>
              <p className="text-lg text-slate-600 dark:text-slate-300 mb-8">
                Track every metric that matters. From time-to-hire to candidate quality, 
                our analytics dashboard gives you the insights you need to optimize your recruitment strategy.
              </p>
              
              <div className="grid grid-cols-2 gap-6">
                <div className="bg-white dark:bg-slate-800 p-6 rounded-xl border border-slate-200 dark:border-slate-700">
                  <div className="text-3xl font-bold text-primary-600 dark:text-primary-400 mb-2">40%</div>
                  <div className="text-sm text-slate-600 dark:text-slate-300">Faster Hiring</div>
                </div>
                <div className="bg-white dark:bg-slate-800 p-6 rounded-xl border border-slate-200 dark:border-slate-700">
                  <div className="text-3xl font-bold text-purple-600 dark:text-purple-400 mb-2">87%</div>
                  <div className="text-sm text-slate-600 dark:text-slate-300">Success Rate</div>
                </div>
                <div className="bg-white dark:bg-slate-800 p-6 rounded-xl border border-slate-200 dark:border-slate-700">
                  <div className="text-3xl font-bold text-green-600 dark:text-green-400 mb-2">2.5x</div>
                  <div className="text-sm text-slate-600 dark:text-slate-300">ROI Increase</div>
                </div>
                <div className="bg-white dark:bg-slate-800 p-6 rounded-xl border border-slate-200 dark:border-slate-700">
                  <div className="text-3xl font-bold text-orange-600 dark:text-orange-400 mb-2">24/7</div>
                  <div className="text-sm text-slate-600 dark:text-slate-300">Support</div>
                </div>
              </div>
            </div>

            <div>
              <AnalyticsIllustration />
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-br from-primary-600 to-purple-600">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Ready to transform your hiring?
          </h2>
          <p className="text-xl text-primary-50 mb-8">
            Join thousands of companies already using our platform
          </p>
          <Link 
            to="/register"
            className="inline-flex items-center gap-2 px-8 py-4 bg-white text-primary-700 rounded-xl font-semibold hover:bg-primary-50 transition-all shadow-xl hover:shadow-2xl hover:-translate-y-0.5"
          >
            Start Your Free Trial
            <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Landing;
