import { NextResponse } from 'next/server'
import { Client } from '@notionhq/client'

export async function GET() {
  try {
    const notion = new Client({
      auth: process.env.NOTION_SECRET,
    })

    // 데이터베이스 접근 테스트
    const response = await notion.databases.retrieve({
      database_id: process.env.NOTION_DATABASE_ID!,
    })

    return NextResponse.json({ 
      success: true, 
      title: response.title,
      id: response.id 
    })
  } catch (error) {
    console.error('Notion test error:', error)
    return NextResponse.json(
      { 
        error: error.message,
        code: error.code 
      },
      { status: 500 }
    )
  }
}