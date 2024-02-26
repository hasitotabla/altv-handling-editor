import App from "./App.svelte";

if (!("alt" in globalThis)) {
  // @ts-ignore shut
  globalThis.alt = {
    emit: (eventName: string, ...args: any[]) => {
      console.log(`Event: ${eventName}`, args);
    },
    on: (eventName: string, listener: (...args: any[]) => void) => {
      console.log(`Registered event: ${eventName}`);
    },
  };
}

const app = new App({
  target: document.body,
});

export default app;
