import type { Colors, PropsWithColor } from '@azimutlabs/rollup-example-mono-repo.colors';
import type { PropsWithSize } from 'types/PropsWithSize';

export type InputProps = PropsWithColor<Colors.Accent | Colors.Danger> & PropsWithSize;
