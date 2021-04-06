const { combine } = require('@azimutlabs/rollup-config');
const { babel } = require('@azimutlabs/rollup-config-babel');
const { typescript } = require('@azimutlabs/rollup-config-typescript');

module.exports = combine(babel(), typescript())(__dirname);
