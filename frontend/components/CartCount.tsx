import { CSSTransition, TransitionGroup } from 'react-transition-group';

import { StyledDot, StyledDotAnimation } from './styles/StyledDot';

const CartCount = ({ count }: { count: number }) => {
	return (
		<StyledDotAnimation>
			<TransitionGroup>
				<CSSTransition
					unmountOnExit
					className="count"
					classNames="count"
					key={count}
					timeout={{ enter: 400, exit: 400 }}
				>
					<StyledDot>{count}</StyledDot>
				</CSSTransition>
			</TransitionGroup>
		</StyledDotAnimation>
	);
};

export default CartCount;
