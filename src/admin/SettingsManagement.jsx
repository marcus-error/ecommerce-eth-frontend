import React, { useState, useEffect } from 'react';
import { ArrowLeft } from 'lucide-react';
import { adminService } from '../services/api';

export default function SettingsManagement({ onBack }) {
  const [settings, setSettings] = useState({
    store_name: 'The Ethnic Edit',
    tagline: 'Tradition, Beautifully Curated.',
    contact_email: 'hello@theethnicedit.com',
    contact_phone: '+91 98765 43210',
    contact_hours: 'Mon–Sat, 10am–7pm IST',
    about_story: 'The Ethnic Edit brings together temple-inspired designs, antique gold finishes and delicate pearl work, curated for weddings, festivals and every moment worth celebrating.'
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [toast, setToast] = useState('');

  const showToast = (msg) => {
    setToast(msg);
    setTimeout(() => setToast(''), 3000);
  };

  useEffect(() => {
    const load = async () => {
      try {
        setLoading(true);
        const res = await adminService.getSettings();
        if (res.success && res.settings) {
          setSettings((prev) => ({ ...prev, ...res.settings }));
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  const handleChange = (e) => {
    setSettings({ ...settings, [e.target.name]: e.target.value });
  };

  const handleSave = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      const res = await adminService.updateSettings(settings);
      if (res.success) {
        showToast('Store details and content updated successfully!');
      }
    } catch (err) {
      alert(err.message || 'Failed to save settings.');
    } finally {
      setSaving(false);
    }
  };

  return (
    <div style={{ maxWidth: '820px' }}>
      {toast && (
        <div style={{ position: 'fixed', top: '84px', right: '28px', background: 'linear-gradient(135deg, #f6dda0, #d4af37)', color: '#1a0418', padding: '12px 22px', borderRadius: '999px', fontWeight: 600, fontSize: '14px', zIndex: 9999 }}>
          ✓ {toast}
        </div>
      )}

      <div style={{ display: 'flex', alignItems: 'center', gap: '14px', marginBottom: '24px' }}>
        <button
          onClick={() => (onBack ? onBack() : window.history.back())}
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '6px',
            background: 'rgba(212,175,55,0.1)',
            border: '1px solid var(--gold)',
            color: 'var(--gold2)',
            padding: '8px 16px',
            borderRadius: '999px',
            fontSize: '13px',
            cursor: 'pointer',
            transition: 'all 0.2s'
          }}
          title="Go Back"
        >
          <ArrowLeft size={16} /> Back
        </button>
        <div>
          <h2 style={{ fontSize: '24px', fontWeight: 500, color: 'var(--gold2)', margin: 0 }}>
            Store Settings &amp; Editorial Content
          </h2>
          <p style={{ fontSize: '13px', color: 'var(--cream)', opacity: 0.75, margin: '4px 0 0' }}>
            Updates here automatically reflect in the customer website contact section, about narrative, and footer.
          </p>
        </div>
      </div>

      <form onSubmit={handleSave} style={{ display: 'flex', flexDirection: 'column', gap: '20px', background: '#1c0418', padding: '28px', borderRadius: '16px', border: '1px solid var(--line)' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '16px' }}>
          <div>
            <label style={{ fontSize: '12px', textTransform: 'uppercase', color: 'var(--gold)', display: 'block', marginBottom: '6px' }}>
              Store Name
            </label>
            <input
              name="store_name"
              value={settings.store_name}
              onChange={handleChange}
              style={{ width: '100%', background: 'rgba(255,240,208,0.06)', border: '1px solid var(--line)', padding: '10px 14px', borderRadius: '8px', color: '#fff' }}
            />
          </div>

          <div>
            <label style={{ fontSize: '12px', textTransform: 'uppercase', color: 'var(--gold)', display: 'block', marginBottom: '6px' }}>
              Tagline
            </label>
            <input
              name="tagline"
              value={settings.tagline}
              onChange={handleChange}
              style={{ width: '100%', background: 'rgba(255,240,208,0.06)', border: '1px solid var(--line)', padding: '10px 14px', borderRadius: '8px', color: '#fff' }}
            />
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '16px' }}>
          <div>
            <label style={{ fontSize: '12px', textTransform: 'uppercase', color: 'var(--gold)', display: 'block', marginBottom: '6px' }}>
              Contact Email
            </label>
            <input
              name="contact_email"
              value={settings.contact_email}
              onChange={handleChange}
              style={{ width: '100%', background: 'rgba(255,240,208,0.06)', border: '1px solid var(--line)', padding: '10px 14px', borderRadius: '8px', color: '#fff' }}
            />
          </div>

          <div>
            <label style={{ fontSize: '12px', textTransform: 'uppercase', color: 'var(--gold)', display: 'block', marginBottom: '6px' }}>
              Support Telephone
            </label>
            <input
              name="contact_phone"
              value={settings.contact_phone}
              onChange={handleChange}
              style={{ width: '100%', background: 'rgba(255,240,208,0.06)', border: '1px solid var(--line)', padding: '10px 14px', borderRadius: '8px', color: '#fff' }}
            />
          </div>

          <div>
            <label style={{ fontSize: '12px', textTransform: 'uppercase', color: 'var(--gold)', display: 'block', marginBottom: '6px' }}>
              Working Hours
            </label>
            <input
              name="contact_hours"
              value={settings.contact_hours}
              onChange={handleChange}
              style={{ width: '100%', background: 'rgba(255,240,208,0.06)', border: '1px solid var(--line)', padding: '10px 14px', borderRadius: '8px', color: '#fff' }}
            />
          </div>
        </div>

        <div>
          <label style={{ fontSize: '12px', textTransform: 'uppercase', color: 'var(--gold)', display: 'block', marginBottom: '6px' }}>
            Our Story / Brand Heritage Text
          </label>
          <textarea
            rows="4"
            name="about_story"
            value={settings.about_story}
            onChange={handleChange}
            style={{ width: '100%', background: 'rgba(255,240,208,0.06)', border: '1px solid var(--line)', padding: '12px 14px', borderRadius: '8px', color: '#fff', minHeight: '90px' }}
          />
        </div>

        <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '10px' }}>
          <button type="submit" className="gbtn" disabled={saving}>
            {saving ? 'Saving...' : 'Save Store Settings'}
          </button>
        </div>
      </form>
    </div>
  );
}

