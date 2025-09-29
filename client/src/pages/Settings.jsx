import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { customerAPI } from '../services/api';

const Settings = () => {
  const { user, checkAuthStatus } = useAuth();
  const [profile, setProfile] = useState({ name: '', email: '' });
  const [address, setAddress] = useState({ street: '', city: '', state: '', zipCode: '', country: '' });
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (user) {
      setProfile({ name: user.name || '', email: user.email || '' });
      const a = user.shippingAddress || {};
      setAddress({
        street: a.street || '',
        city: a.city || '',
        state: a.state || '',
        zipCode: a.zipCode || '',
        country: a.country || ''
      });
    }
  }, [user]);

  const save = async (e) => {
    if (e && e.preventDefault) e.preventDefault();
    setSaving(true);
    try {
      await customerAPI.updateProfile({ name: profile.name, shippingAddress: address });
      await checkAuthStatus();
      alert('Profile updated');
    } catch (e) {
      alert(e.message || 'Failed to update');
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-container">
        <div className="auth-panel">
          <div className="auth-header">
            <h1>BLUE KINGDOM</h1>
            <h2>Settings</h2>
          </div>
          <form onSubmit={save}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', width: '100%' }}>
              <div>
                <h3 style={{ color: '#fff', marginBottom: 8 }}>Profile</h3>
                <div className="form-group">
                  <input type="text" value={profile.name} onChange={e => setProfile({ ...profile, name: e.target.value })} placeholder="Full Name" />
                </div>
                <div className="form-group">
                  <input type="email" value={profile.email} disabled placeholder="Email" />
                </div>
              </div>
              <div>
                <h3 style={{ color: '#fff', marginBottom: 8 }}>Shipping Address</h3>
                <div className="form-group"><input type="text" value={address.street} onChange={e => setAddress({ ...address, street: e.target.value })} placeholder="Street" /></div>
                <div className="form-row" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                  <div className="form-group"><input type="text" value={address.city} onChange={e => setAddress({ ...address, city: e.target.value })} placeholder="City" /></div>
                  <div className="form-group"><input type="text" value={address.state} onChange={e => setAddress({ ...address, state: e.target.value })} placeholder="State/Province" /></div>
                </div>
                <div className="form-row" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                  <div className="form-group"><input type="text" value={address.zipCode} onChange={e => setAddress({ ...address, zipCode: e.target.value })} placeholder="Postal Code" /></div>
                  <div className="form-group"><input type="text" value={address.country} onChange={e => setAddress({ ...address, country: e.target.value })} placeholder="Country" /></div>
                </div>
              </div>
            </div>
            <button className="auth-button" type="submit" disabled={saving}>{saving ? 'Saving...' : 'Save Settings'}</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Settings;


