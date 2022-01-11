import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import remark from 'remark'
import html from 'remark-html'
import { differenceInDays, parseISO } from 'date-fns'

const postsDirectory = path.join(process.cwd(), 'blogPosts')

function readPostDirSync() {
  const files = fs.readdirSync(postsDirectory)
  return files.filter((fileName) => fileName.endsWith('.md'))
}

function makePostIdFromFilename(fileName: string): string {
  return fileName.replace(/\.md$/, '')
}

export function getAllPostIds() {
  const fileNames = readPostDirSync()
  return fileNames.map(makePostIdFromFilename)
}

function readAndParsePostWithMatter(id: string) {
  const fullPath = path.join(postsDirectory, id + '.md')
  const fileContents = fs.readFileSync(fullPath, 'utf8')

  return matter(fileContents)
}

export async function getPostData(id: string) {
  const matterResult = readAndParsePostWithMatter(id)

  const processedContent = await remark()
    .use(html)
    .process(matterResult.content)
  const contentHtml = processedContent.toString()

  return {
    id,
    contentHtml,
    ...matterResult.data,
  }
}

export function getSortedPostsData() {
  const fileNames = readPostDirSync()

  const allPostsData = fileNames.map<{ id: unknown; date?: string }>(
    (fileName) => {
      const id = makePostIdFromFilename(fileName)
      const matterResult = readAndParsePostWithMatter(id)

      return {
        id,
        ...matterResult.data,
      }
    }
  )

  return allPostsData.sort((a, b) => {
    if (!a.date || !b.date) {
      return 0
    }
    return differenceInDays(parseISO(b.date), parseISO(a.date))
  })
}
