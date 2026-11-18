const fs = require('fs');
const path = require('path');

function merge(dir, examName) {
  const p1Path = path.join(dir, 'part1.json');
  const p2Path = path.join(dir, 'part2.json');
  const outPath = path.join(dir, 'questions.json');

  const p1 = JSON.parse(fs.readFileSync(p1Path, 'utf8'));
  const p2 = JSON.parse(fs.readFileSync(p2Path, 'utf8'));

  console.log(`${examName}: Part 1 has ${p1.length} questions, Part 2 has ${p2.length} questions`);

  // Ensure consecutive IDs 1 to 50
  const all = [...p1, ...p2];
  all.forEach((q, idx) => {
    q.id = idx + 1;
    // ensure uppercase answer
    q.answer = (q.answer || 'A').trim().toUpperCase();
    // ensure valid options
    if (!q.options) q.options = {};
    ['A', 'B', 'C', 'D'].forEach(k => {
      if (!q.options[k]) q.options[k] = '';
    });
    if (!q.topic) q.topic = 'Unity Game Programming';
    if (!q.explanation) q.explanation = 'Đáp án chính xác theo tài liệu Unity Engine và C# Game Development.';
  });

  fs.writeFileSync(outPath, JSON.stringify(all, null, 2), 'utf8');
  console.log(`Successfully written ${all.length} questions to ${outPath}`);
  return all;
}

const sp26 = merge('C:/Users/namho/Downloads/FPT/PRU/OnTapTracNghiem/De_SP26_FE', 'PRU213 - SP26 FE');
const su26 = merge('C:/Users/namho/Downloads/FPT/PRU/OnTapTracNghiem/De_SU26_FE', 'PRU213 - SU26 FE');

console.log('\nSample SP26 Q1:', sp26[0]);
console.log('Sample SP26 Q50:', sp26[49]);
console.log('\nSample SU26 Q1:', su26[0]);
console.log('Sample SU26 Q50:', su26[49]);
