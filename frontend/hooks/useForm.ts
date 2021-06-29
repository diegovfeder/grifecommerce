import { useEffect, useState } from 'react';

interface IEvent {
	target: {
		files?: any;
		value?: any;
		name?: any;
		type?: any;
	};
}

// FIXME: What happens when I need another page to use this hook?
// Is there a way to define types Dynamically? Pass as props maybe?
interface IFormInput {
	name: string;
	description: string;
	price: number | undefined;
	image?: any;
}

export default function useForm(initial: IFormInput) {
	const [inputs, setInputs] = useState(initial);
	const initialValues = Object.values(initial).join('');

	useEffect(() => {
		setInputs(initial);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [initialValues]);

	function handleChange(e: IEvent) {
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
	}

	function resetForm() {
		setInputs(initial);
	}

	function clearForm() {
		const blankState = Object.fromEntries(
			Object.entries(inputs).map(([key, _]) => [key, '']),
		);
		setInputs(blankState);
	}

	return {
		inputs,
		handleChange,
		resetForm,
		clearForm,
	};
}

// const initialValues = Object.values(initial).join('');
// useEffect(() => {
// 	// This function runs when the things we are watching change
// 	setInputs(initial);
// }, [initial]);

// {
//   name: 'wes',
//   description: 'nice shoes',
//   price: 1000
// }
