import { act } from '@testing-library/react';

const resolveMockState = async () =>
	await act(async () => await new Promise(resolve => setTimeout(resolve, 0)));

export { resolveMockState };
