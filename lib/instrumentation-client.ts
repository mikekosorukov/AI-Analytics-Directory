"use client";
import posthog from "posthog-js";

let initialized = false;

export function initPostHog() {
  if (typeof window === "undefined" || initialized) return;
  const key = process.env.NEXT_PUBLIC_POSTHOG_KEY;
  const host =
    process.env.NEXT_PUBLIC_POSTHOG_HOST || "https://app.posthog.com";
  if (!key) return;

  posthog.init(key, {
    api_host: host,

    autocapture: true,

    capture_pageview: true,
    capture_pageleave: true,

    session_recording: {
      maskAllInputs: false,
    },

    persistence: "localStorage+cookie",

    loaded: () => {
      try {
        posthog.startSessionRecording?.();
      } catch {}

      scheduleOneMinuteTrigger();
    },
  });

  initialized = true;
}

function scheduleOneMinuteTrigger() {
  const START_KEY = "ph_session_start_ts";
  const FIRED_KEY = "ph_one_minute_fired";

  const now = Date.now();
  const existingStart = sessionStorage.getItem(START_KEY);
  const startTs = existingStart ? parseInt(existingStart, 10) : now;
  if (!existingStart) sessionStorage.setItem(START_KEY, String(startTs));

  if (sessionStorage.getItem(FIRED_KEY) === "1") return;

  const elapsed = now - startTs;
  const remaining = Math.max(0, 60_000 - elapsed);

  window.setTimeout(() => {
    if (sessionStorage.getItem(FIRED_KEY) === "1") return;

    posthog.capture("one_minute_after_session_start", {
      session_id: (posthog as any).get_session_id?.(),
      started_at: new Date(startTs).toISOString(),
    });

    sessionStorage.setItem(FIRED_KEY, "1");
  }, remaining);
}
