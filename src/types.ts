export interface Hero {
  name: string;
  heroid: string;
  key: string;
}

export interface HeroApiResponse {
  status: boolean;
  data: Hero[];
}

export interface HeroDetails {
  cover_picture: string;
  gallery_picture: string;
  junling: string;
  cost: string;
  des: string;
  mag: string;
  phy: string;
  alive: string;
  diff: string;
  name: string;
  type: string;
  skill: HeroDetailsSkill;
  gear: Gear;
  counters: Counters;
}

export interface Counters {
  best: Best;
  counters: Best;
  countered: Best;
}

export interface Best {
  heroid: string;
  best_mate_tips?: string;
  name: string;
  icon: string;
  by_restrain_tips?: string;
  restrain_hero_tips?: string;
}

export interface Gear {
  out_pack: OutPack[];
  out_pack_tips: string;
  verysix: any[];
}

export interface OutPack {
  equipment_id: number;
  equip: Equip;
}

export interface Equip {
  icon: string;
  name: string;
  des: string[];
}

export interface HeroDetailsSkill {
  skill: SkillElement[];
  item: Item;
}

export interface Item {
  main: BattleFirst;
  secondary: BattleFirst;
  battle_first: BattleFirst;
  battle_second: BattleFirst;
  tips: string;
}

export interface BattleFirst {
  icon: string;
}

export interface SkillElement {
  name: string;
  icon: string;
  des: string;
  tips: string;
}
