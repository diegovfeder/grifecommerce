import Link from 'next/link';
import { getDatabase } from '../../util/notion';
import Text from 'components/Notion/text';
import { v4 as uuidv4 } from 'uuid';
import styled from 'styled-components'
import styles from './index.module.css';

// TODO: Refactor UI, beautify and clean up styles.

export const databaseId =
	process.env.NOTION_DATABASE_ID || 'd3504580353f4e9abe347a8d445f9c17';

	// FIXME
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

// TODO: Beautify the tag
const Tag = styled.div`
	background-color: ${props => props.tagColor};
	margin: 0 4px 0 0;
	border: 1px solid;
	padding: 2px 1px;
	border-radius: 10%;
	display: inline-block;
`;

const StyledPost = styled.li`
	box-shadow: 0 0 5px 3px rgba(0, 0, 0, 0.05);
	background: rgba(0, 0, 0, 0.02);
	border: 5px solid white;
	padding: 20px;
	font-size: 1.5rem;
	line-height: 1.5;
	font-weight: 600;

	.date {
		justify-content: right;
		align-self: right;
		justify-self: right;
		left: 0;
		margin-top: 16px;
		&::after {
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
	}

	.title {
		margin-bottom: 10px;
  	font-size: 1.8rem;
	}

	.title a {
		color: inherit;
	}

	.tags-container {
  	margin-top: 0;
		font-size: 1.4rem;
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
							<StyledPost key={post.id}>
									<div className="date">{date}</div>
									<h3 className="title">
										<Link href={`/blog/${post.id}`}>
											<a>
												<Text text={post.properties.body.title} />
											</a>
										</Link>
										<div className="tags-container">
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
							</StyledPost>
						</>
					);
				})}
			</ol>
		</div>
	);
};

export default PageBlog;
