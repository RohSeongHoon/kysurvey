"use client";

import { useState } from "react";
import type { SurveyData } from "../../page";
import Button from "../ui/Button";
import RadioGroup from "../ui/RadioGroup";
import Textarea from "../ui/Textarea";
import Input from "../ui/Input";

interface CourseQuestionsStepProps {
  surveyData: SurveyData;
  updateSurveyData: (data: Partial<SurveyData>) => void;
  onNext: () => void;
  onPrevious: () => void;
  canGoBack: boolean;
}

export default function CourseQuestionsStep({
  surveyData,
  updateSurveyData,
  onNext,
  onPrevious,
  canGoBack,
}: CourseQuestionsStepProps) {
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const reasonOptions = [
    {
      value: "직접 앱을 만들어보고 싶어서",
      label: "직접 앱을 만들어보고 싶어서",
    },
    { value: "서비스 아이디어가 있어서", label: "서비스 아이디어가 있어서" },
    { value: "창업 준비용", label: "창업 준비용" },
    { value: "기타", label: "기타" },
  ];

  const levelOptions = [
    { value: "아무것도 모름(완전 초보)", label: "아무것도 모름(완전 초보)" },
    {
      value: "기획/디자인만 조금 할 줄 앎",
      label: "기획/디자인만 조금 할 줄 앎",
    },
    { value: "개발 툴은 써본 적 있음", label: "개발 툴은 써본 적 있음" },
    { value: "앱을 만들어 본 적은 있음", label: "앱을 만들어 본 적은 있음" },
  ];

  const scheduleDateOptions = [
    { value: "11월 15일-16일 (토-일)", label: "11월 15일-16일 (토-일)" },
    { value: "11월 22일-23일 (토-일)", label: "11월 22일-23일 (토-일)" },
    { value: "11월 29일-30일 (토-일)", label: "11월 29일-30일 (토-일)" },
  ];

  const validateForm = () => {
    const newErrors: { [key: string]: string } = {};

    if (!surveyData.reason) {
      newErrors.reason = "관심 이유를 선택해주세요.";
    }

    if (surveyData.reason === "기타" && !surveyData.reasonOther.trim()) {
      newErrors.reasonOther = "기타 이유를 입력해주세요.";
    }

    if (!surveyData.scheduleDate) {
      newErrors.scheduleDate = "참여 가능한 일정을 선택해주세요.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (validateForm()) {
      onNext();
    }
  };

  return (
    <div className="bg-white border border-gray-200 rounded-lg p-8 shadow-sm animate-slideIn">
      <h2 className="text-2xl font-bold text-black mb-6">강의 관련 질문</h2>

      <div className="space-y-8">
        <div>
          <RadioGroup
            label="관심 이유"
            required
            options={reasonOptions}
            value={surveyData.reason}
            onChange={(value) => updateSurveyData({ reason: value })}
            error={errors.reason}
          />

          {surveyData.reason === "기타" && (
            <div className="mt-4">
              <Input
                value={surveyData.reasonOther}
                onChange={(value) => updateSurveyData({ reasonOther: value })}
                placeholder="기타 이유를 입력해주세요"
                error={errors.reasonOther}
              />
            </div>
          )}
        </div>

        <RadioGroup
          label="참여 가능한 일정"
          required
          options={scheduleDateOptions}
          value={surveyData.scheduleDate}
          onChange={(value) => updateSurveyData({ scheduleDate: value })}
          error={errors.scheduleDate}
        />

        <RadioGroup
          label="현재 수준"
          options={levelOptions}
          value={surveyData.level}
          onChange={(value) => updateSurveyData({ level: value })}
        />

        <Textarea
          label="만들고 싶은 앱"
          value={surveyData.appIdea}
          onChange={(value) => updateSurveyData({ appIdea: value })}
          placeholder="구체적인 아이디어가 있다면 간단히 설명해주세요"
          rows={5}
        />
      </div>

      <div className="mt-8 flex justify-between">
        <Button onClick={onPrevious} variant="secondary">
          이전
        </Button>
        <Button onClick={handleNext} variant="primary">
          다음
        </Button>
      </div>
    </div>
  );
}
