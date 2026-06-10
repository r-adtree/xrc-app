import { useState, useMemo, useEffect, useCallback, useRef } from "react";

const B = {
  yellow:"#F5C842", yellowDim:"#F5C84215", yellowBorder:"#F5C84235",
  bg:"#111729", card:"#18243D", cardBorder:"#1E2A45",
  text:"#E8EDF8", textMuted:"#5A6A8A", textSub:"#8A97B5",
  green:"#2DD4A4", red:"#E8547A", purple:"#7C6AF7",
  pink:"#FF6B8A", tiktokRed:"#FF2D55",
};

const LOGO_SRC = "data:image/png;base64,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";
const HF_PUBLIC_REPO = "radtree/brand-data";
const HF_FILE        = "brands.json";
const HF_CONFIG_KEY  = "adtree_hf_config_v2";
const getHFCfg   = () => { try{ return JSON.parse(localStorage.getItem(HF_CONFIG_KEY)||"{}"); }catch{ return {}; } };
const saveHFCfg  = c => localStorage.setItem(HF_CONFIG_KEY, JSON.stringify(c));
const HF_FETCH_URL  = `https://huggingface.co/datasets/${HF_PUBLIC_REPO}/resolve/main/${HF_FILE}`;
const HF_COMMIT_URL = `https://huggingface.co/api/datasets/${HF_PUBLIC_REPO}/commit/main`;

const FALLBACK_PHOTOS = [
  "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=400&h=260&fit=crop",
  "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=400&h=260&fit=crop",
  "https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=400&h=260&fit=crop",
  "https://images.unsplash.com/photo-1582719508461-905c673771fd?w=400&h=260&fit=crop",
  "https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?w=400&h=260&fit=crop",
  "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?w=400&h=260&fit=crop",
  "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=400&h=260&fit=crop",
  "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=400&h=260&fit=crop",
  "https://images.unsplash.com/photo-1501908734255-16579c18c25f?w=400&h=260&fit=crop",
  "https://images.unsplash.com/photo-1533105079780-92b9be482077?w=400&h=260&fit=crop",
];
const FT = FALLBACK_PHOTOS.map(u=>u.replace("w=400&h=260","w=80&h=80"));
const hx = id => { let h=0; for(let i=0;i<String(id).length;i++) h=(h*31+String(id).charCodeAt(i))>>>0; return h; };
const fp = id => FALLBACK_PHOTOS[hx(id)%FALLBACK_PHOTOS.length];
const ft = id => FT[hx(id)%FT.length];

const PROMOS = [
  "Konten kamu bisa langsung cuan! Komisi masuk otomatis setiap transaksi.",
  "Brand ini aktif cari kreator — peluang komisi besar menanti.",
  "Top seller bulan ini! Kreator lain sudah cuan dari brand ini.",
  "Produk laris, konten mudah dibuat, komisi menarik.",
  "Promo eksklusif khusus kreator AdtreeGO — jangan sampai ketinggalan.",
  "Double commission untuk kreator aktif bulan ini.",
  "Brand pilihan kreator berpenghasilan tertinggi di AdtreeGO.",
  "Konten wisata + komisi besar = passive income untuk kreatormu.",
];
const autoPromo = id => PROMOS[hx(id)%PROMOS.length];

const fmtIdr = n => {
  if(!n||isNaN(n)) return "—";
  n=Number(n);
  if(n>=1000000) return "Rp"+(n/1000000).toFixed(1).replace(".0","")+" Jt";
  if(n>=1000) return "Rp"+(n/1000).toFixed(0)+" Rb";
  return "Rp"+n;
};
const normTier = t => {
  if(!t) return "Mid";
  const s=String(t).toLowerCase();
  if(s.includes("low")||s.includes("0,30")||s.includes("budget")) return "Low";
  if(s.includes("high")||s.includes(">50")||s.includes("premium")) return "High";
  return "Mid";
};
const SEGMEN_LABEL = {Low:"Terjangkau",Mid:"Menengah",High:"Premium"};
const SEGMEN_COLOR = {Low:B.green,Mid:B.yellow,High:B.purple};

// Score: higher aov + commission + tags = higher score
function calcScore(item) {
  const aovMax = item.industry==="hotels"?5000000:item.industry==="ttd"?500000:200000;
  const aovScore = Math.min((item.aov||0)/aovMax,1)*30;
  const commNum = parseFloat(String(item.commission||"0").replace("%",""))||0;
  const commScore = Math.min(commNum/10,1)*40;
  const tagCount = (item.tags||item.cats||[]).length;
  const tagScore = Math.min(tagCount/5,1)*20;
  const pickScore = (item.adtree_pick==="Yes"?5:0)+(item.tiktok_pick==="Yes"?5:0);
  return Math.round(aovScore+commScore+tagScore+pickScore);
}

const HOTEL_TAGS_KEYS  = ["best_weekend","romantic_stays","family_friendly","luxurious_stays","weekend_getaway"];
const HOTEL_TAGS_NAMES = ["Best Weekend","Romantic","Family Friendly","Luxurious","Weekend Getaway"];
const HOTEL_TAG_ICON   = {"Best Weekend":"🏖️","Romantic":"💑","Family Friendly":"👨\u200d👩\u200d👧","Luxurious":"💎","Weekend Getaway":"🌿"};
const DINING_CATS_KEYS  = ["Best Seller","Hot Promo","Single Deal","Bundle Deal","Big Commission"];
const DINING_CATS_NAMES = ["Best Seller","Hot Promo","Single Deal","Bundle Deal","Big Commission"];
const DINING_CAT_ICON   = {"Best Seller":"🏆","Hot Promo":"🔥","Single Deal":"🍽️","Bundle Deal":"🛍️","Big Commission":"💰"};
const TTD_TAGS_KEYS  = ["best_weekend","romantic_experience","family_friendly"];
const TTD_TAGS_NAMES = ["Best Weekend","Romantic","Family Friendly"];
const TTD_TAG_ICON   = {"Best Weekend":"🎯","Romantic":"💑","Family Friendly":"👨\u200d👩\u200d👧"};

const LS_SAVED = "adtree_saved_v4";
const getSaved   = () => { try{return JSON.parse(localStorage.getItem(LS_SAVED)||"[]");}catch{return[];} };
const setSavedLS = ids => localStorage.setItem(LS_SAVED,JSON.stringify(ids));
const ADMIN_USER = "adtree@admin";
const ADMIN_PASS = "0ADTREE1234!";

async function loadXLSX() {
  if(window.XLSX) return window.XLSX;
  return new Promise((res,rej)=>{
    const s=document.createElement("script");
    s.src="https://cdnjs.cloudflare.com/ajax/libs/xlsx/0.18.5/xlsx.full.min.js";
    s.onload=()=>res(window.XLSX); s.onerror=rej;
    document.head.appendChild(s);
  });
}
function parseHotelSheet(rows) {
  return rows.map(r=>({
    id:String(r.poi_id||"h_"+Math.random().toString(36).slice(2)),
    industry:"hotels", name:r.poi_name||"",
    l1:r.l1_region||"", l2:r.l2_region||"", city:r.city_display||r.l2_region||"",
    star:parseFloat(r.star_rating)||0, segmen:normTier(r.price_tier),
    photo:r.photo_url||"", published:String(r.published||"Yes")!=="No",
    tags:HOTEL_TAGS_KEYS.map((k,i)=>r[k]==="Yes"||r[k]===1?HOTEL_TAGS_NAMES[i]:null).filter(Boolean),
    adtree_pick:r.adtree_pick==="Yes"||r.adtree_pick===1?"Yes":"",
    tiktok_pick:r.tiktok_pick==="Yes"||r.tiktok_pick===1?"Yes":"",
    discount:r.discount_range||"", commission:r.commision_rate||"",
    promo:r.promo_text||"", aov:Number(r.aov_idr)||0, drive:r.drive_link||"",
  })).filter(r=>r.name.trim()).map(r=>({...r,
    score:calcScore(r),
    photo:r.photo||fp(r.id),
    thumb:r.photo?r.photo.replace("w=400&h=260","w=80&h=80"):ft(r.id),
    promo:r.promo||autoPromo(r.id),
  }));
}
function parseDiningSheet(rows) {
  return rows.map(r=>({
    id:String(r.poi_product_id||"d_"+Math.random().toString(36).slice(2)),
    industry:"dining", name:r.poi_product_name||"",
    brand:r.poi_name||r.poi_display||"", display:r.poi_display||r.poi_name||"",
    segmen:normTier(r.price_tier), photo:r.photo_url||"",
    published:String(r.published||"Yes")!=="No",
    cats:DINING_CATS_KEYS.map((k,i)=>r[k]==="Yes"||r[k]===1?DINING_CATS_NAMES[i]:null).filter(Boolean),
    adtree_pick:"", tiktok_pick:"",
    discount:r.discount_range||"", commission:r.commision_rate||"",
    promo:r.promo_text||"", aov:Number(r.aov_idr)||0, drive:r.drive_link||"",
  })).filter(r=>r.name.trim()).map(r=>({...r,
    score:calcScore({...r,tags:r.cats}),
    photo:r.photo||fp(r.id),
    thumb:r.photo?r.photo.replace("w=400&h=260","w=80&h=80"):ft(r.id),
    promo:r.promo||autoPromo(r.id),
  }));
}
function parseTTDSheet(rows) {
  return rows.map(r=>({
    id:String(r.poi_id||"t_"+Math.random().toString(36).slice(2)),
    industry:"ttd", name:r.poi_name||"",
    l1:r.l1_region||"", l2:r.l2_region||"", city:r.city_display||r.l2_region||"",
    segmen:normTier(r.price_tier), photo:r.photo_url||"",
    published:String(r.published||"Yes")!=="No",
    tags:TTD_TAGS_KEYS.map((k,i)=>r[k]==="Yes"||r[k]===1?TTD_TAGS_NAMES[i]:null).filter(Boolean),
    adtree_pick:r.adtree_pick==="Yes"||r.adtree_pick===1?"Yes":"",
    tiktok_pick:r.tiktok_pick==="Yes"||r.tiktok_pick===1?"Yes":"",
    discount:r.discount_range||"", commission:r.commision_rate||"",
    promo:r.promo_text||"", aov:Number(r.aov_idr)||0, drive:r.drive_link||"",
  })).filter(r=>r.name.trim()).map(r=>({...r,
    score:calcScore(r),
    photo:r.photo||fp(r.id),
    thumb:r.photo?r.photo.replace("w=400&h=260","w=80&h=80"):ft(r.id),
    promo:r.promo||autoPromo(r.id),
  }));
}
async function parseXLSXBuffer(buffer) {
  const XLSX=await loadXLSX();
  const wb=XLSX.read(new Uint8Array(buffer),{type:"array"});
  return {
    hotels:parseHotelSheet(XLSX.utils.sheet_to_json(wb.Sheets["hotels"]||wb.Sheets[wb.SheetNames[0]]||{})),
    dining:parseDiningSheet(XLSX.utils.sheet_to_json(wb.Sheets["dining"]||wb.Sheets[wb.SheetNames[1]]||{})),
    ttd:parseTTDSheet(XLSX.utils.sheet_to_json(wb.Sheets["ttd"]||wb.Sheets[wb.SheetNames[2]]||{})),
  };
}

// ── UI Components ─────────────────────────────────────────────────────────────
function ScoreBadge({val}) {
  const col = val>=75?B.green:val>=50?B.yellow:B.textMuted;
  return (
    <div style={{display:"flex",alignItems:"center",gap:3,background:col+"18",borderRadius:8,padding:"2px 7px",border:`1px solid ${col}33`}}>
      <span style={{fontSize:8}}>⚡</span>
      <span style={{fontSize:10,fontWeight:800,color:col}}>{val}pt</span>
    </div>
  );
}
function CommBadge({rate,large}) {
  if(!rate) return null;
  return (
    <div style={{display:"flex",alignItems:"center",gap:3,background:"#2DD4A418",borderRadius:large?10:8,padding:large?"5px 10px":"2px 7px",border:"1px solid #2DD4A433"}}>
      <span style={{fontSize:large?13:9}}>💸</span>
      <span style={{fontSize:large?13:10,fontWeight:800,color:B.green}}>{rate} komisi</span>
    </div>
  );
}
function DiscBadge({range,sm}) {
  if(!range) return null;
  return (
    <div style={{display:"flex",alignItems:"center",gap:2,background:"#E8547A14",borderRadius:sm?6:8,padding:sm?"1px 5px":"2px 7px",border:"1px solid #E8547A30"}}>
      <span style={{fontSize:sm?7:9}}>🏷️</span>
      <span style={{fontSize:sm?8:10,fontWeight:800,color:B.red}}>{range}</span>
    </div>
  );
}
function PickBadge({item,sm}) {
  const sz=sm?7:8;
  return <>
    {item.adtree_pick==="Yes"&&<div style={{fontSize:sz,fontWeight:900,background:"linear-gradient(135deg,#F5C842,#F5A020)",color:"#0A0C10",borderRadius:5,padding:"2px 5px",whiteSpace:"nowrap",boxShadow:"0 1px 4px rgba(245,200,66,0.35)"}}>⚡ Adtree Pick</div>}
    {item.tiktok_pick==="Yes"&&<div style={{fontSize:sz,fontWeight:900,background:"linear-gradient(135deg,#FF2D55,#FF6B8A)",color:"#fff",borderRadius:5,padding:"2px 5px",whiteSpace:"nowrap",boxShadow:"0 1px 4px rgba(255,45,85,0.35)"}}>🎯 GO Featured</div>}
  </>;
}
function SegBadge({segmen}) {
  const col=SEGMEN_COLOR[segmen]||B.yellow;
  return <div style={{fontSize:10,fontWeight:700,color:col,background:col+"1A",borderRadius:20,padding:"3px 9px",border:`1px solid ${col}33`}}>{SEGMEN_LABEL[segmen]||segmen}</div>;
}
function Stars({n}) {
  if(!n) return null;
  return <span style={{color:B.yellow,fontSize:11,letterSpacing:1}}>{"★".repeat(Math.floor(n))}</span>;
}

// Earnings estimator: aov * commission rate
function calcEarning(aov, commission) {
  const pct = parseFloat(String(commission||"0").replace("%",""))||0;
  if(!aov||!pct) return null;
  return Math.round(aov * pct / 100);
}

function EarnBanner({aov,commission,industry}) {
  const earn = calcEarning(aov,commission);
  if(!earn) return null;
  const label = industry==="hotels"?"per malam":industry==="ttd"?"per tiket":"per order";
  return (
    <div style={{background:"linear-gradient(135deg,#2DD4A418,#2DD4A408)",border:"1px solid #2DD4A430",borderRadius:12,padding:"12px 14px",marginBottom:12,display:"flex",alignItems:"center",gap:12}}>
      <div style={{background:"linear-gradient(135deg,#2DD4A4,#20A882)",borderRadius:10,padding:"8px",fontSize:20,lineHeight:1,flexShrink:0}}>💰</div>
      <div>
        <div style={{fontSize:10,fontWeight:700,color:B.green,letterSpacing:"0.08em",marginBottom:2}}>ESTIMASI CUAN KAMU</div>
        <div style={{fontSize:20,fontWeight:900,color:B.green,lineHeight:1}}>+{fmtIdr(earn)}<span style={{fontSize:11,fontWeight:500,color:B.textMuted,marginLeft:4}}>{label}</span></div>
        <div style={{fontSize:10,color:B.textMuted,marginTop:2}}>Dari komisi {commission} × harga {fmtIdr(aov)}</div>
      </div>
    </div>
  );
}

// ── App ───────────────────────────────────────────────────────────────────────
export default function App() {
  const [data,        setData]        = useState({hotels:[],dining:[],ttd:[]});
  const [loading,     setLoading]     = useState(true);
  const [loadMsg,     setLoadMsg]     = useState("Memuat data brand...");
  const [cat,         setCat]         = useState("hotels");
  const [sel,         setSel]         = useState(null);
  const [search,      setSearch]      = useState("");
  const [l1Filter,    setL1Filter]    = useState("Semua");
  const [tagFilter,   setTagFilter]   = useState(null);
  const [pickFilter,  setPickFilter]  = useState(null);
  const [drop,        setDrop]        = useState(false);
  const [brandDrop,   setBrandDrop]   = useState(false);
  const [brandFilter, setBrandFilter] = useState("Semua");
  const [sortBy,      setSortBy]      = useState("score"); // score | comm_asc | comm_desc | price_asc | price_desc
  const [showSort,    setShowSort]    = useState(false);
  const [view,        setView]        = useState("home");
  const [saved,       setSavedSt]     = useState(getSaved);
  const [adminUser,   setAdminUser]   = useState("");
  const [adminPass,   setAdminPass]   = useState("");
  const [adminErr,    setAdminErr]    = useState("");
  const [isAdmin,     setIsAdmin]     = useState(false);
  const [adminTab,    setAdminTab]    = useState("upload");
  const [upStatus,    setUpStatus]    = useState(null);
  const [upMsg,       setUpMsg]       = useState("");
  const [hfInput,     setHFInput]     = useState(()=>{const c=getHFCfg();return{token:c.token||""};});
  const fileRef = useRef();

  useEffect(()=>{
    fetch(HF_FETCH_URL+"?t="+Date.now())
      .then(r=>{if(!r.ok)throw new Error("HF fetch failed");return r.json();})
      .then(d=>{
        setData({
          hotels:(d.hotels||[]).map(r=>({...r,score:calcScore(r),photo:r.photo||fp(r.id),thumb:r.photo?r.photo.replace("w=400&h=260","w=80&h=80"):ft(r.id),promo:r.promo||autoPromo(r.id)})),
          dining:(d.dining||[]).map(r=>({...r,score:calcScore({...r,tags:r.cats}),photo:r.photo||fp(r.id),thumb:r.photo?r.photo.replace("w=400&h=260","w=80&h=80"):ft(r.id),promo:r.promo||autoPromo(r.id)})),
          ttd:(d.ttd||[]).map(r=>({...r,score:calcScore(r),photo:r.photo||fp(r.id),thumb:r.photo?r.photo.replace("w=400&h=260","w=80&h=80"):ft(r.id),promo:r.promo||autoPromo(r.id)})),
        });
        setLoading(false);
      })
      .catch(()=>{setLoadMsg("Gagal memuat dari HF — cek koneksi");setLoading(false);});
  },[]);

  const toggleSave = useCallback(id=>{
    setSavedSt(prev=>{const next=prev.includes(id)?prev.filter(x=>x!==id):[...prev,id];setSavedLS(next);return next;});
  },[]);

  const handleUpload = e=>{
    const file=e.target.files[0]; if(!file) return;
    const cfg=getHFCfg();
    if(!cfg.token){setUpStatus("error");setUpMsg("✗ Isi Access Token dulu di tab ⚙ HF Setup.");return;}
    setUpStatus("loading");setUpMsg("Membaca & mengupload ke Hugging Face...");
    const reader=new FileReader();
    reader.onload=async ev=>{
      try{
        const XLSX=await loadXLSX();
        const wb=XLSX.read(new Uint8Array(ev.target.result),{type:"array"});
        if(!wb.SheetNames.some(s=>["hotels","dining","ttd"].includes(s)))
          throw new Error(`Sheet tidak valid. Butuh: hotels, dining, ttd. Ditemukan: ${wb.SheetNames.join(", ")}`);
        const parsed=await parseXLSXBuffer(ev.target.result);
        const total=parsed.hotels.length+parsed.dining.length+parsed.ttd.length;
        if(!total) throw new Error("Tidak ada data valid di file.");
        // Convert parsed data to JSON and upload as plain text (HF rejects binary)
        const jsonContent = JSON.stringify({
          hotels: parsed.hotels.map(({score,thumb,...r})=>r),
          dining: parsed.dining.map(({score,thumb,...r})=>r),
          ttd: parsed.ttd.map(({score,thumb,...r})=>r),
          updated: new Date().toISOString(),
        });
        // Base64 encode JSON string (text, no overflow risk)
        const b64 = btoa(unescape(encodeURIComponent(jsonContent)));
        const res=await fetch(HF_COMMIT_URL,{
          method:"POST",
          headers:{"Authorization":`Bearer ${cfg.token}`,"Content-Type":"application/json"},
          body:JSON.stringify({summary:"Update brands.json via AdtreeGO admin",files:[{path:HF_FILE,encoding:"base64",content:b64}]}),
        });
        if(!res.ok){const t=await res.text();let m="";try{m=JSON.parse(t).error||t;}catch{m=t;}throw new Error(`HF gagal (${res.status}): ${m.slice(0,120)}`);}
        setData(parsed);
        setUpStatus("success");
        setUpMsg(`✓ Berhasil! Hotels: ${parsed.hotels.length} · Dining: ${parsed.dining.length} · TTD: ${parsed.ttd.length} brand.`);
      }catch(err){setUpStatus("error");setUpMsg("✗ "+err.message);}
    };
    reader.readAsArrayBuffer(file); e.target.value="";
  };

  const industryData = useMemo(()=>(data[cat]||[]).filter(h=>h.published),[data,cat]);
  const ALL_L1 = useMemo(()=>{
    if(cat==="dining") return [];
    const vals=[...new Set((data[cat]||[]).map(h=>h.l1).filter(Boolean))].sort((a,b)=>a.localeCompare(b));
    return ["Semua",...vals];
  },[data,cat]);
  const ALL_TAGS = cat==="hotels"?HOTEL_TAGS_NAMES:cat==="dining"?DINING_CATS_NAMES:TTD_TAGS_NAMES;
  const ALL_BRANDS = useMemo(()=>{
    if(cat!=="dining") return [];
    const vals=[...new Set((data.dining||[]).map(h=>h.brand).filter(Boolean))].sort((a,b)=>a.localeCompare(b));
    return ["Semua",...vals];
  },[data.dining,cat]);
  const TAG_ICON = cat==="hotels"?HOTEL_TAG_ICON:cat==="dining"?DINING_CAT_ICON:TTD_TAG_ICON;

  const filtered = useMemo(()=>{
    let d=industryData;
    if(l1Filter!=="Semua") d=d.filter(h=>h.l1===l1Filter);
    if(tagFilter){
      if(cat==="dining") d=d.filter(h=>h.cats&&h.cats.includes(tagFilter));
      else d=d.filter(h=>h.tags&&h.tags.includes(tagFilter));
    }
    if(pickFilter==="adtree") d=d.filter(h=>h.adtree_pick==="Yes");
    if(pickFilter==="tiktok") d=d.filter(h=>h.tiktok_pick==="Yes");
    if(brandFilter!=="Semua"&&cat==="dining") d=d.filter(h=>h.brand===brandFilter);
    if(search.trim()){
      const q=search.toLowerCase();
      d=d.filter(h=>(h.name||"").toLowerCase().includes(q)||(h.brand||"").toLowerCase().includes(q)||(h.city||"").toLowerCase().includes(q)||(h.l1||"").toLowerCase().includes(q));
    }
    if(sortBy==="comm_asc") d=[...d].sort((a,b)=>(parseFloat(a.commission)||0)-(parseFloat(b.commission)||0));
    else if(sortBy==="comm_desc") d=[...d].sort((a,b)=>(parseFloat(b.commission)||0)-(parseFloat(a.commission)||0));
    else if(sortBy==="price_asc") d=[...d].sort((a,b)=>(a.aov||0)-(b.aov||0));
    else if(sortBy==="price_desc") d=[...d].sort((a,b)=>(b.aov||0)-(a.aov||0));
    else d=[...d].sort((a,b)=>b.score-a.score);
    return d;
  },[industryData,l1Filter,tagFilter,pickFilter,brandFilter,sortBy,search,cat]);

  const savedItems = useMemo(()=>[...data.hotels,...data.dining,...data.ttd].filter(h=>saved.includes(h.id)),[data,saved]);
  const displayList = view==="saved"?savedItems:filtered;
  const hasPicks = cat!=="dining";
  const adminLogin = ()=>{
    if(adminUser===ADMIN_USER&&adminPass===ADMIN_PASS){setIsAdmin(true);setView("adminPanel");setAdminErr("");}
    else setAdminErr("Username atau password salah.");
  };

  // ── Admin Panel ─────────────────────────────────────────────────────────────
  if(view==="adminPanel"&&isAdmin) return (
    <div style={{...S.root,background:"#0C1220"}}>
      <div style={S.noise}/>
      <header style={{...S.header,paddingBottom:12}}>
        <div style={S.topBar}>
          <img src={LOGO_SRC} alt="AdtreeGO" style={{height:26,width:"auto"}}/>
          <div style={{display:"flex",gap:8}}>
            <div style={{fontSize:10,color:B.yellow,background:B.yellowDim,border:`1px solid ${B.yellowBorder}`,borderRadius:20,padding:"3px 10px",fontWeight:700}}>ADMIN</div>
            <button onClick={()=>{setIsAdmin(false);setView("home");}} style={{background:"#E8547A18",border:"1px solid #E8547A44",color:B.red,fontSize:11,fontWeight:700,borderRadius:8,padding:"4px 10px",cursor:"pointer"}}>Logout</button>
          </div>
        </div>
        <div style={{fontSize:20,fontWeight:800,color:B.text,marginTop:10}}>Panel Admin</div>
        <div style={{fontSize:11,color:B.textMuted,marginTop:2}}>Hotels: {data.hotels.length} · Dining: {data.dining.length} · TTD: {data.ttd.length}</div>
      </header>
      <div style={{display:"flex",borderBottom:`1px solid ${B.cardBorder}`}}>
        {[["upload","📤 Upload"],["hf","⚙ HF Setup"],["stats","📊 Stats"]].map(([id,lbl])=>(
          <button key={id} onClick={()=>setAdminTab(id)} style={{flex:1,padding:"11px 4px",background:"transparent",border:"none",cursor:"pointer",fontSize:11,fontWeight:700,color:adminTab===id?B.yellow:B.textMuted,borderBottom:`2px solid ${adminTab===id?B.yellow:"transparent"}`}}>{lbl}</button>
        ))}
      </div>
      {adminTab==="upload"&&(
        <div style={{padding:"20px 20px 90px"}}>
          <div style={{fontSize:14,fontWeight:800,color:B.text,marginBottom:6}}>Upload Excel — Semua Industri</div>
          <div style={{fontSize:12,color:B.textMuted,lineHeight:1.7,marginBottom:14}}>
            Upload <strong style={{color:B.yellow}}>1 file .xlsx</strong> berisi 3 sheet: <strong style={{color:B.text}}>hotels</strong> · <strong style={{color:B.text}}>dining</strong> · <strong style={{color:B.text}}>ttd</strong>. App otomatis konversi ke JSON sebelum upload ke HF.
          </div>
          {[["🏨","hotels","poi_id, poi_name, l1_region, star_rating, price_tier, adtree_pick, tiktok_pick, discount_range, commision_rate, aov_idr, drive_link..."],
            ["🍜","dining","poi_product_id, poi_product_name, poi_name, price_tier, Best Seller, Hot Promo, Single Deal, Bundle Deal, Big Commission, commision_rate, discount_range, aov_idr..."],
            ["🎡","ttd","poi_id, poi_name, l1_region, price_tier, adtree_pick, tiktok_pick, discount_range, commision_rate, aov_idr, drive_link..."],
          ].map(([ico,sheet,cols])=>(
            <div key={sheet} style={{background:B.card,border:`1px solid ${B.cardBorder}`,borderRadius:10,padding:"10px 12px",marginBottom:8}}>
              <div style={{fontSize:12,fontWeight:700,color:B.yellow,marginBottom:3}}>{ico} Sheet: <span style={{fontFamily:"monospace"}}>{sheet}</span></div>
              <div style={{fontSize:10,color:B.textMuted,lineHeight:1.5}}>{cols}</div>
            </div>
          ))}
          <div onClick={()=>fileRef.current?.click()} style={{border:`2px dashed ${upStatus==="success"?B.green:upStatus==="error"?B.red:B.cardBorder}`,borderRadius:16,padding:"28px 20px",textAlign:"center",cursor:"pointer",background:upStatus==="success"?B.green+"08":upStatus==="error"?B.red+"08":B.card,margin:"14px 0"}}>
            <div style={{fontSize:36,marginBottom:8}}>{upStatus==="loading"?"⏳":upStatus==="success"?"✅":upStatus==="error"?"❌":"📊"}</div>
            <div style={{fontSize:14,fontWeight:700,color:B.text,marginBottom:4}}>{upStatus==="loading"?"Memproses...":upStatus?"Selesai":"Klik untuk pilih file Excel"}</div>
            <div style={{fontSize:11,color:B.textMuted}}>{!upStatus&&"Format: .xlsx · 3 sheet"}</div>
            {upMsg&&<div style={{fontSize:12,fontWeight:600,color:upStatus==="success"?B.green:B.red,marginTop:10,lineHeight:1.6}}>{upMsg}</div>}
          </div>
          <input ref={fileRef} type="file" accept=".xlsx" onChange={handleUpload} style={{display:"none"}}/>
          <button onClick={()=>fileRef.current?.click()} style={S.cta}>📊 Pilih File Excel</button>
          <div style={{background:B.yellowDim,border:`1px solid ${B.yellowBorder}`,borderRadius:12,padding:"12px 14px",marginTop:14}}>
            <div style={{fontSize:11,fontWeight:700,color:B.yellow,marginBottom:5}}>💡 Cara Update Data</div>
            <div style={{fontSize:11,color:B.textMuted,lineHeight:1.7}}>1. Edit Excel → simpan<br/>2. Upload di sini → otomatis ke HF<br/>3. Semua user dapat data baru saat refresh<br/>4. Tidak perlu deploy ulang Vercel</div>
          </div>
        </div>
      )}
      {adminTab==="hf"&&(
        <div style={{padding:"20px 20px 90px"}}>
          <div style={{fontSize:14,fontWeight:800,color:B.text,marginBottom:6}}>⚙ Hugging Face Setup</div>
          <div style={{fontSize:12,color:B.textMuted,lineHeight:1.7,marginBottom:16}}>Simpan token HF untuk upload file Excel. Token tersimpan di browser ini saja.</div>
          {[["1","Buat akun HF","huggingface.co → Sign up (gratis)"],["2","Buat Dataset","huggingface.co/new-dataset → Name: brand-data → Public"],["3","Buat Token","huggingface.co/settings/tokens → New token → Write"]].map(([n,t,d])=>(
            <div key={n} style={{display:"flex",gap:12,marginBottom:12,alignItems:"flex-start"}}>
              <div style={{width:24,height:24,borderRadius:"50%",background:B.yellow,color:"#0A0C10",fontSize:11,fontWeight:800,display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0}}>{n}</div>
              <div><div style={{fontSize:12,fontWeight:700,color:B.text}}>{t}</div><div style={{fontSize:11,color:B.textMuted,marginTop:1}}>{d}</div></div>
            </div>
          ))}
          <div style={{background:B.card,borderRadius:10,padding:"10px 14px",marginBottom:14,border:`1px solid ${B.cardBorder}`}}>
            <div style={{fontSize:10,color:B.textMuted,fontWeight:700,letterSpacing:"0.08em",marginBottom:3}}>REPO</div>
            <div style={{fontSize:13,fontWeight:700,color:B.green,fontFamily:"monospace"}}>{HF_PUBLIC_REPO}</div>
          </div>
          <label style={S.formLabel}>Access Token (Write)</label>
          <input value={hfInput.token} onChange={e=>setHFInput(p=>({...p,token:e.target.value}))} type="password" placeholder="hf_xxxxxxxxxxxx" style={{...S.formInput,marginBottom:10}}/>
          {upMsg&&adminTab==="hf"&&<div style={{fontSize:12,fontWeight:600,color:upStatus==="success"?B.green:B.red,marginBottom:10}}>{upMsg}</div>}
          <button onClick={()=>{
            if(!hfInput.token.trim()){setUpStatus("error");setUpMsg("✗ Token kosong.");return;}
            saveHFCfg({repo:HF_PUBLIC_REPO,token:hfInput.token.trim()});
            setUpStatus("success");setUpMsg("✓ Token disimpan!");
          }} style={S.cta}>💾 Simpan Token</button>
          <div style={{background:"#1A2640",borderRadius:10,padding:"10px 14px",border:`1px solid ${B.cardBorder}`,marginTop:12}}>
            <div style={{fontSize:10,color:B.textMuted,fontWeight:700,marginBottom:3}}>STATUS</div>
            <div style={{fontSize:11,color:getHFCfg().token?B.green:B.textMuted}}>{getHFCfg().token?"✓ Token tersimpan — siap upload":"✗ Belum ada token"}</div>
          </div>
        </div>
      )}
      {adminTab==="stats"&&(
        <div style={{padding:"20px 20px 90px"}}>
          <div style={{fontSize:14,fontWeight:800,color:B.text,marginBottom:14}}>📊 Overview Data</div>
          {[["🏨","Akomodasi","hotels"],["🍜","Kuliner","dining"],["🎡","Wisata","ttd"]].map(([ico,lbl,key])=>(
            <div key={key} style={{background:B.card,border:`1px solid ${B.cardBorder}`,borderRadius:12,padding:"14px 16px",marginBottom:10}}>
              <div style={{fontSize:13,fontWeight:700,color:B.text,marginBottom:10}}>{ico} {lbl}</div>
              <div style={{display:"grid",gridTemplateColumns:"1fr 1fr 1fr",gap:8}}>
                {[["Total",(data[key]||[]).length,B.yellow],["⚡ Adtree",(data[key]||[]).filter(h=>h.adtree_pick==="Yes").length,B.yellow],["🎯 Featured",(data[key]||[]).filter(h=>h.tiktok_pick==="Yes").length,B.pink]].map(([l,v,c])=>(
                  <div key={l} style={{textAlign:"center",background:"#1A2640",borderRadius:8,padding:"8px 4px"}}>
                    <div style={{fontSize:18,fontWeight:800,color:c}}>{v}</div>
                    <div style={{fontSize:9,color:B.textMuted,marginTop:2}}>{l}</div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
      <nav style={S.nav}>
        {[["📤","Upload","upload"],["⚙","HF Setup","hf"],["📊","Stats","stats"],["🚪","Keluar","logout"]].map(([ic,lb,id])=>(
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
      <img src={LOGO_SRC} alt="AdtreeGO" style={{height:30,marginBottom:36,position:"relative",zIndex:1}}/>
      <div style={{background:B.card,border:`1px solid ${B.cardBorder}`,borderRadius:20,padding:"32px 28px",width:"100%",maxWidth:340,position:"relative",zIndex:1}}>
        <div style={{fontSize:18,fontWeight:800,color:B.text,marginBottom:4}}>Admin Login</div>
        <div style={{fontSize:12,color:B.textMuted,marginBottom:24}}>Akses terbatas untuk tim Adtree</div>
        <label style={S.formLabel}>Username</label>
        <input value={adminUser} onChange={e=>setAdminUser(e.target.value)} style={S.formInput} onKeyDown={e=>e.key==="Enter"&&adminLogin()}/>
        <label style={{...S.formLabel,marginTop:14}}>Password</label>
        <input value={adminPass} onChange={e=>setAdminPass(e.target.value)} type="password" style={S.formInput} onKeyDown={e=>e.key==="Enter"&&adminLogin()}/>
        {adminErr&&<div style={{color:B.red,fontSize:11,marginTop:8,fontWeight:600}}>{adminErr}</div>}
        <button onClick={adminLogin} style={{...S.cta,marginTop:20}}>Masuk</button>
        <button onClick={()=>setView("home")} style={{display:"block",width:"100%",marginTop:10,padding:"12px",background:"transparent",border:`1px solid ${B.cardBorder}`,borderRadius:12,color:B.textMuted,fontSize:13,fontWeight:600,cursor:"pointer"}}>← Kembali</button>
      </div>
    </div>
  );

  // ── Detail Page ──────────────────────────────────────────────────────────────
  if(sel) {
    const isDining=sel.industry==="dining";
    const isTTD=sel.industry==="ttd";
    const tagIcon=isDining?DINING_CAT_ICON:isTTD?TTD_TAG_ICON:HOTEL_TAG_ICON;
    const tags=isDining?sel.cats:sel.tags||[];
    return (
      <div style={{...S.root,overflowY:"auto"}}>
        <div style={S.noise}/>
        {/* Sticky back bar */}
        <div style={{position:"sticky",top:0,zIndex:50,background:"#0C1120CC",backdropFilter:"blur(12px)",borderBottom:`1px solid ${B.cardBorder}`,padding:"12px 16px",display:"flex",alignItems:"center",gap:10}}>
          <button onClick={()=>setSel(null)} style={{background:B.card,border:`1px solid ${B.cardBorder}`,borderRadius:10,padding:"6px 14px",color:B.text,fontSize:13,fontWeight:700,cursor:"pointer"}}>← Kembali</button>
          <div style={{fontSize:13,fontWeight:700,color:B.textSub,overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap",flex:1}}>{sel.name}</div>
          <button onClick={()=>toggleSave(sel.id)} style={{background:saved.includes(sel.id)?B.yellowDim:"transparent",border:`1px solid ${saved.includes(sel.id)?B.yellow:B.cardBorder}`,borderRadius:10,padding:"6px 10px",cursor:"pointer",fontSize:16,flexShrink:0}}>🔖</button>
        </div>

        {/* Hero photo */}
        <div style={{position:"relative",height:220,margin:"12px 16px 0",borderRadius:18,overflow:"hidden",boxShadow:"0 8px 32px rgba(0,0,0,0.4)"}}>
          <img src={sel.photo} alt={sel.name} style={{width:"100%",height:"100%",objectFit:"cover"}} onError={e=>e.target.src=FALLBACK_PHOTOS[0]}/>
          <div style={{position:"absolute",inset:0,background:"linear-gradient(to top,rgba(8,12,28,0.92) 0%,rgba(8,12,28,0.2) 50%,transparent 100%)"}}/>
          {/* Top badges */}
          <div style={{position:"absolute",top:12,left:12,display:"flex",flexDirection:"column",gap:4}}>
            <SegBadge segmen={sel.segmen}/>
            {!isDining&&sel.star>0&&<div style={{display:"flex",alignItems:"center",gap:4,background:"#0008",borderRadius:8,padding:"2px 8px"}}><Stars n={sel.star}/><span style={{fontSize:10,color:B.yellow,fontWeight:700}}>{sel.star}★</span></div>}
          </div>
          {/* Pick badges top right */}
          {(sel.adtree_pick==="Yes"||sel.tiktok_pick==="Yes")&&(
            <div style={{position:"absolute",top:12,right:12,display:"flex",flexDirection:"column",gap:4,alignItems:"flex-end"}}>
              <PickBadge item={sel}/>
            </div>
          )}
          {/* Score bottom right */}
          <div style={{position:"absolute",bottom:12,right:12}}><ScoreBadge val={sel.score}/></div>
        </div>

        <div style={{padding:"16px 20px 40px"}}>
          {/* Name */}
          <div style={{marginBottom:12}}>
            <div style={{fontSize:22,fontWeight:800,color:B.text,lineHeight:1.2,marginBottom:isDining?3:5}}>{sel.name}</div>
            {isDining&&<div style={{fontSize:14,fontWeight:700,color:B.yellow,marginBottom:3}}>{sel.brand}</div>}
            <div style={{fontSize:12,color:B.textMuted}}>{isDining?`🍜 ${sel.display}`:isTTD?`📍 ${sel.city}, ${sel.l1}`:`📍 ${sel.city}, ${sel.l1}`}</div>
          </div>

          {/* EARN BANNER — most prominent */}
          <EarnBanner aov={sel.aov} commission={sel.commission} industry={sel.industry}/>

          {/* Pick banners */}
          {(sel.adtree_pick==="Yes"||sel.tiktok_pick==="Yes")&&(
            <div style={{display:"flex",flexDirection:"column",gap:8,marginBottom:12}}>
              {sel.tiktok_pick==="Yes"&&(
                <div style={{display:"flex",alignItems:"center",gap:10,background:"#FF2D5510",border:"1px solid #FF2D5530",borderRadius:12,padding:"10px 14px"}}>
                  <div style={{background:"linear-gradient(135deg,#FF2D55,#FF6B8A)",borderRadius:8,padding:"6px 8px",fontSize:16,lineHeight:1,flexShrink:0}}>🎯</div>
                  <div><div style={{fontSize:11,fontWeight:800,color:B.pink,letterSpacing:"0.08em"}}>GO Featured</div><div style={{fontSize:11,color:B.textMuted,marginTop:1}}>Brand ini dipilih resmi oleh TikTok GO</div></div>
                </div>
              )}
              {sel.adtree_pick==="Yes"&&(
                <div style={{display:"flex",alignItems:"center",gap:10,background:B.yellowDim,border:`1px solid ${B.yellowBorder}`,borderRadius:12,padding:"10px 14px"}}>
                  <div style={{background:"linear-gradient(135deg,#F5C842,#F5A020)",borderRadius:8,padding:"6px 8px",fontSize:16,lineHeight:1,flexShrink:0}}>⚡</div>
                  <div><div style={{fontSize:11,fontWeight:800,color:B.yellow,letterSpacing:"0.08em"}}>Adtree Pick</div><div style={{fontSize:11,color:B.textMuted,marginTop:1}}>Brand pilihan tim AdtreeGO untuk kreator</div></div>
                </div>
              )}
            </div>
          )}

          {/* Promo */}
          <div style={{background:"#F5C84209",border:"1px solid #F5C84228",borderRadius:12,padding:"12px 14px",marginBottom:14}}>
            <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:5}}>
              <span style={{fontSize:10,fontWeight:800,color:B.yellow,letterSpacing:"0.1em"}}>🎁 PROMO AKTIF</span>
              {sel.discount&&<DiscBadge range={sel.discount}/>}
            </div>
            <div style={{fontSize:14,fontWeight:600,color:B.text,lineHeight:1.5}}>{sel.promo}</div>
          </div>

          {/* Stats — lean, no province/city for hotels/ttd */}
          {/* HOTELS: Harga/Malam · Bintang · Segmen · Komisi */}
          {!isDining&&!isTTD&&(
            <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:8,marginBottom:14}}>
              {[
                {ico:"💰",lbl:"Harga/Malam",val:fmtIdr(sel.aov),big:true},
                {ico:"💸",lbl:"Komisi",val:sel.commission||"—",color:B.green},
                {ico:"⭐",lbl:"Bintang",val:sel.star>0?sel.star+" ★":"N/A"},
                {ico:"📊",lbl:"Segmen",val:SEGMEN_LABEL[sel.segmen]||sel.segmen,color:SEGMEN_COLOR[sel.segmen]},
              ].map(({ico,lbl,val,big,color})=>(
                <div key={lbl} style={{background:"#1A2640",borderRadius:12,padding:"12px 14px",display:"flex",alignItems:"center",gap:10,border:`1px solid ${B.cardBorder}`}}>
                  <span style={{fontSize:22,flexShrink:0}}>{ico}</span>
                  <div>
                    <div style={{fontSize:9,color:B.textMuted,fontWeight:700,letterSpacing:"0.08em",marginBottom:2}}>{lbl}</div>
                    <div style={{fontSize:big?16:14,fontWeight:800,color:color||B.text}}>{val}</div>
                  </div>
                </div>
              ))}
            </div>
          )}
          {/* DINING: Harga Produk · Komisi · Diskon */}
          {isDining&&(
            <div style={{display:"grid",gridTemplateColumns:"1fr 1fr 1fr",gap:8,marginBottom:14}}>
              {[
                {ico:"💰",lbl:"Harga Produk",val:fmtIdr(sel.aov)},
                {ico:"💸",lbl:"Komisi",val:sel.commission||"—",color:B.green},
                {ico:"🏷️",lbl:"Diskon",val:sel.discount||"—",color:B.red},
              ].map(({ico,lbl,val,color})=>(
                <div key={lbl} style={{background:"#1A2640",borderRadius:12,padding:"10px",display:"flex",flexDirection:"column",gap:3,border:`1px solid ${B.cardBorder}`}}>
                  <span style={{fontSize:18}}>{ico}</span>
                  <div style={{fontSize:9,color:B.textMuted,fontWeight:700,letterSpacing:"0.08em"}}>{lbl}</div>
                  <div style={{fontSize:12,fontWeight:800,color:color||B.text}}>{val}</div>
                </div>
              ))}
            </div>
          )}
          {/* TTD: Harga/Tiket · Komisi · Diskon */}
          {isTTD&&(
            <div style={{display:"grid",gridTemplateColumns:"1fr 1fr 1fr",gap:8,marginBottom:14}}>
              {[
                {ico:"🎟️",lbl:"Harga/Tiket",val:fmtIdr(sel.aov)},
                {ico:"💸",lbl:"Komisi",val:sel.commission||"—",color:B.green},
                {ico:"🏷️",lbl:"Diskon",val:sel.discount||"—",color:B.red},
              ].map(({ico,lbl,val,color})=>(
                <div key={lbl} style={{background:"#1A2640",borderRadius:12,padding:"10px",display:"flex",flexDirection:"column",gap:3,border:`1px solid ${B.cardBorder}`}}>
                  <span style={{fontSize:18}}>{ico}</span>
                  <div style={{fontSize:9,color:B.textMuted,fontWeight:700,letterSpacing:"0.08em"}}>{lbl}</div>
                  <div style={{fontSize:12,fontWeight:800,color:color||B.text}}>{val}</div>
                </div>
              ))}
            </div>
          )}

          {/* Kategori Produk */}
          {tags.length>0&&<>
            <div style={{fontSize:11,fontWeight:700,color:B.textMuted,letterSpacing:"0.1em",marginBottom:8}}>Kategori Produk</div>
            <div style={{display:"flex",flexDirection:"column",gap:6,marginBottom:18}}>
              {tags.map(t=>(
                <div key={t} style={{background:"#1A2640",borderRadius:10,padding:"10px 14px",display:"flex",alignItems:"center",gap:10,border:`1px solid ${B.cardBorder}`}}>
                  <span style={{fontSize:18}}>{tagIcon[t]||"🏷️"}</span>
                  <span style={{fontSize:13,fontWeight:600,color:B.textSub,flex:1}}>{t}</span>
                  <span style={{fontSize:11,color:B.green,fontWeight:800}}>✓</span>
                </div>
              ))}
            </div>
          </>}

          {/* Drive CTA */}
          {sel.drive?(
            <a href={sel.drive} target="_blank" rel="noopener noreferrer" style={{display:"flex",alignItems:"center",justifyContent:"center",gap:10,background:B.yellow,color:"#0A0C10",borderRadius:14,padding:"15px",fontSize:14,fontWeight:800,textDecoration:"none",letterSpacing:"0.03em",marginBottom:10}}>
              <span style={{fontSize:18}}>📂</span> Lihat Content Asset
            </a>
          ):(
            <div style={{display:"flex",alignItems:"center",justifyContent:"center",gap:8,background:"#ffffff06",borderRadius:14,padding:"14px",fontSize:13,fontWeight:600,color:B.textMuted,border:`1px solid ${B.cardBorder}`,marginBottom:10}}>
              <span>📂</span> Content asset belum tersedia
            </div>
          )}
          <div style={{textAlign:"center",fontSize:10,color:B.textMuted}}>Powered by <span style={{color:B.yellow,fontWeight:700}}>AdtreeGO</span> · TikTok Indonesia</div>
        </div>
      </div>
    );
  }

  // ── Main Public UI ────────────────────────────────────────────────────────────
  const catCounts = {hotels:(data.hotels||[]).filter(h=>h.published).length, dining:(data.dining||[]).filter(h=>h.published).length, ttd:(data.ttd||[]).filter(h=>h.published).length};

  return (
    <div style={S.root} onClick={()=>drop&&setDrop(false)}>
      <div style={S.noise}/>

      {/* Header */}
      <header style={S.header}>
        <div style={S.topBar}>
          <img src={LOGO_SRC} alt="AdtreeGO" style={{height:26,width:"auto"}}/>
          <div style={S.headerPill}>Brand Opportunities</div>
        </div>
        <div style={S.heroTitle}>Cuan Bareng<br/><span style={S.heroAccent}>Brand Terbaik</span> 🤑</div>
        <div style={S.heroSub}>Pilih brand yang sesuai, buat konten kreatif, dan raih komisi bersama AdtreeGO.</div>
        <div style={S.searchWrap}>
          <span style={{fontSize:14,opacity:0.35}}>🔍</span>
          <input placeholder="Cari brand, kota, atau provinsi..." value={search} onChange={e=>setSearch(e.target.value)} style={S.searchInput}/>
          {search&&<button onClick={()=>setSearch("")} style={{background:"none",border:"none",color:B.textMuted,cursor:"pointer",fontSize:14,padding:0}}>✕</button>}
        </div>
      </header>

      {/* Category tabs */}
      <div style={{display:"flex",borderBottom:`1px solid ${B.cardBorder}`,padding:"0 16px"}}>
        {[["hotels","🏨","Akomodasi"],["dining","🍜","Kuliner"],["ttd","🎡","Wisata"]].map(([id,ico,lbl])=>(
          <button key={id} style={{flex:1,display:"flex",flexDirection:"column",alignItems:"center",gap:1,padding:"10px 4px",background:"transparent",border:"none",cursor:"pointer",borderBottom:`2px solid ${cat===id&&view==="home"?B.yellow:B.cardBorder}`,color:cat===id&&view==="home"?B.yellow:B.textMuted,transition:"all 0.15s"}}
            onClick={()=>{setCat(id);setView("home");setTagFilter(null);setPickFilter(null);setL1Filter("Semua");setBrandFilter("Semua");setSearch("");setSortBy("score");}}>
            <span style={{fontSize:18}}>{ico}</span>
            <span style={{fontSize:10,fontWeight:700,letterSpacing:"0.04em"}}>{lbl}</span>
            <span style={{fontSize:9,color:cat===id&&view==="home"?B.yellow+"99":B.textMuted}}>{catCounts[id]}</span>
          </button>
        ))}
      </div>

      {view==="saved"&&(
        <div style={{padding:"12px 16px 0"}}>
          <div style={{display:"flex",alignItems:"center",gap:8,background:B.yellowDim,border:`1px solid ${B.yellowBorder}`,borderRadius:12,padding:"10px 14px"}}>
            <span>🔖</span><span style={{fontSize:12,fontWeight:700,color:B.yellow}}>Brand Tersimpan</span>
            <span style={{fontSize:11,color:B.textMuted,marginLeft:"auto"}}>{savedItems.length}</span>
          </div>
        </div>
      )}

      {loading?(
        <div style={{textAlign:"center",padding:"70px 20px",color:B.textMuted}}>
          <div style={{fontSize:36,marginBottom:12}}>⏳</div>
          <div style={{fontSize:13}}>{loadMsg}</div>
        </div>
      ):(
        <>
          {/* Filters */}
          <div style={{padding:"12px 16px 0",display:"flex",flexDirection:"column",gap:8}}>
            {hasPicks&&view!=="saved"&&(
            <div style={{display:"flex",gap:8}}>
              <button onClick={e=>{e.stopPropagation();setPickFilter(pickFilter==="adtree"?null:"adtree");setTagFilter(null);}}
                style={{flex:1,padding:"8px 6px",borderRadius:10,border:`1px solid ${pickFilter==="adtree"?B.yellow:B.yellowBorder}`,background:pickFilter==="adtree"?"linear-gradient(135deg,#F5C842,#F5A020)":B.yellowDim,color:pickFilter==="adtree"?"#0A0C10":B.yellow,fontSize:11,fontWeight:700,cursor:"pointer",display:"flex",alignItems:"center",justifyContent:"center",gap:4}}>
                ⚡ Adtree Pick
              </button>
              <button onClick={e=>{e.stopPropagation();setPickFilter(pickFilter==="tiktok"?null:"tiktok");setTagFilter(null);}}
                style={{flex:1,padding:"8px 6px",borderRadius:10,border:`1px solid ${pickFilter==="tiktok"?"#FF6B8A":"#FF6B8A44"}`,background:pickFilter==="tiktok"?"linear-gradient(135deg,#FF2D55,#FF6B8A)":"#FF2D5510",color:pickFilter==="tiktok"?"#fff":"#FF6B8A",fontSize:11,fontWeight:700,cursor:"pointer",display:"flex",alignItems:"center",justifyContent:"center",gap:4}}>
                🎯 GO Featured
              </button>
            </div>
          )}

          {/* Province dropdown — hotels & ttd */}
          {cat!=="dining"&&view!=="saved"&&ALL_L1.length>1&&(
            <div style={{position:"relative",zIndex:20}} onClick={e=>e.stopPropagation()}>
              <button style={{...S.regionBtn,width:"100%"}} onClick={()=>{setDrop(!drop);setBrandDrop(false);}}>
                <span>📍</span>
                <span style={{fontSize:12,fontWeight:600,color:B.textSub,flex:1,textAlign:"left"}}>{l1Filter==="Semua"?"Semua Provinsi":l1Filter}</span>
                <span style={{fontSize:9,color:B.textMuted}}>{drop?"▲":"▼"}</span>
              </button>
              {drop&&(
                <div style={S.dropdown}>
                  {ALL_L1.map(r=>(
                    <div key={r} style={{...S.dropItem,...(l1Filter===r?S.dropActive:{})}} onClick={()=>{setL1Filter(r);setDrop(false);}}>
                      <span>{r==="Semua"?"🗺️":"📍"}</span>
                      <span style={{flex:1}}>{r==="Semua"?"Semua Provinsi":r}</span>
                      {l1Filter===r&&<span style={{color:B.yellow}}>✓</span>}
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* Brand dropdown — dining only */}
          {cat==="dining"&&view!=="saved"&&ALL_BRANDS.length>1&&(
            <div style={{position:"relative",zIndex:20}} onClick={e=>e.stopPropagation()}>
              <button style={{...S.regionBtn,width:"100%"}} onClick={()=>{setBrandDrop(!brandDrop);setDrop(false);}}>
                <span>🏪</span>
                <span style={{fontSize:12,fontWeight:600,color:B.textSub,flex:1,textAlign:"left"}}>{brandFilter==="Semua"?"Semua Brand":brandFilter}</span>
                <span style={{fontSize:9,color:B.textMuted}}>{brandDrop?"▲":"▼"}</span>
              </button>
              {brandDrop&&(
                <div style={S.dropdown}>
                  {ALL_BRANDS.map(b=>(
                    <div key={b} style={{...S.dropItem,...(brandFilter===b?S.dropActive:{})}} onClick={()=>{setBrandFilter(b);setBrandDrop(false);}}>
                      <span>{b==="Semua"?"🍽️":"🏪"}</span>
                      <span style={{flex:1}}>{b==="Semua"?"Semua Brand":b}</span>
                      {brandFilter===b&&<span style={{color:B.yellow}}>✓</span>}
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* Sort — hidden by default, toggle via icon */}
          {view!=="saved"&&showSort&&(
            <div style={{display:"flex",gap:4,overflowX:"auto",scrollbarWidth:"none",padding:"2px 0"}}>
              {[["score","⚡ Skor"],["comm_desc","💸 Komisi Tertinggi"],["comm_asc","💸 Komisi Terendah"],["price_desc","💰 Harga Tertinggi"],["price_asc","💰 Harga Terendah"]].map(([val,lbl])=>(
                <button key={val} onClick={()=>{setSortBy(val);setShowSort(false);}}
                  style={{flexShrink:0,padding:"5px 10px",borderRadius:16,border:`1px solid ${sortBy===val?B.yellow:B.cardBorder}`,background:sortBy===val?B.yellow:"transparent",color:sortBy===val?"#0A0C10":B.textMuted,fontSize:10,fontWeight:700,cursor:"pointer",whiteSpace:"nowrap"}}>
                  {lbl}
                </button>
              ))}
            </div>
          )}

          {/* Tag/category chips */}
          {view!=="saved"&&(
            <div style={{display:"flex",gap:6,overflowX:"auto",scrollbarWidth:"none",paddingBottom:2}}>
              <button style={{...S.tagBtn,...(tagFilter===null&&pickFilter===null?S.tagActive:{})}} onClick={()=>{setTagFilter(null);setPickFilter(null);}}>Semua</button>
              {ALL_TAGS.map(t=>(
                <button key={t} style={{...S.tagBtn,...(tagFilter===t?S.tagActive:{})}} onClick={()=>setTagFilter(tagFilter===t?null:t)}>
                  {TAG_ICON[t]} {t}
                </button>
              ))}
            </div>
          )}
          </div>

          <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",padding:"10px 16px 0"}}>
            <span style={{fontSize:12,fontWeight:700,color:B.textSub}}>
              {view==="saved"?"🔖 Tersimpan":pickFilter==="adtree"?"⚡ Adtree Pick":pickFilter==="tiktok"?"🎯 GO Featured":tagFilter?`${TAG_ICON[tagFilter]||""} ${tagFilter}`:cat==="hotels"?"Semua Akomodasi":cat==="dining"?"Semua Kuliner":"Semua Wisata"}
            </span>
            <div style={{display:"flex",gap:6,alignItems:"center"}}>
              {view!=="saved"&&<button onClick={()=>setShowSort(!showSort)} style={{display:"flex",alignItems:"center",gap:4,background:showSort||sortBy!=="score"?B.yellowDim:"transparent",border:`1px solid ${showSort||sortBy!=="score"?B.yellow:B.cardBorder}`,borderRadius:8,padding:"4px 8px",cursor:"pointer",color:showSort||sortBy!=="score"?B.yellow:B.textMuted,fontSize:10,fontWeight:700}}>
                {sortBy==="score"?"⇅ Urutkan":sortBy==="comm_desc"?"💸 Komisi ↓ Tertinggi":sortBy==="comm_asc"?"💸 Komisi ↑ Terendah":sortBy==="price_desc"?"💰 Harga ↓ Tertinggi":"💰 Harga ↑ Terendah"}
              </button>}
              <div style={{fontSize:11,fontWeight:800,color:B.yellow,background:B.yellowDim,borderRadius:20,padding:"3px 10px",border:`1px solid ${B.yellowBorder}`}}>{displayList.length} brand</div>
            </div>
          </div>

          {/* Top 3 featured carousel — all industries */}
          {view!=="saved"&&!search&&!tagFilter&&!pickFilter&&l1Filter==="Semua"&&filtered.length>0&&(
            <section style={{padding:"10px 0 0"}}>
              <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",padding:"0 16px 8px"}}>
                <span style={{fontSize:12,fontWeight:700,color:B.textSub}}>🏆 Rekomendasi AdtreeGO</span>
                <span style={{fontSize:10,color:B.yellow,background:B.yellowDim,borderRadius:20,padding:"2px 8px",border:`1px solid ${B.yellowBorder}`}}>Algoritma Skor</span>
              </div>
              <div style={{display:"flex",gap:10,overflowX:"auto",scrollbarWidth:"none",padding:"0 16px 4px"}}>
                {filtered.slice(0,3).map((h,i)=>(
                  <div key={h.id} style={{flexShrink:0,width:176,background:B.card,borderRadius:16,overflow:"hidden",cursor:"pointer",border:`1px solid ${i===0?B.yellow+"66":B.cardBorder}`,boxShadow:i===0?"0 0 20px rgba(245,200,66,0.12)":"none",transition:"transform 0.15s"}} onClick={()=>setSel(h)}>
                    <div style={{position:"relative",height:112}}>
                      <img src={h.photo} alt={h.name} style={{width:"100%",height:"100%",objectFit:"cover"}} onError={e=>e.target.src=FALLBACK_PHOTOS[0]}/>
                      <div style={{position:"absolute",inset:0,background:"linear-gradient(to top,rgba(8,12,28,0.8) 0%,transparent 60%)"}}/>
                      <div style={{position:"absolute",top:8,left:8,fontSize:10,fontWeight:800,borderRadius:20,padding:"2px 8px",background:i===0?B.yellow:i===1?"#C0C0C0":"#CD7F32",color:"#0A0C10"}}>#{i+1}</div>
                      {/* Commission badge top right */}
                      {h.commission&&<div style={{position:"absolute",top:8,right:8,fontSize:9,fontWeight:800,color:B.green,background:"#0008",borderRadius:6,padding:"2px 6px"}}>{h.commission}</div>}
                      {/* Pick badges */}
                      {(h.adtree_pick==="Yes"||h.tiktok_pick==="Yes")&&(
                        <div style={{position:"absolute",bottom:8,left:8,display:"flex",gap:3,flexWrap:"wrap"}}>
                          <PickBadge item={h} sm/>
                        </div>
                      )}
                    </div>
                    <div style={{padding:"10px 12px 12px"}}>
                      <div style={{fontSize:12,fontWeight:700,color:B.text,lineHeight:1.3,marginBottom:2,overflow:"hidden",display:"-webkit-box",WebkitLineClamp:2,WebkitBoxOrient:"vertical"}}>{h.name}</div>
                      {h.industry==="dining"?<div style={{fontSize:10,color:B.yellow,marginBottom:4}}>{h.brand}</div>:<div style={{fontSize:10,color:B.textMuted,marginBottom:4}}>📍 {h.city}</div>}
                      <div style={{display:"flex",justifyContent:"space-between",alignItems:"center"}}>
                        {h.discount?<DiscBadge range={h.discount} sm/>:<ScoreBadge val={h.score}/>}
                        <div style={{fontSize:12,fontWeight:800,color:B.yellow}}>{fmtIdr(h.aov)}</div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Brand list */}
          <section style={{padding:"10px 16px 0"}}>
            {displayList.length===0&&<div style={{textAlign:"center",padding:"50px 20px",color:B.textMuted,fontSize:13}}>Tidak ada brand ditemukan.</div>}
            {displayList.map(h=>{
              const isDining=h.industry==="dining";
              const tags=isDining?h.cats:h.tags||[];
              const earn=calcEarning(h.aov,h.commission);
              return (
                <div key={h.id} style={{display:"flex",gap:12,background:B.card,borderRadius:14,padding:"12px",cursor:"pointer",border:`1px solid ${B.cardBorder}`,marginBottom:8,position:"relative",overflow:"hidden"}} onClick={()=>setSel(h)}>
                  {/* Left accent line for picks */}
                  {(h.adtree_pick==="Yes")&&<div style={{position:"absolute",left:0,top:0,bottom:0,width:3,background:"linear-gradient(135deg,#F5C842,#F5A020)",borderRadius:"3px 0 0 3px"}}/>}
                  {(!h.adtree_pick||h.adtree_pick!=="Yes")&&h.tiktok_pick==="Yes"&&<div style={{position:"absolute",left:0,top:0,bottom:0,width:3,background:"linear-gradient(135deg,#FF2D55,#FF6B8A)",borderRadius:"3px 0 0 3px"}}/>}

                  <div style={{position:"relative",flexShrink:0}}>
                    <img src={h.thumb} alt={h.name} style={{width:56,height:56,borderRadius:12,objectFit:"cover"}} onError={e=>e.target.src=FT[0]}/>
                    <div style={{position:"absolute",left:44,top:44,width:11,height:11,borderRadius:"50%",border:`2px solid ${B.bg}`,background:SEGMEN_COLOR[h.segmen]||B.yellow}}/>
                  </div>

                  <div style={{flex:1,minWidth:0}}>
                    <div style={{fontSize:13,fontWeight:700,color:B.text,overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap",marginBottom:1}}>{h.name}</div>
                    {isDining?<div style={{fontSize:10,color:B.yellow,fontWeight:600,marginBottom:4}}>{h.brand}</div>:<div style={{fontSize:10,color:B.textMuted,marginBottom:4}}>📍 {h.city}</div>}
                    <div style={{display:"flex",gap:4,flexWrap:"wrap",alignItems:"center"}}>
                      {h.discount&&<DiscBadge range={h.discount} sm/>}
                      {h.commission&&<CommBadge rate={h.commission}/>}
                      {(h.adtree_pick==="Yes"||h.tiktok_pick==="Yes")&&<PickBadge item={h} sm/>}
                      {tags.slice(0,1).map(t=><span key={t} style={{fontSize:9,fontWeight:600,background:"#1E2A45",color:B.textMuted,borderRadius:8,padding:"2px 5px"}}>{TAG_ICON[t]||"🏷️"} {t}</span>)}
                    </div>
                  </div>

                  <div style={{display:"flex",flexDirection:"column",alignItems:"flex-end",gap:4,flexShrink:0}}>
                    <button onClick={e=>{e.stopPropagation();toggleSave(h.id);}} style={{background:saved.includes(h.id)?B.yellowDim:"transparent",border:`1px solid ${saved.includes(h.id)?B.yellow:B.cardBorder}`,borderRadius:8,padding:"4px 6px",cursor:"pointer",fontSize:14,color:saved.includes(h.id)?B.yellow:B.textMuted}}>🔖</button>
                    <div style={{fontSize:12,fontWeight:800,color:B.yellow}}>{fmtIdr(h.aov)}</div>
                    {earn&&<div style={{fontSize:9,fontWeight:700,color:B.green}}>+{fmtIdr(earn)}</div>}
                  </div>
                </div>
              );
            })}
            <div style={{height:8}}/>
          </section>
        </>
      )}

      {/* Bottom nav */}
      <nav style={S.nav}>
        <div style={{...S.navItem,...(view==="home"?S.navActive:{})}} onClick={()=>setView("home")}><span style={{fontSize:18}}>⊞</span><span style={S.navLbl}>Beranda</span></div>
        <div style={{...S.navItem,...(view==="saved"?S.navActive:{})}} onClick={()=>setView("saved")}>
          <span style={{fontSize:18,position:"relative"}}>🔖{saved.length>0&&<span style={{position:"absolute",top:-4,right:-6,background:B.yellow,color:"#0A0C10",fontSize:8,fontWeight:800,borderRadius:"50%",width:14,height:14,display:"flex",alignItems:"center",justifyContent:"center"}}>{saved.length}</span>}</span>
          <span style={S.navLbl}>Tersimpan</span>
        </div>
        <div style={S.navItem} onClick={()=>setView("admin")}><span style={{fontSize:18}}>⚙️</span><span style={S.navLbl}>Admin</span></div>
      </nav>
    </div>
  );
}

const S = {
  root:{minHeight:"100vh",background:B.bg,color:B.text,fontFamily:"'DM Sans','Helvetica Neue',sans-serif",maxWidth:430,margin:"0 auto",position:"relative",overflowX:"hidden",paddingBottom:90},
  noise:{position:"fixed",inset:0,pointerEvents:"none",zIndex:0,backgroundImage:"url(\"data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.03'/%3E%3C/svg%3E\")"},
  header:{padding:"44px 20px 18px",background:`linear-gradient(180deg,#0A0E1A 0%,${B.bg} 100%)`,position:"relative",zIndex:2},
  topBar:{display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:14},
  headerPill:{fontSize:10,fontWeight:700,letterSpacing:"0.1em",color:B.yellow,background:B.yellowDim,border:`1px solid ${B.yellowBorder}`,borderRadius:20,padding:"4px 10px"},
  heroTitle:{fontSize:26,fontWeight:900,color:B.text,lineHeight:1.2,marginBottom:6,letterSpacing:"-0.4px"},
  heroAccent:{color:B.yellow},
  heroSub:{fontSize:12,color:B.textMuted,lineHeight:1.6,marginBottom:14},
  searchWrap:{display:"flex",alignItems:"center",background:B.card,border:`1px solid ${B.cardBorder}`,borderRadius:12,padding:"10px 14px",gap:8},
  searchInput:{flex:1,background:"transparent",border:"none",outline:"none",color:B.text,fontSize:13,fontFamily:"inherit"},
  regionBtn:{display:"flex",alignItems:"center",gap:6,background:B.card,border:`1px solid ${B.cardBorder}`,borderRadius:10,padding:"7px 12px",cursor:"pointer",color:B.text},
  dropdown:{position:"absolute",top:"calc(100% + 4px)",left:0,right:0,background:"#18243D",border:`1px solid ${B.cardBorder}`,borderRadius:14,maxHeight:240,overflowY:"auto",boxShadow:"0 8px 32px rgba(0,0,0,0.6)",zIndex:100},
  dropItem:{padding:"10px 14px",fontSize:12,color:B.textSub,cursor:"pointer",display:"flex",alignItems:"center",gap:8,borderBottom:`1px solid ${B.cardBorder}`},
  dropActive:{color:B.yellow,background:B.yellowDim},
  tagBtn:{flexShrink:0,padding:"5px 10px",borderRadius:20,border:`1px solid ${B.cardBorder}`,background:"transparent",color:B.textMuted,fontSize:10,fontWeight:600,cursor:"pointer",whiteSpace:"nowrap"},
  tagActive:{background:B.yellow,color:"#0A0C10",borderColor:"transparent"},
  nav:{position:"fixed",bottom:0,left:"50%",transform:"translateX(-50%)",width:"100%",maxWidth:430,background:"#0A0E1A",borderTop:`1px solid ${B.cardBorder}`,display:"flex",zIndex:200,padding:"10px 0 24px"},
  navItem:{flex:1,display:"flex",flexDirection:"column",alignItems:"center",gap:3,cursor:"pointer",color:B.cardBorder,position:"relative"},
  navActive:{color:B.yellow},
  navLbl:{fontSize:9,fontWeight:700,letterSpacing:"0.06em"},
  cta:{display:"block",width:"100%",padding:"15px",borderRadius:14,border:"none",fontSize:14,fontWeight:800,color:"#0A0C10",cursor:"pointer",background:B.yellow,letterSpacing:"0.03em"},
  formLabel:{fontSize:11,fontWeight:700,color:B.textMuted,letterSpacing:"0.06em",display:"block",marginBottom:6},
  formInput:{width:"100%",background:B.card,border:`1px solid ${B.cardBorder}`,borderRadius:10,padding:"10px 14px",color:B.text,fontSize:13,fontFamily:"inherit",outline:"none",boxSizing:"border-box"},
};
