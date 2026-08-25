import re

def parse_curriculum_text(text):
    """
    Parses curriculum text formatted in standard structures:
    
    Kingdom: Kingdom Name
    Pattern: Pattern Name
    Problems: 228A, 368B, 459B, 978A
    
    or markdown headers like:
    # Kingdom: Arrays
    ## Pattern: Frequency Counting
    228A, 368B...
    """
    curriculum = []
    current_kingdom = None
    current_patterns = []
    current_pattern = None
    
    lines = text.strip().split('\n')
    for line in lines:
        line_str = line.strip()
        if not line_str:
            continue
        
        # Check Kingdom
        k_match = re.search(r'(?:Kingdom|Category)\s*:\s*(.+)', line_str, re.IGNORECASE)
        if not k_match and (line_str.startswith('# ') or line_str.startswith('Kingdom ')):
            clean_name = line_str.lstrip('#').replace('Kingdom:', '').strip()
            if clean_name:
                k_match = True
                kingdom_name = clean_name

        if k_match:
            kingdom_name = k_match.group(1).strip() if not isinstance(k_match, bool) else kingdom_name
            if current_kingdom and current_patterns:
                curriculum.append({
                    "kingdom": current_kingdom,
                    "patterns": current_patterns
                })
            current_kingdom = kingdom_name
            current_patterns = []
            current_pattern = None
            continue

        # Check Pattern / Subtopic
        p_match = re.search(r'(?:Pattern|Subtopic)\s*:\s*(.+)', line_str, re.IGNORECASE)
        if p_match:
            pattern_name = p_match.group(1).strip()
            current_pattern = {
                "pattern": pattern_name,
                "problems": []
            }
            current_patterns.append(current_pattern)
            continue

        # Check Problems
        prob_match = re.search(r'Problems?\s*:\s*(.+)', line_str, re.IGNORECASE)
        if prob_match:
            prob_list_str = prob_match.group(1).strip()
            raw_pids = re.split(r'[,;\s]+', prob_list_str)
            clean_pids = [p.strip() for p in raw_pids if p.strip()]
            if current_pattern is not None:
                current_pattern["problems"].extend(clean_pids)
            elif current_kingdom:
                # If no pattern explicitly given, create default
                default_p = {"pattern": "General", "problems": clean_pids}
                current_patterns.append(default_p)
                current_pattern = default_p
            continue

        # If line contains problem IDs directly (e.g., 228A, 368B)
        pids = re.findall(r'\b\d+[A-Z0-9]+\b', line_str, re.IGNORECASE)
        if pids:
            if current_pattern is not None:
                current_pattern["problems"].extend([p.upper() for p in pids])
            elif current_kingdom:
                default_p = {"pattern": "General", "problems": [p.upper() for p in pids]}
                current_patterns.append(default_p)
                current_pattern = default_p

    if current_kingdom and current_patterns:
        curriculum.append({
            "kingdom": current_kingdom,
            "patterns": current_patterns
        })

    return curriculum

if __name__ == "__main__":
    sample = """
    Kingdom: Arrays
    Pattern: Frequency Counting
    Problems: 228A, 368B, 459B, 978A
    
    Pattern: Two Pointers
    Problems: 706B, 1234A
    
    Kingdom: Dynamic Programming
    Pattern: 1D DP
    Problems: 1895C, 1941D
    """
    res = parse_curriculum_text(sample)
    import json
    print(json.dumps(res, indent=2))
