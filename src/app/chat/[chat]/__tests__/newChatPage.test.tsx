// src/app/chat/__tests__/page.test.tsx
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import ChatPage from '../page'
import { useParams } from 'next/navigation'
import { useUserChat } from '@/hooks/useUserChat'

jest.mock('react-markdown', () => ({
  __esModule: true,
  default: ({ children }: { children: React.ReactNode }) => <>{children}</>,
}))

jest.mock('remark-gfm', () => ({
  __esModule: true,
  default: () => null,
}))

jest.mock('rehype-highlight', () => ({
  __esModule: true,
  default: () => null,
}))

jest.mock('highlight.js/styles/github-dark.css', () => ({}))

// 1️⃣ Mock next/navigation so useParams is a jest.fn()
jest.mock('next/navigation', () => ({
  ...jest.requireActual('next/navigation'),
  useParams: jest.fn(),
}))

// 2️⃣ Mock your data-fetching hook
jest.mock('@/hooks/useUserChat', () => ({
  useUserChat: jest.fn(),
}))

describe('ChatPage', () => {
  const chatId = 'chat-123'

  beforeEach(() => {
    // reset mocks before each
    jest.clearAllMocks()
    ;(useParams as jest.Mock).mockReturnValue({ chat: chatId })
  })

  it('renders <Loading /> when isLoading=true', () => {
    // 3️⃣ Stub useUserChat to be loading
    ;(useUserChat as jest.Mock).mockReturnValue({
      data: undefined,
      isLoading: true,
      error: null,
    })

    render(<ChatPage />)

    // Assuming your <Loading /> component renders a role="status"
    expect(screen.getByRole('status')).toBeInTheDocument()
  })

  it('renders error message when error is truthy', () => {
    ;(useUserChat as jest.Mock).mockReturnValue({
      data: undefined,
      isLoading: false,
      error: new Error('fetch failed'),
    })

    render(<ChatPage />)

    expect(screen.getByText('Error loading chat')).toBeInTheDocument()
  })

  it('renders <ChatWithAI /> when data is loaded', () => {
    const fakeChat = {
      title: 'My Test Chat',
      messages: [
        { role: 'user', content: 'Hello' },
        { role: 'assistant', content: 'Hi there!' },
      ],
    }

    ;(useUserChat as jest.Mock).mockReturnValue({
      data: [fakeChat],
      isLoading: false,
      error: null,
    })

    render(<ChatPage />)

    // The ChatWithAI title input is rendered with the chat title
    const titleInput = screen.getByPlaceholderText('Chat title…')
    expect(titleInput).toHaveValue(fakeChat.title)

    // And the first message shows up via ChatBubble
    expect(screen.getByText('Hello')).toBeInTheDocument()
    expect(screen.getByText('Hi there!')).toBeInTheDocument()
  })
})
