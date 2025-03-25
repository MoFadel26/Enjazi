import React from 'react';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './style/Welcome.css'; // optional additional styling overrides

function Welcome() {
  return (
    <div>
      <header className="bg-gradient text-white py-5">
      </header>

      <section className="container py-5">
      </section>

      {/* Stats / How Enjazi Helps */}
      <section className="py-5 bg-light">
      </section>

      {/* CTA Section */}
      <section className="py-5 text-center">
      </section>

      {/* Footer */}
      <footer className="py-4 bg-dark text-white">
        <div className="container d-flex flex-column flex-md-row justify-content-between">
          <div className="mb-3 mb-md-0">
            <h5 className="fw-bold">Enjazi</h5>
            <p className="mb-0">
              Your all-in-one productivity solution for achieving goals and staying focused.
            </p>
          </div>
          <div className="mb-3 mb-md-0">
            <h6 className="fw-bold">Features</h6>
            <ul className="list-unstyled">
              <li>Task Management</li>
              <li>Pomodoro Timer</li>
              <li>Streak Tracking</li>
              <li>Analytics</li>
            </ul>
          </div>
          <div className="mb-3 mb-md-0">
            <h6 className="fw-bold">Resources</h6>b
            <ul className="list-unstyled">
              <li>Blog</li>
              <li>Help Center</li>
              <li>Community</li>
              <li>Tutorials</li>
            </ul>
          </div>
        </div>
        <hr className="my-3 text-secondary" />
        <div className="container d-flex justify-content-between">
          <p className="mb-0">&copy; 2025 Enjazi. All rights reserved.</p>
          <div>
            {/* Social Icons or Language Switchers */}
            <a href="#twitter" className="text-white me-3">
              <i className="bi bi-twitter"></i>
            </a>
            <a href="#linkedin" className="text-white">
              <i className="bi bi-linkedin"></i>
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Welcome;
