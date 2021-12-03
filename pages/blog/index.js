import Link from 'next/link';
import { getDatabase } from '../../util/notion';
import Text from 'components/Notion/text';
import { v4 as uuidv4 } from 'uuid';
import styled from 'styled-components'
import styles from './index.module.css';

export const databaseId =
	process.env.NOTION_DATABASE_ID || 'd3504580353f4e9abe347a8d445f9c17';

// TODO: If contains a page inside, then its clickable.
// In [id].js, only getStaticPaths for the db_posts that do have a page inside `body`
// TODO: Filter and show blogs by role.
// todo, doing - admin only
// release - all users

export const getStaticProps = async () => {
	const database = await getDatabase(databaseId);

	return {
		props: {
			posts: database,
		},
		revalidate: 1,
	};
};

const tags = {
	release: '#A0E7E5',
	doing: '#B4F8C8',
	todo: '#FBE7C6'
}

const Tag = styled.div`
	background-color: ${props => props.tagColor};
	margin: 0 4px 0 0;
	border: 1px solid;
	padding: 2px 1px;
	border-radius: 10%;
	display: inline-block;
`
// FIXME: Updated this, refactor and apply colors to posts
const StyledItem = styled.div`
	box-shadow: 0 0 5px 3px rgba(0, 0, 0, 0.05);
	background: rgba(0, 0, 0, 0.02);
	border: 5px solid white;
	padding: 20px;
	font-size: 1.5rem;
	line-height: 1.5;
	font-weight: 600;
	label {
		display: block;
		margin-top: 1rem;
	}
	input,
	textarea,
	select {
		width: 100%;
		padding: 0.5rem;
		font-size: 1rem;
		border: 1px solid black;
		&:focus {
			outline: 0;
			border-color: var(--red);
		}
	}
	button,
	input[type='submit'] {
		width: auto;
		background: red;
		color: white;
		border: 0;
		font-size: 2rem;
		font-weight: 600;
		padding: 0.5rem 1.2rem;
		margin-top: 1rem;
	}
	fieldset {
		border: 0;
		padding: 0;

		&[disabled] {
			opacity: 0.5;
		}
		&::before {
			height: 10px;
			content: '';
			display: block;
			background-image: linear-gradient(
				to right,
				#ff3019 0%,
				#e2b04a 50%,
				#ff3019 100%
			);
		}
		&[aria-busy='true']::before {
			background-size: 50% auto;
			/* animation: ${loading} 0.5s linear infinite; */
		}
	}
`;

const PageBlog = ({ posts }) => {

	return (
		<div>
			<h2 className={styles.heading}>All Posts</h2>
			<ol className={styles.posts}>
				{posts.map(post => {
					const date = new Date(post.last_edited_time).toLocaleString('en-US', {
						month: 'short',
						day: '2-digit',
						year: 'numeric',
					});
					return (
						<>
							<li key={post.id} className={styles.post}>
								<span className={styles.postDescription}>{date}</span>
								{/* TODO: Remove this? <div>{post.id}</div> */}
								<h3 className={styles.postTitle}>
									<Link href={`/blog/${post.id}`}>
										<a>
										<Text text={post.properties.body.title} />
										</a>
									</Link>
									<div className={styles.tagsContainer}>
									{post?.properties?.tags?.multi_select?.map(tag => {
										return (
											<Tag
												key={uuidv4()}
												tagColor={tags[`${tag.name}`]}
											>
												{tag.name}
											</Tag>
										);
									})}
									</div>
								</h3>
								<h4>
									<Text text={post.properties.description.rich_text} />
								</h4>
								<Link href={`/blog/${post.id}`}>
									<a> Read post →</a>
								</Link>
							</li>
						</>
					);
				})}
			</ol>
		</div>
	);
};

export default PageBlog;
