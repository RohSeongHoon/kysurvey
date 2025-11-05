"use client"

import type { SurveyData } from "../../page"
import Button from "../ui/Button"

interface IntroStepProps {
  surveyData: SurveyData
  updateSurveyData: (data: Partial<SurveyData>) => void
  onNext: () => void
  onPrevious: () => void
  canGoBack: boolean
}

export default function IntroStep({ onNext }: IntroStepProps) {
  return (
    <div className="bg-white border border-gray-200 rounded-lg p-8 shadow-sm animate-fadeIn">
      <h1 className="text-2xl md:text-3xl font-bold text-black mb-6 text-center">
        주말 2일 앱 제작 오프라인 강의
        <br />
        참가 희망자 설문
      </h1>

      <div className="space-y-4 text-gray-800 leading-relaxed">
        <p>시청역 근처에서 진행되는 주말 2일 앱 제작 오프라인 강의의 수강 신청을 위한 설문입니다.</p>

        <p className="font-medium">11월 15일-16일 / 22일-23일 / 29일-30일 중 선택</p>
        <p className="text-sm text-gray-600">일정별 최대 4명씩 진행됩니다.</p>

        <div className="bg-gray-50 p-4 rounded-lg space-y-2">
          <div className="flex items-center space-x-2">
            <span className="text-green-600">✔️</span>
            <span>주말 2일 집중 과정 (토-일 10:00-22:00)</span>
          </div>
          <div className="flex items-center space-x-2">
            <span className="text-green-600">✔️</span>
            <span>수강료 <span className="line-through text-gray-400">20만원</span> → <span className="font-bold text-green-600">0원</span> <span className="text-sm text-orange-600">(11월,12월 한정)</span></span>
          </div>
          <div className="flex items-center space-x-2">
            <span className="text-green-600">✔️</span>
            <span>앱 기획부터 제작까지 직접 완성합니다.</span>
          </div>
          <div className="flex items-center space-x-2">
            <span className="text-green-600">✔️</span>
            <span>개발 기초 지식도 포함합니다.</span>
          </div>
          <div className="flex items-center space-x-2">
            <span className="text-green-600">✔️</span>
            <span>절대 쉽지 않습니다. 다만 확실하게 성장합니다.</span>
          </div>
        </div>
      </div>

      <div className="mt-8 flex justify-center">
        <Button onClick={onNext} variant="primary">
          다음
        </Button>
      </div>
    </div>
  )
}
