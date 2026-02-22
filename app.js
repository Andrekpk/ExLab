let exams = JSON.parse(localStorage.getItem('exams')) || {};

const months = ["Janeiro","Fevereiro","Março","Abril","Maio","Junho","Julho","Agosto","Setembro","Outubro","Novembro","Dezembro"];

function save() {
  localStorage.setItem('exams', JSON.stringify(exams));
  renderGrid();
}

function renderGrid() {
  const grid = document.getElementById('months-grid');
  grid.innerHTML = '';

  const currentYear = new Date().getFullYear();
  for (let year = currentYear; year >= currentYear-1; year--) {
    for (let m = 11; m >= 0; m--) {
      const key = `${year}-${String(m+1).padStart(2,'0')}`;
      const monthName = months[m];
      const items = exams[key] || [];

      const card = document.createElement('div');
      card.className = 'card';
      card.innerHTML = `
        <h3>${monthName} ${year}</h3>
        <p style="color:#64748b; font-size:14px;">${items.length} itens</p>
        <div class="items">
          ${items.slice(0,6).map(i => `<div class="item">📄</div>`).join('')}
        </div>
      `;
      card.onclick = () => showMonth(key, `${monthName} ${year}`);
      grid.appendChild(card);
    }
  }
}

function addItem(type) {
  const now = new Date();
  const key = `${now.getFullYear()}-${String(now.getMonth()+1).padStart(2,'0')}`;
  if (!exams[key]) exams[key] = [];
  
  const fakeName = type === 'pdf' ? 'laudo.pdf' : 'foto-laudo.jpg';
  exams[key].push({ type, name: fakeName, date: now.toLocaleDateString('pt-BR') });
  save();
  closeModal();
}

function showMonth(key, title) {
  alert(`📂 ${title}\n\n${(exams[key]||[]).length} itens\n\n(Em breve: visualização completa do mês)`);
}

function closeModal() { document.getElementById('modal').style.display = 'none'; }
document.getElementById('add-btn').onclick = () => document.getElementById('modal').style.display = 'flex';

renderGrid();
