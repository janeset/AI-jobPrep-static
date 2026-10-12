// More AI/LLM learning: six more lessons (including Sampling in depth, split out of How LLMs work), responsible-AI frameworks (tested on AIF-C01 and
// AI-900), extra exercises, a glossary, and more interview/quiz questions. Merged into AI by
// extendTrack (ai.js). Exercise code avoids backslashes (it lives in template literals).

extendTrack(AI, {
  topics: [
    {
      id: "mlbasics", title: "Machine learning fundamentals", short: "ML",
      body: `<p>Generative AI sits on top of classic machine learning, and the AI certifications (AIF-C01, AI-900) test these basics directly. Interviewers use them to check you can reason about model quality. New to the idea? Start with <button class="link-btn inline-link" data-trgo="ai|learn|az-ml">Machine learning: learning patterns from examples</button>.</p>
        <ul>
          <li><b>Supervised learning</b> learns from labelled examples: <b>classification</b> predicts a category (fraud / not fraud) and <b>regression</b> predicts a number (a price). <b>Unsupervised learning</b> finds structure without labels (clustering customers into groups, spotting anomalies). <b>Reinforcement learning</b> learns by trial and error from rewards.</li>
          <li><b>Deep learning</b> uses <b>neural networks</b> (models built from many layers of simple calculations) with many layers; LLMs are very large deep-learning models trained mostly with <b>self-supervised</b> next-token prediction (the "label" is just the next token of the text, so no human labelling is needed).</li>
          <li><b>Data splits:</b> <b>train</b> (fit the model), <b>validation</b> (tune choices such as settings and features), <b>test</b> (final, untouched estimate). Leaking test data into training gives falsely good results.</li>
          <li><b>Overfitting</b> memorizes training data and fails on new data (high <b>variance</b>: very sensitive to the particular training examples); <b>underfitting</b> is too simple to capture the pattern (high <b>bias</b>).</li>
          <li><b>Metrics:</b> a <b>confusion matrix</b> counts the four outcomes for a yes/no prediction: true positives (TP, flagged and really positive), false positives (FP, flagged but not), false negatives (FN, missed) and true negatives (TN). Accuracy misleads on imbalanced data (99% of transactions are legitimate). Use <b>precision</b> = TP / (TP + FP) (of flagged items, how many were right?), <b>recall</b> = TP / (TP + FN) (of real positives, how many did we catch?) and <b>F1</b> (their balance: 2 × precision × recall / (precision + recall)). Regression uses <b>MAE</b> (mean absolute error: the average size of the errors) and <b>RMSE</b> (root mean squared error, which punishes big errors more).</li>
          <li><b>ML lifecycle:</b> define the problem, collect and prepare data, train, evaluate, deploy, then <b>monitor for drift</b> (real-world data changing after deployment, so quality slips).</li>
          <li>Don't use ML when simple rules work, data is scarce, or errors can't be tolerated or explained.</li></ul>`,
      example: `# 1,000 transactions, 5 of them fraud (1 = fraud). A "model" that always says "not fraud":
y_true = [1] * 5 + [0] * 995
y_pred = [0] * 1000

right = 0
caught = 0
for t, p in zip(y_true, y_pred):
    if t == p:
        right = right + 1
    if t == 1 and p == 1:
        caught = caught + 1
print("accuracy:", right / len(y_true))          # 0.995 -- looks great
print("fraud caught:", caught, "of", sum(y_true))  # 0 -- useless
`,
      exercises: [{
        key: "baseline", prompt: "Before training anything, measure the baseline: the accuracy you'd get by always predicting the most common label. Write baseline_accuracy(labels) returning that fraction (0.0 for an empty list).",
        example: "baseline_accuracy([0, 0, 0, 1]) returns 0.75\n(always predicting 0 is right 3 times out of 4)",
        hint: "Count each label with a dict, take the biggest count with `max(counts.values())`, and divide by `len(labels)`.",
        starter: `def baseline_accuracy(labels):
    pass
`,
        tests: `assert baseline_accuracy([0, 0, 0, 1]) == 0.75
assert baseline_accuracy([1] * 5 + [0] * 995) == 0.995, "the fraud example: 99.5% without learning anything"
assert baseline_accuracy(["cat", "dog", "dog"]) == 2 / 3
assert baseline_accuracy([]) == 0.0`,
        solution: `def baseline_accuracy(labels):
    if not labels:
        return 0.0
    counts = {}
    for label in labels:
        counts[label] = counts.get(label, 0) + 1
    return max(counts.values()) / len(labels)`,
      }, {
        key: "confusion", prompt: "Write confusion(y_true, y_pred) for binary labels (1 = positive) returning a dict with counts \"tp\", \"fp\", \"fn\", \"tn\".",
        example: `confusion([1, 0, 1, 1, 0], [1, 1, 0, 1, 0]) returns {"tp": 2, "fp": 1, "fn": 1, "tn": 1}`,
        hint: "Start all four counts at 0 in a dict and loop `for t, p in zip(y_true, y_pred):`. t = 1 and p = 1 is a true positive; t = 0 and p = 1 a false positive; t = 1 and p = 0 a false negative; otherwise a true negative.",
        starter: `def confusion(y_true, y_pred):
    pass
`,
        tests: `assert confusion([1, 0, 1, 1, 0], [1, 1, 0, 1, 0]) == {"tp": 2, "fp": 1, "fn": 1, "tn": 1}
assert confusion([], []) == {"tp": 0, "fp": 0, "fn": 0, "tn": 0}`,
        solution: `def confusion(y_true, y_pred):
    c = {"tp": 0, "fp": 0, "fn": 0, "tn": 0}
    for t, p in zip(y_true, y_pred):
        if t == 1 and p == 1:
            c["tp"] += 1
        elif t == 0 and p == 1:
            c["fp"] += 1
        elif t == 1 and p == 0:
            c["fn"] += 1
        else:
            c["tn"] += 1
    return c`,
      }, {
        key: "prf1", prompt: "Write prf1(y_true, y_pred) returning (precision, recall, f1) for the positive class 1. Return 0.0 for any metric whose denominator is zero.",
        example: "prf1([1, 1, 1, 1], [1, 0, 0, 0]) returns (1.0, 0.25, 0.4)",
        hint: "Count tp, fp and fn as in the last exercise. precision = tp / (tp + fp), recall = tp / (tp + fn), f1 = 2 × p × r / (p + r). Check each denominator before dividing. (`x += 1` is short for `x = x + 1`.)",
        starter: `def prf1(y_true, y_pred):
    pass
`,
        tests: `p, r, f = prf1([1, 0, 1, 1, 0], [1, 1, 0, 1, 0])
assert abs(p - 2/3) < 1e-9 and abs(r - 2/3) < 1e-9 and abs(f - 2/3) < 1e-9
p, r, f = prf1([1, 1, 1, 1], [1, 0, 0, 0])
assert p == 1.0 and r == 0.25 and abs(f - 0.4) < 1e-9
assert prf1([0, 0], [0, 0]) == (0.0, 0.0, 0.0)`,
        solution: `def prf1(y_true, y_pred):
    tp = fp = fn = 0
    for t, p in zip(y_true, y_pred):
        if t == 1 and p == 1:
            tp += 1
        elif t == 0 and p == 1:
            fp += 1
        elif t == 1 and p == 0:
            fn += 1
    precision = tp / (tp + fp) if tp + fp else 0.0
    recall = tp / (tp + fn) if tp + fn else 0.0
    f1 = 2 * precision * recall / (precision + recall) if precision + recall else 0.0
    return precision, recall, f1`,
      }],
      cards: [
        ["A fraud model has 99.5% accuracy. Why might it be useless?", "If 99.5% of transactions are legitimate, predicting 'not fraud' every time scores 99.5% while catching zero fraud. Check recall and precision on the fraud class."],
        ["Precision vs recall: which matters more for fraud alerts?", "Usually recall (don't miss fraud), balanced against precision so investigators aren't flooded with false alarms. The business cost of each error type decides."],
        ["What is model drift?", "Real-world data or relationships change after deployment (new fraud patterns, new products), so performance degrades; monitor metrics and retrain."],
      ],
    },
    {
      id: "tokenization", title: "Tokenization & context management", short: "Tok",
      body: `<p>This lesson builds on <button class="link-btn inline-link" data-trgo="ai|learn|az-tokens">Tokens and the context window</button>: how tokenizers are built, and how to manage a context window in a real app.</p>
        <ul>
          <li>Models use <b>subword tokenization</b>: frequent character sequences become single tokens, rare words split into pieces. A common method is <b>byte-pair encoding (BPE)</b>: start with single characters, find the adjacent pair that occurs most often in a big body of text, merge it into a new token, and repeat until the vocabulary is the size you want. That's why models can stumble on letter-level tasks like counting the r's in "strawberry".</li>
          <li>Token counts vary by content: code, numbers, URLs and many non-English languages use more tokens per character. Different model families tokenize differently, so <b>count with the provider's tokenizer or token-counting endpoint</b>, never by guessing.</li>
          <li><b>Context budgeting:</b> system prompt + conversation history + retrieved documents + tool results + room for the output must fit the window, and every token costs money and latency.</li>
          <li><b>Strategies for long conversations:</b> keep the most recent turns, summarize older ones, retrieve relevant past messages, or use server-side <b>compaction</b> (the provider summarizes earlier context for you). Keep the stable prefix (system prompt, documents) unchanged so prompt caching keeps working.</li>
          <li><b>Placement matters:</b> put long documents before the question, label them clearly, and repeat key instructions near the end of very long prompts.</li></ul>
        <p class="py-note"><b>Python note:</b> <code>list("abc")</code> splits text into characters: <code>["a", "b", "c"]</code>. <code>zip(tokens, tokens[1:])</code> pairs each item with the next one, giving the adjacent pairs. A pair like <code>("a", "b")</code> is a tuple, and <code>"".join(("a", "b"))</code> glues it into <code>"ab"</code>. <code>reversed(items)</code> walks a list from the end.</p>`,
      example: `tokens = list("hello")
print(tokens)                         # ['h', 'e', 'l', 'l', 'o']
print(list(zip(tokens, tokens[1:])))  # adjacent pairs: ('h', 'e'), ('e', 'l'), ...
print("".join(("l", "l")))            # merging a pair makes a new token: 'll'

# A context budget, in tokens
window = 8000
system, history, documents = 400, 2500, 3600
print("left for the answer:", window - system - history - documents)
`,
      code: [{ label: "Count tokens before sending (Anthropic Python SDK)", code: `import anthropic

client = anthropic.Anthropic()
count = client.messages.count_tokens(
    model="claude-opus-5-5",
    system="You are a helpful assistant.",
    messages=[{"role": "user", "content": open("long_report.txt").read() + "\\n\\nSummarize this."}],
)
print(count.input_tokens)   # decide: send as-is, trim, chunk, or summarize first` }],
      exercises: [{
        key: "budget", prompt: "Write budget_left(window, parts, reserve_output): parts is a list of token counts for the pieces of a prompt (system prompt, history, documents...). Return how many tokens are left after the parts and the space reserved for the output. Raise ValueError if they don't fit.",
        example: "budget_left(1000, [200, 300], 250) returns 250\nbudget_left(1000, [800], 300) raises ValueError",
        hint: "`left = window - sum(parts) - reserve_output`. If left is below 0, raise; otherwise return it.",
        starter: `def budget_left(window, parts, reserve_output):
    pass
`,
        tests: `assert budget_left(1000, [200, 300], 250) == 250
assert budget_left(1000, [], 0) == 1000
assert budget_left(500, [250], 250) == 0, "exactly full still fits"
try:
    budget_left(1000, [800], 300); raise SystemExit("expected ValueError")
except ValueError:
    pass`,
        solution: `def budget_left(window, parts, reserve_output):
    left = window - sum(parts) - reserve_output
    if left < 0:
        raise ValueError("prompt is " + str(-left) + " tokens over the window")
    return left`,
      }, {
        key: "bpe", prompt: "Implement two byte-pair-encoding steps. most_frequent_pair(tokens) returns the adjacent pair that occurs most often (ties: the one seen first). merge_pair(tokens, pair) replaces each non-overlapping occurrence (left to right) with the joined string.",
        example: `most_frequent_pair(list("aaabdaaabac")) returns ("a", "a")\nmerge_pair(list("aaabdaaabac"), ("a", "a")) returns ["aa", "a", "b", "d", "aa", "a", "b", "a", "c"]`,
        hint: "Pairs: count `zip(tokens, tokens[1:])` with a dict (dicts remember the order keys were added, which settles ties), then pick the pair with the biggest count, keeping the first on ties. Merge: walk with an index `i`; if `(tokens[i], tokens[i + 1])` is the pair, append the joined string and jump `i += 2`, else append `tokens[i]` and `i += 1`.",
        starter: `def most_frequent_pair(tokens):
    pass

def merge_pair(tokens, pair):
    pass
`,
        tests: `toks = list("aaabdaaabac")
assert most_frequent_pair(toks) == ("a", "a")
assert merge_pair(toks, ("a", "a")) == ["aa", "a", "b", "d", "aa", "a", "b", "a", "c"]
assert most_frequent_pair(list("abab")) == ("a", "b")
assert merge_pair(list("abc"), ("x", "y")) == ["a", "b", "c"]`,
        solution: `def most_frequent_pair(tokens):
    counts = {}
    for pair in zip(tokens, tokens[1:]):
        counts[pair] = counts.get(pair, 0) + 1
    best = None
    for pair, n in counts.items():
        if best is None or n > counts[best]:
            best = pair
    return best

def merge_pair(tokens, pair):
    out = []
    i = 0
    while i < len(tokens):
        if i + 1 < len(tokens) and (tokens[i], tokens[i + 1]) == pair:
            out.append(tokens[i] + tokens[i + 1])
            i += 2
        else:
            out.append(tokens[i])
            i += 1
    return out`,
      }, {
        key: "history", prompt: "Write fit_history(messages, budget, count) that keeps the most recent messages whose total count(content) fits within budget, preserving order and never splitting a message. The kept history must start with a \"user\" message, so drop any leading assistant messages.",
        example: `With count = number of words and messages of 3, 2, 4 and 1 words:\nfit_history(msgs, 5, count) keeps the last two (4 + 1 words)`,
        hint: "Walk from the newest message backwards with `reversed(messages)`, adding each one while the running total stays within budget, and stop at the first that doesn't fit. Put them back in order, then drop assistant messages from the front.",
        starter: `def fit_history(messages, budget, count):
    pass
`,
        tests: `words = lambda s: len(s.split())
msgs = [{"role": "user", "content": "a b c"}, {"role": "assistant", "content": "d e"},
        {"role": "user", "content": "f g h i"}, {"role": "assistant", "content": "j"}]
assert fit_history(msgs, 100, words) == msgs
assert fit_history(msgs, 5, words) == msgs[2:]
assert fit_history(msgs, 7, words) == msgs[2:], "msgs[1:] fits but starts with assistant"
assert fit_history(msgs, 0, words) == []`,
        solution: `def fit_history(messages, budget, count):
    kept = []
    total = 0
    for m in reversed(messages):
        n = count(m["content"])
        if total + n > budget:
            break
        kept.append(m)
        total += n
    kept.reverse()
    while kept and kept[0]["role"] != "user":
        kept.pop(0)
    return kept`,
      }],
      cards: [
        ["Why can't you estimate cost by counting words?", "Tokenizers split text into subword pieces whose count depends on the content and the model family. Use the provider's token counter."],
        ["Your chatbot hits the context limit after long sessions. Options?", "Trim old turns, summarize earlier conversation, retrieve only relevant past messages, or use server-side compaction, while keeping the system prompt stable for caching."],
        ["Why do models struggle to count letters in a word?", "They see tokens (word pieces), not individual characters, so character-level questions require reasoning about something they don't directly observe."],
      ],
    },
    {
      id: "customization", title: "Fine-tuning & model customization", short: "FT",
      body: `<p><b>Fine-tuning</b> means further training a ready-made (pretrained) model on your own examples so its behaviour changes. It's one rung on a ladder. Climb from cheapest to most expensive, and stop as soon as quality is good enough:</p>
        <ol><li><b>Prompt engineering</b> (instructions, examples)</li><li><b>RAG</b> (give the model the right facts at query time)</li><li><b>Tool use</b> (let it fetch or compute)</li><li><b>Fine-tuning</b> (change the model's behaviour with training examples)</li><li>Training from scratch (almost never for application teams)</li></ol>
        <ul>
          <li><b>Supervised fine-tuning</b> (SFT) trains on input/output examples to teach a consistent style, format, tone or narrow task. It does <b>not</b> reliably add fresh or changing facts; that's RAG's job.</li>
          <li><b>Parameter-efficient fine-tuning (PEFT)</b>, such as <b>LoRA</b> (low-rank adaptation), trains small <i>adapters</i> (a small extra set of parameters added alongside the model) instead of all the weights: far cheaper, and you can keep many adapters for one base model.</li>
          <li><b>Distillation:</b> use a large model's outputs to train a smaller, cheaper, faster model for a narrow task.</li>
          <li><b>You need:</b> hundreds to thousands of high-quality, representative examples, a <b>held-out</b> evaluation set (examples kept out of training), and before/after evals.</li>
          <li><b>Costs and risks:</b> training and hosting cost, overfitting, losing general skills, and retraining when the base model changes. Not every model can be fine-tuned by customers; check what your provider/cloud offers (Amazon Bedrock, SageMaker AI, Microsoft Foundry).</li>
          <li>Training data is usually a <b>JSONL</b> file (JSON Lines): one JSON object per line, each holding one example conversation.</li></ul>
        <p class="py-note"><b>Python note:</b> a <b>set</b> holds unique values with fast "is it in here?" checks: <code>seen = set()</code>, <code>seen.add(x)</code>, <code>x in seen</code>. Sets can hold text, numbers and tuples, but not lists or dicts. <code>enumerate(lines, 1)</code> gives (number, item) pairs counting from 1.</p>`,
      example: `import json

jsonl = [
    '{"messages": [{"role": "user", "content": "Summarize: servo overheated"}, {"role": "assistant", "content": "Servo overheating reported."}]}',
    '{"messages": [{"role": "user", "content": "Summarize: belt slipping"}, {"role": "assistant", "content": "Conveyor belt slipping."}]}',
]
for n, line in enumerate(jsonl, 1):
    example = json.loads(line)
    roles = [m["role"] for m in example["messages"]]
    print("line", n, roles)
`,
      exercises: [{
        key: "example", prompt: "Write to_example(question, answer) that returns one fine-tuning example in chat format: {\"messages\": [a user message with the question, an assistant message with the answer]}.",
        example: `to_example("Hi", "Hello!") returns\n{"messages": [{"role": "user", "content": "Hi"}, {"role": "assistant", "content": "Hello!"}]}`,
        hint: "Return one dict literal. Each message is a dict with \"role\" and \"content\".",
        starter: `def to_example(question, answer):
    pass
`,
        tests: `assert to_example("Hi", "Hello!") == {"messages": [{"role": "user", "content": "Hi"}, {"role": "assistant", "content": "Hello!"}]}
assert to_example("Q", "A")["messages"][1]["role"] == "assistant"`,
        solution: `def to_example(question, answer):
    return {"messages": [
        {"role": "user", "content": question},
        {"role": "assistant", "content": answer},
    ]}`,
      }, {
        key: "dedupe", prompt: "Duplicate examples skew training. Write dedupe(pairs) where pairs is a list of (input, output) tuples: return a new list keeping only the first copy of each pair, in the original order.",
        example: `dedupe([("hi", "hello"), ("bye", "ciao"), ("hi", "hello")]) returns [("hi", "hello"), ("bye", "ciao")]`,
        hint: "Keep a set of pairs you've seen. For each pair: if it's not in the set, add it to the set and append it to the result.",
        starter: `def dedupe(pairs):
    pass
`,
        tests: `assert dedupe([("hi", "hello"), ("bye", "ciao"), ("hi", "hello")]) == [("hi", "hello"), ("bye", "ciao")]
assert dedupe([("hi", "hello"), ("hi", "hey")]) == [("hi", "hello"), ("hi", "hey")], "same input, different output: both stay"
assert dedupe([]) == []`,
        solution: `def dedupe(pairs):
    seen = set()
    result = []
    for pair in pairs:
        if pair not in seen:
            seen.add(pair)
            result.append(pair)
    return result`,
      }, {
        key: "dataset", prompt: "Write validate_dataset(lines) for a chat fine-tuning file (one JSON object per line). Each line needs a \"messages\" list whose roles alternate user/assistant starting with \"user\" and ending with \"assistant\", each with non-empty string content. Return a list of (line_number, error) tuples (1-based); an empty list means valid.",
        example: "validate_dataset([good, good]) returns []\nvalidate_dataset([good, bad_json, ends_with_user]) returns [(2, ...), (3, ...)]",
        hint: "Loop with `enumerate(lines, 1)`. Parse with `json.loads` inside `try:` (bad JSON is an error for that line, then `continue`). Then check: messages is a non-empty list, message i has role \"user\" when i is even and \"assistant\" when odd, content is a non-empty string, and the last role is \"assistant\". Record the first problem per line.",
        starter: `import json

def validate_dataset(lines):
    pass
`,
        tests: `good = '{"messages": [{"role": "user", "content": "Hi"}, {"role": "assistant", "content": "Hello!"}]}'
assert validate_dataset([good, good]) == []
bad_json = '{"messages": [}'
ends_user = '{"messages": [{"role": "user", "content": "Hi"}]}'
empty = '{"messages": [{"role": "user", "content": ""}, {"role": "assistant", "content": "x"}]}'
errs = validate_dataset([good, bad_json, ends_user, empty])
assert [n for n, _ in errs] == [2, 3, 4], errs`,
        solution: `import json

def check(example):
    messages = example.get("messages") if isinstance(example, dict) else None
    if not isinstance(messages, list) or not messages:
        return "needs a non-empty messages list"
    for i, m in enumerate(messages):
        expected = "user" if i % 2 == 0 else "assistant"
        if m.get("role") != expected:
            return "message " + str(i) + " should be " + expected
        if not isinstance(m.get("content"), str) or not m["content"]:
            return "message " + str(i) + " has empty content"
    if messages[-1]["role"] != "assistant":
        return "must end with an assistant message"
    return None

def validate_dataset(lines):
    errors = []
    for n, line in enumerate(lines, 1):
        try:
            example = json.loads(line)
        except ValueError:
            errors.append((n, "invalid JSON"))
            continue
        problem = check(example)
        if problem:
            errors.append((n, problem))
    return errors`,
      }],
      cards: [
        ["The model doesn't know your company's latest product prices. Fine-tune it?", "No: prices change and need to be exact. Use RAG or a tool that reads the current price list; fine-tuning is for behaviour and format."],
        ["What does LoRA change?", "It freezes the base model and trains small low-rank adapter matrices, cutting compute and storage while specializing the model."],
        ["When is distillation worth it?", "When a narrow, high-volume task works well on a big model and you need lower cost or latency: train a smaller model on the big model's outputs and verify with evals."],
      ],
    },
    {
      id: "multimodal", title: "Multimodal: images, documents & audio", short: "MM",
      body: `<p><b>Multimodal</b> models take more than text: images, documents and (via transcription) audio.</p>
        <ul>
          <li><b>Vision-capable LLMs</b> read screenshots, charts, photos, diagrams and scanned pages, and can reason about them (compare two receipts, explain a dashboard).</li>
          <li><b>PDFs:</b> some APIs accept PDFs directly (text plus page images), useful for forms, contracts and statements.</li>
          <li><b>Sending files:</b> images travel inside the JSON request as <b>base64</b>, a way of writing any binary data (like an image's bytes) as plain letters and digits, along with a <b>media type</b> (a label like <code>image/png</code> that says what kind of file it is).</li>
          <li><b>Specialized document AI vs LLM vision:</b> for high-volume structured extraction (invoices, IDs, cheques) dedicated services such as Amazon Textract or Azure AI Document Intelligence are cheaper and more predictable; use an LLM when you need reasoning or flexible understanding.</li>
          <li><b>Audio:</b> transcribe with speech-to-text (Amazon Transcribe / Azure AI Speech), then process the text with an LLM.</li>
          <li><b>Cost:</b> images consume tokens roughly in proportion to their resolution (width × height in pixels), so resize to what the task needs.</li>
          <li><b>Privacy:</b> documents often contain personal data (IDs, account numbers): redact, restrict retention, and follow your bank's data policies.</li></ul>
        <p class="py-note"><b>Python note:</b> <code>b"abc"</code> is a <b>bytes</b> value: raw data rather than text, which is what reading an image file gives you. <code>base64.standard_b64encode(data)</code> encodes bytes as base64 bytes, and <code>.decode("utf-8")</code> turns those into text. <code>round(x)</code> rounds to the nearest whole number.</p>`,
      example: `import base64

data = b"Hello, image bytes!"                   # pretend these came from open("photo.png", "rb").read()
encoded = base64.standard_b64encode(data).decode("utf-8")
print(encoded)                                   # plain text, safe to put inside JSON
print(base64.standard_b64decode(encoded))        # and back to the original bytes

width, height = 4000, 3000
print("pixels:", width * height, "- resize before sending if the task doesn't need that detail")
`,
      code: [{ label: "Send an image and a PDF (Anthropic Python SDK)", code: `import base64
import anthropic

client = anthropic.Anthropic()
with open("dashboard.png", "rb") as f:
    image_b64 = base64.standard_b64encode(f.read()).decode("utf-8")
with open("statement.pdf", "rb") as f:
    pdf_b64 = base64.standard_b64encode(f.read()).decode("utf-8")

response = client.messages.create(
    model="claude-opus-5-5",
    max_tokens=1024,
    messages=[{"role": "user", "content": [
        {"type": "image", "source": {"type": "base64", "media_type": "image/png", "data": image_b64}},
        {"type": "document", "source": {"type": "base64", "media_type": "application/pdf", "data": pdf_b64}},
        {"type": "text", "text": "Does the dashboard total match the statement total? Answer yes/no and explain."},
    ]}],
)
print(next(b.text for b in response.content if b.type == "text"))` }],
      exercises: [{
        key: "media-type", prompt: "Write media_type(filename) that returns the media type for a file name by its extension, ignoring case: .png is image/png, .jpg and .jpeg are image/jpeg, .gif is image/gif, .webp is image/webp, .pdf is application/pdf. Return None for anything else.",
        example: `media_type("Chart.PNG") returns "image/png"\nmedia_type("scan.jpeg") returns "image/jpeg"\nmedia_type("notes.txt") returns None`,
        hint: "Lowercase the name, then check `name.endswith(\".png\")` and so on, or keep a dict from extension to type and look up the part after the last dot (`name.rsplit(\".\", 1)[-1]`).",
        starter: `def media_type(filename):
    pass
`,
        tests: `assert media_type("Chart.PNG") == "image/png"
assert media_type("scan.jpeg") == "image/jpeg" and media_type("a.jpg") == "image/jpeg"
assert media_type("anim.gif") == "image/gif" and media_type("x.webp") == "image/webp"
assert media_type("statement.pdf") == "application/pdf"
assert media_type("notes.txt") is None and media_type("README") is None`,
        solution: `TYPES = {"png": "image/png", "jpg": "image/jpeg", "jpeg": "image/jpeg",
         "gif": "image/gif", "webp": "image/webp", "pdf": "application/pdf"}

def media_type(filename):
    name = filename.lower()
    if "." not in name:
        return None
    return TYPES.get(name.rsplit(".", 1)[-1])`,
      }, {
        key: "fit-size", prompt: "Images cost tokens by size. Write fit_size(width, height, max_side) that returns (new_width, new_height) scaled down so the longer side is max_side, keeping the shape (aspect ratio), with both rounded to whole numbers. Images that already fit come back unchanged.",
        example: "fit_size(4000, 3000, 1000) returns (1000, 750)\nfit_size(800, 600, 1000) returns (800, 600)",
        hint: "The scale is `max_side / max(width, height)`. If it's 1 or more, return the size unchanged. Otherwise multiply both sides by it and `round(...)` each.",
        starter: `def fit_size(width, height, max_side):
    pass
`,
        tests: `assert fit_size(4000, 3000, 1000) == (1000, 750)
assert fit_size(800, 600, 1000) == (800, 600), "small images aren't enlarged"
assert fit_size(1080, 1920, 960) == (540, 960), "the longer side can be the height"
assert fit_size(1000, 333, 500) == (500, 166) or fit_size(1000, 333, 500) == (500, 167)`,
        solution: `def fit_size(width, height, max_side):
    scale = max_side / max(width, height)
    if scale >= 1:
        return width, height
    return round(width * scale), round(height * scale)`,
      }, {
        key: "imageblock", prompt: "Write to_image_block(data, media_type) that returns an API image block: {\"type\": \"image\", \"source\": {\"type\": \"base64\", \"media_type\": ..., \"data\": <base64 text>}}. Only image/jpeg, image/png, image/gif and image/webp are allowed; raise ValueError otherwise.",
        example: `to_image_block(b"abc", "image/png") returns\n{"type": "image", "source": {"type": "base64", "media_type": "image/png", "data": "YWJj"}}`,
        hint: "Check the media type against a list of allowed ones first. Then `base64.standard_b64encode(data).decode(\"utf-8\")` gives the text for \"data\".",
        starter: `import base64

def to_image_block(data, media_type):
    pass
`,
        tests: `b = to_image_block(b"abc", "image/png")
assert b == {"type": "image", "source": {"type": "base64", "media_type": "image/png", "data": "YWJj"}}
try:
    to_image_block(b"abc", "image/tiff"); raise SystemExit("expected ValueError")
except ValueError:
    pass`,
        solution: `import base64

def to_image_block(data, media_type):
    if media_type not in ["image/jpeg", "image/png", "image/gif", "image/webp"]:
        raise ValueError("unsupported image type: " + media_type)
    text = base64.standard_b64encode(data).decode("utf-8")
    return {"type": "image", "source": {"type": "base64", "media_type": media_type, "data": text}}`,
      }],
      cards: [
        ["Extract fields from 2 million standard invoices a month: LLM vision or a document AI service?", "A document AI service (Textract / Document Intelligence) for cost and consistency at scale, possibly with an LLM for the hard exceptions."],
        ["How do you cut the cost of image inputs?", "Resize or crop images to the resolution the task needs, and avoid sending images when extracted text would do."],
        ["How would you build a meeting-notes assistant?", "Speech-to-text transcription, then an LLM to summarize decisions and action items, with speaker consent and secure storage of recordings."],
      ],
    },
    {
      id: "cloudai", title: "AI services on AWS & Azure", short: "Cloud",
      body: `<p>Most enterprises (especially banks and insurers) consume models through their cloud provider for billing, networking, identity and data-residency controls (rules about which country data must stay in). Know the main services and how they map. Product names change often, so check current docs.</p>
        <ul>
          <li><b>Foundation models</b> (large models trained on broad data and adapted to many tasks): Amazon Bedrock and Microsoft Foundry (which includes Azure OpenAI) give managed access to models from several providers, including Anthropic's Claude.</li>
          <li><b>RAG building blocks:</b> Bedrock Knowledge Bases; Azure AI Search for retrieval over your data.</li>
          <li><b>Safety:</b> Bedrock Guardrails; Azure AI Content Safety, for filtering harmful content and detecting sensitive data.</li>
          <li><b>Agents:</b> Bedrock Agents (and AgentCore); Foundry Agent Service.</li>
          <li><b>Classic ML platforms:</b> Amazon SageMaker AI; Azure Machine Learning, for training, fine-tuning and hosting your own models.</li>
          <li><b>Pre-built AI:</b> Textract / Document Intelligence (documents), Transcribe and Polly / Azure AI Speech, Rekognition / Azure AI Vision, Comprehend / Azure AI Language.</li>
          <li><b>Enterprise checks:</b> is the model offered in your required <b>region</b> (the data-centre location, like ca-central-1 in Montreal), or only via <b>cross-region inference</b> (the request may be processed in another region)? Private networking (PrivateLink / Private Endpoints, so traffic never crosses the public internet), <b>IAM</b> (identity and access management: who may do what) or Microsoft <b>Entra ID</b> authentication, quotas, logging, and data-retention terms.</li></ul>
        <p class="py-note"><b>Python note:</b> <code>text.startswith("anthropic.")</code> checks how text begins. A list of tuples like the AWS vs Azure table below can be looped with <code>for concept, aws, azure in rows:</code>.</p>`,
      example: `rows = [
    ("Foundation model access", "Amazon Bedrock", "Microsoft Foundry"),
    ("Managed RAG / retrieval", "Bedrock Knowledge Bases", "Azure AI Search"),
    ("Document extraction", "Amazon Textract", "Azure AI Document Intelligence"),
]
for concept, aws, azure in rows:
    print(concept + ":", aws, "|", azure)

preferred = ["ca-central-1", "us-east-1"]
print("first choice:", preferred[0], "(Canada, for data residency)")
`,
      map: [["Foundation model access", "Amazon Bedrock", "Microsoft Foundry (incl. Azure OpenAI)"], ["Managed RAG / retrieval", "Bedrock Knowledge Bases", "Azure AI Search"], ["Content safety guardrails", "Bedrock Guardrails", "Azure AI Content Safety"], ["Agents", "Bedrock Agents / AgentCore", "Foundry Agent Service"], ["ML platform", "Amazon SageMaker AI", "Azure Machine Learning"], ["Document extraction", "Amazon Textract", "Azure AI Document Intelligence"], ["Speech", "Transcribe / Polly", "Azure AI Speech"]],
      code: [{ label: "Calling Claude through Amazon Bedrock or Microsoft Foundry (Anthropic Python SDK)", code: `import os
from anthropic import AnthropicBedrockMantle, AnthropicFoundry

# Amazon Bedrock: AWS credentials come from your normal AWS config / IAM role.
bedrock = AnthropicBedrockMantle(aws_region="us-east-1")    # choose a region where the model is offered
response = bedrock.messages.create(
    model="anthropic.claude-opus-5-5",                      # Bedrock model IDs carry an "anthropic." prefix
    max_tokens=1024,
    messages=[{"role": "user", "content": "Summarize our refund policy in 3 bullets."}],
)

# Microsoft Foundry: authenticate against your Foundry resource.
foundry = AnthropicFoundry(api_key=os.environ["FOUNDRY_API_KEY"], resource="my-foundry-resource")
# then foundry.messages.create(...) with the same request shape` }],
      exercises: [{
        key: "model-id", prompt: "Bedrock model IDs carry the provider as a prefix. Write bedrock_model_id(model) that returns model with \"anthropic.\" in front, unless it already starts with \"anthropic.\".",
        example: `bedrock_model_id("claude-opus-5-5") returns "anthropic.claude-opus-5-5"\nbedrock_model_id("anthropic.claude-opus-5-5") returns it unchanged`,
        hint: "`if model.startswith(\"anthropic.\"):` return it as is; otherwise return `\"anthropic.\" + model`.",
        starter: `def bedrock_model_id(model):
    pass
`,
        tests: `assert bedrock_model_id("claude-opus-5-5") == "anthropic.claude-opus-5-5"
assert bedrock_model_id("anthropic.claude-opus-5-5") == "anthropic.claude-opus-5-5", "don't add the prefix twice"`,
        solution: `def bedrock_model_id(model):
    if model.startswith("anthropic."):
        return model
    return "anthropic." + model`,
      }, {
        key: "equivalent", prompt: "Write azure_for(aws_service, rows): rows is a list of (concept, aws, azure) tuples like the AWS vs Azure table. Return the Azure service on the same row as aws_service, or None if it's not in the table.",
        example: `azure_for("Amazon Textract", rows) returns "Azure AI Document Intelligence"`,
        hint: "Loop `for concept, aws, azure in rows:` and return azure when aws matches. After the loop, return None.",
        starter: `def azure_for(aws_service, rows):
    pass
`,
        tests: `rows = [("Foundation model access", "Amazon Bedrock", "Microsoft Foundry"), ("Document extraction", "Amazon Textract", "Azure AI Document Intelligence")]
assert azure_for("Amazon Textract", rows) == "Azure AI Document Intelligence"
assert azure_for("Amazon Bedrock", rows) == "Microsoft Foundry"
assert azure_for("AWS Glue", rows) is None`,
        solution: `def azure_for(aws_service, rows):
    for concept, aws, azure in rows:
        if aws == aws_service:
            return azure
    return None`,
      }, {
        key: "region", prompt: "Write pick_region(available, preferred): given the regions where a model is offered and your preferred regions in priority order (e.g. Canadian first), return the first preferred region that's available, or None so the caller can escalate (cross-region inference needs a data-residency review).",
        example: `pick_region({"us-east-1", "ca-central-1"}, ["ca-central-1", "us-east-1"]) returns "ca-central-1"\npick_region({"eu-west-1"}, ["ca-central-1"]) returns None`,
        hint: "Loop over preferred in order and return the first one that's `in available`. Return None after the loop.",
        starter: `def pick_region(available, preferred):
    pass
`,
        tests: `assert pick_region({"us-east-1", "ca-central-1"}, ["ca-central-1", "us-east-1"]) == "ca-central-1"
assert pick_region({"us-east-1", "us-west-2"}, ["ca-central-1", "us-east-1"]) == "us-east-1"
assert pick_region({"eu-west-1"}, ["ca-central-1"]) is None`,
        solution: `def pick_region(available, preferred):
    for region in preferred:
        if region in available:
            return region
    return None`,
      }],
      cards: [
        ["Why might a bank use Bedrock or Foundry rather than calling a model provider directly?", "Existing cloud contracts and billing, IAM/Entra integration, private networking, centralized logging, regional controls and procurement/compliance already approved for that cloud."],
        ["Bedrock Knowledge Bases vs building RAG yourself?", "Managed ingestion, chunking, embedding and retrieval for speed of delivery; building your own gives more control over chunking, hybrid search, reranking and evaluation."],
        ["What must you check before using a model for Canadian customer data?", "Regional availability and data residency, whether cross-region processing is allowed, retention and training terms, encryption, access controls and logging."],
      ],
    },
    {
      // The maths behind "How LLMs work", split out so beginners can finish that lesson first (its softmax
      // exercise moved here; EX_MOVED in trackview.js carries saved progress across).
      id: "sampling", title: "Sampling in depth: logits, softmax and temperature", yt: "softmax temperature top-p sampling LLM explained",
      body: `<p>This lesson is the "going further" part of <button class="link-btn inline-link" data-trgo="ai|learn|foundations">How LLMs work</button>: how a model turns its raw output into probabilities, and how sampling settings change what it picks. It uses one new piece of maths, the exponential, explained below.</p>
        <h3>Logits</h3>
        <p>For every token in its vocabulary, the model's last layer outputs a raw score called a <b>logit</b>. Logits can be any number, positive or negative; a higher logit means the model thinks that token is more likely. They aren't probabilities yet: they don't lie between 0 and 1 and don't add up to 1.</p>
        <h3>Softmax: scores into probabilities</h3>
        <p><b>Softmax</b> converts logits into probabilities in two steps:</p>
        <ol><li>Take the <b>exponential</b> of each logit: e<sup>x</sup>, where e is a constant, about 2.718. In Python that's <code>math.exp(x)</code>. Exponentials are always positive, and they stretch differences: a logit 1 higher gets about 2.7 times the weight.</li>
        <li>Divide each by the total, so they add up to 1.</li></ol>
        <p>For logits [2.0, 1.0, 0.1], the exponentials are about [7.39, 2.72, 1.11], the total is 11.21, and the probabilities are about [0.66, 0.24, 0.10].</p>
        <p><b>A practical detail:</b> <code>math.exp(1000)</code> is too big for a computer's floating-point numbers (an <i>overflow</i> error). Subtracting the largest logit from every logit first gives exactly the same probabilities (the shift cancels out when you divide) and keeps the numbers small.</p>
        <h3>Temperature</h3>
        <p><b>Temperature</b> divides every logit before softmax. A temperature below 1 makes the differences bigger, so the top token gets even more of the probability (sharper, more predictable). Above 1 shrinks the differences (flatter, more varied). As temperature approaches 0, sampling becomes greedy: always the top token. Temperature 0 itself would divide by zero, so APIs treat it as "greedy" specially.</p>
        <h3>Sampling and its filters</h3>
        <ul><li><b>Sampling</b> picks a token at random, weighted by probability. One way: draw a random number r between 0 and 1, then walk through the tokens adding up their probabilities; the first token where the running total passes r is the pick.</li>
        <li><b>Top-k</b> keeps only the k most likely tokens, then rescales their probabilities to add up to 1 again, so the model can never pick a very unlikely token.</li>
        <li><b>Top-p</b> (nucleus sampling) keeps the smallest set of top tokens whose probabilities add up to at least p (say 0.9).</li></ul>
        <p>Some newer models fix or manage these settings for you; when they're available, change one at a time and measure the effect with an eval.</p>`,
      example: `import math

logits = [2.0, 1.0, 0.1]
exps = [math.exp(x) for x in logits]       # always positive, differences stretched
total = sum(exps)
print([round(e, 2) for e in exps], round(total, 2))
print("probabilities:", [round(e / total, 2) for e in exps])

cold = [math.exp(x / 0.5) for x in logits] # temperature 0.5: divide first
print("temperature 0.5:", [round(e / sum(cold), 2) for e in cold])   # sharper
`,
      exercises: [{
        key: "scale", prompt: "Write scale_logits(logits, temperature) that divides every logit by the temperature and returns the new list. Raise ValueError if temperature is 0 or less.",
        example: "scale_logits([2.0, 1.0], 0.5) returns [4.0, 2.0]\nscale_logits([2.0], 0) raises ValueError",
        hint: "Check the temperature first, then build the list with a loop or `[x / temperature for x in logits]` (a list comprehension: a one-line loop that builds a list).",
        starter: `def scale_logits(logits, temperature):
    pass
`,
        tests: `assert scale_logits([2.0, 1.0], 0.5) == [4.0, 2.0]
assert scale_logits([3.0, -1.0], 1) == [3.0, -1.0]
for bad in [0, -1]:
    try:
        scale_logits([1.0], bad); raise SystemExit("expected ValueError for temperature " + str(bad))
    except ValueError:
        pass`,
        solution: `def scale_logits(logits, temperature):
    if temperature <= 0:
        raise ValueError("temperature must be positive")
    return [x / temperature for x in logits]`,
      }, {
        key: "pick", prompt: "Write pick_with(probs, r): probs is a list of (token, probability) pairs and r is a number from 0 up to (not including) 1. Walk through the pairs adding up the probabilities, and return the first token where r is less than the running total. If rounding means none qualifies, return the last token.",
        example: `pick_with([("a", 0.5), ("b", 0.3), ("c", 0.2)], 0.6) returns "b"\n(running totals 0.5, 0.8, 1.0: 0.6 is past 0.5 but under 0.8)`,
        hint: "`total = 0`, then for each pair add its probability and `return token` when `r < total`. After the loop, `return probs[-1][0]`.",
        starter: `def pick_with(probs, r):
    pass
`,
        tests: `p = [("a", 0.5), ("b", 0.3), ("c", 0.2)]
assert pick_with(p, 0.6) == "b"
assert pick_with(p, 0.0) == "a"
assert pick_with(p, 0.49) == "a" and pick_with(p, 0.5) == "b", "r exactly on a boundary belongs to the next token"
assert pick_with(p, 0.999) == "c"`,
        solution: `def pick_with(probs, r):
    total = 0
    for token, p in probs:
        total = total + p
        if r < total:
            return token
    return probs[-1][0]`,
      }, {
        key: "topk", prompt: "Write top_k_probs(probs, k): probs maps tokens to probabilities. Keep only the k most likely tokens (on ties, the one listed first) and rescale their probabilities so they add up to 1. Return the new dict.",
        example: `top_k_probs({"a": 0.5, "b": 0.3, "c": 0.2}, 2) returns {"a": 0.625, "b": 0.375}`,
        hint: "`sorted(probs.items(), key=lambda kv: kv[1], reverse=True)[:k]` gives the top k pairs (sorted keeps the original order for ties). Add up their probabilities, then divide each by that total.",
        starter: `def top_k_probs(probs, k):
    pass
`,
        tests: `r = top_k_probs({"a": 0.5, "b": 0.3, "c": 0.2}, 2)
assert set(r) == {"a", "b"} and abs(r["a"] - 0.625) < 1e-9 and abs(r["b"] - 0.375) < 1e-9, r
assert top_k_probs({"a": 0.5, "b": 0.3, "c": 0.2}, 1) == {"a": 1.0}
r = top_k_probs({"x": 0.4, "y": 0.4, "z": 0.2}, 1)
assert r == {"x": 1.0}, "on a tie, keep the token listed first"
assert abs(sum(top_k_probs({"a": 0.1, "b": 0.2, "c": 0.7}, 5).values()) - 1) < 1e-9, "k bigger than the number of tokens keeps them all"`,
        solution: `def top_k_probs(probs, k):
    top = sorted(probs.items(), key=lambda kv: kv[1], reverse=True)[:k]
    total = sum(p for token, p in top)
    return {token: p / total for token, p in top}`,
      }, {
        key: "softmax", prompt: "Implement softmax(logits, temperature=1.0): divide each logit by the temperature, then convert to probabilities that sum to 1. Subtract the max before exponentiating for numerical stability.",
        example: "softmax([2.0, 1.0, 0.1]) returns about [0.659, 0.242, 0.099]\nsoftmax([1000.0, 1000.0]) returns [0.5, 0.5] (without overflowing)",
        hint: "Scale by the temperature, find `m = max(scaled)`, take `math.exp(x - m)` for each, then divide each by their sum.",
        starter: `import math

def softmax(logits, temperature=1.0):
    pass
`,
        tests: `p = softmax([2.0, 1.0, 0.1])
assert abs(sum(p) - 1) < 1e-9, "probabilities must sum to 1"
assert p[0] > p[1] > p[2]
sharp = softmax([2.0, 1.0, 0.1], temperature=0.1)
flat = softmax([2.0, 1.0, 0.1], temperature=10)
assert sharp[0] > p[0] > flat[0], "lower temperature should be sharper"
assert abs(softmax([1000.0, 1000.0])[0] - 0.5) < 1e-9, "subtract the max to avoid overflow"`,
        solution: `import math

def softmax(logits, temperature=1.0):
    scaled = [x / temperature for x in logits]
    m = max(scaled)
    exps = [math.exp(x - m) for x in scaled]
    total = sum(exps)
    return [e / total for e in exps]`,
      }],
      cards: [
        ["What is a logit?", "The raw score a model outputs for each possible next token, before softmax turns the scores into probabilities."],
        ["Why subtract the largest logit before softmax?", "It gives the same probabilities but keeps the exponentials small, avoiding overflow for large logits."],
        ["Top-k vs top-p?", "Top-k keeps a fixed number of the likeliest tokens; top-p keeps however many it takes to cover probability p. Both cut off the unlikely tail before sampling."],
      ],
    },
  ],

  append: {
    safety: `<h3>Responsible AI frameworks (on the certification exams)</h3>
      <div class="cols-2">
        <div><b>Microsoft's six principles</b><ul><li>Fairness</li><li>Reliability and safety</li><li>Privacy and security</li><li>Inclusiveness</li><li>Transparency</li><li>Accountability</li></ul></div>
        <div><b>AWS's responsible AI dimensions</b><ul><li>Fairness</li><li>Explainability</li><li>Privacy and security</li><li>Safety</li><li>Controllability</li><li>Veracity and robustness</li><li>Governance</li><li>Transparency</li></ul></div>
      </div>
      <p>In interviews, translate principles into practice: bias testing across groups, human oversight for high-stakes decisions, model and data documentation, audit logs, and clear user disclosure that they're talking to AI.</p>`,
  },

  cards: {
    safety: [["Name Microsoft's six responsible AI principles.", "Fairness, reliability and safety, privacy and security, inclusiveness, transparency, and accountability."]],
  },

  groups: [
    ["Foundations", ["mlbasics", "foundations", "tokenization", "sampling", "apis", "prompting", "structured"]],
    ["Retrieval & inputs", ["embeddings", "vectorstores", "rag", "multimodal"]],
    ["Agents", ["tools", "agents"]],
    ["Quality & production", ["evals", "safety", "llmops", "customization", "cloudai"]],
  ],
  weeks: [
    { n: 1, title: "ML & LLM foundations", topics: ["mlbasics", "foundations", "tokenization", "sampling"], labs: [], goal: "Explain ML basics and metrics, how LLMs generate text, how tokens and context windows work, and how sampling settings change the output." },
    { n: 2, title: "Calling models, prompting & structured output", topics: ["apis", "prompting", "structured"], labs: ["chatapp"], goal: "Build a streaming chat app and get reliable JSON back." },
    { n: 3, title: "Embeddings, vector search & multimodal", topics: ["embeddings", "vectorstores", "multimodal"], labs: [], goal: "Implement similarity search and chunking; send images and PDFs to a model." },
    { n: 4, title: "Retrieval-augmented generation", topics: ["rag"], labs: ["rag"], goal: "Ship a RAG app over your own documents with citations and retrieval metrics." },
    { n: 5, title: "Tool use & agents", topics: ["tools", "agents"], labs: ["agent"], goal: "Build a tool-using assistant with guardrails." },
    { n: 6, title: "Evals, testing & safety", topics: ["evals", "safety"], labs: ["evalharness"], goal: "Build an LLM eval harness that runs automatically on every change; know the responsible-AI frameworks." },
    { n: 7, title: "Production, customization & cloud AI", topics: ["llmops", "customization", "cloudai"], labs: ["deploy"], goal: "Deploy on AWS or Azure with caching, monitoring and cost limits; know when fine-tuning is worth it." },
    { n: 8, title: "Certification & interview sprint", topics: [], labs: [], goal: "Drill the question bank and quizzes, and polish your projects' READMEs and demos." },
  ],

  questions: [
    { id: "q25", topic: "mlbasics", q: "Explain precision and recall with a real example.", a: "For a fraud model: precision = of the transactions we flagged, how many were actually fraud; recall = of all real fraud, how many we flagged. Raising the threshold usually increases precision and lowers recall; the business cost of missed fraud vs false alarms decides the balance." },
    { id: "q26", topic: "mlbasics", q: "How do you detect and fix overfitting?", a: "Training performance is much better than validation/test performance. Fix with more or more varied data, simpler models, regularization, early stopping, or better features; always judge on held-out data." },
    { id: "q27", topic: "tokenization", q: "How would you manage context for a long-running support chat?", a: "Budget tokens per component; keep the system prompt stable (cacheable); keep recent turns verbatim; summarize or compact older turns; retrieve relevant earlier facts on demand; and store structured state (customer ID, issue) outside the prompt." },
    { id: "q28", topic: "customization", q: "Your team wants to fine-tune a model to answer HR questions. What's your advice?", a: "Start with RAG over the HR policies (facts change, need citations and permissions). Fine-tune only if evals show a persistent style/format gap that prompting can't fix, and keep RAG for the facts." },
    { id: "q29", topic: "customization", q: "What do you need before fine-tuning?", a: "A clear failing behaviour measured by an eval, hundreds to thousands of clean representative examples, a held-out test set, a baseline from prompting/RAG, and a plan for cost, hosting and retraining when the base model changes." },
    { id: "q30", topic: "multimodal", q: "Design a system that reads uploaded bank statements and answers questions about spending.", a: "Store uploads securely; extract transactions with a document AI service (or LLM for unusual layouts); validate totals; store structured transactions; answer questions with an LLM over that data (SQL or tool calls) with citations to statement lines; redact PII and restrict retention." },
    { id: "q31", topic: "cloudai", q: "Compare Amazon Bedrock and Microsoft Foundry for an enterprise.", a: "Both offer managed access to multiple model providers with cloud-native identity, networking, logging and billing, plus RAG, guardrails and agent tooling. Choose based on the company's primary cloud, model availability in required regions, compliance approvals and existing skills." },
    { id: "q32", topic: "safety", q: "How do you apply responsible AI principles to an LLM feature in a bank?", a: "Fairness testing across customer groups, human review for consequential decisions, transparency that users are interacting with AI, explanations and citations, privacy controls and data minimization, audit logging, documented model limitations, and a clear owner accountable for the system." },
  ],

  quiz: [
    { id: "x26", tags: ["AIF", "AI-900"], topic: "mlbasics", q: "Predicting a house's sale price from its features is:", options: ["Classification", "Regression", "Clustering", "Reinforcement learning"], answer: 1, why: "Regression predicts a continuous number." },
    { id: "x27", tags: ["AIF", "AI-900"], topic: "mlbasics", q: "Grouping customers by behaviour without predefined labels is:", options: ["Supervised learning", "Unsupervised learning (clustering)", "Regression", "Fine-tuning"], answer: 1, why: "Clustering finds structure in unlabelled data." },
    { id: "x28", tags: ["AIF", "MLA"], topic: "mlbasics", q: "A model scores 99% on training data and 70% on test data. This suggests:", options: ["Underfitting", "Overfitting", "Data drift", "Perfect generalization"], answer: 1, why: "A large gap between training and test performance indicates overfitting." },
    { id: "x29", tags: ["AIF", "AI-900"], topic: "mlbasics", q: "In a fraud model, recall measures:", options: ["Of flagged transactions, how many were fraud", "Of all fraud, how many were flagged", "Overall accuracy", "Model latency"], answer: 1, why: "Recall = true positives / all actual positives." },
    { id: "x30", tags: ["AIF"], topic: "mlbasics", q: "Which data split should be used only once, for the final unbiased estimate?", options: ["Training set", "Validation set", "Test set", "Augmented set"], answer: 2, why: "The test set stays untouched until the end." },
    { id: "x31", tags: [], topic: "tokenization", q: "Byte-pair encoding builds a vocabulary by:", options: ["Splitting on spaces only", "Repeatedly merging the most frequent adjacent pairs", "Hashing every word", "Using one token per character"], answer: 1, why: "BPE merges frequent pairs into new tokens iteratively." },
    { id: "x32", tags: [], topic: "tokenization", q: "The most reliable way to know a prompt's token count is:", options: ["Divide characters by 4", "Count words", "Use the provider's token-counting tool", "Count sentences"], answer: 2, why: "Tokenizers differ by model; rules of thumb are only rough." },
    { id: "x33", tags: ["AIF", "AI-102"], topic: "customization", q: "The best way to keep a model's answers current with weekly-changing policies:", options: ["Fine-tune weekly", "RAG over the policy documents", "Raise the temperature", "Train a new model"], answer: 1, why: "RAG supplies current documents at query time; fine-tuning isn't for fast-changing facts." },
    { id: "x34", tags: ["AIF", "MLA"], topic: "customization", q: "LoRA is a technique for:", options: ["Faster tokenization", "Parameter-efficient fine-tuning with small adapter matrices", "Vector search", "Image generation"], answer: 1, why: "LoRA trains low-rank adapters instead of all weights." },
    { id: "x35", tags: ["AIF"], topic: "customization", q: "Training a smaller model on a larger model's outputs is called:", options: ["Distillation", "Quantization", "Tokenization", "Retrieval"], answer: 0, why: "Distillation transfers behaviour from a large 'teacher' to a smaller 'student'." },
    { id: "x36", tags: ["AI-102", "AI-900"], topic: "multimodal", q: "Which Azure service is built for extracting fields from invoices and forms?", options: ["Azure AI Document Intelligence", "Azure Monitor", "Azure Front Door", "Azure DevOps"], answer: 0, why: "Document Intelligence specializes in form and document extraction." },
    { id: "x37", tags: ["AIF"], topic: "multimodal", q: "Which AWS service extracts text and form data from scanned documents?", options: ["Amazon Polly", "Amazon Textract", "Amazon Lex", "Amazon Kendra"], answer: 1, why: "Textract extracts printed text, forms and tables from documents." },
    { id: "x38", tags: ["AI-900"], topic: "cloudai", q: "Which Azure service provides content filtering for harmful text and images?", options: ["Azure AI Content Safety", "Azure Key Vault", "Azure Policy", "Azure Arc"], answer: 0, why: "Azure AI Content Safety detects harmful content." },
    { id: "x39", tags: ["AIF", "MLA"], topic: "cloudai", q: "Which AWS service is the platform for building, training and deploying your own ML models?", options: ["Amazon SageMaker AI", "Amazon Bedrock Guardrails", "AWS Glue", "Amazon Athena"], answer: 0, why: "SageMaker AI covers the full ML lifecycle for custom models." },
    { id: "x40", tags: ["AI-900", "AI-102"], topic: "safety", q: "Which is one of Microsoft's six responsible AI principles?", options: ["Profitability", "Inclusiveness", "Virality", "Exclusivity"], answer: 1, why: "The six are fairness, reliability and safety, privacy and security, inclusiveness, transparency and accountability." },
    { id: "x42", tags: [], topic: "sampling", q: "Softmax turns a model's logits into:", options: ["Tokens", "Probabilities that add up to 1", "Embeddings", "A temperature"], answer: 1, why: "Softmax exponentiates each score and divides by the total, giving probabilities that sum to 1." },
    { id: "x43", tags: ["AIF"], topic: "sampling", q: "Raising the temperature above 1 makes the next-token distribution:", options: ["Sharper", "Flatter, so outputs vary more", "Unchanged", "Greedy"], answer: 1, why: "Dividing logits by a larger temperature shrinks their differences before softmax." },
    { id: "x41", tags: ["AIF"], topic: "safety", q: "Which is one of AWS's responsible AI dimensions?", options: ["Controllability", "Monetization", "Gamification", "Speed"], answer: 0, why: "AWS lists fairness, explainability, privacy and security, safety, controllability, veracity and robustness, governance and transparency." },
  ],

  certs: [
    { id: "aip", code: "AIP-C01", name: "AWS Certified Generative AI Developer - Professional", provider: "AWS", level: "Professional", tag: "AIP", link: "https://aws.amazon.com/certification/certified-generative-ai-developer-professional/",
      why: "AWS's professional-level GenAI exam: building production RAG, agents, guardrails, evaluation and monitoring on Bedrock. Aimed at developers with real GenAI project experience; take it after AIF-C01 and the projects in this track.", topics: ["apis", "prompting", "vectorstores", "rag", "tools", "agents", "evals", "safety", "llmops", "cloudai"] },
  ],

  certTopics: { aif: ["mlbasics", "customization", "cloudai", "multimodal", "tokenization"], ai900: ["mlbasics", "multimodal", "cloudai"], ai102: ["multimodal", "cloudai", "customization"], mla: ["mlbasics", "customization", "cloudai"] },

  videos: {
    mlbasics: [V("aircAruvnKk", "But what is a neural network?", "3Blue1Brown"), V("Kdsp6soqA7o", "Machine Learning Fundamentals: The Confusion Matrix", "StatQuest with Josh Starmer"), V("EuBBz3bI-aA", "Machine Learning Fundamentals: Bias and Variance", "StatQuest with Josh Starmer")],
    tokenization: [V("zduSFxRajkE", "Let's build the GPT Tokenizer", "Andrej Karpathy")],
    customization: [V("6SO-8FcSkz4", "Prompt Engineering vs RAG vs Fine-tuning Explained", "Krish Naik"), V("t1caDsMzWBk", "LoRA & QLoRA Fine-tuning Explained In-Depth", "Mark Hennings")],
  },

  glossary: [
    ["Agent", "An LLM that uses tools in a loop, choosing its own next steps toward a goal."],
    ["Adapter", "A small set of extra trainable parameters added to a frozen model; LoRA adapters are the common kind."],
    ["Attention", "The transformer mechanism that lets each token weigh the relevance of other tokens in the context."],
    ["BPE (byte-pair encoding)", "A tokenization method that merges frequent character pairs into subword tokens."],
    ["Chunking", "Splitting documents into retrievable pieces, often with overlap."],
    ["Context window", "The maximum number of tokens (input plus output) a model can process at once."],
    ["Cosine similarity", "A measure of how similar two vectors' directions are, from -1 to 1."],
    ["Distillation", "Training a smaller model to imitate a larger model's outputs."],
    ["Drift", "Degradation when real-world data or patterns change after deployment."],
    ["Embedding", "A vector of numbers representing the meaning of text, images or other data."],
    ["Eval", "A repeatable test suite measuring model or prompt quality on a fixed dataset."],
    ["F1 score", "The harmonic mean of precision and recall."],
    ["Few-shot prompting", "Including worked examples in the prompt to show the desired behaviour."],
    ["Fine-tuning", "Further training a pretrained model on task-specific examples."],
    ["Foundation model", "A large model pretrained on broad data that can be adapted to many tasks."],
    ["Grounding", "Constraining answers to supplied sources so they're verifiable."],
    ["Guardrails", "Controls that filter or block unsafe inputs/outputs and constrain model actions."],
    ["Golden dataset", "A fixed set of realistic inputs with expected answers or qualities, used by evals."],
    ["Hallucination", "Fluent output that is false or unsupported by the provided information."],
    ["Hybrid search", "Combining keyword (BM25) and vector search results."],
    ["Latency", "How long a request takes; often split into time to first token and total time."],
    ["Logit", "The raw score a model outputs for each possible next token, before softmax."],
    ["LLM-as-judge", "Using a model with a rubric to grade another model's output."],
    ["LoRA", "Low-rank adaptation: parameter-efficient fine-tuning with small adapter matrices."],
    ["Least privilege", "Giving a tool, service or person only the permissions it needs, nothing more."],
    ["MCP", "Model Context Protocol: an open standard for connecting AI apps to tools and data."],
    ["Overfitting", "A model memorizes training data and generalizes poorly to new data."],
    ["PII", "Personally identifiable information: names, emails, phone numbers, account numbers and anything else that identifies a person."],
    ["Precision / recall", "Precision: correct share of predicted positives. Recall: share of actual positives found."],
    ["Prompt caching", "Reusing the processed form of a repeated prompt prefix to cut cost and latency."],
    ["Prompt injection", "Input crafted to override an AI system's instructions, directly or via retrieved content."],
    ["RAG", "Retrieval-augmented generation: retrieve relevant documents and include them in the prompt."],
    ["Reranker", "A model that reorders retrieved candidates by relevance to the query."],
    ["Softmax", "The function that turns logits into probabilities: exponentiate each, then divide by the total."],
    ["Structured output", "Constraining a model's response to a schema such as JSON."],
    ["System prompt", "Instructions that set a model's role and rules for a whole conversation, sent separately from user messages."],
    ["Temperature", "A sampling setting controlling randomness; lower is more deterministic."],
    ["Token", "A unit of text (often a word piece) that models read and generate."],
    ["Tool use / function calling", "The model requests a function call with arguments; your code executes it and returns the result."],
    ["Transformer", "The neural-network architecture behind modern LLMs, built around attention."],
    ["Vector", "An ordered list of numbers; embeddings are vectors."],
    ["Vector database", "A store optimized for similarity search over embeddings."],
  ],
});

// IBM Technology explainers for every AI lesson (ids and titles confirmed via YouTube oEmbed),
// appended after each lesson's existing videos.
AI.channel = IBM_CHANNEL;
extendTrack(AI, {
  videos: {
    foundations: [IBM("5sLYAQS9sWQ", "How Large Language Models Work"), IBM("ZXiruGOCn9s", "What are Transformers (Machine Learning Model)?"), IBM("cfqtFvWOfg0", "Why Large Language Models Hallucinate"), IBM("qYNweeDHiyU", "AI, Machine Learning, Deep Learning and Generative AI Explained")],
    apis: [IBM("pYax2rupKEY", "How to Choose Large Language Models: A Developer’s Guide to LLMs"), IBM("AVQzG2MY858", "LLM vs. SLM vs. FM: Choosing the Right AI Model"), IBM("lsMQRaeKNDk", "What is a REST API?")],
    prompting: [IBM("1c9iyoVIwDs", "4 Methods of Prompt Engineering"), IBM("vD0E3EUb8-8", "Context Engineering vs. Prompt Engineering: Smarter AI with RAG & Agents"), IBM("Qx0fCqpkBus", "What Is Context Engineering? Why It Matters for AI Agents")],
    structured: [IBM("_pEEJu-2KKM", "LLMs and AI Agents: Transforming Unstructured Data")],
    embeddings: [IBM("wgfSDrqYMJ4", "What are Word Embeddings?"), IBM("gl1r1XV0SLw", "What is a Vector Database? Powering Semantic Search & AI Applications")],
    vectorstores: [IBM("t9IDoenf-lo", "What is a Vector Database?"), IBM("r0Dciuq0knU", "Top 3 RAG Retrieval Strategies: Sparse, Dense, & Hybrid Explained"), IBM("xc63tFIIfeA", "Why RAG Solutions Fail with Complex Documents & Vector Databases")],
    rag: [IBM("UabBYexBD4k", "Is RAG Still Needed? Choosing the Best Approach for LLMs"), IBM("0z9_MhcYvcY", "What is Agentic RAG?"), IBM("Aw7iQjKAX2k", "GraphRAG vs. Traditional RAG: Higher Accuracy & Insight with LLM")],
    tools: [IBM("h8gMhXYAv1k", "What is Tool Calling? Connecting LLMs to Your Data"), IBM("eur8dUO9mvE", "What is MCP? Integrate AI Agents with Databases & APIs"), IBM("7j1t3UZA1TY", "MCP vs API: Simplifying AI Agent Integration with External Data"), IBM("EyYJI8TPIj8", "How to Build an MCP Server for LLM Agents: Simplify AI Integration")],
    agents: [IBM("F8NKVhkZZWI", "What are AI Agents?"), IBM("sWH0T4Zez6I", "Multi Agent Systems Explained: How AI Agents & LLMs Work Together"), IBM("ZVPlLaehjLk", "Agentic AI Frameworks Explained: Workflows, Multi-Agent, & Production"), IBM("qAF1NjEVHhY", "LangChain vs LangGraph: A Tale of Two Frameworks")],
    evals: [IBM("trfUBIDeI1Y", "LLM as a Judge: Scaling AI Evaluation Strategies"), IBM("kDY4TodQwbg", "What are Large Language Model (LLM) Benchmarks?"), IBM("nVImVgKpoOY", "LLM & AI Agent Benchmarks vs Reality: Why AI Applications Break")],
    safety: [IBM("jrHRe9lSqqA", "What Is a Prompt Injection Attack?"), IBM("cYuesqIKf9A", "Explained: The OWASP Top 10 for Large Language Model Applications"), IBM("5ZA1lTxTH3c", "Securing AI Agents: How to Prevent Hidden Prompt Injection Attacks")],
    llmops: [IBM("cvPEiPt7HXo", "Large Language Model Operations (LLMOps) Explained"), IBM("u57EnkQaUTY", "What is Prompt Caching? Optimize LLM Latency with AI Transformers"), IBM("XtT5i0ZeHHE", "AI Inference: The Secret to AI's Superpowers")],
    mlbasics: [IBM("9gGnTQTYNaE", "What is Machine Learning?"), IBM("q6kJ71tEYqM", "Machine Learning vs Deep Learning"), IBM("jmmW0F0biz0", "Neural Networks Explained in 5 minutes")],
    tokenization: [IBM("-QVoIxEpFkM", "What is a Context Window? Unlocking LLM Secrets")],
    customization: [IBM("00Q0G84kq3M", "RAG vs. Fine Tuning"), IBM("zYGDpG-pTho", "RAG vs Fine-Tuning vs Prompt Engineering: Optimizing AI Models"), IBM("-W2JdSl1v48", "Is Fine-Tuning Still Needed? LLMs, RAG, & LoRA"), IBM("T_X4XFwKX8k", "Reinforcement Learning from Human Feedback (RLHF) Explained")],
    multimodal: [IBM("J51oZYcNvP8", "What is Multimodal AI? How LLMs Process Text, Images, and More"), IBM("lOD_EE96jhM", "What Are Vision Language Models? How AI Sees & Understands Images"), IBM("anLahYrEFiQ", "What is Multimodal RAG? Unlocking LLMs with Vector Databases")],
    cloudai: [IBM("81FbpXpfxTc", "AI Models as a Service: Powering Agentic AI, Privacy, & RAG"), IBM("RRKwmeyIc24", "What Is an AI Stack? LLMs, RAG, & AI Hardware")],
  },
});
