import Link from 'next/link';

interface UpdateProductButtonProps {
	id: string;
	children: React.ReactNode;
}

const UpdateProductButton = ({ id, children }: UpdateProductButtonProps) => {
	return (
		<Link
			href={{
				pathname: '/update-product',
				query: {
					id,
				},
			}}
		>
			<div style={{ flex: 1, display: 'flex', justifyContent: 'center' }}>
				{children}
			</div>
		</Link>
	);
};

export default UpdateProductButton;
