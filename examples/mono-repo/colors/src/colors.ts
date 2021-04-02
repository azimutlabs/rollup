export enum Colors {
  Accent = '#0E4DEC',
  Danger = '#FF4F24',
  Warning = '#F9BA00',
}

export type PropsWithColor<C extends Colors = Colors> = {
  readonly color: C;
};

export type ColorsRecord<V, C extends Colors = Colors> = Record<C, V>;
