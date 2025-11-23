'use client'

import { useState, useRef } from 'react'
import { redirect } from 'next/navigation'
import Image from 'next/image'

export default function AdminPage() {
  const [formData, setFormData] = useState({
    title: '',
    date: new Date().toISOString().split('T')[0],
    description: '',
    tags: '',
    content: '',
    slug: '',
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isUploading, setIsUploading] = useState(false)
  const [message, setMessage] = useState('')
  const [uploadedImages, setUploadedImages] = useState<string[]>([])
  const textareaRef = useRef<HTMLTextAreaElement>(null)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setMessage('')

    try {
      const response = await fetch('/api/admin/create-post', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })

      const data = await response.json()

      if (response.ok) {
        setMessage('게시글이 성공적으로 생성되었습니다!')
        setFormData({
          title: '',
          date: new Date().toISOString().split('T')[0],
          description: '',
          tags: '',
          content: '',
          slug: '',
        })
      } else {
        setMessage(`오류: ${data.error}`)
      }
    } catch (error) {
      setMessage('게시글 생성 중 오류가 발생했습니다.')
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (!files || files.length === 0) return

    setIsUploading(true)
    const uploadedUrls: string[] = []

    try {
      for (const file of Array.from(files)) {
        const formData = new FormData()
        formData.append('file', file)

        const response = await fetch('/api/admin/upload-image', {
          method: 'POST',
          body: formData,
        })

        const data = await response.json()

        if (response.ok) {
          uploadedUrls.push(data.url)
        } else {
          setMessage(`이미지 업로드 오류: ${data.error}`)
        }
      }

      setUploadedImages((prev) => [...prev, ...uploadedUrls])
      setMessage(`${uploadedUrls.length}개의 이미지가 업로드되었습니다.`)
    } catch (error) {
      setMessage('이미지 업로드 중 오류가 발생했습니다.')
    } finally {
      setIsUploading(false)
    }
  }

  const insertImageToContent = (imageUrl: string) => {
    const imageMarkdown = `![](${imageUrl})`
    const textarea = textareaRef.current
    if (!textarea) return

    const start = textarea.selectionStart
    const end = textarea.selectionEnd
    const text = formData.content
    const before = text.substring(0, start)
    const after = text.substring(end)

    setFormData((prev) => ({
      ...prev,
      content: before + imageMarkdown + after,
    }))

    setTimeout(() => {
      textarea.focus()
      const newPosition = start + imageMarkdown.length
      textarea.setSelectionRange(newPosition, newPosition)
    }, 0)
  }

  if (process.env.NODE_ENV === 'production') {
    redirect('/')
  }

  return (
    <div className="mx-auto max-w-4xl px-4 py-8">
      <h1 className="mb-8 text-3xl font-bold">새 게시글 작성</h1>

      {message && (
        <div
          className={`mb-4 rounded p-4 ${
            message.includes('오류') ? 'bg-red-100 text-red-700' : 'bg-green-100 text-green-700'
          }`}
        >
          {message}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label htmlFor="slug" className="mb-2 block font-medium">
            슬러그 (파일명)
          </label>
          <input
            type="text"
            id="slug"
            name="slug"
            value={formData.slug}
            onChange={handleChange}
            required
            placeholder="example-post"
            className="w-full rounded border border-gray-300 px-4 py-2 dark:border-gray-600 dark:bg-gray-800"
          />
          <p className="mt-1 text-sm text-gray-500">영문, 숫자, 하이픈만 사용 가능합니다</p>
        </div>

        <div>
          <label htmlFor="title" className="mb-2 block font-medium">
            제목
          </label>
          <input
            type="text"
            id="title"
            name="title"
            value={formData.title}
            onChange={handleChange}
            required
            className="w-full rounded border border-gray-300 px-4 py-2 dark:border-gray-600 dark:bg-gray-800"
          />
        </div>

        <div>
          <label htmlFor="date" className="mb-2 block font-medium">
            날짜
          </label>
          <input
            type="date"
            id="date"
            name="date"
            value={formData.date}
            onChange={handleChange}
            required
            className="w-full rounded border border-gray-300 px-4 py-2 dark:border-gray-600 dark:bg-gray-800"
          />
        </div>

        <div>
          <label htmlFor="description" className="mb-2 block font-medium">
            설명
          </label>
          <input
            type="text"
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            required
            className="w-full rounded border border-gray-300 px-4 py-2 dark:border-gray-600 dark:bg-gray-800"
          />
        </div>

        <div>
          <label htmlFor="tags" className="mb-2 block font-medium">
            태그
          </label>
          <input
            type="text"
            id="tags"
            name="tags"
            value={formData.tags}
            onChange={handleChange}
            placeholder="tag1, tag2, tag3"
            className="w-full rounded border border-gray-300 px-4 py-2 dark:border-gray-600 dark:bg-gray-800"
          />
          <p className="mt-1 text-sm text-gray-500">쉼표로 구분하여 입력하세요</p>
        </div>

        <div>
          <label className="mb-2 block font-medium">이미지 업로드</label>
          <input
            type="file"
            accept="image/*"
            multiple
            onChange={handleImageUpload}
            disabled={isUploading}
            className="w-full rounded border border-gray-300 px-4 py-2 dark:border-gray-600 dark:bg-gray-800"
          />
          <p className="mt-1 text-sm text-gray-500">
            {isUploading ? '업로드 중...' : '여러 이미지를 선택할 수 있습니다'}
          </p>
        </div>

        {uploadedImages.length > 0 && (
          <div>
            <label className="mb-2 block font-medium">업로드된 이미지</label>
            <div className="space-y-2 rounded border border-gray-300 p-4 dark:border-gray-600">
              {uploadedImages.map((url, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between rounded bg-gray-50 p-2 dark:bg-gray-800"
                >
                  <div className="flex items-center gap-2">
                    <Image src={url} alt="" className="h-12 w-12 rounded object-cover" />
                    <span className="text-sm">{url}</span>
                  </div>
                  <button
                    type="button"
                    onClick={() => insertImageToContent(url)}
                    className="rounded bg-green-500 px-3 py-1 text-sm text-white hover:bg-green-600"
                  >
                    본문에 삽입
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        <div>
          <label htmlFor="content" className="mb-2 block font-medium">
            본문
          </label>
          <textarea
            ref={textareaRef}
            id="content"
            name="content"
            value={formData.content}
            onChange={handleChange}
            required
            rows={20}
            className="w-full rounded border border-gray-300 px-4 py-2 font-mono text-sm dark:border-gray-600 dark:bg-gray-800"
            placeholder="마크다운 형식으로 작성하세요..."
          />
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full rounded bg-blue-500 px-6 py-3 font-medium text-white hover:bg-blue-600 disabled:bg-gray-400"
        >
          {isSubmitting ? '저장 중...' : '게시글 저장'}
        </button>
      </form>
    </div>
  )
}
