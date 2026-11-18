const fs = require('fs');
const path = require('path');

const sp26Questions = JSON.parse(fs.readFileSync(path.join(__dirname, 'De_SP26_FE', 'questions.json'), 'utf8'));
const su26Questions = JSON.parse(fs.readFileSync(path.join(__dirname, 'De_SU26_FE', 'questions.json'), 'utf8'));

// Combined 100 questions (1-50 from SP26, 51-100 from SU26)
const allQuestions = [
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

const EXAMS_DATA = {
  sp26: {
    id: 'sp26',
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
    code: 'TỔNG HỢP 2 ĐỀ (100 CÂU)',
    shortName: 'Tổng hợp 100 câu',
    title: 'Tổng Hợp SP26 + SU26 (100 Câu)',
    subtitle: 'Trọn bộ 100 câu trắc nghiệm Final Exam từ cả 2 kỳ Spring 2026 & Summer 2026 để tổng ôn toàn diện',
    sourceUrl: 'https://fuoverflow.com/threads/pru213-sp26-fe.6240/',
    storagePrefix: 'pru213_all100',
    timeMinutes: 90,
    questions: allQuestions
  }
};

const unifiedHtml = `<!DOCTYPE html>
<html lang="vi">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no">
  <title>Ôn Tập Trắc Nghiệm PRU213 - Hệ Thống Gộp Đề SP26 & SU26</title>
  <script src="https://cdn.tailwindcss.com"></script>
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
  <style>
    @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@300;400;500;600;700;800&display=swap');
    body {
      font-family: 'Plus Jakarta Sans', sans-serif;
      -webkit-tap-highlight-color: transparent;
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
  </style>
</head>
<body class="bg-slate-50 text-slate-800 min-h-screen flex flex-col antialiased selection:bg-blue-100 selection:text-blue-700 pb-24 lg:pb-0">

  <!-- Unified Sticky Header -->
  <header class="bg-white/95 border-b border-slate-200 sticky top-0 z-40 shadow-sm backdrop-blur-md">
    <div class="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 py-2.5 sm:py-3 flex flex-col gap-2.5">
      
      <!-- Row 1: Brand + Exam Selector Dropdown/Modal Trigger + Quick Actions -->
      <div class="flex items-center justify-between gap-2">
        <div class="flex items-center space-x-2.5 sm:space-x-3 min-w-0">
          <div onclick="openExamPickerModal()" class="cursor-pointer w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-gradient-to-tr from-sky-500 via-blue-600 to-indigo-600 flex items-center justify-center text-white font-bold shadow-md shadow-blue-500/20 hover:scale-105 active:scale-95 transition-transform shrink-0">
            <i class="fa-solid fa-gamepad text-base sm:text-lg"></i>
          </div>
          <div class="min-w-0">
            <div class="flex items-center gap-1.5">
              <span class="text-[10px] sm:text-xs font-bold text-blue-600 uppercase tracking-wider">FPT PRU213</span>
              <span class="text-xs text-slate-300">•</span>
              <span id="headerExamCode" class="text-[10px] sm:text-xs font-semibold text-slate-500 uppercase tracking-wider truncate">PRU213 - SP26 FE</span>
            </div>
            <button onclick="openExamPickerModal()" class="group flex items-center gap-1.5 text-left">
              <h1 id="headerExamTitle" class="text-sm sm:text-lg font-extrabold text-slate-900 group-hover:text-blue-600 transition leading-tight truncate">Đề Thi FE PRU213 - SP26</h1>
              <span class="inline-flex items-center justify-center w-5 h-5 rounded-md bg-slate-100 group-hover:bg-blue-50 text-slate-500 group-hover:text-blue-600 text-[10px] transition shrink-0">
                <i class="fa-solid fa-chevron-down"></i>
              </span>
            </button>
          </div>
        </div>

        <!-- Mobile Quick Action Buttons -->
        <div class="flex sm:hidden items-center gap-1.5 shrink-0">
          <div id="examTimerMobile" class="hidden items-center gap-1 bg-amber-50 text-amber-700 px-2 py-1.5 rounded-xl border border-amber-200 text-xs font-bold">
            <i class="fa-regular fa-clock animate-pulse text-[11px]"></i>
            <span id="timerTextMobile">50:00</span>
          </div>
          <button onclick="toggleViewLayout()" id="btnLayoutMobile" title="Đổi giao diện Từng câu / Danh sách" class="h-9 px-2.5 rounded-xl border border-blue-200 bg-blue-50 text-blue-700 text-xs font-bold flex items-center gap-1 active:scale-95 transition">
            <i id="iconLayoutMobile" class="fa-solid fa-layer-group"></i>
            <span id="txtLayoutMobile">1 Câu</span>
          </button>
          <button onclick="shuffleQuestions()" title="Xáo trộn câu hỏi" class="w-9 h-9 rounded-xl border border-slate-200 bg-white text-slate-700 active:bg-slate-100 flex items-center justify-center shadow-xs">
            <i class="fa-solid fa-shuffle text-blue-500 text-xs"></i>
          </button>
          <button onclick="confirmReset()" title="Làm lại đề này" class="w-9 h-9 rounded-xl border border-slate-200 bg-white text-slate-700 active:bg-rose-50 flex items-center justify-center shadow-xs">
            <i class="fa-solid fa-rotate-right text-rose-500 text-xs"></i>
          </button>
        </div>

        <!-- Desktop Controls (Mode + Layout + Shuffle + Reset) -->
        <div class="hidden sm:flex items-center flex-wrap gap-2">
          <!-- Mode Tabs Desktop -->
          <div class="bg-slate-100 p-1 rounded-xl flex items-center border border-slate-200 text-xs font-medium">
            <button id="btnPracticeModeDesktop" onclick="switchMode('practice')" class="px-3 py-1.5 rounded-lg transition-all font-semibold flex items-center gap-1.5 bg-white text-blue-600 shadow-xs">
              <i class="fa-solid fa-bolt-lightning text-amber-500"></i> <span>Luyện tập</span>
            </button>
            <button id="btnExamModeDesktop" onclick="switchMode('exam')" class="px-3 py-1.5 rounded-lg transition-all font-semibold flex items-center gap-1.5 text-slate-600 hover:text-slate-900">
              <i class="fa-solid fa-clock text-blue-500"></i> <span>Thi thử</span>
            </button>
            <button id="btnStudyModeDesktop" onclick="switchMode('study')" class="px-3 py-1.5 rounded-lg transition-all font-semibold flex items-center gap-1.5 text-slate-600 hover:text-slate-900">
              <i class="fa-solid fa-book-open text-indigo-500"></i> <span>Đọc đáp án</span>
            </button>
          </div>

          <div id="examTimer" class="hidden items-center gap-2 bg-amber-50 text-amber-700 px-3 py-1.5 rounded-xl border border-amber-200 text-xs font-bold">
            <i class="fa-regular fa-clock animate-pulse"></i>
            <span id="timerText">50:00</span>
          </div>

          <button onclick="toggleViewLayout()" id="btnLayoutDesktop" class="px-3 py-1.5 text-xs font-semibold rounded-xl border border-slate-200 hover:bg-slate-100 text-slate-700 transition flex items-center gap-1.5 bg-white shadow-xs">
            <i id="iconLayoutDesktop" class="fa-solid fa-layer-group text-indigo-500"></i>
            <span id="txtLayoutDesktop">Xem từng câu</span>
          </button>

          <button onclick="shuffleQuestions()" class="px-3 py-1.5 text-xs font-semibold rounded-xl border border-slate-200 hover:bg-slate-100 text-slate-700 transition flex items-center gap-1.5 bg-white shadow-xs">
            <i class="fa-solid fa-shuffle text-blue-500"></i> Xáo câu
          </button>

          <button onclick="confirmReset()" class="px-3 py-1.5 text-xs font-semibold rounded-xl border border-slate-200 hover:bg-rose-50 hover:text-rose-600 hover:border-rose-200 text-slate-700 transition flex items-center gap-1.5 bg-white shadow-xs">
            <i class="fa-solid fa-rotate-right text-rose-500"></i> Làm lại
          </button>
        </div>
      </div>

      <!-- Row 2: Danh Sách Đề Thi (Unified Exam Switcher Bar - Mobile & Desktop) -->
      <div class="flex items-center justify-between gap-2 pt-1 border-t border-slate-100">
        <div class="flex items-center gap-1.5 sm:gap-2 overflow-x-auto no-scrollbar py-0.5 w-full sm:w-auto">
          <span class="text-[11px] font-bold text-slate-400 uppercase tracking-wider shrink-0 hidden md:inline mr-1">
            <i class="fa-solid fa-folder-open mr-1 text-blue-500"></i>Chọn đề:
          </span>

          <!-- Exam Tab 1: SP26 -->
          <button onclick="switchExam('sp26')" id="tabExam_sp26" class="px-3 py-1.5 rounded-xl text-xs font-bold transition flex items-center gap-2 shrink-0 bg-blue-600 text-white shadow-sm shadow-blue-500/20">
            <i class="fa-solid fa-file-lines"></i>
            <span>Đề 1: SP26 FE</span>
            <span id="badgeTab_sp26" class="px-1.5 py-0.2 rounded-md text-[10px] bg-white/20 text-white font-extrabold">0/50</span>
          </button>

          <!-- Exam Tab 2: SU26 -->
          <button onclick="switchExam('su26')" id="tabExam_su26" class="px-3 py-1.5 rounded-xl text-xs font-bold transition flex items-center gap-2 shrink-0 bg-slate-100 text-slate-600 hover:bg-slate-200">
            <i class="fa-solid fa-file-signature"></i>
            <span>Đề 2: SU26 FE</span>
            <span id="badgeTab_su26" class="px-1.5 py-0.2 rounded-md text-[10px] bg-slate-200 text-slate-600 font-extrabold">0/50</span>
          </button>

          <!-- Exam Tab 3: Combined 100 Questions -->
          <button onclick="switchExam('all')" id="tabExam_all" class="px-3 py-1.5 rounded-xl text-xs font-bold transition flex items-center gap-2 shrink-0 bg-slate-100 text-slate-600 hover:bg-slate-200">
            <i class="fa-solid fa-layer-group"></i>
            <span>Tổng hợp (100 Câu)</span>
            <span id="badgeTab_all" class="px-1.5 py-0.2 rounded-md text-[10px] bg-slate-200 text-slate-600 font-extrabold">0/100</span>
          </button>
        </div>

        <!-- Button open full exam overview modal -->
        <button onclick="openExamPickerModal()" class="hidden md:flex items-center gap-1.5 text-xs font-semibold text-blue-600 hover:text-blue-700 bg-blue-50 hover:bg-blue-100 px-3 py-1.5 rounded-xl transition shrink-0">
          <i class="fa-solid fa-table-list"></i> Chi tiết bộ đề
        </button>
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

    <!-- Mobile Live Progress Strip -->
    <div class="lg:hidden bg-slate-50/90 border-t border-slate-200/80 px-3 py-1.5 flex items-center justify-between gap-3 text-[11px]">
      <div class="flex items-center gap-2 font-semibold text-slate-600 shrink-0">
        <span>Đã làm: <strong id="mProgressAnswered" class="text-slate-900">0</strong>/<span id="mProgressTotal">50</span></span>
        <span class="text-slate-300">|</span>
        <span class="text-emerald-600 font-bold"><i class="fa-solid fa-check mr-0.5"></i><span id="mProgressCorrect">0</span></span>
        <span class="text-rose-600 font-bold"><i class="fa-solid fa-xmark mr-0.5"></i><span id="mProgressWrong">0</span></span>
      </div>
      <div class="flex-1 bg-slate-200 rounded-full h-2 overflow-hidden flex max-w-[140px]">
        <div id="mBarCorrect" class="bg-emerald-500 h-2 transition-all duration-300" style="width: 0%"></div>
        <div id="mBarWrong" class="bg-rose-500 h-2 transition-all duration-300" style="width: 0%"></div>
      </div>
      <span id="mScoreBadge" class="px-2 py-0.5 rounded-full text-[10px] font-extrabold bg-blue-100 text-blue-700 shrink-0">0%</span>
    </div>
  </header>

  <!-- Main Content Layout -->
  <main class="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 py-3.5 sm:py-6 flex-1 w-full grid grid-cols-1 lg:grid-cols-12 gap-4 sm:gap-6 items-start">

    <!-- Left Column: Quiz Questions -->
    <div class="lg:col-span-8 flex flex-col gap-3.5 sm:gap-5">

      <!-- Action & Filter Bar -->
      <div class="bg-white p-3 sm:p-4 rounded-2xl border border-slate-200 shadow-sm flex flex-col sm:flex-row sm:flex-wrap sm:items-center justify-between gap-2.5 sm:gap-3 text-sm">
        <div class="flex items-center gap-1.5 sm:gap-2 overflow-x-auto no-scrollbar pb-0.5 sm:pb-0 -mx-1 px-1">
          <span class="text-[11px] font-bold text-slate-400 uppercase tracking-wider shrink-0 hidden sm:inline">Bộ lọc:</span>
          <button onclick="setFilter('all')" id="filterAll" class="px-3 py-1.5 text-xs rounded-xl font-semibold bg-blue-100 text-blue-700 border border-blue-200 shrink-0 transition">
            Tất cả (<span id="countAll">50</span>)
          </button>
          <button onclick="setFilter('unanswered')" id="filterUnanswered" class="px-3 py-1.5 text-xs rounded-xl font-medium bg-slate-100 text-slate-600 hover:bg-slate-200 border border-transparent shrink-0 transition">
            Chưa làm (<span id="countUnanswered">50</span>)
          </button>
          <button onclick="setFilter('wrong')" id="filterWrong" class="px-3 py-1.5 text-xs rounded-xl font-medium bg-slate-100 text-slate-600 hover:bg-slate-200 border border-transparent shrink-0 transition">
            Câu sai (<span id="countWrong">0</span>)
          </button>
          <button onclick="setFilter('starred')" id="filterStarred" class="px-3 py-1.5 text-xs rounded-xl font-medium bg-amber-50 text-amber-700 hover:bg-amber-100 border border-amber-200 shrink-0 transition">
            <i class="fa-solid fa-star text-amber-500 mr-1"></i>Đã lưu (<span id="countStarred">0</span>)
          </button>
        </div>

        <div class="flex items-center justify-between sm:justify-end gap-3 text-xs border-t sm:border-t-0 border-slate-100 pt-2 sm:pt-0">
          <label class="flex items-center gap-1.5 cursor-pointer text-slate-600 select-none">
            <input type="checkbox" id="chkAutoCheck" checked onchange="toggleAutoCheck(this.checked)" class="rounded text-blue-600 focus:ring-blue-500 w-4 h-4">
            <span class="font-medium">Hiện đáp án & giải thích ngay</span>
          </label>
          <label class="flex items-center gap-1.5 cursor-pointer text-slate-600 select-none" id="wrapAutoNext">
            <input type="checkbox" id="chkAutoNext" onchange="toggleAutoNext(this.checked)" class="rounded text-indigo-600 focus:ring-indigo-500 w-4 h-4">
            <span class="font-medium text-indigo-700">Tự qua câu</span>
          </label>
        </div>
      </div>

      <!-- Active Filter Banner -->
      <div id="filterBanner" class="hidden bg-amber-50 border border-amber-200 text-amber-800 px-3.5 py-2.5 rounded-xl text-xs flex items-center justify-between">
        <span class="flex items-center gap-1.5 font-semibold">
          <i class="fa-solid fa-filter text-amber-600"></i> Chế độ: <strong>Chỉ ôn các câu đã đánh dấu ⭐</strong>
        </span>
        <button onclick="setFilter('all')" class="text-blue-600 hover:underline font-bold shrink-0 ml-2">Hiện tất cả</button>
      </div>

      <!-- Single-Card Mode Navigation Header -->
      <div id="singleModeHeader" class="hidden bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-4 py-2.5 rounded-2xl shadow-sm items-center justify-between text-xs">
        <div class="flex items-center gap-2 font-bold">
          <i class="fa-solid fa-mobile-screen-button"></i>
          <span>Câu <span id="singleCurrentIdx">1</span> / <span id="singleTotalIdx">50</span></span>
        </div>
        <span class="text-blue-100 text-[11px] flex items-center gap-1">
          <i class="fa-solid fa-hand-pointer"></i> Vuốt trái/phải hoặc dùng thanh dưới để chuyển câu
        </span>
      </div>

      <!-- Question List Container -->
      <div id="questionList" class="flex flex-col gap-4 sm:gap-5">
        <!-- Rendered dynamically -->
      </div>

      <!-- Submit Bar (for Exam Mode) -->
      <div id="examSubmitBar" class="hidden bg-white p-4 sm:p-5 rounded-2xl border border-slate-200 shadow-lg flex items-center justify-between gap-3 sticky bottom-20 lg:bottom-4 z-30">
        <div>
          <div class="text-xs sm:text-sm font-bold text-slate-900">Hoàn thành bài thi thử?</div>
          <div class="text-[11px] sm:text-xs text-slate-500">Đã trả lời <span id="submitAnsweredCount" class="font-bold text-blue-600">0</span>/<span id="submitTotalCount">50</span> câu hỏi.</div>
        </div>
        <button onclick="submitExam()" class="px-4 sm:px-6 py-2.5 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 active:scale-95 text-white font-semibold rounded-xl shadow-md shadow-blue-500/20 text-xs sm:text-sm transition flex items-center gap-2 shrink-0">
          <span>Nộp bài</span>
          <i class="fa-solid fa-paper-plane text-xs"></i>
        </button>
      </div>

    </div>

    <!-- Right Column: Sidebar Danh Sách Đề + Palette & Quick Stats (Desktop Sticky) -->
    <div class="hidden lg:flex lg:col-span-4 flex-col gap-5 sticky top-28">

      <!-- Sidebar Exam Switcher Card -->
      <div class="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm flex flex-col gap-2.5">
        <div class="flex items-center justify-between">
          <div class="font-bold text-slate-900 text-sm flex items-center gap-2">
            <i class="fa-solid fa-layer-group text-blue-600"></i> Danh sách đề thi
          </div>
          <button onclick="openExamPickerModal()" class="text-xs text-blue-600 hover:underline font-semibold">Chi tiết</button>
        </div>
        <div class="flex flex-col gap-1.5" id="sidebarExamList">
          <!-- Populated dynamically -->
        </div>
      </div>

      <!-- Score & Summary Card -->
      <div class="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex flex-col gap-4">
        <div class="flex items-center justify-between border-b border-slate-100 pb-3">
          <div class="font-bold text-slate-900 flex items-center gap-2 text-sm">
            <i class="fa-solid fa-chart-pie text-blue-600"></i> Tiến độ đề đang chọn
          </div>
          <span id="scoreBadge" class="px-2.5 py-0.5 rounded-full text-xs font-bold bg-slate-100 text-slate-700">0%</span>
        </div>

        <!-- Progress bar -->
        <div>
          <div class="flex justify-between text-xs text-slate-600 mb-1.5">
            <span>Đã làm: <strong id="progressAnswered">0</strong> / <span id="progressTotal">50</span></span>
            <span>Đúng: <strong id="progressCorrect" class="text-emerald-600">0</strong> | Sai: <strong id="progressWrong" class="text-rose-600">0</strong></span>
          </div>
          <div class="w-full bg-slate-100 rounded-full h-2.5 overflow-hidden flex">
            <div id="barCorrect" class="bg-emerald-500 h-2.5 transition-all duration-300" style="width: 0%"></div>
            <div id="barWrong" class="bg-rose-500 h-2.5 transition-all duration-300" style="width: 0%"></div>
          </div>
        </div>

        <!-- Metric Cards -->
        <div class="grid grid-cols-3 gap-2.5 text-center pt-1">
          <div class="bg-slate-50 p-2.5 rounded-xl border border-slate-100">
            <div class="text-xs text-slate-500">Đã trả lời</div>
            <div id="statAnswered" class="text-lg font-bold text-slate-800">0</div>
          </div>
          <div class="bg-emerald-50 p-2.5 rounded-xl border border-emerald-100">
            <div class="text-xs text-emerald-700">Chính xác</div>
            <div id="statCorrect" class="text-lg font-bold text-emerald-600">0</div>
          </div>
          <div class="bg-rose-50 p-2.5 rounded-xl border border-rose-100">
            <div class="text-xs text-rose-700">Cần ôn lại</div>
            <div id="statWrong" class="text-lg font-bold text-rose-600">0</div>
          </div>
        </div>
      </div>

      <!-- Question Jump Palette -->
      <div class="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex flex-col gap-3">
        <div class="flex items-center justify-between">
          <div class="font-bold text-slate-900 text-sm flex items-center gap-2">
            <i class="fa-solid fa-grip text-indigo-600"></i> Bảng câu hỏi (<span id="gridTotalCount">50</span>)
          </div>
          <span class="text-xs text-slate-400">Bấm số để tới</span>
        </div>

        <div class="grid grid-cols-5 gap-1.5 max-h-64 overflow-y-auto pr-1 custom-scrollbar" id="questionGrid">
          <!-- Rendered dynamically -->
        </div>

        <div class="flex items-center justify-between text-[11px] text-slate-500 border-t border-slate-100 pt-2.5 flex-wrap gap-1">
          <span class="flex items-center gap-1"><span class="w-2.5 h-2.5 rounded-sm bg-emerald-500 inline-block"></span> Đúng</span>
          <span class="flex items-center gap-1"><span class="w-2.5 h-2.5 rounded-sm bg-rose-500 inline-block"></span> Sai</span>
          <span class="flex items-center gap-1"><span class="w-2.5 h-2.5 rounded-sm bg-blue-500 inline-block"></span> Đã chọn</span>
          <span class="flex items-center gap-1"><span class="w-2.5 h-2.5 rounded-sm bg-slate-200 inline-block"></span> Chưa làm</span>
          <span class="flex items-center gap-1"><i class="fa-solid fa-star text-amber-500 text-[10px]"></i> Đã lưu</span>
        </div>
      </div>

    </div>

  </main>

  <!-- Mobile Bottom Navigation & Action Dock -->
  <div class="lg:hidden fixed bottom-0 inset-x-0 bg-white/95 backdrop-blur-md border-t border-slate-200 z-40 safe-bottom shadow-[0_-4px_20px_rgba(15,23,42,0.08)]">
    <div class="max-w-xl mx-auto px-2.5 py-2 flex items-center justify-between gap-2">
      <!-- Previous Question Button -->
      <button onclick="prevQuestion()" id="btnMobilePrev" class="flex-1 py-2.5 px-3 rounded-xl bg-slate-100 active:bg-slate-200 text-slate-700 font-bold text-xs flex items-center justify-center gap-1.5 transition disabled:opacity-40">
        <i class="fa-solid fa-chevron-left text-[11px]"></i>
        <span>Câu trước</span>
      </button>

      <!-- Open Question Palette Bottom Sheet Button -->
      <button onclick="openMobileDrawer()" class="py-2.5 px-3.5 rounded-xl bg-indigo-50 border border-indigo-200 active:bg-indigo-100 text-indigo-700 font-extrabold text-xs flex items-center justify-center gap-1.5 shrink-0 shadow-xs">
        <i class="fa-solid fa-table-cells-large"></i>
        <span id="mobileNavCounter">1/50</span>
      </button>

      <!-- Open Exam Switcher Modal Button on Mobile Dock -->
      <button onclick="openExamPickerModal()" class="py-2.5 px-3 rounded-xl bg-blue-50 border border-blue-200 active:bg-blue-100 text-blue-700 font-extrabold text-xs flex items-center justify-center gap-1 shrink-0 shadow-xs" title="Đổi đề thi">
        <i class="fa-solid fa-folder-open"></i>
        <span id="mobileDockExamName">SP26</span>
      </button>

      <!-- Next Question Button -->
      <button onclick="nextQuestion()" id="btnMobileNext" class="flex-1 py-2.5 px-3 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 active:from-blue-700 active:to-indigo-700 text-white font-bold text-xs flex items-center justify-center gap-1.5 shadow-md shadow-blue-500/20 transition disabled:opacity-40">
        <span>Câu tiếp</span>
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
            <i class="fa-solid fa-grip text-indigo-600"></i> Bảng câu hỏi (<span id="mDrawerTitleExam">SP26 FE</span>)
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

        <div class="grid grid-cols-5 sm:grid-cols-8 gap-2" id="mobileQuestionGrid">
          <!-- Rendered dynamically -->
        </div>
      </div>

      <div class="p-3.5 border-t border-slate-100 bg-slate-50 flex items-center justify-between gap-2">
        <button onclick="openExamPickerModal(); closeMobileDrawer();" class="flex-1 py-2.5 px-3 rounded-xl border border-blue-200 bg-blue-50 text-blue-700 text-xs font-bold flex items-center justify-center gap-1.5 active:bg-blue-100">
          <i class="fa-solid fa-folder-open"></i> Đổi đề thi
        </button>
        <button onclick="shuffleQuestions(); closeMobileDrawer();" class="flex-1 py-2.5 px-3 rounded-xl border border-slate-200 bg-white text-slate-700 text-xs font-bold flex items-center justify-center gap-1.5 active:bg-slate-100">
          <i class="fa-solid fa-shuffle text-blue-500"></i> Xáo câu
        </button>
        <button onclick="confirmReset(); closeMobileDrawer();" class="flex-1 py-2.5 px-3 rounded-xl border border-rose-200 bg-rose-50 text-rose-700 text-xs font-bold flex items-center justify-center gap-1.5 active:bg-rose-100">
          <i class="fa-solid fa-rotate-right"></i> Reset
        </button>
      </div>
    </div>
  </div>

  <!-- Modal: Danh Sách Đề Thi (Exam Picker & Progress Overview) -->
  <div id="examPickerModal" class="fixed inset-0 bg-slate-900/70 backdrop-blur-xs z-50 hidden items-end sm:items-center justify-center p-0 sm:p-4">
    <div class="bg-white rounded-t-3xl sm:rounded-3xl max-w-2xl w-full max-h-[88vh] flex flex-col overflow-hidden shadow-2xl border border-slate-200 animate-slide-up safe-bottom">
      <div class="px-5 py-4 border-b border-slate-100 flex items-center justify-between bg-slate-50">
        <div>
          <span class="text-[10px] font-bold text-blue-600 uppercase tracking-widest">FPT University • PRU213</span>
          <h3 class="text-base sm:text-lg font-extrabold text-slate-900 flex items-center gap-2">
            <i class="fa-solid fa-folder-tree text-blue-600"></i> Danh sách bộ đề ôn tập
          </h3>
        </div>
        <button onclick="closeExamPickerModal()" class="w-8 h-8 rounded-full bg-slate-200/70 hover:bg-slate-200 text-slate-600 flex items-center justify-center transition">
          <i class="fa-solid fa-xmark"></i>
        </button>
      </div>
      <div class="p-4 sm:p-5 overflow-y-auto space-y-3" id="modalExamCards">
        <!-- Populated dynamically -->
      </div>
    </div>
  </div>

  <!-- Modal View Original Image -->
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

  <footer class="bg-white border-t border-slate-200 py-5 text-center text-xs text-slate-500 mt-auto">
    <div class="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-2.5">
      <div>PRU213 Trắc nghiệm ôn tập (Gộp đề SP26 & SU26) • FPT University</div>
      <div class="flex items-center gap-4">
        <a href="https://fuoverflow.com/threads/pru213-sp26-fe.6240/" target="_blank" class="hover:text-blue-600">SP26 Thread</a>
        <a href="https://fuoverflow.com/threads/pru213-su26-fe.6971/" target="_blank" class="hover:text-blue-600">SU26 Thread</a>
      </div>
    </div>
  </footer>

  <script>
    const EXAMS = ${JSON.stringify(EXAMS_DATA, null, 2)};
    const BASE_PREFIX = typeof window.ASSET_PREFIX === 'string' ? window.ASSET_PREFIX : '';

    let activeExamId = 'sp26';
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

    function getStorageKey(examId) {
      return EXAMS[examId].storagePrefix + '_quiz_state';
    }
    function getStarKey(examId) {
      return EXAMS[examId].storagePrefix + '_starred';
    }

    function getExamStatsSummary(examId) {
      const ex = EXAMS[examId];
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

    function switchExam(examId, updateUrl = true) {
      if (!EXAMS[examId]) examId = 'sp26';
      stopTimer();
      activeExamId = examId;
      localStorage.setItem('pru213_last_active_exam', examId);

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

      // Update Header Info
      document.getElementById('headerExamCode').innerText = exam.code;
      document.getElementById('headerExamTitle').innerText = exam.title;
      document.getElementById('mobileDockExamName').innerText = examId.toUpperCase();
      document.getElementById('mDrawerTitleExam').innerText = exam.shortName;

      loadSavedState();
      setFilter('all');
      renderExamTabsAndCards();
      renderQuestions();
      renderGrid();
      updateStats();
    }

    function renderExamTabsAndCards() {
      ['sp26', 'su26', 'all'].forEach(id => {
        const st = getExamStatsSummary(id);
        const btn = document.getElementById('tabExam_' + id);
        const badge = document.getElementById('badgeTab_' + id);
        const isActive = id === activeExamId;

        if (btn && badge) {
          badge.innerText = st.answered + '/' + st.total;
          if (isActive) {
            btn.className = 'px-3 py-1.5 rounded-xl text-xs font-bold transition flex items-center gap-2 shrink-0 bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-sm shadow-blue-500/20';
            badge.className = 'px-1.5 py-0.5 rounded-md text-[10px] bg-white/20 text-white font-extrabold';
          } else {
            btn.className = 'px-3 py-1.5 rounded-xl text-xs font-bold transition flex items-center gap-2 shrink-0 bg-slate-100 text-slate-600 hover:bg-slate-200';
            badge.className = st.answered > 0
              ? 'px-1.5 py-0.5 rounded-md text-[10px] bg-emerald-100 text-emerald-700 font-extrabold'
              : 'px-1.5 py-0.5 rounded-md text-[10px] bg-slate-200 text-slate-600 font-extrabold';
          }
        }
      });

      // Render Desktop Sidebar Exam List
      const sidebarList = document.getElementById('sidebarExamList');
      if (sidebarList) {
        sidebarList.innerHTML = ['sp26', 'su26', 'all'].map(id => {
          const ex = EXAMS[id];
          const st = getExamStatsSummary(id);
          const isActive = id === activeExamId;
          const pct = st.answered > 0 ? Math.round((st.correct / st.answered) * 100) : 0;
          return \`
            <button onclick="switchExam('\${id}')" class="w-full text-left p-2.5 rounded-xl border transition flex items-center justify-between gap-2 \${isActive ? 'border-blue-500 bg-blue-50/70 text-blue-950 font-bold ring-1 ring-blue-500' : 'border-slate-200 hover:bg-slate-50 text-slate-700'}">
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

      // Render Modal Exam Cards
      const modalContainer = document.getElementById('modalExamCards');
      if (modalContainer) {
        modalContainer.innerHTML = ['sp26', 'su26', 'all'].map(id => {
          const ex = EXAMS[id];
          const st = getExamStatsSummary(id);
          const isActive = id === activeExamId;
          const pct = st.answered > 0 ? Math.round((st.correct / st.answered) * 100) : 0;
          return \`
            <div onclick="switchExam('\${id}'); closeExamPickerModal();" class="cursor-pointer p-4 rounded-2xl border transition flex flex-col gap-2.5 \${isActive ? 'border-blue-500 bg-blue-50/40 ring-2 ring-blue-500' : 'border-slate-200 hover:border-blue-300 bg-white'}">
              <div class="flex items-center justify-between gap-2">
                <span class="px-2.5 py-0.5 rounded-lg text-[11px] font-bold \${isActive ? 'bg-blue-600 text-white' : 'bg-slate-100 text-slate-700'}">\${ex.code}</span>
                <span class="text-xs font-bold \${st.answered > 0 ? 'text-emerald-600' : 'text-slate-400'}">
                  <i class="fa-solid fa-circle-check mr-1"></i>Đã làm \${st.answered}/\${st.total} (\${pct}% đúng)
                </span>
              </div>
              <div>
                <h4 class="text-base font-extrabold text-slate-900">\${ex.title}</h4>
                <p class="text-xs text-slate-500 mt-0.5 leading-relaxed">\${ex.subtitle}</p>
              </div>
              <div class="flex items-center justify-between pt-2 border-t border-slate-100 text-xs">
                <span class="text-slate-500"><i class="fa-regular fa-clock mr-1"></i>\${ex.timeMinutes} phút • \${st.total} câu hỏi</span>
                <span class="font-bold text-blue-600 flex items-center gap-1">
                  \${isActive ? 'Đang mở đề này' : 'Chọn đề này'} <i class="fa-solid fa-arrow-right text-[10px]"></i>
                </span>
              </div>
            </div>
          \`;
        }).join('');
      }
    }

    function openExamPickerModal() {
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
      } catch (e) {
        console.error('Error loading state:', e);
      }
      document.getElementById('chkAutoCheck').checked = autoCheck;
      document.getElementById('chkAutoNext').checked = autoNext;
      applyModeUI();
      applyLayoutUI();
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
      if (isSingle) {
        singleHeader.classList.remove('hidden');
        singleHeader.classList.add('flex');
      } else {
        singleHeader.classList.add('hidden');
        singleHeader.classList.remove('flex');
      }

      const txtM = document.getElementById('txtLayoutMobile');
      const iconM = document.getElementById('iconLayoutMobile');
      const btnM = document.getElementById('btnLayoutMobile');
      if (isSingle) {
        txtM.innerText = '1 Câu';
        iconM.className = 'fa-solid fa-layer-group';
        btnM.className = 'h-9 px-2.5 rounded-xl border border-blue-200 bg-blue-50 text-blue-700 text-xs font-bold flex items-center gap-1 active:scale-95 transition';
      } else {
        txtM.innerText = 'D.Sách';
        iconM.className = 'fa-solid fa-list-ul';
        btnM.className = 'h-9 px-2.5 rounded-xl border border-slate-200 bg-white text-slate-700 text-xs font-bold flex items-center gap-1 active:scale-95 transition';
      }

      const txtD = document.getElementById('txtLayoutDesktop');
      const iconD = document.getElementById('iconLayoutDesktop');
      if (txtD && iconD) {
        txtD.innerText = isSingle ? 'Xem danh sách' : 'Xem từng câu';
        iconD.className = isSingle ? 'fa-solid fa-list-ul text-blue-600' : 'fa-solid fa-layer-group text-indigo-500';
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
            ? \`px-3 py-1.5 rounded-lg transition-all font-semibold flex items-center gap-1.5 bg-white \${p.activeColor} shadow-xs\`
            : 'px-3 py-1.5 rounded-lg transition-all font-semibold flex items-center gap-1.5 text-slate-600 hover:text-slate-900';
        }
        if (btnM) {
          btnM.className = isAct
            ? \`px-2 py-1.5 rounded-lg transition-all font-semibold flex items-center justify-center gap-1.5 bg-white \${p.activeColor} shadow-xs\`
            : 'px-2 py-1.5 rounded-lg transition-all font-semibold flex items-center justify-center gap-1.5 text-slate-600';
        }
      });
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
          btn.className = 'px-3 py-1.5 text-xs rounded-xl font-semibold bg-blue-100 text-blue-700 border border-blue-200 shrink-0 transition';
        } else {
          btn.className = 'px-3 py-1.5 text-xs rounded-xl font-medium bg-slate-100 text-slate-600 hover:bg-slate-200 border border-transparent shrink-0 transition';
        }
      });

      const banner = document.getElementById('filterBanner');
      if (filter === 'starred') {
        banner.classList.remove('hidden');
      } else {
        banner.classList.add('hidden');
      }

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
        starBtn.className = (isStarred ? 'text-amber-500 hover:text-amber-600 bg-amber-50 border-amber-200' : 'text-slate-400 hover:text-amber-400 bg-slate-50 border-slate-200') + ' w-9 h-9 rounded-xl border flex items-center justify-center text-base transition active:scale-90';
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
        container.appendChild(createQuestionCard(q, currentIndex + 1, filtered.length));
        updateMobileNavState(currentIndex + 1, filtered.length);
      } else {
        filtered.forEach((q, idx) => {
          container.appendChild(createQuestionCard(q, idx + 1, filtered.length));
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

    function createQuestionCard(q) {
      const div = document.createElement('div');
      div.id = 'question-card-' + q.id;
      div.className = 'bg-white rounded-2xl border border-slate-200 shadow-sm p-4 sm:p-6 transition hover:border-slate-300 flex flex-col gap-3.5 sm:gap-4';

      const selected = userAnswers[q.id];
      const isAnswered = selected !== undefined;
      const isCorrect = selected === q.answer;
      const showFeedback = currentMode === 'study' || examSubmitted || (isAnswered && autoCheck);
      const isStarred = starredQuestions.has(q.id);

      const examBadgeHtml = activeExamId === 'all'
        ? \`<span class="px-2 py-0.5 rounded-md text-[10px] font-extrabold \${q.examLabel === 'SP26' ? 'bg-blue-100 text-blue-700' : 'bg-indigo-100 text-indigo-700'}">\${q.examLabel} #\${q.origId}</span>\`
        : '';

      let html = \`
        <div class="flex items-center justify-between gap-2">
          <div class="flex items-center gap-2 flex-wrap min-w-0">
            <span class="px-2.5 h-8 rounded-xl bg-blue-600 text-white font-extrabold text-xs sm:text-sm flex items-center justify-center shadow-xs shrink-0">
              Câu \${q.id}
            </span>
            \${examBadgeHtml}
            <span class="px-2.5 py-1 rounded-lg text-[11px] sm:text-xs font-semibold bg-sky-50 text-sky-700 border border-sky-100 truncate max-w-[175px] sm:max-w-none">
              \${q.topic}
            </span>
            \${isAnswered && showFeedback ? (
              isCorrect 
                ? '<span class="px-2 py-0.5 rounded-full text-[11px] font-bold bg-emerald-100 text-emerald-700 flex items-center gap-1"><i class="fa-solid fa-check"></i> Đúng</span>'
                : '<span class="px-2 py-0.5 rounded-full text-[11px] font-bold bg-rose-100 text-rose-700 flex items-center gap-1"><i class="fa-solid fa-xmark"></i> Sai</span>'
            ) : ''}
          </div>

          <div class="flex items-center gap-1.5 shrink-0">
            <button onclick="openImageModal(\${q.id})" title="Xem ảnh chụp gốc từ đề" class="h-9 px-2.5 text-xs font-semibold rounded-xl border border-slate-200 bg-slate-50 hover:bg-slate-100 active:bg-slate-200 text-slate-600 transition flex items-center gap-1.5">
              <i class="fa-regular fa-image text-blue-500"></i> <span>Ảnh gốc</span>
            </button>
            <button id="star-btn-\${q.id}" onclick="toggleStar(\${q.id})" title="Đánh dấu câu hỏi này" class="\${isStarred ? 'text-amber-500 hover:text-amber-600 bg-amber-50 border-amber-200' : 'text-slate-400 hover:text-amber-400 bg-slate-50 border-slate-200'} w-9 h-9 rounded-xl border flex items-center justify-center text-base transition active:scale-90">
              <i class="\${isStarred ? 'fa-solid' : 'fa-regular'} fa-star"></i>
            </button>
          </div>
        </div>

        <div class="text-[15px] sm:text-base font-bold text-slate-900 leading-relaxed">
          \${q.question}
        </div>

        <!-- Options Grid -->
        <div class="grid grid-cols-1 gap-2.5 pt-0.5">
      \`;

      const optKeys = ['A', 'B', 'C', 'D'];
      optKeys.forEach(k => {
        const optText = q.options[k];
        if (!optText) return;

        let optClass = 'border-slate-200 hover:border-blue-300 active:bg-blue-50/60 text-slate-700 bg-white';
        let badgeClass = 'bg-slate-100 text-slate-700 border-slate-200';
        let iconHtml = '';

        if (showFeedback) {
          if (k === q.answer) {
            optClass = 'border-emerald-400 bg-emerald-50/90 text-emerald-950 font-semibold ring-1 ring-emerald-400';
            badgeClass = 'bg-emerald-600 text-white border-emerald-600';
            iconHtml = '<i class="fa-solid fa-circle-check text-emerald-600 text-lg ml-auto shrink-0"></i>';
          } else if (selected === k) {
            optClass = 'border-rose-400 bg-rose-50/90 text-rose-950 font-semibold ring-1 ring-rose-400';
            badgeClass = 'bg-rose-600 text-white border-rose-600';
            iconHtml = '<i class="fa-solid fa-circle-xmark text-rose-600 text-lg ml-auto shrink-0"></i>';
          }
        } else if (selected === k) {
          optClass = 'border-blue-500 bg-blue-50 text-blue-950 font-semibold ring-1 ring-blue-500';
          badgeClass = 'bg-blue-600 text-white border-blue-600';
        }

        html += \`
          <button onclick="selectOption(\${q.id}, '\${k}')" class="w-full text-left p-3.5 sm:p-4 rounded-2xl border \${optClass} transition flex items-start sm:items-center gap-3 group text-xs sm:text-sm active:scale-[0.99]">
            <span class="w-7 h-7 sm:w-8 sm:h-8 rounded-xl \${badgeClass} font-extrabold text-xs flex items-center justify-center border shrink-0 mt-0.5 sm:mt-0">
              \${k}
            </span>
            <span class="flex-1 leading-relaxed text-[13px] sm:text-sm">\${optText}</span>
            \${iconHtml}
          </button>
        \`;
      });

      html += '</div>';

      if (showFeedback) {
        html += \`
          <div class="mt-1 p-3.5 sm:p-4 rounded-2xl bg-indigo-50/60 border border-indigo-100 text-xs flex flex-col gap-1.5">
            <div class="font-bold flex items-center gap-1.5 text-slate-800">
              <i class="fa-solid fa-circle-info text-blue-600"></i> Đáp án đúng: <span class="text-emerald-700 font-extrabold text-sm">\${q.answer}</span>
            </div>
            <div class="text-slate-600 leading-relaxed text-xs sm:text-[13px]">
              \${q.explanation}
            </div>
          </div>
        \`;
      }

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
          btn.className = \`w-full py-2 rounded-lg text-xs font-semibold border transition flex items-center justify-center relative \${bgClass} \${ringClass}\`;
          btn.innerHTML = \`
            \${q.id}
            \${isStarred ? '<span class="absolute top-0.5 right-0.5 w-1.5 h-1.5 rounded-full bg-amber-400"></span>' : ''}
          \`;
          btn.onclick = () => scrollToQuestion(q.id);
          grid.appendChild(btn);
        }

        if (mobileGrid) {
          const mBtn = document.createElement('button');
          mBtn.className = \`w-full h-11 rounded-xl text-xs font-bold border transition flex items-center justify-center relative active:scale-95 \${bgClass} \${ringClass}\`;
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
      if (!q) return;
      document.getElementById('modalImageTitle').innerText = 'Câu ' + q.id + ' (' + q.examLabel + ' #' + q.origId + ')';
      document.getElementById('modalImageSrc').src = BASE_PREFIX + q.imagePath;
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
      const params = new URLSearchParams(window.location.search);
      const urlExam = params.get('de') || window.DEFAULT_EXAM || localStorage.getItem('pru213_last_active_exam') || 'sp26';
      switchExam(urlExam, false);
    });
  </script>
</body>
</html>`;

// Write main unified UI to root index.html
fs.writeFileSync(path.join(__dirname, 'index.html'), unifiedHtml, 'utf8');
console.log('Generated unified root index.html (' + unifiedHtml.length + ' bytes)');

// Also write redirect/unified entry points for De_SP26_FE/index.html and De_SU26_FE/index.html so existing tabs/bookmarks seamlessly use the unified UI
const sp26Redirect = `<!DOCTYPE html><html lang="vi"><head><meta charset="UTF-8"><script>window.location.replace('../index.html?de=sp26');</script></head><body></body></html>`;
const su26Redirect = `<!DOCTYPE html><html lang="vi"><head><meta charset="UTF-8"><script>window.location.replace('../index.html?de=su26');</script></head><body></body></html>`;

fs.writeFileSync(path.join(__dirname, 'De_SP26_FE', 'index.html'), sp26Redirect, 'utf8');
fs.writeFileSync(path.join(__dirname, 'De_SU26_FE', 'index.html'), su26Redirect, 'utf8');
console.log('Updated De_SP26_FE/index.html and De_SU26_FE/index.html to redirect to unified UI');
