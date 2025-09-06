import { draw_spring, spawn_spring, collisions_spring } from "./entities/spring.js";
import { draw_zapper, spawn_zapper, collisions_zapper } from "./entities/zapper.js";

// Entities by Zone
export const NORMAL_ENTITIES = []
export const SKY_ENTITIES = []
export const SPACE_ENTITIES = []
export const ALL_TERRAIN_ENTITIES = ['zapper', 'spring']

export const EntityAttrs = {
  zapper: {
    spawner: spawn_zapper,
    spawn_chance: 15,

    drawer: draw_zapper,
    collision_handler: collisions_zapper
  },
  spring: {
    spawner: spawn_spring,
    spawn_chance: 2,

    drawer: draw_spring,
    collision_handler: collisions_spring
  }
}

