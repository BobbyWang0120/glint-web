'use client'

import { useState, useRef } from 'react'
import { useDropzone } from 'react-dropzone'

interface FileUploadProps {
  onFileChange: (file: File | null) => void
  disabled?: boolean
}

export default function FileUpload({ onFileChange, disabled = false }: FileUploadProps) {
  const [file, setFile] = useState<File | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept: {
      'application/pdf': ['.pdf'],
      'application/msword': ['.doc'],
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document': ['.docx'],
    },
    maxFiles: 1,
    disabled,
    onDrop: acceptedFiles => {
      if (acceptedFiles.length > 0) {
        setFile(acceptedFiles[0])
        onFileChange(acceptedFiles[0])
      }
    },
  })

  const handleRemoveFile = () => {
    setFile(null)
    onFileChange(null)
    if (fileInputRef.current) {
      fileInputRef.current.value = ''
    }
  }

  if (file) {
    return (
      <div className="mt-2 flex items-center justify-between p-4 bg-gray-50 rounded-lg border-2 border-gray-200">
        <div className="flex items-center space-x-4">
          <div className="p-2 bg-white rounded-lg">
            <svg
              className="w-8 h-8 text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z"
              />
            </svg>
          </div>
          <div>
            <p className="text-sm font-medium text-gray-900">{file.name}</p>
            <p className="text-sm text-gray-500">
              {(file.size / 1024 / 1024).toFixed(2)} MB
            </p>
          </div>
        </div>
        {!disabled && (
          <button
            type="button"
            onClick={handleRemoveFile}
            className="p-2 text-gray-400 hover:text-red-500"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
              />
            </svg>
          </button>
        )}
      </div>
    )
  }

  return (
    <div
      {...getRootProps()}
      className={`mt-2 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-lg ${
        isDragActive ? 'border-black bg-gray-50' : ''
      } ${disabled ? 'bg-gray-100 cursor-not-allowed' : 'cursor-pointer'}`}
    >
      <div className="space-y-1 text-center">
        <svg
          className="mx-auto h-12 w-12 text-gray-400"
          stroke="currentColor"
          fill="none"
          viewBox="0 0 48 48"
        >
          <path
            d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
            strokeWidth={2}
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
        <div className="flex text-sm text-gray-600">
          <input {...getInputProps()} ref={fileInputRef} />
          <p className="pl-1">
            {isDragActive
              ? 'Drop the file here'
              : 'Drag and drop resume file, or click to select'}
          </p>
        </div>
        <p className="text-xs text-gray-500">PDF, DOC, DOCX up to 10MB</p>
      </div>
    </div>
  )
} 