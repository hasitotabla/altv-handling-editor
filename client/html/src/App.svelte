<!-- svelte-ignore a11y-click-events-have-key-events -->
<script lang="ts">
  import ExportWindow from "./Export.svelte";
  import { HANDLING_PROPERTY_DESCRIPTIONS } from "./HandlingProperties";
  import type { InternalHandlingValue } from "./types/Handling";
  import Footer from "./components/Footer.svelte";
  import Header from "./components/Header.svelte";

  let visible = true;
  let isExportWindowOpen = false;
  let updatedProperties: { [key: string]: boolean } = {};
  let handlingProperties: {
    [key: string]: InternalHandlingValue;
  } = {};

  let tooltipText = "";

  const saveHandling = () => {
    if (!("alt" in window)) return;

    let updateData = Array.from(Object.keys(updatedProperties)).reduce(
      (prev, curr) => ({
        ...prev,
        [curr]: handlingProperties[curr].value,
      }),
      {}
    );
    alt.emit("handling:update", updateData);
  };

  // TODO: implement a way to copy the handling to be actually useful
  // for ex. generate the handling.meta or some custom loading thing
  const toggleExportWindow = (newState: boolean) => {
    isExportWindowOpen = newState;
  };

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
    });

    alt.on("handling:setVisibility", (state) => {
      visible = state;
    });
  }
</script>

{#if visible && !isExportWindowOpen}
  <div class={`container`}>
    <Header text="Handling Editor" />

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

          <div class="input-fields">
            {#if typeof value.modelDefault === "object"}
              {#each Object.entries(value.value) as [subKey, subValue]}
                <div class="field-group">
                  <label for={subKey}>{subKey}</label>
                  <input
                    type="text"
                    value={subValue}
                    on:input={(ev) => {
                      fieldUpdate(key);
                      handlingProperties[key].value[subKey] = parseFloat(
                        // @ts-ignore
                        ev.target.value
                      );
                    }}
                  />
                </div>
              {/each}
            {:else}
              <input
                type="text"
                on:change={() => fieldUpdate(key)}
                bind:value={handlingProperties[key].value}
              />
            {/if}
          </div>
        </div>
      {/each}
    </div>

    <Footer
      {tooltipText}
      buttons={[
        { text: "Reset", onClick: resetToDefault },
        { text: "Export", onClick: () => toggleExportWindow(true) },
        { text: "Save", onClick: saveHandling },
      ]}
    />
  </div>
{/if}

{#if visible && isExportWindowOpen}
  <ExportWindow {updatedProperties} {handlingProperties} {toggleExportWindow} />
{/if}

<style lang="scss">
  $scrollbar-width: 8px;
  $scrollbar-color: #333;
  $track-color: #222;
  $hover-color: #555;

  $input-width: 200px;
  $total-width: 300px + $input-width;

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

          font-size: 14px;
          font-weight: 400;
        }

        .input-fields {
          width: min-content;

          .field-group {
            display: flex;
            align-items: center;
            justify-content: end;

            label {
              margin-right: 4pt;
            }
          }

          input {
            width: $input-width;
            padding: 6pt 8pt;

            border-radius: 6pt;
            border: 2px solid rgb(32, 32, 32);

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

            &:not(:last-child) {
              margin-bottom: 4pt;
            }
          }
        }

        &:not(:last-child) {
          margin-bottom: 8pt;
          border-bottom: 1px solid rgb(32, 32, 32);
          padding-bottom: 8pt;
        }
      }
    }
  }
</style>
