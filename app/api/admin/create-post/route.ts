import { NextRequest, NextResponse } from 'next/server'
import { writeFile } from 'fs/promises'
import path from 'path'

export async function POST(request: NextRequest) {
  // 프로덕션 환경에서는 접근 차단
  if (process.env.NODE_ENV === 'production') {
    return NextResponse.json({ error: 'Not found' }, { status: 404 })
  }

  try {
    const body = await request.json()
    const { title, date, description, tags, content, slug } = body

    // 필수 필드 검증
    if (!title || !date || !description || !content || !slug) {
      return NextResponse.json({ error: '필수 필드가 누락되었습니다.' }, { status: 400 })
    }

    // 슬러그 유효성 검증 (영문, 숫자, 하이픈만 허용)
    if (!/^[a-z0-9-]+$/.test(slug)) {
      return NextResponse.json(
        { error: '슬러그는 영문 소문자, 숫자, 하이픈만 사용할 수 있습니다.' },
        { status: 400 }
      )
    }

    // 태그 배열로 변환
    const tagsArray = tags
      ? tags
          .split(',')
          .map((tag: string) => tag.trim())
          .filter((tag: string) => tag.length > 0)
      : []

    // MDX frontmatter 생성
    const frontmatter = `---
title: '${title}'
date: '${date}'
description: '${description}'
tags: [${tagsArray.map((tag: string) => `'${tag}'`).join(', ')}]
---

${content}
`

    // 파일 경로 설정
    const filePath = path.join(process.cwd(), 'data', 'blog', `${slug}.mdx`)

    // 파일 저장
    await writeFile(filePath, frontmatter, 'utf-8')

    return NextResponse.json({
      success: true,
      message: '게시글이 성공적으로 생성되었습니다.',
      filePath: `data/blog/${slug}.mdx`,
    })
  } catch (error) {
    console.error('Error creating post:', error)
    return NextResponse.json({ error: '게시글 생성 중 오류가 발생했습니다.' }, { status: 500 })
  }
}
