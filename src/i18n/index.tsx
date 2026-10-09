"use client";
import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from "react";
import { en } from "./en"; import { rw } from "./rw"; import { fr } from "./fr"; import { locales, type Locale } from "./types";
export const dictionaries = { en, rw, fr };
for (const [locale, dictionary] of Object.entries(dictionaries)) {
  if (Object.values(dictionary).some(value => !value.trim())) throw new Error(`Invalid translation dictionary: ${locale}`);
}
const Context = createContext<{locale:Locale; setLocale:(locale:Locale)=>void; t:(key:string)=>string}>({locale:"en",setLocale:()=>{},t:key=>key});
export function I18nProvider({children}:{children:ReactNode}) { const [locale,setLocaleState]=useState<Locale>("en"); useEffect(()=>{try{const value=localStorage.getItem("erneste-locale");if(locales.includes(value as Locale))setLocaleState(value as Locale)}catch{}},[]); useEffect(()=>{document.documentElement.lang=locale;try{localStorage.setItem("erneste-locale",locale)}catch{}},[locale]); const value=useMemo(()=>({locale,setLocale:(next:Locale)=>setLocaleState(next),t:(key:string)=>dictionaries[locale][key as keyof typeof en] ?? key}),[locale]); return <Context.Provider value={value}>{children}</Context.Provider>; }
export function useI18n(){return useContext(Context);}