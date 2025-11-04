"use client"

import { useState } from "react"
import LandingPage from "./components/LandingPage"
import IntroAnimation from "./components/IntroAnimation"
import ProgressBar from "./components/ProgressBar"
import IntroStep from "./components/steps/IntroStep"
import PersonalInfoStep from "./components/steps/PersonalInfoStep"
import CourseQuestionsStep from "./components/steps/CourseQuestionsStep"
import FinalConfirmationStep from "./components/steps/FinalConfirmationStep"
import CompletionStep from "./components/steps/CompletionStep"

export interface SurveyData {
  name: string
  phone: string
  reason: string
  reasonOther: string
  level: string
  appIdea: string
  scheduleDate: string
  timeSlot: string
  depositAgreement: string
  skills: string
  agreeNotice: string
}

export default function SurveyPage() {
  const [showLanding, setShowLanding] = useState(true)
  const [showIntro, setShowIntro] = useState(false)
  const [currentStep, setCurrentStep] = useState(0)
  const [surveyData, setSurveyData] = useState<SurveyData>({
    name: "",
    phone: "",
    reason: "",
    reasonOther: "",
    level: "",
    appIdea: "",
    scheduleDate: "",
    timeSlot: "",
    depositAgreement: "",
    skills: "",
    agreeNotice: "",
  })

  const steps = [
    { component: IntroStep, title: "강의 소개" },
    { component: PersonalInfoStep, title: "개인정보" },
    { component: CourseQuestionsStep, title: "강의 관련 질문" },
    { component: FinalConfirmationStep, title: "최종 확인" },
    { component: CompletionStep, title: "완료" },
  ]

  const handleStartSurvey = () => {
    console.log('handleStartSurvey 호출됨')
    console.log('Before - showLanding:', showLanding, 'showIntro:', showIntro)
    setShowLanding(false)
    setShowIntro(true)
    console.log('After setState 호출 완료')
  }

  const handleIntroComplete = () => {
    setShowIntro(false)
  }

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1)
    }
  }

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1)
    }
  }

  const updateSurveyData = (data: Partial<SurveyData>) => {
    setSurveyData((prev) => ({ ...prev, ...data }))
  }

  console.log('렌더링 - showLanding:', showLanding, 'showIntro:', showIntro, 'currentStep:', currentStep)

  if (showLanding) {
    console.log('LandingPage 렌더링')
    return <LandingPage onStartSurvey={handleStartSurvey} />
  }

  if (showIntro) {
    console.log('IntroAnimation 렌더링')
    return <IntroAnimation onComplete={handleIntroComplete} />
  }

  console.log('Survey Steps 렌더링')

  const CurrentStepComponent = steps[currentStep].component
  const progress = currentStep < 4 ? ((currentStep + 1) / 4) * 100 : 100

  return (
    <div className="min-h-screen bg-white">
      <div className="container mx-auto px-5 py-8 max-w-2xl">
        {currentStep < 4 && <ProgressBar progress={progress} step={currentStep + 1} />}

        <div className="mt-8">
          <CurrentStepComponent
            surveyData={surveyData}
            updateSurveyData={updateSurveyData}
            onNext={handleNext}
            onPrevious={handlePrevious}
            canGoBack={currentStep > 0}
          />
        </div>
      </div>
    </div>
  )
}
