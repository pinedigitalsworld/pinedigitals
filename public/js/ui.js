/* case studies open inside the site; browser back and Escape close them too */
(() => {
  const cs = document.getElementById("cs"), frame = document.getElementById("csFrame"), title = document.getElementById("csTitle"), back = document.getElementById("csBack"), dl = document.getElementById("csDl");
  const backLabel = back.lastChild;
  const hashOf = el => el.dataset.hash || "#work/" + el.dataset.case;
  const fromHash = () => location.hash ? [...document.querySelectorAll("[data-case]")].find(el => hashOf(el) === location.hash) : null;
  /* phones show PDFs poorly inside a frame, so there the resume opens in the browser's own viewer instead */
  /* also when the site itself is shown inside another page's frame (a preview): browsers refuse a PDF nested there */
  const framed = (() => { try { return window.self !== window.top; } catch (_) { return true; } })();
  const smallScreen = () => framed || matchMedia("(max-width: 760px), (pointer: coarse)").matches;
  let opener = null, pushed = false;
  /* show the page as soon as it starts drawing, not after every image has arrived */
  let watch;
  const reveal = () => { clearInterval(watch); frame.classList.add("ready"); cs.classList.add("ready"); };
  function watchFrame(){
    clearInterval(watch); const t0 = Date.now();
    watch = setInterval(() => {
      let d; try { d = frame.contentDocument; } catch (_) { return reveal(); }
      const url = frame.dataset.url || "";
      const here = d && d.location && d.location.href !== "about:blank" && d.location.href.indexOf(url.split("#")[0]) !== -1;
      if ((here && d.body && d.body.childElementCount && d.readyState !== "loading") || Date.now() - t0 > 6000) reveal();
    }, 60);
  }
  frame.addEventListener("load", () => { if (frame.dataset.url) reveal(); });
  /* start fetching a case study the moment someone shows intent (hover, focus, touch) */
  const warmed = new Set();
  const warm = el => { const u = el.getAttribute("href"); if (!u || warmed.has(u)) return; warmed.add(u);
    const l = document.createElement("link"); l.rel = "prefetch"; l.href = u; document.head.appendChild(l); };
  document.querySelectorAll("[data-case]").forEach(el => ["pointerenter", "focus", "touchstart"].forEach(ev => el.addEventListener(ev, () => warm(el), { passive: true, once: true })));
  function open(card, fromHistory){
    const url = card.getAttribute("href");
    opener = card;
    title.textContent = card.dataset.title || card.querySelector(".label span")?.textContent || "Vaka çalışması";
    frame.title = card.dataset.title ? title.textContent : title.textContent + " vaka çalışması";
    backLabel.textContent = card.dataset.back || "İşlere dön";
    if (card.dataset.download){ dl.href = url; dl.setAttribute("download", card.dataset.download); dl.hidden = false; } else dl.hidden = true;
    if (frame.dataset.url !== url){
      frame.classList.remove("ready"); cs.classList.remove("ready");
      /* swap pages with replace so the browser back button closes the viewer instead of stepping through case studies */
      if (frame.dataset.url) frame.contentWindow.location.replace(new URL(url, location.href).href); else frame.src = url;
      frame.dataset.url = url;
      watchFrame();
    }
    cs.classList.add("open");
    document.documentElement.classList.add("cs-lock");
    window.__lenis?.stop();
    /* sandboxed previews can refuse history changes; the viewer still works, just without a link of its own */
    if (!fromHistory){ try { history.pushState({ cs: card.dataset.case }, "", hashOf(card)); pushed = true; } catch (_) { pushed = false; } }
    back.focus({ preventScroll: true });
  }
  function close(){
    if (!cs.classList.contains("open")) return;
    cs.classList.remove("open");
    document.documentElement.classList.remove("cs-lock");
    window.__lenis?.start();
    opener?.focus({ preventScroll: true });
  }
  function leave(){
    if (pushed){ pushed = false; history.back(); }
    else { try { if (location.hash) history.replaceState(null, "", location.pathname + location.search); } catch (_) {} close(); }
  }
  document.querySelectorAll("[data-case]").forEach(card => card.addEventListener("click", e => {
    if (e.metaKey || e.ctrlKey || e.shiftKey || e.button !== 0) return;
    if (card.dataset.download && smallScreen()) return;
    e.preventDefault(); open(card);
  }));
  back.addEventListener("click", leave);
  document.addEventListener("keydown", e => { if (e.key === "Escape" && cs.classList.contains("open")) leave(); });
  frame.addEventListener("load", () => {
    try { frame.contentWindow.addEventListener("keydown", e => { if (e.key === "Escape") leave(); }); } catch (_) {}
  });
  window.addEventListener("popstate", () => {
    const card = fromHash();
    if (card) open(card, true); else { pushed = false; close(); }
  });
  const deep = fromHash();
  if (deep && !(deep.dataset.download && smallScreen())) open(deep, true);

  /* on phones, suggest a bigger screen once per visit */
  const notice = document.getElementById("notice");
  const seen = () => { try { return sessionStorage.getItem("pine-notice") === "1"; } catch (_) { return false; } };
  const hideNotice = () => { notice.classList.remove("show"); setTimeout(() => { notice.hidden = true; }, 600); try { sessionStorage.setItem("pine-notice", "1"); } catch (_) {} };
  /* a phone is a narrow window, or a touch screen whose short side is phone sized (some in app browsers report a wide window) */
  const isPhone = () => matchMedia("(max-width: 720px)").matches || (matchMedia("(pointer: coarse)").matches && Math.min(screen.width, screen.height) < 600);
  if (isPhone() && !seen()){
    setTimeout(() => { notice.hidden = false; requestAnimationFrame(() => requestAnimationFrame(() => notice.classList.add("show"))); }, 1200);
  }
  document.getElementById("noticeOk").addEventListener("click", hideNotice);
  document.getElementById("noticeCopy").addEventListener("click", async e => {
    const b = e.currentTarget, url = location.href.split("#")[0];
    let ok = false;
    try { await navigator.clipboard.writeText(url); ok = true; } catch (_) {
      const t = document.createElement("textarea"); t.value = url; t.setAttribute("readonly", ""); t.style.cssText = "position:fixed;opacity:0";
      document.body.appendChild(t); t.select(); try { ok = document.execCommand("copy"); } catch (_) {} t.remove();
    }
    if (ok){ b.textContent = "Bağlantı kopyalandı"; setTimeout(hideNotice, 1100); }
  });

  /* copy the email address, with a tick and a short "Copied" note */
  const copyBtn = document.getElementById("copyMail"), copyStatus = document.getElementById("copyStatus");
  let copyTimer;
  copyBtn?.addEventListener("click", async () => {
    const text = copyBtn.dataset.copy;
    let ok = false;
    try { await navigator.clipboard.writeText(text); ok = true; } catch (_) {
      const t = document.createElement("textarea"); t.value = text; t.setAttribute("readonly", ""); t.style.cssText = "position:fixed;opacity:0";
      document.body.appendChild(t); t.select(); try { ok = document.execCommand("copy"); } catch (_) {} t.remove();
    }
    if (!ok) return;
    copyBtn.classList.add("done"); copyStatus.textContent = "E-posta adresi kopyalandı";
    clearTimeout(copyTimer); copyTimer = setTimeout(() => { copyBtn.classList.remove("done"); copyStatus.textContent = ""; }, 1800);
  });
})();