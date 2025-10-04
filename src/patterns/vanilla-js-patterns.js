/**
 * 🚀 Vanilla JavaScript Design Patterns
 *
 * Este archivo contiene implementaciones de patrones de diseño clásicos
 * en JavaScript vanilla, utilizados como base en Template Trae.
 */

// ============================================================================
// 1. SINGLETON PATTERN
// ============================================================================

/**
 * Singleton Pattern - Una sola instancia global
 */
class ConfigManager {
  constructor() {
    if (ConfigManager.instance) {
      return ConfigManager.instance;
    }

    this.config = {
      apiUrl: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000',
      theme: 'light',
      locale: 'en',
    };

    ConfigManager.instance = this;
    return this;
  }

  get(key) {
    return this.config[key];
  }

  set(key, value) {
    this.config[key] = value;
    this.notifyObservers(key, value);
  }

  // Observer pattern integration
  observers = [];

  subscribe(callback) {
    this.observers.push(callback);
  }

  unsubscribe(callback) {
    this.observers = this.observers.filter(obs => obs !== callback);
  }

  notifyObservers(key, value) {
    this.observers.forEach(callback => callback(key, value));
  }
}

// Uso del Singleton
const config = new ConfigManager();
const config2 = new ConfigManager();
console.log(config === config2); // true - misma instancia

// ============================================================================
// 2. OBSERVER PATTERN
// ============================================================================

/**
 * Observer Pattern - Notificación de cambios
 */
class EventEmitter {
  constructor() {
    this.events = {};
  }

  on(event, callback) {
    if (!this.events[event]) {
      this.events[event] = [];
    }
    this.events[event].push(callback);
  }

  off(event, callback) {
    if (!this.events[event]) return;
    this.events[event] = this.events[event].filter(cb => cb !== callback);
  }

  emit(event, data) {
    if (!this.events[event]) return;
    this.events[event].forEach(callback => callback(data));
  }

  once(event, callback) {
    const onceCallback = data => {
      callback(data);
      this.off(event, onceCallback);
    };
    this.on(event, onceCallback);
  }
}

// Ejemplo de uso
const eventBus = new EventEmitter();

eventBus.on('user-login', user => {
  console.log(`Usuario ${user.name} ha iniciado sesión`);
});

eventBus.on('theme-change', theme => {
  document.body.className = `theme-${theme}`;
});

// ============================================================================
// 3. FACTORY PATTERN
// ============================================================================

/**
 * Factory Pattern - Crear objetos basados en tipo
 */
class ComponentFactory {
  static createComponent(type, props = {}) {
    const components = {
      button: () => new Button(props),
      input: () => new Input(props),
      modal: () => new Modal(props),
      card: () => new Card(props),
    };

    const creator = components[type];
    if (!creator) {
      throw new Error(`Component type "${type}" not found`);
    }

    return creator();
  }
}

class Button {
  constructor({ text = 'Click me', variant = 'primary', onClick = () => {} }) {
    this.text = text;
    this.variant = variant;
    this.onClick = onClick;
  }

  render() {
    const button = document.createElement('button');
    button.textContent = this.text;
    button.className = `btn btn-${this.variant}`;
    button.addEventListener('click', this.onClick);
    return button;
  }
}

class Input {
  constructor({ placeholder = '', type = 'text', value = '' }) {
    this.placeholder = placeholder;
    this.type = type;
    this.value = value;
  }

  render() {
    const input = document.createElement('input');
    input.type = this.type;
    input.placeholder = this.placeholder;
    input.value = this.value;
    input.className = 'form-input';
    return input;
  }
}

class Modal {
  constructor({ title = '', content = '', closable = true }) {
    this.title = title;
    this.content = content;
    this.closable = closable;
  }

  render() {
    const modal = document.createElement('div');
    modal.className = 'modal';
    modal.innerHTML = `
      <div class="modal-content">
        <div class="modal-header">
          <h3>${this.title}</h3>
          ${this.closable ? '<button class="modal-close">&times;</button>' : ''}
        </div>
        <div class="modal-body">${this.content}</div>
      </div>
    `;

    if (this.closable) {
      modal.querySelector('.modal-close').addEventListener('click', () => {
        modal.remove();
      });
    }

    return modal;
  }
}

class Card {
  constructor({ title = '', content = '', variant = 'default' }) {
    this.title = title;
    this.content = content;
    this.variant = variant;
  }

  render() {
    const card = document.createElement('div');
    card.className = `card card-${this.variant}`;
    card.innerHTML = `
      <div class="card-header">
        <h4>${this.title}</h4>
      </div>
      <div class="card-content">${this.content}</div>
    `;
    return card;
  }
}

// ============================================================================
// 4. MODULE PATTERN
// ============================================================================

/**
 * Module Pattern - Encapsulación y namespace
 */
const ThemeManager = (function () {
  // Variables privadas
  let currentTheme = 'light';
  const themes = ['light', 'dark', 'auto'];

  // Métodos privados
  function applyTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
  }

  function getSystemTheme() {
    return window.matchMedia('(prefers-color-scheme: dark)').matches
      ? 'dark'
      : 'light';
  }

  // API pública
  return {
    init() {
      const savedTheme = localStorage.getItem('theme') || 'auto';
      this.setTheme(savedTheme);

      // Escuchar cambios del sistema
      window
        .matchMedia('(prefers-color-scheme: dark)')
        .addEventListener('change', () => {
          if (currentTheme === 'auto') {
            applyTheme(getSystemTheme());
          }
        });
    },

    setTheme(theme) {
      if (!themes.includes(theme)) {
        console.warn(`Theme "${theme}" not supported`);
        return;
      }

      currentTheme = theme;
      const actualTheme = theme === 'auto' ? getSystemTheme() : theme;
      applyTheme(actualTheme);

      // Notificar cambio
      eventBus.emit('theme-change', actualTheme);
    },

    getTheme() {
      return currentTheme;
    },

    getAvailableThemes() {
      return [...themes];
    },

    toggle() {
      const nextTheme = currentTheme === 'light' ? 'dark' : 'light';
      this.setTheme(nextTheme);
    },
  };
})();

// ============================================================================
// 5. STRATEGY PATTERN
// ============================================================================

/**
 * Strategy Pattern - Diferentes algoritmos intercambiables
 */
class ValidationStrategy {
  validate() {
    throw new Error('validate method must be implemented');
  }
}

class EmailValidation extends ValidationStrategy {
  validate(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return {
      isValid: emailRegex.test(email),
      message: emailRegex.test(email) ? '' : 'Email format is invalid',
    };
  }
}

class PasswordValidation extends ValidationStrategy {
  constructor(minLength = 8) {
    super();
    this.minLength = minLength;
  }

  validate(password) {
    const hasMinLength = password.length >= this.minLength;
    const hasUpperCase = /[A-Z]/.test(password);
    const hasLowerCase = /[a-z]/.test(password);
    const hasNumbers = /\d/.test(password);
    const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);

    const isValid =
      hasMinLength &&
      hasUpperCase &&
      hasLowerCase &&
      hasNumbers &&
      hasSpecialChar;

    let message = '';
    if (!isValid) {
      const requirements = [];
      if (!hasMinLength)
        requirements.push(`at least ${this.minLength} characters`);
      if (!hasUpperCase) requirements.push('uppercase letter');
      if (!hasLowerCase) requirements.push('lowercase letter');
      if (!hasNumbers) requirements.push('number');
      if (!hasSpecialChar) requirements.push('special character');

      message = `Password must contain: ${requirements.join(', ')}`;
    }

    return { isValid, message };
  }
}

class RequiredValidation extends ValidationStrategy {
  validate(value) {
    const isValid =
      value !== null && value !== undefined && value.toString().trim() !== '';
    return {
      isValid,
      message: isValid ? '' : 'This field is required',
    };
  }
}

class FormValidator {
  constructor() {
    this.strategies = {};
  }

  addStrategy(field, strategy) {
    if (!this.strategies[field]) {
      this.strategies[field] = [];
    }
    this.strategies[field].push(strategy);
  }

  validate(formData) {
    const errors = {};

    for (const [field, strategies] of Object.entries(this.strategies)) {
      const value = formData[field];

      for (const strategy of strategies) {
        const result = strategy.validate(value);
        if (!result.isValid) {
          if (!errors[field]) errors[field] = [];
          errors[field].push(result.message);
          break; // Stop at first error for this field
        }
      }
    }

    return {
      isValid: Object.keys(errors).length === 0,
      errors,
    };
  }
}

// ============================================================================
// 6. COMMAND PATTERN
// ============================================================================

/**
 * Command Pattern - Encapsular acciones como objetos
 */
class Command {
  execute() {
    throw new Error('execute method must be implemented');
  }

  undo() {
    throw new Error('undo method must be implemented');
  }
}

class AddTextCommand extends Command {
  constructor(editor, text) {
    super();
    this.editor = editor;
    this.text = text;
    this.previousText = '';
  }

  execute() {
    this.previousText = this.editor.getText();
    this.editor.addText(this.text);
  }

  undo() {
    this.editor.setText(this.previousText);
  }
}

class DeleteTextCommand extends Command {
  constructor(editor, startIndex, endIndex) {
    super();
    this.editor = editor;
    this.startIndex = startIndex;
    this.endIndex = endIndex;
    this.deletedText = '';
  }

  execute() {
    const text = this.editor.getText();
    this.deletedText = text.substring(this.startIndex, this.endIndex);
    const newText =
      text.substring(0, this.startIndex) + text.substring(this.endIndex);
    this.editor.setText(newText);
  }

  undo() {
    const text = this.editor.getText();
    const newText =
      text.substring(0, this.startIndex) +
      this.deletedText +
      text.substring(this.startIndex);
    this.editor.setText(newText);
  }
}

class TextEditor {
  constructor() {
    this.content = '';
    this.history = [];
    this.currentPosition = -1;
  }

  executeCommand(command) {
    // Remove any commands after current position (for redo functionality)
    this.history = this.history.slice(0, this.currentPosition + 1);

    command.execute();
    this.history.push(command);
    this.currentPosition++;
  }

  undo() {
    if (this.currentPosition >= 0) {
      const command = this.history[this.currentPosition];
      command.undo();
      this.currentPosition--;
    }
  }

  redo() {
    if (this.currentPosition < this.history.length - 1) {
      this.currentPosition++;
      const command = this.history[this.currentPosition];
      command.execute();
    }
  }

  getText() {
    return this.content;
  }

  setText(text) {
    this.content = text;
  }

  addText(text) {
    this.content += text;
  }
}

// ============================================================================
// 7. DECORATOR PATTERN
// ============================================================================

/**
 * Decorator Pattern - Agregar funcionalidad dinámicamente
 */
class BaseComponent {
  render() {
    return '<div>Base Component</div>';
  }
}

class ComponentDecorator {
  constructor(component) {
    this.component = component;
  }

  render() {
    return this.component.render();
  }
}

class BorderDecorator extends ComponentDecorator {
  render() {
    const content = super.render();
    return `<div style="border: 1px solid #ccc;">${content}</div>`;
  }
}

class ShadowDecorator extends ComponentDecorator {
  render() {
    const content = super.render();
    return `<div style="box-shadow: 0 2px 4px rgba(0,0,0,0.1);">${content}</div>`;
  }
}

class PaddingDecorator extends ComponentDecorator {
  constructor(component, padding = '16px') {
    super(component);
    this.padding = padding;
  }

  render() {
    const content = super.render();
    return `<div style="padding: ${this.padding};">${content}</div>`;
  }
}

// ============================================================================
// 8. EJEMPLOS DE USO
// ============================================================================

// Ejemplos de uso
ThemeManager.init();

// Crear componentes usando el factory
console.log(
  'Button component:',
  ComponentFactory.createComponent('button', {
    text: 'Save',
    variant: 'primary',
    onClick: () => console.log('Button clicked!'),
  })
);

console.log(
  'Modal component:',
  ComponentFactory.createComponent('modal', {
    title: 'Confirmation',
    content: 'Are you sure you want to delete this item?',
    closable: true,
  })
);

// Strategy Pattern - Validación de formulario
const validator = new FormValidator();
validator.addStrategy('email', new RequiredValidation());
validator.addStrategy('email', new EmailValidation());
validator.addStrategy('password', new RequiredValidation());
validator.addStrategy('password', new PasswordValidation(8));

const formData = {
  email: 'user@example.com',
  password: 'MyPassword123!',
};

const validationResult = validator.validate(formData);
console.log('Validation result:', validationResult);

// Command Pattern - Editor con undo/redo
const editor = new TextEditor();
const addCommand = new AddTextCommand(editor, 'Hello World!');
const deleteCommand = new DeleteTextCommand(editor, 0, 5);

editor.executeCommand(addCommand);
console.log('After add:', editor.getText()); // "Hello World!"

editor.executeCommand(deleteCommand);
console.log('After delete:', editor.getText()); // " World!"

editor.undo();
console.log('After undo:', editor.getText()); // "Hello World!"

editor.redo();
console.log('After redo:', editor.getText()); // " World!"

// Decorator Pattern
let component = new BaseComponent();
component = new BorderDecorator(component);
component = new ShadowDecorator(component);
component = new PaddingDecorator(component, '20px');

console.log('Decorated component:', component.render());

// Observer Pattern
eventBus.on('data-updated', data => {
  console.log('Data updated:', data);
});

eventBus.emit('data-updated', { id: 1, name: 'Updated Item' });

// Export para uso en otros módulos
if (typeof module !== 'undefined' && module.exports) {
  module.exports = {
    ConfigManager,
    EventEmitter,
    ComponentFactory,
    ThemeManager,
    FormValidator,
    EmailValidation,
    PasswordValidation,
    RequiredValidation,
    TextEditor,
    AddTextCommand,
    DeleteTextCommand,
    BaseComponent,
    BorderDecorator,
    ShadowDecorator,
    PaddingDecorator,
  };
}
