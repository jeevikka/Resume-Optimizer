function analyzeResume() {
  const resume = document.getElementById("resumeText").value.toLowerCase();
  const jobDesc = document.getElementById("jobDesc").value.toLowerCase();
  const resultBox = document.getElementById("resultBox");

  // 1. Structure Score
  const sections = ["education", "experience", "projects", "skills", "certifications"];
  let structureScore = 0;
  sections.forEach(section => {
    if (resume.includes(section)) {
      structureScore += 20;
    }
  });

  // 2. Keyword Match Score
  const jobWords = jobDesc.split(/\W+/);
  const resumeWords = resume.split(/\W+/);
  const matchedWords = jobWords.filter(word => resumeWords.includes(word));
  const keywordScore = Math.min(100, (matchedWords.length / jobWords.length) * 100);

  // 3. Clarity Score
  const sentences = resume.split(/[.!?]/).filter(s => s.trim().length > 0);
  const totalWords = sentences.reduce((sum, sentence) => sum + sentence.trim().split(/\s+/).length, 0);
  const avgSentenceLength = totalWords / sentences.length;
  const clarityScore = avgSentenceLength < 20 ? 100 : avgSentenceLength < 30 ? 75 : 50;

  // 4. Final Score
  const totalScore = Math.round((structureScore + keywordScore + clarityScore) / 3);

  // Display result with progress bars
  resultBox.innerHTML = `
    <p><strong>Structure Score:</strong> ${structureScore} / 100</p>
    <div class="w-full bg-gray-300 rounded h-3 mb-2">
      <div class="bg-green-500 h-3 rounded" style="width: ${structureScore}%;"></div>
    </div>

    <p><strong>Keyword Match Score:</strong> ${keywordScore.toFixed(2)} / 100</p>
    <div class="w-full bg-gray-300 rounded h-3 mb-2">
      <div class="bg-blue-500 h-3 rounded" style="width: ${keywordScore}%;"></div>
    </div>

    <p><strong>Clarity Score:</strong> ${clarityScore} / 100</p>
    <div class="w-full bg-gray-300 rounded h-3 mb-2">
      <div class="bg-yellow-500 h-3 rounded" style="width: ${clarityScore}%;"></div>
    </div>

    <hr class="my-4">

    <p class="text-lg font-bold">Total Resume Score: ${totalScore} / 100</p>
    <div class="w-full bg-gray-300 rounded h-4">
      <div class="bg-purple-600 h-4 rounded" style="width: ${totalScore}%;"></div>
    </div>

    <p class="text-sm mt-4 text-gray-600">Matched Keywords: ${[...new Set(matchedWords)].slice(0, 15).join(", ")}</p>
  `;
}
