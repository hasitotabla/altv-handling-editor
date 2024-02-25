<!-- svelte-ignore a11y-click-events-have-key-events -->
<script lang="ts">
  import { HANDLING_PROPERTY_DESCRIPTIONS } from "./HandlingProperties";

  type HandlingValue = string | number;

  let visible = false;
  let updatedProperties: { [key: string]: boolean } = {};
  let handlingProperties: {
    [key: string]: {
      modelDefault: HandlingValue;
      value: HandlingValue;
    };
  } = {};

  let tooltipText = "";

  const saveHandling = () => {
    if (!("alt" in window)) return;

    let updateData = Array.from(Object.keys(updatedProperties)).reduce(
      (prev, curr) => ({
        [curr]: handlingProperties[curr].value,
      }),
      {}
    );
    alt.emit("handling:update", updateData);
    updatedProperties = {};
  };

  // TODO: implement a way to copy the handling to be actually useful
  // for ex. generate the handling.meta or some custom loading thing
  // const copyToClipboard = () => {
  //   const savedData = {};

  //   for (const [key, value] of Object.entries(handlingProperties)) {
  //     savedData[key] = value.value;
  //   }

  //   navigator.clipboard.writeText(JSON.stringify(savedData));
  // };

  const resetToDefault = () => {
    if (!("alt" in window)) return;

    Object.keys(handlingProperties).forEach((key) => {
      handlingProperties[key].value = handlingProperties[key].modelDefault;
    });

    updatedProperties = {};
    alt.emit("handling:reset");
  };

  const setTooltipText = (key: string) => {
    if (key && key in HANDLING_PROPERTY_DESCRIPTIONS)
      tooltipText = HANDLING_PROPERTY_DESCRIPTIONS[key];
    else tooltipText = "";
  };

  const fieldUpdate = (key: string) => {
    updatedProperties[key] = true;
  };

  if ("alt" in window) {
    alt.on("handling:open", (data) => {
      handlingProperties = data;
      updatedProperties = {};
    });

    alt.on("handling:setVisibility", (state) => {
      visible = state;
    });
  }
</script>

<div class={`container ${visible ? "" : "hide"}`}>
  <h1 class="header">Handling Editor</h1>

  <div class="items">
    {#each Object.entries(handlingProperties) as [key, value]}
      <div class="item">
        <!-- svelte-ignore a11y-mouse-events-have-key-events -->
        <p
          class="item-name"
          on:mouseover={() => setTooltipText(key)}
          on:mouseleave={() => setTooltipText(null)}
        >
          {key}
        </p>

        <input
          type="text"
          on:change={() => fieldUpdate(key)}
          bind:value={handlingProperties[key].value}
        />
      </div>
    {/each}
  </div>

  <div class="footer">
    <p class="author">
      Made by
      <span
        class="author-name"
        on:click={() => window.open("https://github.com/szkiddaj")}
        >@szkiddaj</span
      > with ✨ and 👺
    </p>

    <div class="controls">
      <button on:click={resetToDefault}>Reset</button>
      <button on:click={saveHandling}>Save</button>
    </div>

    {#if typeof tooltipText === "string" && tooltipText !== ""}
      <div class="tooltip-text">{@html tooltipText}</div>
    {/if}
  </div>
</div>

<style lang="scss">
  $scrollbar-width: 8px;
  $scrollbar-color: #333;
  $track-color: #222;
  $hover-color: #555;
  $window-radius: 8pt;

  $input-width: 150px;
  $total-width: 300px + $input-width;

  $from-color: #81f6aa;
  $to-color: #6dc2fb;

  @keyframes gradientText {
    0% {
      background-position: 0% 50%;
    }

    100% {
      background-position: 100% 50%;
    }
  }

  .hide {
    display: none;
  }

  .container {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);

    width: $total-width;

    h1.header {
      padding: 8pt 8pt;
      transform: translateY(1px);

      font-family: "Inter", sans-serif;
      font-size: 18px;
      font-weight: 400;

      text-align: center;

      border-radius: $window-radius $window-radius 0pt 0pt;

      background: rgb(14, 14, 14);
      color: rgb(200, 200, 200);
    }

    .items {
      height: 450px;

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

      .item {
        display: flex;
        justify-content: space-between;
        align-items: center;

        .item-name {
          position: relative;
          display: inline-block;

          font-family: "Inter", sans-serif;
          font-size: 14px;
          font-weight: 400;
        }

        input {
          width: $input-width;
          padding: 6pt 8pt;

          border-radius: 6pt;
          border: 2px solid rgb(32, 32, 32);

          font-family: "Inter", sans-serif;
          font-size: 12px;
          font-weight: 400;

          color: rgb(200, 200, 200);
          background: rgb(14, 14, 14);
          transition:
            100ms border ease-in-out,
            100ms background ease-in-out,
            100ms color ease-in-out;

          &:active,
          &:focus {
            outline: none;
          }

          &:hover {
            cursor: text;

            border: 2px solid rgb(64, 64, 64);
            color: rgb(220, 220, 220);
            background: rgb(24, 24, 24);
          }
        }

        &:not(:last-child) {
          margin-bottom: 8pt;
          border-bottom: 1px solid rgb(32, 32, 32);
          padding-bottom: 8pt;
        }
      }
    }

    .footer {
      display: flex;
      justify-content: space-between;
      align-items: center;

      box-sizing: border-box;
      padding: 8pt;

      border-radius: 0pt 0pt $window-radius $window-radius;

      background: rgb(14, 14, 14);
      color: rgb(200, 200, 200);

      .author {
        font-family: "Inter", sans-serif;
        font-size: 11px;
        font-weight: 400;

        opacity: 0.65;
        color: rgb(200, 200, 200);

        .author-name {
          font-weight: 600;

          background: linear-gradient(to right, $from-color, $to-color);
          background-clip: text;
          -webkit-background-clip: text;

          color: transparent;
          animation: gradientText 3s linear infinite;

          &:hover {
            cursor: pointer;
          }
        }
      }

      .controls {
        button {
          bottom: 0;
          right: 0;

          padding: 6pt 12pt;

          border-radius: 6pt;
          border: 2px solid rgb(32, 32, 32);

          font-family: "Inter", sans-serif;
          font-size: 12px;
          font-weight: bold;

          color: rgb(200, 200, 200);
          background: rgb(24, 24, 24);
          transition:
            100ms border ease-in-out,
            100ms background ease-in-out,
            100ms color ease-in-out;

          &:hover {
            cursor: pointer;

            border: 2px solid rgb(64, 64, 64);
            color: rgb(220, 220, 220);
            background: rgb(48, 48, 48);
          }

          &:not(:last-child) {
            margin-right: 4pt;
          }
        }
      }
    }

    .tooltip-text {
      position: absolute;
      bottom: 0;
      left: 50%;
      transform: translate(-50%, calc(100% + 10px));

      width: calc(#{$total-width} - 16pt);
      padding: 4pt 8pt;

      border-radius: 6pt;
      border: 2px solid rgb(32, 32, 32);

      font-family: "Inter", sans-serif;
      font-size: 12px;
      font-weight: 400;

      color: rgb(200, 200, 200);
      background: rgb(14, 14, 14);
      transition:
        100ms border ease-in-out,
        100ms background ease-in-out,
        100ms color ease-in-out;

      cursor: help;

      &:hover {
        border: 2px solid rgb(64, 64, 64);
        color: rgb(220, 220, 220);
        background: rgb(24, 24, 24);
      }
    }
  }
</style>
