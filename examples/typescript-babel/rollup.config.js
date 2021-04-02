import { compose } from '@azimutlabs/rollup-config';
import { babel } from '@azimutlabs/rollup-config-babel';
import { typescriptBabel } from '@azimutlabs/rollup-config-typescript';

export default compose(__dirname, babel('cjs'), typescriptBabel('es'));
