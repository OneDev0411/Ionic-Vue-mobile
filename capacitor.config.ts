import { CapacitorConfig } from "@capacitor/cli";

const config: CapacitorConfig = {
  appId: "com.idreamers.system",
  appName: "iDreamers",
  webDir: "dist",
  bundledWebRuntime: false,
  server: {
    hostname: "local.system-idreamers.com",
    androidScheme: "https",
  },
  plugins: {
    SplashScreen: {
      launchShowDuration: 10000,
      launchAutoHide: false,
    },
  },
};

export default config;
