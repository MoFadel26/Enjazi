import React from 'react';
import { Link } from 'react-router-dom';
import {
  Clock,
  CheckSquare,
  Zap,
  Users,
  LayoutDashboard,
  BarChart3,
  ArrowRight,
  Twitter,
  Linkedin,
  Github,
} from 'lucide-react';

import FeatureCard from 'components/featureCard';

export default function LandingPage() {
  return (
    <div className="flex flex-col min-h-screen font-inter">
      <div className="bg-gradient-to-br from-[#0284c7] to-[#1949b2] text-white">
        <header className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center">
            <div className="text-2xl font-bold flex items-center">
              <div className="bg-white p-1 rounded mr-2">
                <div className="text-[#0284c7] font-bold">E</div>
              </div>
              Enjazi
            </div>
          </div>
          <div className="flex items-center gap-4">
            <Link to="/settings" className="text-white hover:text-blue-100 transition">
              Settings
            </Link>
            <Link to="/login" className="text-white hover:text-blue-100 transition">
              Login
            </Link>
            <Link
              to="/signup"
              className="bg-white text-[#0284c7] px-4 py-2 rounded-md text-sm font-medium hover:bg-blue-50 transition"
            >
              Get Started
            </Link>
          </div>
        </header>

        <div className="container mx-auto px-4 py-20 text-center">
          <h1 className="text-5xl md:text-6xl font-bold mb-6 tracking-tight">Achieve More with Enjazi</h1>
          <p className="text-xl max-w-3xl mx-auto mb-10">
            Transform your productivity with Enjazi's smart scheduling, goal tracking, and collaborative workspace
            features.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              to="/signup"
              className="bg-white text-[#0284c7] px-6 py-3 rounded-md font-medium hover:bg-blue-50 transition flex items-center"
            >
              Start For Free <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
            {/* <Link
              to="/demo"
              className="bg-[#2f97ff]/20 text-white border border-white/30 px-6 py-3 rounded-md font-medium hover:bg-[#2f97ff]/30 transition"
            >
              Watch a demo
            </Link> */}
          </div>
        </div>
      </div>

      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">Powerful Features to Maximize Productivity</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Everything you need to stay focused, track progress, and achieve your goals
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <FeatureCard
              icon={<Clock className="text-[#0284c7]" />}
              title="Smart Scheduling"
              description="Automate your scheduling with AI-powered suggestions."
            />
            <FeatureCard
              icon={<CheckSquare className="text-[#0284c7]" />}
              title="Goal Tracking"
              description="Set, track, and achieve your goals with ease."
            />
            <FeatureCard
              icon={<Zap className="h-6 w-6 text-amber-500" />}
              title="Streak Tracking"
              description="Build habits that last by maintaining daily streaks and visualizing your progress."
            />
            <FeatureCard
              icon={<Users className="h-6 w-6 text-green-500" />}
              title="Collaboration Rooms"
              description="Join virtual rooms to work alongside others and stay motivated together."
            />
            <FeatureCard
              icon={<LayoutDashboard className="h-6 w-6 text-purple-500" />}
              title="Customizable Dashboard"
              description="Personalize your workspace to see the metrics and tools that matter most to you."
            />
            <FeatureCard
              icon={<BarChart3 className="h-6 w-6 text-red-500" />}
              title="Performance Analytics"
              description="Gain insights from detailed statistics about your productivity and focus time."
            />
          </div>
        </div>
      </section>

      {/* Additional sections (AI, CTA, Footer) */}

      {/* AI Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-16">How Enjazi AI Helps You</h2>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-lg shadow-sm">
              <div className="text-center mb-4">
                <div className="text-blue-600 font-medium">Save Money</div>
                <div className="text-5xl font-bold my-2">0%</div>
                <div className="text-sm text-gray-500">More billable time captured*</div>
              </div>
              <p className="text-gray-600 mb-4">Manual timekeeping often results in forgotten billable work.</p>
              <p className="text-sm text-blue-600">
                Enjazi AI integrates with your work tools so that no time is left unbilled.
              </p>
            </div>

            <div className="bg-white p-8 rounded-lg shadow-sm">
              <div className="text-center mb-4">
                <div className="text-blue-600 font-medium">Save Time</div>
                <div className="text-5xl font-bold my-2">8%</div>
                <div className="text-sm text-gray-500">Less time spent on billing*</div>
              </div>
              <p className="text-gray-600 mb-4">The average practitioner spends 8-14 hours on billing each month.</p>
              <p className="text-sm text-blue-600">
                Enjazi's AI aims to reduce time spent to less than one hour a month.
              </p>
            </div>

            <div className="bg-white p-8 rounded-lg shadow-sm">
              <div className="text-center mb-4">
                <div className="text-blue-600 font-medium">Save Yourself</div>
                <div className="text-5xl font-bold my-2">73x</div>
                <div className="text-sm text-gray-500">Therapy Visits Saved*</div>
              </div>
              <p className="text-gray-600 mb-4">
                Billing is often cited as one of the biggest pain points for freelancers.
              </p>
              <p className="text-sm text-blue-600">
                Enjazi's AI operates automatically, freeing you from manual tracking.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-br from-[#0284c7] to-[#1949b2] text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Boost Your Productivity?</h2>
          <p className="max-w-2xl mx-auto mb-8">
            Join thousands of users who have transformed their work habits with Enjazi
          </p>
          <Link
            href="/signup"
            className="bg-white text-[#0284c7] px-6 py-3 rounded-md font-medium hover:bg-blue-50 transition inline-block"
          >
            Get Started For Free
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="flex items-center mb-4">
                <div className="bg-white p-1 rounded mr-2">
                  <div className="text-[#0284c7] font-bold">E</div>
                </div>
                <div className="text-xl font-bold">Enjazi</div>
              </div>
              <p className="text-gray-400 text-sm">
                Your all-in-one productivity solution for achieving goals and staying focused.
              </p>
            </div>

            <div>
              <h3 className="font-semibold mb-4">Features</h3>
              <ul className="space-y-2">
                <li>
                  <Link href="#" className="text-gray-400 hover:text-white text-sm">
                    Task Management
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-gray-400 hover:text-white text-sm">
                    Pomodoro Timer
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-gray-400 hover:text-white text-sm">
                    Streak Tracking
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-gray-400 hover:text-white text-sm">
                    Analytics
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold mb-4">Resources</h3>
              <ul className="space-y-2">
                <li>
                  <Link href="#" className="text-gray-400 hover:text-white text-sm">
                    Blog
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-gray-400 hover:text-white text-sm">
                    Help Center
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-gray-400 hover:text-white text-sm">
                    Community
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-gray-400 hover:text-white text-sm">
                    Tutorials
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold mb-4">Company</h3>
              <ul className="space-y-2">
                <li>
                  <Link href="#" className="text-gray-400 hover:text-white text-sm">
                    About Us
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-gray-400 hover:text-white text-sm">
                    Careers
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-gray-400 hover:text-white text-sm">
                    Privacy Policy
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-gray-400 hover:text-white text-sm">
                    Terms of Service
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center">
            <div className="text-gray-400 text-sm mb-4 md:mb-0">© 2025 Enjazi. All rights reserved.</div>
            <div className="flex space-x-4">
              <Link href="#" className="text-gray-400 hover:text-white">
                <Twitter className="h-5 w-5" />
              </Link>
              <Link href="#" className="text-gray-400 hover:text-white">
                <Linkedin className="h-5 w-5" />
              </Link>
              <Link href="#" className="text-gray-400 hover:text-white">
                <Github className="h-5 w-5" />
              </Link>
            </div>
          </div>
        </div>
      </footer> 
    </div>
  );
}
