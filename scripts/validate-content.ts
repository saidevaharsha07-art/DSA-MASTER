import { PatternModuleSchema, ProblemModuleSchema } from '../src/types/content';
import { curriculumEngine } from '../src/engines/curriculum';
import { metadataEngine } from '../src/engines/metadata';

async function validate() {
  console.log("Starting Content Validation...\n");
  
  const patterns = curriculumEngine.getAllPatterns();
  const problems = curriculumEngine.getAllProblems();
  
  let errors = 0;
  
  console.log(`Checking ${patterns.length} patterns...`);
  patterns.forEach(p => {
    const result = PatternModuleSchema.safeParse(p);
    if (!result.success) {
      console.error(`❌ Validation failed for Pattern ID: ${p.id}`);
      console.error(result.error.errors);
      errors++;
    }
    
    // Check related references
    p.problemIds.forEach(id => {
      if (!curriculumEngine.getProblem(id)) {
        console.error(`❌ Broken link in Pattern ${p.id}: References missing problem ${id}`);
        errors++;
      }
    });
  });
  
  console.log(`Checking ${problems.length} problems...`);
  problems.forEach(p => {
    const result = ProblemModuleSchema.safeParse(p);
    if (!result.success) {
      console.error(`❌ Validation failed for Problem ID: ${p.id}`);
      console.error(result.error.errors);
      errors++;
    }
    
    p.patterns.forEach(id => {
      if (!curriculumEngine.getPattern(id)) {
        console.error(`❌ Broken link in Problem ${p.id}: References missing pattern ${id}`);
        errors++;
      }
    });
  });
  
  console.log("\n--- Validation Summary ---");
  if (errors === 0) {
    console.log("✅ All Content Modules Valid!");
    const stats = metadataEngine.getGlobalStats();
    console.log(`✔ Pattern Count: ${stats.totalPatterns}`);
    console.log(`✔ Problems: ${stats.totalProblems}`);
    console.log(`✔ Broken Links: 0`);
  } else {
    console.error(`\n❌ Found ${errors} validation errors. Fix before pushing.`);
    process.exit(1);
  }
}

validate().catch(console.error);
