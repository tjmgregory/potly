import Layout from '../../components/layout'
import { getAllPostIds, getPostData } from '../../js/posts'

export default function BlogPost({ postData }) {
    return (
        <Layout>
            {postData.title}
            <br />
            {postData.id}
            <br />
            {postData.date}
        </Layout>
    )
}

export async function getStaticPaths() {
    const ids = getAllPostIds()
    return {
        paths: ids.map((id) => ({
            params: {
                id: id,
            },
        })),
        fallback: false,
    }
}

export async function getStaticProps({ params }) {
    const postData = getPostData(params.id)
    return {
        props: {
            postData,
        },
    }
}
