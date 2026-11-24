// Replace with your brother's WhatsApp number (Morocco format: 2126XXXXXXXX)
const BROTHER_WHATSAPP_NUMBER = '212600000000';

const products = [
  {
    id: 1,
    code: '01',
    title: 'TRICOT BLANC CLASSIC',
    category: 'essentials',
    material: '100% COTON PEIGNÉ',
    color: 'BLANC CASSÉ',
    price: 178,
    image: 'images/trico-blanc-1.jpg',
    desc: 'Tricot blanc épuré à la coupe soignée, confortable et facile à porter au quotidien.',
    garmentColor: '#F3EFEA',
    accentColor: '#DCD5CC',
    type: 'shirt'
  },
  {
    id: 2,
    code: '02',
    title: 'TRICOT BLANC ÉDITION II',
    category: 'essentials',
    material: '100% COTON DOUX',
    color: 'BLANC NATUREL',
    price: 178,
    image: 'images/trico-blanc-2.jpg',
    desc: 'Pièce légère en maille blanche avec finitions nettes et tombé fluide.',
    garmentColor: '#F3EFEA',
    accentColor: '#DCD5CC',
    type: 'shirt'
  },
  {
    id: 3,
    code: '03',
    title: 'TRICOT NOIR ÉDITION II',
    category: 'essentials',
    material: '100% COTON DOUX',
    color: 'NOIR PROFOND',
    price: 178,
    image: 'images/trico-noir-2.jpg',
    desc: 'Tricot noir minimaliste au rendu structuré, idéal pour un style sobre et moderne.',
    garmentColor: '#1B1B1B',
    accentColor: '#343434',
    type: 'shirt'
  },
  {
    id: 4,
    code: '04',
    title: 'TRICOT BLANC STRUCTURÉ',
    category: 'essentials',
    material: 'COTON MÉLANGE CONFORT',
    color: 'BLANC PERLE',
    price: 178,
    image: 'images/trico-blanc-3.jpg',
    desc: 'Tricot blanc à tenue soignée offrant un maintien équilibré et une finition propre.',
    garmentColor: '#F3EFEA',
    accentColor: '#DCD5CC',
    type: 'shirt'
  },
  {
    id: 5,
    code: '05',
    title: 'TRICOT NOIR STRUCTURÉ',
    category: 'essentials',
    material: 'COTON MÉLANGE CONFORT',
    color: 'NOIR MAT',
    price: 178,
    image: 'images/trico-noir-3.jpg',
    desc: 'Pièce noire élégante en maille douce avec coupe équilibrée et détails discrets.',
    garmentColor: '#1B1B1B',
    accentColor: '#343434',
    type: 'shirt'
  },
  {
    id: 6,
    code: '06',
    title: 'TRICOT BLANC SIGNATURE',
    category: 'essentials',
    material: '100% COTON PREMIUM',
    color: 'BLANC CRÈME',
    price: 178,
    image: 'images/trico-blanc-4.jpg',
    desc: 'Tricot blanc signature pensé pour allier simplicité, tenue et confort durable.',
    garmentColor: '#F3EFEA',
    accentColor: '#DCD5CC',
    type: 'shirt'
  },
  {
    id: 7,
    code: '07',
    title: 'TRICOT NOIR SIGNATURE',
    category: 'essentials',
    material: '100% COTON PREMIUM',
    color: 'NOIR INTENSE',
    price: 178,
    image: 'images/trico-noir-4.jpg',
    desc: 'Tricot noir signature à la ligne épurée et au toucher doux pour un look affirmé.',
    garmentColor: '#1B1B1B',
    accentColor: '#343434',
    type: 'shirt'
  },
  {
    id: 8,
    code: '08',
    title: 'TRICOT NOIR ESSENTIEL',
    category: 'essentials',
    material: '100% COTON DOUX',
    color: 'NOIR CHARBON',
    price: 178,
    image: 'images/trico-noir-2.jpg',
    desc: 'Essentiel noir polyvalent conçu pour compléter la collection avec sobriété.',
    garmentColor: '#1B1B1B',
    accentColor: '#343434',
    type: 'shirt'
  }
];

let filteredProducts = [...products];
let activeIndex = 0;
let selectedSize = 'M';
let orderBag = [];
let isDragging = false;
let startX = 0;

function generateGarmentSVG(item) {
  const hanger = `
    <path d="M100 12 C100 4, 110 4, 110 12 C110 17, 105 20, 105 24" fill="none" stroke="#D8D2C9" stroke-width="2.2" stroke-linecap="round"/>
    <path d="M62 44 L105 24 L148 44" fill="none" stroke="#1A1A1A" stroke-width="4" stroke-linecap="round"/>
  `;

  if (item.type === 'coat') {
    return `
      <svg viewBox="0 0 210 340">
        ${hanger}
        <path d="M60 44 L150 44 L168 180 L152 184 L142 96 L144 315 L66 315 L68 96 L58 184 L42 180 Z" fill="${item.garmentColor}"/>
        <path d="M92 44 L105 92 L118 44" fill="none" stroke="${item.accentColor}" stroke-width="2"/>
        <line x1="105" y1="92" x2="105" y2="315" stroke="${item.accentColor}" stroke-width="1.5"/>
      </svg>`;
  }
  if (item.type === 'shirt') {
    return `
      <svg viewBox="0 0 210 310">
        ${hanger}
        <path d="M62 44 L148 44 L170 175 L152 178 L140 94 L140 265 Q105 280 70 265 L70 94 L58 178 L40 175 Z" fill="${item.garmentColor}"/>
        <path d="M90 44 L105 62 L120 44" fill="none" stroke="${item.accentColor}" stroke-width="2"/>
        <line x1="105" y1="62" x2="105" y2="272" stroke="${item.accentColor}" stroke-width="1.4"/>
      </svg>`;
  }
  if (item.type === 'jacket') {
    return `
      <svg viewBox="0 0 210 300">
        ${hanger}
        <path d="M58 44 L152 44 L172 170 L152 174 L142 92 L144 240 L66 240 L68 92 L58 174 L38 170 Z" fill="${item.garmentColor}"/>
        <rect x="66" y="226" width="78" height="14" fill="${item.accentColor}"/>
        <line x1="105" y1="44" x2="105" y2="240" stroke="${item.accentColor}" stroke-width="2"/>
      </svg>`;
  }
  return `
    <svg viewBox="0 0 210 330">
      ${hanger}
      <path d="M72 44 L138 44 L148 305 L114 305 L105 135 L96 305 L62 305 Z" fill="${item.garmentColor}"/>
      <line x1="90" y1="44" x2="84" y2="305" stroke="${item.accentColor}" stroke-width="1.2"/>
      <line x1="120" y1="44" x2="126" y2="305" stroke="${item.accentColor}" stroke-width="1.2"/>
    </svg>`;
}

function setVisualHTML(container, item) {
  if (!container) return;
  if (!item.image) {
    container.innerHTML = generateGarmentSVG(item);
    return;
  }

  container.innerHTML = `
    <img
      src="${item.image}"
      alt="${item.title}"
      class="garment-photo"
      style="width: 100%; height: 100%; object-fit: cover; border-radius: 6px;"
    />
  `;

  const img = container.querySelector('img');
  if (img) {
    img.addEventListener('error', () => {
      container.innerHTML = generateGarmentSVG(item);
    }, { once: true });
  }
}

function renderRack() {
  const container = document.getElementById('rackContainer');
  container.innerHTML = '';

  filteredProducts.forEach((item, idx) => {
    const node = document.createElement('div');
    node.className = 'garment-node';
    setVisualHTML(node, item);
    node.onclick = () => {
      if (idx === activeIndex) {
        openDetailView();
      } else {
        activeIndex = idx;
        updateRackPositions();
      }
    };
    container.appendChild(node);
  });

  updateRackPositions();
}

function updateRackPositions() {
  const nodes = document.querySelectorAll('.garment-node');
  const total = filteredProducts.length;

  nodes.forEach((node, idx) => {
    let offset = idx - activeIndex;
    if (offset < 0) offset += total;

    const x = offset * 68;
    const y = offset * 18;
    const scale = Math.max(0.45, 1 - offset * 0.08);
    const opacity = offset > 6 ? 0 : Math.max(0.25, 1 - offset * 0.12);

    node.style.transform = `translate3d(${x}px, ${y}px, 0) scale(${scale})`;
    node.style.zIndex = 20 - offset;
    node.style.opacity = opacity;
    node.style.filter = offset === 0 ? 'brightness(1.04)' : 'brightness(0.82)';
  });

  const current = filteredProducts[activeIndex];
  const countText = `${String(activeIndex + 1).padStart(2, '0')} / ${String(total).padStart(2, '0')}`;

  document.getElementById('currentIndexDisplay').textContent = String(activeIndex + 1).padStart(2, '0');
  document.getElementById('totalIndexDisplay').textContent = String(total).padStart(2, '0');
  document.getElementById('panelCounter').textContent = countText;
  document.getElementById('panelTitle').textContent = current.title;
  document.getElementById('panelDesc').textContent = current.desc;
  document.getElementById('panelMaterial').textContent = current.material;
  document.getElementById('panelColor').textContent = current.color;
  document.getElementById('panelPrice').textContent = `${current.price} MAD`;
}

function stepRack(dir) {
  const total = filteredProducts.length;
  activeIndex = (activeIndex + dir + total) % total;
  updateRackPositions();
}

function filterCategory(category, btn) {
  document.querySelectorAll('.nav-btn').forEach(b => b.classList.remove('active'));
  if (btn) btn.classList.add('active');

  filteredProducts = category === 'all'
    ? [...products]
    : products.filter(p => p.category === category);

  activeIndex = 0;
  backToCollection();
  renderRack();
}

function openDetailView() {
  const current = filteredProducts[activeIndex];
  document.getElementById('rackView').classList.add('hidden');
  document.getElementById('detailView').classList.remove('hidden');

  document.getElementById('detailCounter').textContent = `${current.code} / ${String(filteredProducts.length).padStart(2, '0')}`;
  document.getElementById('detailTitle').textContent = current.title;
  document.getElementById('detailDesc').textContent = current.desc;
  document.getElementById('detailMaterial').textContent = current.material;
  document.getElementById('detailColor').textContent = current.color;
  document.getElementById('detailPrice').textContent = `${current.price} MAD`;
  document.getElementById('detailBtnPrice').textContent = `${current.price} MAD`;
  setVisualHTML(document.getElementById('detailGarmentVisual'), current);

  setLookAngle(0, document.querySelector('.angle-btn'));
}

function backToCollection(e) {
  if (e) e.preventDefault();
  document.getElementById('detailView').classList.add('hidden');
  document.getElementById('rackView').classList.remove('hidden');
}

function selectSize(size, btn) {
  selectedSize = size;
  document.querySelectorAll('.size-btn').forEach(b => b.classList.remove('active'));
  btn.classList.add('active');
}

function setLookAngle(angleIdx, btn) {
  document.querySelectorAll('.angle-btn').forEach(b => b.classList.remove('active'));
  if (btn) btn.classList.add('active');

  const current = filteredProducts[activeIndex];
  const scales = ['scale(1)', 'scale(1.15) translateY(-10px)', 'scale(1.45) translateY(25px)'];
  document.getElementById('lookAngleIndex').textContent = `0${angleIdx + 1} / 03`;
  const lookbookEl = document.getElementById('lookbookVisual');
  lookbookEl.innerHTML = `
    <div class="look-scale" style="transform: ${scales[angleIdx]}; transition: transform 0.35s ease; width: 170px;"></div>
  `;
  setVisualHTML(lookbookEl.querySelector('.look-scale'), current);
}

function addCurrentToOrder() {
  const current = filteredProducts[activeIndex];
  orderBag.push({ ...current, size: selectedSize });
  updateOrderDrawerUI();
  openOrderDrawer();
}

function removeBagItem(index) {
  orderBag.splice(index, 1);
  updateOrderDrawerUI();
}

function updateOrderDrawerUI() {
  document.getElementById('bagCount').textContent = orderBag.length;
  const list = document.getElementById('orderItemsList');
  list.innerHTML = '';

  let total = 0;
  orderBag.forEach((item, idx) => {
    total += item.price;
    const row = document.createElement('div');
    row.className = 'order-item-row';
    row.innerHTML = `
      <div>
        <div>${item.title} (${item.size})</div>
        <div style="color: var(--cream-muted); font-size: 0.65rem;">${item.price} MAD</div>
      </div>
      <button class="remove-item-btn" onclick="removeBagItem(${idx})">REMOVE</button>
    `;
    list.appendChild(row);
  });

  document.getElementById('orderTotalPrice').textContent = `${total} MAD`;
}

function openOrderDrawer() {
  document.getElementById('orderDrawer').classList.add('open');
  document.getElementById('drawerBackdrop').classList.remove('hidden');
}

function closeOrderDrawer() {
  document.getElementById('orderDrawer').classList.remove('open');
  document.getElementById('drawerBackdrop').classList.add('hidden');
}

function submitWhatsAppOrder(e) {
  e.preventDefault();
  if (orderBag.length === 0) {
    alert('Please select at least one item first.');
    return;
  }

  const name = document.getElementById('custName').value.trim();
  const phone = document.getElementById('custPhone').value.trim();
  const city = document.getElementById('custCity').value.trim();

  const itemsText = orderBag
    .map((item, i) => `${i + 1}. ${item.title} — Size ${item.size} (${item.price} MAD)`)
    .join('\n');
  const total = orderBag.reduce((sum, item) => sum + item.price, 0);

  const message = `Salam AM5 CLOTHING, bghit ncommander:\n\n${itemsText}\n\nTotal: ${total} MAD\nName: ${name}\nPhone: ${phone}\nCity: ${city}`;
  const url = `https://wa.me/${BROTHER_WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
  window.open(url, '_blank');
}

function toggleGridOverview() {
  const overlay = document.getElementById('indexOverlay');
  overlay.classList.toggle('hidden');

  if (!overlay.classList.contains('hidden')) {
    const grid = document.getElementById('archiveGrid');
    grid.innerHTML = '';
    products.forEach((item, idx) => {
      const card = document.createElement('div');
      card.className = 'archive-card';
      card.innerHTML = `
        <div class="archive-thumb"></div>
        <h4>${item.title}</h4>
        <span>${item.price} MAD</span>
      `;
      setVisualHTML(card.querySelector('.archive-thumb'), item);
      card.onclick = () => {
        filteredProducts = [...products];
        activeIndex = idx;
        renderRack();
        toggleGridOverview();
        openDetailView();
      };
      grid.appendChild(card);
    });
  }
}

function openAboutModal() {
  document.getElementById('aboutOverlay').classList.toggle('hidden');
}

// Wheel, Keyboard & Drag Navigation
let wheelLock = false;
window.addEventListener('wheel', (e) => {
  if (document.getElementById('rackView').classList.contains('hidden')) return;
  if (wheelLock) return;
  wheelLock = true;
  stepRack(e.deltaY > 0 ? 1 : -1);
  setTimeout(() => { wheelLock = false; }, 320);
});

window.addEventListener('keydown', (e) => {
  if (e.key === 'ArrowRight') stepRack(1);
  if (e.key === 'ArrowLeft') stepRack(-1);
  if (e.key === 'Escape') backToCollection();
});

const rackStage = document.getElementById('rackView');
rackStage.addEventListener('mousedown', (e) => {
  isDragging = true;
  startX = e.clientX;
});
window.addEventListener('mouseup', (e) => {
  if (!isDragging) return;
  isDragging = false;
  const diff = e.clientX - startX;
  if (Math.abs(diff) > 45) stepRack(diff < 0 ? 1 : -1);
});

renderRack();