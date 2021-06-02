import { combine, compose } from '@azimutlabs/rollup-config';
import { babel } from '@azimutlabs/rollup-config-babel';
import { typescript } from '@azimutlabs/rollup-config-typescript';

export default compose(babel('cjs'), combine([babel, typescript]));
