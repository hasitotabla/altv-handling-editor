<!-- svelte-ignore a11y-click-events-have-key-events -->
<script lang="ts">
  import { XMLBuilder, XMLParser } from "fast-xml-parser";
  import { exportStore } from "./store/Export";
  import type {
    HandlingValueTypes,
    InternalHandlingValue,
    Vector3,
  } from "./types/Handling";
  import Header from "./components/Header.svelte";
  import Footer from "./components/Footer.svelte";

  let inputValue: string = "";
  exportStore.subscribe((value) => (inputValue = value));

  let didExportRecently = false;

  export let toggleExportWindow: (newState: boolean) => void;
  export let updatedProperties: { [key: string]: boolean } = {};
  export let handlingProperties: {
    [key: string]: InternalHandlingValue;
  } = {};

  const xmlParser = new XMLParser({
    ignoreAttributes: false,
  });

  const xmlBuilder = new XMLBuilder({
    ignoreAttributes: false,
    suppressEmptyNode: true,
    format: true,
  });

  const lowercaseFirstCharacter = (str: string) =>
    str.charAt(0).toLowerCase() + str.slice(1);

  const formatFloat = (num: number) => num.toFixed(6).toString();

  const castValue = (
    prefix: HandlingValueTypes,
    { value }: InternalHandlingValue
  ) => {
    if (prefix === "f") return { "@_value": formatFloat(value as number) };

    if (prefix === "vec")
      return {
        "@_x": formatFloat((value as Vector3).x),
        "@_y": formatFloat((value as Vector3).y),
        "@_z": formatFloat((value as Vector3).z),
      };

    return value;
  };

  const replaceModifiedValues = () => {
    const parsed = xmlParser.parse(inputValue);

    const list = parsed?.Item;
    if (!list) return;

    for (const [key] of Object.entries(list)) {
      const convertedKey = lowercaseFirstCharacter(
        key.replace(/^(f|vec)(.*)/, "$2")
      );

      if (
        !convertedKey ||
        !handlingProperties[convertedKey] ||
        !updatedProperties[convertedKey]
      )
        continue;

      const handlingType = key.match(/^(f|vec)/)?.[1] as HandlingValueTypes;
      const newCastedValue = castValue(
        handlingType,
        handlingProperties[convertedKey]
      );

      list[key] = newCastedValue;
    }

    const output = xmlBuilder.build(parsed);

    return output;
  };

  const exportToClipboard = () => {
    if (didExportRecently) return;

    const preparedData = replaceModifiedValues();
    if (!preparedData) return;

    alt.emit("handling:copyText", preparedData);

    didExportRecently = true;
    setTimeout(() => (didExportRecently = false), 3000);
  };
</script>

<div class="container">
  <Header text="Export" />

  <div class="body">
    <p class="disclaimer">
      Paste the vehicle's current handling data that is in the handling.meta
      file.
    </p>

    <textarea class="base-input" bind:value={$exportStore} />
  </div>

  <Footer
    buttons={[
      {
        text: "Close",
        onClick: () => toggleExportWindow(false),
      },
      {
        text: didExportRecently ? "Copied to clipboard" : "Export to clipboard",
        onClick: exportToClipboard,
        status: didExportRecently ? "true" : "",
      },
    ]}
  />
</div>

<style lang="scss">
  $scrollbar-width: 8px;
  $scrollbar-color: #333;
  $track-color: #222;
  $hover-color: #555;
  $window-radius: 8pt;

  $total-width: 550px;

  $from-color: #81f6aa;
  $to-color: #6dc2fb;

  .container {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);

    width: $total-width;

    .body {
      height: fit-content;

      padding: 12pt 8pt;
      box-sizing: border-box;

      background: rgb(24, 24, 24);
      color: rgb(200, 200, 200);

      overflow-y: auto;

      scroll-behavior: smooth;
      scrollbar-width: thin;
      scrollbar-color: $scrollbar-color $track-color;

      &::-webkit-scrollbar {
        width: $scrollbar-width;
      }

      &::-webkit-scrollbar-thumb {
        background-color: $scrollbar-color;
        border: 2px solid $track-color;
        &:hover {
          background-color: $hover-color;
        }
      }

      &::-webkit-scrollbar-track {
        background-color: $track-color;
      }

      p.disclaimer {
        font-family: "Inter", sans-serif;
        font-size: 12px;
        font-weight: 400;

        margin-bottom: 8pt;

        opacity: 0.65;
        color: rgb(200, 200, 200);
      }

      textarea {
        width: calc(100% - 8pt);
        height: 450px;

        padding: 4pt;
        margin: 0;

        box-sizing: content-box;

        border: none;
        border-radius: 4pt;

        font-family: "Inter", sans-serif;
        font-size: 14px;
        font-weight: 400;

        background: rgb(32, 32, 32);
        color: rgb(200, 200, 200);

        resize: none;
        overflow-y: visible;

        &::-webkit-scrollbar {
          display: none;
        }

        &:focus,
        &:active {
          outline: none;
        }
      }
    }
  }
</style>
