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

//FIXME: Use generics to pass different interfaces to useForm hook.
interface ISignInFormInput {
	email: string;
	password: string;
}
interface IPasswordReset extends ISignInFormInput {
	token: string;
}

interface ISignUpFormInput extends ISignInFormInput {
	name: string;
}
interface IProductFormInput {
	name: string;
	description: string;
	price: number | undefined;
	image?: any;
}

interface IFormInput {
	name: string;
	description: string;
	price: number | undefined;
	image?: any;
}

const useForm = (initial: IPasswordReset) => {
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
