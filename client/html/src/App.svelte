<script lang="ts">
  type HandlingValue = string | number;

  let visible = false;
  let updatedProperties: { [key: string]: boolean } = {};
  let handlingProperties: {
    [key: string]: {
      modelDefault: HandlingValue;
      value: HandlingValue;
    };
  } = {
    acceleration: { modelDefault: 0, value: 0 },
    antiRollBarBiasFront: { modelDefault: 0, value: 0 },
    antiRollBarBiasRear: { modelDefault: 0, value: 0 },
    antiRollBarForce: { modelDefault: 0, value: 0 },
    brakeBiasFront: { modelDefault: 0, value: 0 },
    brakeBiasRear: { modelDefault: 0, value: 0 },
    brakeForce: { modelDefault: 0, value: 0 },
    camberStiffnesss: { modelDefault: 0, value: 0 },
    centreOfMassOffset: { modelDefault: 0, value: 0 },
    clutchChangeRateScaleDownShift: { modelDefault: 0, value: 0 },
    clutchChangeRateScaleUpShift: { modelDefault: 0, value: 0 },
    collisionDamageMult: { modelDefault: 0, value: 0 },
    damageFlags: { modelDefault: 0, value: 0 },
    deformationDamageMult: { modelDefault: 0, value: 0 },
    downforceModifier: { modelDefault: 0, value: 0 },
    driveBiasFront: { modelDefault: 0, value: 0 },
    driveInertia: { modelDefault: 0, value: 0 },
    driveMaxFlatVel: { modelDefault: 0, value: 0 },
    engineDamageMult: { modelDefault: 0, value: 0 },
    handBrakeForce: { modelDefault: 0, value: 0 },
    handlingFlags: { modelDefault: 0, value: 0 },
    inertiaMultiplier: { modelDefault: 0, value: 0 },
    initialDragCoeff: { modelDefault: 0, value: 0 },
    initialDriveForce: { modelDefault: 0, value: 0 },
    initialDriveGears: { modelDefault: 0, value: 0 },
    initialDriveMaxFlatVel: { modelDefault: 0, value: 0 },
    lowSpeedTractionLossMult: { modelDefault: 0, value: 0 },
    mass: { modelDefault: 0, value: 0 },
    modelFlags: { modelDefault: 0, value: 0 },
    monetaryValue: { modelDefault: 0, value: 0 },
    oilVolume: { modelDefault: 0, value: 0 },
    percentSubmerged: { modelDefault: 0, value: 0 },
    percentSubmergedRatio: { modelDefault: 0, value: 0 },
    petrolTankVolume: { modelDefault: 0, value: 0 },
    rollCentreHeightFront: { modelDefault: 0, value: 0 },
    rollCentreHeightRear: { modelDefault: 0, value: 0 },
    seatOffsetDistX: { modelDefault: 0, value: 0 },
    seatOffsetDistY: { modelDefault: 0, value: 0 },
    seatOffsetDistZ: { modelDefault: 0, value: 0 },
    steeringLock: { modelDefault: 0, value: 0 },
    steeringLockRatio: { modelDefault: 0, value: 0 },
    suspensionBiasFront: { modelDefault: 0, value: 0 },
    suspensionBiasRear: { modelDefault: 0, value: 0 },
    suspensionCompDamp: { modelDefault: 0, value: 0 },
    suspensionForce: { modelDefault: 0, value: 0 },
    suspensionLowerLimit: { modelDefault: 0, value: 0 },
    suspensionRaise: { modelDefault: 0, value: 0 },
    suspensionReboundDamp: { modelDefault: 0, value: 0 },
    suspensionUpperLimit: { modelDefault: 0, value: 0 },
    tractionBiasFront: { modelDefault: 0, value: 0 },
    tractionBiasRear: { modelDefault: 0, value: 0 },
    tractionCurveLateral: { modelDefault: 0, value: 0 },
    tractionCurveLateralRatio: { modelDefault: 0, value: 0 },
    tractionCurveMax: { modelDefault: 0, value: 0 },
    tractionCurveMaxRatio: { modelDefault: 0, value: 0 },
    tractionCurveMin: { modelDefault: 0, value: 0 },
    tractionCurveMinRatio: { modelDefault: 0, value: 0 },
    tractionLossMult: { modelDefault: 0, value: 0 },
    tractionSpringDeltaMax: { modelDefault: 0, value: 0 },
    tractionSpringDeltaMaxRatio: { modelDefault: 0, value: 0 },
    weaponDamageMult: { modelDefault: 0, value: 0 },
  };

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

  const copyToClipboard = () => {
    const savedData = {};

    for (const [key, value] of Object.entries(handlingProperties)) {
      savedData[key] = value.value;
    }

    navigator.clipboard.writeText(JSON.stringify(savedData));
  };

  const resetToDefault = () => {
    if (!("alt" in window)) return;

    Object.keys(handlingProperties).forEach((key) => {
      handlingProperties[key].value = handlingProperties[key].modelDefault;
    });

    updatedProperties = {};
    alt.emit("handling:reset");
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
      console.log("state update", state);
      visible = state;
    });
  }
</script>

<div class={`container ${visible ? "" : "hide"}`}>
  <h1 class="header">Handling Editor</h1>

  <div class="items">
    {#each Object.entries(handlingProperties) as [key, value]}
      <div class="item">
        <label for={key}>{key}</label>

        <input
          type="text"
          id={key}
          on:change={() => fieldUpdate(key)}
          bind:value={handlingProperties[key].value}
        />
      </div>
    {/each}
  </div>

  <div class="controls">
    <button on:click={resetToDefault}>Reset</button>
    <button on:click={copyToClipboard}>Copy</button>
    <button on:click={saveHandling}>Save</button>
  </div>
</div>

<style lang="scss">
  $scrollbar-width: 4px;
  $scrollbar-color: #333;
  $track-color: #222;
  $hover-color: #555;
  $window-radius: 8pt;

  .hide {
    display: none;
  }

  .container {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);

    width: 450px;

    h1.header {
      padding: 8pt 8pt;

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

        label {
          font-family: "Inter", sans-serif;
          font-size: 14px;
          font-weight: 400;
        }

        input {
          width: 100px;
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

    .controls {
      display: flex;
      justify-content: end;
      align-items: center;

      box-sizing: border-box;
      padding: 8pt;

      border-radius: 0pt 0pt $window-radius $window-radius;

      background: rgb(14, 14, 14);
      color: rgb(200, 200, 200);

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
          margin-right: 8pt;
        }
      }
    }
  }
</style>
