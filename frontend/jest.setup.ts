import '@testing-library/jest-dom';
import type { Config } from '@jest/types';

window.alert = console.log;

const config: Config.InitialOptions = {
	verbose: true,
};

export default config;
