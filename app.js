const inputTarget = document.getElementById('input-target');
const scanBtn = document.getElementById('scan-btn');
const clearBtn = document.getElementById('clear-btn');
const results = document.getElementById('results');
const gaugeFill = document.getElementById('gauge-fill');
const scoreNumber = document.getElementById('score-number');
const verdictBadge = document.getElementById('verdict-badge');
const verdictSummary = document.getElementById('verdict-summary');
const signalsList = document.getElementById('signals-list');

const PRESETS = {
  bank: "Dear SBI User, your YONO account has been suspended due to pending KYC verification. Click immediately to restore access: http://sbi-netbanking-verify.xyz/login. Failure will lead to card block in 24 hours.",
  crypto: "Congratulations! You won 1.45 BTC in the Binance 2026 Anniversary Airdrop. Connect your wallet now at https://binance-airdrop-bonus.top to claim before the timer expires!",
  safe: "https://github.com/rushank3485/first-project"
};

document.querySelectorAll('.pill').forEach(pill => {
  pill.addEventListener('click', () => {
    const key = pill.dataset.preset;
    if (PRESETS[key]) {
      inputTarget.value = PRESETS[key];
      runScan();
    }
  });
});

clearBtn.addEventListener('click', () => {
  inputTarget.value = '';
  results.classList.add('hidden');
});

scanBtn.addEventListener('click', runScan);

inputTarget.addEventListener('keydown', (e) => {
  if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
    runScan();
  }
});

function runScan() {
  const text = inputTarget.value.trim();
  if (!text) return;

  results.classList.remove('hidden');

  let score = 0;
  const signals = [];

  const urgencyWords = ['immediately', 'urgent', 'suspended', 'blocked', '24 hours', 'action required', 'failure will'];
  const hasUrgency = urgencyWords.some(w => text.toLowerCase().includes(w));
  if (hasUrgency) {
    score += 30;
    signals.push({
      icon: '⏳',
      title: 'Artificial Urgency Trigger',
      desc: 'Message utilizes coercive urgency tactics to bypass critical thinking and prompt rash action.'
    });
  }

  const kycWords = ['kyc', 'pan card', 'aadhaar', 'otp', 'restore access', 'verify account'];
  const hasKyc = kycWords.some(w => text.toLowerCase().includes(w));
  if (hasKyc) {
    score += 25;
    signals.push({
      icon: '🪪',
      title: 'Credential / KYC Harvesting Pattern',
      desc: 'Requests sensitive authentication credentials under pretext of mandatory regulatory compliance.'
    });
  }

  const urlMatches = text.match(/https?:\/\/[^\s]+/gi) || [];
  if (urlMatches.length > 0) {
    urlMatches.forEach(urlStr => {
      try {
        const parsed = new URL(urlStr);
        const host = parsed.hostname.toLowerCase();
        
        const suspTlds = ['.xyz', '.top', '.buzz', '.fit', '.tk', '.cc', '.live', '.site'];
        if (suspTlds.some(tld => host.endsWith(tld))) {
          score += 35;
          signals.push({
            icon: '🌐',
            title: `High-Risk TLD: ${host}`,
            desc: 'Host employs low-reputation top-level domain frequently associated with disposable phishing campaigns.'
          });
        }

        const brands = ['sbi', 'hdfc', 'binance', 'netflix', 'paypal', 'apple'];
        const spoofBrand = brands.find(b => host.includes(b) && !host.endsWith(`.${b}.com`));
        if (spoofBrand) {
          score += 40;
          signals.push({
            icon: '🎭',
            title: `Domain Typosquatting / Brand Spoofing (${spoofBrand})`,
            desc: `Host masquerades as legitimate brand '${spoofBrand}' without authoritative domain certificate.`
          });
        }
      } catch (e) {
        // invalid URL
      }
    });
  }

  const rewardWords = ['won', 'airdrop', 'free bitcoin', 'claim bonus', 'lottery', 'prize'];
  if (rewardWords.some(w => text.toLowerCase().includes(w))) {
    score += 30;
    signals.push({
      icon: '🎁',
      title: 'Unsolicited Reward Bait',
      desc: 'Financial payoff promised for unsolicited interaction, characteristic of advance-fee schemes.'
    });
  }

  if (signals.length === 0) {
    score = 5;
    signals.push({
      icon: '🛡️',
      title: 'Clean Structural Reputation',
      desc: 'No known phishing keywords, deceptive urgency markers, or malicious domain signatures found.'
    });
  }

  score = Math.min(100, Math.max(0, score));

  scoreNumber.textContent = score;

  const circumference = 2 * Math.PI * 70; // 439.8
  const offset = circumference - (score / 100) * circumference;
  gaugeFill.style.strokeDashoffset = offset;

  if (score >= 70) {
    gaugeFill.style.stroke = '#ef4444';
    verdictBadge.className = 'verdict-badge high';
    verdictBadge.textContent = 'HIGH RISK SCAM';
    verdictSummary.textContent = 'Critical risk. Do NOT click any links, enter OTPs, or share credentials.';
  } else if (score >= 35) {
    gaugeFill.style.stroke = '#f59e0b';
    verdictBadge.className = 'verdict-badge medium';
    verdictBadge.textContent = 'SUSPICIOUS';
    verdictSummary.textContent = 'Potential phishing vector detected. Exercise caution and verify via official channels.';
  } else {
    gaugeFill.style.stroke = '#10b981';
    verdictBadge.className = 'verdict-badge safe';
    verdictBadge.textContent = 'LEGITIMATE / SAFE';
    verdictSummary.textContent = 'No harmful heuristics identified. Standard precautions apply.';
  }

  signalsList.innerHTML = signals.map(sig => `
    <div class="signal-item">
      <span class="signal-icon">${sig.icon}</span>
      <div class="signal-content">
        <h4>${sig.title}</h4>
        <p>${sig.desc}</p>
      </div>
    </div>
  `).join('');
}
