/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Stethoscope, 
  ClipboardCheck, 
  Building2, 
  ArrowRight, 
  X,
  RefreshCw,
  Sparkles,
  Lightbulb,
  Activity,
  FileText,
  Mic,
  ShieldAlert,
  Users,
  MessageSquare,
  Bell,
  Calendar,
  PackageSearch,
  Languages,
  FileSearch,
  Clock,
  HeartPulse,
  Dna,
  MonitorPlay,
  Thermometer,
  Utensils,
  Zap,
  ShieldCheck,
  UserPlus,
  BarChart3,
  Camera
} from 'lucide-react';

type Occupation = 'medical' | 'nurse' | 'admin';

interface IdeaCard {
  id: string;
  occupation: Occupation;
  title: string;
  painPoint: string;
  improvement: string;
  impact: string;
  resource: string;
  icon: React.ReactNode;
}

const ideaPool: IdeaCard[] = [
  // Medical (15 items)
  {
    id: 'm1',
    occupation: 'medical',
    title: "의학 용어 쉬운 설명 변환기",
    painPoint: "회진 때 환자분들께 어려운 의학 용어를 설명하느라 시간이 너무 많이 걸려요.",
    improvement: "Gemini가 어려운 진단명이나 수술명을 초등학생도 이해할 수 있는 쉬운 비유로 바꿔줍니다.",
    impact: "환자의 이해도가 높아지고, 설명에 드는 에너지가 절반으로 줄어듭니다.",
    resource: "표준 의학 용어집, 환자 설명용 팸플릿",
    icon: <Languages className="w-8 h-8" />
  },
  {
    id: 'm2',
    occupation: 'medical',
    title: "타 병원 처방전 매칭봇",
    painPoint: "외부 병원 약을 가져오시면 우리 병원 약이랑 성분이 같은지 일일이 대조하기 번거로워요.",
    improvement: "처방전 사진을 찍으면 Gemini가 우리 병원 약제 목록에서 동일 성분 약을 즉시 찾아줍니다.",
    impact: "약물 대조 시간이 획기적으로 단축되고 처방 오류를 방지할 수 있습니다.",
    resource: "원내 약제 목록, 식약처 의약품 데이터베이스",
    icon: <PackageSearch className="w-8 h-8" />
  },
  {
    id: 'm3',
    occupation: 'medical',
    title: "회진 전 환자 상태 요약 요정",
    painPoint: "회진 전 수십 명의 환자 차트를 일일이 열어보고 밤새 바뀐 점을 확인하기가 너무 벅차요.",
    improvement: "Gemini가 밤사이 기록된 간호 기록과 검사 결과를 분석해 '주의해야 할 환자 3명'을 요약해줍니다.",
    impact: "회진 준비 시간이 짧아지고, 중요한 환자 상태 변화를 놓치지 않게 됩니다.",
    resource: "EMR 간호 기록, 진단 검사 결과 데이터",
    icon: <Sparkles className="w-8 h-8" />
  },
  {
    id: 'm4',
    occupation: 'medical',
    title: "수술 동의서 핵심 요약봇",
    painPoint: "수술 동의서가 너무 길고 복잡해서 환자들이 잘 안 읽고 서명하는 경우가 많아요.",
    improvement: "복잡한 동의서 내용을 Gemini가 '꼭 알아야 할 3가지 리스크'로 요약해 환자에게 설명해줍니다.",
    impact: "환자의 알 권리가 보장되고, 나중에 발생할 수 있는 의료 분쟁을 예방합니다.",
    resource: "수술별 표준 동의서 양식",
    icon: <FileText className="w-8 h-8" />
  },
  {
    id: 'm5',
    occupation: 'medical',
    title: "최신 가이드라인 퀵 검색",
    painPoint: "희귀 질환이나 복잡한 케이스의 최신 치료 가이드라인을 진료 중에 찾기가 힘들어요.",
    improvement: "질환명만 입력하면 Gemini가 최신 학회 가이드라인에서 핵심 치료 경로를 즉시 찾아줍니다.",
    impact: "근거 기반 진료(EBM)를 더 쉽고 빠르게 실천할 수 있습니다.",
    resource: "국내외 주요 학회 가이드라인 PDF",
    icon: <FileSearch className="w-8 h-8" />
  },
  {
    id: 'm6',
    occupation: 'medical',
    title: "검사 결과 이상치 해석기",
    painPoint: "수많은 검사 결과 중 미세하게 튀는 수치들이 어떤 의미인지 가끔 헷갈릴 때가 있어요.",
    improvement: "Gemini가 환자의 과거 수치와 비교하여 현재 이상치가 임상적으로 어떤 의미인지 분석해줍니다.",
    impact: "진단의 정확도가 높아지고, 초기 질병 발견 확률이 올라갑니다.",
    resource: "진단검사의학 참고치 가이드",
    icon: <Activity className="w-8 h-8" />
  },
  {
    id: 'm7',
    occupation: 'medical',
    title: "맞춤형 식단 제한 안내봇",
    painPoint: "당뇨, 신부전 등 복합 질환 환자에게 먹어도 되는 것과 안 되는 것을 설명하기 복잡해요.",
    improvement: "환자의 질환을 입력하면 Gemini가 오늘 병원 식단 중 주의해야 할 메뉴를 골라줍니다.",
    impact: "환자의 영양 관리가 정교해지고 치료 효과가 극대화됩니다.",
    resource: "임상 영양 가이드라인",
    icon: <Utensils className="w-8 h-8" />
  },
  {
    id: 'm8',
    occupation: 'medical',
    title: "다학제 진료 일정 조율사",
    painPoint: "여러 과 교수님들의 시간을 맞춰 협진 일정을 잡는 게 행정적으로 너무 소모적이에요.",
    improvement: "Gemini가 관련 교수님들의 스케줄을 분석해 가장 최적의 협진 시간을 자동으로 제안합니다.",
    impact: "협진 결정부터 실행까지의 시간이 단축되어 환자 만족도가 올라갑니다.",
    resource: "교수별 진료 및 수술 스케줄표",
    icon: <Calendar className="w-8 h-8" />
  },
  {
    id: 'm9',
    occupation: 'medical',
    title: "약물 부작용 간편 체크",
    painPoint: "새로운 약을 추가할 때 기존 약들과의 상호작용을 매번 두꺼운 책에서 찾기 힘들어요.",
    improvement: "약물 이름만 나열하면 Gemini가 상호작용 위험도와 주의사항을 즉시 리포트합니다.",
    impact: "약물 사고를 예방하고 안전한 처방 환경을 구축합니다.",
    resource: "DUR(의약품 안전사용 서비스) 데이터",
    icon: <ShieldAlert className="w-8 h-8" />
  },
  {
    id: 'm10',
    occupation: 'medical',
    title: "판독문 초안 작성 비서",
    painPoint: "반복적인 영상 판독 소견을 매번 타이핑하는 게 손목도 아프고 시간도 많이 걸려요.",
    improvement: "Gemini가 영상의 특징적 소견을 인식해 표준 판독문 초안을 자동으로 생성해줍니다.",
    impact: "판독 효율이 30% 이상 향상되어 더 많은 환자를 돌볼 수 있습니다.",
    resource: "영상의학과 표준 판독 용어집",
    icon: <MonitorPlay className="w-8 h-8" />
  },
  {
    id: 'm11',
    occupation: 'medical',
    title: "환자 교육 시각화 도구",
    painPoint: "말로만 설명하면 환자들이 금방 잊어버려요. 그림으로 보여주고 싶은데 그릴 시간이 없죠.",
    improvement: "Gemini가 설명 내용을 바탕으로 환자 눈높이에 맞는 맞춤형 교육 이미지를 생성해줍니다.",
    impact: "환자의 순응도가 높아지고 퇴원 후 자가 관리 능력이 향상됩니다.",
    resource: "질환별 교육용 이미지 소스",
    icon: <Camera className="w-8 h-8" />
  },
  {
    id: 'm12',
    occupation: 'medical',
    title: "응급실 중증도 분류 보조",
    painPoint: "응급실에 환자가 몰릴 때 누가 더 급한지 빠르게 판단하는 게 생명과 직결되는데 너무 긴박해요.",
    improvement: "Gemini가 환자의 활력 징후와 주호소를 분석해 KTAS 단계를 실시간으로 추천해줍니다.",
    impact: "골든타임을 놓치지 않고 응급 환자를 우선 처치할 수 있습니다.",
    resource: "KTAS(한국형 응급환자 분류도구) 지침",
    icon: <Activity className="w-8 h-8" />
  },
  {
    id: 'm13',
    occupation: 'medical',
    title: "퇴원 요약지 자동 생성",
    painPoint: "입원 기간이 긴 환자의 퇴원 요약지를 작성하려면 수주간의 기록을 다 훑어봐야 해서 힘들어요.",
    improvement: "Gemini가 입원 중 주요 이벤트와 검사 결과를 요약해 퇴원 요약지 초안을 만들어줍니다.",
    impact: "의료진의 서류 업무 부담이 줄어들고 기록의 연속성이 확보됩니다.",
    resource: "입원 기록지, 경과 기록지 데이터",
    icon: <FileText className="w-8 h-8" />
  },
  {
    id: 'm14',
    occupation: 'medical',
    title: "협진 의뢰서 핵심 요약봇",
    painPoint: "타 과에서 온 협진 의뢰서가 너무 길어서 정작 궁금한 게 뭔지 한눈에 안 들어올 때가 있어요.",
    improvement: "Gemini가 협진 의뢰서에서 '의뢰 목적'과 '환자의 핵심 문제'만 3줄로 요약해줍니다.",
    impact: "협진 효율이 극대화되고 타 과 의료진 간의 소통이 명확해집니다.",
    resource: "협진 의뢰서 양식 및 데이터",
    icon: <MessageSquare className="w-8 h-8" />
  },
  {
    id: 'm15',
    occupation: 'medical',
    title: "최신 논문 요약 비서",
    painPoint: "진료 보랴, 연구 하랴 바빠서 쏟아지는 최신 논문을 다 읽을 시간이 없어요.",
    improvement: "Gemini가 매일 관심 분야의 논문을 스캔해 핵심 결론만 요약해서 메일로 보내줍니다.",
    impact: "최신 의학 지식을 놓치지 않고 진료의 질을 지속적으로 높일 수 있습니다.",
    resource: "PubMed, 주요 의학 저널 RSS 피드",
    icon: <FileSearch className="w-8 h-8" />
  },

  // Nurse (15 items)
  {
    id: 'n1',
    occupation: 'nurse',
    title: "인수인계 자동 정리봇",
    painPoint: "교대할 때 환자 상태를 말로 전달하다 보면 중요한 걸 빠뜨릴까 봐 늘 불안해요.",
    improvement: "Gemini가 EMR 기록을 분석해 '오늘 꼭 전달해야 할 특이사항'을 리스트로 뽑아줍니다.",
    impact: "인수인계 시간이 짧아지고 정보 누락으로 인한 사고를 예방합니다.",
    resource: "EMR 간호 기록, 투약 기록",
    icon: <Mic className="w-8 h-8" />
  },
  {
    id: 'n2',
    occupation: 'nurse',
    title: "환자 질문 자동 응대기",
    painPoint: "\"언제 밥 먹어요?\", \"이거 왜 맞아요?\" 같은 반복적인 질문에 답하느라 업무가 자꾸 끊겨요.",
    improvement: "환자용 태블릿에서 Gemini가 환자의 처방 정보를 바탕으로 단순 질문에 즉시 답해줍니다.",
    impact: "간호사는 전문적인 간호에 집중할 수 있고 환자는 즉각 답을 얻어 만족합니다.",
    resource: "환자 자주 묻는 질문집, 처방 데이터",
    icon: <MessageSquare className="w-8 h-8" />
  },
  {
    id: 'n3',
    occupation: 'nurse',
    title: "검사 전 주의사항 안내 요정",
    painPoint: "내시경이나 CT 전 금식 여부를 환자분들이 자꾸 잊어버리셔서 검사가 취소되곤 해요.",
    improvement: "Gemini가 검사 전날 환자에게 맞춤형 알림을 보내고 금식 여부를 대화로 확인합니다.",
    impact: "검사 취소율이 낮아지고 병원 운영 효율이 높아집니다.",
    resource: "검사별 주의사항 매뉴얼",
    icon: <Bell className="w-8 h-8" />
  },
  {
    id: 'n4',
    occupation: 'nurse',
    title: "병동 물품 찾기 요정",
    painPoint: "급하게 필요한 물품이 어디 있는지, 재고가 있는지 찾으러 다니는 시간이 너무 아까워요.",
    improvement: "Gemini에게 물어보면 해당 물품의 위치와 현재 재고량을 즉시 알려줍니다.",
    impact: "물품 찾는 시간이 줄어들어 환자 처치에 더 많은 시간을 쓸 수 있습니다.",
    resource: "병동 물품 관리 대장",
    icon: <PackageSearch className="w-8 h-8" />
  },
  {
    id: 'n5',
    occupation: 'nurse',
    title: "투약 오류 방지 알리미",
    painPoint: "바쁜 시간대에 약을 주다 보면 환자 확인이나 용량 확인에서 실수할까 봐 겁나요.",
    improvement: "Gemini가 처방과 실제 투약하려는 약을 실시간 대조해 이상이 있으면 경고를 줍니다.",
    impact: "투약 사고 제로(Zero)를 달성하고 간호사의 심리적 부담을 덜어줍니다.",
    resource: "투약 처방 데이터, 약물 식별 정보",
    icon: <ShieldAlert className="w-8 h-8" />
  },
  {
    id: 'n6',
    occupation: 'nurse',
    title: "욕창 방지 체위 변경 도우미",
    painPoint: "중환자분들 체위 변경 시간을 일일이 기억하고 기록하는 게 너무 번거로워요.",
    improvement: "Gemini가 환자별 체위 변경 골든타임을 알려주고, 수행 여부를 음성으로 기록합니다.",
    impact: "욕창 발생률이 획기적으로 낮아지고 기록 업무가 간소화됩니다.",
    resource: "욕창 예방 간호 지침",
    icon: <Clock className="w-8 h-8" />
  },
  {
    id: 'n7',
    occupation: 'nurse',
    title: "식사/배설량 자동 기록 비서",
    painPoint: "환자 식사량이나 소변량을 눈대중으로 파악해 일일이 차트에 적는 게 시간이 꽤 걸려요.",
    improvement: "사진을 찍거나 수치만 말하면 Gemini가 자동으로 차트 형식에 맞춰 기록해줍니다.",
    impact: "기록의 정확도가 높아지고 간호사의 단순 반복 업무가 줄어듭니다.",
    resource: "간호 기록 표준 서식",
    icon: <Utensils className="w-8 h-8" />
  },
  {
    id: 'n8',
    occupation: 'nurse',
    title: "신입 간호사 퀵 가이드",
    painPoint: "신입 때는 장비 사용법이나 처치 순서가 갑자기 기억 안 나서 당황할 때가 많아요.",
    improvement: "Gemini에게 물어보면 원내 업무 매뉴얼에서 해당 처치 순서를 즉시 요약해 보여줍니다.",
    impact: "신입 간호사의 업무 적응이 빨라지고 처치의 안전성이 확보됩니다.",
    resource: "원내 간호 업무 매뉴얼",
    icon: <UserPlus className="w-8 h-8" />
  },
  {
    id: 'n9',
    occupation: 'nurse',
    title: "거동 이상 감지 알리미",
    painPoint: "낙상 위험 환자가 보호자 몰래 침대를 벗어나는 걸 실시간으로 감시하기 힘들어요.",
    improvement: "Gemini가 병상 카메라 영상을 분석해 환자의 낙상 위험 동작을 미리 감지해 알립니다.",
    impact: "낙상 사고를 사전에 방지해 환자의 안전을 지킵니다.",
    resource: "낙상 예방 프로토콜",
    icon: <Activity className="w-8 h-8" />
  },
  {
    id: 'n10',
    occupation: 'nurse',
    title: "병동 소음 관리 봇",
    painPoint: "밤에 병동이 시끄러우면 환자분들이 잠을 못 자서 예민해지시고 간호사도 힘들어요.",
    improvement: "Gemini가 소음 수치를 실시간 모니터링해 기준치를 넘으면 정숙 안내를 자동으로 방송합니다.",
    impact: "쾌적한 병동 환경이 조성되어 환자의 회복 속도가 빨라집니다.",
    resource: "병동 환경 관리 규정",
    icon: <Bell className="w-8 h-8" />
  },
  {
    id: 'n11',
    occupation: 'nurse',
    title: "소모품 자동 청구 시스템",
    painPoint: "거즈나 주사기 같은 소모품이 떨어진 걸 뒤늦게 발견해 급하게 구하러 다닐 때가 있어요.",
    improvement: "Gemini가 사용 패턴을 분석해 소모품이 떨어지기 전 자동으로 구매팀에 청구합니다.",
    impact: "물품 부족으로 인한 업무 중단이 사라지고 재고 관리가 투명해집니다.",
    resource: "물품 사용 통계 데이터",
    icon: <Zap className="w-8 h-8" />
  },
  {
    id: 'n12',
    occupation: 'nurse',
    title: "통증 척도 기록 도우미",
    painPoint: "환자가 느끼는 통증을 주관적으로 말하다 보니 기록의 객관성을 유지하기가 어려워요.",
    improvement: "Gemini가 환자의 표정과 음성을 분석해 통증 점수(NRS)를 객관적으로 제안해줍니다.",
    impact: "통증 관리가 체계적으로 이루어지고 적절한 약물 투여 시점을 잡기 쉬워집니다.",
    resource: "통증 사정 도구 가이드",
    icon: <HeartPulse className="w-8 h-8" />
  },
  {
    id: 'n13',
    occupation: 'nurse',
    title: "수액 속도 자동 계산기",
    painPoint: "처방된 수액 속도(gtt)를 매번 계산기로 계산하고 확인하는 게 은근히 신경 쓰여요.",
    improvement: "처방 내용만 말하면 Gemini가 정확한 수액 속도와 시간당 투여량을 즉시 계산해줍니다.",
    impact: "계산 실수를 방지하고 수액 투여의 정확성을 높입니다.",
    resource: "수액 요법 매뉴얼",
    icon: <Thermometer className="w-8 h-8" />
  },
  {
    id: 'n14',
    occupation: 'nurse',
    title: "보호자 면회 자동 예약",
    painPoint: "면회 가능 여부를 묻는 보호자 전화를 일일이 응대하느라 간호 업무에 집중하기 힘들어요.",
    improvement: "Gemini가 병동 상황을 고려해 면회 가능 시간을 보호자에게 안내하고 예약을 받습니다.",
    impact: "전화 응대 업무가 줄어들고 병동 방문객 관리가 효율적으로 이루어집니다.",
    resource: "병동 면회 규정",
    icon: <Users className="w-8 h-8" />
  },
  {
    id: 'n15',
    occupation: 'nurse',
    title: "간호 기록지 초안 비서",
    painPoint: "근무 끝나고 산더미처럼 쌓인 간호 기록을 작성하느라 매번 퇴근이 늦어져요.",
    improvement: "Gemini가 오늘 수행한 처치와 관찰 내용을 바탕으로 간호 기록지 초안을 써줍니다.",
    impact: "서류 업무 시간이 줄어들어 정시 퇴근이 가능해지고 삶의 질이 올라갑니다.",
    resource: "간호 기록 표준 용어집",
    icon: <FileText className="w-8 h-8" />
  },

  // Admin (15 items)
  {
    id: 'a1',
    occupation: 'admin',
    title: "외국인 환자 실시간 통역사",
    painPoint: "외국인 환자가 오시면 말이 안 통해서 접수부터 수납까지 너무 당황스러워요.",
    improvement: "Gemini가 의료 전문 용어까지 포함해 실시간으로 환자와 직원의 대화를 통역해줍니다.",
    impact: "외국인 환자 진료가 원활해지고 글로벌 병원으로서의 이미지가 높아집니다.",
    resource: "의료 전문 다국어 사전",
    icon: <Languages className="w-8 h-8" />
  },
  {
    id: 'a2',
    occupation: 'admin',
    title: "보험 서류 오타 검수봇",
    painPoint: "보험 청구 서류에 작은 오타 하나만 있어도 반려되어 다시 작업해야 하는 게 너무 지쳐요.",
    improvement: "Gemini가 수만 장의 서류를 스캔해 오타나 코드 오류를 실시간으로 찾아냅니다.",
    impact: "서류 반려율이 0%에 가까워지고 행정 업무 효율이 극대화됩니다.",
    resource: "건강보험 심사 기준 데이터",
    icon: <ShieldCheck className="w-8 h-8" />
  },
  {
    id: 'a3',
    occupation: 'admin',
    title: "시설 고장 자동 접수기",
    painPoint: "화장실 전등이 나갔거나 에어컨이 고장 났을 때 신고하고 처리 확인하는 과정이 복잡해요.",
    improvement: "사진만 찍어 올리면 Gemini가 고장 부위를 파악해 시설팀에 자동 접수하고 진행 상황을 알립니다.",
    impact: "병원 시설 관리가 빨라지고 환자와 직원의 불편함이 즉시 해결됩니다.",
    resource: "병원 시설 관리 매뉴얼",
    icon: <Building2 className="w-8 h-8" />
  },
  {
    id: 'a4',
    occupation: 'admin',
    title: "병원 위치 안내 요정",
    painPoint: "병원이 너무 넓어서 길을 묻는 환자분들이 많은데, 매번 설명해 드리기가 힘들어요.",
    improvement: "Gemini가 환자의 현재 위치에서 목적지까지 사진과 함께 쉬운 경로를 안내합니다.",
    impact: "환자의 길 찾기 스트레스가 줄어들고 안내 데스크의 업무 부하가 감소합니다.",
    resource: "병원 내부 지도 데이터",
    icon: <Zap className="w-8 h-8" />
  },
  {
    id: 'a5',
    occupation: 'admin',
    title: "진료 예약 자동 응대봇",
    painPoint: "단순한 예약 변경이나 취소 전화가 너무 많아서 정작 중요한 상담 전화를 못 받을 때가 있어요.",
    improvement: "Gemini가 환자의 목소리를 인식해 예약 변경 및 취소를 24시간 자동으로 처리합니다.",
    impact: "콜센터 대기 시간이 짧아지고 상담원은 심층 상담에만 집중할 수 있습니다.",
    resource: "진료 예약 시스템 데이터",
    icon: <MessageSquare className="w-8 h-8" />
  },
  {
    id: 'a6',
    occupation: 'admin',
    title: "복잡한 규정집 요약봇",
    painPoint: "원내 규정이나 매뉴얼이 너무 방대해서 필요한 내용을 찾으려면 한참을 뒤져야 해요.",
    improvement: "Gemini에게 질문하면 수천 페이지의 규정집에서 정답이 있는 페이지와 내용을 바로 찾아줍니다.",
    impact: "업무 판단이 빨라지고 규정 미숙지로 인한 실수를 방지합니다.",
    resource: "원내 규정집, 업무 매뉴얼",
    icon: <FileSearch className="w-8 h-8" />
  },
  {
    id: 'a7',
    occupation: 'admin',
    title: "제증명 서류 발급 가이드",
    painPoint: "진단서나 영수증 발급에 필요한 서류를 몰라서 두 번 걸음 하시는 환자분들이 많아요.",
    improvement: "Gemini가 환자의 상황에 맞는 필요 서류와 발급 절차를 미리 카톡으로 안내합니다.",
    impact: "원무과 창구 대기 시간이 줄어들고 환자의 헛걸음이 사라집니다.",
    resource: "제증명 발급 규정",
    icon: <FileText className="w-8 h-8" />
  },
  {
    id: 'a8',
    occupation: 'admin',
    title: "카드뉴스 자동 생성기",
    painPoint: "병원 소식을 SNS에 올리고 싶은데 디자인 실력도 없고 시간도 없어서 포기하게 돼요.",
    improvement: "내용만 입력하면 Gemini가 병원 스타일에 맞는 예쁜 카드뉴스와 홍보 문구를 만들어줍니다.",
    impact: "병원 홍보가 활발해지고 환자들과의 소통이 즐거워집니다.",
    resource: "병원 브랜드 가이드라인",
    icon: <Sparkles className="w-8 h-8" />
  },
  {
    id: 'a9',
    occupation: 'admin',
    title: "식당 메뉴 선호도 조사원",
    painPoint: "식당 메뉴에 대한 불만은 많은데, 정작 어떤 메뉴를 좋아하는지 정확히 파악하기 힘들어요.",
    improvement: "Gemini가 직원들의 식사 후기를 분석해 다음 달 인기 메뉴와 개선점을 제안합니다.",
    impact: "직원 식당 만족도가 올라가고 잔반 낭비가 줄어듭니다.",
    resource: "식당 이용 후기 데이터",
    icon: <Utensils className="w-8 h-8" />
  },
  {
    id: 'a10',
    occupation: 'admin',
    title: "비품 최저가 비교 비서",
    painPoint: "사무용품이나 소모품을 살 때 어디가 제일 싼지 비교하는 게 너무 시간 낭비 같아요.",
    improvement: "Gemini가 여러 업체의 견적을 실시간으로 비교해 최적의 구매처를 추천합니다.",
    impact: "병원 예산이 절감되고 구매 담당자의 업무 시간이 단축됩니다.",
    resource: "업체별 견적서 데이터",
    icon: <BarChart3 className="w-8 h-8" />
  },
  {
    id: 'a11',
    occupation: 'admin',
    title: "고객 의견 핵심 요약봇",
    painPoint: "홈페이지에 올라오는 수많은 고객 의견을 일일이 읽고 보고서를 쓰는 게 너무 힘들어요.",
    improvement: "Gemini가 수백 건의 고객 의견을 분석해 '이번 주 핵심 불만 3가지'를 요약해줍니다.",
    impact: "고객의 요구사항을 빠르게 파악해 서비스 개선 속도가 빨라집니다.",
    resource: "고객의 소리(VOC) 데이터",
    icon: <MessageSquare className="w-8 h-8" />
  },
  {
    id: 'a12',
    occupation: 'admin',
    title: "신규 직원 온보딩 가이드",
    painPoint: "새로 오신 분들께 병원 시스템 사용법을 매번 처음부터 설명해 드리기가 벅차요.",
    improvement: "Gemini가 신규 직원의 직무에 맞는 맞춤형 업무 가이드와 튜토리얼을 제공합니다.",
    impact: "신규 직원의 적응 기간이 단축되고 기존 직원의 교육 부담이 줄어듭니다.",
    resource: "직무별 업무 매뉴얼",
    icon: <UserPlus className="w-8 h-8" />
  },
  {
    id: 'a13',
    occupation: 'admin',
    title: "원내 행사 일정 매니저",
    painPoint: "병원 내 크고 작은 행사 일정이 겹치거나 장소 예약이 꼬일 때가 있어서 골치 아파요.",
    improvement: "Gemini가 모든 행사 일정을 통합 관리하며 장소 중복이나 일정 충돌을 미리 방지합니다.",
    impact: "원내 행사가 차질 없이 진행되고 행정적인 실수가 사라집니다.",
    resource: "원내 행사 및 회의실 예약 데이터",
    icon: <Calendar className="w-8 h-8" />
  },
  {
    id: 'a14',
    occupation: 'admin',
    title: "에너지 절감 제안가",
    painPoint: "빈 회의실에 불이 켜져 있거나 에어컨이 낭비되는 걸 보면 아까운데 관리가 안 돼요.",
    improvement: "Gemini가 구역별 에너지 사용 패턴을 분석해 최적의 절전 스케줄을 제안합니다.",
    impact: "병원 운영비가 절감되고 친환경 병원으로서의 가치를 실현합니다.",
    resource: "구역별 전력 사용량 데이터",
    icon: <Zap className="w-8 h-8" />
  },
  {
    id: 'a15',
    occupation: 'admin',
    title: "주차장 혼잡도 안내봇",
    painPoint: "주차장이 꽉 찼을 때 환자분들이 화를 내시는데, 미리 안내해 드릴 방법이 마땅치 않아요.",
    improvement: "Gemini가 주차장 혼잡도를 예측해 방문 전 환자에게 인근 주차장이나 대중교통을 안내합니다.",
    impact: "병원 입구 정체가 해소되고 환자의 첫 방문 경험이 쾌적해집니다.",
    resource: "주차장 입출차 데이터",
    icon: <Clock className="w-8 h-8" />
  }
];

const WaterRipple = ({ colorClass }: { colorClass: string }) => (
  <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
    <div className="absolute inset-0 bg-[#f4f7f9]" />
    {[...Array(4)].map((_, i) => (
      <motion.div
        key={i}
        className={`absolute inset-0 border-[1px] ${colorClass} rounded-full`}
        initial={{ scale: 0.4, opacity: 0 }}
        animate={{ 
          scale: [0.4, 2.8], 
          opacity: [0, 0.5, 0],
        }}
        transition={{
          duration: 12,
          repeat: Infinity,
          delay: i * 3,
          ease: "linear"
        }}
        style={{
          left: '50%',
          top: '45%',
          translateX: '-50%',
          translateY: '-50%'
        }}
      />
    ))}
  </div>
);

const themeConfig = {
  medical: {
    color: 'blue',
    bg: 'bg-blue-600',
    text: 'text-blue-600',
    lightBg: 'bg-blue-50',
    shadow: 'shadow-blue-200',
    border: 'border-blue-200',
    accentBorder: 'border-blue-500',
    ripple: 'border-blue-200/40',
    icon: <Stethoscope className="w-4 h-4 md:w-5 md:h-5" />,
    label: '의료진',
    emoji: '🩺'
  },
  nurse: {
    color: 'teal',
    bg: 'bg-teal-600',
    text: 'text-teal-600',
    lightBg: 'bg-teal-50',
    shadow: 'shadow-teal-200',
    border: 'border-teal-200',
    accentBorder: 'border-teal-500',
    ripple: 'border-teal-200/40',
    icon: <ClipboardCheck className="w-4 h-4 md:w-5 md:h-5" />,
    label: '간호사',
    emoji: '📋'
  },
  admin: {
    color: 'indigo',
    bg: 'bg-indigo-600',
    text: 'text-indigo-600',
    lightBg: 'bg-indigo-50',
    shadow: 'shadow-indigo-200',
    border: 'border-indigo-200',
    accentBorder: 'border-indigo-500',
    ripple: 'border-indigo-200/40',
    icon: <Building2 className="w-4 h-4 md:w-5 md:h-5" />,
    label: '행정직',
    emoji: '🏢'
  }
};

export default function App() {
  const [selectedOccupation, setSelectedOccupation] = useState<Occupation>('medical');
  const [displayIdeas, setDisplayIdeas] = useState<IdeaCard[]>([]);
  const [selectedIdea, setSelectedIdea] = useState<IdeaCard | null>(null);
  const [transitionType, setTransitionType] = useState<'tab' | 'refresh'>('refresh');

  // Shuffle function
  const shuffleIdeas = (occ: Occupation, type: 'tab' | 'refresh' = 'refresh') => {
    setTransitionType(type);
    const pool = ideaPool.filter(idea => idea.occupation === occ);
    const shuffled = [...pool].sort(() => Math.random() - 0.5);
    setDisplayIdeas(shuffled.slice(0, 3));
  };

  // Initial load
  useEffect(() => {
    shuffleIdeas('medical', 'tab');
  }, []);

  // Occupation change handler
  const handleOccupationChange = (occ: Occupation) => {
    if (occ === selectedOccupation) return;
    setSelectedOccupation(occ);
    shuffleIdeas(occ, 'tab');
  };

  // Body scroll lock
  useEffect(() => {
    if (selectedIdea) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [selectedIdea]);

  const currentTheme = themeConfig[selectedOccupation];

  const getGoogleFormUrl = (idea: IdeaCard) => {
    const baseUrl = "https://docs.google.com/forms/d/e/1FAIpQLScYzZPqbHKH_-RXXKdvysGUoGp2mB8nglbEx8iNr7mPvGERhg/viewform?usp=pp_url";
    const entries = {
      "entry.665053671": idea.title,
      "entry.1063744925": idea.painPoint,
      "entry.923740637": idea.improvement,
      "entry.172141257": idea.impact,
      "entry.1233264451": idea.resource
    };
    
    const queryString = Object.entries(entries)
      .map(([key, value]) => `${key}=${encodeURIComponent(value)}`)
      .join('&');
      
    return `${baseUrl}&${queryString}`;
  };

  return (
    <div className="min-h-screen bg-[#f4f7f9] font-['Pretendard'] text-gray-900 selection:bg-blue-100 overflow-x-hidden">
      {/* Background */}
      <WaterRipple colorClass={currentTheme.ripple} />

      {/* 1. Header */}
      <header className="relative pt-16 pb-8 md:pt-24 md:pb-12 px-6 text-center z-10 max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="text-3xl md:text-7xl font-black tracking-tight mb-4 md:mb-8 text-gray-900 break-keep">
            은평 <span className={currentTheme.text}>AI</span> 아이디어 공모
          </h1>
          <p className="text-sm md:text-xl text-gray-500 font-medium max-w-2xl mx-auto leading-relaxed break-keep px-4 md:px-0">
            의료 현장의 작은 아이디어가 혁신의 시작입니다. <br className="hidden md:block" />
            현장의 불편함을 해결할 당신의 따뜻한 시선을 들려주세요.
          </p>
        </motion.div>
      </header>

      {/* 2. CTA Section */}
      <section className="relative py-6 md:py-12 px-6 z-10">
        <div className="max-w-3xl mx-auto text-center">
          <motion.a
            href="https://forms.gle/G8gWQbMefwzb82Q96"
            target="_blank"
            rel="noopener noreferrer"
            className={`inline-flex items-center gap-3 px-6 py-4 md:px-14 md:py-6 ${currentTheme.bg} text-white font-bold rounded-full text-base md:text-2xl shadow-2xl ${currentTheme.shadow} hover:brightness-110 transition-all group break-keep`}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            아이디어 제출하러 가기
            <ArrowRight className="w-5 h-5 md:w-7 md:h-7 group-hover:translate-x-1 transition-transform" />
          </motion.a>
          <p className="mt-4 md:mt-6 text-xs md:text-base text-gray-400 font-medium break-keep">
            * 거창한 기술이 아니어도 괜찮습니다. 사소한 아이디어도 환영합니다!
          </p>
        </div>
      </section>

      {/* 3. Tabs & Dynamic Title Section */}
      <section className="relative pt-8 pb-6 px-6 z-10 max-w-6xl mx-auto text-center">
        <div className="mb-10">
          <p className="text-gray-500 text-base md:text-lg font-medium break-keep">
            어떤 아이디어를 내야 할지 막막하다면,<br className="md:hidden" /> 아래 직군별 예시를 참고해 보세요.
          </p>
        </div>

        <div className="flex flex-wrap justify-center gap-2 md:gap-4 mb-10 px-2">
          {(['medical', 'nurse', 'admin'] as Occupation[]).map((occ) => {
            const theme = themeConfig[occ];
            return (
              <button
                key={occ}
                onClick={() => handleOccupationChange(occ)}
                className={`px-4 py-2.5 md:px-10 md:py-4 rounded-full text-xs md:text-lg font-bold transition-all duration-300 flex items-center gap-1.5 md:gap-2 ${
                  selectedOccupation === occ 
                  ? `${theme.bg} text-white shadow-xl ${theme.shadow} scale-105` 
                  : 'bg-white text-gray-500 hover:bg-gray-50 border border-gray-100'
                }`}
              >
                {theme.icon}
                {theme.label}
              </button>
            );
          })}
        </div>

        <motion.div
          key={selectedOccupation}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h2 className="text-xl md:text-4xl font-black tracking-tight break-keep text-gray-800 flex items-center justify-center gap-2">
            <span>{currentTheme.emoji}</span>
            {currentTheme.label}을 위한 추천 아이디어
          </h2>
        </motion.div>

        {/* Info Box */}
        <div className={`max-w-4xl mx-auto ${currentTheme.lightBg}/50 rounded-2xl p-4 md:p-5 mb-8 flex items-start gap-3 border ${currentTheme.border}/30 text-left`}>
          <Lightbulb className={`w-5 h-5 md:w-6 md:h-6 ${currentTheme.text} shrink-0 mt-0.5`} />
          <p className="text-sm md:text-base text-gray-600 leading-relaxed break-keep">
            <span className="font-bold">안내:</span> 예시 가이드를 그대로 활용하여 제출하셔도 좋습니다. 하지만 현장에서 직접 겪으신 여러분만의 생생한 경험과 새로운 아이디어가 혁신에 가장 큰 힘이 됩니다. 예시는 가볍게 참고만 부탁드립니다!
          </p>
        </div>
      </section>

      {/* 4. Cards & Refresh Section */}
      <section className="relative px-6 pb-24 z-10">
        <div className="max-w-6xl mx-auto">
          <div className="flex md:grid md:grid-cols-3 overflow-x-auto md:overflow-x-visible snap-x snap-mandatory md:snap-none scrollbar-hide gap-4 md:gap-8 pb-8 md:pb-0 -mx-6 px-6 md:mx-0 md:px-0">
            <AnimatePresence mode="wait">
              <motion.div
                key={`${selectedOccupation}-${displayIdeas.map(i => i.id).join('-')}`}
                className="contents"
                initial={transitionType === 'tab' ? { opacity: 0, x: 50 } : { opacity: 0, scale: 0.95 }}
                animate={transitionType === 'tab' ? { opacity: 1, x: 0 } : { opacity: 1, scale: 1 }}
                exit={transitionType === 'tab' ? { opacity: 0, x: -50 } : { opacity: 0, scale: 0.95 }}
                transition={{ 
                  duration: 0.3, 
                  ease: "easeOut",
                  staggerChildren: 0.05 
                }}
              >
                {displayIdeas.map((idea) => (
                  <motion.div
                    key={idea.id}
                    layout
                    whileHover={{ 
                      y: -10,
                      scale: 1.02,
                      boxShadow: "0 25px 50px rgba(0, 0, 0, 0.1)"
                    }}
                    onClick={() => setSelectedIdea(idea)}
                    className={`flex-shrink-0 w-[80vw] min-w-[80vw] md:w-full md:min-w-0 snap-center md:snap-align-none relative bg-white/90 backdrop-blur-md rounded-[32px] md:rounded-[40px] p-6 md:p-10 cursor-pointer border border-white/60 shadow-sm flex flex-col items-start min-h-[280px] md:min-h-[350px] group overflow-hidden`}
                  >
                    <div className={`absolute top-0 right-0 w-20 h-20 md:w-24 md:h-24 ${currentTheme.lightBg}/50 rounded-bl-full -mr-4 -mt-4 transition-transform group-hover:scale-110`} />
                    <div className={`p-3 md:p-4 ${currentTheme.lightBg} rounded-xl md:rounded-2xl ${currentTheme.text} mb-6 md:mb-8 group-hover:scale-110 transition-transform duration-500 relative z-10`}>
                      {idea.icon}
                    </div>
                    <h3 className="text-xl md:text-2xl font-bold text-gray-900 mb-3 md:mb-4 tracking-tight relative z-10 break-keep">{idea.title}</h3>
                    <p className="text-sm md:text-base text-gray-500 leading-relaxed font-medium line-clamp-3 relative z-10 break-keep">
                      {idea.painPoint}
                    </p>
                    <div className={`mt-8 md:mt-auto pt-4 flex items-center ${currentTheme.text} font-bold text-sm md:text-base gap-2 relative z-10`}>
                      상세 기획 가이드 보기 <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            </AnimatePresence>
          </div>

          <div className="mt-10 text-center">
            <button
              onClick={() => shuffleIdeas(selectedOccupation, 'refresh')}
              className={`inline-flex items-center gap-2 px-6 py-3 md:px-8 md:py-4 bg-white/80 backdrop-blur-sm ${currentTheme.text} font-bold rounded-full border ${currentTheme.border} hover:bg-gray-50 transition-all duration-300 shadow-sm group text-sm md:text-lg`}
            >
              <RefreshCw className="w-4 h-4 md:w-5 md:h-5 group-hover:rotate-180 transition-transform duration-500" />
              다른 예시 보기
            </button>
          </div>
        </div>
      </section>

      {/* 5. Footer */}
      <footer className="py-16 px-6 bg-white border-t border-gray-50 text-center text-gray-400 text-sm z-10 relative">
        <p className="font-medium">© 2026 은평성모병원 정보보호팀. All rights reserved.</p>
      </footer>

      {/* Modal */}
      <AnimatePresence>
        {selectedIdea && (
          <div className="fixed inset-0 z-50 flex items-end md:items-center justify-center">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedIdea(null)}
              className="absolute inset-0 bg-black/20 backdrop-blur-md"
            />
            <motion.div
              initial={{ y: "100%", opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: "100%", opacity: 0 }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="relative w-full max-w-2xl bg-white rounded-t-[32px] md:rounded-[48px] shadow-2xl border border-gray-100 overflow-hidden flex flex-col max-h-[85vh] md:max-h-[90vh] md:m-6"
            >
              {/* Sticky Header with Close Button */}
              <div className="sticky top-0 bg-white/80 backdrop-blur-md z-20 px-6 py-4 md:px-16 md:pt-16 md:pb-0 flex justify-end">
                <button 
                  onClick={() => setSelectedIdea(null)}
                  className="p-2 hover:bg-gray-100 rounded-full transition-colors text-gray-400"
                >
                  <X className="w-6 h-6 md:w-8 md:h-8" />
                </button>
              </div>

              {/* Scrollable Content */}
              <div className="overflow-y-auto scrollbar-hide p-6 pt-0 md:p-12 md:pt-4 flex-1">
                <div className="flex items-center gap-4 md:gap-6 mb-8 md:mb-12">
                  <div className={`p-3 md:p-5 ${currentTheme.lightBg} rounded-2xl md:rounded-3xl ${currentTheme.text} shrink-0`}>
                    {selectedIdea.icon}
                  </div>
                  <div>
                    <span className={`text-[10px] md:text-xs font-black ${currentTheme.text} uppercase tracking-[0.2em] mb-1 md:mb-2 block`}>Idea Showcase</span>
                    <h3 className="text-2xl md:text-4xl font-black tracking-tight break-keep">{selectedIdea.title}</h3>
                  </div>
                </div>
                
                <div className="space-y-6 md:space-y-10">
                  <div className={`relative pl-6 md:pl-8 border-l-4 ${currentTheme.accentBorder}`}>
                    <h4 className={`text-[10px] md:text-xs font-black ${currentTheme.text} uppercase tracking-widest mb-1 md:mb-2`}>1. 아이디어 이름</h4>
                    <p className="text-lg md:text-2xl font-bold text-gray-900 break-keep">{selectedIdea.title}</p>
                  </div>
                  
                  <div className="relative pl-6 md:pl-8 border-l-4 border-gray-200">
                    <h4 className="text-[10px] md:text-xs font-black text-gray-400 uppercase tracking-widest mb-1 md:mb-2">2. 시작된 고민</h4>
                    <p className="text-base md:text-lg text-gray-600 leading-relaxed font-medium italic break-keep">"{selectedIdea.painPoint}"</p>
                  </div>
                  
                  <div className={`relative pl-6 md:pl-8 border-l-4 ${currentTheme.accentBorder}`}>
                    <h4 className={`text-[10px] md:text-xs font-black ${currentTheme.text} uppercase tracking-widest mb-1 md:mb-2`}>3. Gemini가 도와줄 방법</h4>
                    <p className="text-base md:text-lg text-gray-800 leading-relaxed font-bold break-keep">{selectedIdea.improvement}</p>
                  </div>

                  <div className="relative pl-6 md:pl-8 border-l-4 border-green-500">
                    <h4 className="text-[10px] md:text-xs font-black text-green-500 uppercase tracking-widest mb-1 md:mb-2">4. 실현 후 변화</h4>
                    <p className="text-base md:text-lg text-green-700 leading-relaxed font-bold break-keep">{selectedIdea.impact}</p>
                  </div>

                  <div className="relative pl-6 md:pl-8 border-l-4 border-gray-100">
                    <h4 className="text-[10px] md:text-xs font-black text-gray-400 uppercase tracking-widest mb-1 md:mb-2">5. 공부해야 할 자료</h4>
                    <p className="text-sm md:text-lg text-gray-500 leading-relaxed break-keep">{selectedIdea.resource}</p>
                  </div>
                </div>
                
                <div className="mt-10 md:mt-16 flex flex-col gap-3">
                  <button
                    onClick={() => {
                      if (selectedIdea) {
                        window.open(getGoogleFormUrl(selectedIdea), '_blank');
                      }
                    }}
                    className={`w-full py-4 md:py-6 ${currentTheme.bg} text-white font-bold rounded-[20px] md:rounded-[24px] hover:brightness-110 transition-all text-lg md:text-xl shadow-lg flex items-center justify-center gap-2 break-keep`}
                  >
                    📝 이 가이드 복사해서 공모하기
                  </button>
                  <button
                    onClick={() => setSelectedIdea(null)}
                    className="w-full py-4 md:py-6 bg-gray-100 text-gray-500 font-bold rounded-[20px] md:rounded-[24px] hover:bg-gray-200 transition-all text-lg md:text-xl break-keep"
                  >
                    가이드 닫기
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
