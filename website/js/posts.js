import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'

const postsDirectory = path.join(process.cwd(), 'blogPosts')

function readPostDirSync() {
    const files = fs.readdirSync(postsDirectory)
    return files.filter((fileName) => fileName.endsWith('.md'))
}

function makePostIdFromFilename(fileName) {
    return fileName.replace(/\.md$/, '')
}

export function getAllPostIds() {
    const fileNames = readPostDirSync()
    return fileNames.map(makePostIdFromFilename)
}

export function getPostData(id) {
    const fullPath = path.join(postsDirectory, id + '.md')
    const fileContents = fs.readFileSync(fullPath, 'utf8')

    const matterResult = matter(fileContents)

    return {
        id,
        ...matterResult.data,
    }
}

export function getSortedPostsData() {
    const fileNames = readPostDirSync()

    const allPostsData = fileNames.map((fileName) =>
        getPostData(makePostIdFromFilename(fileName))
    )

    return allPostsData.sort((a, b) => a.date < b.date)
}
