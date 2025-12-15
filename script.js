// 应用状态管理
const app = {
    // 购物车数据
    cart: [],
    
    // 用户订单数据
    userOrders: [],
    
    // 商品数据（添加图片、备注字段和口味选择）
    products: [
        { id: 1, name: '贝果', description: '圆环形面包，口感Q弹，有嚼劲', price: 5, emoji: '🥯', category: 'classic', stock: 30, 
          image: 'https://imgs.699pic.com/images/600/383/566.jpg!list1x.v2',
          notes: '经典原味，可搭配奶油奶酪或果酱',
          flavors: [
            { id: 1, name: '原味贝果', price: 5, description: '经典原味，麦香浓郁' },
            { id: 2, name: '全麦贝果', price: 6, description: '健康全麦，低糖低脂' },
            { id: 3, name: '芝麻贝果', price: 6, description: '香脆芝麻，口感丰富' }
          ] },
        { id: 2, name: '吐司', description: '柔软细腻，适合三明治，早餐首选', price: 10, emoji: '🍞', category: 'classic', stock: 10,
          image: 'https://images.unsplash.com/photo-1533089860892-a7c6f0a88666?w=400&h=300&fit=crop&crop=center',
          notes: '厚切吐司，烘焙温度精准控制',
          flavors: [
            { id: 1, name: '白吐司', price: 10, description: '经典白吐司，柔软细腻' },
            { id: 2, name: '全麦吐司', price: 12, description: '健康全麦，营养丰富' },
            { id: 3, name: '牛奶吐司', price: 12, description: '奶香浓郁，口感绵软' }
          ] },
        { id: 3, name: '小圆面包', description: '小巧可爱，松软香甜，适合小朋友', price: 5, emoji: '🥯', category: 'classic', stock: 20,
          image: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?w=400&h=300&fit=crop&crop=center',
          notes: '迷你尺寸，适合儿童下午茶',
          flavors: [
            { id: 1, name: '原味小圆包', price: 5, description: '经典原味，松软香甜' },
            { id: 2, name: '巧克力小圆包', price: 6, description: '巧克力风味，甜而不腻' },
            { id: 3, name: '葡萄干小圆包', price: 6, description: '葡萄干点缀，口感丰富' }
          ] },
        { id: 4, name: '彩色面包', description: '天然色素制作，色彩缤纷，颜值满分', price: 6, emoji: '🌈', category: 'creative', stock: 15,
          image: 'https://images.unsplash.com/photo-1528736235302-52922df5c122?w=400&h=300&fit=crop&crop=center',
          notes: '使用果蔬粉调色，健康安全',
          flavors: [
            { id: 1, name: '彩虹面包', price: 6, description: '七彩彩虹，颜值超高' },
            { id: 2, name: '抹茶面包', price: 7, description: '抹茶风味，清新健康' },
            { id: 3, name: '紫薯面包', price: 7, description: '紫薯天然，营养丰富' }
          ] },
        { id: 5, name: '法棍', description: '传统法式长棍，外脆内软，经典百搭', price: 8, emoji: '🥖', category: 'french', stock: 7,
          image: 'https://images.unsplash.com/photo-1549931319-a545dcf3bc73?w=400&h=300&fit=crop&crop=center',
          notes: '传统法式工艺，外皮酥脆',
          flavors: [
            { id: 1, name: '经典法棍', price: 8, description: '传统工艺，外脆内软' },
            { id: 2, name: '蒜香法棍', price: 10, description: '蒜香浓郁，风味独特' },
            { id: 3, name: '芝士法棍', price: 10, description: '芝士点缀，奶香十足' }
          ] },
        { id: 6, name: '牛角包', description: '层次分明，黄油香气，酥脆可口', price: 6, emoji: '🥐', category: 'french', stock: 15,
          image: 'https://img.shetu66.com/2022/12/18/1671372671379175.jpg',
          notes: '使用进口黄油，香气浓郁',
          flavors: [
            { id: 1, name: '原味牛角包', price: 6, description: '经典原味，黄油香气' },
            { id: 2, name: '杏仁牛角包', price: 8, description: '杏仁片装饰，口感丰富' },
            { id: 3, name: '巧克力牛角包', price: 8, description: '巧克力馅料，甜香可口' }
          ] }
    ],

    // 初始化应用
    init() {
        this.loadProductsFromStorage();
        this.renderProducts();
        this.loadCartFromStorage();
        this.loadOrdersFromStorage();
    },

    // 渲染商品列表
    renderProducts() {
        const productGrid = document.getElementById('productGrid');
        if (!productGrid) return;
        
        productGrid.innerHTML = '';

        this.products.forEach(product => {
            const productCard = document.createElement('div');
            productCard.className = 'product-card';
            
            // 生成口味选项HTML
            const flavorsHTML = product.flavors ? product.flavors.map((flavor, index) => `
                <div class="flavor-option ${index === 0 ? 'selected' : ''}" 
                     data-product-id="${product.id}" 
                     data-flavor-id="${flavor.id}"
                     onclick="app.selectFlavor(${product.id}, ${flavor.id})">
                    ${flavor.name}
                    <div class="flavor-price">¥${flavor.price}</div>
                </div>
            `).join('') : '';
            
            productCard.innerHTML = `
                <div class="product-image-container">
                    <img src="${product.image}" alt="${product.name}" class="product-image" onerror="this.onerror=null; this.src='data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjMwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iNDAwIiBoZWlnaHQ9IjMwMCIgZmlsbD0iI2Y4ZjlmYSIvPjx0ZXh0IHg9IjIwMCIgeT0iMTUwIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBmb250LWZhbWlseT0iQXJpYWwiIGZvbnQtc2l6ZT0iMTgiIGZpbGw9IiM5OTk5OTkiPiTmsqHmnInluIPku7Y8L3RleHQ+PC9zdmc+';">
                    <div class="product-badge">${product.emoji}</div>
                    <div class="product-stock">库存: ${product.stock}</div>
                </div>
                <div class="product-info">
                    <h3 class="product-name">
                        <span>${product.emoji}</span>
                        ${product.name}
                    </h3>
                    <p class="product-description">${product.description}</p>
                    <div class="product-notes">${product.notes}</div>
                    ${product.flavors ? `
                        <div class="flavor-selector">
                            <label class="flavor-label">选择口味：</label>
                            <div class="flavor-options">
                                ${flavorsHTML}
                            </div>
                        </div>
                    ` : ''}
                    <div class="product-footer">
                        <div class="product-price" id="price-${product.id}">¥${product.price}</div>
                        <button class="add-to-cart" onclick="app.addToCart(${product.id})" ${product.stock === 0 ? 'disabled' : ''}>
                            ${product.stock === 0 ? '已售罄' : '加入购物车'}
                        </button>
                    </div>
                </div>
            `;
            productGrid.appendChild(productCard);
        });
    },

    // 切换到用户端
    switchMode(mode) {
        const userMode = document.getElementById('userMode');
        const merchantMode = document.getElementById('merchantMode');
        const userBtns = document.querySelectorAll('.mode-btn');

        if (mode === 'user') {
            userMode.style.display = 'block';
            merchantMode.style.display = 'none';
            userBtns[0].classList.add('active');
            userBtns[1].classList.remove('active');
            
            // 用户端：激活第一个导航项（商品列表）
            const userNavItems = userMode.querySelectorAll('.nav-item');
            const userPages = userMode.querySelectorAll('.page');
            userNavItems.forEach(item => item.classList.remove('active'));
            userPages.forEach(page => page.classList.remove('active'));
            
            if (userNavItems.length > 0) {
                userNavItems[0].classList.add('active');
            }
            if (userPages.length > 0) {
                userPages[0].classList.add('active');
            }
        } else {
            userMode.style.display = 'none';
            merchantMode.style.display = 'block';
            userBtns[0].classList.remove('active');
            userBtns[1].classList.add('active');
            
            // 商家端：激活第一个导航项（数据统计）
            const merchantNavItems = merchantMode.querySelectorAll('.nav-item');
            const merchantPages = merchantMode.querySelectorAll('.page');
            merchantNavItems.forEach(item => item.classList.remove('active'));
            merchantPages.forEach(page => page.classList.remove('active'));
            
            if (merchantNavItems.length > 0) {
                merchantNavItems[0].classList.add('active');
            }
            if (merchantPages.length > 0) {
                merchantPages[0].classList.add('active');
            }
            
            // 切换到商家端时初始化商家数据
            this.initMerchantData();
        }
    },

    // 显示页面
    showPage(page) {
        const pages = document.querySelectorAll('.page');
        const navItems = document.querySelectorAll('.nav-item');

        pages.forEach(p => p.classList.remove('active'));
        navItems.forEach(item => item.classList.remove('active'));

        document.getElementById(page + 'Page').classList.add('active');
        event.target.classList.add('active');

        // 根据页面类型渲染相应内容
        if (page === 'cart') {
            this.renderCart();
        } else if (page === 'orders') {
            this.renderUserOrders();
        }
    },

    // 选择口味
    selectFlavor(productId, flavorId) {
        const product = this.products.find(p => p.id === productId);
        if (!product || !product.flavors) return;

        // 移除所有口味选项的选中状态
        const flavorOptions = document.querySelectorAll(`.flavor-option[data-product-id="${productId}"]`);
        flavorOptions.forEach(option => option.classList.remove('selected'));

        // 添加选中状态到当前选项
        const selectedOption = document.querySelector(`.flavor-option[data-product-id="${productId}"][data-flavor-id="${flavorId}"]`);
        if (selectedOption) {
            selectedOption.classList.add('selected');
        }

        // 更新价格显示
        const selectedFlavor = product.flavors.find(f => f.id === flavorId);
        if (selectedFlavor) {
            const priceElement = document.getElementById(`price-${productId}`);
            if (priceElement) {
                priceElement.textContent = `¥${selectedFlavor.price}`;
            }
        }
    },

    // 获取当前选中的口味
    getSelectedFlavor(productId) {
        const product = this.products.find(p => p.id === productId);
        if (!product || !product.flavors) return null;

        const selectedOption = document.querySelector(`.flavor-option.selected[data-product-id="${productId}"]`);
        if (!selectedOption) return product.flavors[0]; // 默认第一个口味

        const flavorId = parseInt(selectedOption.getAttribute('data-flavor-id'));
        return product.flavors.find(f => f.id === flavorId) || product.flavors[0];
    },

    // 添加到购物车
    addToCart(productId) {
        const product = this.products.find(p => p.id === productId);
        if (product && product.stock > 0) {
            const selectedFlavor = this.getSelectedFlavor(productId);
            const flavorName = selectedFlavor ? selectedFlavor.name : product.name;
            const price = selectedFlavor ? selectedFlavor.price : product.price;
            
            // 查找购物车中是否已有相同商品和口味
            const existingItem = this.cart.find(item => 
                item.productId === productId && 
                item.flavorId === (selectedFlavor ? selectedFlavor.id : null)
            );
            
            // 检查库存是否足够
            const currentQuantity = existingItem ? existingItem.quantity + 1 : 1;
            if (product.stock < currentQuantity) {
                alert(`商品 ${product.name} 库存不足！当前库存：${product.stock}`);
                return;
            }
            
            if (existingItem) {
                // 如果已存在，增加数量
                existingItem.quantity += 1;
            } else {
                // 如果不存在，添加新商品
                this.cart.push({
                    id: Date.now(),
                    productId: productId,
                    flavorId: selectedFlavor ? selectedFlavor.id : null,
                    productName: product.name,
                    flavorName: flavorName,
                    price: price,
                    quantity: 1,
                    image: product.image,
                    emoji: product.emoji
                });
            }
            
            alert(`已添加 ${flavorName} 到购物车！价格：¥${price}`);
            this.updateCartDisplay();
            this.saveCartToStorage();
        }
    },

    // 提交订单（已更新，包含备注功能）
    submitOrder() {
        const name = document.getElementById('profileName')?.value;
        const phone = document.getElementById('profilePhone')?.value;
        const address = document.getElementById('profileAddress')?.value;
        const notes = document.getElementById('orderNotes')?.value; // 获取备注内容

        if (!name || !phone || !address) {
            alert('请填写完整的收货信息！');
            return;
        }

        if (this.cart.length === 0) {
            alert('购物车为空，请先添加商品！');
            return;
        }

        // 检查库存是否足够
        for (const item of this.cart) {
            const product = this.products.find(p => p.id === item.productId);
            if (!product || product.stock < item.quantity) {
                alert(`商品 ${item.productName} 库存不足！当前库存：${product ? product.stock : 0}`);
                return;
            }
        }

        // 减少商品库存
        for (const item of this.cart) {
            const product = this.products.find(p => p.id === item.productId);
            if (product) {
                product.stock -= item.quantity;
            }
        }

        // 创建新订单，包含备注信息
        const order = {
            id: Date.now(),
            customer: name,
            phone: phone,
            address: address,
            notes: notes, // 保存备注信息
            items: [...this.cart],
            total: this.calculateCartTotal(),
            status: 'pending',
            time: new Date().toLocaleString('zh-CN')
        };

        this.userOrders.unshift(order);
        this.cart = [];
        this.updateCartDisplay();
        this.saveCartToStorage();
        this.saveOrdersToStorage();
        this.saveProductsToStorage(); // 保存更新后的库存数据

        // 重新渲染商品列表和库存表格
        this.renderProducts();
        this.renderInventoryTable();

        // 清空备注框
        const notesTextarea = document.getElementById('orderNotes');
        if (notesTextarea) notesTextarea.value = '';

        alert('订单提交成功！请等待商家联系您。' + (notes ? `\n您的备注：${notes}` : ''));
        
        // 更新商家端数据统计
        this.updateDashboardStats();
    },

    // 购物车相关功能
    updateCartDisplay() {
        const cartCount = document.getElementById('cartCount');
        if (!cartCount) return;
        
        const totalItems = this.cart.reduce((sum, item) => sum + item.quantity, 0);
        cartCount.textContent = totalItems;
    },

    calculateCartTotal() {
        return this.cart.reduce((total, item) => total + (item.price * item.quantity), 0);
    },

    // 渲染购物车
    renderCart() {
        console.log('renderCart called, cart items:', this.cart.length);
        const cartContainer = document.getElementById('cartContainer');
        const cartTotal = document.getElementById('cartTotal');
        const emptyCart = document.getElementById('emptyCart');

        if (this.cart.length === 0) {
            console.log('Cart is empty, showing empty message');
            if (cartContainer) cartContainer.style.display = 'none';
            if (cartTotal) cartTotal.style.display = 'none';
            if (emptyCart) emptyCart.style.display = 'block';
            return;
        }

        console.log('Cart has items, rendering cart');
        if (cartContainer) cartContainer.style.display = 'block';
        if (cartTotal) cartTotal.style.display = 'block';
        if (emptyCart) emptyCart.style.display = 'none';

        if (cartContainer) {
            cartContainer.innerHTML = '';
            this.cart.forEach(item => {
                const cartItem = document.createElement('div');
                cartItem.className = 'cart-item';
                cartItem.innerHTML = `
                    <img src="${item.image}" alt="${item.productName}" class="cart-item-image" onerror="this.style.display='none'">
                    <div class="cart-item-info">
                        <div class="cart-item-name">${item.emoji} ${item.productName}</div>
                        <div class="cart-item-flavor">${item.flavorName}</div>
                        <div class="cart-item-controls">
                            <div class="quantity-control">
                                <button class="quantity-btn" onclick="app.updateQuantity(${item.id}, -1)">-</button>
                                <input type="number" class="quantity-input" value="${item.quantity}" min="1" onchange="app.setQuantity(${item.id}, this.value)">
                                <button class="quantity-btn" onclick="app.updateQuantity(${item.id}, 1)">+</button>
                            </div>
                        </div>
                    </div>
                    <div class="cart-item-price">¥${item.price}</div>
                    <button class="small-btn delete-btn" onclick="app.removeFromCart(${item.id})">删除</button>
                `;
                cartContainer.appendChild(cartItem);
            });
        }

        const totalAmountElement = document.getElementById('totalAmount');
        if (totalAmountElement) {
            totalAmountElement.textContent = this.calculateCartTotal();
        }
    },

    // 更新商品数量
    updateQuantity(itemId, change) {
        const item = this.cart.find(item => item.id === itemId);
        if (item) {
            const newQuantity = item.quantity + change;
            
            // 检查库存是否足够
            const product = this.products.find(p => p.id === item.productId);
            if (product && newQuantity > product.stock) {
                alert(`商品 ${item.productName} 库存不足！当前库存：${product.stock}`);
                return;
            }
            
            item.quantity = newQuantity;
            if (item.quantity <= 0) {
                this.removeFromCart(itemId);
            } else {
                this.updateCartDisplay();
                this.saveCartToStorage();
                this.renderCart();
            }
        }
    },

    // 设置商品数量
    setQuantity(itemId, quantity) {
        const item = this.cart.find(item => item.id === itemId);
        if (item) {
            quantity = parseInt(quantity);
            if (quantity > 0) {
                // 检查库存是否足够
                const product = this.products.find(p => p.id === item.productId);
                if (product && quantity > product.stock) {
                    alert(`商品 ${item.productName} 库存不足！当前库存：${product.stock}`);
                    // 恢复原数量
                    const input = document.querySelector(`input[value="${item.quantity}"]`);
                    if (input) input.value = item.quantity;
                    return;
                }
                
                item.quantity = quantity;
                this.updateCartDisplay();
                this.saveCartToStorage();
                this.renderCart();
            }
        }
    },

    // 从购物车移除商品
    removeFromCart(itemId) {
        this.cart = this.cart.filter(item => item.id !== itemId);
        this.updateCartDisplay();
        this.saveCartToStorage();
        this.renderCart();
    },

    // 渲染用户订单（已更新，显示备注信息）
    renderUserOrders() {
        const ordersContainer = document.getElementById('ordersContainer');
        const emptyOrders = document.getElementById('emptyOrders');

        if (this.userOrders.length === 0) {
            if (ordersContainer) ordersContainer.style.display = 'none';
            if (emptyOrders) emptyOrders.style.display = 'block';
            return;
        }

        if (ordersContainer) {
            ordersContainer.style.display = 'block';
            if (emptyOrders) emptyOrders.style.display = 'none';
            
            ordersContainer.innerHTML = '';
            this.userOrders.forEach(order => {
                const orderItem = document.createElement('div');
                orderItem.className = 'user-order-item';
                
                // 生成订单项目HTML，包含备注信息
                let itemsHTML = '';
                order.items.forEach(item => {
                    itemsHTML += `
                        <div class="user-order-item-detail">
                            <div class="user-order-item-name">${item.emoji} ${item.productName} - ${item.flavorName}</div>
                            <div class="user-order-item-price">¥${item.price} × ${item.quantity}</div>
                        </div>
                    `;
                });
                
                // 如果有备注，显示备注信息
                const notesHTML = order.notes ? `
                    <div style="margin-top: 10px; padding: 10px; background: rgba(255, 107, 107, 0.05); border-radius: 6px; border-left: 3px solid var(--primary-color);">
                        <strong>订单备注：</strong>${order.notes}
                    </div>
                ` : '';

                orderItem.innerHTML = `
                    <div class="user-order-header">
                        <div class="user-order-number">订单号：${order.id}</div>
                        <div class="user-order-status ${order.status}">
                            ${order.status === 'pending' ? '待处理' : 
                              order.status === 'processing' ? '处理中' : 
                              order.status === 'completed' ? '已完成' : '未知状态'}
                        </div>
                    </div>
                    <div class="user-order-items">
                        ${itemsHTML}
                    </div>
                    ${notesHTML}
                    <div class="user-order-footer">
                        <div class="user-order-total">总计：¥${order.total}</div>
                        <div class="user-order-time">下单时间：${order.time}</div>
                    </div>
                `;
                ordersContainer.appendChild(orderItem);
            });
        }
    },

    // 商家端功能（保持不变）
    showMerchantPage(page, event) {
        const pages = document.querySelectorAll('.page');
        const navItems = document.querySelectorAll('.nav-item');

        pages.forEach(p => p.classList.remove('active'));
        navItems.forEach(item => item.classList.remove('active'));

        // 处理订单管理页面的特殊ID
        const pageId = page === 'orders' ? 'merchantOrdersPage' : page + 'Page';
        const targetPage = document.getElementById(pageId);
        if (targetPage) targetPage.classList.add('active');
        
        if (event && event.target) event.target.classList.add('active');

        if (page === 'orders') {
            this.renderMerchantOrders();
        } else if (page === 'inventory') {
            this.renderInventoryTable();
        }
    },

    initMerchantData() {
        this.updateDashboardStats();
        this.renderInventoryTable();
        this.renderMerchantOrders();
    },

    updateDashboardStats() {
        const todaySalesEl = document.getElementById('todaySales');
        const todayOrdersEl = document.getElementById('todayOrders');
        const totalStockEl = document.getElementById('totalStock');
        const pendingOrdersEl = document.getElementById('pendingOrders');

        const today = new Date().toDateString();
        const todayOrders = this.userOrders.filter(order => 
            new Date(order.time).toDateString() === today
        );
        
        const todaySales = todayOrders.reduce((sum, order) => sum + order.total, 0);
        const totalStock = this.products.reduce((sum, product) => sum + product.stock, 0);
        const pendingOrders = this.userOrders.filter(order => order.status === 'pending').length;

        if (todaySalesEl) todaySalesEl.textContent = `¥${todaySales}`;
        if (todayOrdersEl) todayOrdersEl.textContent = todayOrders.length;
        if (totalStockEl) totalStockEl.textContent = totalStock;
        if (pendingOrdersEl) pendingOrdersEl.textContent = pendingOrders;
    },

    renderInventoryTable() {
        const table = document.getElementById('inventoryTable');
        if (!table) return;
        
        table.innerHTML = '';
        
        this.products.forEach(product => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${product.emoji} ${product.name}</td>
                <td>${product.stock}</td>
                <td>¥${product.price}</td>
                <td>
                    <button class="small-btn" onclick="app.editProduct(${product.id})">编辑</button>
                    <button class="small-btn delete-btn" onclick="app.deleteProduct(${product.id})">删除</button>
                </td>
            `;
            table.appendChild(row);
        });
    },

    renderMerchantOrders() {
        const ordersList = document.getElementById('merchantOrdersList');
        if (!ordersList) return;
        
        ordersList.innerHTML = '';
        
        this.userOrders.forEach(order => {
            const orderItem = document.createElement('div');
            orderItem.className = 'order-item';
            
            let itemsHTML = '';
            order.items.forEach(item => {
                itemsHTML += `${item.emoji} ${item.productName} - ${item.flavorName} × ${item.quantity}<br>`;
            });
            
            // 商家端显示备注信息
            const notesHTML = order.notes ? `
                <div style="margin-top: 5px; font-size: 12px; color: #666;">
                    <strong>备注：</strong>${order.notes}
                </div>
            ` : '';

            orderItem.innerHTML = `
                <div class="order-header">
                    <div>订单号：${order.id}</div>
                    <div class="order-status ${order.status}">
                        ${order.status === 'pending' ? '待处理' : 
                          order.status === 'accepted' ? '已接单' : 
                          order.status === 'delivering' ? '配送中' : 
                          order.status === 'completed' ? '已完成' : '未知状态'}
                    </div>
                </div>
                <div class="order-details">
                    <div><strong>客户：</strong>${order.customer}</div>
                    <div><strong>电话：</strong>${order.phone}</div>
                    <div><strong>地址：</strong>${order.address}</div>
                </div>
                <div style="margin-bottom: 10px;">
                    <strong>商品：</strong><br>${itemsHTML}
                </div>
                ${notesHTML}
                <div class="order-actions">
                    <button class="small-btn" onclick="app.updateOrderStatus(${order.id}, 'accepted')">接单</button>
                    <button class="small-btn" onclick="app.updateOrderStatus(${order.id}, 'delivering')">配送</button>
                    <button class="small-btn" onclick="app.updateOrderStatus(${order.id}, 'completed')">完成</button>
                    <button class="small-btn delete-btn" onclick="app.deleteOrder(${order.id})">删除</button>
                </div>
            `;
            ordersList.appendChild(orderItem);
        });
    },

    updateOrderStatus(orderId, status) {
        const order = this.userOrders.find(order => order.id === orderId);
        if (order) {
            order.status = status;
            this.saveOrdersToStorage();
            this.renderMerchantOrders();
            this.updateDashboardStats();
            
            // 如果用户端当前正在查看订单页面，也更新显示
            const ordersPage = document.getElementById('ordersPage');
            if (ordersPage && ordersPage.classList.contains('active')) {
                this.renderUserOrders();
            }
        }
    },

    deleteOrder(orderId) {
        if (confirm('确定要删除这个订单吗？')) {
            this.userOrders = this.userOrders.filter(order => order.id !== orderId);
            this.saveOrdersToStorage();
            this.renderMerchantOrders();
            this.updateDashboardStats();
        }
    },

    addNewProduct() {
        const modal = document.createElement('div');
        modal.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0,0,0,0.5);
            display: flex;
            align-items: center;
            justify-content: center;
            z-index: 1000;
        `;
        
        modal.innerHTML = `
            <div style="background: white; padding: 30px; border-radius: 12px; width: 90%; max-width: 500px; box-shadow: 0 10px 30px rgba(0,0,0,0.3);">
                <h3 style="margin-bottom: 20px; color: var(--text-dark);">添加新商品</h3>
                <div class="form-group">
                    <label>商品名称</label>
                    <input type="text" id="newProductName" placeholder="请输入商品名称" class="form-input">
                </div>
                <div class="form-group">
                    <label>价格</label>
                    <input type="number" id="newProductPrice" placeholder="请输入价格" class="form-input">
                </div>
                <div class="form-group">
                    <label>库存数量</label>
                    <input type="number" id="newProductStock" placeholder="请输入库存数量" class="form-input">
                </div>
                <div class="form-group">
                    <label>商品描述</label>
                    <textarea id="newProductDescription" placeholder="请输入商品描述" class="form-input" rows="3"></textarea>
                </div>
                <div class="form-group">
                    <label>商品图标（Emoji）</label>
                    <input type="text" id="newProductEmoji" placeholder="例如：🥐" class="form-input">
                </div>
                <div class="form-group">
                    <label>商品图片URL</label>
                    <input type="text" id="newProductImage" placeholder="请输入图片链接（可选）" class="form-input">
                </div>
                <div class="form-group">
                    <label>商品备注</label>
                    <textarea id="newProductNotes" placeholder="请输入商品备注（可选）" class="form-input" rows="2"></textarea>
                </div>
                <div style="display: flex; gap: 10px; margin-top: 20px;">
                    <button class="save-btn" onclick="app.saveNewProduct()" style="flex: 1;">保存</button>
                    <button class="small-btn" onclick="app.closeEditModal()" style="flex: 1;">取消</button>
                </div>
            </div>
        `;
        
        document.body.appendChild(modal);
    },
    
    saveNewProduct() {
        const nameEl = document.getElementById('newProductName');
        const priceEl = document.getElementById('newProductPrice');
        const stockEl = document.getElementById('newProductStock');
        const descEl = document.getElementById('newProductDescription');
        const emojiEl = document.getElementById('newProductEmoji');
        const imageEl = document.getElementById('newProductImage');
        const notesEl = document.getElementById('newProductNotes');
        
        if (!nameEl || !priceEl || !stockEl || !descEl) {
            alert('请填写完整的商品信息！');
            return;
        }
        
        const name = nameEl.value;
        const price = parseFloat(priceEl.value);
        const stock = parseInt(stockEl.value);
        const description = descEl.value;
        const emoji = emojiEl?.value || '🍞';
        const image = imageEl?.value || 'https://images.unsplash.com/photo-1509440159596-0249088772ff?w=400&h=300&fit=crop&crop=center';
        const notes = notesEl?.value || '新品上市，欢迎品尝！';
        
        if (!name || !price || !stock || !description) {
            alert('请填写完整的商品信息！');
            return;
        }
        
        // 生成新的商品ID
        const newId = Math.max(...this.products.map(p => p.id), 0) + 1;
        
        // 添加新商品到商品列表
        this.products.push({
            id: newId,
            name: name,
            description: description,
            price: price,
            emoji: emoji,
            category: 'new',
            stock: stock,
            image: image,
            notes: notes,
            flavors: [
                { id: 1, name: name + '（原味）', price: price, description: '经典原味' }
            ]
        });
        
        // 重新渲染商品列表和库存表格
        this.renderProducts();
        this.renderInventoryTable();
        this.closeAddProductModal();
        
        alert('商品添加成功！');
    },

    editProduct(productId) {
        const product = this.products.find(p => p.id === productId);
        if (!product) return;
        
        const modal = document.createElement('div');
        modal.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0,0,0,0.5);
            display: flex;
            align-items: center;
            justify-content: center;
            z-index: 1000;
        `;
        
        modal.innerHTML = `
            <div style="background: white; padding: 30px; border-radius: 12px; width: 90%; max-width: 500px; box-shadow: 0 10px 30px rgba(0,0,0,0.3);">
                <h3 style="margin-bottom: 20px; color: var(--text-dark);">编辑商品</h3>
                <div class="form-group">
                    <label>商品名称</label>
                    <input type="text" id="editProductName" value="${product.name}" class="form-input">
                </div>
                <div class="form-group">
                    <label>价格</label>
                    <input type="number" id="editProductPrice" value="${product.price}" class="form-input">
                </div>
                <div class="form-group">
                    <label>库存数量</label>
                    <input type="number" id="editProductStock" value="${product.stock}" class="form-input">
                </div>
                <div class="form-group">
                    <label>商品描述</label>
                    <textarea id="editProductDescription" class="form-input" rows="3">${product.description}</textarea>
                </div>
                <div style="display: flex; gap: 10px; margin-top: 20px;">
                    <button class="save-btn" onclick="app.saveProductEdit(${productId})" style="flex: 1;">保存</button>
                    <button class="small-btn" onclick="app.closeEditModal()" style="flex: 1;">取消</button>
                </div>
            </div>
        `;
        
        document.body.appendChild(modal);
    },
    
    saveProductEdit(productId) {
        const product = this.products.find(p => p.id === productId);
        if (!product) return;
        
        const nameEl = document.getElementById('editProductName');
        const priceEl = document.getElementById('editProductPrice');
        const stockEl = document.getElementById('editProductStock');
        const descEl = document.getElementById('editProductDescription');
        
        if (!nameEl || !priceEl || !stockEl || !descEl) {
            alert('请填写完整信息！');
            return;
        }
        
        const name = nameEl.value;
        const price = parseFloat(priceEl.value);
        const stock = parseInt(stockEl.value);
        const description = descEl.value;
        
        if (!name || !price || !stock) {
            alert('请填写完整信息！');
            return;
        }
        
        product.name = name;
        product.price = price;
        product.stock = stock;
        product.description = description;
        
        this.renderProducts();
        this.renderInventoryTable();
        this.closeEditModal();
        
        alert('商品信息已更新！');
    },
    
    closeEditModal() {
        // 精确查找所有模态框并移除
        const modals = document.querySelectorAll('div');
        for (let modal of modals) {
            if (modal.style && 
                modal.style.position === 'fixed' && 
                modal.style.top === '0px' && 
                modal.style.left === '0px' &&
                modal.style.width === '100%' &&
                modal.style.height === '100%' &&
                modal.style.backgroundColor === 'rgba(0, 0, 0, 0.5)') {
                modal.remove();
                break;
            }
        }
    },
    
    closeAddProductModal() {
        // 专门用于关闭添加新商品模态框
        const modals = document.querySelectorAll('div');
        for (let modal of modals) {
            if (modal.innerHTML && 
                (modal.innerHTML.includes('添加新商品') || 
                 modal.innerHTML.includes('编辑商品'))) {
                modal.remove();
                break;
            }
        }
    },

    deleteProduct(productId) {
        if (confirm('确定要删除这个商品吗？')) {
            this.products = this.products.filter(product => product.id !== productId);
            this.renderProducts();
            this.renderInventoryTable();
        }
    },

    // 结算功能
    checkout() {
        // 切换到个人中心页面进行订单提交
        this.showPage('profile');
        // 滚动到顶部
        window.scrollTo(0, 0);
    },

    // 本地存储相关
    saveCartToStorage() {
        localStorage.setItem('breadShopCart', JSON.stringify(this.cart));
    },

    loadCartFromStorage() {
        const savedCart = localStorage.getItem('breadShopCart');
        if (savedCart) {
            try {
                this.cart = JSON.parse(savedCart);
                this.updateCartDisplay();
            } catch (e) {
                console.error('Failed to load cart from storage:', e);
                this.cart = [];
            }
        }
    },

    saveOrdersToStorage() {
        localStorage.setItem('breadShopOrders', JSON.stringify(this.userOrders));
    },

    loadOrdersFromStorage() {
        const savedOrders = localStorage.getItem('breadShopOrders');
        if (savedOrders) {
            try {
                this.userOrders = JSON.parse(savedOrders);
            } catch (e) {
                console.error('Failed to load orders from storage:', e);
                this.userOrders = [];
            }
        }
    },

    // 库存数据持久化
    saveProductsToStorage() {
        localStorage.setItem('breadShopProducts', JSON.stringify(this.products));
    },

    loadProductsFromStorage() {
        const savedProducts = localStorage.getItem('breadShopProducts');
        if (savedProducts) {
            try {
                this.products = JSON.parse(savedProducts);
            } catch (e) {
                console.error('Failed to load products from storage:', e);
                // 保持默认产品数据
            }
        }
    }
};

// 初始化应用
document.addEventListener('DOMContentLoaded', function() {
    app.init();
});