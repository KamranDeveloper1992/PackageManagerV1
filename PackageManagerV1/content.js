const NpmSearchUI = () => {
    if (document.querySelector(".nuget-overlay")) return;
  
    const style = document.createElement("style");
    style.innerHTML = `
      .nuget-overlay {
        position: fixed;
        inset: 0;
        background: rgba(0, 0, 0, 0.4);
        backdrop-filter: blur(6px);
        z-index: 9998;
        opacity: 0;
        animation: fadeIn 0.4s forwards;
      }
  
      .nuget-search-wrapper {
        position: fixed;
        top: -200px;
        left: 50%;
        transform: translateX(-50%);
        width: 500px;
        font-family: Arial, sans-serif;
        z-index: 9999;
        opacity: 0;
        animation: slideDown 0.5s ease forwards;
      }
  
      @keyframes slideDown {
        to {
          top: 30px;
          opacity: 1;
        }
      }
  
      @keyframes fadeIn {
        to {
          opacity: 1;
        }
      }
  
      .nuget-search-box {
        display: flex;
        border: 1px solid #ccc;
        border-radius: 6px;
        overflow: hidden;
        box-shadow: 0 2px 6px rgba(0,0,0,0.3);
        background: white;
      }
  
      .nuget-search-input {
        flex: 1;
        padding: 10px;
        font-size: 16px;
        border: none;
        outline: none;
      }
  
      .nuget-search-button {
        background-color: #0078d4;
        color: white;
        border: none;
        padding: 0 16px;
        cursor: pointer;
        font-size: 16px;
      }
  
      .nuget-results {
        margin-top: 10px;
        background: #f9f9f9;
        border: 1px solid #ddd;
        border-radius: 6px;
        max-height: 400px;
        overflow-y: auto;
      }
  
      .nuget-results li {
        list-style: none;
        padding: 10px 14px;
        border-bottom: 1px solid #eee;
        display: flex;
        justify-content: space-between;
        align-items: center;
      }
  
      .nuget-results li:hover {
        background-color: #efefef;
      }
  
      .install-btn {
        background-color: #28a745;
        color: white;
        border: none;
        padding: 6px 10px;
        border-radius: 4px;
        cursor: pointer;
        font-size: 13px;
      }
  
      .install-btn:hover {
        background-color: #1f8735;
      }
    `;
    document.head.appendChild(style);
  
    const overlay = document.createElement("div");
    overlay.className = "nuget-overlay";
    document.body.appendChild(overlay);
  
    const container = document.createElement("div");
    container.className = "nuget-search-wrapper";
    container.innerHTML = `
      <div class="nuget-search-box">
        <input type="text" id="nugetInput" class="nuget-search-input" placeholder="npm paketini axtar..." />
        <button id="nugetBtn" class="nuget-search-button">Axtar</button>
      </div>
      <ul id="nugetResults" class="nuget-results" style="display:none;"></ul>
    `;
    document.body.appendChild(container);
  
    const input = document.getElementById("nugetInput");
    const button = document.getElementById("nugetBtn");
    const results = document.getElementById("nugetResults");
  
    async function fetchNpm(query) {
      if (!query) return;
      results.innerHTML = "<li>Axtarılır...</li>";
      results.style.display = "block";
  
      try {
        const res = await fetch(`https://registry.npmjs.org/-/v1/search?text=${encodeURIComponent(query)}&size=10`);
        const data = await res.json();
  
        results.innerHTML = "";
  
        if (data.objects.length === 0) {
          results.innerHTML = "<li>Tapılmadı.</li>";
          return;
        }
  
        data.objects.forEach(obj => {
          const pkg = obj.package;
          const li = document.createElement("li");
          li.innerHTML = `
            <div>
              <strong>${pkg.name}</strong><br />
              <small>${pkg.version}</small>
            </div>
            <button class="install-btn" onclick="navigator.clipboard.writeText('npm install ${pkg.name}').then(() => alert('Kopyalandı: npm install ${pkg.name}'));">Yüklə</button>
          `;
          results.appendChild(li);
        });
  
      } catch (err) {
        results.innerHTML = "<li>Xəta baş verdi.</li>";
      }
    }
  
    button.onclick = () => fetchNpm(input.value.trim());
    input.addEventListener("keydown", e => {
      if (e.key === "Enter") fetchNpm(input.value.trim());
    });
  
    overlay.onclick = () => {
      overlay.remove();
      container.remove();
    };
  };
  

  window.onkeydown = (e) => {
    if (e.key === "Enter") {
      NpmSearchUI();
    }
  };
  