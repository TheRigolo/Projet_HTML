function corriger() {
  const bonnesReponses = {
    q1: "b",
    q2: "c",
    q3: "c",
    q4: "a",
    q5: "b"
  };

  let total = 0;
  let fautes = 0;

  for (let q in bonnesReponses) {
    const checked = document.querySelector(`input[name="${q}"]:checked`);
    if (checked && checked.value === bonnesReponses[q]) {
      total++;
    } else {
      fautes++;
    }
  }

  const resultat = document.getElementById("resultat");
  const formulaireBtn = document.getElementById("formulaireBtn");

  if (fautes === 0) {
    resultat.textContent = "Bravo ! Toutes les réponses sont correctes.";
    resultat.classList.remove("text-red-600");
    resultat.classList.add("text-green-600");
    formulaireBtn.classList.remove("hidden");
  } else {
    resultat.textContent = `Il y a ${fautes} erreur(s). Corrige-les pour continuer.`;
    resultat.classList.remove("text-green-600");
    resultat.classList.add("text-red-600");
    formulaireBtn.classList.add("hidden");
  }
}
