/* ============================================================
   FEVER DREAM HUB — checklist board
   Tasks live in localStorage. Every completion carries a proof record:
   model, version, prompt used, documentation link, screenshot, checksum.
   ============================================================ */
(function (global) {
  'use strict';

  var FD = global.FD;
  var esc = FD.esc, $ = FD.$, $$ = FD.$$;

  var CL = global.FDChecklist = { selected: null, filter: 'open', query: '' };

  /* ------------------------------------------------------------ helpers */
  function modelOptions(selected) {
    var models = (FD.lore().models || []);
    var html = '<option value="">— choose a model —</option>';
    models.forEach(function (m) {
      html += '<option value="' + esc(m.name) + '"' + (selected === m.name ? ' selected' : '') + '>' +
        esc(m.name) + (m.primary ? ' ★' : '') + ' — ' + esc(m.vendor) + '</option>';
    });
    if (selected && !models.some(function (m) { return m.name === selected; })) {
      html += '<option value="' + esc(selected) + '" selected>' + esc(selected) + '</option>';
    }
    return html;
  }

  function defaultDocUrl(modelName) {
    var models = (FD.lore().models || []);
    for (var i = 0; i < models.length; i++) {
      if (models[i].name === modelName) return models[i].docs[0][1];
    }
    return '';
  }

  function taskGroup(t) {
    if (t.kind === 'phase') return t.group || 'Pre-production';
    if (t.kind === 'check') return 'Continuity review';
    if (t.kind === 'clip') {
      var c = t.clip;
      if (c && c.act) return 'Act ' + c.act + ' — ' + (c.actName || '');
      return 'Clips';
    }
    return 'Other';
  }

  /* ------------------------------------------------------------ render */
  CL.render = function (root) {
    var variant = FD.getState().activeVariant;
    var list = FD.buildTaskList(variant);
    var stats = FD.taskStats(list);

    var html = '';

    /* header */
    html += '<h1>Checklist &amp; Production Log</h1>';
    html += '<p class="lede">Every item below is stored in this browser\'s <code>localStorage</code>. '
      + 'Check something off and the record — model, version, documentation link, screenshot and a '
      + 'checksum fingerprint — is written to an append-only ledger so the work is provable, not just asserted.</p>';

    /* stats */
    html += '<div class="stat-row">';
    html += statTile(stats.done, 'Completed', 'green');
    html += statTile(stats.open, 'Open', 'ochre');
    html += statTile(stats.pct + '%', 'Progress', 'purple');
    html += statTile(list.filter(function (t) { return t.kind === 'clip'; }).length, 'Clip tasks', 'grey');
    html += statTile((FD.getState().ledger || []).length, 'Ledger events', 'grey');
    html += '</div>';

    /* variant switch */
    html += '<div class="toolbar" style="margin-top:16px">';
    html += '<span class="small" style="letter-spacing:.14em;text-transform:uppercase">Checklist source</span>';
    html += '<select id="cl-variant" style="width:auto;min-width:280px">';
    Object.keys(FD.VARIANT_META).forEach(function (k) {
      var m = FD.VARIANT_META[k];
      html += '<option value="' + k + '"' + (k === variant ? ' selected' : '') + '>' + esc(m.label) +
        ' · ' + m.note + '</option>';
    });
    html += '</select>';
    html += '<div class="grow"></div>';
    html += '<button class="btn" id="cl-export-json">Export JSON</button>';
    html += '<button class="btn" id="cl-export-md">Export Markdown</button>';
    html += '<button class="btn" id="cl-export-csv">Export CSV</button>';
    html += '<button class="btn" id="cl-import">Import</button>';
    html += '<button class="btn" id="cl-verify" title="Re-derive every proof checksum and cross-check it against the ledger">Verify</button>';
    html += '<input type="file" id="cl-file" accept="application/json,.json" hidden>';
    html += '</div>';
    html += '<div id="cl-verifyout"></div>';

    /* filter chips */
    html += '<div class="chipbar">';
    [['open', 'Open'], ['done', 'Completed'], ['all', 'All']].forEach(function (f) {
      html += '<button class="chip' + (CL.filter === f[0] ? ' on' : '') + '" data-filter="' + f[0] + '">' + f[1] + '</button>';
    });
    html += '<span class="chip" style="cursor:default;border-style:dashed">kind:</span>';
    [['all', 'all'], ['phase', 'phases'], ['clip', 'clips'], ['check', 'review']].forEach(function (k) {
      html += '<button class="chip' + (CL.kind === k[0] ? ' on' : '') + '" data-kind="' + k[0] + '">' + k[1] + '</button>';
    });
    html += '</div>';

    /* two columns */
    html += '<div class="tl">';
    html += '<div class="tlist" id="cl-list"></div>';
    html += '<div id="cl-proof"></div>';
    html += '</div>';

    /* ledger */
    html += '<h2>Event ledger</h2>';
    html += '<p class="small">Append-only. Every completion, update and reopen is recorded with a timestamp '
      + 'and the checksum of the proof record at that moment.</p>';
    html += '<div class="panel"><div class="ledger" id="cl-ledger"></div></div>';

    root.innerHTML = html;

    /* --- wire up --- */
    $('#cl-variant').addEventListener('change', function () {
      FD.getState().activeVariant = this.value;
      FD.save(true);
      CL.selected = null;
      CL.render(root);
    });

    $$('[data-filter]').forEach(function (b) {
      b.addEventListener('click', function () { CL.filter = b.getAttribute('data-filter'); CL.render(root); });
    });
    $$('[data-kind]').forEach(function (b) {
      b.addEventListener('click', function () { CL.kind = b.getAttribute('data-kind'); CL.render(root); });
    });

    $('#cl-export-json').addEventListener('click', function () {
      FD.download('fever-dream-ledger.json', JSON.stringify(FD.exportState(), null, 2), 'application/json');
      FD.toast('Ledger exported as JSON.');
    });
    $('#cl-export-md').addEventListener('click', function () {
      FD.download('fever-dream-ledger.md', FD.exportMarkdown(), 'text/markdown');
      FD.toast('Ledger exported as Markdown.');
    });
    $('#cl-export-csv').addEventListener('click', function () {
      FD.download('fever-dream-ledger.csv', FD.exportCSV(), 'text/csv');
      FD.toast('Ledger exported as CSV.');
    });
    $('#cl-import').addEventListener('click', function () { $('#cl-file').click(); });
    $('#cl-verify').addEventListener('click', function () {
      var v = FD.verify();
      var out = $('#cl-verifyout');
      var html = '<div class="note' + (v.verified ? '' : ' red') + '" style="margin-top:12px">';
      if (v.checked === 0) {
        html += '<b>Nothing to verify yet.</b> Complete a task with proof and the record becomes verifiable.';
      } else if (v.verified) {
        html += '<b>Verified — ' + v.ok + ' of ' + v.checked + ' proof records check out.</b> ' +
          'Every checksum was re-derived from the stored proof fields and matched against the ledger entry ' +
          'written when the task was completed. ' + v.ledgerEntries + ' ledger events were cross-checked.';
      } else {
        html += '<b>Integrity problems found.</b> ' +
          (v.tampered.length ? v.tampered.length + ' record(s) whose checksum no longer matches their contents: ' +
            v.tampered.map(function (t) { return '<code>' + FD.esc(t.id) + '</code>'; }).join(', ') + '. ' : '') +
          (v.missing.length ? v.missing.length + ' completed record(s) with no ledger entry: ' +
            v.missing.map(function (t) { return '<code>' + FD.esc(t) + '</code>'; }).join(', ') + '. ' : '') +
          (v.orphaned.length ? v.orphaned.length + ' ledger entr(y/ies) with no completed record: ' +
            v.orphaned.map(function (t) { return '<code>' + FD.esc(t) + '</code>'; }).join(', ') + '. ' : '');
      }
      html += '</div>';
      out.innerHTML = html;
      FD.toast(v.checked === 0 ? 'No proof records to verify yet.'
        : v.verified ? 'Verified ' + v.ok + ' of ' + v.checked + ' records.'
        : 'Integrity problems found.', !v.verified && v.checked > 0);
    });
    $('#cl-file').addEventListener('change', function () {
      var f = this.files && this.files[0];
      if (!f) return;
      var reader = new FileReader();
      reader.onload = function () {
        try {
          FD.importState(JSON.parse(reader.result), true);
          FD.toast('Imported and merged.');
          CL.render(root);
        } catch (e) { FD.toast('Could not read that file: ' + e.message, true); }
      };
      reader.readAsText(f);
      this.value = '';
    });

    CL.renderList($('#cl-list'), list);
    CL.renderProof($('#cl-proof'), list);
    CL.renderLedger($('#cl-ledger'));
  };

  function statTile(n, label, tone) {
    var color = tone === 'green' ? 'var(--green-2)' : tone === 'ochre' ? 'var(--ochre-2)' :
      tone === 'purple' ? 'var(--purple-2)' : 'var(--ink)';
    return '<div class="stat"><div class="n" style="color:' + color + '">' + n + '</div>' +
      '<div class="l">' + esc(label) + '</div></div>';
  }

  /* ------------------------------------------------------------ list */
  CL.renderList = function (host, list) {
    if (!host) return;
    /* always rebuild from live state so proof records are never stale */
    list = FD.buildTaskList();
    var f = CL.filter, k = CL.kind || 'all';
    var shown = list.filter(function (t) {
      if (f === 'open' && t.done) return false;
      if (f === 'done' && !t.done) return false;
      if (k === 'phase' && t.kind !== 'phase') return false;
      if (k === 'clip' && t.kind !== 'clip') return false;
      if (k === 'check' && t.kind !== 'check') return false;
      return true;
    });

    var groups = {}, order = [];
    shown.forEach(function (t) {
      var g = taskGroup(t);
      if (!groups[g]) { groups[g] = []; order.push(g); }
      groups[g].push(t);
    });

    if (!shown.length) {
      host.innerHTML = '<div class="panel"><p class="muted" style="margin:0">Nothing here under this filter.</p></div>';
      return;
    }

    var html = '';
    order.forEach(function (g) {
      var items = groups[g];
      var done = items.filter(function (t) { return t.done; }).length;
      html += '<div class="tgroup">';
      html += '<div class="gh"><span>' + esc(g) + '</span><span class="c">' + done + ' / ' + items.length + '</span></div>';
      items.forEach(function (t) {
        html += '<div class="titem' + (t.done ? ' done' : '') + (CL.selected === t.key ? ' sel' : '') +
          '" data-key="' + esc(t.key) + '">';
        html += '<div class="tick">' + (t.done ? '✓' : '') + '</div>';
        html += '<div class="tlabel">' + esc(t.title);
        if (t.sub) html += '<span class="sub">' + esc(t.sub) + '</span>';
        if (t.done) {
          html += '<span class="tmeta">' + esc(FD.fmtTime(t.doneAt)) + ' · <span class="tmodel">' +
            esc(t.model || 'no model recorded') + '</span>' +
            (t.docUrl ? ' · doc ✓' : '') + (t.shotUrl || t.shotId ? ' · shot ✓' : '') + '</span>';
        }
        html += '</div></div>';
      });
      html += '</div>';
    });
    host.innerHTML = html;

    $$('.titem', host).forEach(function (n) {
      n.addEventListener('click', function () {
        CL.selected = n.getAttribute('data-key');
        CL.renderList(host, list);
        CL.renderProof($('#cl-proof'), list);
        var p = $('#cl-proof');
        if (p) p.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
      });
    });
  };

  /* ------------------------------------------------------------ proof panel */
  CL.renderProof = function (host, list) {
    if (!host) return;
    var key = CL.selected;
    var list2 = FD.buildTaskList();
    var t = key ? list2.filter(function (x) { return x.key === key; })[0] : null;

    if (!t) {
      var open = FD.nextTasks(1);
      host.innerHTML = '<div class="proof">' +
        '<h4>Proof of work</h4>' +
        '<p class="small">Select any item on the left to record how it was produced. ' +
        'Each completion stores the model, the version, the prompt you actually sent, a documentation link, ' +
        'a screenshot and a checksum fingerprint — all in <code>localStorage</code>.</p>' +
        (open.length ? '<div class="proof-block"><div class="t">Next up</div>' +
          '<div class="mono" style="font-size:12px;color:var(--ink)">' + esc(open[0].title) + '</div>' +
          '<div class="small">' + esc(open[0].group) + (open[0].sub ? ' · ' + esc(open[0].sub) : '') + '</div>' +
          '<button class="btn btn-primary btn-tiny" style="margin-top:8px" id="cl-pick-next">Select it</button></div>' : '') +
        '</div>';
      var btn = $('#cl-pick-next');
      if (btn) btn.addEventListener('click', function () {
        CL.selected = open[0].key;
        CL.renderList($('#cl-list'), list2);
        CL.renderProof(host, list2);
      });
      return;
    }

    var clip = t.clip || null;
    var isClip = t.kind === 'clip';

    var html = '<div class="proof">';
    html += '<h4>' + esc(t.title) + '</h4>';
    html += '<div class="pid">' + esc(t.key) + (t.group ? ' · ' + esc(t.group) : '') + '</div>';

    if (t.sub) html += '<p class="small" style="margin:0 0 10px">' + esc(t.sub) + '</p>';

    /* the source prompt, so the agent can copy it straight into a generation call */
    if (isClip && clip) {
      html += '<div class="proof-block"><div class="t">Source prompt (from the PDF)</div>';
      html += '<div class="fieldbox"><div class="fv mono" style="font-size:11.5px">' + esc(clip.prompt) + '</div></div>';
      html += '<button class="btn btn-tiny" id="cl-copy-src">Copy source prompt</button> ';
      html += '<button class="btn btn-tiny" id="cl-copy-full">Copy as JSON</button>';
      html += '</div>';
    } else if (t.kind === 'phase') {
      html += '<div class="proof-block"><div class="t">What this step requires</div>';
      html += '<div class="fieldbox"><div class="fv" style="font-size:12px">' + esc(t.sub) + '</div></div></div>';
    }

    /* --- proof fields --- */
    html += '<div class="proof-block"><div class="t">Proof of work</div>';

    html += '<div class="field-row">';
    html += '<label class="fld"><span class="lab">Model</span><select id="pf-model">' + modelOptions(t.model) + '</select></label>';
    html += '<label class="fld"><span class="lab">Model version / ID</span><input type="text" id="pf-version" placeholder="e.g. doubao-seedance-2-5-260628" value="' + esc(t.modelVersion) + '"></label>';
    html += '</div>';

    html += '<label class="fld"><span class="lab">Prompt actually sent</span>';
    html += '<textarea id="pf-prompt" rows="4" placeholder="The exact prompt you sent to the model">' + esc(t.promptUsed) + '</textarea></label>';

    html += '<label class="fld"><span class="lab">Documentation link</span>';
    html += '<input type="url" id="pf-doc" placeholder="https://…" value="' + esc(t.docUrl) + '"></label>';

    html += '<label class="fld"><span class="lab">Screenshot / output link</span>';
    html += '<input type="url" id="pf-shot" placeholder="https://… (a URL is the most portable proof)" value="' + esc(t.shotUrl) + '"></label>';

    html += '<label class="fld"><span class="lab">Or attach a screenshot file</span>';
    html += '<input type="file" id="pf-file" accept="image/*"><span class="small" id="pf-filestat"></span></label>';

    html += '<label class="fld"><span class="lab">Notes</span>';
    html += '<textarea id="pf-notes" rows="2" placeholder="Seed, resolution, what you changed, why it passed.">' + esc(t.notes) + '</textarea></label>';

    html += '<div style="display:flex;gap:8px;flex-wrap:wrap;margin-top:4px">';
    if (t.done) {
      html += '<button class="btn btn-primary" id="pf-done">✓ Completed — update record</button>';
      html += '<button class="btn btn-danger" id="pf-reopen">Reopen</button>';
    } else {
      html += '<button class="btn btn-primary" id="pf-done">Mark complete</button>';
    }
    html += '<button class="btn" id="pf-lint">Lint prompt</button>';
    html += '</div>';

    if (t.done) {
      html += '<div class="proof-block"><div class="t">Record</div>';
      html += '<dl class="kv" style="margin:0">';
      html += '<dt>Completed</dt><dd>' + esc(FD.fmtTime(t.doneAt)) + '</dd>';
      html += '<dt>Updated</dt><dd>' + esc(FD.fmtTime(t.updatedAt)) + '</dd>';
      html += '<dt>Checksum</dt><dd class="checksum">' + esc(t.checksum) + '</dd>';
      if (t.shotBytes) html += '<dt>Stored shot</dt><dd>' + (t.shotBytes / 1024).toFixed(1) + ' KB (local)</dd>';
      html += '</dl>';
      html += '<div id="pf-shotview"></div>';
      html += '</div>';
    }
    html += '</div>';
    html += '</div>';

    host.innerHTML = html;

    /* --- wire up --- */
    var modelSel = $('#pf-model');
    modelSel.addEventListener('change', function () {
      var url = $('#pf-doc');
      if (!url.value.trim()) {
        var d = defaultDocUrl(this.value);
        if (d) url.value = d;
      }
      FD.updateTask(t.key, { model: this.value });
      CL.renderProof(host, list2);
    });
    $('#pf-version').addEventListener('change', function () { FD.updateTask(t.key, { modelVersion: this.value }); });
    $('#pf-prompt').addEventListener('change', function () { FD.updateTask(t.key, { promptUsed: this.value }); });
    $('#pf-doc').addEventListener('change', function () { FD.updateTask(t.key, { docUrl: this.value }); });
    $('#pf-shot').addEventListener('change', function () { FD.updateTask(t.key, { shotUrl: this.value }); });
    $('#pf-notes').addEventListener('change', function () { FD.updateTask(t.key, { notes: this.value }); });

    var file = $('#pf-file');
    file.addEventListener('change', function () {
      var f = this.files && this.files[0];
      if (!f) return;
      FD.compressImage(f, 900, 0.72).then(function (out) {
        return FD.putShot(t.key, out.dataUrl).then(function () {
          FD.updateTask(t.key, { shotId: t.key, shotBytes: out.bytes });
          FD.logEvent('screenshot', t.key, { summary: 'Stored screenshot (' + out.w + '×' + out.h + ', ' +
            Math.round(out.bytes / 1024) + ' KB)' });
          FD.toast('Screenshot stored locally.');
          CL.renderProof(host, list2);
        });
      }).catch(function (e) { FD.toast(e.message || 'Could not store that image.', true); });
    });

    $('#pf-done').addEventListener('click', function () {
      var shot = $('#pf-shot').value;
      FD.complete(t.key, {
        model: $('#pf-model').value,
        modelVersion: $('#pf-version').value,
        promptUsed: $('#pf-prompt').value,
        docUrl: $('#pf-doc').value,
        shotUrl: shot,
        notes: $('#pf-notes').value
      });
      FD.toast('Recorded. Checksum ' + (FD.getTask(t.key) || {}).checksum);
      CL.renderList($('#cl-list'), list2);
      CL.renderProof(host, list2);
      CL.renderLedger($('#cl-ledger'));
      FD.emit();
    });

    var reopen = $('#pf-reopen');
    if (reopen) reopen.addEventListener('click', function () {
      FD.uncomplete(t.key);
      FD.toast('Reopened.');
      CL.renderList($('#cl-list'), list2);
      CL.renderProof(host, list2);
      CL.renderLedger($('#cl-ledger'));
      FD.emit();
    });

    $('#pf-lint').addEventListener('click', function () {
      var text = $('#pf-prompt').value;
      if (!text.trim() && clip) text = clip.prompt;
      var res = FD.lint(text, { variant: clip ? clip.variant : null, clipNumber: clip ? clip.n : null });
      var msg = res.verdict === 'pass' ? 'Prompt passes all directives.' :
        res.verdict === 'warn' ? res.score.warn + ' warning(s), ' + res.score.fail + ' failure(s).' :
        res.score.fail + ' failure(s) — ' + (res.issues.filter(function (i) { return i.level === 'fail'; })
          .map(function (i) { return i.title; }).join('; '));
      FD.toast(msg, res.verdict === 'fail');
    });

    var cs = $('#cl-copy-src');
    if (cs) cs.addEventListener('click', function () {
      FD.copy(clip.prompt);
      FD.toast('Source prompt copied.');
    });
    var cj = $('#cl-copy-full');
    if (cj) cj.addEventListener('click', function () {
      FD.copy(JSON.stringify(clip, null, 2));
      FD.toast('Clip record copied as JSON.');
    });

    /* show a stored screenshot */
    var sv = $('#pf-shotview');
    if (sv && t.shotId) {
      FD.getShot(t.shotId).then(function (dataUrl) {
        if (dataUrl) sv.innerHTML = '<div class="t" style="font-size:9.5px;letter-spacing:.14em;text-transform:uppercase;color:var(--muted);margin-top:10px">Stored screenshot</div><img class="shot" src="' + dataUrl + '" alt="Stored proof screenshot">';
      }).catch(function () {});
    }
  };

  /* ------------------------------------------------------------ ledger */
  CL.renderLedger = function (host) {
    if (!host) return;
    var ev = (FD.getState().ledger || []).slice().reverse();
    if (!ev.length) {
      host.innerHTML = '<p class="muted" style="margin:0">No events yet. Complete a task and it lands here.</p>';
      return;
    }
    var html = '';
    ev.slice(0, 300).forEach(function (e) {
      html += '<div class="ev"><div class="t">' + esc(FD.fmtTime(e.ts)) + '</div><div class="b">';
      html += '<b>' + esc(e.type) + '</b> ' + esc(e.taskId || '');
      if (e.summary) html += ' — ' + esc(e.summary);
      if (e.model) html += ' <span class="tmodel">(' + esc(e.model) + (e.modelVersion ? ' ' + esc(e.modelVersion) : '') + ')</span>';
      if (e.docUrl) html += ' <a href="' + esc(e.docUrl) + '" target="_blank" rel="noopener">doc</a>';
      if (e.shotUrl) html += ' <a href="' + esc(e.shotUrl) + '" target="_blank" rel="noopener">shot</a>';
      if (e.checksum) html += ' <span class="checksum">' + esc(e.checksum) + '</span>';
      html += '</div></div>';
    });
    host.innerHTML = html;
  };

  /* copy helper used above */
  FD.copy = function (text) {
    try {
      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(text);
        return;
      }
    } catch (e) {}
    var ta = document.createElement('textarea');
    ta.value = text;
    ta.style.position = 'fixed';
    ta.style.opacity = '0';
    document.body.appendChild(ta);
    ta.select();
    try { document.execCommand('copy'); } catch (e) {}
    document.body.removeChild(ta);
  };

})(window);
