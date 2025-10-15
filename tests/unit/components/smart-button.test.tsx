import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { SmartButton } from '@/components/ui/smart-button';
import type { SmartButtonProps } from '@/components/ui/smart-button';

const mockOnClick = jest.fn();

const defaultProps: SmartButtonProps = {
  children: 'Test Button',
  onSmartClick: mockOnClick,
};

describe('SmartButton', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders without crashing', () => {
    render(<SmartButton {...defaultProps} />);
    expect(
      screen.getByRole('button', { name: 'Test Button' })
    ).toBeInTheDocument();
  });

  it('applies correct complexity variant styling', () => {
    const { rerender } = render(
      <SmartButton {...defaultProps} complexity="simple" />
    );

    let button = screen.getByRole('button');
    expect(button).toHaveClass('inline-flex', 'items-center', 'justify-center');

    rerender(<SmartButton {...defaultProps} complexity="complex" />);
    button = screen.getByRole('button');
    expect(button).toHaveClass('min-w-[160px]');
  });

  it('shows validation errors when validation fails', async () => {
    const mockValidator = jest.fn().mockResolvedValue(false);

    render(
      <SmartButton
        {...defaultProps}
        validation={{
          validator: mockValidator,
          errorMessage: 'Validation failed',
          required: true,
        }}
      />
    );

    const button = screen.getByRole('button');
    fireEvent.click(button);

    await waitFor(() => {
      expect(screen.getAllByText('Validation failed')).toHaveLength(2); // Aparece en botón y tooltip
    });

    expect(mockOnClick).not.toHaveBeenCalled();
  });

  it('executes onSmartClick when validation passes', async () => {
    const mockValidator = jest.fn().mockResolvedValue(true);

    render(
      <SmartButton
        {...defaultProps}
        validation={{
          validator: mockValidator,
          required: true,
        }}
      />
    );

    const button = screen.getByRole('button');
    fireEvent.click(button);

    await waitFor(() => {
      expect(mockOnClick).toHaveBeenCalled();
    });
  });

  it('shows confirmation dialog for destructive actions', async () => {
    render(
      <SmartButton
        {...defaultProps}
        variant="destructive"
        confirmationText="Are you sure?"
      />
    );

    const button = screen.getByRole('button');
    fireEvent.click(button);

    // El texto de confirmación y los botones aparecen
    await waitFor(() => {
      expect(screen.getByText('Are you sure?')).toBeInTheDocument();
      expect(screen.getByText('Confirmar')).toBeInTheDocument();
      expect(screen.getByText('Cancelar')).toBeInTheDocument();
    });

    // Confirm the action
    fireEvent.click(screen.getByText('Confirmar'));

    await waitFor(() => {
      expect(mockOnClick).toHaveBeenCalled();
    });
  });

  it('displays working memory context when provided', () => {
    const workingMemory = {
      primary: [
        { key: 'Context', value: 'Test context' },
        { key: 'Action 1', value: 'First action' },
      ],
      secondary: [{ key: 'Action 2', value: 'Second action' }],
    };

    render(
      <SmartButton
        {...defaultProps}
        workingMemory={workingMemory}
        showContext={true}
      />
    );

    const button = screen.getByRole('button');

    // Simular hover para mostrar el contexto
    fireEvent.mouseEnter(button);

    expect(screen.getByText('Test context')).toBeInTheDocument();
    expect(screen.getByText('First action')).toBeInTheDocument();
    expect(screen.getByText('Second action')).toBeInTheDocument();
  });

  it('shows loading state during async operations', async () => {
    const asyncValidator = jest
      .fn()
      .mockImplementation(
        () => new Promise(resolve => setTimeout(() => resolve(true), 100))
      );

    render(
      <SmartButton
        {...defaultProps}
        validation={{
          validator: asyncValidator,
          required: true,
        }}
      />
    );

    const button = screen.getByRole('button');
    fireEvent.click(button);

    expect(button).toBeDisabled();
    expect(screen.getByText('Validando...')).toBeInTheDocument();

    await waitFor(() => {
      expect(button).not.toBeDisabled();
    });
  });

  it('handles disabled state correctly', () => {
    render(<SmartButton {...defaultProps} disabled={true} />);

    const button = screen.getByRole('button');
    expect(button).toBeDisabled();

    fireEvent.click(button);
    expect(mockOnClick).not.toHaveBeenCalled();
  });

  it('applies correct size variants', () => {
    const { rerender } = render(<SmartButton {...defaultProps} size="sm" />);

    let button = screen.getByRole('button');
    expect(button).toHaveClass('h-9', 'rounded-md', 'px-3');

    rerender(<SmartButton {...defaultProps} size="lg" />);
    button = screen.getByRole('button');
    expect(button).toHaveClass('h-11', 'rounded-md', 'px-8');
  });
});
