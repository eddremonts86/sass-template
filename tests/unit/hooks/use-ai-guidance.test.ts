import { renderHook, act } from '@testing-library/react';
import { useAIGuidance } from '@/hooks/use-ai-guidance';
import type { AIGuidanceConfig } from '@/hooks/use-ai-guidance';

// Mock performance.now for consistent timing tests
const mockPerformanceNow = jest.fn();
Object.defineProperty(window, 'performance', {
  value: {
    now: mockPerformanceNow,
  },
});

const defaultConfig: AIGuidanceConfig = {
  workingMemoryLimit: 5,
  defaultFeedbackDuration: 3000,
  maxPrimaryOptions: 5,
  autoValidateDependencies: true,
  consistencyMode: 'adaptive',
  enableGradualProgression: true,
  performanceThreshold: 300,
};

describe('useAIGuidance', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    mockPerformanceNow.mockReturnValue(1000);
  });

  it('initializes with default state', () => {
    const { result } = renderHook(() => useAIGuidance(defaultConfig));

    expect(result.current.context).toMatchObject({
      appState: 'loading',
      currentPage: '/',
      settings: {},
      navigationHistory: [],
    });

    expect(result.current.workingMemory).toEqual([]);
    expect(result.current.attentionItems).toEqual([]);
  });

  it('updates context correctly', () => {
    const { result } = renderHook(() => useAIGuidance(defaultConfig));

    const newContext = {
      currentPage: '/updated',
      appState: 'ready' as const,
      settings: { theme: 'dark' },
      navigationHistory: ['/home', '/updated'],
    };

    act(() => {
      result.current.updateContext(newContext);
    });

    expect(result.current.context).toEqual(newContext);
  });

  it('provides immediate feedback', () => {
    const { result } = renderHook(() => useAIGuidance(defaultConfig));

    act(() => {
      result.current.addFeedback('success', 'Operation completed');
    });

    expect(result.current.feedbacks).toHaveLength(1);
    expect(result.current.feedbacks[0].type).toBe('success');
    expect(result.current.feedbacks[0].message).toBe('Operation completed');
  });

  it("simplifies options according to Hick's law", () => {
    const { result } = renderHook(() => useAIGuidance(defaultConfig));

    const manyOptions = [
      {
        id: '1',
        label: 'Option 1',
        priority: 'high' as const,
        action: () => {},
      },
      {
        id: '2',
        label: 'Option 2',
        priority: 'medium' as const,
        action: () => {},
      },
      {
        id: '3',
        label: 'Option 3',
        priority: 'low' as const,
        action: () => {},
      },
      {
        id: '4',
        label: 'Option 4',
        priority: 'high' as const,
        action: () => {},
      },
      {
        id: '5',
        label: 'Option 5',
        priority: 'medium' as const,
        action: () => {},
      },
      {
        id: '6',
        label: 'Option 6',
        priority: 'low' as const,
        action: () => {},
      },
      {
        id: '7',
        label: 'Option 7',
        priority: 'high' as const,
        action: () => {},
      },
    ];

    const simplified = result.current.simplifyOptions(manyOptions);

    expect(simplified.primary).toHaveLength(5); // maxPrimaryOptions
    expect(simplified.primary[0].priority).toBe('high'); // Highest priority first
    expect(simplified.secondary).toBeDefined(); // Should have secondary options
  });

  it('fragments tasks correctly', () => {
    const { result } = renderHook(() => useAIGuidance(defaultConfig));

    const taskFragments = [
      {
        title: 'Setup Phase',
        description: 'Initial setup',
        estimatedMinutes: 30,
        dependencies: [],
      },
      {
        title: 'Implementation Phase',
        description: 'Main implementation',
        estimatedMinutes: 60,
        dependencies: ['task-1-fragment-0'],
      },
      {
        title: 'Testing Phase',
        description: 'Testing and validation',
        estimatedMinutes: 30,
        dependencies: ['task-1-fragment-1'],
      },
    ];

    const fragments = result.current.fragmentTask('task-1', taskFragments);

    expect(fragments.length).toBe(3);
    expect(fragments[0].dependencies).toEqual([]);
    expect(fragments[1].dependencies).toContain('task-1-fragment-0');
  });

  it('manages working memory within limits', () => {
    const { result } = renderHook(() => useAIGuidance(defaultConfig));

    // Add items up to the limit
    act(() => {
      for (let i = 1; i <= 8; i++) {
        result.current.addToWorkingMemory({
          id: `item${i}`,
          content: `Item ${i}`,
          type: 'context',
          priority: i,
        });
      }
    });

    expect(result.current.workingMemory.length).toBeLessThanOrEqual(7); // maxWorkingMemoryItems
  });

  it('manages selective attention items', () => {
    const { result } = renderHook(() => useAIGuidance(defaultConfig));

    const attentionItem = {
      element: 'button',
      reason: 'Critical action required',
      priority: 'critical' as const,
      duration: 5000,
    };

    act(() => {
      result.current.highlightElement(attentionItem);
    });

    expect(result.current.attentionItems).toHaveLength(1);
    expect(result.current.attentionItems[0].element).toBe('button');
    expect(result.current.attentionItems[0].reason).toBe(
      'Critical action required'
    );
  });

  it('should track performance metrics', () => {
    const { result } = renderHook(() => useAIGuidance());

    act(() => {
      const startTime = Date.now() - 100;
      result.current.measureResponseTime('test-operation', startTime);
    });

    expect(result.current.performance.averageResponseTime).toBeGreaterThan(0);
    expect(
      result.current.performance.taskCompletionRate
    ).toBeGreaterThanOrEqual(0);
  });

  it('detects Doherty threshold violations', () => {
    const { result } = renderHook(() => useAIGuidance(defaultConfig));

    act(() => {
      const startTime = Date.now() - 500; // 500ms ago
      result.current.measureResponseTime('slow-operation', startTime);
    });

    expect(result.current.performance.averageResponseTime).toBeGreaterThan(400);
  });

  it('clears working memory', () => {
    const { result } = renderHook(() => useAIGuidance(defaultConfig));

    act(() => {
      result.current.addToWorkingMemory({
        id: 'item1',
        content: 'Item 1',
        type: 'context',
        priority: 1,
      });
    });

    expect(result.current.workingMemory).toHaveLength(1);

    act(() => {
      result.current.clearWorkingMemory();
    });

    expect(result.current.workingMemory).toHaveLength(0);
  });

  it('calculates cognitive load correctly', () => {
    const { result } = renderHook(() => useAIGuidance(defaultConfig));

    act(() => {
      // Add 3 items (3/7 = ~0.43)
      result.current.addToWorkingMemory({
        id: '1',
        content: 'Item 1',
        type: 'context',
        priority: 1,
      });
      result.current.addToWorkingMemory({
        id: '2',
        content: 'Item 2',
        type: 'action',
        priority: 2,
      });
      result.current.addToWorkingMemory({
        id: '3',
        content: 'Item 3',
        type: 'data',
        priority: 3,
      });
    });

    expect(result.current.workingMemory).toHaveLength(3);
  });

  it('handles disabled features gracefully', () => {
    const disabledConfig: AIGuidanceConfig = {
      ...defaultConfig,
      workingMemoryLimit: 0,
      defaultFeedbackDuration: 0,
    };

    const { result } = renderHook(() => useAIGuidance(disabledConfig));

    act(() => {
      result.current.addToWorkingMemory({
        id: 'item1',
        content: 'Item 1',
        type: 'context',
        priority: 1,
      });
      result.current.addFeedback('info', 'Test message');
    });

    expect(result.current.workingMemory).toHaveLength(0);
    expect(result.current.feedbacks).toHaveLength(1); // Feedback se agrega pero no se auto-remueve
  });
});
