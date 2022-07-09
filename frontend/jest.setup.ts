import '@testing-library/jest-dom';
import { configure } from '@testing-library/react';
import type { Config } from '@jest/types';

configure({
	testIdAttribute: 'data-test-id',
});

const config: Config.InitialOptions = {
	verbose: true,
};

export default config;
