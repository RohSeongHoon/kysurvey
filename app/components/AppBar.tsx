"use client"

export default function AppBar() {
  const handleLogoClick = () => {
    // 페이지 최상단으로 스크롤하고, 필요시 페이지 새로고침
    if (window.scrollY === 0) {
      // 이미 최상단이면 페이지 새로고침 (설문 중이었다면 초기화)
      window.location.reload()
    } else {
      // 최상단이 아니면 스크롤만
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }
  }

  return (
    <header className="bg-black border-b border-gray-800 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <button
              onClick={handleLogoClick}
              className="text-lg font-semibold text-white hover:text-gray-300 transition-colors cursor-pointer"
            >
              Ky Dev Studio
            </button>
          </div>
        </div>
      </div>
    </header>
  )
}