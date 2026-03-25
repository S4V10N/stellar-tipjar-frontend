import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { WalletConnector } from '../WalletConnector'
import { useWallet } from '@/hooks/useWallet'

// Mock the useWallet hook
vi.mock('@/hooks/useWallet')

const mockUseWallet = vi.mocked(useWallet)

describe('WalletConnector Component', () => {
  const user = userEvent.setup()

  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('shows connect button when wallet is not connected', () => {
    mockUseWallet.mockReturnValue({
      isConnected: false,
      publicKey: null,
      connect: vi.fn(),
      disconnect: vi.fn(),
      shortAddress: '',
      network: ''
    })

    render(<WalletConnector />)

    const connectButton = screen.getByRole('button', { name: 'Connect Wallet' })
    expect(connectButton).toBeInTheDocument()
    expect(connectButton).toHaveClass('bg-sunrise', 'text-white')
  })

  it('shows wallet info when connected', () => {
    mockUseWallet.mockReturnValue({
      isConnected: true,
      publicKey: 'GBRP...PLACEHOLDER...2PR5',
      connect: vi.fn(),
      disconnect: vi.fn(),
      shortAddress: '0x1234...5678',
      network: 'testnet'
    })

    render(<WalletConnector />)

    expect(screen.getByText('testnet')).toBeInTheDocument()
    expect(screen.getByText('0x1234...5678')).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'Disconnect' })).toBeInTheDocument()
  })

  it('calls connect when connect button is clicked', async () => {
    const mockConnect = vi.fn()
    mockUseWallet.mockReturnValue({
      isConnected: false,
      publicKey: null,
      connect: mockConnect,
      disconnect: vi.fn(),
      shortAddress: '',
      network: ''
    })

    render(<WalletConnector />)

    const connectButton = screen.getByRole('button', { name: 'Connect Wallet' })
    await user.click(connectButton)

    expect(mockConnect).toHaveBeenCalledTimes(1)
  })

  it('calls disconnect when disconnect button is clicked', async () => {
    const mockDisconnect = vi.fn()
    mockUseWallet.mockReturnValue({
      isConnected: true,
      publicKey: 'GBRP...PLACEHOLDER...2PR5',
      connect: vi.fn(),
      disconnect: mockDisconnect,
      shortAddress: '0x1234...5678',
      network: 'testnet'
    })

    render(<WalletConnector />)

    const disconnectButton = screen.getByRole('button', { name: 'Disconnect' })
    await user.click(disconnectButton)

    expect(mockDisconnect).toHaveBeenCalledTimes(1)
  })

  it('displays network with correct styling when connected', () => {
    mockUseWallet.mockReturnValue({
      isConnected: true,
      publicKey: 'GBRP...PLACEHOLDER...2PR5',
      connect: vi.fn(),
      disconnect: vi.fn(),
      shortAddress: '0x1234...5678',
      network: 'mainnet'
    })

    render(<WalletConnector />)

    const networkElement = screen.getByText('mainnet')
    expect(networkElement).toHaveClass('font-medium', 'text-wave')
  })

  it('displays address with correct styling when connected', () => {
    mockUseWallet.mockReturnValue({
      isConnected: true,
      publicKey: 'GBRP...PLACEHOLDER...2PR5',
      connect: vi.fn(),
      disconnect: vi.fn(),
      shortAddress: '0xABCD...EF12',
      network: 'testnet'
    })

    render(<WalletConnector />)

    const addressElement = screen.getByText('0xABCD...EF12')
    expect(addressElement).toHaveClass('text-ink/70')
  })

  it('has correct container styling when connected', () => {
    mockUseWallet.mockReturnValue({
      isConnected: true,
      publicKey: 'GBRP...PLACEHOLDER...2PR5',
      connect: vi.fn(),
      disconnect: vi.fn(),
      shortAddress: '0x1234...5678',
      network: 'testnet'
    })

    render(<WalletConnector />)

    const container = screen.getByText('testnet').parentElement
    expect(container).toHaveClass(
      'flex',
      'items-center',
      'gap-2',
      'rounded-xl',
      'border',
      'border-wave/25',
      'bg-white',
      'px-3',
      'py-2',
      'text-xs',
      'sm:text-sm'
    )
  })

  it('disconnect button has correct styling', () => {
    mockUseWallet.mockReturnValue({
      isConnected: true,
      publicKey: 'GBRP...PLACEHOLDER...2PR5',
      connect: vi.fn(),
      disconnect: vi.fn(),
      shortAddress: '0x1234...5678',
      network: 'testnet'
    })

    render(<WalletConnector />)

    const disconnectButton = screen.getByRole('button', { name: 'Disconnect' })
    expect(disconnectButton).toHaveClass(
      'px-2',
      'py-1',
      'text-xs',
      'bg-transparent',
      'text-ink',
      'border',
      'border-ink/20'
    )
  })

  it('handles empty short address gracefully', () => {
    mockUseWallet.mockReturnValue({
      isConnected: true,
      publicKey: 'GBRP...PLACEHOLDER...2PR5',
      connect: vi.fn(),
      disconnect: vi.fn(),
      shortAddress: '',
      network: 'testnet'
    })

    render(<WalletConnector />)

    expect(screen.getByText('testnet')).toBeInTheDocument()
    // Check that the address span exists but is empty
    const addressSpan = screen.getByText('testnet').nextElementSibling
    expect(addressSpan).toHaveTextContent('')
  })

  it('handles empty network gracefully', () => {
    mockUseWallet.mockReturnValue({
      isConnected: true,
      publicKey: 'GBRP...PLACEHOLDER...2PR5',
      connect: vi.fn(),
      disconnect: vi.fn(),
      shortAddress: '0x1234...5678',
      network: ''
    })

    render(<WalletConnector />)

    // Check that the network span exists but is empty
    const container = screen.getByText('0x1234...5678').parentElement
    const networkSpan = container?.firstElementChild
    expect(networkSpan).toHaveTextContent('')
    expect(screen.getByText('0x1234...5678')).toBeInTheDocument()
  })
})
