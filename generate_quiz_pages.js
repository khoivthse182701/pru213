const fs = require('fs');
const path = require('path');

// 1. Load PRU213 Questions
const sp26Questions = JSON.parse(fs.readFileSync(path.join(__dirname, 'De_SP26_FE', 'questions.json'), 'utf8'));
const su26Questions = JSON.parse(fs.readFileSync(path.join(__dirname, 'De_SU26_FE', 'questions.json'), 'utf8'));

// PRU213 Combined 100 questions (1-50 from SP26, 51-100 from SU26)
const pruAllQuestions = [
  ...sp26Questions.map(q => ({
    ...q,
    origId: q.id,
    uid: 'sp26_' + q.id,
    displayId: q.id,
    examLabel: 'SP26',
    imagePath: 'De_SP26_FE/images/Q' + q.id + '.jpg'
  })),
  ...su26Questions.map(q => ({
    ...q,
    id: q.id + 50,
    origId: q.id,
    uid: 'su26_' + q.id,
    displayId: q.id + 50,
    examLabel: 'SU26',
    imagePath: 'De_SU26_FE/images/Q' + q.id + '.jpg'
  }))
];

// 2. Load PRN222 Questions
const prn1Questions = JSON.parse(fs.readFileSync(path.join(__dirname, 'De_PRN222_1', 'questions.json'), 'utf8'));
const prn2Questions = JSON.parse(fs.readFileSync(path.join(__dirname, 'De_PRN222_2', 'questions.json'), 'utf8'));
const prn3Questions = JSON.parse(fs.readFileSync(path.join(__dirname, 'De_PRN222_3', 'questions.json'), 'utf8'));

// PRN222 Combined 150 questions (1-50 from De 1, 51-100 from De 2, 101-150 from De 3)
const prnAllQuestions = [
  ...prn1Questions.map(q => ({
    ...q,
    origId: q.id,
    uid: 'prn1_' + q.id,
    displayId: q.id,
    examLabel: 'Đề 1'
  })),
  ...prn2Questions.map(q => ({
    ...q,
    id: q.id + 50,
    origId: q.id,
    uid: 'prn2_' + q.id,
    displayId: q.id + 50,
    examLabel: 'Đề 2'
  })),
  ...prn3Questions.map(q => ({
    ...q,
    id: q.id + 100,
    origId: q.id,
    uid: 'prn3_' + q.id,
    displayId: q.id + 100,
    examLabel: 'Đề 3'
  }))
];

// 3. Load TINHOC Questions
const tinhoc1Questions = JSON.parse(fs.readFileSync(path.join(__dirname, 'De_TINHOC_1', 'questions.json'), 'utf8'));
const tinhoc2Questions = JSON.parse(fs.readFileSync(path.join(__dirname, 'De_TINHOC_2', 'questions.json'), 'utf8'));
const tinhoc3Questions = JSON.parse(fs.readFileSync(path.join(__dirname, 'De_TINHOC_3', 'questions.json'), 'utf8'));

const SUBJECTS_DATA = {
  prn222: {
    id: 'prn222',
    name: 'PRN222',
    title: '.NET and C# Programming',
    subtitle: 'Lập trình .NET & C#: Dependency Injection, ASP.NET Core MVC, Razor Pages, Blazor, SignalR, TPL, Networking',
    icon: 'fa-bolt',
    tagColor: 'indigo',
    exams: ['prn222_1', 'prn222_2', 'prn222_3', 'prn222_all']
  },
  pru213: {
    id: 'pru213',
    name: 'PRU213',
    title: 'Game Programming with C# / Unity',
    subtitle: 'Lập trình Game Unity: UI Button, Animator, Rigging, Physics, Raycast & Game Loop',
    icon: 'fa-gamepad',
    tagColor: 'blue',
    exams: ['sp26', 'su26', 'all']
  },
  tinhoc: {
    id: 'tinhoc',
    name: 'Tin Học',
    title: 'Tin Học Cơ Bản (CNTT)',
    subtitle: 'Chuẩn kỹ năng CNTT cơ bản: Phần cứng, Hệ điều hành Windows, Mạng máy tính & An toàn thông tin',
    icon: 'fa-desktop',
    tagColor: 'emerald',
    exams: ['tinhoc_1', 'tinhoc_2', 'tinhoc_3']
  }
};

const EXAMS_DATA = {
  // PRN222 Exams
  prn222_1: {
    id: 'prn222_1',
    subject: 'prn222',
    code: 'PRN222 - ĐỀ 1',
    shortName: 'Đề 1 PRN222',
    title: 'Đề 1: PRN222 (.NET & C#)',
    subtitle: 'Dependency Injection, ServiceCollection, Property/Constructor Injection, Singleton, Network Security, TaskScheduler',
    storagePrefix: 'prn222_de1',
    timeMinutes: 50,
    questions: prn1Questions.map(q => ({
      ...q,
      origId: q.id,
      examLabel: 'PRN222 Đề 1'
    }))
  },
  prn222_2: {
    id: 'prn222_2',
    subject: 'prn222',
    code: 'PRN222 - ĐỀ 2',
    shortName: 'Đề 2 PRN222',
    title: 'Đề 2: PRN222 (.NET Core & DI)',
    subtitle: 'Service Lifetimes (Singleton, Scoped, Transient), SOLID principles, WebRequest, SignalR Hubs, TPL Library',
    storagePrefix: 'prn222_de2',
    timeMinutes: 50,
    questions: prn2Questions.map(q => ({
      ...q,
      origId: q.id,
      examLabel: 'PRN222 Đề 2'
    }))
  },
  prn222_3: {
    id: 'prn222_3',
    subject: 'prn222',
    code: 'PRN222 - ĐỀ 3',
    shortName: 'Đề 3 PRN222',
    title: 'Đề 3: PRN222 (Blazor, MVC & SignalR)',
    subtitle: 'Blazor Components, HttpClient, Model Binding, IP & DNS, SignalR Groups, TempData, JsonResult, PLINQ, Tag Helpers',
    storagePrefix: 'prn222_de3',
    timeMinutes: 50,
    questions: prn3Questions.map(q => ({
      ...q,
      origId: q.id,
      examLabel: 'PRN222 Đề 3'
    }))
  },
  prn222_all: {
    id: 'prn222_all',
    subject: 'prn222',
    code: 'PRN222 - TỔNG HỢP 3 ĐỀ (150 CÂU)',
    shortName: 'Tổng hợp 150 câu',
    title: 'Tổng Hợp PRN222 (150 Câu)',
    subtitle: 'Trọn bộ 150 câu trắc nghiệm PRN222 gộp từ cả 3 đề thi để tổng ôn toàn diện kiến thức .NET, C#, Blazor & MVC',
    storagePrefix: 'prn222_all150',
    timeMinutes: 90,
    questions: prnAllQuestions
  },

  // PRU213 Exams
  sp26: {
    id: 'sp26',
    subject: 'pru213',
    code: 'PRU213 - SP26 FE',
    shortName: 'Đề SP26 FE',
    title: 'Đề Thi FE PRU213 - SP26',
    subtitle: 'Unity UI Button, Rigging & Armature, UI/UX Feedback, Rigidbody Drag & Physics, Animator Transitions',
    sourceUrl: 'https://fuoverflow.com/threads/pru213-sp26-fe.6240/',
    storagePrefix: 'pru213_sp26',
    timeMinutes: 50,
    questions: sp26Questions.map(q => ({
      ...q,
      origId: q.id,
      examLabel: 'SP26',
      imagePath: 'De_SP26_FE/images/Q' + q.id + '.jpg'
    }))
  },
  su26: {
    id: 'su26',
    subject: 'pru213',
    code: 'PRU213 - SU26 FE',
    shortName: 'Đề SU26 FE',
    title: 'Đề Thi FE PRU213 - SU26',
    subtitle: 'Button OnClick Binding, Layout Groups, Sprite Atlas & Batching, Animation Events, AudioSource & Raycast',
    sourceUrl: 'https://fuoverflow.com/threads/pru213-su26-fe.6971/',
    storagePrefix: 'pru213_su26',
    timeMinutes: 50,
    questions: su26Questions.map(q => ({
      ...q,
      origId: q.id,
      examLabel: 'SU26',
      imagePath: 'De_SU26_FE/images/Q' + q.id + '.jpg'
    }))
  },
  all: {
    id: 'all',
    subject: 'pru213',
    code: 'PRU213 - TỔNG HỢP 2 ĐỀ (100 CÂU)',
    shortName: 'Tổng hợp 100 câu',
    title: 'Tổng Hợp PRU213 (100 Câu)',
    subtitle: 'Trọn bộ 100 câu trắc nghiệm Final Exam từ cả 2 kỳ Spring 2026 & Summer 2026 để tổng ôn toàn diện Unity',
    sourceUrl: 'https://fuoverflow.com/threads/pru213-sp26-fe.6240/',
    storagePrefix: 'pru213_all100',
    timeMinutes: 90,
    questions: pruAllQuestions
  },

  // TINHOC Exams
  tinhoc_1: {
    id: 'tinhoc_1',
    subject: 'tinhoc',
    code: 'TIN HỌC - ĐỀ 1',
    shortName: 'Đề 1 Tin Học',
    title: 'Đề 1: Tin Học Cơ Bản (CB 8)',
    subtitle: '50 câu hỏi trắc nghiệm Tin học cơ bản kèm hình ảnh minh họa và mẹo chọn đáp án từ khóa',
    storagePrefix: 'tinhoc_de1',
    timeMinutes: 50,
    questions: tinhoc1Questions.map(q => ({
      ...q,
      examLabel: 'Đề 1'
    }))
  },
  tinhoc_2: {
    id: 'tinhoc_2',
    subject: 'tinhoc',
    code: 'TIN HỌC - ĐỀ 2',
    shortName: 'Đề 2 Tin Học',
    title: 'Đề 2: Tin Học Cơ Bản (CB 9)',
    subtitle: '50 câu hỏi trắc nghiệm Tin học cơ bản đề số 2 kèm hình ảnh và mẹo từ khóa',
    storagePrefix: 'tinhoc_de2',
    timeMinutes: 50,
    questions: tinhoc2Questions.map(q => ({
      ...q,
      examLabel: 'Đề 2'
    }))
  },
  tinhoc_3: {
    id: 'tinhoc_3',
    subject: 'tinhoc',
    code: 'TIN HỌC - ĐỀ 3',
    shortName: 'Đề 3 Tin Học',
    title: 'Đề 3: Tin Học Cơ Bản (CB 7)',
    subtitle: '50 câu hỏi trắc nghiệm Tin học cơ bản đề số 3 kèm hình ảnh và mẹo từ khóa',
    storagePrefix: 'tinhoc_de3',
    timeMinutes: 50,
    questions: tinhoc3Questions.map(q => ({
      ...q,
      examLabel: 'Đề 3'
    }))
  }
};

const unifiedHtml = `<!DOCTYPE html>
<html lang="vi">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no">
  <title>Ôn Tập</title>
  
  <!-- Open Graph / Facebook / Zalo Preview -->
  <meta property="og:type" content="website">
  <meta property="og:title" content="Ôn Tập">
  <meta property="og:site_name" content="Ôn Tập">
  <meta property="og:description" content="Ôn Tập">
  <meta property="og:url" content="https://khoivthse182701.github.io/pru213/">
  <meta property="og:image" content="https://khoivthse182701.github.io/pru213/thumbnail.jpg">
  <meta property="og:image:secure_url" content="https://khoivthse182701.github.io/pru213/thumbnail.jpg">
  <meta property="og:image:type" content="image/jpeg">
  <meta property="og:image:width" content="480">
  <meta property="og:image:height" content="480">
  <meta property="og:image:alt" content="Ôn Tập">
  <link rel="image_src" href="https://khoivthse182701.github.io/pru213/thumbnail.jpg">

  <!-- Twitter Card -->
  <meta name="twitter:card" content="summary_large_image">
  <meta name="twitter:title" content="Ôn Tập">
  <meta name="twitter:description" content="Ôn Tập">
  <meta name="twitter:image" content="https://khoivthse182701.github.io/pru213/thumbnail.jpg">

  <!-- Favicon / Shortcut Icon -->
  <link rel="icon" type="image/jpeg" href="thumbnail.jpg">
  <link rel="shortcut icon" href="thumbnail.jpg">
  <link rel="apple-touch-icon" href="thumbnail.jpg">
  <script src="https://cdn.tailwindcss.com"></script>
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
  <style>
    @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&family=Roboto:wght@400;500;700&display=swap');
    body {
      font-family: 'Plus Jakarta Sans', sans-serif;
      -webkit-tap-highlight-color: transparent;
    }
    /* EOS / Exam Browser exact typography & UI style */
    .eos-card {
      font-family: 'Roboto', 'Segoe UI', Arial, Helvetica, sans-serif;
      background: #ffffff;
      border: 1px solid #d8e2ef;
      box-shadow: 0 1px 3px rgba(15, 23, 42, 0.04);
    }
    .eos-banner {
      background-color: #eaf2fb;
      border-bottom: 1px solid #d5e4f5;
    }
    .eos-title {
      color: #1d62d8;
      font-weight: 700;
      letter-spacing: 0.02em;
      font-size: 13px;
    }
    .eos-question-text {
      color: #1c1e21;
      font-size: 14.5px;
      font-weight: 400;
      line-height: 1.6;
    }
    .eos-option {
      color: #1c1e21;
      font-size: 14.5px;
      font-weight: 400;
      line-height: 1.55;
      padding: 6px 10px;
      border-radius: 4px;
      border: 1px solid transparent;
      transition: background-color 0.12s ease, border-color 0.12s ease;
    }
    .eos-option:hover {
      background-color: #f3f7fc;
    }
    .eos-option-selected {
      background-color: #e8f0fe !important;
      border-color: #93c5fd !important;
      color: #1e40af !important;
      font-weight: 500;
    }
    .eos-option-correct {
      background-color: #ecfdf5 !important;
      border-color: #6ee7b7 !important;
      color: #065f46 !important;
      font-weight: 600;
    }
    .eos-option-wrong {
      background-color: #fef2f2 !important;
      border-color: #fca5a5 !important;
      color: #991b1b !important;
      font-weight: 500;
    }

    /* Keyword styling: Questions always red bold; Answers red bold except during exam mode */
    .keyword-question {
      color: #e11d48 !important;
      font-weight: 700 !important;
    }
    .keyword-answer {
      color: #e11d48 !important;
      font-weight: 700 !important;
    }
    body.mode-exam:not(.exam-submitted) .keyword-answer {
      color: inherit !important;
      font-weight: inherit !important;
    }

    /* Compact Density Overrides */
    body.density-compact .eos-card {
      margin-bottom: 0.25rem;
    }
    body.density-compact .eos-banner {
      padding-top: 0.25rem;
      padding-bottom: 0.25rem;
      padding-left: 0.75rem;
      padding-right: 0.75rem;
    }
    body.density-compact .eos-body {
      padding-top: 0.5rem !important;
      padding-bottom: 0.75rem !important;
      padding-left: 0.85rem !important;
      padding-right: 0.85rem !important;
      gap: 0.4rem !important;
    }
    body.density-compact .eos-question-text {
      font-size: 13.5px;
      line-height: 1.45;
    }
    body.density-compact .eos-option {
      padding: 4px 8px;
      font-size: 13.5px;
      line-height: 1.4;
    }

    .custom-scrollbar::-webkit-scrollbar { width: 6px; height: 6px; }
    .custom-scrollbar::-webkit-scrollbar-track { background: #f1f5f9; border-radius: 4px; }
    .custom-scrollbar::-webkit-scrollbar-thumb { background: #cbd5e1; border-radius: 4px; }
    .custom-scrollbar::-webkit-scrollbar-thumb:hover { background: #94a3b8; }
    .no-scrollbar::-webkit-scrollbar { display: none; }
    .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
    .safe-bottom { padding-bottom: env(safe-area-inset-bottom, 0px); }
    @keyframes slideUp {
      from { transform: translateY(100%); opacity: 0; }
      to { transform: translateY(0); opacity: 1; }
    }
    .animate-slide-up { animation: slideUp 0.22s cubic-bezier(0.16, 1, 0.3, 1); }

    /* =========================================================
       THEME: BOTANICAL CALM (CHẾ ĐỘ DỊU MẮT BẢO VỆ MẮT)
       Tuân thủ ui-design-system-rules:
       - 60% Nền nhạt #F4F7F4 giảm mỏi điều tiết mắt
       - 30% Thẻ/Card #FFFFFF, viền #DCE5DF
       - 10% Điểm nhấn Xanh rừng #2D5A3D
       - Chữ mực than #1A241E WCAG AA không chói
       - Từ khóa đỏ rượu vang #9F1239 không gay gắt
       ========================================================= */
    html.theme-botanical,
    body.theme-botanical {
      background-color: #f4f7f4 !important;
      color: #1a241e !important;
    }
    body.theme-botanical ::selection {
      background-color: #d1e7d6 !important;
      color: #14532d !important;
    }
    body.theme-botanical #mainHeader {
      background-color: rgba(244, 247, 244, 0.96) !important;
      border-bottom-color: #dce5df !important;
      box-shadow: 0 1px 3px rgba(26, 36, 30, 0.05) !important;
    }
    body.theme-botanical #headerExamTitle,
    body.theme-botanical #headerExamTitleMobile {
      color: #1a241e !important;
    }
    body.theme-botanical .eos-card {
      background: #ffffff !important;
      border-color: #dce5df !important;
      box-shadow: 0 1px 2px rgba(26, 36, 30, 0.04) !important;
    }
    body.theme-botanical .eos-banner {
      background-color: #ebf1ec !important;
      border-bottom-color: #dce5df !important;
    }
    body.theme-botanical .eos-title {
      color: #2d5a3d !important;
    }
    body.theme-botanical .eos-body {
      background-color: #ffffff !important;
    }
    body.theme-botanical .eos-question-text,
    body.theme-botanical .eos-option {
      color: #1a241e !important;
    }
    body.theme-botanical .eos-option:hover {
      background-color: #f2f6f3 !important;
    }
    body.theme-botanical .eos-option-selected {
      background-color: #e8f0e9 !important;
      border-color: #8bb194 !important;
      color: #1a422a !important;
    }
    body.theme-botanical .eos-option-correct {
      background-color: #edf7ee !important;
      border-color: #86efac !important;
      color: #14532d !important;
    }
    body.theme-botanical .eos-option-wrong {
      background-color: #fef2f2 !important;
      border-color: #fca5a5 !important;
      color: #991b1b !important;
    }
    body.theme-botanical .keyword-question,
    body.theme-botanical .keyword-answer {
      color: #9f1239 !important;
      font-weight: 700 !important;
    }
    body.theme-botanical #filterBox,
    body.theme-botanical aside {
      background-color: #ffffff !important;
      border-color: #dce5df !important;
    }
    body.theme-botanical .bg-slate-50 {
      background-color: #f4f7f4 !important;
    }
    body.theme-botanical .bg-slate-100 {
      background-color: #eaf0eb !important;
    }
    body.theme-botanical .border-slate-200 {
      border-color: #dce5df !important;
    }
    body.theme-botanical .border-slate-100 {
      border-color: #e4ebe5 !important;
    }
    body.theme-botanical .text-slate-800,
    body.theme-botanical .text-slate-900 {
      color: #1a241e !important;
    }
    body.theme-botanical .text-slate-700 {
      color: #2c3830 !important;
    }
    body.theme-botanical .text-slate-600 {
      color: #526358 !important;
    }
    body.theme-botanical .text-slate-500 {
      color: #6a7c70 !important;
    }
    body.theme-botanical .bg-blue-600,
    body.theme-botanical .bg-indigo-600 {
      background-color: #2d5a3d !important;
    }
    body.theme-botanical .text-blue-600,
    body.theme-botanical .text-indigo-600 {
      color: #2d5a3d !important;
    }
    body.theme-botanical .bg-blue-50,
    body.theme-botanical .bg-indigo-50 {
      background-color: #ebf2ec !important;
    }
    body.theme-botanical .border-blue-200,
    body.theme-botanical .border-indigo-200 {
      border-color: #cad8ce !important;
    }
    body.theme-botanical .text-blue-700,
    body.theme-botanical .text-indigo-700 {
      color: #244831 !important;
    }
    body.theme-botanical #singleModeHeader {
      background: #2d5a3d !important;
      border-color: #244831 !important;
    }
    body.theme-botanical #bottomMobileBar {
      background-color: rgba(244, 247, 244, 0.96) !important;
      border-top-color: #dce5df !important;
    }
    body.theme-botanical #btnNextBottom {
      background-color: #2d5a3d !important;
    }
    body.theme-botanical .custom-scrollbar::-webkit-scrollbar-track {
      background: #ebf1ec !important;
    }
    body.theme-botanical .custom-scrollbar::-webkit-scrollbar-thumb {
      background: #cad7ce !important;
    }
    body.theme-botanical .custom-scrollbar::-webkit-scrollbar-thumb:hover {
      background: #a9beaf !important;
    }
  </style>
  <script>
    if (localStorage.getItem('ontap_theme') === 'botanical') {
      document.documentElement.classList.add('theme-botanical');
    }
  </script>
</head>
<body class="density-compact bg-slate-50 text-slate-800 min-h-screen flex flex-col antialiased selection:bg-blue-100 selection:text-blue-700 pb-24 lg:pb-0">

  <!-- Unified Sticky Header -->
  <header class="bg-white/95 border-b border-slate-200 sticky top-0 z-40 shadow-sm backdrop-blur-md transition-all duration-200" id="mainHeader">
    <div class="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 py-2 sm:py-2.5 flex flex-col gap-1.5 sm:gap-2">
      
      <!-- Row 1: Brand + Subject Switcher Pills + Mobile Quick Actions + Desktop Controls -->
      <div class="flex items-center justify-between gap-2">
        <!-- Mobile Left: Compact Logo + Unified Clickable Exam Selector (Single Line, Never Wraps) -->
        <div class="flex sm:hidden items-center gap-1.5 min-w-0 flex-1 mr-1">
          <div onclick="openExamPickerModal()" class="cursor-pointer w-8 h-8 rounded-lg bg-gradient-to-tr from-sky-500 via-blue-600 to-indigo-600 flex items-center justify-center text-white font-bold shadow-xs active:scale-95 transition-transform shrink-0">
            <i id="headerBrandIconMobile" class="fa-solid fa-bolt text-xs"></i>
          </div>
          <button onclick="openExamPickerModal()" class="group flex items-center gap-1 min-w-0 text-left active:opacity-80 transition py-0.5" title="Bấm để chọn đề thi khác">
            <span id="headerSubjectBadgeMobile" class="px-1.5 py-0.5 rounded text-[10px] font-extrabold bg-indigo-100 text-indigo-700 shrink-0">PRN222</span>
            <span id="headerExamTitleMobile" class="text-xs font-extrabold text-slate-900 group-hover:text-blue-600 transition leading-tight truncate max-w-[125px]">Đề 1: PRN222</span>
            <span class="inline-flex items-center justify-center w-3.5 h-3.5 rounded bg-slate-100 text-slate-500 text-[9px] shrink-0">
              <i class="fa-solid fa-chevron-down text-[8px]"></i>
            </span>
          </button>
        </div>

        <!-- Desktop Left: Full Brand + Subject Switcher Pills + Title -->
        <div class="hidden sm:flex items-center space-x-2.5 sm:space-x-3 min-w-0">
          <div onclick="openExamPickerModal()" class="cursor-pointer w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-gradient-to-tr from-sky-500 via-blue-600 to-indigo-600 flex items-center justify-center text-white font-bold shadow-md shadow-blue-500/20 hover:scale-105 active:scale-95 transition-transform shrink-0">
            <i id="headerBrandIcon" class="fa-solid fa-bolt text-base sm:text-lg"></i>
          </div>
          <div class="min-w-0">
            <!-- Subject Switcher Pills (PRN222 vs PRU213 vs TINHOC) -->
            <div class="flex items-center gap-1.5 flex-wrap">
              <button onclick="switchSubject('prn222')" id="subPill_prn222" class="px-2 py-0.5 rounded-lg text-[11px] font-extrabold flex items-center gap-1 transition bg-indigo-600 text-white shadow-xs">
                <i class="fa-solid fa-bolt text-[10px]"></i> PRN222
              </button>
              <button onclick="switchSubject('pru213')" id="subPill_pru213" class="px-2 py-0.5 rounded-lg text-[11px] font-bold flex items-center gap-1 transition bg-slate-100 text-slate-600 hover:bg-slate-200">
                <i class="fa-solid fa-gamepad text-[10px]"></i> PRU213
              </button>
              <button onclick="switchSubject('tinhoc')" id="subPill_tinhoc" class="px-2 py-0.5 rounded-lg text-[11px] font-bold flex items-center gap-1 transition bg-slate-100 text-slate-600 hover:bg-slate-200">
                <i class="fa-solid fa-desktop text-[10px]"></i> Tin Học
              </button>
              <span class="text-xs text-slate-300 hidden sm:inline">•</span>
              <span id="headerExamCode" class="text-[10px] sm:text-xs font-semibold text-slate-500 uppercase tracking-wider truncate hidden sm:inline">PRN222 - ĐỀ 1</span>
            </div>
            <button onclick="openExamPickerModal()" class="group flex items-center gap-1.5 text-left mt-0.5">
              <h1 id="headerExamTitle" class="text-xs sm:text-base font-extrabold text-slate-900 group-hover:text-blue-600 transition leading-tight truncate">Đề 1: PRN222 (.NET & C#)</h1>
              <span class="inline-flex items-center justify-center w-4 h-4 rounded bg-slate-100 group-hover:bg-blue-50 text-slate-500 group-hover:text-blue-600 text-[10px] transition shrink-0">
                <i class="fa-solid fa-chevron-down text-[9px]"></i>
              </span>
            </button>
          </div>
        </div>

        <!-- Mobile Quick Action Buttons (Compact & Neatly Aligned) -->
        <div class="flex sm:hidden items-center gap-1.5 shrink-0">
          <div id="examTimerMobile" class="hidden items-center gap-1 bg-amber-50 text-amber-700 px-2 py-1 rounded-xl border border-amber-200 text-xs font-bold">
            <i class="fa-regular fa-clock animate-pulse text-[11px]"></i>
            <span id="timerTextMobile">50:00</span>
          </div>
          <!-- Toggle Layout Mobile: 1 Câu / D.Sách -->
          <button onclick="toggleViewLayout()" id="btnLayoutMobile" title="Đổi giao diện Từng câu / Danh sách" class="h-9 px-2.5 rounded-xl border border-indigo-200 bg-indigo-50 text-indigo-700 text-xs font-bold flex items-center gap-1 active:scale-95 transition">
            <i id="iconLayoutMobile" class="fa-solid fa-layer-group text-xs"></i>
            <span id="txtLayoutMobile">1 Câu</span>
          </button>
          <!-- Theme Toggle Mobile: Dịu mắt (Botanical Calm) -->
          <button onclick="toggleTheme()" id="btnThemeMobile" class="w-9 h-9 rounded-xl border border-slate-200 bg-white text-slate-700 text-sm font-bold flex items-center justify-center active:scale-95 transition shadow-2xs" title="Bật/Tắt chế độ Dịu mắt (Botanical Calm)">
            <i id="iconThemeMobile" class="fa-solid fa-leaf text-slate-400 text-sm"></i>
          </button>
          <!-- Mobile Header Collapse Toggle -->
          <button onclick="toggleHeaderCollapse()" id="btnHeaderCollapseMobile" class="w-9 h-9 rounded-xl border border-slate-200 bg-white text-slate-700 text-sm font-bold flex items-center justify-center active:scale-95 transition shadow-2xs" title="Thu gọn / Mở rộng thanh công cụ">
            <i id="iconHeaderCollapseMobile" class="fa-solid fa-expand text-indigo-500 text-sm"></i>
          </button>
          <button onclick="shuffleQuestions()" title="Xáo trộn câu hỏi" class="w-9 h-9 rounded-xl border border-slate-200 bg-white text-slate-700 active:bg-slate-100 flex items-center justify-center active:scale-95 transition shadow-2xs">
            <i class="fa-solid fa-shuffle text-blue-500 text-sm"></i>
          </button>
          <button onclick="confirmReset()" title="Làm lại đề này" class="w-9 h-9 rounded-xl border border-slate-200 bg-white text-slate-700 active:bg-rose-50 flex items-center justify-center active:scale-95 transition shadow-2xs">
            <i class="fa-solid fa-rotate-right text-rose-500 text-sm"></i>
          </button>
        </div>

        <!-- Desktop Controls (Mode + Shuffle + Reset + Collapse) -->
        <div class="hidden sm:flex items-center flex-wrap gap-2">
          <!-- Mode Tabs Desktop -->
          <div class="bg-slate-100 p-1 rounded-xl flex items-center border border-slate-200 text-xs font-medium">
            <button id="btnPracticeModeDesktop" onclick="switchMode('practice')" class="px-2.5 py-1 rounded-lg transition-all font-semibold flex items-center gap-1.5 bg-white text-blue-600 shadow-xs">
              <i class="fa-solid fa-bolt-lightning text-amber-500"></i> <span>Luyện tập</span>
            </button>
            <button id="btnExamModeDesktop" onclick="switchMode('exam')" class="px-2.5 py-1 rounded-lg transition-all font-semibold flex items-center gap-1.5 text-slate-600 hover:text-slate-900">
              <i class="fa-solid fa-clock text-blue-500"></i> <span>Thi thử</span>
            </button>
            <button id="btnStudyModeDesktop" onclick="switchMode('study')" class="px-2.5 py-1 rounded-lg transition-all font-semibold flex items-center gap-1.5 text-slate-600 hover:text-slate-900">
              <i class="fa-solid fa-book-open text-indigo-500"></i> <span>Đọc đáp án</span>
            </button>
          </div>

          <div id="examTimer" class="hidden items-center gap-2 bg-amber-50 text-amber-700 px-2.5 py-1 rounded-xl border border-amber-200 text-xs font-bold">
            <i class="fa-regular fa-clock animate-pulse"></i>
            <span id="timerText">50:00</span>
          </div>

          <!-- Desktop Layout Toggle: Xem từng câu / Danh sách -->
          <button onclick="toggleViewLayout()" id="btnLayoutDesktop" class="px-2.5 py-1 text-xs font-semibold rounded-xl border border-slate-200 hover:bg-slate-100 text-slate-700 transition flex items-center gap-1.5 bg-white shadow-xs" title="Chuyển đổi giữa xem từng câu và xem toàn bộ danh sách">
            <i id="iconLayoutDesktop" class="fa-solid fa-layer-group text-indigo-500"></i>
            <span id="txtLayoutDesktop">Xem từng câu</span>
          </button>

          <!-- Desktop Theme Toggle: Dịu mắt / Chuẩn -->
          <button onclick="toggleTheme()" id="btnThemeDesktop" class="px-2.5 py-1 text-xs font-semibold rounded-xl border border-slate-200 hover:bg-slate-100 text-slate-700 transition flex items-center gap-1.5 bg-white shadow-xs" title="Chuyển đổi chế độ Dịu mắt (Botanical Calm) bảo vệ mắt">
            <i id="iconThemeDesktop" class="fa-solid fa-leaf text-slate-400"></i>
            <span id="txtThemeDesktop">Dịu mắt</span>
          </button>

          <!-- Header Collapse Button (Focus / Compact mode) -->
          <button onclick="toggleHeaderCollapse()" id="btnHeaderCollapseDesktop" class="px-2.5 py-1 text-xs font-semibold rounded-xl border border-slate-200 hover:bg-slate-100 text-slate-700 transition flex items-center gap-1.5 bg-white shadow-xs" title="Thu gọn/Mở rộng thanh công cụ">
            <i id="iconHeaderCollapseDesktop" class="fa-solid fa-expand text-indigo-500"></i>
            <span id="txtHeaderCollapseDesktop">Mở rộng</span>
          </button>

          <button onclick="shuffleQuestions()" class="px-2.5 py-1 text-xs font-semibold rounded-xl border border-slate-200 hover:bg-slate-100 text-slate-700 transition flex items-center gap-1.5 bg-white shadow-xs">
            <i class="fa-solid fa-shuffle text-blue-500"></i> Xáo câu
          </button>

          <button onclick="confirmReset()" class="px-2.5 py-1 text-xs font-semibold rounded-xl border border-slate-200 hover:bg-rose-50 hover:text-rose-600 hover:border-rose-200 text-slate-700 transition flex items-center gap-1.5 bg-white shadow-xs">
            <i class="fa-solid fa-rotate-right text-rose-500"></i> Làm lại
          </button>
        </div>
      </div>

      <!-- Collapsible Container: Row 2 (Tabs) & Row 3 (Mobile Mode Switcher) -->
      <div id="headerCollapsibleArea" class="hidden flex flex-col gap-1.5 transition-all duration-200">
        <!-- Mobile Subject Switcher Row (when toolbar is expanded) -->
        <div class="flex sm:hidden items-center gap-1.5 overflow-x-auto no-scrollbar pt-1 border-t border-slate-100">
          <button onclick="switchSubject('prn222')" id="subPillMobile_prn222" class="px-2.5 py-1 rounded-lg text-[11px] font-extrabold flex items-center gap-1 transition bg-indigo-600 text-white shadow-xs shrink-0">
            <i class="fa-solid fa-bolt text-[10px]"></i> PRN222
          </button>
          <button onclick="switchSubject('pru213')" id="subPillMobile_pru213" class="px-2.5 py-1 rounded-lg text-[11px] font-bold flex items-center gap-1 transition bg-slate-100 text-slate-600 shrink-0">
            <i class="fa-solid fa-gamepad text-[10px]"></i> PRU213
          </button>
          <button onclick="switchSubject('tinhoc')" id="subPillMobile_tinhoc" class="px-2.5 py-1 rounded-lg text-[11px] font-bold flex items-center gap-1 transition bg-slate-100 text-slate-600 shrink-0">
            <i class="fa-solid fa-desktop text-[10px]"></i> Tin Học
          </button>
        </div>

        <!-- Row 2: Dynamic Exam Switcher Tabs for Current Subject -->
        <div class="flex items-center justify-between gap-2 pt-1 border-t border-slate-100">
          <div class="flex items-center gap-1.5 sm:gap-2 overflow-x-auto no-scrollbar py-0.5 w-full" id="examTabsRow">
            <!-- Populated dynamically based on active subject -->
          </div>
        </div>

        <!-- Row 3 (Mobile Only): Mode Switcher Tabs -->
        <div class="sm:hidden bg-slate-100 p-1 rounded-xl grid grid-cols-3 items-center border border-slate-200 text-xs font-medium">
          <button id="btnPracticeModeMobile" onclick="switchMode('practice')" class="px-2 py-1.5 rounded-lg transition-all font-semibold flex items-center justify-center gap-1.5 bg-white text-blue-600 shadow-xs">
            <i class="fa-solid fa-bolt-lightning text-amber-500"></i> <span>Luyện tập</span>
          </button>
          <button id="btnExamModeMobile" onclick="switchMode('exam')" class="px-2 py-1.5 rounded-lg transition-all font-semibold flex items-center justify-center gap-1.5 text-slate-600">
            <i class="fa-solid fa-clock text-blue-500"></i> <span>Thi thử</span>
          </button>
          <button id="btnStudyModeMobile" onclick="switchMode('study')" class="px-2 py-1.5 rounded-lg transition-all font-semibold flex items-center justify-center gap-1.5 text-slate-600">
            <i class="fa-solid fa-book-open text-indigo-500"></i> <span>Đọc đáp án</span>
          </button>
        </div>
      </div>

    </div>

    <!-- Mobile Live Progress Strip -->
    <div id="mobileProgressStrip" class="hidden lg:hidden bg-slate-50/90 border-t border-slate-200/80 px-3 py-1 flex items-center justify-between gap-3 text-[11px] transition-all">
      <div class="flex items-center gap-2 font-semibold text-slate-600 shrink-0">
        <span>Đã làm: <strong id="mProgressAnswered" class="text-slate-900">0</strong>/<span id="mProgressTotal">50</span></span>
        <span class="text-slate-300">|</span>
        <span class="text-emerald-600 font-bold"><i class="fa-solid fa-check mr-0.5"></i><span id="mProgressCorrect">0</span></span>
        <span class="text-rose-600 font-bold"><i class="fa-solid fa-xmark mr-0.5"></i><span id="mProgressWrong">0</span></span>
      </div>
      <div class="flex-1 bg-slate-200 rounded-full h-1.5 overflow-hidden flex max-w-[140px]">
        <div id="mBarCorrect" class="bg-emerald-500 h-1.5 transition-all duration-300" style="width: 0%"></div>
        <div id="mBarWrong" class="bg-rose-500 h-1.5 transition-all duration-300" style="width: 0%"></div>
      </div>
      <span id="mScoreBadge" class="px-2 py-0.5 rounded-full text-[10px] font-extrabold bg-blue-100 text-blue-700 shrink-0">0%</span>
    </div>
  </header>

  <!-- Main Content Layout -->
  <main class="max-w-7xl mx-auto px-2.5 sm:px-6 lg:px-8 py-2 sm:py-4 flex-1 w-full grid grid-cols-1 lg:grid-cols-12 gap-2.5 sm:gap-6 items-start">

    <!-- Left Column: Quiz Questions (Can expand to col-span-12 when sidebar collapsed) -->
    <div id="mainQuestionsColumn" class="lg:col-span-12 flex flex-col gap-2.5 sm:gap-3.5 transition-all duration-200">

      <!-- Action & Filter Bar (Collapsible Component) -->
      <div class="bg-white rounded-xl sm:rounded-2xl border border-slate-200/90 shadow-2xs transition-all overflow-hidden" id="filterBarContainer">
        <!-- Filter Bar Header / Toggle Bar -->
        <div class="py-1.5 px-3 sm:p-3 flex items-center justify-between gap-2 border-b border-slate-100 bg-slate-50/50">
          <div class="flex items-center gap-2 min-w-0">
            <span class="text-[11px] font-extrabold text-slate-700 uppercase tracking-wider flex items-center gap-1.5">
              <i class="fa-solid fa-sliders text-blue-600"></i> Bộ lọc & Tùy chọn
            </span>
            <span id="filterSummaryBadge" class="text-[10px] font-bold bg-blue-100 text-blue-700 px-2 py-0.5 rounded-full truncate">Tất cả (50)</span>
          </div>

          <div class="flex items-center gap-1.5 shrink-0">
            <!-- Collapse / Expand Filter Bar Button -->
            <button onclick="toggleFilterCollapse()" id="btnFilterCollapse" class="px-2 py-0.5 rounded-lg border border-slate-200 bg-white hover:bg-slate-100 text-slate-600 text-[11px] font-semibold flex items-center gap-1 transition" title="Thu gọn / Mở rộng bộ lọc">
              <span id="txtFilterCollapse">Mở rộng</span>
              <i id="iconFilterCollapse" class="fa-solid fa-chevron-down text-[9px]"></i>
            </button>
          </div>
        </div>

        <!-- Filter Bar Body (Can collapse) -->
        <div id="filterBarBody" class="hidden p-3 sm:p-4 flex flex-col sm:flex-row sm:flex-wrap sm:items-center justify-between gap-2.5 sm:gap-3 text-sm transition-all">
          <div class="flex items-center gap-1.5 sm:gap-2 overflow-x-auto no-scrollbar pb-0.5 sm:pb-0 -mx-1 px-1">
            <button onclick="setFilter('all')" id="filterAll" class="px-2.5 py-1 text-xs rounded-xl font-semibold bg-blue-100 text-blue-700 border border-blue-200 shrink-0 transition">
              Tất cả (<span id="countAll">50</span>)
            </button>
            <button onclick="setFilter('unanswered')" id="filterUnanswered" class="px-2.5 py-1 text-xs rounded-xl font-medium bg-slate-100 text-slate-600 hover:bg-slate-200 border border-transparent shrink-0 transition">
              Chưa làm (<span id="countUnanswered">50</span>)
            </button>
            <button onclick="setFilter('wrong')" id="filterWrong" class="px-2.5 py-1 text-xs rounded-xl font-medium bg-slate-100 text-slate-600 hover:bg-slate-200 border border-transparent shrink-0 transition">
              Câu sai (<span id="countWrong">0</span>)
            </button>
            <button onclick="setFilter('starred')" id="filterStarred" class="px-2.5 py-1 text-xs rounded-xl font-medium bg-amber-50 text-amber-700 hover:bg-amber-100 border border-amber-200 shrink-0 transition">
              <i class="fa-solid fa-star text-amber-500 mr-1"></i>Đã lưu (<span id="countStarred">0</span>)
            </button>
          </div>

          <div class="flex items-center justify-between sm:justify-end gap-3 text-xs border-t sm:border-t-0 border-slate-100 pt-2 sm:pt-0">
            <label class="flex items-center gap-1.5 cursor-pointer text-slate-600 select-none">
              <input type="checkbox" id="chkAutoCheck" checked onchange="toggleAutoCheck(this.checked)" class="rounded text-blue-600 focus:ring-blue-500 w-3.5 h-3.5">
              <span class="font-medium text-[11px] sm:text-xs">Hiện đáp án & giải thích</span>
            </label>
            <label class="flex items-center gap-1.5 cursor-pointer text-slate-600 select-none" id="wrapAutoNext">
              <input type="checkbox" id="chkAutoNext" onchange="toggleAutoNext(this.checked)" class="rounded text-indigo-600 focus:ring-indigo-500 w-3.5 h-3.5">
              <span class="font-medium text-[11px] sm:text-xs text-indigo-700">Tự qua câu</span>
            </label>
          </div>
        </div>
      </div>

      <!-- Active Filter Banner -->
      <div id="filterBanner" class="hidden bg-amber-50 border border-amber-200 text-amber-800 px-3.5 py-2 rounded-xl text-xs flex items-center justify-between">
        <span class="flex items-center gap-1.5 font-semibold">
          <i class="fa-solid fa-filter text-amber-600"></i> Chế độ: <strong>Chỉ ôn các câu đã đánh dấu ⭐</strong>
        </span>
        <button onclick="setFilter('all')" class="text-blue-600 hover:underline font-bold shrink-0 ml-2">Hiện tất cả</button>
      </div>

      <!-- Single-Card Mode Navigation Header (Desktop only to save vertical space on mobile) -->
      <div id="singleModeHeader" class="hidden sm:hidden md:flex bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-3.5 py-2 rounded-xl shadow-xs items-center justify-between text-xs">
        <div class="flex items-center gap-2 font-bold">
          <i class="fa-solid fa-mobile-screen-button"></i>
          <span>Câu <span id="singleCurrentIdx">1</span> / <span id="singleTotalIdx">50</span></span>
        </div>
        <div class="flex items-center gap-2 text-blue-100 text-[11px]">
          <i class="fa-solid fa-hand-pointer"></i>
          <span class="hidden sm:inline">Vuốt trái/phải hoặc dùng thanh dưới để chuyển câu</span>
        </div>
      </div>

      <!-- Question List Container -->
      <div id="questionList" class="flex flex-col gap-2.5 sm:gap-3.5">
        <!-- Rendered dynamically -->
      </div>

      <!-- Submit Bar (for Exam Mode) -->
      <div id="examSubmitBar" class="hidden bg-white p-3.5 sm:p-4 rounded-2xl border border-slate-200 shadow-lg flex items-center justify-between gap-3 sticky bottom-20 lg:bottom-4 z-30">
        <div>
          <div class="text-xs sm:text-sm font-bold text-slate-900">Hoàn thành bài thi thử?</div>
          <div class="text-[11px] sm:text-xs text-slate-500">Đã trả lời <span id="submitAnsweredCount" class="font-bold text-blue-600">0</span>/<span id="submitTotalCount">50</span> câu hỏi.</div>
        </div>
        <button onclick="submitExam()" class="px-4 sm:px-6 py-2 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 active:scale-95 text-white font-semibold rounded-xl shadow-md shadow-blue-500/20 text-xs sm:text-sm transition flex items-center gap-2 shrink-0">
          <span>Nộp bài</span>
          <i class="fa-solid fa-paper-plane text-xs"></i>
        </button>
      </div>

    </div>

    <!-- Right Column: Sidebar Danh Sách Đề + Palette & Quick Stats (Collapsible on Desktop) -->
    <div id="sidebarColumn" class="hidden flex-col gap-3.5 sticky top-20 transition-all duration-200">

      <!-- Sidebar Top Action Row: Full Sidebar Collapse Toggle -->
      <div class="flex items-center justify-between px-1 text-xs">
        <span class="font-extrabold text-slate-500 uppercase tracking-wider text-[10px]">Tiện ích bên</span>
        <button onclick="toggleSidebarFull()" id="btnToggleSidebar" class="text-slate-500 hover:text-slate-800 font-semibold flex items-center gap-1 transition">
          <i id="iconToggleSidebar" class="fa-solid fa-chevron-left text-[10px]"></i>
          <span id="txtToggleSidebar">Thu gọn</span>
        </button>
      </div>

      <!-- Sidebar Card 1: Progress Summary (Collapsible) -->
      <div class="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden" id="cardProgress">
        <div class="p-3 bg-slate-50/70 border-b border-slate-100 flex items-center justify-between cursor-pointer" onclick="toggleCardCollapse('progressCardBody', 'iconProgressList')">
          <div class="font-bold text-slate-900 text-xs sm:text-sm flex items-center gap-2">
            <i class="fa-solid fa-chart-pie text-blue-600"></i> Tiến độ ôn luyện
          </div>
          <div class="flex items-center gap-2">
            <span id="scoreBadge" class="px-2 py-0.5 rounded-full text-[10px] font-bold bg-slate-100 text-slate-700">0%</span>
            <button class="w-6 h-6 rounded-lg text-slate-400 hover:text-slate-600 flex items-center justify-center transition">
              <i id="iconProgressList" class="fa-solid fa-chevron-up text-xs"></i>
            </button>
          </div>
        </div>

        <div id="progressCardBody" class="p-4 flex flex-col gap-3 transition-all">
          <div>
            <div class="flex justify-between text-xs text-slate-600 mb-1.5">
              <span>Đã làm: <strong id="progressAnswered">0</strong> / <span id="progressTotal">50</span></span>
              <span>Đúng: <strong id="progressCorrect" class="text-emerald-600">0</strong> | Sai: <strong id="progressWrong" class="text-rose-600">0</strong></span>
            </div>
            <div class="w-full bg-slate-100 rounded-full h-2 overflow-hidden flex">
              <div id="barCorrect" class="bg-emerald-500 h-2 transition-all duration-300" style="width: 0%"></div>
              <div id="barWrong" class="bg-rose-500 h-2 transition-all duration-300" style="width: 0%"></div>
            </div>
          </div>

          <div class="grid grid-cols-3 gap-2 text-center pt-0.5">
            <div class="bg-slate-50 p-2 rounded-xl border border-slate-100">
              <div class="text-[10px] text-slate-500">Đã trả lời</div>
              <div id="statAnswered" class="text-base font-bold text-slate-800">0</div>
            </div>
            <div class="bg-emerald-50 p-2 rounded-xl border border-emerald-100">
              <div class="text-[10px] text-emerald-700">Chính xác</div>
              <div id="statCorrect" class="text-base font-bold text-emerald-600">0</div>
            </div>
            <div class="bg-rose-50 p-2 rounded-xl border border-rose-100">
              <div class="text-[10px] text-rose-700">Cần ôn lại</div>
              <div id="statWrong" class="text-base font-bold text-rose-600">0</div>
            </div>
          </div>
        </div>
      </div>

      <!-- Sidebar Card 2: Question Jump Palette (Collapsible) -->
      <div class="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden" id="cardPalette">
        <div class="p-3 bg-slate-50/70 border-b border-slate-100 flex items-center justify-between cursor-pointer" onclick="toggleCardCollapse('paletteCardBody', 'iconPaletteList')">
          <div class="font-bold text-slate-900 text-xs sm:text-sm flex items-center gap-2">
            <i class="fa-solid fa-grip text-indigo-600"></i> Bảng câu hỏi (<span id="gridTotalCount">50</span>)
          </div>
          <button class="w-6 h-6 rounded-lg text-slate-400 hover:text-slate-600 flex items-center justify-center transition">
            <i id="iconPaletteList" class="fa-solid fa-chevron-up text-xs"></i>
          </button>
        </div>

        <div id="paletteCardBody" class="p-3.5 flex flex-col gap-2.5 transition-all">
          <div class="grid grid-cols-5 gap-1.5 max-h-56 overflow-y-auto pr-1 custom-scrollbar" id="questionGrid">
            <!-- Rendered dynamically -->
          </div>

          <div class="flex items-center justify-between text-[10px] text-slate-500 border-t border-slate-100 pt-2 flex-wrap gap-1">
            <span class="flex items-center gap-1"><span class="w-2 h-2 rounded-xs bg-emerald-500 inline-block"></span> Đúng</span>
            <span class="flex items-center gap-1"><span class="w-2 h-2 rounded-xs bg-rose-500 inline-block"></span> Sai</span>
            <span class="flex items-center gap-1"><span class="w-2 h-2 rounded-xs bg-blue-500 inline-block"></span> Đã chọn</span>
            <span class="flex items-center gap-1"><span class="w-2 h-2 rounded-xs bg-slate-200 inline-block"></span> Chưa làm</span>
            <span class="flex items-center gap-1"><i class="fa-solid fa-star text-amber-500 text-[9px]"></i> Đã lưu</span>
          </div>
        </div>
      </div>

    </div>

    <!-- Floating Expand Button for Sidebar (Shown when sidebar is completely collapsed on Desktop) -->
    <div id="sidebarExpandFloating" class="hidden fixed right-4 bottom-6 z-30">
      <button onclick="toggleSidebarFull()" class="py-2.5 px-3.5 rounded-2xl bg-slate-900 text-white font-bold text-xs flex items-center gap-2 shadow-xl hover:bg-slate-800 active:scale-95 transition">
        <i class="fa-solid fa-bars"></i>
        <span>Hiện Bảng câu hỏi</span>
      </button>
    </div>

  </main>

  <!-- Mobile Bottom Navigation & Action Dock -->
  <div class="lg:hidden fixed bottom-0 inset-x-0 bg-white/95 backdrop-blur-md border-t border-slate-200 z-40 safe-bottom shadow-[0_-4px_20px_rgba(15,23,42,0.08)]">
    <div class="max-w-xl mx-auto px-3 py-2 flex items-center justify-between gap-2">
      <!-- Previous Question Button -->
      <button onclick="prevQuestion()" id="btnMobilePrev" class="flex-1 py-2 px-3 rounded-xl bg-slate-100 active:bg-slate-200 text-slate-700 font-bold text-xs flex items-center justify-center gap-1.5 transition disabled:opacity-40">
        <i class="fa-solid fa-chevron-left text-[11px]"></i>
        <span>Trước</span>
      </button>

      <!-- Open Question Palette Bottom Sheet Button -->
      <button onclick="openMobileDrawer()" class="py-2 px-4 rounded-xl bg-indigo-50 border border-indigo-200 active:bg-indigo-100 text-indigo-700 font-extrabold text-xs flex items-center justify-center gap-1.5 shrink-0 shadow-xs" title="Bảng câu hỏi">
        <i class="fa-solid fa-table-cells-large text-[12px]"></i>
        <span>Câu <span id="mobileNavCounter">1/50</span></span>
      </button>

      <!-- Next Question Button -->
      <button onclick="nextQuestion()" id="btnMobileNext" class="flex-1 py-2 px-3 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 active:from-blue-700 active:to-indigo-700 text-white font-bold text-xs flex items-center justify-center gap-1.5 shadow-md shadow-blue-500/20 transition disabled:opacity-40">
        <span>Tiếp</span>
        <i class="fa-solid fa-chevron-right text-[11px]"></i>
      </button>
    </div>
  </div>

  <!-- Mobile Bottom Sheet Drawer: Question Palette & Stats -->
  <div id="mobileDrawer" class="fixed inset-0 bg-slate-900/60 backdrop-blur-xs z-50 hidden flex-col justify-end">
    <div class="bg-white rounded-t-3xl w-full max-h-[85vh] flex flex-col overflow-hidden shadow-2xl animate-slide-up safe-bottom">
      <div class="px-5 pt-3 pb-3 border-b border-slate-100 flex flex-col gap-2">
        <div class="w-10 h-1.5 bg-slate-200 rounded-full mx-auto"></div>
        <div class="flex items-center justify-between">
          <div class="font-extrabold text-slate-900 text-base flex items-center gap-2">
            <i class="fa-solid fa-grip text-indigo-600"></i> Bảng câu hỏi (<span id="mDrawerTitleExam">Đề 1</span>)
          </div>
          <button onclick="closeMobileDrawer()" class="w-8 h-8 rounded-full bg-slate-100 text-slate-500 flex items-center justify-center active:bg-slate-200">
            <i class="fa-solid fa-xmark"></i>
          </button>
        </div>
      </div>

      <div class="p-4 overflow-y-auto space-y-4">
        <!-- Quick Summary in Drawer -->
        <div class="grid grid-cols-3 gap-2 text-center">
          <div class="bg-slate-50 p-2.5 rounded-2xl border border-slate-100">
            <div class="text-[11px] text-slate-500">Đã làm</div>
            <div id="mDrawerAnswered" class="text-base font-extrabold text-slate-800">0/50</div>
          </div>
          <div class="bg-emerald-50 p-2.5 rounded-2xl border border-emerald-100">
            <div class="text-[11px] text-emerald-700">Chính xác</div>
            <div id="mDrawerCorrect" class="text-base font-extrabold text-emerald-600">0</div>
          </div>
          <div class="bg-rose-50 p-2.5 rounded-2xl border border-rose-100">
            <div class="text-[11px] text-rose-700">Làm sai</div>
            <div id="mDrawerWrong" class="text-base font-extrabold text-rose-600">0</div>
          </div>
        </div>

        <div class="flex items-center justify-around text-[11px] text-slate-500 bg-slate-50 py-2 px-3 rounded-xl border border-slate-100">
          <span class="flex items-center gap-1"><span class="w-2.5 h-2.5 rounded-sm bg-emerald-500 inline-block"></span> Đúng</span>
          <span class="flex items-center gap-1"><span class="w-2.5 h-2.5 rounded-sm bg-rose-500 inline-block"></span> Sai</span>
          <span class="flex items-center gap-1"><span class="w-2.5 h-2.5 rounded-sm bg-slate-200 inline-block"></span> Chưa làm</span>
          <span class="flex items-center gap-1"><i class="fa-solid fa-star text-amber-500 text-[10px]"></i> Đã lưu</span>
        </div>

        <div class="grid grid-cols-5 sm:grid-cols-8 gap-2 pb-3" id="mobileQuestionGrid">
          <!-- Rendered dynamically -->
        </div>
      </div>
    </div>
  </div>

  <!-- Modal: Danh Sách Bộ Đề (Exam Picker & Progress Overview for Both Subjects) -->
  <div id="examPickerModal" class="fixed inset-0 bg-slate-900/70 backdrop-blur-xs z-50 hidden items-end sm:items-center justify-center p-0 sm:p-4">
    <div class="bg-white rounded-t-3xl sm:rounded-3xl max-w-2xl w-full max-h-[90vh] flex flex-col overflow-hidden shadow-2xl border border-slate-200 animate-slide-up safe-bottom">
      <div class="px-4 sm:px-5 py-3 sm:py-3.5 border-b border-slate-100 flex items-center justify-between bg-slate-50">
        <div>
          <span class="text-[10px] font-bold text-amber-600 uppercase tracking-widest flex items-center gap-1">
            <i class="fa-solid fa-folder text-amber-500"></i> Thư mục đề thi
          </span>
          <h3 class="text-sm sm:text-base font-extrabold text-slate-900 flex items-center gap-2">
            Danh sách đề thi trắc nghiệm theo môn
          </h3>
        </div>
        <button onclick="closeExamPickerModal()" class="w-8 h-8 rounded-full bg-slate-200/70 hover:bg-slate-200 text-slate-600 flex items-center justify-center transition">
          <i class="fa-solid fa-xmark"></i>
        </button>
      </div>
      <div class="p-3 sm:p-4 overflow-y-auto space-y-3" id="modalExamCards">
        <!-- Populated dynamically -->
      </div>
    </div>
  </div>

  <!-- Modal View Original Image (for PRU213 questions with image) -->
  <div id="imageModal" class="fixed inset-0 bg-slate-900/80 backdrop-blur-sm z-50 hidden flex items-center justify-center p-2.5 sm:p-4">
    <div class="bg-white rounded-2xl max-w-4xl w-full max-h-[92vh] flex flex-col overflow-hidden shadow-2xl border border-slate-200">
      <div class="px-4 py-3 border-b border-slate-200 flex items-center justify-between bg-slate-50">
        <div class="font-bold text-slate-900 text-xs sm:text-sm flex items-center gap-2">
          <i class="fa-solid fa-image text-blue-600"></i> Ảnh gốc đề thi - <span id="modalImageTitle">Câu 1</span>
        </div>
        <button onclick="closeImageModal()" class="w-8 h-8 rounded-lg hover:bg-slate-200 active:bg-slate-300 text-slate-500 hover:text-slate-800 flex items-center justify-center transition">
          <i class="fa-solid fa-xmark text-base"></i>
        </button>
      </div>
      <div class="p-2 sm:p-4 overflow-auto flex items-center justify-center bg-slate-100">
        <img id="modalImageSrc" src="" alt="Ảnh câu hỏi" class="max-w-full max-h-[78vh] object-contain rounded-lg shadow-sm border border-slate-200 bg-white">
      </div>
    </div>
  </div>

  <script>
    const SUBJECTS = ${JSON.stringify(SUBJECTS_DATA, null, 2)};
    const EXAMS = ${JSON.stringify(EXAMS_DATA, null, 2)};
    const BASE_PREFIX = typeof window.ASSET_PREFIX === 'string' ? window.ASSET_PREFIX : '';

    let activeSubjectId = 'prn222';
    let activeExamId = 'prn222_1';
    let RAW_QUESTIONS = [];
    let questions = [];
    let userAnswers = {};
    let starredQuestions = new Set();
    let currentMode = 'practice'; // 'practice' | 'exam' | 'study'
    let currentFilter = 'all';    // 'all' | 'unanswered' | 'wrong' | 'starred'
    let autoCheck = true;
    let autoNext = false;
    let viewLayout = window.innerWidth < 768 ? 'single' : 'list';
    let currentIndex = 0;
    let timerInterval = null;
    let timeRemaining = 50 * 60;
    let examSubmitted = false;

    // Collapsible Component States - Default to FULLY COLLAPSED
    let isHeaderCollapsed = true;
    let isFilterCollapsed = true;
    let isSidebarCollapsed = true;
    let isCompactDensity = true;
    let openExplanations = new Set(); // Track which explanation accordion is opened

    function getStorageKey(examId) {
      return EXAMS[examId].storagePrefix + '_quiz_state';
    }
    function getStarKey(examId) {
      return EXAMS[examId].storagePrefix + '_starred';
    }

    function getExamStatsSummary(examId) {
      const ex = EXAMS[examId];
      if (!ex) return { total: 0, answered: 0, correct: 0 };
      const total = ex.questions.length;
      let answered = 0;
      let correct = 0;
      try {
        const saved = JSON.parse(localStorage.getItem(getStorageKey(examId)) || '{}');
        const ans = saved.userAnswers || {};
        ex.questions.forEach(q => {
          if (ans[q.id] !== undefined) {
            answered++;
            if (ans[q.id] === q.answer) correct++;
          }
        });
      } catch (e) {}
      return { total, answered, correct };
    }

    function switchSubject(subId) {
      if (!SUBJECTS[subId]) subId = 'prn222';
      activeSubjectId = subId;
      const firstExam = SUBJECTS[subId].exams[0];
      switchExam(firstExam, true);
    }

    function switchExam(examId, updateUrl = true) {
      if (!EXAMS[examId]) examId = 'prn222_1';
      stopTimer();
      activeExamId = examId;
      activeSubjectId = EXAMS[examId].subject || 'prn222';
      document.title = 'Ôn Tập';
      localStorage.setItem('fpt_last_active_exam', examId);

      if (updateUrl && history.replaceState) {
        const url = new URL(window.location.href);
        url.searchParams.set('de', examId);
        history.replaceState(null, '', url.toString());
      }

      const exam = EXAMS[examId];
      RAW_QUESTIONS = [...exam.questions];
      questions = [...RAW_QUESTIONS];
      currentIndex = 0;
      currentFilter = 'all';
      timeRemaining = exam.timeMinutes * 60;
      examSubmitted = false;
      userAnswers = {};
      starredQuestions = new Set();
      openExplanations.clear();

      // Update Header Info
      document.getElementById('headerExamCode').innerText = exam.code;
      document.getElementById('headerExamTitle').innerText = exam.title;
      document.getElementById('headerBrandIcon').className = activeSubjectId === 'prn222' ? 'fa-solid fa-bolt text-base sm:text-lg' : (activeSubjectId === 'tinhoc' ? 'fa-solid fa-desktop text-base sm:text-lg' : 'fa-solid fa-gamepad text-base sm:text-lg');

      // Update Mobile Header Elements
      const mIcon = document.getElementById('headerBrandIconMobile');
      if (mIcon) {
        mIcon.className = activeSubjectId === 'prn222' ? 'fa-solid fa-bolt text-xs' : (activeSubjectId === 'tinhoc' ? 'fa-solid fa-desktop text-xs' : 'fa-solid fa-gamepad text-xs');
      }
      const mBadge = document.getElementById('headerSubjectBadgeMobile');
      if (mBadge) {
        mBadge.innerText = SUBJECTS[activeSubjectId].name;
        mBadge.className = activeSubjectId === 'prn222'
          ? 'px-1.5 py-0.5 rounded text-[10px] font-extrabold bg-indigo-100 text-indigo-700 shrink-0'
          : (activeSubjectId === 'tinhoc'
              ? 'px-1.5 py-0.5 rounded text-[10px] font-extrabold bg-emerald-100 text-emerald-700 shrink-0'
              : 'px-1.5 py-0.5 rounded text-[10px] font-extrabold bg-blue-100 text-blue-700 shrink-0');
      }
      const mTitle = document.getElementById('headerExamTitleMobile');
      if (mTitle) {
        mTitle.innerText = exam.title;
      }
      
      // Update Mobile dock label
      const dockExamEl = document.getElementById('mobileDockExamName');
      if (dockExamEl) {
        let dockShort = exam.shortName;
        if (examId === 'prn222_1') dockShort = 'PRN 1';
        else if (examId === 'prn222_2') dockShort = 'PRN 2';
        else if (examId === 'prn222_3') dockShort = 'PRN 3';
        else if (examId === 'prn222_all') dockShort = 'PRN ALL';
        else if (examId === 'sp26') dockShort = 'SP26';
        else if (examId === 'su26') dockShort = 'SU26';
        else if (examId === 'all') dockShort = 'PRU ALL';
        else if (examId === 'tinhoc_1') dockShort = 'TH 1';
        else if (examId === 'tinhoc_2') dockShort = 'TH 2';
        else if (examId === 'tinhoc_3') dockShort = 'TH 3';
        dockExamEl.innerText = dockShort;
      }
      const mDrawerTitle = document.getElementById('mDrawerTitleExam');
      if (mDrawerTitle) mDrawerTitle.innerText = exam.shortName;
      const sidebarSubjectEl = document.getElementById('sidebarSubjectLabel');
      if (sidebarSubjectEl) sidebarSubjectEl.innerText = SUBJECTS[activeSubjectId].name;

      // Update Subject pills (desktop & mobile toolbar)
      ['prn222', 'pru213', 'tinhoc'].forEach(sId => {
        const pill = document.getElementById('subPill_' + sId);
        const mPill = document.getElementById('subPillMobile_' + sId);
        const isAct = sId === activeSubjectId;
        const activeColor = sId === 'prn222' ? 'bg-indigo-600 text-white shadow-xs' : (sId === 'tinhoc' ? 'bg-emerald-600 text-white shadow-xs' : 'bg-blue-600 text-white shadow-xs');
        if (pill) {
          pill.className = isAct
            ? 'px-2 py-0.5 rounded-lg text-[11px] font-extrabold flex items-center gap-1 transition ' + activeColor
            : 'px-2 py-0.5 rounded-lg text-[11px] font-bold flex items-center gap-1 transition bg-slate-100 text-slate-600 hover:bg-slate-200';
        }
        if (mPill) {
          mPill.className = isAct
            ? 'px-2.5 py-1 rounded-lg text-[11px] font-extrabold flex items-center gap-1 transition shrink-0 ' + activeColor
            : 'px-2.5 py-1 rounded-lg text-[11px] font-bold flex items-center gap-1 transition bg-slate-100 text-slate-600 shrink-0';
        }
      });

      loadSavedState();
      setFilter('all');
      renderExamTabsAndCards();
      renderQuestions();
      renderGrid();
      updateStats();
    }

    function renderExamTabsAndCards() {
      // Render Exam Tabs Row for active subject
      const tabsRow = document.getElementById('examTabsRow');
      if (tabsRow) {
        const sub = SUBJECTS[activeSubjectId];
        tabsRow.innerHTML = sub.exams.map(eId => {
          const ex = EXAMS[eId];
          const st = getExamStatsSummary(eId);
          const isActive = eId === activeExamId;
          const activeBg = sub.id === 'prn222' ? 'bg-gradient-to-r from-indigo-600 to-purple-600' : (sub.id === 'tinhoc' ? 'bg-gradient-to-r from-emerald-600 to-teal-600' : 'bg-gradient-to-r from-blue-600 to-indigo-600');
          return \`
            <button onclick="switchExam('\${eId}')" id="tabExam_\${eId}" class="px-2.5 sm:px-3 py-1.5 rounded-xl text-xs font-bold transition flex items-center gap-1.5 sm:gap-2 shrink-0 \${isActive ? activeBg + ' text-white shadow-sm' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'}">
              <i class="fa-solid \${eId.includes('all') ? 'fa-layer-group' : 'fa-file-lines'} text-[11px]"></i>
              <span>\${ex.shortName}</span>
              <span class="px-1.5 py-0.2 rounded-md text-[10px] font-extrabold \${isActive ? 'bg-white/20 text-white' : (st.answered > 0 ? 'bg-emerald-100 text-emerald-700' : 'bg-slate-200 text-slate-600')}">\${st.answered}/\${st.total}</span>
            </button>
          \`;
        }).join('');
      }

      // Render Desktop Sidebar Exam List
      const sidebarList = document.getElementById('sidebarExamList');
      if (sidebarList) {
        const sub = SUBJECTS[activeSubjectId];
        sidebarList.innerHTML = sub.exams.map(id => {
          const ex = EXAMS[id];
          const st = getExamStatsSummary(id);
          const isActive = id === activeExamId;
          const pct = st.answered > 0 ? Math.round((st.correct / st.answered) * 100) : 0;
          return \`
            <button onclick="switchExam('\${id}')" class="w-full text-left p-2 rounded-xl border transition flex items-center justify-between gap-2 \${isActive ? 'border-blue-500 bg-blue-50/70 text-blue-950 font-bold ring-1 ring-blue-500' : 'border-slate-200 hover:bg-slate-50 text-slate-700'}">
              <div class="min-w-0">
                <div class="text-xs font-bold truncate flex items-center gap-1.5">
                  <span class="w-2 h-2 rounded-full \${isActive ? 'bg-blue-600' : 'bg-slate-300'}"></span>
                  \${ex.title}
                </div>
                <div class="text-[11px] text-slate-500 pl-3.5">Đã làm: \${st.answered}/\${st.total} câu \${st.answered > 0 ? '• Đúng ' + pct + '%' : ''}</div>
              </div>
              <span class="px-2 py-0.5 rounded-lg text-[10px] font-extrabold shrink-0 \${isActive ? 'bg-blue-600 text-white' : 'bg-slate-100 text-slate-600'}">\${st.total} câu</span>
            </button>
          \`;
        }).join('');
      }

      // Render Modal Exam Cards as Folder-Style Directory Tree
      const modalContainer = document.getElementById('modalExamCards');
      if (modalContainer) {
        modalContainer.innerHTML = ['prn222', 'pru213', 'tinhoc'].map(sId => {
          const sub = SUBJECTS[sId];
          const isCollapsed = collapsedFolders.has(sId);
          const folderIcon = isCollapsed ? 'fa-folder' : 'fa-folder-open';
          const chevronClass = isCollapsed ? 'transform -rotate-90' : '';
          const bodyDisplay = isCollapsed ? 'hidden' : 'flex';
          const subBadgeColor = sId === 'prn222' ? 'bg-indigo-100 text-indigo-700' : (sId === 'tinhoc' ? 'bg-emerald-100 text-emerald-700' : 'bg-blue-100 text-blue-700');

          const examItemsHtml = sub.exams.map(eId => {
            const ex = EXAMS[eId];
            const st = getExamStatsSummary(eId);
            const isActive = eId === activeExamId;
            const pct = st.answered > 0 ? Math.round((st.correct / st.answered) * 100) : 0;
            return \`
              <div onclick="switchExam('\${eId}'); closeExamPickerModal();" 
                   class="group cursor-pointer px-3 py-2 sm:py-2.5 rounded-xl border transition-all flex items-center justify-between gap-2.5 \${isActive ? 'bg-blue-50/90 border-blue-400 ring-1 ring-blue-400 text-blue-950 font-bold' : 'bg-white hover:bg-slate-50 border-slate-200/80 hover:border-blue-300 text-slate-800'}">
                <div class="flex items-center gap-2.5 min-w-0">
                  <span class="w-6 h-6 sm:w-7 sm:h-7 rounded-lg flex items-center justify-center shrink-0 \${isActive ? 'bg-blue-600 text-white shadow-xs' : 'bg-slate-100 text-slate-500 group-hover:bg-blue-100 group-hover:text-blue-700'} text-xs">
                    <i class="fa-solid \${eId.includes('all') ? 'fa-layer-group' : 'fa-file-lines'}"></i>
                  </span>
                  <div class="min-w-0 flex flex-col">
                    <div class="flex items-center gap-2 flex-wrap">
                      <span class="text-xs sm:text-[13px] font-bold truncate">\${ex.title}</span>
                      \${isActive ? '<span class="px-1.5 py-0.2 rounded text-[10px] font-extrabold bg-blue-600 text-white shrink-0">Đang học</span>' : ''}
                    </div>
                    <div class="flex items-center gap-1.5 sm:gap-2 text-[10px] sm:text-[11px] text-slate-500 flex-wrap">
                      <span><i class="fa-regular fa-clock text-[10px]"></i> \${ex.timeMinutes}p</span>
                      <span>•</span>
                      <span>\${st.total} câu</span>
                      <span>•</span>
                      <span class="\${st.answered > 0 ? 'text-emerald-600 font-semibold' : 'text-slate-400'}">
                        Đã làm \${st.answered}/\${st.total} (\${pct}% đúng)
                      </span>
                    </div>
                  </div>
                </div>
                <div class="shrink-0 flex items-center pl-1">
                  <span class="text-xs font-semibold \${isActive ? 'text-blue-700' : 'text-slate-400 group-hover:text-blue-600'} flex items-center gap-1">
                    \${isActive ? '<i class="fa-solid fa-circle-check text-blue-600 text-sm"></i>' : '<span class="hidden sm:inline text-[11px]">Mở đề</span><i class="fa-solid fa-chevron-right text-[10px]"></i>'}
                  </span>
                </div>
              </div>
            \`;
          }).join('');

          return \`
            <div class="rounded-2xl border border-slate-200/90 bg-white overflow-hidden shadow-xs">
              <div onclick="toggleFolderCollapse('\${sId}')" class="px-3.5 py-2.5 sm:py-3 bg-slate-50 hover:bg-slate-100/80 cursor-pointer flex items-center justify-between gap-2 border-b border-slate-100 transition select-none">
                <div class="flex items-center gap-2.5 min-w-0">
                  <i class="fa-solid \${folderIcon} text-amber-500 text-base sm:text-lg shrink-0" id="folderIcon_\${sId}"></i>
                  <div class="flex items-center gap-1.5 truncate">
                    <span class="font-extrabold text-xs sm:text-sm text-slate-900">\${sub.name}</span>
                    <span class="text-xs text-slate-400 hidden sm:inline">•</span>
                    <span class="text-xs text-slate-600 hidden sm:inline truncate">\${sub.title}</span>
                  </div>
                  <span class="text-[10px] font-bold px-1.5 py-0.2 rounded-full \${subBadgeColor} shrink-0">\${sub.exams.length} Đề</span>
                </div>
                <div class="flex items-center gap-2 shrink-0">
                  <i class="fa-solid fa-chevron-down text-slate-400 text-xs transition-transform duration-200 \${chevronClass}" id="folderChevron_\${sId}"></i>
                </div>
              </div>
              <div id="folderBody_\${sId}" class="\${bodyDisplay} flex-col gap-1.5 p-2 sm:p-2.5 bg-slate-50/30">
                \${examItemsHtml}
              </div>
            </div>
          \`;
        }).join('');
      }
    }

    const collapsedFolders = new Set(['prn222', 'pru213', 'tinhoc']);
    function toggleFolderCollapse(sId) {
      const fBody = document.getElementById('folderBody_' + sId);
      const fChevron = document.getElementById('folderChevron_' + sId);
      const fIcon = document.getElementById('folderIcon_' + sId);
      if (!fBody) return;
      if (collapsedFolders.has(sId)) {
        collapsedFolders.delete(sId);
        fBody.classList.remove('hidden');
        fBody.classList.add('flex');
        if (fChevron) {
          fChevron.classList.remove('-rotate-90');
        }
        if (fIcon) fIcon.className = 'fa-solid fa-folder-open text-amber-500 text-base sm:text-lg shrink-0';
      } else {
        collapsedFolders.add(sId);
        fBody.classList.add('hidden');
        fBody.classList.remove('flex');
        if (fChevron) {
          fChevron.classList.add('-rotate-90');
        }
        if (fIcon) fIcon.className = 'fa-solid fa-folder text-amber-500 text-base sm:text-lg shrink-0';
      }
    }

    function openExamPickerModal() {
      // Always default all subject folders to collapsed state
      collapsedFolders.clear();
      ['prn222', 'pru213', 'tinhoc'].forEach(id => collapsedFolders.add(id));
      renderExamTabsAndCards();
      const m = document.getElementById('examPickerModal');
      m.classList.remove('hidden');
      m.classList.add('flex');
    }

    function closeExamPickerModal() {
      const m = document.getElementById('examPickerModal');
      m.classList.add('hidden');
      m.classList.remove('flex');
    }

    document.getElementById('examPickerModal').addEventListener('click', (e) => {
      if (e.target.id === 'examPickerModal') closeExamPickerModal();
    });

    // ==========================================
    // COLLAPSIBLE COMPONENT HANDLERS
    // ==========================================

    function toggleHeaderCollapse() {
      isHeaderCollapsed = !isHeaderCollapsed;
      applyHeaderCollapseUI();
      sessionStorage.setItem('fpt_ui_header_collapsed', isHeaderCollapsed ? '1' : '0');
    }

    function applyHeaderCollapseUI() {
      const area = document.getElementById('headerCollapsibleArea');
      const mobileStrip = document.getElementById('mobileProgressStrip');
      const iconD = document.getElementById('iconHeaderCollapseDesktop');
      const txtD = document.getElementById('txtHeaderCollapseDesktop');
      const iconM = document.getElementById('iconHeaderCollapseMobile');

      if (isHeaderCollapsed) {
        area.classList.add('hidden');
        if (mobileStrip) mobileStrip.classList.add('hidden');
        if (iconD) iconD.className = 'fa-solid fa-expand text-indigo-500';
        if (txtD) txtD.innerText = 'Mở rộng';
        if (iconM) iconM.className = 'fa-solid fa-expand text-indigo-500 text-[11px]';
      } else {
        area.classList.remove('hidden');
        if (mobileStrip) mobileStrip.classList.remove('hidden');
        if (iconD) iconD.className = 'fa-solid fa-compress text-indigo-500';
        if (txtD) txtD.innerText = 'Thu gọn';
        if (iconM) iconM.className = 'fa-solid fa-compress text-indigo-500 text-[11px]';
      }
    }

    function toggleFilterCollapse() {
      isFilterCollapsed = !isFilterCollapsed;
      applyFilterCollapseUI();
      sessionStorage.setItem('fpt_ui_filter_collapsed', isFilterCollapsed ? '1' : '0');
    }

    function applyFilterCollapseUI() {
      const body = document.getElementById('filterBarBody');
      const icon = document.getElementById('iconFilterCollapse');
      const txt = document.getElementById('txtFilterCollapse');
      const summary = document.getElementById('filterSummaryBadge');

      if (isFilterCollapsed) {
        body.classList.add('hidden');
        if (icon) icon.className = 'fa-solid fa-chevron-down text-[10px]';
        if (txt) txt.innerText = 'Mở rộng';
        if (summary) {
          summary.classList.remove('hidden');
          let label = 'Tất cả';
          if (currentFilter === 'unanswered') label = 'Chưa làm';
          else if (currentFilter === 'wrong') label = 'Câu sai';
          else if (currentFilter === 'starred') label = 'Đã lưu';
          summary.innerText = label + ' (' + RAW_QUESTIONS.length + ')';
        }
      } else {
        body.classList.remove('hidden');
        if (icon) icon.className = 'fa-solid fa-chevron-up text-[10px]';
        if (txt) txt.innerText = 'Thu gọn';
        if (summary) summary.classList.add('hidden');
      }
    }

    function toggleDensityMode() {
      isCompactDensity = !isCompactDensity;
      applyDensityUI();
      sessionStorage.setItem('fpt_ui_compact_density', isCompactDensity ? '1' : '0');
    }

    function applyDensityUI() {
      const txt = document.getElementById('txtDensityToggle');
      const icon = document.getElementById('iconDensityToggle');
      if (isCompactDensity) {
        document.body.classList.add('density-compact');
        if (txt) txt.innerText = 'Xem thoáng';
        if (icon) icon.className = 'fa-solid fa-expand text-blue-500';
      } else {
        document.body.classList.remove('density-compact');
        if (txt) txt.innerText = 'Xem gọn';
        if (icon) icon.className = 'fa-solid fa-compress text-blue-500';
      }
    }

    function toggleSidebarFull() {
      isSidebarCollapsed = !isSidebarCollapsed;
      applySidebarFullUI();
      sessionStorage.setItem('fpt_ui_sidebar_collapsed', isSidebarCollapsed ? '1' : '0');
    }

    function applySidebarFullUI() {
      const sidebar = document.getElementById('sidebarColumn');
      const mainCol = document.getElementById('mainQuestionsColumn');
      const floatingBtn = document.getElementById('sidebarExpandFloating');

      if (!sidebar || !mainCol) return;

      if (isSidebarCollapsed) {
        sidebar.className = 'hidden flex-col gap-3.5 sticky top-20 transition-all duration-200';
        mainCol.className = 'lg:col-span-12 flex flex-col gap-3.5 transition-all duration-200';
        if (floatingBtn) floatingBtn.className = 'hidden lg:flex fixed right-4 bottom-6 z-30';
      } else {
        sidebar.className = 'hidden lg:flex lg:col-span-4 flex-col gap-3.5 sticky top-20 transition-all duration-200';
        mainCol.className = 'lg:col-span-8 flex flex-col gap-3.5 transition-all duration-200';
        if (floatingBtn) floatingBtn.className = 'hidden fixed right-4 bottom-6 z-30';
      }
    }

    function toggleCardCollapse(cardBodyId, iconId) {
      const el = document.getElementById(cardBodyId);
      const icon = document.getElementById(iconId);
      if (!el) return;
      if (el.classList.contains('hidden')) {
        el.classList.remove('hidden');
        if (icon) icon.className = 'fa-solid fa-chevron-up text-xs';
      } else {
        el.classList.add('hidden');
        if (icon) icon.className = 'fa-solid fa-chevron-down text-xs';
      }
    }

    function toggleSingleExplanation(qId) {
      const explBody = document.getElementById('expl_body_' + qId);
      const explBtnTxt = document.getElementById('expl_btn_txt_' + qId);
      const explIcon = document.getElementById('expl_icon_' + qId);
      const isCurrentlyOpen = explBody && !explBody.classList.contains('hidden');
      if (isCurrentlyOpen) {
        openExplanations.delete(qId);
        if (explBody) explBody.classList.add('hidden');
        if (explBtnTxt) explBtnTxt.innerText = 'Xem giải thích';
        if (explIcon) explIcon.className = 'fa-solid fa-chevron-down text-[9px]';
      } else {
        openExplanations.add(qId);
        if (explBody) explBody.classList.remove('hidden');
        if (explBtnTxt) explBtnTxt.innerText = 'Gập giải thích';
        if (explIcon) explIcon.className = 'fa-solid fa-chevron-up text-[9px]';
      }
    }

    // ==========================================
    // QUESTION FILTER & STATE
    // ==========================================

    function getFilteredQuestions() {
      return questions.filter(q => {
        const answered = userAnswers[q.id] !== undefined;
        const isCorrect = userAnswers[q.id] === q.answer;
        if (currentFilter === 'unanswered') return !answered;
        if (currentFilter === 'wrong') return answered && !isCorrect;
        if (currentFilter === 'starred') return starredQuestions.has(q.id);
        return true;
      });
    }

    function loadSavedState() {
      try {
        const savedStars = localStorage.getItem(getStarKey(activeExamId));
        if (savedStars) {
          starredQuestions = new Set(JSON.parse(savedStars));
        }

        const savedData = localStorage.getItem(getStorageKey(activeExamId));
        if (savedData) {
          const parsed = JSON.parse(savedData);
          userAnswers = parsed.userAnswers || {};
          currentMode = parsed.currentMode || 'practice';
          autoCheck = parsed.autoCheck !== undefined ? parsed.autoCheck : true;
          autoNext = parsed.autoNext !== undefined ? parsed.autoNext : false;
          if (parsed.viewLayout) viewLayout = parsed.viewLayout;
          examSubmitted = parsed.examSubmitted || false;
          if (parsed.timeRemaining !== undefined && !examSubmitted) {
            timeRemaining = parsed.timeRemaining;
          }
        }

        // Clean up legacy keys
        localStorage.removeItem('fpt_ui_header_collapsed');
        localStorage.removeItem('fpt_ui_filter_collapsed');
        localStorage.removeItem('fpt_ui_sidebar_collapsed');
        localStorage.removeItem('fpt_ui_compact_density');

        // ALWAYS DEFAULT TO ALL COLLAPSED on open
        // Only expand if explicitly toggled within this session
        const sHeader = sessionStorage.getItem('fpt_ui_header_collapsed');
        isHeaderCollapsed = sHeader !== null ? sHeader === '1' : true;

        const sFilter = sessionStorage.getItem('fpt_ui_filter_collapsed');
        isFilterCollapsed = sFilter !== null ? sFilter === '1' : true;

        const sSidebar = sessionStorage.getItem('fpt_ui_sidebar_collapsed');
        isSidebarCollapsed = sSidebar !== null ? sSidebar === '1' : true;

        const sDensity = sessionStorage.getItem('fpt_ui_compact_density');
        isCompactDensity = sDensity !== null ? sDensity === '1' : true;
      } catch (e) {
        console.error('Error loading state:', e);
      }
      document.getElementById('chkAutoCheck').checked = autoCheck;
      document.getElementById('chkAutoNext').checked = autoNext;
      applyModeUI();
      applyLayoutUI();
      applyHeaderCollapseUI();
      applyFilterCollapseUI();
      applyDensityUI();
      applySidebarFullUI();
    }

    function saveState() {
      try {
        localStorage.setItem(getStorageKey(activeExamId), JSON.stringify({
          userAnswers,
          currentMode,
          autoCheck,
          autoNext,
          viewLayout,
          examSubmitted,
          timeRemaining
        }));
        localStorage.setItem(getStarKey(activeExamId), JSON.stringify([...starredQuestions]));
      } catch (e) {
        console.error('Error saving state:', e);
      }
      renderExamTabsAndCards();
    }

    function toggleViewLayout() {
      viewLayout = viewLayout === 'single' ? 'list' : 'single';
      currentIndex = 0;
      applyLayoutUI();
      renderQuestions();
      renderGrid();
      saveState();
    }

    function applyLayoutUI() {
      const isSingle = viewLayout === 'single';
      const singleHeader = document.getElementById('singleModeHeader');
      if (singleHeader) {
        if (isSingle) {
          singleHeader.classList.remove('hidden');
          singleHeader.classList.add('hidden', 'sm:flex');
        } else {
          singleHeader.classList.add('hidden');
          singleHeader.classList.remove('sm:flex');
        }
      }

      const txtM = document.getElementById('txtLayoutMobile');
      const iconM = document.getElementById('iconLayoutMobile');
      const btnM = document.getElementById('btnLayoutMobile');
      if (txtM && iconM && btnM) {
        if (isSingle) {
          txtM.innerText = '1 Câu';
          iconM.className = 'fa-solid fa-layer-group text-xs';
          btnM.className = 'h-9 px-2.5 rounded-xl border border-indigo-200 bg-indigo-50 text-indigo-700 text-xs font-bold flex items-center gap-1 active:scale-95 transition';
          btnM.title = 'Đang xem từng câu - Bấm để chuyển sang xem danh sách';
        } else {
          txtM.innerText = 'D.Sách';
          iconM.className = 'fa-solid fa-list-ul text-xs';
          btnM.className = 'h-9 px-2.5 rounded-xl border border-slate-200 bg-white text-slate-700 text-xs font-bold flex items-center gap-1 active:scale-95 transition';
          btnM.title = 'Đang xem danh sách - Bấm để chuyển sang xem từng câu';
        }
      }

      const txtD = document.getElementById('txtLayoutDesktop');
      const iconD = document.getElementById('iconLayoutDesktop');
      const btnD = document.getElementById('btnLayoutDesktop');
      if (txtD && iconD) {
        txtD.innerText = isSingle ? 'Xem danh sách' : 'Xem từng câu';
        iconD.className = isSingle ? 'fa-solid fa-list-ul text-indigo-500' : 'fa-solid fa-layer-group text-slate-500';
        if (btnD) {
          btnD.className = isSingle
            ? 'px-2.5 py-1 text-xs font-semibold rounded-xl border border-indigo-200 bg-indigo-50 text-indigo-700 transition flex items-center gap-1.5 shadow-xs'
            : 'px-2.5 py-1 text-xs font-semibold rounded-xl border border-slate-200 hover:bg-slate-100 text-slate-700 transition flex items-center gap-1.5 bg-white shadow-xs';
        }
      }
    }

    function initTheme() {
      const savedTheme = localStorage.getItem('ontap_theme') || 'default';
      const isBotanical = savedTheme === 'botanical';
      if (isBotanical) {
        document.documentElement.classList.add('theme-botanical');
        document.body.classList.add('theme-botanical');
      } else {
        document.documentElement.classList.remove('theme-botanical');
        document.body.classList.remove('theme-botanical');
      }
      updateThemeUI(isBotanical);
    }

    function toggleTheme() {
      const isBotanical = document.body.classList.toggle('theme-botanical');
      if (isBotanical) {
        document.documentElement.classList.add('theme-botanical');
        localStorage.setItem('ontap_theme', 'botanical');
      } else {
        document.documentElement.classList.remove('theme-botanical');
        localStorage.setItem('ontap_theme', 'default');
      }
      updateThemeUI(isBotanical);
    }

    function updateThemeUI(isBotanical) {
      const btnD = document.getElementById('btnThemeDesktop');
      const txtD = document.getElementById('txtThemeDesktop');
      const iconD = document.getElementById('iconThemeDesktop');
      const btnM = document.getElementById('btnThemeMobile');
      const iconM = document.getElementById('iconThemeMobile');

      if (btnD && txtD && iconD) {
        if (isBotanical) {
          btnD.className = 'px-2.5 py-1 text-xs font-bold rounded-xl border border-emerald-300 bg-emerald-50 text-emerald-800 transition flex items-center gap-1.5 shadow-xs';
          txtD.innerText = 'Dịu mắt: Bật';
          iconD.className = 'fa-solid fa-leaf text-emerald-700';
          btnD.title = 'Đang bật chế độ Dịu mắt (Botanical Calm) - Bấm để chuyển về màu chuẩn';
        } else {
          btnD.className = 'px-2.5 py-1 text-xs font-semibold rounded-xl border border-slate-200 hover:bg-slate-100 text-slate-700 transition flex items-center gap-1.5 bg-white shadow-xs';
          txtD.innerText = 'Dịu mắt';
          iconD.className = 'fa-solid fa-leaf text-slate-400';
          btnD.title = 'Bật chế độ Dịu mắt (Botanical Calm) bảo vệ mắt';
        }
      }

      if (btnM && iconM) {
        if (isBotanical) {
          btnM.className = 'w-9 h-9 rounded-xl border border-emerald-300 bg-emerald-50 text-emerald-800 text-sm font-bold flex items-center justify-center active:scale-95 transition shadow-2xs';
          iconM.className = 'fa-solid fa-leaf text-emerald-700 text-sm';
          btnM.title = 'Đang bật chế độ Dịu mắt (Botanical Calm) - Bấm để chuyển về màu chuẩn';
        } else {
          btnM.className = 'w-9 h-9 rounded-xl border border-slate-200 bg-white text-slate-700 text-sm font-bold flex items-center justify-center active:scale-95 transition shadow-2xs';
          iconM.className = 'fa-solid fa-leaf text-slate-400 text-sm';
          btnM.title = 'Bật chế độ Dịu mắt (Botanical Calm) bảo vệ mắt';
        }
      }
    }

    function switchMode(mode) {
      currentMode = mode;
      if (mode === 'exam') {
        autoCheck = false;
        document.getElementById('chkAutoCheck').checked = false;
        document.getElementById('examSubmitBar').classList.remove('hidden');
        document.getElementById('examTimer').classList.remove('hidden');
        document.getElementById('examTimer').classList.add('sm:flex');
        document.getElementById('examTimerMobile').classList.remove('hidden');
        document.getElementById('examTimerMobile').classList.add('flex');
        if (!examSubmitted) startTimer();
      } else {
        stopTimer();
        document.getElementById('examTimer').classList.add('hidden');
        document.getElementById('examTimer').classList.remove('sm:flex');
        document.getElementById('examTimerMobile').classList.add('hidden');
        document.getElementById('examTimerMobile').classList.remove('flex');
        document.getElementById('examSubmitBar').classList.add('hidden');
        if (mode === 'practice') {
          autoCheck = true;
          document.getElementById('chkAutoCheck').checked = true;
        } else if (mode === 'study') {
          autoCheck = true;
        }
      }
      applyModeUI();
      renderQuestions();
      updateStats();
      saveState();
    }

    function applyModeUI() {
      const pairs = [
        { mode: 'practice', d: 'btnPracticeModeDesktop', m: 'btnPracticeModeMobile', activeColor: 'text-blue-600' },
        { mode: 'exam', d: 'btnExamModeDesktop', m: 'btnExamModeMobile', activeColor: 'text-blue-600' },
        { mode: 'study', d: 'btnStudyModeDesktop', m: 'btnStudyModeMobile', activeColor: 'text-indigo-600' }
      ];
      pairs.forEach(p => {
        const isAct = currentMode === p.mode;
        const btnD = document.getElementById(p.d);
        const btnM = document.getElementById(p.m);
        if (btnD) {
          btnD.className = isAct
            ? \`px-2.5 py-1 rounded-lg transition-all font-semibold flex items-center gap-1.5 bg-white \${p.activeColor} shadow-xs\`
            : 'px-2.5 py-1 rounded-lg transition-all font-semibold flex items-center gap-1.5 text-slate-600 hover:text-slate-900';
        }
        if (btnM) {
          btnM.className = isAct
            ? \`px-2 py-1.5 rounded-lg transition-all font-semibold flex items-center justify-center gap-1.5 bg-white \${p.activeColor} shadow-xs\`
            : 'px-2 py-1.5 rounded-lg transition-all font-semibold flex items-center justify-center gap-1.5 text-slate-600';
        }
      });
      document.body.classList.toggle('mode-exam', currentMode === 'exam');
      document.body.classList.toggle('exam-submitted', Boolean(examSubmitted));
    }

    function startTimer() {
      if (timerInterval) clearInterval(timerInterval);
      updateTimerDisplay();
      timerInterval = setInterval(() => {
        timeRemaining--;
        if (timeRemaining <= 0) {
          clearInterval(timerInterval);
          alert('Hết giờ làm bài! Hệ thống sẽ tự động nộp bài.');
          submitExam();
        }
        updateTimerDisplay();
      }, 1000);
    }

    function stopTimer() {
      if (timerInterval) {
        clearInterval(timerInterval);
        timerInterval = null;
      }
    }

    function updateTimerDisplay() {
      const minutes = Math.floor(timeRemaining / 60);
      const seconds = timeRemaining % 60;
      const str = String(minutes).padStart(2, '0') + ':' + String(seconds).padStart(2, '0');
      document.getElementById('timerText').innerText = str;
      const mTimer = document.getElementById('timerTextMobile');
      if (mTimer) mTimer.innerText = str;
    }

    function toggleAutoCheck(val) {
      autoCheck = val;
      renderQuestions();
      saveState();
    }

    function toggleAutoNext(val) {
      autoNext = val;
      saveState();
    }

    function setFilter(filter) {
      currentFilter = filter;
      currentIndex = 0;
      ['all', 'unanswered', 'wrong', 'starred'].forEach(f => {
        const btn = document.getElementById('filter' + f.charAt(0).toUpperCase() + f.slice(1));
        if (f === filter) {
          btn.className = 'px-2.5 py-1 text-xs rounded-xl font-semibold bg-blue-100 text-blue-700 border border-blue-200 shrink-0 transition';
        } else {
          btn.className = 'px-2.5 py-1 text-xs rounded-xl font-medium bg-slate-100 text-slate-600 hover:bg-slate-200 border border-transparent shrink-0 transition';
        }
      });

      const banner = document.getElementById('filterBanner');
      if (filter === 'starred') {
        banner.classList.remove('hidden');
      } else {
        banner.classList.add('hidden');
      }

      applyFilterCollapseUI();
      renderQuestions();
      renderGrid();
    }

    function toggleStar(qId) {
      if (starredQuestions.has(qId)) {
        starredQuestions.delete(qId);
      } else {
        starredQuestions.add(qId);
      }
      saveState();
      updateStats();
      renderGrid();
      
      const starBtn = document.getElementById('star-btn-' + qId);
      if (starBtn) {
        const isStarred = starredQuestions.has(qId);
        starBtn.className = (isStarred ? 'text-amber-500 bg-amber-50 border-amber-200' : 'text-slate-400 hover:text-amber-500 bg-white/80 border-blue-200/80') + ' w-7 h-7 rounded border flex items-center justify-center text-sm transition active:scale-90';
        starBtn.innerHTML = '<i class="' + (isStarred ? 'fa-solid' : 'fa-regular') + ' fa-star"></i>';
      }

      if (currentFilter === 'starred') {
        renderQuestions();
      }
    }

    function shuffleQuestions() {
      for (let i = questions.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [questions[i], questions[j]] = [questions[j], questions[i]];
      }
      currentIndex = 0;
      renderQuestions();
      renderGrid();
    }

    function confirmReset() {
      if (confirm('Bạn có chắc chắn muốn xóa toàn bộ đáp án đã chọn của ' + EXAMS[activeExamId].title + '?')) {
        userAnswers = {};
        examSubmitted = false;
        timeRemaining = EXAMS[activeExamId].timeMinutes * 60;
        currentIndex = 0;
        openExplanations.clear();
        localStorage.removeItem(getStorageKey(activeExamId));
        renderExamTabsAndCards();
        renderQuestions();
        renderGrid();
        updateStats();
        if (currentMode === 'exam') {
          startTimer();
        }
      }
    }

    function submitExam() {
      examSubmitted = true;
      stopTimer();
      currentMode = 'practice';
      autoCheck = true;
      document.getElementById('chkAutoCheck').checked = true;
      document.getElementById('examSubmitBar').classList.add('hidden');
      
      let correct = 0;
      RAW_QUESTIONS.forEach(q => {
        if (userAnswers[q.id] === q.answer) correct++;
      });
      const percent = Math.round((correct / RAW_QUESTIONS.length) * 100);
      alert('Kết quả thi thử của bạn: ' + correct + '/' + RAW_QUESTIONS.length + ' câu đúng (' + percent + '%). Hãy xem lại các câu làm sai!');
      applyModeUI();
      renderQuestions();
      renderGrid();
      updateStats();
      saveState();
    }

    function prevQuestion() {
      const filtered = getFilteredQuestions();
      if (filtered.length === 0) return;
      if (viewLayout === 'single') {
        if (currentIndex > 0) {
          currentIndex--;
          renderQuestions();
          renderGrid();
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }
      } else {
        if (currentIndex > 0) currentIndex--;
        scrollToQuestion(filtered[currentIndex].id);
      }
    }

    function nextQuestion() {
      const filtered = getFilteredQuestions();
      if (filtered.length === 0) return;
      if (viewLayout === 'single') {
        if (currentIndex < filtered.length - 1) {
          currentIndex++;
          renderQuestions();
          renderGrid();
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }
      } else {
        if (currentIndex < filtered.length - 1) currentIndex++;
        scrollToQuestion(filtered[currentIndex].id);
      }
    }

    function renderQuestions() {
      const container = document.getElementById('questionList');
      container.innerHTML = '';

      const filtered = getFilteredQuestions();
      const totalQuestions = RAW_QUESTIONS.length;

      if (filtered.length === 0) {
        container.innerHTML = \`
          <div class="bg-white p-10 sm:p-12 text-center rounded-2xl border border-slate-200 text-slate-500 flex flex-col items-center gap-3">
            <div class="w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-slate-100 flex items-center justify-center text-slate-400 text-xl sm:text-2xl">
              <i class="fa-solid fa-inbox"></i>
            </div>
            <div class="font-bold text-slate-700 text-sm sm:text-base">Không có câu hỏi nào phù hợp với bộ lọc</div>
            <button onclick="setFilter('all')" class="px-4 py-2 rounded-xl bg-blue-50 text-xs text-blue-600 font-bold hover:underline">Xem tất cả \${totalQuestions} câu hỏi</button>
          </div>
        \`;
        updateMobileNavState(0, 0);
        return;
      }

      if (currentIndex >= filtered.length) currentIndex = filtered.length - 1;
      if (currentIndex < 0) currentIndex = 0;

      if (viewLayout === 'single') {
        const q = filtered[currentIndex];
        container.appendChild(createQuestionCard(q));
        updateMobileNavState(currentIndex + 1, filtered.length);
      } else {
        filtered.forEach((q, idx) => {
          container.appendChild(createQuestionCard(q));
        });
        updateMobileNavState(currentIndex + 1, filtered.length);
      }
    }

    function updateMobileNavState(current, total) {
      const counter = document.getElementById('mobileNavCounter');
      const sCur = document.getElementById('singleCurrentIdx');
      const sTot = document.getElementById('singleTotalIdx');
      const btnPrev = document.getElementById('btnMobilePrev');
      const btnNext = document.getElementById('btnMobileNext');

      if (counter) counter.innerText = total > 0 ? (current + '/' + total) : '0/0';
      if (sCur) sCur.innerText = current;
      if (sTot) sTot.innerText = total;
      if (btnPrev) btnPrev.disabled = current <= 1;
      if (btnNext) btnNext.disabled = current >= total;
    }

    function escapeHtml(str) {
      if (!str) return '';
      return String(str)
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;');
    }

    function formatRichText(str, showAnswerKeyword = true) {
      if (!str) return '';
      if (!showAnswerKeyword) {
        str = str.replaceAll('<span class="keyword-answer text-rose-600 font-bold">', '')
                 .replaceAll('<span class="text-rose-600 font-bold">', '')
                 .replaceAll('</span>', '');
      }
      return escapeHtml(str)
        .replaceAll('&lt;span class="keyword-question text-rose-600 font-bold"&gt;', '<span class="keyword-question text-rose-600 font-bold">')
        .replaceAll('&lt;span class="keyword-answer text-rose-600 font-bold"&gt;', '<span class="keyword-answer text-rose-600 font-bold">')
        .replaceAll('&lt;span class="text-rose-600 font-bold"&gt;', '<span class="text-rose-600 font-bold">')
        .replaceAll('&lt;span class="text-emerald-700 font-bold"&gt;', '<span class="text-emerald-700 font-bold">')
        .replaceAll('&lt;/span&gt;', '</span>');
    }

    function createQuestionCard(q) {
      const div = document.createElement('div');
      div.id = 'question-card-' + q.id;
      div.className = 'eos-card rounded-xl sm:rounded-md overflow-hidden transition flex flex-col shadow-xs';

      const selected = userAnswers[q.id];
      const isAnswered = selected !== undefined;
      const isCorrect = selected === q.answer;
      const showFeedback = currentMode === 'study' || examSubmitted || (isAnswered && autoCheck);
      const isStarred = starredQuestions.has(q.id);

      const isCombined = activeExamId.includes('all');
      const examBadgeHtml = isCombined
        ? \`<span class="px-1.5 py-0.5 rounded text-[10px] font-bold bg-blue-100/80 text-blue-800">\${q.examLabel} #\${q.origId}</span>\`
        : '';

      const hasImage = Boolean(q.image || q.imagePath);
      const imgPath = q.image || q.imagePath;
      const imageBtnHtml = hasImage
        ? \`<button onclick="openImageModal(\${q.id})" title="Xem ảnh phóng to" class="px-2 py-1 text-[11px] font-medium rounded border border-blue-200/80 bg-white/80 hover:bg-white text-slate-600 transition flex items-center gap-1">
             <i class="fa-regular fa-image text-blue-600"></i> <span>Phóng to ảnh</span>
           </button>\`
        : '';

      let html = \`
        <!-- Top EOS Banner: MULTIPLE CHOICE -->
        <div class="eos-banner px-3 sm:px-6 py-1.5 sm:py-2 flex items-center justify-between gap-2">
          <div class="flex items-center gap-2 flex-wrap min-w-0">
            <span class="eos-title uppercase tracking-wide">MULTIPLE CHOICE</span>
            <span class="text-xs text-blue-700/80 font-bold">• Câu \${q.id}\${viewLayout === 'single' ? ' / ' + RAW_QUESTIONS.length : ''}</span>
            \${examBadgeHtml}
            <span class="hidden sm:inline-block text-[11px] text-slate-500 font-normal truncate">(\${escapeHtml(q.topic)})</span>
            \${isAnswered && showFeedback ? (
              isCorrect 
                ? '<span class="px-1.5 py-0.5 rounded text-[10px] font-bold bg-emerald-100 text-emerald-700 flex items-center gap-1"><i class="fa-solid fa-check"></i> Đúng</span>'
                : '<span class="px-1.5 py-0.5 rounded text-[10px] font-bold bg-rose-100 text-rose-700 flex items-center gap-1"><i class="fa-solid fa-xmark"></i> Sai</span>'
            ) : ''}
          </div>

          <div class="flex items-center gap-1.5 shrink-0">
            \${imageBtnHtml}
            <button id="star-btn-\${q.id}" onclick="toggleStar(\${q.id})" title="Đánh dấu câu hỏi này" class="\${isStarred ? 'text-amber-500 bg-amber-50 border-amber-200' : 'text-slate-400 hover:text-amber-500 bg-white/80 border-blue-200/80'} w-6 h-6 sm:w-7 sm:h-7 rounded border flex items-center justify-center text-xs sm:text-sm transition active:scale-90">
              <i class="\${isStarred ? 'fa-solid' : 'fa-regular'} fa-star"></i>
            </button>
          </div>
        </div>

        <!-- Question & Options Body (EOS plain white style) -->
        <div class="eos-body px-3.5 sm:px-8 pt-3 sm:pt-4 pb-3 sm:pb-5 bg-white flex flex-col gap-2 sm:gap-3">
          <div class="eos-question-text font-normal">
            \${formatRichText(q.question)}
          </div>
          \${hasImage ? \`
            <div class="my-2.5 max-w-md mx-auto overflow-hidden rounded-xl border border-slate-200 bg-slate-50 flex flex-col items-center p-2 shadow-xs">
              <img src="\${escapeHtml(BASE_PREFIX + imgPath)}" alt="Hình ảnh minh họa câu hỏi" class="max-h-72 w-auto object-contain rounded-lg cursor-pointer hover:opacity-95 transition" onclick="openImageModal(\${q.id})" />
              <span class="text-[10px] text-slate-400 mt-1 flex items-center gap-1"><i class="fa-solid fa-magnifying-glass-plus"></i> Chạm ảnh để phóng to</span>
            </div>
          \` : ''}

          <!-- Options List: A. B. C. D. -->
          <div class="flex flex-col gap-1 sm:gap-1.5 pt-0.5">
      \`;

      const optKeys = ['A', 'B', 'C', 'D'];
      optKeys.forEach(k => {
        const optText = q.options[k];
        if (!optText) return;

        let stateClass = '';
        let iconHtml = '';

        if (showFeedback) {
          if (k === q.answer) {
            stateClass = 'eos-option-correct';
            iconHtml = '<i class="fa-solid fa-check text-emerald-600 text-sm ml-auto pl-2 shrink-0"></i>';
          } else if (selected === k) {
            stateClass = 'eos-option-wrong';
            iconHtml = '<i class="fa-solid fa-xmark text-rose-600 text-sm ml-auto pl-2 shrink-0"></i>';
          }
        } else if (selected === k) {
          stateClass = 'eos-option-selected';
        }

        html += \`
          <button onclick="selectOption(\${q.id}, '\${k}')" class="eos-option \${stateClass} w-full text-left flex items-baseline gap-2 active:scale-[0.995]">
            <span class="shrink-0 select-none font-semibold">\${k}.</span>
            <span class="flex-1 leading-snug">\${formatRichText(optText, showFeedback)}</span>
            \${iconHtml}
          </button>
        \`;
      });

      html += '</div>';

      // Collapsible Explanation Box (without tip box)
      if (showFeedback) {
        const isOpen = currentMode === 'study' || openExplanations.has(q.id);

        html += \`
          <div class="mt-2 pt-2 border-t border-slate-100 text-[13px] text-slate-700 flex flex-col gap-1">
            <button onclick="toggleSingleExplanation(\${q.id})" class="w-full text-left flex items-center justify-between text-xs py-1 hover:text-blue-600 transition">
              <span class="font-bold flex items-center gap-1.5 text-slate-800">
                <i class="fa-solid fa-circle-info text-blue-600 text-xs"></i>
                <span>Đáp án đúng: <strong class="text-emerald-700 font-extrabold text-sm">\${q.answer}</strong></span>
              </span>
              <span class="text-[11px] text-blue-600 font-semibold flex items-center gap-1">
                <span id="expl_btn_txt_\${q.id}">\${isOpen ? 'Gập giải thích' : 'Xem giải thích'}</span>
                <i id="expl_icon_\${q.id}" class="fa-solid \${isOpen ? 'fa-chevron-up' : 'fa-chevron-down'} text-[9px]"></i>
              </span>
            </button>
            <div id="expl_body_\${q.id}" class="\${isOpen ? 'block' : 'hidden'} flex flex-col gap-1.5 pt-1">
              <div class="text-slate-600 leading-relaxed text-xs sm:text-[13px] pl-4 border-l-2 border-blue-200 bg-slate-50/60 p-2.5 rounded-r-xl">
                <span class="font-bold text-slate-700 block mb-0.5">Chi tiết giải thích:</span>
                \${formatRichText(q.explanation)}
              </div>
            </div>
          </div>
        \`;
      }

      html += '</div>';
      div.innerHTML = html;
      return div;
    }

    function selectOption(qId, option) {
      if (currentMode === 'study') return;
      userAnswers[qId] = option;
      saveState();
      updateStats();
      renderGrid();

      const filtered = getFilteredQuestions();

      if (viewLayout === 'single') {
        renderQuestions();
        if (autoNext && currentIndex < filtered.length - 1) {
          setTimeout(() => {
            nextQuestion();
          }, 550);
        }
      } else {
        const card = document.getElementById('question-card-' + qId);
        const q = questions.find(item => item.id === qId);
        if (card && q) {
          const newCard = createQuestionCard(q);
          card.replaceWith(newCard);
        }
      }
    }

    function renderGrid() {
      const grid = document.getElementById('questionGrid');
      const mobileGrid = document.getElementById('mobileQuestionGrid');
      if (grid) grid.innerHTML = '';
      if (mobileGrid) mobileGrid.innerHTML = '';

      const filtered = getFilteredQuestions();
      const activeQId = filtered[currentIndex] ? filtered[currentIndex].id : null;

      questions.forEach((q) => {
        const answered = userAnswers[q.id] !== undefined;
        const isCorrect = userAnswers[q.id] === q.answer;
        const showFeedback = currentMode === 'study' || examSubmitted || (answered && autoCheck);

        let bgClass = 'bg-slate-100 text-slate-700 hover:bg-slate-200 border-slate-200';
        if (showFeedback) {
          if (isCorrect) bgClass = 'bg-emerald-500 text-white font-bold border-emerald-600 shadow-xs';
          else if (answered) bgClass = 'bg-rose-500 text-white font-bold border-rose-600 shadow-xs';
        } else if (answered) {
          bgClass = 'bg-blue-600 text-white font-bold border-blue-700 shadow-xs';
        }

        const isCurrent = viewLayout === 'single' && activeQId === q.id;
        const ringClass = isCurrent ? 'ring-2 ring-indigo-600 ring-offset-1' : '';
        const isStarred = starredQuestions.has(q.id);

        if (grid) {
          const btn = document.createElement('button');
          btn.className = \`w-full py-1.5 rounded-lg text-xs font-semibold border transition flex items-center justify-center relative \${bgClass} \${ringClass}\`;
          btn.innerHTML = \`
            \${q.id}
            \${isStarred ? '<span class="absolute top-0.5 right-0.5 w-1.5 h-1.5 rounded-full bg-amber-400"></span>' : ''}
          \`;
          btn.onclick = () => scrollToQuestion(q.id);
          grid.appendChild(btn);
        }

        if (mobileGrid) {
          const mBtn = document.createElement('button');
          mBtn.className = \`w-full h-10 rounded-xl text-xs font-bold border transition flex items-center justify-center relative active:scale-95 \${bgClass} \${ringClass}\`;
          mBtn.innerHTML = \`
            \${q.id}
            \${isStarred ? '<span class="absolute top-1 right-1 w-2 h-2 rounded-full bg-amber-400"></span>' : ''}
          \`;
          mBtn.onclick = () => {
            closeMobileDrawer();
            scrollToQuestion(q.id);
          };
          mobileGrid.appendChild(mBtn);
        }
      });
    }

    function scrollToQuestion(qId) {
      let filtered = getFilteredQuestions();
      let idxInFiltered = filtered.findIndex(item => item.id === qId);

      if (idxInFiltered === -1) {
        setFilter('all');
        filtered = getFilteredQuestions();
        idxInFiltered = filtered.findIndex(item => item.id === qId);
      }

      if (idxInFiltered !== -1) {
        currentIndex = idxInFiltered;
      }

      if (viewLayout === 'single') {
        renderQuestions();
        renderGrid();
        window.scrollTo({ top: 0, behavior: 'smooth' });
        return;
      }

      updateMobileNavState(currentIndex + 1, filtered.length);
      setTimeout(() => {
        const el = document.getElementById('question-card-' + qId);
        if (el) {
          el.scrollIntoView({ behavior: 'smooth', block: 'center' });
          el.classList.add('ring-2', 'ring-blue-500');
          setTimeout(() => el.classList.remove('ring-2', 'ring-blue-500'), 1500);
        }
      }, 50);
    }

    function updateStats() {
      let answered = 0;
      let correct = 0;
      let wrong = 0;

      RAW_QUESTIONS.forEach(q => {
        if (userAnswers[q.id] !== undefined) {
          answered++;
          if (userAnswers[q.id] === q.answer) correct++;
          else wrong++;
        }
      });

      const total = RAW_QUESTIONS.length;
      const unanswered = total - answered;

      document.getElementById('statAnswered').innerText = answered;
      document.getElementById('statCorrect').innerText = correct;
      document.getElementById('statWrong').innerText = wrong;

      document.getElementById('progressAnswered').innerText = answered;
      document.getElementById('progressTotal').innerText = total;
      document.getElementById('progressCorrect').innerText = correct;
      document.getElementById('progressWrong').innerText = wrong;
      document.getElementById('gridTotalCount').innerText = total;

      const pctCorrect = (correct / total) * 100;
      const pctWrong = (wrong / total) * 100;
      document.getElementById('barCorrect').style.width = pctCorrect + '%';
      document.getElementById('barWrong').style.width = pctWrong + '%';

      const scorePercent = answered > 0 ? Math.round((correct / answered) * 100) : 0;
      document.getElementById('scoreBadge').innerText = scorePercent + '% Đúng';

      document.getElementById('mProgressAnswered').innerText = answered;
      document.getElementById('mProgressTotal').innerText = total;
      document.getElementById('mProgressCorrect').innerText = correct;
      document.getElementById('mProgressWrong').innerText = wrong;
      document.getElementById('mBarCorrect').style.width = pctCorrect + '%';
      document.getElementById('mBarWrong').style.width = pctWrong + '%';
      document.getElementById('mScoreBadge').innerText = scorePercent + '%';

      document.getElementById('mDrawerAnswered').innerText = answered + '/' + total;
      document.getElementById('mDrawerCorrect').innerText = correct;
      document.getElementById('mDrawerWrong').innerText = wrong;

      document.getElementById('countAll').innerText = total;
      document.getElementById('countUnanswered').innerText = unanswered;
      document.getElementById('countWrong').innerText = wrong;
      document.getElementById('countStarred').innerText = starredQuestions.size;
      document.getElementById('submitAnsweredCount').innerText = answered;
      document.getElementById('submitTotalCount').innerText = total;
    }

    function openMobileDrawer() {
      const dr = document.getElementById('mobileDrawer');
      dr.classList.remove('hidden');
      dr.classList.add('flex');
      document.body.style.overflow = 'hidden';
    }

    function closeMobileDrawer() {
      const dr = document.getElementById('mobileDrawer');
      dr.classList.add('hidden');
      dr.classList.remove('flex');
      document.body.style.overflow = '';
    }

    document.getElementById('mobileDrawer').addEventListener('click', (e) => {
      if (e.target.id === 'mobileDrawer') closeMobileDrawer();
    });

    function openImageModal(qId) {
      const q = RAW_QUESTIONS.find(item => item.id === qId);
      const imgPath = q?.image || q?.imagePath;
      if (!q || !imgPath) return;
      document.getElementById('modalImageTitle').innerText = 'Câu ' + q.id + (q.examLabel ? ' (' + q.examLabel + (q.origId ? ' #' + q.origId : '') + ')' : '');
      document.getElementById('modalImageSrc').src = BASE_PREFIX + imgPath;
      document.getElementById('imageModal').classList.remove('hidden');
    }

    function closeImageModal() {
      document.getElementById('imageModal').classList.add('hidden');
    }

    document.getElementById('imageModal').addEventListener('click', (e) => {
      if (e.target.id === 'imageModal') closeImageModal();
    });

    // Touch swipe left / right support
    let touchStartX = 0;
    let touchStartY = 0;
    document.addEventListener('touchstart', (e) => {
      touchStartX = e.changedTouches[0].screenX;
      touchStartY = e.changedTouches[0].screenY;
    }, { passive: true });

    document.addEventListener('touchend', (e) => {
      if (viewLayout !== 'single') return;
      const touchEndX = e.changedTouches[0].screenX;
      const touchEndY = e.changedTouches[0].screenY;
      const dx = touchEndX - touchStartX;
      const dy = touchEndY - touchStartY;
      if (Math.abs(dx) > 75 && Math.abs(dx) > Math.abs(dy) * 1.8) {
        if (dx < 0) nextQuestion();
        else prevQuestion();
      }
    }, { passive: true });

    document.addEventListener('keydown', (e) => {
      if (viewLayout !== 'single') return;
      if (e.key === 'ArrowRight') nextQuestion();
      else if (e.key === 'ArrowLeft') prevQuestion();
    });

    window.addEventListener('DOMContentLoaded', () => {
      initTheme();
      const params = new URLSearchParams(window.location.search);
      const urlExam = params.get('de') || localStorage.getItem('fpt_last_active_exam') || 'prn222_1';
      switchExam(urlExam, false);
    });
  </script>
</body>
</html>`;

// Write main unified UI to root index.html
fs.writeFileSync(path.join(__dirname, 'index.html'), unifiedHtml, 'utf8');
console.log('Generated unified root index.html (' + unifiedHtml.length + ' bytes)');

// Also write redirect/unified entry points for all individual exam folders
const makeRedirect = (examId) => `<!DOCTYPE html><html lang="vi"><head><meta charset="UTF-8"><title>Ôn Tập</title><meta property="og:title" content="Ôn Tập"><meta property="og:site_name" content="Ôn Tập"><meta property="og:description" content="Ôn Tập"><meta property="og:image" content="https://khoivthse182701.github.io/pru213/thumbnail.jpg"><meta property="og:image:width" content="480"><meta property="og:image:height" content="480"><link rel="image_src" href="https://khoivthse182701.github.io/pru213/thumbnail.jpg"><meta name="twitter:image" content="https://khoivthse182701.github.io/pru213/thumbnail.jpg"><link rel="icon" type="image/jpeg" href="../thumbnail.jpg"><script>window.location.replace('../index.html?de=\${examId}');</script></head><body></body></html>`;

fs.writeFileSync(path.join(__dirname, 'De_SP26_FE', 'index.html'), makeRedirect('sp26'), 'utf8');
fs.writeFileSync(path.join(__dirname, 'De_SU26_FE', 'index.html'), makeRedirect('su26'), 'utf8');

fs.mkdirSync(path.join(__dirname, 'De_PRN222_1'), { recursive: true });
fs.mkdirSync(path.join(__dirname, 'De_PRN222_2'), { recursive: true });
fs.mkdirSync(path.join(__dirname, 'De_PRN222_3'), { recursive: true });

fs.writeFileSync(path.join(__dirname, 'De_PRN222_1', 'index.html'), makeRedirect('prn222_1'), 'utf8');
fs.writeFileSync(path.join(__dirname, 'De_PRN222_2', 'index.html'), makeRedirect('prn222_2'), 'utf8');
fs.writeFileSync(path.join(__dirname, 'De_PRN222_3', 'index.html'), makeRedirect('prn222_3'), 'utf8');

fs.mkdirSync(path.join(__dirname, 'De_TINHOC_1'), { recursive: true });
fs.mkdirSync(path.join(__dirname, 'De_TINHOC_2'), { recursive: true });
fs.mkdirSync(path.join(__dirname, 'De_TINHOC_3'), { recursive: true });

fs.writeFileSync(path.join(__dirname, 'De_TINHOC_1', 'index.html'), makeRedirect('tinhoc_1'), 'utf8');
fs.writeFileSync(path.join(__dirname, 'De_TINHOC_2', 'index.html'), makeRedirect('tinhoc_2'), 'utf8');
fs.writeFileSync(path.join(__dirname, 'De_TINHOC_3', 'index.html'), makeRedirect('tinhoc_3'), 'utf8');

// Write .nojekyll for GitHub Pages
fs.writeFileSync(path.join(__dirname, '.nojekyll'), '', 'utf8');

console.log('Successfully generated all index.html, redirects and .nojekyll!');
