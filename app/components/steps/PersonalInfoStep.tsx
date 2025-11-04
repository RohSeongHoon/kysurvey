"use client"

import { useState } from "react"
import type { SurveyData } from "../../page"
import Button from "../ui/Button"
import Input from "../ui/Input"

interface PersonalInfoStepProps {
  surveyData: SurveyData
  updateSurveyData: (data: Partial<SurveyData>) => void
  onNext: () => void
  onPrevious: () => void
  canGoBack: boolean
}

export default function PersonalInfoStep({
  surveyData,
  updateSurveyData,
  onNext,
  onPrevious,
  canGoBack,
}: PersonalInfoStepProps) {
  const [errors, setErrors] = useState<{ [key: string]: string }>({})

  const validateForm = () => {
    const newErrors: { [key: string]: string } = {}

    if (!surveyData.name.trim()) {
      newErrors.name = "성함 또는 닉네임을 입력해주세요."
    }

    if (!surveyData.phone.trim()) {
      newErrors.phone = "전화번호를 입력해주세요."
    } else if (!/^010-\d{4}-\d{4}$/.test(surveyData.phone)) {
      newErrors.phone = "올바른 전화번호 형식으로 입력해주세요. (010-1234-5678)"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleNext = () => {
    if (validateForm()) {
      onNext()
    }
  }

  const formatPhoneNumber = (value: string) => {
    const numbers = value.replace(/[^\d]/g, "")
    if (numbers.length <= 3) return numbers
    if (numbers.length <= 7) return `${numbers.slice(0, 3)}-${numbers.slice(3)}`
    return `${numbers.slice(0, 3)}-${numbers.slice(3, 7)}-${numbers.slice(7, 11)}`
  }

  const handlePhoneChange = (value: string) => {
    const formatted = formatPhoneNumber(value)
    updateSurveyData({ phone: formatted })
  }

  return (
    <div className="bg-white border border-gray-200 rounded-lg p-8 shadow-sm animate-slideIn">
      <h2 className="text-2xl font-bold text-black mb-6">개인정보 입력</h2>

      <div className="space-y-6">
        <Input
          label="성함 또는 닉네임"
          required
          value={surveyData.name}
          onChange={(value) => updateSurveyData({ name: value })}
          placeholder="홍길동 또는 원하는 닉네임"
          error={errors.name}
        />

        <Input
          label="연락가능한 전화번호"
          required
          type="tel"
          value={surveyData.phone}
          onChange={handlePhoneChange}
          placeholder="010-1234-5678"
          error={errors.phone}
        />
      </div>

      <div className="mt-8 flex justify-between">
        {canGoBack && (
          <Button onClick={onPrevious} variant="secondary">
            이전
          </Button>
        )}
        <Button onClick={handleNext} variant="primary" className={!canGoBack ? "ml-auto" : ""}>
          다음
        </Button>
      </div>
    </div>
  )
}
