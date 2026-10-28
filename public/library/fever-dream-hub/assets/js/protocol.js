window.FD_PROTOCOL = {
  body: "# FEVER DREAM \u2014 Agent Protocol\n\nYou are working on **Fever Dream**, a dual-track experimental film: 228 consecutive\n15-second generations (57:00) interleaving two comatose patients' separate journeys\nthrough a shared trauma, conjoining at the end. This site is the complete production\ncontext. You do not need the source PDFs \u2014 everything is parsed and searchable here.\n\n---\n\n## 1. The fastest way to start\n\n1. Open **Start Here** \u2014 read the premise, then open **Next up**.\n2. Open **Master Bible** \u2014 lock the premise, both continuity locks, the carried relics\n   and the five surgical directives.\n3. Open **Checklist & Log** \u2014 the first open task is a reference sheet, not a clip.\n   Do the pre-production work first; every clip inherits the look you lock there.\n4. For each clip task: copy the source prompt, generate, then fill in the proof record\n   and press **Mark complete**.\n\n## 2. Where everything is\n\n| What | Where |\n|---|---|\n| Every generation, every script | **Clip Board** (9 scripts, search + filters) |\n| Premise, continuity locks, relics, directives | **Master Bible** |\n| Task board + proof records + ledger | **Checklist & Log** |\n| Pre-send validation of a prompt | **Prompt Lint** |\n| Model choices and their documentation | **Models & Docs** |\n| The seven source PDFs and what is in them | **Sources** |\n\nRaw machine-readable data is also served as plain JavaScript globals:\n\n- `window.FD_LORE` \u2014 documents, characters, relics, directives, acts, phases, checks, models\n- `window.FD_VARIANTS[\"<variant>\"]` \u2014 the clip array for that script\n\nVariants: `clips228` (flagship, 228), `bible_boy`, `bible_girl`, `bible_conjoined`,\n`plan`, `boy`, `girl`, `conjoined`, `original`.\n\nEach clip record:\n\n```json\n{\n  \"id\": \"clips228-001\",\n  \"variant\": \"clips228\",\n  \"n\": 1,\n  \"seq\": 1,\n  \"start\": 0, \"end\": 15,\n  \"timecode\": \"00:00-00:15\",\n  \"track\": \"boy\",\n  \"act\": \"I\",\n  \"actName\": \"The Parallel Awakening\",\n  \"beat\": \"The Synaptic Eyelid\",\n  \"setting\": \"Sepia Void / Dune Interface\",\n  \"camera\": \"100mm Macro Close-Up\",\n  \"prompt\": \"\u2026the Visual Generation Prompt\u2026\",\n  \"action\": \"00-05s: \u2026\",\n  \"audio\": \"\u2026\",\n  \"subtext\": \"\u2026\"\n}\n```\n\n## 3. Task ids\n\nTask ids are stable strings. Use them verbatim.\n\n| Kind | Pattern | Example |\n|---|---|---|\n| Pre-production / delivery phase | `phase:<slug>` | `phase:refs-boy` |\n| Clip | `clip:<variant>:<clipId>` | `clip:clips228:clips228-001` |\n| Continuity review question | `check:<slug>` | `check:continuity-persist` |\n\n## 4. Proof records \u2014 what \"done\" means\n\nA task is only done when its proof record is filled in. The record is stored under\n`localStorage[\"feverdream.production.v1\"].tasks[<task id>]`:\n\n```json\n{\n  \"id\": \"clip:clips228:clips228-001\",\n  \"done\": true,\n  \"doneAt\": \"2026-10-28T15:40:00.000Z\",\n  \"model\": \"Seedance 2.5\",\n  \"modelVersion\": \"doubao-seedance-2-5-260628\",\n  \"promptUsed\": \"the exact prompt you sent\",\n  \"docUrl\": \"https://\u2026documentation for the model\u2026\",\n  \"shotUrl\": \"https://\u2026the generated clip or a screenshot\u2026\",\n  \"notes\": \"seed, resolution, what you changed, why it passed\",\n  \"shotId\": \"clip:clips228:clips228-001\",\n  \"shotBytes\": 51230,\n  \"checksum\": \"a1b2c3d4\",\n  \"updatedAt\": \"2026-10-28T15:40:00.000Z\"\n}\n```\n\n`checksum` is an FNV-1a fingerprint over the proof fields. It is regenerated on every\nwrite, so a record that has been altered since it was written will not match its\nearlier ledger entry. Attach the documentation link and a screenshot link (or attach the\nimage itself \u2014 it is stored locally and rendered in the proof panel) so a third party can\nverify the work.\n\n## 5. Writing to the checklist from an agent\n\n### In the browser (Playwright, a browser-driving agent, the console)\n\n```js\n// mark a clip complete with proof\nFD.complete(\"clip:clips228:clips228-001\", {\n  model: \"Seedance 2.5\",\n  modelVersion: \"doubao-seedance-2-5-260628\",\n  promptUsed: \"\u2026\",\n  docUrl: \"https://seed.bytedance.com/en/seedance2_5\",\n  shotUrl: \"https://\u2026\",\n  notes: \"seed 42, 1080p, one take\"\n});\n\n// what to do next\nFD.nextTasks(1);                       // [{ key, title, group, \u2026 }]\nFD.buildTaskList(\"clips228\");          // the whole board with proof merged in\nFD.getTask(\"clip:clips228:clips228-001\");\n\n// read and write state\nFD.getState();\nFD.exportState();                      // JSON\nFD.exportMarkdown();                   // human-readable proof report\nFD.exportCSV();\nFD.importState(obj, /* merge */ true);\nFD.verify();                           // re-derive every checksum + cross-check the ledger\n\n// lint a prompt before you spend a generation\nFD.lint(text, { variant: \"clips228\", clipNumber: 45 });\n\n// the clip itself\nFD.clipById(\"clips228\", \"clips228-001\");\n```\n\n### Outside the browser\n\nThe checklist is `localStorage`, so a non-browser agent cannot write to it directly.\nUse one of these instead:\n\n- **Drive the page.** Load this site in a browser, run the `FD.*` calls above with\n  `page.evaluate`, then read back `FD.exportState()`.\n- **Export and import.** Export the ledger JSON from the Checklist view, edit it, and\n  import it back (import merges by task id and keeps the newer `done` record).\n- **Use the files directly.** The clip data is plain JSON inside the data files; parse\n  it yourself, produce your own ledger in the same shape, and import it.\n\n## 6. Rules you must not break\n\nThese come from the source documents, not from this site. The Prompt Lint panel enforces\nthe first two automatically.\n\n1. **AI-Tell Absolute Ban.** Never use: *testament, beacon, symphony, labyrinthine,\n   tapestry, delve, navigate, palpable*. Any sentence harboring one of these is\n   incinerated.\n2. **Sensory Filter Stripping.** Never use: *felt, saw, heard, noticed, watched,\n   realized*. The camera never observes passive perception \u2014 stimuli hit the meat\n   directly.\n3. **Messy Biological Realism.** Every action beat carries clumsiness, exhaustion,\n   coughing spasms, torn cuticles, slipping on greasy tile, dragging numb limbs.\n4. **Hospital Grounding Protocol.** Every biome maps to a failing physiological system\n   (checkerboard desert/bone spire \u2192 skeletal stiffness and neurological shock;\n   flesh forests/dialysis channels \u2192 renal failure and vascular constriction;\n   crumbling monuments \u2192 ventricular fibrillation and cardiac storm). Figments are\n   anatomical amalgamations of medical hardware welded to traumatic memory, never\n   abstract monsters.\n5. **Strict Generation Cadence.** Exactly 15 seconds per generation, one discrete\n   cinematic take: locked focal length, clear optical physics, spatial blocking, audio cue.\n6. **Continuity.** The coat, injuries, carried objects and fatigue persist clip to clip.\n   Relics appear only after they are acquired \u2014 the cup from generation 23, the mirror\n   from 45, the key from 65. Screen direction, light direction and physical position\n   are preserved across cuts.\n7. **Texture.** If a clip looks too polished, too colourful or too clean, regenerate it.\n   Zero sterile CGI. Distressed 35mm/VHS grain, gate weave, soft focus edges, tactile grime.\n8. **No tidy cure.** The ending stays deliberately unresolved. No explanatory\n   voice-over, no grand awakening, no monster fight.\n\n## 7. Source defects \u2014 do not \"fix\" these\n\nThe Girl's solo script (and the original plan it descends from) mislabels its\ngeneration numbers: **031 and 091 are each labelled twice, and 068 is skipped**. The\nBoy's solo script is clean. This site keeps every entry's true sequence position and\nflags the two duplicated ones with an `anomaly` field.\n\nThe 228-clip flagship inherits the same defect: its girl clips are labelled\n`Memory Generation <NNN> Adaptation`, where `NNN` is the Girl script's own printed\nnumber. Aligning the two scripts by that printed label lines up only 54 of 102 clips.\nAligning by **true sequence position** lines up 102 of 102, one for one and in order \u2014\nthe flagship reuses the Girl script's first 102 generations and folds her remaining\ntwelve into the shared climax at clips 205\u2013228. Every such clip carries a `srcRef`\nfield naming the correct Girl script entry.\n\n**Use `seq`, not the source number `n`.** If you renumber by the printed labels you will\nshift 112 generations by one.\n\n## 8. Storage keys\n\n| Key | Contents |\n|---|---|\n| `feverdream.production.v1` | `{ version, createdAt, updatedAt, activeVariant, tasks, ledger, settings }` |\n| `feverdream.shots.v1` | Fallback screenshot storage (data URLs) when IndexedDB is unavailable |\n\nScreenshots are stored in IndexedDB under database `feverdream-shots`, object store\n`shots`, keyed by task id. The `shotBytes` and `checksum` fields in the task record\nreference them.\n\n`ledger` is append-only: `{ ts, type, taskId, model, modelVersion, docUrl, shotUrl,\nchecksum, summary }`. Types seen so far: `completed`, `updated`, `reopened`,\n`screenshot`, `imported`, `reset`.\n\nTo prove the records are genuine, call `FD.verify()`. It re-derives the checksum from\neach stored proof record and matches it against the ledger entry written when the task\nwas completed. It returns `{ checked, ok, tampered[], missing[], orphaned[],\nledgerEntries, verified }`. A record edited after it was written will not match its\nearlier ledger entry, and `verified` will be false.\n\n## 9. Export formats\n\n- **JSON** \u2014 the complete state, re-importable.\n- **Markdown** \u2014 a finished proof report: every completed task with model, version,\n  documentation link, screenshot link, timestamp and checksum, plus the open items and\n  the full event ledger.\n- **CSV** \u2014 one row per task, for spreadsheets.\n\nCommit the exported ledger next to the rendered clips. It is the record that the work\nwas actually done, not just that it was claimed.\n",
  schema: {
  "project": "Fever Dream",
  "taskIdPatterns": {
    "phase": "phase:<slug>",
    "clip": "clip:<variant>:<clipId>",
    "check": "check:<slug>"
  },
  "state": {
    "key": "feverdream.production.v1",
    "shape": {
      "version": "int",
      "createdAt": "iso8601",
      "updatedAt": "iso8601",
      "activeVariant": "string",
      "tasks": "{ taskId: TaskRecord }",
      "ledger": "[ LedgerEvent ]",
      "settings": "object"
    }
  },
  "TaskRecord": {
    "id": "string",
    "done": "boolean",
    "doneAt": "iso8601|null",
    "model": "string",
    "modelVersion": "string",
    "promptUsed": "string",
    "docUrl": "string",
    "shotUrl": "string",
    "notes": "string",
    "shotId": "string",
    "shotBytes": "int",
    "checksum": "8-hex string, FNV-1a over the proof fields",
    "updatedAt": "iso8601"
  },
  "LedgerEvent": {
    "ts": "iso8601",
    "type": "completed|updated|reopened|screenshot|imported|reset",
    "taskId": "string|null",
    "model": "string?",
    "modelVersion": "string?",
    "docUrl": "string?",
    "shotUrl": "string?",
    "checksum": "string?",
    "summary": "string?"
  },
  "variants": {
    "clips228": 228,
    "bible_boy": 114,
    "bible_girl": 114,
    "bible_conjoined": 114,
    "plan": 114,
    "boy": 114,
    "girl": 114,
    "conjoined": 114,
    "original": 114
  },
  "browserApi": {
    "FD.complete(taskId, proof)": "mark done and write a proof record",
    "FD.uncomplete(taskId)": "reopen a task",
    "FD.updateTask(taskId, patch)": "edit proof fields",
    "FD.getTask(taskId)": "read one record",
    "FD.buildTaskList(variant)": "the whole board with proof merged in",
    "FD.nextTasks(limit, variant)": "what to work on next, in order",
    "FD.exportState()": "JSON of the whole state",
    "FD.exportMarkdown()": "proof report",
    "FD.exportCSV()": "spreadsheet rows",
    "FD.importState(obj, merge)": "merge an external ledger",
    "FD.verify()": "re-derive every proof checksum and cross-check it against the ledger",
    "FD.lint(text, opts)": "validate a prompt against the directives",
    "FD.clipById(variant, id)": "one clip record",
    "FD.getState()": "the live state object"
  },
  "sourceAnomalies": {
    "girl": "generation numbers 031 and 091 are labelled twice; 068 is skipped",
    "original": "generation numbers 031 and 091 are labelled twice; 068 is skipped",
    "bible_girl": "generation numbers 031 and 091 are labelled twice; 068 is skipped",
    "advice": "use `seq`, not the source `n`"
  }
}
};
