const nomes = [];
const historico = [];
const datas = [];

function calcularIMC() {
  // ... pega dados dos inputs

  nomes.push(nome);
  historico.push(imcFix);
  datas.push(dataAtual);

  salvarHistorico();

  // Atualiza os dados do gráfico
  grafico.data.labels = datas;
  grafico.data.datasets[0].data = historico;
  grafico.update();
}

// Na hora de salvar
function calcularIMC() {
  // ... seu código atual

  const agora = new Date();
  const dataFormatada = agora.toLocaleString(); // ex: "30/05/2025 15:42:10"

  nomes.push(nome);
  historico.push(imc.toFixed(2));
  datas.push(dataFormatada);

  salvarHistorico();
  atualizarGrafico();
}

// Salvar no localStorage agora com data
function salvarHistorico() {
  const lista = nomes.map((nome, i) => ({
    nome,
    imc: historico[i],
    data: datas[i]
  }));
  localStorage.setItem('imcHistorico', JSON.stringify(lista));
}

// Carregar também as datas ao iniciar
function carregarHistorico() {
  const data = localStorage.getItem('imcHistorico');
  if (data) {
    try {
      const lista = JSON.parse(data);
      lista.forEach(item => {
        nomes.push(item.nome);
        historico.push(item.imc);
        datas.push(item.data);
      });
    } catch(e) {
      console.warn("Erro ao carregar histórico:", e);
    }
  }
}

// Atualizar gráfico para usar datas como labels
const grafico = new Chart(ctx, {
  type: 'line',
  data: {
    labels: datas, // <-- labels no eixo X agora são as datas
    datasets: [{
      label: 'IMC',
      data: historico,
      borderColor: 'rgb(75, 192, 192)',
      backgroundColor: 'rgba(75, 192, 192, 0.2)',
      fill: true,
      tension: 0.3
    }]
  },
  options: {
    responsive: true,
    plugins: { legend: { display: true } },
    scales: {
      y: { suggestedMin: 15, suggestedMax: 40 },
      x: {
        ticks: {
          maxRotation: 90,
          minRotation: 45,
          autoSkip: true,
          maxTicksLimit: 10
        }
      }
    }
  }
});
