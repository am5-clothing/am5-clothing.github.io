// Replace with your brother's WhatsApp number (Morocco format: 2126XXXXXXXX)
const BROTHER_WHATSAPP_NUMBER = '212600000000';

const products = [
  {
    id: 1,
    code: '01',
    title: 'OXBLOOD WOOL COAT',
    category: 'outerwear',
    material: '80% WOOL, 20% POLYAMIDE',
    color: 'DEEP OXBLOOD',
    price: 179,
    image: 'images/tricot-noir-2.jpg',
    desc: 'Tailored heavyweight wool overcoat with dropped shoulders and concealed front placket.',
    garmentColor: '#1E0406',
    accentColor: '#4E0C0F',
    type: 'coat'
  },
  {
    id: 2,
    code: '02',
    title: 'PALE CREAM OVERSHIRT',
    category: 'essentials',
    material: '100% HEAVYWEIGHT COTTON',
    color: 'OFF-WHITE CREAM',
    price: 179,
    image: 'images/tricot-blanc-1.jpg',
    desc: 'Relaxed architectural overshirt with structured collar and clean curved hem.',
    garmentColor: '#F3EFEA',
    accentColor: '#DCD5CC',
    type: 'shirt'
  },
  {
    id: 3,
    code: '03',
    title: 'CHARCOAL UTILITY JACKET',
    category: 'outerwear',
    material: '65% COTTON, 35% NYLON',
    color: 'WASHED CHARCOAL',
    price: 179,
    image: 'images/tricot-noir-3.jpg',
    desc: 'Cropped boxy workwear jacket featuring matte tonal snaps and storm flap.',
    garmentColor: '#232221',
    accentColor: '#3A3836',
    type: 'jacket'
  },
  {
    id: 4,
    code: '04',
    title: 'STONE PLEATED TROUSERS',
    category: 'essentials',
    material: '70% VISCOSE, 30% LINEN',
    color: 'WARM STONE',
    price: 179,
    image: 'images/tricot-blanc-2.jpg',
    desc: 'Wide-leg double-pleated tailored trousers engineered for fluid drape.',
    garmentColor: '#CFC8BE',
    accentColor: '#B5ADA2',
    type: 'trousers'
  },
  {
    id: 5,
    code: '05',
    title: 'NOIR DRAPE TRENCH',
    category: 'outerwear',
    material: '100% WATER-REPELLENT TWILL',
    color: 'MATTE BLACK',
    price: 179,
    image: 'images/tricot-noir-4.jpg',
    desc: 'Minimalist full-length trench coat with raglan sleeves and waist tie.',
    garmentColor: '#141414',
    accentColor: '#2B2B2B',
    type: 'coat'
  },
  {
    id: 6,
    code: '06',
    title: 'BURGUNDY KNIT POLO',
    category: 'essentials',
    material: '100% MERINO COTTON BLEND',
    color: 'AM5 OXBLOOD',
    price: 179,
    image: 'images/tricot-noir-2.jpg',
    desc: 'Fine-gauge open-collar knit polo with ribbed cuffs and relaxed torso.',
    garmentColor: '#580E12',
    accentColor: '#3B080A',
    type: 'shirt'
  },
  {
    id: 7,
    code: '07',
    title: 'ASH CROPPED BOMBER',
    category: 'outerwear',
    material: '100% BRUSHED GABARDINE',
    color: 'TAUPE ASH',
    price: 179,
    image: 'images/tricot-blanc-3.jpg',
    desc: 'Structured minimalist bomber with clean welt pockets and tonal ribbing.',
    garmentColor: '#7B746D',
    accentColor: '#5E5852',
    type: 'jacket'
  },
  {
    id: 8,
    code: '08',
    title: 'ESPRESSO WIDE SLACKS',
    category: 'essentials',
    material: '85% WOOL BLEND, 15% ELASTANE',
    color: 'DARK ESPRESSO',
    price: 179,
    image: 'images/tricot-blanc-4.jpg',
    desc: 'Full-length tailored slacks with sharp front crease and relaxed break.',
    garmentColor: '#2C211E',
    accentColor: '#1D1513',
    type: 'trousers'
  }
];

let filteredProducts = [...products];
let activeIndex = 0;
let selectedSize = 'M';
let orderBag = [];
let isDragging = false;
let startX = 0;

function generateFallbackSVG(item) {
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

function generateGarmentSVG(item) {
  if (!item.image) return generateFallbackSVG(item);

  const fallbackEncoded = encodeURIComponent(generateFallbackSVG(item));
  return `
    <img
      src="${item.image}"
      alt="${item.title}"
      style="width: 100%; height: 290px; object-fit: cover; border-radius: 2px; box-shadow: 0 24px 28px rgba(0, 0, 0, 0.55);"
      onerror="this.outerHTML = decodeURIComponent('${fallbackEncoded}');"
    />
  `;
}

function renderRack() {
  const container = document.getElementById('rackContainer');
  container.innerHTML = '';

  filteredProducts.forEach((item, idx) => {
    const node = document.createElement('div');
    node.className = 'garment-node';
    node.innerHTML = generateGarmentSVG(item);
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
  document.getElementById('detailGarmentVisual').innerHTML = generateGarmentSVG(current);

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
  document.getElementById('lookbookVisual').innerHTML = `
    <div style="transform: ${scales[angleIdx]}; transition: transform 0.35s ease; width: 170px;">
      ${generateGarmentSVG(current)}
    </div>`;
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
        ${generateGarmentSVG(item)}
        <h4>${item.title}</h4>
        <span>${item.price} MAD</span>
      `;
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