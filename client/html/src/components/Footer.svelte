<script lang="ts">
  export let tooltipText: string | undefined = "";
  export let buttons: Array<{
    text: string;
    onClick: () => void;
    status?: string;
  }> = [];
</script>

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
    {#each buttons as { text, onClick, status }, i}
      <button on:click={onClick} data-status={status}>{text}</button>
    {/each}
    <!-- <button on:click={resetToDefault}>Reset</button>
    <button on:click={() => toggleExportWindow(true)}>Export</button>
    <button on:click={saveHandling}>Save</button> -->
  </div>

  {#if typeof tooltipText === "string" && tooltipText !== ""}
    <div class="tooltip-text">{@html tooltipText}</div>
  {/if}
</div>

<style lang="scss">
  $window-radius: 8pt;
  $input-width: 200px;
  $total-width: 300px + $input-width;

  $from-color: #81f6aa;
  $to-color: #6dc2fb;

  .footer {
    transform: translateY(-1px);

    display: flex;
    justify-content: space-between;
    align-items: center;

    box-sizing: border-box;
    padding: 8pt;

    border-radius: 0pt 0pt $window-radius $window-radius;

    background: rgb(14, 14, 14);
    color: rgb(200, 200, 200);

    .author {
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

        &[data-status="true"] {
          cursor: pointer;
          border: 2px solid rgb(64, 64, 64);
          color: rgb(32, 32, 32);
          background: rgb(69, 255, 122);
        }

        &:hover:not([data-status="true"]) {
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
</style>
