
const LEVELS = [
    { val: 1, emoji: '😠', label: 'Muito Insatisfeito', barClass: 'bar-1' },
    { val: 2, emoji: '😕', label: 'Insatisfeito',       barClass: 'bar-2' },
    { val: 3, emoji: '😐', label: 'Neutro',             barClass: 'bar-3' },
    { val: 4, emoji: '😊', label: 'Satisfeito',         barClass: 'bar-4' },
    { val: 5, emoji: '🤩', label: 'Muito Satisfeito',   barClass: 'bar-5' },
  ];

let editando = false;


const codigoCorreto = "000000"; // código que vais exigir


function pedirCodigo() {
    let codigo;

    // Loop até acertar
    while (true) {
        codigo = prompt("Introduza o código:");

        if (codigo === null) {
            // se carregar em cancelar, sai
            return false;
        }

        if (codigo === codigoCorreto) {
            return true;
        } else {
            alert("Código incorreto! Tente novamente.");
        }
    }
}

function toggleEdicao() {
    const btn = document.getElementById("btn");

    if (!editando) {
        const acesso = pedirCodigo();

        if (!acesso) return;
    }

    const textos = document.querySelectorAll(".question");
    editando = !editando;

    textos.forEach(texto => {
        texto.contentEditable = editando;
        texto.style.border = editando ? "1px dashed #ccc" : "none";
    });

    btn.innerText = editando ? "Guardar" : "Editar";
}


 
  // Load votes from localStorage
  function carregarVotos() {
    try { return JSON.parse(localStorage.getItem('satisfacao_votos') || '[]'); }
    catch { return []; }
  }
 
  function guardarVotos(votos) {
    localStorage.setItem('satisfacao_votos', JSON.stringify(votos));
  }
 
  function votar() {
    const sel = document.querySelector('input[name="rating"]:checked');
    if (!sel) { mostrarToast('⚠️ Seleciona uma opção primeiro!', '#f97316'); return; }
 
    const voto = {
      valor: parseInt(sel.value),
      label: LEVELS[parseInt(sel.value) - 1].label,
      data: new Date().toLocaleDateString('pt-PT'),
      hora: new Date().toLocaleTimeString('pt-PT', { hour: '2-digit', minute: '2-digit' })
    };
 
    const votos = carregarVotos();
    votos.push(voto);
    guardarVotos(votos);
 
    // Reset
    document.querySelectorAll('input[name="rating"]').forEach(r => r.checked = false);
    mostrarToast('✓ Obrigado pelo seu feedback!', 'var(--accent-3)');
    renderStats();
  }
 
  function renderStats() {
    const votos = carregarVotos();
    const total = votos.length;
    const contagem = [0, 0, 0, 0, 0];
    votos.forEach(v => contagem[v.valor - 1]++);
 
    document.getElementById('totalBadge').textContent =
      total === 0 ? '0 respostas' : `${total} resposta${total > 1 ? 's' : ''}`;
 
    const rows = document.getElementById('statsRows');
    rows.innerHTML = LEVELS.map((lvl, i) => {
      const n = contagem[i];
      const pct = total > 0 ? Math.round((n / total) * 100) : 0;
      return `
<div class="stat-row">
<span class="stat-emoji">${lvl.emoji}</span>
<div class="stat-bar-wrap">
<div class="stat-bar ${lvl.barClass}" style="width:${pct}%"></div>
</div>
<span class="stat-count">${n}</span>
<span class="stat-pct">${pct}%</span>
</div>`;
    }).join('');
  }
 
  function exportarCSV() {
  const votos = carregarVotos();
  if (votos.length === 0) {
    mostrarToast('Sem dados para exportar.', '#f97316');
    return;
  }

  const header = "sep=;\nData;Hora;Valor;Classificacao\n";

  const rows = votos.map(v =>
    `${v.data};${v.hora};${v.valor};${v.label}`
  ).join('\n');

  const blob = new Blob(['\ufeff' + header + rows], {
    type: 'text/csv;charset=utf-8;'
  });

  const url = URL.createObjectURL(blob);

  const a = document.createElement('a');
  a.href = url;

  const hoje = new Date().toISOString().split('T')[0];
  a.download = `satisfacao_${hoje}.csv`;

  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);

  URL.revokeObjectURL(url);

  mostrarToast('CSV exportado!', 'green');
}

 
  function limparDados() {
    if (!confirm('Tens a certeza que queres apagar todos os dados?')) return;
    localStorage.removeItem('satisfacao_votos');
    renderStats();
    mostrarToast('🗑 Dados apagados.', '#f97316');
  }
 
  function mostrarToast(msg, cor) {
    const t = document.getElementById('toast');
    t.textContent = msg;
    t.style.background = cor || 'var(--accent-3)';
    t.style.color = cor && cor.includes('orange') ? 'white' : '#0d0d0d';
    t.classList.add('show');
    setTimeout(() => t.classList.remove('show'), 2800);
  }
 
  // Init
  renderStats();
