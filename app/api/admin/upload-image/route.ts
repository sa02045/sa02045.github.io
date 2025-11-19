import { NextRequest, NextResponse } from 'next/server'
import { writeFile } from 'fs/promises'
import path from 'path'
import { randomBytes } from 'crypto'

export async function POST(request: NextRequest) {
  // 프로덕션 환경에서는 접근 차단
  if (process.env.NODE_ENV === 'production') {
    return NextResponse.json({ error: 'Not found' }, { status: 404 })
  }

  try {
    const formData = await request.formData()
    const file = formData.get('file') as File

    if (!file) {
      return NextResponse.json({ error: '파일이 없습니다.' }, { status: 400 })
    }

    // 이미지 파일인지 확인
    if (!file.type.startsWith('image/')) {
      return NextResponse.json({ error: '이미지 파일만 업로드 가능합니다.' }, { status: 400 })
    }

    // 파일 확장자 추출
    const originalName = file.name
    const ext = path.extname(originalName)
    const nameWithoutExt = path.basename(originalName, ext)

    // 파일명 생성 (원본명 + 랜덤 문자열)
    const randomString = randomBytes(4).toString('hex')
    const fileName = `${nameWithoutExt}-${randomString}${ext}`

    // 파일 저장 경로
    const uploadsDir = path.join(process.cwd(), 'public', 'static', 'images')
    const filePath = path.join(uploadsDir, fileName)

    // 파일 읽기 및 저장
    const bytes = await file.arrayBuffer()
    const buffer = Buffer.from(bytes)
    await writeFile(filePath, buffer)

    // 웹에서 접근 가능한 URL 반환
    const basePath = process.env.BASE_PATH || ''
    const imageUrl = `${basePath}/static/images/${fileName}`

    return NextResponse.json({
      success: true,
      url: imageUrl,
      fileName,
    })
  } catch (error) {
    console.error('Error uploading image:', error)
    return NextResponse.json({ error: '이미지 업로드 중 오류가 발생했습니다.' }, { status: 500 })
  }
}
