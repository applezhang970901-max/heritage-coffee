/**
 * L'HÉRITAGE COFFEE ROASTERS - 前端核心互動邏輯
 * 包含：官網展示、名茶線上選購（多規格）、購物袋抽屜、試跑結帳流程與 Web Audio 聲景
 */

document.addEventListener("DOMContentLoaded", () => {
  // 載入資料
  let siteData = StorageManager.loadData();
  let currentCategory = "all";
  let searchQuery = "";

  // 1. 初始化頁面各版塊
  initHeroAndPhilosophy(siteData);
  initBrewingMethods(siteData);
  initSeasonalSpecials(siteData);
  initInteriorSpaces(siteData);
  renderMenuList();

  // 初始化茶包專區與購物車狀態
  initTeaProducts(siteData);
  updateCartBadge();
  setupCartDrawerEvents();
  setupCheckoutEvents();

  // 監聽資料變更（當後台 CRUD 修改時即時刷新前台）
  window.addEventListener("lheritage_data_updated", (e) => {
    siteData = e.detail;
    renderMenuList();
    initSeasonalSpecials(siteData);
    initTeaProducts(siteData);
    if (typeof refreshAdminTables === "function") {
      refreshAdminTables();
    }
  });

  // 監聽購物車變更
  window.addEventListener("lheritage_cart_updated", () => {
    updateCartBadge();
    renderCartDrawer();
  });

  // 2. 菜單分類篩選與搜尋
  const filterTabs = document.querySelectorAll(".menu-tab-btn");
  filterTabs.forEach(tab => {
    tab.addEventListener("click", () => {
      filterTabs.forEach(t => t.classList.remove("active"));
      tab.classList.add("active");
      currentCategory = tab.dataset.category;
      renderMenuList();
    });
  });

  const searchInput = document.getElementById("menuSearchInput");
  if (searchInput) {
    searchInput.addEventListener("input", (e) => {
      searchQuery = e.target.value.trim().toLowerCase();
      renderMenuList();
    });
  }

  // 3. 渲染菜單品項列表
  function renderMenuList() {
    const grid = document.getElementById("menuGrid");
    if (!grid) return;

    let items = siteData.menuItems || [];

    // 依類別篩選
    if (currentCategory !== "all") {
      if (currentCategory === "seasonal") {
        items = items.filter(i => i.isSeasonal || i.category === "seasonal");
      } else {
        items = items.filter(i => i.category === currentCategory && !i.isSeasonal);
      }
    }

    // 依搜尋字串篩選
    if (searchQuery) {
      items = items.filter(i => {
        const text = `${i.name} ${i.enName || ''} ${i.desc || ''} ${(i.notes || []).join(' ')} ${i.origin || ''}`.toLowerCase();
        return text.includes(searchQuery);
      });
    }

    if (items.length === 0) {
      grid.innerHTML = `
        <div style="grid-column: 1 / -1; text-align: center; padding: 60px 20px; color: var(--text-secondary);">
          <div style="font-size: 2rem; margin-bottom: 12px; color: var(--gold-primary);">❖</div>
          <p style="font-size: 1.1rem; margin-bottom: 8px;">未尋得符合條件的私人典藏品項</p>
          <p style="font-size: 0.85rem; color: var(--text-muted);">請嘗試不同關鍵字，或洽詢私人侍豆師客製推薦。</p>
        </div>
      `;
      return;
    }

    grid.innerHTML = items.map(item => {
      const notesHtml = (item.notes || []).map(note => `<span class="menu-card-tag">${note}</span>`).join("");
      const badgeHtml = item.badge ? `<div class="menu-card-badge">${item.badge}</div>` : "";
      return `
        <div class="menu-card" data-item-id="${item.id}">
          <div class="menu-card-img-wrap">
            <img src="${item.image || 'https://images.unsplash.com/photo-1498804103079-a6351b050096?auto=format&fit=crop&w=800&q=80'}" alt="${item.name}" class="menu-card-img" loading="lazy">
          </div>
          <div class="menu-card-content">
            ${badgeHtml}
            <div class="menu-card-header">
              <div class="menu-card-title-group">
                <h3>${item.name}</h3>
                <div class="menu-card-en">${item.enName || ''}</div>
              </div>
              <div class="menu-card-price">NT$ ${Number(item.price).toLocaleString()}</div>
            </div>
            <p class="menu-card-desc">${item.desc || ''}</p>
            <div class="menu-card-tags">${notesHtml}</div>
            <div class="menu-card-footer">
              <span style="font-size: 0.76rem; color: var(--text-muted);">${item.origin ? '產地：' + item.origin.split(' ')[0] : '嚴選私家特調'}</span>
              <button class="btn-view-details" onclick="openProductModal('${item.id}')">
                品鑑詳情 <span>→</span>
              </button>
            </div>
          </div>
        </div>
      `;
    }).join("");
  }

  // 4. 開店旨意與價值觀
  function initHeroAndPhilosophy(data) {
    const valuesContainer = document.getElementById("philosophyValues");
    if (valuesContainer && data.philosophy && data.philosophy.values) {
      valuesContainer.innerHTML = data.philosophy.values.map(v => `
        <div class="value-card">
          <div class="value-icon">❖</div>
          <div class="value-info">
            <h4>${v.title}</h4>
            <p>${v.desc}</p>
          </div>
        </div>
      `).join("");
    }
  }

  // 5. 製做方法 (Brewing Methods)
  function initBrewingMethods(data) {
    const container = document.getElementById("craftMethodsGrid");
    if (!container || !data.brewingMethods) return;

    container.innerHTML = data.brewingMethods.map(m => `
      <div class="craft-card">
        <div class="craft-img-wrap">
          <img src="${m.image}" alt="${m.name}" loading="lazy">
          <div class="craft-tag-badge">${m.tag}</div>
        </div>
        <div class="craft-body">
          <div class="craft-en-name">${m.enName}</div>
          <h3 class="craft-name">${m.name}</h3>
          <p class="craft-desc">${m.desc}</p>
          <div class="craft-parameters">❖ 萃取工藝規範：${m.parameters}</div>
        </div>
      </div>
    `).join("");
  }

  // 6. 特別季節限定商品 (Seasonal Specials)
  function initSeasonalSpecials(data) {
    const container = document.getElementById("seasonalBannerContent");
    if (!container) return;

    const seasonalItem = (data.menuItems || []).find(i => i.isSeasonal) || (DEFAULT_COFFEE_DATA.menuItems.find(i => i.isSeasonal));
    if (!seasonalItem) return;

    container.innerHTML = `
      <div>
        <div class="seasonal-badge-large">${seasonalItem.badge || '冬季奢華限定'}</div>
        <h3 class="seasonal-headline">${seasonalItem.name}</h3>
        <p class="seasonal-story">${seasonalItem.desc}</p>
        <div class="seasonal-specs">
          <div class="spec-item">
            <span class="spec-label">嚴選風土與工藝</span>
            <span class="spec-val">${seasonalItem.origin || '頂級高海拔微批次'}</span>
          </div>
          <div class="spec-item">
            <span class="spec-label">熟成風味基調</span>
            <span class="spec-val">${(seasonalItem.notes || []).join(' ｜ ')}</span>
          </div>
        </div>
        <div style="display: flex; align-items: center; gap: 20px; flex-wrap: wrap;">
          <span style="font-family: var(--font-display-en); font-size: 1.8rem; font-weight: 700; color: var(--gold-light);">
            NT$ ${Number(seasonalItem.price).toLocaleString()}
          </span>
          <button class="btn-luxury btn-primary-gold" onclick="prefillReservation('${seasonalItem.name}')">
            即刻預訂席位品鑑
          </button>
        </div>
      </div>
      <div class="seasonal-banner-img-box">
        <img src="${seasonalItem.image}" alt="${seasonalItem.name}" class="seasonal-banner-img" loading="lazy">
      </div>
    `;
  }

  // 7. 店內設計 (Interior Spaces)
  function initInteriorSpaces(data) {
    const container = document.getElementById("interiorGrid");
    if (!container || !data.interiorSpaces) return;

    container.innerHTML = data.interiorSpaces.map(space => `
      <div class="interior-card">
        <div class="interior-img-box">
          <img src="${space.image}" alt="${space.title}" loading="lazy">
        </div>
        <div class="interior-info">
          <div class="interior-en">${space.enTitle}</div>
          <h3 class="interior-title">${space.title}</h3>
          <p class="interior-desc">${space.desc}</p>
          <div class="interior-highlight">
            <span>❖</span>
            <span>${space.highlight}</span>
          </div>
        </div>
      </div>
    `).join("");
  }

  // 8. 預約訂位表單送出處理
  const reservationForm = document.getElementById("reservationForm");
  if (reservationForm) {
    reservationForm.addEventListener("submit", (e) => {
      e.preventDefault();

      const newRes = {
        name: document.getElementById("resName").value.trim(),
        phone: document.getElementById("resPhone").value.trim(),
        email: document.getElementById("resEmail").value.trim(),
        salon: document.getElementById("resSalon").value,
        guests: Number(document.getElementById("resGuests").value),
        date: document.getElementById("resDate").value,
        time: document.getElementById("resTime").value,
        notes: document.getElementById("resNotes").value.trim()
      };

      if (!newRes.name || !newRes.phone || !newRes.date || !newRes.time) {
        showToast("請完整填寫尊榮預約資訊。");
        return;
      }

      const saved = StorageManager.addReservation(newRes);
      showToast(`❖ 預約已送出！單號：${saved.id}，典藏管家將於2小時內與您專線聯繫確認。`);
      reservationForm.reset();
    });
  }

  // 9. 背景放鬆黑膠氛圍音樂產生器 (Web Audio API)
  initAmbientSoundPlayer();

  // 10. 導航列滾動吸附效果
  window.addEventListener("scroll", () => {
    const header = document.querySelector(".site-header");
    if (window.scrollY > 50) {
      header.style.background = "rgba(14, 10, 7, 0.95)";
      header.style.boxShadow = "0 10px 30px rgba(0, 0, 0, 0.7)";
    } else {
      header.style.background = "rgba(18, 13, 9, 0.88)";
      header.style.boxShadow = "none";
    }
  });
});

// ================= 尊榮茶包線上販賣、規格選擇與購物車邏輯 =================
// 儲存每款茶當前選定的規格 ID 與購買數量
const activeTeaSelections = {};

function initTeaProducts(data) {
  const container = document.getElementById("teaGrid");
  if (!container) return;

  const teaProducts = data.teaProducts || DEFAULT_COFFEE_DATA.teaProducts || [];

  container.innerHTML = teaProducts.map(tea => {
    // 預設選中第一個規格
    if (!activeTeaSelections[tea.id]) {
      activeTeaSelections[tea.id] = {
        specId: tea.specs[0].id,
        qty: 1
      };
    }

    const currentSelection = activeTeaSelections[tea.id];
    const currentSpec = tea.specs.find(s => s.id === currentSelection.specId) || tea.specs[0];

    const notesHtml = (tea.notes || []).map(n => `<span class="menu-card-tag">${n}</span>`).join("");

    const specsHtml = tea.specs.map(spec => {
      const isActive = spec.id === currentSelection.specId ? "active" : "";
      return `
        <button type="button" class="spec-pill-btn ${isActive}" onclick="selectTeaSpec('${tea.id}', '${spec.id}')">
          <div>
            <div>${spec.name}</div>
            <div style="font-size: 0.72rem; color: var(--text-muted);">${spec.desc || ''}</div>
          </div>
          <div class="spec-pill-price">NT$ ${Number(spec.price).toLocaleString()}</div>
        </button>
      `;
    }).join("");

    return `
      <div class="tea-card" id="teaCard_${tea.id}">
        <div class="tea-card-img-wrap">
          <img src="${tea.image}" alt="${tea.name}" class="tea-card-img" loading="lazy">
          <div class="craft-tag-badge" style="background: rgba(18, 13, 9, 0.9); border-color: var(--gold-primary);">
            ${tea.badge || '莊園名茶'}
          </div>
        </div>

        <div class="tea-card-body">
          <div class="tea-card-header">
            <div class="tea-card-en">${tea.enName || ''}</div>
            <h3 class="tea-card-title">${tea.name}</h3>
          </div>

          <p class="tea-card-desc">${tea.desc}</p>
          <div class="menu-card-tags" style="margin-bottom: 16px;">${notesHtml}</div>

          <!-- 規格選擇器 -->
          <div class="tea-spec-section">
            <div class="tea-spec-label">
              <span>❖ 請選擇典藏禮遇規格</span>
              <span id="teaCurrentPrice_${tea.id}" style="color: var(--gold-light); font-weight: 700; font-family: var(--font-display-en);">
                NT$ ${Number(currentSpec.price).toLocaleString()}
              </span>
            </div>
            <div class="spec-pills-list" id="teaSpecList_${tea.id}">
              ${specsHtml}
            </div>
          </div>

          <!-- 數量增減與加入購物車按鈕 -->
          <div class="tea-action-bar">
            <div class="qty-stepper">
              <button type="button" class="qty-btn" onclick="changeTeaCardQty('${tea.id}', -1)">−</button>
              <span class="qty-val" id="teaQtyVal_${tea.id}">${currentSelection.qty}</span>
              <button type="button" class="qty-btn" onclick="changeTeaCardQty('${tea.id}', 1)">+</button>
            </div>
            <button type="button" class="btn-add-cart" onclick="addTeaToCartAction('${tea.id}')">
              <span>🛍</span>
              <span>加入典藏購物袋</span>
            </button>
          </div>
        </div>
      </div>
    `;
  }).join("");
}

// 切換特定茶品的規格
window.selectTeaSpec = function(teaId, specId) {
  const data = StorageManager.loadData();
  const tea = (data.teaProducts || []).find(t => t.id === teaId);
  if (!tea) return;

  if (!activeTeaSelections[teaId]) {
    activeTeaSelections[teaId] = { specId, qty: 1 };
  } else {
    activeTeaSelections[teaId].specId = specId;
  }

  const spec = tea.specs.find(s => s.id === specId);
  if (!spec) return;

  // 更新價格顯示
  const priceDisplay = document.getElementById(`teaCurrentPrice_${teaId}`);
  if (priceDisplay) {
    priceDisplay.textContent = `NT$ ${Number(spec.price).toLocaleString()}`;
  }

  // 更新按鈕 active 樣式
  const specList = document.getElementById(`teaSpecList_${teaId}`);
  if (specList) {
    const buttons = specList.querySelectorAll(".spec-pill-btn");
    buttons.forEach((btn, idx) => {
      if (tea.specs[idx].id === specId) {
        btn.classList.add("active");
      } else {
        btn.classList.remove("active");
      }
    });
  }
};

// 增減特定茶品的選購數量
window.changeTeaCardQty = function(teaId, delta) {
  if (!activeTeaSelections[teaId]) {
    activeTeaSelections[teaId] = { specId: "spec-1-1", qty: 1 };
  }
  let currentQty = activeTeaSelections[teaId].qty + delta;
  if (currentQty < 1) currentQty = 1;
  if (currentQty > 99) currentQty = 99;
  activeTeaSelections[teaId].qty = currentQty;

  const qtyDisplay = document.getElementById(`teaQtyVal_${teaId}`);
  if (qtyDisplay) {
    qtyDisplay.textContent = currentQty;
  }
};

// 點擊「加入典藏購物袋」
window.addTeaToCartAction = function(teaId) {
  const data = StorageManager.loadData();
  const tea = (data.teaProducts || []).find(t => t.id === teaId);
  if (!tea) return;

  const selection = activeTeaSelections[teaId] || { specId: tea.specs[0].id, qty: 1 };
  const spec = tea.specs.find(s => s.id === selection.specId) || tea.specs[0];
  const qty = selection.qty || 1;

  StorageManager.addToCart(tea, spec, qty);
  showToast(`❖ 已將【${tea.name} - ${spec.name}】× ${qty} 加入典藏購物袋！`);
  openCartDrawer();
};

// 更新導航列購物袋數量徽章
function updateCartBadge() {
  const cart = StorageManager.getCart();
  const totalCount = cart.reduce((sum, item) => sum + item.qty, 0);
  const badge = document.getElementById("cartCountBadge");
  if (badge) {
    badge.textContent = totalCount;
    badge.style.display = totalCount > 0 ? "inline-flex" : "none";
  }
}

// 購物袋抽屜開關事件設定
function setupCartDrawerEvents() {
  const drawerOverlay = document.getElementById("cartDrawerOverlay");
  const cartBtn = document.getElementById("navCartBtn");
  const closeBtn = document.getElementById("cartDrawerCloseBtn");

  if (cartBtn) {
    cartBtn.addEventListener("click", () => {
      openCartDrawer();
    });
  }

  if (closeBtn) {
    closeBtn.addEventListener("click", () => {
      closeCartDrawer();
    });
  }

  if (drawerOverlay) {
    drawerOverlay.addEventListener("click", (e) => {
      if (e.target === drawerOverlay) {
        closeCartDrawer();
      }
    });
  }
}

window.openCartDrawer = function() {
  const overlay = document.getElementById("cartDrawerOverlay");
  if (!overlay) return;
  renderCartDrawer();
  overlay.classList.add("active");
};

window.closeCartDrawer = function() {
  const overlay = document.getElementById("cartDrawerOverlay");
  if (overlay) overlay.classList.remove("active");
};

// 渲染購物袋內容
function renderCartDrawer() {
  const listContainer = document.getElementById("cartItemsList");
  const subtotalDisplay = document.getElementById("cartSubtotalAmount");
  const totalDisplay = document.getElementById("cartTotalAmount");
  const checkoutBtn = document.getElementById("proceedToCheckoutBtn");
  if (!listContainer) return;

  const cart = StorageManager.getCart();

  if (cart.length === 0) {
    listContainer.innerHTML = `
      <div style="text-align: center; padding: 60px 20px; color: var(--text-secondary);">
        <div style="font-size: 2.4rem; color: var(--gold-primary); margin-bottom: 12px;">🛍</div>
        <p style="font-size: 1.05rem; color: var(--text-primary); margin-bottom: 8px;">典藏購物袋目前尚無商品</p>
        <p style="font-size: 0.85rem; color: var(--text-muted); line-height: 1.7; margin-bottom: 24px;">
          請挑選傳承古樹名茶包或頂級禮盒，由專屬管家為您安排精緻包裝。
        </p>
        <button class="btn-luxury btn-outline-gold" onclick="closeCartDrawer(); document.getElementById('teaSection').scrollIntoView({behavior:'smooth'})">
          瀏覽莊園名茶
        </button>
      </div>
    `;
    if (subtotalDisplay) subtotalDisplay.textContent = "NT$ 0";
    if (totalDisplay) totalDisplay.textContent = "NT$ 0";
    if (checkoutBtn) {
      checkoutBtn.disabled = true;
      checkoutBtn.style.opacity = "0.5";
      checkoutBtn.style.cursor = "not-allowed";
    }
    return;
  }

  if (checkoutBtn) {
    checkoutBtn.disabled = false;
    checkoutBtn.style.opacity = "1";
    checkoutBtn.style.cursor = "pointer";
  }

  let totalAmount = 0;

  listContainer.innerHTML = cart.map(item => {
    const itemSubtotal = item.price * item.qty;
    totalAmount += itemSubtotal;

    return `
      <div class="cart-item-card">
        <img src="${item.image}" alt="${item.productName}" class="cart-item-thumb">
        <div class="cart-item-info">
          <div class="cart-item-title">${item.productName}</div>
          <div class="cart-item-spec">${item.specName}</div>
          <div class="cart-item-price-bar">
            <div class="cart-item-price">NT$ ${Number(item.price).toLocaleString()}</div>
            <div style="display: flex; align-items: center; gap: 10px;">
              <div class="qty-stepper" style="transform: scale(0.85); transform-origin: right center;">
                <button type="button" class="qty-btn" onclick="updateCartItemQtyAction('${item.cartItemId}', -1)">−</button>
                <span class="qty-val">${item.qty}</span>
                <button type="button" class="qty-btn" onclick="updateCartItemQtyAction('${item.cartItemId}', 1)">+</button>
              </div>
              <span class="cart-item-remove-btn" onclick="removeCartItemAction('${item.cartItemId}')">✕</span>
            </div>
          </div>
        </div>
      </div>
    `;
  }).join("");

  if (subtotalDisplay) subtotalDisplay.textContent = `NT$ ${totalAmount.toLocaleString()}`;
  if (totalDisplay) totalDisplay.textContent = `NT$ ${totalAmount.toLocaleString()}`;
}

window.updateCartItemQtyAction = function(cartItemId, delta) {
  StorageManager.updateCartQty(cartItemId, delta);
};

window.removeCartItemAction = function(cartItemId) {
  StorageManager.removeFromCart(cartItemId);
  showToast("已從典藏購物袋移除商品。");
};

// ================= 試跑結帳流程 (Checkout Simulation) =================
function setupCheckoutEvents() {
  const checkoutForm = document.getElementById("checkoutForm");
  if (checkoutForm) {
    checkoutForm.addEventListener("submit", handleCheckoutSubmission);
  }
}

window.openCheckoutModal = function() {
  const cart = StorageManager.getCart();
  if (cart.length === 0) {
    showToast("購物袋內尚無商品，無法進行結帳。");
    return;
  }

  closeCartDrawer();
  const modal = document.getElementById("checkoutModal");
  if (!modal) return;

  // 重置回表單填寫頁
  document.getElementById("checkoutFormView").style.display = "block";
  document.getElementById("checkoutSuccessView").style.display = "none";

  // 渲染訂單商品明細摘要
  const reviewContainer = document.getElementById("checkoutOrderReviewItems");
  const checkoutTotalDisplay = document.getElementById("checkoutTotalDisplay");

  let total = 0;
  reviewContainer.innerHTML = cart.map(item => {
    const itemSub = item.price * item.qty;
    total += itemSub;
    return `
      <div style="display: flex; justify-content: space-between; align-items: center; padding: 10px 0; border-bottom: 1px dashed rgba(197, 160, 89, 0.15); font-size: 0.88rem;">
        <div>
          <div style="color: var(--text-primary); font-weight: 600;">${item.productName}</div>
          <div style="color: var(--gold-primary); font-size: 0.78rem;">${item.specName} × ${item.qty}</div>
        </div>
        <div style="font-family: var(--font-display-en); color: var(--gold-light);">
          NT$ ${itemSub.toLocaleString()}
        </div>
      </div>
    `;
  }).join("");

  if (checkoutTotalDisplay) {
    checkoutTotalDisplay.textContent = `NT$ ${total.toLocaleString()}`;
  }

  modal.classList.add("active");
};

window.closeCheckoutModal = function() {
  const modal = document.getElementById("checkoutModal");
  if (modal) modal.classList.remove("active");
};

// 處理結帳送出與憑證產生
function handleCheckoutSubmission(e) {
  e.preventDefault();

  const cart = StorageManager.getCart();
  if (cart.length === 0) return;

  const totalAmount = cart.reduce((sum, i) => sum + i.price * i.qty, 0);

  const orderData = {
    customerName: document.getElementById("chkName").value.trim(),
    phone: document.getElementById("chkPhone").value.trim(),
    email: document.getElementById("chkEmail").value.trim(),
    address: document.getElementById("chkAddress").value.trim(),
    deliverySlot: document.getElementById("chkDeliverySlot").value,
    paymentMethod: document.querySelector('input[name="paymentMethod"]:checked').value,
    giftWrap: document.getElementById("chkGiftWrap").checked,
    notes: document.getElementById("chkNotes").value.trim(),
    items: cart.map(item => ({
      productId: item.productId,
      productName: item.productName,
      specName: item.specName,
      price: item.price,
      qty: item.qty
    })),
    totalAmount: totalAmount,
    status: "待出貨 (Processing)"
  };

  // 儲存至 LocalStorage 訂單資料庫
  const savedOrder = StorageManager.addOrder(orderData);

  // 切換至尊榮收據憑證頁面
  document.getElementById("checkoutFormView").style.display = "none";
  const successView = document.getElementById("checkoutSuccessView");
  successView.style.display = "block";

  document.getElementById("receiptOrderId").textContent = savedOrder.id;
  document.getElementById("receiptCustomerName").textContent = savedOrder.customerName;
  document.getElementById("receiptPaymentMethod").textContent = savedOrder.paymentMethod;
  document.getElementById("receiptTotalAmount").textContent = `NT$ ${savedOrder.totalAmount.toLocaleString()}`;
  document.getElementById("receiptAddress").textContent = savedOrder.address;

  showToast(`❖ 訂單試跑結帳成功！單號：${savedOrder.id}，專屬管家已開始安排配茶禮盒。`);
}

// 商品詳情彈窗開啟
window.openProductModal = function(itemId) {
  const data = StorageManager.loadData();
  const item = (data.menuItems || []).find(i => i.id === itemId);
  if (!item) return;

  const modal = document.getElementById("productModal");
  const modalContent = document.getElementById("productModalBody");
  if (!modal || !modalContent) return;

  const notesHtml = (item.notes || []).map(n => `<span class="menu-card-tag" style="font-size: 0.85rem; padding: 4px 10px;">${n}</span>`).join("");

  modalContent.innerHTML = `
    <div style="display: grid; grid-template-columns: 1fr 1.2fr; gap: 32px; align-items: start;">
      <div style="border: 1px solid var(--border-gold); padding: 8px; background: rgba(0,0,0,0.3);">
        <img src="${item.image}" alt="${item.name}" style="width: 100%; height: 380px; object-fit: cover;">
      </div>
      <div>
        ${item.badge ? `<div class="menu-card-badge" style="margin-bottom: 8px;">${item.badge}</div>` : ''}
        <div style="font-family: var(--font-display-en); font-size: 0.85rem; color: var(--gold-primary); letter-spacing: 0.1em; margin-bottom: 4px;">${item.enName || ''}</div>
        <h2 style="font-size: 1.8rem; margin-bottom: 12px; color: var(--text-primary);">${item.name}</h2>
        <div style="font-family: var(--font-display-en); font-size: 1.8rem; font-weight: 700; color: var(--gold-light); margin-bottom: 20px;">
          NT$ ${Number(item.price).toLocaleString()}
        </div>
        
        <p style="font-size: 0.96rem; color: var(--text-secondary); line-height: 1.9; margin-bottom: 24px; text-align: justify;">
          ${item.desc}
        </p>

        <div style="background: rgba(30, 20, 14, 0.6); border-left: 3px solid var(--gold-primary); padding: 14px 18px; margin-bottom: 20px; font-size: 0.88rem;">
          <div style="color: var(--gold-light); margin-bottom: 4px;">❖ 風土產區與處理法</div>
          <div style="color: var(--text-primary);">${item.origin || '微批次莊園直供'} ｜ ${item.process || '經典工藝熟成'}</div>
        </div>

        <div style="margin-bottom: 28px;">
          <div style="font-size: 0.82rem; color: var(--gold-primary); margin-bottom: 8px; letter-spacing: 0.08em;">風味品鑑筆記 (Tasting Notes)</div>
          <div style="display: flex; gap: 8px; flex-wrap: wrap;">${notesHtml}</div>
        </div>

        <div style="display: flex; gap: 14px;">
          <button class="btn-luxury btn-primary-gold" onclick="closeProductModal(); prefillReservation('${item.name}')" style="flex: 1;">
            立即預約此款席位
          </button>
        </div>
      </div>
    </div>
  `;

  modal.classList.add("active");
};

// 關閉商品詳情彈窗
window.closeProductModal = function() {
  const modal = document.getElementById("productModal");
  if (modal) modal.classList.remove("active");
};

// 點擊預訂跳轉並帶入備註
window.prefillReservation = function(itemName) {
  const notesField = document.getElementById("resNotes");
  if (notesField) {
    notesField.value = `希望優先預訂品鑑專屬品項：【${itemName}】`;
  }
  const reservationSection = document.getElementById("reservation");
  if (reservationSection) {
    reservationSection.scrollIntoView({ behavior: "smooth" });
  }
};

// 提示訊息通知 (Toast)
window.showToast = function(msg) {
  let toast = document.getElementById("toastNotice");
  if (!toast) {
    toast = document.createElement("div");
    toast.id = "toastNotice";
    toast.className = "toast-notice";
    document.body.appendChild(toast);
  }
  toast.innerHTML = `<span>❖</span><span>${msg}</span>`;
  toast.classList.add("show");
  setTimeout(() => {
    toast.classList.remove("show");
  }, 4000);
};

// 放鬆黑膠 / 暖爵士音效合成器 (Web Audio API)
let audioCtx = null;
let isPlayingAmbient = false;
let ambientInterval = null;

function initAmbientSoundPlayer() {
  const soundBtn = document.getElementById("ambientSoundBtn");
  if (!soundBtn) return;

  soundBtn.addEventListener("click", () => {
    if (!isPlayingAmbient) {
      startAmbientAudio();
      soundBtn.classList.add("playing");
      soundBtn.querySelector(".sound-text").textContent = "沉浸氛圍中";
      showToast("❖ 已啟動私人會所放鬆音樂與暖黑膠聲景");
    } else {
      stopAmbientAudio();
      soundBtn.classList.remove("playing");
      soundBtn.querySelector(".sound-text").textContent = "放鬆黑膠氛圍";
      showToast("已靜音音樂氛圍");
    }
  });
}

function startAmbientAudio() {
  try {
    const AudioContext = window.AudioContext || window.webkitAudioContext;
    if (!audioCtx) audioCtx = new AudioContext();
    if (audioCtx.state === 'suspended') audioCtx.resume();

    isPlayingAmbient = true;

    // 建立微弱粉紅噪音模擬黑膠唱片溫潤微粒沙沙聲 (Vinyl crackle)
    const bufferSize = audioCtx.sampleRate * 2;
    const noiseBuffer = audioCtx.createBuffer(1, bufferSize, audioCtx.sampleRate);
    const output = noiseBuffer.getChannelData(0);
    let b0 = 0, b1 = 0, b2 = 0;
    for (let i = 0; i < bufferSize; i++) {
      const white = Math.random() * 2 - 1;
      b0 = 0.99886 * b0 + white * 0.0555179;
      b1 = 0.99332 * b1 + white * 0.0750759;
      b2 = 0.96900 * b2 + white * 0.1538520;
      output[i] = (b0 + b1 + b2) * 0.007; // 極低音量背景溫柔沙沙聲
    }

    const whiteNoise = audioCtx.createBufferSource();
    whiteNoise.buffer = noiseBuffer;
    whiteNoise.loop = true;

    const noiseFilter = audioCtx.createBiquadFilter();
    noiseFilter.type = 'lowpass';
    noiseFilter.frequency.value = 1000;

    const noiseGain = audioCtx.createGain();
    noiseGain.gain.value = 0.12;

    whiteNoise.connect(noiseFilter);
    noiseFilter.connect(noiseGain);
    noiseGain.connect(audioCtx.destination);
    whiteNoise.start(0);

    window._ambientNoiseSource = whiteNoise;

    // 爵士和弦音符（低音溫暖電鋼琴 Rhodes 風格撥奏）
    // DbMaj9 / Fm7 / Bbm9 / AbMaj7
    const chords = [
      [138.59, 174.61, 207.65, 261.63, 311.13], // DbMaj9
      [174.61, 207.65, 261.63, 311.13, 392.00], // Fm9
      [116.54, 174.61, 207.65, 277.18, 349.23], // Bbm9
      [103.83, 164.81, 207.65, 261.63, 329.63]  // AbMaj7
    ];

    let chordIdx = 0;
    function playChord() {
      if (!isPlayingAmbient || !audioCtx) return;
      const notes = chords[chordIdx % chords.length];
      chordIdx++;

      notes.forEach((freq, i) => {
        const osc = audioCtx.createOscillator();
        const gain = audioCtx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, audioCtx.currentTime + i * 0.08);

        gain.gain.setValueAtTime(0, audioCtx.currentTime + i * 0.08);
        gain.gain.linearRampToValueAtTime(0.025, audioCtx.currentTime + i * 0.08 + 0.3);
        gain.gain.exponentialRampToValueAtTime(0.0001, audioCtx.currentTime + i * 0.08 + 4.2);

        osc.connect(gain);
        gain.connect(audioCtx.destination);

        osc.start(audioCtx.currentTime + i * 0.08);
        osc.stop(audioCtx.currentTime + i * 0.08 + 4.5);
      });
    }

    playChord();
    ambientInterval = setInterval(playChord, 5000);
  } catch (e) {
    console.warn("無法啟動 AudioContext", e);
  }
}

function stopAmbientAudio() {
  isPlayingAmbient = false;
  if (ambientInterval) clearInterval(ambientInterval);
  if (window._ambientNoiseSource) {
    try { window._ambientNoiseSource.stop(); } catch(e) {}
  }
}
