"use client"

import { useState } from "react"
import type { SurveyData } from "../../page"
import Button from "../ui/Button"
import RadioGroup from "../ui/RadioGroup"
import Textarea from "../ui/Textarea"

interface FinalConfirmationStepProps {
  surveyData: SurveyData
  updateSurveyData: (data: Partial<SurveyData>) => void
  onNext: () => void
  onPrevious: () => void
  canGoBack: boolean
}

export default function FinalConfirmationStep({
  surveyData,
  updateSurveyData,
  onNext,
  onPrevious,
  canGoBack,
}: FinalConfirmationStepProps) {
  const [errors, setErrors] = useState<{ [key: string]: string }>({})
  const [isSubmitting, setIsSubmitting] = useState(false)

  const depositOptions = [{ value: "연락 가능", label: "연락 가능" }]

  const mediaConsentOptions = [
    { value: "동의합니다", label: "동의합니다" },
    { value: "동의하지 않습니다", label: "동의하지 않습니다" }
  ]

  const validateForm = () => {
    const newErrors: { [key: string]: string } = {}

    if (!surveyData.depositAgreement) {
      newErrors.depositAgreement = "개별 연락 가능 여부를 선택해주세요."
    }

    if (!surveyData.agreeNotice) {
      newErrors.agreeNotice = "홍보 활용 동의 여부를 선택해주세요."
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async () => {
    if (validateForm()) {
      setIsSubmitting(true)
      try {
        const response = await fetch('/api/submit-survey', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            name: surveyData.name,
            phone: surveyData.phone,
            reason: surveyData.reason,
            reasonOther: surveyData.reasonOther,
            level: surveyData.level,
            appIdea: surveyData.appIdea,
            scheduleDate: surveyData.scheduleDate,
            depositAgreement: surveyData.depositAgreement,
            skills: surveyData.skills,
            agreeNotice: surveyData.agreeNotice,
          }),
        })

        if (response.ok) {
          onNext()
        } else {
          alert('제출 중 오류가 발생했습니다. 다시 시도해주세요.')
          setIsSubmitting(false)
        }
      } catch (error) {
        console.error('Submit error:', error)
        alert('제출 중 오류가 발생했습니다. 다시 시도해주세요.')
        setIsSubmitting(false)
      }
    }
  }

  return (
    <div className="bg-white border border-gray-200 rounded-lg p-8 shadow-sm animate-slideIn">
      <h2 className="text-2xl font-bold text-black mb-6">최종 확인</h2>

      <div className="space-y-8">
        <div>
          <RadioGroup
            label="개별 연락"
            required
            options={depositOptions}
            value={surveyData.depositAgreement}
            onChange={(value) => updateSurveyData({ depositAgreement: value })}
            error={errors.depositAgreement}
          />
          <p className="text-sm text-gray-600 mt-2">
            설문 제출 후 개별적으로 연락드리겠습니다.
          </p>
        </div>

        <Textarea
          label="보유 기술/경험"
          value={surveyData.skills}
          onChange={(value) => updateSurveyData({ skills: value })}
          placeholder="Figma, Photoshop, HTML/CSS 등"
          rows={3}
        />

        <div>
          <RadioGroup
            label="홍보 활용 동의"
            required
            options={mediaConsentOptions}
            value={surveyData.agreeNotice}
            onChange={(value) => updateSurveyData({ agreeNotice: value })}
            error={errors.agreeNotice}
          />
          <p className="text-sm text-gray-600 mt-2">
            해당 결과물은 사진이나 영상 홍보용으로 사용될 수 있습니다.
          </p>
        </div>
      </div>

      <div className="mt-8 flex justify-between">
        <Button onClick={onPrevious} variant="secondary" disabled={isSubmitting}>
          이전
        </Button>
        <Button
          onClick={handleSubmit}
          variant="primary"
          className="bg-black text-white font-semibold flex items-center gap-2"
          disabled={isSubmitting}
        >
          {isSubmitting ? (
            <>
              <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              제출 중...
            </>
          ) : (
            '설문 완료'
          )}
        </Button>
      </div>
    </div>
  )
}
