import { useState } from "react";

const TABS = ["💰 Precificação", "🔍 Produtos Sugeridos", "📈 Ranqueamento"];

const PLATFORMS = {
  meli:   { label: "Mercado Livre", color: "#FFE600", bg: "#1A1A1A", commission: 11, textColor: "#FFE600" },
  shopee: { label: "Shopee",        color: "#EE4D2D", bg: "#FFF5F3", commission: 13, textColor: "#EE4D2D" },
  tiktok: { label: "TikTok Shop",   color: "#010101", bg: "#F3F0FF", commission: 12, textColor: "#6B46C1" },
};

const PRODUTOS_SUGERIDOS = [
  {
    nome: "Cuscuzeira de Alumínio nº16",
    categoria: "Utensílios de Cozinha",
    emoji: "🫕",
    facilidade: 5,
    demanda: 5,
    ticket: "R$ 28–38",
    vendasMes: "800–1.200 / mês",
    motivo: "Alta demanda no Nordeste + fácil embalar + fornecedor Campineira",
    tag: "🔥 Hot",
    tagColor: "#EE4D2D",
    embalar: "Muito fácil — cabe em caixa simples",
  },
  {
    nome: "Jarra com Tampa e Alça 1,5L",
    categoria: "Utilidades Domésticas",
    emoji: "🫙",
    facilidade: 5,
    demanda: 4,
    ticket: "R$ 22–35",
    vendasMes: "400–700 / mês",
    motivo: "Produto inicial do projeto — validado com Rodri. Leve, empilhável",
    tag: "✅ Projeto",
    tagColor: "#16A34A",
    embalar: "Fácil — plástico bolha rápido",
  },
  {
    nome: "Copos Plástico Empilhável 300ml (kit 6)",
    categoria: "Utilidades Domésticas",
    emoji: "🥤",
    facilidade: 5,
    demanda: 4,
    ticket: "R$ 18–28",
    vendasMes: "500–900 / mês",
    motivo: "Levíssimo, empilha, cabe em saco plástico, custo baixo",
    tag: "💡 Fácil",
    tagColor: "#2563EB",
    embalar: "Muito fácil — saco plástico",
  },
  {
    nome: "Taça Plástica para Vinho 350ml",
    categoria: "Festas & Eventos",
    emoji: "🥂",
    facilidade: 4,
    demanda: 4,
    ticket: "R$ 20–34",
    vendasMes: "300–600 / mês",
    motivo: "Ótimo no TikTok live — produto visual, compra por impulso",
    tag: "📱 TikTok",
    tagColor: "#7C3AED",
    embalar: "Fácil — embalagem individual já vem do fornecedor",
  },
  {
    nome: "Escorredor de Macarrão Plástico Grande",
    categoria: "Utensílios de Cozinha",
    emoji: "🍝",
    facilidade: 4,
    demanda: 4,
    ticket: "R$ 22–35",
    vendasMes: "350–600 / mês",
    motivo: "Produto cotidiano, alta demanda, leve, margem boa",
    tag: "🏠 Dia a dia",
    tagColor: "#D97706",
    embalar: "Fácil — caixa simples ou plástico bolha",
  },
  {
    nome: "Porta-Objetos Organizador com Tampa",
    categoria: "Organização",
    emoji: "📦",
    facilidade: 5,
    demanda: 3,
    ticket: "R$ 15–25",
    vendasMes: "200–400 / mês",
    motivo: "Produto organização tá em alta no Shopee — fácil embalar",
    tag: "📦 Organização",
    tagColor: "#0891B2",
    embalar: "Muito fácil — já vem em caixa ou saco",
  },
];

function Stars({ n, max = 5, color = "#FFE600" }) {
  return (
    <span>
      {Array.from({ length: max }, (_, i) => (
        <span key={i} style={{ color: i < n ? color : "#DDD", fontSize: 14 }}>★</span>
      ))}
    </span>
  );
}

function PrecificacaoTab() {
  const [inputs, setInputs] = useState({
    custo: 14, freteEntrada: 1.5, embalagem: 0.8,
    imposto: 4, fretesSaida: 8, preco: 32.90, desconto: 5,
  });

  const set = (k, v) => setInputs(p => ({ ...p, [k]: parseFloat(v) || 0 }));

  const calc = (platform) => {
    const { custo, freteEntrada, embalagem, imposto, fretesSaida, preco, desconto } = inputs;
    const comm = PLATFORMS[platform].commission;
    const custoTotal = custo + freteEntrada + embalagem;
    const precoPromo = preco * (1 - desconto / 100);
    const valComissao = precoPromo * comm / 100;
    const valImposto = precoPromo * imposto / 100;
    const totalCustos = custoTotal + fretesSaida + valComissao + valImposto;
    const lucro = precoPromo - totalCustos;
    const margem = precoPromo > 0 ? (lucro / precoPromo * 100) : 0;
    const roi = custoTotal > 0 ? (lucro / custoTotal * 100) : 0;
    return { custoTotal, precoPromo, valComissao, valImposto, totalCustos, lucro, margem, roi };
  };

  const fmt = (v) => `R$ ${v.toFixed(2).replace(".", ",")}`;
  const fmtP = (v) => `${v.toFixed(1)}%`;

  const InputField = ({ label, field, prefix = "R$", step = "0.01", isPercent = false }) => (
    <div style={{ marginBottom: 10 }}>
      <label style={{ display: "block", fontSize: 11, color: "#888", marginBottom: 3, fontFamily: "monospace" }}>{label}</label>
      <div style={{ display: "flex", alignItems: "center", background: "#0D1F3C", border: "1px solid #2563EB", borderRadius: 6, overflow: "hidden" }}>
        <span style={{ padding: "6px 8px", background: "#122348", color: "#60A5FA", fontSize: 12, fontFamily: "monospace" }}>{isPercent ? "%" : prefix}</span>
        <input
          type="number" step={step} value={inputs[field]}
          onChange={e => set(field, e.target.value)}
          style={{ flex: 1, background: "transparent", border: "none", outline: "none", color: "#60A5FA", fontWeight: "bold", fontSize: 14, padding: "6px 8px", fontFamily: "monospace" }}
        />
      </div>
    </div>
  );

  return (
    <div style={{ display: "flex", gap: 16, flexWrap: "wrap" }}>
      {/* Inputs */}
      <div style={{ flex: "0 0 220px", background: "#0A1628", border: "1px solid #1E3A5F", borderRadius: 12, padding: 16 }}>
        <div style={{ fontSize: 11, color: "#60A5FA", fontFamily: "monospace", marginBottom: 12, letterSpacing: 1 }}>▌ ENTRADAS</div>
        <InputField label="Custo do produto" field="custo" />
        <InputField label="Frete entrada (por unid.)" field="freteEntrada" />
        <InputField label="Embalagem" field="embalagem" />
        <InputField label="Imposto %" field="imposto" isPercent />
        <InputField label="Frete de saída" field="fretesSaida" />
        <InputField label="Preço de venda" field="preco" />
        <InputField label="Desconto promoção %" field="desconto" isPercent />
      </div>

      {/* Results per platform */}
      {Object.entries(PLATFORMS).map(([key, plat]) => {
        const r = calc(key);
        const ok = r.margem >= 20;
        const med = r.margem >= 12;
        const margemColor = ok ? "#22C55E" : med ? "#F59E0B" : "#EF4444";

        return (
          <div key={key} style={{ flex: 1, minWidth: 180, background: "#0A1628", border: `1px solid ${margemColor}44`, borderRadius: 12, padding: 16 }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12 }}>
              <span style={{ color: plat.textColor === "#FFE600" ? "#FFE600" : plat.textColor, fontWeight: "bold", fontSize: 13, fontFamily: "monospace" }}>
                {plat.label}
              </span>
              <span style={{ fontSize: 10, color: "#666", fontFamily: "monospace" }}>~{plat.commission}% comissão</span>
            </div>

            {[
              ["Custo total unitário", fmt(r.custoTotal), "#888"],
              ["Preço c/ promoção",    fmt(r.precoPromo),  "#DDD"],
              ["Comissão plataforma",  fmt(r.valComissao), "#EF4444"],
              ["Imposto",             fmt(r.valImposto),   "#EF4444"],
              ["Total custos",        fmt(r.totalCustos),  "#F59E0B"],
            ].map(([l, v, c]) => (
              <div key={l} style={{ display: "flex", justifyContent: "space-between", marginBottom: 5, fontSize: 12 }}>
                <span style={{ color: "#666", fontFamily: "monospace" }}>{l}</span>
                <span style={{ color: c, fontFamily: "monospace" }}>{v}</span>
              </div>
            ))}

            <div style={{ borderTop: "1px solid #1E3A5F", marginTop: 10, paddingTop: 10 }}>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 6 }}>
                <span style={{ color: "#888", fontSize: 12, fontFamily: "monospace" }}>Lucro / unid.</span>
                <span style={{ color: r.lucro >= 0 ? "#22C55E" : "#EF4444", fontWeight: "bold", fontFamily: "monospace" }}>{fmt(r.lucro)}</span>
              </div>
              <div style={{ background: margemColor + "22", borderRadius: 8, padding: "8px 10px", textAlign: "center", border: `1px solid ${margemColor}55` }}>
                <div style={{ color: margemColor, fontSize: 22, fontWeight: "bold", fontFamily: "monospace" }}>{fmtP(r.margem)}</div>
                <div style={{ color: "#888", fontSize: 10, fontFamily: "monospace" }}>margem líquida</div>
              </div>
              <div style={{ textAlign: "center", marginTop: 6, fontSize: 10, color: "#666", fontFamily: "monospace" }}>
                ROI {fmtP(r.roi)} sobre custo
              </div>
              <div style={{ textAlign: "center", marginTop: 4, fontSize: 10, color: margemColor, fontFamily: "monospace" }}>
                {ok ? "✅ Margem saudável" : med ? "⚠️ Margem apertada" : "❌ Rever precificação"}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

function ProdutosTab() {
  const [filtro, setFiltro] = useState("todos");
  const tags = ["todos", "🔥 Hot", "✅ Projeto", "💡 Fácil", "📱 TikTok"];
  const filtrados = filtro === "todos" ? PRODUTOS_SUGERIDOS : PRODUTOS_SUGERIDOS.filter(p => p.tag === filtro);

  return (
    <div>
      <div style={{ marginBottom: 16, display: "flex", gap: 8, flexWrap: "wrap" }}>
        {tags.map(t => (
          <button key={t} onClick={() => setFiltro(t)}
            style={{ padding: "5px 12px", borderRadius: 20, border: "1px solid #1E3A5F", background: filtro === t ? "#2563EB" : "#0A1628",
              color: filtro === t ? "#FFF" : "#888", cursor: "pointer", fontSize: 12, fontFamily: "monospace" }}>
            {t}
          </button>
        ))}
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: 14 }}>
        {filtrados.map(p => (
          <div key={p.nome} style={{ background: "#0A1628", border: "1px solid #1E3A5F", borderRadius: 12, padding: 16 }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 8 }}>
              <span style={{ fontSize: 28 }}>{p.emoji}</span>
              <span style={{ background: p.tagColor + "22", color: p.tagColor, fontSize: 10, padding: "3px 8px", borderRadius: 12, fontFamily: "monospace", border: `1px solid ${p.tagColor}44` }}>
                {p.tag}
              </span>
            </div>
            <div style={{ fontWeight: "bold", color: "#E2E8F0", fontSize: 14, marginBottom: 2 }}>{p.nome}</div>
            <div style={{ color: "#60A5FA", fontSize: 11, marginBottom: 8, fontFamily: "monospace" }}>{p.categoria}</div>

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8, marginBottom: 10 }}>
              {[
                ["Ticket médio", p.ticket],
                ["Vendas/mês", p.vendasMes],
              ].map(([l, v]) => (
                <div key={l} style={{ background: "#122348", borderRadius: 6, padding: "6px 8px" }}>
                  <div style={{ color: "#666", fontSize: 9, fontFamily: "monospace" }}>{l}</div>
                  <div style={{ color: "#E2E8F0", fontSize: 11, fontWeight: "bold", fontFamily: "monospace" }}>{v}</div>
                </div>
              ))}
            </div>

            <div style={{ marginBottom: 8 }}>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 2 }}>
                <span style={{ color: "#666", fontSize: 10, fontFamily: "monospace" }}>Facilidade embalar</span>
                <Stars n={p.facilidade} color="#22C55E" />
              </div>
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <span style={{ color: "#666", fontSize: 10, fontFamily: "monospace" }}>Demanda</span>
                <Stars n={p.demanda} color="#F59E0B" />
              </div>
            </div>

            <div style={{ background: "#0D1F3C", borderRadius: 6, padding: "6px 8px", marginBottom: 8 }}>
              <div style={{ color: "#666", fontSize: 9, fontFamily: "monospace", marginBottom: 2 }}>📦 Embalagem</div>
              <div style={{ color: "#22C55E", fontSize: 11, fontFamily: "monospace" }}>{p.embalar}</div>
            </div>

            <div style={{ color: "#94A3B8", fontSize: 11, lineHeight: 1.4 }}>{p.motivo}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

function RanqueamentoTab() {
  const [preco, setPreco] = useState(30.99);
  const [alvo, setAlvo] = useState(39.90);
  const [gatilho, setGatilho] = useState(20);
  const [incremento, setIncremento] = useState(1.00);
  const [vendas, setVendas] = useState(0);

  const estagios = [];
  let p = preco;
  let vendaAcum = 0;
  while (p <= alvo) {
    estagios.push({ estagio: estagios.length + 1, preco: p, de: vendaAcum, ate: vendaAcum + gatilho - 1 });
    p = Math.round((p + incremento) * 100) / 100;
    vendaAcum += gatilho;
  }

  const estagioAtual = estagios.findIndex(e => vendas >= e.de && vendas <= e.ate);

  return (
    <div>
      <div style={{ display: "flex", gap: 12, marginBottom: 16, flexWrap: "wrap" }}>
        {[
          ["Preço inicial (R$)", preco, setPreco],
          ["Preço alvo (R$)", alvo, setAlvo],
          ["Vendas p/ subir", gatilho, setGatilho],
          ["Incremento (R$)", incremento, setIncremento],
          ["Vendas acumuladas", vendas, setVendas],
        ].map(([label, val, setter]) => (
          <div key={label} style={{ flex: "0 0 140px" }}>
            <label style={{ fontSize: 10, color: "#888", fontFamily: "monospace", display: "block", marginBottom: 3 }}>{label}</label>
            <input type="number" step="0.01" value={val} onChange={e => setter(parseFloat(e.target.value) || 0)}
              style={{ width: "100%", background: "#0A1628", border: "1px solid #2563EB", borderRadius: 6, color: "#60A5FA", fontWeight: "bold", fontSize: 14, padding: "6px 8px", fontFamily: "monospace", outline: "none", boxSizing: "border-box" }} />
          </div>
        ))}
      </div>

      <div style={{ marginBottom: 8, color: "#94A3B8", fontSize: 12, fontFamily: "monospace" }}>
        ⚡ Estágio atual: <strong style={{ color: "#22C55E" }}>{estagioAtual + 1}</strong> de {estagios.length} — Próximo preço em <strong style={{ color: "#F59E0B" }}>{estagioAtual >= 0 ? estagios[estagioAtual].ate - vendas + 1 : "?"} vendas</strong>
      </div>

      <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
        {estagios.map((e, i) => {
          const ativo = i === estagioAtual;
          const passado = vendas > e.ate;
          return (
            <div key={i} style={{
              flex: "0 0 100px", background: ativo ? "#122348" : passado ? "#0D1F3C" : "#0A1628",
              border: `1px solid ${ativo ? "#2563EB" : passado ? "#1E3A5F33" : "#1E3A5F"}`,
              borderRadius: 8, padding: "8px 10px", opacity: passado ? 0.5 : 1,
            }}>
              <div style={{ fontSize: 9, color: "#666", fontFamily: "monospace" }}>Estágio {e.estagio}</div>
              <div style={{ fontSize: 16, fontWeight: "bold", color: ativo ? "#60A5FA" : passado ? "#22C55E" : "#E2E8F0", fontFamily: "monospace" }}>
                R${e.preco.toFixed(2).replace(".", ",")}
              </div>
              <div style={{ fontSize: 9, color: "#888", fontFamily: "monospace" }}>{e.de}–{e.ate} vendas</div>
              {ativo && <div style={{ fontSize: 9, color: "#2563EB", fontFamily: "monospace", marginTop: 2 }}>▶ ATUAL</div>}
              {passado && <div style={{ fontSize: 9, color: "#22C55E", fontFamily: "monospace", marginTop: 2 }}>✓ feito</div>}
            </div>
          );
        })}
      </div>

      <div style={{ marginTop: 14, background: "#0A1628", border: "1px solid #1E3A5F", borderRadius: 10, padding: 12 }}>
        <div style={{ color: "#666", fontSize: 10, fontFamily: "monospace", marginBottom: 6 }}>⚠️ REGRAS DE OURO DO RANQUEAMENTO</div>
        {[
          "Monitore estoque diariamente — furo = ranqueamento pro lixo",
          "Não troque preço manualmente — use central de promoção",
          "Faça reposição antes de zerar, não depois",
          "Só compre em volume quando já estiver vendendo bem",
          "3 unidades/dia = 90/mês = mínimo para produto saudável",
        ].map(r => (
          <div key={r} style={{ color: "#94A3B8", fontSize: 11, fontFamily: "monospace", marginBottom: 4 }}>• {r}</div>
        ))}
      </div>
    </div>
  );
}

export default function App() {
  const [tab, setTab] = useState(0);

  return (
    <div style={{ background: "#060D1A", minHeight: "100vh", padding: 16, fontFamily: "sans-serif" }}>
      <div style={{ maxWidth: 960, margin: "0 auto" }}>
        {/* Header */}
        <div style={{ marginBottom: 20 }}>
          <h1 style={{ color: "#E2E8F0", fontSize: 20, fontWeight: "bold", margin: "0 0 4px", fontFamily: "monospace" }}>
            🛒 E-commerce Toolkit
          </h1>
          <p style={{ color: "#60A5FA", fontSize: 12, margin: 0, fontFamily: "monospace" }}>
            Precificação · Pesquisa de Produto · Ranqueamento — baseado na mentoria do Rodri
          </p>
        </div>

        {/* Tabs */}
        <div style={{ display: "flex", gap: 4, marginBottom: 20, borderBottom: "1px solid #1E3A5F", paddingBottom: 0 }}>
          {TABS.map((t, i) => (
            <button key={t} onClick={() => setTab(i)}
              style={{ padding: "8px 16px", background: tab === i ? "#2563EB" : "transparent",
                color: tab === i ? "#FFF" : "#888", border: "none", borderRadius: "8px 8px 0 0",
                cursor: "pointer", fontSize: 12, fontFamily: "monospace", fontWeight: tab === i ? "bold" : "normal" }}>
              {t}
            </button>
          ))}
        </div>

        {tab === 0 && <PrecificacaoTab />}
        {tab === 1 && <ProdutosTab />}
        {tab === 2 && <RanqueamentoTab />}
      </div>
    </div>
  );
}