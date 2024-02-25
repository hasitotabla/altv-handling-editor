import * as alt from "alt-server";

alt.onClient("handling:sync", (player, data) => {
  const vehicle = player.vehicle;
  if (!vehicle) return;

  alt.emitAllClients("handling:sync", vehicle.id, data);
});

alt.onClient("handling:reset", (player) => {
  const vehicle = player.vehicle;
  if (!vehicle) return;

  alt.emitAllClients("handling:reset", vehicle.id);
});
