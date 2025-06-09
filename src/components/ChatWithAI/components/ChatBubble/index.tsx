import ReactMarkdown from 'react-markdown'

export function ChatBubble({
  role,
  content,
}: {
  role: 'user' | 'assistant'
  content: string
}) {
  const isUser = role === 'user'
  return (
    <div className={`flex ${isUser ? 'justify-end' : 'justify-start'}`}>
      <div
        className={`max-w-[80%] whitespace-pre-wrap px-4 py-2 text-base ${
          isUser
            ? 'bg-[#11a37f] text-white rounded-tr-xl rounded-tl-xl rounded-bl-xl'
            : 'bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-gray-100 rounded-bl-xl rounded-br-xl rounded-tr-xl'
        }`}
      >
        {isUser ? (
          content
        ) : (
          <ReactMarkdown
            components={{
              p: (props) => (
                <p
                  className="prose prose-sm dark:prose-invert whitespace-pre-wrap"
                  {...props}
                />
              ),
              code: ({ inline, ...props }) => (
                <code
                  className={`block overflow-auto bg-gray-200 dark:bg-gray-700 px-1 py-0.5 rounded ${inline ? 'inline' : ''}`}
                  {...props}
                />
              ),
            }}
          >
            {content}
          </ReactMarkdown>
        )}
      </div>
    </div>
  )
}
