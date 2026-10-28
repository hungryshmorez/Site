/* ============================================================
   FEVER DREAM HUB — router & boot
   ============================================================ */
(function (global) {
  'use strict';

  var FD = global.FD;
  var $ = FD.$, $$ = FD.$$;

  var VIEWS = ['start', 'bible', 'clips', 'checklist', 'lint', 'models', 'sources', 'protocol'];
  var current = null;

  function viewFromHash() {
    var h = (location.hash || '').replace(/^#\/?/, '').split('?')[0];
    return VIEWS.indexOf(h) >= 0 ? h : 'start';
  }

  function render() {
    var v = viewFromHash();
    current = v;
    var root = $('#content');

    $$('.nav-item').forEach(function (n) {
      n.classList.toggle('active', n.getAttribute('data-view') === v);
    });

    root.scrollTop = 0;
    try {
      if (v === 'checklist') global.FDChecklist.render(root);
      else global.FDViews[v](root);
    } catch (e) {
      console.error(e);
      root.innerHTML = '<div class="note red"><b>View error:</b> ' + FD.esc(e.message) +
        '<br><span class="small">The rest of the site still works. Open the console for the stack trace.</span></div>';
    }
    updateChrome();
  }

  global.FDNav = function (v) {
    if (VIEWS.indexOf(v) < 0) v = 'start';
    location.hash = '#/' + v;
    render();
  };

  function updateChrome() {
    var st = FD.getState();
    var list = FD.buildTaskList(st.activeVariant);
    var stats = FD.taskStats(list);

    var c = 113.097; // 2*PI*18
    var ring = $('#ring-fg');
    if (ring) ring.style.strokeDashoffset = String(c - (c * stats.pct / 100));
    var rl = $('#ring-label'); if (rl) rl.textContent = stats.pct + '%';
    var sd = $('#stat-done'); if (sd) sd.textContent = stats.done;
    var so = $('#stat-open'); if (so) so.textContent = stats.open;
    var sc = $('#storage-count'); if (sc) sc.textContent = Object.keys(st.tasks || {}).length;

    var bv = $('#brand-variant');
    if (bv) bv.textContent = (FD.VARIANT_META[st.activeVariant] || {}).label || st.activeVariant;
  }

  function boot() {
    FD.reload();

    /* nav */
    $$('.nav-item').forEach(function (n) {
      n.addEventListener('click', function (e) {
        e.preventDefault();
        global.FDNav(n.getAttribute('data-view'));
      });
    });

    /* topbar buttons */
    $('#btn-protocol').addEventListener('click', function () { global.FDNav('protocol'); });
    $('#btn-export').addEventListener('click', function () {
      var json = JSON.stringify(FD.exportState(), null, 2);
      var md = FD.exportMarkdown();
      FD.download('fever-dream-ledger.json', json, 'application/json');
      setTimeout(function () { FD.download('fever-dream-ledger.md', md, 'text/markdown'); }, 400);
      FD.toast('Ledger exported (JSON + Markdown).');
    });
    $('#btn-reset').addEventListener('click', function () {
      if (!confirm('Clear every checklist record, screenshot and ledger event stored in this browser?\n\nThis cannot be undone.')) return;
      FD.resetAll();
      global.FDChecklist.selected = null;
      FD.toast('All state cleared.');
      render();
    });

    /* drawer */
    $('#drawer-close').addEventListener('click', global.FDViews.closeDrawer);
    $('#drawer-scrim').addEventListener('click', global.FDViews.closeDrawer);
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') global.FDViews.closeDrawer();
    });

    /* route changes */
    global.addEventListener('hashchange', render);

    /* load the active variant then render */
    var st = FD.getState();
    var variant = st.activeVariant || 'clips228';
    FD.loadVariant(variant).then(function () {
      st.activeVariant = variant;
      render();
    }).catch(function (e) {
      $('#content').innerHTML = '<div class="note red"><b>Could not load the clip data:</b> ' +
        FD.esc(e.message) + '</div>';
    });

    /* keep the chrome in sync with state changes */
    FD.subscribe(updateChrome);
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', boot);
  else boot();

})(window);
