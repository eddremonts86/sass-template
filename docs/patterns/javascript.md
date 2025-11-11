# JavaScript Patterns

Classic and modern JavaScript design patterns used in this template.

## Module Pattern

Encapsulate private and public members:

```javascript
const ThemeManager = (function() {
  // Private variables
  let currentTheme = 'light'

  // Private methods
  function applyTheme(theme) {
    document.documentElement.className = `theme-${theme}`
  }

  // Public API
  return {
    getTheme() {
      return currentTheme
    },

    setTheme(theme) {
      currentTheme = theme
      applyTheme(theme)
    },

    toggleTheme() {
      const newTheme = currentTheme === 'light' ? 'dark' : 'light'
      this.setTheme(newTheme)
    }
  }
})()

// Usage
ThemeManager.setTheme('dark')
console.log(ThemeManager.getTheme()) // 'dark'
```

## Singleton Pattern

Ensure only one instance exists:

```javascript
class ConfigManager {
  static instance = null

  constructor() {
    if (ConfigManager.instance) {
      return ConfigManager.instance
    }

    this.config = {}
    ConfigManager.instance = this
  }

  get(key) {
    return this.config[key]
  }

  set(key, value) {
    this.config[key] = value
  }

  getAll() {
    return { ...this.config }
  }
}

// Usage
const config1 = new ConfigManager()
const config2 = new ConfigManager()
console.log(config1 === config2) // true
```

## Observer Pattern

Event-driven architecture:

```javascript
class EventEmitter {
  constructor() {
    this.events = {}
  }

  on(event, callback) {
    if (!this.events[event]) {
      this.events[event] = []
    }
    this.events[event].push(callback)

    // Return unsubscribe function
    return () => {
      this.events[event] = this.events[event].filter(cb => cb !== callback)
    }
  }

  emit(event, data) {
    if (this.events[event]) {
      this.events[event].forEach(callback => callback(data))
    }
  }

  once(event, callback) {
    const unsubscribe = this.on(event, (data) => {
      callback(data)
      unsubscribe()
    })
  }
}

// Usage
const emitter = new EventEmitter()

const unsubscribe = emitter.on('userLoggedIn', (user) => {
  console.log('User logged in:', user.name)
})

emitter.emit('userLoggedIn', { name: 'John' })
unsubscribe()
```

## Factory Pattern

Create objects based on conditions:

```javascript
class ComponentFactory {
  static create(type, props = {}) {
    const components = {
      button: () => new Button(props),
      input: () => new Input(props),
      card: () => new Card(props),
      modal: () => new Modal(props)
    }

    const creator = components[type]
    if (!creator) {
      throw new Error(`Unknown component type: ${type}`)
    }

    return creator()
  }
}

// Usage
const button = ComponentFactory.create('button', {
  text: 'Click me',
  variant: 'primary'
})
```

## Strategy Pattern

Encapsulate algorithms:

```javascript
const sortingStrategies = {
  alphabetical: (a, b) => a.name.localeCompare(b.name),
  byDate: (a, b) => new Date(a.createdAt) - new Date(b.createdAt),
  byPopularity: (a, b) => b.views - a.views
}

class ItemSorter {
  constructor(strategy = 'alphabetical') {
    this.strategy = strategy
  }

  setStrategy(strategy) {
    this.strategy = strategy
  }

  sort(items) {
    const sortFn = sortingStrategies[this.strategy]
    if (!sortFn) {
      throw new Error(`Unknown sorting strategy: ${this.strategy}`)
    }
    return [...items].sort(sortFn)
  }
}

// Usage
const sorter = new ItemSorter('alphabetical')
const sortedItems = sorter.sort(items)

sorter.setStrategy('byDate')
const dateSort = sorter.sort(items)
```

## Decorator Pattern

Add functionality dynamically:

```javascript
function withLogging(fn) {
  return function(...args) {
    console.log(`Calling ${fn.name} with`, args)
    const result = fn.apply(this, args)
    console.log(`Result:`, result)
    return result
  }
}

function withCache(fn) {
  const cache = new Map()

  return function(...args) {
    const key = JSON.stringify(args)

    if (cache.has(key)) {
      return cache.get(key)
    }

    const result = fn.apply(this, args)
    cache.set(key, result)
    return result
  }
}

// Usage
const add = (a, b) => a + b
const addWithLogging = withLogging(add)
const addWithCache = withCache(addWithLogging)

addWithCache(2, 3) // Logs and caches
addWithCache(2, 3) // Returns from cache
```

## Command Pattern

Encapsulate actions:

```javascript
class Command {
  constructor(execute, undo) {
    this.execute = execute
    this.undo = undo
  }
}

class CommandManager {
  constructor() {
    this.history = []
    this.currentIndex = -1
  }

  execute(command) {
    // Remove any commands after current index
    this.history = this.history.slice(0, this.currentIndex + 1)

    command.execute()
    this.history.push(command)
    this.currentIndex++
  }

  undo() {
    if (this.currentIndex >= 0) {
      const command = this.history[this.currentIndex]
      command.undo()
      this.currentIndex--
    }
  }

  redo() {
    if (this.currentIndex < this.history.length - 1) {
      this.currentIndex++
      const command = this.history[this.currentIndex]
      command.execute()
    }
  }
}

// Usage
const manager = new CommandManager()

const addTextCommand = new Command(
  () => editor.addText('Hello'),
  () => editor.removeText('Hello')
)

manager.execute(addTextCommand)
manager.undo()
manager.redo()
```

## Promise Pattern

Handle asynchronous operations:

```javascript
class AsyncOperationManager {
  constructor() {
    this.operations = new Map()
  }

  async execute(id, operation) {
    // Prevent duplicate operations
    if (this.operations.has(id)) {
      return this.operations.get(id)
    }

    const promise = operation()
      .finally(() => {
        this.operations.delete(id)
      })

    this.operations.set(id, promise)
    return promise
  }

  async executeWithRetry(operation, maxRetries = 3) {
    for (let i = 0; i < maxRetries; i++) {
      try {
        return await operation()
      } catch (error) {
        if (i === maxRetries - 1) throw error
        await this.delay(1000 * Math.pow(2, i)) // Exponential backoff
      }
    }
  }

  delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms))
  }
}

// Usage
const asyncManager = new AsyncOperationManager()

asyncManager.execute('fetchUser', () => fetch('/api/user'))
asyncManager.executeWithRetry(() => fetch('/api/data'))
```

## Best Practices

1. **Use const/let** instead of var
2. **Prefer arrow functions** for callbacks
3. **Use destructuring** for cleaner code
4. **Leverage async/await** for promises
5. **Use template literals** for strings
6. **Implement error handling** properly
7. **Follow naming conventions** consistently
8. **Write pure functions** when possible

## Anti-Patterns to Avoid

❌ **Global variables**
```javascript
// ❌ Bad
let globalCounter = 0

// ✅ Good
const CounterModule = (function() {
  let counter = 0
  return {
    increment: () => ++counter,
    getCount: () => counter
  }
})()
```

❌ **Callback hell**
```javascript
// ❌ Bad
getData(function(a) {
  getMoreData(a, function(b) {
    getMoreData(b, function(c) {
      // Deep nesting
    })
  })
})

// ✅ Good
const a = await getData()
const b = await getMoreData(a)
const c = await getMoreData(b)
```

❌ **Mutating shared state**
```javascript
// ❌ Bad
function addItem(array, item) {
  array.push(item)
  return array
}

// ✅ Good
function addItem(array, item) {
  return [...array, item]
}
```
