import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/Button';
import { api } from '@/lib/api';

type Recommendation = {
  id: string;
  title: string;
  rationale: string;
  annualImpact: number;
  applied: boolean;
};

export const IntelligencePage = () => {
  const [items, setItems] = useState<Recommendation[]>([]);
  const [impact, setImpact] = useState(0);

  const refresh = async () => {
    const { data } = await api.get('/intelligence/recommendations');
    setItems(data.recommendations);
    setImpact(data.totalPotentialImpact);
  };

  useEffect(() => {
    void refresh();
  }, []);

  const applyRecommendation = async (id: string) => {
    await api.post(`/intelligence/${id}/apply`);
    await refresh();
  };

  return (
    <section className="grid" style={{ gap: 20 }}>
      <header>
        <h1>Phase 5: AI Revenue Copilot</h1>
        <small>Prioritized recommendations to maximize retained and expansion ARR.</small>
      </header>

      <div className="badge badge-success">Open potential impact: ${impact.toLocaleString()}</div>

      <div className="grid">
        {items.map((item) => (
          <article key={item.id} className="card" style={{ display: 'grid', gap: 8 }}>
            <h3>{item.title}</h3>
            <small>{item.rationale}</small>
            <small>Annual impact: ${item.annualImpact.toLocaleString()}</small>
            <Button onClick={() => void applyRecommendation(item.id)} disabled={item.applied} variant="secondary">
              {item.applied ? 'Applied' : 'Apply Recommendation'}
            </Button>
          </article>
        ))}
      </div>
    </section>
  );
};
