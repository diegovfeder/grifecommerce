import { useEffect, useState } from 'react';
interface EventProps {
	target: {
		files?: any;
		value?: any;
		name?: any;
		type?: any;
	};
}

const useForm = <T>(initial: T) => {
	const [inputs, setInputs] = useState(initial);
	const initialValues = Object.values(initial).join('');

	useEffect(() => {
		setInputs(initial);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [initialValues]);

	const handleChange = (e: EventProps) => {
		let { value, name, type } = e.target;
		if (type === 'number') {
			value = parseInt(value);
		}
		if (type === 'file') {
			[value] = e.target.files;
		}
		setInputs({
			...inputs,
			[name]: value,
		});
	};

	const resetForm = () => {
		setInputs(initial);
	};

	const clearForm = () => {
		const blankState = Object.fromEntries(
			Object.entries(inputs).map(([key, _]) => [key, '']),
		);

		// FIXME: Find out how to clear inputs with Typescript?
		// -- blankState isn't properly typed
		setInputs(blankState);
	};

	return {
		inputs,
		handleChange,
		resetForm,
		clearForm,
	};
};

export default useForm;
