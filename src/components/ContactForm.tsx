import React, { useState, useCallback, memo } from 'react';
import { useLanguage } from '../contexts/LanguageContext';

const Input = memo(({ 
  label, 
  type, 
  name, 
  value, 
  onChange, 
  required = false,
  disabled = false
}: {
  label: string;
  type: string;
  name: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  required?: boolean;
  disabled?: boolean;
}) => (
  <div>
    <label htmlFor={name} className="block text-sm font-medium text-dark-600 mb-1">
      {label}
    </label>
    {type === 'textarea' ? (
      <textarea
        id={name}
        name={name}
        value={value}
        onChange={onChange}
        required={required}
        disabled={disabled}
        rows={4}
        className="w-full px-4 py-2 bg-dark-100/50 backdrop-blur-sm border border-dark-200 rounded-xl focus:ring-2 focus:ring-accent-blue focus:border-transparent text-dark-800 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
      />
    ) : (
      <input
        type={type}
        id={name}
        name={name}
        value={value}
        onChange={onChange}
        required={required}
        disabled={disabled}
        className="w-full px-4 py-2 bg-dark-100/50 backdrop-blur-sm border border-dark-200 rounded-xl focus:ring-2 focus:ring-accent-blue focus:border-transparent text-dark-800 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
      />
    )}
  </div>
));

Input.displayName = 'Input';

const ContactForm: React.FC = () => {
  const { t } = useLanguage();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  });
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = useCallback(async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('submitting');
    setErrorMessage('');

    try {
      console.log('Submitting form to:', `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/contact-form`);
      
      const response = await fetch(`${import.meta.env.VITE_SUPABASE_URL}/functions/v1/contact-form`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${import.meta.env.VITE_SUPABASE_ANON_KEY}`,
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || errorData.details || `HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      console.log('Form submission response:', data);

      setStatus('success');
      setFormData({
        name: '',
        email: '',
        phone: '',
        message: ''
      });
    } catch (error) {
      console.error('Form submission error:', error);
      setStatus('error');
      setErrorMessage(error instanceof Error ? error.message : 'Failed to send message');
    }
  }, [formData]);

  const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  }, []);

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <Input
        label={t('contact.form.name')}
        type="text"
        name="name"
        value={formData.name}
        onChange={handleChange}
        required
        disabled={status === 'submitting'}
      />
      <Input
        label={t('contact.form.email')}
        type="email"
        name="email"
        value={formData.email}
        onChange={handleChange}
        required
        disabled={status === 'submitting'}
      />
      <Input
        label={t('contact.form.phone')}
        type="tel"
        name="phone"
        value={formData.phone}
        onChange={handleChange}
        disabled={status === 'submitting'}
      />
      <Input
        label={t('contact.form.message')}
        type="textarea"
        name="message"
        value={formData.message}
        onChange={handleChange}
        required
        disabled={status === 'submitting'}
      />
      {status === 'error' && (
        <div className="text-red-500 text-sm mt-2">{errorMessage}</div>
      )}
      {status === 'success' && (
        <div className="text-green-500 text-sm mt-2">{t('contact.form.success')}</div>
      )}
      <button
        type="submit"
        disabled={status === 'submitting'}
        className="w-full bg-gradient-to-r from-accent-blue via-accent-teal to-accent-blue bg-[length:200%_200%] animate-gradient-x text-white font-semibold py-3 px-6 rounded-xl transition-all transform hover:scale-105 hover:shadow-lg hover:shadow-accent-blue/20 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none disabled:hover:scale-100"
      >
        {status === 'submitting' ? t('contact.form.sending') : t('contact.form.submit')}
      </button>
    </form>
  );
};

export default ContactForm;