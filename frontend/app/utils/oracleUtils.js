import { Oracle } from '@chopinframework/core';

export async function getOracleTimestamp(callbackUrl) {
  const oracle = new Oracle(callbackUrl);
  return oracle.notarize(() => Date.now());
}

export async function getOracleRandom(callbackUrl) {
  const oracle = new Oracle(callbackUrl);
  return oracle.notarize(() => Math.random());
}

export async function oracleFetch(callbackUrl, ...args) {
  const oracle = new Oracle(callbackUrl);
  return oracle.notarize(() => fetch(...args));
}