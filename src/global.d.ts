import Keplr from './lib/keplr'

export {};

declare global {
  interface Window { Keplr: Keplr; }
}