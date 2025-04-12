"use client";
import React, { ReactElement, useState } from 'react';
import { Activity, Bell, Shield, Clock, ArrowRight, Server, Globe, Zap, AlertTriangle, ChevronUp } from 'lucide-react';
import { useRouter } from 'next/router';

function App() {
  const [showScrollTop, setShowScrollTop] = useState(false);
  const router = useRouter();
  // Handle scroll to show/hide scroll-to-top button
  React.useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 300) {
        setShowScrollTop(true);
      } else {
        setShowScrollTop(false);
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-gray-900 text-gray-300">
      {/* Hero Section */}
      <header className="container mx-auto px-6 pt-32 pb-20">
        <div className="flex flex-col md:flex-row items-center justify-between">
          <div className="md:w-1/2 mb-10 md:mb-0">
            <div className="flex items-center mb-6">
              <div className="h-3 w-3 rounded-full bg-green-400 animate-pulse mr-2"></div>
              <span className="text-green-400 font-medium">All Systems Operational</span>
            </div>
            <h1 className="text-5xl font-bold leading-tight mb-6 text-white">
              Never Miss a <span className="text-indigo-500">Downtime</span> Again
            </h1>
            <p className="text-xl text-gray-400 mb-8">
              Real-time monitoring, instant alerts, and comprehensive insights for your web applications and services.
            </p>
            <div className="flex space-x-4">
              <button onClick={()=>{
                router.push('/dashboard')
              }} className="bg-indigo-600 text-white px-8 py-3 rounded-lg hover:bg-indigo-700 transition flex items-center">
                Start Monitoring
                <ArrowRight className="ml-2 h-5 w-5" />
              </button>
              <button className="border border-gray-600 text-gray-300 px-8 py-3 rounded-lg hover:bg-gray-800 hover:border-gray-500 transition">
                View Demo
              </button>
            </div>
          </div>
          <div className="md:w-1/2">
            <div className="bg-gray-800 p-6 rounded-lg shadow-2xl border border-gray-700">
              <div className="flex justify-between items-center mb-4">
                <h3 className="font-medium text-white">System Status</h3>
                <span className="text-green-400 text-sm">Live Data</span>
              </div>
              <div className="space-y-4">
                {[
                  { name: 'API Gateway', status: 'Operational', uptime: '99.99%', color: 'green' },
                  { name: 'Database Cluster', status: 'Operational', uptime: '99.95%', color: 'green' },
                  { name: 'CDN Network', status: 'Operational', uptime: '100%', color: 'green' },
                  { name: 'Authentication Service', status: 'Degraded', uptime: '97.32%', color: 'yellow' }
                ].map((service, index) => (
                  <div key={index} className="flex items-center justify-between p-3 bg-gray-850 rounded border border-gray-700">
                    <div className="flex items-center">
                      <div className={`h-2 w-2 rounded-full bg-${service.color}-400 mr-3`}></div>
                      <span>{service.name}</span>
                    </div>
                    <div className="flex items-center space-x-4">
                      <span className={`text-${service.color}-400 text-sm`}>{service.status}</span>
                      <span className="text-gray-500 text-sm">{service.uptime}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Live Status Dashboard */}
      <section className="py-6 bg-gray-850">
        <div className="container mx-auto px-6">
          <div className="flex overflow-x-auto py-4 scrollbar-hide">
            <div className="flex space-x-4">
              {[
                { status: 'Operational', count: 24 },
                { status: 'Degraded', count: 1 },
                { status: 'Outage', count: 0 }
              ].map((item, index) => (
                <div key={index} className="flex-shrink-0 flex items-center space-x-3 bg-gray-800 px-4 py-3 rounded-lg border border-gray-700">
                  <div className={`h-3 w-3 rounded-full ${item.status === 'Operational' ? 'bg-green-400' : item.status === 'Degraded' ? 'bg-yellow-400' : 'bg-red-400'}`}></div>
                  <div>
                    <div className="text-sm text-gray-400">{item.status}</div>
                    <div className="text-white font-medium">{item.count} Services</div>
                  </div>
                </div>
              ))}
              <div className="flex-shrink-0 flex items-center space-x-3 bg-gray-800 px-4 py-3 rounded-lg border border-gray-700">
                <Clock className="h-5 w-5 text-indigo-400" />
                <div>
                  <div className="text-sm text-gray-400">Avg. Response</div>
                  <div className="text-white font-medium">8.2ms</div>
                </div>
              </div>
              <div className="flex-shrink-0 flex items-center space-x-3 bg-gray-800 px-4 py-3 rounded-lg border border-gray-700">
                <AlertTriangle className="h-5 w-5 text-indigo-400" />
                <div>
                  <div className="text-sm text-gray-400">Last Incident</div>
                  <div className="text-white font-medium">3d ago</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-gray-850" id="features">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-white mb-4">
              Powerful Monitoring for Modern Infrastructure
            </h2>
            <p className="text-gray-400 max-w-3xl mx-auto">
              Our platform provides comprehensive visibility into your services, helping you maintain optimal performance and reliability.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            <FeatureCard
              icon={<Bell className="h-8 w-8 text-indigo-500" />}
              title="Smart Alerting"
              description="Get notified through multiple channels when your services experience downtime or performance degradation."
            />
            <FeatureCard
              icon={<Shield className="h-8 w-8 text-indigo-500" />}
              title="Secure Monitoring"
              description="Enterprise-grade security with encrypted communications and strict access controls."
            />
            <FeatureCard
              icon={<Clock className="h-8 w-8 text-indigo-500" />}
              title="24/7 Monitoring"
              description="Round-the-clock monitoring with historical data retention and trend analysis."
            />
            <FeatureCard
              icon={<Server className="h-8 w-8 text-indigo-500" />}
              title="Multi-Service Support"
              description="Monitor websites, APIs, databases, and cloud services from a single dashboard."
            />
            <FeatureCard
              icon={<Globe className="h-8 w-8 text-indigo-500" />}
              title="Global Monitoring"
              description="Check your services from multiple locations around the world for a complete view."
            />
            <FeatureCard
              icon={<Zap className="h-8 w-8 text-indigo-500" />}
              title="Lightning Fast"
              description="Real-time metrics with sub-second precision to catch even the briefest issues."
            />
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-gray-900">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-3 gap-8 text-center">
            <StatCard icon={<Server className="h-8 w-8 text-indigo-500" />} value="99.9%" label="Uptime Guarantee" />
            <StatCard icon={<Globe className="h-8 w-8 text-indigo-500" />} value="150+" label="Global Locations" />
            <StatCard icon={<Zap className="h-8 w-8 text-indigo-500" />} value="10ms" label="Average Response Time" />
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-indigo-900 py-20 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-full h-full">
            {Array.from({ length: 20 }).map((_, i) => (
              <div 
                key={i}
                style={{
                  position: 'absolute',
                  top: `80%`,
                  left: `80%`,
                  width: `80px`,
                  height: `80px`,
                  backgroundColor: '#fff',
                  borderRadius: '50%',
                  opacity: 0.6
                }}
              />
            ))}
          </div>
        </div>
        <div className="container mx-auto px-6 text-center relative z-10">
          <h2 className="text-3xl font-bold text-white mb-8">
            Start Monitoring Your Services Today
          </h2>
          <p className="text-indigo-200 mb-8 max-w-2xl mx-auto">
            Join thousands of companies that trust UptimeGuard for their critical monitoring needs.
          </p>
          <div className="flex flex-col sm:flex-row justify-center items-center space-y-4 sm:space-y-0 sm:space-x-4">
            <button className="bg-white text-indigo-900 px-8 py-3 rounded-lg hover:bg-indigo-100 transition w-full sm:w-auto">
              Start Free Trial
            </button>
            <button className="border border-indigo-400 text-white px-8 py-3 rounded-lg hover:bg-indigo-800 transition w-full sm:w-auto">
              Schedule Demo
            </button>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 bg-gray-850">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-bold text-center text-white mb-16">
            Trusted by DevOps Teams Worldwide
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                quote: "UptimeGuard has transformed how we monitor our infrastructure. We've reduced our response time to incidents by 70%.",
                author: "Sarah L.",
                role: "DevOps Lead, TechCorp"
              },
              {
                quote: "The alerting system is top-notch. We're now catching issues before they impact our customers.",
                author: "David R.",
                role: "CTO, SaaSProvider"
              },
              {
                quote: "I sleep better at night knowing UptimeGuard is watching our systems around the clock.",
                author: "Michael T.",
                role: "Infrastructure Manager, DataCompany"
              }
            ].map((testimonial, index) => (
              <div key={index} className="bg-gray-800 p-8 rounded-lg shadow-lg border border-gray-700">
                <div className="mb-6 text-indigo-400">
                  <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M10.667 12H5.33366C4.96547 12 4.66699 11.7015 4.66699 11.3333V6C4.66699 5.63181 4.96547 5.33333 5.33366 5.33333H10.667C11.0352 5.33333 11.3337 5.63181 11.3337 6V11.3333C11.3337 11.7015 11.0352 12 10.667 12Z" fill="currentColor"/>
                    <path d="M26.6663 12H21.333C20.9648 12 20.6663 11.7015 20.6663 11.3333V6C20.6663 5.63181 20.9648 5.33333 21.333 5.33333H26.6663C27.0345 5.33333 27.333 5.63181 27.333 6V11.3333C27.333 11.7015 27.0345 12 26.6663 12Z" fill="currentColor"/>
                    <path d="M10.667 28H5.33366C4.96547 28 4.66699 27.7015 4.66699 27.3333V22C4.66699 21.6318 4.96547 21.3333 5.33366 21.3333H10.667C11.0352 21.3333 11.3337 21.6318 11.3337 22V27.3333C11.3337 27.7015 11.0352 28 10.667 28Z" fill="currentColor"/>
                    <path d="M26.6663 28H21.333C20.9648 28 20.6663 27.7015 20.6663 27.3333V22C20.6663 21.6318 20.9648 21.3333 21.333 21.3333H26.6663C27.0345 21.3333 27.333 21.6318 27.333 22V27.3333C27.333 27.7015 27.0345 28 26.6663 28Z" fill="currentColor"/>
                  </svg>
                </div>
                <p className="text-gray-300 mb-6">{testimonial.quote}</p>
                <div>
                  <div className="text-white font-medium">{testimonial.author}</div>
                  <div className="text-gray-500 text-sm">{testimonial.role}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-400 py-12">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-6">
                <Activity className="h-6 w-6 text-indigo-500" />
                <span className="text-lg font-bold text-white">UptimeGuard</span>
              </div>
              <p className="text-sm">
                Enterprise-grade monitoring solutions for modern infrastructure.
              </p>
            </div>
            <div>
              <h3 className="text-white font-semibold mb-4">Product</h3>
              <ul className="space-y-2">
                <li><a href="#" className="hover:text-indigo-400 transition">Features</a></li>
                <li><a href="#" className="hover:text-indigo-400 transition">Pricing</a></li>
                <li><a href="#" className="hover:text-indigo-400 transition">Documentation</a></li>
                <li><a href="#" className="hover:text-indigo-400 transition">Status</a></li>
              </ul>
            </div>
            <div>
              <h3 className="text-white font-semibold mb-4">Company</h3>
              <ul className="space-y-2">
                <li><a href="#" className="hover:text-indigo-400 transition">About</a></li>
                <li><a href="#" className="hover:text-indigo-400 transition">Blog</a></li>
                <li><a href="#" className="hover:text-indigo-400 transition">Careers</a></li>
                <li><a href="#" className="hover:text-indigo-400 transition">Contact</a></li>
              </ul>
            </div>
            <div>
              <h3 className="text-white font-semibold mb-4">Legal</h3>
              <ul className="space-y-2">
                <li><a href="#" className="hover:text-indigo-400 transition">Privacy</a></li>
                <li><a href="#" className="hover:text-indigo-400 transition">Terms</a></li>
                <li><a href="#" className="hover:text-indigo-400 transition">Security</a></li>
                <li><a href="#" className="hover:text-indigo-400 transition">Compliance</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-12 pt-8 text-sm text-center">
            © 2025 UptimeGuard. All rights reserved.
          </div>
        </div>
      </footer>

      {/* Scroll to top button */}
      {showScrollTop && (
        <button 
          onClick={scrollToTop}
          className="fixed bottom-6 right-6 bg-indigo-600 text-white p-3 rounded-full shadow-lg hover:bg-indigo-700 transition-all z-50"
        >
          <ChevronUp className="h-5 w-5" />
        </button>
      )}
    </div>
  );
}

function FeatureCard({ icon, title, description }: {
  icon: ReactElement,
  title: string,
  description: string
}) {
  return (
    <div className="bg-gray-800 p-8 rounded-lg shadow-lg border border-gray-700 hover:border-indigo-500 transition-all duration-300">
      <div className="mb-4">{icon}</div>
      <h3 className="text-xl font-semibold mb-4 text-white">{title}</h3>
      <p className="text-gray-400">{description}</p>
    </div>
  );
}

function StatCard({ icon, value, label }: {
  icon: ReactElement,
  value: string,
  label: string
}) {
  return (
    <div className="p-8 bg-gray-800 rounded-lg shadow-lg border border-gray-700">
      <div className="flex justify-center mb-4">{icon}</div>
      <div className="text-3xl font-bold text-white mb-2">{value}</div>
      <div className="text-gray-400">{label}</div>
    </div>
  );
}

export default App;