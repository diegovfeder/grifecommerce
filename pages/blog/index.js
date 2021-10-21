import Link from 'next/link';
import { getDatabase } from '../../util/notion';
import Text from 'components/Notion/text';
import { v4 as uuidv4 } from 'uuid';
import styled from 'styled-components'
import styles from './index.module.css';

export const databaseId =
	process.env.NOTION_DATABASE_ID || 'd3504580353f4e9abe347a8d445f9c17';

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
						<li key={post.id} className={styles.post}>
							<span className={styles.postDescription}>{date}</span>
							{/* <div>{post.id}</div> */}
							<h3 className={styles.postTitle}>
								<Link href={`/blog/${post.id}`}>
									<a>
									<Text text={post.properties.title.title} />
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
					);
				})}
			</ol>
		</div>
	);
};

export default PageBlog;
