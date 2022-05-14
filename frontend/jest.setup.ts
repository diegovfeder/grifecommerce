import '@testing-library/jest-dom';

import { configure } from '@testing-library/react';
configure({ testIdAttribute: 'data-test-id' });

import type { Config } from '@jest/types';

// window.alert = console.log;
const config: Config.InitialOptions = {
	verbose: true,
};

export default config;
