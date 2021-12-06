import {v4 as uuidv4} from 'uuid'
import styles from './text.module.css';

const Text = ({ text }) => {
	if (!text) {
		return null;
	}
	return text.map(value => {
		const {
			annotations: { bold, code, color, italic, strikethrough, underline },
			text,
		} = value;
		return (
			<span
				key={uuidv4()}
				className={[
					bold ? styles.bold : '',
					code ? styles.code : '',
					italic ? styles.italic : '',
					strikethrough ? styles.strikethrough : '',
					underline ? styles.underline : '',
				].join(' ')}
				style={color !== 'default' ? { color } : {}}
			>
				{text.link ? <a href={text.link.url}>{text.content}</a> : text.content}
			</span>
		);
	});
};

export default Text;
