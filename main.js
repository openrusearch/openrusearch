<!DOCTYPE html>
<html lang="ru" data-theme="dark">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<meta name="color-scheme" content="light dark">
<title>Open Ru Search</title>
<style>
  :root{
    color-scheme:light;
    --blue-900:#0B2545;
    --blue-700:#134E9B;
    --blue-500:#1C6FD6;
    --blue-100:#EAF2FC;
    --paper:#FBFCFE;
    --surface:#FFFFFF;
    --ink:#16233A;
    --ink-soft:#5C6B85;
    --line:#DCE7F7;
    --radius:16px;
    --topbar-bg:#0B2545;
    --hero-from:#134E9B;
    --hero-to:#1C6FD6;
    --brand-color:#FFFFFF;
    --btn-search:#0B2545;
    --btn-search-hover:#051526;
    --btn-text:#FFFFFF;
    --pin-bg:rgba(255,255,255,.18);
    --pin-border:rgba(255,255,255,.35);
    --pin-hover:rgba(255,255,255,.3);
    --placeholder:#9DB2CE;
    --box-bg:#FFFFFF;
    --box-text:#16233A;
    --card-bg:#EAF2FC;
    --card-bg-hover:#D6E5F8;
    --card-text:#16233A;
    --menu-bg:#FFFFFF;
    --menu-text:#16233A;
    --menu-hover:#EAF2FC;
    --menu-line:#DCE7F7;
    --accent:#1C6FD6;
    --accent-soft:rgba(28,111,214,.12);
  }
  :root[data-theme="dark"]{
    color-scheme:dark;
    --blue-900:#5A5A5A;
    --blue-700:#6E6E6E;
    --blue-500:#8A8A8A;
    --blue-100:#6E6E6E;
    --paper:#232323;
    --surface:#6E6E6E;
    --ink:#FFFFFF;
    --ink-soft:#E0E0E0;
    --line:#7E7E7E;
    --topbar-bg:#1A1A1A;
    --hero-from:#232323;
    --hero-to:#232323;
    --brand-color:#FFFFFF;
    --btn-search:#4A4A4A;
    --btn-search-hover:#3A3A3A;
    --btn-text:#FFFFFF;
    --pin-bg:#6E6E6E;
    --pin-border:#8A8A8A;
    --pin-hover:#5A5A5A;
    --placeholder:#E0E0E0;
    --box-bg:#6E6E6E;
    --box-text:#FFFFFF;
    --card-bg:#6E6E6E;
    --card-bg-hover:#5A5A5A;
    --card-text:#FFFFFF;
    --menu-bg:#2E2E2E;
    --menu-text:#FFFFFF;
    --menu-hover:#3E3E3E;
    --menu-line:#454545;
    --accent:#6FB1FF;
    --accent-soft:rgba(111,177,255,.14);
  }
  body, .panel, .engine-card, .misc-card, .wiki-item, .search-box, .wiki-modal,
  .bg-confirm-box, .palette-pop, .topbar, .hero, .mode-tab, .region-chip, .quick-row span{
    transition:background-color .25s ease, color .25s ease, border-color .25s ease, background .25s ease;
  }
  *{ margin:0; padding:0; box-sizing:border-box; }
  body{
    font-family: system-ui, -apple-system, "Segoe UI", Roboto, sans-serif;
    background:var(--paper);
    color:var(--ink);
    min-height:100vh;
    display:flex;
    flex-direction:column;
  }

  .topbar{
    background:var(--topbar-bg);
    color:#fff;
    padding:10px 24px;
    display:flex;
    align-items:center;
    justify-content:space-between;
    font-size:13px;
    margin-top:auto;
    z-index:50;
    flex-wrap:wrap;
    gap:10px;
  }
  .topbar .brandmark{
    font-weight:800;
    letter-spacing:.2px;
    color:var(--brand-color);
    transition:color .3s;
  }
  .topbar .brandmark b{ color:var(--brand-color); }
  .topbar nav a{
    color:#DCE7F7;
    text-decoration:none;
    margin-left:18px;
    font-weight:500;
  }
  :root[data-theme="dark"] .topbar nav a{ color:#D0D0D0; }
  .topbar nav a:hover{ color:#fff; }
  .topbar nav{ display:flex; align-items:center; gap:14px; flex-wrap:wrap; }

  .ai-toggle-wrap{
    display:inline-flex;
    align-items:center;
    gap:8px;
    font-size:12.5px;
    color:#DCE7F7;
    cursor:pointer;
    user-select:none;
    background:rgba(255,255,255,.06);
    border:1px solid rgba(255,255,255,.18);
    padding:4px 10px;
    border-radius:999px;
  }
  :root[data-theme="dark"] .ai-toggle-wrap{ color:#E0E0E0; border-color:#3A3A3A; background:rgba(0,0,0,.25); }
  .ai-toggle-wrap input{
    appearance:none;
    -webkit-appearance:none;
    width:32px; height:16px;
    background:#555;
    border-radius:999px;
    position:relative;
    cursor:pointer;
    outline:none;
    transition:background .2s;
    flex-shrink:0;
  }
  .ai-toggle-wrap input::after{
    content:'';
    position:absolute;
    top:2px; left:2px;
    width:12px; height:12px;
    border-radius:50%;
    background:#fff;
    transition:transform .2s;
  }
  .ai-toggle-wrap input:checked{ background:#34C759; }
  .ai-toggle-wrap input:checked::after{ transform:translateX(16px); }

  .theme-toggle{
    position:relative;
    display:inline-flex;
    align-items:center;
    width:46px;
    height:26px;
    border-radius:999px;
    background:rgba(255,255,255,.12);
    border:1px solid rgba(255,255,255,.2);
    cursor:pointer;
    padding:0;
    flex-shrink:0;
    transition:background .25s ease;
  }
  .theme-toggle.on{
    background:#34C759;
    border-color:#34C759;
  }
  .theme-toggle .theme-toggle-knob{
    position:absolute;
    top:2px;
    left:2px;
    width:20px;
    height:20px;
    border-radius:50%;
    background:#fff;
    box-shadow:0 2px 5px rgba(0,0,0,.3);
    display:flex;
    align-items:center;
    justify-content:center;
    transition:transform .25s cubic-bezier(.4,0,.2,1);
  }
  .theme-toggle.on .theme-toggle-knob{ transform:translateX(20px); }
  .theme-toggle .theme-toggle-knob svg{ width:12px; height:12px; }
  .bg-switch-btn{
    background:#6E6E6E;
    border:1px solid #8A8A8A;
    color:#FFFFFF;
    width:28px; height:28px;
    border-radius:8px;
    display:inline-flex;
    align-items:center;
    justify-content:center;
    cursor:pointer;
    padding:0;
    transition:background .15s, color .15s;
  }
  :root:not([data-theme="dark"]) .bg-switch-btn{ background:#2E5FA0; border-color:#2E5FA0; }
  .bg-switch-btn:hover{ background:#5A5A5A; color:#fff; }
  :root:not([data-theme="dark"]) .bg-switch-btn:hover{ background:#1D4A85; }
  .bg-switch-btn svg{ display:block; }
  .bg-reset-btn{
    background:#6E6E6E;
    border:1px solid #8A8A8A;
    color:#FFFFFF;
    width:28px; height:28px;
    border-radius:8px;
    display:none;
    align-items:center;
    justify-content:center;
    cursor:pointer;
    padding:0;
    transition:background .15s, color .15s;
  }
  :root:not([data-theme="dark"]) .bg-reset-btn{ background:#2E5FA0; border-color:#2E5FA0; }
  .bg-reset-btn.show{ display:inline-flex; }
  .bg-reset-btn:hover{ background:#c93d2c; color:#fff; }
  .bg-reset-btn svg{ display:block; }

  .palette-wrap{ position:relative; display:inline-flex; }
  .palette-btn{
    background:#6E6E6E;
    border:1px solid #8A8A8A;
    color:#FFFFFF;
    width:28px; height:28px;
    border-radius:8px;
    display:inline-flex;
    align-items:center;
    justify-content:center;
    cursor:pointer;
    padding:0;
    transition:background .15s, color .15s;
  }
  :root:not([data-theme="dark"]) .palette-btn{ background:#2E5FA0; border-color:#2E5FA0; }
  .palette-btn:hover{ background:#5A5A5A; color:#fff; }
  :root:not([data-theme="dark"]) .palette-btn:hover{ background:#1D4A85; }
  .palette-btn svg{ display:block; }
  .palette-pop{
    display:none;
    position:absolute;
    bottom:36px;
    right:0;
    background:var(--surface);
    border-radius:14px;
    box-shadow:0 18px 40px rgba(0,0,0,.5);
    padding:16px;
    z-index:150;
    width:220px;
    flex-direction:column;
    align-items:center;
    gap:12px;
  }
  :root:not([data-theme="dark"]) .palette-pop{ background:#FFFFFF; }
  .palette-pop.show{ display:flex; }
  .palette-wheel-wrap{ position:relative; width:170px; height:170px; }
  .palette-wheel{ width:170px; height:170px; border-radius:50%; cursor:crosshair; display:block; }
  .palette-wheel-cursor{
    position:absolute; width:14px; height:14px; border-radius:50%;
    border:2px solid #fff;
    box-shadow:0 0 0 1px rgba(0,0,0,.4), 0 1px 4px rgba(0,0,0,.35);
    transform:translate(-50%,-50%); pointer-events:none; top:0; left:0;
  }
  .palette-lightness-row{ width:100%; display:flex; align-items:center; gap:8px; }
  .palette-lightness-row input[type="range"]{ flex:1; height:14px; cursor:pointer; }
  .palette-preview{
    width:22px; height:22px; border-radius:50%;
    border:2px solid #fff;
    box-shadow:0 0 0 1px var(--line);
    flex-shrink:0;
  }
  .palette-hex-row{ width:100%; display:flex; gap:8px; }
  .palette-hex-row input[type="text"]{
    flex:1;
    border:1px solid var(--line);
    border-radius:8px;
    padding:6px 8px;
    font-size:12.5px;
    color:#16233A;
    outline:none;
    min-width:0;
    background:#fff;
  }
  .palette-apply-btn{
    background:var(--btn-search);
    color:var(--btn-text);
    border:none;
    font-weight:600;
    font-size:12.5px;
    padding:7px 14px;
    border-radius:8px;
    cursor:pointer;
    white-space:nowrap;
  }
  .palette-apply-btn:hover{ background:var(--btn-search-hover); }

  .bg-confirm-overlay{
    display:none;
    position:fixed;
    inset:0;
    background:rgba(0,0,0,.65);
    z-index:200;
    align-items:center;
    justify-content:center;
    padding:20px;
  }
  .bg-confirm-overlay.show{ display:flex; }
  .bg-confirm-box{
    background:var(--surface);
    border-radius:var(--radius);
    max-width:360px;
    width:100%;
    padding:22px 22px 18px;
    box-shadow:0 30px 60px rgba(0,0,0,.6);
  }
  :root:not([data-theme="dark"]) .bg-confirm-box{ background:#FFFFFF; }
  .bg-confirm-box h3{ font-size:16px; margin-bottom:8px; color:var(--ink); }
  .bg-confirm-box p{ font-size:13px; color:var(--ink-soft); line-height:1.5; margin-bottom:18px; }
  .bg-confirm-actions{ display:flex; gap:10px; justify-content:flex-end; }
  .bg-confirm-actions button{
    font-weight:600; font-size:13px; padding:9px 16px; border-radius:9px; cursor:pointer; border:none;
  }
  .bg-confirm-cancel{ background:#8A8A8A; color:#fff; }
  .bg-confirm-cancel:hover{ background:#5A5A5A; }
  .bg-confirm-ok{ background:#E24C3A; color:#fff; }
  .bg-confirm-ok:hover{ background:#c93d2c; }

  .hero{
    background:linear-gradient(180deg, var(--hero-from) 0%, var(--hero-to) 100%);
    min-height:100vh;
    padding:20px;
    text-align:center;
    color:#fff;
    position:relative;
    display:flex;
    flex-direction:column;
    justify-content:center;
    align-items:center;
  }
  .hero h1{
    font-size:44px;
    font-weight:800;
    letter-spacing:-.5px;
    color:var(--brand-color);
    transition:color .3s;
  }
  .hero p{ margin-top:10px; color:#D6E7FC; font-size:15px; }
  :root[data-theme="dark"] .hero p{ color:#D0D0D0; }

  .mode-switch{
    max-width:680px;
    margin:26px auto 0;
    display:flex;
    justify-content:center;
    gap:10px;
  }
  .mode-tab{
    display:inline-flex;
    align-items:center;
    gap:8px;
    background:var(--card-bg);
    color:var(--card-text);
    font-weight:600;
    font-size:15px;
    padding:9px 20px 9px 14px;
    border-radius:999px;
    cursor:pointer;
    border:2px solid transparent;
    transition:border-color .15s, background .15s, transform .12s;
  }
  .mode-tab:hover{ transform:translateY(-1px); background:var(--card-bg-hover); }
  .mode-tab.active{ background:var(--card-bg-hover); border-color:transparent; }

  /* ====== ПОЛЕ ПОИСКА ====== */
  .search-wrap{
    max-width:680px;
    width:100%;
    margin:22px auto 0;
    position:relative;
  }
  .search-box{
    background:var(--box-bg);
    border-radius:999px;
    display:flex;
    align-items:center;
    padding:6px 6px 6px 20px;
    box-shadow:0 18px 40px rgba(0,0,0,.5);
    border:1px solid var(--line);
    transition:box-shadow .25s ease, border-color .25s ease;
  }
  .search-box:focus-within{
    box-shadow:0 20px 50px rgba(0,0,0,.55), 0 0 0 3px var(--accent-soft);
    border-color:var(--accent);
  }
  .search-box .search-icon{
    flex-shrink:0; display:flex; align-items:center; margin-right:4px;
  }
  .search-box input{
    flex:1;
    border:none;
    outline:none;
    font-size:16px;
    padding:12px 8px;
    color:var(--box-text);
    background:transparent;
    min-width:0;
  }
  .search-box input::placeholder{ color:var(--placeholder); }
  .search-box button{
    background:var(--btn-search);
    color:var(--btn-text);
    border:1px solid rgba(0,0,0,.1);
    font-weight:600;
    font-size:14px;
    padding:13px 22px;
    border-radius:999px;
    cursor:pointer;
    transition:transform .15s, background .15s;
    white-space:nowrap;
  }
  :root[data-theme="dark"] .search-box button{ border-color:#5A5A5A; }
  .search-box button:hover{ background:var(--btn-search-hover); transform:scale(1.03); }
  #aiSearchBtn{
    margin-left:6px;
    display:inline-flex;
    align-items:center;
    gap:5px;
    padding:13px 18px;
  }
  #aiSearchBtn svg{ display:block; }
  #aiSearchBtn.hidden{ display:none; }

  /* ====== КОНТЕКСТНОЕ МЕНЮ ИСТОРИИ — КРАСИВОЕ ====== */
  .history-menu{
    position:absolute;
    top:calc(100% + 10px);
    left:0;
    right:0;
    background:var(--menu-bg);
    color:var(--menu-text);
    border-radius:18px;
    box-shadow:
      0 24px 60px rgba(0,0,0,.55),
      0 8px 20px rgba(0,0,0,.35),
      0 0 0 1px var(--menu-line);
    z-index:120;
    overflow:hidden;
    display:none;
    max-height:60vh;
    overflow-y:auto;
    animation:menuIn .22s cubic-bezier(.4,0,.2,1);
    transform-origin:top center;
    scrollbar-width:thin;
    scrollbar-color: var(--line) transparent;
  }
  .history-menu::-webkit-scrollbar{ width:8px; }
  .history-menu::-webkit-scrollbar-track{ background:transparent; }
  .history-menu::-webkit-scrollbar-thumb{
    background:var(--menu-line);
    border-radius:8px;
  }
  .history-menu.show{ display:block; }
  @keyframes menuIn{
    from{ opacity:0; transform:translateY(-8px) scale(.98); }
    to{ opacity:1; transform:translateY(0) scale(1); }
  }
  .history-menu-head{
    padding:12px 18px 10px;
    font-size:11px;
    font-weight:700;
    letter-spacing:.8px;
    text-transform:uppercase;
    color:var(--ink-soft);
    border-bottom:1px solid var(--menu-line);
    display:flex;
    justify-content:space-between;
    align-items:center;
    background:linear-gradient(180deg, var(--menu-hover) 0%, transparent 100%);
  }
  :root[data-theme="dark"] .history-menu-head{ color:#D0D0D0; }
  .history-menu-head .history-menu-title{
    display:flex;
    align-items:center;
    gap:8px;
  }
  .history-menu-head .history-menu-title svg{
    opacity:.85;
  }
  .history-menu-count{
    font-weight:600;
    text-transform:none;
    letter-spacing:0;
    font-size:11px;
    padding:2px 8px;
    background:var(--accent-soft);
    color:var(--accent);
    border-radius:999px;
    min-width:22px;
    text-align:center;
  }
  .history-menu-item{
    display:flex;
    align-items:center;
    gap:12px;
    padding:11px 18px;
    cursor:pointer;
    font-size:14px;
    color:var(--menu-text);
    transition:background .15s ease, padding-left .15s ease;
    border-bottom:1px solid var(--menu-line);
    position:relative;
  }
  .history-menu-item:last-child{ border-bottom:none; }
  .history-menu-item::before{
    content:'';
    position:absolute;
    left:0; top:0; bottom:0;
    width:3px;
    background:var(--accent);
    transform:scaleY(0);
    transform-origin:center;
    transition:transform .2s ease;
  }
  .history-menu-item:hover,
  .history-menu-item.active{
    background:var(--menu-hover);
    padding-left:22px;
  }
  .history-menu-item:hover::before,
  .history-menu-item.active::before{
    transform:scaleY(1);
  }
  .history-menu-item .history-menu-icon{
    flex-shrink:0;
    display:flex;
    align-items:center;
    justify-content:center;
    width:26px; height:26px;
    border-radius:8px;
    background:var(--accent-soft);
    color:var(--accent);
    transition:background .15s ease, color .15s ease;
  }
  .history-menu-item:hover .history-menu-icon,
  .history-menu-item.active .history-menu-icon{
    background:var(--accent);
    color:#FFFFFF;
  }
  .history-menu-item .history-menu-text{
    flex:1;
    overflow:hidden;
    text-overflow:ellipsis;
    white-space:nowrap;
    min-width:0;
  }
  .history-menu-item .history-menu-remove{
    flex-shrink:0;
    opacity:0;
    font-weight:700;
    font-size:12px;
    cursor:pointer;
    padding:4px 7px;
    line-height:1;
    color:#FF7A29;
    border-radius:8px;
    transition:opacity .15s ease, background .15s ease, transform .15s ease;
  }
  .history-menu-item:hover .history-menu-remove,
  .history-menu-item.active .history-menu-remove{
    opacity:.85;
  }
  .history-menu-item .history-menu-remove:hover{
    opacity:1;
    background:rgba(255,122,41,.18);
    transform:scale(1.1);
  }
  .history-menu-empty{
    padding:28px 18px;
    text-align:center;
    font-size:13px;
    color:var(--ink-soft);
    display:flex;
    flex-direction:column;
    align-items:center;
    gap:10px;
  }
  .history-menu-empty svg{
    opacity:.4;
  }
  :root[data-theme="dark"] .history-menu-empty{ color:#D0D0D0; }
  .history-menu-footer{
    padding:8px 12px;
    border-top:1px solid var(--menu-line);
    display:flex;
    justify-content:flex-end;
    background:linear-gradient(0deg, var(--menu-hover) 0%, transparent 100%);
  }
  .history-menu-clear{
    background:transparent;
    border:none;
    color:#FF7A29;
    font-weight:600;
    font-size:12.5px;
    padding:7px 14px;
    border-radius:9px;
    cursor:pointer;
    transition:background .15s ease, transform .15s ease;
    display:inline-flex;
    align-items:center;
    gap:6px;
  }
  .history-menu-clear:hover{
    background:rgba(255,122,41,.15);
    transform:translateY(-1px);
  }

  .quick-row{
    margin-top:16px;
    display:flex;
    justify-content:center;
    gap:10px;
    flex-wrap:wrap;
    align-items:center;
  }
  .quick-row span{
    background:var(--pin-bg);
    color:var(--pin-text, #FFFFFF);
    font-size:12.5px;
    padding:6px 14px;
    border-radius:999px;
    cursor:pointer;
    border:1px solid var(--pin-border);
    transition:background .15s;
  }
  :root:not([data-theme="dark"]) .quick-row span{ color:#0B2545; }
  .quick-row span:hover{ background:var(--pin-hover); }

  .content{
    max-width:920px;
    width:100%;
    margin:0 auto 0;
    padding:24px 20px 60px;
    padding-top:200vh;
    position:relative;
    z-index:1;
  }

  .panel{
    background:var(--surface);
    border-radius:var(--radius);
    border:1px solid var(--line);
    box-shadow:0 4px 24px rgba(0,0,0,.35);
    padding:26px 26px 24px;
    margin-bottom:22px;
  }
  :root:not([data-theme="dark"]) .panel{ background:#FFFFFF; }
  .panel-head{
    display:flex;
    align-items:baseline;
    justify-content:space-between;
    margin-bottom:16px;
  }
  .panel-head h2{ font-size:18px; font-weight:700; color:var(--ink); }
  :root:not([data-theme="dark"]) .panel-head h2{ color:#16233A; }
  .panel-head span{ font-size:12.5px; color:var(--ink-soft); }
  :root:not([data-theme="dark"]) .panel-head span{ color:#5C6B85; }

  /* ====== ПОЛНАЯ ПАНЕЛЬ ИСТОРИИ — КРАСИВАЯ ====== */
  .history-panel{ display:block; }
  .history-list{
    display:flex;
    flex-wrap:wrap;
    gap:9px;
    max-height:360px;
    overflow-y:auto;
    padding:2px;
    scrollbar-width:thin;
    scrollbar-color: var(--line) transparent;
  }
  .history-list::-webkit-scrollbar{ width:8px; }
  .history-list::-webkit-scrollbar-track{ background:transparent; }
  .history-list::-webkit-scrollbar-thumb{
    background:var(--line);
    border-radius:8px;
  }
  .history-chip{
    display:inline-flex;
    align-items:center;
    gap:8px;
    background:var(--card-bg);
    color:var(--card-text);
    font-size:12.5px;
    font-weight:500;
    padding:7px 12px 7px 12px;
    border-radius:999px;
    cursor:pointer;
    border:1px solid var(--line);
    transition:background .18s ease, transform .18s ease, box-shadow .18s ease, border-color .18s ease;
    max-width:100%;
    position:relative;
  }
  :root:not([data-theme="dark"]) .history-chip{ color:#16233A; }
  .history-chip:hover{
    background:var(--card-bg-hover);
    transform:translateY(-2px);
    box-shadow:0 6px 16px rgba(0,0,0,.25);
    border-color:transparent;
  }
  .history-chip .history-icon{
    flex-shrink:0;
    display:flex;
    align-items:center;
    justify-content:center;
    width:18px; height:18px;
    border-radius:6px;
    background:var(--accent-soft);
    color:var(--accent);
  }
  :root:not([data-theme="dark"]) .history-chip .history-icon{ color:#1C6FD6; }
  .history-chip .history-text{
    overflow:hidden;
    text-overflow:ellipsis;
    white-space:nowrap;
    max-width:340px;
  }
  .history-chip .history-remove{
    opacity:.5;
    font-weight:700;
    font-size:11px;
    cursor:pointer;
    padding:2px 5px;
    line-height:1;
    color:#FF7A29;
    flex-shrink:0;
    border-radius:6px;
    transition:opacity .15s ease, background .15s ease, transform .15s ease;
  }
  .history-chip:hover .history-remove{ opacity:.9; }
  .history-chip .history-remove:hover{
    opacity:1;
    background:rgba(255,122,41,.18);
    transform:scale(1.15);
  }
  .history-actions{
    margin-top:16px;
    display:flex;
    gap:10px;
    flex-wrap:wrap;
  }
  .history-actions button{
    font-weight:600;
    font-size:12.5px;
    padding:9px 16px;
    border-radius:10px;
    cursor:pointer;
    border:1px solid var(--line);
    background:var(--card-bg);
    color:var(--card-text);
    transition:background .15s, transform .15s, border-color .15s, color .15s;
    display:inline-flex;
    align-items:center;
    gap:7px;
  }
  :root:not([data-theme="dark"]) .history-actions button{ color:#16233A; }
  .history-actions button:hover{
    background:var(--card-bg-hover);
    border-color:transparent;
    transform:translateY(-1px);
  }
  .history-actions .history-clear:hover{
    background:#E24C3A;
    color:#fff;
    border-color:transparent;
  }
  .history-empty{
    font-size:13px;
    color:var(--ink-soft);
    padding:18px 4px;
    display:flex;
    align-items:center;
    gap:10px;
  }
  .history-empty svg{ opacity:.4; flex-shrink:0; }
  :root:not([data-theme="dark"]) .history-empty{ color:#5C6B85; }

  .quick-row span.pin-btn{
    background:var(--pin-bg);
    border-style:dashed;
    display:inline-flex;
    align-items:center;
    justify-content:center;
    min-width:34px;
    padding:6px 10px;
    font-weight:700;
    font-size:14px;
  }
  .quick-row span.pin-btn:hover{ background:var(--pin-hover); }
  .quick-row span.pin-btn.editing{
    background:#FF7A29;
    border-color:#FF7A29;
    border-style:solid;
    color:#fff;
  }
  .quick-row span.pinned-item{
    display:inline-flex;
    align-items:center;
    gap:6px;
    padding-right:8px;
  }
  .quick-row span.pinned-item .pin-label{ cursor:pointer; }
  .quick-row span.pinned-item .unpin-x{
    opacity:.9;
    font-weight:700;
    cursor:pointer;
    padding:0 4px;
    line-height:1;
    font-size:12px;
    color:#FFB27A;
  }
  .quick-row span.pinned-item .unpin-x:hover{ opacity:1; color:#fff; }
  .quick-row .pin-add-input{
    background:#5A5A5A;
    border:1px solid #8A8A8A;
    border-radius:999px;
    padding:6px 12px;
    font-size:12.5px;
    color:#FFFFFF;
    outline:none;
    width:170px;
  }
  :root:not([data-theme="dark"]) .quick-row .pin-add-input{ background:#fff; color:#16233A; border-color:#DCE7F7; }
  .quick-row .pin-add-input::placeholder{ color:#D0D0D0; }
  :root:not([data-theme="dark"]) .quick-row .pin-add-input::placeholder{ color:#8FA3BF; }
  .quick-row .pin-save-btn{
    background:#FF7A29;
    color:#fff;
    border:1px solid #FF7A29;
    border-radius:999px;
    padding:6px 14px;
    font-size:12.5px;
    font-weight:600;
    cursor:pointer;
  }
  .quick-row .pin-save-btn:hover{ background:#e56a1d; }
  .pin-letter-icon{
    display:inline-flex;
    align-items:center;
    justify-content:center;
    width:16px; height:16px;
    border-radius:4px;
    background:#008373;
    color:#fff;
    font-weight:800;
    font-size:11px;
    flex-shrink:0;
    line-height:1;
  }

  .region-filter{
    display:flex;
    gap:8px;
    flex-wrap:wrap;
    margin-bottom:16px;
  }
  .region-chip{
    background:var(--card-bg);
    color:var(--card-text);
    font-size:12.5px;
    font-weight:600;
    padding:6px 14px;
    border-radius:999px;
    cursor:pointer;
    border:1px solid var(--line);
    transition:background .15s;
  }
  :root:not([data-theme="dark"]) .region-chip{ color:#16233A; }
  .region-chip:hover{ background:var(--card-bg-hover); border-color:transparent; }
  .region-chip.active{
    background:var(--btn-search);
    color:var(--btn-text);
    border-color:transparent;
  }

  .engine-grid{
    display:grid;
    grid-template-columns:repeat(auto-fill, minmax(150px, 1fr));
    gap:12px;
  }
  .engine-card{
    border:1px solid var(--line);
    border-radius:12px;
    padding:14px 14px 13px;
    cursor:pointer;
    display:flex;
    align-items:center;
    gap:10px;
    background:var(--card-bg);
    transition:border-color .15s, transform .12s, background .15s;
    text-align:left;
  }
  :root:not([data-theme="dark"]) .engine-card{ color:#16233A; }
  .engine-card:hover{
    border-color:transparent;
    background:var(--card-bg-hover);
    transform:translateY(-2px);
  }
  .engine-card.active{
    border-color:transparent;
    background:var(--btn-search);
    color:var(--btn-text);
  }
  :root:not([data-theme="dark"]) .engine-card.active{ color:#FFFFFF; }
  .engine-card.active .engine-name,
  .engine-card.active .engine-region{ color:var(--btn-text); }
  .engine-dot{
    width:34px; height:34px;
    border-radius:9px;
    display:flex; align-items:center; justify-content:center;
    flex-shrink:0;
    background:var(--surface);
    border:1px solid var(--line);
    overflow:hidden;
  }
  :root:not([data-theme="dark"]) .engine-dot{ background:#FFFFFF; }
  .engine-dot img{ width:22px; height:22px; object-fit:contain; }
  .engine-name{ font-size:13.5px; font-weight:600; color:var(--ink); }
  :root:not([data-theme="dark"]) .engine-name{ color:#16233A; }
  .engine-region{ font-size:11px; color:var(--ink-soft); }
  :root:not([data-theme="dark"]) .engine-region{ color:#5C6B85; }

  .selected-note{ font-size:12.5px; color:var(--ink-soft); margin-top:14px; }
  :root:not([data-theme="dark"]) .selected-note{ color:#5C6B85; }
  .selected-note b{ color:var(--ink); }
  :root:not([data-theme="dark"]) .selected-note b{ color:#134E9B; }

  .go-all{
    margin-top:16px;
    display:flex;
    gap:10px;
    flex-wrap:wrap;
    align-items:center;
  }
  .go-all button{
    font-weight:600;
    font-size:13.5px;
    padding:11px 20px;
    border-radius:10px;
    cursor:pointer;
    border:1px solid rgba(0,0,0,.1);
    transition:background .15s, transform .15s;
  }
  :root[data-theme="dark"] .go-all button{ border-color:#5A5A5A; }
  .btn-primary{ background:var(--btn-search); color:var(--btn-text); }
  .btn-primary:hover{ background:var(--btn-search-hover); transform:translateY(-1px); }

  .hint{
    font-size:12.5px;
    color:var(--ink-soft);
    line-height:1.6;
  }
  :root:not([data-theme="dark"]) .hint{ color:#5C6B85; }
  .hint strong{ color:var(--ink); }
  :root:not([data-theme="dark"]) .hint strong{ color:#16233A; }

  .wiki-modal-overlay{
    display:none;
    position:fixed;
    inset:0;
    background:rgba(0,0,0,.65);
    z-index:100;
    align-items:flex-start;
    justify-content:center;
    padding:40px 20px;
    overflow-y:auto;
  }
  .wiki-modal-overlay.show{ display:flex; }
  .wiki-modal{
    background:var(--surface);
    border-radius:var(--radius);
    max-width:640px;
    width:100%;
    box-shadow:0 30px 60px rgba(0,0,0,.6);
    overflow:hidden;
  }
  :root:not([data-theme="dark"]) .wiki-modal{ background:#FFFFFF; }
  .wiki-modal-head{
    background:var(--btn-search);
    color:var(--btn-text);
    padding:16px 22px;
    display:flex;
    align-items:center;
    justify-content:space-between;
  }
  .wiki-modal-head h3{ font-size:16px; font-weight:700; }
  .wiki-modal-close{
    background:rgba(255,255,255,.18);
    border:none;
    color:#fff;
    width:28px; height:28px;
    border-radius:8px;
    cursor:pointer;
    font-size:16px;
    line-height:1;
  }
  .wiki-modal-close:hover{ background:rgba(255,255,255,.3); }
  .wiki-modal-body{ padding:18px 22px 22px; max-height:70vh; overflow-y:auto; }

  .wiki-item{
    border:1px solid var(--line);
    border-radius:12px;
    padding:14px 16px;
    background:var(--card-bg);
    text-decoration:none;
    color:inherit;
    display:block;
    transition:border-color .15s, background .15s;
    margin-bottom:10px;
  }
  :root:not([data-theme="dark"]) .wiki-item{ color:#16233A; }
  .wiki-item:hover{ border-color:transparent; background:var(--card-bg-hover); }
  .wiki-item .wiki-title{
    font-size:14.5px;
    font-weight:700;
    color:var(--btn-text);
    margin-bottom:4px;
  }
  :root:not([data-theme="dark"]) .wiki-item .wiki-title{ color:#134E9B; }
  .wiki-item .wiki-snippet{ font-size:13px; color:var(--ink-soft); line-height:1.5; }
  :root:not([data-theme="dark"]) .wiki-item .wiki-snippet{ color:#5C6B85; }
  .wiki-item .wiki-snippet mark{
    background:none;
    color:var(--ink);
    font-weight:700;
  }
  :root:not([data-theme="dark"]) .wiki-item .wiki-snippet mark{ color:#16233A; }
  .wiki-empty, .wiki-loading{ font-size:13px; color:var(--ink-soft); padding:10px 2px; }
  :root:not([data-theme="dark"]) .wiki-empty, :root:not([data-theme="dark"]) .wiki-loading{ color:#5C6B85; }

  .misc-grid{
    display:grid;
    grid-template-columns:repeat(auto-fill, minmax(150px, 1fr));
    gap:12px;
  }
  .misc-card{
    border:1px solid var(--line);
    border-radius:12px;
    padding:14px 14px 13px;
    cursor:pointer;
    display:flex;
    align-items:center;
    gap:10px;
    background:var(--card-bg);
    transition:border-color .15s, transform .12s, background .15s;
    text-align:left;
    text-decoration:none;
    color:inherit;
  }
  :root:not([data-theme="dark"]) .misc-card{ color:#16233A; }
  .misc-card:hover{
    border-color:transparent;
    background:var(--card-bg-hover);
    transform:translateY(-2px);
  }
  .misc-dot{
    width:34px; height:34px;
    border-radius:9px;
    display:flex; align-items:center; justify-content:center;
    flex-shrink:0;
    background:var(--surface);
    border:1px solid var(--line);
    overflow:hidden;
  }
  :root:not([data-theme="dark"]) .misc-dot{ background:#FFFFFF; }
  .misc-dot img{ width:22px; height:22px; object-fit:contain; }
  .misc-name{ font-size:13.5px; font-weight:600; color:var(--ink); }
  :root:not([data-theme="dark"]) .misc-name{ color:#16233A; }
  .misc-sub{ font-size:11px; color:var(--ink-soft); }
  :root:not([data-theme="dark"]) .misc-sub{ color:#5C6B85; }

  @media (max-width:560px){
    .hero h1{ font-size:30px; }
    .search-box{ padding-left:16px; }
    .search-box input{ font-size:14px; }
    .search-box button{ padding:11px 14px; font-size:13px; }
    #aiSearchBtn{ padding:11px 12px; }
    .engine-grid{ grid-template-columns:repeat(auto-fill, minmax(130px,1fr)); }
    .mode-switch{ flex-wrap:wrap; }
    .topbar{ padding:10px 14px; font-size:12px; }
    .topbar nav a{ margin-left:10px; }
    .content{ padding-top:150vh; }
    .history-menu-item{ font-size:13.5px; padding:13px 16px; }
    .history-menu-head{ padding:12px 16px 10px; }
    .history-menu{ border-radius:14px; }
  }
</style>
</head>
<body>

<div class="bg-confirm-overlay" id="bgConfirmOverlay">
  <div class="bg-confirm-box">
    <h3>Сбросить фон?</h3>
    <p>Загруженная картинка будет удалена, и фон вернётся к стандартному градиенту. Это действие нельзя отменить.</p>
    <div class="bg-confirm-actions">
      <button class="bg-confirm-cancel" id="bgConfirmCancel">Отмена</button>
      <button class="bg-confirm-ok" id="bgConfirmOk">Сбросить</button>
    </div>
  </div>
</div>

<div class="hero">
  <h1 id="heroTitle">Open Ru Search</h1>
  <p id="heroSub">Один запрос — в выбранный вами поисковик</p>

  <div class="mode-switch" id="modeSwitch">
    <div class="mode-tab active" id="tabNormal" data-mode="normal">
      <span>Поиск</span>
    </div>
    <div class="mode-tab" id="tabWiki" data-mode="wiki">
      <span>Википоиск</span>
    </div>
  </div>

  <div class="search-wrap">
    <div class="search-box">
      <span class="search-icon">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="11" cy="11" r="7" stroke="#1C6FD6" stroke-width="2.4"/>
          <path d="M20 20L16.65 16.65" stroke="#1C6FD6" stroke-width="2.4" stroke-linecap="round"/>
        </svg>
      </span>
      <input type="text" id="queryInput" placeholder="Что будем искать?" autocomplete="off" autofocus>
      <button id="mainSearchBtn">Искать</button>
      <button id="aiSearchBtn" title="Открыть Google AI-режим">
        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M12 2l2.09 6.26L20 10l-5.91 1.74L12 18l-2.09-6.26L4 10l5.91-1.74L12 2z" fill="currentColor"/>
          <path d="M19 15l.94 2.81L22 18l-2.06.94L19 22l-.94-3.06L16 18l2.06-.19L19 15z" fill="currentColor"/>
        </svg>
        AI
      </button>
    </div>
    <!-- Красивое контекстное меню истории -->
    <div class="history-menu" id="historyMenu">
      <div class="history-menu-head">
        <span class="history-menu-title">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="12" cy="12" r="9" stroke="currentColor" stroke-width="1.8"/>
            <path d="M12 7v5l3 2" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
          Последние запросы
        </span>
        <span class="history-menu-count" id="historyMenuCount">0</span>
      </div>
      <div id="historyMenuItems"></div>
      <div class="history-menu-footer">
        <button class="history-menu-clear" id="historyMenuClear" type="button">
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M3 6h18M8 6V4a1 1 0 0 1 1-1h6a1 1 0 0 1 1 1v2M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
          Очистить всё
        </button>
      </div>
    </div>
  </div>

  <div class="quick-row" id="pinnedRow"></div>
</div>

<div class="content">

  <div class="panel">
    <div class="panel-head">
      <h2>Выберите поисковик</h2>
      <span id="selCount">выбран: Google</span>
    </div>
    <div class="region-filter" id="regionFilter"></div>
    <div class="engine-grid" id="engineGrid"></div>

    <div class="go-all">
      <button class="btn-primary" id="goSelected">Открыть поиск</button>
    </div>

    <p class="selected-note">Поисковик откроется в новой вкладке со страницей результатов по вашему запросу.</p>
  </div>

  <div class="panel">
    <div class="panel-head">
      <h2>Разное</h2>
      <span>нейросети и вики-поиск</span>
    </div>
    <div class="misc-grid" id="miscGrid"></div>
  </div>

  <!-- Красивая полная история внизу -->
  <div class="panel history-panel" id="historyPanel">
    <div class="panel-head">
      <h2>История поиска</h2>
      <span id="historyCount">0 запросов</span>
    </div>
    <div class="history-list" id="historyList"></div>
    <div class="history-actions">
      <button class="history-clear" id="historyClear" type="button">
        <svg width="13" height="13" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M3 6h18M8 6V4a1 1 0 0 1 1-1h6a1 1 0 0 1 1 1v2M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
        Очистить историю
      </button>
    </div>
  </div>

  <div class="panel">
    <div class="panel-head"><h2>Как это работает</h2></div>
    <p class="hint">
      <strong>Open Ru Search</strong> — это лаунчер, а не отдельная поисковая база: браузер не может законно и технически получить полную выдачу чужого поисковика напрямую в свою страницу. Поэтому вместо имитации результатов инструмент сразу отправляет ваш запрос в настоящую поисковую систему. Исключение — Википедия: у неё есть открытый API, поэтому её результаты показываются прямо здесь, на странице.
    </p>
  </div>

</div>

<div class="topbar">
  <div class="brandmark" id="brandText" style="cursor:pointer;" title="Вернуться к обычному поиску">Open <b>Ru</b> Search</div>
  <nav>
    <label class="ai-toggle-wrap" title="Включить/выключить кнопку AI">
      <input type="checkbox" id="aiToggle" checked>
      <span>AI</span>
    </label>
    <a href="https://github.com/ARTEMPRO01MINETEXNICK" target="_blank" rel="noopener">Разработчик</a>
    <button class="bg-switch-btn" id="bgSwitchBtn" type="button" title="Сменить фон">
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect x="3" y="4" width="18" height="14" rx="2" stroke="currentColor" stroke-width="1.8"/>
        <circle cx="8.5" cy="9.5" r="1.5" stroke="currentColor" stroke-width="1.6"/>
        <path d="M21 15l-5.5-5.5a1.5 1.5 0 0 0-2.12 0L4 19" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/>
      </svg>
    </button>
    <button class="bg-reset-btn" id="bgResetBtn" type="button" title="Сбросить фон">
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M3 12a9 9 0 1 1 3 6.7" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/>
        <path d="M3 19v-5h5" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/>
      </svg>
    </button>
    <input type="file" id="bgFileInput" accept="image/*" style="display:none;">
    <div class="palette-wrap">
      <button class="palette-btn" id="paletteBtn" type="button" title="Цвет надписи">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M12 3a9 9 0 1 0 0 18c1.1 0 1.8-.7 1.8-1.6 0-.4-.16-.77-.42-1.07-.27-.3-.43-.65-.43-1.03 0-.9.72-1.6 1.6-1.6H16.5A4.5 4.5 0 0 0 21 11.25C21 6.7 16.97 3 12 3Z" stroke="currentColor" stroke-width="1.6" stroke-linejoin="round"/>
          <circle cx="7.5" cy="10.5" r="1.1" fill="currentColor"/>
          <circle cx="11" cy="7.2" r="1.1" fill="currentColor"/>
          <circle cx="15.2" cy="7.6" r="1.1" fill="currentColor"/>
          <circle cx="17.3" cy="11.5" r="1.1" fill="currentColor"/>
        </svg>
      </button>
      <div class="palette-pop" id="palettePop">
        <div class="palette-wheel-wrap">
          <canvas class="palette-wheel" id="paletteWheel" width="170" height="170"></canvas>
          <div class="palette-wheel-cursor" id="paletteWheelCursor"></div>
        </div>
        <div class="palette-lightness-row">
          <input type="range" id="paletteLightness" min="0" max="100" value="50">
          <div class="palette-preview" id="palettePreview"></div>
        </div>
        <div class="palette-hex-row">
          <input type="text" id="paletteHexInput" value="#FF4F00" maxlength="7">
          <button class="palette-apply-btn" id="paletteApplyBtn" type="button">ОК</button>
        </div>
      </div>
    </div>
    <button class="theme-toggle" id="themeToggle" type="button" title="Тёмная тема" aria-pressed="false">
      <span class="theme-toggle-knob">
        <svg id="themeToggleIcon" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="12" cy="12" r="5" stroke="#F0A400" stroke-width="2"/>
          <path d="M12 2v2M12 20v2M4.2 4.2l1.4 1.4M18.4 18.4l1.4 1.4M2 12h2M20 12h2M4.2 19.8l1.4-1.4M18.4 5.6l1.4-1.4" stroke="#F0A400" stroke-width="2" stroke-linecap="round"/>
        </svg>
      </span>
    </button>
  </nav>
</div>

<div class="wiki-modal-overlay" id="wikiModalOverlay">
  <div class="wiki-modal">
    <div class="wiki-modal-head">
      <h3>Википедия</h3>
      <button class="wiki-modal-close" id="wikiModalClose">✕</button>
    </div>
    <div class="wiki-modal-body" id="wikiResults"></div>
  </div>
</div>

<script>
  const AI_URL = 'https://www.google.com/search?udm=50&q=';
  const MAX_HISTORY = 100;
  const MENU_HISTORY_LIMIT = 9;

  const engines = [
    { id:'google',      name:'Google',       region:'Мир',    domain:'google.com',        url:q => `https://www.google.com/search?q=${q}` },
    { id:'bing',        name:'Bing',         region:'Мир',    domain:'bing.com',           url:q => `https://www.bing.com/search?q=${q}` },
    { id:'ddg',         name:'DuckDuckGo',   region:'Мир',    domain:'duckduckgo.com',     url:q => `https://duckduckgo.com/?q=${q}` },
    { id:'brave',       name:'Brave Search', region:'Мир',    domain:'search.brave.com',   url:q => `https://search.brave.com/search?q=${q}` },
    { id:'startpage',   name:'Startpage',    region:'Мир',    domain:'startpage.com',      url:q => `https://www.startpage.com/sp/search?query=${q}` },
    { id:'mojeek',      name:'Mojeek',       region:'Мир',    domain:'mojeek.com',         url:q => `https://www.mojeek.com/search?q=${q}` },
    { id:'kagi',        name:'Kagi',         region:'Мир',    domain:'kagi.com',           url:q => `https://kagi.com/search?q=${q}` },
    { id:'yahoo',       name:'Yahoo',        region:'Мир',    domain:'search.yahoo.com',   url:q => `https://search.yahoo.com/search?p=${q}` },
    { id:'perplexity',  name:'Perplexity',   region:'Мир',    domain:'perplexity.ai',      url:q => `https://www.perplexity.ai/search?q=${q}` },
    { id:'yandex',      name:'Яндекс',       region:'РФ',     domain:'yandex.ru',          url:q => `https://yandex.ru/search/?text=${q}` },
    { id:'mailru',      name:'Mail.ru',      region:'РФ',     domain:'mail.ru',            url:q => `https://go.mail.ru/search?q=${q}` },
    { id:'rambler',     name:'Rambler',      region:'РФ',     domain:'rambler.ru',         url:q => `https://nova.rambler.ru/search?query=${q}` },
    { id:'gogo',        name:'Gogo.ru',      region:'РФ',     domain:'gogo.ru',            url:q => `https://gogo.ru/search?q=${q}` },
    { id:'qwant',       name:'Qwant',        region:'Европа', domain:'qwant.com',          url:q => `https://www.qwant.com/?q=${q}` },
    { id:'ecosia',      name:'Ecosia',       region:'Европа', domain:'ecosia.org',         url:q => `https://www.ecosia.org/search?q=${q}` },
    { id:'seznam',      name:'Seznam',       region:'Европа', domain:'seznam.cz',          url:q => `https://search.seznam.cz/?q=${q}` },
    { id:'swisscows',   name:'Swisscows',    region:'Европа', domain:'swisscows.com',      url:q => `https://swisscows.com/en/web?query=${q}` },
    { id:'baidu',       name:'Baidu',        region:'Азия',   domain:'baidu.com',          url:q => `https://www.baidu.com/s?wd=${q}` },
    { id:'naver',       name:'Naver',        region:'Азия',   domain:'naver.com',          url:q => `https://search.naver.com/search.naver?query=${q}` },
    { id:'sogou',       name:'Sogou',        region:'Азия',   domain:'sogou.com',          url:q => `https://www.sogou.com/web?query=${q}` },
    { id:'coccoc',      name:'Coc Coc',      region:'Азия',   domain:'coccoc.com',         url:q => `https://coccoc.com/search?query=${q}` },
  ];

  let selected = 'google';
  let activeRegion = 'Все';
  let faviconTimer = null;
  let aiEnabled = true;

  const grid = document.getElementById('engineGrid');
  const regionFilter = document.getElementById('regionFilter');
  const selCount = document.getElementById('selCount');
  const input = document.getElementById('queryInput');
  const aiToggle = document.getElementById('aiToggle');
  const aiSearchBtn = document.getElementById('aiSearchBtn');

  const searchWrap = document.querySelector('.search-wrap');
  const historyMenu = document.getElementById('historyMenu');
  const historyMenuItems = document.getElementById('historyMenuItems');
  const historyMenuCount = document.getElementById('historyMenuCount');
  const historyMenuClear = document.getElementById('historyMenuClear');

  const regions = ['Все', ...Array.from(new Set(engines.map(e => e.region)))];

  /* ====== ИСТОРИЯ ====== */
  const historyPanel = document.getElementById('historyPanel');
  const historyList = document.getElementById('historyList');
  const historyCount = document.getElementById('historyCount');
  const historyClear = document.getElementById('historyClear');

  function getHistory(){
    try{
      const raw = localStorage.getItem('ors_history');
      if (raw) {
        const arr = JSON.parse(raw);
        if (Array.isArray(arr)) return arr;
      }
    }catch(e){}
    return [];
  }
  function saveHistory(list){
    try{ localStorage.setItem('ors_history', JSON.stringify(list.slice(0, MAX_HISTORY))); }catch(e){}
  }
  function addToHistory(query){
    const q = String(query || '').trim();
    if (!q) return;
    let list = getHistory();
    list = list.filter(item => item !== q);
    list.unshift(q);
    if (list.length > MAX_HISTORY) list = list.slice(0, MAX_HISTORY);
    saveHistory(list);
    renderHistory();
    renderHistoryMenu();
  }
  function removeFromHistory(query){
    let list = getHistory();
    list = list.filter(item => item !== query);
    saveHistory(list);
    renderHistory();
    renderHistoryMenu();
  }
  function clearHistory(){
    saveHistory([]);
    renderHistory();
    renderHistoryMenu();
  }

  /* ====== Полная панель истории ====== */
  function renderHistory(){
    const list = getHistory();
    historyCount.textContent = list.length + ' ' +
      (list.length === 1 ? 'запрос' :
       list.length >= 2 && list.length <= 4 ? 'запроса' : 'запросов');

    historyList.innerHTML = '';
    if (list.length === 0){
      const empty = document.createElement('div');
      empty.className = 'history-empty';
      empty.innerHTML = `
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="12" cy="12" r="9" stroke="currentColor" stroke-width="1.6"/>
          <path d="M12 7v5l3 2" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
        Здесь появятся ваши последние запросы
      `;
      historyList.appendChild(empty);
      historyClear.style.display = 'none';
      return;
    }
    historyClear.style.display = '';

    list.forEach(q => {
      const chip = document.createElement('div');
      chip.className = 'history-chip';
      chip.title = q;
      chip.innerHTML = `
        <span class="history-icon">
          <svg width="10" height="10" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 3l2.09 6.26L20 11l-5.91 1.74L12 19l-2.09-6.26L4 11l5.91-1.74L12 3z" fill="currentColor"/>
          </svg>
        </span>
        <span class="history-text"></span>
        <span class="history-remove" title="Удалить из истории">✕</span>
      `;
      chip.querySelector('.history-text').textContent = q;
      chip.addEventListener('click', (e) => {
        if (e.target.classList.contains('history-remove')) return;
        input.value = q;
        input.focus();
        openSearch();
      });
      chip.querySelector('.history-remove').addEventListener('click', (e) => {
        e.stopPropagation();
        removeFromHistory(q);
      });
      historyList.appendChild(chip);
    });
  }

  historyClear.addEventListener('click', () => {
    if (confirm('Очистить всю историю поиска?')) clearHistory();
  });

  /* ====== КОНТЕКСТНОЕ МЕНЮ (последние 9) ====== */
  let menuActiveIndex = -1;

  function renderHistoryMenu(){
    const list = getHistory().slice(0, MENU_HISTORY_LIMIT);
    historyMenuCount.textContent = list.length;
    historyMenuItems.innerHTML = '';

    if (list.length === 0){
      const empty = document.createElement('div');
      empty.className = 'history-menu-empty';
      empty.innerHTML = `
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="12" cy="12" r="9" stroke="currentColor" stroke-width="1.6"/>
          <path d="M12 7v5l3 2" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
        История пуста
      `;
      historyMenuItems.appendChild(empty);
      historyMenuClear.style.display = 'none';
      return;
    }
    historyMenuClear.style.display = '';

    list.forEach((q) => {
      const item = document.createElement('div');
      item.className = 'history-menu-item';
      item.dataset.query = q;
      item.innerHTML = `
        <span class="history-menu-icon">
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 3l2.09 6.26L20 11l-5.91 1.74L12 19l-2.09-6.26L4 11l5.91-1.74L12 3z" fill="currentColor"/>
          </svg>
        </span>
        <span class="history-menu-text"></span>
        <span class="history-menu-remove" title="Удалить">✕</span>
      `;
      item.querySelector('.history-menu-text').textContent = q;
      item.addEventListener('click', (e) => {
        if (e.target.classList.contains('history-menu-remove')) return;
        input.value = q;
        hideHistoryMenu();
        input.focus();
        openSearch();
      });
      item.querySelector('.history-menu-remove').addEventListener('click', (e) => {
        e.stopPropagation();
        removeFromHistory(q);
      });
      historyMenuItems.appendChild(item);
    });
    menuActiveIndex = -1;
  }

  function showHistoryMenu(){
    renderHistoryMenu();
    historyMenu.classList.add('show');
  }
  function hideHistoryMenu(){
    historyMenu.classList.remove('show');
    menuActiveIndex = -1;
    historyMenuItems.querySelectorAll('.history-menu-item').forEach(el => el.classList.remove('active'));
  }

  input.addEventListener('focus', () => {
    if (getHistory().length > 0) showHistoryMenu();
  });
  input.addEventListener('input', () => {
    if (getHistory().length > 0) showHistoryMenu();
  });

  document.addEventListener('click', (e) => {
    if (!searchWrap.contains(e.target)) hideHistoryMenu();
  });

  input.addEventListener('keydown', (e) => {
    const items = Array.from(historyMenuItems.querySelectorAll('.history-menu-item'));
    const menuOpen = historyMenu.classList.contains('show');

    if (e.key === 'Escape'){
      hideHistoryMenu();
      return;
    }
    if (e.key === 'ArrowDown'){
      if (!menuOpen) { showHistoryMenu(); return; }
      if (items.length === 0) return;
      e.preventDefault();
      menuActiveIndex = (menuActiveIndex + 1) % items.length;
      items.forEach((it, i) => it.classList.toggle('active', i === menuActiveIndex));
      items[menuActiveIndex].scrollIntoView({ block: 'nearest' });
      return;
    }
    if (e.key === 'ArrowUp'){
      if (!menuOpen) { showHistoryMenu(); return; }
      if (items.length === 0) return;
      e.preventDefault();
      menuActiveIndex = (menuActiveIndex - 1 + items.length) % items.length;
      items.forEach((it, i) => it.classList.toggle('active', i === menuActiveIndex));
      items[menuActiveIndex].scrollIntoView({ block: 'nearest' });
      return;
    }
    if (e.key === 'Enter'){
      if (menuOpen && menuActiveIndex >= 0 && items[menuActiveIndex]){
        e.preventDefault();
        const q = items[menuActiveIndex].dataset.query;
        input.value = q;
        hideHistoryMenu();
        openSearch();
        return;
      }
      hideHistoryMenu();
      openSearch();
    }
  });

  historyMenuClear.addEventListener('click', (e) => {
    e.stopPropagation();
    if (confirm('Очистить всю историю поиска?')) clearHistory();
  });

  window.addEventListener('scroll', () => {
    if (historyMenu.classList.contains('show')) hideHistoryMenu();
  }, { passive: true });

  /* ====== AI ====== */
  function applyAiState(){
    if (aiEnabled){
      aiSearchBtn.classList.remove('hidden');
    } else {
      aiSearchBtn.classList.add('hidden');
    }
  }

  aiToggle.addEventListener('change', () => {
    aiEnabled = aiToggle.checked;
    try{ localStorage.setItem('ors_ai_enabled', aiEnabled ? '1' : '0'); }catch(e){}
    applyAiState();
  });

  /* ====== Поисковики ====== */
  function renderRegionFilter(){
    regionFilter.innerHTML = '';
    regions.forEach(r => {
      const chip = document.createElement('div');
      chip.className = 'region-chip' + (activeRegion === r ? ' active' : '');
      chip.textContent = r;
      chip.addEventListener('click', () => {
        activeRegion = r;
        renderRegionFilter();
        renderGrid();
      });
      regionFilter.appendChild(chip);
    });
  }

  function renderGrid(){
    grid.innerHTML = '';
    clearTimeout(faviconTimer);

    const list = activeRegion === 'Все' ? engines : engines.filter(e => e.region === activeRegion);
    list.forEach(e => {
      const card = document.createElement('div');
      card.className = 'engine-card' + (selected === e.id ? ' active' : '');

      const letterHtml = `<span class="pin-letter-icon" style="width:22px;height:22px;border-radius:5px;font-size:14px;">${e.name[0]}</span>`;

      card.innerHTML = `
        <div class="engine-dot" data-engine-id="${e.id}">${letterHtml}</div>
        <div>
          <div class="engine-name">${e.name}</div>
          <div class="engine-region">${e.region}</div>
        </div>
      `;
      card.addEventListener('click', () => {
        selected = e.id;
        try{ localStorage.setItem('ors_selected_engine', selected); }catch(err){}
        renderGrid();
      });
      grid.appendChild(card);
    });
    const current = engines.find(e => e.id === selected);
    selCount.textContent = `выбран: ${current ? current.name : '—'}`;

    faviconTimer = setTimeout(loadFavicons, 3000);
  }

  function loadFavicons(){
    if (input.value.trim()) return;
    engines.forEach(e => {
      const dot = grid.querySelector(`.engine-dot[data-engine-id="${e.id}"]`);
      if (!dot) return;
      const img = new Image();
      img.src = `https://www.google.com/s2/favicons?sz=64&domain=${e.domain}`;
      img.alt = '';
      img.style.width = '22px';
      img.style.height = '22px';
      img.style.objectFit = 'contain';
      img.onload = () => {
        if (!input.value.trim()) {
          dot.innerHTML = '';
          dot.appendChild(img);
        }
      };
    });
  }

  input.addEventListener('input', () => {
    clearTimeout(faviconTimer);
  });

  /* ====== Закреплённые ====== */
  const pinnedRow = document.getElementById('pinnedRow');
  const DEFAULT_PINNED = [
    { label:'youtube.com', url:'https://www.youtube.com' },
    { label:'tiktok.com',  url:'https://www.tiktok.com' },
    { label:'telegram',    url:'https://web.telegram.org' },
    { label:'bing.com',    url:'https://www.bing.com' },
  ];

  let pinnedEditMode = false;

  function getPinned(){
    try{
      const raw = localStorage.getItem('ors_pinned');
      if (raw) return JSON.parse(raw);
    }catch(e){}
    return DEFAULT_PINNED.slice();
  }
  function savePinned(list){
    try{ localStorage.setItem('ors_pinned', JSON.stringify(list)); }catch(e){}
  }

  function renderPinned(){
    const list = getPinned();
    pinnedRow.innerHTML = '';

    list.forEach((item, idx) => {
      const span = document.createElement('span');
      span.className = 'pinned-item';

      if (pinnedEditMode){
        span.innerHTML = `
          <span class="pin-label" style="cursor:default;">${item.label}</span>
          <span class="unpin-x" title="Удалить">✕</span>
        `;
        span.querySelector('.unpin-x').addEventListener('click', (e) => {
          e.stopPropagation();
          const newList = getPinned();
          newList.splice(idx, 1);
          savePinned(newList);
          renderPinned();
        });
      } else {
        span.innerHTML = `<span class="pin-label">${item.label}</span>`;
        span.querySelector('.pin-label').addEventListener('click', () => {
          window.location.href = item.url;
        });
      }
      pinnedRow.appendChild(span);
    });

    if (pinnedEditMode){
      const addInput = document.createElement('input');
      addInput.type = 'text';
      addInput.className = 'pin-add-input';
      addInput.placeholder = 'сайт, напр. bing.com';

      const saveBtn = document.createElement('button');
      saveBtn.type = 'button';
      saveBtn.className = 'pin-save-btn';
      saveBtn.textContent = 'Добавить';

      function addNew(){
        let url = addInput.value.trim();
        if (!url) { addInput.focus(); return; }
        if (!/^https?:\/\//i.test(url)) url = 'https://' + url;
        const label = url.replace(/^https?:\/\//i, '').replace(/\/.*$/, '');
        const newList = getPinned();
        newList.push({ label, url });
        savePinned(newList);
        addInput.value = '';
        renderPinned();
      }

      saveBtn.addEventListener('click', addNew);
      addInput.addEventListener('keydown', e => { if (e.key === 'Enter') addNew(); });

      pinnedRow.appendChild(addInput);
      pinnedRow.appendChild(saveBtn);
      setTimeout(() => addInput.focus(), 0);
    }

    const pencilBtn = document.createElement('span');
    pencilBtn.className = 'pin-btn' + (pinnedEditMode ? ' editing' : '');
    pencilBtn.title = pinnedEditMode ? 'Готово' : 'Редактировать закреплённые';
    pencilBtn.innerHTML = pinnedEditMode
      ? `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
           <path d="M5 13l4 4L19 7" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/>
         </svg>`
      : `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
           <path d="M4 20h4l10.5-10.5a2.83 2.83 0 0 0-4-4L4 16v4Z" stroke="currentColor" stroke-width="2" stroke-linejoin="round"/>
           <path d="M13.5 6.5l4 4" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
         </svg>`;

    pencilBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      pinnedEditMode = !pinnedEditMode;
      renderPinned();
    });
    pinnedRow.appendChild(pencilBtn);
  }

  /* ====== Режим ====== */
  let mode = 'normal';

  function applyModeUI(newMode){
    mode = newMode;
    const brandText = document.getElementById('brandText');
    const heroTitle = document.getElementById('heroTitle');
    const heroSub = document.getElementById('heroSub');
    const tabNormal = document.getElementById('tabNormal');
    const tabWiki = document.getElementById('tabWiki');

    if (mode === 'wiki'){
      brandText.innerHTML = 'Вики <b>Поиск</b>';
      heroTitle.innerHTML = 'Вики Поиск';
      heroSub.textContent = 'Один запрос — сразу статьи из Википедии';
      input.placeholder = 'Что ищем в Википедии?';
      tabWiki.classList.add('active');
      tabNormal.classList.remove('active');
    } else {
      brandText.innerHTML = 'Open <b>Ru</b> Search';
      heroTitle.innerHTML = 'Open Ru Search';
      heroSub.textContent = 'Один запрос — в выбранный вами поисковик';
      input.placeholder = 'Что будем искать?';
      tabNormal.classList.add('active');
      tabWiki.classList.remove('active');
    }
    try{ localStorage.setItem('ors_mode', mode); }catch(e){}
  }

  function setMode(newMode, opts){
    opts = opts || {};
    if (newMode === mode && !opts.force) return;
    applyModeUI(newMode);
    if (!opts.silent){
      history.pushState({ orsMode: newMode }, '', location.pathname + location.search);
    }
  }

  function applyModeSilently(newMode){
    applyModeUI(newMode);
  }

  window.addEventListener('popstate', (e) => {
    const targetMode = (e.state && e.state.orsMode) ? e.state.orsMode : 'normal';
    applyModeSilently(targetMode);
  });

  function isLikelyDomain(text){
    const t = text.trim();
    if (/\s/.test(t)) return false;
    return /^(https?:\/\/)?([a-zа-я0-9-]+\.)+[a-zа-я]{2,}(\/.*)?$/i.test(t);
  }

  function openSearch(){
    const q = input.value.trim();
    if (!q) { input.focus(); return; }

    addToHistory(q);
    hideHistoryMenu();

    if (mode === 'wiki'){
      searchWikipedia(q);
      showWikiModal();
      return;
    }
    if (isLikelyDomain(q)){
      let url = q;
      if (!/^https?:\/\//i.test(url)) url = 'https://' + url;
      window.location.href = url;
      return;
    }
    const encoded = encodeURIComponent(q);
    const engine = engines.find(e => e.id === selected);
    if (!engine) return;
    window.location.href = engine.url(encoded);
  }

  function openAI(){
    const q = input.value.trim();
    if (!q) { input.focus(); return; }
    addToHistory(q);
    hideHistoryMenu();
    const encoded = encodeURIComponent(q);
    window.location.href = AI_URL + encoded;
  }

  /* ====== Вики ====== */
  const wikiResults = document.getElementById('wikiResults');
  const wikiModalOverlay = document.getElementById('wikiModalOverlay');

  function showWikiModal(){ wikiModalOverlay.classList.add('show'); }
  function hideWikiModal(){ wikiModalOverlay.classList.remove('show'); }
  document.getElementById('wikiModalClose').addEventListener('click', hideWikiModal);
  wikiModalOverlay.addEventListener('click', e => {
    if (e.target === wikiModalOverlay) hideWikiModal();
  });

  async function searchWikipedia(query){
    if (query.trim().toLowerCase() === 'open ru search'){
      wikiResults.innerHTML = `
        <div class="wiki-item" style="cursor:default;">
          <div class="wiki-title">Хах</div>
          <div class="wiki-snippet">я не думал что ты нас будешь искать...</div>
        </div>
      `;
      return;
    }
    wikiResults.innerHTML = '<p class="wiki-loading">Ищем в Википедии…</p>';
    try{
      const url = `https://ru.wikipedia.org/w/api.php?action=query&list=search&srsearch=${encodeURIComponent(query)}&format=json&origin=*&srlimit=8`;
      const resp = await fetch(url);
      const data = await resp.json();
      const items = (data.query && data.query.search) || [];

      if (items.length === 0){
        wikiResults.innerHTML = '<p class="wiki-empty">Ничего не найдено в Википедии по этому запросу.</p>';
        return;
      }

      wikiResults.innerHTML = '';
      items.forEach(item => {
        const link = document.createElement('a');
        link.className = 'wiki-item';
        link.href = `https://ru.wikipedia.org/wiki/${encodeURIComponent(item.title.replace(/ /g, '_'))}`;
        link.rel = 'noopener';
        const cleanSnippet = item.snippet
          .replace(/<span class="searchmatch">/g, '<mark>')
          .replace(/<\/span>/g, '</mark>');
        link.innerHTML = `
          <div class="wiki-title">${item.title}</div>
          <div class="wiki-snippet">${cleanSnippet}…</div>
        `;
        wikiResults.appendChild(link);
      });
    }catch(err){
      wikiResults.innerHTML = '';
    }
  }

  /* ====== Фон и цвет ====== */
  const heroEl = document.querySelector('.hero');
  const brandTextEl = document.getElementById('brandText');
  const heroTitleEl = document.getElementById('heroTitle');
  const bgSwitchBtn = document.getElementById('bgSwitchBtn');
  const bgResetBtn = document.getElementById('bgResetBtn');
  const bgFileInput = document.getElementById('bgFileInput');
  const bgConfirmOverlay = document.getElementById('bgConfirmOverlay');
  const bgConfirmCancel = document.getElementById('bgConfirmCancel');
  const bgConfirmOk = document.getElementById('bgConfirmOk');

  const colorTable = [
    { name:'red',    rgb:[214, 40, 40],  title:'#FFFFFF' },
    { name:'orange', rgb:[255, 122, 41], title:'#FFFFFF' },
    { name:'yellow', rgb:[240, 200, 40], title:'#0B2545' },
    { name:'green',  rgb:[50, 160, 90],  title:'#FFFFFF' },
    { name:'blue',   rgb:[28, 111, 214], title:'#FF7A29' },
    { name:'cyan',   rgb:[40, 180, 210], title:'#0B2545' },
    { name:'purple', rgb:[130, 70, 190], title:'#FFD24A' },
    { name:'pink',   rgb:[230, 90, 160], title:'#FFFFFF' },
    { name:'white',  rgb:[240, 240, 240],title:'#134E9B' },
    { name:'black',  rgb:[20, 20, 20],   title:'#FF7A29' },
    { name:'gray',   rgb:[130, 130, 130],title:'#FF7A29' },
  ];

  function colorDistance(a, b){
    return Math.sqrt(Math.pow(a[0]-b[0],2) + Math.pow(a[1]-b[1],2) + Math.pow(a[2]-b[2],2));
  }
  function opposite(rgb){ return `rgb(${255-rgb[0]}, ${255-rgb[1]}, ${255-rgb[2]})`; }
  function pickTitleColor(rgb){
    let best = null, bestDist = Infinity;
    colorTable.forEach(entry => {
      const d = colorDistance(rgb, entry.rgb);
      if (d < bestDist){ bestDist = d; best = entry; }
    });
    if (bestDist > 140) return opposite(rgb);
    return best.title;
  }
  function getDominantColor(img){
    const canvas = document.createElement('canvas');
    const size = 40;
    canvas.width = size; canvas.height = size;
    const ctx = canvas.getContext('2d');
    ctx.drawImage(img, 0, 0, size, size);
    let r=0, g=0, b=0, count=0;
    try{
      const data = ctx.getImageData(0, 0, size, size).data;
      for (let i=0; i<data.length; i+=4){
        r += data[i]; g += data[i+1]; b += data[i+2]; count++;
      }
    }catch(e){ return null; }
    if (!count) return null;
    return [Math.round(r/count), Math.round(g/count), Math.round(b/count)];
  }
  function applyTitleColor(color){
    brandTextEl.style.color = color;
    heroTitleEl.style.color = color;
  }
  function resetTitleColor(){
    brandTextEl.style.color = '';
    heroTitleEl.style.color = '';
  }
  function applyHeroBackground(dataUrl){
    if (dataUrl){
      heroEl.style.backgroundImage = `linear-gradient(180deg, rgba(0,0,0,.45), rgba(0,0,0,.45)), url("${dataUrl}")`;
      heroEl.style.backgroundSize = 'cover';
      heroEl.style.backgroundPosition = 'center';
      heroEl.style.backgroundRepeat = 'no-repeat';
      bgResetBtn.classList.add('show');
    } else {
      heroEl.style.backgroundImage = '';
      heroEl.style.backgroundSize = '';
      heroEl.style.backgroundPosition = '';
      heroEl.style.backgroundRepeat = '';
      bgResetBtn.classList.remove('show');
    }
  }
  function applyBackgroundAndColor(dataUrl){
    applyHeroBackground(dataUrl);
    const img = new Image();
    img.onload = () => {
      const rgb = getDominantColor(img);
      if (rgb){
        const titleColor = pickTitleColor(rgb);
        applyTitleColor(titleColor);
        try{ localStorage.setItem('ors_title_color', titleColor); }catch(e){}
      }
    };
    img.src = dataUrl;
  }

  bgSwitchBtn.addEventListener('click', () => bgFileInput.click());

  const paletteBtn = document.getElementById('paletteBtn');
  const palettePop = document.getElementById('palettePop');
  const paletteWheel = document.getElementById('paletteWheel');
  const paletteWheelCursor = document.getElementById('paletteWheelCursor');
  const paletteLightness = document.getElementById('paletteLightness');
  const palettePreview = document.getElementById('palettePreview');
  const paletteHexInput = document.getElementById('paletteHexInput');
  const paletteApplyBtn = document.getElementById('paletteApplyBtn');
  const wheelCtx = paletteWheel.getContext('2d');
  const wheelSize = paletteWheel.width;
  const wheelRadius = wheelSize / 2;

  let pickerHue = 20, pickerSat = 100;

  function hslToHex(h, s, l){
    s/=100; l/=100;
    const k = n => (n + h/30) % 12;
    const a = s * Math.min(l, 1-l);
    const f = n => l - a * Math.max(-1, Math.min(k(n)-3, Math.min(9-k(n), 1)));
    const toHex = x => Math.round(255*x).toString(16).padStart(2,'0');
    return `#${toHex(f(0))}${toHex(f(8))}${toHex(f(4))}`.toUpperCase();
  }
  function hexToHsl(hex){
    const m = hex.replace('#','');
    const r = parseInt(m.substr(0,2),16)/255;
    const g = parseInt(m.substr(2,2),16)/255;
    const b = parseInt(m.substr(4,2),16)/255;
    const max = Math.max(r,g,b), min = Math.min(r,g,b);
    let h, s, l = (max+min)/2;
    if (max === min){ h = 0; s = 0; }
    else{
      const d = max-min;
      s = l > 0.5 ? d/(2-max-min) : d/(max+min);
      switch(max){
        case r: h = (g-b)/d + (g<b?6:0); break;
        case g: h = (b-r)/d + 2; break;
        default: h = (r-g)/d + 4;
      }
      h *= 60;
    }
    return [h, s*100, l*100];
  }
  function hslToRgbArr(h, s, l){
    const hex = hslToHex(h, s, l);
    return [parseInt(hex.substr(1,2),16), parseInt(hex.substr(3,2),16), parseInt(hex.substr(5,2),16)];
  }
  function drawWheel(){
    const img = wheelCtx.createImageData(wheelSize, wheelSize);
    for (let y=0; y<wheelSize; y++){
      for (let x=0; x<wheelSize; x++){
        const dx = x - wheelRadius, dy = y - wheelRadius;
        const dist = Math.sqrt(dx*dx + dy*dy);
        const idx = (y*wheelSize + x) * 4;
        if (dist <= wheelRadius){
          let angle = Math.atan2(dy, dx) * 180/Math.PI;
          if (angle < 0) angle += 360;
          const sat = Math.min(100, (dist/wheelRadius)*100);
          const [r,g,b] = hslToRgbArr(angle, sat, 50);
          img.data[idx] = r; img.data[idx+1] = g; img.data[idx+2] = b; img.data[idx+3] = 255;
        } else { img.data[idx+3] = 0; }
      }
    }
    wheelCtx.putImageData(img, 0, 0);
  }
  function setCursorFromHueSat(h, s){
    const angle = h * Math.PI/180;
    const r = (s/100) * wheelRadius;
    const x = wheelRadius + r * Math.cos(angle);
    const y = wheelRadius + r * Math.sin(angle);
    paletteWheelCursor.style.left = x + 'px';
    paletteWheelCursor.style.top = y + 'px';
  }
  function updatePreviewAndHex(){
    const l = Number(paletteLightness.value);
    const hex = hslToHex(pickerHue, pickerSat, l);
    palettePreview.style.background = hex;
    paletteHexInput.value = hex;
  }
  function pickFromEvent(e){
    const rect = paletteWheel.getBoundingClientRect();
    const clientX = e.touches ? e.touches[0].clientX : e.clientX;
    const clientY = e.touches ? e.touches[0].clientY : e.clientY;
    const x = clientX - rect.left - wheelRadius;
    const y = clientY - rect.top - wheelRadius;
    const dist = Math.min(Math.sqrt(x*x + y*y), wheelRadius);
    let angle = Math.atan2(y, x) * 180/Math.PI;
    if (angle < 0) angle += 360;
    pickerHue = angle;
    pickerSat = (dist/wheelRadius) * 100;
    setCursorFromHueSat(pickerHue, pickerSat);
    updatePreviewAndHex();
  }
  let wheelDragging = false;
  paletteWheel.addEventListener('mousedown', e => { wheelDragging = true; pickFromEvent(e); });
  window.addEventListener('mousemove', e => { if (wheelDragging) pickFromEvent(e); });
  window.addEventListener('mouseup', () => { wheelDragging = false; });
  paletteWheel.addEventListener('touchstart', e => { wheelDragging = true; pickFromEvent(e); });
  window.addEventListener('touchmove', e => { if (wheelDragging) pickFromEvent(e); });
  window.addEventListener('touchend', () => { wheelDragging = false; });
  paletteLightness.addEventListener('input', updatePreviewAndHex);
  paletteHexInput.addEventListener('change', () => {
    let hex = paletteHexInput.value.trim();
    if (!/^#?[0-9a-fA-F]{6}$/.test(hex)) { updatePreviewAndHex(); return; }
    if (hex[0] !== '#') hex = '#' + hex;
    hex = hex.toUpperCase();
    const [h,s,l] = hexToHsl(hex);
    pickerHue = h; pickerSat = s;
    paletteLightness.value = Math.round(l);
    setCursorFromHueSat(h, s);
    palettePreview.style.background = hex;
    paletteHexInput.value = hex;
  });
  paletteApplyBtn.addEventListener('click', () => {
    const hex = paletteHexInput.value;
    applyTitleColor(hex);
    try{ localStorage.setItem('ors_title_color', hex); }catch(e){}
    palettePop.classList.remove('show');
  });
  drawWheel();
  setCursorFromHueSat(pickerHue, pickerSat);
  updatePreviewAndHex();

  paletteBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    palettePop.classList.toggle('show');
  });
  document.addEventListener('click', (e) => {
    if (!palettePop.contains(e.target) && e.target !== paletteBtn && !paletteBtn.contains(e.target)){
      palettePop.classList.remove('show');
    }
  });

  bgFileInput.addEventListener('change', () => {
    const file = bgFileInput.files && bgFileInput.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      const dataUrl = reader.result;
      applyBackgroundAndColor(dataUrl);
      try{ localStorage.setItem('ors_hero_bg', dataUrl); }catch(e){}
    };
    reader.readAsDataURL(file);
  });

  bgResetBtn.addEventListener('click', () => { bgConfirmOverlay.classList.add('show'); });
  bgConfirmCancel.addEventListener('click', () => { bgConfirmOverlay.classList.remove('show'); });
  bgConfirmOverlay.addEventListener('click', (e) => {
    if (e.target === bgConfirmOverlay) bgConfirmOverlay.classList.remove('show');
  });
  bgConfirmOk.addEventListener('click', () => {
    applyHeroBackground(null);
    resetTitleColor();
    try{
      localStorage.removeItem('ors_hero_bg');
      localStorage.removeItem('ors_title_color');
    }catch(e){}
    bgConfirmOverlay.classList.remove('show');
  });

  try{
    const savedBg = localStorage.getItem('ors_hero_bg');
    const savedColor = localStorage.getItem('ors_title_color');
    if (savedBg) applyHeroBackground(savedBg);
    if (savedColor) applyTitleColor(savedColor);
  }catch(e){}

  /* ====== Тема ====== */
  const themeToggle = document.getElementById('themeToggle');
  const themeToggleIcon = document.getElementById('themeToggleIcon');
  const htmlEl = document.documentElement;

  const sunIcon = `<circle cx="12" cy="12" r="5" stroke="#F0A400" stroke-width="2"/><path d="M12 2v2M12 20v2M4.2 4.2l1.4 1.4M18.4 18.4l1.4 1.4M2 12h2M20 12h2M4.2 19.8l1.4-1.4M18.4 5.6l1.4-1.4" stroke="#F0A400" stroke-width="2" stroke-linecap="round"/>`;
  const moonIcon = `<path d="M20 14.5A8.5 8.5 0 0 1 9.5 4a8.5 8.5 0 1 0 10.5 10.5Z" stroke="#D0D0D0" stroke-width="1.8" stroke-linejoin="round" fill="#D0D0D0"/>`;

  function applyTheme(isDark){
    htmlEl.setAttribute('data-theme', isDark ? 'dark' : 'light');
    themeToggle.classList.toggle('on', isDark);
    themeToggle.setAttribute('aria-pressed', isDark ? 'true' : 'false');
    themeToggleIcon.innerHTML = isDark ? moonIcon : sunIcon;
  }
  themeToggle.addEventListener('click', () => {
    const isDark = !themeToggle.classList.contains('on');
    applyTheme(isDark);
    try{ localStorage.setItem('ors_theme', isDark ? 'dark' : 'light'); }catch(e){}
  });
  try{
    const savedTheme = localStorage.getItem('ors_theme');
    if (savedTheme){
      applyTheme(savedTheme === 'dark');
    } else {
      applyTheme(true);
    }
  }catch(e){ applyTheme(true); }

  /* ====== Кнопки ====== */
  document.getElementById('mainSearchBtn').addEventListener('click', openSearch);
  document.getElementById('goSelected').addEventListener('click', openSearch);
  aiSearchBtn.addEventListener('click', openAI);

  /* ====== Разное ====== */
  const miscItems = [
    { name:'Вики Поиск',  sub:'результаты выше',   domain:'wikipedia.org',  action:'scroll' },
    { name:'DeepSeek',    sub:'нейросеть',          domain:'chat.deepseek.com', href:'https://chat.deepseek.com' },
    { name:'Claude',      sub:'нейросеть',          domain:'claude.ai',      href:'https://claude.ai' },
    { name:'Arena AI',    sub:'сравнение моделей',  domain:'lmarena.ai',     href:'https://lmarena.ai' },
    { name:'ChatGPT',     sub:'нейросеть',          domain:'chatgpt.com',    href:'https://chatgpt.com' },
  ];

  function renderMisc(){
    const miscGrid = document.getElementById('miscGrid');
    miscGrid.innerHTML = '';
    miscItems.forEach(item => {
      const el = document.createElement(item.action === 'scroll' ? 'div' : 'a');
      el.className = 'misc-card';
      if (item.action !== 'scroll'){
        el.href = item.href;
        el.target = '_blank';
        el.rel = 'noopener';
      } else {
        el.addEventListener('click', () => {
          setMode('wiki');
          input.focus();
        });
      }
      el.innerHTML = `
        <div class="misc-dot" data-misc-name="${item.name}">
          <span class="pin-letter-icon" style="width:22px;height:22px;border-radius:5px;font-size:14px;">${item.name[0]}</span>
        </div>
        <div>
          <div class="misc-name">${item.name}</div>
          <div class="misc-sub">${item.sub}</div>
        </div>
      `;
      miscGrid.appendChild(el);
    });

    setTimeout(() => {
      if (input.value.trim()) return;
      miscItems.forEach(item => {
        const dot = miscGrid.querySelector(`.misc-dot[data-misc-name="${item.name}"]`);
        if (!dot) return;
        const img = new Image();
        img.src = `https://www.google.com/s2/favicons?sz=64&domain=${item.domain}`;
        img.alt = '';
        img.style.width = '22px';
        img.style.height = '22px';
        img.style.objectFit = 'contain';
        img.onload = () => {
          if (!input.value.trim()) {
            dot.innerHTML = '';
            dot.appendChild(img);
          }
        };
      });
    }, 3000);
  }

  renderMisc();
  renderRegionFilter();
  renderGrid();
  renderPinned();
  renderHistory();
  renderHistoryMenu();

  document.getElementById('brandText').addEventListener('click', () => {
    setMode(mode === 'wiki' ? 'normal' : 'wiki');
    input.focus();
  });
  document.getElementById('tabNormal').addEventListener('click', () => {
    setMode('normal'); input.focus();
  });
  document.getElementById('tabWiki').addEventListener('click', () => {
    setMode('wiki'); input.focus();
  });

  try{
    const savedEngine = localStorage.getItem('ors_selected_engine');
    if (savedEngine && engines.some(e => e.id === savedEngine)){
      selected = savedEngine;
    }
    const savedMode = localStorage.getItem('ors_mode');
    const initialMode = savedMode === 'wiki' ? 'wiki' : 'normal';
    applyModeSilently(initialMode);
    history.replaceState({ orsMode: initialMode }, '', location.pathname + location.search);

    const savedAi = localStorage.getItem('ors_ai_enabled');
    if (savedAi === '0'){
      aiEnabled = false;
      aiToggle.checked = false;
    } else {
      aiEnabled = true;
      aiToggle.checked = true;
    }
    applyAiState();
  }catch(e){
    applyModeSilently('normal');
    applyAiState();
  }
  renderGrid();

  const urlParams = new URLSearchParams(window.location.search);
  const qParam = urlParams.get('q');
  if (qParam && qParam.trim()){
    input.value = qParam;
    openSearch();
  }
</script>

</body>
</html>
