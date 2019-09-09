# devillist

script for automating job application on Angelist

# Recaps

- Mutation Observer is an web api that tracks DOM mutations
- Mutations can happen direct children, all the descendents, attributes, character changes
- Element attribute isContentEditable evalutes to true when element is focused
- When client tries to dispatch synthetic event, event's isTrusted property evalutes to false.
- This prevents client trigged events take place for security reasons
- getElementBy\* selectors always returns up-to-date node.
- querySelector* returns node in the same state when querySelector* first referenced it. Therefore, there is no guarantee that it will return up-to-date node.
- event can be handled in two phases : captring and bubbling
- This is event capturing. Let's say a button was clicked. Browser traverses from top(html) to target element and invokes onclick handlers it sees in elements it passes by before lastly invoking target event hanlder (click - onclick)
- Event bubbling is event capturing starting from the target to top element(html).
- Most of modern browsers by default handles events in bubbling phase
