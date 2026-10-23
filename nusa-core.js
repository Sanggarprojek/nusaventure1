/**
 * NUSAVENTURE OS - CORE TELEMETRY, STATE & SYNC ENGINE v4.2
 * Architecture: Dual-Mode (REST Backend API + Browser BroadcastChannel Real-Time Sync)
 */

const NUSA_STORAGE_KEY = 'NUSAVENTURE_OS_STATE_V4';
const NUSA_CHANNEL_NAME = 'NUSAVENTURE_REALTIME_BUS';
const API_BASE_URL = 'http://localhost:4000/api';

const INITIAL_NUSA_STATE = {
  meta: {
    platformName: 'NusaVenture OS',
    totalAUM: 4850000000,
    escrowLiquidity: 1420000000,
    exportPoolDP: 960000000,
    activeB2BCreditVolume: 645000000,
    lastUpdated: new Date().toISOString()
  },
  umkmList: [
    {
      id: 'UMKM-001',
      ticker: 'ROTI-SKH',
      name: 'Roti Warisan Nusantara',
      owner: 'Bp. Hendra Wijaya (54 thn)',
      sector: 'F&B Bakery & Pastry',
      location: 'Sukoharjo, Jawa Tengah',
      stage: 'Tranche 2: Standarisasi QC & Kemasan',
      trancheCurrent: 2,
      trancheTotal: 3,
      trancheFrozen: false,
      capitalInjected: 350000000,
      targetCapMultiplier: 1.6,
      returnedToInvestor: 315000000, // 56.25% menuju 560jt (1.6x cap)
      profitSharePct: 25,
      escrowBalance: 85000000,
      b2bCreditBalance: 42000000,
      hppReductionPct: 22.4,
      monthlyRevenue: 168000000,
      monthlyNetProfit: 46500000,
      unitPriceLot: 250000,
      availableLots: 420,
      totalLots: 1400,
      yieldAnnualized: 19.8,
      exportMOQContribution: 3500, // packs/month
      // Mass Balance Telemetry (in standard production units)
      massBalance: {
        inputUnits: 12000,
        posSalesUnits: 10850,
        warehouseStockUnits: 920,
        verifiedRejectUnits: 110
      },
      financialHistory: [112, 125, 138, 149, 155, 168], // Juta Rp
      lastAuditDate: '2026-10-14',
      riskNote: 'Operasional stabil. Rasio konversi tepung ke produk jadi sangat presisi.'
    },
    {
      id: 'UMKM-002',
      ticker: 'KOPI-JTG',
      name: 'Kopi Lereng Merapi Roastery',
      owner: 'Damar Prakoso (24 thn)',
      sector: 'Agro-Processing & Specialty Coffee',
      location: 'Boyolali, Jawa Tengah',
      stage: 'Tranche 3: Agregasi Ekspor Global',
      trancheCurrent: 3,
      trancheTotal: 3,
      trancheFrozen: false,
      capitalInjected: 500000000,
      targetCapMultiplier: 1.6,
      returnedToInvestor: 640000000, // 80% menuju 800jt
      profitSharePct: 25,
      escrowBalance: 140000000,
      b2bCreditBalance: 68000000,
      hppReductionPct: 27.8,
      monthlyRevenue: 245000000,
      monthlyNetProfit: 72000000,
      unitPriceLot: 500000,
      availableLots: 180,
      totalLots: 1000,
      yieldAnnualized: 23.4,
      exportMOQContribution: 6200,
      massBalance: {
        inputUnits: 8500,
        posSalesUnits: 7600,
        warehouseStockUnits: 740,
        verifiedRejectUnits: 95
      },
      financialHistory: [160, 175, 190, 210, 232, 245],
      lastAuditDate: '2026-10-18',
      riskNote: 'Siap melakukan Joint Venture Spin-Off (55/45) untuk kontrak buyer Belanda.'
    },
    {
      id: 'UMKM-003',
      ticker: 'BRQ-SOLO',
      name: 'Coketa Bio-Energy & Charcoal',
      owner: 'Rizal & Koperasi Tani Makmur',
      sector: 'CleanTech & Biomass Export',
      location: 'Nguter, Sukoharjo',
      stage: 'Tranche 2: Upgrade Mesin Press & Kemasan QR',
      trancheCurrent: 2,
      trancheTotal: 3,
      trancheFrozen: true, // Otomatis ter-freeze karena gap > 3%
      capitalInjected: 420000000,
      targetCapMultiplier: 1.6,
      returnedToInvestor: 195000000,
      profitSharePct: 25,
      escrowBalance: 64000000,
      b2bCreditBalance: 29000000,
      hppReductionPct: 19.5,
      monthlyRevenue: 134000000,
      monthlyNetProfit: 38000000,
      unitPriceLot: 300000,
      availableLots: 510,
      totalLots: 1400,
      yieldAnnualized: 18.2,
      exportMOQContribution: 8000,
      massBalance: {
        inputUnits: 15000,
        posSalesUnits: 12400,
        warehouseStockUnits: 1600,
        verifiedRejectUnits: 250
        // Unaccounted = 15000 - (12400 + 1600 + 250) = 750 units (5.0% > 3.0% threshold!)
      },
      financialHistory: [95, 108, 119, 142, 139, 134],
      lastAuditDate: '2026-10-02',
      riskNote: 'Terdeteksi deviasi Mass Balance 5.0% pada batch kemasan Oktober. Indikasi side-selling atau stok belum tercatat.'
    },
    {
      id: 'UMKM-004',
      ticker: 'KMSN-SMG',
      name: 'NusaPack Eco-Packaging',
      owner: 'Ibu Ratna Sari (47 thn)',
      sector: 'Downstream B2B Packaging & QR Label',
      location: 'Semarang, Jawa Tengah',
      stage: 'Tranche 2: Otomasi Cetak QR Anti-Fraud',
      trancheCurrent: 2,
      trancheTotal: 3,
      trancheFrozen: false,
      capitalInjected: 300000000,
      targetCapMultiplier: 1.6,
      returnedToInvestor: 270000000,
      profitSharePct: 25,
      escrowBalance: 92000000,
      b2bCreditBalance: 54000000,
      hppReductionPct: 24.1,
      monthlyRevenue: 152000000,
      monthlyNetProfit: 41000000,
      unitPriceLot: 200000,
      availableLots: 310,
      totalLots: 1500,
      yieldAnnualized: 20.5,
      exportMOQContribution: 4500,
      massBalance: {
        inputUnits: 20000,
        posSalesUnits: 18400,
        warehouseStockUnits: 1300,
        verifiedRejectUnits: 180
      },
      financialHistory: [105, 118, 126, 135, 144, 152],
      lastAuditDate: '2026-10-19',
      riskNote: 'Pemasok utama kemasan QR untuk seluruh ekosistem B2B NusaVenture.'
    }
  ],
  b2bCatalog: [
    {
      id: 'B2B-101',
      supplierId: 'UMKM-004',
      supplierName: 'NusaPack Eco-Packaging',
      itemName: 'Kemasan Standing Pouch Food-Grade + Serialized QR Audit (1.000 pcs)',
      category: 'Downstream Packaging',
      marketPrice: 2400000,
      ecosystemCreditPrice: 1850000,
      unitEquivalent: 1000,
      stock: 45
    },
    {
      id: 'B2B-102',
      supplierId: 'UMKM-002',
      supplierName: 'Kopi Lereng Merapi Roastery',
      itemName: 'Ekstrak Kopi Arabika Konsentrat & Tepung Ampas Kopi Steril (250 Kg)',
      category: 'Upstream Raw Material',
      marketPrice: 4800000,
      ecosystemCreditPrice: 3650000,
      unitEquivalent: 500,
      stock: 28
    },
    {
      id: 'B2B-103',
      supplierId: 'UMKM-003',
      supplierName: 'Coketa Bio-Energy & Charcoal',
      itemName: 'Briket Bio- Energi Kalori Tinggi untuk Oven Bakery/Roastery (500 Kg)',
      category: 'Midstream Energy Supply',
      marketPrice: 3500000,
      ecosystemCreditPrice: 2700000,
      unitEquivalent: 500,
      stock: 60
    },
    {
      id: 'B2B-104',
      supplierId: 'UMKM-001',
      supplierName: 'Roti Warisan Nusantara',
      itemName: 'Sewa Idle Mesin Planetary Industrial Mixer & Rotary Oven (Shift Malam)',
      category: 'Idle Machinery Sharing',
      marketPrice: 1900000,
      ecosystemCreditPrice: 1350000,
      unitEquivalent: 200,
      stock: 14
    }
  ],
  escrowRequests: [
    {
      id: 'ESC-881',
      umkmId: 'UMKM-001',
      umkmName: 'Roti Warisan Nusantara',
      supplierName: 'PT Bogasari / Koperasi Gandum Nusantara (Verified Supplier)',
      purpose: 'Pengadaan 4 Ton Tepung Protein Tinggi (Tranche 2 Milestone)',
      amount: 38500000,
      date: '2026-10-22 09:15',
      status: 'PENDING_CO_MANAGER',
      umkmOwnerApproved: true,
      coManagerApproved: false
    },
    {
      id: 'ESC-882',
      umkmId: 'UMKM-003',
      umkmName: 'Coketa Bio-Energy & Charcoal',
      supplierName: 'CV Teknik Mandiri Pressindo',
      purpose: 'Pelunasan Suku Cadang Hydraulic Briquette Extruder',
      amount: 24000000,
      date: '2026-10-22 11:40',
      status: 'BLOCKED_BY_MASS_BALANCE',
      umkmOwnerApproved: true,
      coManagerApproved: false
    }
  ],
  b2bTransactions: [
    {
      id: 'TX-B2B-901',
      buyerName: 'Roti Warisan Nusantara',
      sellerName: 'NusaPack Eco-Packaging',
      item: 'Kemasan Standing Pouch + QR Audit (2.000 pcs)',
      creditAmount: 3700000,
      savedAmount: 1100000,
      timestamp: '2026-10-21 16:20'
    },
    {
      id: 'TX-B2B-902',
      buyerName: 'Roti Warisan Nusantara',
      sellerName: 'Coketa Bio-Energy & Charcoal',
      item: 'Briket Bio-Energi Oven Bakery (500 Kg)',
      creditAmount: 2700000,
      savedAmount: 800000,
      timestamp: '2026-10-22 08:10'
    }
  ],
  applications: [
    {
      id: 'APP-301',
      businessName: 'Keripik Singkong Fermentasi Mojolaban',
      ownerName: 'Ibu Sri Wahyuni',
      age: 49,
      sector: 'F&B Agro-Snack',
      location: 'Mojolaban, Sukoharjo',
      monthlyRevenue: 48000000,
      painPoint: 'Biaya kemasan tinggi & terjerat bunga pinjaman konvensional',
      requestedCapital: 150000000,
      collateralReady: 'Zero Agunan Pribadi (Setuju Ring-Fencing Aset Baru)',
      diagnosticScore: 86,
      status: 'MENUNGGU_DUE_DILIGENCE',
      submittedAt: '2026-10-22 07:30'
    }
  ],
  auditSchedules: [
    {
      id: 'AUD-501',
      umkmId: 'UMKM-003',
      umkmName: 'Coketa Bio-Energy & Charcoal',
      auditor: 'Tim Audit Lapangan Alpha (Raffi & Dzikra)',
      auditType: 'Investigasi Deviasi Mass-Balance (5.0% Gap)',
      scheduledDate: '2026-10-24 09:00 WIB',
      priority: 'CRITICAL',
      status: 'TERJADWAL',
      aiReasoning: 'Selisih 750 unit antara input bahan baku dan output POS+ Gudang melewati batas toleransi 3.0%.'
    }
  ],
  investorTrades: [
    {
      id: 'TRD-701',
      investorName: 'Dana Ventura Sovereign Nusantara',
      ticker: 'KOPI-JTG',
      type: 'TRANCHE_BUY',
      lots: 50,
      totalValue: 25000000,
      timestamp: '2026-10-22 14:20'
    }
  ]
};

const NusaCore = {
  channel: typeof BroadcastChannel !== 'undefined' ? new BroadcastChannel(NUSA_CHANNEL_NAME) : null,

  getState() {
    try {
      const raw = localStorage.getItem(NUSA_STORAGE_KEY);
      if (!raw) {
        this.saveState(INITIAL_NUSA_STATE, false);
        return JSON.parse(JSON.stringify(INITIAL_NUSA_STATE));
      }
      return JSON.parse(raw);
    } catch (e) {
      console.error('NusaCore state read error:', e);
      return JSON.parse(JSON.stringify(INITIAL_NUSA_STATE));
    }
  },

  saveState(newState, broadcast = true) {
    newState.meta.lastUpdated = new Date().toISOString();
    // Re-evaluate all Mass Balance rules before saving
    newState.umkmList.forEach(u => {
      const mb = this.calculateMassBalance(u.massBalance);
      u.trancheFrozen = mb.isAlert;
    });
    localStorage.setItem(NUSA_STORAGE_KEY, JSON.stringify(newState));
    if (broadcast && this.channel) {
      this.channel.postMessage({ type: 'STATE_UPDATED', timestamp: newState.meta.lastUpdated });
    }
    // Optional async sync to Node.js backend if running
    fetch(`${API_BASE_URL}/sync`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newState)
    }).catch(() => {}); // Silently fallback to localStorage if backend server is not running
  },

  resetState() {
    this.saveState(JSON.parse(JSON.stringify(INITIAL_NUSA_STATE)), true);
    window.location.reload();
  },

  onUpdate(callback) {
    if (this.channel) {
      this.channel.onmessage = (event) => {
        if (event.data && event.data.type === 'STATE_UPDATED') {
          callback(this.getState());
        }
      };
    }
    window.addEventListener('storage', (e) => {
      if (e.key === NUSA_STORAGE_KEY) {
        callback(this.getState());
      }
    });
  },

  /**
   * PILAR 2: RUMUS ANTI-FRAUD MASS BALANCE AUDIT ENGINE
   * Unaccounted Gap = Supplied Input Units - (POS Sales + Warehouse Stock + Verified Rejects)
   * Rule: Discrepancy > 3.0% triggers automatic Fraud Alert & Tranche Freeze
   */
  calculateMassBalance(mb) {
    const input = Number(mb.inputUnits) || 0;
    const pos = Number(mb.posSalesUnits) || 0;
    const stock = Number(mb.warehouseStockUnits) || 0;
    const reject = Number(mb.verifiedRejectUnits) || 0;

    const accounted = pos + stock + reject;
    const unaccountedGap = Math.max(0, input - accounted);
    const discrepancyPct = input > 0 ? (unaccountedGap / input) * 100 : 0;
    const isAlert = discrepancyPct > 3.0;

    return {
      input,
      accounted,
      unaccountedGap,
      discrepancyPct: Number(discrepancyPct.toFixed(2)),
      isAlert,
      statusLabel: isAlert ? 'FRAUD ALERT (>3% GAP)' : 'TERVERIFIKASI AMAN (<=3%)'
    };
  },

  /**
   * PILAR 5: REDEEMABLE PROFIT-SHARING GRADUATION CAP (1.6x)
   */
  calculateGraduationProgress(umkm) {
    const targetCapAmount = umkm.capitalInjected * (umkm.targetCapMultiplier || 1.6);
    const pct = Math.min(100, (umkm.returnedToInvestor / targetCapAmount) * 100);
    const remaining = Math.max(0, targetCapAmount - umkm.returnedToInvestor);
    return {
      targetCapAmount,
      progressPct: Number(pct.toFixed(1)),
      remainingAmount: remaining,
      isGraduated: pct >= 100
    };
  },

  formatIDR(amount) {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      maximumFractionDigits: 0
    }).format(amount || 0);
  },

  formatCompactIDR(amount) {
    if (amount >= 1e9) return `Rp ${(amount / 1e9).toFixed(2)} Miliar`;
    if (amount >= 1e6) return `Rp ${(amount / 1e6).toFixed(1)} Juta`;
    return this.formatIDR(amount);
  },

  // Action Helpers across Portals
  registerNewUMKM(appData) {
    const state = this.getState();
    const newApp = {
      id: `APP-${Math.floor(400 + Math.random() * 500)}`,
      ...appData,
      status: 'MENUNGGU_DUE_DILIGENCE',
      submittedAt: new Date().toLocaleString('id-ID')
    };
    state.applications.unshift(newApp);
    this.saveState(state);
    return newApp;
  },

  updatePOSAndMassBalance(umkmId, payload) {
    const state = this.getState();
    const umkm = state.umkmList.find(u => u.id === umkmId);
    if (!umkm) return null;

    umkm.massBalance.inputUnits = Number(payload.inputUnits);
    umkm.massBalance.posSalesUnits = Number(payload.posSalesUnits);
    umkm.massBalance.warehouseStockUnits = Number(payload.warehouseStockUnits);
    umkm.massBalance.verifiedRejectUnits = Number(payload.verifiedRejectUnits);

    if (payload.addedRevenue > 0) {
      umkm.monthlyRevenue += Number(payload.addedRevenue);
      const addedProfit = Math.round(Number(payload.addedRevenue) * 0.28);
      umkm.monthlyNetProfit += addedProfit;
      // 25% Redeemable Profit Share otomatis mengalir ke pengembalian cap investor
      const investorShare = Math.round(addedProfit * (umkm.profitSharePct / 100));
      umkm.returnedToInvestor += investorShare;
    }

    const mbResult = this.calculateMassBalance(umkm.massBalance);
    umkm.trancheFrozen = mbResult.isAlert;

    // Auto-create AI Audit Alert if gap > 3%
    if (mbResult.isAlert) {
      const exists = state.auditSchedules.some(a => a.umkmId === umkm.id && a.status === 'TERJADWAL');
      if (!exists) {
        state.auditSchedules.unshift({
          id: `AUD-${Math.floor(600 + Math.random() * 399)}`,
          umkmId: umkm.id,
          umkmName: umkm.name,
          auditor: 'Auto-Dispatch NusaAI (Tim Audit Lapangan)',
          auditType: `Audit Darurat Mass-Balance (${mbResult.discrepancyPct}% Gap)`,
          scheduledDate: 'Besok, 08:30 WIB',
          priority: 'CRITICAL',
          status: 'TERJADWAL',
          aiReasoning: `Terdeteksi selisih ${mbResult.unaccountedGap} unit (>3.0% ambang batas). Tranche dibekukan otomatis.`
        });
      }
    }

    this.saveState(state);
    return { umkm, mbResult };
  },

  executeB2BOrder(buyerUmkmId, catalogItemId, qty) {
    const state = this.getState();
    const buyer = state.umkmList.find(u => u.id === buyerUmkmId);
    const item = state.b2bCatalog.find(c => c.id === catalogItemId);
    if (!buyer || !item) throw new Error('Data mitra atau item B2B tidak ditemukan.');

    if (buyer.trancheFrozen) {
      throw new Error('Transaksi ditolak: Akun Escrow & B2B Credit Anda sedang dibekukan karena selisih Mass Balance > 3.0%.');
    }

    const totalCreditCost = item.ecosystemCreditPrice * qty;
    const totalSaved = (item.marketPrice - item.ecosystemCreditPrice) * qty;

    if (buyer.b2bCreditBalance < totalCreditCost) {
      throw new Error('Saldo Internal B2B Credit tidak mencukupi. Ajukan konversi Escrow terlebih dahulu.');
    }

    buyer.b2bCreditBalance -= totalCreditCost;
    buyer.massBalance.inputUnits += (item.unitEquivalent * qty);
    item.stock = Math.max(0, item.stock - qty);

    const seller = state.umkmList.find(u => u.id === item.supplierId);
    if (seller) {
      seller.b2bCreditBalance += totalCreditCost;
      seller.monthlyRevenue += totalCreditCost;
    }

    state.meta.activeB2BCreditVolume += totalCreditCost;
    state.b2bTransactions.unshift({
      id: `TX-B2B-${Math.floor(1000 + Math.random() * 9000)}`,
      buyerName: buyer.name,
      sellerName: item.supplierName,
      item: `${item.itemName} (x${qty})`,
      creditAmount: totalCreditCost,
      savedAmount: totalSaved,
      timestamp: new Date().toLocaleString('id-ID')
    });

    this.saveState(state);
    return { totalCreditCost, totalSaved };
  },

  submitEscrowRequest(umkmId, supplierName, purpose, amount) {
    const state = this.getState();
    const umkm = state.umkmList.find(u => u.id === umkmId);
    if (!umkm) throw new Error('Mitra UMKM tidak ditemukan');

    const req = {
      id: `ESC-${Math.floor(900 + Math.random() * 900)}`,
      umkmId: umkm.id,
      umkmName: umkm.name,
      supplierName,
      purpose,
      amount: Number(amount),
      date: new Date().toLocaleString('id-ID'),
      status: umkm.trancheFrozen ? 'BLOCKED_BY_MASS_BALANCE' : 'PENDING_CO_MANAGER',
      umkmOwnerApproved: true,
      coManagerApproved: false
    };
    state.escrowRequests.unshift(req);
    this.saveState(state);
    return req;
  },

  investInUMKM(ticker, lots, investorName = 'Investor Profesional (Anda)') {
    const state = this.getState();
    const umkm = state.umkmList.find(u => u.ticker === ticker);
    if (!umkm) throw new Error('Ticker UMKM tidak ditemukan.');
    if (umkm.trancheFrozen) throw new Error('Pembelian dihentikan sementara: Emiten UMKM sedang dalam audit Mass Balance.');
    if (lots > umkm.availableLots) throw new Error('Jumlah lot melebihi ketersediaan Tranche saat ini.');

    const totalValue = lots * umkm.unitPriceLot;
    umkm.availableLots -= lots;
    umkm.capitalInjected += totalValue;
    umkm.escrowBalance += totalValue;
    state.meta.totalAUM += totalValue;
    state.meta.escrowLiquidity += totalValue;

    const trade = {
      id: `TRD-${Math.floor(1000 + Math.random() * 9000)}`,
      investorName,
      ticker: umkm.ticker,
      type: 'TRANCHE_INVEST',
      lots,
      totalValue,
      timestamp: new Date().toLocaleString('id-ID')
    };
    state.investorTrades.unshift(trade);
    this.saveState(state);
    return trade;
  }
};

window.NusaCore = NusaCore;