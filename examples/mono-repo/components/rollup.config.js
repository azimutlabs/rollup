import { combine } from '@azimutlabs/rollup-config';
import { babel } from '@azimutlabs/rollup-config-babel';
import { typescript } from '@azimutlabs/rollup-config-typescript';

export default combine(babel(), typescript())(__dirname);
