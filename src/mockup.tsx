import React, { useState, useEffect } from 'react'

type BadgeColor = 'blue' | 'green' | 'red' | 'orange' | 'gray' | 'teal' | 'purple';
type ButtonVariant = 'primary' | 'secondary' | 'danger' | 'success' | 'ghost';
type ButtonSize = 'sm' | 'md' | 'lg';
type ToastType = 'success' | 'error' | 'warning';
type ViewKey =
  | 'dashboard'
  | 'atencion'
  | 'historia'
  | 'accidentes'
  | 'cardex'
  | 'altas'
  | 'alertas'
  | 'emo'
  | 'terceros'
  | 'reportes'
  | 'formatos';

type Worker = {
  id: number;
  dni: string;
  name: string;
  area: string;
  puesto: string;
  estado: string;
  ingreso: string;
  emo: string;
  proxEmo: string;
  estadoEmo: 'vigente' | 'vencido' | 'por_vencer';
  alerg: string;
  cron: string;
  apt: string;
  ats: number;
  ultima: string;
  diag: string;
  eva: number;
  rest: string;
  diasR: number;
  rehab: string;
};

type TimelineItem = {
  f: string;
  med: string;
  d: string;
  eva: number;
  tr: string;
  tipo: string;
};

type Seguimiento = {
  f: string;
  n: string;
};

type Accidente = {
  id: number;
  trab: string;
  fecha: string;
  tipo: string;
  area: string;
  grav: string;
  parte: string;
  estado: string;
  segs: number;
  seguimientos: Seguimiento[];
};

type Medicamento = {
  id: number;
  nom: string;
  comp: string;
  cat: string;
  stock: number;
  min: number;
  otc: boolean;
  vence: string;
  lote: string;
};

type AlertSeverity = 'critica' | 'alta' | 'media';

type AlertItem = {
  id: number;
  tipo: string;
  code: string;
  msg: string;
  sev: AlertSeverity;
  time: string;
  read: boolean;
};

type Tercero = {
  dni: string;
  n: string;
  emp: string;
  vetado: boolean;
  motivo: string;
};

type TabItem = {
  k: string;
  l: string;
};

type OptionItem = string | { label: string };

interface BadgeProps {
  children: React.ReactNode;
  color?: BadgeColor;
}

interface EVABarProps {
  value: number;
}

interface KPIProps {
  icon: React.ReactNode;
  value: React.ReactNode;
  label: string;
  sub?: string;
  color?: Exclude<BadgeColor, 'gray'>;
}

interface BtnProps {
  children: React.ReactNode;
  variant?: ButtonVariant;
  size?: ButtonSize;
  onClick?: () => void;
  full?: boolean;
  disabled?: boolean;
}

interface InputProps {
  label?: string;
  placeholder?: string;
  type?: React.HTMLInputTypeAttribute;
  value?: string | number;
  onChange?: React.ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement>;
  required?: boolean;
  area?: boolean;
  mono?: boolean;
  className?: string;
}

interface SelProps {
  label?: string;
  options: OptionItem[];
  value?: string;
  onChange?: React.ChangeEventHandler<HTMLSelectElement>;
  required?: boolean;
  className?: string;
}

interface ModalProps {
  open: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
  wide?: boolean;
}

interface ToastProps {
  msg: string | null;
  type: ToastType;
  onClose: () => void;
}

interface TabsProps {
  tabs: TabItem[];
  active: string;
  onChange: (tab: string) => void;
}

interface DashboardPageProps {
  setView: React.Dispatch<React.SetStateAction<ViewKey>>;
  alerts: AlertItem[];
}

interface AtencionPageProps {
  toast: (message: string, type?: ToastType) => void;
}

interface HistoriaPageProps {
  toast: (message: string, type?: ToastType) => void;
}

interface AccidentesPageProps {
  toast: (message: string, type?: ToastType) => void;
}

interface CardexPageProps {
  toast: (message: string, type?: ToastType) => void;
}

interface AltasPageProps {
  toast: (message: string, type?: ToastType) => void;
}

interface AlertasPageProps {
  alerts: AlertItem[];
  markRead: (id: number) => void;
  markAllRead: () => void;
}

interface EMOPageProps {
  toast: (message: string, type?: ToastType) => void;
}

interface TercerosPageProps {
  toast: (message: string, type?: ToastType) => void;
}

interface ReportesPageProps {
  toast: (message: string, type?: ToastType) => void;
}

interface FormatosPageProps {
  toast: (message: string, type?: ToastType) => void;
}

// ═══════ DATA ═══════
const WORKERS: Worker[] = [
  {id:1,dni:'45678912',name:'Jose Cernaque Ramirez',area:'Produccion',puesto:'Operario Linea 1',estado:'Restriccion',ingreso:'2022-03-15',emo:'2025-06-10',proxEmo:'2026-06-10',estadoEmo:'vigente',alerg:'Ninguna',cron:'',apt:'Apto c/ Restricciones',ats:7,ultima:'13/08/2025',diag:'M75.1 Tendinitis supraespinoso',eva:4,rest:'No cargar >5kg, no movimientos repetitivos hombro izq',diasR:45,rehab:'6/10'},
  {id:2,dni:'78945612',name:'Juana Porrazo Mendez',area:'Empaque',puesto:'Operaria Empaque',estado:'Restriccion',ingreso:'2021-08-01',emo:'2025-01-20',proxEmo:'2026-01-20',estadoEmo:'vencido',alerg:'Penicilina',cron:'Osteoporosis',apt:'Apto c/ Restricciones',ats:5,ultima:'15/12/2025',diag:'M54.5 Lumbalgia cronica',eva:6,rest:'No cargar peso, evitar ambientes frios',diasR:30,rehab:'3/10'},
  {id:3,dni:'32165498',name:'Maria Vera Torres',area:'Corte',puesto:'Operaria Corte',estado:'Activo',ingreso:'2023-01-10',emo:'2025-11-05',proxEmo:'2026-11-05',estadoEmo:'vigente',alerg:'Ninguna',cron:'',apt:'Apto c/ Restricciones',ats:3,ultima:'20/01/2026',diag:'S46.0 Lesion hombro derecho',eva:3,rest:'No cargar peso',diasR:30,rehab:'4/10'},
  {id:4,dni:'65498732',name:'Carlos Lopez Diaz',area:'Almacen',puesto:'Auxiliar Almacen',estado:'Activo',ingreso:'2023-11-01',emo:'2025-08-15',proxEmo:'2026-08-15',estadoEmo:'por_vencer',alerg:'Ibuprofeno',cron:'Diabetes Tipo 2',apt:'Apto',ats:2,ultima:'05/02/2026',diag:'R51 Cefalea tensional',eva:2,rest:'',diasR:0,rehab:''},
  {id:5,dni:'11223344',name:'Ana Gutierrez Silva',area:'Produccion',puesto:'Supervisora Linea 2',estado:'Activo',ingreso:'2024-05-20',emo:'2025-04-22',proxEmo:'2026-04-22',estadoEmo:'por_vencer',alerg:'Mariscos',cron:'Asma',apt:'Apto',ats:1,ultima:'10/03/2026',diag:'J30.4 Rinitis alergica',eva:1,rest:'',diasR:0,rehab:''},
  {id:6,dni:'99887766',name:'Pedro Huaman Lopez',area:'Mantenimiento',puesto:'Tecnico Electricista',estado:'Activo',ingreso:'2022-06-15',emo:'2025-09-10',proxEmo:'2026-09-10',estadoEmo:'vigente',alerg:'Ninguna',cron:'',apt:'Apto',ats:4,ultima:'22/03/2026',diag:'J06.9 IRA',eva:3,rest:'',diasR:0,rehab:''},
  {id:7,dni:'55443322',name:'Rosa Martinez Flores',area:'Calidad',puesto:'Inspectora QA',estado:'Activo',ingreso:'2020-11-01',emo:'2025-07-20',proxEmo:'2026-07-20',estadoEmo:'vigente',alerg:'Sulfonamidas',cron:'Hipertension',apt:'Apto',ats:4,ultima:'22/02/2026',diag:'K29.7 Gastritis',eva:3,rest:'',diasR:0,rehab:''},
]
const TIMELINE: TimelineItem[] = [
  {f:'13/08/2025',med:'Dra. Rodriguez',d:'M75.1 Tendinitis supraespinoso',eva:4,tr:'Ecografia realizada. Tendinitis confirmada. Derivar a rehabilitacion.',tipo:'Moderada'},
  {f:'27/07/2025',med:'Dra. Rodriguez',d:'M79.1 Mialgia hombro izquierdo',eva:4,tr:'Antiinflamatorio IM + orden de ecografia partes blandas.',tipo:'Moderada'},
  {f:'23/07/2025',med:'Dra. Rodriguez',d:'M79.1 Mialgia hombro izquierdo',eva:8,tr:'Dolor agudo por manipulacion de bandejas. Analgesico IM.',tipo:'Leve'},
]
const ACCIDENTES: Accidente[] = [
  {id:1,trab:'Jose Cernaque Ramirez',fecha:'2025-07-23',tipo:'Accidente',area:'Produccion',grav:'Moderado',parte:'Hombro izquierdo',estado:'En seguimiento',segs:3,seguimientos:[{f:'25/07',n:'Evaluacion inicial: dolor 8/10, se indica reposo'},{f:'27/07',n:'Control: dolor baja a 4/10, se ordena ecografia'},{f:'13/08',n:'Resultado ecografia: tendinitis supraespinoso confirmada'}]},
  {id:2,trab:'Maria Vera Torres',fecha:'2025-12-10',tipo:'Accidente',area:'Corte',grav:'Moderado',parte:'Hombro derecho',estado:'En seguimiento',segs:2,seguimientos:[{f:'12/12',n:'Control a 2 dias: dolor persiste 5/10'},{f:'20/01',n:'Control: mejora lenta, se indica rehabilitacion'}]},
  {id:3,trab:'Pedro Huaman Lopez',fecha:'2026-02-20',tipo:'Incidente',area:'Mantenimiento',grav:'Leve',parte:'Antebrazo derecho',estado:'Alta',segs:1,seguimientos:[{f:'22/02',n:'Herida superficial cicatrizada. Alta sin restricciones.'}]},
]
const MEDS: Medicamento[] = [
  {id:1,nom:'Paracetamol 500mg',comp:'Acetaminofen',cat:'Analgesico',stock:120,min:20,otc:true,vence:'15/04/2026',lote:'L2026-034'},
  {id:2,nom:'Ibuprofeno 400mg',comp:'Ibuprofeno',cat:'AINE',stock:85,min:15,otc:true,vence:'20/08/2026',lote:'L2026-022'},
  {id:3,nom:'Diclofenaco 75mg IM',comp:'Diclofenaco sodico',cat:'AINE',stock:30,min:10,otc:false,vence:'10/06/2026',lote:'L2025-089'},
  {id:4,nom:'Omeprazol 20mg',comp:'Omeprazol',cat:'Gastroprotector',stock:60,min:15,otc:true,vence:'01/09/2026',lote:'L2026-001'},
  {id:5,nom:'Loratadina 10mg',comp:'Loratadina',cat:'Antihistaminico',stock:45,min:10,otc:true,vence:'15/07/2026',lote:'L2025-102'},
  {id:6,nom:'Dexametasona 4mg IM',comp:'Dexametasona fosfato',cat:'Corticoide',stock:8,min:10,otc:false,vence:'30/05/2026',lote:'L2025-077'},
  {id:7,nom:'Naproxeno 550mg',comp:'Naproxeno sodico',cat:'AINE',stock:3,min:10,otc:false,vence:'18/03/2027',lote:'L2026-011'},
  {id:8,nom:'Clorfenamina 4mg',comp:'Clorfenamina maleato',cat:'Antihistaminico',stock:90,min:20,otc:true,vence:'22/11/2026',lote:'L2026-015'},
]
const ALERTS_INIT: AlertItem[] = [
  {id:1,tipo:'FRECUENCIA',code:'RF-14',msg:'Jose Cernaque: 7 atenciones este mes',sev:'alta',time:'Hace 2h',read:false},
  {id:2,tipo:'TBC',code:'RF-15',msg:'Pedro Huaman: 8 dias consecutivos con sintomas respiratorios',sev:'critica',time:'Hace 1h',read:false},
  {id:3,tipo:'ALTA',code:'RF-20',msg:'Maria Vera: 30 dias sin alta definitiva',sev:'media',time:'Hace 3h',read:false},
  {id:4,tipo:'ACCIDENTE',code:'RF-17',msg:'Accidente reportado en Linea 3: corte en mano',sev:'critica',time:'Hace 30min',read:false},
  {id:5,tipo:'STOCK',code:'RF-09',msg:'Naproxeno 550mg: stock critico (3 uds, min: 10)',sev:'alta',time:'Hace 1h',read:false},
  {id:6,tipo:'EMO',code:'EMO',msg:'Juana Porrazo: EMO vencido hace 36 dias',sev:'critica',time:'Hace 6h',read:false},
  {id:7,tipo:'VETO',code:'RF-03',msg:'Tercero vetado intento ingresar: DNI 88776655',sev:'critica',time:'Hace 45min',read:false},
  {id:8,tipo:'EMO',code:'EMO',msg:'Carlos Lopez: EMO vence en 56 dias',sev:'media',time:'Hace 1d',read:true},
]
const TERCEROS: Tercero[] = [
  {dni:'88776655',n:'Miguel Torres S.',emp:'Acical SAC',vetado:true,motivo:'Intoxicacion turno noche — Feb 2026'},
  {dni:'44556677',n:'Luis Ramos P.',emp:'FC Servicios',vetado:false,motivo:''},
  {dni:'22334455',n:'Jorge Diaz M.',emp:'FR Limpieza',vetado:true,motivo:'Acto inseguro grave en refrigeracion'},
  {dni:'66778899',n:'Carmen Soto R.',emp:'Acical SAC',vetado:false,motivo:''},
]
const CIE10: string[] = ['Seleccionar...','M75.1 Tendinitis supraespinoso','M79.1 Mialgia','M54.5 Lumbalgia','R51 Cefalea','K29.7 Gastritis','J06.9 IRA superior','R05 Tos persistente','L50.0 Urticaria','S61.0 Herida cortante','J30.4 Rinitis alergica','S46.0 Lesion tendon hombro']

// ═══════ COMPONENTS ═══════
const Badge = ({ children, color = 'blue' }: BadgeProps) => {
  const c = {blue:'bg-blue-50 text-blue-700 border-blue-100',green:'bg-emerald-50 text-emerald-700 border-emerald-100',red:'bg-red-50 text-red-700 border-red-100',orange:'bg-amber-50 text-amber-700 border-amber-100',gray:'bg-slate-50 text-slate-500 border-slate-100',teal:'bg-teal-50 text-teal-700 border-teal-100',purple:'bg-violet-50 text-violet-700 border-violet-100'}
  return <span className={`inline-flex items-center px-2 py-0.5 rounded-md text-[10px] font-semibold border font-mono ${c[color]||c.blue}`}>{children}</span>
}

const EVABar = ({ value }: EVABarProps) => {
  const c = value<=2?'bg-emerald-500':value<=5?'bg-amber-500':value<=7?'bg-orange-500':'bg-red-500'
  const tc = value<=2?'text-emerald-600':value<=5?'text-amber-600':value<=7?'text-orange-600':'text-red-600'
  return <div className="flex items-center gap-2"><div className="flex-1 h-1.5 rounded-full bg-slate-100"><div className={`h-full rounded-full ${c} transition-all duration-500`} style={{width:`${value*10}%`}}/></div><span className={`text-xs font-bold font-mono ${tc}`}>{value}/10</span></div>
}

const KPI = ({ icon, value, label, sub, color = 'blue' }: KPIProps) => {
  const bg = {blue:'from-blue-500 to-blue-600',green:'from-emerald-500 to-emerald-600',red:'from-red-500 to-red-600',orange:'from-amber-500 to-amber-600',teal:'from-teal-500 to-teal-600',purple:'from-violet-500 to-violet-600'}
  return <div className="bg-white rounded-2xl border border-slate-200 p-4 hover:shadow-md hover:-translate-y-0.5 transition-all">
    <div className="flex items-start justify-between mb-2">
      <div className={`w-9 h-9 rounded-xl bg-gradient-to-br ${bg[color]} flex items-center justify-center text-white text-base`}>{icon}</div>
      {sub && <span className="text-[10px] text-slate-400 font-medium">{sub}</span>}
    </div>
    <div className="text-2xl font-bold text-slate-800 tracking-tight">{value}</div>
    <div className="text-[11px] text-slate-500 mt-0.5">{label}</div>
  </div>
}

const Btn = ({ children, variant = 'primary', size = 'md', onClick, full, disabled }: BtnProps) => {
  const v = {primary:'bg-gradient-to-r from-blue-600 to-blue-700 text-white shadow-sm shadow-blue-200/50 hover:from-blue-700 hover:to-blue-800',secondary:'bg-white text-slate-700 border border-slate-200 hover:bg-slate-50',danger:'bg-gradient-to-r from-red-500 to-red-600 text-white',success:'bg-gradient-to-r from-emerald-500 to-emerald-600 text-white',ghost:'text-slate-600 hover:bg-slate-100'}
  const s = {sm:'px-3 py-1.5 text-[11px]',md:'px-4 py-2 text-sm',lg:'px-6 py-2.5 text-sm'}
  return <button className={`inline-flex items-center justify-center font-medium rounded-xl transition-all duration-200 gap-1.5 ${v[variant]} ${s[size]} ${full?'w-full':''} ${disabled?'opacity-40 cursor-not-allowed':'cursor-pointer'}`} onClick={disabled?undefined:onClick}>{children}</button>
}

const Input = ({ label, placeholder, type = 'text', value, onChange, required, area, mono, className = '' }: InputProps) => (
  <div className={className}>
    {label && <label className="block text-[11px] font-semibold text-slate-500 mb-1.5 uppercase tracking-wider">{label}{required && <span className="text-red-400 ml-0.5">*</span>}</label>}
    {area ? <textarea rows={3} placeholder={placeholder} defaultValue={value} onChange={onChange} className="w-full px-3 py-2 bg-white border border-slate-200 rounded-xl text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-400 resize-none transition-all"/> :
    <input type={type} placeholder={placeholder} value={value} onChange={onChange} className={`w-full px-3 py-2 bg-white border border-slate-200 rounded-xl text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-400 transition-all ${mono?'font-mono':''}`}/>}
  </div>
)

const Sel = ({ label, options, value, onChange, required, className = '' }: SelProps) => (
  <div className={className}>
    {label && <label className="block text-[11px] font-semibold text-slate-500 mb-1.5 uppercase tracking-wider">{label}{required && <span className="text-red-400 ml-0.5">*</span>}</label>}
    <select value={value} onChange={onChange} className="w-full px-3 py-2 bg-white border border-slate-200 rounded-xl text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-400 transition-all cursor-pointer">
      {options.map((o, i) => { const optionValue = typeof o === 'string' ? o : o.label; return <option key={i} value={optionValue}>{optionValue}</option> })}
    </select>
  </div>
)

const Modal = ({ open, onClose, title, children, wide }: ModalProps) => {
  if(!open) return null
  return <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/30 backdrop-blur-sm" onClick={onClose}>
    <div className={`bg-white rounded-2xl p-7 ${wide?'w-[680px]':'w-[460px]'} max-h-[85vh] overflow-y-auto shadow-2xl border border-slate-200`} onClick={e=>e.stopPropagation()}>
      <div className="flex justify-between items-center mb-5">
        <h3 className="text-base font-bold text-slate-800">{title}</h3>
        <button onClick={onClose} className="text-slate-400 hover:text-slate-600 text-lg">✕</button>
      </div>
      {children}
    </div>
  </div>
}

const Toast = ({ msg, type, onClose }: ToastProps) => {
  useEffect(()=>{if(msg){const t=setTimeout(onClose,3000);return()=>clearTimeout(t)}},[msg,onClose])
  if(!msg) return null
  const c = type==='success'?'bg-emerald-50 text-emerald-700 border-emerald-200':type==='error'?'bg-red-50 text-red-700 border-red-200':'bg-amber-50 text-amber-700 border-amber-200'
  return <div className={`fixed top-5 right-5 z-[60] px-4 py-3 rounded-xl border shadow-lg text-sm font-medium flex items-center gap-2 animate-[slideIn_.3s_ease] ${c}`}>
    {type==='success'?'✓':type==='error'?'✕':'⚠'} {msg}
  </div>
}

const Tabs = ({ tabs, active, onChange }: TabsProps) => (
  <div className="flex gap-1 bg-slate-100 rounded-xl p-1 mb-5">
    {tabs.map(t=><button key={t.k} onClick={()=>onChange(t.k)} className={`flex-1 px-3 py-2 rounded-lg text-xs font-medium transition-all ${active===t.k?'bg-white text-slate-800 shadow-sm':'text-slate-500 hover:text-slate-700'}`}>{t.l}</button>)}
  </div>
)

// ═══════ PAGES ═══════

function DashboardPage({ setView, alerts }: DashboardPageProps) {
  const unread = alerts.filter(a=>!a.read).length
  const sevC = {critica:'bg-red-500',alta:'bg-orange-500',media:'bg-amber-500'}
  return <div>
    <div className="mb-6"><h2 className="text-xl font-bold text-slate-800">Dashboard SST</h2><p className="text-sm text-slate-500 mt-0.5">Resumen ejecutivo — Sistema Medico-Ocupacional — Nova Peru</p></div>
    <div className="grid grid-cols-2 lg:grid-cols-5 gap-3 mb-6">
      <KPI icon="👥" value="350" label="Trabajadores registrados" sub="HC Digital" color="blue"/>
      <KPI icon="🩺" value="47" label="Atenciones este mes" sub="Mar 2026" color="teal"/>
      <KPI icon="⚠️" value={unread} label="Alertas activas" sub="Pendientes" color="red"/>
      <KPI icon="📋" value="95.1%" label="EMO vigentes" sub="333/350" color="green"/>
      <KPI icon="⏳" value="3" label="Altas pendientes" sub="Reubicados" color="orange"/>
    </div>
    <div className="grid grid-cols-3 gap-4 mb-6">
      {/* ALERTAS */}
      <div className="bg-white rounded-2xl border border-slate-200 p-5 col-span-2">
        <div className="flex justify-between items-center mb-4"><h3 className="font-bold text-slate-800 text-sm">Alertas y Seguimientos</h3><Btn size="sm" variant="ghost" onClick={()=>setView('alertas')}>Ver todas →</Btn></div>
        <div className="space-y-2 max-h-72 overflow-y-auto">
          {alerts.filter(a=>!a.read).slice(0,5).map(a=><div key={a.id} className="flex items-start gap-2.5 py-2.5 px-3 rounded-xl bg-slate-50 hover:bg-slate-100 transition-colors">
            <div className={`w-2 h-2 rounded-full mt-1.5 flex-shrink-0 ${sevC[a.sev]} ${!a.read?'animate-pulse':''}`}/>
            <div className="flex-1 min-w-0"><div className="flex items-center gap-1.5 mb-0.5"><Badge color={a.sev==='critica'?'red':a.sev==='alta'?'orange':'gray'}>{a.tipo}</Badge><span className="text-[9px] text-slate-400 font-mono">{a.code}</span></div><p className="text-xs text-slate-700 truncate">{a.msg}</p><span className="text-[10px] text-slate-400">{a.time}</span></div>
          </div>)}
        </div>
      </div>
      {/* EMO + RESTRICCIONES */}
      <div className="space-y-4">
        <div className="bg-white rounded-2xl border border-slate-200 p-5">
          <h3 className="font-bold text-slate-800 text-sm mb-3">EMO Vencimientos</h3>
          {[{n:'Juana Porrazo M.',d:-36,a:'Empaque'},{n:'Carlos Lopez D.',d:56,a:'Almacen'},{n:'Ana Gutierrez S.',d:25,a:'Produccion'}].map((w,i)=><div key={i} className="flex justify-between items-center py-2">
            <div><span className="text-xs font-medium text-slate-800">{w.n}</span><span className="text-[10px] text-slate-400 ml-1.5">{w.a}</span></div>
            <Badge color={w.d<0?'red':w.d<60?'orange':'green'}>{w.d<0?`VENCIDO ${Math.abs(w.d)}d`:`${w.d} dias`}</Badge>
          </div>)}
          <Btn size="sm" variant="ghost" full onClick={()=>setView('emo')}>Ver programacion EMO →</Btn>
        </div>
        <div className="bg-gradient-to-br from-blue-600 to-blue-700 rounded-2xl p-5 text-white">
          <h3 className="font-bold text-sm mb-1">Restricciones Vigentes</h3>
          <p className="text-xs text-blue-100 mb-2">2 trabajadores con restricciones laborales activas</p>
          <Btn size="sm" variant="secondary" onClick={()=>setView('altas')}>Gestionar Altas</Btn>
        </div>
      </div>
    </div>
  </div>
}

function AtencionPage({ toast }: AtencionPageProps) {
  const [q, setQ] = useState<string>(''); const [sel, setSel] = useState<Worker | null>(null); const [form, setForm] = useState<boolean>(false)
  const [triaje, setTriaje] = useState<string>(''); const [eva, setEva] = useState<number>(0); const [diag, setDiag] = useState<string>('')
  const fil = q.length>=2?WORKERS.filter(w=>w.dni.includes(q)||w.name.toLowerCase().includes(q.toLowerCase())):[]

  if(!sel) return <div>
    <div className="mb-5"><h2 className="text-xl font-bold text-slate-800">Atencion Medica</h2><p className="text-sm text-slate-500 mt-0.5">Registro de consulta en topico — RF-04, RF-06</p></div>
    <Input value={q} onChange={e=>setQ(e.target.value)} placeholder="🔍  Buscar por DNI o nombre del trabajador..."/>
    {fil.length>0 && <div className="bg-white rounded-2xl border border-slate-200 mt-2 overflow-hidden">
      {fil.map((w,i)=><button key={i} onClick={()=>setSel(w)} className="w-full flex items-center gap-3 px-4 py-3.5 border-b border-slate-50 hover:bg-blue-50/30 transition-colors text-left">
        <div className="w-9 h-9 rounded-xl bg-blue-50 flex items-center justify-center text-sm font-bold text-blue-600">{w.name.split(' ').map(x=>x[0]).join('').slice(0,2)}</div>
        <div className="flex-1"><div className="text-sm font-medium text-slate-800">{w.name}</div><div className="text-[11px] text-slate-400 font-mono">DNI: {w.dni} · {w.area} · {w.puesto}</div></div>
        <Badge color={w.apt.includes('Restricciones')?'orange':'green'}>{w.apt}</Badge>
        {w.ats>=5 && <Badge color="red">⚠ {w.ats}x</Badge>}
      </button>)}
    </div>}
    {q.length>=2&&!fil.length&&<p className="text-center text-slate-400 text-sm mt-8">Sin resultados para "{q}"</p>}
    {!q&&<div className="text-center py-16 text-slate-300"><p className="text-4xl mb-3">🔍</p><p className="text-sm">Ingrese DNI o nombre para buscar</p></div>}
  </div>

  return <div>
    <button onClick={()=>{setSel(null);setQ('');setForm(false)}} className="text-xs text-blue-600 font-medium mb-4 hover:underline cursor-pointer">← Volver a busqueda</button>
    {/* FICHA */}
    <div className="bg-white rounded-2xl border border-slate-200 p-5 mb-4">
      <div className="flex justify-between items-start">
        <div className="flex gap-4 items-center">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-blue-50 to-teal-50 flex items-center justify-center text-lg font-bold text-blue-600 border border-blue-100">{sel.name.split(' ').map(x=>x[0]).join('').slice(0,2)}</div>
          <div><h3 className="text-base font-bold text-slate-800">{sel.name}</h3><p className="text-xs text-slate-400 font-mono mt-0.5">DNI: {sel.dni} · {sel.area} · {sel.puesto}</p>
            <div className="flex gap-1.5 mt-2 flex-wrap">
              <Badge color={sel.apt.includes('Restricciones')?'orange':'green'}>{sel.apt}</Badge>
              {sel.cron&&<Badge color="red">⚕ {sel.cron}</Badge>}
              {sel.alerg!=='Ninguna'&&<Badge color="red">⚠ ALERGIA: {sel.alerg}</Badge>}
              {sel.diasR>0&&<Badge color="purple">Reubicado {sel.diasR}d</Badge>}
            </div>
          </div>
        </div>
        <div className="text-right"><p className="text-[10px] text-slate-400 uppercase tracking-wider">Atenciones</p><p className={`text-3xl font-bold ${sel.ats>=5?'text-red-500':'text-blue-600'}`}>{sel.ats}</p>{sel.ats>=5&&<Badge color="red">RF-14 ALERTA</Badge>}</div>
      </div>
    </div>
    <div className="grid grid-cols-2 gap-4">
      {/* TIMELINE */}
      <div className="bg-white rounded-2xl border border-slate-200 p-5">
        <h4 className="text-sm font-bold text-slate-800 mb-4 flex items-center gap-2">🕐 Timeline <Badge color="blue">RF-06</Badge></h4>
        {TIMELINE.map((t,i)=><div key={i} className="flex gap-3 mb-4">
          <div className="flex flex-col items-center flex-shrink-0"><div className={`w-2.5 h-2.5 rounded-full ${t.eva>=7?'bg-red-500':t.eva>=4?'bg-amber-500':'bg-emerald-500'} ring-2 ring-white shadow`}/>{i<TIMELINE.length-1&&<div className="w-px flex-1 bg-slate-200 mt-1"/>}</div>
          <div className="flex-1 pb-1"><div className="flex justify-between items-center"><span className="text-[11px] font-mono text-slate-400">{t.f}</span><Badge color={t.tipo==='Moderada'?'orange':'green'}>{t.tipo}</Badge></div><p className="text-xs font-semibold text-slate-800 mt-1">{t.d}</p><p className="text-[11px] text-slate-500 mt-0.5 leading-relaxed">{t.tr}</p><div className="mt-1.5 max-w-[140px]"><EVABar value={t.eva}/></div><span className="text-[10px] text-slate-400">{t.med}</span></div>
        </div>)}
      </div>
      {/* FORM */}
      <div className="bg-white rounded-2xl border border-slate-200 p-5">
        {!form?<div className="flex flex-col items-center justify-center h-full gap-3 py-10"><p className="text-4xl">🩺</p><p className="text-sm text-slate-500">Registrar nueva atencion medica</p><Btn onClick={()=>setForm(true)}>+ Nueva Atencion</Btn></div>:
        <div>
          <h4 className="text-sm font-bold text-slate-800 mb-4">Nueva Atencion — RF-04</h4>
          <label className="block text-[11px] font-semibold text-slate-500 mb-2 uppercase tracking-wider">Triaje</label>
          <div className="flex gap-2 mb-3">{[{l:'Leve',c:'emerald'},{l:'Moderada',c:'amber'},{l:'Compleja',c:'red'}].map(t=><button key={t.l} onClick={()=>setTriaje(t.l)} className={`flex-1 py-2 rounded-xl text-xs font-semibold border-2 transition-all ${triaje===t.l?`border-${t.c}-400 bg-${t.c}-50 text-${t.c}-700`:'border-slate-200 text-slate-400 hover:border-slate-300'}`}>{t.l}</button>)}</div>
          <Sel label="Diagnostico CIE-10" options={CIE10} value={diag} onChange={e=>setDiag(e.target.value)} required/>
          <div className="mb-3"><label className="block text-[11px] font-semibold text-slate-500 mb-2 uppercase tracking-wider">EVA Dolor — {eva}/10</label><input type="range" min="0" max="10" value={eva} onChange={e=>setEva(+e.target.value)} className="w-full accent-blue-600"/><EVABar value={eva}/></div>
          <Input label="Tratamiento" placeholder="Describir tratamiento..." area required/>
          <Input label="Observacion conductual — RF-05" placeholder="Obligatorio en accidentes o derivaciones..." area/>
          <div className="flex gap-2 mt-2"><Btn variant="success" full onClick={()=>{setForm(false);toast('Atencion registrada — RF-04','success')}} disabled={!triaje||diag==='Seleccionar...'}>✓ Registrar</Btn><Btn variant="secondary" onClick={()=>setForm(false)}>Cancelar</Btn></div>
        </div>}
      </div>
    </div>
  </div>
}

function HistoriaPage({ toast }: HistoriaPageProps) {
  const [tab, setTab] = useState<string>('list')
  return <div>
    <div className="flex justify-between items-start mb-5"><div><h2 className="text-xl font-bold text-slate-800">Historia Clinica Ocupacional</h2><p className="text-sm text-slate-500 mt-0.5">Gestion de fichas medicas — RM 312-2011/MINSA</p></div><Btn onClick={()=>setTab('new')}>+ Nueva Historia</Btn></div>
    <Tabs tabs={[{k:'list',l:'Listado de Historias'},{k:'new',l:'Nueva Evaluacion'}]} active={tab} onChange={setTab}/>
    {tab==='list'?<div className="bg-white rounded-2xl border border-slate-200 overflow-hidden">
      <div className="p-4 border-b border-slate-100"><input placeholder="Buscar por DNI o nombre..." className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20"/></div>
      <table className="w-full text-sm"><thead><tr className="text-[11px] text-slate-500 bg-slate-50 border-b border-slate-100"><th className="text-left py-3 px-4 font-medium">DNI</th><th className="text-left py-3 px-4 font-medium">Trabajador</th><th className="text-left py-3 px-4 font-medium">Area / Puesto</th><th className="text-left py-3 px-4 font-medium">Evaluacion</th><th className="text-left py-3 px-4 font-medium">Aptitud</th><th className="py-3 px-4"></th></tr></thead>
      <tbody>{WORKERS.map(w=><tr key={w.id} className="border-b border-slate-50 hover:bg-blue-50/20 transition-colors cursor-pointer"><td className="py-3 px-4 font-mono text-xs text-slate-500">{w.dni}</td><td className="py-3 px-4 font-medium text-slate-800">{w.name}</td><td className="py-3 px-4 text-slate-600 text-xs">{w.area} / {w.puesto}</td><td className="py-3 px-4"><Badge color="blue">Periodica</Badge></td><td className="py-3 px-4"><Badge color={w.estado==='Restriccion'?'orange':'green'}>{w.estado==='Restriccion'?'APTO C/R':'APTO'}</Badge></td><td className="py-3 px-4"><Btn size="sm" variant="ghost" onClick={()=>toast(`Ficha de ${w.name} abierta`)}>Ver</Btn></td></tr>)}</tbody></table>
    </div>:
    <div className="space-y-5">
      <div className="bg-white rounded-2xl border border-slate-200 p-6"><h3 className="font-bold text-slate-800 mb-4 flex items-center gap-2"><span className="w-6 h-6 rounded-lg bg-blue-100 text-blue-600 flex items-center justify-center text-[10px] font-bold">1</span>Datos del Trabajador</h3><div className="grid grid-cols-3 gap-3"><Input label="DNI" placeholder="Ingrese DNI" required/><Input label="Nombres" placeholder="Nombres completos" required/><Input label="Apellidos" placeholder="Apellidos" required/><Input label="Fecha Nacimiento" type="date" required/><Sel label="Sexo" options={['Seleccionar','Masculino','Femenino']} required/><Sel label="Area" options={['Seleccionar','Produccion','Empaque','Corte','Almacen','Mantenimiento','Calidad','Logistica']} required/></div></div>
      <div className="bg-white rounded-2xl border border-slate-200 p-6"><h3 className="font-bold text-slate-800 mb-1 flex items-center gap-2"><span className="w-6 h-6 rounded-lg bg-blue-100 text-blue-600 flex items-center justify-center text-[10px] font-bold">2</span>Antecedentes Patologicos</h3><p className="text-[10px] text-red-500 mb-3 ml-8">🔒 Cifrados AES-256 — Solo perfil MEDICO</p><div className="grid grid-cols-2 gap-3"><Input label="Antecedentes Patologicos" placeholder="Alergias, enfermedades cronicas, cirugias..." area/><Input label="Antecedentes Familiares" placeholder="Diabetes, hipertension, cancer..." area/></div></div>
      <div className="bg-white rounded-2xl border border-slate-200 p-6"><h3 className="font-bold text-slate-800 mb-4 flex items-center gap-2"><span className="w-6 h-6 rounded-lg bg-blue-100 text-blue-600 flex items-center justify-center text-[10px] font-bold">3</span>Examen Fisico</h3><div className="grid grid-cols-4 gap-3"><Input label="Peso (kg)" placeholder="70.5" type="number"/><Input label="Talla (cm)" placeholder="170" type="number"/><Input label="Presion Arterial" placeholder="120/80"/><Input label="Sat. Oxigeno" placeholder="98%"/></div></div>
      <div className="bg-white rounded-2xl border border-slate-200 p-6"><h3 className="font-bold text-slate-800 mb-4 flex items-center gap-2"><span className="w-6 h-6 rounded-lg bg-emerald-100 text-emerald-600 flex items-center justify-center text-[10px] font-bold">4</span>Conclusion y Aptitud</h3>
        <div className="grid grid-cols-3 gap-4"><div><label className="block text-[11px] font-semibold text-slate-500 mb-2">Dictamen *</label>{['APTO','APTO CON RESTRICCIONES','NO APTO'].map(o=><label key={o} className="flex items-center gap-2 p-2.5 rounded-xl border border-slate-200 mb-2 cursor-pointer hover:border-blue-300 transition-colors"><input type="radio" name="apt" className="accent-blue-600"/><span className="text-sm text-slate-700">{o}</span></label>)}</div><Input label="Recomendaciones" placeholder="Recomendaciones medicas..." area/><Input label="Restricciones (si aplica)" placeholder="No cargar peso, evitar escaleras..." area/></div>
        <div className="mt-3 p-3 rounded-xl bg-blue-50 border border-blue-200 text-[11px] text-blue-700"><strong>Nota:</strong> Si APTO CON RESTRICCIONES, el sistema notifica automaticamente a Produccion y RRHH las restricciones SIN revelar el diagnostico medico.</div>
      </div>
      <div className="flex justify-end gap-3"><Btn variant="secondary" onClick={()=>setTab('list')}>Cancelar</Btn><Btn size="lg" onClick={()=>{setTab('list');toast('Historia Clinica guardada exitosamente')}}>Guardar Historia Clinica</Btn></div>
    </div>}
  </div>
}

function AccidentesPage({ toast }: AccidentesPageProps) {
  const [tab, setTab] = useState<string>('list'); const [selAcc, setSelAcc] = useState<Accidente | null>(null)
  return <div>
    <div className="flex justify-between items-start mb-5"><div><h2 className="text-xl font-bold text-slate-800">Accidentes e Incidentes</h2><p className="text-sm text-slate-500 mt-0.5">Registro, seguimiento programado y alta — RF-05, RF-17, RF-21</p></div><Btn variant="danger" onClick={()=>setTab('new')}>+ Nuevo Reporte</Btn></div>
    <Tabs tabs={[{k:'list',l:'Registro'},{k:'new',l:'Nuevo Reporte'},{k:'seg',l:'Seguimiento'}]} active={tab} onChange={setTab}/>
    {tab==='list'&&<div className="bg-white rounded-2xl border border-slate-200 overflow-hidden"><table className="w-full text-sm"><thead><tr className="text-[11px] text-slate-500 bg-slate-50 border-b border-slate-100"><th className="text-left py-3 px-4 font-medium">ID</th><th className="text-left py-3 px-4 font-medium">Trabajador</th><th className="text-left py-3 px-4 font-medium">Fecha</th><th className="text-left py-3 px-4 font-medium">Tipo</th><th className="text-left py-3 px-4 font-medium">Gravedad</th><th className="text-left py-3 px-4 font-medium">Parte</th><th className="text-left py-3 px-4 font-medium">Estado</th><th className="py-3 px-4 font-medium">Seg.</th></tr></thead>
      <tbody>{ACCIDENTES.map(a=><tr key={a.id} className="border-b border-slate-50 hover:bg-red-50/20 transition-colors cursor-pointer" onClick={()=>{setSelAcc(a);setTab('seg')}}><td className="py-3 px-4 font-mono text-[11px]">ACC-{String(a.id).padStart(4,'0')}</td><td className="py-3 px-4 font-medium text-slate-800">{a.trab}</td><td className="py-3 px-4 text-slate-500 text-xs">{a.fecha}</td><td className="py-3 px-4"><Badge color={a.tipo==='Accidente'?'red':'orange'}>{a.tipo}</Badge></td><td className="py-3 px-4"><Badge color={a.grav==='Moderado'?'orange':'green'}>{a.grav}</Badge></td><td className="py-3 px-4 text-xs text-slate-600">{a.parte}</td><td className="py-3 px-4"><Badge color={a.estado==='Alta'?'green':'orange'}>{a.estado}</Badge></td><td className="py-3 px-4 text-center font-bold text-slate-600">{a.segs}</td></tr>)}</tbody></table></div>}
    {tab==='new'&&<div className="bg-white rounded-2xl border border-slate-200 p-6 space-y-4">
      <h3 className="font-bold text-slate-800">Reporte de Accidente / Incidente</h3>
      <div className="grid grid-cols-3 gap-3"><Sel label="Tipo" options={['Accidente','Incidente']} required/><Input label="Fecha" type="date" required/><Input label="Hora" type="time" required/><Sel label="Trabajador" options={['Seleccionar...',...WORKERS.map(w=>w.name)]} required/><Sel label="Area" options={['Produccion','Empaque','Corte','Almacen','Mantenimiento','Calidad']} required/><Sel label="Gravedad" options={['Leve','Moderado','Grave','Muy Grave']} required/></div>
      <div className="grid grid-cols-2 gap-3"><Input label="Descripcion del evento" placeholder="Detalle que ocurrio..." area/><Input label="Evaluacion medica inmediata — RF-05" placeholder="Diagnostico, tratamiento de primera atencion, conducta del trabajador..." area/></div>
      <div className="flex items-center gap-3"><label className="flex items-center gap-2 cursor-pointer"><input type="checkbox" className="accent-blue-600 w-4 h-4"/><span className="text-sm text-slate-700">Activar SCTR (criterio medico)</span></label><label className="flex items-center gap-2 cursor-pointer"><input type="checkbox" className="accent-blue-600 w-4 h-4"/><span className="text-sm text-slate-700">Requiere derivacion externa</span></label></div>
      <div className="flex justify-end gap-3"><Btn variant="secondary" onClick={()=>setTab('list')}>Cancelar</Btn><Btn variant="danger" onClick={()=>{setTab('list');toast('Accidente registrado — Notificacion RF-17 enviada a SST, RRHH, Gerencia')}}>Registrar y Notificar</Btn></div>
    </div>}
    {tab==='seg'&&<div>
      {selAcc?<div className="bg-white rounded-2xl border border-slate-200 p-6">
        <div className="flex justify-between items-start mb-4"><div><h3 className="font-bold text-slate-800">ACC-{String(selAcc.id).padStart(4,'0')} — {selAcc.trab}</h3><p className="text-xs text-slate-500">{selAcc.fecha} · {selAcc.area} · {selAcc.parte} · <Badge color={selAcc.estado==='Alta'?'green':'orange'}>{selAcc.estado}</Badge></p></div><Btn size="sm" variant="success" onClick={()=>toast('Seguimiento registrado exitosamente')}>+ Agregar Seguimiento</Btn></div>
        <div className="space-y-3 mt-4">{['2 dias','1 semana','2 semanas','1 mes'].map((p,i)=><div key={i} className={`flex items-center gap-3 p-3 rounded-xl border ${i<selAcc.seguimientos.length?'border-emerald-200 bg-emerald-50/30':'border-dashed border-slate-200'}`}>
          <div className={`w-7 h-7 rounded-lg flex items-center justify-center text-xs font-bold ${i<selAcc.seguimientos.length?'bg-emerald-100 text-emerald-700':'bg-slate-100 text-slate-400'}`}>{i+1}</div>
          <div className="flex-1"><span className="text-xs font-semibold text-slate-700">Seguimiento a {p}</span>{i<selAcc.seguimientos.length&&<p className="text-[11px] text-slate-500 mt-0.5">{selAcc.seguimientos[i].f}: {selAcc.seguimientos[i].n}</p>}</div>
          <Badge color={i<selAcc.seguimientos.length?'green':'gray'}>{i<selAcc.seguimientos.length?'Completado':'Pendiente'}</Badge>
        </div>)}</div>
      </div>:<p className="text-center text-slate-400 mt-8">Seleccione un accidente del registro para ver su seguimiento</p>}
    </div>}
  </div>
}

function CardexPage({ toast }: CardexPageProps) {
  const [q, setQ] = useState<string>(''); const [modal, setModal] = useState<Medicamento | null>(null)
  const fil=q?MEDS.filter(m=>m.nom.toLowerCase().includes(q.toLowerCase())||m.cat.toLowerCase().includes(q.toLowerCase())):MEDS
  return <div>
    <div className="flex justify-between items-start mb-5"><div><h2 className="text-xl font-bold text-slate-800">Cardex Digital</h2><p className="text-sm text-slate-500 mt-0.5">Control farmaceutico — RF-07, RF-08, RF-09</p></div><Badge color="blue">CIE-10 → Categoria → Stock</Badge></div>
    <Input value={q} onChange={e=>setQ(e.target.value)} placeholder="🔍  Buscar medicamento o categoria..."/>
    <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden mt-2">
      <div className="grid grid-cols-[2fr_1.2fr_1fr_0.6fr_0.5fr_0.8fr_0.7fr] px-4 py-2.5 bg-slate-50 border-b border-slate-100 text-[10px] font-semibold text-slate-500 uppercase tracking-wider">{['Medicamento','Composicion','Categoria','Stock','OTC','Vence',''].map(h=><span key={h}>{h}</span>)}</div>
      {fil.map(m=><div key={m.id} className="grid grid-cols-[2fr_1.2fr_1fr_0.6fr_0.5fr_0.8fr_0.7fr] px-4 py-3 border-b border-slate-50 hover:bg-blue-50/20 transition-colors items-center">
        <span className="text-sm font-medium text-slate-800">{m.nom}</span>
        <span className="text-[11px] text-slate-500 font-mono">{m.comp}</span>
        <Badge color="blue">{m.cat}</Badge>
        <span className={`text-sm font-bold font-mono ${m.stock<=m.min?'text-red-500':m.stock<m.min*2?'text-amber-500':'text-emerald-600'}`}>{m.stock}</span>
        <span>{m.otc?<Badge color="green">Si</Badge>:<Badge color="gray">No</Badge>}</span>
        <span className="text-[11px] text-slate-400">{m.vence}</span>
        <Btn size="sm" variant="ghost" onClick={()=>setModal(m)}>Entregar</Btn>
      </div>)}
    </div>
    <Modal open={!!modal} onClose={()=>setModal(null)} title={`Entregar: ${modal?.nom}`}>
      <div className="p-3 bg-red-50 rounded-xl border border-red-100 mb-4 flex items-center gap-2"><span>⚠</span><span className="text-xs text-red-700 font-medium">RF-09: Verificar alergias del paciente antes de confirmar entrega</span></div>
      <Input label="DNI del trabajador" placeholder="Ingrese DNI..." mono/>
      <Input label="Cantidad" placeholder="1" type="number"/>
      <Sel label="Motivo" options={['Seleccionar motivo...','Dolor osteomuscular','Cefalea','Sintomas respiratorios','Dolor abdominal','Reaccion alergica']}/>
      <div className="flex gap-2 mt-2"><Btn variant="success" full onClick={()=>{setModal(null);toast(`${modal?.nom} entregado — Registrado en Cardex`)}}>✓ Confirmar Entrega</Btn><Btn variant="secondary" onClick={()=>setModal(null)}>Cancelar</Btn></div>
    </Modal>
  </div>
}

function AltasPage({ toast }: AltasPageProps) {
  const pend = WORKERS.filter((w) => w.diasR > 0); const [modal, setModal] = useState<Worker | null>(null)
  return <div>
    <div className="mb-5"><h2 className="text-xl font-bold text-slate-800">Altas Medicas</h2><p className="text-sm text-slate-500 mt-0.5">Gestion de aptitud y reubicacion — RF-19, RF-20, RF-21</p></div>
    <div className="grid grid-cols-3 gap-3 mb-5"><KPI icon="⏳" value={pend.length} label="Altas pendientes" color="orange"/><KPI icon="🔄" value={pend.filter(w=>w.diasR>0).length} label="Reubicados activos" color="purple"/><KPI icon="🚫" value="1" label="Bloqueados (sin alta)" color="red"/></div>
    {pend.map((p,i)=><div key={i} className="bg-white rounded-2xl border border-slate-200 p-5 mb-3 hover:shadow-sm transition-all">
      <div className="flex justify-between items-start"><div className="flex-1"><div className="flex items-center gap-2 mb-1.5"><span className="text-sm font-bold text-slate-800">{p.name}</span><span className="text-[11px] font-mono text-slate-400">{p.dni}</span><Badge color="orange">{p.apt}</Badge>{p.rehab&&<Badge color="purple">Rehab: {p.rehab}</Badge>}</div><p className="text-xs text-slate-500">{p.rest}</p><div className="mt-2 max-w-[180px]"><EVABar value={p.eva}/></div></div>
        <div className="text-right flex flex-col items-end gap-2"><div><p className="text-[10px] text-slate-400">Dias sin alta</p><p className={`text-2xl font-bold ${p.diasR>30?'text-red-500':'text-amber-500'}`}>{p.diasR}</p></div><Btn size="sm" variant="ghost" onClick={()=>setModal(p)}>Gestionar Alta</Btn></div>
      </div>
    </div>)}
    <Modal open={!!modal} onClose={()=>setModal(null)} title={`Alta: ${modal?.name}`}>
      <Sel label="Tipo de Alta — RF-19" options={['Seleccionar...','Alta Definitiva','Alta con Restricciones','Mantener Reubicacion']}/>
      <Input label="Restricciones" placeholder="Describir restricciones (si aplica)..." area/>
      <div className="mb-3"><label className="block text-[11px] font-semibold text-slate-500 mb-1.5 uppercase tracking-wider">EVA Actual</label><EVABar value={modal?.eva??0}/>{(modal?.eva??0)>2&&<p className="text-[11px] text-red-500 mt-1">⚠ EVA {'>'}2/10: No se recomienda levantar reubicacion</p>}</div>
      <div className="flex gap-2"><Btn variant="success" full onClick={()=>{setModal(null);toast('Alta registrada — RF-19')}}>✓ Registrar Alta</Btn><Btn variant="secondary" onClick={()=>setModal(null)}>Cancelar</Btn></div>
    </Modal>
  </div>
}

function AlertasPage({ alerts, markRead, markAllRead }: AlertasPageProps) {
  const [tab, setTab] = useState<string>('all'); const sevC: Record<AlertSeverity, BadgeColor> = { critica: 'red', alta: 'orange', media: 'gray' }
  const fil=tab==='all'?alerts:tab==='unread'?alerts.filter(a=>!a.read):alerts.filter(a=>a.tipo===tab)
  return <div>
    <div className="flex justify-between items-start mb-5"><div><h2 className="text-xl font-bold text-slate-800">Centro de Alertas</h2><p className="text-sm text-slate-500 mt-0.5">Motor epidemiologico — RF-14, RF-15, RF-17, RF-20</p></div><Btn size="sm" variant="secondary" onClick={markAllRead}>Marcar todas leidas</Btn></div>
    <Tabs tabs={[{k:'all',l:'Todas'},{k:'unread',l:`No leidas (${alerts.filter(a=>!a.read).length})`},{k:'FRECUENCIA',l:'Frecuencia'},{k:'TBC',l:'TBC'},{k:'ACCIDENTE',l:'Accidente'},{k:'EMO',l:'EMO'},{k:'STOCK',l:'Stock'},{k:'VETO',l:'Veto'}]} active={tab} onChange={setTab}/>
    {fil.map(a=><div key={a.id} onClick={()=>markRead(a.id)} className={`bg-white rounded-2xl border p-4 mb-2.5 transition-all cursor-pointer hover:shadow-sm ${a.read?'opacity-50 border-slate-200':`border-l-4 border-l-${sevC[a.sev]}-400 border-slate-200`}`}>
      <div className="flex gap-2.5 items-start"><div className={`w-2 h-2 rounded-full mt-1.5 flex-shrink-0 bg-${sevC[a.sev]}-500 ${!a.read?'animate-pulse':''}`}/><div className="flex-1"><div className="flex items-center gap-1.5 mb-1"><Badge color={sevC[a.sev]}>{a.tipo}</Badge><span className="text-[9px] font-mono text-slate-400">{a.code}</span>{!a.read&&<Badge color="blue">NUEVA</Badge>}<span className="text-[10px] text-slate-400 ml-auto">{a.time}</span></div><p className="text-sm text-slate-700">{a.msg}</p></div></div>
    </div>)}
    {!fil.length&&<p className="text-center text-slate-400 text-sm mt-8">Sin alertas en esta categoria</p>}
  </div>
}

function EMOPage({ toast }: EMOPageProps) {
  const emos = WORKERS.map(w=>({...w,dias: w.estadoEmo==='vencido'?-36:w.estadoEmo==='por_vencer'?56:180}))
  return <div>
    <div className="flex justify-between items-start mb-5"><div><h2 className="text-xl font-bold text-slate-800">Programacion EMO</h2><p className="text-sm text-slate-500 mt-0.5">Examenes Medicos Ocupacionales — Alertas 90/60/30</p></div><Btn variant="secondary" onClick={()=>toast('Listado Excel generado para clinica externa')}>Descargar Listado</Btn></div>
    <div className="grid grid-cols-4 gap-3 mb-5"><KPI icon="📋" value="350" label="Total programados" color="blue"/><KPI icon="🔴" value="1" label="EMO Vencido" color="red"/><KPI icon="🟡" value="2" label="Por vencer (60d)" color="orange"/><KPI icon="🟢" value="4" label="Vigentes" color="green"/></div>
    <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden">
      <table className="w-full text-sm"><thead><tr className="text-[11px] text-slate-500 bg-slate-50 border-b border-slate-100"><th className="text-left py-3 px-4 font-medium">Trabajador</th><th className="text-left py-3 px-4 font-medium">Area / Puesto</th><th className="text-left py-3 px-4 font-medium">Ultimo EMO</th><th className="text-left py-3 px-4 font-medium">Proximo EMO</th><th className="text-left py-3 px-4 font-medium">Estado</th><th className="py-3 px-4"></th></tr></thead>
      <tbody>{emos.map(e=><tr key={e.id} className="border-b border-slate-50 hover:bg-blue-50/20"><td className="py-3 px-4 font-medium text-slate-800">{e.name}</td><td className="py-3 px-4 text-xs text-slate-500">{e.area} / {e.puesto}</td><td className="py-3 px-4 text-xs text-slate-500">{e.emo}</td><td className="py-3 px-4 text-xs text-slate-500">{e.proxEmo}</td><td className="py-3 px-4"><Badge color={e.estadoEmo==='vencido'?'red':e.estadoEmo==='por_vencer'?'orange':'green'}>{e.estadoEmo==='vencido'?'VENCIDO':e.estadoEmo==='por_vencer'?'POR VENCER':'VIGENTE'}</Badge></td><td className="py-3 px-4"><Btn size="sm" variant="ghost" onClick={()=>toast(`Coordinacion EMO enviada para ${e.name}`)}>Coordinar</Btn></td></tr>)}</tbody></table>
    </div>
    <div className="grid grid-cols-2 gap-4 mt-5">
      <div className="bg-white rounded-2xl border border-slate-200 p-5"><h3 className="font-bold text-slate-800 text-sm mb-3">Protocolos EMO por Puesto</h3>
        {[{p:'Operario Linea',ex:['Audiometria','Espirometria','Hemograma','Rx Torax'],t:'Tipo 1'},{p:'Tecnico Electricista',ex:['Electrocardiograma','Hemograma','Agudeza visual'],t:'Tipo 2'},{p:'Auxiliar Almacen',ex:['Hemograma','Perfil lipidico','Rx columna'],t:'Tipo 3'}].map((p,i)=><div key={i} className="p-3 rounded-xl border border-slate-100 mb-2"><div className="flex justify-between mb-1"><span className="text-sm font-medium text-slate-800">{p.p}</span><Badge color="blue">{p.t}</Badge></div><div className="flex flex-wrap gap-1 mt-1">{p.ex.map((e,j)=><span key={j} className="text-[10px] bg-slate-100 text-slate-600 px-2 py-0.5 rounded">{e}</span>)}</div></div>)}
      </div>
      <div className="bg-gradient-to-br from-blue-600 to-blue-700 rounded-2xl p-5 text-white"><h3 className="font-bold text-sm mb-2">Coordinacion con Clinica</h3><p className="text-xs text-blue-100 mb-3">Descargue el listado actualizado de trabajadores pendientes para coordinar con la clinica externa (Nova Medic).</p><Btn variant="secondary" size="sm" onClick={()=>toast('Listado EMO descargado')}>Descargar Listado Excel</Btn></div>
    </div>
  </div>
}

function TercerosPage({ toast }: TercerosPageProps) {
  const [q, setQ] = useState<string>(''); const [modal, setModal] = useState<boolean>(false)
  const fil=q?TERCEROS.filter(t=>t.dni.includes(q)||t.n.toLowerCase().includes(q.toLowerCase())):TERCEROS
  return <div>
    <div className="flex justify-between items-start mb-5"><div><h2 className="text-xl font-bold text-slate-800">Terceros y Veto</h2><p className="text-sm text-slate-500 mt-0.5">Gestion de contratistas — RF-02, RF-03</p></div><Btn onClick={()=>setModal(true)}>+ Registrar Tercero</Btn></div>
    <Input value={q} onChange={e=>setQ(e.target.value)} placeholder="🔍  Buscar tercero por DNI o nombre..."/>
    {fil.map((t,i)=><div key={i} className={`bg-white rounded-2xl border p-4 mb-2.5 ${t.vetado?'border-l-4 border-l-red-400 border-slate-200':'border-l-4 border-l-emerald-400 border-slate-200'}`}>
      <div className="flex justify-between items-center"><div className="flex gap-3 items-center"><div className={`w-9 h-9 rounded-xl flex items-center justify-center text-xs font-bold ${t.vetado?'bg-red-50 text-red-600':'bg-teal-50 text-teal-600'}`}>{t.n.split(' ').map(x=>x[0]).join('').slice(0,2)}</div><div><span className="text-sm font-medium text-slate-800">{t.n}</span><p className="text-[11px] text-slate-400">DNI: {t.dni} — {t.emp}</p>{t.vetado&&<Badge color="red">🚫 VETADO: {t.motivo}</Badge>}</div></div>
        <div className="flex gap-2">{!t.vetado&&<Btn size="sm" variant="success" onClick={()=>toast(`Atencion registrada para ${t.n}`)}>Registrar Atencion</Btn>}{!t.vetado&&<Btn size="sm" variant="danger" onClick={()=>toast(`${t.n} agregado a Lista de Veto — RF-03`)}>Vetar</Btn>}{t.vetado&&<Btn size="sm" variant="danger" disabled>Acceso Denegado</Btn>}</div>
      </div>
    </div>)}
    <Modal open={modal} onClose={()=>setModal(false)} title="Registrar Tercero — RF-02">
      <Input label="DNI" placeholder="Ingrese DNI..." mono/><Input label="Nombre completo" placeholder="Nombre y apellidos..."/><Sel label="Empresa contratista" options={['Seleccionar...','FC Servicios','Acical SAC','FR Limpieza','Otra']}/>
      <Btn full variant="success" onClick={()=>{setModal(false);toast('Tercero registrado — Perfil temporal creado (RF-02)')}}>Registrar</Btn>
    </Modal>
  </div>
}

function ReportesPage({ toast }: ReportesPageProps) {
  return <div>
    <div className="mb-5"><h2 className="text-xl font-bold text-slate-800">Reporteria</h2><p className="text-sm text-slate-500 mt-0.5">Informes automaticos a SST, RRHH y Gerencia</p></div>
    <div className="grid grid-cols-3 gap-4">
      {[{t:'Informe Mensual',d:'Consolidado de atenciones, accidentes vs incidentes',i:'📊',dest:'SST, RRHH, Gerencia'},{t:'Altas Pendientes',d:'Lista diaria de trabajadores con altas pendientes. RF-20',i:'⏳',dest:'Supervisores'},{t:'Cobertura EMO',d:'Alertas 90/60/30, EMO vencidos y por vencer',i:'📋',dest:'RRHH, Gerencia'},{t:'Accidentes',d:'Detalle con campo conductual, SCTR, seguimiento',i:'🚨',dest:'SST, RRHH, Aseguradora'},{t:'Inventario Cardex',d:'Stock actual, consumo inusual, medicamentos por vencer',i:'💊',dest:'Medico Ocupacional'},{t:'Terceros',d:'Atenciones a contratistas, lista de vetados',i:'👥',dest:'SST, Vigilancia'}].map((r,i)=><div key={i} className="bg-white rounded-2xl border border-slate-200 p-5">
        <p className="text-2xl mb-2">{r.i}</p><h4 className="text-sm font-bold text-slate-800 mb-1">{r.t}</h4><p className="text-[11px] text-slate-500 mb-2 leading-relaxed">{r.d}</p><p className="text-[10px] text-slate-400 mb-3">→ {r.dest}</p>
        <div className="flex gap-2"><Btn size="sm" variant="ghost" onClick={()=>toast(`${r.t} generado`)}>Generar</Btn><Btn size="sm" variant="ghost" onClick={()=>toast(`Enviado a ${r.dest}`)}>Enviar ✉</Btn></div>
      </div>)}
    </div>
  </div>
}

function FormatosPage({ toast }: FormatosPageProps) {
  const [modal, setModal] = useState<{ t: string; d: string; c: string } | null>(null)
  const fmts=[{t:'Formato Incidente/Accidente',d:'Campo conductual RF-05. Diario.',c:'border-t-red-400'},{t:'Declaracion Responsabilidad',d:'Trabajador firma bajo su responsabilidad. RF-12.',c:'border-t-amber-400'},{t:'Certificado Aptitud ETA',d:'Aptitud alimentaria. Firma + huella.',c:'border-t-emerald-400'},{t:'Declaracion No Sintomas',d:'Declara no sentir dolor tras incidente.',c:'border-t-blue-400'},{t:'Compromiso Alta Medica',d:'Se compromete a presentar alta en X dias.',c:'border-t-orange-400'},{t:'Consentimiento Informado',d:'Autorizacion manejo informacion. Ley 29733.',c:'border-t-violet-400'}]
  return <div>
    <div className="mb-5"><h2 className="text-xl font-bold text-slate-800">Formatos Digitales</h2><p className="text-sm text-slate-500 mt-0.5">Auto-llenado y firma digital — RF-11, RF-12, RF-13</p></div>
    <div className="grid grid-cols-3 gap-4">{fmts.map((f,i)=><div key={i} onClick={()=>setModal(f)} className={`bg-white rounded-2xl border border-slate-200 border-t-4 ${f.c} p-5 cursor-pointer hover:shadow-md hover:-translate-y-0.5 transition-all`}><h4 className="text-sm font-bold text-slate-800 mb-1">{f.t}</h4><p className="text-[11px] text-slate-500 leading-relaxed">{f.d}</p></div>)}</div>
    <Modal open={!!modal} onClose={()=>setModal(null)} title={modal?.t ?? ''}>
      <p className="text-xs text-slate-500 mb-4">{modal?.d}</p>
      <Input label="DNI del Colaborador" placeholder="Ingrese DNI para auto-llenar datos..."/>
      <div className="p-3 bg-slate-50 rounded-xl text-[11px] text-slate-500 mb-3">Los datos se completaran automaticamente: nombre, area, puesto, fecha, hora (server-side).</div>
      <Input label="Observaciones" placeholder="Solo este campo se llena manualmente..." area/>
      <div className="flex gap-2"><Btn variant="success" onClick={()=>{setModal(null);toast(`${modal?.t} generado con firma digital`)}}>Generar con Firma</Btn><Btn variant="secondary" onClick={()=>{setModal(null);toast('Formato enviado a impresora — RF-13')}}>Imprimir para Huella</Btn></div>
    </Modal>
  </div>
}

// ═══════ MAIN APP ═══════
export default function Mockup() {
  const [logged, setLogged] = useState<boolean>(false); const [view, setView] = useState<ViewKey>('dashboard'); const [toastMsg, setToastMsg] = useState<string | null>(null); const [toastType, setToastType] = useState<ToastType>('success')
  const [alerts, setAlerts] = useState<AlertItem[]>(ALERTS_INIT); const [sidebarOpen, setSidebar] = useState<boolean>(false)
  const toast = (m: string, t: ToastType = 'success') => { setToastMsg(m); setToastType(t) }
  const markRead = (id: number) => setAlerts((a) => a.map((x) => (x.id === id ? { ...x, read: true } : x)))
  const markAllRead = () => setAlerts((a) => a.map((x) => ({ ...x, read: true })))
  const unread=alerts.filter(a=>!a.read).length

  if(!logged) return <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 via-blue-50/30 to-slate-100">
    <style>{'@keyframes slideIn{from{opacity:0;transform:translateX(20px)}to{opacity:1;transform:translateX(0)}}'}</style>
    <div className="w-[400px] p-10 bg-white rounded-2xl shadow-xl shadow-blue-500/5 border border-slate-200">
      <div className="text-center mb-8"><div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-blue-500 to-teal-500 flex items-center justify-center mx-auto mb-4 text-white text-2xl shadow-lg shadow-blue-500/20">☤</div><h1 className="text-xl font-bold text-slate-800">Nova Peru</h1><p className="text-[11px] text-slate-400 font-mono tracking-widest mt-1">SISTEMA SST MEDICO-OCUPACIONAL</p></div>
      <Input label="DNI" placeholder="Ingrese su DNI" mono/><Input label="Contrasena" placeholder="••••••••" type="password"/>
      <div className="mt-2"><Btn full onClick={()=>setLogged(true)}>Ingresar al Sistema</Btn></div>
      <p className="text-center text-[10px] text-slate-400 mt-5">Acceso restringido · Ley 29733 · Datos Protegidos</p>
    </div>
  </div>

  const menu: Array<{g: string; items: Array<{k: ViewKey; i: string; l: string; b?: string | null}>}> = [
    {g:'Principal',items:[{k:'dashboard',i:'◻',l:'Dashboard'},{k:'atencion',i:'🩺',l:'Atencion Medica'},{k:'historia',i:'📋',l:'Historia Clinica'}]},
    {g:'Seguridad',items:[{k:'accidentes',i:'🚨',l:'Accidentes',b:null},{k:'altas',i:'✅',l:'Altas Medicas',b:'3'},{k:'alertas',i:'🔔',l:'Alertas',b:String(unread)}]},
    {g:'Farmacia',items:[{k:'cardex',i:'💊',l:'Cardex Digital'}]},
    {g:'Gestion',items:[{k:'emo',i:'📅',l:'Programacion EMO',b:'1'},{k:'terceros',i:'👥',l:'Terceros / Veto'},{k:'reportes',i:'📊',l:'Reporteria'},{k:'formatos',i:'📝',l:'Formatos Digitales'}]},
  ]

  const pages={dashboard:<DashboardPage setView={setView} alerts={alerts}/>,atencion:<AtencionPage toast={toast}/>,historia:<HistoriaPage toast={toast}/>,accidentes:<AccidentesPage toast={toast}/>,cardex:<CardexPage toast={toast}/>,altas:<AltasPage toast={toast}/>,alertas:<AlertasPage alerts={alerts} markRead={markRead} markAllRead={markAllRead}/>,emo:<EMOPage toast={toast}/>,terceros:<TercerosPage toast={toast}/>,reportes:<ReportesPage toast={toast}/>,formatos:<FormatosPage toast={toast}/>}

  return <div className="flex h-screen bg-slate-100 overflow-hidden">
    <style>{'@keyframes slideIn{from{opacity:0;transform:translateX(20px)}to{opacity:1;transform:translateX(0)}}'}</style>
    <Toast msg={toastMsg} type={toastType} onClose={()=>setToastMsg(null)}/>
    {sidebarOpen&&<div className="fixed inset-0 bg-black/20 z-30 lg:hidden" onClick={()=>setSidebar(false)}/>}
    <aside className={`fixed lg:static inset-y-0 left-0 z-40 w-60 bg-white border-r border-slate-200 flex flex-col transition-transform duration-300 ${sidebarOpen?'translate-x-0':'-translate-x-full lg:translate-x-0'}`}>
      <div className="p-4 border-b border-slate-100"><div className="flex items-center gap-2.5"><div className="w-8 h-8 rounded-xl bg-gradient-to-br from-blue-500 to-teal-500 flex items-center justify-center text-white text-sm font-bold shadow-sm">☤</div><div><h1 className="text-sm font-bold text-slate-800 leading-tight">Nova Peru SST</h1><p className="text-[9px] text-slate-400 font-mono">MEDICO-OCUPACIONAL</p></div></div></div>
      <nav className="flex-1 p-2 space-y-0.5 overflow-y-auto">
        {menu.map(g=><div key={g.g}><p className="text-[9px] font-semibold text-slate-400 uppercase tracking-widest px-3 pt-4 pb-1">{g.g}</p>
          {g.items.map(m=><button key={m.k} onClick={()=>{setView(m.k);setSidebar(false)}} className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-[13px] font-medium transition-all ${view===m.k?'bg-blue-50 text-blue-700':'text-slate-600 hover:bg-slate-50'}`}>
            <span>{m.i}</span><span className="flex-1 text-left">{m.l}</span>{m.b&&+m.b>0&&<span className="bg-red-50 text-red-600 text-[9px] font-bold px-1.5 py-0.5 rounded-md font-mono">{m.b}</span>}
          </button>)}
        </div>)}
      </nav>
      <div className="p-3 border-t border-slate-100"><div className="flex items-center gap-2"><div className="w-7 h-7 rounded-lg bg-teal-50 flex items-center justify-center text-[10px] font-bold text-teal-600">DR</div><div><p className="text-[11px] font-semibold text-slate-700">Dra. Rodriguez</p><p className="text-[9px] text-slate-400">Medico Ocupacional</p></div></div></div>
    </aside>
    <div className="flex-1 flex flex-col min-w-0">
      <header className="h-12 bg-white border-b border-slate-200 flex items-center justify-between px-4 flex-shrink-0">
        <div className="flex items-center gap-2.5"><button className="lg:hidden w-8 h-8 flex items-center justify-center rounded-lg hover:bg-slate-100 text-slate-500" onClick={()=>setSidebar(true)}>☰</button><div className="w-1.5 h-1.5 rounded-full bg-emerald-500"/><span className="text-xs text-slate-500">{new Date().toLocaleDateString('es-PE',{weekday:'long',day:'numeric',month:'long',year:'numeric'})}</span></div>
        <div className="flex items-center gap-3"><button className="relative text-slate-500 hover:text-slate-700" onClick={()=>setView('alertas')}>🔔{unread>0&&<span className="absolute -top-1 -right-1 w-3.5 h-3.5 bg-red-500 rounded-full text-white text-[8px] flex items-center justify-center font-bold">{unread}</span>}</button><Badge color="teal">Planta Principal</Badge></div>
      </header>
      <main className="flex-1 overflow-y-auto p-4 lg:p-5">{pages[view]}</main>
    </div>
  </div>
}
