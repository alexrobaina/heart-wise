/* eslint-disable @typescript-eslint/no-unused-vars */
'use client'

import React, { useState } from 'react'
import ReactMarkdown from 'react-markdown'
import { motion } from 'framer-motion'
import { FiCheck, FiCopy, FiUser } from 'react-icons/fi'
import { RiRobot2Line } from 'react-icons/ri'
import remarkGfm from 'remark-gfm'
import rehypeHighlight from 'rehype-highlight'
import 'highlight.js/styles/github-dark.css'

interface ChatBubbleProps {
  role: 'user' | 'assistant'
  content: string
  isFirst?: boolean
  isLast?: boolean
}

export function ChatBubble({
  role,
  content,
  isFirst,
  isLast,
}: ChatBubbleProps) {
  const [copied, setCopied] = useState(false)
  const isUser = role === 'user'

  const handleCopyClick = () => {
    if (typeof navigator !== 'undefined' && navigator.clipboard) {
      navigator.clipboard.writeText(content).then(() => {
        setCopied(true)
        setTimeout(() => setCopied(false), 2000)
      })
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className={`flex ${isUser ? 'justify-end' : 'justify-start'} mb-2`}
    >
      <div className={`flex max-w-[90%] ${isUser ? 'flex-row-reverse' : ''}`}>
        {/* Avatar */}
        <div className={`flex-shrink-0 mx-2 mt-1 ${isUser ? 'ml-3' : 'mr-3'}`}>
          {isUser ? (
            <div className="w-8 h-8 rounded-full bg-amber-600 flex items-center justify-center text-white">
              <FiUser size={16} />
            </div>
          ) : (
            <div className="w-8 h-8 rounded-full bg-amber-200 flex items-center justify-center text-amber-800">
              <RiRobot2Line size={16} />
            </div>
          )}
        </div>

        {/* Message Bubble */}
        <div
          className={`
            relative px-4 py-3 rounded-xl
            ${
              isUser
                ? 'bg-amber-100 text-amber-960 rounded-tr-none'
                : 'text-amber-960 rounded-tl-none'
            }
            ${isFirst ? (isUser ? 'rounded-tr-none' : 'rounded-tl-none') : ''}
            ${isLast ? (isUser ? 'rounded-br-xl' : 'rounded-bl-xl') : ''}
            shadow-sm
          `}
        >
          {/* Speech triangle */}
          {isFirst && (
            <div
              className={`
                absolute top-0 w-3 h-3
                ${isUser ? '-right-3 bg-amber-600' : '-left-3 bg-amber-100'}
                clip-path-polygon
              `}
              style={{
                clipPath: isUser
                  ? 'polygon(0% 0%, 100% 0%, 0% 100%)'
                  : 'polygon(100% 0%, 0% 0%, 100% 100%)',
              }}
            />
          )}

          {/* Message Content */}
          <div className="overflow-x-auto">
            {isUser ? (
              <p className="whitespace-pre-wrap break-words text-base">
                {content}
              </p>
            ) : (
              <ReactMarkdown
                remarkPlugins={[remarkGfm]}
                rehypePlugins={[rehypeHighlight]}
                components={{
                  p: ({ node, ...props }) => (
                    <p
                      className="whitespace-pre-wrap break-words mb-2 last:mb-0 text-base"
                      {...props}
                    />
                  ),

                  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                  // @ts-ignore
                  code: ({ inline, className, children, ...props }) => {
                    const match = /language-(\w+)/.exec(className || '')
                    return !inline ? (
                      <div className="relative">
                        <code
                          className={`${className} block p-3 my-2 rounded-md overflow-auto text-sm`}
                          {...props}
                        >
                          {children}
                        </code>
                      </div>
                    ) : (
                      <code
                        className={`${className} bg-amber-300 px-1.5 py-0.5 rounded text-sm`}
                        {...props}
                      >
                        {children}
                      </code>
                    )
                  },
                  a: ({ node, ...props }) => (
                    <a
                      className="text-blue-600 hover:underline"
                      target="_blank"
                      rel="noopener noreferrer"
                      {...props}
                    />
                  ),
                  ul: ({ node, ...props }) => (
                    <ul className="list-disc pl-5 mb-2" {...props} />
                  ),
                  ol: ({ node, ...props }) => (
                    <ol className="list-decimal pl-5 mb-2" {...props} />
                  ),
                  blockquote: ({ node, ...props }) => (
                    <blockquote
                      className="border-l-4 border-amber-300 pl-4 italic my-2"
                      {...props}
                    />
                  ),
                  table: ({ node, ...props }) => (
                    <div className="overflow-auto">
                      <table
                        className="border-collapse border border-amber-300 my-2 w-full"
                        {...props}
                      />
                    </div>
                  ),
                  th: ({ node, ...props }) => (
                    <th
                      className="border border-amber-300 px-3 py-1 bg-amber-100"
                      {...props}
                    />
                  ),
                  td: ({ node, ...props }) => (
                    <td
                      className="border border-amber-300 px-3 py-1"
                      {...props}
                    />
                  ),
                }}
              >
                {content}
              </ReactMarkdown>
            )}
            {!isUser && (
              <button
                type="button"
                onClick={handleCopyClick}
                aria-label="Copy message to clipboard"
                className={`absolute -bottom-8 right-1 p-1 rounded-full hover:text-amber-800 focus:outline-none focus:ring-amber-600 
                ${copied ? 'text-green-500' : 'text-amber-600'}`}
              >
                {copied ? <FiCheck size={18} /> : <FiCopy size={18} />}
              </button>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  )
}
