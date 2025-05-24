import React, { useState } from 'react';
import { Link, Outlet, useLocation } from 'react-router-dom';
import { Dialog } from '@headlessui/react';
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';
import { motion } from 'framer-motion';

const navigation = [
  { name: 'Dashboard', href: '/dashboard' },
  { name: 'My Courses', href: '/courses' },
  { name: 'Study Planner', href: '/planner' },
  { name: 'Resources', href: '/resources' },
  { name: 'Help Center', href: '/help' },
];

export default function Layout() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-red-900">
      <header className="fixed inset-x-0 top-0 z-50 bg-black/80 backdrop-blur-sm">
        <nav className="flex items-center justify-between p-6 lg:px-8" aria-label="Global">
          <div className="flex lg:flex-1">
            <Link to="/" className="-m-1.5 p-1.5">
              <span className="text-2xl font-bold text-red-500">LearnEd</span>
            </Link>
          </div>
          <div className="flex lg:hidden">
            <button
              type="button"
              className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-400"
              onClick={() => setMobileMenuOpen(true)}
              aria-expanded={mobileMenuOpen}
              aria-controls="mobile-menu"
              aria-label="Open main menu"
            >
              <span className="sr-only">Open main menu</span>
              <Bars3Icon className="h-6 w-6" aria-hidden="true" />
            </button>
          </div>
          <div className="hidden lg:flex lg:gap-x-12">
            {navigation.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                className={`text-sm font-semibold leading-6 transition ${
                  location.pathname === item.href
                    ? 'text-red-400'
                    : 'text-gray-300 hover:text-red-400'
                }`}
                aria-current={location.pathname === item.href ? 'page' : undefined}
              >
                {item.name}
              </Link>
            ))}
          </div>
          <div className="hidden lg:flex lg:flex-1 lg:justify-end">
            <Link
              to="/profile"
              className="text-sm font-semibold leading-6 text-gray-300 hover:text-red-400"
            >
              My Profile <span aria-hidden="true">&rarr;</span>
            </Link>
          </div>
        </nav>
        <Dialog as="div" className="lg:hidden" open={mobileMenuOpen} onClose={setMobileMenuOpen}>
          <div className="fixed inset-0 z-50" />
          <Dialog.Panel className="fixed inset-y-0 right-0 z-50 w-full overflow-y-auto bg-black px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
            <div className="flex items-center justify-between">
              <Link to="/" className="-m-1.5 p-1.5">
                <span className="text-2xl font-bold text-red-500">LearnEd</span>
              </Link>
              <button
                type="button"
                className="-m-2.5 rounded-md p-2.5 text-gray-400"
                onClick={() => setMobileMenuOpen(false)}
                aria-label="Close menu"
              >
                <span className="sr-only">Close menu</span>
                <XMarkIcon className="h-6 w-6" aria-hidden="true" />
              </button>
            </div>
            <div className="mt-6 flow-root">
              <div className="-my-6 divide-y divide-gray-500/10">
                <div className="space-y-2 py-6">
                  {navigation.map((item) => (
                    <Link
                      key={item.name}
                      to={item.href}
                      className={`-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 ${
                        location.pathname === item.href
                          ? 'text-red-400'
                          : 'text-gray-300 hover:text-red-400'
                      }`}
                      aria-current={location.pathname === item.href ? 'page' : undefined}
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      {item.name}
                    </Link>
                  ))}
                </div>
                <div className="py-6">
                  <Link
                    to="/profile"
                    className="-mx-3 block rounded-lg px-3 py-2.5 text-base font-semibold leading-7 text-gray-300 hover:text-red-400"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    My Profile
                  </Link>
                </div>
              </div>
            </div>
          </Dialog.Panel>
        </Dialog>
      </header>

      <main className="pt-20">
        <Outlet />
      </main>

      <footer className="bg-black/80 backdrop-blur-sm mt-auto py-6 text-center text-gray-400 text-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p>© {new Date().getFullYear()} LearnEd. Built with ❤️ in Australia.</p>
          <div className="mt-4 flex justify-center space-x-6">
            <a href="#accessibility" className="hover:text-red-400">Accessibility</a>
            <a href="#privacy" className="hover:text-red-400">Privacy Policy</a>
            <a href="#terms" className="hover:text-red-400">Terms of Use</a>
            <a href="#contact" className="hover:text-red-400">Contact Support</a>
          </div>
        </div>
      </footer>
    </div>
  );
} 