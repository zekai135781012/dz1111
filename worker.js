// ======================== 天气识别模块 ========================
const WEATHER_NAMES = {
  "deluge": "暴雨", "drizzle": "细雨", "redhot": "炽热",
  "lowtemperature": "低温", "fair_wind": "惠风", "snow": "雪",
  "gale": "大风", "thunderstorm": "雷雨", "typhoon": "台风",
  "darkfog": "暗雾", "eclipse": "日蚀", "firefly": "萤火",
  "fog": "雾", "meteorshower": "流星雨", "neon": "霓虹",
  "sandstorm": "沙尘暴", "solarflare": "太阳耀斑", "meteorite": "陨石",
  "fault": "故障", "rainball": "彩虹", "aurora": "极光", "ghost": "幽灵"
};

const TEMPLATE_FEATURES = {
  "aurora": [703,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,44,0,0,0,52,0,0,0,0,0,0,0,0,0,0,0,60,0,0,0,165],
  "darkfog": [637,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,150,1,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,22,0,0,0,0,3,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,210],
  "deluge": [653,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,147,0,0,0,12,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,11,50,0,0,0,2,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,149],
  "drizzle": [618,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,154,0,0,0,0,0,0,0,0,0,0,2,0,0,0,0,51,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,199],
  "eclipse": [801,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,3,0,0,0,4,3,0,0,0,0,0,0,0,0,0,0,0,0,0,0,7,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,24,16,0,0,0,4,21,141],
  "fair_wind": [735,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,110,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,179],
  "fault": [551,0,0,0,0,0,0,0,0,0,0,3,0,0,0,71,0,0,0,0,0,0,0,0,0,0,0,17,0,0,0,8,0,0,0,0,0,0,13,4,0,0,0,0,0,0,0,40,0,0,164,0,0,0,4,1,0,0,0,0,0,0,0,148],
  "firefly": [685,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,2,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,2,0,0,0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,132,4,0,46,9,13,128],
  "fog": [716,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,97,25,0,0,0,4,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,182],
  "gale": [724,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,80,0,0,0,19,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,45,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,156],
  "ghost": [559,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,107,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,6,0,0,0,51,0,0,0,301],
  "lowtemperature": [741,0,0,0,0,0,0,39,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,3,0,0,0,18,0,0,0,0,0,0,0,0,0,0,0,0,0,0,78,3,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,142],
  "meteorite": [711,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,69,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,18,0,0,0,9,9,0,0,0,0,0,0,0,0,0,0,0,0,0,1,2,0,0,26,14,11,154],
  "meteorshower": [703,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,26,37,23,235],
  "neon": [701,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,10,32,0,0,0,0,0,0,0,0,0,0,0,0,0,0,4,6,0,11,4,2,0,0,0,0,0,0,0,0,0,1,16,1,2,88,5,141],
  "rainball": [569,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,101,39,70,245],
  "redhot": [715,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,78,0,0,0,0,0,0,0,0,0,0,56,0,0,0,0,9,0,0,0,0,166],
  "sandstorm": [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,495,0,0,0,29,7,0,0,0,0,0,0,0,0,0,0,0,0,0,10,157,7,0,0,20,72,227],
  "snow": [655,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,118,0,0,0,34,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,43,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,174],
  "solarflare": [662,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,49,0,0,0,133,9,0,0,0,7,18,146],
  "thunderstorm": [651,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,117,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,19,0,0,0,0,0,0,0,0,0,0,0,0,42,9,8,178],
  "typhoon": [708,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,145,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,171]
};

const SIZE = 32;
const DIFF_THRESHOLD = 0.15;

function computeHistogram(imageData) {
  const hist = new Array(64).fill(0);
  for (let i = 0; i < imageData.length; i += 4) {
    const r = imageData[i] >> 6;
    const g = imageData[i+1] >> 6;
    const b = imageData[i+2] >> 6;
    const idx = r * 16 + g * 4 + b;
    hist[idx]++;
  }
  return hist;
}

function histogramDistance(histA, histB) {
  let intersection = 0;
  for (let i = 0; i < 64; i++) intersection += Math.min(histA[i], histB[i]);
  return 1 - intersection / (SIZE * SIZE);
}

async function recognizeWeather(url) {
  try {
    const resp = await fetch(url);
    if (!resp.ok) throw new Error(`HTTP ${resp.status}`);
    const blob = await resp.blob();
    const bitmap = await createImageBitmap(blob);
    const canvas = new OffscreenCanvas(SIZE, SIZE);
    const ctx = canvas.getContext('2d');
    ctx.drawImage(bitmap, 0, 0, SIZE, SIZE);
    const imageData = ctx.getImageData(0, 0, SIZE, SIZE).data;
    const hist = computeHistogram(imageData);

    let bestKey = null;
    let bestDist = Infinity;
    for (const [key, tmpl] of Object.entries(TEMPLATE_FEATURES)) {
      const dist = histogramDistance(hist, tmpl);
      if (dist < bestDist) {
        bestDist = dist;
        bestKey = key;
      }
    }
    return bestDist <= DIFF_THRESHOLD ? (WEATHER_NAMES[bestKey] || "未知") : "未知";
  } catch(e) {
    console.error(`识别失败: ${url}`, e);
    return "获取失败";
  }
}

// ======================== 核心业务逻辑 ========================
export default {
  async fetch(request, env, ctx) {
    const cors = {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type'
    };
    if (request.method === 'OPTIONS') {
      return new Response(null, { headers: cors });
    }
    const url = new URL(request.url);
    if (url.pathname !== '/api/farm/latest') {
      return new Response(JSON.stringify({ success: false, error: 'Not Found' }), { status: 404, headers: { 'Content-Type': 'application/json', ...cors } });
    }
    try {
      const roleId = env.FARM_ROLE_ID;
      const deviceModel = env.FARM_DEVICE_MODEL;
      const uuid = env.FARM_UUID;
      const token = env.FARM_TOKEN || 'aU0ZcOzmpNoa56fDez';
      if (!roleId || !deviceModel || !uuid) {
        return new Response(JSON.stringify({ success: false, error: '配置不完整' }), { status: 500, headers: { 'Content-Type': 'application/json', ...cors } });
      }

      const auth = generateAuth(roleId, token);
      const body = JSON.stringify({
        server: '15001', code: 'u5', sign: auth.sign,
        language: 'zh-CN', deviceName: 'duchamp', systemVersion: 36,
        uuid: uuid, mode: 'view', systemName: 'android',
        batteryState: 3, extra: '', appId: '4608997350',
        batteryLevel: 90, gameId: 'u5', roleId: roleId,
        deeplink: '[]', env: 'production', nonce: auth.nonce,
        size: 'medium', domain: 'https://u5-vision.nie.netease.com',
        designId: 4608997351, sdkVersion: 3, deviceModel: deviceModel,
        ts: auth.ts, nightMode: false
      });

      const resp = await fetch('https://u5-vision.nie.netease.com/widget/view', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: body
      });
      const json = await resp.json();
      if (json.success !== 'true') {
        return new Response(JSON.stringify({ success: false, error: json.desc || '失败' }), { status: 500, headers: { 'Content-Type': 'application/json', ...cors } });
      }

      const el = json.data?.view?.elements || {};
      const weatherIcons = [];
      if (el['image_R3Xw:R5xp']?.src) weatherIcons.push(el['image_R3Xw:R5xp'].src);
      if (el['image_JeHp:Vmcb']?.src) weatherIcons.push(el['image_JeHp:Vmcb'].src);

      // 并行识别所有天气图标
      const weatherNames = await Promise.all(weatherIcons.map(url => recognizeWeather(url)));

      const result = {
        success: true,
        data: {
          weatherIcons: weatherIcons,
          weatherNames: weatherNames,
          seedImage: getSrc(el, 'image_Lb2J:5Fo7'),
          seedName: getText(el, 'text_TLl5:dwdi'),
          seedQualityBg: getSrc(el, 'image_z9Sa:fdFU'),
          toolImage: getSrc(el, 'image_cruF:gFs5'),
          toolName: getText(el, 'text_vtOZ:50mh'),
          toolQualityBg: getSrc(el, 'image_6grb:EYVa'),
          fetchTime: Date.now()
        },
        maskedRoleId: roleId.slice(0,3) + '***',
        maskedDeviceModel: '***',
        maskedUuid: uuid.slice(0,4) + '***'
      };
      return new Response(JSON.stringify(result), { headers: { 'Content-Type': 'application/json', ...cors } });
    } catch (e) {
      return new Response(JSON.stringify({ success: false, error: e.message }), { status: 500, headers: { 'Content-Type': 'application/json', ...cors } });
    }
  }
};

function getSrc(o, k) { return o[k]?.src || ''; }
function getText(o, k) { return o[k]?.content || ''; }

function generateAuth(roleId, token) {
  const ts = Date.now();
  const nonce = Array.from({ length: 18 }, () => '0123456789abcdefghijklmnopqrstuvwxyz'[Math.floor(Math.random() * 36)]).join('');
  const now = new Date(ts + 28800000);
  const ds = now.getUTCFullYear() + String(now.getUTCMonth() + 1).padStart(2,'0') + String(now.getUTCDate()).padStart(2,'0');
  const dt = md5(`code=u5&date=${ds}&token=${token}`);
  const sign = md5(`code=u5&roleId=${roleId}&nonce=${nonce}&ts=${ts}&token=${dt}`);
  return { sign, nonce, ts };
}

function md5(s) {
  function md5cycle(x, k) {
    var a = k[0], b = k[1], c = k[2], d = k[3];
    a = ff(a, b, c, d, x[0], 7, -680876936);
    d = ff(d, a, b, c, x[1], 12, -389564586);
    c = ff(c, d, a, b, x[2], 17, 606105819);
    b = ff(b, c, d, a, x[3], 22, -1044525330);
    a = ff(a, b, c, d, x[4], 7, -176418897);
    d = ff(d, a, b, c, x[5], 12, 1200080426);
    c = ff(c, d, a, b, x[6], 17, -1473231341);
    b = ff(b, c, d, a, x[7], 22, -45705983);
    a = ff(a, b, c, d, x[8], 7, 1770035416);
    d = ff(d, a, b, c, x[9], 12, -1958414417);
    c = ff(c, d, a, b, x[10], 17, -42063);
    b = ff(b, c, d, a, x[11], 22, -1990404162);
    a = ff(a, b, c, d, x[12], 7, 1804603682);
    d = ff(d, a, b, c, x[13], 12, -40341101);
    c = ff(c, d, a, b, x[14], 17, -1502002290);
    b = ff(b, c, d, a, x[15], 22, 1236535329);
    a = gg(a, b, c, d, x[1], 5, -165796510);
    d = gg(d, a, b, c, x[6], 9, -1069501632);
    c = gg(c, d, a, b, x[11], 14, 643717713);
    b = gg(b, c, d, a, x[0], 20, -373897302);
    a = gg(a, b, c, d, x[5], 5, -701558691);
    d = gg(d, a, b, c, x[10], 9, 38016083);
    c = gg(c, d, a, b, x[15], 14, -660478335);
    b = gg(b, c, d, a, x[4], 20, -405537848);
    a = gg(a, b, c, d, x[9], 5, 568446438);
    d = gg(d, a, b, c, x[14], 9, -1019803690);
    c = gg(c, d, a, b, x[3], 14, -187363961);
    b = gg(b, c, d, a, x[8], 20, 1163531501);
    a = gg(a, b, c, d, x[13], 5, -1444681467);
    d = gg(d, a, b, c, x[2], 9, -51403784);
    c = gg(c, d, a, b, x[7], 14, 1735328473);
    b = gg(b, c, d, a, x[12], 20, -1926607734);
    a = hh(a, b, c, d, x[5], 4, -378558);
    d = hh(d, a, b, c, x[8], 11, -2022574463);
    c = hh(c, d, a, b, x[11], 16, 1839030562);
    b = hh(b, c, d, a, x[14], 23, -35309556);
    a = hh(a, b, c, d, x[1], 4, -1530992060);
    d = hh(d, a, b, c, x[4], 11, 1272893353);
    c = hh(c, d, a, b, x[7], 16, -155497632);
    b = hh(b, c, d, a, x[10], 23, -1094730640);
    a = hh(a, b, c, d, x[13], 4, 681279174);
    d = hh(d, a, b, c, x[0], 11, -358537222);
    c = hh(c, d, a, b, x[3], 16, -722521979);
    b = hh(b, c, d, a, x[6], 23, 76029189);
    a = hh(a, b, c, d, x[9], 4, -640364487);
    d = hh(d, a, b, c, x[12], 11, -421815835);
    c = hh(c, d, a, b, x[15], 16, 530742520);
    b = hh(b, c, d, a, x[2], 23, -995338651);
    a = ii(a, b, c, d, x[0], 6, -198630844);
    d = ii(d, a, b, c, x[7], 10, 1126891415);
    c = ii(c, d, a, b, x[14], 15, -1416354905);
    b = ii(b, c, d, a, x[5], 21, -57434055);
    a = ii(a, b, c, d, x[12], 6, 1700485571);
    d = ii(d, a, b, c, x[3], 10, -1894986606);
    c = ii(c, d, a, b, x[10], 15, -1051523);
    b = ii(b, c, d, a, x[1], 21, -2054922799);
    a = ii(a, b, c, d, x[8], 6, 1873313359);
    d = ii(d, a, b, c, x[15], 10, -30611744);
    c = ii(c, d, a, b, x[6], 15, -1560198380);
    b = ii(b, c, d, a, x[13], 21, 1309151649);
    a = ii(a, b, c, d, x[4], 6, -145523070);
    d = ii(d, a, b, c, x[11], 10, -1120210379);
    c = ii(c, d, a, b, x[2], 15, 718787259);
    b = ii(b, c, d, a, x[9], 21, -343485551);
    k[0] = add(a, k[0]);
    k[1] = add(b, k[1]);
    k[2] = add(c, k[2]);
    k[3] = add(d, k[3]);
  }
  function cmn(q, a, b, x, s, t) { return add(rol(add(add(a, q), add(x, t)), s), b); }
  function ff(a, b, c, d, x, s, t) { return cmn((b & c) | ((~b) & d), a, b, x, s, t); }
  function gg(a, b, c, d, x, s, t) { return cmn((b & d) | (c & (~d)), a, b, x, s, t); }
  function hh(a, b, c, d, x, s, t) { return cmn(b ^ c ^ d, a, b, x, s, t); }
  function ii(a, b, c, d, x, s, t) { return cmn(c ^ (b | (~d)), a, b, x, s, t); }
  function rol(num, cnt) { return (num << cnt) | (num >>> (32 - cnt)); }
  function add(x, y) { var lsw = (x & 0xFFFF) + (y & 0xFFFF); var msw = (x >> 16) + (y >> 16) + (lsw >> 16); return (msw << 16) | (lsw & 0xFFFF); }
  function md5blk(s) { var md5blks = [], i; for (i = 0; i < 64; i += 4) { md5blks[i >> 2] = s.charCodeAt(i) + (s.charCodeAt(i+1) << 8) + (s.charCodeAt(i+2) << 16) + (s.charCodeAt(i+3) << 24); } return md5blks; }
  var x = [], k, i;
  s = utf8Encode(s);
  var n = s.length;
  var r = n % 64;
  var b = n + ((r < 56) ? (56 - r) : (120 - r));
  var p = new Array(b);
  for (i = 0; i < n; i++) p[i] = s.charCodeAt(i);
  p[n] = 128;
  for (i = n+1; i < b; i++) p[i] = 0;
  p[b-2] = (n << 3) & 0xFF;
  p[b-1] = (n >> 29) & 0xFF;
  for (i = 0; i < b; i += 64) {
    for (var j = 0; j < 64; j++) x[j] = p[i+j];
    md5cycle(md5blk(String.fromCharCode.apply(null, x)), k = [0x67452301, 0xEFCDAB89, 0x98BADCFE, 0x10325476]);
  }
  function hex(x) { var h = "", i; for (i = 0; i <= 3; i++) { var v = (x >>> (i*8)) & 0xFF; h += (v < 16 ? "0" : "") + v.toString(16); } return h; }
  return hex(k[0]) + hex(k[1]) + hex(k[2]) + hex(k[3]);
}

function utf8Encode(str) {
  str = str.replace(/\r\n/g, "\n");
  var utftext = "";
  for (var n = 0; n < str.length; n++) {
    var c = str.charCodeAt(n);
    if (c < 128) {
      utftext += String.fromCharCode(c);
    } else if (c > 127 && c < 2048) {
      utftext += String.fromCharCode((c >> 6) | 192);
      utftext += String.fromCharCode((c & 63) | 128);
    } else {
      utftext += String.fromCharCode((c >> 12) | 224);
      utftext += String.fromCharCode(((c >> 6) & 63) | 128);
      utftext += String.fromCharCode((c & 63) | 128);
    }
  }
  return utftext;
}