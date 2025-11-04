export default function CompletionStep() {
  return (
    <div className="bg-white border border-gray-200 rounded-lg p-8 shadow-sm animate-fadeIn text-center">
      <div className="mb-6">
        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h2 className="text-3xl font-bold text-black mb-4">수강 신청 완료!</h2>
        <p className="text-gray-600 text-lg leading-relaxed">
          수강 신청해 주셔서 감사합니다.
          <br />
          입력해 주신 정보를 바탕으로 강의 일정을 조율한 후<br />
          개별 연락드리겠습니다.
        </p>
      </div>

      <div className="bg-gray-50 p-6 rounded-lg">
        <h3 className="font-semibold text-black mb-2 text-center">다음 단계</h3>
        <ul className="text-sm text-gray-600 space-y-1 text-center list-none">
          <li>• 참가자 확정 및 일정 조율</li>
          <li>• 개별 연락 (1주일 내)</li>
          <li>• 강의 자료 및 준비물 안내</li>
        </ul>
      </div>

      <p className="text-sm text-gray-500 mt-6">문의사항이 있으시면 언제든 연락주세요!</p>
    </div>
  )
}
