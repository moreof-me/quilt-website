(function () {
  const $ = (id) => document.getElementById(id);
  const money = (n) => "$" + Number(n).toLocaleString("en-US");

  // ---- Placeholder patchwork (used when a quilt has no image) ----
  function hash(str) {
    let h = 2166136261;
    for (const c of str) { h ^= c.charCodeAt(0); h = Math.imul(h, 16777619); }
    return h >>> 0;
  }
  function patchwork(q) {
    let seed = hash(q.id);
    const rand = () => ((seed = (Math.imul(seed, 1664525) + 1013904223) >>> 0) / 4294967296);
    const n = 6, s = 100 / n;
    let out = `<svg viewBox="0 0 100 100" preserveAspectRatio="xMidYMid slice" role="img" aria-label="${q.name} (illustration)" xmlns="http://www.w3.org/2000/svg">`;
    for (let y = 0; y < n; y++) {
      for (let x = 0; x < n; x++) {
        const c1 = q.colors[Math.floor(rand() * q.colors.length)];
        const c2 = q.colors[Math.floor(rand() * q.colors.length)];
        const px = x * s, py = y * s;
        out += `<rect x="${px}" y="${py}" width="${s}" height="${s}" fill="${c1}"/>`;
        out += `<polygon points="${px},${py + s} ${px + s},${py + s} ${px + s},${py}" fill="${c2}" opacity=".9"/>`;
        out += `<line x1="${px}" y1="${py}" x2="${px + s}" y2="${py + s}" stroke="#fff" stroke-opacity=".35" stroke-dasharray="1.2 1.2" stroke-width=".4"/>`;
      }
    }
    return out + `<rect x="1" y="1" width="98" height="98" fill="none" stroke="#fff" stroke-opacity=".6" stroke-width="2" stroke-dasharray="3 2"/></svg>`;
  }
  function imageHTML(q) {
    return q.image
      ? `<img src="${q.image}" alt="${q.name}" loading="lazy">`
      : patchwork(q);
  }

  // ---- Elements ----
  const grid = $("grid"), empty = $("empty"), count = $("count");
  const search = $("search"), sizeSel = $("size"), sortSel = $("sort"), hideSold = $("hideSold");
  const modal = $("modal");

  // Contact info
  const mailto = (subject) =>
    `mailto:${SITE.email}?subject=${encodeURIComponent(subject)}`;
  $("emailLink").textContent = SITE.email;
  $("emailLink").href = mailto("Quilt inquiry");
  $("phoneText").textContent = SITE.phone;
  $("shipText").textContent = SITE.shipping;
  $("year").textContent = new Date().getFullYear();

  // Size filter options
  const sizeOrder = ["Crib", "Lap", "Twin", "Full", "Queen", "King"];
  [...new Set(QUILTS.map((q) => q.size))]
    .sort((a, b) => sizeOrder.indexOf(a) - sizeOrder.indexOf(b))
    .forEach((s) => sizeSel.add(new Option(s, s)));

  // ---- Render ----
  function render() {
    const term = search.value.trim().toLowerCase();
    let list = QUILTS.filter((q) => {
      if (sizeSel.value !== "all" && q.size !== sizeSel.value) return false;
      if (hideSold.checked && q.sold) return false;
      if (!term) return true;
      return [q.name, q.pattern, q.description, q.materials, q.size]
        .join(" ").toLowerCase().includes(term);
    });

    const sorters = {
      "price-asc": (a, b) => a.price - b.price,
      "price-desc": (a, b) => b.price - a.price,
      name: (a, b) => a.name.localeCompare(b.name)
    };
    if (sorters[sortSel.value]) list.sort(sorters[sortSel.value]);

    grid.innerHTML = list.map((q) => `
      <article class="card${q.sold ? " sold" : ""}">
        <button class="card-btn" data-id="${q.id}" aria-label="View details for ${q.name}">
          <div class="card-img">${imageHTML(q)}${q.sold ? '<span class="badge">Sold</span>' : ""}</div>
          <div class="card-body">
            <h3>${q.name}</h3>
            <p class="meta">${q.size} · ${q.dimensions}</p>
            <p class="price">${money(q.price)}</p>
          </div>
        </button>
      </article>`).join("");

    empty.hidden = list.length > 0;
    count.textContent = `${list.length} quilt${list.length === 1 ? "" : "s"}`;
  }

  // ---- Modal ----
  function openModal(id) {
    const q = QUILTS.find((x) => x.id === id);
    if (!q) return;
    $("mImage").innerHTML = imageHTML(q) +
      (q.images || []).map((src) => `<img src="${src}" alt="${q.name} additional view" loading="lazy">`).join("");
    $("mTitle").textContent = q.name;
    $("mPrice").textContent = q.sold ? `${money(q.price)} — Sold` : money(q.price);
    $("mDesc").textContent = q.description;
    $("mDetails").innerHTML = [
      ["Size", `${q.size} (${q.dimensions})`],
      ["Pattern", q.pattern],
      ["Materials", q.materials]
    ].filter((r) => r[1]).map(([k, v]) => `<dt>${k}</dt><dd>${v}</dd>`).join("");
    const btn = $("mInquire");
    if (q.sold) {
      btn.textContent = "Ask about a similar quilt";
      btn.href = mailto(`Similar to "${q.name}"`);
    } else {
      btn.textContent = "Inquire about this quilt";
      btn.href = mailto(`Inquiry: ${q.name}`);
    }
    modal.showModal();
    history.replaceState(null, "", "#" + q.id);
  }
  function closeModal() { modal.close(); }

  grid.addEventListener("click", (e) => {
    const btn = e.target.closest(".card-btn");
    if (btn) openModal(btn.dataset.id);
  });
  $("closeModal").addEventListener("click", closeModal);
  modal.addEventListener("click", (e) => { if (e.target === modal) closeModal(); }); // click backdrop
  modal.addEventListener("close", () => history.replaceState(null, "", location.pathname + "#shop"));

  [search, sizeSel, sortSel, hideSold].forEach((el) =>
    el.addEventListener("input", render));

  render();

  // Deep link: yoursite.com/#lone-star opens that quilt
  const hashId = location.hash.slice(1);
  if (QUILTS.some((q) => q.id === hashId)) openModal(hashId);
})();
