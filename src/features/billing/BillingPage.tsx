import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { api } from '@/lib/api';

const plans = [
  { name: 'Scale', price: '$499/mo', features: ['25 seats', 'Advanced automations', 'SLA analytics'] },
  { name: 'Enterprise', price: '$1,499/mo', features: ['Unlimited seats', 'SSO/SAML', 'Dedicated CSM'] }
];

type Subscription = { plan: 'Scale' | 'Enterprise'; seatCount: number; status: string; updatedAt: string };

export const BillingPage = () => {
  const [message, setMessage] = useState('');
  const [subscription, setSubscription] = useState<Subscription | null>(null);
  const [seats, setSeats] = useState('25');

  const refresh = async () => {
    const { data } = await api.get('/subscriptions/current');
    setSubscription(data.subscription);
    setSeats(String(data.subscription.seatCount));
  };

  useEffect(() => {
    void refresh();
  }, []);

  const selectPlan = async (planName: string) => {
    const { data } = await api.post('/subscriptions/checkout', { plan: planName });
    setMessage(data.message);
    await refresh();
  };

  const updateSeats = async () => {
    const { data } = await api.post('/subscriptions/seats', { seatCount: Number(seats) });
    setMessage(data.message);
    await refresh();
  };

  return (
    <section className="grid">
      <h1>Subscription & Monetization</h1>
      <small>Stripe-compatible billing model with seat and usage add-ons.</small>
      {subscription && <div className="badge badge-success">{subscription.plan} • {subscription.seatCount} seats • {subscription.status}</div>}
      <div className="card" style={{ display: 'grid', gap: 8, maxWidth: 320 }}>
        <label>Seat Count<Input value={seats} onChange={(e) => setSeats(e.target.value)} /></label>
        <Button variant="secondary" onClick={() => void updateSeats()}>Update Seats</Button>
      </div>
      <div className="grid grid-2">
        {plans.map((plan) => (
          <article key={plan.name} className="card">
            <h2>{plan.name}</h2>
            <p style={{ margin: '8px 0 0' }}>{plan.price}</p>
            <ul>{plan.features.map((f) => <li key={f}>{f}</li>)}</ul>
            <Button onClick={() => void selectPlan(plan.name)}>Choose {plan.name}</Button>
          </article>
        ))}
      </div>
      {message && <div className="badge badge-success">{message}</div>}
    </section>
  );
};
