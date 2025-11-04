import { NextResponse } from 'next/server'
import { submitToNotion, type SurveySubmission } from '@/lib/notion'

export async function POST(request: Request) {
  try {
    const body: SurveySubmission = await request.json()
    
    // 필수 필드 검증
    if (!body.name || !body.phone || !body.reason) {
      return NextResponse.json(
        { error: '필수 필드가 누락되었습니다.' },
        { status: 400 }
      )
    }

    const result = await submitToNotion(body)
    
    if (result.success) {
      return NextResponse.json({ success: true })
    } else {
      return NextResponse.json(
        { error: '제출 중 오류가 발생했습니다.' },
        { status: 500 }
      )
    }
  } catch (error) {
    console.error('API error:', error)
    return NextResponse.json(
      { error: '서버 오류가 발생했습니다.' },
      { status: 500 }
    )
  }
}