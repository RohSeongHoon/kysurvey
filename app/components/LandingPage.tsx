"use client"

import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Clock, Target, Users, Award, CircleCheckBig, ChevronLeft, ChevronRight } from "lucide-react"
import { useState, useEffect } from "react"
import Image from "next/image"

interface LandingPageProps {
  onStartSurvey: () => void
}

export default function LandingPage({ onStartSurvey }: LandingPageProps) {
  const handleStartClick = () => {
    console.log('수강 신청 버튼 클릭됨')
    onStartSurvey()
  }

  const [currentWeek, setCurrentWeek] = useState(1)
  const [selectedImage, setSelectedImage] = useState<string | null>(null)
  const [currentAppIndex, setCurrentAppIndex] = useState(0)
  const [currentImageIndexInApp, setCurrentImageIndexInApp] = useState(0)
  const [touchStart, setTouchStart] = useState(0)
  const [touchEnd, setTouchEnd] = useState(0)
  const [currentTestimonial, setCurrentTestimonial] = useState(0)
  const [expandedTestimonials, setExpandedTestimonials] = useState<Set<number>>(new Set())
  const [testimonialTouchStart, setTestimonialTouchStart] = useState(0)
  const [testimonialTouchEnd, setTestimonialTouchEnd] = useState(0)
  const [curriculumTouchStart, setCurriculumTouchStart] = useState(0)
  const [curriculumTouchEnd, setCurriculumTouchEnd] = useState(0)
  const [curriculumMouseDown, setCurriculumMouseDown] = useState(false)
  const [curriculumMouseStart, setCurriculumMouseStart] = useState(0)
  const [curriculumMouseEnd, setCurriculumMouseEnd] = useState(0)
  const [currentAppSlide, setCurrentAppSlide] = useState(0)
  const [appTouchStart, setAppTouchStart] = useState(0)
  const [appTouchEnd, setAppTouchEnd] = useState(0)

  const testimonials = [
    {
      name: "가연",
      role: "1기 수료생",
      text: `안녕하세요 성훈님:) 4주완성 바이브코딩 수강한 가연이에요!

솔직히 처음엔 비개발자인 제가 이렇게 단기간에 앱을 만든다는건 불가능할 거라 생각하고 반신반의하는 마음으로 지원했어요. 사실 혼자 해볼때 막막하기도 하고 막히는 부분에서 포기한 적도 많았거든요.

근데 강의에서는 불필요한 내용은 다 떼고 꼭 필요한 것만 쉽게 알려주셔서, 먼 길 돌아가지 않고 짧은 기간에 진짜 결과물을 만들 수 있었던 것 같아요. 너무 신기하고 뿌듯해요!!

무슨 질문을 해도 절대 귀찮아하지 않으시고 왕초보 수준에 딱 맞게 친절하고 인내심 있게 차근차근 설명해주셔서 정말 든든했어요! 덕분에 중간에 포기하지 않고 끝까지 할 수 있었던 것 같아요ㅎㅎ (P.R.D.엔터.누르세요~🤣)

바이브 코딩이 이렇게나 재밌는거였다니!! 앞으로도 차근차근 공부해보려구요☺️
정말 소중한 4주였고, 덕분에 많이 배우고 성장할 수 있었어요! 감사합니다😆`
    },
    {
      name: "소영",
      role: "1기 수료생",
      text: `성훈님~~~바이브코딩 열심히 돌리다가 리밋떠서 기다리는동안에 성훈님이 갑자기 생각나서 카톡드렸어요 ㅎㅎ

성훈님 강의 듣고 나서 이제 필요한 서비스 이것저것 바이브 코딩으로 만들어내는 제 자신을 보면서 많이 성장했다는걸 새삼 느낍니다! 넘 감사해요!!

제가 아는 강사님 중에 함수와 변수 설명을 제일 잘하시는분 ㅋㅋㅋㅋ 그리고 강의자료도 너무 좋아서 아직도 잘 활용중입니다 ㅋㅋㅋ 여튼 넘 감사해용 담에 아지트 놀러가겠습니다~~~🫡🫡🫡`
    },
    {
      name: "정윤",
      role: "1기 수료생",
      text: "비개발자도 시작할수 있도록 정말 차근차근히 잘 가르쳐주시고 진심이 있는 선생님이라 책임감있게 잘 가르쳐주십니다 강추합니다 (저는 재수강 의사 있어요 ^^)"
    },
    {
      name: "인규",
      role: "1기 수료생",
      text: `바로 실전에 꽂히는 강의였다
이론보다 사례로 알려줘서 좋았고
브레인에 커서와 플러터가 자리 잡았다
코드 흐름까지 잡아주니
딩가 딩가 놀면서 클로드 토큰을 다 써보자`
    },
    {
      name: "효정",
      role: "1기 수료생",
      text: `성훈님, 저 사실 개발에는 1도 관심 없고 완전 모르던 사람이었거든요. 근데 이번에 첫바이브코딩을 해보고 나니까 진짜 세상 좋아졌다는 생각부터 들더라구요. AI한테 뭐만 시키면 웬만한 건 다 해주니까욥ㅋㅋ

근데 또 그게 다는 아니더라구요,,^^ 제가 코딩을 1도 모르다 보니까 AI만으로 앱까지 뚝딱 만들기는 확실히 무리가 있음을.. 그냥 주문을 넣으면 끝일 줄 알았는데 사실은 어떻게 주문하느냐, 그리고 결과물을 어떻게 이해하고 수정하느냐가 훨씬 더 중요한 것 같아요! 그러다 보니 AI랑 소통이 잘 안 되는 느낌..ㅠㅠ

그래도 이번 강의 덕분에 AI랑 조금 더 가까워진 기분이에요. 처음으로 개발을 하면서 성취감도 느껴보고, 재미도 붙었거든요. 확실히 전보다 친근해졌다고 해야 할까요?

그리고 더 웃긴 건요, 이제는 앱을 직접 배포해보고 싶다는 욕심까지 생겼다는 거..ㅋㅋㅋㅋ 원래 새로운 걸 배우고 익숙해지는 과정이 제일 열정적이라고들 하잖아요. 제가 지금 딱 그 시기에 있는 것 같아요.

내가 코딩을 재미있어 하다니… 하지만 아직 갈 길이 멀어서 다시 한번 화이팅 해보려고요💪🏼`
    },
    {
      name: "소정",
      role: "1기 수료생",
      text: `우연히 쓰레드에서 바이브코딩 4주 완성반!! 을 보고 홀린듯 신청했는데 벌써 마지막 시간이네….시간 빠른것 무엇?

만들고 싶은게 있었는데 꿈이 창대했는지 빠른 계획 수정은 무슨…생각보다 딱 맞는거 찾기 쉽지 않더라. 어떡하지 어떡하지 하다가 시간은 지나가고 나는 밀려 밀려 가는 것 같고….ㅠㅠㅡㅜㅡㅜ 흐규 드랍하고 싶었지만 보증금이 걸려있었다! 다 계획이 있었던 재드래곤st 성훈님………아………

나 진짜 어버버버버 하면서 꾸역꾸역 들었는데 멱살캐리 해주시는 성훈님이 '입 벌려 코딩들어간다' 3번째 수업 끝날때쯤 뭔지 모르겠던 아다리 맞춰지면서 '유레카!' 도파민 터지는 순간도 오고. 언제든 여기 있어요 채팅방에 열정 가득한 사람들 보며 매주 진짜 힘 많이 얻었다. 혼자 했음 벌써 ㅈㅈ치고 떨어져 나갔을지도……..아니 그랬겠지…..

어찌되던 밀려 밀려 앞으로 나아가고 있는 나를 보고 싶다면 이거슨 운명! 에너지를 많이 타는 나라서 진짜 좋은 사람들이랑 같이 바이브코딩 하는 시간이 좋았다. 다 받아줄게 들어와 하는 선생님과 술 안마셔도 텐션 높은 사람들이 함께하는 모임을 원한다면 이 집이 맛집입나다. 추천!`
    }
  ]

  const studentApps = [
    {
      name: "단어장 앱",
      description: "수강생 제작 - 영어 단어 학습 앱",
      images: [
        "/images/survey/word_app/word1.png",
        "/images/survey/word_app/word2.png",
        "/images/survey/word_app/word3.png",
        "/images/survey/word_app/word4.png",
        "/images/survey/word_app/word5.png",
        "/images/survey/word_app/word6.png",
        "/images/survey/word_app/word7.png",
        "/images/survey/word_app/word8.png",
        "/images/survey/word_app/word9.png",
        "/images/survey/word_app/word10.png",
        "/images/survey/word_app/word11.png",
        "/images/survey/word_app/word12.png",
        "/images/survey/word_app/word13.png"
      ]
    },
    {
      name: "코치 도감",
      description: "수강생 제작 - 코치 도감 앱",
      images: [
        "/images/survey/dogam/do_gam.png",
        "/images/survey/dogam/do_gam2.png"
      ]
    },
    {
      name: "원앱",
      description: "수강생 제작 - 생산성 관리 앱",
      images: [
        "/images/survey/one_app/One_01.png",
        "/images/survey/one_app/One_02.png",
        "/images/survey/one_app/One_03.png",
        "/images/survey/one_app/One_04.png",
        "/images/survey/one_app/One_05.png",
        "/images/survey/one_app/One_06.png",
        "/images/survey/one_app/One_07.png",
        "/images/survey/one_app/One_08.png",
        "/images/survey/one_app/One_09.png"
      ]
    },
    {
      name: "플랜 앱",
      description: "수강생 제작 - 일정 관리 플랫폼",
      images: [
        "/images/survey/plan/plan.png",
        "/images/survey/plan/plan2.png",
        "/images/survey/plan/plan3.png",
        "/images/survey/plan/plan4.png",
        "/images/survey/plan/plan5.png",
        "/images/survey/plan/plan6.png",
        "/images/survey/plan/plan7.png",
        "/images/survey/plan/plan8.png"
      ]
    }
  ]

  const curriculumData = [
    {
      week: 1,
      title: "1일차: 바이브 코딩 입문부터 Flutter 개발까지",
      goal: "코딩/개발에 대한 최소한의 이해 & 디자인을 페이지로 전환",
      assignment: "디자인/기획문서 작성 & 부가기능 생성",
      topics: [
        "바이브 코딩 입문",
        "개발을 위한 필수 도구 및 설정",
        "프론트엔드, 백엔드 기초",
        "아키텍처 기본 개념",
        "기획하기",
        "규칙 파일",
        "Flutter 환경 구성 및 기초 개발",
        "상태관리",
        "기획 문서를 기반으로 실제 개발 시작"
      ]
    },
    {
      week: 2,
      title: "2일차: 데이터베이스 & 백엔드 연동",
      goal: "Supabase를 활용한 실전 백엔드 구축 및 보안 설정",
      assignment: "데이터베이스 연동 및 보안 설정 완료",
      topics: [
        "Supabase 실전 구성",
        "Supabase",
        "데이터베이스 용어 정리",
        "보안",
        "Front end & Back end 연결",
        "MCP",
        "테이블 정의 만들기"
      ]
    }
  ]

  // 이미지 갤러리 스와이프 핸들러
  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStart(e.targetTouches[0].clientX)
  }

  const handleTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX)
  }

  const handleTouchEnd = () => {
    if (touchStart - touchEnd > 50) {
      // 왼쪽으로 스와이프 → 다음 이미지
      handleNextImage()
    }

    if (touchStart - touchEnd < -50) {
      // 오른쪽으로 스와이프 → 이전 이미지
      handlePrevImage()
    }
  }

  // 후기 슬라이드 네비게이션 (데스크톱 2개, 모바일 1개)
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  const testimonialsPerPage = isMobile ? 1 : 2
  const totalPages = Math.ceil(testimonials.length / testimonialsPerPage)
  const appsPerSlide = isMobile ? 1 : 3
  const totalAppSlides = Math.ceil(studentApps.length / appsPerSlide)

  // 화면 크기 변경 시 currentTestimonial 인덱스 조정
  useEffect(() => {
    if (currentTestimonial >= totalPages) {
      setCurrentTestimonial(0)
    }
  }, [totalPages, currentTestimonial])

  // 화면 크기 변경 시 currentAppSlide 인덱스 조정
  useEffect(() => {
    if (currentAppSlide >= totalAppSlides) {
      setCurrentAppSlide(0)
    }
  }, [totalAppSlides, currentAppSlide])

  const handlePrevTestimonial = () => {
    setCurrentTestimonial(prev =>
      prev === 0 ? totalPages - 1 : prev - 1
    )
  }

  const handleNextTestimonial = () => {
    setCurrentTestimonial(prev =>
      prev === totalPages - 1 ? 0 : prev + 1
    )
  }

  // 후기 스와이프 핸들러
  const handleTestimonialTouchStart = (e: React.TouchEvent) => {
    setTestimonialTouchStart(e.targetTouches[0].clientX)
  }

  const handleTestimonialTouchMove = (e: React.TouchEvent) => {
    setTestimonialTouchEnd(e.targetTouches[0].clientX)
  }

  const handleTestimonialTouchEnd = () => {
    if (testimonialTouchStart - testimonialTouchEnd > 50) {
      handleNextTestimonial()
    }
    if (testimonialTouchStart - testimonialTouchEnd < -50) {
      handlePrevTestimonial()
    }
  }

  // 더보기/접기 토글
  const handleToggleExpand = (index: number) => {
    setExpandedTestimonials(prev => {
      const newSet = new Set(prev)
      if (newSet.has(index)) {
        newSet.delete(index)
      } else {
        newSet.add(index)
      }
      return newSet
    })
  }

  // 커리큘럼 터치 핸들러
  const handleCurriculumTouchStart = (e: React.TouchEvent) => {
    setCurriculumTouchStart(e.targetTouches[0].clientX)
  }

  const handleCurriculumTouchMove = (e: React.TouchEvent) => {
    setCurriculumTouchEnd(e.targetTouches[0].clientX)
  }

  const handleCurriculumTouchEnd = () => {
    if (curriculumTouchStart - curriculumTouchEnd > 50) {
      // 왼쪽으로 스와이프 → 다음 주차
      setCurrentWeek(prev => Math.min(2, prev + 1))
    }
    if (curriculumTouchStart - curriculumTouchEnd < -50) {
      // 오른쪽으로 스와이프 → 이전 주차
      setCurrentWeek(prev => Math.max(1, prev - 1))
    }
  }

  // 커리큘럼 마우스 드래그 핸들러
  const handleCurriculumMouseDown = (e: React.MouseEvent) => {
    setCurriculumMouseDown(true)
    setCurriculumMouseStart(e.clientX)
    setCurriculumMouseEnd(e.clientX)
  }

  const handleCurriculumMouseMove = (e: React.MouseEvent) => {
    if (!curriculumMouseDown) return
    setCurriculumMouseEnd(e.clientX)
  }

  const handleCurriculumMouseUp = () => {
    if (!curriculumMouseDown) return

    const distance = curriculumMouseStart - curriculumMouseEnd

    if (Math.abs(distance) > 50) {
      if (distance > 0) {
        // 왼쪽으로 드래그 → 다음 주차
        setCurrentWeek(prev => Math.min(2, prev + 1))
      } else {
        // 오른쪽으로 드래그 → 이전 주차
        setCurrentWeek(prev => Math.max(1, prev - 1))
      }
    }

    setCurriculumMouseDown(false)
  }

  const handleCurriculumMouseLeave = () => {
    if (curriculumMouseDown) {
      setCurriculumMouseDown(false)
    }
  }

  // 앱 슬라이드 핸들러
  const handlePrevAppSlide = () => {
    setCurrentAppSlide(prev =>
      prev === 0 ? totalAppSlides - 1 : prev - 1
    )
  }

  const handleNextAppSlide = () => {
    setCurrentAppSlide(prev =>
      prev === totalAppSlides - 1 ? 0 : prev + 1
    )
  }

  const handleAppTouchStart = (e: React.TouchEvent) => {
    setAppTouchStart(e.targetTouches[0].clientX)
    setAppTouchEnd(e.targetTouches[0].clientX)
  }

  const handleAppTouchMove = (e: React.TouchEvent) => {
    setAppTouchEnd(e.targetTouches[0].clientX)
  }

  const handleAppTouchEnd = () => {
    const distance = appTouchStart - appTouchEnd

    // 50px 이상 스와이프한 경우에만 슬라이드 이동
    if (Math.abs(distance) > 50) {
      if (distance > 0) {
        handleNextAppSlide()
      } else {
        handlePrevAppSlide()
      }
    }
    // 거리가 짧으면 탭으로 간주하여 클릭 이벤트가 정상 작동하도록 함
  }

  // 이미지 네비게이션 핸들러
  const handlePrevImage = () => {
    const currentApp = studentApps[currentAppIndex]

    if (currentImageIndexInApp > 0) {
      // 같은 앱 내에서 이전 이미지
      const newIndex = currentImageIndexInApp - 1
      setCurrentImageIndexInApp(newIndex)
      setSelectedImage(currentApp.images[newIndex])
    } else {
      // 이전 앱의 마지막 이미지로 이동
      const prevAppIndex = (currentAppIndex - 1 + studentApps.length) % studentApps.length
      const prevApp = studentApps[prevAppIndex]
      const lastImageIndex = prevApp.images.length - 1

      setCurrentAppIndex(prevAppIndex)
      setCurrentImageIndexInApp(lastImageIndex)
      setSelectedImage(prevApp.images[lastImageIndex])
    }
  }

  const handleNextImage = () => {
    const currentApp = studentApps[currentAppIndex]

    if (currentImageIndexInApp < currentApp.images.length - 1) {
      // 같은 앱 내에서 다음 이미지
      const newIndex = currentImageIndexInApp + 1
      setCurrentImageIndexInApp(newIndex)
      setSelectedImage(currentApp.images[newIndex])
    } else {
      // 다음 앱의 첫 번째 이미지로 이동
      const nextAppIndex = (currentAppIndex + 1) % studentApps.length

      setCurrentAppIndex(nextAppIndex)
      setCurrentImageIndexInApp(0)
      setSelectedImage(studentApps[nextAppIndex].images[0])
    }
  }

  // ESC 키 및 화살표 키 네비게이션
  useEffect(() => {
    if (!selectedImage) return

    const handleKeyboard = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setSelectedImage(null)
      if (e.key === 'ArrowLeft') handlePrevImage()
      if (e.key === 'ArrowRight') handleNextImage()
    }

    window.addEventListener('keydown', handleKeyboard)
    return () => window.removeEventListener('keydown', handleKeyboard)
  }, [selectedImage, currentAppIndex, currentImageIndexInApp])

  // 모달 오픈 시 body 스크롤 방지
  useEffect(() => {
    if (selectedImage) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }

    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [selectedImage])

  return (
    <div className="min-h-screen bg-white">
      {/* Header Section */}
      <header className="w-full bg-white border-b border-gray-200">
        <div className="max-w-2xl mx-auto px-5 py-8 text-center">
          <h1 className="text-3xl font-bold text-black mb-8">Ky Dev Studio</h1>
          <h2 className="text-2xl font-bold text-black mb-4">주말 2일 바이브 코딩 집중 강의</h2>
          <p className="text-gray-700 leading-relaxed mb-6">
            시청역 근처에서 진행되는 실무 중심의 오프라인 앱 개발 강의입니다.<br />
            주말 2일 집중 과정을 통해 앱 개발의 핵심을 배우고 직접 제작해보세요.
          </p>
          <Button
            onClick={handleStartClick}
            className="bg-black text-white hover:opacity-90 px-6 py-3 rounded-lg transition-all duration-300"
          >
            수강 신청하기
          </Button>
        </div>
      </header>

      {/* Features Section */}
      <section className="py-8">
        <div className="max-w-2xl mx-auto px-5">
          <Card className="bg-gray-50 border border-gray-200 rounded-lg p-8">
            <h3 className="text-xl font-bold text-black mb-6 text-center">강의 특징</h3>
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <CircleCheckBig className="size-5 text-green-600 flex-shrink-0" />
                <p className="text-gray-700">주말 2일 집중 과정 (토요일, 일요일 10:00-22:00)</p>
              </div>
              <div className="flex items-center gap-3">
                <CircleCheckBig className="size-5 text-green-600 flex-shrink-0" />
                <p className="text-gray-700">11월 15일-16일 / 22일-23일 / 29일-30일 중 선택</p>
              </div>
              <div className="flex items-center gap-3">
                <CircleCheckBig className="size-5 text-green-600 flex-shrink-0" />
                <p className="text-gray-700">일정 조율 후 최대 4명씩 초소수 정예 진행</p>
              </div>
              <div className="flex items-center gap-3">
                <CircleCheckBig className="size-5 text-green-600 flex-shrink-0" />
                <p className="text-gray-700">수강료 <span className="font-bold text-green-600">0원 (무료)</span></p>
              </div>
              <div className="flex items-center gap-3">
                <CircleCheckBig className="size-5 text-green-600 flex-shrink-0" />
                <p className="text-gray-700">실무진과 함께하는 hands-on 프로젝트 개발</p>
              </div>
              <div className="flex items-center gap-3">
                <CircleCheckBig className="size-5 text-green-600 flex-shrink-0" />
                <p className="text-gray-700">편안한 분위기에서 자유롭게 질문하고 소통</p>
              </div>
              <div className="flex items-center gap-3">
                <CircleCheckBig className="size-5 text-green-600 flex-shrink-0" />
                <p className="text-gray-700">수강생 간 네트워킹 및 커넥션 형성</p>
              </div>
              <div className="flex items-center gap-3">
                <CircleCheckBig className="size-5 text-green-600 flex-shrink-0" />
                <p className="text-gray-700">완료 후 커뮤니티를 통한 지속적인 정보 공유 및 모임</p>
              </div>
              <div className="flex items-center gap-3">
                <CircleCheckBig className="size-5 text-green-600 flex-shrink-0" />
                <p className="text-gray-700">한번 들으면 평생 소장 가능한 강의 가이드라인 제공</p>
              </div>
              <div className="flex items-center gap-3">
                <CircleCheckBig className="size-5 text-green-600 flex-shrink-0" />
                <p className="text-gray-700">개인 성장과 포트폴리오 완성 보장</p>
              </div>
            </div>
          </Card>
        </div>
      </section>

      {/* Student Success Section */}
      <section className="py-8 border-t border-gray-200">
        <div className="max-w-2xl mx-auto px-5">
          <h3 className="text-xl font-bold text-black mb-8 text-center">수강생 성과 및 후기</h3>

          {/* App Examples Slider - 3개씩 보이는 슬라이드 */}
          <div className="mb-12 relative">
            <div
              className="overflow-hidden"
              onTouchStart={handleAppTouchStart}
              onTouchMove={handleAppTouchMove}
              onTouchEnd={handleAppTouchEnd}
            >
              <div
                className="flex transition-transform duration-300 ease-in-out"
                style={{ transform: `translateX(-${currentAppSlide * 100}%)` }}
              >
                {Array.from({ length: totalAppSlides }).map((_, slideIdx) => {
                  const startIdx = slideIdx * appsPerSlide
                  const slideApps = studentApps.slice(startIdx, startIdx + appsPerSlide)

                  return (
                    <div key={slideIdx} className="min-w-full flex gap-2 md:gap-3">
                      {slideApps.map((app, idx) => {
                        const appIndex = startIdx + idx
                        return (
                          <div key={appIndex} className={`${isMobile ? 'flex-1' : 'w-1/3 flex-shrink-0'} px-1`}>
                            <Card className="bg-white border border-gray-200 rounded-lg p-3 shadow-sm hover:shadow-lg transition-all duration-300">
                              <div
                                className="cursor-pointer"
                                onClick={(e) => {
                                  e.stopPropagation()
                                  setSelectedImage(app.images[0])
                                  setCurrentAppIndex(appIndex)
                                  setCurrentImageIndexInApp(0)
                                }}
                                onTouchEnd={(e) => {
                                  // 스와이프가 아닌 탭인 경우에만 이미지 열기
                                  const distance = Math.abs(appTouchStart - appTouchEnd)
                                  if (distance < 10) {
                                    e.stopPropagation()
                                    setSelectedImage(app.images[0])
                                    setCurrentAppIndex(appIndex)
                                    setCurrentImageIndexInApp(0)
                                  }
                                }}
                              >
                                <Image
                                  src={app.images[0]}
                                  alt={app.name}
                                  width={400}
                                  height={400}
                                  className="w-full aspect-square object-cover rounded-lg mb-3 hover:scale-105 transition-transform duration-300"
                                />
                              </div>
                              <p className="text-sm text-gray-800 font-medium">{app.description}</p>
                            </Card>
                          </div>
                        )
                      })}
                    </div>
                  )
                })}
              </div>
            </div>

            {/* Navigation Buttons - Desktop only */}
            {totalAppSlides > 1 && (
              <>
                <button
                  onClick={handlePrevAppSlide}
                  className="hidden md:block absolute left-0 top-1/2 -translate-y-1/2 -translate-x-12 sm:-translate-x-16 bg-white hover:bg-gray-100 text-black p-2 sm:p-3 rounded-full shadow-lg transition-all duration-200 z-10"
                >
                  <span className="text-lg sm:text-xl">◀</span>
                </button>
                <button
                  onClick={handleNextAppSlide}
                  className="hidden md:block absolute right-0 top-1/2 -translate-y-1/2 translate-x-12 sm:translate-x-16 bg-white hover:bg-gray-100 text-black p-2 sm:p-3 rounded-full shadow-lg transition-all duration-200 z-10"
                >
                  <span className="text-lg sm:text-xl">▶</span>
                </button>
              </>
            )}

            {/* Dot Indicators */}
            {totalAppSlides > 1 && (
              <div className="flex justify-center gap-2 mt-6">
                {Array.from({ length: totalAppSlides }).map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => setCurrentAppSlide(idx)}
                    className={`h-2 rounded-full transition-all ${
                      idx === currentAppSlide
                        ? 'bg-black w-8'
                        : 'bg-gray-300 hover:bg-gray-400 w-2'
                    }`}
                  />
                ))}
              </div>
            )}
          </div>

          {/* Testimonials Slider */}
          <div className="relative max-w-4xl mx-auto mb-8">
            <div
              className="overflow-hidden rounded-lg"
              onTouchStart={handleTestimonialTouchStart}
              onTouchMove={handleTestimonialTouchMove}
              onTouchEnd={handleTestimonialTouchEnd}
            >
              <div
                className="flex transition-transform duration-300 ease-in-out"
                style={{ transform: `translateX(-${currentTestimonial * 100}%)` }}
              >
                {Array.from({ length: totalPages }).map((_, pageIdx) => {
                  const startIdx = pageIdx * testimonialsPerPage
                  const pageTestimonials = testimonials.slice(startIdx, startIdx + testimonialsPerPage)

                  return (
                    <div key={pageIdx} className="min-w-full flex gap-4 px-2">
                      {pageTestimonials.map((testimonial, idx) => {
                        const actualIdx = startIdx + idx
                        const isExpanded = expandedTestimonials.has(actualIdx)
                        // 3줄 이상인지 체크 (대략적으로 줄바꿈 개수와 텍스트 길이로 판단)
                        const lineCount = testimonial.text.split('\n').length
                        const estimatedLines = Math.ceil(testimonial.text.length / 50) // 한 줄당 약 50자
                        const needsExpansion = lineCount > 3 || estimatedLines > 3

                        return (
                          <div key={actualIdx} className="flex-1">
                            <Card className="bg-white border border-gray-200 rounded-lg p-5 shadow-sm h-[200px] flex flex-col">
                              <div className="mb-2">
                                <p className="font-bold text-black text-base">{testimonial.name}</p>
                                <p className="text-xs text-gray-600">{testimonial.role}</p>
                              </div>
                              <div
                                className="text-gray-700 text-xs leading-relaxed flex-1 overflow-y-auto"
                                onTouchStart={(e) => {
                                  // 스크롤 가능한 경우에만 이벤트 전파 차단
                                  const target = e.currentTarget
                                  if (target.scrollHeight > target.clientHeight) {
                                    e.stopPropagation()
                                  }
                                }}
                                onTouchMove={(e) => {
                                  const target = e.currentTarget
                                  if (target.scrollHeight > target.clientHeight) {
                                    e.stopPropagation()
                                  }
                                }}
                              >
                                <div className={`whitespace-pre-line ${!isExpanded && needsExpansion ? 'line-clamp-3' : ''}`}>
                                  {testimonial.text}
                                </div>
                                {needsExpansion && (
                                  <button
                                    onClick={() => handleToggleExpand(actualIdx)}
                                    className="mt-2 text-blue-600 hover:text-blue-700 hover:underline text-xs font-medium block"
                                  >
                                    {isExpanded ? '접기' : '더보기'}
                                  </button>
                                )}
                              </div>
                            </Card>
                          </div>
                        )
                      })}
                    </div>
                  )
                })}
              </div>
            </div>

            {/* Navigation Buttons - Desktop only */}
            <button
              onClick={handlePrevTestimonial}
              className="hidden md:block absolute left-0 top-1/2 -translate-y-1/2 -translate-x-12 sm:-translate-x-16 bg-white hover:bg-gray-100 text-black p-2 sm:p-3 rounded-full shadow-lg transition-all duration-200 z-10"
            >
              <span className="text-lg sm:text-xl">◀</span>
            </button>
            <button
              onClick={handleNextTestimonial}
              className="hidden md:block absolute right-0 top-1/2 -translate-y-1/2 translate-x-12 sm:translate-x-16 bg-white hover:bg-gray-100 text-black p-2 sm:p-3 rounded-full shadow-lg transition-all duration-200 z-10"
            >
              <span className="text-lg sm:text-xl">▶</span>
            </button>

            {/* Dot Indicators */}
            <div className="flex justify-center gap-2 mt-6">
              {Array.from({ length: totalPages }).map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setCurrentTestimonial(idx)}
                  className={`h-2 rounded-full transition-all ${
                    idx === currentTestimonial
                      ? 'bg-black w-8'
                      : 'bg-gray-300 hover:bg-gray-400 w-2'
                  }`}
                />
              ))}
            </div>
          </div>

        </div>
      </section>

      {/* Lightbox Modal */}
      {selectedImage && (
        <div
          className="fixed inset-0 z-50 bg-black bg-opacity-90 flex items-center justify-center p-2 sm:p-4"
          onClick={() => setSelectedImage(null)}
        >
          <button
            className="absolute top-2 right-2 sm:top-4 sm:right-4 text-2xl sm:text-4xl text-white hover:text-gray-300 z-10"
            onClick={() => setSelectedImage(null)}
          >
            ✕
          </button>

          <div className="relative max-w-4xl w-full" onClick={(e) => e.stopPropagation()}>
            <div
              className="relative w-full max-h-[70vh] sm:max-h-[80vh] flex items-center justify-center"
              onTouchStart={handleTouchStart}
              onTouchMove={handleTouchMove}
              onTouchEnd={handleTouchEnd}
            >
              <Image
                src={selectedImage}
                alt="앱 상세 이미지"
                width={1200}
                height={1200}
                className="max-w-full max-h-[70vh] sm:max-h-[80vh] w-auto h-auto object-contain rounded-lg"
              />
            </div>

            {/* Navigation Buttons */}
            <button
              className="absolute left-1 sm:left-4 top-1/2 -translate-y-1/2 bg-white bg-opacity-20 hover:bg-opacity-30 active:bg-opacity-40 text-white p-2 sm:p-3 rounded-full transition-all duration-200 touch-manipulation"
              onClick={handlePrevImage}
            >
              <span className="text-lg sm:text-xl">◀</span>
            </button>

            <button
              className="absolute right-1 sm:right-4 top-1/2 -translate-y-1/2 bg-white bg-opacity-20 hover:bg-opacity-30 active:bg-opacity-40 text-white p-2 sm:p-3 rounded-full transition-all duration-200 touch-manipulation"
              onClick={handleNextImage}
            >
              <span className="text-lg sm:text-xl">▶</span>
            </button>

            {/* Image Counter Display */}
            <div className="absolute bottom-2 sm:bottom-4 left-1/2 -translate-x-1/2 bg-black bg-opacity-70 text-white px-3 py-2 sm:px-6 sm:py-3 rounded-lg">
              <div className="text-center">
                <p className="text-sm sm:text-base font-bold">{studentApps[currentAppIndex].name}</p>
                <p className="text-xs sm:text-sm text-gray-300">
                  {currentImageIndexInApp + 1} / {studentApps[currentAppIndex].images.length}
                </p>
              </div>
            </div>

            {/* Dot Indicators */}
            <div className="absolute bottom-14 sm:bottom-20 left-1/2 -translate-x-1/2 flex gap-1 sm:gap-2 max-w-[90%] overflow-x-auto px-2 scrollbar-hide">
              {studentApps[currentAppIndex].images.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => {
                    setCurrentImageIndexInApp(idx)
                    setSelectedImage(studentApps[currentAppIndex].images[idx])
                  }}
                  className={`h-1.5 sm:h-2 rounded-full transition-all flex-shrink-0 touch-manipulation ${
                    idx === currentImageIndexInApp
                      ? 'bg-white w-6 sm:w-8'
                      : 'bg-gray-400 hover:bg-gray-300 w-1.5 sm:w-2'
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Course Details Section */}
      <section className="py-8 border-t border-gray-200">
        <div className="max-w-2xl mx-auto px-5">
          <h3 className="text-xl font-bold text-black mb-8 text-center">강의 상세 정보</h3>

          <div className="grid md:grid-cols-2 gap-6 mb-8">
            <Card className="bg-white border border-gray-200 rounded-lg p-6">
              <div className="flex items-center gap-3 mb-4">
                <Clock className="size-6 text-black" />
                <h4 className="font-bold text-black">수업 일정</h4>
              </div>
              <ul className="space-y-2 text-gray-700 text-sm">
                <li>• 주말 2일 집중 과정 (토요일, 일요일)</li>
                <li>• 수업 시간: 오전 10시~오후 10시 (각 12시간)</li>
                <li>• 일정 선택: 11월 15일-16일 / 22일-23일 / 29일-30일</li>
                <li>• 시청역 도보 5분 거리</li>
                <li>• 일정별 최대 4명씩 초소수 정예 진행</li>
                <li>• 수강료: <span className="font-bold text-green-600">0원 (무료)</span></li>
              </ul>
            </Card>

            <Card className="bg-white border border-gray-200 rounded-lg p-6">
              <div className="flex items-center gap-3 mb-4">
                <Target className="size-6 text-black" />
                <h4 className="font-bold text-black">학습 목표</h4>
              </div>
              <ul className="space-y-2 text-gray-700 text-sm">
                <li>• 바이브 코딩으로 웹 개발 기초</li>
                <li>• 프론트엔드 디자인 및 UI/UX</li>
                <li>• Supabase를 활용한 백엔드 구축</li>
                <li>• API 연동 및 실제 서비스 배포</li>
              </ul>
            </Card>

            <Card className="bg-white border border-gray-200 rounded-lg p-6">
              <div className="flex items-center gap-3 mb-4">
                <Users className="size-6 text-black" />
                <h4 className="font-bold text-black">강사 소개</h4>
              </div>
              <p className="text-gray-700 text-sm leading-relaxed">
                현직 시니어 개발자로 5년+ 앱 개발 경력을 보유하고 있으며, 다수의 성공적인 앱 프로젝트를 이끌어온 실무 전문가입니다.
              </p>
            </Card>

            <Card className="bg-white border border-gray-200 rounded-lg p-6">
              <div className="flex items-center gap-3 mb-4">
                <Award className="size-6 text-black" />
                <h4 className="font-bold text-black">준비사항</h4>
              </div>
              <ul className="space-y-2 text-gray-700 text-sm">
                <li>• 노트북 지참 (Mac/Windows 무관)</li>
                <li>• 기본적인 컴퓨터 활용 능력</li>
                <li>• 프로그래밍 경험 불필요</li>
                <li>• 적극적인 학습 의지</li>
              </ul>
            </Card>
          </div>

          {/* Curriculum Slider */}
          <Card className="bg-gray-50 border border-gray-200 rounded-lg p-6">
            <div className="flex items-center justify-between mb-6">
              <h4 className="font-bold text-black text-center flex-1">2일 과정 커리큘럼</h4>
              <div className="flex gap-2">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setCurrentWeek(Math.max(1, currentWeek - 1))}
                  disabled={currentWeek === 1}
                  className="p-2"
                >
                  <ChevronLeft className="size-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setCurrentWeek(Math.min(2, currentWeek + 1))}
                  disabled={currentWeek === curriculumData.length}
                  className="p-2"
                >
                  <ChevronRight className="size-4" />
                </Button>
              </div>
            </div>

            <div className="min-h-[400px] overflow-hidden">
              <div
                className="flex transition-transform duration-300 ease-in-out cursor-grab active:cursor-grabbing"
                style={{ transform: `translateX(-${(currentWeek - 1) * 100}%)` }}
                onTouchStart={handleCurriculumTouchStart}
                onTouchMove={handleCurriculumTouchMove}
                onTouchEnd={handleCurriculumTouchEnd}
                onMouseDown={handleCurriculumMouseDown}
                onMouseMove={handleCurriculumMouseMove}
                onMouseUp={handleCurriculumMouseUp}
                onMouseLeave={handleCurriculumMouseLeave}
              >
                {curriculumData.map((curriculum) => (
                  <div
                    key={curriculum.week}
                    className="w-full flex-shrink-0 px-4"
                    style={{ minWidth: '100%', maxWidth: '100%', boxSizing: 'border-box' }}
                  >
                  <div className="mb-6 max-w-full">
                    <div className="flex flex-col sm:flex-row sm:items-start sm:justify-start gap-4 mb-4">
                      <div className="flex gap-4 items-start">
                        <div className="bg-black text-white rounded-full size-10 flex items-center justify-center text-lg flex-shrink-0">
                          {curriculum.week}
                        </div>
                        <h5 className="font-bold text-black text-base sm:hidden break-words overflow-wrap-anywhere">{curriculum.title}</h5>
                      </div>
                      <div className="flex-1 min-w-0 w-full">
                        <h5 className="font-bold text-black text-xl mb-2 hidden sm:block break-words text-left">{curriculum.title}</h5>
                        <div className="bg-white rounded-lg p-4 text-left w-full">
                          <p className="text-sm text-gray-700 mb-2 break-words">
                            <span className="font-medium">목표:</span> {curriculum.goal}
                          </p>
                          <p className="text-sm text-gray-700 break-words">
                            <span className="font-medium">과제:</span> {curriculum.assignment}
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <h6 className="font-medium text-black mb-3">학습 내용</h6>
                      <div className="grid gap-2">
                        {curriculum.topics.map((topic, index) => (
                          <div key={index} className="flex items-center gap-2">
                            <div className="size-2 bg-black rounded-full flex-shrink-0"></div>
                            <span className="text-sm text-gray-700">{topic}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex justify-center mt-4">
              <div className="flex gap-2">
                {Array.from({ length: 2 }, (_, i) => i + 1).map((week) => (
                  <button
                    key={week}
                    onClick={() => setCurrentWeek(week)}
                    className={`size-3 rounded-full transition-colors ${
                      currentWeek === week ? 'bg-black' : 'bg-gray-300'
                    } ${week > curriculumData.length ? 'opacity-30' : ''}`}
                    disabled={week > curriculumData.length}
                  />
                ))}
              </div>
            </div>
          </Card>
        </div>
      </section>

      {/* Survey CTA Section */}
      <section className="py-8 border-t border-gray-200 bg-gray-50">
        <div className="max-w-2xl mx-auto px-5 text-center">
          <h3 className="text-xl font-bold text-black mb-4">수강 신청</h3>
          <p className="text-gray-700 mb-6 leading-relaxed">
            간단한 설문을 통해 수강 신청을 진행해주세요.<br />
            예상 소요시간: 3-5분
          </p>
          <Button
            onClick={handleStartClick}
            className="bg-black text-white hover:opacity-90 px-8 py-4 rounded-lg transition-all duration-300 mb-4"
          >
            설문 시작
          </Button>
          <p className="text-xs text-gray-500">
            개인정보는 수강 신청 목적으로만 사용되며, 안전하게 보호됩니다.
          </p>

          <div className="mt-8 pt-6 border-t border-gray-200">
            <img
              src="https://images.unsplash.com/photo-1514996550219-62672472d03b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2JpbGUlMjBhcHAlMjBkZXZlbG9wbWVudCUyMHdvcmtzcGFjZXxlbnwxfHx8fDE3NTgwOTE1NTl8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
              alt="앱 개발 워크스페이스"
              className="w-full max-w-md mx-auto aspect-video object-cover rounded-lg shadow-sm"
            />
            <p className="text-sm text-gray-600 mt-3">함께 만들어갈 앱 개발의 여정</p>
          </div>
        </div>
      </section>
    </div>
  )
}