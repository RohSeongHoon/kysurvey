import { Client } from '@notionhq/client'

const notion = new Client({
  auth: process.env.NOTION_SECRET,
})

export interface SurveySubmission {
  name: string
  phone: string
  reason: string
  reasonOther?: string
  level?: string
  appIdea?: string
  timeSlot?: string
  depositAgreement?: string
  skills?: string
  agreeNotice?: string
}

export async function submitToNotion(data: SurveySubmission) {
  try {
    const response = await notion.pages.create({
      parent: {
        database_id: process.env.NOTION_DATABASE_ID!,
      },
      properties: {
        '이름': {
          title: [
            {
              text: {
                content: data.name,
              },
            },
          ],
        },
        '전화번호': {
          phone_number: data.phone,
        },
        '관심이유': {
          rich_text: [
            {
              text: {
                content: data.reason,
              },
            },
          ],
        },
        '기타이유': {
          rich_text: [
            {
              text: {
                content: data.reasonOther || '',
              },
            },
          ],
        },
        '현재수준': {
          rich_text: [
            {
              text: {
                content: data.level || '',
              },
            },
          ],
        },
        '만들고싶은앱': {
          rich_text: [
            {
              text: {
                content: data.appIdea || '',
              },
            },
          ],
        },
        '참여가능시간': {
          rich_text: [
            {
              text: {
                content: data.timeSlot || '',
              },
            },
          ],
        },
        '보유기술': {
          rich_text: [
            {
              text: {
                content: data.skills || '',
              },
            },
          ],
        },
      },
    })

    return { success: true, data: response }
  } catch (error) {
    console.error('Notion submission error:', error)
    return { success: false, error: error instanceof Error ? error.message : 'Unknown error' }
  }
}