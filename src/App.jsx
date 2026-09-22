import { useState } from "react";
import {
  Home, Send, QrCode, Users, User, Bell, ArrowUpRight, ArrowDownLeft,
  ChevronRight, ChevronLeft, Check, Search, MapPin, Clock, Eye, EyeOff,
  Delete, X, Wallet, Landmark
} from "lucide-react";

const T = {
  ink: "#1B140F",
  forest: "#0E5C46",
  forestDeep: "#093F30",
  flame: "#D8402C",
  gold: "#E8A93D",
  sand: "#F6EFDF",
  sandDeep: "#EBDFC2",
  card: "#FFFFFF",
  textSoft: "#6B5D4F",
  line: "#E3D9C1",
};

const display = { fontFamily: "'Sora', system-ui, sans-serif" };
const body = { fontFamily: "'Inter', system-ui, sans-serif" };
const mono = { fontFamily: "'JetBrains Mono', monospace" };

// ---- Signature motif: bilum-weave chevron strip ----
function WeaveStrip({ height = 10 }) {
  return (
    <div
      style={{
        height,
        width: "100%",
        backgroundImage: `repeating-linear-gradient(135deg, ${T.gold} 0 8px, ${T.flame} 8px 16px, ${T.forest} 16px 24px)`,
        backgroundSize: "34px 100%",
        flexShrink: 0,
      }}
    />
  );
}

function initials(name) {
  return name.split(" ").map((n) => n[0]).slice(0, 2).join("").toUpperCase();
}

const AVATAR_COLORS = [T.forest, T.flame, T.gold, "#8A5A3B", "#3B6D8C"];

function Avatar({ name, size = 40 }) {
  const idx = name.charCodeAt(0) % AVATAR_COLORS.length;
  return (
    <div
      style={{
        width: size, height: size, borderRadius: "50%",
        background: AVATAR_COLORS[idx], color: "#fff",
        display: "flex", alignItems: "center", justifyContent: "center",
        fontWeight: 700, fontSize: size * 0.36, flexShrink: 0, ...display,
      }}
    >
      {initials(name)}
    </div>
  );
}

const CONTACTS = [
  { name: "John Kaupa", phone: "+675 7123 4501" },
  { name: "Maria Waigani", phone: "+675 7234 5612" },
  { name: "Peter Toa", phone: "+675 7345 6723" },
  { name: "Grace Bani", phone: "+675 7456 7834" },
  { name: "David Namaliu", phone: "+675 7567 8945" },
  { name: "Ruth Sori", phone: "+675 7678 9056" },
];

const TRANSACTIONS = [
  { name: "John Kaupa", type: "sent", amount: 50, time: "2h ago" },
  { name: "Kaka Trade Store", type: "received", amount: 120, time: "5h ago" },
  { name: "Cash-in · Boroko Agent", type: "received", amount: 300, time: "Yesterday" },
  { name: "Grace Bani", type: "sent", amount: 25, time: "Yesterday" },
  { name: "Peter Toa", type: "received", amount: 80, time: "2 days ago" },
];

const AGENTS = [
  { name: "Boroko Trade Store", distance: "0.4 km", address: "Waigani Dr, Boroko", hours: "7:00am – 8:00pm" },
  { name: "Four Mile Kai Bar", distance: "1.1 km", address: "Hubert Murray Hwy", hours: "6:30am – 9:00pm" },
  { name: "Gordons Market Agent", distance: "1.8 km", address: "Gordons, NCD", hours: "7:00am – 6:00pm" },
  { name: "Erima Corner Store", distance: "2.3 km", address: "Erima, NCD", hours: "24 hours" },
];

function StatusBar() {
  return (
    <div style={{ ...body, height: 28, display: "flex", alignItems: "center", justifyContent: "space-between", padding: "0 20px", fontSize: 12, fontWeight: 600, color: T.ink }}>
      <span>9:41</span>
      <div style={{ display: "flex", gap: 4, alignItems: "center" }}>
        <span>••••</span>
        <span>5G</span>
        <span>72%</span>
      </div>
    </div>
  );
}

function ScreenHeader({ title, subtitle, onBack, right }) {
  return (
    <div style={{ padding: "6px 20px 14px" }}>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          {onBack && (
            <button onClick={onBack} aria-label="Back" style={{ background: "none", border: "none", padding: 4, cursor: "pointer", color: T.ink }}>
              <ChevronLeft size={22} />
            </button>
          )}
          <div>
            <div style={{ ...display, fontSize: 20, fontWeight: 700, color: T.ink }}>{title}</div>
            {subtitle && <div style={{ ...body, fontSize: 13, color: T.textSoft, marginTop: 2 }}>{subtitle}</div>}
          </div>
        </div>
        {right}
      </div>
    </div>
  );
}

function BottomNav({ screen, go }) {
  const items = [
    { key: "home", label: "Home", icon: Home },
    { key: "send", label: "Send", icon: Send },
    { key: "scan", label: "Scan", icon: QrCode },
    { key: "agents", label: "Agents", icon: Users },
    { key: "profile", label: "Me", icon: User },
  ];
  return (
    <div style={{ display: "flex", borderTop: `1px solid ${T.line}`, background: T.card, paddingBottom: 8, flexShrink: 0 }}>
      {items.map(({ key, label, icon: Icon }) => {
        const active = screen === key;
        return (
          <button
            key={key}
            onClick={() => go(key)}
            style={{
              flex: 1, background: "none", border: "none", cursor: "pointer",
              display: "flex", flexDirection: "column", alignItems: "center", gap: 3,
              padding: "10px 0 2px", color: active ? T.forest : T.textSoft,
            }}
          >
            <Icon size={20} strokeWidth={active ? 2.4 : 2} fill={active ? T.forest : "none"} fillOpacity={active ? 0.12 : 0} />
            <span style={{ ...body, fontSize: 10, fontWeight: active ? 700 : 500 }}>{label}</span>
          </button>
        );
      })}
    </div>
  );
}

// ---------------- LOGIN ----------------
function LoginScreen({ onLogin }) {
  const [phone, setPhone] = useState("7123 4501");
  const [pin, setPin] = useState("••••");
  return (
    <div style={{ height: "100%", display: "flex", flexDirection: "column", background: T.sand }}>
      <StatusBar />
      <div style={{ flex: 1, display: "flex", flexDirection: "column", justifyContent: "center", padding: "0 28px" }}>
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", marginBottom: 36 }}>
          <div style={{ width: 64, height: 64, borderRadius: 18, background: T.forest, display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 14 }}>
            <Wallet size={30} color={T.gold} />
          </div>
          <div style={{ ...display, fontSize: 28, fontWeight: 800, color: T.ink }}>Yua</div>
          <div style={{ ...body, fontSize: 13, color: T.textSoft, marginTop: 4, textAlign: "center" }}>
            Sending money should be as easy as sending a text.
          </div>
        </div>

        <label style={{ ...body, fontSize: 12, fontWeight: 600, color: T.textSoft, marginBottom: 6, display: "block" }}>Phone number</label>
        <div style={{ display: "flex", alignItems: "center", background: T.card, border: `1px solid ${T.line}`, borderRadius: 12, padding: "12px 14px", marginBottom: 16 }}>
          <span style={{ ...mono, fontSize: 15, color: T.textSoft, marginRight: 8 }}>+675</span>
          <input value={phone} onChange={(e) => setPhone(e.target.value)} style={{ ...mono, fontSize: 15, border: "none", outline: "none", flex: 1, background: "transparent", color: T.ink }} />
        </div>

        <label style={{ ...body, fontSize: 12, fontWeight: 600, color: T.textSoft, marginBottom: 6, display: "block" }}>PIN</label>
        <div style={{ display: "flex", alignItems: "center", background: T.card, border: `1px solid ${T.line}`, borderRadius: 12, padding: "12px 14px", marginBottom: 24 }}>
          <input value={pin} onChange={(e) => setPin(e.target.value)} type="password" style={{ ...mono, fontSize: 15, letterSpacing: 4, border: "none", outline: "none", flex: 1, background: "transparent", color: T.ink }} />
        </div>

        <button onClick={onLogin} style={{ ...display, background: T.forest, color: "#fff", border: "none", borderRadius: 12, padding: "14px 0", fontSize: 15, fontWeight: 700, cursor: "pointer" }}>
          Log in
        </button>
        <div style={{ ...body, fontSize: 12, color: T.textSoft, textAlign: "center", marginTop: 16 }}>
          New here? <span style={{ color: T.forest, fontWeight: 600 }}>Create an account</span>
        </div>
      </div>
      <WeaveStrip height={8} />
    </div>
  );
}

// ---------------- HOME ----------------
function HomeScreen({ go }) {
  const [hidden, setHidden] = useState(false);
  return (
    <div style={{ height: "100%", display: "flex", flexDirection: "column", background: T.sand }}>
      <StatusBar />
      <div style={{ padding: "6px 20px 4px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <div>
          <div style={{ ...body, fontSize: 12, color: T.textSoft }}>Apinun, Maria</div>
          <div style={{ ...display, fontSize: 18, fontWeight: 700, color: T.ink }}>Yua</div>
        </div>
        <button aria-label="Notifications" style={{ background: T.card, border: `1px solid ${T.line}`, borderRadius: "50%", width: 38, height: 38, display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer" }}>
          <Bell size={17} color={T.ink} />
        </button>
      </div>
      <WeaveStrip height={6} />

      <div style={{ flex: 1, overflowY: "auto", padding: "16px 20px 8px" }}>
        {/* Balance card */}
        <div style={{ background: `linear-gradient(135deg, ${T.forest}, ${T.forestDeep})`, borderRadius: 18, padding: "20px 20px 18px", marginBottom: 18, position: "relative", overflow: "hidden" }}>
          <div style={{ position: "absolute", top: 0, right: 0, width: 100, height: 100, borderRadius: "50%", background: "rgba(232,169,61,0.14)", transform: "translate(30%,-30%)" }} />
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
            <div style={{ ...body, fontSize: 12, color: "rgba(255,255,255,0.75)", fontWeight: 600 }}>Available balance</div>
            <button onClick={() => setHidden(!hidden)} aria-label="Toggle balance" style={{ background: "none", border: "none", cursor: "pointer", color: "rgba(255,255,255,0.75)" }}>
              {hidden ? <EyeOff size={16} /> : <Eye size={16} />}
            </button>
          </div>
          <div style={{ ...mono, fontSize: 32, fontWeight: 700, color: "#fff", marginTop: 6 }}>
            {hidden ? "K ••••.••" : "K 1,240.50"}
          </div>
          <div style={{ ...body, fontSize: 12, color: T.gold, marginTop: 10, fontWeight: 600 }}>+ K120.00 this week</div>
        </div>

        {/* Quick actions */}
        <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 22 }}>
          {[
            { label: "Send", icon: Send, key: "send" },
            { label: "Request", icon: ArrowDownLeft, key: "send" },
            { label: "Scan", icon: QrCode, key: "scan" },
            { label: "Agents", icon: Landmark, key: "agents" },
          ].map(({ label, icon: Icon, key }) => (
            <button key={label} onClick={() => go(key)} style={{ background: "none", border: "none", cursor: "pointer", display: "flex", flexDirection: "column", alignItems: "center", gap: 6 }}>
              <div style={{ width: 50, height: 50, borderRadius: 14, background: T.card, border: `1px solid ${T.line}`, display: "flex", alignItems: "center", justifyContent: "center" }}>
                <Icon size={20} color={T.forest} />
              </div>
              <span style={{ ...body, fontSize: 11, color: T.ink, fontWeight: 600 }}>{label}</span>
            </button>
          ))}
        </div>

        {/* Recent activity */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 10 }}>
          <div style={{ ...display, fontSize: 15, fontWeight: 700, color: T.ink }}>Recent activity</div>
          <span style={{ ...body, fontSize: 12, color: T.forest, fontWeight: 600 }}>See all</span>
        </div>
        <div style={{ background: T.card, borderRadius: 14, border: `1px solid ${T.line}`, overflow: "hidden" }}>
          {TRANSACTIONS.map((tx, i) => (
            <div key={i} style={{ display: "flex", alignItems: "center", gap: 12, padding: "12px 14px", borderBottom: i < TRANSACTIONS.length - 1 ? `1px solid ${T.line}` : "none" }}>
              <Avatar name={tx.name} size={36} />
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ ...body, fontSize: 13.5, fontWeight: 600, color: T.ink, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{tx.name}</div>
                <div style={{ ...body, fontSize: 11.5, color: T.textSoft }}>{tx.time}</div>
              </div>
              <div style={{ ...mono, fontSize: 13.5, fontWeight: 700, color: tx.type === "sent" ? T.flame : T.forest }}>
                {tx.type === "sent" ? "-" : "+"}K{tx.amount.toFixed(2)}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ---------------- SEND FLOW ----------------
function SendScreen({ onDone }) {
  const [step, setStep] = useState(1);
  const [contact, setContact] = useState(null);
  const [amount, setAmount] = useState("");
  const [query, setQuery] = useState("");

  const filtered = CONTACTS.filter((c) => c.name.toLowerCase().includes(query.toLowerCase()));

  function pressDigit(d) {
    if (d === "back") { setAmount((a) => a.slice(0, -1)); return; }
    if (d === "." && amount.includes(".")) return;
    if (amount.replace(".", "").length >= 6) return;
    setAmount((a) => a + d);
  }

  const back = () => setStep((s) => Math.max(1, s - 1));

  if (step === 1) {
    return (
      <div style={{ height: "100%", display: "flex", flexDirection: "column", background: T.sand }}>
        <StatusBar />
        <ScreenHeader title="Send money" subtitle="Choose a wantok" onBack={onDone} />
        <div style={{ padding: "0 20px 10px" }}>
          <div style={{ display: "flex", alignItems: "center", background: T.card, border: `1px solid ${T.line}`, borderRadius: 12, padding: "10px 12px", gap: 8 }}>
            <Search size={16} color={T.textSoft} />
            <input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search name or number" style={{ ...body, border: "none", outline: "none", background: "transparent", flex: 1, fontSize: 14, color: T.ink }} />
          </div>
        </div>
        <div style={{ flex: 1, overflowY: "auto", padding: "6px 20px" }}>
          {filtered.map((c) => (
            <button key={c.name} onClick={() => { setContact(c); setStep(2); }} style={{ width: "100%", display: "flex", alignItems: "center", gap: 12, padding: "10px 4px", background: "none", border: "none", cursor: "pointer", textAlign: "left" }}>
              <Avatar name={c.name} />
              <div style={{ flex: 1 }}>
                <div style={{ ...body, fontSize: 14, fontWeight: 600, color: T.ink }}>{c.name}</div>
                <div style={{ ...mono, fontSize: 11.5, color: T.textSoft }}>{c.phone}</div>
              </div>
              <ChevronRight size={16} color={T.textSoft} />
            </button>
          ))}
        </div>
      </div>
    );
  }

  if (step === 2) {
    return (
      <div style={{ height: "100%", display: "flex", flexDirection: "column", background: T.sand }}>
        <StatusBar />
        <ScreenHeader title="Enter amount" subtitle={`To ${contact.name}`} onBack={back} />
        <div style={{ flex: 1, display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", padding: "0 20px" }}>
          <div style={{ ...mono, fontSize: 44, fontWeight: 700, color: T.ink, marginBottom: 8 }}>
            K {amount || "0"}
          </div>
          <div style={{ display: "flex", gap: 8, marginBottom: 24 }}>
            {[10, 20, 50, 100].map((v) => (
              <button key={v} onClick={() => setAmount(String(v))} style={{ ...body, fontSize: 12.5, fontWeight: 600, color: T.forest, background: T.card, border: `1px solid ${T.line}`, borderRadius: 999, padding: "6px 14px", cursor: "pointer" }}>
                K{v}
              </button>
            ))}
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 10, width: "100%", maxWidth: 260 }}>
            {["1","2","3","4","5","6","7","8","9",".","0","back"].map((d) => (
              <button
                key={d}
                onClick={() => pressDigit(d)}
                aria-label={d === "back" ? "Delete" : d}
                style={{ ...display, fontSize: 18, fontWeight: 600, color: T.ink, background: T.card, border: `1px solid ${T.line}`, borderRadius: 12, padding: "12px 0", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}
              >
                {d === "back" ? <Delete size={16} /> : d}
              </button>
            ))}
          </div>
        </div>
        <div style={{ padding: "10px 20px 20px" }}>
          <button
            disabled={!amount || Number(amount) <= 0}
            onClick={() => setStep(3)}
            style={{ ...display, width: "100%", background: !amount || Number(amount) <= 0 ? T.sandDeep : T.forest, color: !amount || Number(amount) <= 0 ? T.textSoft : "#fff", border: "none", borderRadius: 12, padding: "14px 0", fontSize: 15, fontWeight: 700, cursor: !amount ? "default" : "pointer" }}
          >
            Continue
          </button>
        </div>
      </div>
    );
  }

  if (step === 3) {
    return (
      <div style={{ height: "100%", display: "flex", flexDirection: "column", background: T.sand }}>
        <StatusBar />
        <ScreenHeader title="Review and send" onBack={back} />
        <div style={{ flex: 1, padding: "10px 20px" }}>
          <div style={{ background: T.card, border: `1px solid ${T.line}`, borderRadius: 16, padding: 20, display: "flex", flexDirection: "column", alignItems: "center", marginBottom: 20 }}>
            <Avatar name={contact.name} size={54} />
            <div style={{ ...body, fontSize: 15, fontWeight: 700, color: T.ink, marginTop: 10 }}>{contact.name}</div>
            <div style={{ ...mono, fontSize: 12, color: T.textSoft, marginBottom: 14 }}>{contact.phone}</div>
            <div style={{ ...mono, fontSize: 34, fontWeight: 700, color: T.forest }}>K {Number(amount).toFixed(2)}</div>
          </div>
          <div style={{ background: T.card, border: `1px solid ${T.line}`, borderRadius: 14, padding: "4px 16px" }}>
            {[["Transfer fee", "K 0.00"], ["Arrives", "Instantly"], ["From", "Yua balance"]].map(([k, v], i) => (
              <div key={k} style={{ display: "flex", justifyContent: "space-between", padding: "12px 0", borderBottom: i < 2 ? `1px solid ${T.line}` : "none" }}>
                <span style={{ ...body, fontSize: 13, color: T.textSoft }}>{k}</span>
                <span style={{ ...body, fontSize: 13, fontWeight: 600, color: T.ink }}>{v}</span>
              </div>
            ))}
          </div>
        </div>
        <div style={{ padding: "10px 20px 20px" }}>
          <button onClick={() => setStep(4)} style={{ ...display, width: "100%", background: T.flame, color: "#fff", border: "none", borderRadius: 12, padding: "14px 0", fontSize: 15, fontWeight: 700, cursor: "pointer" }}>
            Send K {Number(amount).toFixed(2)}
          </button>
        </div>
      </div>
    );
  }

  return (
    <div style={{ height: "100%", display: "flex", flexDirection: "column", background: T.sand }}>
      <StatusBar />
      <div style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "0 28px", textAlign: "center" }}>
        <div style={{ width: 72, height: 72, borderRadius: "50%", background: T.forest, display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 18 }}>
          <Check size={34} color="#fff" strokeWidth={3} />
        </div>
        <div style={{ ...display, fontSize: 20, fontWeight: 800, color: T.ink }}>Money sent</div>
        <div style={{ ...body, fontSize: 13.5, color: T.textSoft, marginTop: 6 }}>
          K {Number(amount).toFixed(2)} sent to {contact.name}
        </div>
      </div>
      <div style={{ padding: "0 20px 20px" }}>
        <button onClick={onDone} style={{ ...display, width: "100%", background: T.forest, color: "#fff", border: "none", borderRadius: 12, padding: "14px 0", fontSize: 15, fontWeight: 700, cursor: "pointer" }}>
          Done
        </button>
      </div>
    </div>
  );
}

// ---------------- SCAN ----------------
function ScanScreen() {
  const [tab, setTab] = useState("scan");
  return (
    <div style={{ height: "100%", display: "flex", flexDirection: "column", background: T.sand }}>
      <StatusBar />
      <ScreenHeader title="QR pay" subtitle="Scan or share your code" />
      <div style={{ padding: "0 20px 14px", display: "flex", gap: 8 }}>
        {["scan", "My code"].map((t) => {
          const key = t === "scan" ? "scan" : "mine";
          const active = tab === key;
          return (
            <button key={key} onClick={() => setTab(key)} style={{ ...body, flex: 1, fontSize: 13, fontWeight: 700, padding: "9px 0", borderRadius: 10, border: `1px solid ${active ? T.forest : T.line}`, background: active ? T.forest : T.card, color: active ? "#fff" : T.textSoft, cursor: "pointer" }}>
              {t === "scan" ? "Scan code" : "My code"}
            </button>
          );
        })}
      </div>

      <div style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "0 30px" }}>
        {tab === "scan" ? (
          <>
            <div style={{ width: 220, height: 220, position: "relative", borderRadius: 20, background: "rgba(14,92,70,0.06)", marginBottom: 20 }}>
              {[["0","0"],["0","auto"],["auto","0"],["auto","auto"]].map(([top, left], i) => (
                <div key={i} style={{
                  position: "absolute", width: 28, height: 28,
                  top: top === "0" ? -2 : "auto", bottom: top === "auto" ? -2 : "auto",
                  left: left === "0" ? -2 : "auto", right: left === "auto" ? -2 : "auto",
                  borderTop: top === "0" ? `4px solid ${T.gold}` : "none",
                  borderBottom: top === "auto" ? `4px solid ${T.gold}` : "none",
                  borderLeft: left === "0" ? `4px solid ${T.gold}` : "none",
                  borderRight: left === "auto" ? `4px solid ${T.gold}` : "none",
                  borderRadius: 6,
                }} />
              ))}
            </div>
            <div style={{ ...body, fontSize: 13, color: T.textSoft, textAlign: "center" }}>
              Line up a Yua QR code to pay a vendor instantly.
            </div>
          </>
        ) : (
          <>
            <div style={{ width: 200, height: 200, borderRadius: 16, background: T.card, border: `1px solid ${T.line}`, display: "grid", gridTemplateColumns: "repeat(8, 1fr)", gridTemplateRows: "repeat(8, 1fr)", padding: 16, gap: 3, marginBottom: 18 }}>
              {Array.from({ length: 64 }).map((_, i) => (
                <div key={i} style={{ background: (i * 7 + 3) % 5 === 0 ? T.ink : "transparent", borderRadius: 1 }} />
              ))}
            </div>
            <div style={{ ...display, fontSize: 15, fontWeight: 700, color: T.ink }}>Maria Waigani</div>
            <div style={{ ...body, fontSize: 12.5, color: T.textSoft, marginTop: 2, textAlign: "center" }}>
              Show this to receive a payment instantly.
            </div>
          </>
        )}
      </div>
    </div>
  );
}

// ---------------- AGENTS ----------------
function AgentsScreen() {
  const [tab, setTab] = useState("in");
  return (
    <div style={{ height: "100%", display: "flex", flexDirection: "column", background: T.sand }}>
      <StatusBar />
      <ScreenHeader title="Cash agents" subtitle="Turn cash into balance, and back" />
      <div style={{ padding: "0 20px 12px", display: "flex", gap: 8 }}>
        {[["in", "Cash in"], ["out", "Cash out"]].map(([key, label]) => {
          const active = tab === key;
          return (
            <button key={key} onClick={() => setTab(key)} style={{ ...body, flex: 1, fontSize: 13, fontWeight: 700, padding: "9px 0", borderRadius: 10, border: `1px solid ${active ? T.forest : T.line}`, background: active ? T.forest : T.card, color: active ? "#fff" : T.textSoft, cursor: "pointer" }}>
              {label}
            </button>
          );
        })}
      </div>
      <div style={{ flex: 1, overflowY: "auto", padding: "0 20px 14px" }}>
        {AGENTS.map((a) => (
          <div key={a.name} style={{ background: T.card, border: `1px solid ${T.line}`, borderRadius: 14, padding: 14, marginBottom: 10, display: "flex", gap: 12 }}>
            <div style={{ width: 42, height: 42, borderRadius: 12, background: T.sandDeep, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
              <Landmark size={19} color={T.forest} />
            </div>
            <div style={{ flex: 1 }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                <div style={{ ...body, fontSize: 14, fontWeight: 700, color: T.ink }}>{a.name}</div>
                <div style={{ ...body, fontSize: 11.5, fontWeight: 700, color: T.forest }}>{a.distance}</div>
              </div>
              <div style={{ ...body, fontSize: 12, color: T.textSoft, marginTop: 3, display: "flex", alignItems: "center", gap: 4 }}>
                <MapPin size={11} /> {a.address}
              </div>
              <div style={{ ...body, fontSize: 12, color: T.textSoft, marginTop: 2, display: "flex", alignItems: "center", gap: 4 }}>
                <Clock size={11} /> {a.hours}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ---------------- PROFILE ----------------
function ProfileScreen() {
  const rows = ["Account details", "Linked bank or card", "Security and PIN", "Language: Tok Pisin / English", "Help and support"];
  return (
    <div style={{ height: "100%", display: "flex", flexDirection: "column", background: T.sand }}>
      <StatusBar />
      <ScreenHeader title="Me" />
      <div style={{ padding: "0 20px" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 14, background: T.card, border: `1px solid ${T.line}`, borderRadius: 16, padding: 16, marginBottom: 18 }}>
          <Avatar name="Maria Waigani" size={52} />
          <div>
            <div style={{ ...display, fontSize: 16, fontWeight: 700, color: T.ink }}>Maria Waigani</div>
            <div style={{ ...mono, fontSize: 12, color: T.textSoft }}>+675 7234 5612</div>
          </div>
        </div>
        <div style={{ background: T.card, border: `1px solid ${T.line}`, borderRadius: 14, overflow: "hidden", marginBottom: 18 }}>
          {rows.map((r, i) => (
            <button key={r} style={{ width: "100%", display: "flex", alignItems: "center", justifyContent: "space-between", padding: "13px 16px", background: "none", border: "none", borderBottom: i < rows.length - 1 ? `1px solid ${T.line}` : "none", cursor: "pointer", textAlign: "left" }}>
              <span style={{ ...body, fontSize: 13.5, color: T.ink, fontWeight: 500 }}>{r}</span>
              <ChevronRight size={15} color={T.textSoft} />
            </button>
          ))}
        </div>
        <button style={{ ...body, width: "100%", background: "none", border: `1px solid ${T.line}`, borderRadius: 12, padding: "12px 0", fontSize: 13.5, fontWeight: 700, color: T.flame, cursor: "pointer" }}>
          Log out
        </button>
      </div>
    </div>
  );
}

// ---------------- APP ROOT ----------------
export default function yua() {
  const [screen, setScreen] = useState("login");

  function go(key) {
    setScreen(key);
  }

  const showNav = screen !== "login";

  return (
    <div style={{ display: "flex", justifyContent: "center", padding: "24px 12px", background: T.sandDeep, minHeight: 720 }}>
      <style>{`@import url('https://fonts.googleapis.com/css2?family=Sora:wght@600;700;800&family=Inter:wght@400;500;600;700&family=JetBrains+Mono:wght@500;700&display=swap');`}</style>
      <div
        style={{
          width: 340, height: 700, borderRadius: 40, background: T.ink,
          padding: 10, boxShadow: "0 20px 50px rgba(0,0,0,0.25)", flexShrink: 0,
        }}
      >
        <div style={{ width: "100%", height: "100%", borderRadius: 32, overflow: "hidden", background: T.sand, display: "flex", flexDirection: "column", position: "relative" }}>
          <div style={{ flex: 1, overflow: "hidden", display: "flex", flexDirection: "column" }}>
            {screen === "login" && <LoginScreen onLogin={() => go("home")} />}
            {screen === "home" && <HomeScreen go={go} />}
            {screen === "send" && <SendScreen onDone={() => go("home")} />}
            {screen === "scan" && <ScanScreen />}
            {screen === "agents" && <AgentsScreen />}
            {screen === "profile" && <ProfileScreen />}
          </div>
          {showNav && <BottomNav screen={screen} go={go} />}
        </div>
      </div>
    </div>
  );
}
