const questions = [
  {
    question: "1. Combien de temps à duré la guerre de 100 ans ?",
    options: [
      { value: "a", label: "100 ans" },
      { value: "b", label: "+ de 100 ans" }, // ✅
      { value: "c", label: "- de 100 ans" }
    ],
    answer: "b"
  },
  {
    question: "2. Qu'est ce qui est jaune et qui attend ?",
    options: [
      { value: "a", label: "Un poussin" },
      { value: "b", label: "Le soleil" },
      { value: "c", label: "Jonhatan" } // ✅
    ],
    answer: "c"
  },
  {
    question: "3. Qu'est ce qu'un yaourt dans la forêt ?",
    options: [
      { value: "a", label: "Un yaourt forestier" },
      { value: "b", label: "Un yaourt bio" },
      { value: "c", label: "Un yaourt nature" } // ✅
    ],
    answer: "c"
  },
  {
    question: "4. Gifi des idées de ...",
    options: [
      { value: "a", label: "génies" }, // ✅
      { value: "b", label: "renois" },
      { value: "c", label: "neuilles" }
    ],
    answer: "a"
  },
  {
    question: "5. Trouve l'intru",
    options: [
      { value: "a", label: "Wapiti" },
      { value: "b", label: "woiseau" }, // ✅
      { value: "c", label: "wallaby" }
    ],
    answer: "b"
  }
];

let current = 0;
let bonnes = 0;

function renderQuestion() {
  const q = questions[current];
  let html = `
    <div>
      <p class="font-semibold mb-2">${q.question}</p>
      ${q.options.map(opt => `
        <label class="block cursor-pointer mb-2 transition-all duration-150 hover:scale-105 hover:bg-blue-50 rounded-lg px-2 py-1">
          <input type="radio" name="q${current}" value="${opt.value}" class="mr-2 accent-blue-600 focus:ring-2 focus:ring-blue-400" onchange="checkAnswer(this)">
          ${opt.label}
        </label>
      `).join('')}
      <button id="nextBtn" onclick="nextQuestion()" class="transition-all duration-200 bg-gradient-to-r from-blue-500 to-cyan-600 shadow-lg text-white px-8 py-3 rounded-full font-bold text-lg tracking-wide hover:from-blue-600 hover:to-cyan-700 hover:scale-105 mt-4 hidden focus:outline-none focus:ring-4 focus:ring-blue-300">Suivant</button>
    </div>
  `;
  document.getElementById('quiz-container').innerHTML = html;
  document.getElementById('resultat').textContent = "";
}

window.checkAnswer = function(input) {
  const q = questions[current];
  const nextBtn = document.getElementById('nextBtn');
  if (input.value === q.answer) {
    document.getElementById('resultat').textContent = "Bonne réponse !";
    document.getElementById('resultat').className = "mt-6 text-center text-green-600 font-semibold";
    nextBtn.classList.remove('hidden');
  } else {
    document.getElementById('resultat').textContent = "Mauvaise réponse, réessaie.";
    document.getElementById('resultat').className = "mt-6 text-center text-red-600 font-semibold";
    nextBtn.classList.add('hidden');
  }
};

window.nextQuestion = function() {
  const q = questions[current];
  const checked = document.querySelector(`input[name="q${current}"]:checked`);
  if (checked && checked.value === q.answer) {
    bonnes++;
  }
  current++;
  if (current < questions.length) {
    renderQuestion();
  } else {
    document.getElementById('quiz-container').innerHTML = "";
    if (bonnes === questions.length) {
      document.getElementById('resultat').textContent = "Bravo ! Toutes les réponses sont correctes.";
      document.getElementById('resultat').className = "mt-6 text-center text-green-600 font-semibold";
      document.getElementById('formulaireBtn').classList.remove('hidden');
    } else {
      document.getElementById('resultat').textContent = "Il y a des erreurs, recommence le quiz pour continuer.";
      document.getElementById('resultat').className = "mt-6 text-center text-red-600 font-semibold";
      document.getElementById('formulaireBtn').classList.add('hidden');
      // Reset pour recommencer
      current = 0;
      bonnes = 0;
      setTimeout(renderQuestion, 2000);
    }
  }
};

// message d'erreur brute force
document.getElementById('bruteforceBtn').addEventListener('click', async function() {
  if (current >= questions.length) {
    const resultat = document.getElementById('resultat');
    resultat.innerHTML = `
      <div class="alert alert-warning shadow-lg flex justify-center mt-4">
        <svg xmlns="http://www.w3.org/2000/svg" class="stroke-current flex-shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
        <span>Le quiz est déjà terminé !</span>
      </div>
    `;
    resultat.className = "";
    return;
  }
  current = 0;
  bonnes = 0;
  document.getElementById('formulaireBtn').classList.add('hidden');
  await bruteForceStep();
});

async function bruteForceStep() {
  if (current >= questions.length) {
    document.getElementById('quiz-container').innerHTML = "";
    document.getElementById('resultat').textContent = "Bravo ! Toutes les réponses sont correctes (brute force).";
    document.getElementById('resultat').className = "mt-6 text-center text-green-600 font-semibold";
    document.getElementById('formulaireBtn').classList.remove('hidden');
    return;
  }
  renderQuestion();
  const q = questions[current];
  for (let i = 0; i < q.options.length; i++) {
    // Sélectionne la réponse
    const input = document.querySelector(`input[name="q${current}"][value="${q.options[i].value}"]`);
    input.checked = true;
    checkAnswer(input);
    await new Promise(res => setTimeout(res, 600));
    if (q.options[i].value === q.answer) {
      break;
    }
  }
  // Passe à la question suivante
  await new Promise(res => setTimeout(res, 600));
  nextQuestion();
  await new Promise(res => setTimeout(res, 400));
  bruteForceStep();
}

renderQuestion();
