// The beginner lessons, for people with no programming or machine-learning background: "Python from zero"
// (adapted from DSA Prep's beginner track, same audience) and "AI from zero" (what models, training, LLMs,
// tokens and API calls are, in plain language). Merged into AI by extendTrack, ahead of the main topics.
// Topics carry `zero` ("py" or "ai"); trackview.js puts them first for new learners and marks them optional
// for people who already code. Each exercise has a stable `key`, a plain prompt, an example, a hint and a
// model answer. The AI exercises simulate the model with small Python functions or lookup tables, so nothing
// needs an API key. body is trusted HTML (written here). Code avoids backslashes (template literals).

const ZERO_TOPICS = [
  // ---------------- Python from zero ----------------
  {
    id: "pz-values", zero: "py", title: "Values and variables", yt: "python for absolute beginners variables",
    videos: [V("kqtD5dpn9C8", "Python for Beginners - Learn Coding with Python in 1 Hour", "Programming with Mosh")],
    body: `<p>A <b>program</b> is a list of instructions the computer follows, one line at a time, from top to bottom. The lessons here use <b>Python</b>, a programming language that's popular for AI work because it reads almost like English. This lesson covers the two things almost every line works with: <b>values</b> and <b>variables</b>.</p>
      <h3>Values</h3>
      <p>A value is a piece of data. You'll meet three kinds first:</p>
      <ul><li><b>Numbers</b>: <code>42</code>, <code>-7</code>, <code>3.5</code>. Whole numbers are called <i>integers</i> (<code>int</code>); numbers with a decimal point are <i>floats</i> (<code>float</code>).</li>
      <li><b>Text</b>: <code>"hello"</code>. Text always goes inside quotes. Python calls a piece of text a <i>string</i> (<code>str</code>), because it's a string of characters.</li>
      <li><b>True or False</b>: <code>True</code> and <code>False</code>, with capital letters and no quotes. These are called <i>booleans</i> (<code>bool</code>).</li></ul>
      <h3>Doing maths</h3>
      <p><code>+</code> adds, <code>-</code> subtracts, <code>*</code> multiplies and <code>/</code> divides (the answer is always a float: <code>6 / 2</code> is <code>3.0</code>). Two more you'll use: <code>//</code> divides and drops anything after the decimal point (<code>7 // 2</code> is <code>3</code>), and <code>%</code> gives the <i>remainder</i> (<code>7 % 2</code> is <code>1</code>, because 7 divided by 2 is 3 with 1 left over).</p>
      <h3>Comparing</h3>
      <p>A comparison asks a yes/no question and gives back a boolean: <code>5 &gt; 3</code> is <code>True</code>. The comparisons are <code>&gt;</code> (greater than), <code>&lt;</code> (less than), <code>&gt;=</code> (at least), <code>&lt;=</code> (at most), <code>==</code> (equal: two equals signs) and <code>!=</code> (not equal).</p>
      <h3>Variables</h3>
      <p>A variable is a <b>name</b> that holds a value, so you can use it later. You create one with a single <code>=</code>:</p>
      <pre>age = 36</pre>
      <p>Read this as "<i>age</i> now holds 36", not "age equals 36". The <code>=</code> sign means "work out the value on the right, then store it under the name on the left". You can store a new value under the same name later; the old value is replaced.</p>
      <h3>print and comments</h3>
      <p><code>print(...)</code> shows a value on the screen. It's how you look inside your program while it runs. Anything after a <code>#</code> is a <i>comment</i>: a note for people, which Python ignores.</p>
      <h3>Worked example, step by step</h3>
      <p>The example below works out the cost of three coffees. Follow it line by line:</p>
      <ol><li><code>price = 4</code> creates a variable called <code>price</code> holding 4.</li>
      <li><code>quantity = 3</code> creates another one holding 3.</li>
      <li><code>total = price * quantity</code>: Python first works out the right side (4 times 3 is 12), then stores 12 in <code>total</code>.</li>
      <li><code>print(total)</code> shows <code>12</code>.</li>
      <li><code>price = 5</code> replaces the 4 with a 5. <code>total</code> does <i>not</i> change by itself: it still holds 12 until you work it out again.</li>
      <li><code>cheap = total &lt; 20</code> stores the answer to "is 12 less than 20?", which is <code>True</code>.</li></ol>
      <p><b>How the exercises work:</b> type your code in the box and press <b>Run tests</b>. The page checks your code with a few tests (small checks that your answer is right). Stuck? Open the hint, and if you're still stuck, open the model answer, read it, then type it in yourself. You can also press <b>Run this example</b> under the worked example to see what it prints.</p>`,
    example: `price = 4          # a variable called price, holding the number 4
quantity = 3
total = price * quantity
print(total)       # 12

price = 5          # price now holds 5
print(total)       # still 12: total was worked out before the change
print(price * quantity)   # 15

cheap = total < 20 # a comparison gives True or False
print(cheap)       # True

name = "Ada"       # text goes in quotes
print("Hello", name)      # Hello Ada
print(7 // 2, 7 % 2)      # 3 1
`,
    exercises: [
      { key: "city", prompt: "Create a variable called city that holds the text Waterloo.",
        example: `After your code runs, city holds "Waterloo"`,
        hint: "Text goes in quotes: write the variable name, then =, then the text in quotes.",
        starter: "# Write your line below\n",
        tests: `assert city == "Waterloo", "city should hold the text Waterloo (with quotes around it in your code)"`,
        solution: `city = "Waterloo"` },
      { key: "score", prompt: "Create a variable called score that holds the number 90. Make it a number, not text.",
        example: "After your code runs, score holds 90",
        hint: "Numbers don't use quotes. `score = \"90\"` would be text.",
        starter: "# Write your line below\n",
        tests: `assert score == 90, "score should hold 90 (no quotes: it's a number)"
assert type(score) is int`,
        solution: `score = 90` },
      { key: "area", prompt: "The variables width and height are already made for you. Create a variable called area that holds width multiplied by height. Use the variables, not the number 21.",
        example: "width = 7 and height = 3, so area holds 21",
        hint: "Multiplication is `*`. Put the variable names on the right of `=`: `area = width * height`.",
        starter: "width = 7\nheight = 3\n# Write your line below\n",
        tests: `assert area == 21, "area should be width * height, which is 21"`,
        solution: `width = 7
height = 3
area = width * height` },
      { key: "passed", prompt: "The variable mark holds 72. Create a variable called passed that holds True if mark is at least 50, and False otherwise. Use a comparison, not the word True.",
        example: "mark = 72, so passed holds True",
        hint: "\"At least\" is `>=`. A comparison already gives True or False, so you can store it directly: `passed = mark >= 50`.",
        starter: "mark = 72\n# Write your line below\n",
        tests: `assert passed is True, "72 is at least 50, so passed should be True"`,
        solution: `mark = 72
passed = mark >= 50` },
      { key: "minutes", prompt: "The variable hours holds 3. Create a variable called minutes that holds how many minutes that is (an hour has 60 minutes).",
        example: "hours = 3, so minutes holds 180",
        hint: "Multiply hours by 60 and store the answer: `minutes = hours * 60`.",
        starter: "hours = 3\n# Write your line below\n",
        tests: `assert minutes == 180, "3 hours is 180 minutes"`,
        solution: `hours = 3
minutes = hours * 60` },
    ],
  },
  {
    id: "pz-functions", zero: "py", title: "Functions and decisions", yt: "python functions and if statements for absolute beginners",
    videos: [V("9Os0o3wzS_I", "Python Tutorial for Beginners 8: Functions", "Corey Schafer")],
    body: `<p>A <b>function</b> is a named set of steps, like a recipe. You write the recipe once, then <i>use</i> it as often as you like. Python already has some: <code>print</code> is a function, and so is <code>len</code>, which counts the characters in a piece of text (<code>len("hello")</code> is 5).</p>
      <h3>Defining a function</h3>
      <pre>def double(n):
    return n * 2</pre>
      <ul><li><code>def</code> means "define a function". <code>double</code> is its name.</li>
      <li><code>n</code>, in the brackets, is a <b>parameter</b>: a variable that will hold the input each time the function is used.</li>
      <li>The colon <code>:</code> starts the function's <b>body</b>. Every line of the body is <b>indented</b> (pushed right by 4 spaces). Indentation is how Python knows which lines belong to the function.</li>
      <li><code>return</code> hands an answer back to whoever used the function, and ends the function.</li></ul>
      <p>Defining a function doesn't run it. It only teaches Python the recipe.</p>
      <h3>Calling a function</h3>
      <p>Using a function is called <b>calling</b> it: write its name and put the input in brackets, like <code>double(5)</code>. The value you pass in (5) is called an <b>argument</b>. When Python runs <code>x = double(5)</code>, it jumps into <code>double</code> with <code>n</code> set to 5, works out <code>5 * 2</code>, returns 10, and the line becomes <code>x = 10</code>.</p>
      <p>A function can take several inputs, separated by commas: <code>def add(a, b):</code>, called as <code>add(2, 3)</code>. The first argument goes into the first parameter, the second into the second.</p>
      <h3>return is not print</h3>
      <p><code>print</code> only shows a value on screen; the program can't use it afterwards. <code>return</code> gives the value back so you can store it, print it, or pass it to another function. In the exercises, always <b>return</b> your answer.</p>
      <h3>Making decisions: if, elif, else</h3>
      <p>An <code>if</code> runs its indented lines only when a condition is <code>True</code>. <code>else</code> runs when it isn't. <code>elif</code> ("else if") adds more conditions in between; Python checks them top to bottom and runs the first one that's true.</p>
      <h3>Worked example, step by step</h3>
      <p>The function <code>describe(temp)</code> in the example turns a temperature into a word. Call it with 30:</p>
      <ol><li><code>temp</code> is 30. Is <code>30 &gt; 25</code>? Yes, so it returns <code>"hot"</code> and stops. The other lines never run.</li>
      <li>Call it with 18: <code>18 &gt; 25</code> is False, so Python tries the <code>elif</code>: <code>18 &gt; 10</code> is True, so it returns <code>"mild"</code>.</li>
      <li>Call it with 4: both conditions are False, so the <code>else</code> runs and it returns <code>"cold"</code>.</li></ol>`,
    example: `def double(n):        # define: a recipe called double with one input, n
    result = n * 2    # the body is indented
    return result     # hand the answer back

print(double(5))      # call it with 5: prints 10

def add(a, b):        # two parameters
    return a + b

print(add(2, 3))      # 5
print(add(double(2), 1))   # double(2) is 4, then add(4, 1) is 5

def describe(temp):
    if temp > 25:
        return "hot"
    elif temp > 10:
        return "mild"
    else:
        return "cold"

print(describe(30), describe(18), describe(4))   # hot mild cold
`,
    exercises: [
      { key: "half", prompt: "Write a function half(n) that returns n divided by 2.",
        example: "half(10) returns 5.0\nhalf(3) returns 1.5",
        hint: "Like double in the worked example, but divide with `/` instead of multiplying: `return n / 2`.",
        starter: "def half(n):\n    pass\n",
        tests: `assert half(10) == 5, f"half(10) should be 5, got {half(10)}"
assert half(3) == 1.5
assert half(0) == 0`,
        solution: `def half(n):
    return n / 2` },
      { key: "greet", prompt: "Write a function greet(name) that returns a greeting: the text Hello, then the name, then an exclamation mark.",
        example: `greet("Sam") returns "Hello, Sam!"`,
        hint: "`+` joins pieces of text together: `\"Hello, \" + name + \"!\"`. Watch the space after the comma.",
        starter: "def greet(name):\n    pass\n",
        tests: `assert greet("Sam") == "Hello, Sam!", f"got {greet('Sam')!r}"
assert greet("Ada") == "Hello, Ada!"`,
        solution: `def greet(name):
    return "Hello, " + name + "!"` },
      { key: "is-even", prompt: "Write a function is_even(n) that returns True if n is even and False if it's odd.",
        example: "is_even(4) returns True\nis_even(7) returns False",
        hint: "A number is even when the remainder after dividing by 2 is 0. `n % 2 == 0` is already True or False, so you can return it directly.",
        starter: "def is_even(n):\n    pass\n",
        tests: `assert is_even(4) is True, "4 is even"
assert is_even(7) is False, "7 is odd"
assert is_even(0) is True, "0 is even"`,
        solution: `def is_even(n):
    return n % 2 == 0` },
      { key: "with-tax", prompt: "Ontario adds 13% sales tax (HST). Write a function with_tax(price) that returns the price plus 13% tax.",
        example: "with_tax(100) returns 113.0 (it may print as 112.99999999999999: computers store decimals slightly imprecisely, and the tests allow for that)",
        hint: "Adding 13% is the same as multiplying by 1.13: `return price * 1.13`.",
        starter: "def with_tax(price):\n    pass\n",
        tests: `assert with_tax(100) is not None, "remember to return the answer"
assert abs(with_tax(100) - 113) < 1e-9, f"with_tax(100) should be 113, got {with_tax(100)}"
assert abs(with_tax(20) - 22.6) < 1e-9
assert with_tax(0) == 0`,
        solution: `def with_tax(price):
    return price * 1.13` },
      { key: "grade", prompt: "Write a function grade(score) that returns \"pass\" when score is 50 or more, and \"fail\" otherwise.",
        example: `grade(72) returns "pass"\ngrade(50) returns "pass"\ngrade(31) returns "fail"`,
        hint: "Use `if score >= 50:` with `return \"pass\"` indented under it, then `else:` with `return \"fail\"`. Check the worked example for the shape.",
        starter: "def grade(score):\n    pass\n",
        tests: `assert grade(72) == "pass", f"grade(72) should be 'pass', got {grade(72)!r}"
assert grade(50) == "pass", "50 counts as a pass (50 or more)"
assert grade(31) == "fail"`,
        solution: `def grade(score):
    if score >= 50:
        return "pass"
    else:
        return "fail"` },
    ],
  },
  {
    id: "pz-lists", zero: "py", title: "Lists and loops", yt: "python lists and for loops for absolute beginners",
    videos: [V("W8KRzm-HUcc", "Python Tutorial for Beginners 4: Lists, Tuples, and Sets", "Corey Schafer")],
    body: `<p>A <b>list</b> holds several values in order, inside square brackets, separated by commas: <code>scores = [70, 85, 90]</code>. One variable now holds three numbers.</p>
      <h3>Getting items out</h3>
      <p>Each item has a position number called an <b>index</b>. Counting starts at <b>0</b>, not 1:</p>
      <ul><li><code>scores[0]</code> is the first item (70), <code>scores[1]</code> the second (85).</li>
      <li><code>scores[-1]</code> is the last item (90): negative numbers count back from the end.</li>
      <li><code>len(scores)</code> is how many items there are (3).</li>
      <li><code>85 in scores</code> asks "is 85 in the list?" and gives <code>True</code> or <code>False</code>.</li></ul>
      <h3>Changing a list</h3>
      <p><code>scores.append(100)</code> adds 100 to the end. A list can grow while the program runs. <code>[]</code> is an empty list, with nothing in it. (A function that belongs to a value, like <code>append</code>, is called a <b>method</b>; you call it with a dot.)</p>
      <h3>Going through every item: the for loop</h3>
      <pre>for s in scores:
    print(s)</pre>
      <p>Read this as "for each item in <code>scores</code>, call it <code>s</code> and run the indented lines". The body runs once per item: first with <code>s</code> = 70, then 85, then 90. You can put an <code>if</code> inside the loop to act only on some items.</p>
      <p><code>range(n)</code> gives the numbers 0, 1, ... up to n - 1, so <code>for i in range(3):</code> runs with <code>i</code> = 0, 1 and 2. It's handy when you need positions.</p>
      <h3>Worked example: adding up a list</h3>
      <ol><li>Start a running total at 0: <code>total = 0</code>.</li>
      <li>Loop over the list. Each time round, add the current item: <code>total = total + s</code>. That line means "work out total plus s, then store the answer back in total".</li>
      <li>After the loop (back at the left edge, not indented), <code>total</code> is 0 + 70 + 85 + 90 = 245.</li></ol>
      <p>The same idea builds a <i>new</i> list: start with <code>[]</code> and <code>append</code> inside the loop. The example below makes a list of doubled scores that way.</p>`,
    example: `scores = [70, 85, 90]   # a list of three numbers
print(scores[0])        # 70: positions start at 0
print(scores[-1])       # 90: the last item
print(len(scores))      # 3
print(85 in scores)     # True

total = 0
for s in scores:        # s is each item in turn
    total = total + s
print(total)            # 245

doubled = []            # start empty, then append inside the loop
for s in scores:
    doubled.append(s * 2)
print(doubled)          # [140, 170, 180]

for i in range(3):
    print("position", i, "holds", scores[i])
`,
    exercises: [
      { key: "first", prompt: "Write a function first_item(items) that returns the first item of the list.",
        example: "first_item([7, 8, 9]) returns 7",
        hint: "The first position is 0: `items[0]`.",
        starter: "def first_item(items):\n    pass\n",
        tests: `assert first_item([7, 8, 9]) == 7, "the first item of [7, 8, 9] is 7"
assert first_item(["a"]) == "a"`,
        solution: `def first_item(items):
    return items[0]` },
      { key: "last", prompt: "Write a function last_item(items) that returns the last item of the list.",
        example: "last_item([7, 8, 9]) returns 9",
        hint: "Negative positions count from the end: `items[-1]` is the last item.",
        starter: "def last_item(items):\n    pass\n",
        tests: `assert last_item([7, 8, 9]) == 9
assert last_item(["only"]) == "only"`,
        solution: `def last_item(items):
    return items[-1]` },
      { key: "average", prompt: "Write a function average(nums) that returns the average of a list of numbers: add them up with a for loop, then divide by how many there are. The list always has at least one number.",
        example: "average([80, 90, 100]) returns 90.0\naverage([1, 2]) returns 1.5",
        hint: "Start from the running total in the worked example. After the loop (not indented under it), divide the total by `len(nums)` and return that.",
        starter: "def average(nums):\n    pass\n",
        tests: `assert average([80, 90, 100]) == 90, f"average([80, 90, 100]) should be 90, got {average([80, 90, 100])}"
assert average([5]) == 5
assert average([1, 2]) == 1.5`,
        solution: `def average(nums):
    total = 0
    for n in nums:
        total = total + n
    return total / len(nums)` },
      { key: "positives", prompt: "Write a function positives(nums) that returns a new list with only the numbers greater than 0, in the same order.",
        example: "positives([3, -1, 0, 5]) returns [3, 5]",
        hint: "Start with `result = []`. Loop over nums; inside the loop, `if n > 0:` then `result.append(n)`. Return result after the loop.",
        starter: "def positives(nums):\n    pass\n",
        tests: `assert positives([3, -1, 0, 5]) == [3, 5], f"got {positives([3, -1, 0, 5])}"
assert positives([-2, -1]) == [], "no positives gives an empty list"
assert positives([]) == []`,
        solution: `def positives(nums):
    result = []
    for n in nums:
        if n > 0:
            result.append(n)
    return result` },
      { key: "count-long", prompt: "Write a function count_long(words, n) that returns how many words in the list have more than n characters.",
        example: `count_long(["hi", "hello", "hey there"], 3) returns 2`,
        hint: "Keep a counter that starts at 0. Loop over the words and add 1 when `len(word) > n`.",
        starter: "def count_long(words, n):\n    pass\n",
        tests: `assert count_long(["hi", "hello", "hey there"], 3) == 2
assert count_long(["abc"], 3) == 0, "exactly n characters is not more than n"
assert count_long([], 1) == 0`,
        solution: `def count_long(words, n):
    count = 0
    for word in words:
        if len(word) > n:
            count = count + 1
    return count` },
    ],
  },
  {
    id: "pz-dicts", zero: "py", title: "Dictionaries: looking things up by name", yt: "python dictionaries for absolute beginners",
    videos: [V("daefaLgNkw0", "Python Tutorial for Beginners 5: Dictionaries", "Corey Schafer")],
    body: `<p>A list finds things by position. A <b>dictionary</b> (<code>dict</code>) finds things by <b>name</b>. It stores pairs: a <b>key</b> (the name you look up) and a <b>value</b> (what it holds), inside curly brackets:</p>
      <pre>stock = {"apples": 5, "pears": 0}</pre>
      <ul><li><code>stock["apples"]</code> looks up a key: 5. Asking for a key that isn't there is an error (a <code>KeyError</code>).</li>
      <li><code>stock.get("plums", 0)</code> looks up a key but gives the second value (here 0) instead of an error when the key is missing.</li>
      <li><code>stock["plums"] = 12</code> adds a new key, or replaces the value if the key already exists.</li>
      <li><code>"pears" in stock</code> asks "is there a key called pears?"</li>
      <li><code>for name, count in stock.items():</code> loops over every pair. Each pair comes as two values, here named <code>name</code> and <code>count</code>.</li></ul>
      <p>That pair of values is called a <b>tuple</b>: values in round brackets, like <code>("apples", 5)</code>. A loop can unpack each tuple into two names at once, as above. You'll see lists of tuples a lot: <code>[("a", 1), ("b", 2)]</code>.</p>
      <h3>Two text tools you'll need</h3>
      <ul><li><code>text.lower()</code> gives a lowercase copy: <code>"Hi There".lower()</code> is <code>"hi there"</code>.</li>
      <li><code>text.split()</code> breaks text into a list of words at the spaces: <code>"to be or".split()</code> is <code>["to", "be", "or"]</code>.</li></ul>
      <h3>The counting pattern</h3>
      <p>To count how often things appear, start with an empty dict <code>{}</code>. For each thing: if it's already a key, add 1 to its value; otherwise set its value to 1. (Or in one line: <code>counts[x] = counts.get(x, 0) + 1</code>.) This pattern comes back in AI from zero, where a tiny language model learns by counting which word follows which.</p>
      <h3>Worked example, step by step</h3>
      <ol><li><code>stock = {"apples": 5, "pears": 0}</code> makes a dict with two keys.</li>
      <li><code>stock["apples"] = stock["apples"] - 2</code> looks up 5, subtracts 2 and stores 3 back under "apples".</li>
      <li><code>stock["plums"] = 12</code> adds a third key.</li>
      <li>The loop prints each fruit with its count, and an <code>if</code> inside it flags the ones that are sold out.</li></ol>`,
    example: `stock = {"apples": 5, "pears": 0}
print(stock["apples"])          # 5
stock["apples"] = stock["apples"] - 2   # sold two
stock["plums"] = 12             # a new key
print(stock)                    # {'apples': 3, 'pears': 0, 'plums': 12}
print(stock.get("kiwis", 0))    # 0: no kiwis key, so the default
print("pears" in stock)         # True

for name, count in stock.items():
    if count == 0:
        print(name, "is sold out")
    else:
        print(name, count)

print("To Be or".lower().split())   # ['to', 'be', 'or']
`,
    exercises: [
      { key: "price-of", prompt: "Write a function price_of(menu, item) that returns the price of item from the menu dictionary. The item is always on the menu.",
        example: `price_of({"tea": 2, "cake": 4}, "cake") returns 4`,
        hint: "Look the key up with square brackets: `menu[item]`.",
        starter: "def price_of(menu, item):\n    pass\n",
        tests: `assert price_of({"tea": 2, "cake": 4}, "cake") == 4
assert price_of({"tea": 2}, "tea") == 2`,
        solution: `def price_of(menu, item):
    return menu[item]` },
      { key: "price-or-zero", prompt: "Write a function price_or_zero(menu, item) that returns the item's price, or 0 if the item isn't on the menu.",
        example: `price_or_zero({"tea": 2}, "tea") returns 2\nprice_or_zero({"tea": 2}, "soup") returns 0`,
        hint: "`menu.get(item, 0)` gives 0 when the key is missing instead of an error.",
        starter: "def price_or_zero(menu, item):\n    pass\n",
        tests: `assert price_or_zero({"tea": 2}, "tea") == 2
assert price_or_zero({"tea": 2}, "soup") == 0, "a missing item should give 0, not an error"`,
        solution: `def price_or_zero(menu, item):
    return menu.get(item, 0)` },
      { key: "set-price", prompt: "Write a function set_price(menu, item, price) that sets the item's price in the menu (adding the item if it's new) and returns the menu.",
        example: `set_price({"tea": 2}, "cake", 4) returns {"tea": 2, "cake": 4}\nset_price({"tea": 2}, "tea", 3) returns {"tea": 3}`,
        hint: "Assign to the key: `menu[item] = price`, then `return menu` on the next line.",
        starter: "def set_price(menu, item, price):\n    pass\n",
        tests: `assert set_price({"tea": 2}, "cake", 4) == {"tea": 2, "cake": 4}
assert set_price({"tea": 2}, "tea", 3) == {"tea": 3}, "an existing item gets the new price"`,
        solution: `def set_price(menu, item, price):
    menu[item] = price
    return menu` },
      { key: "order-total", prompt: "Write a function order_total(menu, order) where order is a list of item names (an item can appear more than once). Return the total price. Every item is on the menu.",
        example: `order_total({"tea": 2, "cake": 4}, ["tea", "cake", "tea"]) returns 8`,
        hint: "A running total, like in Lists and loops: start at 0, loop over the order, and add `menu[item]` each time.",
        starter: "def order_total(menu, order):\n    pass\n",
        tests: `assert order_total({"tea": 2, "cake": 4}, ["tea", "cake", "tea"]) == 8
assert order_total({"tea": 2}, []) == 0, "an empty order costs 0"`,
        solution: `def order_total(menu, order):
    total = 0
    for item in order:
        total = total + menu[item]
    return total` },
      { key: "count-words", prompt: "Write a function count_words(text) that returns a dictionary mapping each word to how many times it appears. Treat upper and lower case as the same word, and split on spaces.",
        example: `count_words("the cat and The dog") returns {"the": 2, "cat": 1, "and": 1, "dog": 1}`,
        hint: "Use `text.lower().split()` to get the words, then the counting pattern from the lesson: `counts[word] = counts.get(word, 0) + 1` inside a loop.",
        starter: "def count_words(text):\n    pass\n",
        tests: `assert count_words("the cat and The dog") == {"the": 2, "cat": 1, "and": 1, "dog": 1}
assert count_words("") == {}, "no words gives an empty dict"
assert count_words("Go go GO")["go"] == 3`,
        solution: `def count_words(text):
    counts = {}
    for word in text.lower().split():
        counts[word] = counts.get(word, 0) + 1
    return counts` },
    ],
  },
  {
    id: "pz-errors", zero: "py", title: "Reading error messages", yt: "how to read python error messages traceback beginners",
    body: `<p>Every programmer sees error messages all day. They aren't a sign you've failed: they're Python telling you exactly what went wrong and where. Learning to read them is one of the most useful skills you can build.</p>
      <h3>How to read one</h3>
      <p>Read the <b>last line first</b>. It names the kind of error and gives a short reason. The lines above it (together called the <i>traceback</i>) say which line of your code was running (look for <code>line 3</code>, for example).</p>
      <h3>The errors you'll meet most</h3>
      <ul><li><b>SyntaxError</b>: Python couldn't understand the code as written. Often a missing colon <code>:</code> after <code>def</code>, <code>if</code> or <code>for</code>, a missing bracket, or a missing quote.</li>
      <li><b>IndentationError</b>: the spaces at the start of a line are wrong, for example a function body that isn't indented.</li>
      <li><b>NameError</b>: you used a name Python doesn't know. Usually a typo (<code>totl</code> instead of <code>total</code>) or a variable used before it was created.</li>
      <li><b>TypeError</b>: you combined values that don't go together, such as <code>"Age: " + 36</code> (text plus a number). Turn the number into text first with <code>str(36)</code>.</li>
      <li><b>IndexError</b>: you asked for a position the list doesn't have, like <code>[1, 2][5]</code>.</li>
      <li><b>KeyError</b>: you looked up a dictionary key that isn't there. Check the spelling and capital letters: <code>"Age"</code> and <code>"age"</code> are different keys.</li>
      <li><b>ValueError</b>: the type is right but the value isn't usable, like <code>int("ten")</code> (<code>int</code> turns text such as <code>"10"</code> into the number 10, but "ten" isn't digits).</li>
      <li><b>AssertionError</b>: in these exercises, this means your code ran but gave a different answer from the one the test expected. The message says what was expected.</li></ul>
      <h3>Raising your own errors</h3>
      <p>Your functions can report a problem too. <code>raise ValueError("price can't be negative")</code> stops the function and produces that error with your message. Later lessons use this a lot: when input is bad, it's better to fail loudly than to return a wrong answer.</p>
      <h3>Catching errors: try and except</h3>
      <p>Sometimes you expect an error and want to handle it instead of crashing. Put the risky line in a <code>try:</code> block; if it raises the error named in <code>except ValueError:</code>, Python jumps there instead:</p>
      <pre>try:
    n = int(answer)
except ValueError:
    n = 0</pre>
      <h3>Worked example</h3>
      <p>Suppose you write this and call <code>greet("Sam")</code>:</p>
      <pre>def greet(name):
    return "Hi " + nme</pre>
      <p>The last line of the error reads <code>NameError: name 'nme' is not defined</code>. Python is saying "I don't know anything called <code>nme</code>". Compare it with the parameter, <code>name</code>: it's a typo. Fix the spelling and run again.</p>
      <p>In the first three exercises below, the starter code has a mistake in it. Press <b>Run tests</b> first to see the error, read it, then fix the code.</p>`,
    example: `# Each of these lines would cause an error. Remove the # in front of one to see it.
# print("Age: " + 36)      # TypeError: text + number
# print([1, 2][5])         # IndexError: no position 5
# print(totl)              # NameError: totl was never created

print("Age: " + str(36))   # works: str turns 36 into the text "36"

answer = "ten"
try:
    n = int(answer)        # raises ValueError: "ten" isn't digits
except ValueError:
    n = 0
print(n)                   # 0
`,
    exercises: [
      { key: "fix-colon", prompt: "This function has a SyntaxError. Run it to see the message, then fix it so triple(n) returns n times 3.",
        example: "triple(4) returns 12",
        hint: "Every `def` line must end with a colon `:`.",
        starter: "def triple(n)\n    return n * 3\n",
        tests: `assert triple(4) == 12
assert triple(0) == 0`,
        solution: `def triple(n):
    return n * 3` },
      { key: "fix-name", prompt: "This function has a NameError. Fix it so total_cost(price, qty) returns price times qty.",
        example: "total_cost(3, 4) returns 12",
        hint: "Compare the names in the body with the parameter names in the brackets. One is misspelled.",
        starter: "def total_cost(price, qty):\n    return price * qtty\n",
        tests: `assert total_cost(3, 4) == 12
assert total_cost(5, 1) == 5`,
        solution: `def total_cost(price, qty):
    return price * qty` },
      { key: "fix-type", prompt: "This function has a TypeError. Fix it so label(n) returns the text Count: followed by the number.",
        example: `label(36) returns "Count: 36"`,
        hint: "You can't add text and a number. Turn the number into text with `str(n)`.",
        starter: "def label(n):\n    return \"Count: \" + n\n",
        tests: `assert label(36) == "Count: 36", f"got {label(36)!r}"
assert label(0) == "Count: 0"`,
        solution: `def label(n):
    return "Count: " + str(n)` },
      { key: "raise", prompt: "Write check_positive(n): if n is 0 or less, raise a ValueError; otherwise return n unchanged.",
        example: "check_positive(5) returns 5\ncheck_positive(0) raises ValueError\ncheck_positive(-2) raises ValueError",
        hint: "`if n <= 0:` then, indented, `raise ValueError(\"n must be positive\")`. After the if (not indented under it), `return n`.",
        starter: "def check_positive(n):\n    pass\n",
        tests: `assert check_positive(5) == 5, "a positive number comes back unchanged"
for bad in [0, -2]:
    try:
        check_positive(bad)
        raised = False
    except ValueError:
        raised = True
    assert raised, f"check_positive({bad}) should raise ValueError"`,
        solution: `def check_positive(n):
    if n <= 0:
        raise ValueError("n must be positive")
    return n` },
      { key: "safe-int", prompt: "Write safe_int(text) that turns text like \"42\" into the number 42 with int(text), but returns None instead of crashing when the text isn't a whole number.",
        example: `safe_int("42") returns 42\nsafe_int("ten") returns None`,
        hint: "Put `return int(text)` inside `try:`, and `return None` inside `except ValueError:`.",
        starter: "def safe_int(text):\n    pass\n",
        tests: `assert safe_int("42") == 42, "safe_int('42') should be the number 42"
assert safe_int("-7") == -7
assert safe_int("ten") is None, "text that isn't a number gives None"
assert safe_int("") is None`,
        solution: `def safe_int(text):
    try:
        return int(text)
    except ValueError:
        return None` },
    ],
  },

  // ---------------- AI from zero ----------------
  {
    id: "az-model", zero: "ai", title: "What a model is and what training means", yt: "what is an AI model and training explained simply",
    videos: [IBM("qYNweeDHiyU", "AI, Machine Learning, Deep Learning and Generative AI Explained")],
    body: `<p>"AI" covers many things, but almost all of today's AI is built from <b>models</b>. This lesson explains what a model is and what people mean when they say a model was "trained". No maths beyond multiplication.</p>
      <h3>A model turns an input into a prediction</h3>
      <p>A <b>model</b> is a function, like the ones you wrote in Python from zero: an input goes in and an output comes out. The output is a <b>prediction</b>, a best guess: a photo goes in and "cat" comes out; an email goes in and "spam" comes out; a sentence goes in and the most likely next word comes out.</p>
      <p>The difference from a normal function is <i>who decides how it behaves</i>. You don't write the rules by hand. Inside the model are numbers called <b>parameters</b> (also called <i>weights</i>), and the model's behaviour depends on them. Change the numbers and you change the predictions.</p>
      <h3>Training: finding good numbers from examples</h3>
      <p><b>Training</b> means finding parameter values that make good predictions. You need <b>training data</b>: examples where you already know the right answer. Then:</p>
      <ol><li>Let the model predict an answer for each example.</li>
      <li>Measure how wrong it was: the <b>error</b> (also called <i>loss</i>). A simple error is the distance between the prediction and the right answer, ignoring the sign. Python's <code>abs()</code> gives that: <code>abs(3 - 5)</code> is 2, and so is <code>abs(5 - 3)</code>.</li>
      <li>Adjust the parameters to make the total error smaller.</li>
      <li>Repeat until the error stops shrinking.</li></ol>
      <p>Once trained, the parameters are fixed and you use the model on new inputs it has never seen. That's called <b>inference</b>. When you chat with an AI assistant, you're doing inference; the training happened months earlier.</p>
      <h3>Worked example: a reading-time model</h3>
      <p>We want to predict how many minutes an article takes to read from its number of words. Our model has one parameter, <code>k</code>: <i>minutes = words &times; k</i>. Our training data is three articles we timed: 1000 words took 4 minutes, 2000 took 9, 500 took 2.</p>
      <ol><li>Try <code>k = 0.003</code>: predictions are 3, 6 and 1.5 minutes. Errors are 1, 3 and 0.5: total 4.5.</li>
      <li>Try <code>k = 0.004</code>: predictions 4, 8, 2. Errors 0, 1, 0: total 1.</li>
      <li>Try <code>k = 0.005</code>: predictions 5, 10, 2.5. Errors 1, 1, 0.5: total 2.5.</li>
      <li>The lowest total error is at <code>k = 0.004</code>, so that's our trained parameter. For a new 1500-word article the model predicts 6 minutes.</li></ol>
      <p>Real models work the same way at a vastly bigger scale: billions of parameters instead of one, billions of examples instead of three, and a clever method called <i>gradient descent</i> that works out which way to nudge every parameter instead of trying values one by one. The idea is identical: <b>adjust the numbers to reduce the error on examples</b>.</p>`,
    example: `# Training data: (words, minutes it actually took)
articles = [(1000, 4), (2000, 9), (500, 2)]

def guess_minutes(words, k):      # the model: one parameter, k
    return words * k

def how_wrong(k):                  # total error over all examples
    total = 0
    for words, minutes in articles:
        total = total + abs(guess_minutes(words, k) - minutes)
    return total

for k in [0.003, 0.004, 0.005]:    # "training" by trying values
    print("k =", k, "total error =", how_wrong(k))

print("1500 words takes about", guess_minutes(1500, 0.004), "minutes")   # inference
`,
    cards: [
      ["What is a model's parameter?", "A number inside the model that controls its predictions. Training finds good values for the parameters; big models have billions of them."],
      ["Training vs inference?", "Training adjusts the parameters using examples with known answers. Inference uses the finished model to predict answers for new inputs."],
    ],
    exercises: [
      { key: "predict", prompt: "A model predicts a restaurant tip from the bill: tip = bill × rate, where rate is the model's one parameter. Write predict_tip(bill, rate) that returns the predicted tip.",
        example: "predict_tip(50, 0.15) returns 7.5",
        hint: "Multiply the two inputs: `return bill * rate`.",
        starter: "def predict_tip(bill, rate):\n    pass\n",
        tests: `assert predict_tip(50, 0.15) == 7.5, f"predict_tip(50, 0.15) should be 7.5, got {predict_tip(50, 0.15)}"
assert predict_tip(100, 0.2) == 20
assert predict_tip(0, 0.18) == 0`,
        solution: `def predict_tip(bill, rate):
    return bill * rate` },
      { key: "error", prompt: "Write error(predicted, actual) that returns how far a prediction is from the right answer, always as a positive number (or 0 when it's exactly right).",
        example: "error(7, 10) returns 3\nerror(10, 7) returns 3\nerror(5, 5) returns 0",
        hint: "Subtract, then use `abs(...)` to drop the minus sign: `abs(predicted - actual)`.",
        starter: "def error(predicted, actual):\n    pass\n",
        tests: `assert error(7, 10) == 3, f"error(7, 10) should be 3, got {error(7, 10)}"
assert error(10, 7) == 3, "the error is never negative"
assert error(5, 5) == 0`,
        solution: `def error(predicted, actual):
    return abs(predicted - actual)` },
      { key: "total-error", prompt: "Write total_error(rate, examples). examples is a list of (bill, tip) pairs from real meals. For each pair, predict the tip as bill × rate and measure the error against the real tip; return the sum of all the errors.",
        example: "total_error(0.1, [(100, 15), (40, 4)]) returns 5.0\n(predictions 10 and 4; errors 5 and 0)",
        hint: "A running total. Loop with `for bill, tip in examples:` and add `abs(bill * rate - tip)` each time. (Each exercise runs on its own, so write the calculation here rather than calling your earlier functions.)",
        starter: "def total_error(rate, examples):\n    pass\n",
        tests: `assert abs(total_error(0.1, [(100, 15), (40, 4)]) - 5) < 1e-9, f"got {total_error(0.1, [(100, 15), (40, 4)])}"
assert abs(total_error(0.15, [(100, 15), (40, 6)])) < 1e-9, "a perfect rate has total error 0"
assert total_error(0.2, []) == 0, "no examples, no error"`,
        solution: `def total_error(rate, examples):
    total = 0
    for bill, tip in examples:
        total = total + abs(bill * rate - tip)
    return total` },
      { key: "train", prompt: "Now train the model. Write best_rate(rates, examples): try every rate in the list and return the one with the smallest total error on the examples. If two tie, return the one that comes first.",
        example: "best_rate([0.1, 0.15, 0.2], [(100, 15), (40, 6)]) returns 0.15",
        hint: "Keep the best rate so far and its error. For each rate, work out its total error (a loop inside the loop, as in the last exercise). If it's smaller than the best error so far, remember this rate. Start the best error at `None` and treat None as \"nothing yet\", or start it with the first rate's error.",
        starter: "def best_rate(rates, examples):\n    pass\n",
        tests: `data = [(100, 15), (40, 6), (60, 9)]
assert best_rate([0.1, 0.15, 0.2], data) == 0.15, f"0.15 fits these meals exactly; got {best_rate([0.1, 0.15, 0.2], data)}"
assert best_rate([0.25, 0.2], [(100, 21)]) == 0.2
assert best_rate([0.1, 0.3], [(10, 2)]) == 0.1, "a tie goes to the first rate"`,
        solution: `def best_rate(rates, examples):
    best = None
    best_error = None
    for rate in rates:
        total = 0
        for bill, tip in examples:
            total = total + abs(bill * rate - tip)
        if best_error is None or total < best_error:
            best = rate
            best_error = total
    return best` },
    ],
  },
  {
    id: "az-ml", zero: "ai", title: "Machine learning: learning patterns from examples", yt: "machine learning explained simply for beginners",
    videos: [IBM("9gGnTQTYNaE", "What is Machine Learning?")],
    body: `<p><b>Machine learning</b> (ML) is the craft of building models by letting them learn patterns from examples, instead of writing the rules yourself. You saw the core idea in the last lesson; this one adds the vocabulary and two classic ways to learn.</p>
      <h3>Rules vs learning</h3>
      <p>To flag spam by hand, you'd write rules: "if the email contains 'free money', it's spam". Spammers change their wording and your rules fall behind. With ML you collect thousands of emails already marked spam or not spam, and the model finds the patterns itself.</p>
      <h3>The vocabulary</h3>
      <ul><li><b>Features</b>: the inputs the model looks at, usually numbers. For a house: its size and number of bedrooms.</li>
      <li><b>Label</b>: the right answer for an example: the house's sale price, or "spam".</li>
      <li><b>Supervised learning</b>: learning from examples that have labels. Most of what you'll meet is this.</li>
      <li><b>Classification</b> predicts a category ("spam" or "not spam"). <b>Regression</b> predicts a number (a price).</li></ul>
      <h3>Way 1: nearest neighbour</h3>
      <p>The simplest learner just remembers the examples. To predict for a new input, find the example whose features are <b>closest</b> and copy its label. For one feature, "closest" is the smallest difference. For two features, picture each example as a point on a map, with one feature across and one up, and use the straight-line distance between points: for points (x1, y1) and (x2, y2) that's the square root of (x1 - x2)&sup2; + (y1 - y2)&sup2;. In Python, <code>**</code> raises to a power: <code>3 ** 2</code> is 9, and <code>9 ** 0.5</code> is the square root, 3.0.</p>
      <h3>Way 2: fitting a line</h3>
      <p>For regression with one feature, a model can be a straight line: <i>prediction = slope &times; x + intercept</i>. The slope says how much the prediction grows for each extra unit of x; the intercept is the prediction at x = 0. "Fitting" the line means choosing the slope and intercept with the smallest error on the examples. There's a standard recipe (the <i>least squares</i> line) that uses only averages, multiplying and dividing; the last exercise walks you through it.</p>
      <h3>Testing on examples the model hasn't seen</h3>
      <p>A model can score perfectly on its training examples just by memorizing them, and then fail on anything new. That's called <b>overfitting</b>. So before training, put some labelled examples aside as <b>test data</b>, train on the rest, and measure on the test data. To take part of a list, use <b>slicing</b>: <code>items[:3]</code> is the first three items, <code>items[3:]</code> is everything from position 3 on.</p>
      <h3>Worked example: guessing a price from the nearest house</h3>
      <ol><li>We know three houses: 50 m&sup2; sold for $400k, 80 m&sup2; for $600k, 120 m&sup2; for $850k.</li>
      <li>A new house is 75 m&sup2;. Its differences from the known sizes are 25, 5 and 45.</li>
      <li>The smallest difference is 5, the 80 m&sup2; house, so we guess $600k.</li></ol>`,
    example: `sizes = [50, 80, 120]          # feature: square metres
prices = [400, 600, 850]       # label: price in $1000s
new_size = 75

closest = 0                     # position of the closest house so far
for i in range(len(sizes)):
    gap = abs(sizes[i] - new_size)
    print("house", i, "is", gap, "m2 away")
    if gap < abs(sizes[closest] - new_size):
        closest = i
print("guess:", prices[closest])   # 600

print(3 ** 2, 9 ** 0.5)        # 9 3.0
print(sizes[:2], sizes[2:])    # [50, 80] [120]
`,
    cards: [
      ["Classification or regression: predicting tomorrow's temperature?", "Regression: the answer is a number. Predicting 'rain' or 'no rain' would be classification."],
      ["Why keep test data aside?", "To measure how the model does on examples it never saw in training. A model can memorize its training data (overfitting) and still fail on new inputs."],
    ],
    exercises: [
      { key: "distance", prompt: "Write distance(p, q) for two points given as (x, y) pairs. Return the straight-line distance: the square root of (x1 - x2)² + (y1 - y2)².",
        example: "distance((0, 0), (3, 4)) returns 5.0",
        hint: "Unpack the pairs first: `x1, y1 = p` and `x2, y2 = q`. Then `((x1 - x2) ** 2 + (y1 - y2) ** 2) ** 0.5`.",
        starter: "def distance(p, q):\n    pass\n",
        tests: `assert distance((0, 0), (3, 4)) == 5, f"distance((0, 0), (3, 4)) should be 5, got {distance((0, 0), (3, 4))}"
assert distance((1, 1), (1, 1)) == 0, "a point is 0 away from itself"
assert distance((2, 5), (-1, 1)) == 5`,
        solution: `def distance(p, q):
    x1, y1 = p
    x2, y2 = q
    return ((x1 - x2) ** 2 + (y1 - y2) ** 2) ** 0.5` },
      { key: "nearest", prompt: "Write nearest_label(point, examples). Each example is a pair: ((x, y), label). Return the label of the example closest to point. If two are equally close, use the first.",
        example: `examples = [((1, 1), "apple"), ((8, 9), "melon")]\nnearest_label((2, 1), examples) returns "apple"`,
        hint: "Loop with `for (x, y), label in examples:`. Work out the distance to point (the formula from the last exercise), and keep the label with the smallest distance so far. Only replace it when a distance is strictly smaller, so ties keep the first.",
        starter: "def nearest_label(point, examples):\n    pass\n",
        tests: `fruit = [((1, 1), "apple"), ((8, 9), "melon"), ((2, 3), "pear")]
assert nearest_label((2, 1), fruit) == "apple", f"got {nearest_label((2, 1), fruit)!r}"
assert nearest_label((7, 7), fruit) == "melon"
assert nearest_label((2, 4), fruit) == "pear"
assert nearest_label((0, 0), [((1, 0), "a"), ((0, 1), "b")]) == "a", "a tie goes to the first example"`,
        solution: `def nearest_label(point, examples):
    px, py = point
    best_label = None
    best_dist = None
    for (x, y), label in examples:
        d = ((x - px) ** 2 + (y - py) ** 2) ** 0.5
        if best_dist is None or d < best_dist:
            best_label = label
            best_dist = d
    return best_label` },
      { key: "split", prompt: "Write split_data(examples, n_test) that returns two lists, (train, test): test is the last n_test examples, train is everything before them. n_test can be 0.",
        example: "split_data([1, 2, 3, 4, 5], 2) returns ([1, 2, 3], [4, 5])\nsplit_data([1, 2, 3], 0) returns ([1, 2, 3], [])",
        hint: "Work out where the test part starts: `cut = len(examples) - n_test`. Then slice: `examples[:cut]` and `examples[cut:]`. Return both with `return train, test`. (Watch out: `examples[-0:]` is the whole list, which is why the cut position is safer.)",
        starter: "def split_data(examples, n_test):\n    pass\n",
        tests: `assert split_data([1, 2, 3, 4, 5], 2) == ([1, 2, 3], [4, 5]), f"got {split_data([1, 2, 3, 4, 5], 2)}"
assert split_data([1, 2, 3], 0) == ([1, 2, 3], []), "n_test = 0 keeps everything for training"
assert split_data(["a", "b"], 2) == ([], ["a", "b"])`,
        solution: `def split_data(examples, n_test):
    cut = len(examples) - n_test
    return examples[:cut], examples[cut:]` },
      { key: "fit-line", prompt: "Fit a line to points. Write fit_line(xs, ys) returning (slope, intercept). The recipe: mx and my are the averages of xs and ys. slope = (sum of (x - mx) × (y - my) over all points) / (sum of (x - mx)² over all points). intercept = my - slope × mx.",
        example: "fit_line([1, 2, 3], [3, 5, 7]) returns (2.0, 1.0)\n(the points lie exactly on y = 2x + 1)",
        hint: "Averages first: `mx = sum(xs) / len(xs)` (and the same for ys). Then loop `for i in range(len(xs)):` and keep two running totals, `top = top + (xs[i] - mx) * (ys[i] - my)` and `bottom = bottom + (xs[i] - mx) ** 2`. slope is top / bottom.",
        starter: "def fit_line(xs, ys):\n    pass\n",
        tests: `slope, intercept = fit_line([1, 2, 3], [3, 5, 7])
assert abs(slope - 2) < 1e-9 and abs(intercept - 1) < 1e-9, f"expected (2.0, 1.0), got {(slope, intercept)}"
slope, intercept = fit_line([0, 2, 4], [1, 2, 3])
assert abs(slope - 0.5) < 1e-9 and abs(intercept - 1) < 1e-9
slope, intercept = fit_line([1, 2, 3, 4], [2, 3, 5, 6])
assert abs(slope - 1.4) < 1e-9 and abs(intercept - 0.5) < 1e-9, "points not exactly on a line still get the best-fitting one"`,
        solution: `def fit_line(xs, ys):
    mx = sum(xs) / len(xs)
    my = sum(ys) / len(ys)
    top = 0
    bottom = 0
    for i in range(len(xs)):
        top = top + (xs[i] - mx) * (ys[i] - my)
        bottom = bottom + (xs[i] - mx) ** 2
    slope = top / bottom
    return slope, my - slope * mx` },
    ],
  },
  {
    id: "az-llm", zero: "ai", title: "What an LLM does: predicting the next token", yt: "how large language models work explained simply",
    videos: [V("LPZh9BOjkQs", "Large Language Models explained briefly", "3Blue1Brown"), IBM("5sLYAQS9sWQ", "How Large Language Models Work")],
    body: `<p>An <b>LLM</b> (large language model) is the kind of model behind chat assistants such as Claude and ChatGPT. It sounds magical, but its core job is simple to state: <b>given some text, predict what comes next</b>.</p>
      <h3>One piece at a time</h3>
      <p>An LLM reads and writes text in small pieces called <b>tokens</b>. A token is often a whole common word ("the", "cat") or part of a longer word; the next lesson, <button class="link-btn inline-link" data-trgo="ai|learn|az-tokens">Tokens and the context window</button>, covers them properly. For now, think "word".</p>
      <p>For the text so far, the model gives every possible next token a <b>probability</b>: a number from 0 (impossible) to 1 (certain), where all the options add up to 1. After "The cat sat on the", "mat" might get 0.4, "floor" 0.2, "sofa" 0.1, and so on.</p>
      <h3>Generating text is a loop</h3>
      <ol><li>Look at the text so far and get the probabilities for the next token.</li>
      <li>Pick one token.</li>
      <li>Add it to the end of the text.</li>
      <li>Repeat, until the model picks a special "stop" token or hits a length limit.</li></ol>
      <p>That's all generation is. A long answer is thousands of single-token predictions, each one looking at everything written before it, including its own earlier tokens.</p>
      <h3>How it picks</h3>
      <p>Always taking the most likely token is called <b>greedy</b> picking. It's predictable but can be dull and repetitive, so models usually <i>sample</i>: pick at random, but weighted by the probabilities, so "mat" is chosen 40% of the time. A setting called <b>temperature</b> controls how adventurous that picking is: low temperature sticks to the likeliest tokens, high temperature takes more chances. That's why the same question can get different answers each time. The maths is in a later lesson, <button class="link-btn inline-link" data-trgo="ai|learn|sampling">Sampling in depth</button>.</p>
      <h3>Where the probabilities come from</h3>
      <p>Training. The model is shown enormous amounts of text and, at every position, asked to predict the next token; its parameters are adjusted to reduce the error, exactly as in <button class="link-btn inline-link" data-trgo="ai|learn|az-model">What a model is</button>. Your exercises build a tiny version: it learns by <i>counting</i> which word follows which in a sentence. A real LLM is far cleverer about context, but it's the same game.</p>
      <h3>Why LLMs make things up</h3>
      <p>The model predicts <i>likely-sounding</i> text; nothing in the loop checks facts. When it doesn't know, it can produce a fluent, confident and wrong answer. This is called a <b>hallucination</b>, and much of AI engineering (later topics) is about reducing and catching it.</p>
      <h3>Worked example: one prediction step</h3>
      <p>The table below is a pretend model. For each word it lists the possible next words with their probabilities. To predict after "the", we look up <code>table["the"]</code> and take the word with the highest probability. Python's <code>max(options, key=options.get)</code> does that in one step: it compares the keys by their values. Your exercises write the full loop.</p>`,
    example: `# A pretend model: for each word, the next words it could predict and their probabilities
table = {
    "the": {"cat": 0.5, "dog": 0.3, "end": 0.2},
    "cat": {"sat": 0.7, "ran": 0.3},
    "sat": {"down": 0.9, "up": 0.1},
}
options = table["the"]
print("after 'the' the model predicts:", options)
print("probabilities add up to", sum(options.values()))

best = max(options, key=options.get)   # the word with the highest probability
print("greedy pick:", best)            # cat
`,
    cards: [
      ["In one sentence, what does an LLM do?", "It predicts the next token of text from everything before it, adds it, and repeats, which is how it writes a whole answer."],
      ["What is a hallucination?", "Fluent, confident output that's false or unsupported, because the model predicts likely text rather than checking facts."],
    ],
    exercises: [
      { key: "most-likely", prompt: "Write most_likely(options): options is a dictionary mapping each possible next word to its probability. Return the word with the highest probability (the greedy pick). If two tie, return the one that comes first in the dictionary.",
        example: `most_likely({"mat": 0.4, "floor": 0.2, "sofa": 0.1}) returns "mat"`,
        hint: "Loop `for word, p in options.items():` and keep the best word and best probability so far; replace them only when p is strictly bigger.",
        starter: "def most_likely(options):\n    pass\n",
        tests: `assert most_likely({"mat": 0.4, "floor": 0.2, "sofa": 0.1}) == "mat"
assert most_likely({"a": 0.1, "b": 0.6, "c": 0.3}) == "b"
assert most_likely({"x": 0.5, "y": 0.5}) == "x", "a tie goes to the first word"`,
        solution: `def most_likely(options):
    best = None
    best_p = -1
    for word, p in options.items():
        if p > best_p:
            best = word
            best_p = p
    return best` },
      { key: "probabilities", prompt: "Turn counts into probabilities. Write to_probabilities(counts): counts maps words to how many times they were seen. Return a new dictionary with each count divided by the total of all counts, so the values add up to 1.",
        example: `to_probabilities({"mat": 3, "floor": 1}) returns {"mat": 0.75, "floor": 0.25}`,
        hint: "First the total: `total = sum(counts.values())`. Then build a new dict in a loop: `probs[word] = count / total`.",
        starter: "def to_probabilities(counts):\n    pass\n",
        tests: `assert to_probabilities({"mat": 3, "floor": 1}) == {"mat": 0.75, "floor": 0.25}
p = to_probabilities({"a": 1, "b": 1, "c": 2})
assert p == {"a": 0.25, "b": 0.25, "c": 0.5}
assert abs(sum(p.values()) - 1) < 1e-9, "probabilities add up to 1"`,
        solution: `def to_probabilities(counts):
    total = sum(counts.values())
    probs = {}
    for word, count in counts.items():
        probs[word] = count / total
    return probs` },
      { key: "next-counts", prompt: "Train a tiny language model by counting. Write count_next(words): words is a list of words in order. Return a dictionary where each word maps to another dictionary counting the words that came straight after it.",
        example: `count_next(["the", "cat", "the", "dog", "the", "cat"]) returns\n{"the": {"cat": 2, "dog": 1}, "cat": {"the": 1}, "dog": {"the": 1}}`,
        hint: "Loop over positions with `for i in range(len(words) - 1):` so `words[i + 1]` always exists. Take `w = words[i]` and `nxt = words[i + 1]`. If w isn't a key yet, set `table[w] = {}`. Then count nxt inside `table[w]` with the counting pattern.",
        starter: "def count_next(words):\n    pass\n",
        tests: `assert count_next(["the", "cat", "the", "dog", "the", "cat"]) == {"the": {"cat": 2, "dog": 1}, "cat": {"the": 1}, "dog": {"the": 1}}
assert count_next(["hi"]) == {}, "one word has nothing after it"
assert count_next(["a", "a", "a"]) == {"a": {"a": 2}}`,
        solution: `def count_next(words):
    table = {}
    for i in range(len(words) - 1):
        w = words[i]
        nxt = words[i + 1]
        if w not in table:
            table[w] = {}
        table[w][nxt] = table[w].get(nxt, 0) + 1
    return table` },
      { key: "generate", prompt: "Write the generation loop. generate(table, start, n): table maps each word to a dictionary of next-word probabilities (or counts). Starting from start, pick the most likely next word n times, adding each to the list. Return the list of words, starting with start. Stop early if the current word isn't in the table.",
        example: `table = {"the": {"cat": 0.6, "dog": 0.4}, "cat": {"sat": 1.0}}\ngenerate(table, "the", 3) returns ["the", "cat", "sat"]\n(it stops after "sat": the table has nothing for it)`,
        hint: "Start with `words = [start]`. Loop `for i in range(n):`. Let `current = words[-1]`; if it's not in table, `break` (that ends the loop early). Otherwise pick the best next word from `table[current]` (as in exercise 1, or with `max(options, key=options.get)`) and append it.",
        starter: "def generate(table, start, n):\n    pass\n",
        tests: `table = {"the": {"cat": 0.6, "dog": 0.4}, "cat": {"sat": 1.0}}
assert generate(table, "the", 3) == ["the", "cat", "sat"], f"got {generate(table, 'the', 3)}"
assert generate(table, "the", 1) == ["the", "cat"], "n is how many words to add"
assert generate(table, "dog", 5) == ["dog"], "no entry for the start word: just the start"
loop = {"a": {"b": 1}, "b": {"a": 1}}
assert generate(loop, "a", 4) == ["a", "b", "a", "b", "a"]`,
        solution: `def generate(table, start, n):
    words = [start]
    for i in range(n):
        current = words[-1]
        if current not in table:
            break
        options = table[current]
        words.append(max(options, key=options.get))
    return words` },
    ],
  },
  {
    id: "az-tokens", zero: "ai", title: "Tokens and the context window", yt: "what are tokens in LLMs explained simply",
    videos: [IBM("-QVoIxEpFkM", "What is a Context Window? Unlocking LLM Secrets")],
    body: `<p>LLMs don't see letters or whole sentences. They see <b>tokens</b>, and almost everything practical about them (price, speed and how much text they can handle) is counted in tokens.</p>
      <h3>What a token is</h3>
      <p>A <b>tokenizer</b> is the part of the system that cuts text into tokens before the model sees it, and turns the model's output tokens back into text. Common words are usually one token ("the", "house"). Rare or long words are split into pieces ("tokenization" might be "token" + "ization"). Punctuation is usually its own token, and the space before a word is often part of that word's token.</p>
      <p>A handy rule of thumb for English: <b>one token is about 4 characters, or about three quarters of a word</b>. So 100 words is roughly 130 tokens. Code, numbers and many other languages use more tokens per word. Each model family has its own tokenizer, so exact counts differ; providers offer tools to count precisely.</p>
      <h3>Why tokens matter</h3>
      <ul><li><b>Cost:</b> you pay per token, for what you send in and what comes back.</li>
      <li><b>Speed:</b> the model writes one token at a time, so longer answers take longer.</li>
      <li><b>Limits:</b> the context window, below.</li>
      <li><b>Odd mistakes:</b> because models see tokens, not letters, a question like "how many r's are in strawberry?" is surprisingly hard for them.</li></ul>
      <h3>The context window</h3>
      <p>The <b>context window</b> is the maximum number of tokens a model can work with at once: <b>everything you send plus the answer it writes</b>. If a model has a 200,000-token window and you send 150,000 tokens, at most 50,000 are left for the reply. Send too much and the request is rejected.</p>
      <p>Anything outside the context window, the model simply doesn't know about. It has no memory between requests: a chat app makes the model "remember" the conversation by sending the earlier messages again each time. When a conversation gets too long, the app has to drop or shorten the oldest parts, which is why long chats can "forget" what was said at the start.</p>
      <h3>Worked example: estimating with the rules of thumb</h3>
      <ol><li>A paragraph has 60 words. By the "three quarters of a word" rule that's about 60 &times; 4 / 3 = 80 tokens.</li>
      <li>A small model has a 1,000-token window and we want up to 300 tokens of answer. That leaves 700 tokens for our input.</li>
      <li>So we can send about 8 such paragraphs (8 &times; 80 = 640), not 9 (720).</li></ol>`,
    example: `text = "The quick brown fox jumps over the lazy dog. It was not amused!"
words = text.split()
print(len(words), "words,", len(text), "characters")
estimate = len(words) * 4 / 3        # about 3/4 of a word per token
print("about", round(estimate), "tokens")

window = 1000                         # the model's context window
answer_room = 300                     # tokens we keep free for the reply
per_paragraph = 80
print("paragraphs that fit:", (window - answer_room) // per_paragraph)   # 8
`,
    cards: [
      ["Roughly how many tokens is 300 English words?", "About 400: a token is about three quarters of a word, or 4 characters."],
      ["What counts against the context window?", "Everything the model works with in one request: the system instructions, the conversation history, any documents, and the answer it writes."],
    ],
    exercises: [
      { key: "estimate", prompt: "Write rough_tokens(text) that estimates the number of tokens with the 4-characters rule: the number of characters divided by 4, rounded up to a whole number.",
        example: `rough_tokens("abcd") returns 1\nrough_tokens("abcde") returns 2\nrough_tokens("") returns 0`,
        hint: "Rounding up a division by 4 has a neat trick with `//` (which rounds down): add 3 first. `(len(text) + 3) // 4`.",
        starter: "def rough_tokens(text):\n    pass\n",
        tests: `assert rough_tokens("abcd") == 1
assert rough_tokens("abcde") == 2, "5 characters is more than one token's worth, so round up to 2"
assert rough_tokens("") == 0
assert rough_tokens("x" * 400) == 100`,
        solution: `def rough_tokens(text):
    return (len(text) + 3) // 4` },
      { key: "fits", prompt: "Write fits(input_tokens, max_output, window) that returns True if the input plus the space kept for the answer fits in the context window, and False otherwise.",
        example: "fits(700, 300, 1000) returns True\nfits(701, 300, 1000) returns False",
        hint: "Add the two and compare: `input_tokens + max_output <= window`. Exactly full still fits.",
        starter: "def fits(input_tokens, max_output, window):\n    pass\n",
        tests: `assert fits(700, 300, 1000) is True, "exactly full still fits"
assert fits(701, 300, 1000) is False
assert fits(10, 10, 200000) is True`,
        solution: `def fits(input_tokens, max_output, window):
    return input_tokens + max_output <= window` },
      { key: "split-tokens", prompt: "Write a toy tokenizer. split_tokens(text) returns a list where each word is a token and each punctuation mark (. , ! ?) is its own token. Spaces separate tokens but aren't tokens themselves.",
        example: `split_tokens("Hi, Bob!") returns ["Hi", ",", "Bob", "!"]`,
        hint: "Go through the text one character at a time with `for ch in text:`, building the current word in a variable that starts as `\"\"`. On a space or punctuation mark, if the current word isn't empty, append it and reset it; then, for punctuation, append the mark too. Otherwise add ch to the current word. After the loop, don't forget a last word.",
        starter: "def split_tokens(text):\n    pass\n",
        tests: `assert split_tokens("Hi, Bob!") == ["Hi", ",", "Bob", "!"], f"got {split_tokens('Hi, Bob!')}"
assert split_tokens("one two") == ["one", "two"], "the last word counts too"
assert split_tokens("Wait... what?") == ["Wait", ".", ".", ".", "what", "?"]
assert split_tokens("") == []`,
        solution: `def split_tokens(text):
    tokens = []
    word = ""
    for ch in text:
        if ch == " " or ch in ".,!?":
            if word != "":
                tokens.append(word)
                word = ""
            if ch != " ":
                tokens.append(ch)
        else:
            word = word + ch
    if word != "":
        tokens.append(word)
    return tokens` },
      { key: "keep-last", prompt: "When a conversation is too long, apps keep the most recent part. Write keep_last(tokens, window) that returns the last window tokens of the list (or the whole list if it's shorter). window can be 0.",
        example: `keep_last(["a", "b", "c", "d"], 2) returns ["c", "d"]\nkeep_last(["a"], 5) returns ["a"]\nkeep_last(["a", "b"], 0) returns []`,
        hint: "Slicing from a position keeps everything after it. The cut is at `len(tokens) - window`, but it can't go below 0: use `max(0, len(tokens) - window)`.",
        starter: "def keep_last(tokens, window):\n    pass\n",
        tests: `assert keep_last(["a", "b", "c", "d"], 2) == ["c", "d"]
assert keep_last(["a"], 5) == ["a"], "a short list is kept whole"
assert keep_last(["a", "b"], 0) == [], "a window of 0 keeps nothing"`,
        solution: `def keep_last(tokens, window):
    cut = max(0, len(tokens) - window)
    return tokens[cut:]` },
    ],
  },
  {
    id: "az-api", zero: "ai", title: "Calling a model: request in, response out", yt: "what is an API explained simply",
    videos: [IBM("lsMQRaeKNDk", "What is a REST API?")],
    body: `<p>Big models run on the provider's computers, not yours. Your program talks to them through an <b>API</b> (application programming interface): an agreed way for one program to ask another to do something, here over the internet. You send a <b>request</b>; you get back a <b>response</b>.</p>
      <h3>What a request looks like</h3>
      <p>Requests and responses travel as <b>JSON</b>, a text format for data that looks almost exactly like Python dictionaries and lists. A request to a chat model says:</p>
      <ul><li><b>model</b>: which model to use.</li>
      <li><b>max_tokens</b>: the most tokens the answer may use. It caps cost and length.</li>
      <li><b>messages</b>: the conversation so far, as a list. Each message has a <b>role</b> (<code>"user"</code> for you, <code>"assistant"</code> for the model) and its <b>content</b> (the text).</li></ul>
      <h3>What comes back</h3>
      <ul><li><b>content</b>: a list of blocks; the answer's text is in the first block's <code>"text"</code>.</li>
      <li><b>stop_reason</b>: why it stopped. <code>"end_turn"</code> means it finished; <code>"max_tokens"</code> means it hit your cap and the answer was <b>cut off</b>.</li>
      <li><b>usage</b>: how many tokens went in (<code>input_tokens</code>) and came out (<code>output_tokens</code>). That's what you're billed for.</li></ul>
      <h3>Cost, keys and waiting</h3>
      <p>Providers price models <b>per million tokens</b>, with output tokens costing more than input. For example, at $3 per million input tokens and $15 per million output tokens, a request with 2,000 tokens in and 500 out costs 2,000 &times; 3 / 1,000,000 + 500 &times; 15 / 1,000,000 = $0.0135. Small per call, but it adds up across thousands of calls, so set a spending limit in the provider's console.</p>
      <p>To use a real API you need an <b>API key</b>: a long secret string that works like a password for your account (and its bill). Keep it out of your code and out of git; the projects show how. <b>You don't need one for this course's lessons</b>: the exercises use a pretend model written in Python that answers from a lookup table.</p>
      <p>Each call also takes time: the <b>latency</b>, how long you wait for the answer. It grows with the length of the answer, since tokens are written one at a time.</p>
      <h3>Worked example</h3>
      <p>The example builds a request as a dictionary, sends it to <code>fake_model</code> (a stand-in for the real API that looks up canned answers), then reads the text, the stop reason and the token counts out of the response, and works out the cost. The real thing, in <button class="link-btn inline-link" data-trgo="ai|learn|apis">Calling LLM APIs</button>, has exactly this shape.</p>`,
    example: `def fake_model(request):          # stands in for the provider's API
    answers = {"What is RAG?": "Retrieval-augmented generation: look things up, then answer."}
    question = request["messages"][-1]["content"]
    text = answers.get(question, "I don't know.")
    return {
        "content": [{"type": "text", "text": text}],
        "stop_reason": "end_turn",
        "usage": {"input_tokens": len(question) // 4 + 1, "output_tokens": len(text) // 4 + 1},
    }

request = {
    "model": "tiny-model",
    "max_tokens": 200,
    "messages": [{"role": "user", "content": "What is RAG?"}],
}
response = fake_model(request)
print(response["content"][0]["text"])
print("stopped because:", response["stop_reason"])
usage = response["usage"]
cost = usage["input_tokens"] * 3 / 1_000_000 + usage["output_tokens"] * 15 / 1_000_000
print(usage, "cost: $" + str(round(cost, 6)))
`,
    cards: [
      ["A response's stop_reason is 'max_tokens'. What happened?", "The answer hit the max_tokens cap you set and was cut off. Raise the cap or ask for a shorter answer."],
      ["Why keep an API key out of your code?", "It's a password to your paid account. Code gets shared and pushed to git, and anyone with the key can run up your bill."],
    ],
    exercises: [
      { key: "request", prompt: "Write make_request(question, max_tokens=100) that returns a request dictionary with three keys: \"model\" set to \"tiny-model\", \"max_tokens\" set to max_tokens, and \"messages\" set to a list holding one message: a dictionary with \"role\" \"user\" and \"content\" the question.",
        example: `make_request("Hi") returns\n{"model": "tiny-model", "max_tokens": 100, "messages": [{"role": "user", "content": "Hi"}]}`,
        hint: "`max_tokens=100` in the brackets means the parameter is 100 unless the caller passes another value. Return one dictionary literal; the messages value is a list with one dict inside: `[{\"role\": \"user\", \"content\": question}]`.",
        starter: "def make_request(question, max_tokens=100):\n    pass\n",
        tests: `assert make_request("Hi") == {"model": "tiny-model", "max_tokens": 100, "messages": [{"role": "user", "content": "Hi"}]}, f"got {make_request('Hi')}"
assert make_request("Why?", 50)["max_tokens"] == 50
assert make_request("Why?")["messages"][0]["content"] == "Why?"`,
        solution: `def make_request(question, max_tokens=100):
    return {
        "model": "tiny-model",
        "max_tokens": max_tokens,
        "messages": [{"role": "user", "content": question}],
    }` },
      { key: "reply-text", prompt: "Write reply_text(response) that returns the answer's text from a response: the \"text\" of the first block in the \"content\" list.",
        example: `reply_text({"content": [{"type": "text", "text": "Hello!"}], "stop_reason": "end_turn"}) returns "Hello!"`,
        hint: "Go one step at a time: `response[\"content\"]` is a list, `[0]` takes its first block, and `[\"text\"]` takes the text from that block.",
        starter: "def reply_text(response):\n    pass\n",
        tests: `r = {"content": [{"type": "text", "text": "Hello!"}], "stop_reason": "end_turn", "usage": {"input_tokens": 3, "output_tokens": 2}}
assert reply_text(r) == "Hello!", f"got {reply_text(r)!r}"
assert reply_text({"content": [{"type": "text", "text": "42"}]}) == "42"`,
        solution: `def reply_text(response):
    return response["content"][0]["text"]` },
      { key: "cut-off", prompt: "Write was_cut_off(response) that returns True if the answer was cut off because it hit max_tokens, and False otherwise.",
        example: `was_cut_off({"stop_reason": "max_tokens"}) returns True\nwas_cut_off({"stop_reason": "end_turn"}) returns False`,
        hint: "Compare the stop reason with the text \"max_tokens\": `response[\"stop_reason\"] == \"max_tokens\"`.",
        starter: "def was_cut_off(response):\n    pass\n",
        tests: `assert was_cut_off({"stop_reason": "max_tokens"}) is True
assert was_cut_off({"stop_reason": "end_turn"}) is False`,
        solution: `def was_cut_off(response):
    return response["stop_reason"] == "max_tokens"` },
      { key: "budget", prompt: "Write calls_in_budget(budget, tokens_per_call, price_per_million) that returns how many whole calls you can afford: each call uses tokens_per_call tokens, priced at price_per_million dollars per million tokens, and budget is in dollars.",
        example: "calls_in_budget(10, 1500, 3) returns 2222\n(each call costs 1500 × 3 / 1,000,000 = $0.0045)",
        hint: "Cost of one call: `tokens_per_call * price_per_million / 1_000_000`. Then whole calls: `int(budget / cost)` (int drops the part after the decimal point).",
        starter: "def calls_in_budget(budget, tokens_per_call, price_per_million):\n    pass\n",
        tests: `assert calls_in_budget(10, 1500, 3) == 2222, f"got {calls_in_budget(10, 1500, 3)}"
assert calls_in_budget(1, 3000, 15) == 22
assert calls_in_budget(0, 1000, 3) == 0
assert type(calls_in_budget(10, 1500, 3)) is int, "return a whole number"`,
        solution: `def calls_in_budget(budget, tokens_per_call, price_per_million):
    cost = tokens_per_call * price_per_million / 1_000_000
    return int(budget / cost)` },
    ],
  },
];

extendTrack(AI, {
  topics: ZERO_TOPICS,
  groups: [
    ["Python from zero", ZERO_TOPICS.filter((t) => t.zero === "py").map((t) => t.id)],
    ["AI from zero", ZERO_TOPICS.filter((t) => t.zero === "ai").map((t) => t.id)],
    ...AI.groups,
  ],
  glossary: [
    ["API", "Application programming interface: an agreed way for one program to ask another to do something, often over the internet."],
    ["API key", "A secret string that identifies your account to a paid API, like a password. Keep it out of code and git."],
    ["CI (continuous integration)", "Checks such as tests and evals that run automatically on every code change, e.g. in GitHub Actions."],
    ["Class (Python)", "A bundle of data and the functions (methods) that work on it; LRUCache(2) creates an object from the LRUCache class."],
    ["Decorator (Python)", "A line starting with @ above a function that wraps it to add behaviour, such as turning it into a tool definition."],
    ["HTTP status code", "The number a web server returns with each response: 200 OK, 4xx a problem with the request (429 rate limited), 5xx a server problem."],
    ["Import / module (Python)", "import loads a module, a file of ready-made code such as json, math, re or an installed SDK."],
    ["JSON schema", "A description of the shape JSON data must have: which keys, what type each value is, which are required."],
    ["Context engineering", "Choosing what goes into the context window (instructions, history, documents, tool results) so the model has what it needs and nothing it doesn't."],
    ["Feature", "An input a machine-learning model looks at, such as a house's size."],
    ["Inference", "Using a trained model to make predictions on new inputs."],
    ["JSON", "A text format for data (objects, lists, strings, numbers) that looks like Python dicts and lists; how APIs send data."],
    ["Label", "The right answer attached to a training example."],
    ["Latency", "How long you wait for a response; for LLMs it grows with the length of the output."],
    ["Machine learning", "Building models that learn patterns from examples instead of following hand-written rules."],
    ["Model", "A function whose behaviour is set by learned numbers (parameters); it turns an input into a prediction."],
    ["Parameter (weight)", "A number inside a model that training adjusts; large language models have billions."],
    ["Probability", "A number from 0 (impossible) to 1 (certain); the probabilities of all options add up to 1."],
    ["Tokenizer", "The component that splits text into tokens for a model and turns output tokens back into text."],
    ["Training", "Adjusting a model's parameters to reduce its error on examples with known answers."],
  ],
});

// Short or older Learn addresses that clearly mean a lesson (#/ai/learn/python, #/ai/learn/softmax).
AI.aliases = {
  python: "pz-values", "python-from-zero": "pz-values", zero: "pz-values", start: "pz-values", "start-here": "pz-values", beginner: "pz-values",
  values: "pz-values", variables: "pz-values", functions: "pz-functions", lists: "pz-lists", loops: "pz-lists",
  dicts: "pz-dicts", dictionaries: "pz-dicts", errors: "pz-errors", "error-messages": "pz-errors",
  "ai-from-zero": "az-model", model: "az-model", training: "az-model", "next-token": "az-llm", tokens: "az-tokens", "context-window": "az-tokens", api: "az-api",
  ml: "mlbasics", "machine-learning": "mlbasics", llm: "foundations", llms: "foundations", "how-llms-work": "foundations",
  softmax: "sampling", temperature: "sampling", logits: "sampling", "llm-apis": "apis", prompts: "prompting", "prompt-engineering": "prompting",
  json: "structured", "structured-output": "structured", vectors: "embeddings", "vector-search": "vectorstores", "vector-db": "vectorstores", chunking: "vectorstores",
  "tool-use": "tools", "function-calling": "tools", agent: "agents", eval: "evals", testing: "evals", security: "safety", "prompt-injection": "safety",
  ops: "llmops", "fine-tuning": "customization", finetuning: "customization", cloud: "cloudai", images: "multimodal",
};
