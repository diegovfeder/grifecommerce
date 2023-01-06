import { ReactNode } from 'react';
import Link from 'next/link';

import { StyledButtonLink } from './styles/StyledButtonLink';

interface UpdateProductButtonProps {
	id: string;
	children: ReactNode;
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
			<StyledButtonLink>{children}</StyledButtonLink>
		</Link>
	);
};

export default UpdateProductButton;
