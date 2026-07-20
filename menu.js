/* ============================================================
   Menu data + rendering.

   Items, descriptions and prices are taken verbatim from the existing
   Sarihan site's published menu. Nothing here is invented.
   ============================================================ */

(() => {
  'use strict';

const MENU = {
    "Çorbalar": [
      {n:"Sarıhan İşkembe", d:"Dana işkembesi, ince kıyılmış servis edilir.", p:400, i:"h4X5C4sOA0e6j92pUlvyb4QTwAFFkNM19XUzlZpF"},
      {n:"Tuzlama Çorbası", d:"Dana işkembe orta kıyılmış şekilde servis edilir.", p:420, i:"RMsAYfiC7vSmiAlUHBFQWoQqgyEwOCN2EnULuFSD"},
      {n:"Şirden Tuzlama", d:"Dana şirdeni orta kıyılmış şekilde servis edilir.", p:420, i:"E8sHuwvV3jZpZ2nBXZitYuhnw2leVKUFSezKIKN2"},
      {n:"Şirden Çorba", d:"Dana şirdeni ince kıyılmış şekilde servis edilir.", p:400, i:"YIDSIjZKWh01FreFZNHI95vITJEf91pUJJtmuzvw"},
      {n:"Sarıhan Atom", d:"Dana tuzlama, dana ayak paça, kelle paça ve şirden tuzlama karışımı.", p:500},
      {n:"Damar Tuzlama", d:"Dana damarı orta kıyılmış servis edilir. Özel çorba.", p:520, i:"vd2nk07TMK1eUec8JvB7KgEuaTEjK27OQ1VAqw3R"},
      {n:"Dana Ayak Paça", d:"", p:450},
      {n:"Kelle Paça Çorbası", d:"Soslu kırmızı su; isteğe göre değiştirilebilir.", p:470, i:"HOXncxamdHJQCEWV9RhFnzBqauA4y3xShHED9Qyh"},
      {n:"Beyran", d:"Soslu ve kırmızı su; isteğe göre değiştirilebilir.", p:550, i:"V7xOgeKlrKUqt400V10iqrdNQjzWa4Misc5KS2Lo"},
      {n:"Çürük Çorbası", d:"Soslu ve kırmızı su; isteğe göre değiştirilebilir.", p:500, i:"P58zZpo1jAyN5vJU61fCEK1pVB5v4ev4lEBvqFQE"},
      {n:"Kuzu Ayak Paça", d:"Ayıklanmış; isteğe göre kemikli servis edilebilir.", p:470, i:"EgnWcs90Wo1IF2rdQN35YaNhgf41qcA39xyHw406"},
      {n:"Dil Paça", d:"Soslu ve kırmızı su; isteğe göre değiştirilebilir.", p:500},
      {n:"Beyin Çorbası", d:"Çorbanın suyu soslu ve kırmızıdır.", p:420},
      {n:"Tavuk Suyu Çorbası", d:"", p:280, i:"rX24z7uZRrK3S8ud0qGcrJY1TtpWAMAaP9EuDmKN"},
      {n:"Süzme Mercimek Çorbası", d:"Ziya Sarıhan'ın favorisi.", p:260, i:"SVjfcqQxpY7ZCea73KdjhwaVcLnvI8ago8jxODTZ"},
      {n:"Ezogelin Çorbası", d:"", p:260}
    ],
    "Ana Yemekler": [
      {n:"Sarıhan Ev Yapımı Mantı", d:"", p:500, i:"E4LVeFR6znz6zX8xdDn9xtD8A4ucElpFjJC99JU0"},
      {n:"Yarım Kuzu Kelle", d:"Ayıklanmış servis edilir. Ziya Sarıhan'ın favorisi.", p:570, i:"QyKYzhbAe039LoCSGfOe1A6CrTu4gzD7RyRlRQSO"},
      {n:"Kuzu Kelle (Tam)", d:"Ayıklanmış şekilde servis edilir.", p:1100, i:"wIfg0bhvIMnOoOjLoamoYV82JMGTgvIpZAu2Qd93"},
      {n:"Arnavut Ciğeri", d:"Sıcak; yaklaşık servis süresi 10 dakika.", p:600},
      {n:"Yaprak Ciğer", d:"Sıcak; yaklaşık servis süresi 10 dakika.", p:620, i:"ra6EG9A7OeYsSUSPUw0vlndaNZUUbiZyAZN028yp"},
      {n:"Halka Kokoreç", d:"", p:690, i:"7qa5xyuB9eplta7s2aMvVfDIEdA7mhCVirS2EOjc"},
      {n:"Sarıhan Kokoreç", d:"Özel domates ve biberli; ince kıyılmış servis edilir.", p:690, i:"ujNXBx51o9PMTnGfeZgchhW1abPlGGC38SXoCXTL"}
    ],
    "Izgaralar": [
      {n:"Izgara Köfte", d:"Yaklaşık servis süresi 15 dakika.", p:610, i:"h3WOVCABaIGGDjRbkDA9eIHGBd3iAXew8itZ6zz4"},
      {n:"Adana Kebap", d:"Yaklaşık servis süresi 15 dakika.", p:650, i:"VIvPKAsRbXC4RbHxmshASReuxsqipGpf1ksScH5I"},
      {n:"Urfa Kebap", d:"Yaklaşık servis süresi 15 dakika.", p:650, i:"TdBNvVjesJNHnPv2e106TdgyMUSmFSZXw99HYeK4"},
      {n:"Tavuk Kanat", d:"Yaklaşık servis süresi 15 dakika.", p:610, i:"lqve8wtha8VI5Giv12z6INfn1Rx2MfDFgDgPNE8k"},
      {n:"Tavuk Şiş", d:"Yaklaşık servis süresi 15 dakika.", p:610, i:"reuo0sZLge4R6s10dDOBQKb1sqolocXKH54WE3RJ"},
      {n:"Karışık Kebap", d:"", p:1150}
    ],
    "Dürüm ve Ekmek Arası": [
      {n:"Urfa Kebap Dürüm", d:"", p:520, i:"SrNUBYBp8hlIs2iG2vTRZuQ24Xg5F46bQgzovtiH"},
      {n:"Adana Kebap Dürüm", d:"", p:520, i:"dWWVX833qJspma0VO5Zal9Cysixrmv14Lj5A2GOa"},
      {n:"Tavuk Şiş Dürüm", d:"", p:500},
      {n:"Ciğer Dürüm", d:"", p:550, i:"tEn9mHl69O0BZQTSbCXh2Fdwhb42BlJ27q0U8gDp"},
      {n:"Ekmek Arası Köfte", d:"", p:380},
      {n:"Kokoreç Dürüm", d:"", p:645, i:"v3CcvTbuXcqvkGTV6a4q6lBISpn2nFhFoRJ40uVq"},
      {n:"Kuzu Kelle Dürüm", d:"", p:530}
    ],
    "Aperatifler": [
      {n:"Patates Kızartması", d:"", p:230, i:"WehBNu9j9DktAlzwbcVHbKqRJYKX1M23XZyiVW0A"},
      {n:"İçli Köfte", d:"Ziya Sarıhan'ın favorisi.", p:200, i:"T09tL4uveukOQbEUVu6uNJRAnXwFvfeE3FZPqyUT"},
      {n:"Dil Söğüş", d:"Dana dili.", p:550, i:"fh5RFm0AtOIbMaZzXHtdj9OK7YkwaILGzSUN9kBA"},
      {n:"Pirinç Pilavı", d:"", p:210, i:"8qOAgBCdLflmC3sYIWV8wDVzRd8w51YaHtnKXIzo"},
      {n:"Yoğurt", d:"", p:150}
    ],
    "Salatalar": [
      {n:"Söğüş Salata", d:"Ziya Sarıhan'ın favorisi.", p:230, i:"GSyzd4o3Eic9qDntGEYZhdSLQ9PWdrm5Z9VDwAVh"},
      {n:"Beyin Salata", d:"Ziya Sarıhan'ın favorisi.", p:380, i:"9hKdtqXZ0k3WRn3BfjUgH8pqO9SRaXr3L1C8htdz"},
      {n:"Çoban Salata", d:"", p:230, i:"NqHtBxeVtpEAjE3XYUJ7C6WXUJEmaHnINlGhn9ds"},
      {n:"Roka (Servis)", d:"", p:230},
      {n:"Söğüş Salata (Büyük)", d:"", p:360, i:"0VU7MzImXCge6S5MR2m91kpgW3fBeRSsCbycLliC"},
      {n:"Mevsim Salatası", d:"", p:230}
    ],
    "Tatlılar": [
      {n:"Fırın Sütlaç (Fındıklı)", d:"Ziya Sarıhan'ın favorisi.", p:280},
      {n:"Zerde", d:"", p:240, i:"cPUm7fuZ8raNYzEijV5mnYdb0snODwlJMvAZk9TQ"},
      {n:"Kadayıf", d:"", p:330},
      {n:"Künefe", d:"", p:340},
      {n:"Kaymak", d:"", p:70}
    ],
    "İçecekler": [
      {n:"Su", d:"", p:20},
      {n:"Cola · Fanta · Sprite", d:"", p:110},
      {n:"Ayran", d:"", p:80},
      {n:"Soda", d:"", p:70},
      {n:"Çay", d:"", p:50},
      {n:"Türk Kahvesi", d:"", p:150},
      {n:"Fuse Tea", d:"", p:110},
      {n:"Şalgam", d:"", p:110},
      {n:"Taze Sıkma Portakal Suyu", d:"", p:270}
    ]
  };

  const FEATURED = ["Beyran", "Sarıhan İşkembe", "Yarım Kuzu Kelle"];
  const FAV = "Ziya Sarıhan'ın favorisi.";

  const cats     = Object.keys(MENU);
  const allItems = cats.flatMap(c => MENU[c].map(it => ({ ...it, cat: c })));

  const listEl   = document.getElementById('menuList');
  const tabsEl   = document.getElementById('menuTabs');
  const featEl   = document.getElementById('menuFeatured');
  const searchEl = document.getElementById('menuSearch');
  const emptyEl  = document.getElementById('menuEmpty');
  const galEl    = document.getElementById('gallery');
  if (!listEl) return;

  const img = id => `assets/menu/${id}.jpg`;
  const fmt = p  => p.toLocaleString('tr-TR');
  // Turkish-aware lowercasing. A plain toLowerCase() mangles the dotted and
  // dotless I, so "İÇECEK" would not match "içecek".
  const norm = s => s.toLocaleLowerCase('tr-TR');
  // Menu text is our own data, but it still passes through innerHTML, so it
  // gets escaped rather than trusted by proximity.
  const esc = s => String(s).replace(/[&<>"]/g, c => (
    { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]
  ));

  let activeCat = cats[0];
  let query     = '';

  /* ---------- featured trio ---------- */
  featEl.innerHTML = FEATURED.map(name => {
    const it = allItems.find(x => x.n === name);
    if (!it || !it.i) return '';
    return `
      <article class="feat reveal">
        <div class="feat-img">
          <img src="${img(it.i)}" alt="${esc(it.n)}" loading="lazy" decoding="async">
        </div>
        <div class="feat-body">
          <p class="feat-cat">${esc(it.cat)}</p>
          <h3>${esc(it.n)}</h3>
          <p class="feat-d">${esc(it.d.replace(FAV, '').trim())}</p>
          <p class="feat-p">${fmt(it.p)} <span>₺</span></p>
        </div>
      </article>`;
  }).join('');

  /* ---------- tabs ---------- */
  function renderTabs() {
    tabsEl.innerHTML = cats.map(c => `
      <button class="tab${c === activeCat ? ' on' : ''}" data-cat="${esc(c)}"
              role="tab" aria-selected="${c === activeCat}">
        ${esc(c)}<i>${MENU[c].length}</i>
      </button>`).join('');
  }

  /* ---------- rows ---------- */
  function row(it, showCat) {
    const fav  = it.d.includes(FAV);
    const desc = it.d.replace(FAV, '').trim();
    return `
      <li class="item">
        ${it.i
          ? `<img class="item-th" src="${img(it.i)}" alt="" loading="lazy" decoding="async">`
          : `<span class="item-th item-th--none" aria-hidden="true">S</span>`}
        <div class="item-main">
          <p class="item-n">${esc(it.n)}${fav ? '<em class="badge">Favori</em>' : ''}</p>
          ${desc ? `<p class="item-d">${esc(desc)}</p>` : ''}
          ${showCat ? `<p class="item-cat">${esc(it.cat)}</p>` : ''}
        </div>
        <p class="item-p">${fmt(it.p)} <span>₺</span></p>
      </li>`;
  }

  function render() {
    const searching = query.length > 0;
    const items = searching
      ? allItems.filter(it => norm(`${it.n} ${it.d} ${it.cat}`).includes(norm(query)))
      : MENU[activeCat].map(it => ({ ...it, cat: activeCat }));

    tabsEl.classList.toggle('muted', searching);
    emptyEl.hidden = items.length > 0;
    listEl.innerHTML = items.map(it => row(it, searching)).join('');
  }

  /* ---------- gallery ---------- */
  // Built from the menu data rather than a second hand-kept list, so a dish
  // can never appear in the strip after being removed from the menu.
  if (galEl) {
    const shots = allItems.filter(it => it.i).slice(0, 12);
    galEl.innerHTML = shots.map(it => `
      <figure class="shot" role="listitem">
        <img src="${img(it.i)}" alt="${esc(it.n)}" loading="lazy" decoding="async">
        <figcaption>${esc(it.n)}</figcaption>
      </figure>`).join('');
  }

  /* ---------- events ---------- */
  tabsEl.addEventListener('click', e => {
    const b = e.target.closest('.tab');
    if (!b) return;
    activeCat = b.dataset.cat;
    if (query) { query = ''; searchEl.value = ''; }
    renderTabs();
    render();
  });

  searchEl.addEventListener('input', e => {
    query = e.target.value.trim();
    render();
  });

  renderTabs();
  render();
})();
