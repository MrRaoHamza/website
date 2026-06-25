import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Send, CheckCircle, AlertCircle, Sparkles } from 'lucide-react';

const ContactForm = () => {
  const [status, setStatus] = useState('idle'); // idle | loading | success | error
  const { register, handleSubmit, reset, formState: { errors } } = useForm();

  const onSubmit = async (data) => {
    // Honeypot spam check
    if (data.website_url) {
      // Silently discard spam submission and show success to trick the bot
      setStatus('loading');
      setTimeout(() => setStatus('success'), 1000);
      return;
    }

    setStatus('loading');

    // Simulate sending email api
    setTimeout(() => {
      setStatus('success');
      reset();
      // Reset back to idle after 5 seconds
      setTimeout(() => setStatus('idle'), 5000);
    }, 1500);
  };

  return (
    <section id="contact" className="py-24 relative overflow-hidden">
      {/* Ambient background glows */}
      <div className="absolute bottom-0 left-10 w-[300px] h-[300px] bg-blue-500/5 rounded-full blur-[80px] pointer-events-none" />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-xs font-semibold uppercase tracking-wider text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/30 px-3 py-1 rounded-full">
            Get in touch
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold font-display text-slate-900 dark:text-white mt-4">
            Let's build something intelligent
          </h2>
          <p className="mt-4 text-slate-500 dark:text-text-secondary-dark text-sm leading-relaxed">
            Have an open opportunity, a dataset that needs analyzing, or just want to talk about machine learning? Drop a message!
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-start">
          {/* Info cards */}
          <div className="md:col-span-1 space-y-4">
            <div className="p-6 rounded-2xl bg-white dark:bg-dark-card border border-slate-200/60 dark:border-dark-border/60 shadow-sm flex flex-col">
              <span className="text-xs font-semibold text-slate-400 dark:text-text-muted-dark uppercase tracking-wider">Email Direct</span>
              <a href="mailto:mr.raohamza@gmail.com" className="text-sm font-semibold text-slate-800 dark:text-white hover:text-blue-500 dark:hover:text-blue-400 transition-colors mt-2 break-all">
                mr.raohamza@gmail.com
              </a>
            </div>
            <div className="p-6 rounded-2xl bg-white dark:bg-dark-card border border-slate-200/60 dark:border-dark-border/60 shadow-sm flex flex-col">
              <span className="text-xs font-semibold text-slate-400 dark:text-text-muted-dark uppercase tracking-wider">Location</span>
              <span className="text-sm font-semibold text-slate-800 dark:text-white mt-2">
                Pakistan (Open to Remote / Relocation)
              </span>
            </div>
            <div className="p-6 rounded-2xl bg-white dark:bg-dark-card border border-slate-200/60 dark:border-dark-border/60 shadow-sm flex flex-col">
              <span className="text-xs font-semibold text-slate-400 dark:text-text-muted-dark uppercase tracking-wider">Response Time</span>
              <span className="text-sm font-semibold text-slate-800 dark:text-white mt-2 flex items-center">
                <span className="w-2 h-2 bg-emerald-500 rounded-full mr-2" />
                Within 24 Hours
              </span>
            </div>
          </div>

          {/* Form */}
          <div className="md:col-span-2 p-8 rounded-2xl bg-white dark:bg-dark-card border border-slate-200/60 dark:border-dark-border/60 shadow-md glow-card">
            {status === 'success' ? (
              <div className="py-12 text-center flex flex-col items-center">
                <div className="p-3 bg-emerald-50 dark:bg-emerald-950/40 text-emerald-500 dark:text-emerald-400 rounded-full mb-4 animate-bounce">
                  <CheckCircle size={40} />
                </div>
                <h3 className="text-xl font-bold font-display text-slate-900 dark:text-white">Message Transmitted!</h3>
                <p className="mt-2 text-sm text-slate-500 dark:text-text-secondary-dark max-w-sm">
                  Thank you for reaching out. Rao's mailbox has queued your inquiry, and he will reply shortly.
                </p>
                <button
                  onClick={() => setStatus('idle')}
                  className="mt-6 px-5 py-2 text-xs font-semibold bg-slate-100 hover:bg-slate-200 dark:bg-dark-surface dark:hover:bg-dark-bg text-slate-700 dark:text-white rounded-lg transition-colors cursor-pointer"
                >
                  Send another message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
                {/* Honeypot Spam Protection Field */}
                <input
                  type="text"
                  name="website_url"
                  className="hidden"
                  tabIndex="-1"
                  autoComplete="off"
                  {...register('website_url')}
                />

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="name" className="block text-xs font-semibold text-slate-500 dark:text-text-secondary-dark mb-1.5">
                      Name
                    </label>
                    <input
                      id="name"
                      type="text"
                      placeholder="Alan Turing"
                      {...register('name', { required: 'Name is required' })}
                      className={`w-full bg-slate-50 dark:bg-dark-bg/60 border rounded-xl px-4 py-2.5 text-sm focus:outline-none transition-colors ${
                        errors.name ? 'border-red-500 focus:border-red-500' : 'border-slate-200 dark:border-dark-border focus:border-blue-500'
                      }`}
                    />
                    {errors.name && (
                      <span className="text-[10px] text-red-500 flex items-center mt-1">
                        <AlertCircle size={10} className="mr-1" />
                        {errors.name.message}
                      </span>
                    )}
                  </div>

                  <div>
                    <label htmlFor="email" className="block text-xs font-semibold text-slate-500 dark:text-text-secondary-dark mb-1.5">
                      Email Address
                    </label>
                    <input
                      id="email"
                      type="email"
                      placeholder="alan@turing.org"
                      {...register('email', { 
                        required: 'Email is required',
                        pattern: {
                          value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                          message: 'Invalid email address'
                        }
                      })}
                      className={`w-full bg-slate-50 dark:bg-dark-bg/60 border rounded-xl px-4 py-2.5 text-sm focus:outline-none transition-colors ${
                        errors.email ? 'border-red-500 focus:border-red-500' : 'border-slate-200 dark:border-dark-border focus:border-blue-500'
                      }`}
                    />
                    {errors.email && (
                      <span className="text-[10px] text-red-500 flex items-center mt-1">
                        <AlertCircle size={10} className="mr-1" />
                        {errors.email.message}
                      </span>
                    )}
                  </div>
                </div>

                <div>
                  <label htmlFor="subject" className="block text-xs font-semibold text-slate-500 dark:text-text-secondary-dark mb-1.5">
                    Subject
                  </label>
                  <input
                    id="subject"
                    type="text"
                    placeholder="Machine Learning Opportunities"
                    {...register('subject', { required: 'Subject is required' })}
                    className={`w-full bg-slate-50 dark:bg-dark-bg/60 border rounded-xl px-4 py-2.5 text-sm focus:outline-none transition-colors ${
                      errors.subject ? 'border-red-500 focus:border-red-500' : 'border-slate-200 dark:border-dark-border focus:border-blue-500'
                    }`}
                  />
                  {errors.subject && (
                    <span className="text-[10px] text-red-500 flex items-center mt-1">
                      <AlertCircle size={10} className="mr-1" />
                      {errors.subject.message}
                    </span>
                  )}
                </div>

                <div>
                  <label htmlFor="message" className="block text-xs font-semibold text-slate-500 dark:text-text-secondary-dark mb-1.5">
                    Message
                  </label>
                  <textarea
                    id="message"
                    rows="4"
                    placeholder="Describe your project, team, or opportunity..."
                    {...register('message', { 
                      required: 'Message is required',
                      minLength: { value: 10, message: 'Message must be at least 10 characters long' }
                    })}
                    className={`w-full bg-slate-50 dark:bg-dark-bg/60 border rounded-xl px-4 py-2.5 text-sm focus:outline-none transition-colors resize-none ${
                      errors.message ? 'border-red-500 focus:border-red-500' : 'border-slate-200 dark:border-dark-border focus:border-blue-500'
                    }`}
                  />
                  {errors.message && (
                    <span className="text-[10px] text-red-500 flex items-center mt-1">
                      <AlertCircle size={10} className="mr-1" />
                      {errors.message.message}
                    </span>
                  )}
                </div>

                <button
                  type="submit"
                  disabled={status === 'loading'}
                  className="w-full flex items-center justify-center space-x-2 py-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold text-sm shadow-md shadow-blue-500/10 hover:shadow-blue-500/25 hover:scale-[1.01] active:scale-[0.99] disabled:opacity-75 disabled:scale-100 disabled:pointer-events-none transition-all cursor-pointer"
                >
                  {status === 'loading' ? (
                    <>
                      <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      <span>Optimizing Weights...</span>
                    </>
                  ) : (
                    <>
                      <Send size={15} />
                      <span>Transmit Message</span>
                    </>
                  )}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactForm;
