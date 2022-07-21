import '@testing-library/jest-dom';
import { configure } from '@testing-library/react';
import type { Config } from '@jest/types';

jest.mock('next/image', () => ({
	__esModule: true,
	default: () => {
		return 'next/image stub';
	},
}));

configure({
	testIdAttribute: 'data-test-id',
});

const config: Config.InitialOptions = {
	verbose: true,
};

export default config;
