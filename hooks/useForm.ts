import { useEffect, useState } from 'react';

// TODO: Can I group this interface with commonTypes IEvent?
interface IEvent {
	target: {
		files?: any;
		value?: any;
		name?: any;
		type?: any;
	};
}

// FIXME: What happens when I need another page to use this hook?
// Is there a way to define types Dynamically?
// I think there is by passing the interface as props ..?
// maybe use GENERICS?
interface IFormInput {
	name: string;
	description: string;
	price: number | undefined;
	image?: any;
}

const useForm = (initial: IFormInput) => {
	const [inputs, setInputs] = useState(initial);
	const initialValues = Object.values(initial).join('');

	useEffect(() => {
		setInputs(initial);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [initialValues]);

	const handleChange = (e: IEvent) => {
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

		// FIXME: How to clear inputs with Typescript? This blankState isn't properly typed
		setInputs(
			blankState,
			// || { name: '', description: '', price: '', image: '' }
		);
	};

	return {
		inputs,
		handleChange,
		resetForm,
		clearForm,
	};
};

export default useForm;

// FIXME: Will I ever use this useEffect? It was causing issues
// const initialValues = Object.values(initial).join('');
// useEffect(() => {
// 	// This function runs when the things we are watching change
// 	setInputs(initial);
// }, [initial]);
