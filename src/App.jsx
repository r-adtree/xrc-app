import { useState, useMemo, useEffect, useCallback, useRef } from "react";

// ─── Brand ───────────────────────────────────────────────────────────────────
const BRAND = {
  yellow:"#F5C842", yellowDim:"#F5C84215", yellowBorder:"#F5C84235",
  bg:"#111729", card:"#18243D", cardBorder:"#1E2A45",
  text:"#E8EDF8", textMuted:"#5A6A8A", textSub:"#8A97B5",
  green:"#2DD4A4", red:"#E8547A", purple:"#7C6AF7",
};

const LOGO_SRC = "data:image/png;base64,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";

// ─── Hugging Face Config ──────────────────────────────────────────────────────
// Admin sets HF_REPO + HF_TOKEN in admin panel. Stored in localStorage (admin device only).
// Public users only need HF_REPO to fetch — no token needed for public datasets.
const HF_CONFIG_KEY  = "adtree_hf_config";
const HF_FILE_PATH   = "hotels.csv";

const getHFConfig  = () => { try{ return JSON.parse(localStorage.getItem(HF_CONFIG_KEY)||"{}"); }catch{ return {}; } };
const saveHFConfig = cfg => localStorage.setItem(HF_CONFIG_KEY, JSON.stringify(cfg));

// Public fetch URL (no token needed for public dataset)
const getHFFetchUrl = (repo) => `https://huggingface.co/datasets/${repo}/resolve/main/${HF_FILE_PATH}?t=${Date.now()}`;

// Upload URL — HF Hub commit API (correct endpoint)
const getHFCommitUrl = (repo) => `https://huggingface.co/api/datasets/${repo}/commit/main`;

// ─── Default hotel data (fallback if Hugging Face not configured) ──────────────
const DEFAULT_HOTELS_RAW = [{"poi_id":"21568226360372574","name":"Portola Grand Renggali Hotel Takengon","l1":"Aceh","l2":"Central Aceh","city_display":"Central Aceh, Aceh","star":5.0,"price_tier":"Mid [30,50]","aov_idr":720000,"tags":["Best Weekend Staycations"],"photo":"","promo":"","drive_link":""},{"poi_id":"21568226270584319","name":"Casanemo Beach Resort & Spa","l1":"Aceh","l2":"Sabang","city_display":"Sabang, Aceh","star":5.0,"price_tier":"High [>50]","aov_idr":1170000,"tags":["Romantic Stays","Luxurious Stays"],"photo":"","promo":"","drive_link":""},{"poi_id":"21568226360735735","name":"AnandaDara Ubud Resort & Spa","l1":"Bali","l2":"Gianyar","city_display":"Gianyar, Bali","star":5.0,"price_tier":"High [>50]","aov_idr":1170000,"tags":["Romantic Stays","Family Friendly","Luxurious Stays"],"photo":"https://images.unsplash.com/photo-1566073771259-6a8506099945?w=400&h=260&fit=crop","promo":"","drive_link":""},{"poi_id":"21568226304920154","name":"Platinum Hotels JIMBARAN BEACH BALI","l1":"Bali","l2":"Badung","city_display":"Jimbaran, Bali","star":5.0,"price_tier":"High [>50]","aov_idr":1170000,"tags":["Romantic Stays","Family Friendly","Luxurious Stays"],"photo":"https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=400&h=260&fit=crop","promo":"","drive_link":""},{"poi_id":"21568226304904533","name":"The Meru Sanur","l1":"Bali","l2":"Denpasar","city_display":"Sanur, Bali","star":5.0,"price_tier":"High [>50]","aov_idr":1170000,"tags":["Family Friendly","Luxurious Stays"],"photo":"https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=400&h=260&fit=crop","promo":"","drive_link":""},{"poi_id":"21568226308743543","name":"Kubu Bali Suite Seminyak","l1":"Bali","l2":"Badung","city_display":"Seminyak, Bali","star":5.0,"price_tier":"High [>50]","aov_idr":1170000,"tags":["Luxurious Stays"],"photo":"https://images.unsplash.com/photo-1582719508461-905c673771fd?w=400&h=260&fit=crop","promo":"","drive_link":""},{"poi_id":"21568226360640766","name":"DoubleTree by Hilton Jakarta Bintaro Jaya","l1":"Banten","l2":"South Tangerang","city_display":"Bintaro, Banten","star":5.0,"price_tier":"High [>50]","aov_idr":1170000,"tags":["Luxurious Stays"],"photo":"https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?w=400&h=260&fit=crop","promo":"","drive_link":""},{"poi_id":"21568226301061511","name":"HOTEL TENTREM JAKARTA","l1":"Banten","l2":"South Tangerang","city_display":"BSD, Banten","star":5.0,"price_tier":"High [>50]","aov_idr":1170000,"tags":["Family Friendly","Luxurious Stays"],"photo":"https://images.unsplash.com/photo-1615460549969-36fa19521a4f?w=400&h=260&fit=crop","promo":"","drive_link":""},{"poi_id":"34955879828936067","name":"Padma Hotel Semarang","l1":"Central Java","l2":"Semarang City","city_display":"Semarang, Jawa Tengah","star":5.0,"price_tier":"High [>50]","aov_idr":1170000,"tags":["Family Friendly","Luxurious Stays"],"photo":"https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?w=400&h=260&fit=crop","promo":"","drive_link":""},{"poi_id":"21568226308534098","name":"Grand Swiss-Belhotel Darmo Surabaya","l1":"East Java","l2":"Surabaya","city_display":"Surabaya, Jawa Timur","star":5.0,"price_tier":"High [>50]","aov_idr":1170000,"tags":["Luxurious Stays"],"photo":"https://images.unsplash.com/photo-1578683010236-d716f9a3f461?w=400&h=260&fit=crop","promo":"","drive_link":""},{"poi_id":"34955879830747051","name":"VASA HOTEL SURABAYA","l1":"East Java","l2":"Surabaya","city_display":"Surabaya, Jawa Timur","star":5.0,"price_tier":"High [>50]","aov_idr":1170000,"tags":["Family Friendly","Luxurious Stays"],"photo":"https://images.unsplash.com/photo-1561501900-3701fa6a0864?w=400&h=260&fit=crop","promo":"","drive_link":""},{"poi_id":"42203860550492127","name":"Katamaran Hotel & Resort Komodo","l1":"East Nusa Tenggara","l2":"West Manggarai","city_display":"Labuan Bajo, NTT","star":5.0,"price_tier":"High [>50]","aov_idr":1170000,"tags":["Romantic Stays","Luxurious Stays"],"photo":"https://images.unsplash.com/photo-1506059612708-99d6128a8855?w=400&h=260&fit=crop","promo":"","drive_link":""},{"poi_id":"22535865203354506","name":"The Jayakarta Suites Komodo Flores","l1":"East Nusa Tenggara","l2":"West Manggarai","city_display":"Labuan Bajo, NTT","star":5.0,"price_tier":"Mid [30,50]","aov_idr":720000,"tags":["Best Weekend Staycations","Romantic Stays","Family Friendly"],"photo":"https://images.unsplash.com/photo-1610641818989-c2051b5e2cfd?w=400&h=260&fit=crop","promo":"","drive_link":""},{"poi_id":"21568226304791902","name":"PARKROYAL Serviced Suites Jakarta","l1":"Jakarta","l2":"Central Jakarta","city_display":"Jakarta Pusat","star":5.0,"price_tier":"High [>50]","aov_idr":1170000,"tags":["Luxurious Stays"],"photo":"https://images.unsplash.com/photo-1596394516093-501ba68a0ba6?w=400&h=260&fit=crop","promo":"","drive_link":""},{"poi_id":"21568226360274007","name":"Pan Pacific Jakarta","l1":"Jakarta","l2":"Central Jakarta","city_display":"Jakarta Pusat","star":5.0,"price_tier":"High [>50]","aov_idr":1170000,"tags":["Luxurious Stays"],"photo":"","promo":"","drive_link":""},{"poi_id":"21568226299488977","name":"Vertu Harmoni Jakarta","l1":"Jakarta","l2":"Central Jakarta","city_display":"Jakarta Pusat","star":5.0,"price_tier":"High [>50]","aov_idr":1170000,"tags":["Family Friendly","Luxurious Stays"],"photo":"","promo":"","drive_link":""},{"poi_id":"21568226301847100","name":"Grand Mercure Lampung","l1":"Lampung","l2":"Bandar Lampung","city_display":"Bandar Lampung","star":5.0,"price_tier":"High [>50]","aov_idr":1170000,"tags":["Luxurious Stays"],"photo":"","promo":"","drive_link":""},{"poi_id":"21568226360373577","name":"Lampung Marriott Resort & Spa","l1":"Lampung","l2":"Pesawaran","city_display":"Pesawaran, Lampung","star":5.0,"price_tier":"High [>50]","aov_idr":1170000,"tags":["Family Friendly","Luxurious Stays"],"photo":"","promo":"","drive_link":""},{"poi_id":"22535865203031351","name":"Aryaduta Makassar","l1":"South Sulawesi","l2":"Makassar","city_display":"Makassar, Sulsel","star":5.0,"price_tier":"High [>50]","aov_idr":1170000,"tags":["Family Friendly","Luxurious Stays"],"photo":"","promo":"","drive_link":""},{"poi_id":"21568226364620111","name":"The Papandayan Hotel","l1":"West Java","l2":"Bandung City","city_display":"Bandung, Jabar","star":5.0,"price_tier":"High [>50]","aov_idr":1170000,"tags":["Family Friendly","Luxurious Stays"],"photo":"","promo":"","drive_link":""},{"poi_id":"34955879830526460","name":"Le Eminence Hotel Convention & Resort","l1":"West Java","l2":"Cianjur","city_display":"Cianjur, Jabar","star":5.0,"price_tier":"High [>50]","aov_idr":1170000,"tags":["Romantic Stays","Family Friendly","Luxurious Stays"],"photo":"","promo":"","drive_link":""},{"poi_id":"21568226381560124","name":"Royal Tulip Gunung Geulis Resort and Golf","l1":"West Java","l2":"Bogor","city_display":"Bogor, Jabar","star":5.0,"price_tier":"High [>50]","aov_idr":1170000,"tags":["Romantic Stays","Family Friendly","Luxurious Stays"],"photo":"","promo":"","drive_link":""},{"poi_id":"21568226268262654","name":"Royal Avila Boutique Resort","l1":"West Nusa Tenggara","l2":"North Lombok","city_display":"Lombok, NTB","star":5.0,"price_tier":"High [>50]","aov_idr":1170000,"tags":["Luxurious Stays"],"photo":"","promo":"","drive_link":""},{"poi_id":"21568226381752935","name":"Cocana Resort Gili Trawangan","l1":"West Nusa Tenggara","l2":"North Lombok","city_display":"Gili Trawangan, NTB","star":5.0,"price_tier":"High [>50]","aov_idr":1170000,"tags":["Romantic Stays","Luxurious Stays"],"photo":"","promo":"","drive_link":""},{"poi_id":"21568226272539113","name":"One Of A Kind Resort @ Trikora Beach - Bintan","l1":"Riau Islands","l2":"Bintan","city_display":"Bintan, Kepri","star":5.0,"price_tier":"High [>50]","aov_idr":1170000,"tags":["Romantic Stays","Luxurious Stays"],"photo":"","promo":"","drive_link":""}];

// ─── Helpers ──────────────────────────────────────────────────────────────────
const PROMOS = ["Diskon hingga 40% untuk pemesanan akhir pekan","Dapatkan sarapan gratis untuk 2 orang","Menginap 2 malam gratis 1 malam","Cashback Rp200.000 via TikTok GO","Late check-out gratis hingga pukul 14.00","Free upgrade kamar untuk kreator terpilih","Paket makan malam romantis + kamar premium","Diskon 30% + welcome drink gratis","Voucher spa senilai Rp150.000 per malam","Cashback 25% untuk first-time booker"];
const FALLBACK_PHOTOS = ["https://images.unsplash.com/photo-1566073771259-6a8506099945?w=400&h=260&fit=crop","https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=400&h=260&fit=crop","https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=400&h=260&fit=crop","https://images.unsplash.com/photo-1582719508461-905c673771fd?w=400&h=260&fit=crop","https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?w=400&h=260&fit=crop","https://images.unsplash.com/photo-1615460549969-36fa19521a4f?w=400&h=260&fit=crop","https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?w=400&h=260&fit=crop","https://images.unsplash.com/photo-1578683010236-d716f9a3f461?w=400&h=260&fit=crop"];
const FALLBACK_THUMBS = FALLBACK_PHOTOS.map(u=>u.replace("w=400&h=260","w=80&h=80"));
const hx = id => { let h=0; for(let i=0;i<id.length;i++) h=(h*31+id.charCodeAt(i))>>>0; return h; };
const fallbackPhoto = id => FALLBACK_PHOTOS[hx(id)%FALLBACK_PHOTOS.length];
const fallbackThumb = id => FALLBACK_THUMBS[hx(id)%FALLBACK_THUMBS.length];
const autoPromo = id => PROMOS[hx(id)%PROMOS.length];

const TIER_SCORE = {"Low [0,30]":1,"Mid [30,50]":2,"High [>50]":3};
const TIER_LABEL = {"Low [0,30]":"Terjangkau","Mid [30,50]":"Menengah","High [>50]":"Premium"};
const getTierLabel = (tier) => {
  if(!tier) return "Menengah";
  if(tier.includes("Low") || tier.includes("0,30")) return "Terjangkau";
  if(tier.includes("Mid") || tier.includes("30,50")) return "Menengah";
  if(tier.includes("High") || tier.includes(">50")) return "Premium";
  return tier || "Menengah";
};
const TIER_COLOR = {"Low [0,30]":BRAND.green,"Mid [30,50]":BRAND.yellow,"High [>50]":BRAND.purple};
const getTierColor = (tier) => {
  if(!tier) return BRAND.yellow;
  if(tier.includes("Low") || tier.includes("0,30")) return BRAND.green;
  if(tier.includes("High") || tier.includes(">50")) return BRAND.purple;
  return BRAND.yellow;
};
const TAG_ICON   = {"Best Weekend Staycations":"🏖️","Romantic Stays":"💑","Family Friendly":"👨\u200d👩\u200d👧","SBG Top Picks":"⭐","Luxurious Stays":"💎","Weekend Getaway":"🌿"};
const ALL_TAGS   = Object.keys(TAG_ICON);
const ALL_L1     = ["Semua Provinsi",...Array.from(new Set(DEFAULT_HOTELS_RAW.map(h=>h.l1))).sort()];

function calcScore(h) {
  return Math.round(((h.star||0)/5)*40+((TIER_SCORE[h.price_tier]||1)/3)*30+(Math.min((h.tags||[]).length/6,1))*20+(Math.min((h.aov_idr||0)/1170000,1))*10);
}
function normalizeTier(t) {
  if(!t) return "Mid [30,50]";
  const s = t.toLowerCase();
  if(s.includes("low") || s.includes("0,30") || s.includes("budget") || s.includes("terjangkau")) return "Low [0,30]";
  if(s.includes("high") || s.includes(">50") || s.includes("premium")) return "High [>50]";
  if(s.includes("mid") || s.includes("30,50") || s.includes("menengah")) return "Mid [30,50]";
  return "Mid [30,50]";
}
function enrichHotel(h) {
  const normalized = normalizeTier(h.price_tier);
  return { ...h, price_tier: normalized, score:calcScore({...h,price_tier:normalized}), photo:h.photo||fallbackPhoto(h.poi_id), thumb:(h.photo?h.photo.replace("w=400&h=260","w=80&h=80"):null)||fallbackThumb(h.poi_id), promo:h.promo||autoPromo(h.poi_id), published:h.published!==false };
}

// ─── CSV Parser ───────────────────────────────────────────────────────────────
function parseCSV(text) {
  const lines = text.trim().split("\n");
  const headers = lines[0].split(",").map(h=>h.trim().replace(/^"|"$/g,""));
  const results = [];
  for(let i=1;i<lines.length;i++){
    if(!lines[i].trim()) continue;
    const cols=[]; let cur="",inQ=false;
    for(const ch of lines[i]){ if(ch==='"')inQ=!inQ; else if(ch===","&&!inQ){cols.push(cur.trim());cur="";} else cur+=ch; }
    cols.push(cur.trim());
    const row={}; headers.forEach((h,j)=>{row[h]=(cols[j]||"").replace(/^"|"$/g,"").trim();}); results.push(row);
  }
  return results;
}

function csvRowToHotel(row) {
  const tagKeys=["best_weekend","romantic_stays","family_friendly","sbg_top_picks","luxurious_stays","weekend_getaway"];
  const tagNames=["Best Weekend Staycations","Romantic Stays","Family Friendly","SBG Top Picks","Luxurious Stays","Weekend Getaway"];
  const tags=tagKeys.map((k,i)=>row[k]==="Yes"?tagNames[i]:null).filter(Boolean);
  const aov_usd=parseFloat(row.aov_usd)||30;
  return {
    poi_id:row.poi_id||"csv_"+Date.now()+"_"+Math.random().toString(36).slice(2),
    name:row.poi_name||row.name||"",
    l1:row.l1_region||row.l1||"",
    l2:row.l2_region||row.l2||"",
    city_display:row.city_display||row.l2_region||row.l2||"",
    star:parseFloat(row.star_rating||row.star)||0,
    price_tier:row.price_tier||row.price_tiering||"Mid [30,50]",
    aov_idr:Math.round(aov_usd*18000),
    tags, photo:row.photo_url||row.photo||"",
    promo:row.promo_text||row.promo||"",
    drive_link:row.drive_link||row.wa_link||"",
    published:(row.published||"Yes")!=="No",
  };
}

// ─── Storage ──────────────────────────────────────────────────────────────────
const LS_SAVED = "adtree_saved_v3";
const getSaved   = () => { try{return JSON.parse(localStorage.getItem(LS_SAVED)||"[]");}catch{return[];} };
const setSavedLS = ids => localStorage.setItem(LS_SAVED,JSON.stringify(ids));

const ADMIN_USER = "adtree@admin";
const ADMIN_PASS = "0ADTREE1234!";

const fmtIdr = n => n>=1000000?"Rp"+(n/1000000).toFixed(1).replace(".0","")+" Jt":n>=1000?"Rp"+(n/1000).toFixed(0)+" Rb":"Rp"+n;

function Stars({count}) {
  if(!count) return <span style={{color:BRAND.textMuted,fontSize:10}}>N/A</span>;
  return <span style={{color:BRAND.yellow,fontSize:12,letterSpacing:1}}>{"★".repeat(Math.floor(count))}{count%1>=0.5?"½":""}</span>;
}
function ScoreBadge({val}) {
  const col=val>=80?BRAND.green:val>=55?BRAND.yellow:BRAND.textMuted;
  return <div style={{fontSize:10,fontWeight:800,color:col,background:col+"22",borderRadius:20,padding:"2px 8px",border:`1px solid ${col}44`,flexShrink:0}}>{val}pt</div>;
}
const CATS=[{id:"accommodations",label:"Akomodasi",icon:"🏨",live:true},{id:"dining",label:"Kuliner",icon:"🍜",live:false},{id:"todo",label:"Wisata",icon:"🎡",live:false}];

// ─── App ──────────────────────────────────────────────────────────────────────
export default function App() {
  const [hotels,    setHotels]    = useState([]);
  const [loading,   setLoading]   = useState(true);
  
  const [view,      setView]      = useState("home");
  const [cat,       setCat]       = useState("accommodations");
  const [l1,        setL1]        = useState("Semua Provinsi");
  const [tag,       setTag]       = useState(null);
  const [search,    setSearch]    = useState("");
  const [sel,       setSel]       = useState(null);
  const [drop,      setDrop]      = useState(false);
  const [saved,     setSavedSt]   = useState(getSaved);
  const [adminUser, setAdminUser] = useState("");
  const [adminPass, setAdminPass] = useState("");
  const [adminErr,  setAdminErr]  = useState("");
  const [isAdmin,   setIsAdmin]   = useState(false);
  const [adminTab,  setAdminTab]  = useState("list");
  const [csvStatus, setCsvStatus] = useState(null);
  const [csvMsg,    setCsvMsg]    = useState("");
  
  const fileRef = useRef();

  // ── Fetch from Hugging Face on load ─────────────────────────────────────────
  const [hfConfig, setHFConfigSt] = useState(getHFConfig);
  const [hfInput,  setHFInput]    = useState(()=>{ const c=getHFConfig(); return {repo:c.repo||"",token:c.token||""}; });

  const saveHFConfig2 = () => {
    if(!hfInput.repo.trim()){ setCsvMsg("✗ Nama repo wajib diisi."); setCsvStatus("error"); return; }
    if(!hfInput.token.trim()){ setCsvMsg("✗ Access token wajib diisi."); setCsvStatus("error"); return; }
    const cfg = {repo:hfInput.repo.trim(), token:hfInput.token.trim()};
    saveHFConfig(cfg); setHFConfigSt(cfg);
    setCsvStatus("success"); setCsvMsg(`✓ Konfigurasi disimpan! Repo: ${cfg.repo}`);
  };

  useEffect(()=>{
    const cfg = getHFConfig();
    if(cfg.repo) {
      setLoading(true);
      fetch(getHFFetchUrl(cfg.repo))
        .then(r=>{ if(!r.ok) throw new Error("Gagal fetch HF"); return r.text(); })
        .then(text=>{
          const rows = parseCSV(text);
          const parsed = rows.filter(r=>(r.poi_name||r.name||"").trim()).map(csvRowToHotel).map(enrichHotel).sort((a,b)=>b.score-a.score);
          if(parsed.length) setHotels(parsed);
          else setHotels(DEFAULT_HOTELS_RAW.map(enrichHotel).sort((a,b)=>b.score-a.score));
        })
        .catch(()=>setHotels(DEFAULT_HOTELS_RAW.map(enrichHotel).sort((a,b)=>b.score-a.score)))
        .finally(()=>setLoading(false));
    } else {
      setHotels(DEFAULT_HOTELS_RAW.map(enrichHotel).sort((a,b)=>b.score-a.score));
      setLoading(false);
    }
  },[]);

  const toggleSave = useCallback(id=>{
    setSavedSt(prev=>{const next=prev.includes(id)?prev.filter(x=>x!==id):[...prev,id]; setSavedLS(next); return next;});
  },[]);

  const adminLogin = ()=>{
    if(adminUser===ADMIN_USER&&adminPass===ADMIN_PASS){setIsAdmin(true);setView("adminPanel");setAdminErr("");}
    else setAdminErr("Username atau password salah.");
  };

  const togglePublish = poi_id => setHotels(prev=>prev.map(h=>h.poi_id===poi_id?{...h,published:!h.published}:h));

  // ── Upload CSV to Hugging Face ───────────────────────────────────────────────
  const handleCSV = e=>{
    const file=e.target.files[0]; if(!file) return;
    const cfg = getHFConfig();
    if(!cfg.repo || !cfg.token){
      setCsvStatus("error"); setCsvMsg("✗ Setup Hugging Face dulu di tab ⚙ HF Setup."); return;
    }
    setCsvStatus("loading"); setCsvMsg("Membaca & mengupload ke Hugging Face...");
    const reader=new FileReader();
    reader.onload=async ev=>{
      try{
        const text = ev.target.result;
        const rows=parseCSV(text);
        const valid=rows.filter(r=>(r.poi_name||r.name||"").trim());
        if(!valid.length) throw new Error("Tidak ada data valid di file CSV.");
        // Parse locally first for preview
        const parsed=valid.map(csvRowToHotel).map(enrichHotel).sort((a,b)=>b.score-a.score);
        // Upload to Hugging Face via Hub commit API
        // Step 1: base64 encode the CSV content
        const b64Content = btoa(unescape(encodeURIComponent(text)));
        const commitBody = {
          commit_message: "Update hotels.csv via AdtreeGO admin",
          operations: [{
            key: HF_FILE_PATH,
            type: "file",
            encoding: "base64",
            content: b64Content,
          }],
        };
        const res = await fetch(getHFCommitUrl(cfg.repo), {
          method: "POST",
          headers: {
            "Authorization": `Bearer ${cfg.token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify(commitBody),
        });
        if(!res.ok) {
          const errText = await res.text();
          let msg = "";
          try { msg = JSON.parse(errText).error || errText; } catch { msg = errText; }
          msg = msg.slice(0,200).replace(/<[^>]+>/g," ").replace(/\s+/g," ").trim();
          throw new Error(`HF upload gagal (${res.status}): ${msg}`);
        }
        setHotels(parsed);
        setCsvStatus("success");
        setCsvMsg(`✓ ${parsed.length} brand diupload ke Hugging Face! Semua user akan dapat data baru saat buka app.`);
      }catch(err){ setCsvStatus("error"); setCsvMsg("✗ "+err.message); }
    };
    reader.readAsText(file,"UTF-8"); e.target.value="";
  };

  const filtered = useMemo(()=>{
    let d=hotels.filter(h=>h.published);
    if(l1!=="Semua Provinsi") d=d.filter(h=>h.l1===l1);
    if(tag) d=d.filter(h=>h.tags.includes(tag));
    if(search.trim()){const q=search.toLowerCase();d=d.filter(h=>h.name.toLowerCase().includes(q)||h.l2.toLowerCase().includes(q)||h.l1.toLowerCase().includes(q));}
    return d;
  },[hotels,l1,tag,search]);

  const savedHotels = useMemo(()=>hotels.filter(h=>saved.includes(h.poi_id)),[hotels,saved]);
  const displayList = view==="saved"?savedHotels:filtered;

  // ── Admin Panel ──────────────────────────────────────────────────────────────
  if(view==="adminPanel"&&isAdmin) return (
    <div style={{...S.root,background:"#0C1220"}}>
      <div style={S.noise}/>
      <header style={{...S.header,paddingBottom:12}}>
        <div style={S.topBar}>
          <img src={LOGO_SRC} alt="AdtreeGO" style={{height:26,width:"auto"}}/>
          <div style={{display:"flex",gap:8,alignItems:"center"}}>
            <div style={{fontSize:10,color:BRAND.yellow,background:BRAND.yellowDim,border:`1px solid ${BRAND.yellowBorder}`,borderRadius:20,padding:"3px 10px",fontWeight:700,letterSpacing:"0.1em"}}>ADMIN</div>
            <button onClick={()=>{setIsAdmin(false);setView("home");}} style={{background:"#E8547A18",border:"1px solid #E8547A44",color:BRAND.red,fontSize:11,fontWeight:700,borderRadius:8,padding:"4px 10px",cursor:"pointer"}}>Logout</button>
          </div>
        </div>
        <div style={{fontSize:20,fontWeight:800,color:BRAND.text,marginTop:12}}>Panel Admin</div>
        <div style={{fontSize:11,color:BRAND.textMuted,marginTop:2}}>{hotels.length} brand · {hotels.filter(h=>h.published).length} aktif</div>
      </header>

      <div style={{display:"flex",borderBottom:`1px solid ${BRAND.cardBorder}`}}>
        {[["list","📋 Brand"],["upload","📤 CSV"],["hf","⚙ HF Setup"],["add","➕ Tambah"]].map(([id,lbl])=>(
          <button key={id} onClick={()=>setAdminTab(id)} style={{flex:1,padding:"11px 4px",background:"transparent",border:"none",cursor:"pointer",fontSize:11,fontWeight:700,color:adminTab===id?BRAND.yellow:BRAND.textMuted,borderBottom:`2px solid ${adminTab===id?BRAND.yellow:"transparent"}`}}>{lbl}</button>
        ))}
      </div>

      {/* ── TAB: HF Setup ── */}
      {adminTab==="hf"&&(
        <div style={{padding:"20px 20px 90px"}}>
          <div style={{fontSize:14,fontWeight:800,color:BRAND.text,marginBottom:6}}>⚙ Hugging Face Setup</div>
          <div style={{fontSize:12,color:BRAND.textMuted,lineHeight:1.7,marginBottom:20}}>
            Data CSV disimpan di Hugging Face Dataset. Setiap upload CSV baru → data lama tergantikan → semua user otomatis dapat data terbaru.
          </div>

          {/* Steps */}
          {[
            ["1","Buat akun Hugging Face","huggingface.co → Sign up (gratis)"],
            ["2","Buat Dataset baru","huggingface.co/new-dataset → Name: brand-data → Public → Create dataset"],
            ["3","Buat Access Token","huggingface.co/settings/tokens → New token → Role: Write → Generate"],
            ["4","Isi form di bawah","Masukkan nama repo dan token, lalu simpan"],
          ].map(([n,title,desc])=>(
            <div key={n} style={{display:"flex",gap:12,marginBottom:14,alignItems:"flex-start"}}>
              <div style={{width:26,height:26,borderRadius:"50%",background:BRAND.yellow,color:"#0A0C10",fontSize:12,fontWeight:800,display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0}}>{n}</div>
              <div><div style={{fontSize:12,fontWeight:700,color:BRAND.text}}>{title}</div><div style={{fontSize:11,color:BRAND.textMuted,marginTop:2}}>{desc}</div></div>
            </div>
          ))}

          <label style={S.formLabel}>Nama Repo (format: username/nama-dataset)</label>
          <input value={hfInput.repo} onChange={e=>setHFInput(p=>({...p,repo:e.target.value}))}
            placeholder="contoh: adtree/brand-data"
            style={{...S.formInput,marginBottom:12}}/>

          <label style={S.formLabel}>Access Token (Write)</label>
          <input value={hfInput.token} onChange={e=>setHFInput(p=>({...p,token:e.target.value}))}
            type="password" placeholder="hf_xxxxxxxxxxxxxxxxxxxx"
            style={{...S.formInput,marginBottom:10}}/>

          {csvMsg&&<div style={{fontSize:12,fontWeight:600,color:csvStatus==="success"?BRAND.green:BRAND.red,marginBottom:12,lineHeight:1.5}}>{csvMsg}</div>}

          <button onClick={saveHFConfig2} style={{...S.cta,marginBottom:10}}>💾 Simpan Konfigurasi HF</button>
          {hfConfig.repo&&(
            <button onClick={()=>{saveHFConfig({});setHFConfigSt({});setHFInput({repo:"",token:""});setCsvMsg("✓ Konfigurasi dihapus.");setCsvStatus("success");}}
              style={{display:"block",width:"100%",padding:"12px",borderRadius:12,border:`1px solid ${BRAND.cardBorder}`,background:"transparent",color:BRAND.textMuted,fontSize:13,fontWeight:600,cursor:"pointer"}}>
              ✕ Hapus Konfigurasi
            </button>
          )}

          <div style={{background:"#F5C84208",border:`1px solid ${BRAND.yellowBorder}`,borderRadius:12,padding:"12px 14px",marginTop:16}}>
            <div style={{fontSize:11,fontWeight:700,color:BRAND.yellow,marginBottom:6}}>💡 Cara Update Data ke Semua User</div>
            <div style={{fontSize:11,color:BRAND.textMuted,lineHeight:1.7}}>
              1. Setelah HF dikonfigurasi, pergi ke tab <strong style={{color:BRAND.text}}>📤 CSV</strong><br/>
              2. Upload file CSV baru → otomatis tersimpan di Hugging Face<br/>
              3. Semua user yang buka/refresh app langsung dapat data terbaru<br/>
              4. Tidak perlu deploy ulang Vercel
            </div>
          </div>

          <div style={{background:"#1A2640",borderRadius:12,padding:"12px 14px",marginTop:12,border:`1px solid ${BRAND.cardBorder}`}}>
            <div style={{fontSize:11,fontWeight:700,color:BRAND.textSub,marginBottom:4}}>Status Saat Ini</div>
            <div style={{fontSize:11,color:hfConfig.repo?BRAND.green:BRAND.textMuted}}>
              {hfConfig.repo ? `✓ HF aktif: ${hfConfig.repo}` : "✗ Belum dikonfigurasi — app pakai data default"}
            </div>
          </div>
        </div>
      )}

      {/* ── TAB: CSV Upload ── */}
      {adminTab==="upload"&&(
        <div style={{padding:"20px 20px 90px"}}>
          <div style={{fontSize:14,fontWeight:800,color:BRAND.text,marginBottom:4}}>Upload CSV Lokal</div>
          <div style={{fontSize:12,color:BRAND.textMuted,marginBottom:16,lineHeight:1.6}}>Upload CSV → otomatis tersimpan di Hugging Face → semua user dapat data terbaru. Pastikan <span style={{color:BRAND.yellow,fontWeight:700}}>⚙ HF Setup</span> sudah dikonfigurasi dulu.</div>
          <div onClick={()=>fileRef.current?.click()} style={{border:`2px dashed ${csvStatus==="success"?BRAND.green:csvStatus==="error"?BRAND.red:BRAND.cardBorder}`,borderRadius:16,padding:"28px 20px",textAlign:"center",cursor:"pointer",background:csvStatus==="success"?BRAND.green+"08":csvStatus==="error"?BRAND.red+"08":BRAND.card,marginBottom:14}}>
            <div style={{fontSize:32,marginBottom:8}}>{csvStatus==="loading"?"⏳":csvStatus==="success"?"✅":csvStatus==="error"?"❌":"📤"}</div>
            <div style={{fontSize:14,fontWeight:700,color:BRAND.text,marginBottom:4}}>{csvStatus==="loading"?"Memproses...":csvStatus?"Selesai":"Klik untuk pilih file CSV"}</div>
            {csvMsg&&<div style={{fontSize:12,fontWeight:600,color:csvStatus==="success"?BRAND.green:BRAND.red,marginTop:8,lineHeight:1.5}}>{csvMsg}</div>}
          </div>
          <input ref={fileRef} type="file" accept=".csv,text/csv" onChange={handleCSV} style={{display:"none"}}/>
          <button onClick={()=>fileRef.current?.click()} style={{...S.cta}}>📤 Pilih File CSV</button>
        </div>
      )}

      {/* ── TAB: Brand List ── */}
      {adminTab==="list"&&(
        <div style={{padding:"12px 16px 90px"}}>
          <div style={{fontSize:11,color:BRAND.textMuted,marginBottom:12}}>{hotels.length} total · {hotels.filter(h=>h.published).length} aktif · {hotels.filter(h=>!h.published).length} hidden</div>
          {hotels.map(h=>(
            <div key={h.poi_id} style={{...S.listCard,opacity:h.published?1:0.4,marginBottom:8}}>
              <img src={h.thumb} alt={h.name} style={S.listThumb} onError={e=>e.target.src=FALLBACK_THUMBS[0]}/>
              <div style={{flex:1,minWidth:0}}>
                <div style={{fontSize:12,fontWeight:700,color:BRAND.text,overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"}}>{h.name}</div>
                <div style={{fontSize:10,color:BRAND.textMuted,marginTop:1}}>{h.city_display||h.l2}, {h.l1}</div>
                <div style={{display:"flex",gap:6,marginTop:4,alignItems:"center"}}><ScoreBadge val={h.score}/><Stars count={h.star}/></div>
              </div>
              <div style={{flexShrink:0,textAlign:"right"}}>
                <div style={{fontSize:10,fontWeight:700,color:h.published?BRAND.green:BRAND.red,marginBottom:5}}>{h.published?"✓ Aktif":"✗ Hidden"}</div>
                <button onClick={()=>togglePublish(h.poi_id)} style={{fontSize:10,fontWeight:700,background:h.published?"#E8547A14":"#2DD4A414",border:`1px solid ${h.published?BRAND.red:BRAND.green}44`,color:h.published?BRAND.red:BRAND.green,borderRadius:8,padding:"4px 10px",cursor:"pointer"}}>{h.published?"Hide":"Publish"}</button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* ── TAB: Add Brand ── */}
      {adminTab==="add"&&(
        <div style={{padding:"20px 20px 90px"}}>
          <AddBrandForm onAdd={h=>{const e=enrichHotel(h);setHotels(prev=>[e,...prev].sort((a,b)=>b.score-a.score));setAdminTab("list");}}/>
        </div>
      )}

      <nav style={S.nav}>
        {[["📋","Brand","list"],["📤","Upload","upload"],["⚙","HF Setup","hf"],["➕","Tambah","add"],["🚪","Keluar","logout"]].map(([ic,lb,id])=>(
          <div key={id} style={{...S.navItem,...(adminTab===id?S.navActive:{})}} onClick={()=>id==="logout"?(setIsAdmin(false),setView("home")):setAdminTab(id)}>
            <span style={{fontSize:16}}>{ic}</span><span style={S.navLbl}>{lb}</span>
          </div>
        ))}
      </nav>
    </div>
  );

  // ── Admin Login ──────────────────────────────────────────────────────────────
  if(view==="admin") return (
    <div style={{...S.root,display:"flex",flexDirection:"column",justifyContent:"center",alignItems:"center",padding:"40px 28px",minHeight:"100vh"}}>
      <div style={S.noise}/>
      <img src={LOGO_SRC} alt="AdtreeGO" style={{height:30,width:"auto",marginBottom:36,position:"relative",zIndex:1}}/>
      <div style={{background:BRAND.card,border:`1px solid ${BRAND.cardBorder}`,borderRadius:20,padding:"32px 28px",width:"100%",maxWidth:340,position:"relative",zIndex:1}}>
        <div style={{fontSize:18,fontWeight:800,color:BRAND.text,marginBottom:4}}>Admin Login</div>
        <div style={{fontSize:12,color:BRAND.textMuted,marginBottom:24}}>Akses terbatas untuk tim Adtree</div>
        <label style={S.formLabel}>Username</label>
        <input value={adminUser} onChange={e=>setAdminUser(e.target.value)} placeholder="" style={S.formInput} onKeyDown={e=>e.key==="Enter"&&adminLogin()}/>
        <label style={{...S.formLabel,marginTop:14}}>Password</label>
        <input value={adminPass} onChange={e=>setAdminPass(e.target.value)} type="password" placeholder="" style={S.formInput} onKeyDown={e=>e.key==="Enter"&&adminLogin()}/>
        {adminErr&&<div style={{color:BRAND.red,fontSize:11,marginTop:8,fontWeight:600}}>{adminErr}</div>}
        <button onClick={adminLogin} style={{...S.cta,marginTop:20}}>Masuk</button>
        <button onClick={()=>setView("home")} style={{display:"block",width:"100%",marginTop:10,padding:"12px",background:"transparent",border:`1px solid ${BRAND.cardBorder}`,borderRadius:12,color:BRAND.textMuted,fontSize:13,fontWeight:600,cursor:"pointer"}}>← Kembali ke App</button>
      </div>
    </div>
  );

  // ── Detail Modal ─────────────────────────────────────────────────────────────
  if(sel) return (
    <div style={{...S.root,overflowY:"auto"}}>
      <div style={S.noise}/>
      {/* Back bar */}
      <div style={{position:"sticky",top:0,zIndex:50,background:"#0C1120",borderBottom:`1px solid ${BRAND.cardBorder}`,padding:"14px 16px",display:"flex",alignItems:"center",gap:12}}>
        <button onClick={()=>setSel(null)} style={{background:BRAND.card,border:`1px solid ${BRAND.cardBorder}`,borderRadius:10,padding:"6px 12px",color:BRAND.text,fontSize:13,fontWeight:700,cursor:"pointer",display:"flex",alignItems:"center",gap:6}}>
          ← Kembali
        </button>
        <div style={{fontSize:13,fontWeight:700,color:BRAND.textSub,overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap",flex:1}}>{sel.name}</div>
      </div>

      {/* Hero */}
      <div style={{position:"relative",height:220,margin:"12px 16px 0",borderRadius:16,overflow:"hidden"}}>
        <img src={sel.photo} alt={sel.name} style={{width:"100%",height:"100%",objectFit:"cover",display:"block"}} onError={e=>e.target.src=FALLBACK_PHOTOS[0]}/>
        <div style={{position:"absolute",inset:0,background:"linear-gradient(to top, rgba(10,15,35,0.85) 0%, transparent 50%)"}}/>
        <div style={{position:"absolute",bottom:12,left:12,right:12,display:"flex",justifyContent:"space-between",alignItems:"flex-end"}}>
          <div style={{fontSize:11,fontWeight:700,borderRadius:20,padding:"4px 10px",color:getTierColor(sel.price_tier),background:getTierColor(sel.price_tier)+"25",border:`1px solid ${getTierColor(sel.price_tier)}55`}}>{getTierLabel(sel.price_tier)}</div>
          <ScoreBadge val={sel.score}/>
        </div>
      </div>

      <div style={{padding:"16px 20px 36px"}}>
        <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:12}}>
          <div style={{flex:1,minWidth:0}}>
            <div style={{fontSize:20,fontWeight:800,color:BRAND.text,lineHeight:1.2,marginBottom:4}}>{sel.name}</div>
            <div style={{fontSize:12,color:BRAND.textMuted}}>📍 {sel.city_display||sel.l2}, {sel.l1}</div>
          </div>
          <button onClick={()=>toggleSave(sel.poi_id)} style={{background:saved.includes(sel.poi_id)?BRAND.yellowDim:"transparent",border:`1px solid ${saved.includes(sel.poi_id)?BRAND.yellow:BRAND.cardBorder}`,borderRadius:10,padding:"7px 10px",cursor:"pointer",fontSize:18,marginLeft:10,flexShrink:0}}>🔖</button>
        </div>

        {/* Promo */}
        <div style={{background:"#F5C84209",border:`1px solid #F5C84230`,borderRadius:12,padding:"12px 14px",marginBottom:14}}>
          <div style={{display:"flex",justifyContent:"space-between",marginBottom:5}}>
            <span style={{fontSize:10,fontWeight:800,color:BRAND.yellow,letterSpacing:"0.1em"}}>🎁 PROMO AKTIF</span>
            <span style={{fontSize:11,fontWeight:800,color:BRAND.green,background:"#2DD4A422",borderRadius:10,padding:"2px 8px"}}>Max 40%</span>
          </div>
          <div style={{fontSize:13,fontWeight:600,color:BRAND.textSub,lineHeight:1.5}}>{sel.promo}</div>
        </div>

        {/* Stats */}
        <div style={{display:"grid",gridTemplateColumns:"1fr 1fr 1fr",gap:8,marginBottom:14}}>
          {[["💰","AOV/Malam",fmtIdr(sel.aov_idr)],["⭐","Bintang",sel.star>0?sel.star+" ★":"N/A"],["🗺️","Provinsi",sel.l1.length>12?sel.l1.slice(0,11)+"…":sel.l1],["📍","Kota/Kab",(sel.city_display||sel.l2).length>11?(sel.city_display||sel.l2).slice(0,10)+"…":(sel.city_display||sel.l2)],["📊","Harga",getTierLabel(sel.price_tier)],["🎯","Skor",sel.score+" pt"]].map(([ico,lbl,val])=>(
            <div key={lbl} style={{background:"#1A2640",borderRadius:10,padding:"10px",display:"flex",flexDirection:"column",gap:3}}>
              <span style={{fontSize:14}}>{ico}</span>
              <div style={{fontSize:9,color:BRAND.textMuted,letterSpacing:"0.08em",fontWeight:700}}>{lbl}</div>
              <div style={{fontSize:11,fontWeight:700,color:BRAND.textSub}}>{val}</div>
            </div>
          ))}
        </div>

        {/* Campaign Tags */}
        <div style={{fontSize:11,fontWeight:700,color:BRAND.textMuted,letterSpacing:"0.1em",marginBottom:8}}>Jenis Kampanye</div>
        <div style={{display:"flex",flexDirection:"column",gap:6,marginBottom:20}}>
          {sel.tags.map(t=>(
            <div key={t} style={{background:"#1A2640",borderRadius:10,padding:"10px 14px",display:"flex",alignItems:"center",gap:10,border:`1px solid ${BRAND.cardBorder}`}}>
              <span style={{fontSize:18}}>{TAG_ICON[t]}</span>
              <span style={{fontSize:13,fontWeight:600,color:BRAND.textSub,flex:1}}>{t}</span>
              <span style={{fontSize:11,color:BRAND.green,fontWeight:800}}>✓</span>
            </div>
          ))}
        </div>

        {/* Single Drive CTA */}
        {sel.drive_link ? (
          <a href={sel.drive_link} target="_blank" rel="noopener noreferrer"
            style={{display:"flex",alignItems:"center",justifyContent:"center",gap:10,background:BRAND.yellow,color:"#0A0C10",borderRadius:14,padding:"15px",fontSize:14,fontWeight:800,textDecoration:"none",letterSpacing:"0.03em",marginBottom:10}}>
            <span style={{fontSize:20}}>📂</span> Lihat Content Asset
          </a>
        ) : (
          <div style={{display:"flex",alignItems:"center",justifyContent:"center",gap:8,background:"#ffffff06",borderRadius:14,padding:"15px",fontSize:13,fontWeight:600,color:BRAND.textMuted,border:`1px solid ${BRAND.cardBorder}`,marginBottom:10}}>
            <span>📂</span> Content asset belum tersedia
          </div>
        )}

        <div style={{textAlign:"center",fontSize:10,color:BRAND.textMuted,letterSpacing:"0.08em"}}>Powered by <span style={{color:BRAND.yellow,fontWeight:700}}>AdtreeGO</span> · TikTok Indonesia</div>
      </div>
    </div>
  );

  // ── Main Public UI ───────────────────────────────────────────────────────────
  return (
    <div style={S.root}>
      <div style={S.noise}/>
      <header style={S.header}>
        <div style={S.topBar}>
          <img src={LOGO_SRC} alt="AdtreeGO" style={{height:26,width:"auto",display:"block"}}/>
          <div style={S.headerPill}>Brand Opportunities</div>
        </div>
        <div style={S.heroTitle}>Temukan Brand<br/><span style={S.heroAccent}>Terbaik</span> Untukmu</div>
        <div style={S.heroSub}>Pilih kampanye, buat konten, dan mulai cuan bareng AdtreeGO.</div>
        <div style={S.searchWrap}>
          <span style={{fontSize:14,opacity:0.4}}>🔍</span>
          <input placeholder="Cari hotel, kota, atau provinsi..." value={search} onChange={e=>setSearch(e.target.value)} style={S.searchInput}/>
          {search&&<button onClick={()=>setSearch("")} style={{background:"none",border:"none",color:BRAND.textMuted,cursor:"pointer",fontSize:14,padding:0}}>✕</button>}
        </div>
      </header>

      {loading&&<div style={{textAlign:"center",padding:"40px",color:BRAND.textMuted,fontSize:13}}>Memuat data brand...</div>}

      {view==="saved"&&(
        <div style={{padding:"12px 16px 0"}}>
          <div style={{display:"flex",alignItems:"center",gap:8,background:BRAND.yellowDim,border:`1px solid ${BRAND.yellowBorder}`,borderRadius:12,padding:"10px 14px"}}>
            <span>🔖</span><span style={{fontSize:12,fontWeight:700,color:BRAND.yellow}}>Brand Tersimpan</span>
            <span style={{fontSize:11,color:BRAND.textMuted,marginLeft:"auto"}}>{savedHotels.length} brand</span>
          </div>
        </div>
      )}

      <div style={S.catWrap}>
        {CATS.map(c=>(
          <button key={c.id} style={{...S.catBtn,...(cat===c.id&&view==="home"?S.catActive:{})}} onClick={()=>{setCat(c.id);setView("home");}}>
            <span>{c.icon}</span><span style={S.catTxt}>{c.label}</span>
            {!c.live&&<span style={S.comingSoon}>Segera</span>}
          </button>
        ))}
      </div>
      <div style={S.divider}/>

      {!loading&&(view==="home"&&cat!=="accommodations"?(
        <div style={S.csScreen}>
          <div style={S.csCircle}>{CATS.find(c=>c.id===cat)?.icon}</div>
          <div style={S.csTitle}>Segera Hadir</div>
          <div style={S.csSub}>Kategori <strong style={{color:BRAND.yellow}}>{CATS.find(c=>c.id===cat)?.label}</strong> sedang disiapkan.</div>
        </div>
      ):(
        <>
          <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",padding:"12px 16px 0",position:"relative",zIndex:10}}>
            <div style={{position:"relative"}}>
              <button style={S.regionBtn} onClick={()=>setDrop(!drop)}>
                <span>📍</span>
                <span style={{fontSize:12,fontWeight:600,color:BRAND.textSub,maxWidth:130,overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"}}>{l1==="Semua Provinsi"?"Semua Provinsi":l1}</span>
                <span style={{fontSize:9,color:BRAND.textMuted}}>{drop?"▲":"▼"}</span>
              </button>
              {drop&&(
                <div style={S.dropdown}>
                  {ALL_L1.map(r=>(
                    <div key={r} style={{...S.dropItem,...(l1===r?S.dropActive:{})}} onClick={()=>{setL1(r);setDrop(false);}}>
                      <span>{r==="Semua Provinsi"?"🗺️":"📍"}</span><span style={{flex:1}}>{r}</span>
                      {l1===r&&<span style={{color:BRAND.yellow}}>✓</span>}
                    </div>
                  ))}
                </div>
              )}
            </div>
            <div style={S.countBadge}>{displayList.length} brand</div>
          </div>

          <div style={S.tagRow}>
            <button style={{...S.tagBtn,...(tag===null?S.tagActive:{})}} onClick={()=>setTag(null)}>Semua</button>
            {ALL_TAGS.map(t=>(
              <button key={t} style={{...S.tagBtn,...(tag===t?S.tagActive:{})}} onClick={()=>setTag(tag===t?null:t)}>
                {TAG_ICON[t]} {t.split(" ")[0]}
              </button>
            ))}
          </div>

          {view==="home"&&!search&&!tag&&l1==="Semua Provinsi"&&filtered.length>0&&(
            <section style={{padding:"14px 0 0"}}>
              <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",padding:"0 16px 10px"}}>
                <span style={S.secHeadTxt}>🏆 Skor Tertinggi</span>
                <span style={S.secHeadCount}>Algoritma AdtreeGO</span>
              </div>
              <div style={{display:"flex",gap:10,overflowX:"auto",scrollbarWidth:"none",padding:"0 16px 4px"}}>
                {filtered.slice(0,3).map((h,i)=>(
                  <div key={h.poi_id} style={{flexShrink:0,width:172,background:BRAND.card,borderRadius:14,overflow:"hidden",cursor:"pointer",border:`1px solid ${i===0?BRAND.yellow+"55":BRAND.cardBorder}`}} onClick={()=>setSel(h)}>
                    <div style={{position:"relative",height:108}}>
                      <img src={h.photo} alt={h.name} style={{width:"100%",height:"100%",objectFit:"cover",display:"block"}} onError={e=>e.target.src=FALLBACK_PHOTOS[0]}/>
                      <div style={{position:"absolute",top:8,left:8,fontSize:10,fontWeight:800,borderRadius:20,padding:"2px 8px",background:i===0?BRAND.yellow:i===1?"#C0C0C0":"#CD7F32",color:"#0A0C10"}}>#{i+1}</div>
                      <div style={{position:"absolute",bottom:8,right:8,fontSize:9,fontWeight:700,borderRadius:20,padding:"2px 7px",color:getTierColor(h.price_tier),background:getTierColor(h.price_tier)+"25",border:`1px solid ${getTierColor(h.price_tier)}55`}}>{getTierLabel(h.price_tier)}</div>
                    </div>
                    <div style={{padding:"10px 12px 14px"}}>
                      <div style={{fontSize:12,fontWeight:700,color:BRAND.text,lineHeight:1.3,marginBottom:3,overflow:"hidden",display:"-webkit-box",WebkitLineClamp:2,WebkitBoxOrient:"vertical"}}>{h.name}</div>
                      <div style={{fontSize:10,color:BRAND.textMuted,marginBottom:4}}>📍 {h.city_display||h.l2}</div>
                      <div style={{display:"flex",alignItems:"center",justifyContent:"space-between"}}><Stars count={h.star}/><ScoreBadge val={h.score}/></div>
                      <div style={{fontSize:13,fontWeight:800,color:BRAND.yellow,marginTop:5}}>{fmtIdr(h.aov_idr)}<span style={{fontSize:10,fontWeight:400,color:BRAND.textMuted,marginLeft:2}}>/malam</span></div>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          )}

          <section style={{padding:"14px 16px 0"}}>
            <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",paddingBottom:10}}>
              <span style={S.secHeadTxt}>{view==="saved"?"🔖 Tersimpan":tag?`${TAG_ICON[tag]} ${tag}`:search?`"${search}"`:cat==="accommodations"?"Semua Akomodasi":""}</span>
              <span style={S.secHeadCount}>{displayList.length}</span>
            </div>
            {displayList.length===0&&<div style={S.empty}>{view==="saved"?<span>Belum ada brand tersimpan.<br/>Tap 🔖 untuk menyimpan.</span>:"Tidak ada brand ditemukan."}</div>}
            {displayList.map(h=>(
              <div key={h.poi_id} style={S.listCard} onClick={()=>setSel(h)}>
                <div style={{position:"relative",flexShrink:0}}>
                  <img src={h.thumb} alt={h.name} style={S.listThumb} onError={e=>e.target.src=FALLBACK_THUMBS[0]}/>
                  <div style={{position:"absolute",left:42,top:42,width:11,height:11,borderRadius:"50%",border:`2px solid ${BRAND.bg}`,background:getTierColor(h.price_tier)}}/>
                </div>
                <div style={S.listMeta}>
                  <div style={{fontSize:13,fontWeight:700,color:BRAND.text,overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"}}>{h.name}</div>
                  <div style={{fontSize:10,color:BRAND.textMuted,marginTop:2,marginBottom:4}}>📍 {h.city_display||h.l2}, {h.l1}</div>
                  <div style={{display:"flex",gap:4,flexWrap:"wrap",alignItems:"center"}}>
                    {h.tags.slice(0,2).map(t=><span key={t} style={{fontSize:9,fontWeight:600,background:"#1E2A45",color:BRAND.textMuted,borderRadius:10,padding:"2px 6px",border:`1px solid ${BRAND.cardBorder}`}}>{TAG_ICON[t]} {t.split(" ")[0]}</span>)}
                    <ScoreBadge val={h.score}/>
                  </div>
                </div>
                <div style={{display:"flex",flexDirection:"column",alignItems:"flex-end",gap:4,flexShrink:0}}>
                  <button onClick={e=>{e.stopPropagation();toggleSave(h.poi_id);}} style={{background:saved.includes(h.poi_id)?BRAND.yellowDim:"transparent",border:`1px solid ${saved.includes(h.poi_id)?BRAND.yellow:BRAND.cardBorder}`,borderRadius:8,padding:"5px 7px",cursor:"pointer",fontSize:14,color:saved.includes(h.poi_id)?BRAND.yellow:BRAND.textMuted}}>🔖</button>
                  <div style={{fontSize:12,fontWeight:800,color:BRAND.yellow}}>{fmtIdr(h.aov_idr)}</div>
                  <div style={{fontSize:9,color:BRAND.textMuted}}>/malam</div>
                </div>
              </div>
            ))}
            <div style={{height:8}}/>
          </section>
        </>
      ))}

      <nav style={S.nav}>
        <div style={{...S.navItem,...(view==="home"?S.navActive:{})}} onClick={()=>setView("home")}><span style={{fontSize:18}}>⊞</span><span style={S.navLbl}>Beranda</span></div>
        <div style={{...S.navItem,...(view==="saved"?S.navActive:{})}} onClick={()=>setView("saved")}>
          <span style={{fontSize:18,position:"relative"}}>🔖{saved.length>0&&<span style={{position:"absolute",top:-4,right:-6,background:BRAND.yellow,color:"#0A0C10",fontSize:8,fontWeight:800,borderRadius:"50%",width:14,height:14,display:"flex",alignItems:"center",justifyContent:"center"}}>{saved.length}</span>}</span>
          <span style={S.navLbl}>Tersimpan</span>
        </div>
        <div style={S.navItem} onClick={()=>setView("admin")}><span style={{fontSize:18}}>⚙️</span><span style={S.navLbl}>Admin</span></div>
      </nav>
    </div>
  );
}

function AddBrandForm({onAdd}) {
  const [f,setF]=useState({name:"",l1:"Jakarta",l2:"",city_display:"",star:"4",price_tier:"Mid [30,50]",aov_usd:"40",photo:"",promo:"",drive_link:"",tags:[]});
  const toggle=t=>setF(p=>({...p,tags:p.tags.includes(t)?p.tags.filter(x=>x!==t):[...p.tags,t]}));
  const submit=()=>{
    if(!f.name.trim()||!f.l2.trim()){alert("Nama hotel dan kota wajib diisi.");return;}
    onAdd({poi_id:"manual_"+Date.now(),name:f.name,l1:f.l1,l2:f.l2,city_display:f.city_display||f.l2,star:parseFloat(f.star)||4,price_tier:f.price_tier,aov_idr:Math.round((parseFloat(f.aov_usd)||40)*18000),tags:f.tags,photo:f.photo,promo:f.promo,drive_link:f.drive_link,published:true});
  };
  return (
    <div style={{display:"flex",flexDirection:"column",gap:12}}>
      <div style={{fontSize:14,fontWeight:800,color:BRAND.text}}>Tambah Brand Manual</div>
      {[["Nama Hotel *","text",f.name,"name"],["Kota / Kab *","text",f.l2,"l2"],["Tampilan Kota","text",f.city_display,"city_display"],["URL Foto","url",f.photo,"photo"],["Google Drive Link","url",f.drive_link,"drive_link"],["Teks Promo (opsional)","text",f.promo,"promo"]].map(([lbl,type,val,key])=>(
        <div key={key}><label style={S.formLabel}>{lbl}</label><input value={val} onChange={e=>setF(p=>({...p,[key]:e.target.value}))} style={S.formInput} type={type} placeholder={lbl.replace(" *","")}/></div>
      ))}
      <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:10}}>
        <div><label style={S.formLabel}>Bintang</label><select value={f.star} onChange={e=>setF(p=>({...p,star:e.target.value}))} style={{...S.formInput,height:40}}>{["1","1.5","2","2.5","3","3.5","4","4.5","5"].map(s=><option key={s} value={s}>{s} ★</option>)}</select></div>
        <div><label style={S.formLabel}>AOV (USD)</label><input value={f.aov_usd} onChange={e=>setF(p=>({...p,aov_usd:e.target.value}))} style={S.formInput} type="number"/></div>
      </div>
      <div><label style={S.formLabel}>Tier Harga</label><select value={f.price_tier} onChange={e=>setF(p=>({...p,price_tier:e.target.value}))} style={{...S.formInput,height:40}}>{["Low [0,30]","Mid [30,50]","High [>50]"].map(t=><option key={t}>{t}</option>)}</select></div>
      <div><label style={S.formLabel}>Provinsi</label><select value={f.l1} onChange={e=>setF(p=>({...p,l1:e.target.value}))} style={{...S.formInput,height:40}}>{ALL_L1.filter(r=>r!=="Semua Provinsi").map(r=><option key={r}>{r}</option>)}</select></div>
      <div><label style={S.formLabel}>Kampanye Aktif</label>
        <div style={{display:"flex",flexWrap:"wrap",gap:6,marginTop:6}}>{ALL_TAGS.map(t=><button key={t} onClick={()=>toggle(t)} style={{fontSize:10,fontWeight:600,padding:"5px 10px",borderRadius:20,border:`1px solid ${f.tags.includes(t)?BRAND.yellow:BRAND.cardBorder}`,background:f.tags.includes(t)?BRAND.yellowDim:"transparent",color:f.tags.includes(t)?BRAND.yellow:BRAND.textMuted,cursor:"pointer"}}>{TAG_ICON[t]} {t}</button>)}</div>
      </div>

      <button onClick={submit} style={{...S.cta,marginTop:8}}>✓ Simpan Brand</button>
    </div>
  );
}

const S = {
  root:{minHeight:"100vh",background:BRAND.bg,color:BRAND.text,fontFamily:"'DM Sans','Helvetica Neue',sans-serif",maxWidth:430,margin:"0 auto",position:"relative",overflowX:"hidden",paddingBottom:90},
  noise:{position:"fixed",inset:0,pointerEvents:"none",zIndex:0,backgroundImage:"url(\"data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.03'/%3E%3C/svg%3E\")"},
  header:{padding:"48px 20px 20px",background:`linear-gradient(180deg, #0C1120 0%, ${BRAND.bg} 100%)`,position:"relative",zIndex:2},
  topBar:{display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:16},
  headerPill:{fontSize:10,fontWeight:700,letterSpacing:"0.1em",color:BRAND.yellow,background:BRAND.yellowDim,border:`1px solid ${BRAND.yellowBorder}`,borderRadius:20,padding:"4px 10px"},
  heroTitle:{fontSize:26,fontWeight:800,color:BRAND.text,lineHeight:1.2,marginBottom:6,letterSpacing:"-0.3px"},
  heroAccent:{color:BRAND.yellow},
  heroSub:{fontSize:12,color:BRAND.textMuted,lineHeight:1.6,marginBottom:16},
  searchWrap:{display:"flex",alignItems:"center",background:BRAND.card,border:`1px solid ${BRAND.cardBorder}`,borderRadius:12,padding:"10px 14px",gap:8},
  searchInput:{flex:1,background:"transparent",border:"none",outline:"none",color:BRAND.text,fontSize:13,fontFamily:"inherit"},
  catWrap:{display:"flex",padding:"0 16px",position:"relative",zIndex:2},
  catBtn:{flex:1,display:"flex",flexDirection:"column",alignItems:"center",gap:3,padding:"10px 4px",background:"transparent",border:"none",cursor:"pointer",borderBottom:`2px solid ${BRAND.cardBorder}`,color:BRAND.textMuted,position:"relative"},
  catActive:{color:BRAND.yellow,borderBottomColor:BRAND.yellow},
  catTxt:{fontSize:11,fontWeight:700,letterSpacing:"0.04em"},
  comingSoon:{position:"absolute",top:5,right:4,fontSize:7,background:"#F5A62333",color:"#F5A623",borderRadius:10,padding:"1px 4px",fontWeight:800},
  divider:{height:1,background:BRAND.cardBorder},
  csScreen:{display:"flex",flexDirection:"column",alignItems:"center",padding:"80px 30px",textAlign:"center"},
  csCircle:{fontSize:52,marginBottom:18,background:BRAND.card,borderRadius:"50%",width:90,height:90,display:"flex",alignItems:"center",justifyContent:"center",border:`1px solid ${BRAND.cardBorder}`},
  csTitle:{fontSize:22,fontWeight:800,color:BRAND.text,marginBottom:8},
  csSub:{fontSize:13,color:BRAND.textMuted,lineHeight:1.7},
  regionBtn:{display:"flex",alignItems:"center",gap:6,background:BRAND.card,border:`1px solid ${BRAND.cardBorder}`,borderRadius:10,padding:"7px 12px",cursor:"pointer",color:BRAND.text},
  dropdown:{position:"absolute",top:"calc(100% + 6px)",left:0,width:220,background:"#18243D",border:`1px solid ${BRAND.cardBorder}`,borderRadius:14,maxHeight:260,overflowY:"auto",boxShadow:"0 8px 32px rgba(0,0,0,0.6)",zIndex:100},
  dropItem:{padding:"10px 14px",fontSize:12,color:BRAND.textSub,cursor:"pointer",display:"flex",alignItems:"center",gap:8,borderBottom:`1px solid ${BRAND.cardBorder}`},
  dropActive:{color:BRAND.yellow,background:BRAND.yellowDim},
  countBadge:{fontSize:11,fontWeight:700,color:BRAND.yellow,background:BRAND.yellowDim,borderRadius:20,padding:"4px 10px",border:`1px solid ${BRAND.yellowBorder}`},
  tagRow:{display:"flex",gap:6,padding:"10px 16px 0",overflowX:"auto",scrollbarWidth:"none"},
  tagBtn:{flexShrink:0,padding:"5px 12px",borderRadius:20,border:`1px solid ${BRAND.cardBorder}`,background:"transparent",color:BRAND.textMuted,fontSize:11,fontWeight:600,cursor:"pointer",whiteSpace:"nowrap"},
  tagActive:{background:BRAND.yellow,color:"#0A0C10",borderColor:"transparent"},
  secHeadTxt:{fontSize:12,fontWeight:700,color:BRAND.textSub,letterSpacing:"0.06em"},
  secHeadCount:{fontSize:12,fontWeight:800,color:BRAND.yellow},
  listCard:{display:"flex",alignItems:"center",gap:12,background:BRAND.card,borderRadius:14,padding:"12px 12px",cursor:"pointer",border:`1px solid ${BRAND.cardBorder}`,marginBottom:8,position:"relative"},
  listThumb:{width:52,height:52,borderRadius:12,objectFit:"cover",flexShrink:0},
  listMeta:{flex:1,minWidth:0},
  empty:{textAlign:"center",padding:"48px 20px",color:BRAND.textMuted,lineHeight:1.8,fontSize:13},
  nav:{position:"fixed",bottom:0,left:"50%",transform:"translateX(-50%)",width:"100%",maxWidth:430,background:"#0C1120",borderTop:`1px solid ${BRAND.cardBorder}`,display:"flex",zIndex:200,padding:"10px 0 24px"},
  navItem:{flex:1,display:"flex",flexDirection:"column",alignItems:"center",gap:3,cursor:"pointer",color:BRAND.cardBorder,position:"relative"},
  navActive:{color:BRAND.yellow},
  navLbl:{fontSize:9,fontWeight:700,letterSpacing:"0.06em"},
  cta:{display:"block",width:"100%",padding:"15px",borderRadius:14,border:"none",fontSize:14,fontWeight:800,color:"#0A0C10",cursor:"pointer",background:BRAND.yellow,letterSpacing:"0.03em"},
  formLabel:{fontSize:11,fontWeight:700,color:BRAND.textMuted,letterSpacing:"0.06em",display:"block",marginBottom:6},
  formInput:{width:"100%",background:BRAND.card,border:`1px solid ${BRAND.cardBorder}`,borderRadius:10,padding:"10px 14px",color:BRAND.text,fontSize:13,fontFamily:"inherit",outline:"none",boxSizing:"border-box"},
};
