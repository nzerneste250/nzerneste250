"use client";
import { useI18n } from "@/i18n";
import { locales, type Locale } from "@/i18n/types";
const labels: Record<Locale,string> = { en:"English", rw:"Kinyarwanda", fr:"Français" };
export function LanguageSelector(){ const {locale,setLocale,t}=useI18n(); return <div className="language-selector" role="group" aria-label={t("Language")}>{locales.map(item=><button key={item} type="button" className={item===locale?"is-selected":""} aria-pressed={item===locale} aria-label={labels[item]} onClick={()=>setLocale(item)}>{item.toUpperCase()}</button>)}</div>; }