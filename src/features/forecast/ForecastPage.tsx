import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { api } from '@/lib/api';

type Scenario = {
  currentArr: number;
  renewalRiskArr: number;
  expansionPipeline: number;
  grossRetention: number;
  note?: string;
};

export const ForecastPage = () => {
  const [scenario, setScenario] = useState<Scenario | null>(null);
  const [churnReductionPct, setChurnReductionPct] = useState('8');
  const [expansionLiftPct, setExpansionLiftPct] = useState('12');
  const [result, setResult] = useState('');

  useEffect(() => {
    api.get('/forecast/scenarios').then(({ data }) => setScenario(data.scenario)).catch(() => setScenario(null));
  }, []);

  const runSimulation = async () => {
    const { data } = await api.post('/forecast/simulate', {
      churnReductionPct: Number(churnReductionPct),
      expansionLiftPct: Number(expansionLiftPct)
    });
    setResult(data.message);
  };

  return (
    <section className="grid" style={{ gap: 20 }}>
      <header>
        <h1>Phase 4: Executive Forecast Studio</h1>
        <small>Model annual ARR outcomes from churn reduction and expansion optimization.</small>
      </header>

      {scenario && (
        <div className="grid grid-2">
          <article className="card"><h3>Current ARR</h3><h2>${scenario.currentArr.toLocaleString()}</h2></article>
          <article className="card"><h3>Renewal Risk ARR</h3><h2>${scenario.renewalRiskArr.toLocaleString()}</h2></article>
          <article className="card"><h3>Expansion Pipeline</h3><h2>${scenario.expansionPipeline.toLocaleString()}</h2></article>
          <article className="card"><h3>Gross Retention</h3><h2>{Math.round(scenario.grossRetention * 100)}%</h2></article>
        </div>
      )}

      <article className="card" style={{ display: 'grid', gap: 12 }}>
        <h3>Scenario Simulator</h3>
        <label>Churn Reduction (%)<Input value={churnReductionPct} onChange={(e) => setChurnReductionPct(e.target.value)} /></label>
        <label>Expansion Lift (%)<Input value={expansionLiftPct} onChange={(e) => setExpansionLiftPct(e.target.value)} /></label>
        <Button onClick={() => void runSimulation()}>Run Forecast</Button>
        {result && <span className="badge badge-success">{result}</span>}
        {scenario?.note && <small>{scenario.note}</small>}
      </article>
    </section>
  );
};
