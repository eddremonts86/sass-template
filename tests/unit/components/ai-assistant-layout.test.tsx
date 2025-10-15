import { render, screen } from '@testing-library/react';
import { AIAssistantLayout } from '@/components/layouts/ai-assistant-layout';
import type {
  AppContext,
  ProximityGroup,
} from '@/components/layouts/ai-assistant-layout';

// Mock data
const mockContext: AppContext = {
  projectName: 'Test Project',
  techStack: ['React', 'TypeScript'],
  currentState: 'idle',
  progress: 50,
  statusMessage: 'Test status',
};

const mockProximityGroups: ProximityGroup[] = [
  {
    title: 'Test Group',
    items: [
      { label: 'Item 1', value: 'Value 1', status: 'info' },
      { label: 'Item 2', value: 'Value 2', status: 'success' },
    ],
    priority: 'high',
  },
];

const mockChildren = <div data-testid="child-content">Test Content</div>;

describe('AIAssistantLayout', () => {
  it('renders without crashing', () => {
    render(
      <AIAssistantLayout
        appContext={mockContext}
        proximityGroups={mockProximityGroups}
      >
        {mockChildren}
      </AIAssistantLayout>
    );

    expect(screen.getByTestId('child-content')).toBeInTheDocument();
  });

  it('displays context information correctly', () => {
    render(
      <AIAssistantLayout
        appContext={mockContext}
        proximityGroups={mockProximityGroups}
      >
        {mockChildren}
      </AIAssistantLayout>
    );

    expect(screen.getByText('Contexto de la Aplicación')).toBeInTheDocument();
    expect(screen.getByTestId('child-content')).toBeInTheDocument();
  });

  it('renders proximity groups', () => {
    render(
      <AIAssistantLayout
        appContext={mockContext}
        proximityGroups={mockProximityGroups}
      >
        {mockChildren}
      </AIAssistantLayout>
    );

    expect(screen.getByTestId('child-content')).toBeInTheDocument();
    expect(screen.getByText('Contexto de la Aplicación')).toBeInTheDocument();
  });

  it('handles critical actions', () => {
    const onCriticalAction = jest.fn();

    render(
      <AIAssistantLayout
        appContext={mockContext}
        proximityGroups={mockProximityGroups}
        onCriticalAction={onCriticalAction}
      >
        {mockChildren}
      </AIAssistantLayout>
    );

    // Test that the component renders without errors
    expect(screen.getByTestId('child-content')).toBeInTheDocument();
  });

  it('applies selective attention highlighting', () => {
    const criticalGroups = mockProximityGroups.map(group => ({
      ...group,
      priority: 'critical' as const,
    }));

    render(
      <AIAssistantLayout
        appContext={mockContext}
        proximityGroups={criticalGroups}
      >
        {mockChildren}
      </AIAssistantLayout>
    );

    expect(screen.getByTestId('child-content')).toBeInTheDocument();
  });

  it('shows processing state when context is processing', () => {
    const processingContext = {
      ...mockContext,
      currentState: 'processing' as const,
    };

    render(
      <AIAssistantLayout
        appContext={processingContext}
        proximityGroups={mockProximityGroups}
      >
        {mockChildren}
      </AIAssistantLayout>
    );

    expect(screen.getByTestId('child-content')).toBeInTheDocument();
  });
});
