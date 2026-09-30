import { useState } from 'react';
import { useReveal } from '../hooks/useAnimations';
import { siteConfig } from '../data/mockData';
import Button from './Button';
import { ArrowRight, MapPin, Phone, Mail, Clock, Send } from 'lucide-react';

export default function Reservations() {
  const { ref, isRevealed } = useReveal();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    github: '',
    role: '',
    message: '',
  });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 4000);
  };

  return (
    <section id="reservations" className="relative bg-[var(--color-bg-dark)] overflow-hidden">
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_30%_50%,rgba(255,107,0,0.05),transparent_60%)]" />
      </div>

      <div className="section-padding max-w-7xl mx-auto relative">
        <div ref={ref} className={`reveal ${isRevealed ? 'is-revealed' : ''}`}>
          <div className="flex flex-col lg:flex-row gap-12 lg:gap-16">
            {/* Left: Info */}
            <div className="w-full lg:w-5/12">
              <p className="kicker mb-4">Become a member</p>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-6">
                Join the{' '}
                <span className="text-[var(--color-primary)]">Club</span>
              </h2>
              <p className="text-[var(--color-text-secondary)] text-lg leading-relaxed mb-10">
                Whether you're a beginner learning the ropes or an experienced hacker, 
                we're always looking for passionate individuals to join our ranks.
              </p>

              {/* Contact info */}
              <div className="space-y-5">
                {[
                  { icon: MapPin, label: 'Location', value: siteConfig.address, href: siteConfig.mapLink },
                  { icon: Phone, label: 'Phone', value: siteConfig.phone, href: `tel:${siteConfig.phone}` },
                  { icon: Mail, label: 'Email', value: siteConfig.email, href: `mailto:${siteConfig.email}` },
                  { icon: Clock, label: 'Meetings', value: 'Weekly, Friday 6pm', href: null },
                ].map((item) => (
                  <div key={item.label} className="flex items-start gap-4 group">
                    <div className="w-10 h-10 rounded-lg bg-[var(--color-bg-card)] border border-[var(--color-border)] flex items-center justify-center text-[var(--color-primary)] shrink-0 group-hover:border-[var(--color-border-orange)] transition-colors">
                      <item.icon size={16} />
                    </div>
                    <div>
                      <div className="text-xs text-[var(--color-text-muted)] uppercase tracking-wider mb-0.5">{item.label}</div>
                      {item.href ? (
                        <a href={item.href} target="_blank" rel="noopener noreferrer" className="text-white hover:text-[var(--color-primary)] transition-colors text-sm">
                          {item.value}
                        </a>
                      ) : (
                        <div className="text-white text-sm">{item.value}</div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right: Form */}
            <div className="w-full lg:w-7/12">
              <form
                onSubmit={handleSubmit}
                className="p-6 md:p-8 rounded-2xl border border-[var(--color-border)] bg-[var(--color-bg-card)]"
              >
                {submitted ? (
                  <div className="text-center py-12">
                    <div className="w-16 h-16 rounded-full bg-[var(--color-primary)] mx-auto mb-4 flex items-center justify-center animate-pulse">
                      <Send size={24} className="text-white" />
                    </div>
                    <h3 className="text-2xl font-bold text-white mb-2">Application Received!</h3>
                    <p className="text-[var(--color-text-secondary)]">We'll review it and reach out shortly.</p>
                  </div>
                ) : (
                  <>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                      <InputField label="Full Name" name="name" placeholder="Your name" value={formData.name} onChange={handleChange} required />
                      <InputField label="Email" name="email" type="email" placeholder="your@email.com" value={formData.email} onChange={handleChange} required />
                      <InputField label="Phone" name="phone" type="tel" placeholder="+20 xxx xxx xxxx" value={formData.phone} onChange={handleChange} />
                      <InputField label="GitHub / Handle" name="github" type="text" placeholder="username" value={formData.github} onChange={handleChange} />
                      <div>
                        <label className="block text-xs text-[var(--color-text-muted)] uppercase tracking-wider mb-2 font-medium">Domain of Interest</label>
                        <select
                          name="role"
                          value={formData.role}
                          onChange={handleChange}
                          className="w-full px-4 py-3 rounded-lg bg-[var(--color-bg-deep)] border border-[var(--color-border)] text-white text-sm focus:border-[var(--color-primary)] focus:outline-none transition-colors appearance-none cursor-pointer"
                          required
                        >
                          <option value="">Select Domain</option>
                          <option value="web">Web Security</option>
                          <option value="binary">Binary Exploitation</option>
                          <option value="crypto">Cryptography</option>
                          <option value="re">Reverse Engineering</option>
                          <option value="dev">Software Development</option>
                        </select>
                      </div>
                    </div>

                    <div className="mb-6">
                      <label className="block text-xs text-[var(--color-text-muted)] uppercase tracking-wider mb-2 font-medium">Why do you want to join?</label>
                      <textarea
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        placeholder="Tell us about your experience and interests..."
                        rows={3}
                        className="w-full px-4 py-3 rounded-lg bg-[var(--color-bg-deep)] border border-[var(--color-border)] text-white text-sm focus:border-[var(--color-primary)] focus:outline-none transition-colors resize-none placeholder:text-[var(--color-text-muted)]"
                      />
                    </div>

                    <Button type="submit" className="w-full" icon={ArrowRight}>
                      Submit Application
                    </Button>
                  </>
                )}
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function InputField({ label, name, type = 'text', placeholder, value, onChange, required }) {
  return (
    <div>
      <label className="block text-xs text-[var(--color-text-muted)] uppercase tracking-wider mb-2 font-medium">
        {label} {required && <span className="text-[var(--color-primary)]">*</span>}
      </label>
      <input
        type={type}
        name={name}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        required={required}
        className="w-full px-4 py-3 rounded-lg bg-[var(--color-bg-deep)] border border-[var(--color-border)] text-white text-sm focus:border-[var(--color-primary)] focus:outline-none transition-colors placeholder:text-[var(--color-text-muted)]"
      />
    </div>
  );
}
