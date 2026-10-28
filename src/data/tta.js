// ── EVERY VIDEO ON THE MAIN PAGE (itsthat.site — That Time Again Studios) ─────
// Pulled from the episode list on the main page (source: hungryshmorez/notmyspace,
// that-time-again-studios). Each is a direct .mp4; w/h are the real frame size, which
// decides the theater: taller than wide → NEW MOBILE THEATER (9×16), otherwise → 16×9.
// To add one: append { title, src, w, h, note } — the lobby re-sorts them.

export const TTA = [
  { title: 'S1 E1 · Pilot', src: 'https://d2a132qjpri1we.cloudfront.net/episodes/6016df4d-ab12-40f0-8bd1-776acf16f83d/d9038ac1-b01a-4bb4-90fd-d3b1216bd2b1/d3975f6b-55d9-4dbe-8fd0-21d9f7afbe93/mp4/d9038ac1-b01a-4bb4-90fd-d3b1216bd2b1_avc_360p.mp4', w: 640, h: 360, note: '1:01:24' },
  { title: 'S1 E2 · The Prompt That Ate the Show.', src: 'https://d2a132qjpri1we.cloudfront.net/episodes/6016df4d-ab12-40f0-8bd1-776acf16f83d/315acb46-c373-42d9-b774-3e5b77f82c68/5c1a7811-838e-4f68-9990-0293343ad63f/mp4/315acb46-c373-42d9-b774-3e5b77f82c68_avc_360p.mp4', w: 640, h: 360, note: '16:21' },
  { title: 'S1 E3 · What is that time again?', src: 'https://d2a132qjpri1we.cloudfront.net/episodes/6016df4d-ab12-40f0-8bd1-776acf16f83d/27f9eabd-090d-47ba-adca-677f9bc88ff7/30261216-c5fc-4e50-a8ca-bb688d4af50f/mp4/27f9eabd-090d-47ba-adca-677f9bc88ff7_avc_720p.mp4', w: 1280, h: 720, note: '9:29' },
  { title: 'S1 E4 · GTA6 the first look', src: 'https://d2a132qjpri1we.cloudfront.net/episodes/6016df4d-ab12-40f0-8bd1-776acf16f83d/ae7145d5-2021-4ad4-83ff-4e136265824f/b4c946b7-5d22-4314-a146-ee52293fcfb5/mp4/ae7145d5-2021-4ad4-83ff-4e136265824f_avc_1080p.mp4', w: 1920, h: 1080, note: '5:24' },
  { title: 'S1 E5 · A Living Hell', src: 'https://d2a132qjpri1we.cloudfront.net/episodes/6016df4d-ab12-40f0-8bd1-776acf16f83d/da600340-7d33-44bb-b585-e6622c57e5b4/f8d324aa-cf84-42ae-9144-5b0f9712c176/mp4/da600340-7d33-44bb-b585-e6622c57e5b4_avc_1080p.mp4', w: 1920, h: 1080, note: '7:28' },
  { title: 'S1 E6 · Overstimulated at Ollie\'s', src: 'https://d2a132qjpri1we.cloudfront.net/episodes/6016df4d-ab12-40f0-8bd1-776acf16f83d/c0794d19-fee6-434a-9088-85c0a4b544c9/68951aea-f8e5-4159-a6a6-f01dedd20b07/mp4/c0794d19-fee6-434a-9088-85c0a4b544c9_avc_1080p.mp4', w: 1920, h: 1080, note: '10:27' },
  { title: 'S1 E7 · What is this ai Sloppy?', src: 'https://d2a132qjpri1we.cloudfront.net/episodes/6016df4d-ab12-40f0-8bd1-776acf16f83d/f33f5c15-a504-4b33-8032-9a908f2cc01a/7117a4a6-3244-465e-b594-483d0970c1ea/mp4/f33f5c15-a504-4b33-8032-9a908f2cc01a_avc_1080p.mp4', w: 1920, h: 1080, note: '11:15' },
  { title: 'S1 E8 · hallucination station', src: 'https://d2a132qjpri1we.cloudfront.net/episodes/6016df4d-ab12-40f0-8bd1-776acf16f83d/7b819345-838e-4084-b365-b1cfb8b00761/32bfc307-d887-4bc3-8ed8-9f91d2684301/mp4/7b819345-838e-4084-b365-b1cfb8b00761_avc_360p.mp4', w: 640, h: 360, note: '16:17' },
  { title: 'S1 E9 · That time again promo two', src: 'https://d2a132qjpri1we.cloudfront.net/episodes/6016df4d-ab12-40f0-8bd1-776acf16f83d/16667b10-497e-48ad-a1ea-cfd24f6f01fa/756cc1fc-b347-4654-99e8-a76bd335cb65/mp4/16667b10-497e-48ad-a1ea-cfd24f6f01fa_avc_1080p.mp4', w: 1920, h: 1080, note: '0:45' },
  { title: 'S1 E10 · That time again promo 1', src: 'https://d2a132qjpri1we.cloudfront.net/episodes/6016df4d-ab12-40f0-8bd1-776acf16f83d/efb34bf9-e3f9-44b4-9e7b-b34728eb9360/22352fed-b93e-45aa-a674-fc3efae811c6/mp4/efb34bf9-e3f9-44b4-9e7b-b34728eb9360_avc_1080p.mp4', w: 1920, h: 1080, note: '0:48' },
  { title: 'S2 E5 · Episode 1: Seasoned Soul - wide screen', src: 'https://d2a132qjpri1we.cloudfront.net/combines/6016df4d-ab12-40f0-8bd1-776acf16f83d/3516/b8265e3d-0c6b-4898-a3dc-84f4225653c1/mp4/3516_avc_1080p.mp4', w: 1920, h: 1080, note: '1:30' },
  { title: 'S2 E7 · The Great Firewall', src: 'https://d2a132qjpri1we.cloudfront.net/combines/6016df4d-ab12-40f0-8bd1-776acf16f83d/3612/4b02e013-ef9d-4ad6-b163-a1a31ec8909f/mp4/3612_avc_1080p.mp4', w: 1920, h: 1080, note: '3:46' },
  { title: 'S2 E8 · The Couch Dimension', src: 'https://d2a132qjpri1we.cloudfront.net/combines/6016df4d-ab12-40f0-8bd1-776acf16f83d/3535/1217ba29-1f0d-4a53-8f51-5570fa957212/mp4/3535_avc_1080p.mp4', w: 1920, h: 1080, note: '3:46' },
  { title: 'S2 E11 · That Time Again ft. SHMOREZ', src: 'https://d2a132qjpri1we.cloudfront.net/episodes/6016df4d-ab12-40f0-8bd1-776acf16f83d/56730b65-7e65-4ab8-9c35-8048889e18eb/d74fb242-ac5f-47cb-87d8-0c714fd527a1/mp4/56730b65-7e65-4ab8-9c35-8048889e18eb_avc_720p.mp4', w: 1280, h: 720, note: '37:52' },
  { title: 'S2 E12 · Cowboys don\'t cry - that time again', src: 'https://d2a132qjpri1we.cloudfront.net/episodes/6016df4d-ab12-40f0-8bd1-776acf16f83d/4af8a40b-86eb-4169-925c-fbe4b5549f78/af28bdb8-64f9-43a4-908d-08fa66ace264/mp4/4af8a40b-86eb-4169-925c-fbe4b5549f78_avc_1080p.mp4', w: 1920, h: 1080, note: '3:04' },
  { title: 'S2 E13 · Binary Bits & Cosmic Tacos', src: 'https://d2a132qjpri1we.cloudfront.net/combines/6016df4d-ab12-40f0-8bd1-776acf16f83d/3777/6267379e-381c-42d1-ac7a-a3a696d86d2a/mp4/3777_avc_1080p.mp4', w: 1080, h: 1920, note: '3:28' },
  { title: 'S2 E14 · The Zest of the Void', src: 'https://d2a132qjpri1we.cloudfront.net/combines/6016df4d-ab12-40f0-8bd1-776acf16f83d/3875/ed738781-0826-41f5-b1d1-6900914619fe/mp4/3875_avc_1080p.mp4', w: 1080, h: 1920, note: '3:07' },
  { title: 'S2 E17 · Static on the Sagging Couch', src: 'https://d2a132qjpri1we.cloudfront.net/combines/6016df4d-ab12-40f0-8bd1-776acf16f83d/4089/0bd56e6a-caf4-4bba-8bf7-dbf12ee1e429/mp4/4089_avc_1080p.mp4', w: 1890, h: 1080, note: '2:01' },
  { title: 'S2 E20 · Dust Bunny Uprising', src: 'https://d2a132qjpri1we.cloudfront.net/combines/6016df4d-ab12-40f0-8bd1-776acf16f83d/4113/4a889378-0bcd-41cc-8df4-66f3483d9f70/mp4/4113_avc_1080p.mp4', w: 1890, h: 1080, note: '1:00' },
  { title: 'S2 E21 · Drunk at the Door', src: 'https://d2a132qjpri1we.cloudfront.net/combines/6016df4d-ab12-40f0-8bd1-776acf16f83d/4114/c5dc59ba-eb16-48b9-9663-2e8441572a3b/mp4/4114_avc_1080p.mp4', w: 1890, h: 1080, note: '1:00' },
  { title: 'S2 E22 · The Endless Transmission', src: 'https://d2a132qjpri1we.cloudfront.net/combines/6016df4d-ab12-40f0-8bd1-776acf16f83d/4359/c3b4c8cc-5c88-4e14-bbbb-d8edbbaf0ed8/mp4/4359_avc_1080p.mp4', w: 1920, h: 1080, note: '4:31' },
];

export const TTA_TALL = TTA.filter((v) => v.h > v.w);
export const TTA_WIDE = TTA.filter((v) => v.h <= v.w);
