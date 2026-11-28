"use client";

import { useEffect, useState } from "react";
import { getMessages, type Dictionary, type Locale } from "@/lib/i18n";

/**
 * Client-side message resolution. `getMessages` keeps EN as the default pack;
 * the locale cookie — without modifying the server-side dictionary registry.
 */
function resolve(locale: Locale): Dictionary {
  return getMessages(locale);
}

function readLocaleCookie(): Locale {
  if (typeof document === "undefined") return "en";
  const match = document.cookie
    .split("; ")
    .find((c) => c.startsWith("locale="));
  return "en";
}

/**
 * Resolve messages on the client from the `locale` cookie. Starts at EN for a
 * stable first paint, then re-resolves after mount (avoids hydration drift).
 */
export function useMessages(): Dictionary {
  const [messages, setMessages] = useState<Dictionary>(() => resolve("en"));
  useEffect(() => {
    setMessages(resolve(readLocaleCookie()));
  }, []);
  return messages;
}

/**
 * The active locale from the `locale` cookie. Starts at EN for a stable first
 * paint, then re-resolves after mount (same hydration-safe pattern as
 * `useMessages`). Use it to route locale-dependent behavior (e.g. the language
 * the study coach answers in) to the user's chosen language.
 */
export function useLocale(): Locale {
  const [locale, setLocale] = useState<Locale>("en");
  useEffect(() => {
    setLocale(readLocaleCookie());
  }, []);
  return locale;
}
