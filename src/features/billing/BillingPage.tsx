import { useState } from 'react';
import { Button } from '@/components/ui/Button';
import { api } from '@/lib/api';

const plans = [
  { name: 'Scale', price: '$499/mo', features: ['25 seats', 'Advanced automations', 'SLA analytics'] },
  { name: 'Enterprise', price: '$1,499/mo', features: ['Unlimited seats', 'SSO/SAML', 'Dedicated CSM'] }
];

export const BillingPage = () => {
  const [message, setMessage] = useState('');

  const selectPlan = async (planName: string) => {
    const { data } = await api.post('/subscriptions/checkout', { plan: planName });
    setMessage(data.message);
  };

  return (
    <section className="grid">
      <h1>Subscription & Monetization</h1>
      <small>Stripe-compatible billing model with seat and usage add-ons.</small>
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
