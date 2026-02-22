let exams = JSON.parse(localStorage.getItem('exams')) || {};

function save() {
  localStorage.setItem('exams', JSON.stringify(exams));
  renderGrid();
}

function renderGrid() {
  const grid = document.getElementById('months-grid');
  const empty = document.getElementById('empty-state');
  grid.innerHTML = '';

  const keys = Object.keys(exams);
  if (keys.length === 0) {
    empty.classList.remove('hidden');
    grid.classList.add('hidden');
    return;
  }

  empty.classList.add('hidden');
  grid.classList.remove('hidden');

  keys.sort().reverse().forEach(key => {
    const [year, month] = key.split('-');
    const monthName = new Date(year, month-1).toLocaleString('pt-BR', { month: 'long' });

    const card = document.createElement('div');
    card.className = 'card';
    card.innerHTML = `
      <h3>${monthName.charAt(0).toUpperCase() + monthName.slice(1)} ${year}</h3>
      <p style="color:#64748b; font-size:14px;">${exams[key].length} itens</p>
    `;
    card.onclick = () => alert(`📂 ${monthName} ${year} (${exams[key].length} itens)`);
    grid.appendChild(card);
  });
}

function createQuickFolder() {
  const month = document.getElementById('month-select').value;
  const year = document.getElementById('year-input').value;
  const key = `${year}-${month}`;
  if (!exams[key]) exams[key] = [];
  save();
}

renderGrid();
