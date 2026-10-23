/**
 * NUSAVENTURE OS - ENTERPRISE BACKEND SERVER (Node.js + Express)
 * Cara Menjalankan di Terminal VS Code:
 *   1. npm init -y
 *   2. npm install express cors
 *   3. node server.js
 * Kemudian buka http://localhost:4000/1-public-portal.html
 */

const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 4000;
const DB_FILE = path.join(__dirname, 'nusa-db.json');

app.use(cors());
app.use(express.json({ limit: '5mb' }));
app.use(express.static(__dirname));

// Helper: Mass Balance Audit Formula on Backend
function evaluateMassBalanceServer(mb) {
  const input = Number(mb.inputUnits) || 0;
  const accounted = (Number(mb.posSalesUnits) || 0) +
                    (Number(mb.warehouseStockUnits) || 0) +
                    (Number(mb.verifiedRejectUnits) || 0);
  const gap = Math.max(0, input - accounted);
  const pct = input > 0 ? Number(((gap / input) * 100).toFixed(2)) : 0;
  return { gap, pct, isAlert: pct > 3.0 };
}

// Get Current Ecosystem State
app.get('/api/state', (req, res) => {
  if (fs.existsSync(DB_FILE)) {
    const raw = fs.readFileSync(DB_FILE, 'utf-8');
    return res.json(JSON.parse(raw));
  }
  return res.json({ status: 'INITIAL_CLIENT_SEED' });
});

// Sync State Across All 4 Portals + Enforce Backend Mass-Balance Governance
app.post('/api/sync', (req, res) => {
  try {
    const state = req.body;
    if (state && Array.isArray(state.umkmList)) {
      state.umkmList.forEach(umkm => {
        const audit = evaluateMassBalanceServer(umkm.massBalance);
        umkm.trancheFrozen = audit.isAlert;
      });
      fs.writeFileSync(DB_FILE, JSON.stringify(state, null, 2), 'utf-8');
    }
    res.json({ ok: true, syncedAt: new Date().toISOString() });
  } catch (err) {
    res.status(500).json({ ok: false, error: err.message });
  }
});

// Backend AI Evaluation & Field Audit Dispatch Endpoint
app.post('/api/ai-evaluate', (req, res) => {
  const { umkmList = [] } = req.body;
  const findings = umkmList.map(u => {
    const audit = evaluateMassBalanceServer(u.massBalance);
    return {
      id: u.id,
      name: u.name,
      ticker: u.ticker,
      discrepancyPct: audit.pct,
      unaccountedUnits: audit.gap,
      actionRequired: audit.isAlert
        ? 'FREEZE_TRANCHE_AND_DISPATCH_FIELD_AUDITOR'
        : 'CONTINUE_MILESTONE_DISBURSEMENT'
    };
  });
  res.json({
    evaluatedAt: new Date().toISOString(),
    findings
  });
});

app.listen(PORT, () => {
  console.log('==========================================================');
  console.log(` NUSAVENTURE OS BACKEND RUNNING AT http://localhost:${PORT}`);
  console.log('==========================================================');
  console.log(` 1. Public Portal   : http://localhost:${PORT}/1-public-portal.html`);
  console.log(` 2. Partner UMKM    : http://localhost:${PORT}/2-partner-umkm.html`);
  console.log(` 3. Investor Bit    : http://localhost:${PORT}/3-investor-bit.html`);
  console.log(` 4. Admin & NusaAI  : http://localhost:${PORT}/4-admin-command.html`);
  console.log('==========================================================');
});